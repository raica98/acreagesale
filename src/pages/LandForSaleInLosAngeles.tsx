import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, User, MapPin, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, DollarSign, Clock, Camera, Plane, Ship, Mountain, Sun, TreePine, Factory, Chrome as Home, Car, Wifi, Droplets, Flame, TriangleAlert as AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInLosAngeles() {
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
    { icon: Building, label: "Active Listings", value: "2,500+", color: "text-blue-600" },
    { icon: DollarSign, label: "Avg. Price/Acre", value: "$15,000", color: "text-green-600" },
    { icon: MapPin, label: "Total Acres", value: "50,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+12%", color: "text-orange-600" }
  ];

  const marketStats = [
    { label: "Metro Population", value: "13M", color: "text-blue-600" },
    { label: "Annual GDP", value: "$950B", color: "text-green-600" }
  ];

  const benefits = [
    "No realtor commissions - save 6%",
    "Direct owner negotiations",
    "Verified property data",
    "Professional aerial imagery",
    "Market analysis included",
    "Fast closing process"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Land Investor",
      content: "Found the perfect 10-acre plot in Los Angeles through Acreage Sale. The process was seamless and saved me thousands in fees.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Developer",
      content: "The market data and aerial imagery helped me make an informed decision. Closed on 25 acres in just 45 days.",
      rating: 5
    }
  ];

  const featuredProperties = [
    {
      title: "25-Acre Development Site",
      location: "North Los Angeles",
      size: "25.0 acres",
      price: "$2,500,000",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot",
      location: "Downtown Los Angeles",
      size: "2.5 acres",
      price: "$1,200,000",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Los Angeles Suburbs",
      size: "5.2 acres",
      price: "$850,000",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const submarkets = [
    {
      title: "West Los Angeles",
      description: "Premium coastal and hillside properties with ocean proximity and entertainment industry connections.",
      priceRange: "$500K+",
      primaryUse: "Luxury Residential",
      features: ["Ocean proximity", "Entertainment industry", "Premium locations", "Hillside properties"]
    },
    {
      title: "East Los Angeles",
      description: "Emerging markets with industrial and logistics opportunities, growing residential communities.",
      priceRange: "$150K-300K",
      primaryUse: "Mixed Development",
      features: ["Industrial opportunities", "Growing communities", "Logistics access", "Emerging markets"]
    },
    {
      title: "North Los Angeles",
      description: "San Fernando Valley and foothill areas offering suburban development and entertainment industry proximity.",
      priceRange: "$200K-400K",
      primaryUse: "Suburban Residential",
      features: ["San Fernando Valley", "Foothill areas", "Suburban development", "Entertainment proximity"]
    },
    {
      title: "South Los Angeles",
      description: "Port proximity and aerospace industry connections create opportunities for industrial and logistics development.",
      priceRange: "$250K-450K",
      primaryUse: "Industrial/Logistics",
      features: ["Port proximity", "Aerospace industry", "Industrial development", "Logistics opportunities"]
    }
  ];

  const zoningTypes = [
    {
      category: "Residential (R1-R5)",
      description: "Single-family to high-density residential development with varying density requirements.",
      uses: ["Single-family homes", "Condos", "Apartments", "Townhomes"]
    },
    {
      category: "Commercial (C1-C4)",
      description: "Retail, office, and mixed-use commercial development opportunities.",
      uses: ["Retail centers", "Offices", "Restaurants", "Entertainment venues"]
    },
    {
      category: "Industrial (M1-M3)",
      description: "Manufacturing, logistics, and heavy industrial uses with varying intensity levels.",
      uses: ["Warehouses", "Manufacturing", "Logistics centers", "Studios"]
    }
  ];

  const developmentProcess = [
    {
      step: "1",
      title: "Pre-Application",
      timeline: "1-2 months",
      description: "Site analysis, feasibility studies, and preliminary design development."
    },
    {
      step: "2",
      title: "Entitlement Process",
      timeline: "6-18 months",
      description: "Zoning approvals, environmental review, and permit applications."
    },
    {
      step: "3",
      title: "Construction Permits",
      timeline: "2-6 months",
      description: "Building permits, infrastructure approvals, and final inspections."
    },
    {
      step: "4",
      title: "Construction Phase",
      timeline: "6-24 months",
      description: "Site preparation, infrastructure installation, and building construction."
    }
  ];

  const utilities = [
    {
      type: "Electricity",
      primary: "LADWP",
      secondary: "SCE",
      timeline: "30-90 days",
      icon: Zap
    },
    {
      type: "Water & Sewer",
      primary: "LADWP/MWD",
      secondary: "City of LA",
      timeline: "60-120 days",
      icon: Droplets
    },
    {
      type: "Telecommunications",
      primary: "Spectrum/AT&T",
      secondary: "Fiber Expanding",
      timeline: "14-30 days",
      icon: Wifi
    }
  ];

  const highways = [
    { name: "I-5", description: "Primary north-south corridor connecting to San Diego and San Francisco" },
    { name: "I-10", description: "Major east-west route to Phoenix, Las Vegas, and beyond" },
    { name: "I-405", description: "Critical north-south bypass serving west side communities" },
    { name: "I-110", description: "Downtown connector linking port areas to central city" },
    { name: "SR-101", description: "Coastal route serving Hollywood and San Fernando Valley" },
    { name: "SR-134", description: "East-west connector through Glendale and Pasadena" },
    { name: "SR-210", description: "Foothill Freeway serving northern suburbs" }
  ];

  const environmentalFactors = [
    {
      title: "Mediterranean Climate",
      description: "Mild, wet winters and warm, dry summers with minimal seasonal construction delays",
      icon: Sun
    },
    {
      title: "Seismic Considerations",
      description: "Active earthquake zone requiring specialized engineering and building codes",
      icon: AlertTriangle
    },
    {
      title: "Fire Risk Areas",
      description: "Wildfire-prone areas require special building materials and defensible space planning",
      icon: Flame
    }
  ];

  const holdingCosts = [
    { category: "Property Taxes", rate: "1.0-1.25%" },
    { category: "Insurance", rate: "$500-2,000" },
    { category: "Maintenance", rate: "$200-1,000" }
  ];

  const returns = [
    { category: "Historical Average", rate: "4-8% annually" },
    { category: "Prime Locations", rate: "8-15% annually" },
    { category: "Development Upside", rate: "20-50%+" }
  ];

  const incomeOpportunities = [
    { category: "Agricultural Lease", rate: "$100-500/acre" },
    { category: "Storage/Parking", rate: "$200-1,000/acre" },
    { category: "Cell Tower Lease", rate: "$1,000-5,000/mo" }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in Los Angeles?",
      answer: "Property tax rates in Los Angeles County typically range from 1.0% to 1.25% of assessed value annually. Vacant land is generally assessed at a lower rate than developed properties, but rates can vary significantly by specific location and local assessment districts. Additional special assessments may apply for infrastructure improvements."
    },
    {
      question: "How long does the development approval process take in Los Angeles?",
      answer: "Development approval timelines in Los Angeles vary significantly based on project complexity and location. Simple residential projects may take 6-12 months, while complex commercial or industrial developments can require 18-36 months. Environmental review, community input, and infrastructure requirements are primary factors affecting timeline length."
    },
    {
      question: "What utilities are readily available for land development in Los Angeles?",
      answer: "Most areas within Los Angeles city limits have access to municipal water, sewer, electricity, and natural gas. However, utility availability and capacity can vary significantly by location. Rural or hillside areas may require expensive utility extensions or alternative solutions like wells and septic systems."
    },
    {
      question: "Are there building restrictions for hillside properties in Los Angeles?",
      answer: "Yes, Los Angeles has specific hillside ordinances that regulate development on slopes greater than 15%. These include restrictions on grading, building height, setbacks, and environmental protection measures. Properties in Very High Fire Hazard Severity Zones have additional requirements for defensible space and fire-resistant construction materials."
    },
    {
      question: "What is the investment potential for commercial land in Los Angeles?",
      answer: "Commercial land in Los Angeles offers strong investment potential due to the region's economic diversity and population growth. Key sectors driving demand include entertainment, technology, international trade, and tourism. Prime commercial locations near major transportation corridors or employment centers typically see the strongest appreciation and development interest."
    },
    {
      question: "How do earthquake considerations affect land development in Los Angeles?",
      answer: "Los Angeles is located in an active seismic zone, requiring compliance with strict building codes and engineering standards. Seismic studies may be required for larger developments, and construction costs are typically higher due to earthquake-resistant design requirements. However, modern building techniques have made development safe and economically viable throughout the region."
    },
    {
      question: "What financing options work best for Los Angeles land purchases?",
      answer: "Given Los Angeles's high property values, many investors use a combination of financing strategies including traditional commercial loans, private lending, joint ventures, and seller financing. Cash purchases are common for smaller parcels, while larger developments often require sophisticated financing structures involving multiple funding sources and development phases."
    },
    {
      question: "Are there opportunities for agricultural land use in Los Angeles?",
      answer: "While Los Angeles is primarily urban, agricultural opportunities exist in outlying areas, particularly in the northern San Fernando Valley and eastern county areas. These may include specialty crops, organic farming, agritourism, or equestrian facilities. Agricultural zoning can provide property tax benefits but may limit future development options."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="land-for-sale-in-los-angeles" />
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
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#329cf9] text-white px-8 py-3 text-lg font-bold mb-8 shadow-xl">
            🏆 Premium Market
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Land for Sale in <span className="text-[#329cf9]">Los Angeles</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Los Angeles offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=Los Angeles">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse Los Angeles Properties
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
              Get Market Analysis
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Los Angeles is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              
              <div className="space-y-6 mb-8">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Population growth and diversified employment continue to drive demand for land across Los Angeles.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Corporate expansion and infrastructure investment support long-term appreciation and development viability.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                {marketStats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Los Angeles vacant land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Los Angeles</h3>
                <p className="text-white/90">Prime Growth Market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Los Angeles Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from <span className="text-[#329cf9]">Los Angeles Investors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
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
              Featured <span className="text-[#329cf9]">Los Angeles Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#329cf9] text-white px-3 py-1 rounded-full font-bold">
                    {property.size}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#329cf9]">{property.price}</span>
                    <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties?search=Los Angeles">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All Los Angeles Properties
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
              Los Angeles <span className="text-[#329cf9]">Regional Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse land opportunities across Los Angeles County's distinct regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {submarkets.map((submarket, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{submarket.title}</h3>
                    <Badge className="bg-[#329cf9] text-white px-4 py-2 font-bold">
                      {submarket.priceRange}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{submarket.description}</p>
                  <div className="mb-6">
                    <span className="text-sm font-bold text-gray-800">Primary Use: </span>
                    <span className="text-[#329cf9] font-semibold">{submarket.primaryUse}</span>
                  </div>
                  <div className="space-y-2">
                    {submarket.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Los Angeles <span className="text-[#329cf9]">Zoning and Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding zoning classifications and development processes in Los Angeles County
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {zoningTypes.map((zone, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{zone.category}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{zone.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {zone.uses.map((use, useIndex) => (
                      <div key={useIndex} className="bg-blue-50 rounded-lg p-3 text-center">
                        <span className="text-blue-800 font-medium text-sm">{use}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Development Process */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Process Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                  <div className="text-[#329cf9] font-bold mb-3">{step.timeline}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Los Angeles <span className="text-[#329cf9]">Utilities and Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure information for land development in Los Angeles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {utilities.map((utility, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <utility.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{utility.type}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Primary Provider:</span>
                      <p className="font-semibold text-gray-900">{utility.primary}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Secondary Provider:</span>
                      <p className="font-semibold text-gray-900">{utility.secondary}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Connection Timeline:</span>
                      <p className="font-semibold text-[#329cf9]">{utility.timeline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transportation Corridors */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Los Angeles Transportation and Access
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Strategic transportation infrastructure supporting land development and investment
            </p>
            
            <div className="space-y-6 mb-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Major Highway Corridors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highways.map((highway, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-[#329cf9] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2">{highway.name}</h5>
                      <p className="text-gray-600 text-sm">{highway.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Plane className="w-8 h-8 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">LAX International Airport</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• World's 4th busiest airport by passenger traffic</li>
                  <li>• Major cargo hub for Pacific Rim trade</li>
                  <li>• $14 billion modernization program underway</li>
                  <li>• Direct access via I-405 and surface streets</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Ship className="w-8 h-8 text-green-600" />
                  <h4 className="text-xl font-bold text-gray-900">Port of Los Angeles</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>• Busiest container port in the Western Hemisphere</li>
                  <li>• Direct rail connections to major inland markets</li>
                  <li>• Significant logistics and warehouse demand driver</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Considerations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Environmental and <span className="text-[#329cf9]">Regulatory Considerations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important factors to consider when developing land in Los Angeles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {environmentalFactors.map((factor, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <factor.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{factor.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financing and Investment */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financing and <span className="text-[#329cf9]">Investment Strategies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financial approaches for Los Angeles land investment and development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Holding Costs */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Annual Holding Costs</h3>
                <div className="space-y-4">
                  {holdingCosts.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                      <span className="font-medium text-gray-900">{cost.category}:</span>
                      <span className="font-bold text-red-600">{cost.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Appreciation Potential */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Appreciation Potential</h3>
                <div className="space-y-4">
                  {returns.map((return_, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-900">{return_.category}:</span>
                      <span className="font-bold text-green-600">{return_.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Income Opportunities */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Income Opportunities</h3>
                <div className="space-y-4">
                  {incomeOpportunities.map((income, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-900">{income.category}:</span>
                      <span className="font-bold text-blue-600">{income.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complete Land Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Los Angeles Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about buying land in Los Angeles
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Land for Sale in Los Angeles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking to buy land for sale in Los Angeles? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in Los Angeles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Ask other landowners about the area</h4>
            <p className="text-gray-700 leading-relaxed mb-6">
              Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Look for signs of natural regeneration</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Summing up</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              When you're looking for land for sale in Los Angeles, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in Los Angeles, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips to Find Cheap Land for Sale in Los Angeles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 5 places where you can find cheap land for sale near me right now…
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">1) Check out foreclosure listings in your area</h4>
                <p className="text-gray-700 leading-relaxed">
                  Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Los Angeles. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">2) Take advantage of the seller's desperation</h4>
                <p className="text-gray-700 leading-relaxed">
                  While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">3) Look for land development opportunities</h4>
                <p className="text-gray-700 leading-relaxed">
                  The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">4) Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h4>
                <p className="text-gray-700 leading-relaxed">
                  You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">5) Take the time to find the right property for you</h4>
                <p className="text-gray-700 leading-relaxed">
                  Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Acreage Sale */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#329cf9]">Acreage Sale</span>
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Los Angeles to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#329cf9]">Questions About Los Angeles Land</span>
            </h2>
            <p className="text-xl text-gray-600">Expert answers to common questions about land investment in Los Angeles</p>
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

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Want to Buy Land in <span className="text-[#329cf9]">United States?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Fill up the form to get a full list of Land for sale in the United States.
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">100% Guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Multiple Offers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Global Reach</span>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {success ? (
              <Card className="text-center p-12 border-0 shadow-2xl">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-xl text-gray-600">
                    We've received your information and will contact you within 24 hours with a comprehensive list of available properties in Los Angeles.
                  </p>
                </CardContent>
              </Card>
            ) : (
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
                          Cities or Area
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('city')}
                            placeholder="Cities or Area"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.city && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Property State
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('state')}
                            placeholder="Property State"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.state && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.state.message}
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
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Send className="w-6 h-6" />
                            Receive Land List
                          </div>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-16 border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white font-bold text-xl rounded-2xl"
                      >
                        <Phone className="w-6 h-6 mr-3" />
                        Call Now
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Invest in Los Angeles Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Los Angeles">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Los Angeles Properties
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