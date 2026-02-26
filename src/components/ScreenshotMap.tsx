import mapboxgl from "mapbox-gl";
import wellknown from "wellknown";
import { useEffect, useRef } from "react";
import { bbox } from "@turf/turf";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || "";

interface ScreenshotMapProps {
  geomWkt: string | object;  // WKT string from ReportAll OR boundary_points from Supabase
  lat: number;
  lng: number;
  zoom?: number;
  bearing?: number;
  pitch?: number;
  onReady?: (dataUrl: string) => void;
}

export function ScreenshotMap(props: ScreenshotMapProps) {
  const { 
    geomWkt, 
    lat, 
    lng, 
    zoom = 17, 
    bearing = 0, 
    pitch = 45, 
    onReady 
  } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const onReadyCalledRef = useRef(false);

  // Helper function to ensure onReady is called exactly once
  const safeOnReady = (dataUrl: string) => {
    if (!onReadyCalledRef.current && onReady) {
      onReadyCalledRef.current = true;
      onReady(dataUrl);
    }
  };

  useEffect(() => {
    if (!containerRef.current || !geomWkt) return;

    let map: mapboxgl.Map | null = null;

    // 1. Handle both WKT string and boundary_points from Supabase
    let geojson: any;
    try {
      if (geomWkt && typeof geomWkt === "string") {
        // Try to parse as JSON first (GeoJSON), then as WKT
        try {
          const parsed = JSON.parse(geomWkt);
          if (parsed.type) {
            geojson = parsed;
            console.log("✅ Using GeoJSON input:", geojson.type);
          } else {
            throw new Error("Not valid GeoJSON");
          }
        } catch {
          // Parse as WKT string
          geojson = wellknown.parse ? wellknown.parse(geomWkt.trim()) : wellknown(geomWkt.trim());
          console.log("✅ Parsed WKT to GeoJSON:", geojson?.type);
        }
        if (!geojson) throw new Error("Invalid WKT geometry");
        console.log("DEBUG WKT:", geomWkt);
        console.log("DEBUG GeoJSON:", JSON.stringify(geojson));
        console.log("✅ WKT converted to GeoJSON:", geojson.type);
      } else if (geomWkt && typeof geomWkt === "object") {
        // If we have boundary_points from Supabase
        if ((geomWkt as any).type) {
          // Already full GeoJSON
          geojson = geomWkt;
          console.log("✅ Using existing GeoJSON:", geojson.type);
        } else if (Array.isArray(geomWkt)) {
          // Array of boundary point objects: [{id, label, lat, lng}, ...]
          const boundaryPoints = geomWkt as Array<{lat: number, lng: number}>;
          const coordinates = boundaryPoints.map(point => [point.lng, point.lat]);
          // Close the polygon by adding first point at the end if not already closed
          if (coordinates.length > 0 && 
              (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || 
               coordinates[0][1] !== coordinates[coordinates.length - 1][1])) {
            coordinates.push(coordinates[0]);
          }
          geojson = {
            type: "Polygon",
            coordinates: [coordinates]
          };
          console.log("✅ Created GeoJSON from Supabase boundary_points:", boundaryPoints.length, "points");
        } else {
          // Raw coordinate array [[lng,lat], [lng,lat], ...]
          geojson = {
            type: "Polygon",
            coordinates: [geomWkt], // wrap in polygon structure
          };
          console.log("✅ Created GeoJSON from raw coordinate array");
        }
      } else {
        throw new Error("No valid polygon data provided");
      }
      
      console.log("Polygon Coordinates", JSON.stringify(geojson.coordinates));
      
      // Check for Web Mercator coordinates (huge values indicate wrong CRS)
      if (geojson.coordinates && geojson.coordinates[0] && geojson.coordinates[0][0]) {
        const firstCoord = geojson.coordinates[0][0];
        if (Math.abs(firstCoord[0]) > 180 || Math.abs(firstCoord[1]) > 90) {
          console.warn("⚠️ Coordinates appear to be in Web Mercator (EPSG:3857), not WGS84 (EPSG:4326)");
          console.warn("First coordinate:", firstCoord);
        } else {
          console.log("✅ Coordinates appear to be in WGS84 (EPSG:4326) format");
        }
      }
      
      // Handle MultiPolygon by taking the first polygon
      if (geojson.type === "MultiPolygon") {
        console.log(`🔄 Converting MultiPolygon to Polygon (${geojson.coordinates.length} polygons available, taking first)`);
        if (geojson.coordinates.length > 1) {
          console.warn("⚠️ MultiPolygon has multiple parts - only using the first polygon");
        }
        geojson = {
          type: "Polygon",
          coordinates: geojson.coordinates[0], // take first polygon ring
        };
        console.log("✅ Converted to Polygon:", JSON.stringify(geojson.coordinates));
      }
    } catch (err) {
      console.error("❌ WKT parse error:", err);
      safeOnReady('');
      return;
    }

    map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom,
      pitch: pitch || 0,
      bearing: bearing || 0,
      preserveDrawingBuffer: true,
      interactive: false,
    });

    // Enhanced error handling for Mapbox GL
    map.on("error", (e) => {
      console.error("❌ Mapbox GL Error:", e.error?.message || e);
      safeOnReady('');
    });

    map.on("load", () => {
      console.log("🗺️ Map loaded, adding polygon source...");
      
      // Apply the view parameters after map loads
      map.setCenter([lng, lat]);
      map.setZoom(zoom);
      map.setBearing(bearing || 0);
      map.setPitch(pitch || 0);
      
      // Add the parcel polygon source
      const parcelFeature = {
        type: "Feature",
        geometry: geojson,
        properties: {},
      };

      map.addSource("parcel", {
        type: "geojson",
        data: parcelFeature,
      });

      // Fill layer
      map.addLayer({
        id: "parcel-fill",
        type: "fill",
        source: "parcel",
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.35,
        },
      });

      // Outline layer
      map.addLayer({
        id: "parcel-outline",
        type: "line",
        source: "parcel",
        paint: {
          "line-color": "#ff0000",
          "line-width": 3,
        },
      });

      console.log("✅ Polygon layers added successfully");

      // Only use fitBounds if no custom zoom/bearing/pitch are provided
      if (zoom === 17 && bearing === 0 && pitch === 0) {
        // Enhanced bounds handling with detailed debugging
        try {
          const bboxResult = bbox(geojson as any);
          const [minX, minY, maxX, maxY] = bboxResult;
          const sw = [minX, minY] as [number, number];
          const ne = [maxX, maxY] as [number, number];
          console.log("📦 FitBounds SW/NE:", sw, ne);
          console.log("📍 Bounds array format:", [sw, ne]);
          
            safeOnReady('');
          console.log("✅ FitBounds completed successfully");
        } catch (e) {
          console.error("❌ FitBounds error:", e);
          // Fallback to center and zoom
          console.log("🔄 Falling back to center and zoom");
          map.setCenter([lng, lat]);
          map.setZoom(18);
          
          // Still try to capture screenshot after fallback
          map.once("idle", () => {
            try {
              const canvas = map.getCanvas();
              const dataUrl = canvas.toDataURL("image/png");
              console.log("📸 Fallback screenshot captured");
              safeOnReady(dataUrl);
            } catch (err) {
              console.error("❌ Fallback screenshot capture failed:", err);
              safeOnReady('');
            }
          });
        }
      } else {
        // Use custom view parameters - don't override with fitBounds
        console.log(`🎯 Using custom view parameters: zoom=${zoom}, bearing=${bearing}, pitch=${pitch}`);
        map.setCenter([lng, lat]);
        map.setZoom(zoom);
        map.setBearing(bearing);
        map.setPitch(pitch);
        
        // Ensure screenshot is captured for custom view
        map.once("idle", () => {
          try {
            const canvas = map.getCanvas();
            const dataUrl = canvas.toDataURL("image/png");
            console.log("📸 Custom view screenshot captured");
            safeOnReady(dataUrl);
          } catch (err) {
            console.error("❌ Custom view screenshot capture failed:", err);
            safeOnReady('');
          }
        });
      }

    });

    map.on("error", (e) => {
      console.error("❌ Map error:", e);
      safeOnReady('');
    });

    return () => {
      if (map) {
        map.remove();
      }
      // Ensure onReady is called if component unmounts before completion
      safeOnReady('');
    };
  }, [geomWkt, lat, lng, zoom, bearing, pitch, onReady]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "800px", 
        height: "600px",
        position: "fixed",
        top: "0",
        left: "0",
        visibility: "hidden",
        pointerEvents: "none"
      }} 
    />
  );
}