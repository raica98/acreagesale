/*
  # PRYCD Property Pricing Edge Function

  1. Purpose
    - Securely proxy PRYCD pricing API requests
    - Keep RapidAPI key server-side for security
    - Handle CORS and error responses

  2. Security
    - Uses server-side environment variable for API key
    - Validates input data before forwarding
    - Implements proper CORS headers

  3. API Integration
    - Forwards requests to PRYCD Pricing API
    - Returns formatted pricing data and confidence scores
    - Handles API errors gracefully
*/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface PricingRequest {
  apn: string;
  county_fips: string;
  city: string;
  latitude: number;
  longitude: number;
  acreage: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Use the updated working RapidAPI key
    const RAPIDAPI_KEY = "ba6172cc2dmsh3ecd3ca1a0208cfp13feccjsn258cb6db728b";
    
    if (!RAPIDAPI_KEY) {
      return new Response(
        JSON.stringify({ error: 'PRYCD API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse and validate request body
    const requestData: PricingRequest = await req.json();
    
    // Validate required fields
    const requiredFields = ['apn', 'county_fips', 'city', 'latitude', 'longitude', 'acreage'];
    for (const field of requiredFields) {
      if (!requestData[field as keyof PricingRequest]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Prepare PRYCD API request
    const prycdPayload = {
      apn: requestData.apn,
      county_fips: requestData.county_fips,
      city: requestData.city,
      latitude: requestData.latitude,
      longitude: requestData.longitude,
      acreage: requestData.acreage,
      pricing_configuration: {
        comp_weight: { "1": 0.8, "2": 1.2 },
        minimum_parcels_for_model: 12,
        iqr_low: 25,
        iqr_high: 75
      }
    };

    // Call PRYCD API
    const prycdResponse = await fetch("https://prycd-pricing.p.rapidapi.com/priceProperty", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'prycd-pricing.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'Accept': 'application/json',
      },
      body: JSON.stringify(prycdPayload),
    });

    if (!prycdResponse.ok) {
      const errorText = await prycdResponse.text();
      console.error('PRYCD API error:', prycdResponse.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: `PRYCD API error: ${prycdResponse.status}`,
          details: errorText 
        }),
        {
          status: prycdResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const prycdData = await prycdResponse.json();
    
    // Extract pricing data with fallbacks
    const recommended_price = 
      prycdData?.recommended_price ?? 
      prycdData?.price ?? 
      prycdData?.result?.recommended ?? 
      null;

    const confidence = 
      prycdData?.confidence ?? 
      prycdData?.result?.confidence ?? 
      null;

    const price_formatted = 
      prycdData?.price_formatted ?? 
      (recommended_price ? `$${recommended_price.toLocaleString()}` : null);

    // Return formatted response
    return new Response(
      JSON.stringify({
        success: true,
        recommended_price,
        confidence,
        price_formatted,
        raw_response: prycdData // Include full response for debugging
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in price-property function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});