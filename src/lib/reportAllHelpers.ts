import axios from 'axios';
import wellknown from 'wellknown';
import * as turf from '@turf/turf';

const REPORTALL_CLIENT_ID = 'Yd8Bf8FCn4';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const PRYCD_API_KEY = 'ba6172cc2dmsh3ecd3ca1a0208cfp13feccjsn258cb6db728b';

export interface ReportAllData {
  price: number;
  apn: string;
  acreage: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  countyId?: number;
  latitude: number;
  longitude: number;
  geometry: any;
  geomWkt: string;
  zoning?: string;
}

// Text formatting utilities
const toProperCase = (str: string): string => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

const formatAddress = (address: string): string => {
  if (!address) return '';
  return address.toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\bRoad\b/g, 'Rd')
    .replace(/\bStreet\b/g, 'St')
    .replace(/\bAvenue\b/g, 'Ave')
    .replace(/\bBoulevard\b/g, 'Blvd')
    .replace(/\bDrive\b/g, 'Dr')
    .replace(/\bLane\b/g, 'Ln')
    .replace(/\bCourt\b/g, 'Ct')
    .replace(/\bPlace\b/g, 'Pl')
    .replace(/\bParkway\b/g, 'Pkwy')
    .replace(/\bCircle\b/g, 'Cir')
    .replace(/\bWay\b/g, 'Way');
};

// Unified function to fetch all property data from ReportAll
export async function fetchReportAllData(apn: string, state?: string, county?: string): Promise<ReportAllData> {
  if (!apn) {
    throw new Error('APN is required');
  }
  
  const targetApn = apn;
  const targetState = state || "CA";
  const targetCounty = county || "San Bernardino";
  
  const url = `https://reportallusa.com/api/parcels?client=${REPORTALL_CLIENT_ID}&v=9&region=${encodeURIComponent(
    targetCounty + ", " + targetState
  )}&parcel_id=${encodeURIComponent(targetApn)}&return_buildings=true`;

  const response = await axios.get(url);
  const parcel = response.data?.results?.[0];
  
  if (!parcel) {
    throw new Error(`Parcel not found for APN: ${targetApn}`);
  }
  
  console.log("📦 Full API response:", parcel);

  // Parse polygon geometry and compute centroid, prioritizing geom_as_wkt
  let geometry = null;
  let lat = 0;
  let lng = 0;
  
  if (parcel.geom_as_wkt) {
    try {
      geometry = wellknown(parcel.geom_as_wkt);
      console.log('✅ Parsed WKT to GeoJSON:', geometry?.type);
      
      if (geometry) {
        // Calculate centroid using turf
        const turfGeometry = geometry.type === "Polygon" 
          ? turf.polygon(geometry.coordinates)
          : turf.multiPolygon(geometry.coordinates);
        
        const center = turf.centroid(turfGeometry);
        [lng, lat] = center.geometry.coordinates;
        console.log('✅ Calculated centroid:', lat, lng);
      }
    } catch (error) {
      console.warn('⚠️ WKT parse failed, using API coordinates:', error);
      lat = parseFloat(parcel.latitude || '0');
      lng = parseFloat(parcel.longitude || '0');
    }
  } else if (parcel.latitude && parcel.longitude) {
    // Use coordinates directly from API response
    lat = parseFloat(parcel.latitude);
    lng = parseFloat(parcel.longitude);
  } else {
    console.warn('⚠️ No coordinates found in API response');
    lat = 0;
    lng = 0;
  }

  console.log('📍 Using coordinates:', { lat, lng });

  const propertyData: ReportAllData = {
    apn: parcel.parcel_id || targetApn,
    acreage: parseFloat(parcel.acreage_calc || "1.0"),
    address: parcel.address || "No Street Address. Use Coordinates To Locate Property",
    city: toProperCase(parcel.census_place || parcel.muni_name || "San Bernardino"),
    state: parcel.state_abbr || "CA",
    zip: parcel.census_zip || "92401",
    county: toProperCase(parcel.county_name || "San Bernardino"),
    countyId: parcel.county_id || null,
    latitude: lat,
    longitude: lng,
    geometry,
    geomWkt: parcel.geom_as_wkt || "",
    zoning: parcel.land_use_code || "Residential",
    price: 0
  };

  console.log('✅ Data extracted and formatted:', propertyData);
  return propertyData;
}

// Generate AI title and description
export async function generateAIContent(propertyData: ReportAllData): Promise<{ title: string; description: string }> {
  try {
    const acres = parseFloat(propertyData.acreage.toFixed(2));
    const acresText = acres.toFixed(2);
    const title = `${acresText}-Acre Property in ${propertyData.city}, ${propertyData.state}`;
    
    const descriptionPrompt = `Write a short, professional property description for a vacant ${acresText}-acre lot in ${propertyData.city}, ${propertyData.county} County, ${propertyData.state} with ${propertyData.zoning || 'Residential'} zoning. Use proper capitalization and professional language. Mention the exact acreage as "${acresText}-acre" in the description.`;
    
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a real estate assistant helping write engaging property listings.' },
        { role: 'user', content: descriptionPrompt }
      ],
      max_tokens: 300,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const description = response.data.choices[0]?.message?.content || 
      `Beautiful ${acresText}-acre property located in ${propertyData.city}, ${propertyData.county} County, ${propertyData.state}. ${propertyData.zoning ? `Zoned ${propertyData.zoning}.` : ''} Great opportunity for development or investment.`;
    
    return { title, description: description.replace(/\s+/g, ' ').trim() };
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    const acres = parseFloat(propertyData.acreage.toFixed(2));
    const acresText = acres.toFixed(2);
    const title = `${acresText}-Acre Property in ${propertyData.city}, ${propertyData.state}`;
    const description = `Beautiful ${acresText}-acre property located in ${propertyData.city}, ${propertyData.county} County, ${propertyData.state}. ${propertyData.zoning ? `Zoned ${propertyData.zoning}.` : ''} Great opportunity for development or investment.`;
    
    return { title, description };
  }
}