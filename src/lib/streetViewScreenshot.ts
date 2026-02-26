const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

interface PolygonCoords {
  lat: number;
  lng: number;
}

function centroid(polygon: PolygonCoords[]): PolygonCoords {
  const sum = polygon.reduce(
    (acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }),
    { lat: 0, lng: 0 }
  );
  return { lat: sum.lat / polygon.length, lng: sum.lng / polygon.length };
}

function computeHeading(from: PolygonCoords, to: PolygonCoords): number {
  const dLon = ((to.lng - from.lng) * Math.PI) / 180;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function haversineDistance(
  from: PolygonCoords,
  to: PolygonCoords
): number {
  const R = 6371000;
  const phi1 = (from.lat * Math.PI) / 180;
  const phi2 = (to.lat * Math.PI) / 180;
  const dphi = ((to.lat - from.lat) * Math.PI) / 180;
  const dlambda = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(dphi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function getStreetViewMetadata(
  lat: number,
  lng: number,
  radius = 50
): Promise<PolygonCoords | null> {
  if (!GOOGLE_API_KEY) {
    console.warn("⚠️ Google API key not configured");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&radius=${radius}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      return { lat: data.location.lat, lng: data.location.lng };
    }
  } catch (error) {
    console.error("Street View metadata check failed:", error);
  }
  return null;
}

async function getStreetViewImage(
  lat: number,
  lng: number,
  heading: number,
  fov = 90,
  pitch = -10,
  size = "1200x600"
): Promise<string | null> {
  if (!GOOGLE_API_KEY) {
    console.warn("⚠️ Google API key not configured");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&fov=${fov}&heading=${heading}&pitch=${pitch}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;

        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 64;
          canvas.height = 64;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0, 64, 64);
          const imageData = ctx.getImageData(0, 0, 64, 64);
          const data = imageData.data;
          let sum = 0;
          for (let i = 0; i < data.length; i += 4) {
            sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
          }
          const mean = sum / (data.length / 4);

          if (mean > 240) {
            console.warn("⚠️ Placeholder detected — no real Street View imagery");
            resolve(null);
          } else {
            resolve(base64);
          }
        };
        img.onerror = () => resolve(null);
        img.src = base64;
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Street View image fetch failed:", error);
    return null;
  }
}

function addWatermark(imageDataUrl: string, text: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(imageDataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0);

      const fontSize = Math.floor(img.width * 0.03);
      ctx.font = `bold ${fontSize}px Arial`;
      const textWidth = ctx.measureText(text).width;
      const textHeight = fontSize;
      const barHeight = textHeight + 20;

      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, img.height - barHeight, img.width, barHeight);

      ctx.fillStyle = "white";
      ctx.fillText(
        text,
        (img.width - textWidth) / 2,
        img.height - barHeight / 2 + textHeight / 3
      );

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(imageDataUrl);
    img.src = imageDataUrl;
  });
}

async function getAngledSatelliteImage(
  lat: number,
  lng: number,
  zoom = 17,
  pitch = 60,
  bearing = 0
): Promise<string | null> {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!MAPBOX_TOKEN) {
    console.warn("⚠️ Mapbox token not configured, falling back to flat satellite");
    return getSatelliteImage(lat, lng, zoom);
  }

  try {
    const mapboxgl = await import("mapbox-gl");
    mapboxgl.default.accessToken = MAPBOX_TOKEN;

    const container = document.createElement("div");
    container.style.width = "1200px";
    container.style.height = "600px";
    container.style.position = "absolute";
    container.style.left = "-9999px";
    document.body.appendChild(container);

    const map = new mapboxgl.default.Map({
      container,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom,
      pitch,
      bearing,
      interactive: false,
      preserveDrawingBuffer: true,
    });

    return new Promise((resolve) => {
      map.on("load", () => {
        setTimeout(() => {
          const canvas = map.getCanvas();
          const dataUrl = canvas.toDataURL("image/png");
          map.remove();
          document.body.removeChild(container);
          resolve(dataUrl);
        }, 2000);
      });

      map.on("error", () => {
        map.remove();
        document.body.removeChild(container);
        getSatelliteImage(lat, lng, zoom).then(resolve);
      });
    });
  } catch (error) {
    console.error("Angled satellite capture failed:", error);
    return getSatelliteImage(lat, lng, zoom);
  }
}

async function getSatelliteImage(
  lat: number,
  lng: number,
  zoom = 19
): Promise<string | null> {
  if (!GOOGLE_API_KEY) {
    console.warn("⚠️ Google API key not configured");
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=1200x600&maptype=satellite&format=png&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 1200;
          canvas.height = 600;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(base64);
            return;
          }
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 1200, 600);
          ctx.drawImage(img, 0, 0, 1200, 600);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = () => resolve(base64);
        img.src = base64;
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Satellite image fetch failed:", error);
    return null;
  }
}

