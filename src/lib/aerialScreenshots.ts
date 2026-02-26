import React from "react";
import { ScreenshotMap } from "../components/ScreenshotMap";
import { createRoot } from "react-dom/client";
import * as turf from "@turf/turf";
import { generateStreetViewScreenshot } from "./streetViewScreenshot";
import { generateSurveyMapScreenshot } from "./surveyMapScreenshot";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "";
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || "";

// Initialize Mapbox only in browser environment
if (typeof window !== 'undefined' && MAPBOX_TOKEN) {
  import("mapbox-gl").then((mapboxgl) => {
    mapboxgl.default.accessToken = MAPBOX_TOKEN;
  }).catch(console.error);
}

// Calculate optimal view parameters based on polygon geometry
function calculateViewParams(geojson: any) {
  try {
    const bounds = turf.bbox(geojson); // [minX, minY, maxX, maxY]
    const area = turf.area(geojson); // in square meters

    // Compute center
    const centerLng = (bounds[0] + bounds[2]) / 2;
    const centerLat = (bounds[1] + bounds[3]) / 2;

    // Use acreage-based zoom calculation instead of area
    const acreage = area * 0.000247105; // Convert square meters to acres
    const baseZoom = calculateZoomByLotSize(acreage);

    console.log(`📐 Calculated view params - Area: ${area}m², Center: ${centerLat}, ${centerLng}, Base Zoom: ${baseZoom}`);

    return { centerLat, centerLng, baseZoom, area, acreage };
  } catch (error) {
    console.error('Error calculating view params:', error);
    return { centerLat: center.lat, centerLng: center.lng, baseZoom: 12, area: 0, acreage: 1 };
  }
}

