import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Brain, Camera, Satellite, Calculator, ChartBar as BarChart3, Plus, Upload, CreditCard as Edit3, Save, Search, Filter, Grid2x2 as Grid, List, Map as MapIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { SEO } from '../components/SEO';

const searchSchema = z.object({
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minAcreage: z.number().optional(),
  maxAcreage: z.number().optional(),
  propertyType: z.string().optional(),
});

type SearchForm = z.infer<typeof searchSchema>;

export function Property() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const handleSearch = (data: SearchForm) => {
    console.log('Search data:', data);
    // Handle search logic here
  };

  const stats = [
    { icon: Building, label: "Total Properties", value: "50,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Total Value", value: "$2.5B+", color: "text-green-600" },
    { icon: MapPin, label: "States Covered", value: "50", color: "text-purple-600" },
    { icon: Users, label: "Active Buyers", value: "25,000+", color: "text-orange-600" }
  ];

  const additionalStats = [
    { icon: Eye, label: "Monthly Views", value: "2M+", color: "text-blue-600" },
    { icon: TrendingUp, label: "Avg. Appreciation", value: "12%", color: "text-green-600" },
    { icon: Clock, label: "Avg. Time to Sell", value: "45 Days", color: "text-purple-600" },
    { icon: Star, label: "Customer Rating", value: "4.9/5", color: "text-orange-600" }
  ];

  const features = [
    { icon: Brain, title: "AI-Powered Search", description: "Advanced AI algorithms help you find properties that match your exact criteria and investment goals" },
    { icon: Satellite, title: "Satellite Imagery", description: "High-resolution aerial photos and satellite imagery for every property listing" },
    { icon: BarChart3, title: "Market Analytics", description: "Real-time market data, pricing trends, and investment analysis for informed decisions" },
    { icon: Target, title: "Smart Matching", description: "Get notified when new properties match your search criteria and investment preferences" },
    { icon: Shield, title: "Verified Listings", description: "All properties are verified with accurate data, legal descriptions, and current ownership information" },
    { icon: Zap, title: "Instant Alerts", description: "Real-time notifications when new properties become available in your areas of interest" }
  ];

  const propertyCategories = [
    {
      title: "Residential Land",
      description: "Perfect for building your dream home or residential development projects",
      count: "15,000+",
      priceRange: "$25,000 - $500,000",
      avgSize: "2-10 acres",
      icon: Home,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Commercial Land",
      description: "Prime locations for retail, office, and mixed-use commercial developments",
      count: "8,500+",
      priceRange: "$100,000 - $2M+",
      avgSize: "1-25 acres",
      icon: Building,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Agricultural Land",
      description: "Farmland, ranches, and agricultural operations across America's heartland",
      count: "12,000+",
      priceRange: "$5,000 - $50,000/acre",
      avgSize: "10-500 acres",
      icon: TreePine,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "Industrial Land",
      description: "Manufacturing, warehousing, and industrial development opportunities",
      count: "5,500+",
      priceRange: "$50,000 - $1M+",
      avgSize: "5-100 acres",
      icon: Factory,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Recreational Land",
      description: "Hunting, camping, and outdoor recreation properties in scenic locations",
      count: "6,200+",
      priceRange: "$15,000 - $300,000",
      avgSize: "5-200 acres",
      icon: Mountain,
      color: "from-teal-500 to-cyan-500"
    },
    {
      title: "Investment Land",
      description: "Properties with development potential and appreciation prospects",
      count: "9,800+",
      priceRange: "$20,000 - $1M+",
      avgSize: "1-50 acres",
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const searchFilters = [
    {
      category: "Location",
      filters: ["State", "County", "City", "ZIP Code", "School District", "Distance from City"]
    },
    {
      category: "Property Details",
      filters: ["Price Range", "Acreage", "Property Type", "Zoning", "Topography", "Soil Type"]
    },
    {
      category: "Utilities & Access",
      filters: ["Electricity", "Water", "Sewer", "Internet", "Road Access", "Utilities Distance"]
    },
    {
      category: "Features",
      filters: ["Water Features", "Mountain Views", "Wooded", "Cleared", "Fenced", "Buildings"]
    }
  ];

  const benefits = [
    {
      title: "Comprehensive Database",
      description: "Access to the largest database of land for sale in America, with properties in all 50 states ranging from residential lots to large agricultural parcels. Our database is updated daily with new listings and accurate information.",
      icon: Building
    },
    {
      title: "Advanced Search Technology",
      description: "Our AI-powered search engine helps you find exactly what you're looking for with intelligent filtering, predictive suggestions, and personalized recommendations based on your search history and preferences.",
      icon: Brain
    },
    {
      title: "Professional Photography",
      description: "Every property listing includes high-quality photography, satellite imagery, and aerial views to give you a complete picture of the land before you visit. See boundary lines, topography, and surrounding areas clearly.",
      icon: Camera
    },
    {
      title: "Market Intelligence",
      description: "Get access to real-time market data, comparable sales, pricing trends, and investment analysis to make informed decisions. Our market reports help you understand value and potential returns.",
      icon: BarChart3
    },
    {
      title: "Direct Owner Contact",
      description: "Connect directly with property owners and avoid realtor commissions. Our platform facilitates direct communication while protecting both buyer and seller interests throughout the transaction process.",
      icon: Users
    },
    {
      title: "Investment Tools",
      description: "Access professional-grade investment analysis tools including ROI calculators, cash flow projections, and development feasibility studies to evaluate every opportunity thoroughly.",
      icon: Calculator
    }
  ];

  const process = [
    { step: "1", title: "Search Properties", description: "Use our advanced search to find properties matching your criteria", time: "5 minutes" },
    { step: "2", title: "Analyze Opportunities", description: "Review market data, photos, and investment potential", time: "30 minutes" },
    { step: "3", title: "Contact Owners", description: "Connect directly with property owners for negotiations", time: "Same day" },
    { step: "4", title: "Close the Deal", description: "Complete your purchase with professional support", time: "30-45 days" }
  ];

  const testimonials = [
    {
      name: "Michael Thompson",
      location: "Texas",
      content: "Found the perfect 50-acre ranch through the property search. The detailed filters and market data helped me make a confident decision.",
      rating: 5,
      amount: "$425,000",
      propertyType: "Ranch Land"
    },
    {
      name: "Sarah Rodriguez", 
      location: "Colorado",
      content: "The satellite imagery and property details were so comprehensive, I knew it was the right investment before even visiting.",
      rating: 5,
      amount: "$185,000",
      propertyType: "Mountain Property"
    },
    {
      name: "David Chen",
      location: "Arizona", 
      content: "Saved thousands by connecting directly with the owner. The platform made the entire process smooth and transparent.",
      rating: 5,
      amount: "$95,000",
      propertyType: "Desert Land"
    }
  ];

  const faqs = [
    {
      question: "How do I search for properties on your platform?",
      answer: "Our property search is designed to be intuitive and powerful. Start with basic criteria like location and price range, then use advanced filters for specific features like acreage, zoning, utilities, and property type. Our AI-powered search learns from your preferences to show more relevant results over time."
    },
    {
      question: "Are all properties verified and accurate?",
      answer: "Yes, we verify all property information including ownership, legal descriptions, zoning, and basic details. We use multiple data sources and regularly update listings to ensure accuracy. However, we always recommend buyers conduct their own due diligence before purchasing."
    },
    {
      question: "Can I contact property owners directly?",
      answer: "Yes, our platform facilitates direct communication between buyers and sellers. This eliminates realtor commissions and allows for more flexible negotiations. We provide secure messaging and contact tools while protecting both parties' privacy until they're ready to connect."
    },
    {
      question: "What market data do you provide?",
      answer: "We provide comprehensive market data including comparable sales, price trends, days on market, inventory levels, and appreciation rates. Our market reports include local economic factors, development plans, and investment analysis to help you make informed decisions."
    },
    {
      question: "Do you charge fees to search properties?",
      answer: "Basic property search is completely free. Premium features like detailed market reports, investment analysis tools, and priority customer support are available through our subscription plans starting at $29/month. There are no transaction fees or commissions."
    },
    {
      question: "How do I know if a property is a good investment?",
      answer: "We provide investment analysis tools including ROI calculators, cash flow projections, and market trend analysis. Consider factors like location growth potential, zoning flexibility, utility access, and comparable sales. Our market reports help identify areas with strong appreciation potential."
    },
    {
      question: "Can I save and track properties I'm interested in?",
      answer: "Yes, create a free account to save favorite properties, set up search alerts, track price changes, and receive notifications when similar properties become available. Our dashboard helps you organize and manage your property search efficiently."
    },
    {
      question: "What support do you provide during the buying process?",
      answer: "We provide guidance throughout the buying process including connecting you with local professionals like attorneys, surveyors, and inspectors. Our team can help with due diligence, financing options, and closing coordination to ensure a smooth transaction."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEO slug="property" />
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Home</span>
              </Link>
              <Link to="/properties">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                  View All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🏡 America's Premier Land Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Find Your Perfect <span className="text-[#329cf9]">Property</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover exceptional land opportunities across America with our comprehensive property database. From residential homesites to commercial developments, find the perfect property for your needs with advanced search tools and market intelligence.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-6">
                  <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('location')}
                          placeholder="Location (City, State, ZIP)"
                          className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9]"
                        />
                      </div>
                      
                      <select
                        {...form.register('propertyType')}
                        className="h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] px-4 text-gray-700"
                      >
                        <option value="">All Property Types</option>
                        <option value="Residential">Residential Land</option>
                        <option value="Commercial">Commercial Land</option>
                        <option value="Agricultural">Agricultural Land</option>
                        <option value="Industrial">Industrial Land</option>
                        <option value="Recreational">Recreational Land</option>
                      </select>
                      
                      <Button
                        type="submit"
                        className="h-12 bg-[#329cf9] hover:bg-[#2563eb] text-white font-bold rounded-xl"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        Search Properties
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          {...form.register('minPrice', { valueAsNumber: true })}
                          type="number"
                          placeholder="Min Price"
                          className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          {...form.register('maxPrice', { valueAsNumber: true })}
                          type="number"
                          placeholder="Max Price"
                          className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                        />
                      </div>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          {...form.register('minAcreage', { valueAsNumber: true })}
                          type="number"
                          step="0.1"
                          placeholder="Min Acres"
                          className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                        />
                      </div>
                      
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          {...form.register('maxAcreage', { valueAsNumber: true })}
                          type="number"
                          step="0.1"
                          placeholder="Max Acres"
                          className="pl-9 h-10 border-2 border-gray-200 rounded-lg focus:border-[#329cf9]"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center mb-16">
              <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    className="flex items-center gap-2"
                  >
                    <Grid className="w-4 h-4" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('map')}
                    className="flex items-center gap-2"
                  >
                    <MapIcon className="w-4 h-4" />
                    Map
                  </Button>
                </div>
              </div>
            </div>

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

      {/* Property Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Property <span className="text-[#329cf9]">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse property types across America's most promising markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {propertyCategories.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{category.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Available:</span>
                      <span className="text-[#329cf9] font-bold">{category.count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Price Range:</span>
                      <span className="text-green-600 font-bold">{category.priceRange}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Avg. Size:</span>
                      <span className="text-purple-600 font-bold">{category.avgSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Platform <span className="text-[#329cf9]">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced tools and features designed to help you find and evaluate the perfect property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-8 h-8 text-[#329cf9]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Advanced <span className="text-[#329cf9]">Search Filters</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful filtering options to help you find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchFilters.map((filterGroup, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{filterGroup.category}</h3>
                  <div className="space-y-3">
                    {filterGroup.filters.map((filter, filterIndex) => (
                      <div key={filterIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{filter}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="text-[#329cf9]">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From search to purchase in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-[#329cf9] font-bold text-sm">⏱️ {step.time}</span>
                  </div>
                </CardContent>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-[#329cf9]" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="text-[#329cf9]">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from property buyers who found their perfect land through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{testimonial.amount}</div>
                      <div className="text-sm text-gray-500">{testimonial.propertyType}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#329cf9]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Common questions about property search and buying</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
            Join thousands of successful property buyers who've found their ideal land through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Start Property Search
              </Button>
            </Link>
            <Link to="/advanced-search">
              <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
                Advanced Search
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