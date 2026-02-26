import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Ruler, DollarSign, Eye, Heart, Share2, Play, Pause } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';

type Property = Database['public']['Tables']['properties']['Row'];

export function PropertyCourselShortcode() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, price, size_acres, city, state, county, apn, images, status, created_at')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      const propertiesWithImages = (data || []).map(property => ({
        ...property,
        images: property.images && property.images.length > 0 
          ? property.images 
          : ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600']
      }));

      setProperties(propertiesWithImages);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to mock data
      setProperties([
        {
          id: 'mock-1',
          user_id: 'mock-user',
          title: 'Beautiful 5-Acre Plot in Texas Hill Country',
          description: 'Stunning rural property with rolling hills',
          price: 125000,
          size_acres: 5.2,
          address: '1234 Ranch Road',
          city: 'Austin',
          state: 'TX',
          zip_code: '78737',
          county: 'Travis County',
          apn: 'TX-1234-5678',
          latitude: 30.2672,
          longitude: -97.7431,
          images: ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          boundary_points: null,
          zoning: 'Agricultural',
          water: 'Well',
          electricity: 'Available',
          sewer: 'Septic'
        },
        {
          id: 'mock-2',
          user_id: 'mock-user',
          title: 'Mountain View Acreage in Colorado',
          description: 'Pristine mountain property with incredible views',
          price: 275000,
          size_acres: 10.5,
          address: '5678 Mountain View Drive',
          city: 'Denver',
          state: 'CO',
          zip_code: '80424',
          county: 'Summit County',
          apn: 'CO-8765-4321',
          latitude: 39.7392,
          longitude: -104.9903,
          images: ['https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          boundary_points: null,
          zoning: 'Residential',
          water: 'Municipal',
          electricity: 'Available',
          sewer: 'Municipal'
        },
        {
          id: 'mock-3',
          user_id: 'mock-user',
          title: 'Coastal Development Land in California',
          description: 'Prime development opportunity near the coast',
          price: 450000,
          size_acres: 3.8,
          address: '9012 Pacific Coast Highway',
          city: 'Los Angeles',
          state: 'CA',
          zip_code: '90265',
          county: 'Los Angeles County',
          apn: 'CA-2468-1357',
          latitude: 34.0522,
          longitude: -118.2437,
          images: ['https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          boundary_points: null,
          zoning: 'Commercial',
          water: 'Municipal',
          electricity: 'Available',
          sewer: 'Municipal'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPlaying || properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= properties.length ? 0 : nextIndex;
      });
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying, properties.length]);

  const nextProperty = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= properties.length ? 0 : prevIndex + 1
    );
  };

  const prevProperty = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? properties.length - 1 : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePropertyClick = (property: Property, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthModalOpen(true);
      return;
    }
  };

  if (loading) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#329cf9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-semibold text-gray-700">Loading properties...</div>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500 text-lg">No properties available</div>
            <Link to="/properties" className="text-[#329cf9] hover:underline mt-4 inline-block">
              View all properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get 3 properties to display based on current index
  const getVisibleProperties = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % properties.length;
      visible.push(properties[index]);
    }
    return visible;
  };

  const visibleProperties = getVisibleProperties();

  return (
    <div className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
            🏡 Featured Properties
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Property <span className="text-[#329cf9]">Carousel</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exceptional land opportunities with our interactive property showcase
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevProperty}
            className="w-12 h-12 rounded-full border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            className="w-12 h-12 rounded-full border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextProperty}
            className="w-12 h-12 rounded-full border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {visibleProperties.map((property, index) => {
            const seed = property.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
            const views = Math.floor((seed % 100) + 50);
            
            return (
              <Card
                key={`${property.id}-${currentIndex}-${index}`}
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white transform hover:scale-105"
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        !user ? 'filter blur-[6px]' : ''
                      }`}
                    />
                    
                    {/* Blur overlay for non-authenticated users */}
                    {!user && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <span className="text-gray-700 font-medium text-sm">Sign in to view</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Price badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#329cf9] text-white font-bold shadow-lg text-lg px-4 py-2">
                        ${property.price.toLocaleString()}
                      </Badge>
                    </div>
                    
                    {/* Views and actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {views}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#329cf9]/80 transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#329cf9]/80 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#329cf9] transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{property.city}, {property.state}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-600">
                        <Ruler className="w-4 h-4 mr-1" />
                        <span className="font-medium">{property.size_acres} AC</span>
                      </div>
                      {property.county && (
                        <span className="text-sm text-gray-500">{property.county}</span>
                      )}
                    </div>

                    <Link 
                      to={`/property/${property.id}`}
                      onClick={(e) => handlePropertyClick(property, e)}
                    >
                      <Button className="w-full bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-medium transition-all duration-300 group-hover:shadow-lg">
                        View Property Details
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#329cf9] w-8 shadow-lg' 
                  : 'bg-gray-300 hover:bg-[#329cf9]/60'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
            <div className="text-sm text-gray-600">Featured Properties</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000)}K
            </div>
            <div className="text-sm text-gray-600">Avg. Price</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Ruler className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(properties.reduce((sum, p) => sum + p.size_acres, 0) / properties.length * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">Avg. Acres</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(properties.map(p => p.state)).size}
            </div>
            <div className="text-sm text-gray-600">States</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-[#329cf9]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Viewing</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse properties with our interactive carousel featuring high-quality images, detailed information, and easy navigation controls.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#329cf9]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Save Favorites</h3>
              <p className="text-gray-600 leading-relaxed">
                Save properties you're interested in and get notifications when similar properties become available in your preferred areas.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-[#329cf9]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Share Properties</h3>
              <p className="text-gray-600 leading-relaxed">
                Easily share interesting properties with family, friends, or investment partners through social media or direct links.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Instructions */}
        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Use the Property Carousel</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  1
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Browse Properties</h4>
                <p className="text-gray-600 text-sm">View featured properties with automatic rotation or manual navigation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  2
                </div>
                <h4 className="font-bold text-gray-900 mb-2">View Details</h4>
                <p className="text-gray-600 text-sm">Click on any property to see detailed information, photos, and market data</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  3
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Save Favorites</h4>
                <p className="text-gray-600 text-sm">Save properties you like and get alerts for similar opportunities</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  4
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Contact Owners</h4>
                <p className="text-gray-600 text-sm">Connect directly with property owners for negotiations and purchases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/properties">
            <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signin"
      />
    </div>
  );
}