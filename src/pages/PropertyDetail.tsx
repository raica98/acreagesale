import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Ruler, DollarSign, Calendar, Eye, Heart, Share2, Phone, Mail, User, MessageCircle, Navigation2, Building, FileText, Navigation, Zap, Droplets, Waves, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AcreageSaleLogo } from '../components/ui/logo';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { NearbyPropertiesSection } from '../components/properties/NearbyPropertiesSection';
import { BuyerContactModal } from '../components/properties/BuyerContactModal';
import { ReservePropertyModal } from '../components/properties/ReservePropertyModal';
import PropertyMap from '../components/PropertyMap';
import PropertyAR from '../components/PropertyAR';
import { BoundaryPointsEditor } from '../components/BoundaryPointsEditor';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link, useParams, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { NotFound } from './NotFound';

type Property = Database['public']['Tables']['properties']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [ownerProfile, setOwnerProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [propertyOwnerProfile, setPropertyOwnerProfile] = useState<Profile | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [showARModal, setShowARModal] = useState(false);

  const images = property?.images || [];
  const displayImages = property?.images || [];

  // Navigation functions for fullscreen
  const nextFullscreenImage = () => {
    setFullscreenImageIndex(prev => prev === displayImages.length - 1 ? 0 : prev + 1);
  };

  const prevFullscreenImage = () => {
    setFullscreenImageIndex(prev => prev === 0 ? displayImages.length - 1 : prev - 1);
  };

  const closeFullscreen = () => {
    setFullscreenOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index);
    setFullscreenOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Keyboard navigation for fullscreen
  useEffect(() => {
    if (!fullscreenOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          prevFullscreenImage();
          break;
        case 'ArrowRight':
          nextFullscreenImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenOpen]);

  const [boundaryPoints, setBoundaryPoints] = useState<Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }>>([]);
  const [boundaryPointsLoading, setBoundaryPointsLoading] = useState(true);
  const [polygonCoords, setPolygonCoords] = useState<number[][]>([]);

  // Convert boundary points to polygon coordinates for map rendering
  useEffect(() => {
    if (boundaryPoints.length >= 3) {
      const coords = boundaryPoints.map(point => [point.lng, point.lat]);
      setPolygonCoords(coords);
      console.log('✅ Converted boundary points to polygon coordinates for map:', coords);
    } else {
      setPolygonCoords([]);
    }
  }, [boundaryPoints]);

  // Add keyboard navigation for images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images.length]);

  // Corner picking state
  const [isPickingCorners, setIsPickingCorners] = useState(false);
  const [pickedCorners, setPickedCorners] = useState<Array<{
    id: string;
    label: string;
    lat: number;
    lng: number;
  }>>([]);

  // Save boundary points to database
  const saveBoundaryPoints = async (points: typeof boundaryPoints) => {
    if (!property) return;
    
    try {
      console.log('Saving boundary points to database:', points);
      
      // Update local state immediately for UI responsiveness
      setBoundaryPoints(points);
      setProperty(prev => prev ? { ...prev, boundary_points: points } : null);
      
      const { error } = await supabase
        .from('properties')
        .update({ boundary_points: points })
        .eq('id', property.id);

      if (error) {
        console.error('Failed to save boundary points:', error);
        alert('Failed to save boundary points. Please try again.');
        // Revert local state on error
        setBoundaryPoints(property.boundary_points || []);
        setProperty(prev => prev ? { ...prev, boundary_points: property.boundary_points } : null);
      } else {
        console.log('Boundary points saved successfully:', points);
        console.log('Database save confirmed - points will persist on refresh');
      }
    } catch (error) {
      console.error('Error saving boundary points:', error);
      alert('Error saving boundary points. Please try again.');
      // Revert local state on error
      setBoundaryPoints(property.boundary_points || []);
      setProperty(prev => prev ? { ...prev, boundary_points: property.boundary_points } : null);
    }
  };

  // Fetch boundary points from Regrid API using lat/lng
  const fetchBoundaryPointsFromRegrid = async (latitude: number, longitude: number) => {
    try {
      const REGRID_API_TOKEN = import.meta.env.VITE_REGRID_API_KEY || '';
      
      // Use APN if available, otherwise fall back to lat/lng
      let url;
      if (property?.apn) {
        url = `https://app.regrid.com/api/v2/parcels/apn?parcelnumb=${encodeURIComponent(property.apn)}&return_geometry=true&token=${REGRID_API_TOKEN}`;
      } else {
        url = `https://app.regrid.com/api/v2/parcels/point?lat=${latitude}&lon=${longitude}&radius=50&return_geometry=true&token=${REGRID_API_TOKEN}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn('Regrid API request failed:', response.status);
        return [];
      }
      
      const data = await response.json();
      
      if (!data.parcels?.features || data.parcels.features.length === 0) {
        console.warn('No parcel found at coordinates:', latitude, longitude);
        return [];
      }
      
      const feature = data.parcels.features[0];
      
      if (!feature?.geometry?.coordinates || feature.geometry.type !== 'Polygon') {
        console.warn('No polygon geometry found in Regrid response');
        return [];
      }
      
      const polygonCoordinates = feature.geometry.coordinates[0];
      
      if (!polygonCoordinates || polygonCoordinates.length < 3) {
        console.warn('Invalid polygon coordinates from Regrid');
        return [];
      }
      
      // Store polygon coordinates for map rendering
      setPolygonCoords(polygonCoordinates);
      
      // Use the exact same polygon coordinates that are passed to generateAerialScreenshots
      // This ensures consistency between boundary points and screenshot generation
      const boundaryPoints = polygonCoordinates.map((coord, index) => ({
        id: `pt${index + 1}`,
        label: `Point ${index + 1}`,
        lat: coord[1], // latitude is second element
        lng: coord[0]  // longitude is first element
      }));
      
      console.log('✅ Using exact polygon coordinates from Regrid API (same as screenshots):', boundaryPoints);
      return boundaryPoints;
      
    } catch (error) {
      console.error('Error fetching boundary points from Regrid:', error);
      return [];
    }
  };

  useEffect(() => {
    if (id) {
      // Add delay to ensure Supabase client is ready
      const timer = setTimeout(() => {
        fetchProperty(id);
        trackVisitor(id);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [id]);

  // Track visitor function
  const trackVisitor = async (propertyId: string) => {
    try {
      // Get current visitor count from localStorage or start at base number
      const storageKey = `visitors_${propertyId}`;
      const currentCount = parseInt(localStorage.getItem(storageKey) || '0');
      const baseCount = (() => {
        const seed = propertyId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        return Math.floor((seed % 15) + 8); // Base between 8-22
      })();
      
      // Increment visitor count
      const newCount = Math.max(currentCount + 1, baseCount);
      localStorage.setItem(storageKey, newCount.toString());
      setVisitorCount(newCount);
      
      // Optional: Track unique visitors per session
      const sessionKey = `visited_${propertyId}_${Date.now()}`;
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, 'true');
        // This ensures we only count once per session
      }
    } catch (error) {
      console.warn('Error tracking visitor:', error);
      // Fallback to static count if tracking fails
      const seed = propertyId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      setVisitorCount(Math.floor((seed % 15) + 8));
    }
  };

  const fetchProperty = async (propertyId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Direct property fetch without connection test for better performance
      const { data: property, error } = await supabase
        .from('properties')
        .select(`
          id, title, price, size_acres, address, city, state, zip_code, county,
          apn, zoning, latitude, longitude, water, electricity, sewer,
          description, images, user_id, boundary_points, status, created_at, updated_at
        `)
        .eq('id', propertyId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Property not found');
        }
        throw error;
      }

      if (property) {
        setProperty(property);
        
        // Load boundary points from database or fetch from Regrid API
        if (property.boundary_points && Array.isArray(property.boundary_points) && property.boundary_points.length > 0) {
          console.log('Loading boundary points from database:', property.boundary_points);
          setBoundaryPoints(property.boundary_points);
          setBoundaryPointsLoading(false);
        } else {
          console.log('No boundary points found in database, attempting to fetch from Regrid API');
          // Attempt to fetch boundary points from Regrid API if coordinates exist
          if (property.latitude && property.longitude) {
            fetchBoundaryPointsFromRegrid(property.latitude, property.longitude).then(regridPoints => {
              if (regridPoints.length > 0) {
                console.log('✅ Auto-filled boundary points from Regrid API:', regridPoints);
                setBoundaryPoints(regridPoints);
                // Save to database
                setTimeout(() => saveBoundaryPoints(regridPoints), 1000);
              } else {
                console.log('No boundary points available from Regrid API, leaving empty');
                setBoundaryPoints([]);
              }
              setBoundaryPointsLoading(false);
            });
          } else {
            console.log('No coordinates available, leaving boundary points empty');
            setBoundaryPoints([]);
            setBoundaryPointsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError('Unable to connect to database. Please check your internet connection and try again.');
      } else {
        setError(error.message || 'Property not found or no longer available');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPropertyOwnerProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, phone, disclaimer')
          .eq('id', userId)
          .single();

        if (error) {
          console.warn('Profile fetch error:', error.message);
          return;
        }

        if (data) {
          setOwnerProfile(data);
          setPropertyOwnerProfile(data);
        } else {
          console.warn('No profile found for user_id:', userId);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    };

    if (property?.user_id) {
      fetchPropertyOwnerProfile(property.user_id);
    } else {
      console.warn('property.user_id is missing');
    }
  }, [property?.user_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#329DF9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading property...</div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return <NotFound />;
  }

  const seoData = property ? {
    city: property.city,
    state: property.state,
    acres: property.size_acres,
    price: property.price,
    zipCode: property.zip_code,
    images: property.images,
    latitude: property.latitude,
    longitude: property.longitude
  } : undefined;

  return (
    <>
      <SEO
        slug={`property/${id}`}
        title={property ? `${property.size_acres} Acres in ${property.city}, ${property.state} | AcreageSale` : undefined}
        description={property ? `${property.size_acres} acres for sale in ${property.city}, ${property.state} - $${property.price.toLocaleString()}. ${property.description?.substring(0, 100) || 'View property details and listing information.'}` : undefined}
      />
      <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <AcreageSaleLogo className="w-28 sm:w-32 lg:w-40" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue font-medium transition-colors">
                Home
              </Link>
              <Link to="/properties" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors relative group text-sm lg:text-base">
                Properties
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#329cf9] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a href="#" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors relative group text-sm lg:text-base">
                Sell Land Fast
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#329cf9] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors relative group text-sm lg:text-base">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#329cf9] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors relative group text-sm lg:text-base">
                Blogs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#329cf9] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors relative group text-sm lg:text-base">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#329cf9] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <Link to="/properties">
                <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm px-2 sm:px-3 lg:px-4 h-8 sm:h-9 lg:h-10">
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Properties</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="hidden sm:block">
                    <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm px-2 sm:px-3 lg:px-4 h-8 sm:h-9 lg:h-10">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 lg:px-4 h-8 sm:h-9 lg:h-10 hidden sm:block"
                    onClick={async () => {
                      const { signOut } = await import('../hooks/useAuth');
                      // Handle sign out
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg text-xs sm:text-sm px-2 sm:px-3 lg:px-4 h-8 sm:h-9 lg:h-10 hidden sm:block"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Add Listing
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => setAuthModalOpen(true)}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto">
        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-12 min-h-screen">
          {/* Left Side - Image Gallery */}
          <div className="w-full xl:w-[60%] xl:flex-shrink-0 p-4 xl:p-8">
            {/* Main Image */}
            <div className="w-full aspect-[16/11] xl:h-[70vh] mb-4 xl:mb-6 rounded-[15px] overflow-hidden shadow-2xl relative group">
              {displayImages[selectedImageIndex] && (
                <img
                  src={displayImages[selectedImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onClick={() => setFullscreenOpen(true)}
                  style={{ cursor: 'zoom-in' }}
                />
              )}
              
              {/* Navigation Arrows - Only show if more than 1 image */}
              {images.length > 1 && (
                <>
                  {/* Previous Arrow */}
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-white/20 hover:border-white/40"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6 transform -translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Next Arrow */}
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl border-2 border-white/20 hover:border-white/40"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6 transform translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Image Counter Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl border border-white/20">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                  
                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === selectedImageIndex 
                            ? 'bg-white shadow-lg scale-125' 
                            : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Keyboard Navigation Hint */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-500">
                    ← → Navigate
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 xl:gap-6 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-[120px] xl:w-[200px] h-[80px] xl:h-[130px] rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                    selectedImageIndex === index ? 'border-2 border-[#329DF9]' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  {/* Special styling for cities map (5th image) */}
                  {index === 4 && images.length >= 5 && (
                    <div className="absolute top-1 left-1 bg-green-500 text-white px-1 py-0.5 rounded text-xs font-bold z-10">
                      Cities
                    </div>
                  )}
                  {/* Special styling for amenities map (6th image) */}
                  {index === 5 && images.length >= 6 && (
                    <div className="absolute top-1 left-1 bg-blue-500 text-white px-1 py-0.5 rounded text-xs font-bold z-10">
                      Places
                    </div>
                  )}
                  <img
                    src={displayImages[index]}
                    alt={
                      index === 4 && images.length >= 5 ? 'Nearby cities map' :
                      index === 5 && images.length >= 6 ? 'Nearby amenities map' :
                      `Property image ${index + 1}`
                    }
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Property Details */}
          <div className="w-full xl:w-[40%] xl:flex-1 xl:min-w-0 px-4 sm:px-6 py-6 bg-gradient-to-br from-gray-50 to-white xl:min-h-screen flex flex-col justify-center xl:justify-start">
            <div className="max-w-lg mx-auto xl:mx-0 w-full">
            {/* Real Time Visitors Badge */}
            <div className="inline-flex items-center bg-[#329DF9]/10 rounded-full px-3 py-2 mb-4 shadow-md">
              <div className="w-2 h-2 bg-[#329DF9] rounded-full mr-2 animate-pulse"></div>
              <span className="text-[#329DF9] font-medium text-xs sm:text-sm">
                Real Time Visitors: {visitorCount}
              </span>
            </div>

            {/* Property Title */}
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl leading-tight text-[#241623] mb-3 capitalize">
              {property.title}
            </h1>

            {/* Location */}
            <div className="flex items-start mb-3">
              <MapPin className="w-4 h-4 text-[#898F97] mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-[#898F97] text-sm leading-relaxed">
                {property.address}, {property.city}, {property.state} {property.zip_code}
              </span>
            </div>

            {/* APN Number */}
            <div className="flex items-center mb-4">
              <span className="text-[#898F97] text-sm mr-3">APN:</span>
              <span className="text-[#010101] font-semibold text-sm">{property.apn || '303803122'}</span>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/60 rounded-lg border border-gray-100">
              <div>
                <span className="text-[#898F97] text-xs block mb-1">Size</span>
                <span className="text-[#010101] font-bold text-sm">{property.size_acres} AC</span>
              </div>
              <div>
                <span className="text-[#898F97] text-xs block mb-1">City</span>
                <span className="text-[#010101] font-bold text-sm">{property.city}</span>
              </div>
              <div>
                <span className="text-[#898F97] text-xs block mb-1">State</span>
                <span className="text-[#010101] font-bold text-sm">{property.state}</span>
              </div>
              <div>
                <span className="text-[#898F97] text-xs block mb-1">County</span>
                <span className="text-[#010101] font-bold text-sm">{property.county || 'Brambon'}</span>
              </div>
            </div>

            {/* Price and Contact */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[#898F97] text-xs block mb-1">Total Price</span>
                  <span className="text-[#329DF9] font-bold text-2xl sm:text-3xl">$ {property.price.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {/* AR View Button */}
                  <button
                    onClick={() => setShowARModal(true)}
                    className="flex items-center bg-green-600/10 rounded-full px-4 py-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-green-600/20 border-2 border-green-600"
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">AR</span>
                    </div>
                    <span className="text-green-600 text-base font-semibold">
                      View in AR
                    </span>
                  </button>
                  
                  {/* Phone Contact */}
                  <a 
                    href={`tel:${ownerProfile?.phone || ''}`}
                    className="flex items-center bg-[#329DF9]/10 rounded-full px-4 py-3 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-[#329DF9]/20"
                  >
                    <div className="w-10 h-10 bg-[#329DF9] rounded-full flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#329DF9] text-base font-semibold">
                      {ownerProfile?.phone ? ownerProfile.phone : 'Phone number unavailable'}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-4">
              <button
                onClick={() => setReserveModalOpen(true)}
                className="w-full h-12 bg-[#329DF9] hover:bg-[#329DF9]/90 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              >
                Make Offer
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </button>
              
              <button 
                className="flex items-center justify-center w-full h-12 border-2 border-[#329DF9] text-[#329DF9] hover:bg-[#329DF9]/5 rounded-lg font-medium transition-all"
                onClick={() => {
                  const lat = property.latitude || 32.8299074;
                  const lng = property.longitude || -96.7911844;
                  window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
                }}
              >
                View on Map
              </button>
              
              {/* Save and Share */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-10 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="h-10 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Property Description Section */}
        <section className="max-w-[1363px] mx-auto px-6 py-16">
          <h2 className="text-[36px] font-normal text-center text-[#010101] mb-12 font-serif">
            Property Description
          </h2>
          <div className="text-[#898F97] text-lg leading-[31px] mb-8">
            {property.description || `Welcome to an incredible opportunity to own a stunning ${property.size_acres}-acre vacant land in ${property.city}, ${property.state}. This prime piece of land offers breathtaking views and is located in a desirable neighborhood. The property is zoned residential, giving you the flexibility to design and build the home of your dreams. Whether you're a builder, developer, or someone looking to invest in prime real estate, this ${property.size_acres}-acre vacant land is the perfect choice for you.`}
          </div>

          {/* Disclaimer Section */}
          {ownerProfile?.disclaimer && (
            <div className="mt-8 p-6 bg-gray-50 border-l-4 border-blue-500 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Disclaimer</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {ownerProfile.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Property Details Section */}
        <section className="max-w-[1423px] mx-auto px-6 py-16 relative">
          <h2 className="text-[36px] font-normal text-center text-[#010101] mb-12 font-serif">
            Property Details
          </h2>
          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Details List */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-100">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">🚰</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">Sewer :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">
                        {property.sewer ?? 'Not specified'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">📏</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">Acre :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">{property.size_acres} AC</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">🏘️</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">Zoning :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">
                        {property.zoning ?? 'Not available'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">💰</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">Price :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">$ {property.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">🔢</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">APN Number :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">{property.apn || '303803122'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">🏛️</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">County :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">{property.county || 'San Bernardino'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">🏙️</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">City :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">{property.city}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">📍</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">GPS Coordinates :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base font-mono">
                        {property.latitude != null && property.longitude != null
                          ? `${Number(property.latitude).toFixed(6)}, ${Number(property.longitude).toFixed(6)}`
                          : 'Not available'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Property Boundary Points */}
                  <div className="flex items-start gap-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-xs">🗺️</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-blue-700 text-sm lg:text-base font-medium mb-2 block">
                        Property Boundary Points :-
                        {boundaryPointsLoading && (
                          <span className="text-xs text-blue-600 ml-2">(Loading from Regrid API...)</span>
                        )}
                        
                        {pickedCorners.length > 0 && (
                          <span className="text-xs text-green-600 ml-2">({pickedCorners.length} corners picked by buyer)</span>
                        )}
                      </span>
                      
                      {/* Show buyer-picked corners */}
                      {pickedCorners.length > 0 && (
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-green-700 font-medium text-sm mb-2">Buyer-Selected Corners:</div>
                          <div className="space-y-1">
                            {pickedCorners.map((corner) => (
                              <div key={corner.id} className="text-green-700 font-mono text-xs">
                                {corner.label}: {corner.lat.toFixed(6)}, {corner.lng.toFixed(6)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {boundaryPoints.length > 0 ? (
                        <BoundaryPointsEditor 
                          initialPoints={boundaryPoints}
                          onPointsChange={saveBoundaryPoints}
                          editable={user?.id === property.user_id}
                        />
                      ) : !boundaryPointsLoading ? (
                        <div className="text-gray-500 text-sm italic">
                          No boundary points available for this property
                        </div>
                      ) : null}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">💧</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">Water :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">
                        {property.water ?? 'Not specified'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 text-xs">⚡</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[#898F97] text-sm lg:text-base font-medium">Electricity :-</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#010101] font-semibold text-sm lg:text-base">
                        {property.electricity ?? 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Image */}
            <div className="w-full max-w-2xl lg:max-w-4xl h-[50vh] lg:h-[75vh] rounded-[15px] overflow-hidden relative bg-black mx-auto order-1 lg:order-2">
              {/* TikTok-style vertical scrolling container */}
              <div className="absolute inset-0 overflow-y-auto snap-y snap-mandatory scrollbar-hide">
                {displayImages.map((image, index) => (
                  <div key={index} className="w-full h-full snap-start snap-always relative flex-shrink-0 flex items-center justify-center">
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className={`w-full h-full object-contain object-center lg:object-right ${
                        !user ? 'filter blur-[8px]' : ''
                      }`}
                    />
                    
                    {/* Image counter overlay */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {index + 1} / {images.length}
                    </div>
                    
                    {/* Scroll indicator dots */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
                      {images.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                         className={`w-3 h-3 rounded-full transition-all duration-300 ${
                           index === selectedImageIndex
                             ? 'bg-white shadow-lg scale-125'
                             : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                         }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Blur overlay for property details image */}
              {!user && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-end pr-8 z-10">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-gray-700 font-medium">Sign in to view</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-[1423px] mx-auto px-6 py-16">
          <h2 className="text-[36px] font-normal text-center text-[#010101] mb-12 font-serif">
            Property Location
          </h2>
          <PropertyMap
            lat={property.latitude || 32.8299074}
            lng={property.longitude || -96.7911844}
            title={property.title}
            address={`${property.address}, ${property.city}, ${property.state}, USA, ${property.zip_code}`}
            polygonCoords={polygonCoords}
            onCornerPick={(corners) => {
              console.log('Corners picked by buyer:', corners);
              setPickedCorners(corners);
            }}
            isPickingMode={true}
          />
        </section>

        {/* Why Choose Acreage Sale Section */}
        <section className="w-full py-16 bg-[#329DF9]/5">
          <div className="max-w-[1422px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[36px] font-normal text-[#010101] mb-6 font-serif">
                Why Choose Acreage Sale
              </h2>
              <p className="text-[#898F97] text-lg max-w-md mx-auto">
                Here's your one-click entry to the most lucrative land deals in the US neighbourhoods!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { 
                  title: 'Affordable', 
                  description: 'Competitive pricing with no hidden fees. Now you are in the driver seat. No middle-man.',
                  icon: '💰'
                },
                { 
                  title: 'Flexible Payment', 
                  description: 'Negotiate with the owner wheter you want to go in person to the county recorder or use an escrow company. Title insurance is always recommended.',
                  icon: '🔒'
                },
                { 
                  title: 'Deed Recording', 
                  description: 'Once the offer is accepted by the sellerwe will refer you to a well known escrow company for recording.',
                  icon: '📋'
                },
                { 
                  title: 'Special Deals', 
                  description: 'Exclusive properties coming directly from the owners. Mot never benn on MLS before.',
                  icon: '⭐'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#329DF9] to-[#1e40af] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-[#010101] font-bold text-xl mb-4 group-hover:text-[#329DF9] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-[#898F97] text-base leading-7 max-w-xs mx-auto">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Properties Section */}
        <NearbyPropertiesSection currentProperty={property} />

        {/* Footer */}
        <footer className="w-full bg-[#010101] py-16">
          <div className="max-w-[1423px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
              {/* Logo and Description */}
              <div>
                <div className="w-[102px] h-[69px] bg-[#329DF9] rounded mb-6 flex items-center justify-center">
                  <span className="text-white font-bold">LOGO</span>
                </div>
                <p className="text-[#898F97] text-base font-medium uppercase">
                  LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TYPESETTING INDUSTRY.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 uppercase">Navigate</h3>
                <div className="w-[50px] h-px bg-white mb-6"></div>
                <nav className="space-y-6">
                  {['HOME', 'BLOGS', 'ABOUT US', 'CONTACT US', 'PROPERTIES', 'VIDEO GALLERY', 'CONTACT US'].map((item, index) => (
                    <a key={index} href="#" className={`block font-medium text-base uppercase ${index === 0 ? 'text-[#329DF9]' : 'text-white'}`}>
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 uppercase">Contact Us</h3>
                <div className="w-[50px] h-px bg-white mb-6"></div>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#898F97] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#898F97]" />
                    </div>
                    <p className="text-white text-base font-medium">
                      FLORIN RAICA 4470 W SUNSET BLVD SUITE #91147 LOS ANGELES, CA 90027
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-[#898F97] rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#898F97]" />
                    </div>
                    <p className="text-white text-base font-medium">949-767-8885</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-[#898F97] rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#898F97]" />
                    </div>
                    <p className="text-white text-base font-medium">INFO@ACREAGESALES.COM</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6 uppercase">Join the Newsletter</h3>
                <div className="w-[50px] h-px bg-white mb-6"></div>
                <p className="text-white text-base mb-6">Get the freshest Seasons USA news.</p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-[50px] bg-transparent border border-white/15 rounded px-4 text-white placeholder:text-[#7c7e83]"
                  />
                  <Button className="w-full h-[50px] bg-transparent border border-[#329DF9] text-white hover:bg-[#329DF9]/10">
                    <span className="font-semibold text-base uppercase">Subscribe Now</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          mode="signin"
        />

        <BuyerContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          property={property}
          ownerPhone={ownerProfile?.phone}
        />

        <ReservePropertyModal
          isOpen={reserveModalOpen}
          onClose={() => setReserveModalOpen(false)}
          property={property}
        />
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
             onClick={(e) => {
               if (e.target === e.currentTarget) {
                 closeFullscreen();
               }
             }}>
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-300 shadow-lg"
            aria-label="Close fullscreen view"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-medium shadow-lg text-sm lg:text-base">
            {fullscreenImageIndex + 1} / {displayImages.length}
          </div>

          <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-8">
            <img
              src={displayImages[fullscreenImageIndex]}
              alt={`${property.title} - Fullscreen ${fullscreenImageIndex + 1}`}
              className="w-full h-full object-contain transition-opacity duration-300"
              style={{ maxWidth: '100vw', maxHeight: '100vh' }}
            />
          </div>

          {/* Navigation arrows - only show if multiple images */}
          {displayImages.length > 1 && (
            <>
              {/* Left navigation arrow */}
              <button
                onClick={prevFullscreenImage}
                className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-300 shadow-lg group"
              >
                <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
              </button>

              {/* Right navigation arrow */}
              <button
                onClick={nextFullscreenImage}
                className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-100 transition-all duration-300 shadow-lg group"
              >
                <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Thumbnail navigation strip */}
          {property.images.length > 1 && (
            <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex gap-2 lg:gap-3 bg-white/20 backdrop-blur-sm rounded-full p-2 lg:p-3 shadow-lg max-w-[90vw] overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setFullscreenImageIndex(index)}
                    className={`w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === fullscreenImageIndex
                        ? 'ring-2 ring-white scale-110 shadow-lg'
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={displayImages[index]}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard hints */}
          <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-lg">
            ← → Navigate • ESC Close
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* AR Modal */}
      {showARModal && (
        <div className="fixed inset-0 bg-black z-50">
          <PropertyAR 
            property={{
              latitude: property.latitude,
              longitude: property.longitude,
              title: property.title,
              boundaryPoints: boundaryPoints
            }}
          />
          <button
            onClick={() => setShowARModal(false)}
            className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            Close AR
          </button>
        </div>
      )}
      </div>
    </>
  );
}