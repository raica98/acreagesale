# Screenshot Generation Features

## Overview
The property listing system now generates **8 types of screenshots** automatically when creating a property listing:

### Existing Screenshots (6)
1. **Close-up View** - North-facing aerial (highest zoom)
2. **Medium View** - East-facing aerial (medium zoom)
3. **Wide View** - South-facing aerial (wide zoom)
4. **Context View** - West-facing aerial (context zoom)
5. **Nearby Cities Map** - Shows cities within 50 miles with numbered markers
6. **Nearby Amenities Map** - Shows restaurants, shopping, entertainment within 10 miles

### New Screenshots (2)
7. **Street View Screenshot** - Ground-level view of the property
8. **Survey Map Screenshot** - Property boundary with distance measurements

---

## 1. Street View Screenshot

### Description
Generates a realistic street-level view of the property using Google Street View API. If Street View is unavailable, it creates a simulated ground view from satellite imagery.

### Features
- **Smart Camera Positioning**: Finds the nearest Street View location to property edges
- **Auto-heading Calculation**: Camera automatically points toward property center
- **Intelligent Fallback**: Uses satellite-to-ground transformation when Street View is unavailable
- **Placeholder Detection**: Automatically detects and skips gray placeholder images
- **Watermarking**: Labels image as "Street View" or "Simulated Ground View"

### Algorithm
1. Calculate property centroid
2. Check each edge midpoint for nearby Street View availability
3. Select closest Street View location (within 50m radius)
4. Compute heading from camera position toward centroid
5. If no Street View found, use satellite imagery with perspective transformation

### API Requirements
- **Google Maps API Key** configured in `.env` as `VITE_GOOGLE_MAPS_API_KEY`
- Street View Static API enabled
- Maps Static API enabled (for satellite fallback)

### Configuration
```typescript
// Location: src/lib/streetViewScreenshot.ts

// Adjustable parameters:
const SEARCH_RADIUS = 50; // meters from property edges
const FOV = 90; // Field of view in degrees
const PITCH = -10; // Camera tilt (negative = downward)
```

---

## 2. Survey Map Screenshot

### Description
Generates a professional survey-style map showing the property boundary with distance measurements on each side, similar to official land surveys.

### Features
- **High-Resolution Satellite Base**: Uses Mapbox Satellite imagery
- **Property Boundary Overlay**: Red boundary line clearly marks property edges
- **Distance Labels**: Shows length of each side in feet
- **Smart Label Rotation**: Labels rotate to match boundary orientation
- **Survey-Style Design**: Black boxes with white text and borders
- **Auto-scaling**: Automatically adjusts map bounds to fit property

### Label Behavior
- **Horizontal lines** (0-45°, 315-360°): Label oriented horizontally
- **Vertical lines** (45-135°, 225-315°): Label rotated 90°
- Labels centered exactly on each boundary segment

### API Requirements
- **Mapbox Access Token** configured in `.env` as `VITE_MAPBOX_ACCESS_TOKEN`
- Static Images API access

### Configuration
```typescript
// Location: src/lib/surveyMapScreenshot.ts

// Adjustable parameters:
const MAP_WIDTH = 1200; // pixels
const MAP_HEIGHT = 900; // pixels
const BOUNDARY_COLOR = "red";
const BOUNDARY_WIDTH = 5; // pixels
const LABEL_FONT_SIZE = 18; // pixels
const PADDING = 0.0005; // degrees (map bounds padding)
```

---

## Integration

### How It Works
Both new screenshot types are automatically generated alongside existing screenshots when a property listing is created:

```typescript
// Location: src/lib/aerialScreenshots.ts

export async function generateAerialScreenshots({
  geomWkt,
  center,
  acreage,
}): Promise<string[]> {
  const screenshots: string[] = [];

  // ... existing 4 directional views ...
  // ... nearby cities map ...
  // ... nearby amenities map ...

  // NEW: Street View screenshot
  if (geojson?.coordinates) {
    const streetViewScreenshot = await generateStreetViewScreenshot(coords);
    if (streetViewScreenshot) screenshots.push(streetViewScreenshot);
  }

  // NEW: Survey map screenshot
  if (geojson?.coordinates) {
    const surveyMapScreenshot = await generateSurveyMapScreenshot(coords);
    if (surveyMapScreenshot) screenshots.push(surveyMapScreenshot);
  }

  return screenshots;
}
```

### Timeout Protection
- Each screenshot has a 20-second timeout
- Failed screenshots are logged but don't block other screenshots
- Graceful degradation ensures listing creation succeeds even if some screenshots fail

