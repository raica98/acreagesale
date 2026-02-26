import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  priceId?: string;
  successUrl: string;
  cancelUrl: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log('=== Checkout Session Request Started ===');
    
    const authHeader = req.headers.get("Authorization");
    console.log('Auth header present:', !!authHeader);
    
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token extracted, length:', token.length);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    console.log('Supabase URL configured:', !!supabaseUrl);
    console.log('Service role key configured:', !!supabaseServiceKey);

    const supabaseAdmin = createClient(
      supabaseUrl ?? "",
      supabaseServiceKey ?? ""
    );

    console.log('Verifying JWT token...');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError) {
      console.error('JWT verification error:', userError);
      return new Response(
        JSON.stringify({ error: "Authentication failed", details: userError.message }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!user) {
      console.error('No user found in JWT');
      return new Response(
        JSON.stringify({ error: "Unauthorized - no user found" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log('User authenticated:', user.id, user.email);

    const { successUrl, cancelUrl } = await req.json() as CheckoutRequest;
    console.log('Request body parsed successfully');

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured');
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.log('Stripe secret key present');

    console.log('Checking for existing Stripe customer...');
    const { data: existingCustomer } = await supabaseAdmin
      .from("stripe_customers")
      .select("customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    let customerId = existingCustomer?.customer_id;
    console.log('Existing customer ID:', customerId || 'none');

    if (customerId?.startsWith('cus_test_')) {
      console.log('Found test customer, deleting...');
      await supabaseAdmin
        .from("stripe_customers")
        .delete()
        .eq("user_id", user.id);
      customerId = null;
    }

    if (!customerId) {
      console.log('Creating new Stripe customer...');
      console.log('User email:', user.email);
      console.log('Stripe key present:', STRIPE_SECRET_KEY ? `Yes (${STRIPE_SECRET_KEY.substring(0, 7)}...)` : 'No');

      const bodyParts: string[] = [];
      bodyParts.push(`email=${encodeURIComponent(user.email || "")}`);
      bodyParts.push(`metadata[supabase_user_id]=${encodeURIComponent(user.id)}`);
      const body = bodyParts.join('&');

      console.log('Request body:', body);

      const customerResponse = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      console.log('Stripe customer API response status:', customerResponse.status);

      if (!customerResponse.ok) {
        const errorText = await customerResponse.text();
        console.error('Failed to create Stripe customer. Status:', customerResponse.status);
        console.error('Error details:', errorText);
        return new Response(
          JSON.stringify({ error: "Failed to create Stripe customer", details: errorText }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const customer = await customerResponse.json();
      customerId = customer.id;
      console.log('Created new customer:', customerId);

      const { error: insertError } = await supabaseAdmin.from("stripe_customers").insert({
        user_id: user.id,
        customer_id: customerId,
        email: user.email || "",
      });
      
      if (insertError) {
        console.error('Failed to save customer to database:', insertError);
      } else {
        console.log('Saved customer to database');
      }
    }

    console.log('Creating checkout session...');
    const sessionBodyParts: string[] = [];
    sessionBodyParts.push(`customer=${encodeURIComponent(customerId)}`);
    sessionBodyParts.push(`mode=payment`);
    sessionBodyParts.push(`line_items[0][price_data][currency]=usd`);
    sessionBodyParts.push(`line_items[0][price_data][product_data][name]=${encodeURIComponent('AI Listing Package')}`);
    sessionBodyParts.push(`line_items[0][price_data][product_data][description]=${encodeURIComponent('1st Month Marketing Plan - AI-powered property listing with buyer outreach')}`);
    sessionBodyParts.push(`line_items[0][price_data][unit_amount]=24999`);
    sessionBodyParts.push(`line_items[0][quantity]=1`);
    sessionBodyParts.push(`success_url=${encodeURIComponent(successUrl)}`);
    sessionBodyParts.push(`cancel_url=${encodeURIComponent(cancelUrl)}`);
    sessionBodyParts.push(`metadata[user_id]=${encodeURIComponent(user.id)}`);
    sessionBodyParts.push(`metadata[package_type]=ai_listing_credit`);
    sessionBodyParts.push(`metadata[credits]=1`);
    const sessionBody = sessionBodyParts.join('&');

    const checkoutResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: sessionBody,
    });

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      console.error('Failed to create checkout session:', errorText);
      return new Response(
        JSON.stringify({ error: "Failed to create checkout session", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const session = await checkoutResponse.json();
    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