// Main: Generate aerial screenshots
export async function generateAerialScreenshots({
  geomWkt,
  center,
  acreage,
  boundaryPoints,
}: {
  geomWkt?: string;
  center: { lat: number; lng: number };
  acreage: number;
  boundaryPoints?: Array<{lat: number; lng: number}>;
}): Promise<string[]> {
  let geojson: any = null;
  let viewParams = { centerLat: center.lat, centerLng: center.lng, baseZoom: 15, area: 0 };

  // Parse geometry if available
  if (geomWkt) {
    try {
      if (typeof geomWkt === 'string') {
        geojson = JSON.parse(geomWkt);
      } else {
        geojson = geomWkt;
      }

      console.log('🔍 Parsed GeoJSON type:', geojson?.type, 'Has coordinates:', !!geojson?.coordinates, 'Has geometry:', !!geojson?.geometry);

      if (geojson) {
        viewParams = calculateViewParams(geojson);
      }
    } catch (error) {
      console.error('Error parsing geometry for view calculation:', error);
      viewParams.baseZoom = calculateZoomByLotSize(acreage);
    }
  } else {
    console.warn('⚠️ No geomWkt provided to generateAerialScreenshots');
    viewParams.baseZoom = calculateZoomByLotSize(acreage);
  }

  // Generate 4 directional screenshots with progressive distances
  const views = [
    { name: "Close-up View", bearing: 0, pitch: 45, zoom: viewParams.baseZoom + 2 },    // North - closest
    { name: "Medium View", bearing: 90, pitch: 45, zoom: viewParams.baseZoom + 1 },     // East - medium
    { name: "Wide View", bearing: 180, pitch: 45, zoom: viewParams.baseZoom },          // South - wide
    { name: "Context View", bearing: 270, pitch: 45, zoom: viewParams.baseZoom - 1 },   // West - context
  ];

  const screenshots: string[] = [];

  // Generate all screenshots in parallel with proper timeout handling
  const screenshotPromises = views.map(async (view, index) => {
    console.log(`📸 Generating screenshot: ${view.name} (zoom: ${view.zoom}, bearing: ${view.bearing}, pitch: ${view.pitch})`);
    try {
      // Stagger screenshot generation to reduce resource contention
      await new Promise(resolve => setTimeout(resolve, index * 500));
      
      const screenshot = await generateSingleScreenshot({
        lat: viewParams.centerLat,
        lng: viewParams.centerLng,
        zoom: view.zoom,
        bearing: view.bearing,
        pitch: view.pitch,
        geomWkt,
      });
      if (screenshot) {
        console.log(`✅ Screenshot captured: ${view.name}`);
        return screenshot;
      } else {
        console.warn(`❌ Failed to capture screenshot: ${view.name}`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error capturing screenshot ${view.name}:`, error);
      return null;
    }
  });

  // Wait for all screenshots with a reasonable timeout
  try {
    const results = await Promise.race([Promise.allSettled(screenshotPromises), new Promise(resolve => setTimeout(() => resolve([]), 45000))]);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        screenshots.push(result.value);
      } else {
        console.warn(`Screenshot ${views[index].name} failed or timed out`);
      }
    });
  } catch (error) {
    console.error('Error waiting for screenshots:', error);
  }
  // Generate additional maps with timeout protection
  try {
    const nearbyCitiesScreenshot = await Promise.race([
      generateNearbyCitiesMap(viewParams.centerLat, viewParams.centerLng),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Nearby cities timeout')), 15000))
    ]);
    if (nearbyCitiesScreenshot) screenshots.push(nearbyCitiesScreenshot);
  } catch (error) {
    console.warn('Nearby cities map generation failed:', error);
  }

  try {
    const nearbyAmenitiesScreenshot = await Promise.race([
      generateNearbyAmenitiesMap(viewParams.centerLat, viewParams.centerLng),
      new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Nearby amenities timeout')), 15000))
    ]);
    if (nearbyAmenitiesScreenshot) screenshots.push(nearbyAmenitiesScreenshot);
  } catch (error) {
    console.warn('Nearby amenities map generation failed:', error);
  }

  try {
    console.log('🏙️ Generating Street View screenshot...');
    console.log('🔍 GeoJSON structure:', JSON.stringify(geojson).substring(0, 200));
    if (geojson) {
      let coords: Array<{lat: number; lng: number}> = [];

      if (geojson.type === 'Polygon' && geojson.coordinates && geojson.coordinates.length > 0) {
        console.log('📐 Found Polygon type, extracting coordinates...');
        coords = geojson.coordinates[0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
      } else if (geojson.type === 'MultiPolygon' && geojson.coordinates && geojson.coordinates.length > 0) {
        console.log('📐 Found MultiPolygon type, extracting first polygon coordinates...');
        coords = geojson.coordinates[0][0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
      } else if (geojson.geometry?.type === 'Polygon' && geojson.geometry.coordinates && geojson.geometry.coordinates.length > 0) {
        console.log('📐 Found Feature with Polygon geometry, extracting coordinates...');
        coords = geojson.geometry.coordinates[0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
      } else if (geojson.geometry?.type === 'MultiPolygon' && geojson.geometry.coordinates && geojson.geometry.coordinates.length > 0) {
        console.log('📐 Found Feature with MultiPolygon geometry, extracting first polygon coordinates...');
        coords = geojson.geometry.coordinates[0][0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
      } else {
        console.log('⚠️ Unknown GeoJSON structure. Type:', geojson.type, 'Geometry:', geojson.geometry?.type);
      }

      console.log('📍 Street View coords:', coords.length, 'points');
      if (coords.length >= 3) {
        const streetViewScreenshot = await Promise.race([
          generateStreetViewScreenshot(coords),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Street View timeout')), 90000))
        ]);
        if (streetViewScreenshot) screenshots.push(streetViewScreenshot);
      } else {
        console.warn('⚠️ Not enough coordinates for Street View screenshot');
      }
    }
  } catch (error) {
    console.warn('Street View screenshot generation failed:', error);
  }

  try {
    console.log('📐 Generating Survey Map screenshot...');

    // Use boundary points from Step 2 if available, otherwise extract from geojson
    let coords: Array<{lat: number; lng: number}> = [];

    if (boundaryPoints && boundaryPoints.length >= 3) {
      console.log('✅ Using boundary points from Step 2 (corner validation):', boundaryPoints.length, 'points');
      coords = boundaryPoints;
    } else if (geojson) {
      console.log('📐 No boundary points provided, extracting from geometry...');

      if (geojson.type === 'Polygon' && geojson.coordinates && geojson.coordinates.length > 0) {
        console.log('📐 Found Polygon type for survey map, extracting coordinates...');
        coords = geojson.coordinates[0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
        console.log('📐 Extracted coords from Polygon:', coords);
      } else if (geojson.type === 'MultiPolygon' && geojson.coordinates && geojson.coordinates.length > 0) {
        console.log('📐 Found MultiPolygon type for survey map, extracting first polygon coordinates...');
        coords = geojson.coordinates[0][0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
        console.log('📐 Extracted coords from MultiPolygon:', coords);
      } else if (geojson.geometry?.type === 'Polygon' && geojson.geometry.coordinates && geojson.geometry.coordinates.length > 0) {
        console.log('📐 Found Feature with Polygon geometry for survey map, extracting coordinates...');
        coords = geojson.geometry.coordinates[0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
        console.log('📐 Extracted coords from Feature Polygon:', coords);
      } else if (geojson.geometry?.type === 'MultiPolygon' && geojson.geometry.coordinates && geojson.geometry.coordinates.length > 0) {
        console.log('📐 Found Feature with MultiPolygon geometry for survey map, extracting first polygon coordinates...');
        coords = geojson.geometry.coordinates[0][0].map((c: number[]) => ({
          lat: c[1],
          lng: c[0]
        }));
        console.log('📐 Extracted coords from Feature MultiPolygon:', coords);
      } else {
        console.log('⚠️ Unknown GeoJSON structure for survey map. Type:', geojson.type, 'Geometry:', geojson.geometry?.type);
        console.log('⚠️ Full geojson object:', JSON.stringify(geojson, null, 2));
      }
    }

    console.log('📍 Survey Map coords:', coords.length, 'points');
    if (coords.length >= 3) {
      const surveyMapScreenshot = await Promise.race([
        generateSurveyMapScreenshot(coords),
        new Promise<null>((_, reject) => setTimeout(() => reject(new Error('Survey map timeout')), 20000))
      ]);
      if (surveyMapScreenshot) screenshots.push(surveyMapScreenshot);
    } else {
      console.warn('⚠️ Not enough coordinates for Survey Map screenshot');
    }
  } catch (error) {
    console.warn('Survey map screenshot generation failed:', error);
  }

  return screenshots;
}

// --- Nearby cities ---
async function generateNearbyCitiesMap(lat: number, lng: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=populated_place.city&filter=circle:${lng},${lat},80000&limit=20&apiKey=${GEOAPIFY_API_KEY}`
    );
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.features || data.features.length === 0) return null;

    const cityLoc: { lat: number; lng: number }[] = [];
    const cityNames: string[] = [];

    data.features.forEach((result: any) => {
      const geometryLat = result.geometry.coordinates[1];
      const geometryLng = result.geometry.coordinates[0];
      const cityName = result.properties.city || result.properties.name || "Unnamed City";
      cityLoc.push({ lat: geometryLat, lng: geometryLng });
      cityNames.push(cityName);
    });

    let mapCityUrl = `https://maps.geoapify.com/v1/staticmap?width=1200&height=600&zoom=8&apiKey=${GEOAPIFY_API_KEY}&marker=`;
    cityLoc.forEach((place, index) => {
      const marker =
        (index === 0 ? "" : "|") +
        `type:awesome;color:red;text:${index + 1};size:large;lonlat:${place.lng},${place.lat}`;
      mapCityUrl += marker;
    });

    return await makeSidebarScreenshot(mapCityUrl, "Cities Near Property", cityNames);
  } catch (error) {
    console.error("Error generating nearby cities map:", error);
    return null;
  }
}

// --- Nearby amenities ---
async function generateNearbyAmenitiesMap(lat: number, lng: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=commercial.supermarket,commercial.shopping_mall,commercial.department_store,catering.restaurant,entertainment.theme_park,education.university,sport.stadium,adult.casino,camping,airport&filter=circle:${lng},${lat},16093&limit=15&apiKey=${GEOAPIFY_API_KEY}`
    );
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.features || data.features.length === 0) return null;

    const amenityLoc: { lat: number; lng: number }[] = [];
    const amenityNames: string[] = [];

    data.features.forEach((result: any) => {
      const [lng, lat] = result.geometry.coordinates;
      const placeName = result.properties.name || result.properties.formatted || "Unnamed Place";
      amenityLoc.push({ lat, lng });
      amenityNames.push(placeName);
    });

    let mapAmenitiesUrl = `https://maps.geoapify.com/v1/staticmap?width=1200&height=600&zoom=12&apiKey=${GEOAPIFY_API_KEY}&marker=`;
    amenityLoc.forEach((place, index) => {
      const marker =
        (index === 0 ? "" : "|") +
        `type:awesome;color:%2319b8fc;text:${index + 1};size:large;lonlat:${place.lng},${place.lat}`;
      mapAmenitiesUrl += marker;
    });

    return await makeSidebarScreenshot(mapAmenitiesUrl, "Things to do Near Property", amenityNames);
  } catch (error) {
    console.error("Error generating nearby amenities map:", error);
    return null;
  }
}

// --- Sidebar screenshot helper ---
async function makeSidebarScreenshot(mapUrl: string, title: string, names: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      canvas.width = img.width + 300;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = "#93C493";
      ctx.fillRect(img.width, 0, 300, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 18px Arial";
      let y = 40;
      ctx.fillText(title, img.width + 10, y);
      y += 40;

      ctx.font = "14px Arial";
      names.forEach((name, index) => {
        const truncatedName = name.length > 25 ? name.substring(0, 22) + "..." : name;
        ctx.fillText(`${index + 1}. ${truncatedName}`, img.width + 15, y);
        y += 25;
      });

      const screenshot = canvas.toDataURL("image/png");
      resolve(screenshot);
    };

    img.onerror = () => resolve(null);
    img.src = mapUrl;
  });
}