async function generateAIStreetView(
  lat: number,
  lng: number,
  bearing: number = 0
): Promise<string | null> {
  console.log("🎨 Generating AI street view from satellite image using DALL-E...");

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase not configured");
    return null;
  }

  console.log(`📸 First, capturing angled satellite image facing bearing ${bearing}° to show terrain and surroundings...`);
  const satelliteImage = await getAngledSatelliteImage(lat, lng, 17, 60, bearing);

  if (!satelliteImage) {
    console.warn("⚠️ Failed to capture satellite image");
    return null;
  }

  console.log("✅ Satellite image captured, sending to DALL-E for transformation...");

  try {
    const apiUrl = `${supabaseUrl}/functions/v1/generate-ai-streetview`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ lat, lng, satelliteImage }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Edge function error:", errorData);
      return null;
    }

    const data = await response.json();
    console.log("Edge Function response:", { hasImage: !!data.imageDataUrl, dataKeys: Object.keys(data) });
    if (data.imageDataUrl) {
      console.log("✅ AI street view generated successfully from satellite image");
      console.log("Image data URL length:", data.imageDataUrl.length);
      return data.imageDataUrl;
    }

    return null;
  } catch (error) {
    console.error("Error generating AI street view:", error);
    return null;
  }
}

function simulateGroundView(satelliteDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(satelliteDataUrl);
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      const srcPoints = [
        { x: 0, y: 0 },
        { x: img.width, y: 0 },
        { x: 0, y: img.height },
        { x: img.width, y: img.height },
      ];

      const horizon = img.height * 0.35;
      const dstPoints = [
        { x: img.width * 0.1, y: horizon },
        { x: img.width * 0.9, y: horizon },
        { x: 0, y: img.height },
        { x: img.width, y: img.height },
      ];

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const ty = y / img.height;
          const tx = x / img.width;

          const top = {
            x: srcPoints[0].x * (1 - tx) + srcPoints[1].x * tx,
            y: srcPoints[0].y * (1 - tx) + srcPoints[1].y * tx,
          };
          const bottom = {
            x: srcPoints[2].x * (1 - tx) + srcPoints[3].x * tx,
            y: srcPoints[2].y * (1 - tx) + srcPoints[3].y * tx,
          };

          const srcX = top.x * (1 - ty) + bottom.x * ty;
          const srcY = top.y * (1 - ty) + bottom.y * ty;

          if (srcX >= 0 && srcX < img.width && srcY >= 0 && srcY < img.height) {
            ctx.drawImage(img, srcX, srcY, 1, 1, x, y, 1, 1);
          }
        }
      }

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(satelliteDataUrl);
    img.src = satelliteDataUrl;
  });
}

export async function generateStreetViewScreenshot(
  polygon: PolygonCoords[]
): Promise<string | null> {
  console.log("📸 Generating Street View screenshot...");

  if (!GOOGLE_API_KEY) {
    console.warn("⚠️ Google API key not set - skipping Street View screenshot");
    return null;
  }

  if (polygon.length < 3) {
    console.error("Invalid polygon - need at least 3 points");
    return null;
  }

  const center = centroid(polygon);
  console.log(`📍 Property centroid: ${center.lat}, ${center.lng}`);

  let bestMidpoint: PolygonCoords | null = null;
  let bestSvLocation: PolygonCoords | null = null;
  let bestDistance = Infinity;

  for (let i = 0; i < polygon.length - 1; i++) {
    const p1 = polygon[i];
    const p2 = polygon[i + 1];
    const midpoint = {
      lat: (p1.lat + p2.lat) / 2,
      lng: (p1.lng + p2.lng) / 2,
    };

    const svLocation = await getStreetViewMetadata(midpoint.lat, midpoint.lng);
    if (svLocation) {
      const dist = haversineDistance(midpoint, svLocation);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestMidpoint = midpoint;
        bestSvLocation = svLocation;
      }
    }
  }

  if (!bestMidpoint) {
    console.warn("⚠️ No Street View near edges — using centroid");
    bestMidpoint = center;
    bestSvLocation = await getStreetViewMetadata(center.lat, center.lng, 100);
  }

  const heading = computeHeading(bestMidpoint, center);
  console.log(`🎯 Heading toward centroid: ${heading.toFixed(2)}°`);

  let finalImage: string | null = null;

  if (bestSvLocation) {
    finalImage = await getStreetViewImage(
      bestSvLocation.lat,
      bestSvLocation.lng,
      heading
    );
    if (finalImage) {
      finalImage = await addWatermark(finalImage, "Street View");
      console.log("✅ Street View screenshot captured");
    } else {
      console.warn("⚠️ Street View invalid, using satellite fallback");
    }
  }

  if (!finalImage) {
    console.log("🎨 No Street View available, trying AI generation...");
    const aiImage = await generateAIStreetView(center.lat, center.lng, heading);
    if (aiImage) {
      finalImage = await addWatermark(aiImage, "AI Generated Street View");
      console.log("✅ AI street view added to screenshots");
    }
  }

  if (!finalImage) {
    console.log("🛰 AI generation failed, using satellite fallback");
    const satImage = await getSatelliteImage(center.lat, center.lng);
    if (satImage) {
      const groundView = await simulateGroundView(satImage);
      finalImage = await addWatermark(groundView, "Simulated Ground View");
    }
  }

  return finalImage;
}
