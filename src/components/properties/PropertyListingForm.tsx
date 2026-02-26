import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import mapboxgl from 'mapbox-gl';
import { uploadMultipleImagesToR2 } from '../../lib/r2Upload';
import { Upload, X, Image as ImageIcon, MapPin, Loader as Loader2, Search, CircleCheck as CheckCircle, CircleAlert as AlertCircle, CreditCard as Edit3, Save, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BoundaryPointsEditor } from '../BoundaryPointsEditor';

// Set Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

// API Configuration
const REGRID_API_TOKEN = import.meta.env.VITE_REGRID_API_KEY || '';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Form schema
const propertySchema = z.object({
  apn: z.string().min(1, 'APN is required'),
  gps_coordinates: z.string().optional(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  size_acres: z.number().min(0.1, 'Size must be at least 0.1 acres'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip_code: z.string().min(5, 'ZIP code is required'),
  county: z.string().optional(),
  zoning: z.string().optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;

interface RegridResponse {
  parcels?: {
    features?: Array<{
      properties?: {
        fields?: {
          parcelnumb?: string;
          ll_gisacre?: number;
          gisacre?: number;
          ll_gissqft?: number;
          zoning?: string;
          zoning_description?: string;
          lat?: string;
          lon?: string;
          address?: string;
          scity?: string;
          state2?: string;
          szip5?: string;
          szip?: string;
          county?: string;
          usedesc?: string;
          owner?: string;
          parval?: number;
          landval?: number;
          improvval?: number;
          yearbuilt?: number;
          legaldesc?: string;
          subdivision?: string;
          neighborhood_code?: string;
          fema_flood_zone?: string;
          census_tract?: string;
        };
      };
      geometry?: {
        type?: string;
        coordinates?: number[][][];
      };
    }>;
  };
}

interface PropertyListingFormProps {
  onSubmit: (data: PropertyForm & { images: string[] }) => void;
  onClose: () => void;
  loading?: boolean;
}

export function PropertyListingForm({ onSubmit, onClose, loading = false }: PropertyListingFormProps) {
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

  const [searchLoading, setSearchLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [autoFillStatus, setAutoFillStatus] = useState<string>('');
  const [polygonCoords, setPolygonCoords] = useState<number[][]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [boundaryPoints, setBoundaryPoints] = useState<Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }>>([]);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      price: 50000,
    }
  });

  // Check if input is GPS coordinates
  const isGPSCoordinates = (input: string): boolean => {
    const coordPattern = /^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/;
    return coordPattern.test(input.trim());
  };

  // Parse GPS coordinates from string
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

  // Fetch property data from Regrid API
  const fetchRegridData = async (input: string): Promise<RegridResponse | null> => {
    try {
      let url: string;
      
      if (isGPSCoordinates(input)) {
        const coords = parseGPSCoordinates(input);
        if (!coords) throw new Error('Invalid GPS coordinates format');
        
        url = `https://app.regrid.com/api/v2/parcels/point?lat=${coords.lat}&lon=${coords.lon}&radius=50&return_geometry=true&token=${REGRID_API_TOKEN}`;
      } else {
        url = `https://app.regrid.com/api/v2/parcels/apn?parcelnumb=${encodeURIComponent(input)}&return_geometry=true&token=${REGRID_API_TOKEN}`;
      }

      const response = await axios.get<RegridResponse>(url);
      
      if (!response.data.parcels?.features || response.data.parcels.features.length === 0) {
        throw new Error('No property found for the provided input');
      }

      const feature = response.data.parcels.features[0];
      
      // Extract polygon geometry
      if (feature?.geometry?.coordinates && feature.geometry.type === 'Polygon') {
        const polygonCoordinates = feature.geometry.coordinates[0];
        setPolygonCoords(polygonCoordinates);
        
        // Calculate centroid for map centering
        if (polygonCoordinates.length > 0) {
          const centroidLng = polygonCoordinates.reduce((sum, coord) => sum + coord[0], 0) / polygonCoordinates.length;
          const centroidLat = polygonCoordinates.reduce((sum, coord) => sum + coord[1], 0) / polygonCoordinates.length;
          setCoordinates({ lat: centroidLat, lng: centroidLng });
          
          // Generate boundary points from polygon coordinates - use exact same coordinates as aerial screenshots
          if (polygonCoordinates.length >= 4) {
            // Use the exact same polygon coordinates that get passed to generateAerialScreenshots
            const newBoundaryPoints = polygonCoordinates.slice(0, 4).map((coord, index) => ({
              id: `point-${index + 1}`,
              label: `Point ${index + 1}`,
              lat: coord[1], // latitude is second element
              lng: coord[0]  // longitude is first element
            }));
            setBoundaryPoints(newBoundaryPoints);
            console.log('✅ Generated boundary points from polygon (exact same as screenshots):', newBoundaryPoints);
            console.log('✅ Using polygon coordinates:', polygonCoordinates);
            console.log('✅ These coordinates will be passed to generateAerialScreenshots()');
          }
        }
      } else {
        setPolygonCoords([]);
        setBoundaryPoints([]);
      }

      return response.data;
    } catch (error) {
      console.error('Regrid API error:', error);
      throw error;
    }
  };

  // Generate title and description using OpenAI
  const generateTitleAndDescription = async (propertyInfo: any): Promise<{ title: string; description: string }> => {
    try {
      const acres = parseFloat(parseFloat(propertyInfo.size_acres || 1.00).toFixed(2));
      const acresText = acres.toFixed(2);
      const cityName = propertyInfo.city ? toProperCase(propertyInfo.city) : 'Unknown';
      const stateName = propertyInfo.state ? (propertyInfo.state.length === 2 ? propertyInfo.state.toUpperCase() : toProperCase(propertyInfo.state)) : 'Unknown';
      const title = `${acresText}-Acre Property in ${cityName}, ${stateName}`;
      
      const countyName = propertyInfo.county ? toProperCase(propertyInfo.county) : 'Unknown';
      const zoningText = propertyInfo.zoning ? toProperCase(propertyInfo.zoning) : 'Residential';
      const descriptionPrompt = `Write a short, professional property description for a vacant ${acresText}-acre lot in ${cityName}, ${countyName} County, ${stateName} with ${zoningText} zoning. Use proper capitalization and professional language. Mention the exact acreage as "${acresText}-acre" in the description.`;
      
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
        `Beautiful ${acresText}-acre property located in ${cityName}, ${countyName} County, ${stateName}. ${propertyInfo.zoning ? `Zoned ${toProperCase(propertyInfo.zoning)}.` : ''} Great opportunity for development or investment.`;
      
      return { title, description: description.replace(/\s+/g, ' ').trim() };
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      const acres = parseFloat(parseFloat(propertyInfo.size_acres || 1.00).toFixed(2));
      const acresText = acres.toFixed(2);
      const cityName = propertyInfo.city ? toProperCase(propertyInfo.city) : 'Unknown';
      const stateName = propertyInfo.state ? (propertyInfo.state.length === 2 ? propertyInfo.state.toUpperCase() : toProperCase(propertyInfo.state)) : 'Unknown';
      const countyName = propertyInfo.county ? toProperCase(propertyInfo.county) : 'Unknown';
      const title = `${acresText}-Acre Property in ${cityName}, ${stateName}`;
      const description = `Beautiful ${acresText}-acre property located in ${cityName}, ${countyName} County, ${stateName}. ${propertyInfo.zoning ? `Zoned ${toProperCase(propertyInfo.zoning)}.` : ''} Great opportunity for development or investment.`;
      
      return { title, description };
    }
  };

  // Handle auto-fill from APN or GPS input
  const handleAutoFill = async (input: string) => {
    if (!input || input.length < 3) return;
    
    setSearchLoading(true);
    setSearchError(null);
    setAutoFillStatus('Searching property data...');

    try {
      const regridData = await fetchRegridData(input);
      
      if (!regridData) {
        throw new Error('No property data found');
      }

      const fields = regridData.parcels.features[0]?.properties?.fields;
      
      if (!fields) {
        console.warn('No property fields found');
      }

      // Extract size in acres
      const rawSizeAcres = fields?.ll_gisacre || fields?.gisacre || 1.00;
      const sizeAcres = parseFloat(parseFloat(rawSizeAcres.toString()).toFixed(2));
      
      // Extract GPS coordinates
      let gpsCoordinates = '';
      let coordinatesForMap = { lat: null, lng: null };
      
      if (fields?.lat && fields?.lon) {
        const lat = parseFloat(fields.lat);
        const lon = parseFloat(fields.lon);
        gpsCoordinates = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
        coordinatesForMap = { lat, lng: lon };
      } else if (isGPSCoordinates(input)) {
        gpsCoordinates = input;
        const coords = parseGPSCoordinates(input);
        if (coords) {
          coordinatesForMap = { lat: coords.lat, lng: coords.lon };
        }
      } else if (polygonCoords.length > 0) {
        const centroidLng = polygonCoords.reduce((sum, coord) => sum + coord[0], 0) / polygonCoords.length;
        const centroidLat = polygonCoords.reduce((sum, coord) => sum + coord[1], 0) / polygonCoords.length;
        gpsCoordinates = `${centroidLat.toFixed(6)}, ${centroidLng.toFixed(6)}`;
        coordinatesForMap = { lat: centroidLat, lng: centroidLng };
      }
      
      // Set coordinates for map
      if (coordinatesForMap.lat && coordinatesForMap.lng) {
        setCoordinates(coordinatesForMap);
      }

      // Prepare property info for AI generation
      const propertyInfo = {
        size_acres: sizeAcres,
        city: fields?.scity || '',
        state: fields?.state2 || '',
        county: fields?.county || '',
        zoning: fields?.zoning || fields?.zoning_description || '',
        address: fields?.address || '',
        usedesc: fields?.usedesc || '',
        subdivision: fields?.subdivision || '',
      };

      // Generate title and description with AI
      setAutoFillStatus('Generating property description...');
      setAiLoading(true);
      const { title, description } = await generateTitleAndDescription(propertyInfo);
      setAiLoading(false);

      // Apply formatting to all fields before setting form values
      const formattedCity = propertyInfo.city ? toProperCase(propertyInfo.city) : '';
      const formattedState = propertyInfo.state ? 
        (propertyInfo.state.length === 2 ? propertyInfo.state.toUpperCase() : toProperCase(propertyInfo.state)) : '';
      const formattedCounty = propertyInfo.county ? toProperCase(propertyInfo.county) : '';
      const formattedAddress = propertyInfo.address ? formatAddress(propertyInfo.address) : '';
      const formattedZoning = fields?.zoning ? toProperCase(fields.zoning) : 
        (fields?.zoning_description ? toProperCase(fields.zoning_description) : '');

      // Populate form fields
      form.setValue('apn', fields?.parcelnumb || input);
      form.setValue('title', title);
      form.setValue('description', description);
      form.setValue('size_acres', sizeAcres);
      form.setValue('address', formattedAddress);
      form.setValue('city', formattedCity);
      form.setValue('state', formattedState);
      form.setValue('zip_code', fields?.szip5 || fields?.szip || '');
      form.setValue('county', formattedCounty);
      form.setValue('zoning', formattedZoning);
      
      // Set GPS coordinates with proper flags
      if (gpsCoordinates) {
        form.setValue('gps_coordinates', gpsCoordinates, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      }
      
      const polygonStatus = polygonCoords.length > 0 ? ` with ${polygonCoords.length} boundary points` : ' (no polygon available)';
      setAutoFillStatus(`✅ Property data loaded successfully${polygonStatus}!`);
      
      setTimeout(() => {
        setAutoFillStatus('');
      }, 3000);
      
    } catch (error) {
      console.error('Error fetching property data:', error);
      setSearchError(error instanceof Error ? error.message : 'Failed to fetch property data');
      setAutoFillStatus('❌ Failed to load property data');
      
      setTimeout(() => {
        setAutoFillStatus('');
      }, 3000);
    } finally {
      setSearchLoading(false);
      setAiLoading(false);
    }
  };

  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Image upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageFiles(prev => [...prev, ...acceptedFiles]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setUploadedImages(prev => [...prev, result]);
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
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Initialize Mapbox map
  useEffect(() => {
    if (mapContainer.current && mapboxgl.accessToken && !map.current) {
      setIsMapLoaded(false);
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [coordinates.lng || -98.5795, coordinates.lat || 39.8283],
        zoom: coordinates.lat && coordinates.lng ? 17 : 4,
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

      map.current.on('dblclick', (e) => {
        const { lng, lat } = e.lngLat;
        setCoordinates({ lat, lng });

        if (marker.current) marker.current.remove();
        marker.current = new mapboxgl.Marker({ color: '#329cf9' })
          .setLngLat([lng, lat])
          .addTo(map.current!);

        form.setValue('gps_coordinates', `${lat.toFixed(6)}, ${lng.toFixed(6)}`, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      });
    }

    return () => {
      if (marker.current) marker.current.remove();
      if (map.current) {
        map.current.remove();
        map.current = null;
        setIsMapLoaded(false);
      }
    };
  }, []);

  // Update map center and marker when coordinates change
  useEffect(() => {
    if (map.current && isMapLoaded && coordinates.lat && coordinates.lng) {
      map.current.flyTo({ 
        center: [coordinates.lng, coordinates.lat], 
        zoom: 15 
      });

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
  }, [coordinates, isMapLoaded]);

  // Draw parcel polygon if available
  useEffect(() => {
    if (map.current && isMapLoaded && polygonCoords.length > 0) {
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
          }
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

      // Validate coordinates before creating bounds
      const validCoords = polygonCoords.filter(coord => 
        Array.isArray(coord) && 
        coord.length === 2 && 
        typeof coord[0] === 'number' && 
        typeof coord[1] === 'number' &&
        !isNaN(coord[0]) && 
        !isNaN(coord[1])
      );

      if (validCoords.length > 0) {
        const bounds = validCoords.reduce(
          (b, coord) => b.extend([coord[0], coord[1]]), 
          new mapboxgl.LngLatBounds([validCoords[0][0], validCoords[0][1]], [validCoords[0][0], validCoords[0][1]])
        );
        map.current.fitBounds(bounds, { padding: 40 });
      }
    }
  }, [polygonCoords, isMapLoaded]);

  // Handle form submission
  const handleSubmit = async (data: PropertyForm) => {
    try {
      setUploadingImages(true);

      let imageUrls: string[] = [];

      if (imageFiles.length > 0) {
        const propertyId = data.apn || `property-${Date.now()}`;
        imageUrls = await uploadMultipleImagesToR2(imageFiles, propertyId);
        console.log('Uploaded images to R2:', imageUrls);
      }

      const formattedData = {
        ...data,
        title: data.title,
        description: data.description,
        city: toProperCase(data.city),
        state: data.state.length === 2 ? data.state.toUpperCase() : toProperCase(data.state),
        county: toProperCase(data.county || ''),
        address: formatAddress(data.address),
        zoning: toProperCase(data.zoning || ''),
        size_acres: parseFloat(data.size_acres.toFixed(2)),
      };

      const finalData = {
        ...formattedData,
        images: imageUrls,
        boundary_points: boundaryPoints.length > 0 ? boundaryPoints : null
      };

      onSubmit(finalData);
    } catch (error) {
      console.error('Error uploading images:', error);
      setSearchError('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              🏡 Create Property Listing
            </CardTitle>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-black mt-2">
            Enter APN or GPS coordinates to auto-fill property details
          </p>
        </CardHeader>

        <CardContent className="pt-6 px-4 pb-4 lg:p-8 space-y-4 lg:space-y-8 bg-white">
          {/* Auto-fill status */}
          {(searchLoading || aiLoading || autoFillStatus) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg lg:rounded-xl p-3 lg:p-4 opacity-100">
              <div className="flex items-center gap-3">
                {(searchLoading || aiLoading) && (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                )}
                {autoFillStatus.startsWith('✅') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {autoFillStatus.startsWith('❌') && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-blue-700 font-medium text-sm lg:text-base">{autoFillStatus}</span>
              </div>
            </div>
          )}

          {searchError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-xl opacity-100 text-sm lg:text-base">
              {searchError}
            </div>
          )}

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 lg:space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-4 lg:w-5 h-4 lg:h-5 text-white" />
                </div>
                <h3 className="text-base lg:text-xl font-bold text-gray-800">Property Images</h3>
              </div>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg lg:rounded-xl p-3 lg:p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-2 lg:space-y-4">
                  <div className="w-10 lg:w-16 h-10 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-5 lg:w-8 h-5 lg:h-8 text-white" />
                  </div>
                  {isDragActive ? (
                    <p className="text-blue-600 font-semibold text-xs lg:text-lg">Drop the images here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-700 font-semibold text-xs lg:text-lg mb-1 lg:mb-2">
                        Upload Property Images
                      </p>
                      <p className="text-gray-500 text-xs lg:text-base leading-tight">
                        Drag & drop up to 10 images (PNG, JPG, WebP) or click to select
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 lg:gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-12 lg:h-24 object-cover rounded-md lg:rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                      />
                      <Button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 lg:-top-2 -right-1 lg:-right-2 w-4 lg:w-6 h-4 lg:h-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-2 lg:w-3 h-2 lg:h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Boundary Points Section */}
              {boundaryPoints.length > 0 && (
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm lg:text-base">🗺️</span>
                    </div>
                    <h3 className="text-base lg:text-xl font-bold text-gray-800">Property Boundary Points</h3>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg lg:rounded-xl p-3 lg:p-4 border border-blue-200">
                    <BoundaryPointsEditor 
                      initialPoints={boundaryPoints}
                      onPointsChange={setBoundaryPoints}
                      editable={true}
                    />
                    <p className="text-blue-600 text-xs lg:text-sm mt-2 text-center">
                      💡 These boundary points were automatically detected from the property polygon
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Section */}
            {mapboxgl.accessToken && (
              <div className="space-y-3 lg:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 lg:w-5 h-4 lg:h-5 text-white" />
                  </div>
                  <h3 className="text-base lg:text-xl font-bold text-gray-800">Property Location</h3>
                </div>
                
                <div className="relative w-full h-40 lg:h-96 rounded-lg lg:rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <div ref={mapContainer} className="w-full h-full" />
                  
                  <div className="absolute top-1 lg:top-4 left-1 lg:left-4 bg-white/90 backdrop-blur-sm rounded-md lg:rounded-lg p-1.5 lg:p-3 shadow-lg max-w-xs">
                    <p className="text-xs lg:text-sm text-gray-700 font-medium">
                      💡 <strong>Double-click</strong> on the map to pin the exact location
                    </p>
                  </div>
                  
                  {coordinates.lat && coordinates.lng && (
                    <div className="absolute bottom-1 lg:bottom-4 left-1 lg:left-4 bg-blue-600 text-white rounded-md lg:rounded-lg p-1.5 lg:p-3 shadow-lg">
                      <div className="text-xs lg:text-sm font-medium">📍 Property Location</div>
                      <div className="text-xs opacity-90">
                        {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">📋</span>
                </div>
                <h3 className="text-base lg:text-xl font-bold text-gray-800">Property Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    Property Title *
                  </label>
                  <Input
                    {...form.register('title')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="e.g., 5-Acre Property in Denver, Colorado"
                  />
                  {form.formState.errors.title && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    Property Description *
                  </label>
                  <textarea
                    {...form.register('description')}
                    className="w-full min-h-[60px] lg:min-h-[120px] px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 resize-none text-sm lg:text-base"
                    placeholder="Describe the property features, location benefits, and potential uses..."
                  />
                  {form.formState.errors.description && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    Price ($) *
                  </label>
                  <Input
                    {...form.register('price', { valueAsNumber: true })}
                    type="number"
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="50000"
                  />
                  {form.formState.errors.price && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    Size (acres) *
                  </label>
                  <Input
                    {...form.register('size_acres', { valueAsNumber: true })}
                    type="number"
                    step="0.001"
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="5.0"
                  />
                  {form.formState.errors.size_acres && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.size_acres.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    APN (Optional)
                  </label>
                  <Input
                    {...form.register('apn')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="e.g., 123-456-789"
                  />
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    Zoning
                  </label>
                  <Input
                    {...form.register('zoning')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="e.g., Residential, Commercial"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">📍</span>
                </div>
                <h3 className="text-base lg:text-xl font-bold text-gray-800">Location Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    Street Address *
                  </label>
                  <Input
                    {...form.register('address')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="1234 Mountain View Road"
                  />
                  {form.formState.errors.address && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    City *
                  </label>
                  <Input
                    {...form.register('city')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="Denver"
                  />
                  {form.formState.errors.city && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    State *
                  </label>
                  <Input
                    {...form.register('state')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="Colorado"
                  />
                  {form.formState.errors.state && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    ZIP Code *
                  </label>
                  <Input
                    {...form.register('zip_code')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="80202"
                  />
                  {form.formState.errors.zip_code && (
                    <p className="text-red-600 text-xs lg:text-sm mt-1 lg:mt-2">
                      {form.formState.errors.zip_code.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs lg:text-sm font-bold text-gray-800 mb-2 lg:mb-3">
                    County
                  </label>
                  <Input
                    {...form.register('county')}
                    className="h-9 lg:h-12 border-2 border-gray-200 rounded-lg lg:rounded-xl focus:border-blue-500 text-sm lg:text-base"
                    placeholder="Jefferson County"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 lg:gap-4 pt-4 lg:pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-9 lg:h-12 border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 text-sm lg:text-base rounded-lg lg:rounded-xl"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-9 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all text-sm lg:text-base rounded-lg lg:rounded-xl"
                disabled={loading || searchLoading || aiLoading || uploadingImages}
              >
                {(loading || uploadingImages) ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden lg:inline">{uploadingImages ? 'Uploading Images...' : 'Creating Listing...'}</span>
                    <span className="lg:hidden">{uploadingImages ? 'Uploading...' : 'Creating...'}</span>
                  </div>
                ) : (
                  <>
                    <span className="hidden lg:inline">Create Property Listing</span>
                    <span className="lg:hidden">Create Listing</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}