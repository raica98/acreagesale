import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, Stripe-Signature",
};

const crypto = globalThis.crypto;

async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const parts = signature.split(",");
    const timestamps = parts.filter((p) => p.startsWith("t="));
    const sigs = parts.filter((p) => p.startsWith("v1="));

    if (timestamps.length === 0 || sigs.length === 0) {
      return false;
    }

    const timestamp = timestamps[0].split("=")[1];
    const expectedSig = sigs[0].split("=")[1];

    const signedPayload = `${timestamp}.${payload}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBytes = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(signedPayload)
    );

    const computedSig = Array.from(new Uint8Array(signatureBytes))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return computedSig === expectedSig;
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!STRIPE_WEBHOOK_SECRET) {
      console.error("Webhook secret not configured");
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = await req.text();

    if (signature) {
      const isValid = await verifyStripeSignature(
        payload,
        signature,
        STRIPE_WEBHOOK_SECRET
      );

      if (!isValid) {
        console.error("Invalid signature");
        return new Response(
          JSON.stringify({ error: "Invalid signature" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const event = JSON.parse(payload);
    console.log("Webhook event type:", event.type);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.user_id;
      const packageType = session.metadata?.package_type;
      const credits = parseInt(session.metadata?.credits || "1");
      const customerId = session.customer;

      if (!userId) {
        console.error("No user_id in metadata");
        return new Response(
          JSON.stringify({ error: "No user_id in metadata" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error: purchaseError } = await supabaseAdmin
        .from("package_purchases")
        .insert({
          user_id: userId,
          package_type: packageType || "ai_listing_credit",
          amount: session.amount_total,
          currency: "usd",
          stripe_payment_intent_id: session.payment_intent,
          stripe_session_id: session.id,
          status: "completed",
        });

      if (purchaseError) {
        console.error("Error creating purchase record:", purchaseError);
        return new Response(
          JSON.stringify({ error: "Failed to create purchase record" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (packageType === "ai_listing_credit") {
        const { error: creditsError } = await supabaseAdmin.rpc(
          "add_ai_listing_credits",
          {
            p_user_id: userId,
            p_credits: credits,
            p_stripe_payment_intent_id: session.payment_intent,
            p_stripe_session_id: session.id,
            p_notes: `Purchased ${credits} AI listing credit(s) for $${(session.amount_total / 100).toFixed(2)}`
          }
        );

        if (creditsError) {
          console.error("Error adding AI listing credits:", creditsError);
          return new Response(
            JSON.stringify({ error: "Failed to add credits" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        console.log(`Added ${credits} AI listing credit(s) to user:`, userId);
      }

      console.log("Payment successful for user:", userId);
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata?.user_id;

      if (userId) {
        const { error: failedError } = await supabaseAdmin
          .from("package_purchases")
          .insert({
            user_id: userId,
            package_type: "premium",
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            stripe_payment_intent_id: paymentIntent.id,
            status: "failed",
          });

        if (failedError) {
          console.error("Error logging failed payment:", failedError);
        }
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