// --- Single screenshot with polygon ---
async function generateSingleScreenshot({
  lat,
  lng,
  zoom,
  bearing,
  pitch,
  geomWkt,
}: {
  lat: number;
  lng: number;
  zoom: number;
  bearing: number;
  pitch: number;
  geomWkt?: string;
}): Promise<string | null> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn(`⏰ Screenshot timeout (15s) for view: zoom=${zoom}, bearing=${bearing}, pitch=${pitch}`);
      resolve(null);
    }, 15000); // Reduced to 15 second timeout per screenshot
    
    const container = document.createElement("div");
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = '1200px';
    container.style.height = '600px';
    container.style.zIndex = '-1000';
    container.style.visibility = 'hidden'; // Ensure it's completely hidden
    document.body.appendChild(container);

    // Add error boundary for React component
    let cleanupExecuted = false;
    const cleanup = () => {
      if (cleanupExecuted) return;
      cleanupExecuted = true;
      
      clearTimeout(timeout);
      try {
        if (root) root.unmount();
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      } catch (cleanupError) {
        console.warn('Cleanup error:', cleanupError);
      }
    };

    const root = createRoot(container);
    
    try {
      root.render(
        React.createElement(ScreenshotMap, {
          geomWkt,
          lat,
          lng,
          zoom,
          bearing,
          pitch,
          onReady: (dataUrl) => {
            cleanup();
            console.log(`📸 Screenshot ready: zoom=${zoom}, bearing=${bearing}, pitch=${pitch}, dataUrl length=${dataUrl?.length || 0}`);
            resolve(dataUrl || null);
          },
        })
      );
    } catch (renderError) {
      console.error('Error rendering screenshot component:', renderError);
      cleanup();
      resolve(null);
    }
  });
}

// --- Zoom level logic ---
function calculateZoomByLotSize(acres: number): number {
  // Dynamic zoom based on acreage - exact mapping as specified
  if (acres < 1) return 16;
  if (acres < 3) return 15;
  if (acres < 10) return 14;
  if (acres < 25) return 13;
  if (acres < 50) return 12;
  return 11; // 50+ acres
}