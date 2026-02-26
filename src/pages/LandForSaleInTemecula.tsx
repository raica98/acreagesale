import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Wine, Grape } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(2, 'Location is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInTemecula() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Building, label: "Active Listings", value: "1,850+", color: "text-blue-600" },
    { icon: DollarSign, label: "Avg. Price/Acre", value: "$45,000", color: "text-green-600" },
    { icon: MapPin, label: "Total Acres", value: "35,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+18%", color: "text-orange-600" }
  ];

  const features = [
    { icon: Wine, title: "World-class wine country", description: "Premium vineyard and winery opportunities" },
    { icon: Sun, title: "Perfect Mediterranean climate", description: "Year-round outdoor lifestyle appeal" },
    { icon: Building, title: "Master-planned communities", description: "High-end residential development" },
    { icon: Mountain, title: "Scenic mountain views", description: "Premium location with natural beauty" },
    { icon: Car, title: "Proximity to major cities", description: "Easy access to San Diego and Los Angeles" },
    { icon: Target, title: "Tourism and hospitality", description: "Growing visitor economy" }
  ];

  const utilities = [
    { icon: Zap, title: "Electricity", provider: "SDG&E", cost: "$3,500-$15,000" },
    { icon: Droplets, title: "Water", provider: "EMWD/RCWD", cost: "$8,000-$25,000" },
    { icon: Wifi, title: "Internet", provider: "Spectrum/AT&T", cost: "$500-$2,500" },
    { icon: Phone, title: "Phone", provider: "Multiple carriers", cost: "Standard rates" }
  ];

  const submarkets = [
    {
      title: "Wine Country Temecula",
      description: "Premium vineyard and estate properties with established wine industry infrastructure. Highest land values with exceptional lifestyle appeal.",
      priceRange: "$75,000-$150,000 per acre",
      features: ["Vineyard development opportunities", "Estate residential sites", "Agritourism potential"]
    },
    {
      title: "Old Town Temecula", 
      description: "Historic downtown area with commercial and mixed-use development opportunities. Strong tourism and entertainment focus.",
      priceRange: "$100,000-$250,000 per acre",
      features: ["Commercial development sites", "Mixed-use opportunities", "Tourism and entertainment"]
    },
    {
      title: "South Temecula",
      description: "Emerging residential growth area with master-planned community potential. Excellent value with strong appreciation prospects.",
      priceRange: "$35,000-$75,000 per acre", 
      features: ["Master-planned communities", "Residential development", "Family-oriented neighborhoods"]
    },
    {
      title: "Rural Temecula Valley",
      description: "Agricultural and equestrian properties with lower entry costs and diverse use potential. Perfect for lifestyle and investment combinations.",
      priceRange: "$25,000-$50,000 per acre",
      features: ["Equestrian and ranch properties", "Agricultural operations", "Custom estate development"]
    }
  ];

  const featuredProperties = [
    {
      id: "temecula-1",
      title: "25-Acre Vineyard Development",
      location: "Temecula Wine Country",
      acres: 25.0,
      price: 2750000,
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "temecula-2", 
      title: "Commercial Development Site",
      location: "Old Town Temecula",
      acres: 4.2,
      price: 1850000,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "temecula-3",
      title: "Residential Master Plan",
      location: "South Temecula", 
      acres: 15.5,
      price: 1275000,
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const zoningTypes = [
    { code: "R-1", title: "Single Family Residential", description: "Low-density residential, minimum 6,000-10,000 sq ft lots" },
    { code: "R-2", title: "Medium Density Residential", description: "Townhomes and small multifamily developments" },
    { code: "C-1", title: "Neighborhood Commercial", description: "Local retail, restaurants, professional services" },
    { code: "AG", title: "Agricultural", description: "Vineyards, farming, equestrian facilities" }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in Temecula?",
      answer: "Property tax rates in Temecula typically range from 1.1% to 1.4% of assessed value annually. Riverside County sets the base rate, with additional assessments from school districts, water districts, and community facilities districts. Agricultural land may qualify for special agricultural preserve programs that reduce tax obligations."
    },
    {
      question: "What makes Temecula attractive for vineyard development?",
      answer: "Temecula offers ideal conditions for vineyard development including Mediterranean climate, well-draining soils, elevation advantages (1,000-1,500 feet), and established wine industry infrastructure. The region has over 40 wineries and strong agritourism appeal, making it attractive for both agricultural and hospitality investments."
    },
    {
      question: "How long does development approval take in Temecula?",
      answer: "Development timelines in Temecula vary by project type and complexity. Residential projects typically take 8-15 months for approval, while commercial developments may require 12-24 months. The city has streamlined processes for certain development types, and working with experienced local consultants can help accelerate approvals."
    },
    {
      question: "What utilities are available for land development in Temecula?",
      answer: "Most areas in Temecula have access to electricity (SDG&E), water (EMWD/RCWD), natural gas, and telecommunications. Some rural areas may require private wells and septic systems. High-speed internet is widely available with fiber networks expanding throughout the region."
    },
    {
      question: "What makes Temecula land a good investment?",
      answer: "Temecula offers strong investment fundamentals including proximity to major employment centers (San Diego, Orange County), established wine industry, excellent climate, master-planned community development, and strong tourism appeal. The combination of lifestyle amenities and growth potential makes it attractive to both residents and investors."
    },
    {
      question: "Can I develop vineyards on land in Temecula?",
      answer: "Yes, Temecula is one of California's premier wine regions with excellent conditions for vineyard development. Agricultural zoning allows vineyard operations, and many properties come with water rights and suitable soil conditions. The established wine industry provides infrastructure for processing, distribution, and tourism opportunities."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-temecula" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you the complete list of land for sale in Temecula.
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
              🍷 Wine Country Premium Market
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Land for Sale in <span className="text-[#329cf9]">Temecula</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover prime investment opportunities in Southern California's premier wine country. From vineyard development to luxury residential estates, Temecula offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Temecula">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Temecula Properties
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Market Analysis
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Temecula Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Temecula is a <span className="text-[#329cf9]">Prime Investment Market</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Wine country charm and strategic location continue to drive demand for land across Temecula.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Tourism growth and luxury development support long-term appreciation and premium valuations.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Limited supply of developable land, paired with strong demand, keeps the market competitive and resilient.
            </p>
          </div>

          {/* Metro Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">115K</div>
              <div className="text-lg font-semibold text-gray-900">City Population</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">40+</div>
              <div className="text-lg font-semibold text-gray-900">Wineries</div>
            </div>
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

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Temecula <span className="text-[#329cf9]">Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-600 mb-2">
                    <Ruler className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.acres} acres</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#329cf9]">
                      ${property.price.toLocaleString()}
                    </div>
                    <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Temecula">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All Temecula Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Submarkets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Temecula Regional <span className="text-[#329cf9]">Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse investment opportunities across the Temecula Valley
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {submarkets.map((submarket, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{submarket.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{submarket.description}</p>
                  <div className="bg-[#329cf9]/10 rounded-xl p-4 mb-6">
                    <div className="font-bold text-[#329cf9] text-lg">{submarket.priceRange}</div>
                  </div>
                  <div className="space-y-2">
                    {submarket.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Utilities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Utilities and <span className="text-[#329cf9]">Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure information for land development in Temecula
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {utilities.map((utility, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <utility.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{utility.title}</h3>
                  <p className="text-gray-600 mb-2">{utility.provider}</p>
                  <p className="text-sm text-gray-500">{utility.cost}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Zoning and <span className="text-[#329cf9]">Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding zoning classifications in Temecula
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {zoningTypes.map((zone, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{zone.code}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{zone.title}</h3>
                      <p className="text-gray-600">{zone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Zoning Disclaimer */}
          <div className="mt-16 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Zoning Disclaimer</h4>
                <p className="text-yellow-700 leading-relaxed">
                  Zoning information is subject to change and should be verified with the City of Temecula Planning Department before making investment decisions. Development requirements, setbacks, and permitted uses may vary by specific location and overlay districts. Always consult with local planning officials and qualified professionals before proceeding with land development projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Want to Buy Land in <span className="text-[#329cf9]">Temecula?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill up the form to get a full list of Land for sale in Temecula.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('firstName')}
                          placeholder="First Name"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('lastName')}
                          placeholder="Last Name"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('email')}
                          type="email"
                          placeholder="Email Address"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('phone')}
                          placeholder="Phone Number"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Preferred Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('location')}
                          placeholder="Preferred Location in Temecula"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.location && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Get Land List
                        </div>
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">100% Guarantee</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <Banknote className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">Multiple Offers</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">Global Reach</div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Land for Sale in Temecula</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking to buy land for sale in Temecula? There are plenty of options out there, ranging from vineyard development sites to luxury residential estates and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your investment goals and whether you plan to develop vineyards, build luxury homes, or create commercial ventures. Temecula's wine country offers unique opportunities not found in other markets.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in Temecula</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Temecula's wine country represents one of Southern California's most prestigious land markets. The combination of Mediterranean climate, established wine industry, and proximity to major metropolitan areas creates unique investment opportunities.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Consider vineyard development potential</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Temecula's climate and soil conditions are ideal for grape growing. When evaluating land for vineyard development, consider elevation, drainage, soil composition, and water rights. The established wine industry provides infrastructure for processing and distribution.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Evaluate luxury residential opportunities</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              The area's natural beauty and wine country lifestyle attract affluent buyers seeking custom estates and luxury developments. Properties with views, privacy, and proximity to wineries command premium prices.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips to Find Value Land for Sale in Temecula</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              While Temecula commands premium prices due to its wine country status, strategic buyers can still find excellent value by focusing on emerging areas and properties with development potential.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">1) Focus on emerging wine country areas</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Look for properties in areas where the wine industry is expanding but prices haven't fully reflected the potential. These areas often offer the best combination of value and appreciation potential.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">2) Consider agritourism development</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Properties suitable for agritourism ventures like wedding venues, tasting rooms, and event facilities can provide multiple income streams while appreciating in value.
            </p>
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
            <p className="text-xl text-gray-600">Common questions about Temecula land investment</p>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Invest in Temecula Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Temecula">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Temecula Properties
              </Button>
            </Link>
            <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
              Get Free Market Report
            </Button>
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
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Nationwide</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">All 50 States</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}