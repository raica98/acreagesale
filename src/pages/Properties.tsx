import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Search, Filter, MapPin, Ruler, DollarSign, Eye, Heart, Grid, Map as MapIcon, LayoutGrid, List } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { supabase, Database } from '../lib/supabase';
import { dbHelpers } from '../lib/dbHelpers';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { SEO } from '../components/SEO';
import { SoldOutNotification } from '../components/properties/SoldOutNotification';
import 'leaflet/dist/leaflet.css';

type Property = Database['public']['Tables']['properties']['Row'];

// Fix for default markers in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map events
const MapEventHandler = ({ onBoundsChange }: { onBoundsChange: (bounds: any) => void }) => {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    },
    zoomend: () => {
      const bounds = map.getBounds();
      onBoundsChange(bounds);
    },
  });
  return null;
};

// Component to handle map view changes without remounting
const ChangeMapView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const PropertyCard = ({ property }: { property: Property }) => {
  if (!property.images?.[0]) return null;

  return (
    <div className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 rounded-xl relative w-full aspect-square">
      <Link to={`/property/${property.id}`} className="block">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 ${
              !useAuth().user ? 'filter blur-[8px]' : ''
            }`}
          />
        
        {/* Blur overlay for non-authenticated users */}
        {!useAuth().user && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/30">
              <span className="text-white font-medium text-base">Sign in to view</span>
            </div>
          </div>
        )}

        {/* Hover Overlay with all content */}
        <div className="absolute inset-0 bg-[#329cf9]/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end w-full h-full">
          {/* Price Badge - visible on hover */}
          <div className="absolute top-4 left-4">
            <div className="bg-white text-[#329cf9] px-4 py-2 text-lg font-bold shadow-lg rounded-lg">
              ${property.price.toLocaleString()}
            </div>
          </div>

          {/* Status Badge - visible on hover */}
          <div className="absolute top-4 right-4">
            <div className="bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-lg shadow-md">
              Available
            </div>
          </div>

          {/* Main content area */}
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white p-6">
            <h3 className="font-bold text-xl mb-2 line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-base">{property.city}, {property.state}</span>
            </div>
            <div className="flex items-center mb-4">
              <Ruler className="w-4 h-4 mr-2" />
              <span className="font-medium text-base">{property.size_acres} acres</span>
            </div>
            <Button className="w-full bg-white text-[#329cf9] hover:bg-gray-100 font-bold py-2 rounded-lg">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  </div>
  );
};

export function Properties() {
  const location = useLocation();
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.8283, -98.5795]);
  const [viewMode, setViewMode] = useState<'grid' | 'split'>('split');
  const [priceRange, setPriceRange] = useState<'all' | 'under50k' | '50k-100k' | 'over100k'>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [mapBounds, setMapBounds] = useState<any>(null);
  const [visibleProperties, setVisibleProperties] = useState<Property[]>([]);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Extract search term from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    const propertiesWithCoords = filteredProperties.filter(p => p.latitude && p.longitude);
    console.log('Properties with coordinates:', propertiesWithCoords.length);
    console.log('All properties:', filteredProperties.length);
    propertiesWithCoords.forEach(p => {
      console.log(`Property: ${p.title}, Coords: ${p.latitude}, ${p.longitude}`);
    });
  }, [filteredProperties]);

  // Optimized property fetching with pagination
  const fetchProperties = async (pageNum: number = 0, append: boolean = false) => {
    if (pageNum === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const result = await dbHelpers.properties.getPaginatedForPropertiesPage(pageNum, 100);

      if (result.error) {
        throw result.error;
      }
      
      if (append) {
        setProperties(prev => [...prev, ...result.data]);
      } else {
        setProperties(result.data);
      }
      
      setHasMore(result.hasMore);
      
    } catch (error) {
      console.error('Error fetching properties:', error);
      if (!append) {
        setProperties([]);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setInitialLoad(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Load more properties
  const loadMoreProperties = async () => {
    if (!hasMore || loadingMore) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchProperties(nextPage, true);
  };

  // Filter properties based on search and price
  useEffect(() => {
    let filtered = properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.county && property.county.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply price filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(property => {
        switch (priceRange) {
          case 'under50k':
            return property.price < 50000;
          case '50k-100k':
            return property.price >= 50000 && property.price <= 100000;
          case 'over100k':
            return property.price > 100000;
          default:
            return true;
        }
      });
    }

    setFilteredProperties(filtered);
  }, [properties, searchTerm, priceRange]);

  // Filter properties based on map bounds
  useEffect(() => {
    if (!mapBounds) {
      setVisibleProperties(filteredProperties);
      return;
    }

    const propertiesInBounds = filteredProperties.filter(property => {
      if (!property.latitude || !property.longitude) return false;

      const lat = property.latitude;
      const lng = property.longitude;

      return (
        lat >= mapBounds.getSouth() &&
        lat <= mapBounds.getNorth() &&
        lng >= mapBounds.getWest() &&
        lng <= mapBounds.getEast()
      );
    });

    setVisibleProperties(propertiesInBounds);
  }, [filteredProperties, mapBounds]);

  const handlePropertyClick = (property: Property, e?: React.MouseEvent) => {
    if (!user) {
      e?.preventDefault();
      setAuthMode('signin');
      setAuthModalOpen(true);
      return;
    }
    
    setSelectedProperty(property);
    if (property.latitude && property.longitude) {
      setMapCenter([property.latitude, property.longitude]);
    }
  };

  const handleMapBoundsChange = (bounds: any) => {
    setMapBounds(bounds);
  };

  if (loading && initialLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading properties...</div>
          <div className="text-sm text-gray-500 mt-2">Optimizing for best performance...</div>
        </div>
      </div>
    );
  }

  // Show error state if no properties and not loading
  if (!loading && !initialLoad && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-red-500 text-3xl">🔌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to Connect</h2>
          <p className="text-gray-600 mb-6">
            We're having trouble connecting to the database. This could be because:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Your Supabase project might be paused</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                <span>Network connectivity issues</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                <span>Firewall or ad-blocker interference</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => fetchProperties()}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const hasSearchParams = location.search.includes('search=');

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="properties" noindex={hasSearchParams} />
      {/* Hero Header */}
      <div className="relative bg-blue text-white overflow-hidden pt-4 lg:pt-6">
        <div className="absolute inset-0 bg-black/10">
          {/* Back Button */}
          <div className="absolute top-1 left-1 lg:top-2 lg:left-2 z-10">
            <Link 
              to="/" 
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md transition-colors duration-200 backdrop-blur-sm border border-white/20 text-xs lg:text-sm"
            >
              <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="font-medium hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 lg:py-2">
          <div className="text-center mb-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1">Find Your Perfect Land</h1>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-1.5 lg:p-2">
              {/* Single line search */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-1.5 lg:gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/80 w-3 h-3 lg:w-4 lg:h-4" />
                  <Input
                    placeholder="Search by location, city, or state..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-6 lg:pl-8 h-8 lg:h-10 bg-white/20 border-white/30 text-black placeholder:text-gray-500 focus:bg-white/30 focus:border-white/50 font-medium text-xs lg:text-sm rounded-md"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as any)}
                    className="h-8 lg:h-10 px-2 bg-white/90 border border-white/50 rounded-md text-black focus:bg-white focus:border-blue-500 font-medium text-xs lg:text-sm min-w-[100px] lg:min-w-[120px]"
                  >
                    <option value="all">All Prices</option>
                    <option value="under50k">Under $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="over100k">Over $100K</option>
                  </select>

                  <div className="flex bg-white/20 rounded-md p-0.5 border border-white/30">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm" 
                      onClick={() => setViewMode('grid')}
                      className={`${viewMode === 'grid' ? 'bg-white text-blue font-medium shadow-md' : 'text-white hover:bg-white/30 font-medium'} transition-all duration-200 h-6 lg:h-8 px-1.5 lg:px-2 text-xs flex-1 sm:flex-none`}
                    >
                      <LayoutGrid className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                      <span className="hidden sm:inline">Grid</span>
                    </Button>
                    <Button
                      variant={viewMode === 'split' ? 'default' : 'ghost'}
                      size="sm" 
                      onClick={() => setViewMode('split')}
                      className={`${viewMode === 'split' ? 'bg-white text-blue font-medium shadow-md' : 'text-white hover:bg-white/30 font-medium'} transition-all duration-200 h-6 lg:h-8 px-1.5 lg:px-2 text-xs flex-1 sm:flex-none`}
                    >
                      <List className="w-3 h-3 lg:w-4 lg:h-4 mr-0.5" />
                      <MapIcon className="w-3 h-3 lg:w-4 lg:h-4 ml-0.5" />
                      <span className="hidden sm:inline">Map</span>
                    </Button>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/30 text-center">
                    <span className="text-xs font-medium text-white whitespace-nowrap">
                      {filteredProperties.length} found
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center justify-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    <Filter className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs font-medium text-white">
                      Filters
                    </span>
                  </button>
                </div>
              </div>

              {/* Advanced filters dropdown */}
              {showAdvancedFilters && (
                <div className="border-t border-white/20 p-1.5 bg-white/5 mt-1.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-white text-xs mb-1">Min Price</label>
                      <Input
                        type="number"
                        placeholder="Min price"
                        className="h-8 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs mb-1">Max Price</label>
                      <Input
                        type="number"
                        placeholder="Max price"
                        className="h-8 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs mb-1">Min Acres</label>
                      <Input
                        type="number"
                        placeholder="Min acres"
                        className="h-8 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* Grid View Only */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <SoldOutNotification searchArea={searchTerm || 'this area'} />
          )}
        </div>
      ) : (
        /* Split View - List + Map */
        filteredProperties.length === 0 ? (
          <SoldOutNotification searchArea={searchTerm || 'this area'} />
        ) : (
        <div className="min-h-[calc(100vh-200px)] flex flex-col lg:flex-row">
          {/* Left Side - Property List */}
          <div className="w-full lg:w-[380px] h-96 lg:h-auto overflow-y-auto bg-gradient-to-b from-gray-50 to-white border-b lg:border-b-0 lg:border-r border-gray-200 shadow-lg">
            <div className="p-3">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue rounded-full animate-pulse"></div>
                  Properties
                </h2>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 font-bold shadow-md">
                  {visibleProperties.length} found
                </Badge>
              </div>
              
              <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                {visibleProperties.map((property) => (
                  <div key={property.id}>
                    <Link to={`/property/${property.id}`}>
                      <Card 
                        className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0 shadow-md bg-white/80 backdrop-blur-sm ${
                          selectedProperty?.id === property.id 
                            ? 'ring-2 ring-blue-500 bg-blue-50/80' 
                            : 'hover:bg-white'
                        } rounded-xl overflow-hidden`}
                        onClick={() => handlePropertyClick(property)}
                        onMouseEnter={() => {
                          setHoveredProperty(property);
                          setHoveredPropertyId(property.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredProperty(null);
                          setHoveredPropertyId(null);
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <div className="relative">
                              {property.images[0] && (
                                <img
                                  src={property.images[0]}
                                  alt={property.title}
                                  className={`w-16 h-16 object-cover rounded-xl flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow ${
                                    !user ? 'filter blur-[4px]' : ''
                                  }`}
                                />
                              )}
                              
                              {/* Blur overlay for list view */}
                              {!user && (
                                <div className="absolute top-0 left-0 w-16 h-16 bg-black/10 rounded-xl flex items-center justify-center">
                                  <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-700 font-medium">
                                    Sign in
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-1">
                                {property.title}
                              </h3>
                              <div className="flex items-center text-gray-500 mb-2">
                                <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                                <span className="text-xs">{property.city}, {property.state}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                  <span className="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    ${property.price.toLocaleString()}
                                  </span>
                                  <div className="flex items-center text-gray-500">
                                    <Ruler className="w-3 h-3 mr-1 text-purple-500" />
                                    <span className="text-xs font-medium">{property.size_acres} acres</span>
                                  </div>
                                </div>
                                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium text-xs h-7 px-3 rounded-lg shadow-md">
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>

              {visibleProperties.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {filteredProperties.length === 0 ? 'No properties found' : 'No properties in this area'}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {filteredProperties.length === 0 ? 'Try adjusting your search criteria' : 'Zoom out to see more properties'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="flex-1 h-96 lg:h-auto relative">
            <div className="absolute top-4 right-4 z-[1000]">
              <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-xl">
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Visible Properties
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {visibleProperties.length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <MapContainer
              center={mapCenter}
              zoom={selectedProperty ? 12 : 4}
              style={{ height: '100%', width: '100%' }}
            >
              <ChangeMapView center={mapCenter} zoom={selectedProperty ? 12 : 4} />
              <MapEventHandler onBoundsChange={handleMapBoundsChange} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {visibleProperties
                .filter(property => property.latitude && property.longitude)
                .map((property) => (
                  <Marker
                    key={property.id}
                    position={[property.latitude!, property.longitude!]}
                    icon={new Icon({
                      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                      iconSize: hoveredPropertyId === property.id ? [31, 51] : [25, 41],
                      iconAnchor: hoveredPropertyId === property.id ? [15, 51] : [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: hoveredPropertyId === property.id ? [51, 51] : [41, 41]
                    })}
                    eventHandlers={{
                      click: () => handlePropertyClick(property),
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className={`w-64 lg:w-80 p-2 transition-all duration-300 ${
                        hoveredProperty?.id === property.id ? 'transform scale-105 shadow-lg' : ''
                      }`}>
                        {property.images[0] && (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-32 lg:h-40 object-cover rounded-lg mb-3"
                          />
                        )}
                        <h3 className={`font-bold text-sm lg:text-base mb-2 transition-colors duration-300 ${
                          hoveredProperty?.id === property.id ? 'text-blue-600' : 'text-gray-800'
                        }`}>{property.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-base lg:text-lg font-bold text-green-600">
                            ${property.price.toLocaleString()}
                          </span>
                          <Badge className="bg-blue-100 text-blue-800">
                            {property.size_acres} acres
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-xs lg:text-sm mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.city}, {property.state}
                        </p>
                        <Link to={`/property/${property.id}`}>
                          <Button className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs lg:text-sm transition-all duration-300 ${
                            hoveredProperty?.id === property.id ? 'shadow-lg transform scale-105' : ''
                          }`}>
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
        )
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
    );
}