### Upload Process
All screenshots (including the new ones) are:
1. Generated as base64 data URLs
2. Uploaded to Cloudflare R2 storage via edge function
3. URLs stored in property database record
4. Displayed in property listing pages

---

## Environment Variables

### Required Variables
Add to `.env` file:

```env
# Existing
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
VITE_GEOAPIFY_API_KEY=your_geoapify_key

# New
VITE_GOOGLE_MAPS_API_KEY=your_google_api_key
```

### Getting API Keys

**Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable these APIs:
   - Maps Static API
   - Street View Static API
4. Create credentials → API Key
5. Add to `.env`

**Mapbox Token:**
- Already configured (used for existing aerial screenshots)

---

## Code Structure

### New Files
```
src/lib/
├── streetViewScreenshot.ts     # Street View generation logic
└── surveyMapScreenshot.ts      # Survey map generation logic
```

### Modified Files
```
src/lib/
└── aerialScreenshots.ts         # Added integration of new screenshots

.env                              # Added VITE_GOOGLE_MAPS_API_KEY
```

---

## Testing

### Test Street View Screenshot
```typescript
import { generateStreetViewScreenshot } from './lib/streetViewScreenshot';

const polygon = [
  { lat: 34.537566, lng: -117.969087 },
  { lat: 34.537565, lng: -117.969525 },
  { lat: 34.538390, lng: -117.969526 },
  { lat: 34.538390, lng: -117.969088 },
];

const screenshot = await generateStreetViewScreenshot(polygon);
console.log('Generated:', screenshot ? 'Success' : 'Failed');
```

### Test Survey Map Screenshot
```typescript
import { generateSurveyMapScreenshot } from './lib/surveyMapScreenshot';

const polygon = [
  { lat: 34.537566, lng: -117.969087 },
  { lat: 34.537565, lng: -117.969525 },
  { lat: 34.538390, lng: -117.969526 },
  { lat: 34.538390, lng: -117.969088 },
];

const screenshot = await generateSurveyMapScreenshot(polygon);
console.log('Generated:', screenshot ? 'Success' : 'Failed');
```

---

## Error Handling

### Street View Screenshot
- **No API key**: Skips generation, logs warning
- **No Street View available**: Falls back to simulated ground view
- **Placeholder image detected**: Retries with satellite fallback
- **Timeout**: Returns null, doesn't block other screenshots

### Survey Map Screenshot
- **No API key**: Skips generation, logs warning
- **Invalid polygon**: Returns null, logs error
- **Map fetch failure**: Returns null, logs error
- **Timeout**: Returns null, doesn't block other screenshots

---

## Performance

### Generation Time
- **Street View**: ~2-5 seconds (with API calls)
- **Survey Map**: ~2-4 seconds (with Mapbox Static API)
- **Total**: ~40-60 seconds for all 8 screenshots (parallelized where possible)

### Optimization
- Screenshots are generated in parallel groups
- Timeouts prevent hanging on slow API responses
- Failed screenshots don't retry to avoid delays
- Caching not implemented (each listing requires fresh screenshots)

---

## Limitations

### Street View
- Only available in areas with Google Street View coverage
- Falls back to simulated view in rural/remote areas
- Simulated view quality depends on satellite image resolution
- No AI enhancement (removed to avoid external dependencies)

### Survey Map
- Requires valid polygon coordinates
- Accuracy depends on coordinate precision
- Distance measurements are straight-line (not geodesic for very large properties)
- Label positioning may overlap on very small or irregular parcels

---

## Future Enhancements

### Potential Improvements
1. **AI-Enhanced Fallback**: Re-enable DALL-E enhancement for simulated views
2. **Caching**: Cache Street View availability checks
3. **Multiple Views**: Generate Street View from all 4 sides
4. **3D Terrain**: Add elevation data to survey maps
5. **Measurement Details**: Include area, perimeter, corner angles
6. **Drone Imagery**: Support custom drone photos if available
7. **Historical Views**: Show property changes over time

---

## Support

### Troubleshooting

**Street View always falls back to satellite:**
- Check Google API key is valid
- Verify Street View Static API is enabled
- Confirm property is in Street View coverage area

**Survey map not generating:**
- Check Mapbox token is valid
- Verify polygon coordinates are valid
- Check browser console for errors

**All screenshots failing:**
- Check internet connectivity
- Verify all API keys in `.env`
- Check API quotas/billing status

### Contact
For issues or questions, check the main project README or contact the development team.
