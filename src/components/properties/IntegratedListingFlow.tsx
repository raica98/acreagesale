import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { generateAerialScreenshots } from '../../lib/aerialScreenshots';
import * as turf from '@turf/turf';
import wkt from 'wellknown';
import mapboxgl from 'mapbox-gl';
import { uploadMultipleImagesToR2 } from '../../lib/r2Upload';
import { MapPin, Search, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, X, Upload, Image as ImageIcon, Zap, Plus, ChevronLeft, ChevronRight, Brain, Satellite, Target, DollarSign, CreditCard as Edit, Save, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PropertyPricingStep } from './PropertyPricingStep';
import { BoundaryPointsEditor } from '../BoundaryPointsEditor';
import { fetchReportAllData, generateAIContent } from '../../lib/reportAllHelpers';
import { fetchPRYCDPricing } from '../../lib/net';

// Text formatting utility functions
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

// Sleep utility function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const REGRID_API_TOKEN = import.meta.env.VITE_REGRID_API_KEY || '';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
const PRYCD_API_KEY = '658d0a7c16msh16736d87707b9bbp15b724jsna8ab00c1ecfa';

// Set Mapbox access token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

// Ensure valid bounds for Mapbox
function getPolygonBounds(geometry: any) {
  try {
    const bbox = turf.bbox(geometry); // [minLng, minLat, maxLng, maxLat]
    return [
      [bbox[0], bbox[1]], // SW corner
      [bbox[2], bbox[3]], // NE corner
    ];
  } catch (err) {
    console.error("❌ Failed to compute bounds:", err);
    return null;
  }
}

// Calculate the angle between three points
function calculateAngle(p1: number[], p2: number[], p3: number[]): number {
  const angle1 = Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
  const angle2 = Math.atan2(p3[1] - p2[1], p3[0] - p2[0]);
  let angle = Math.abs(angle1 - angle2) * (180 / Math.PI);
  if (angle > 180) angle = 360 - angle;
  return angle;
}

// Extract only sharp corner points from polygon coordinates
function extractCornerPoints(coordinates: number[][]): Array<{
  id: string;
  label: string;
  lat: number;
  lng: number;
}> {
  if (!coordinates || coordinates.length < 3) {
    return [];
  }

  // Remove the last coordinate if it's a duplicate of the first (closed polygon)
  let coords = coordinates[coordinates.length - 1][0] === coordinates[0][0] &&
               coordinates[coordinates.length - 1][1] === coordinates[0][1]
    ? coordinates.slice(0, -1)
    : coordinates;

  // If we have too few points, return them all
  if (coords.length <= 4) {
    return coords.map((coord, index) => ({
      id: `corner-${index}-${Date.now()}`,
      label: `Corner ${index + 1}`,
      lng: coord[0],
      lat: coord[1],
    }));
  }

  // Filter to only sharp corners (angle deviation > 10 degrees from 180)
  const sharpCorners: Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }> = [];

  const angleThreshold = 10; // degrees - corners with angle deviation > this are kept

  for (let i = 0; i < coords.length; i++) {
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const curr = coords[i];
    const next = coords[(i + 1) % coords.length];

    const angle = calculateAngle(prev, curr, next);

    // Keep corners that deviate significantly from a straight line (180 degrees)
    if (Math.abs(180 - angle) > angleThreshold) {
      sharpCorners.push({
        id: `corner-${sharpCorners.length}-${Date.now()}`,
        label: `Corner ${sharpCorners.length + 1}`,
        lng: curr[0],
        lat: curr[1],
      });
    }
  }

  // Ensure we have at least 3 corners for a valid polygon
  if (sharpCorners.length < 3) {
    // Fall back to evenly distributed points
    const step = Math.floor(coords.length / 4);
    return [0, step, step * 2, step * 3].map((index, i) => ({
      id: `corner-${i}-${Date.now()}`,
      label: `Corner ${i + 1}`,
      lng: coords[index][0],
      lat: coords[index][1],
    }));
  }

  return sharpCorners;
}

