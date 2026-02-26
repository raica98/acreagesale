const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "";

const LEAFLET_TILE_URLS = {
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
};

interface PolygonCoords {
  lat: number;
  lng: number;
}

function haversineDistanceFeet(from: PolygonCoords, to: PolygonCoords): number {
  const R = 6371000;
  const phi1 = (from.lat * Math.PI) / 180;
  const phi2 = (to.lat * Math.PI) / 180;
  const dphi = ((to.lat - from.lat) * Math.PI) / 180;
  const dlambda = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(dphi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda / 2) ** 2;
  const meters = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return meters * 3.28084;
}

function computeBearing(from: PolygonCoords, to: PolygonCoords): number {
  const dLon = ((to.lng - from.lng) * Math.PI) / 180;
  const lat1 = (from.lat * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function calculateMapBounds(polygon: PolygonCoords[]): {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  centerLat: number;
  centerLng: number;
} {
  const lats = polygon.map((p) => p.lat);
  const lngs = polygon.map((p) => p.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latSpan = maxLat - minLat;
  const lngSpan = maxLng - minLng;
  const paddingFactor = 0.25;

  return {
    minLat: minLat - latSpan * paddingFactor,
    maxLat: maxLat + latSpan * paddingFactor,
    minLng: minLng - lngSpan * paddingFactor,
    maxLng: maxLng + lngSpan * paddingFactor,
    centerLat: (minLat + maxLat) / 2,
    centerLng: (minLng + maxLng) / 2,
  };
}

function latLngToPixel(
  lat: number,
  lng: number,
  bounds: any,
  width: number,
  height: number
): { x: number; y: number } {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * width;
  const y =
    ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * height;
  return { x, y };
}

function calculateZoomLevel(bounds: any, width: number, height: number): number {
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 21;

  function latRad(lat: number) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx: number, worldPx: number, fraction: number) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const latFraction = (latRad(bounds.maxLat) - latRad(bounds.minLat)) / Math.PI;
  const lngDiff = bounds.maxLng - bounds.minLng;
  const lngFraction = ((lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360);

  const latZoom = zoom(height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX) - 0.5;
}

function getBoundsFromCenterZoom(
  centerLat: number,
  centerLng: number,
  zoom: number,
  width: number,
  height: number
): any {
  const scale = Math.pow(2, zoom);
  const worldSize = 256 * scale;

  function project(lat: number, lng: number) {
    const siny = Math.sin((lat * Math.PI) / 180);
    const x = (lng + 180) / 360 * worldSize;
    const y = (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)) * worldSize;
    return { x, y };
  }

  function unproject(x: number, y: number) {
    const lng = (x / worldSize) * 360 - 180;
    const latRadians = (Math.PI / 2) - 2 * Math.atan(Math.exp((y / worldSize - 0.5) * 2 * Math.PI));
    const lat = latRadians * 180 / Math.PI;
    return { lat, lng };
  }

  const centerPoint = project(centerLat, centerLng);
  const topLeft = unproject(centerPoint.x - width / 2, centerPoint.y - height / 2);
  const bottomRight = unproject(centerPoint.x + width / 2, centerPoint.y + height / 2);

  return {
    minLat: bottomRight.lat,
    maxLat: topLeft.lat,
    minLng: topLeft.lng,
    maxLng: bottomRight.lng,
  };
}

async function fetchLeafletSatelliteMap(
  bounds: any,
  width = 1200,
  height = 600
): Promise<{ dataUrl: string; actualBounds: any; imageWidth: number; imageHeight: number } | null> {
  const zoom = Math.round(calculateZoomLevel(bounds, width, height));
  const centerLat = bounds.centerLat;
  const centerLng = bounds.centerLng;

  const imageWidth = width;
  const imageHeight = height;

  console.log(`📐 Leaflet: zoom=${zoom}, center=${centerLat},${centerLng}`);
  console.log(`📐 Image dimensions: ${imageWidth}x${imageHeight}`);

  const actualBounds = bounds;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    function latLngToTile(lat: number, lng: number, zoom: number) {
      const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
      const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
      return { x, y };
    }

    function latLngToPixel(lat: number, lng: number, zoom: number) {
      const scale = Math.pow(2, zoom);
      const worldCoordX = (lng + 180) / 360 * 256 * scale;
      const worldCoordY = (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * 256 * scale;
      return { x: worldCoordX, y: worldCoordY };
    }

    const centerPixel = latLngToPixel(centerLat, centerLng, zoom);
    const topLeftPixel = {
      x: centerPixel.x - imageWidth / 2,
      y: centerPixel.y - imageHeight / 2
    };

    const minTile = {
      x: Math.floor(topLeftPixel.x / 256),
      y: Math.floor(topLeftPixel.y / 256)
    };
    const maxTile = {
      x: Math.floor((topLeftPixel.x + imageWidth) / 256),
      y: Math.floor((topLeftPixel.y + imageHeight) / 256)
    };

    const tilePromises = [];
    for (let x = minTile.x; x <= maxTile.x; x++) {
      for (let y = minTile.y; y <= maxTile.y; y++) {
        tilePromises.push(
          new Promise<{ img: HTMLImageElement; x: number; y: number }>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve({ img, x, y });
            img.onerror = () => reject(new Error(`Failed to load tile ${x},${y}`));
            img.src = LEAFLET_TILE_URLS.satellite.replace('{z}', zoom.toString()).replace('{x}', x.toString()).replace('{y}', y.toString());
          })
        );
      }
    }

    const tiles = await Promise.all(tilePromises);

    tiles.forEach(({ img, x, y }) => {
      const tilePixelX = x * 256 - topLeftPixel.x;
      const tilePixelY = y * 256 - topLeftPixel.y;
      ctx.drawImage(img, tilePixelX, tilePixelY);
    });

    const dataUrl = canvas.toDataURL('image/png');

    return {
      dataUrl,
      actualBounds,
      imageWidth,
      imageHeight
    };
  } catch (error) {
    console.error('Leaflet map fetch error:', error);
    return null;
  }
}

