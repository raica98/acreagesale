// Utility to retry fetch with backoff
export async function fetchWithBackoff(url: string, options: RequestInit, retries = 2): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;

      if (i === retries - 1 || res.status < 500) {
        throw new Error(`Request failed: ${res.status}`);
      }
      
      // Exponential backoff for server errors
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  
  throw new Error('Max retries exceeded');
}

// PRYCD API client
export async function fetchPRYCDPricing(property: {
  apn: string;
  county_fips: string;
  city: string;
  latitude: number;
  longitude: number;
  acreage: number;
}) {
  // Use direct PRYCD API call with working key
  const res = await fetchWithBackoff('https://prycd-pricing.p.rapidapi.com/priceProperty', {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "x-rapidapi-key": "2ad6091c0amsh4939749e07ed99ap1becd5jsn403f4b99c4ed",
      "x-rapidapi-host": "prycd-pricing.p.rapidapi.com",
    },
    body: JSON.stringify({
      apn: property.apn,
      county_fips: property.county_fips,
      city: property.city,
      latitude: property.latitude,
      longitude: property.longitude,
      acreage: property.acreage,
      pricing_configuration: {
        comp_weight: { "1": 0.8, "2": 1.2 },
        minimum_parcels_for_model: 12,
        iqr_low: 25,
        iqr_high: 75
      }
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error: ${res.status} - ${errorText}`);
  }
  
  return res.json();
}