import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { lat, lng, satelliteImage } = await req.json();

    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: "Missing lat or lng" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!satelliteImage) {
      return new Response(
        JSON.stringify({ error: "Missing satelliteImage parameter" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("🎨 Step 1: Analyzing angled satellite view with GPT-4 Vision...");

    const visionResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this angled aerial satellite view and describe ONLY the natural features visible. Focus on: 1) Specific vegetation (e.g., 'sparse Joshua trees', 'dense creosote bushes', 'scattered scrub oak'), 2) Exact ground composition (e.g., 'sandy desert soil with scattered rocks', 'dry brown grass with bare patches'), 3) Terrain elevation (flat, gentle slope, hilly, rocky outcrops), 4) Surrounding landscape context. Describe what someone would see standing at the road edge looking toward this land. Be precise and factual - describe only what is clearly visible in this image."
              },
              {
                type: "image_url",
                image_url: {
                  url: satelliteImage
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text();
      console.error("❌ Vision API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Vision analysis failed", details: errorText }),
        {
          status: visionResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const visionData = await visionResponse.json();
    const terrainDescription = visionData.choices[0].message.content;
    console.log("✓ Terrain analysis:", terrainDescription);

    console.log("🎨 Step 2: Generating realistic street view with DALL-E 3...");

    const dallePrompt = `A high-quality, unedited photograph taken with a professional camera from a dirt road edge, looking toward vacant desert land. ${terrainDescription}. Shot at eye level (5-6 feet height) in natural afternoon sunlight. The image must look exactly like a real estate listing photo - completely photorealistic with natural colors, realistic depth of field, and authentic outdoor lighting. No filters, no artistic interpretation, no stylization. This should be indistinguishable from an actual camera photograph of undeveloped land. Include slight imperfections like lens dust, natural color variation, and real-world lighting conditions to ensure authenticity.`;

    console.log("📝 DALL-E prompt:", dallePrompt);

    const dalleResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: dallePrompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "natural"
      })
    });

    console.log("📥 DALL-E response status:", dalleResponse.status);

    if (!dalleResponse.ok) {
      const errorText = await dalleResponse.text();
      console.error("❌ DALL-E API error:", errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      return new Response(
        JSON.stringify({ error: "DALL-E API error", details: errorData }),
        {
          status: dalleResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await dalleResponse.json();
    console.log("✓ DALL-E response received:", { hasData: !!data.data, dataLength: data.data?.length });

    if (data.data && data.data[0] && data.data[0].url) {
      const imageUrl = data.data[0].url;
      console.log("🖼️ Generated image URL received from DALL-E");

      console.log("⬇️ Fetching generated image from URL...");
      const imageResponse = await fetch(imageUrl);
      const generatedBlob = await imageResponse.blob();
      console.log("✓ Generated image downloaded, size:", (generatedBlob.size / 1024 / 1024).toFixed(2), "MB");

      const arrayBuffer = await generatedBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      let binary = '';
      const chunkSize = 8192;
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.slice(i, i + chunkSize);
        binary += String.fromCharCode(...chunk);
      }

      const base64 = btoa(binary);
      const dataUrl = `data:${generatedBlob.type};base64,${base64}`;

      console.log("✅ Successfully generated realistic street view from satellite imagery");

      return new Response(
        JSON.stringify({ imageDataUrl: dataUrl }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.error("❌ No image URL in DALL-E response");
    return new Response(
      JSON.stringify({ error: "No image URL in DALL-E response", response: data }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error in generate-ai-streetview:", error);
    return new Response(
      JSON.stringify({ error: String(error), stack: error instanceof Error ? error.stack : undefined }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});