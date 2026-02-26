import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Wheat, Tractor } from 'lucide-react';
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

export function LandForSaleInSouthDakota() {
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
    { icon: Building, label: "Active Listings", value: "1,800+", color: "text-blue-600" },
    { icon: DollarSign, label: "Avg. Price/Acre", value: "$4,500", color: "text-green-600" },
    { icon: MapPin, label: "Total Acres", value: "125,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+12%", color: "text-orange-600" }
  ];

  const features = [
    { icon: Wheat, title: "Agricultural excellence", description: "Prime farmland and ranching opportunities" },
    { icon: Factory, title: "Energy sector growth", description: "Oil, gas, and renewable energy development" },
    { icon: Mountain, title: "Tourism and recreation", description: "Black Hills and outdoor recreation economy" },
    { icon: Tractor, title: "Low property taxes", description: "Business-friendly tax environment" },
    { icon: Shield, title: "Stable economy", description: "Diverse economic base with low unemployment" },
    { icon: Target, title: "Central location", description: "Strategic Midwest positioning" }
  ];

  const utilities = [
    { icon: Zap, title: "Electricity", provider: "Xcel Energy/Black Hills Energy", cost: "$1,500-$6,000" },
    { icon: Droplets, title: "Water", provider: "Municipal/Rural Water Systems", cost: "$3,000-$8,000" },
    { icon: Wifi, title: "Internet", provider: "Fiber/Cable/DSL", cost: "Varies" },
    { icon: Phone, title: "Phone", provider: "Multiple carriers", cost: "Standard rates" }
  ];

  const submarkets = [
    {
      title: "Eastern South Dakota",
      description: "Prime agricultural region with excellent farmland and growing urban centers. Strong fundamentals for agricultural and residential development.",
      priceRange: "$3,000-$8,000 per acre",
      features: ["Premium agricultural land", "Growing urban centers", "Strong infrastructure"]
    },
    {
      title: "Western South Dakota", 
      description: "Energy and tourism corridor with Black Hills recreation and mineral rights opportunities. Higher land values with diverse use potential.",
      priceRange: "$2,000-$12,000 per acre",
      features: ["Energy development opportunities", "Tourism and recreation", "Mineral rights potential"]
    },
    {
      title: "Central South Dakota",
      description: "Balanced agricultural and commercial opportunities with state capital proximity. Stable market with consistent demand.",
      priceRange: "$2,500-$6,000 per acre", 
      features: ["Government and institutional", "Agricultural operations", "Commercial development"]
    },
    {
      title: "Missouri River Corridor",
      description: "Water access and transportation advantages with recreational and agricultural potential. Premium pricing for waterfront properties.",
      priceRange: "$4,000-$15,000 per acre",
      features: ["Water access properties", "Transportation corridors", "Recreational development"]
    }
  ];

  const featuredProperties = [
    {
      id: "sd-1",
      title: "160-Acre Agricultural Site",
      location: "Eastern South Dakota",
      acres: 160.0,
      price: 1200000,
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "sd-2", 
      title: "Commercial Development Lot",
      location: "Sioux Falls",
      acres: 5.5,
      price: 385000,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: "sd-3",
      title: "Recreational Ranch Property",
      location: "Black Hills Region", 
      acres: 40.0,
      price: 450000,
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const zoningTypes = [
    { code: "AG", title: "Agricultural", description: "Farming, ranching, agricultural operations" },
    { code: "R-1", title: "Single Family Residential", description: "Low-density residential, minimum 1-acre lots" },
    { code: "C-1", title: "Commercial", description: "Retail, offices, commercial services" },
    { code: "I-1", title: "Industrial", description: "Manufacturing, warehousing, energy development" }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in South Dakota?",
      answer: "South Dakota has some of the lowest property tax rates in the nation, typically ranging from 1.0% to 1.5% of assessed value annually. Agricultural land receives preferential assessment rates, often resulting in significantly lower taxes. The state has no personal income tax, making it attractive for land investors and retirees."
    },
    {
      question: "What types of land are most common in South Dakota?",
      answer: "South Dakota offers diverse land types including premium agricultural farmland (corn, soybeans, wheat), ranch and grazing land, recreational hunting properties, energy development sites (oil, gas, wind), and residential development opportunities near growing cities like Sioux Falls and Rapid City."
    },
    {
      question: "Are there financing options specific to South Dakota land purchases?",
      answer: "Yes, South Dakota has several land financing options including agricultural land loans from Farm Credit Services, rural development loans through USDA, traditional bank financing, and owner financing arrangements. Many sellers offer competitive owner financing terms due to the state's stable agricultural economy."
    },
    {
      question: "What utilities are available for land development in South Dakota?",
      answer: "Utility availability varies by location. Urban and suburban areas typically have municipal water, sewer, electricity, and natural gas. Rural properties may require private wells, septic systems, and propane. Internet access is expanding with fiber networks reaching more rural areas. Always verify utility availability and costs before purchasing."
    },
    {
      question: "What makes South Dakota attractive for land investment?",
      answer: "South Dakota offers several advantages including no state income tax, low property taxes, stable agricultural economy, growing energy sector, business-friendly regulations, and relatively affordable land prices. The state's central location and transportation infrastructure also support logistics and distribution businesses."
    },
    {
      question: "Can I generate income from agricultural land in South Dakota?",
      answer: "Yes, South Dakota agricultural land can generate substantial income through crop farming (corn, soybeans, wheat), cattle ranching, hunting leases ($5-$25 per acre), wind energy leases ($3,000-$8,000 per turbine annually), and agricultural land rental ($150-$400 per acre annually depending on soil quality and location)."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-south-dakota" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you the complete list of land for sale in South Dakota.
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
              🏆 Premium Agricultural Market
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Land for Sale in <span className="text-[#329cf9]">South Dakota</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover prime investment opportunities in the Mount Rushmore State. From agricultural excellence to energy development, South Dakota offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=South Dakota">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse South Dakota Properties
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

      {/* Why South Dakota Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why South Dakota is a <span className="text-[#329cf9]">Prime Investment Market</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Agricultural excellence and energy development continue to drive demand for land across South Dakota.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Business-friendly policies and low taxes support long-term appreciation and development viability.
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Abundant land supply with diverse opportunities keeps the market accessible and profitable.
            </p>
          </div>

          {/* State Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">884K</div>
              <div className="text-lg font-semibold text-gray-900">State Population</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">$55B</div>
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
              Featured South Dakota <span className="text-[#329cf9]">Properties</span>
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
            <Link to="/properties?search=South Dakota">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All South Dakota Properties
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
              South Dakota Regional <span className="text-[#329cf9]">Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse investment opportunities across different regions
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
              Essential infrastructure information for land development in South Dakota
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
              Understanding zoning classifications in South Dakota
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
                  Zoning information is subject to change and should be verified with local South Dakota planning departments before making investment decisions. Development requirements, setbacks, and permitted uses may vary by specific location and current regulations. Always consult with local planning officials and qualified professionals before proceeding with land development projects.
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
              Want to Buy Land in <span className="text-[#329cf9]">South Dakota?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill up the form to get a full list of Land for sale in South Dakota.
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
                          placeholder="Preferred Location in South Dakota"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Land for Sale in South Dakota</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking to buy land for sale in South Dakota? There are plenty of options out there, ranging from premium agricultural farmland to recreational hunting properties and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your investment goals and whether you plan to farm, develop, or hold for appreciation. Agricultural land is ideal for farming operations or long-term investment. If you're looking for recreational use or development potential, consider properties near growing cities or recreational areas.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in South Dakota</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              South Dakota offers some of the most productive agricultural land in the nation, along with energy development opportunities and recreational properties. The state's business-friendly environment and low taxes make it attractive for land investors.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Consider agricultural potential</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              South Dakota is known for its excellent agricultural land, particularly for corn, soybeans, and wheat production. When evaluating agricultural land, consider soil quality, drainage, access to markets, and current commodity prices.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Evaluate energy development opportunities</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              The state has significant oil and gas resources in the western regions, as well as excellent wind energy potential. Properties with mineral rights or wind energy potential can provide additional income streams.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips to Find Affordable Land for Sale in South Dakota</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              South Dakota generally offers more affordable land prices compared to coastal states, but prime agricultural and development land still commands premium prices. Here are strategies to find good value:
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">1) Focus on emerging areas</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Look for areas experiencing population growth or economic development. Cities like Sioux Falls and Rapid City continue to expand, creating opportunities in surrounding areas.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">2) Consider agricultural lease opportunities</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Agricultural land can generate immediate income through farming leases while appreciating in value. This can help offset holding costs and provide cash flow.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">3) Explore energy development potential</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Properties with wind energy or mineral rights potential can provide significant additional value. Wind energy leases can generate $3,000-$8,000 per turbine annually.
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
            <p className="text-xl text-gray-600">Common questions about South Dakota land investment</p>
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
            Ready to Invest in South Dakota Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=South Dakota">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse South Dakota Properties
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