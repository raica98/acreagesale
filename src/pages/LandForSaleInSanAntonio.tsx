import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase } from 'lucide-react';
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

export function LandForSaleInSanAntonio() {
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
    { icon: Building, label: "Active Listings", value: "3,200+", color: "text-blue-600" },
    { icon: DollarSign, label: "Avg. Price/Acre", value: "$12,500", color: "text-green-600" },
    { icon: MapPin, label: "Total Acres", value: "85,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+15%", color: "text-orange-600" }
  ];

  const features = [
    { icon: Factory, title: "Military and defense industry", description: "Stable employment base" },
    { icon: Heart, title: "Healthcare and medical research", description: "Growing sector" },
    { icon: Building, title: "Technology and innovation hubs", description: "Emerging opportunities" },
    { icon: Sun, title: "Tourism and hospitality", description: "Year-round appeal" },
    { icon: GraduationCap, title: "Educational institutions", description: "University presence" },
    { icon: Target, title: "Strategic Texas location", description: "Central access point" }
  ];

  const utilities = [
    { icon: Zap, title: "Electricity", provider: "CPS Energy", cost: "$2,500-$8,500" },
    { icon: Droplets, title: "Water", provider: "SAWS", cost: "$3,200-$12,000" },
    { icon: Wifi, title: "Internet", provider: "AT&T/Spectrum", cost: "$500-$2,500" },
    { icon: Phone, title: "Phone", provider: "Multiple carriers", cost: "Standard rates" }
  ];

  const submarkets = [
    {
      title: "North San Antonio",
      description: "Premium suburban development corridor with strong appreciation potential. Home to major corporate headquarters and master-planned communities.",
      priceRange: "$18,500 per acre",
      growthRate: "+22%",
      primaryUse: "Residential/Mixed-Use"
    },
    {
      title: "South San Antonio", 
      description: "Emerging growth area with affordable entry points and significant upside potential. Strong industrial and logistics presence.",
      priceRange: "$8,200 per acre",
      growthRate: "+18%",
      primaryUse: "Industrial/Logistics"
    },
    {
      title: "East San Antonio",
      description: "Balanced market with diverse opportunities from residential to commercial. Strong infrastructure and established communities.",
      priceRange: "$14,800 per acre", 
      growthRate: "+16%",
      primaryUse: "Mixed Development"
    },
    {
      title: "West San Antonio",
      description: "High-growth corridor with luxury residential and commercial development. Premium pricing reflects strong demand and limited supply.",
      priceRange: "$25,200 per acre",
      growthRate: "+28%",
      primaryUse: "Luxury Residential"
    }
  ];

  const featuredProperties = [
    {
      id: "sa-1",
      title: "30-Acre Development Site",
      location: "North San Antonio",
      acres: 30.0,
      price: 3750000,
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "sa-2", 
      title: "Commercial Corner Lot",
      location: "Downtown San Antonio",
      acres: 3.2,
      price: 1600000,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "sa-3",
      title: "Residential Development",
      location: "San Antonio Suburbs", 
      acres: 8.5,
      price: 1275000,
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const zoningTypes = [
    { code: "R-1", title: "Single Family Residential", description: "Low-density residential, minimum 6,000-8,000 sq ft lots" },
    { code: "R-2", title: "Medium Density Residential", description: "Duplexes, townhomes, small multifamily" },
    { code: "R-3", title: "High Density Residential", description: "Apartments, condos, mixed-use developments" },
    { code: "C-1", title: "Neighborhood Commercial", description: "Local retail, restaurants, professional offices" },
    { code: "C-2", title: "General Commercial", description: "Shopping centers, hotels, entertainment venues" },
    { code: "I-1", title: "Light Industrial", description: "Warehouses, light manufacturing, distribution" }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in San Antonio?",
      answer: "Property tax rates in San Antonio vary by location and property type, typically ranging from 2.8% to 3.2% of assessed value annually. Bexar County sets the base rate, with additional assessments from school districts, municipal utility districts, and special improvement districts. Raw land is generally assessed at agricultural or vacant land rates, which are lower than improved property rates."
    },
    {
      question: "How long does the development approval process take in San Antonio?",
      answer: "The development approval timeline in San Antonio typically ranges from 6-18 months depending on project complexity. Simple residential subdivisions may receive approval in 6-9 months, while complex commercial or mixed-use projects can take 12-18 months. The city has streamlined processes for certain development types, and pre-application meetings can help identify potential issues early in the process."
    },
    {
      question: "What utilities are readily available for land development in San Antonio?",
      answer: "Most areas within the San Antonio city limits have access to municipal water, sewer, electricity (CPS Energy), and natural gas. Telecommunications infrastructure including fiber internet is widely available. Rural areas outside the city may require well water, septic systems, and propane. Always verify utility availability and capacity before purchasing land for development."
    },
    {
      question: "Are there any building restrictions or HOA requirements in San Antonio?",
      answer: "Building restrictions vary by location and zoning classification. The city enforces building codes, setback requirements, and height restrictions. Many newer subdivisions have homeowners associations (HOAs) with additional architectural guidelines and restrictions. Historic districts have special preservation requirements. Always review all applicable restrictions, covenants, and HOA documents before purchasing."
    },
    {
      question: "What makes San Antonio a good market for land investment?",
      answer: "San Antonio offers strong fundamentals for land investment including steady population growth, economic diversification, relatively affordable land prices, and strategic location advantages. The city's military presence provides economic stability, while growing technology and healthcare sectors drive employment growth. The combination of urban amenities and lower costs compared to coastal markets makes San Antonio attractive to both residents and businesses."
    },
    {
      question: "Can I generate income from undeveloped land in San Antonio?",
      answer: "Yes, several income-generating options exist for undeveloped land in San Antonio. Agricultural leases for cattle grazing or farming can generate $50-$200 per acre annually. Solar energy leases offer $300-$800 per acre annually with 20-25 year terms. Cell tower leases can provide $1,200-$3,000 monthly per tower. Hunting leases, RV storage, and equipment storage also provide income opportunities depending on location and zoning."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-san-antonio" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you the complete list of land for sale in San Antonio.
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
              🏆 Premium Market
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Land for Sale in <span className="text-[#329cf9]">San Antonio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover prime investment opportunities in the Alamo City. From residential development to commercial ventures, San Antonio offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=San Antonio">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse San Antonio Properties
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

      {/* Why San Antonio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why San Antonio is a <span className="text-[#329cf9]">Prime Investment Market</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Population growth and diversified employment continue to drive demand for land across San Antonio.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Corporate expansion and infrastructure investment support long-term appreciation and development viability.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.
            </p>
          </div>

          {/* Metro Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">2.6M</div>
              <div className="text-lg font-semibold text-gray-900">Metro Population</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">$125B</div>
              <div className="text-lg font-semibold text-gray-900">Annual GDP</div>
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
              Featured San Antonio <span className="text-[#329cf9]">Properties</span>
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
            <Link to="/properties?search=San Antonio">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All San Antonio Properties
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
              San Antonio Regional <span className="text-[#329cf9]">Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse investment opportunities across the San Antonio metropolitan area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {submarkets.map((submarket, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{submarket.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{submarket.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#329cf9]/10 rounded-xl p-4 text-center">
                      <div className="font-bold text-[#329cf9] text-lg">{submarket.priceRange}</div>
                      <div className="text-sm text-gray-600">Avg. Price/Acre</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="font-bold text-green-600 text-lg">{submarket.growthRate}</div>
                      <div className="text-sm text-gray-600">Growth Rate</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="font-bold text-purple-600 text-sm">{submarket.primaryUse}</div>
                      <div className="text-sm text-gray-600">Primary Use</div>
                    </div>
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
              Essential infrastructure information for land development in San Antonio
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
              Understanding zoning classifications in San Antonio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  Zoning information is subject to change and should be verified with the City of San Antonio Planning Department before making investment decisions. Development requirements, setbacks, and permitted uses may vary by specific location and overlay districts. Always consult with local planning officials and qualified professionals before proceeding with development plans.
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
              Want to Buy Land in <span className="text-[#329cf9]">San Antonio?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill up the form to get a full list of Land for sale in San Antonio.
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
                          placeholder="Preferred Location in San Antonio"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Land for Sale in San Antonio</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking to buy land for sale in San Antonio? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in San Antonio</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips to Find Cheap Land for Sale in San Antonio</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">1) Check out foreclosure listings in your area</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Buying a foreclosed property can be a great way to get a cheap piece of land for sale in San Antonio. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">2) Take advantage of the seller's desperation</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property.
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
            <p className="text-xl text-gray-600">Common questions about San Antonio land investment</p>
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
            Ready to Invest in San Antonio Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=San Antonio">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse San Antonio Properties
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