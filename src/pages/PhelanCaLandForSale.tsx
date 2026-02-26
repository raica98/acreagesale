import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Contact as Cactus, Wind, Thermometer, Compass, Camera, Binoculars, Tent, Pickaxe, Hammer, ChartBar as BarChart3 } from 'lucide-react';
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
  propertySize: z.string().min(1, 'Property size preference is required'),
  budget: z.string().min(1, 'Budget range is required'),
  intendedUse: z.string().min(1, 'Intended use is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  specificRequirements: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function PhelanCaLandForSale() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      timeline: 'Within 6 months',
      intendedUse: 'Primary Residence',
      budget: '$100,000 - $200,000',
      propertySize: '2.5-5 acres',
    },
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
    { icon: DollarSign, label: "Starting From", value: "$35,000", color: "text-green-600" },
    { icon: Ruler, label: "Avg. Lot Size", value: "5.8 acres", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Appreciation", value: "+16%", color: "text-orange-600" }
  ];

  const marketData = [
    { metric: "Median Price per Acre", value: "$8,500", change: "+14%", period: "Year over year" },
    { metric: "Average Days on Market", value: "45 days", change: "-8%", period: "Faster sales" },
    { metric: "Inventory Levels", value: "6.2 months", change: "Stable", period: "Balanced market" },
    { metric: "Price Range", value: "$25K-$500K", change: "Wide variety", period: "All budgets" }
  ];

  const propertyTypes = [
    {
      title: "Residential Homesites",
      description: "Perfect for building your dream home in the high desert. These properties offer the space and privacy that's becoming rare in California, with stunning mountain views and clean air.",
      priceRange: "$50,000 - $200,000",
      lotSize: "2.5-10 acres",
      features: ["Mountain views", "Rural privacy", "Custom home sites", "Utilities available"],
      icon: Home
    },
    {
      title: "Agricultural Land",
      description: "Ideal for farming, ranching, or equestrian activities. The high desert climate and large lot sizes provide excellent opportunities for agricultural pursuits and livestock operations.",
      priceRange: "$25,000 - $150,000",
      lotSize: "5-40 acres",
      features: ["Agricultural zoning", "Livestock permitted", "Water rights", "Equipment storage"],
      icon: TreePine
    },
    {
      title: "Investment Properties",
      description: "Strategic land holdings for future development or appreciation. Phelan's growth potential and proximity to urban centers make it attractive for long-term investment strategies.",
      priceRange: "$35,000 - $300,000",
      lotSize: "2.5-20 acres",
      features: ["Development potential", "Appreciation prospects", "Flexible zoning", "Strategic location"],
      icon: TrendingUp
    },
    {
      title: "Recreational Land",
      description: "Perfect for weekend getaways, camping, or outdoor recreation. Close to Angeles National Forest and desert recreation areas with excellent access to hiking and off-road activities.",
      priceRange: "$30,000 - $125,000",
      lotSize: "5-25 acres",
      features: ["Forest access", "Recreation opportunities", "Camping permitted", "Off-road access"],
      icon: Tent
    }
  ];

  const infrastructure = [
    {
      category: "Transportation",
      description: "Excellent highway access and connectivity to major employment centers and recreational areas throughout Southern California.",
      details: [
        "Highway 138: Primary east-west corridor to I-15 and Palmdale",
        "Phelan Road: Main north-south arterial through community",
        "I-15 Access: 25 minutes to major freeway system",
        "Angeles Crest Highway: Scenic route to mountain recreation"
      ]
    },
    {
      category: "Utilities & Services",
      description: "Essential services and infrastructure to support residential and commercial development throughout the Phelan area.",
      details: [
        "Electricity: Southern California Edison service area",
        "Water: Phelan Piñon Hills CSD and private wells",
        "Internet: Frontier, satellite, and expanding fiber networks",
        "Emergency Services: Fire protection and sheriff patrol"
      ]
    },
    {
      category: "Education & Community",
      description: "Quality educational opportunities and strong community organizations that support families and residents.",
      details: [
        "Snowline Joint Unified School District",
        "Community centers and recreational facilities",
        "Local library and educational resources",
        "Active community organizations and events"
      ]
    },
    {
      category: "Healthcare & Shopping",
      description: "Access to healthcare services and shopping opportunities within the community and nearby areas.",
      details: [
        "Local medical clinics and healthcare providers",
        "Pharmacy and essential services",
        "Grocery stores and retail shopping",
        "Restaurants and local businesses"
      ]
    }
  ];

  const zoning = [
    {
      code: "RL (Rural Living)",
      description: "2.5-acre minimum lots for single-family homes with agricultural uses permitted",
      allowedUses: ["Single-family homes", "Accessory structures", "Agricultural activities", "Keeping of animals"],
      restrictions: ["2.5-acre minimum", "35-foot height limit", "Setback requirements", "Well and septic required"]
    },
    {
      code: "RC (Resource Conservation)", 
      description: "5-acre minimum lots emphasizing conservation and limited development",
      allowedUses: ["Single-family homes", "Agricultural uses", "Conservation activities", "Limited commercial"],
      restrictions: ["5-acre minimum", "Limited density", "Environmental review", "Conservation focus"]
    },
    {
      code: "AG (Agricultural)",
      description: "40-acre minimum for agricultural operations and related activities",
      allowedUses: ["Farming operations", "Livestock ranching", "Agricultural processing", "Farm worker housing"],
      restrictions: ["40-acre minimum", "Agricultural focus", "Limited residential", "Water rights required"]
    }
  ];

  const financing = [
    {
      type: "Conventional Land Loans",
      description: "Traditional bank financing for qualified buyers with good credit and stable income",
      terms: "20-30% down, 5-20 year terms, 7-12% interest rates",
      bestFor: "Buyers with good credit and stable income",
      pros: ["Lower interest rates", "Longer terms", "Established process"],
      cons: ["Higher down payment", "Strict qualification", "Longer approval time"]
    },
    {
      type: "Owner Financing",
      description: "Direct financing from property sellers offering flexible terms and faster closing",
      terms: "10-25% down, 3-10 year terms, 6-10% interest rates",
      bestFor: "Buyers with limited credit or self-employed income",
      pros: ["Flexible qualification", "Faster closing", "Negotiable terms"],
      cons: ["Higher rates possible", "Shorter terms", "Balloon payments"]
    },
    {
      type: "Cash Purchase",
      description: "Immediate ownership with no financing contingencies or monthly payments",
      terms: "100% cash, immediate closing, no interest payments",
      bestFor: "Investors and buyers with available capital",
      pros: ["Immediate ownership", "No interest", "Stronger offers"],
      cons: ["Large capital requirement", "Opportunity cost", "Liquidity impact"]
    }
  ];

  const faqs = [
    {
      question: "What is the current land market like in Phelan, CA?",
      answer: "The Phelan land market is experiencing steady growth with increasing demand from buyers seeking affordable rural properties near urban centers. Prices have appreciated 12-16% annually over the past three years, driven by population growth, limited supply, and the area's unique combination of rural lifestyle with urban accessibility. The market remains balanced with good opportunities for both buyers and sellers."
    },
    {
      question: "What size properties are typically available in Phelan?",
      answer: "Phelan properties typically range from 2.5 acres (minimum for Rural Living zones) to 40+ acres for agricultural properties. The most common sizes are 2.5-10 acres for residential use, 5-20 acres for equestrian properties, and 10-40 acres for agricultural or investment purposes. Larger parcels are available for commercial or development projects."
    },
    {
      question: "What are the building requirements for Phelan properties?",
      answer: "Building requirements in Phelan follow San Bernardino County codes including minimum setbacks (typically 20-50 feet from property lines), height restrictions (35 feet maximum for residential), and well/septic requirements for rural properties. Most zones allow accessory structures like barns, workshops, and guest houses. Building permits are required for all structures."
    },
    {
      question: "How do utilities work for rural properties in Phelan?",
      answer: "Utility availability depends on location. Developed areas have Southern California Edison electricity and Phelan Piñon Hills CSD water service. Rural properties typically require private wells (cost $8,000-$25,000) and septic systems ($5,000-$15,000). Internet options include Frontier DSL, satellite services, and expanding fiber networks."
    },
    {
      question: "What are the ongoing costs of owning land in Phelan?",
      answer: "Annual costs include property taxes ($800-$2,400/acre), insurance ($150-$400/acre), and minimal maintenance ($100-$300/acre). Total annual holding costs typically range from $1,050-$3,100 per acre. These costs are significantly lower than coastal California areas while providing similar lifestyle benefits."
    },
    {
      question: "Can I generate income from my Phelan land?",
      answer: "Yes, several income opportunities exist including agricultural leases ($50-$200/acre annually), solar energy leases ($300-$800/acre annually), cell tower leases ($1,000-$3,000/month), RV/equipment storage, and event hosting. The rural setting and large lot sizes provide flexibility for various income-generating activities."
    },
    {
      question: "What recreational opportunities are available in Phelan?",
      answer: "Phelan offers exceptional recreational access including Angeles National Forest (15 minutes), off-road vehicle areas, hiking trails, camping sites, and rock hounding locations. The high desert setting provides year-round outdoor activities with clear skies for stargazing and photography. Many residents enjoy the outdoor lifestyle that's difficult to find elsewhere in California."
    },
    {
      question: "Is Phelan a good long-term investment?",
      answer: "Phelan shows strong long-term investment potential due to limited land supply, growing demand for rural properties, proximity to major employment centers, and California's overall population growth. The area's development restrictions help preserve property values while the strategic location ensures continued demand from buyers seeking affordable alternatives to coastal markets."
    }
  ];

  if (success) {
    <SEO slug="phelan-ca-land-for-sale" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you detailed listings of available land for sale in Phelan, CA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties?search=Phelan">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse Phelan Properties
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
              <Link to="/properties?search=Phelan">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                  View Properties
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
              🏜️ California High Desert Land for Sale
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Phelan CA <span className="text-[#329cf9]">Land for Sale</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover exceptional land opportunities in Phelan, California - where affordable prices meet stunning high desert beauty. From residential homesites to agricultural acreage, find your perfect piece of California's last affordable frontier.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Phelan">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Available Land
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Market Report
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

      {/* Market Data Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Phelan CA <span className="text-[#329cf9]">Market Data</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions and trends for land sales in Phelan, California
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketData.map((data, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{data.metric}</h3>
                  <div className="text-3xl font-bold text-[#329cf9] mb-2">{data.value}</div>
                  <div className="text-sm text-green-600 font-medium">{data.change}</div>
                  <div className="text-xs text-gray-500 mt-1">{data.period}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of Land <span className="text-[#329cf9]">Available</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse property types to meet every need and budget in Phelan, California
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {propertyTypes.map((type, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center">
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                      <div className="text-[#329cf9] font-bold">{type.priceRange}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="font-bold text-blue-600">{type.lotSize}</div>
                      <div className="text-sm text-gray-600">Typical Size</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="font-bold text-green-600">{type.priceRange}</div>
                      <div className="text-sm text-gray-600">Price Range</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
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

      {/* Infrastructure Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Infrastructure & <span className="text-[#329cf9]">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive infrastructure and services supporting the Phelan community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infrastructure.map((infra, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{infra.category}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{infra.description}</p>
                  <div className="space-y-3">
                    {infra.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning Information */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Zoning & <span className="text-[#329cf9]">Development</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding zoning classifications and development opportunities in Phelan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {zoning.map((zone, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{zone.code.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{zone.code}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">{zone.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Allowed Uses:</h4>
                      <div className="space-y-1">
                        {zone.allowedUses.map((use, useIndex) => (
                          <div key={useIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700 text-sm">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Key Restrictions:</h4>
                      <div className="space-y-1">
                        {zone.restrictions.map((restriction, restrictionIndex) => (
                          <div key={restrictionIndex} className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            <span className="text-gray-700 text-sm">{restriction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financing <span className="text-[#329cf9]">Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple financing strategies to help you acquire land in Phelan, California
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financing.map((option, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.type}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>
                  
                  <div className="bg-[#329cf9]/10 rounded-xl p-4 mb-6">
                    <div className="font-bold text-[#329cf9] text-sm">{option.terms}</div>
                    <div className="text-xs text-gray-600 mt-1">Typical Terms</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-gray-900 mb-2">Best For:</div>
                      <div className="text-gray-700 text-sm">{option.bestFor}</div>
                    </div>
                    
                    <div>
                      <div className="font-bold text-green-700 mb-2">Pros:</div>
                      <div className="space-y-1">
                        {option.pros.map((pro, proIndex) => (
                          <div key={proIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span className="text-gray-700 text-xs">{pro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-bold text-orange-700 mb-2">Cons:</div>
                      <div className="space-y-1">
                        {option.cons.map((con, conIndex) => (
                          <div key={conIndex} className="flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-orange-500" />
                            <span className="text-gray-700 text-xs">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
              Find Your Perfect <span className="text-[#329cf9]">Phelan Property</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your land needs and we'll help you find the ideal property in Phelan, CA
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('firstName')}
                          placeholder="Your first name"
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
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('lastName')}
                          placeholder="Your last name"
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
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('email')}
                          type="email"
                          placeholder="your.email@example.com"
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
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('phone')}
                          placeholder="(555) 123-4567"
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
                        Property Size Preference *
                      </label>
                      <select
                        {...form.register('propertySize')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="2.5-5 acres">2.5-5 acres</option>
                        <option value="5-10 acres">5-10 acres</option>
                        <option value="10-20 acres">10-20 acres</option>
                        <option value="20-40 acres">20-40 acres</option>
                        <option value="40+ acres">40+ acres</option>
                      </select>
                      {form.formState.errors.propertySize && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.propertySize.message}
                        </p>
                      )}
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
                        <option value="$100,000 - $200,000">$100,000 - $200,000</option>
                        <option value="$200,000 - $400,000">$200,000 - $400,000</option>
                        <option value="$400,000+">$400,000+</option>
                      </select>
                      {form.formState.errors.budget && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.budget.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Intended Use *
                      </label>
                      <select
                        {...form.register('intendedUse')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="Primary Residence">Primary Residence</option>
                        <option value="Vacation/Weekend Home">Vacation/Weekend Home</option>
                        <option value="Investment Property">Investment Property</option>
                        <option value="Agricultural Use">Agricultural Use</option>
                        <option value="Recreational Use">Recreational Use</option>
                        <option value="Future Development">Future Development</option>
                      </select>
                      {form.formState.errors.intendedUse && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.intendedUse.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Timeline *
                      </label>
                      <select
                        {...form.register('timeline')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="Within 3 months">Within 3 months</option>
                        <option value="Within 6 months">Within 6 months</option>
                        <option value="Within 1 year">Within 1 year</option>
                        <option value="Just researching">Just researching</option>
                      </select>
                      {form.formState.errors.timeline && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.timeline.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Specific Requirements (Optional)
                      </label>
                      <textarea
                        {...form.register('specificRequirements')}
                        placeholder="Tell us about any specific requirements like mountain views, utilities, access roads, or other preferences..."
                        className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] resize-none text-lg"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Request...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-6 h-6" />
                        Get Phelan Land Listings
                      </div>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    🔒 Your information is secure and will never be shared. SSL encrypted.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#329cf9]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Expert answers about Phelan, CA land for sale</p>
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
            Ready to Own Land in Phelan, CA?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Discover California's most affordable land opportunities in the beautiful high desert
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Phelan">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Phelan Land
              </Button>
            </Link>
            <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
              Get Free Guide
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