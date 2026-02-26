import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Search, Filter, MapPin, DollarSign, Ruler, Building, Zap, Phone, Mail, Clock, Eye, TrendingUp, Users, Award, Target, Map as MapIcon, ChartBar as BarChart3, Bell, CircleCheck as CheckCircle, Brain, Satellite, Calendar, Grid2x2 as Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { SEO } from '../components/SEO';

type Property = Database['public']['Tables']['properties']['Row'];

const searchSchema = z.object({
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minAcreage: z.number().optional(),
  maxAcreage: z.number().optional(),
  propertyType: z.string().optional(),
  utilities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
});

type SearchForm = z.infer<typeof searchSchema>;

export function AdvancedSearch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'size_low' | 'size_high'>('newest');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      utilities: [],
      features: [],
    },
  });

  const stats = [
    { icon: Building, label: "Properties", value: "50,000+", color: "text-blue-600" },
    { icon: Filter, label: "Search Filters", value: "25+", color: "text-purple-600" },
    { icon: Brain, label: "AI Powered", value: "Smart Matching", color: "text-green-600" },
    { icon: Clock, label: "Real-Time", value: "Updates", color: "text-orange-600" }
  ];

  const additionalStats = [
    { icon: Users, label: "Active Properties", value: "50,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Total Value", value: "$2.5B+", color: "text-green-600" },
    { icon: MapPin, label: "States Covered", value: "50", color: "text-purple-600" },
    { icon: Award, label: "Success Rate", value: "98%", color: "text-orange-600" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our AI analyzes your preferences and suggests properties that match your investment goals"
    },
    {
      icon: MapIcon,
      title: "Interactive Maps",
      description: "Visualize properties on detailed maps with satellite imagery and boundary overlays"
    },
    {
      icon: Filter,
      title: "25+ Search Filters",
      description: "Filter by price, size, location, utilities, zoning, and dozens of other criteria"
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Real-time market data and pricing trends to inform your investment decisions"
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Get notified immediately when new properties match your search criteria"
    },
    {
      icon: CheckCircle,
      title: "Verified Listings",
      description: "All properties are verified with accurate data and professional photography"
    }
  ];

  const utilityOptions = [
    'Electricity Available',
    'Water Available', 
    'Sewer Available',
    'Natural Gas Available',
    'Internet Available',
    'Phone Service Available'
  ];

  const featureOptions = [
    'Road Access',
    'Mountain Views',
    'Water Views',
    'Wooded',
    'Cleared',
    'Fenced',
    'Well on Property',
    'Septic System',
    'Barn/Outbuildings'
  ];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const propertiesWithImages = (data || []).map(property => ({
        ...property,
        images: property.images && property.images.length > 0 
          ? property.images 
          : ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600']
      }));

      setProperties(propertiesWithImages);
      setFilteredProperties(propertiesWithImages);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (data: SearchForm) => {
    let filtered = [...properties];

    // Location filter
    if (data.location) {
      const searchTerm = data.location.toLowerCase();
      filtered = filtered.filter(property =>
        property.city.toLowerCase().includes(searchTerm) ||
        property.state.toLowerCase().includes(searchTerm) ||
        (property.county && property.county.toLowerCase().includes(searchTerm))
      );
    }

    // Price range filter
    if (data.minPrice) {
      filtered = filtered.filter(property => property.price >= data.minPrice!);
    }
    if (data.maxPrice) {
      filtered = filtered.filter(property => property.price <= data.maxPrice!);
    }

    // Acreage filter
    if (data.minAcreage) {
      filtered = filtered.filter(property => property.size_acres >= data.minAcreage!);
    }
    if (data.maxAcreage) {
      filtered = filtered.filter(property => property.size_acres <= data.maxAcreage!);
    }

    // Property type filter
    if (data.propertyType) {
      filtered = filtered.filter(property => 
        property.zoning?.toLowerCase().includes(data.propertyType!.toLowerCase())
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'size_low':
          return a.size_acres - b.size_acres;
        case 'size_high':
          return b.size_acres - a.size_acres;
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredProperties(filtered);
  };

  const handlePropertyClick = (property: Property, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthModalOpen(true);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEO slug="advanced-search" />
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

      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🔍 Advanced Property Search
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Find Your <span className="text-[#329cf9]">Perfect Land</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Use our advanced search filters to discover the ideal property for your investment, development, or personal use. Search by location, price, size, and dozens of other criteria.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {additionalStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search Filters */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Filter className="w-6 h-6 text-[#329cf9]" />
                    Search Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('location')}
                          placeholder="City, State, or County"
                          className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9]"
                        />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Price Range
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            {...form.register('minPrice', { valueAsNumber: true })}
                            type="number"
                            placeholder="Min"
                            className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                          />
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            {...form.register('maxPrice', { valueAsNumber: true })}
                            type="number"
                            placeholder="Max"
                            className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Acreage */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Acreage
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            {...form.register('minAcreage', { valueAsNumber: true })}
                            type="number"
                            step="0.1"
                            placeholder="Min"
                            className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                          />
                        </div>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            {...form.register('maxAcreage', { valueAsNumber: true })}
                            type="number"
                            step="0.1"
                            placeholder="Max"
                            className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Property Type
                      </label>
                      <select
                        {...form.register('propertyType')}
                        className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] px-4 text-gray-700"
                      >
                        <option value="">All Types</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Agricultural">Agricultural</option>
                        <option value="Industrial">Industrial</option>
                      </select>
                    </div>

                    {/* Utilities Available */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Utilities Available
                      </label>
                      <div className="space-y-2">
                        {utilityOptions.map((utility) => (
                          <label key={utility} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              value={utility}
                              {...form.register('utilities')}
                              className="w-4 h-4 text-[#329cf9] border-gray-300 rounded focus:ring-[#329cf9]"
                            />
                            <span className="text-gray-700">{utility}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Property Features */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Property Features
                      </label>
                      <div className="space-y-2">
                        {featureOptions.map((feature) => (
                          <label key={feature} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              value={feature}
                              {...form.register('features')}
                              className="w-4 h-4 text-[#329cf9] border-gray-300 rounded focus:ring-[#329cf9]"
                            />
                            <span className="text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-[#329cf9] hover:bg-[#2563eb] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      disabled={loading}
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search Properties
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Search Results
                    </CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-[#329cf9] text-white px-4 py-2 font-bold">
                        {filteredProperties.length} properties found
                      </Badge>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="h-10 border border-gray-300 rounded-lg px-3 text-sm"
                      >
                        <option value="newest">Newest First</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="size_low">Size: Small to Large</option>
                        <option value="size_high">Size: Large to Small</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-4 border-[#329cf9] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">No properties found</h3>
                      <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all properties</p>
                      <Link to="/properties">
                        <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                          Browse All Properties
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredProperties.map((property) => (
                        <Link 
                          key={property.id} 
                          to={`/property/${property.id}`}
                          onClick={(e) => handlePropertyClick(property, e)}
                        >
                          <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#329cf9]">
                            <CardContent className="p-6">
                              <div className="flex gap-6">
                                <img
                                  src={property.images[0]}
                                  alt={property.title}
                                  className={`w-32 h-32 object-cover rounded-xl flex-shrink-0 shadow-md ${
                                    !user ? 'filter blur-[4px]' : ''
                                  }`}
                                />
                                
                                {/* Blur overlay for search results */}
                                {!user && (
                                  <div className="absolute top-0 left-0 w-32 h-32 bg-black/10 rounded-xl flex items-center justify-center">
                                    <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-gray-700 font-medium">
                                      Sign in to view
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                                  <div className="flex items-center text-gray-600 mb-3">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{property.city}, {property.state}</span>
                                  </div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                      <span className="text-gray-500 text-sm">Price</span>
                                      <p className="font-bold text-green-600">${property.price.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500 text-sm">Size</span>
                                      <p className="font-bold text-gray-900">{property.size_acres} acres</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500 text-sm">County</span>
                                      <p className="font-bold text-gray-900">{property.county || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-500 text-sm">APN</span>
                                      <p className="font-bold text-gray-900">{property.apn || 'N/A'}</p>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 line-clamp-2">{property.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Search Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Advanced Search <span className="text-[#329cf9]">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools to help you find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#329cf9] transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-[#329cf9] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've found their ideal properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Button 
              onClick={() => form.handleSubmit(handleSearch)()}
              className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white"
            >
              Start Your Search Now
            </Button>
            <Link to="/properties">
              <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
                Browse All Properties
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Call Now</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">949-767-8885</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Email Us</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">info@acreagesales.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Fast Response</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">Within 24 Hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signin"
      />
    </div>
    );
}