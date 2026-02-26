import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Heart, MapPin, DollarSign, Ruler, Eye, Star, TrendingUp, Users, Award, Shield, Zap, Phone, Mail, Search, Filter, Building, TreePine, Tractor, Chrome as Home, Factory, Mountain, Waves, Sun, Leaf, Target, Calculator, ChartBar as BarChart3, Globe, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Info, Lightbulb, FileText, Camera, Navigation, Clock, Briefcase, GraduationCap, Car, Plane, ShoppingBag, Utensils, Send } from 'lucide-react';
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

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  propertyType: z.string().min(1, 'Please select a property type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  location: z.string().min(5, 'Location is required'),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function FavoriteProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial' | 'agricultural' | 'recreational'>('all');

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Vacant Land',
      budget: '$50,000 - $100,000',
      timeline: '3-6 months',
    },
  });

  useEffect(() => {
    fetchProperties();
    loadFavorites();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
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
      // Use mock data for demonstration
      setProperties(getMockProperties());
    } finally {
      setLoading(false);
    }
  };

  const getMockProperties = (): Property[] => [
    {
      id: 'fav-1',
      user_id: 'mock-user',
      title: 'Prime Residential Development Land - 5 Acres',
      description: 'Exceptional vacant land opportunity in rapidly growing area',
      price: 125000,
      size_acres: 5.2,
      address: '1234 Development Drive',
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
      zoning: 'Residential',
      water: 'Available',
      electricity: 'Available',
      sewer: 'Available'
    },
    {
      id: 'fav-2',
      user_id: 'mock-user',
      title: 'Commercial Vacant Land - Highway Frontage',
      description: 'High-visibility commercial land with excellent access',
      price: 275000,
      size_acres: 3.8,
      address: '5678 Highway 35',
      city: 'Denver',
      state: 'CO',
      zip_code: '80424',
      county: 'Jefferson County',
      apn: 'CO-8765-4321',
      latitude: 39.7392,
      longitude: -104.9903,
      images: ['https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600'],
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      boundary_points: null,
      zoning: 'Commercial',
      water: 'Available',
      electricity: 'Available',
      sewer: 'Available'
    }
  ];

  const loadFavorites = () => {
    if (user) {
      const saved = localStorage.getItem(`favorites_${user.id}`);
      if (saved) {
        const favoriteIds = JSON.parse(saved);
        const favorites = properties.filter(p => favoriteIds.includes(p.id));
        setFavoriteProperties(favorites);
      }
    }
  };

  const handleSubmit = async (data: ContactForm) => {
    setFormLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('favorite_properties_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('favorite_properties_inquiries', JSON.stringify(existingSubmissions));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError('Failed to submit your inquiry. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handlePropertyClick = (property: Property, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthModalOpen(true);
      return;
    }
  };

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(p => {
        const zoning = p.zoning?.toLowerCase() || '';
        switch (selectedCategory) {
          case 'residential': return zoning.includes('residential');
          case 'commercial': return zoning.includes('commercial');
          case 'agricultural': return zoning.includes('agricultural') || zoning.includes('farm');
          case 'recreational': return zoning.includes('recreational') || zoning.includes('rural');
          default: return true;
        }
      });

  const stats = [
    { icon: Building, label: "Vacant Land Listings", value: "50,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Total Land Value", value: "$2.5B+", color: "text-green-600" },
    { icon: MapPin, label: "States Covered", value: "50", color: "text-purple-600" },
    { icon: Users, label: "Happy Investors", value: "25,000+", color: "text-orange-600" }
  ];

  const landTypes = [
    {
      icon: Home,
      title: "Residential Vacant Land",
      description: "Perfect for building your dream home or developing residential communities",
      features: ["Utilities available", "Zoned for residential", "Road access", "Growing neighborhoods"],
      priceRange: "$25,000 - $500,000",
      category: "residential"
    },
    {
      icon: Building,
      title: "Commercial Vacant Land", 
      description: "Prime commercial development opportunities in high-traffic areas",
      features: ["Highway visibility", "Commercial zoning", "High traffic counts", "Development potential"],
      priceRange: "$100,000 - $2,000,000",
      category: "commercial"
    },
    {
      icon: Tractor,
      title: "Agricultural Vacant Land",
      description: "Fertile farmland and agricultural properties for farming and ranching",
      features: ["Rich soil", "Water rights", "Agricultural zoning", "Farming equipment access"],
      priceRange: "$5,000 - $50,000 per acre",
      category: "agricultural"
    },
    {
      icon: TreePine,
      title: "Recreational Vacant Land",
      description: "Scenic properties perfect for hunting, camping, and outdoor recreation",
      features: ["Natural beauty", "Wildlife habitat", "Outdoor activities", "Privacy and seclusion"],
      priceRange: "$10,000 - $200,000",
      category: "recreational"
    }
  ];

  const investmentBenefits = [
    {
      icon: TrendingUp,
      title: "Appreciation Potential",
      description: "Vacant land has historically appreciated faster than developed properties, especially in growing markets. Land is a finite resource with increasing demand."
    },
    {
      icon: Shield,
      title: "Low Maintenance Investment",
      description: "Unlike rental properties, vacant land requires minimal maintenance, no tenants to manage, and lower ongoing costs while you hold the investment."
    },
    {
      icon: Target,
      title: "Development Opportunities",
      description: "Purchase land at current agricultural or vacant rates, then develop or subdivide for significantly higher returns on your investment."
    },
    {
      icon: DollarSign,
      title: "Tax Advantages",
      description: "Vacant land offers various tax benefits including potential deductions for property taxes, interest on loans, and depreciation on improvements."
    }
  ];

  const locationFactors = [
    {
      icon: Car,
      title: "Transportation Access",
      description: "Proximity to major highways, airports, and public transportation significantly impacts land value and development potential."
    },
    {
      icon: Building,
      title: "Urban Growth Patterns",
      description: "Areas experiencing population growth, new businesses, and infrastructure development offer the best appreciation potential."
    },
    {
      icon: GraduationCap,
      title: "Schools and Amenities",
      description: "Quality schools, shopping centers, healthcare facilities, and recreational amenities increase land desirability and value."
    },
    {
      icon: Factory,
      title: "Economic Development",
      description: "New industries, job creation, and economic incentives in an area drive demand for both residential and commercial land."
    }
  ];

  const dueDiggenceChecklist = [
    "Verify clear title and ownership history",
    "Check zoning regulations and permitted uses",
    "Investigate utility availability and costs",
    "Research environmental restrictions and regulations",
    "Confirm access rights and easements",
    "Review property taxes and assessment history",
    "Analyze soil conditions and topography",
    "Check for liens, encumbrances, or legal issues",
    "Understand local building codes and requirements",
    "Evaluate flood zones and natural disaster risks"
  ];

  if (success) {
    <SEO slug="favorite-properties" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your inquiry about vacant land investment opportunities. Our expert team will contact you within 24 hours with personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Phone className="w-4 h-4" />
                <span>949-767-8885</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              ❤️ Favorite Properties & Vacant Land Guide
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Your Guide to <span className="text-[#329cf9]">Vacant Land</span> Investment
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-12">
              Discover everything you need to know about investing in vacant land, from residential development opportunities to commercial properties. Learn how to identify the best vacant land deals, understand zoning regulations, and maximize your investment returns in today's competitive real estate market.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/properties">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Vacant Land
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Expert Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Vacant Land Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                What is <span className="text-[#329cf9]">Vacant Land?</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Vacant land</strong>, also known as raw land or undeveloped land, refers to property that has no buildings, structures, or improvements. This type of real estate investment offers unique opportunities for investors, developers, and individuals looking to build their dream homes or businesses.
                </p>
                <p>
                  Unlike developed properties, vacant land provides a blank canvas for your vision. Whether you're planning residential development, commercial projects, agricultural use, or simply holding for long-term appreciation, vacant land offers flexibility that developed properties cannot match.
                </p>
                <p>
                  The vacant land market has experienced significant growth in recent years, driven by population expansion, urbanization, and the increasing scarcity of developable land in desirable locations. Smart investors recognize vacant land as an opportunity to acquire assets at today's prices while benefiting from future development and appreciation.
                </p>
                <p>
                  <strong>Key characteristics of vacant land include:</strong> No existing structures, potential for development, lower initial investment compared to developed properties, minimal maintenance requirements, and significant appreciation potential in growing markets.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beautiful vacant land with rolling hills and clear skies"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Prime Vacant Land</h3>
                <p className="text-white/90">Ready for your development vision</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Vacant Land */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of <span className="text-[#329cf9]">Vacant Land</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Understanding different types of vacant land is crucial for making informed investment decisions. Each category offers unique opportunities, challenges, and potential returns based on location, zoning, and development possibilities.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: 'all', label: 'All Types', icon: Globe },
                { key: 'residential', label: 'Residential', icon: Home },
                { key: 'commercial', label: 'Commercial', icon: Building },
                { key: 'agricultural', label: 'Agricultural', icon: Tractor },
                { key: 'recreational', label: 'Recreational', icon: TreePine }
              ].map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.key as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.key 
                      ? 'bg-[#329cf9] text-white shadow-lg' 
                      : 'border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {landTypes.map((type, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#329cf9] transition-colors duration-300">
                    <type.icon className="w-8 h-8 text-[#329cf9] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-700 font-medium">Typical Price Range</div>
                    <div className="text-lg font-bold text-blue-900">{type.priceRange}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Invest in <span className="text-[#329cf9]">Vacant Land?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vacant land investment offers unique advantages that make it an attractive option for both novice and experienced real estate investors. Understanding these benefits can help you make informed decisions about your investment portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {investmentBenefits.map((benefit, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Investment Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Vacant Land Investment Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Buy and Hold</h4>
                <p className="text-gray-600">Purchase land in growing areas and hold for long-term appreciation. Minimal maintenance with maximum growth potential.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Develop and Sell</h4>
                <p className="text-gray-600">Purchase raw land, add improvements or subdivide, then sell for significant profits. Higher returns with more involvement.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Lease and Income</h4>
                <p className="text-gray-600">Generate income through agricultural leases, cell tower rentals, or recreational use permits while maintaining ownership.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Factors */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Key <span className="text-[#329cf9]">Location Factors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Location is the most critical factor in vacant land investment success. Understanding what makes a location valuable helps you identify properties with the highest appreciation potential and development opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locationFactors.map((factor, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <factor.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{factor.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Due Diligence Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Vacant Land <span className="text-[#329cf9]">Due Diligence</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Proper due diligence is essential when investing in vacant land. Unlike developed properties, vacant land requires careful investigation of zoning, utilities, access rights, and development potential to ensure a successful investment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our comprehensive due diligence checklist helps you avoid costly mistakes and identify the most promising vacant land opportunities. Each factor can significantly impact your investment's success and future development potential.
              </p>
              
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Professional Due Diligence Service</h3>
                <p className="text-blue-800 mb-4">Our expert team can conduct comprehensive due diligence on any vacant land property, saving you time and ensuring nothing is overlooked.</p>
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                  Learn More About Our Services
                </Button>
              </div>
            </div>
            
            <div>
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-[#329cf9]" />
                    Due Diligence Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dueDiggenceChecklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vacant Land <span className="text-[#329cf9]">Market Trends</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The vacant land market continues to evolve with changing demographics, technology, and economic factors. Understanding current trends helps investors make strategic decisions about when and where to invest.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Rising Demand</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Population growth and urbanization continue to drive demand for developable land. Remote work trends have also increased interest in rural and recreational properties.
                </p>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">+15%</div>
                  <div className="text-sm text-green-700">Annual price appreciation</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Supply Constraints</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Limited supply of developable land in desirable locations creates scarcity value. Environmental regulations and zoning restrictions further limit available inventory.
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">-8%</div>
                  <div className="text-sm text-blue-700">Available inventory annually</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Returns</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Well-selected vacant land investments have outperformed many traditional asset classes, especially in high-growth metropolitan areas.
                </p>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">22%</div>
                  <div className="text-sm text-purple-700">Average annual ROI</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Analysis */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Market Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900">Market Drivers</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-900">Population Growth</h5>
                      <p className="text-gray-600">Continued population expansion drives demand for new housing and commercial development.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-900">Housing Shortage</h5>
                      <p className="text-gray-600">National housing shortage creates opportunities for residential land development.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-900">Remote Work</h5>
                      <p className="text-gray-600">Remote work trends increase demand for rural and recreational properties.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900">Investment Opportunities</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-900">Suburban Expansion</h5>
                      <p className="text-gray-600">Cities expanding outward create opportunities in previously rural areas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-900">Infrastructure Development</h5>
                      <p className="text-gray-600">New roads, utilities, and public services increase land values significantly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TreePine className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-900">Recreational Demand</h5>
                      <p className="text-gray-600">Increased interest in outdoor recreation drives demand for recreational land.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Vacant Land</span> Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated selection of premium vacant land opportunities across the United States
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-[#329cf9] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.slice(0, 6).map((property) => (
                <Link 
                  key={property.id} 
                  to={`/property/${property.id}`}
                  onClick={(e) => handlePropertyClick(property, e)}
                >
                  <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                            !user ? 'filter blur-[6px]' : ''
                          }`}
                        />
                        
                        {!user && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                              <span className="text-gray-700 font-medium text-sm">Sign in to view</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#329cf9] text-white font-bold shadow-lg">
                            Vacant Land
                          </Badge>
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                          </button>
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
                          <div className="text-2xl font-bold text-[#329cf9]">
                            ${property.price.toLocaleString()}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Ruler className="w-4 h-4 mr-1" />
                            <span className="font-medium">{property.size_acres} AC</span>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-medium transition-all duration-300 group-hover:shadow-lg">
                          View Details
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/properties">
              <Button 
                variant="outline" 
                className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 px-8 py-3 font-semibold"
              >
                View All Vacant Land Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financing <span className="text-[#329cf9]">Vacant Land</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Financing vacant land requires different approaches than traditional real estate. Understanding your options helps you structure deals that maximize your investment potential while minimizing risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cash Purchase</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Cash purchases offer the strongest negotiating position and fastest closing times. Many vacant land sellers prefer cash offers due to certainty and speed.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 text-sm">Strongest negotiating position</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 text-sm">Fastest closing times</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 text-sm">No financing contingencies</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Owner Financing</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Many land owners offer financing directly, often with more flexible terms than traditional lenders. This can be beneficial for both buyers and sellers.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 text-sm">Flexible terms and conditions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 text-sm">Lower down payment options</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 text-sm">Faster approval process</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Land Loans</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Specialized land loans from banks and credit unions designed specifically for vacant land purchases. Terms vary based on intended use and development plans.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 text-sm">Competitive interest rates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 text-sm">Longer repayment terms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 text-sm">Professional guidance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expert Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Expert <span className="text-[#329cf9]">Investment Tips</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional insights from our team of vacant land investment experts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro Tips for Success</h3>
                    <p className="text-green-700 font-medium">From industry professionals</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">Research Growth Patterns</h4>
                    <p className="text-gray-600 text-sm">Study population growth, job creation, and infrastructure development in your target area. These factors drive long-term land appreciation.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">Understand Zoning Laws</h4>
                    <p className="text-gray-600 text-sm">Zoning determines what you can build and how you can use the land. Research current zoning and potential future changes.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">Verify Utility Access</h4>
                    <p className="text-gray-600 text-sm">Confirm availability and costs for water, sewer, electricity, and gas. Utility access significantly impacts development costs and property value.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-orange-50">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Common Pitfalls</h3>
                    <p className="text-red-700 font-medium">Avoid these costly mistakes</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">Skipping Due Diligence</h4>
                    <p className="text-gray-600 text-sm">Failing to research zoning, utilities, and restrictions can lead to expensive surprises and limited development options.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">Ignoring Access Rights</h4>
                    <p className="text-gray-600 text-sm">Ensure legal access to your property. Landlocked parcels without easements can be difficult to develop or sell.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">Overlooking Environmental Issues</h4>
                    <p className="text-gray-600 text-sm">Environmental restrictions, flood zones, and soil conditions can limit development and impact property value significantly.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect <span className="text-[#329cf9]">Vacant Land</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let our experts help you find the ideal vacant land investment opportunity
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                    {error}
                  </div>
                )}

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        First Name *
                      </label>
                      <Input
                        {...form.register('firstName')}
                        placeholder="Your first name"
                        className="h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Last Name *
                      </label>
                      <Input
                        {...form.register('lastName')}
                        placeholder="Your last name"
                        className="h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Email Address *
                      </label>
                      <Input
                        {...form.register('email')}
                        type="email"
                        placeholder="your.email@example.com"
                        className="h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Phone Number *
                      </label>
                      <Input
                        {...form.register('phone')}
                        placeholder="(555) 123-4567"
                        className="h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Property Type *
                      </label>
                      <select
                        {...form.register('propertyType')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="Vacant Land">Vacant Land</option>
                        <option value="Residential Development">Residential Development</option>
                        <option value="Commercial Development">Commercial Development</option>
                        <option value="Agricultural Land">Agricultural Land</option>
                        <option value="Recreational Property">Recreational Property</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Budget Range *
                      </label>
                      <select
                        {...form.register('budget')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="Under $50,000">Under $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                        <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                        <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                        <option value="Over $1,000,000">Over $1,000,000</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Timeline *
                      </label>
                      <select
                        {...form.register('timeline')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="Immediately">Immediately</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="Over 1 year">Over 1 year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Preferred Location *
                      </label>
                      <Input
                        {...form.register('location')}
                        placeholder="City, State, or Region"
                        className="h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                      />
                      {form.formState.errors.location && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Additional Requirements (Optional)
                    </label>
                    <textarea
                      {...form.register('message')}
                      placeholder="Tell us about your specific requirements, intended use, or any questions you have..."
                      className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] resize-none text-lg"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    {formLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting Your Request...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-6 h-6" />
                        Get Expert Recommendations
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Vacant Land <span className="text-[#329cf9]">Market Data</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Current market statistics and trends in the vacant land sector provide valuable insights for investors and developers looking to make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.5B+</div>
              <div className="text-gray-700 font-medium">Total Market Value</div>
              <div className="text-sm text-blue-600 mt-2">Across all listings</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">15%</div>
              <div className="text-gray-700 font-medium">Annual Appreciation</div>
              <div className="text-sm text-green-600 mt-2">Average growth rate</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">45</div>
              <div className="text-gray-700 font-medium">Days Average Sale</div>
              <div className="text-sm text-purple-600 mt-2">Time on market</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">92%</div>
              <div className="text-gray-700 font-medium">Investor Satisfaction</div>
              <div className="text-sm text-orange-600 mt-2">Success rate</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regional Market Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Western States</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Price/Acre:</span>
                    <span className="font-bold text-blue-600">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-bold text-green-600">+18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hot Markets:</span>
                    <span className="font-bold text-gray-900">CA, NV, AZ</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Southern States</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Price/Acre:</span>
                    <span className="font-bold text-blue-600">$15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-bold text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hot Markets:</span>
                    <span className="font-bold text-gray-900">TX, FL, NC</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Mountain States</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Price/Acre:</span>
                    <span className="font-bold text-blue-600">$12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-bold text-green-600">+14%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hot Markets:</span>
                    <span className="font-bold text-gray-900">CO, UT, ID</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Start Your Vacant Land Investment Journey
          </h2>
          <p className="text-2xl text-white mb-12 max-w-4xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've built wealth through strategic vacant land investments. Our expert team is ready to help you find the perfect property for your goals and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Vacant Land
              </Button>
            </Link>
            <a href="tel:949-767-8885">
              <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
                Call 949-767-8885
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Expert Consultation</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">949-767-8885</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Email Support</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">info@acreagesales.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Nationwide Service</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">All 50 States</div>
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