import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

const PropertyMap = ({ lat, lng, title, address, polygonCoords }: { 
  lat: number; 
  lng: number; 
  title: string;
  address: string;
  polygonCoords?: number[][];
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;

    console.log('Initializing Mapbox map...');
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      zoom: 15,
      bearing: 0,
      pitch: 0,
      preserveDrawingBuffer: true,
      interactive: interactive // initially false
    });

    map.on('load', () => {
      console.log('Mapbox map loaded successfully');
      
      // Add a single marker for the property location
      new mapboxgl.Marker({
        color: '#329cf9',
        scale: 1.2
      })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="text-align: center; padding: 8px;">
                <strong>${title}</strong><br>
                <small>${address}</small>
              </div>
            `)
        )
        .addTo(map);
      
      // Add polygon overlay if coordinates exist
      if (polygonCoords && polygonCoords.length > 0) {
        console.log('Adding polygon overlay to PropertyMap:', polygonCoords);
        
        map.addSource('property-boundary', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [polygonCoords]
            }
          }
        });

        // Add fill layer
        map.addLayer({
          id: 'property-fill',
          type: 'fill',
          source: 'property-boundary',
          paint: {
            'fill-color': '#4CAF50',
            'fill-opacity': 0.3
          }
        });

        // Add outline layer
        map.addLayer({
          id: 'property-outline',
          type: 'line',
          source: 'property-boundary',
          paint: {
            'line-color': '#2E7D32',
            'line-width': 3,
            'line-opacity': 0.8
          }
        });

        // Fit map to polygon bounds
        const bounds = polygonCoords.reduce(
          (b, coord) => b.extend(coord as [number, number]), 
          new mapboxgl.LngLatBounds(polygonCoords[0], polygonCoords[0])
        );
        
        // Calculate optimal padding based on polygon size
        const boundsWidth = bounds.getEast() - bounds.getWest();
        const boundsHeight = bounds.getNorth() - bounds.getSouth();
        const maxDimension = Math.max(boundsWidth, boundsHeight);
        
        // Dynamic padding: smaller properties need more padding, larger ones need less
        let padding = 60; // default padding for PropertyMap
        if (maxDimension < 0.001) padding = 100; // very small properties
        else if (maxDimension < 0.005) padding = 80; // small properties  
        else if (maxDimension < 0.01) padding = 60; // medium properties
        else if (maxDimension < 0.05) padding = 40; // large properties
        else padding = 20; // very large properties
        
        map.fitBounds(bounds, { 
          padding: {
            top: padding,
            bottom: padding,
            left: padding,
            right: padding
          },
          maxZoom: 18, // prevent over-zooming
          duration: 1000 // smooth animation
        });
      }
    });

    map.on('error', (e) => {
      console.error('Mapbox map error:', e);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [lat, lng, interactive, title, address, polygonCoords]);

  const handleClick = () => {
    setInteractive(true);
  };

  return (
    <div className="relative w-full h-[700px] rounded-lg overflow-hidden shadow-lg">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Overlay Button */}
      {!interactive && (
        <div
          onClick={handleClick}
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-[1000]"
        >
          <div className="bg-white backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border-2 border-blue-500 animate-fade">
            <span className="text-gray-700 font-medium">Click to interact with map</span>
          </div>
        </div>
      )}
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-md">
        <span className="text-base font-medium">
          {lat}, {lng}, {address}
        </span>
      </div>
      
      <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-md">
        <span className="text-[#329DF9] text-base font-medium cursor-pointer">View</span>
      </div>
    </div>
  );
};

export default PropertyMap;