import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Brain, Camera, Satellite, Calculator, ChartBar as BarChart3, Plus, Upload, CreditCard as Edit3, Save, Search, Filter, Grid2x2 as Grid, List, Map as MapIcon, Share2, Bookmark, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { BuyerContactModal } from '../components/properties/BuyerContactModal';
import { ReservePropertyModal } from '../components/properties/ReservePropertyModal';
import { SEO } from '../components/SEO';

type Property = Database['public']['Tables']['properties']['Row'];

export function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [ownerPhone, setOwnerPhone] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .eq('status', 'active')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Property not found or no longer available');
        } else {
          throw error;
        }
        return;
      }

      setProperty(data);

      // Fetch owner phone number
      const { data: profileData } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', data.user_id)
        .single();

      if (profileData?.phone) {
        setOwnerPhone(profileData.phone);
      }

      // Track property view
      const viewKey = `property_views_${propertyId}`;
      const currentViews = parseInt(localStorage.getItem(viewKey) || '0');
      localStorage.setItem(viewKey, (currentViews + 1).toString());

    } catch (error) {
      console.error('Error fetching property:', error);
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleContactOwner = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setContactModalOpen(true);
  };

  const handleReserveProperty = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setReserveModalOpen(true);
  };

  const nextImage = () => {
    if (property && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev + 1 >= property.images.length ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev <= 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    <SEO slug="property-page" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#329cf9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading property details...</div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/properties">
            <Button className="bg-[#329cf9] hover:bg-[#2563eb]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const viewCount = parseInt(localStorage.getItem(`property_views_${property.id}`) || '0');
  const baseViews = (() => {
    const seed = property.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return Math.floor((seed % 50) + 25);
  })();
  const totalViews = Math.max(viewCount, baseViews);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/properties" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Properties</span>
              </Link>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Phone className="w-4 h-4" />
                <span>949-767-8885</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-4 h-4" />
            <span>{property.city}, {property.state}</span>
            {property.county && (
              <>
                <span>•</span>
                <span>{property.county}</span>
              </>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {property.title}
          </h1>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="text-3xl font-bold text-[#329cf9]">
              ${property.price.toLocaleString()}
            </div>
            <div className="flex items-center text-gray-600">
              <Ruler className="w-5 h-5 mr-2" />
              <span className="text-xl font-semibold">{property.size_acres} acres</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Eye className="w-5 h-5 mr-2" />
              <span>{totalViews} views</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleContactOwner}
              className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-6 py-3 font-semibold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Owner
            </Button>
            <Button
              onClick={handleReserveProperty}
              variant="outline"
              className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-6 py-3 font-semibold"
            >
              <Bookmark className="w-5 h-5 mr-2" />
              Reserve Property
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img
                  src={property.images[currentImageIndex] || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Description */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Description</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description || 'This exceptional property offers incredible potential for development, investment, or personal use. Located in a prime area with excellent access and utilities, this land represents an outstanding opportunity in today\'s market.'}
                </p>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Price</span>
                      <span className="font-bold text-[#329cf9] text-lg">${property.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Size</span>
                      <span className="font-semibold text-gray-900">{property.size_acres} acres</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">APN</span>
                      <span className="font-semibold text-gray-900">{property.apn}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">County</span>
                      <span className="font-semibold text-gray-900">{property.county}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Zoning</span>
                      <span className="font-semibold text-gray-900">{property.zoning || 'Residential'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Water</span>
                      <span className="font-semibold text-gray-900">{property.water || 'Well'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Electricity</span>
                      <span className="font-semibold text-gray-900">{property.electricity || 'Available'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Sewer</span>
                      <span className="font-semibold text-gray-900">{property.sewer || 'Septic'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Map */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#329cf9]" />
                    <span className="text-lg text-gray-700">
                      {property.address && property.address !== 'N/A' ? property.address + ', ' : ''}
                      {property.city}, {property.state} {property.zip_code}
                    </span>
                  </div>
                  
                  {/* Map placeholder */}
                  <div className="aspect-[16/9] bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Interactive map coming soon</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Coordinates: {property.latitude?.toFixed(6)}, {property.longitude?.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#329cf9] to-[#1e40af] text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Interested in this property?</h3>
                <div className="space-y-4">
                  <Button
                    onClick={handleContactOwner}
                    className="w-full bg-white text-[#329cf9] hover:bg-gray-100 font-semibold py-3"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Owner
                  </Button>
                  <Button
                    onClick={handleReserveProperty}
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-[#329cf9] font-semibold py-3"
                  >
                    <Bookmark className="w-5 h-5 mr-2" />
                    Reserve Property
                  </Button>
                  {ownerPhone && (
                    <div className="flex items-center justify-center gap-2 text-white/90">
                      <Phone className="w-4 h-4" />
                      <span>Call: {ownerPhone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Property Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price per acre</span>
                    <span className="font-bold text-[#329cf9]">
                      ${Math.round(property.price / property.size_acres).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total views</span>
                    <span className="font-semibold text-gray-900">{totalViews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(property.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Similar Properties</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-[16/10] bg-gray-200 rounded-lg mb-3"></div>
                    <h4 className="font-semibold text-gray-900 mb-2">5.2 acres in {property.city}</h4>
                    <p className="text-[#329cf9] font-bold">${(property.price * 0.85).toLocaleString()}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-[16/10] bg-gray-200 rounded-lg mb-3"></div>
                    <h4 className="font-semibold text-gray-900 mb-2">8.7 acres in {property.county}</h4>
                    <p className="text-[#329cf9] font-bold">${(property.price * 1.15).toLocaleString()}</p>
                  </div>
                </div>
                <Link to="/properties" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    View More Properties
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signin"
      />
      
      <BuyerContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        property={property}
        ownerPhone={ownerPhone}
      />
      
      <ReservePropertyModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        property={property}
      />
    </div>
  );
}