export async function generateSurveyMapScreenshot(
  polygon: PolygonCoords[]
): Promise<string | null> {
  console.log("📐 Generating Survey Map screenshot...");
  console.log("📐 Polygon coordinates received:", JSON.stringify(polygon, null, 2));

  // Leaflet doesn't require API token

  if (polygon.length < 3) {
    console.error("Invalid polygon - need at least 3 points");
    return null;
  }

  const bounds = calculateMapBounds(polygon);
  console.log("📐 Calculated bounds:", bounds);
  const mapWidth = 1200;
  const mapHeight = 600;

  const mapResult = await fetchLeafletSatelliteMap(
    bounds,
    mapWidth,
    mapHeight
  );
  if (!mapResult) {
    console.error("❌ Failed to fetch base map");
    return null;
  }

  const { dataUrl: baseMapDataUrl, actualBounds, imageWidth, imageHeight } = mapResult;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      console.log(`📐 Loaded image dimensions: ${img.width}x${img.height}`);
      console.log(`📐 Expected image dimensions: ${imageWidth}x${imageHeight}`);
      console.log(`📐 Canvas dimensions: ${mapWidth}x${mapHeight}`);
      console.log(`📐 Using actual bounds for coordinate mapping:`, actualBounds);

      const canvas = document.createElement("canvas");
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

      const zoom = Math.round(calculateZoomLevel(actualBounds, imageWidth, imageHeight));
      const centerLat = actualBounds.centerLat;
      const centerLng = actualBounds.centerLng;

      function latLngToPixelMercator(lat: number, lng: number) {
        const scale = Math.pow(2, zoom);
        const worldCoordX = (lng + 180) / 360 * 256 * scale;
        const worldCoordY = (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * 256 * scale;

        const centerWorldX = (centerLng + 180) / 360 * 256 * scale;
        const centerWorldY = (1 - Math.log(Math.tan(centerLat * Math.PI / 180) + 1 / Math.cos(centerLat * Math.PI / 180)) / Math.PI) / 2 * 256 * scale;

        return {
          x: worldCoordX - centerWorldX + imageWidth / 2,
          y: worldCoordY - centerWorldY + imageHeight / 2
        };
      }

      const polygonPixels = polygon.map((p) =>
        latLngToPixelMercator(p.lat, p.lng)
      );

      console.log(`📐 Sample pixel coordinates:`, polygonPixels.slice(0, 2));

      ctx.strokeStyle = "red";
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(polygonPixels[0].x, polygonPixels[0].y);
      for (let i = 1; i < polygonPixels.length; i++) {
        ctx.lineTo(polygonPixels[i].x, polygonPixels[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      for (let i = 0; i < polygon.length; i++) {
        const p1 = polygon[i];
        const p2 = polygon[(i + 1) % polygon.length];
        const distFt = haversineDistanceFeet(p1, p2);
        const bearing = computeBearing(p1, p2);

        const midLat = (p1.lat + p2.lat) / 2;
        const midLng = (p1.lng + p2.lng) / 2;
        const midPixel = latLngToPixelMercator(midLat, midLng);

        let rotation = 0;
        if (bearing > 45 && bearing < 135) {
          rotation = 90;
        } else if (bearing > 225 && bearing < 315) {
          rotation = -90;
        }

        ctx.save();
        ctx.translate(midPixel.x, midPixel.y);
        ctx.rotate((rotation * Math.PI) / 180);

        const labelText = `${distFt.toFixed(1)} ft`;

        const baseFontSize = 18;
        const minFontSize = 12;
        const maxFontSize = 24;
        const fontSize = Math.max(minFontSize, Math.min(maxFontSize, baseFontSize * Math.log10(distFt + 10) / 2));

        ctx.font = `bold ${fontSize}px Arial`;
        const textWidth = ctx.measureText(labelText).width;

        const basePadding = 10;
        const baseBoxHeight = 30;
        const padding = basePadding * (fontSize / baseFontSize);
        const boxHeight = baseBoxHeight * (fontSize / baseFontSize);
        const boxWidth = textWidth + padding * 2;

        ctx.fillStyle = "black";
        ctx.fillRect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2 * (fontSize / baseFontSize);
        ctx.strokeRect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labelText, 0, 0);

        ctx.restore();
      }

      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, 100);
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Property Boundary Survey", canvas.width / 2, 60);

      console.log("✅ Survey map screenshot generated");
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      console.error("❌ Failed to load base map image");
      resolve(null);
    };
    img.src = baseMapDataUrl;
  });
}