// Form schemas
const step1Schema = z.object({
  apn: z.string().min(1, 'APN is required'),
  region: z.string().min(1, 'County, State is required'),
});

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  size_acres: z.number().min(0.1, 'Size must be at least 0.1 acres'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip_code: z.string().min(5, 'ZIP code is required'),
  county: z.string().optional(),
  apn: z.string().optional(),
  zoning: z.string().optional().nullable(),
  water: z.string().optional().nullable(),
  electricity: z.string().optional().nullable(),
  sewer: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

type Step1Form = z.infer<typeof step1Schema>;
type PropertyForm = z.infer<typeof propertySchema>;

interface IntegratedListingFlowProps {
  onSubmit: (data: PropertyForm & { images: string[] }) => void;
  onClose: () => void;
  loading?: boolean;
}

interface AIStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export function IntegratedListingFlow({ onSubmit, onClose, loading = false }: IntegratedListingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState<ReportAllData | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [polygonGeometry, setPolygonGeometry] = useState<any>(null);
  const [polygonCoords, setPolygonCoords] = useState<number[][]>([]);
  const [boundaryPoints, setBoundaryPoints] = useState<Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }>>([]);
  const [pickedCorners, setPickedCorners] = useState<Array<{id: string; label: string; lat: number; lng: number}>>([]);
  const [isPlacingPins, setIsPlacingPins] = useState(false);
  const [pinPlacementProgress, setPinPlacementProgress] = useState({ current: 0, total: 0 });
  const [pendingCorners, setPendingCorners] = useState<Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }>>([]);

  // Keep lat/lng in sync with form
  useEffect(() => {
    if (propertyForm?.setValue) {
      propertyForm.setValue('latitude', coordinates.lat ?? null);
      propertyForm.setValue('longitude', coordinates.lng ?? null);
    }
  }, [coordinates.lat, coordinates.lng]);

  // Handle corner picking from map
  const handleCornerPick = (corners: Array<{id: string; label: string; lat: number; lng: number}>) => {
    console.log('IntegratedListingFlow: Received corners from map:', corners);
    setPickedCorners(corners);
  };
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [allStepsCompleted, setAllStepsCompleted] = useState(false);
  const [currentAIStep, setCurrentAIStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState<number>(0);
  const [region, setRegion] = useState("");
  const [reportAllData, setReportAllData] = useState<any>(null);
  const [formPopulated, setFormPopulated] = useState(false);
  
  // Smart Pricing state

  // Smart Pricing state
  const [pricingData, setPricingData] = useState<{
    recommended_price: number | null;
    confidence: number | null;
    final_price: number | null;
  }>({
    recommended_price: null,
    confidence: null,
    final_price: null,
  });
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<'quick' | 'rec' | 'max' | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [subjectProperty, setSubjectProperty] = useState<{
    apn: string;
    county_fips: string;
    city: string;
    latitude: number;
    longitude: number;
    acreage: number;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [propertyFields, setPropertyFields] = useState({
    apn: '',
    county_fips: '',
    city: '',
    latitude: 0,
    longitude: 0,
    acreage: 0
  });
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const boundaryMapContainer = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const boundaryMap = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const boundaryMarkers = useRef<mapboxgl.Marker[]>([]);

  // Forms
  const step1Form = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      apn: '' // Auto-populate with the APN
    }
  });

  const propertyForm = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
  });

  // Update form when pricing data is received
  useEffect(() => {
    if (pricingData?.selected_price) {
      console.log('Setting price from pricing data:', pricingData.selected_price);
      propertyForm.setValue('price', pricingData.selected_price);
      // Force form to re-render
      propertyForm.trigger('price');
    }
  }, [pricingData, propertyForm]);

  // AI Generation Steps
  const [aiSteps, setAiSteps] = useState<AIStep[]>([
    {
      id: 'property-data',
      title: 'Property Data Extraction',
      description: 'Fetching property details from public records',
      icon: FileText,
      status: 'pending'
    },
    {
      id: 'satellite-imagery',
      title: 'AI Satellite Image Capture',
      description: 'Capturing high-resolution satellite imagery',
      icon: Satellite,
      status: 'pending'
    },
    {
      id: 'content-generation',
      title: 'Smart Content Creation',
      description: 'Generating optimized title and description',
      icon: Brain,
      status: 'pending'
    },
    {
      id: 'price-analysis',
      title: 'Intelligent Pricing',
      description: 'Analyzing market data for optimal pricing',
      icon: DollarSign,
      status: 'pending'
    },
    {
      id: 'buyer-matching',
      title: 'AI Buyer Matching',
      description: 'Creating targeted marketing campaign',
      icon: Target,
      status: 'pending'
    }
  ]);

  // Confidence display helpers
  const confidenceTone = (c?: number) => {
    if (c == null) return 'neutral';
    const pct = c > 1 ? c : c * 100;
    if (pct >= 75) return 'success';
    if (pct >= 50) return 'info';
    return 'warning';
  };

  const confidenceLabel = (c?: number) => {
    if (c == null) return 'Not Provided';
    const pct = c > 1 ? c : Math.round(c * 100);
    if (pct >= 75) return `High • ${pct}%`;
    if (pct >= 50) return `Medium • ${pct}%`;
    return `Low • ${pct}%`;
  };

  // Fetch PRYCD pricing
  const fetchPricing = async () => {
    setPricingLoading(true);
    setPricingError(null);
    
    try {
      const result = await fetchPRYCDPricing(propertyFields);
      setPricingData(result);
      
      if (result.recommended_price) {
        setSelectedPrice(result.recommended_price);
        setSelectedPreset('rec');
      }
    } catch (error) {
      console.error('PRYCD pricing error:', error);
      setPricingError(error instanceof Error ? error.message : 'Failed to fetch pricing');
    } finally {
      setPricingLoading(false);
    }
  };

  // Update property fields when data changes
  useEffect(() => {
    if (propertyData) {
      const fields = {
        apn: propertyData.apn || '',
        county_fips: propertyData.county_fips || '',
        city: propertyData.city || '',
        latitude: propertyData.latitude || 0,
        longitude: propertyData.longitude || 0,
        acreage: propertyData.acreage || 0
      };
      setPropertyFields(fields);
      
      // Auto-fetch pricing if we have valid data
      if (fields.apn && fields.latitude && fields.longitude && fields.acreage > 0) {
        fetchPricing();
      }
    }
  }, [propertyData]);

  // Handle preset selection
  const handlePresetChange = (preset: 'quick' | 'rec' | 'max') => {
    if (!pricingData?.recommended_price) return;
    
    setSelectedPreset(preset);
    const base = pricingData.recommended_price;
    
    switch (preset) {
      case 'quick':
        setSelectedPrice(Math.round(base * 0.9));
        break;
      case 'rec':
        setSelectedPrice(base);
        break;
      case 'max':
        setSelectedPrice(Math.round(base * 1.1));
        break;
    }
  };

  // Handle slider change
  const handleSliderChange = (value: number) => {
    setSelectedPrice(value);
    
    // Update preset if it matches exactly
    if (!pricingData?.recommended_price) return;
    
    const base = pricingData.recommended_price;
    const quick = Math.round(base * 0.9);
    const max = Math.round(base * 1.1);
    
    if (value === quick) setSelectedPreset('quick');
    else if (value === base) setSelectedPreset('rec');
    else if (value === max) setSelectedPreset('max');
    else setSelectedPreset('rec'); // Default to rec for custom values
  };

  // Use selected price and continue
  const useSelectedPrice = () => {
    // Update property form with selected price
    propertyForm.setValue('price', selectedPrice);
    
    // Store pricing data in property data
    setPropertyData(prev => ({
      ...prev,
      final_price: selectedPrice,
      recommended_price: pricingData?.recommended_price,
      confidence: pricingData?.confidence,
      ...propertyFields
    }));
    
    // Continue to AI Generation
    setCurrentStep(4);
  };

  // Save boundary points to database
  const saveBoundaryPoints = async (points: typeof boundaryPoints) => {
    if (!propertyData?.apn) return;
    
    try {
      console.log('Saving boundary points for property:', propertyData.apn, points);
      // For now, just store in propertyData - will be saved when property is created
      setPropertyData(prev => ({ ...prev, boundary_points: points }));
      console.log('Boundary points saved to property data');
    } catch (error) {
      console.error('Error saving boundary points:', error);
    }
  };

  // Update AI step status
  const updateAIStepStatus = (stepId: string, status: AIStep['status']) => {
    setAiSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ));
    
    // Check if all steps are completed
    setAiSteps(prev => {
      const updatedSteps = prev.map(step => 
        step.id === stepId ? { ...step, status } : step
      );
      const allCompleted = updatedSteps.every(step => step.status === 'completed');
      setAllStepsCompleted(allCompleted);
      return updatedSteps;
    });
  };

  // Animated pin placement function
  const placeCornerPinsAnimated = async (corners: Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }>) => {
    setIsPlacingPins(true);
    setPendingCorners(corners);
    setPinPlacementProgress({ current: 0, total: corners.length });

    for (let i = 0; i < corners.length; i++) {
      await sleep(600); // Delay between each pin placement

      const corner = corners[i];

      // Add the pin to boundary points
      setBoundaryPoints(prev => [...prev, corner]);

      // Add marker to map
      if (boundaryMap.current) {
        addBoundaryMarker(corner.lat, corner.lng, corner.label);
      }

      // Update progress
      setPinPlacementProgress({ current: i + 1, total: corners.length });

      // Draw polygon if we have enough points
      if (i >= 2) {
        const currentPoints = corners.slice(0, i + 1);
        if (boundaryMap.current) {
          drawBoundaryPolygon(currentPoints);
        }
      }
    }

    // Save all points at once
    await saveBoundaryPoints(corners);

    setIsPlacingPins(false);
    setPendingCorners([]);
  };

  // Fetch parcel WKT from ReportAll API
  async function fetchParcelWKT(address: string, region: string): Promise<string | null> {
    const clientKey = 'Yd8Bf8FCn4';
    const url = `https://reportallusa.com/api/parcels?client=${clientKey}&v=9&address=${encodeURIComponent(address)}&region=${encodeURIComponent(region)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].geom_as_wkt || null;
      }
      return null;
    } catch (err) {
      console.error("ReportAll fetch error:", err);
      return null;
    }
  }

  // Generate satellite imagery using Regrid API
  const generateSatelliteImagery = async () => {
    try {
      console.log('🛰️ Starting satellite imagery generation...');
      console.log('🛰️ Property data:', propertyData);
      console.log('🛰️ Coordinates:', coordinates);
      
      if (propertyData && coordinates.lat && coordinates.lng) {
        // Try to get polygon data from multiple sources
        let geomWkt: string | undefined;
        
        // 1. First try: Use existing propertyData.geometry (from ReportAll)
        if (propertyData.geometry) {
          console.log('🛰️ Using propertyData.geometry:', propertyData.geometry);
          geomWkt = JSON.stringify(propertyData.geometry);
        }
        // 2. Second try: Fetch fresh WKT from ReportAll
        else {
          console.log('🛰️ Fetching fresh WKT from ReportAll...');
          const fetchedWkt = await fetchParcelWKT(propertyData.address, propertyData.county + ", " + propertyData.state);
          if (fetchedWkt) {
            geomWkt = fetchedWkt;
            console.log('🛰️ Got WKT from ReportAll:', fetchedWkt.substring(0, 100) + '...');
          }
        }
        // 3. Third try: Use propertyData.geometry from parcel lookup
        if (!geomWkt && propertyData.geometry) {
          console.log("🛰️ Using propertyData.geometry from step one");
          geomWkt = JSON.stringify(propertyData.geometry);
        }

        // 4. Fourth try: Fallback to ReportAll API
        if (!geomWkt) {
          console.warn("⚠️ No geometry found, falling back to ReportAll API");
          geomWkt = await fetchParcelWKT(
            propertyData.address,
            `${propertyData.county}, ${propertyData.state}`
          );
        }

        // 5. Last resort: Convert boundary points to polygon (only if no other geometry available)
        if (!geomWkt && boundaryPoints.length >= 3) {
          console.log('🛰️ No parcel geometry found, using manually mapped boundary points as fallback');
          const coordinates = boundaryPoints.map(p => [p.lng, p.lat]);
          coordinates.push(coordinates[0]); // close polygon
          geomWkt = JSON.stringify({
            type: "Polygon",
            coordinates: [coordinates]
          });
          console.log('🛰️ Created polygon from boundary points:', boundaryPoints.length, 'points');
        }
        
        console.log("🛰️ Final geomWkt for screenshots:", geomWkt ? "Available" : "Missing");
        console.log('🛰️ Calling generateAerialScreenshots...');

        // Convert boundary points to the format needed by generateAerialScreenshots
        const boundaryPointsCoords = boundaryPoints.length > 0
          ? boundaryPoints.map(p => ({ lat: p.lat, lng: p.lng }))
          : undefined;

        console.log('📍 Passing boundary points to screenshot generation:', boundaryPointsCoords?.length || 0, 'points');

        const screenshots = await Promise.race([
          generateAerialScreenshots({
            geomWkt: geomWkt || undefined,
            center: { lat: coordinates.lat || propertyData.latitude || 0, lng: coordinates.lng || propertyData.longitude || 0 },
            acreage: propertyData.acreage,
            boundaryPoints: boundaryPointsCoords
          }),
          new Promise<string[]>((_, reject) =>
            setTimeout(() => reject(new Error('Screenshot generation timeout')), 90000)
          )
        ]);
        
        console.log('🛰️ Generated screenshots:', screenshots.length);
        
        if (screenshots.length > 0) {
          console.log(`Generated ${screenshots.length} aerial screenshots`);
          return screenshots;
        }
      }
      
      console.log('Screenshot generation failed');
      return [];
      
    } catch (error) {
      console.error('Error generating satellite imagery:', error);
      console.error('🛰️ Full error details:', error);
      return [];
    }
  };

  // Check if input is GPS coordinates
  const isGPSCoordinates = (input: string): boolean => {
    const coordPattern = /^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/;
    return coordPattern.test(input.trim());
  };

  // Parse GPS coordinates
  const parseGPSCoordinates = (input: string): { lat: number; lon: number } | null => {
    try {
      const coords = input.split(',').map(coord => parseFloat(coord.trim()));
      if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        return { lat: coords[0], lon: coords[1] };
      }
    } catch (error) {
      console.error('Error parsing GPS coordinates:', error);
    }
    return null;
  };

  // Fetch property by GPS coordinates using spatial_intersect
  const fetchReportAllDataByCoords = async (lat: number, lon: number, region: string) => {
    try {
      // Use spatial_intersect with WGS84 SRID (4326) for accurate point-in-parcel lookup
      const point = `POINT(${lon} ${lat})`;
      const url = `https://reportallusa.com/api/parcels?client=bzjXUm5Bpb&v=9&spatial_intersect=${encodeURIComponent(point)}&si_srid=4326&return_buildings=true`;
      console.log("🔍 ReportAll GPS URL (spatial_intersect):", url);

      const response = await axios.get(url);
      console.log("📦 ReportAll GPS Raw Response:", response.data);

      if (!response.data?.results || response.data.results.length === 0) {
        throw new Error("No property found for the provided GPS coordinates");
      }

      const parcel = response.data.results[0];
      const fields = parcel.fields || {};

      // Extract county information from the top-level response
      const countyName = parcel.county_name || fields.county_name || "";
      const stateAbbr = parcel.state_abbr || fields.state_abbr || "";
      const countyId = parcel.county_id || null;

      console.log("🧾 County data from API:", { countyName, stateAbbr, countyId });

      // Parse WKT geometry to get accurate coordinates
      let latitude = lat; // Use provided GPS coordinates as fallback
      let longitude = lon;
      let geometry = null;
      
      // 📝 Auto-fill the complete form
      if (parcel.geom_as_wkt) {
        try {
          // Parse WKT geometry
          const geom = wkt.parse(parcel.geom_as_wkt);
          console.log("🗺️ Parsed WKT geometry (GPS):", geom);
          
          if (geom && geom.coordinates) {
            // Convert to turf polygon
            let turfPoly;
            if (geom.type === 'MultiPolygon') {
              turfPoly = turf.multiPolygon(geom.coordinates);
            } else if (geom.type === 'Polygon') {
              turfPoly = turf.polygon(geom.coordinates);
            }
            
            if (turfPoly) {
              // Compute centroid from the polygon
              const centroid = turf.centroid(turfPoly);
              [longitude, latitude] = centroid.geometry.coordinates;
              geometry = turfPoly.geometry;
              
              console.log("📍 Computed centroid (GPS):", { latitude, longitude });
              console.log("🔷 Polygon geometry (GPS):", geometry);
            }
          }
        } catch (wktError) {
          console.warn("⚠️ Failed to parse WKT geometry (GPS):", wktError);
          // Keep the provided GPS coordinates as fallback
        }
      }

      // Return data in ReportAllData format
      return {
        apn: parcel.parcel_id || '',
        acreage: parseFloat(fields.acreage_calc || fields.acreage_deeded || "0"),
        address: parcel.address || fields.address || "No Street Address. Use Coordinates To Locate Property",
        city: fields.addr_city || "",
        state: stateAbbr,
        zip: fields.addr_zip || "",
        county: countyName,
        countyId: countyId,
        zoning: fields.zoning || "",
        latitude,
        longitude,
        geometry,
        geomWkt: parcel.geom_as_wkt || "",
        price: 0 // Will be calculated later
      };
    } catch (error) {
      console.error("Error fetching property data (GPS):", error);
      throw error;
    }
  };

  // Auto-populate APN and fetch data on component mount
  useEffect(() => {
    const defaultAPN = '';
    step1Form.setValue('apn', defaultAPN);
    
    // Automatically fetch ReportAll data for the default APN
    handleAutoSearch(defaultAPN);
  }, []);

  // Populate form fields when ReportAll data is available
  useEffect(() => {
    if (reportAllData && !formPopulated) {
      console.log('🔄 Populating form fields with ReportAll data:', reportAllData);
      
      // Set all form values with ReportAll data
      propertyForm.setValue('price', 75000); // Default price since ReportAll doesn't provide it
      propertyForm.setValue('size_acres', reportAllData.acreage);
      propertyForm.setValue('address', reportAllData.address);
      propertyForm.setValue('city', reportAllData.city);
      propertyForm.setValue('state', reportAllData.state);
      propertyForm.setValue('zip_code', reportAllData.zip);
      propertyForm.setValue('county', reportAllData.county);
      propertyForm.setValue('apn', reportAllData.apn);
      propertyForm.setValue('zoning', reportAllData?.zoning ?? null);
      propertyForm.setValue('latitude', Number(reportAllData?.latitude) || coordinates.lat || null);
      propertyForm.setValue('longitude', Number(reportAllData?.longitude) || coordinates.lng || null);
      
      // Generate AI content
      generateAIContent(reportAllData).then(({ title, description }) => {
        propertyForm.setValue('title', title);
        propertyForm.setValue('description', description);
        console.log('✅ Form populated with ReportAll data and AI content');
      }).catch(error => {
        console.error('Error generating AI content:', error);
        // Set fallback content
        propertyForm.setValue('title', `${reportAllData.acreage}-Acre Property in ${reportAllData.city}, ${reportAllData.state}`);
        propertyForm.setValue('description', `Beautiful ${reportAllData.acreage}-acre property located in ${reportAllData.city}, ${reportAllData.county} County, ${reportAllData.state}.`);
      });
      
      setFormPopulated(true);
    }
  }, [reportAllData, formPopulated, propertyForm]);

  // Auto-search function for APN or GPS input
  const handleAutoSearch = async (input: string = '307050107') => {
    let currentRegion = step1Form.getValues('region');

    // Check if input is GPS coordinates
    const isGPS = isGPSCoordinates(input);

    if (!input || input.length < 3) return;
    if (!isGPS && !currentRegion) return; // Only require region for APN lookups

    setSearchLoading(true);
    setError(null);

    try {
      let parcelData;

      if (isGPS) {
        const coords = parseGPSCoordinates(input);
        if (!coords) throw new Error('Invalid GPS coordinates format');

        // GPS lookup doesn't require region - spatial_intersect finds the parcel automatically
        parcelData = await fetchReportAllDataByCoords(coords.lat, coords.lon, currentRegion || '');

        // Auto-populate APN field from API response
        if (parcelData.apn) {
          step1Form.setValue('apn', parcelData.apn);
          console.log('📝 Auto-populated APN:', parcelData.apn);
        }

        // Auto-populate region (county, state) from API response
        if (parcelData.county && parcelData.state) {
          const newRegion = `${parcelData.county}, ${parcelData.state}`;
          step1Form.setValue('region', newRegion);
          console.log('🌎 Auto-populated region:', newRegion);

          // Log county_id if available
          if (parcelData.countyId) {
            console.log('🆔 County ID:', parcelData.countyId);
          }
        }
      } else {
        // Call ReportAll API and save all the data
        parcelData = await fetchReportAllData(input, currentRegion);

        // Store the complete ReportAll data for later use
        setReportAllData(parcelData);
        console.log('📦 ReportAll data saved:', parcelData);

        // Generate AI content
        const { title, description } = await generateAIContent(parcelData);
      }

      setPropertyData(parcelData);
      setCoordinates({ lat: parcelData.latitude, lng: parcelData.longitude });
      setPolygonGeometry(parcelData.geometry);

    } catch (error) {
      console.error('Error fetching property data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch property data');
    } finally {
      setSearchLoading(false);
    }
  };

  // Generate content using OpenAI
  const generateContent = async (propertyData: any) => {
    try {
      if (!propertyData) {
        throw new Error('No property data available for content generation');
      }
      
      const prompt = `Create a compelling property listing for a ${propertyData.acreage}-acre property in ${propertyData.city}, ${propertyData.state}. 
      
Property details:
- Location: ${propertyData.address}, ${propertyData.city}, ${propertyData.state}
- Size: ${propertyData.acreage} acres
- Zoning: ${propertyData.zoning}

Generate:
1. title: \`${propertyData.acreage}-Acre Investment Property in ${propertyData.city}, ${propertyData.state}\`
2. A detailed description (100-200 words) highlighting investment potential

Make it sound professional and appealing to land investors. Don't go too much into story mode.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a professional real estate copywriter specializing in land investments.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      const content = responseData.choices[0]?.message?.content || '';
      const lines = content.split('\n').filter(line => line.trim());
      
      const title = lines.find(line => line.includes('Title:') || line.includes('1.'))?.replace(/^.*?[:.]/, '').trim() || 
        `${propertyData.acreage}-Acre Investment Property in ${propertyData.city}, ${propertyData.state}`;
      
      const description = lines.slice(2).join(' ').trim() || 
        `Exceptional ${propertyData.acreage}-acre property located in ${propertyData.city}, ${propertyData.county} County, ${propertyData.state}. This prime investment opportunity offers excellent development potential.`;

      return { title, description };
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Fallback content
      return {
        title: `${propertyData?.acreage || '1'}-Acre Investment Property in ${propertyData?.city || 'Unknown'}, ${propertyData?.state || 'Unknown'}`,
        description: `Exceptional ${propertyData?.acreage || '1'}-acre property located in ${propertyData?.city || 'Unknown'}, ${propertyData?.county || 'Unknown'} County, ${propertyData?.state || 'Unknown'}. This prime investment opportunity offers excellent development potential in a growing area.`
      };
    }
  };

  // Step 1: Handle APN search and map display
  const handleStep1Submit = async (data: Step1Form) => {
    try {
      setSearchLoading(true);
      setError(null);

      // If we don't have data yet, fetch it
      if (!reportAllData) {
        await handleAutoSearch(data.apn);
      }

      let parcelData;

      if (isGPSCoordinates(data.apn)) {
        const coords = parseGPSCoordinates(data.apn);
        if (!coords) throw new Error('Invalid GPS coordinates format');

        parcelData = await fetchReportAllDataByCoords(coords.lat, coords.lon, data.region);
      } else {
        parcelData = await fetchReportAllData(data.apn, data.region);
      }

      setPropertyData(parcelData);
      setCoordinates({ lat: parcelData.latitude, lng: parcelData.longitude });
      setPolygonGeometry(parcelData.geometry);

      // ✅ Extract polygon coords for Step 2
      let coords: number[][] = [];
      if (parcelData.geometry?.type === 'Polygon') {
        coords = parcelData.geometry.coordinates[0];
        setPolygonCoords(coords);
      } else if (parcelData.geometry?.type === 'MultiPolygon') {
        coords = parcelData.geometry.coordinates[0][0];
        setPolygonCoords(coords);
      }

      // ✅ Automatically extract corner points from the polygon
      if (coords.length > 0) {
        const corners = extractCornerPoints(coords);
        console.log('🎯 Auto-detected corners:', corners.length, 'sharp corners found');
        // Don't set boundary points yet - will be animated in Step 2
        setPendingCorners(corners);
      }

      setCurrentStep(2);

    } catch (error) {
      console.error('Error fetching property data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch property data');
    } finally {
      setSearchLoading(false);
    }
  };

  // Step 2: Handle boundary mapping completion
  const handleBoundaryMappingComplete = () => {
    // Prepare subject property data for pricing step
    if (propertyData) {
      setSubjectProperty({
        apn: propertyData.apn || '',
        county_fips: '06071', // Default - should be extracted from data
        city: propertyData.city || '',
        latitude: propertyData.latitude || 0,
        longitude: propertyData.longitude || 0,
        acreage: propertyData.acreage || 0,
      });
    }
    setCurrentStep(3); // Move to Smart Pricing
  };

  const handleStep3Next = (pricing: any) => {
    setPricingData(pricing);
    setCurrentStep(4);
  };

  // Smart Pricing API call
  const fetchPRYCDPricing = async (property: typeof subjectProperty) => {
    if (!property) return;
    
    setPricingLoading(true);
    setPricingError(null);
    
    try {
      const response = await fetch('https://prycd-pricing.p.rapidapi.com/priceProperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'prycd-pricing.p.rapidapi.com',
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY_PRYCD_PRICING || '',
          'Accept': 'application/json',
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
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      const recommended_price = data?.recommended_price ?? data?.price ?? data?.result?.recommended ?? null;
      const confidence = data?.confidence ?? data?.result?.confidence ?? null;
      
      setPricingData({
        recommended_price,
        confidence,
        final_price: recommended_price,
      });
      
      if (recommended_price) {
        setSelectedPrice(recommended_price);
        setSelectedPreset('rec');
      }
      
    } catch (error) {
      console.error('PRYCD API error:', error);
      setPricingError('Unable to fetch pricing data. You can enter a price manually.');
    } finally {
      setPricingLoading(false);
    }
  };

  // Handle pricing preset selection
  const handlePresetSelection = (preset: 'quick' | 'rec' | 'max') => {
    if (!pricingData.recommended_price) return;
    
    setSelectedPreset(preset);
    let price = pricingData.recommended_price;
    
    switch (preset) {
      case 'quick':
        price = Math.round(pricingData.recommended_price * 0.9);
        break;
      case 'rec':
        price = pricingData.recommended_price;
        break;
      case 'max':
        price = Math.round(pricingData.recommended_price * 1.1);
        break;
    }
    
    setSelectedPrice(price);
  };

  // Auto-fetch pricing when step 3 loads
  useEffect(() => {
    if (currentStep === 3 && subjectProperty && !pricingData.recommended_price && !pricingLoading) {
      fetchPRYCDPricing(subjectProperty);
    }
  }, [currentStep, subjectProperty]);

  // Step 4: AI Generation Process
  const runAIGeneration = async () => {
    setAiGenerating(true);
    setCurrentAIStep(0);

    try {
      // Step 1: Property Data (already done)
      setCurrentAIStep(1);
      updateAIStepStatus('property-data', 'completed');
      await sleep(1000);

      // Step 2: Satellite Imagery
      setCurrentAIStep(2);
      updateAIStepStatus('satellite-imagery', 'processing');
      
      // Generate real satellite imagery using coordinates with timeout protection
      console.log('🚀 Starting satellite imagery step...');
      const satelliteImages = await Promise.race([
        generateSatelliteImagery(),
        new Promise<string[]>((resolve) =>
          setTimeout(() => {
            console.warn('⚠️ Satellite imagery generation timed out');
            resolve([]);
          }, 120000)
        )
      ]);
      console.log('🚀 Satellite imagery step completed with', satelliteImages.length, 'images');
      setImages(satelliteImages);

      const base64ToFile = async (base64String: string, fileName: string): Promise<File> => {
        const response = await fetch(base64String);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
      };

      const imageFilePromises = satelliteImages.map(async (img, index) => {
        if (img.startsWith('data:image')) {
          return await base64ToFile(img, `aerial-screenshot-${index}.png`);
        }
        return null;
      });

      const convertedFiles = (await Promise.all(imageFilePromises)).filter((f): f is File => f !== null);
      if (convertedFiles.length > 0) {
        console.log('📁 Converted', convertedFiles.length, 'base64 images to File objects');
        setImageFiles(prev => [...prev, ...convertedFiles]);
      }

      updateAIStepStatus('satellite-imagery', 'completed');

      // Step 3: Content Generation
      setCurrentAIStep(3);
      updateAIStepStatus('content-generation', 'processing');
      const content = await generateContent(propertyData);
      updateAIStepStatus('content-generation', 'completed');

      // Step 4: Price Analysis
      setCurrentAIStep(4);
      updateAIStepStatus('price-analysis', 'processing');
      await sleep(1500);
      const basePrice = 15000;
      const sizeMultiplier = (propertyData?.acreage || 1) > 5 ? 0.9 : 1.0;
      const locationMultiplier = 1.2;
      
      const estimatedPrice = Math.round(basePrice * (propertyData?.acreage || 1) * sizeMultiplier * locationMultiplier);
      updateAIStepStatus('price-analysis', 'completed');

      // Step 5: Buyer Matching
      setCurrentAIStep(5);
      updateAIStepStatus('buyer-matching', 'processing');
      await sleep(2000);
      updateAIStepStatus('buyer-matching', 'completed');

      // Populate property form with AI-generated data
      const formattedData = {
        ...propertyData,
        ...content,
        price: estimatedPrice,
        city: toProperCase(propertyData.city),
        state: propertyData.state.length === 2 ? propertyData.state.toUpperCase() : toProperCase(propertyData.state),
        address: formatAddress(propertyData.address),
        size_acres: parseFloat(propertyData.size_acres.toFixed(2))
      };
      
      console.log('🔍 DEBUG: About to auto-fill form with data:', {
        apn: reportAllData.apn,
        title,
        description,
        size_acres: reportAllData.acreage,
        address: reportAllData.address,
        city: reportAllData.city,
        state: reportAllData.state,
        zip_code: reportAllData.zip,
        county: reportAllData.county
      });

      
      // Force form to re-render with new values
      propertyForm.trigger();
      setPropertyData(formattedData);
      propertyForm.reset(formattedData);
      // Force form to re-render with new values
      propertyForm.trigger();
      
      console.log('🔍 DEBUG: Form values after auto-fill:', propertyForm.getValues());
      // Force form to re-render and validate
      propertyForm.trigger();
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'AI generation failed');
    } finally {
      setAiGenerating(false);
    }
  };

  // Auto-advance to step 5 when AI generation is complete
  useEffect(() => {
    if (currentStep === 4 && !aiGenerating && allStepsCompleted) {
      setTimeout(() => {
        setCurrentStep(5);
      }, 2000);
    }
  }, [currentStep, aiGenerating, allStepsCompleted]);

  // Image upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageFiles(prev => [...prev, ...acceptedFiles]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10
  });

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Initialize Mapbox map
  useEffect(() => {
    if (currentStep === 1 && mapContainer.current && mapboxgl.accessToken && !map.current) {
      setIsMapLoaded(false);
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [coordinates.lng || -98.5795, coordinates.lat || 39.8283],
        zoom: coordinates.lat && coordinates.lng ? 15 : 4,
      });

      map.current.on('load', () => {
        setIsMapLoaded(true);
      });

      if (coordinates.lat && coordinates.lng) {
        marker.current = new mapboxgl.Marker({
          color: '#329cf9',
          scale: 1.2
        })
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(map.current);
      }

      // Handle double-click to place marker
      map.current.on('dblclick', (e) => {
        // Only allow clicks on the map canvas, not UI controls
        const target = e.originalEvent.target as HTMLElement;
        if (!target || !target.classList.contains('mapboxgl-canvas')) {
          return;
        }

        const { lng, lat } = e.lngLat;

        // Validate coordinates are within reasonable bounds
        if (!lng || !lat || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
          return;
        }

        setCoordinates({ lat, lng });

        // Remove existing marker
        if (marker.current) {
          marker.current.remove();
        }

        // Add new marker
        marker.current = new mapboxgl.Marker({
          color: '#329cf9',
          scale: 1.2
        })
          .setLngLat([lng, lat])
          .addTo(map.current!);

        // Auto-search based on coordinates
        handleAutoSearch(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      });
    }

    return () => {
      if (marker.current) {
        marker.current.remove();
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [currentStep]);

  // ✅ Add helper function for boundary markers
  const addBoundaryMarker = (lat: number, lng: number, label: string) => {
    if (!boundaryMap.current) return;
    
    const marker = new mapboxgl.Marker({
      color: '#4CAF50',
      scale: 0.8
    })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div style="text-align: center; padding: 8px;"><strong>${label}</strong></div>`)
      )
      .addTo(boundaryMap.current);
    
    boundaryMarkers.current.push(marker);
  };

  // ✅ Update drawBoundaryPolygon to take an argument
  const drawBoundaryPolygon = (points: Array<{id: string; label: string; lat: number; lng: number}>) => {
    if (!boundaryMap.current || points.length < 3) return;

    const coordinates = points.map((p) => [p.lng, p.lat]);
    coordinates.push(coordinates[0]); // close polygon

    if (boundaryMap.current.getLayer('boundary-polygon-fill')) {
      boundaryMap.current.removeLayer('boundary-polygon-fill');
      boundaryMap.current.removeLayer('boundary-polygon-outline');
      boundaryMap.current.removeSource('boundary-polygon');
    }

    boundaryMap.current.addSource('boundary-polygon', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [coordinates] },
        properties: {}
      },
    });

    boundaryMap.current.addLayer({
      id: 'boundary-polygon-fill',
      type: 'fill',
      source: 'boundary-polygon',
      paint: { 'fill-color': '#22c55e', 'fill-opacity': 0.3 },
    });

    boundaryMap.current.addLayer({
      id: 'boundary-polygon-outline',
      type: 'line',
      source: 'boundary-polygon',
      paint: { 'line-color': '#16a34a', 'line-width': 3 },
    });
  };

  // Initialize boundary mapping map
  useEffect(() => {
    if (currentStep === 2 && boundaryMapContainer.current && mapboxgl.accessToken && !boundaryMap.current && coordinates.lat && coordinates.lng) {
      boundaryMap.current = new mapboxgl.Map({
        container: boundaryMapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [coordinates.lng, coordinates.lat],
        zoom: 17,
      });

      boundaryMap.current.on('load', () => {
        // Add existing polygon if available
        if (polygonCoords.length > 0) {
          boundaryMap.current!.addSource('property-boundary', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [polygonCoords]
              },
              properties: {}
            }
          });

          // Add fill layer
          boundaryMap.current!.addLayer({
            id: 'property-fill',
            type: 'fill',
            source: 'property-boundary',
            paint: {
              'fill-color': '#4CAF50',
              'fill-opacity': 0.3
            }
          });

          // Add outline layer
          boundaryMap.current!.addLayer({
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
          boundaryMap.current!.fitBounds(bounds, { padding: 40 });
        }
        
        // Add existing boundary points if any
        boundaryPoints.forEach(point => {
          addBoundaryMarker(point.lat, point.lng, point.label);
        });

        // Draw polygon if we have enough points
        if (boundaryPoints.length >= 3) {
          drawBoundaryPolygon(boundaryPoints);
        }

        // Start animated pin placement if we have pending corners
        if (pendingCorners.length > 0 && boundaryPoints.length === 0) {
          placeCornerPinsAnimated(pendingCorners);
        }
      });

      // ✅ Properly add new corners on each click
      boundaryMap.current.on('click', (e) => {
        const clickLat = Number(e.lngLat.lat.toFixed(6));
        const clickLng = Number(e.lngLat.lng.toFixed(6));

        setBoundaryPoints((prev) => {
          const newCorner = {
            id: `corner-${Date.now()}-${Math.random()}`,
            label: `Corner ${prev.length + 1}`,
            lat: clickLat,
            lng: clickLng,
          };

          const updated = [...prev, newCorner];
          console.log("🆕 Added:", newCorner);
          console.log("✅ All corners:", updated);

          // Call functions with the updated array
          setTimeout(() => {
            saveBoundaryPoints(updated);
            addBoundaryMarker(clickLat, clickLng, newCorner.label);
            
            if (updated.length >= 3) {
              drawBoundaryPolygon(updated);
            }
          }, 0);

          return updated;
        });
      });
    }

    return () => {
      if (boundaryMap.current) {
        boundaryMarkers.current.forEach(marker => marker.remove());
        boundaryMarkers.current = [];
        boundaryMap.current.remove();
        boundaryMap.current = null;
      }
    };
  }, [currentStep, coordinates]);

  // Clear all boundary points
  const clearBoundaryPoints = () => {
    setBoundaryPoints([]);
    saveBoundaryPoints([]);
    
    // Remove all markers
    boundaryMarkers.current.forEach(marker => marker.remove());
    boundaryMarkers.current = [];
    
    // Remove polygon
    if (boundaryMap.current && boundaryMap.current.getLayer('boundary-polygon-fill')) {
      boundaryMap.current.removeLayer('boundary-polygon-fill');
      boundaryMap.current.removeLayer('boundary-polygon-outline');
      boundaryMap.current.removeSource('boundary-polygon');
    }
  };

  // Undo last boundary point
  const undoLastPoint = () => {
    if (boundaryPoints.length === 0) return;
    
    const updatedPoints = boundaryPoints.slice(0, -1);
    setBoundaryPoints(updatedPoints);
    saveBoundaryPoints(updatedPoints);
    
    // Remove last marker
    const lastMarker = boundaryMarkers.current.pop();
    if (lastMarker) lastMarker.remove();
    
    // Redraw polygon
    if (updatedPoints.length >= 3) {
      drawBoundaryPolygon(updatedPoints);
    } else if (boundaryMap.current && boundaryMap.current.getLayer('boundary-polygon-fill')) {
      boundaryMap.current.removeLayer('boundary-polygon-fill');
      boundaryMap.current.removeLayer('boundary-polygon-outline');
      boundaryMap.current.removeSource('boundary-polygon');
    }
  };

  // Update map center and marker when coordinates change
  useEffect(() => {
    if (map.current && isMapLoaded && coordinates.lat && coordinates.lng && currentStep === 1) {
      map.current.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 15
      });

      // Always show marker on step 1
      if (marker.current) {
        marker.current.remove();
      }

      marker.current = new mapboxgl.Marker({
        color: '#329cf9',
        scale: 1.2
      })
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map.current);
    }
  }, [coordinates, isMapLoaded, currentStep]);

  // Draw property polygon on map if available
  useEffect(() => {
    if (map.current && isMapLoaded && propertyData?.geometry) {
      try {
        console.log('🗺️ Adding polygon to map with geometry:', propertyData.geometry);
        
        // Remove existing polygon layers if they exist
        if (map.current.getLayer('property-polygon-fill')) {
          map.current.removeLayer('property-polygon-fill');
        }
        if (map.current.getLayer('property-polygon-outline')) {
          map.current.removeLayer('property-polygon-outline');
        }
        if (map.current.getSource('property-polygon')) {
          map.current.removeSource('property-polygon');
        }

        // Add polygon source
        map.current.addSource('property-polygon', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: propertyData.geometry,
            properties: {}
          }
        });

        // Add polygon fill layer
        map.current.addLayer({
          id: 'property-polygon-fill',
          type: 'fill',
          source: 'property-polygon',
          paint: {
            'fill-color': '#329cf9',
            'fill-opacity': 0.2
          }
        });

        // Add polygon outline layer
        map.current.addLayer({
          id: 'property-polygon-outline',
          type: 'line',
          source: 'property-polygon',
          paint: {
            'line-color': '#329cf9',
            'line-width': 3,
            'line-opacity': 0.8
          }
        });

        // Fit map to polygon bounds
        const coordinates = propertyData.geometry.coordinates[0];
        if (coordinates && coordinates.length > 0) {
          try {
            // Validate coordinates are in [lng, lat] format and are numbers
            const validCoords = coordinates.filter(coord => 
              Array.isArray(coord) && 
              coord.length === 2 && 
              typeof coord[0] === 'number' && 
              typeof coord[1] === 'number' &&
              !isNaN(coord[0]) && 
              !isNaN(coord[1])
            );
            
            if (validCoords.length > 0) {
              const bounds = validCoords.reduce(
                (bounds, coord) => bounds.extend([coord[0], coord[1]]),
                new mapboxgl.LngLatBounds([validCoords[0][0], validCoords[0][1]], [validCoords[0][0], validCoords[0][1]])
              );
              
              // Calculate optimal padding based on polygon size
              const boundsWidth = bounds.getEast() - bounds.getWest();
              const boundsHeight = bounds.getNorth() - bounds.getSouth();
              const maxDimension = Math.max(boundsWidth, boundsHeight);
              
              // Dynamic padding: smaller properties need more padding, larger ones need less
              let padding = 80; // default padding
              if (maxDimension < 0.001) padding = 120; // very small properties
              else if (maxDimension < 0.005) padding = 100; // small properties  
              else if (maxDimension < 0.01) padding = 80; // medium properties
              else if (maxDimension < 0.05) padding = 60; // large properties
              else padding = 40; // very large properties
              
              map.current.fitBounds(bounds, { 
                padding: {
                  top: padding,
                  bottom: padding,
                  left: padding,
                  right: padding
                },
                maxZoom: 18, // prevent over-zooming on very small properties
                duration: 1000 // smooth animation
              });
            }
          } catch (boundsError) {
            console.error('Error fitting bounds to polygon:', boundsError);
          }
        }
        
        console.log('✅ Polygon added to map successfully');
      } catch (error) {
        console.error('Error adding polygon to map:', error);
      }
    }
  }, [isMapLoaded, propertyData?.geometry]);

  // Add polygon to map when available
  useEffect(() => {
    if (map.current && isMapLoaded && polygonCoords.length > 0) {
      // Remove existing polygon if it exists
      if (map.current.getLayer('parcel-boundary-fill')) {
        map.current.removeLayer('parcel-boundary-fill');
        map.current.removeLayer('parcel-boundary-outline');
        map.current.removeSource('parcel-boundary');
      }

      map.current.addSource('parcel-boundary', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [polygonCoords]
          },
          properties: {}
        }
      });

      // Handle clicks to add boundary points
      map.current.on('click', (e) => {
        if (boundaryPoints.length < 20) {
          // Copy lat/lng into fresh numbers
          // FORCE copy into fresh primitives
          const lat = Number(e.lngLat.lat.toFixed(6));
          const lng = Number(e.lngLat.lng.toFixed(6));

          setBoundaryPoints((prevPoints) => {
            const newPoint = {
              id: `point-${Date.now()}-${prevPoints.length + 1}`,
              label: `Corner ${prevPoints.length + 1}`,
              lat,
              lng,
            };

            const updatedPoints = [...prevPoints, newPoint];

            console.log("✅ Added new corner:", newPoint);
            console.log("✅ All corners:", updatedPoints);

            saveBoundaryPoints(updatedPoints);
            addBoundaryMarker(lat, lng, newPoint.label);

            if (updatedPoints.length >= 3) {
              drawBoundaryPolygon(updatedPoints);
            }

            // Validate coordinates before adding to map
            const validateCoordinates = (coords: any): boolean => {
              if (!Array.isArray(coords)) return false;
              
              // For MultiPolygon, check first polygon's first ring
              if (coords[0] && Array.isArray(coords[0]) && Array.isArray(coords[0][0])) {
                return coords[0][0].every((coord: any) => 
                  Array.isArray(coord) && 
                  coord.length >= 2 && 
                  typeof coord[0] === 'number' && 
                  typeof coord[1] === 'number' && 
                  !isNaN(coord[0]) && 
                  !isNaN(coord[1]) &&
                  coord[0] >= -180 && coord[0] <= 180 && // Valid longitude
                  coord[1] >= -90 && coord[1] <= 90      // Valid latitude
                );
              }
              
              // For Polygon, check first ring
              if (coords[0] && Array.isArray(coords[0])) {
                return coords[0].every((coord: any) => 
                  Array.isArray(coord) && 
                  coord.length >= 2 && 
                  typeof coord[0] === 'number' && 
                  typeof coord[1] === 'number' && 
                  !isNaN(coord[0]) && 
                  !isNaN(coord[1]) &&
                  coord[0] >= -180 && coord[0] <= 180 && // Valid longitude
                  coord[1] >= -90 && coord[1] <= 90      // Valid latitude
                );
              }
              
              return false;
            };

            // Validate geometry coordinates before using
            if (!validateCoordinates(propertyData.geometry.coordinates)) {
              console.warn('⚠️ Invalid coordinates detected, skipping polygon');
              return;
            }

            return updatedPoints;
          });
        }
      });

      map.current.addLayer({
        id: 'parcel-boundary-fill',
        type: 'fill',
        source: 'parcel-boundary',
        paint: {
          'fill-color': '#4CAF50',
          'fill-opacity': 0.4
        }
      });

      map.current.addLayer({
        id: 'parcel-boundary-outline',
        type: 'line',
        source: 'parcel-boundary',
        paint: {
          'line-color': '#2E7D32',
          'line-width': 3
        }
      });

      const bounds = polygonCoords.reduce(
        (b, coord) => b.extend(coord as [number, number]), 
        new mapboxgl.LngLatBounds(polygonCoords[0], polygonCoords[0])
      );
      map.current.fitBounds(bounds, { padding: 40 });
    }
  }, [polygonCoords, isMapLoaded]);

  // Handle final form submission
  const handleFinalSubmit = async (data: PropertyForm) => {
    console.log('🚀 handleFinalSubmit called with data:', data);
    console.log('📍 coordinates:', coordinates);
    console.log('🖼️ images:', images);
    console.log('📁 imageFiles:', imageFiles);
    console.log('📊 boundaryPoints:', boundaryPoints);
    console.log('💰 pricingData:', pricingData);

    let imageUrls = images;

    try {
      if (images.length > 0 && images[0].startsWith('data:image')) {
        setIsUploading(true);
        setUploadProgress(0);
        const propertyId = data.apn || `property-${Date.now()}`;
        console.log('📤 Uploading', images.length, 'base64 images to R2...');

        const totalImages = images.length;
        const uploadedUrls: string[] = [];

        for (let i = 0; i < images.length; i++) {
          const url = await uploadMultipleImagesToR2([images[i]], propertyId, 2, 30000);
          uploadedUrls.push(...url);
          console.log(`✅ Image ${i + 1}/${totalImages} uploaded`);
          setUploadProgress(Math.round(((i + 1) / totalImages) * 100));
        }

        imageUrls = uploadedUrls;
        console.log('✅ Images uploaded to R2:', imageUrls);
        setIsUploading(false);
      }

      const finalData = {
        ...data,
        latitude: coordinates.lat ?? data.latitude ?? null,
        longitude: coordinates.lng ?? data.longitude ?? null,
        zoning: data.zoning ?? null,
        water: data.water ?? null,
        electricity: data.electricity ?? null,
        sewer: data.sewer ?? null,
        images: imageUrls,
        boundary_points: boundaryPoints.length > 0 ? boundaryPoints : null,
        reportAllData,
        geomWkt: propertyData?.geomWkt,
        geometry: propertyData?.geometry,
        pricing_data: pricingData,
      };

      console.log('📦 Final data to submit:', finalData);

      await onSubmit(finalData);
      console.log('✅ onSubmit called successfully');
    } catch (error) {
      console.error('❌ Error in handleFinalSubmit:', error);
      setIsUploading(false);
      alert(`Failed to create listing: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return '🗺️ Find Your Property';
      case 2: return '📍 Map Property Boundaries';
      case 3: return '💰 Smart Pricing';
      case 4: return '🤖 AI Listing Generator';
      case 5: return '📝 Edit Property Details';
      case 6: return '👁️ Review & Submit';
      default: return 'Create Listing';
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-start justify-center z-50 p-2 lg:p-4 overflow-y-auto">
      <Card ref={formRef} className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">

        <CardContent className="p-4 lg:p-8 bg-white">
        <div className="bg-white opacity-100 pt-4 lg:pt-12">

            <div className="space-y-4 lg:space-y-8">

          {/* Step 1: Map with APN Search */}
          {currentStep === 1 && (
            <div className="space-y-4 lg:space-y-6">
              <div className="text-center">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-2">
                  📍 Pin Your Property Location
                </h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Enter APN or GPS coordinates to locate your property on the map
                </p>
              </div>

              {/* APN and Coordinates Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto mb-4 lg:mb-6">
                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    APN (Assessor's Parcel Number) *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 lg:w-5 h-4 lg:h-5" />
                    <Input
                      {...step1Form.register('apn')}
                      placeholder="e.g., 123-456-789 or 34.0522, -118.2437"
                      className="pl-10 lg:pl-12 h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                      disabled={searchLoading}
                      onBlur={(e) => {
                        if (e.target.value) {
                          handleAutoSearch(e.target.value);
                        }
                      }}
                    />
                  </div>
                  {step1Form.formState.errors.apn && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {step1Form.formState.errors.apn.message}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs lg:text-sm mt-1 lg:mt-2">
                    💡 Enter an APN (123-456-789) or GPS coordinates (34.0522, -118.2437)
                  </p>
                </div>
                
                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    County, State *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 lg:w-5 h-4 lg:h-5" />
                    <Input
                      {...step1Form.register('region')}
                      placeholder="e.g., Los Angeles County, CA"
                      className="pl-10 lg:pl-12 h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                      disabled={searchLoading}
                    />
                  </div>
                  {step1Form.formState.errors.region && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {step1Form.formState.errors.region.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    GPS Coordinates (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 lg:w-5 h-4 lg:h-5" />
                    <Input
                      value={coordinates.lat && coordinates.lng ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}` : ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (isGPSCoordinates(value)) {
                          const coords = parseGPSCoordinates(value);
                          if (coords) {
                            setCoordinates({ lat: coords.lat, lng: coords.lon });
                          }
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value && isGPSCoordinates(e.target.value)) {
                          handleAutoSearch(e.target.value);
                        }
                      }}
                      placeholder="e.g., 34.403466, -117.519001"
                      className="pl-10 lg:pl-12 h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                      disabled={searchLoading}
                    />
                  </div>
                  <p className="text-gray-500 text-xs lg:text-sm mt-1 lg:mt-2">
                    💡 Enter either APN or GPS coordinates to locate property
                  </p>
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <Button
                    type="button"
                   className="bg-gradient-to-r from-[#329cf9] to-blue-600 hover:from-blue-600 hover:to-[#329cf9] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 border-2 border-blue-500 animate-pulse hover:animate-none"
                    onClick={() => {
                      if (formRef.current) {
                       formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                      }
                      handleAutoSearch(step1Form.getValues('apn'));
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Locate Property
                  </Button>
                </div>
              </div>

                {/* Map Container */}
                {mapboxgl.accessToken && (
                  <div id="map-section" className="relative w-full h-[250px] lg:h-[500px] rounded-lg lg:rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <div ref={mapContainer} className="w-full h-full" />
                    
                    <div className="absolute top-2 lg:top-4 left-2 lg:left-4 bg-white/90 backdrop-blur-sm rounded-md lg:rounded-lg p-2 lg:p-3 shadow-lg max-w-xs">
                      <p className="text-xs lg:text-sm text-white font-bold bg-black/80 px-3 py-2 rounded-lg border border-blue-200 shadow-md">
                        💡 <span className="text-blue-600">Double-click</span> on the map to pin location and auto-fill property details
                      </p>
                    </div>
                    
                    {coordinates.lat && coordinates.lng && (
                      <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 bg-blue-600 text-white rounded-md lg:rounded-lg p-2 lg:p-3 shadow-lg">
                        <div className="text-xs lg:text-sm font-medium">📍 Property Location</div>
                        <div className="text-xs opacity-90">
                          {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                        </div>
                      </div>
                    )}
                    
                    {/* Reset Map Button */}
                    <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCoordinates({ lat: null, lng: null });
                          setPolygonCoords([]);
                          if (map.current) {
                            map.current.flyTo({ center: [-98.5795, 39.8283], zoom: 4 });
                            if (marker.current) {
                              marker.current.remove();
                              marker.current = null;
                            }
                          }
                        }}
                        className="bg-black/80 backdrop-blur-sm hover:bg-black/90 text-white text-xs px-2 lg:px-4 py-1 lg:py-2 border-white/30"
                      >
                        Reset Map
                      </Button>
                    </div>
                  </div>
                )}

              <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-4 lg:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 lg:gap-0 pt-3 lg:pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={searchLoading}
                    className="w-full sm:w-auto px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-base"
                  >
                    ← Back to Details
                  </Button>
                  
                  <div className="text-center order-first sm:order-none">
                    <div className="text-xs lg:text-sm text-gray-500 mb-1">Step 1 of 6</div>
                    <div className="flex gap-2">
                      <div className="w-6 lg:w-8 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-6 lg:w-8 h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-6 lg:w-8 h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-6 lg:w-8 h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-6 lg:w-8 h-2 bg-gray-200 rounded-full"></div>
                      <div className="w-6 lg:w-8 h-2 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={searchLoading || (!coordinates.lat || !coordinates.lng)}
                    className={`w-full sm:w-auto text-white px-3 lg:px-6 py-2 lg:py-3 text-xs lg:text-base transition-all duration-300 ${
                      coordinates.lat && coordinates.lng
                        ? 'bg-black hover:bg-gray-800'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                  >
                    {searchLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <span className="hidden lg:inline">Confirm Location →</span>
                        <span className="lg:hidden">Confirm →</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Boundary Mapping */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg lg:text-2xl font-bold text-gray-900 mb-2">
                  📍 Review Property Boundaries
                </h3>
                <p className="text-sm lg:text-base text-gray-600">
                  Property corners have been automatically detected. Review and adjust if needed.
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 lg:p-6">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  Auto-Detected Boundaries:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm lg:text-base">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                    <span className="text-green-700">Property corners automatically placed</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">+</div>
                    <span className="text-green-700">Click map to add additional corners</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✎</div>
                    <span className="text-green-700">Edit coordinates in the list below</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">⟲</div>
                    <span className="text-green-700">Use controls to undo or clear all</span>
                  </div>
                </div>
              </div>

              {/* Boundary Map */}
              {mapboxgl.accessToken && coordinates.lat && coordinates.lng && (
                <div className="space-y-4">
                  <div className="relative w-full h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <div ref={boundaryMapContainer} className="w-full h-full" />
                    
                    {/* Pin Placement Progress Overlay */}
                    {isPlacingPins && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 border-4 border-green-500 animate-pulse">
                          <div className="text-center space-y-4">
                            <div className="flex items-center justify-center">
                              <div className="relative">
                                <MapPin className="w-16 h-16 text-green-600 animate-bounce" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              🎯 Placing Boundary Pins
                            </h3>
                            <p className="text-gray-600 font-medium">
                              Mapping property corners...
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                                <span>Progress</span>
                                <span className="text-green-600">
                                  {pinPlacementProgress.current} / {pinPlacementProgress.total}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
                                  style={{
                                    width: `${(pinPlacementProgress.current / pinPlacementProgress.total) * 100}%`
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Map Instructions Overlay */}
                    {!isPlacingPins && (
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20 max-w-xs">
                        <p className="text-sm text-white font-medium">
                          ✨ <strong>Auto-detected</strong> - Click to add more corners or edit below
                        </p>
                      </div>
                    )}

                    {/* Boundary Points Counter */}
                    {!isPlacingPins && (
                      <div className="absolute top-4 right-4 bg-green-600 text-white rounded-lg p-3 shadow-lg">
                        <div className="text-sm font-medium">📍 Boundary Points</div>
                        <div className="text-xl font-bold">{boundaryPoints.length}</div>
                      </div>
                    )}

                    {/* Polygon Status */}
                    {!isPlacingPins && boundaryPoints.length >= 3 && (
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-5 shadow-2xl border-4 border-white max-w-md animate-bounce backdrop-blur-sm">
                          <div className="text-center space-y-2">
                            <div className="text-xl font-bold flex items-center justify-center gap-2 drop-shadow-lg">
                              ✅ {boundaryPoints.length} Corners Mapped!
                            </div>
                            <div className="text-sm font-medium bg-black/30 rounded-lg p-2 backdrop-blur-sm">
                              👇 Scroll down and click <strong className="text-yellow-300">Continue</strong> if corners are marked properly
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Boundary Controls */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      type="button"
                      onClick={undoLastPoint}
                      disabled={boundaryPoints.length === 0 || isPlacingPins}
                      variant="outline"
                      className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-lg">↶</span>
                      Undo Last Point
                    </Button>
                    <Button
                      type="button"
                      onClick={clearBoundaryPoints}
                      disabled={boundaryPoints.length === 0 || isPlacingPins}
                      variant="outline"
                      className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-lg">🗑️</span>
                      Clear All Points
                    </Button>
                  </div>

                  {/* Boundary Points List */}
                  {boundaryPoints.length > 0 && (
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-lg">🗺️</span>
                        Property Boundary Points ({boundaryPoints.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {boundaryPoints.map((point, index) => (
                          <div key={point.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                            <span className="text-green-700 font-medium text-sm">{point.label}</span>
                            <span className="text-green-600 font-mono text-xs">
                              {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  disabled={isPlacingPins}
                  className="w-full sm:w-auto px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Back to Property Search
                </Button>

                <div className="text-center order-first sm:order-none">
                  <div className="text-sm text-gray-500 mb-1">Step 2 of 6</div>
                  <div className="flex gap-2">
                    <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={isPlacingPins}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Smart Pricing →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Smart Pricing */}
          {currentStep === 3 && (
            <PropertyPricingStep
              propertyData={{
                apn: propertyData.apn,
                city: propertyData.city,
                state: propertyData.state,
                county: propertyData.county,
                latitude: coordinates.lat || propertyData.latitude,
                longitude: coordinates.lng || propertyData.longitude,
                size_acres: propertyData.acreage || propertyData.size_acres
              }}
              onNext={handleStep3Next}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {/* Step 4: AI Generation */}
          {currentStep === 4 && (
            <div className="space-y-8">
              {!aiGenerating && currentAIStep === 0 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    🚀 Ready to Generate AI Listing
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our AI will now create a complete property listing with satellite imagery, 
                    optimized content, smart pricing, and buyer matching campaigns.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                      <Satellite className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-2">AI Satellite Imagery</h4>
                      <p className="text-gray-600 text-sm">High-resolution property photos</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                      <Brain className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-2">Smart Content</h4>
                      <p className="text-gray-600 text-sm">AI-generated titles & descriptions</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                      <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                      <h4 className="font-bold text-gray-900 mb-2">Buyer Matching</h4>
                      <p className="text-gray-600 text-sm">AI finds ideal buyers</p>
                    </div>
                  </div>

                  <Button
                    onClick={runAIGeneration}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Generate AI Listing
                  </Button>
                </div>
              )}

              {(aiGenerating || currentAIStep > 0) && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      🤖 AI is Creating Your Listing
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {aiSteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index === currentAIStep - 1;
                      const isCompleted = step.status === 'completed';
                      const isProcessing = step.status === 'processing';

                      return (
                        <div
                          key={step.id}
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                            isActive || isProcessing
                              ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'
                              : isCompleted
                              ? 'bg-green-50 border-2 border-green-200'
                              : 'bg-gray-50 border-2 border-gray-200'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-600'
                              : isProcessing
                              ? 'bg-[#329cf9]'
                              : 'bg-gray-400'
                          }`}>
                            {isProcessing ? (
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            ) : isCompleted ? (
                              <CheckCircle className="w-6 h-6 text-blue-600" />
                            ) : (
                              <Icon className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{step.title}</h4>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {aiSteps.every(step => step.status === 'completed') && (
                    <div className="text-center space-y-6">
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Manual Form with Pre-filled Data */}
          {currentStep === 5 && (
            <div className="space-y-8 bg-white rounded-2xl p-8">
              {/* Page Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Review & Edit Property Details
                </h1>
                <p className="text-gray-600">
                  Your listing has been pre-filled with AI-generated content. Review and edit as needed.
                </p>
              </div>

              <form onSubmit={propertyForm.handleSubmit(() => setCurrentStep(5))} className="space-y-8">
                <input type="hidden" {...propertyForm.register('latitude', { valueAsNumber: true })} />
                <input type="hidden" {...propertyForm.register('longitude', { valueAsNumber: true })} />

                {/* Image Management */}
                <div className="space-y-6 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">Property Images</h4>
                  </div>
                  
                  {images.length > 0 && (
                    <>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">AI-Generated Property Images</h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Property image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                              onClick={() => {
                                setFullscreenImage(image);
                                setFullscreenIndex(index);
                              }}
                            />
                            <Button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">
                        {isDragActive ? 'Drop images here...' : 'Drag & drop more images or click to select'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">Title *</label>
                    <Input
                      {...propertyForm.register('title')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">Description *</label>
                    <textarea
                      {...propertyForm.register('description')}
                      className="w-full min-h-[120px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Price ($) *</label>
                    <Input
                      {...propertyForm.register('price', { valueAsNumber: true })}
                      type="number"
                      value={pricingData?.selected_price || propertyForm.watch('price') || ''}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        propertyForm.setValue('price', value);
                      }}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {pricingData?.recommended_price && (
                      <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Price set from AI pricing analysis (${pricingData.recommended_price} strategy)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Size (acres) *</label>
                    <Input
                      {...propertyForm.register('size_acres', { valueAsNumber: true })}
                      type="number"
                      step="0.001"
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">Address *</label>
                    <Input
                      {...propertyForm.register('address')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">City *</label>
                    <Input
                      {...propertyForm.register('city')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">State *</label>
                    <Input
                      {...propertyForm.register('state')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">ZIP Code *</label>
                    <Input
                      {...propertyForm.register('zip_code')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">County</label>
                    <Input
                      {...propertyForm.register('county')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">APN Number</label>
                    <Input
                     {...propertyForm.register('apn')}
                     value={reportAllData?.apn || ''}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                     readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Zoning</label>
                    <Input
                     value={reportAllData?.zoning || ''}
                     readOnly
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                     placeholder="Auto-populated from property records"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">GPS Coordinates</label>
                    <div className="h-12 flex items-center px-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700 font-mono">
                      {propertyForm.watch('latitude') != null && propertyForm.watch('longitude') != null
                        ? `${Number(propertyForm.watch('latitude')).toFixed(6)}, ${Number(propertyForm.watch('longitude')).toFixed(6)}`
                        : 'Not available'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Water</label>
                    <select
                      {...propertyForm.register('water')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 w-full px-4 text-gray-700"
                    >
                      <option value="">Select water availability</option>
                      <option value="Municipal Water">Municipal Water</option>
                      <option value="Well Water">Well Water</option>
                      <option value="No Water">No Water</option>
                      <option value="Water Rights">Water Rights</option>
                      <option value="Shared Well">Shared Well</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Electricity</label>
                    <select
                      {...propertyForm.register('electricity')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 w-full px-4 text-gray-700"
                    >
                      <option value="">Select electrical availability</option>
                      <option value="Power Available">Power Available</option>
                      <option value="Power Nearby">Power Nearby</option>
                      <option value="No Power">No Power</option>
                      <option value="Solar Ready">Solar Ready</option>
                      <option value="Generator Required">Generator Required</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">Sewer</label>
                    <select
                      {...propertyForm.register('sewer')}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 w-full px-4 text-gray-700"
                    >
                      <option value="">Select sewer availability</option>
                      <option value="Municipal Sewer">Municipal Sewer</option>
                      <option value="Septic Required">Septic Required</option>
                      <option value="No Sewer">No Sewer</option>
                      <option value="Septic Approved">Septic Approved</option>
                      <option value="Holding Tank">Holding Tank</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(4)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to AI Generator
                  </Button>
                  <Button
                   onClick={() => {
                     console.log('Continue to Review clicked, moving to step 4');
                     setCurrentStep(6);
                   }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Continue to Review
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  👁️ Final Review
                </h3>
                <p className="text-gray-600">
                  Review your listing details before publishing to ensure everything looks perfect
                </p>
              </div>

              <div className="bg-white opacity-100 rounded-2xl p-6 space-y-6">
                <div className="bg-white rounded-2xl p-6 space-y-6 border border-gray-200">
                  {/* Images Preview */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">Property Images ({images.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group cursor-pointer">
                          <img
                            src={image}
                            alt={`Property image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                           onClick={() => {
                             setFullscreenImage(image);
                             setFullscreenIndex(index);
                           }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-gray-700 font-medium text-sm">Click to view</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Title</h4>
                      <p className="text-gray-700">{propertyForm.watch('title')}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Price</h4>
                      <p className="text-green-600 font-bold text-xl">${propertyForm.watch('price')?.toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Size</h4>
                      <p className="text-gray-700">{propertyForm.watch('size_acres')} acres</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Location</h4>
                      <p className="text-gray-700">{propertyForm.watch('city')}, {propertyForm.watch('state')}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">APN Number</h4>
                      <p className="text-gray-700">{propertyForm.watch('apn') || 'Not available'}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Zoning</h4>
                      <p className="text-gray-700">{propertyForm.watch('zoning') || 'Not available'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-gray-900 mb-2">GPS Coordinates</h4>
                      <p className="text-gray-700 font-mono">
                        {propertyForm.watch('latitude') != null && propertyForm.watch('longitude') != null
                          ? `${Number(propertyForm.watch('latitude')).toFixed(6)}, ${Number(propertyForm.watch('longitude')).toFixed(6)}`
                          : 'Not available'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Water</h4>
                      <p className="text-gray-700">{propertyForm.watch('water') || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Electricity</h4>
                      <p className="text-gray-700">{propertyForm.watch('electricity') || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Sewer</h4>
                      <p className="text-gray-700">{propertyForm.watch('sewer') || 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-gray-900 mb-2">Address</h4>
                      <p className="text-gray-700">{propertyForm.watch('address')}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">ZIP Code</h4>
                      <p className="text-gray-700">{propertyForm.watch('zip_code')}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">County</h4>
                      <p className="text-gray-700">{propertyForm.watch('county') || 'Not specified'}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{propertyForm.watch('description')}</p>
                    </div>
                  </div>

                  {/* Boundary Points Preview */}
                  {boundaryPoints.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Property Boundaries</h4>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="text-green-700 font-medium mb-2">
                          ✅ {boundaryPoints.length} boundary points mapped
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-24 overflow-y-auto">
                          {boundaryPoints.map((point, index) => (
                            <div key={point.id} className="text-xs text-green-600 font-mono">
                              {point.label}: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                     onClick={() => setCurrentStep(5)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Edit
                    </Button>
                    <Button
                      onClick={() => handleFinalSubmit(propertyForm.getValues())}
                      disabled={loading || isUploading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading images {uploadProgress}%...
                        </>
                      ) : loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          Publish Listing
                          <CheckCircle className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        </CardContent>
      </Card>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
          <div className="relative max-w-full max-h-full">
            <img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Close button */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 w-12 h-12 lg:w-14 lg:h-14 bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <X className="w-6 h-6 lg:w-7 lg:h-7" />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {fullscreenIndex + 1} of {images.length}
            </div>
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const prevIndex = fullscreenIndex === 0 ? images.length - 1 : fullscreenIndex - 1;
                    setFullscreenIndex(prevIndex);
                    setFullscreenImage(images[prevIndex]);
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/60 hover:bg-gray-900/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => {
                    const nextIndex = fullscreenIndex === images.length - 1 ? 0 : fullscreenIndex + 1;
                    setFullscreenIndex(nextIndex);
                    setFullscreenImage(images[nextIndex]);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/60 hover:bg-gray-900/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}