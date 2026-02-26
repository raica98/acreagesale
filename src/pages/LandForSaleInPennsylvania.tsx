import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, User, MapPin, Send, Star, TrendingUp, Users, DollarSign, Award, Shield, CircleCheck as CheckCircle, Building, Zap, ChartBar as BarChart3, Globe, Clock, TreePine, Factory, Chrome as Home, Truck, Plane, Wifi, Droplets, Flame, Calendar, FileText, Target, Eye, Calculator, Briefcase } from 'lucide-react';
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
  propertyType: z.string().min(1, 'Property type is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInPennsylvania() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
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
    { icon: TrendingUp, label: "Price Growth", value: "+9%", color: "text-orange-600" }
  ];

  const marketStats = [
    { label: "State Population", value: "13.0M", color: "text-blue-600" },
    { label: "Annual GDP", value: "$825B", color: "text-green-600" }
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
      content: "Found the perfect 15-acre plot in Pennsylvania through Acreage Sale. The process was seamless and saved me thousands in fees.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Developer",
      content: "The market data and aerial imagery helped me make an informed decision. Closed on 40 acres in just 35 days.",
      rating: 5
    }
  ];

  const featuredProperties = [
    {
      title: "30-Acre Development Site",
      location: "North Pennsylvania",
      size: "30.0 acres",
      price: "$1,800,000",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot",
      location: "Downtown Pennsylvania",
      size: "3.5 acres",
      price: "$950,000",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Pennsylvania Suburbs",
      size: "8.2 acres",
      price: "$650,000",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const regionalMarkets = [
    {
      title: "Southeastern Pennsylvania",
      description: "Philadelphia metro area including Chester, Delaware, Montgomery, and Bucks counties. High-value market with strong development demand.",
      priceRange: "$15,000-$45,000/acre",
      primaryUses: "Residential, Commercial",
      growthRate: "+12% annually",
      icon: Building
    },
    {
      title: "Central Pennsylvania",
      description: "Harrisburg, Lancaster, and York areas. Balanced market with agricultural and residential opportunities.",
      priceRange: "$8,000-$20,000/acre",
      primaryUses: "Agricultural, Residential",
      growthRate: "+8% annually",
      icon: TreePine
    },
    {
      title: "Western Pennsylvania",
      description: "Pittsburgh metro and surrounding counties. Industrial heritage with emerging technology and energy sectors.",
      priceRange: "$6,000-$18,000/acre",
      primaryUses: "Industrial, Energy",
      growthRate: "+6% annually",
      icon: Factory
    },
    {
      title: "Northern Pennsylvania",
      description: "Scranton, Wilkes-Barre, and rural counties. Recreational and agricultural focus with affordable entry points.",
      priceRange: "$3,500-$12,000/acre",
      primaryUses: "Recreational, Agricultural",
      growthRate: "+4% annually",
      icon: TreePine
    }
  ];

  const zoningTypes = [
    {
      category: "Residential Zones",
      icon: Home,
      types: [
        { code: "R-1", name: "Single Family", description: "Low-density residential, minimum 1-acre lots in rural areas" },
        { code: "R-2", name: "Medium Density", description: "Townhomes and duplexes, 0.25-0.5 acre minimum" },
        { code: "R-3", name: "High Density", description: "Apartments and condos, urban infill development" }
      ]
    },
    {
      category: "Commercial Zones",
      icon: Building,
      types: [
        { code: "C-1", name: "Neighborhood", description: "Local retail, offices, small-scale commercial uses" },
        { code: "C-2", name: "General", description: "Shopping centers, restaurants, automotive services" },
        { code: "C-3", name: "Highway", description: "Large retail, hotels, highway-oriented commercial" }
      ]
    },
    {
      category: "Industrial & Special",
      icon: Factory,
      types: [
        { code: "I-1", name: "Light Industrial", description: "Manufacturing, warehousing, distribution centers" },
        { code: "I-2", name: "Heavy Industrial", description: "Heavy manufacturing, chemical processing, energy" },
        { code: "A-1", name: "Agricultural", description: "Farming, forestry, rural residential uses" }
      ]
    }
  ];

  const developmentPhases = [
    {
      phase: "1",
      title: "Pre-Development",
      duration: "2-4 months",
      description: "Site analysis and feasibility study",
      tasks: [
        "Zoning verification and variance applications",
        "Environmental assessments (Phase I/II)",
        "Preliminary engineering and surveying"
      ]
    },
    {
      phase: "2",
      title: "Design and Permitting",
      duration: "4-8 months",
      description: "Detailed site plans and engineering drawings",
      tasks: [
        "Municipal planning commission review",
        "DEP permits for stormwater and sewage",
        "Building permit applications"
      ]
    },
    {
      phase: "3",
      title: "Infrastructure Development",
      duration: "6-12 months",
      description: "Site preparation and grading",
      tasks: [
        "Utility installation (water, sewer, electric)",
        "Road construction and paving",
        "Stormwater management systems"
      ]
    },
    {
      phase: "4",
      title: "Construction and Marketing",
      duration: "8-18 months",
      description: "Building construction or lot sales",
      tasks: [
        "Final inspections and certificates of occupancy",
        "Marketing and sales activities",
        "Project completion and closeout"
      ]
    }
  ];

  const utilities = [
    {
      type: "Electricity",
      icon: Zap,
      providers: ["PECO (Southeast)", "PPL Electric (Central/East)", "Duquesne Light (Southwest)", "Rural Electric Cooperatives"]
    },
    {
      type: "Water & Sewer",
      icon: Droplets,
      providers: ["Municipal water authorities", "Private well systems", "On-site septic systems", "Regional sewer authorities"]
    },
    {
      type: "Telecommunications",
      icon: Wifi,
      providers: ["Verizon FiOS", "Comcast Xfinity", "Service Electric Cable", "Rural broadband initiatives"]
    },
    {
      type: "Natural Gas",
      icon: Flame,
      providers: ["PECO Energy", "Columbia Gas", "UGI Utilities", "Propane delivery services"]
    }
  ];

  const transportation = [
    {
      type: "I-95",
      name: "Interstate 95",
      description: "North-South corridor, NYC to Washington DC",
      icon: Truck
    },
    {
      type: "I-76",
      name: "Pennsylvania Turnpike",
      description: "East-West corridor, Philadelphia to Pittsburgh",
      icon: Truck
    },
    {
      type: "I-80",
      name: "Interstate 80",
      description: "Major freight corridor across northern PA",
      icon: Truck
    },
    {
      type: "I-81",
      name: "Interstate 81",
      description: "North-South through central Pennsylvania",
      icon: Truck
    }
  ];

  const railAndAirports = [
    {
      category: "Rail Networks",
      items: ["Norfolk Southern Railway", "CSX Transportation", "Amtrak passenger service", "SEPTA regional rail"]
    },
    {
      category: "Major Airports",
      items: ["Philadelphia International (PHL)", "Pittsburgh International (PIT)", "Lehigh Valley International (ABE)", "Harrisburg International (MDT)"]
    }
  ];

  const climateData = [
    { label: "Frost-free days", value: "160", icon: Calendar },
    { label: "Annual rainfall", value: "42\"", icon: Droplets },
    { label: "Summer average", value: "72°F", icon: TrendingUp },
    { label: "Winter average", value: "32°F", icon: TrendingUp }
  ];

  const topography = [
    { name: "Appalachian Mountains", description: "Mountainous terrain, recreational development opportunities" },
    { name: "Piedmont Region", description: "Rolling hills, excellent for residential development" },
    { name: "Atlantic Coastal Plain", description: "Flat terrain, ideal for large-scale development" },
    { name: "Great Lakes Plain", description: "Northwestern region, agricultural and industrial uses" }
  ];

  const financingOptions = [
    {
      category: "Traditional Financing",
      options: [
        { name: "Land Loans", description: "Specialized financing for vacant land purchases", rate: "5.5% - 8.5% APR" },
        { name: "Construction Loans", description: "Short-term financing for development projects", rate: "6.0% - 9.0% APR" },
        { name: "SBA 504 Loans", description: "Commercial development with favorable terms", rate: "4.5% - 6.5% APR" }
      ]
    },
    {
      category: "Alternative Financing",
      options: [
        { name: "Owner Financing", description: "Direct financing from property sellers", rate: "Flexible terms" },
        { name: "Hard Money Loans", description: "Fast approval for time-sensitive deals", rate: "8% - 15% APR" },
        { name: "Investment Partnerships", description: "Joint ventures with other investors", rate: "Shared equity" }
      ]
    }
  ];

  const holdingCosts = [
    { category: "Property Taxes", cost: "$850-$2,800/acre" },
    { category: "Insurance", cost: "$125-$350/acre" },
    { category: "Maintenance", cost: "$200-$500/acre" },
    { category: "Legal/Professional", cost: "$150-$400/acre" },
    { category: "Total Annual Cost", cost: "$1,325-$4,050/acre" }
  ];

  const incomeOpportunities = [
    { source: "Agricultural Lease", income: "$150-$400/acre" },
    { source: "Hunting Rights", income: "$8-$25/acre" },
    { source: "Timber Harvest", income: "$500-$2,000/acre" },
    { source: "Solar Lease", income: "$300-$800/acre" },
    { source: "Cell Tower Lease", income: "$1,200-$3,600/acre" }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in Pennsylvania?",
      answer: "Property tax rates in Pennsylvania vary by county and municipality, typically ranging from 1.2% to 2.8% of assessed value annually. Rural agricultural land often qualifies for preferential assessment programs that can significantly reduce tax burden. Contact your local tax assessor for specific rates in your area of interest."
    },
    {
      question: "How long does the development approval process take in Pennsylvania?",
      answer: "Development approval timelines in Pennsylvania typically range from 6-18 months depending on project complexity and local regulations. Simple residential subdivisions may take 6-9 months, while complex commercial or industrial projects can require 12-18 months. Working with experienced local consultants can help streamline the process."
    },
    {
      question: "What utilities are typically available for land development in Pennsylvania?",
      answer: "Most developed areas in Pennsylvania have access to electricity, water, and telecommunications infrastructure. Rural areas may require well and septic systems. Natural gas availability varies by location. Always verify utility availability and capacity before purchasing land for development."
    },
    {
      question: "Are there building restrictions I should know about in Pennsylvania?",
      answer: "Pennsylvania land development is subject to local zoning ordinances, state environmental regulations, and federal requirements. Common restrictions include setback requirements, height limitations, density controls, and environmental protections. Review all applicable regulations with local planning departments before purchasing."
    },
    {
      question: "What makes Pennsylvania land a good investment opportunity?",
      answer: "Pennsylvania offers strong fundamentals including population growth, economic diversification, strategic location in the Northeast corridor, and relatively affordable land prices compared to neighboring states. The state's business-friendly policies and infrastructure investments support long-term appreciation potential."
    },
    {
      question: "Can I generate income from my land while holding it in Pennsylvania?",
      answer: "Yes, Pennsylvania landowners can generate income through agricultural leases ($150-$400/acre annually), hunting rights ($8-$25/acre), timber harvesting, solar leases ($300-$800/acre), or cell tower leases ($1,200-$3,600/acre). Income potential varies by location, size, and land characteristics."
    },
    {
      question: "What environmental factors should I consider for Pennsylvania land?",
      answer: "Key environmental considerations in Pennsylvania include soil conditions, flood zones, wetlands, steep slopes, and potential contamination from historical industrial use. Environmental assessments are recommended for all commercial developments and many residential projects to identify potential issues early."
    },
    {
      question: "What financing options are available for Pennsylvania land purchases?",
      answer: "Pennsylvania land buyers can access traditional land loans (5.5%-8.5% APR), construction loans, SBA 504 programs, owner financing, hard money loans (8%-15% APR), and investment partnerships. Local and regional banks often offer the most competitive terms for Pennsylvania land purchases."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="land-for-sale-in-pennsylvania" />
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
            Land for Sale in <span className="text-[#329cf9]">Pennsylvania</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in the Keystone State. From residential development to commercial ventures, Pennsylvania offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=Pennsylvania">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse Pennsylvania Properties
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
                Why Pennsylvania is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed mb-12">
                <p>Population growth and diversified employment continue to drive demand for land across Pennsylvania.</p>
                <p>Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
                <p>Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                alt="Pennsylvania land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Pennsylvania</h3>
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
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Pennsylvania Land?
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
              Success Stories from <span className="text-[#329cf9]">Pennsylvania Investors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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

      {/* Complete Pennsylvania Land Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Pennsylvania Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Pennsylvania
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            {success ? (
              <Card className="text-center p-12 border-0 shadow-2xl">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-xl text-gray-600">
                    We've received your information and will contact you within 24 hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] text-white rounded-t-2xl">
                  <CardTitle className="text-center text-2xl font-bold">
                    Want to Buy Land in United States?
                  </CardTitle>
                  <p className="text-center text-white/90 mt-2">
                    Fill up the form to get a full list of Land for sale in the United States.
                  </p>
                  <div className="flex justify-center gap-8 mt-6">
                    <div className="text-center">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm font-medium">100% Guarantee</span>
                    </div>
                    <div className="text-center">
                      <Target className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm font-medium">Multiple Offers</span>
                    </div>
                    <div className="text-center">
                      <Globe className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm font-medium">Global Reach</span>
                    </div>
                  </div>
                </CardHeader>
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

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Preferred Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('location')}
                            placeholder="Pennsylvania Region"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.location && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.location.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Property Type
                        </label>
                        <select
                          {...form.register('propertyType')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="">Select Property Type</option>
                          <option value="residential">Residential Development</option>
                          <option value="commercial">Commercial Land</option>
                          <option value="industrial">Industrial Sites</option>
                          <option value="agricultural">Agricultural Land</option>
                          <option value="recreational">Recreational Property</option>
                        </select>
                        {form.formState.errors.propertyType && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.propertyType.message}
                          </p>
                        )}
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
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Get Pennsylvania Land List
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Pennsylvania Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#329cf9] text-white px-3 py-1 rounded-full text-sm font-bold">
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

          <div className="text-center">
            <Link to="/properties?search=Pennsylvania">
              <Button className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white px-8 py-4 text-lg font-bold rounded-xl">
                View All Pennsylvania Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Submarkets */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Regional Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse land investment opportunities across Pennsylvania's distinct regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regionalMarkets.map((market, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <market.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{market.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{market.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Price Range:</span>
                      <span className="font-bold text-[#329cf9]">{market.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Primary Uses:</span>
                      <span className="font-bold text-gray-900">{market.primaryUses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Growth Rate:</span>
                      <span className="font-bold text-green-600">{market.growthRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Land Guide Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Land for Sale in Pennsylvania</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Looking to buy land for sale in Pennsylvania? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in Pennsylvania</h3>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Ask other landowners about the area</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Look for signs of natural regeneration</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Summing up</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              When you're looking for land for sale in Pennsylvania, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in Pennsylvania, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">ABOUT ACREAGE SALE</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Pennsylvania to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry. Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips to Find Cheap Land for Sale in Pennsylvania</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 5 places where you can find cheap land for sale near me right now…
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">1) Check out foreclosure listings in your area</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Pennsylvania. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">2) Take advantage of the seller's desperation</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">3) Look for land development opportunities</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">4) Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">5) Take the time to find the right property for you</h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
            </p>
          </div>
        </div>
      </section>

      {/* Zoning and Development Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Zoning and Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Pennsylvania's land use regulations and development opportunities
            </p>
          </div>

          <div className="space-y-12">
            {zoningTypes.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] text-white">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <category.icon className="w-8 h-8" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="font-bold text-[#329cf9] text-lg mb-2">{type.code}</div>
                        <div className="font-bold text-gray-900 mb-3">{type.name}</div>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Development Process Timeline</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step guide to developing land in Pennsylvania
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentPhases.map((phase, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {phase.phase}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <div className="text-[#329cf9] font-bold mb-4">{phase.duration}</div>
                  <p className="text-gray-600 leading-relaxed mb-6">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Utilities and Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure considerations for land development in Pennsylvania
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {utilities.map((utility, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <utility.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{utility.type}</h3>
                  <div className="space-y-3">
                    {utility.providers.map((provider, providerIndex) => (
                      <div key={providerIndex} className="text-gray-600 text-sm">{provider}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation and Access */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Transportation and Access</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic transportation infrastructure supporting land development and investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {transportation.map((highway, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <highway.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{highway.type}</h3>
                  <h4 className="text-base font-semibold text-[#329cf9] mb-4">{highway.name}</h4>
                  <p className="text-gray-600 text-sm">{highway.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {railAndAirports.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center">
                      <Plane className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Climate and Environmental */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Environmental and Climate Considerations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Pennsylvania's diverse geography and climate for successful land development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Climate Data</h3>
              <div className="grid grid-cols-2 gap-6">
                {climateData.map((data, index) => (
                  <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="w-12 h-12 bg-[#329cf9]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <data.icon className="w-6 h-6 text-[#329cf9]" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{data.value}</div>
                    <div className="text-gray-600 font-medium text-sm">{data.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Topography and Geology</h3>
              <div className="space-y-4">
                {topography.map((region, index) => (
                  <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-2">{region.name}</h4>
                    <p className="text-gray-600">{region.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Land Financing Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financing strategies for Pennsylvania land investment
            </p>
          </div>

          <div className="space-y-12">
            {financingOptions.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] text-white">
                  <CardTitle className="text-2xl font-bold">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-gray-900 mb-3">{option.name}</h4>
                        <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                        <div className="text-[#329cf9] font-bold">{option.rate}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Holding Costs and Returns */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pennsylvania <span className="text-[#329cf9]">Holding Costs and Investment Returns</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the financial aspects of land ownership in Pennsylvania
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                <CardTitle className="text-2xl font-bold">Annual Holding Costs</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {holdingCosts.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{cost.category}</span>
                      <span className="font-bold text-red-600">{cost.cost}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="text-2xl font-bold">Income Potential</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {incomeOpportunities.map((income, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{income.source}</span>
                      <span className="font-bold text-green-600">{income.income}</span>
                    </div>
                  ))}
                </div>
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
              Frequently Asked <span className="text-[#329cf9]">Questions</span> About Pennsylvania Land
            </h2>
            <p className="text-xl text-gray-600">Expert answers to common questions about land investment in Pennsylvania</p>
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

      {/* Final CTA Section */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Invest in Pennsylvania Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Pennsylvania">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Pennsylvania Properties
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