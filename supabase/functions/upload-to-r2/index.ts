import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { S3Client, PutObjectCommand } from "npm:@aws-sdk/client-s3@3.901.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
    const { images, propertyId } = await req.json();

    if (!Array.isArray(images) || !propertyId) {
      return new Response(
        JSON.stringify({ error: "Missing images or propertyId" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const R2_ENDPOINT = Deno.env.get("R2_ENDPOINT");
    const R2_ACCESS_KEY_ID = Deno.env.get("R2_ACCESS_KEY_ID");
    const R2_SECRET_ACCESS_KEY = Deno.env.get("R2_SECRET_ACCESS_KEY");
    const R2_BUCKET_NAME = Deno.env.get("R2_BUCKET_NAME");
    const R2_PUBLIC_URL = Deno.env.get("R2_PUBLIC_URL");

    if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      return new Response(
        JSON.stringify({ error: "R2 configuration missing" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const r2Client = new S3Client({
      region: "auto",
      endpoint: R2_ENDPOINT,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    const timestamp = Date.now();

    const uploadPromises = images.map(async (base64Data, i) => {
      const base64Match = base64Data.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
      if (!base64Match) {
        console.error(`Invalid base64 format for image ${i}`);
        return null;
      }

      const contentType = `image/${base64Match[1]}`;
      const base64Content = base64Match[2];

      const binaryData = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0));

      const fileName = `${propertyId}/${timestamp}-${i}.${base64Match[1]}`;

      const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileName,
        Body: binaryData,
        ContentType: contentType,
      });

      await r2Client.send(command);

      return `${R2_PUBLIC_URL}/${fileName}`;
    });

    const results = await Promise.all(uploadPromises);
    const uploadedUrls = results.filter((url): url is string => url !== null);

    return new Response(
      JSON.stringify({ urls: uploadedUrls }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error uploading to R2:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});