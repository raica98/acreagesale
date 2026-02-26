import React, { useState, useEffect, useRef } from "react";

let scriptsLoaded = false;
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYWNyZWFnZXNhbGUiLCJhIjoiY2x2b3F6ZHNyMHIwcjJqcWc5N3ptdGMyeSJ9.sqvNdealwOStkB_Fupr_YA";

// Use Mapbox Geolocation API for more accurate positioning
async function getAccurateLocation() {
  try {
    const res = await fetch(
      `https://api.mapbox.com/geolocate/v1/geolocate?access_token=${MAPBOX_ACCESS_TOKEN}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    console.log("📍 Mapbox Geo Fix:", data);
    return {
      lat: data.latitude,
      lon: data.longitude,
      acc: data.accuracy,
    };
  } catch (err) {
    console.error("❌ Mapbox Geolocation failed", err);
    return null;
  }
}

interface PropertyARProps {
  property: {
    latitude?: number | null;
    longitude?: number | null;
    title: string;
    boundaryPoints: Array<{
      id: string;
      label: string;
      lat: number;
      lng: number;
    }>;
  };
}

export default function PropertyAR({ property }: PropertyARProps) {
  const [showAR, setShowAR] = useState(false);
  const arContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAR) return;

    const loadScript = (src: string) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve("already loaded");
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });

    const initScene = (userLat: number, userLon: number, accuracy: number) => {
      // Use boundary points from property
      const boundaryPoints = property.boundaryPoints;
      
      console.log('AR Scene - Using boundary points:', boundaryPoints);

      const avgLat =
        boundaryPoints.reduce((sum, p) => sum + p.lat, 0) /
        boundaryPoints.length;
      const avgLon =
        boundaryPoints.reduce((sum, p) => sum + p.lng, 0) /
        boundaryPoints.length;

      if (arContainerRef.current) {
        arContainerRef.current.innerHTML = `
          <a-scene
            vr-mode-ui="enabled: false"
            embedded
            arjs="sourceType: webcam; gpsMinDistance: 0.1; debugUIEnabled: true; videoTexture: true; trackingMethod: best;"
            renderer="logarithmicDepthBuffer: true; antialias: true;"
            style="position:absolute; top:0; left:0; width:100%; height:100%; background: transparent;"
            background="transparent: true"
          >
            <a-camera 
              gps-camera 
              rotation-reader 
              look-controls="enabled: true" 
              wasd-controls="enabled: false"
              position="0 1.6 0">
            </a-camera>

            <!-- Live GPS Status Display -->
            <a-text value="🔴 LIVE AR VIEW"
                    position="0 4 -5"
                    color="red"
                    scale="2 2 2"
                    align="center"
                    look-at="[gps-camera]">
            </a-text>
            
            <a-text value="GPS Accuracy: ±${accuracy}m"
                    position="0 3.5 -5"
                    color="yellow"
                    scale="1.5 1.5 1.5"
                    align="center"
                    look-at="[gps-camera]">
            </a-text>
            
            <a-text value="User: ${userLat.toFixed(6)}, ${userLon.toFixed(6)}"
                    position="0 3 -5"
                    color="cyan"
                    scale="1 1 1"
                    align="center"
                    look-at="[gps-camera]">
            </a-text>

            <!-- Property boundary markers with live positioning -->
            ${boundaryPoints
              .map(
                (point, i) => `
              <!-- Live AR Marker for ${point.label} -->
              <a-entity gps-entity-place="latitude: ${point.lat}; longitude: ${point.lng};">
                <!-- Red glowing cylinder marker -->
                <a-cylinder 
                  radius="0.5" 
                  height="0.1" 
                  color="red"
                  id="marker-${point.id}"
                  position="0 0 0"
                  material="color: red; opacity: 0.8; transparent: true;"
                  animation="property: rotation; to: 0 360 0; loop: true; dur: 4000">
                </a-cylinder>
                
                <!-- Floating label above marker -->
                <a-text 
                  value="${point.label}"
                  position="0 1.5 0"
                  color="white"
                  scale="2 2 2"
                  align="center"
                  look-at="[gps-camera]"
                  material="color: white; shader: msdf;">
                </a-text>
                
                <!-- Pulsing ring effect -->
                <a-ring 
                  radius-inner="0.6" 
                  radius-outer="1.2" 
                  color="red"
                  id="ring-${point.id}"
                  position="0 0.05 0"
                  rotation="-90 0 0"
                  material="color: red; opacity: 0.3; transparent: true;"
                  animation="property: scale; to: 1.5 1.5 1.5; direction: alternate; loop: true; dur: 2000">
                </a-ring>
                
                <!-- Proximity detection component -->
                <a-entity 
                  id="proximity-${point.id}"
                  proximity-detector="target: [gps-camera]; distance: 2; pointId: ${point.id}">
                </a-entity>
              </a-entity>
            `
              )
              .join("")}

            <!-- Property center marker -->
            <a-entity gps-entity-place="latitude: ${avgLat}; longitude: ${avgLon};">
              <a-box 
                width="1" 
                height="2" 
                depth="1" 
                color="orange" 
                position="0 1 0"
                material="color: orange; opacity: 0.9; transparent: true;"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 6000">
              </a-box>
              
              <a-text 
                value="${property.title}"
                position="0 3 0"
                color="orange"
                scale="3 3 3"
                align="center"
                look-at="[gps-camera]"
                material="color: orange; shader: msdf;">
              </a-text>
            </a-entity>
            
            <!-- Ground reference grid (optional) -->
            <a-plane 
              width="100" 
              height="100" 
              rotation="-90 0 0" 
              position="0 -0.1 0"
              material="color: white; opacity: 0.1; transparent: true; wireframe: true;"
              gps-entity-place="latitude: ${avgLat}; longitude: ${avgLon};">
            </a-plane>
          </a-scene>
          
          <script>
            // Register proximity detection component
            AFRAME.registerComponent('proximity-detector', {
              schema: {
                target: {type: 'selector'},
                distance: {type: 'number', default: 3.05},
                pointId: {type: 'string'}
              },
              
              init: function() {
                this.checkProximity = this.checkProximity.bind(this);
                this.userPosition = {x: 0, y: 0, z: 0};
                this.boundaryPosition = {x: 0, y: 0, z: 0};
              },
              
              tick: function() {
                this.checkProximity();
              },
              
              checkProximity: function() {
                const target = this.data.target;
                const pointId = this.data.pointId;
                
                if (!target) return;
                
                // Get GPS camera position (user location)
                const cameraEl = document.querySelector('[gps-camera]');
                if (!cameraEl) return;
                
                // Get the GPS position of this boundary point entity
                const gpsEntityPlace = this.el.getAttribute('gps-entity-place');
                if (!gpsEntityPlace) return;
                
                // Calculate real-world distance using GPS coordinates
                const userGpsPosition = cameraEl.getAttribute('gps-camera');
                if (!userGpsPosition) return;
                
                const distance = this.calculateGPSDistance(
                  userGpsPosition.latitude, userGpsPosition.longitude,
                  gpsEntityPlace.latitude, gpsEntityPlace.longitude
                );
                
                const marker = document.querySelector('#marker-' + pointId);
                const ring = document.querySelector('#ring-' + pointId);
                
                if (distance <= this.data.distance) {
                  // User is close - turn green
                  if (marker) {
                    marker.setAttribute('material', 'color: green; opacity: 0.8; transparent: true;');
                    marker.setAttribute('color', 'green');
                  }
                  if (ring) {
                    ring.setAttribute('material', 'color: green; opacity: 0.3; transparent: true;');
                    ring.setAttribute('color', 'green');
                  }
                } else {
                  // User is far - keep red
                  if (marker) {
                    marker.setAttribute('material', 'color: red; opacity: 0.8; transparent: true;');
                    marker.setAttribute('color', 'red');
                  }
                  if (ring) {
                    ring.setAttribute('material', 'color: red; opacity: 0.3; transparent: true;');
                    ring.setAttribute('color', 'red');
                  }
                }
              },
              
              calculateGPSDistance: function(lat1, lon1, lat2, lon2) {
                const R = 6371000; // Earth's radius in meters
                const dLat = (lat2 - lat1) * Math.PI / 180;
                const dLon = (lon2 - lon1) * Math.PI / 180;
                const a = 
                  Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                return R * c; // Distance in meters
              }
            });
          </script>
        `;
      }
    };

    const loadScene = async () => {
      const googleLoc = await getAccurateLocation();
      if (googleLoc) {
        initScene(googleLoc.lat, googleLoc.lon, googleLoc.acc);
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            initScene(
              pos.coords.latitude,
              pos.coords.longitude,
              pos.coords.accuracy
            );
          },
          (err) => {
            console.error("Fallback GPS error:", err);
            initScene(33.550859, -117.644357, 15);
          },
          { enableHighAccuracy: true, timeout: 60000, maximumAge: 30000 }
        );
      }
    };

    if (!scriptsLoaded) {
      Promise.all([
        loadScript("https://aframe.io/releases/1.2.0/aframe.min.js"),
        loadScript(
          "https://rawcdn.githack.com/AR-js-org/AR.js/3.3.2/aframe/build/aframe-ar-nft.js"
        ),
      ])
        .then(() => {
          scriptsLoaded = true;
          loadScene();
        })
        .catch((err) => console.error("❌ AR.js load failed", err));
    } else {
      loadScene();
    }
  }, [showAR, property]);

  return (
    <div className="w-full h-screen relative">
      {!showAR && (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
          <button
            onClick={() => setShowAR(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg font-semibold text-lg"
          >
            View Property in AR
          </button>
        </div>
      )}
      {showAR && (
        <div className="w-full h-full bg-transparent relative">
          <button
            onClick={() => {
              setShowAR(false);
              if (arContainerRef.current)
                arContainerRef.current.innerHTML = "";
            }}
            className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Close AR
          </button>
          <div
            ref={arContainerRef}
            className="w-full h-full"
            style={{ position: "absolute", top: 0, left: 0, height: "100vh" }}
          ></div>
        </div>
      )}
    </div>
  );
}