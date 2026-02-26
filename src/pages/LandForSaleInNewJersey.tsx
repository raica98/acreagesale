import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, User, Star, Award, TrendingUp, Users, DollarSign, Building, TreePine, Zap, CircleCheck as CheckCircle, Send, Eye, Calendar, Calculator, ChartBar as BarChart3, Target, Shield, Globe, Clock, Ruler, Chrome as Home, Briefcase, GraduationCap, Heart, ShoppingBag, Utensils, Car, Plane } from 'lucide-react';
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

export function LandForSaleInNewJersey() {
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
    { icon: Ruler, label: "Total Acres", value: "50,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+12%", color: "text-orange-600" }
  ];

  const marketStats = [
    { label: "Metro Population", value: "9.3M", color: "text-blue-600" },
    { label: "Annual GDP", value: "$425B", color: "text-green-600" }
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
      content: "Found the perfect 10-acre plot in New Jersey through Acreage Sale. The process was seamless and saved me thousands in fees.",
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
      location: "North New Jersey",
      price: "$2,500,000",
      acres: "25.0",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot",
      location: "Downtown New Jersey",
      price: "$1,200,000",
      acres: "2.5",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "New Jersey Suburbs",
      price: "$850,000",
      acres: "5.2",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const regionalMarkets = [
    {
      title: "Northern New Jersey",
      priceRange: "$45,000 - $85,000",
      primaryUse: "Residential, Mixed-Use",
      description: "Close to NYC, premium pricing, high-density development potential. Strong demand from commuters and urban professionals."
    },
    {
      title: "Central New Jersey",
      priceRange: "$25,000 - $55,000",
      primaryUse: "Commercial, Industrial",
      description: "Balanced market with diverse opportunities. Strong transportation access and established infrastructure."
    },
    {
      title: "Southern New Jersey",
      priceRange: "$35,000 - $65,000",
      primaryUse: "Residential, Agricultural",
      description: "Philadelphia proximity, growing suburban markets, agricultural preservation areas with development rights."
    },
    {
      title: "Shore Region",
      priceRange: "$55,000 - $125,000",
      primaryUse: "Recreational, Tourism",
      description: "Coastal premium, seasonal demand, tourism and recreation development opportunities."
    }
  ];

  const zoningTypes = [
    {
      category: "Residential Zones",
      types: [
        { code: "R-1", description: "Single-family residential, large lots" },
        { code: "R-2", description: "Two-family residential, moderate density" },
        { code: "R-3", description: "Multi-family residential, higher density" },
        { code: "R-4", description: "High-density residential, apartments" }
      ]
    },
    {
      category: "Commercial Zones",
      types: [
        { code: "C-1", description: "Neighborhood commercial, local services" },
        { code: "C-2", description: "General commercial, retail and office" },
        { code: "C-3", description: "Highway commercial, auto-oriented" },
        { code: "C-4", description: "Regional commercial, large-scale retail" }
      ]
    }
  ];

  const developmentPhases = [
    {
      phase: "Phase 1: Pre-Application",
      duration: "30-60 days",
      tasks: [
        "Site analysis and feasibility study",
        "Environmental assessments",
        "Preliminary design development",
        "Municipal pre-application meetings"
      ]
    },
    {
      phase: "Phase 2: Application Review",
      duration: "60-120 days",
      tasks: [
        "Formal application submission",
        "Planning board review",
        "Public hearings and notifications",
        "Approval conditions and modifications"
      ]
    },
    {
      phase: "Phase 3: Construction",
      duration: "6-18 months",
      tasks: [
        "Building permit issuance",
        "Infrastructure installation",
        "Construction and inspections",
        "Certificate of occupancy"
      ]
    }
  ];

  const utilities = [
    {
      category: "Electric Utilities",
      providers: [
        { name: "PSE&G", coverage: "Northern/Central NJ" },
        { name: "JCP&L", coverage: "Central/Eastern NJ" },
        { name: "Atlantic City Electric", coverage: "Southern NJ" },
        { name: "Orange & Rockland", coverage: "Northwestern NJ" }
      ]
    },
    {
      category: "Water & Sewer",
      providers: [
        { name: "Municipal Systems", coverage: "Urban Areas" },
        { name: "Private Wells", coverage: "Rural Areas" },
        { name: "Septic Systems", coverage: "Suburban/Rural" },
        { name: "Regional Authorities", coverage: "Multi-Municipal" }
      ]
    },
    {
      category: "Telecommunications",
      providers: [
        { name: "Verizon FiOS", coverage: "Fiber Coverage" },
        { name: "Optimum", coverage: "Cable/Internet" },
        { name: "Comcast Xfinity", coverage: "Regional Coverage" },
        { name: "5G Networks", coverage: "Expanding" }
      ]
    }
  ];

  const transportation = [
    {
      category: "Interstate System",
      routes: [
        { route: "I-95", description: "Primary north-south corridor to NYC and Philadelphia" },
        { route: "I-80", description: "Major east-west route across northern New Jersey" },
        { route: "I-78", description: "Connects to NYC and western markets" },
        { route: "I-287", description: "Circumferential route around NYC metro" },
        { route: "I-195", description: "Shore access and central connection" }
      ]
    },
    {
      category: "State Routes",
      routes: [
        { route: "Garden State Parkway", description: "North-south shore access" },
        { route: "NJ Turnpike", description: "Major commercial corridor" },
        { route: "Route 1", description: "Central business corridor" },
        { route: "Route 9", description: "Shore parallel route" }
      ]
    }
  ];

  const railAndAir = [
    {
      category: "Rail Networks",
      services: [
        { name: "NJ Transit", description: "Extensive passenger rail system" },
        { name: "Amtrak", description: "Northeast Corridor service" },
        { name: "PATH", description: "NYC subway connection" },
        { name: "Freight Rail", description: "CSX, Norfolk Southern networks" }
      ]
    },
    {
      category: "Airport Access",
      services: [
        { name: "Newark Liberty", description: "Major international hub" },
        { name: "Teterboro", description: "Corporate and private aviation" },
        { name: "Atlantic City", description: "Regional commercial service" },
        { name: "Trenton-Mercer", description: "Regional airport" }
      ]
    }
  ];

  const financingOptions = [
    {
      type: "Land Loans",
      downPayment: "20-50%",
      interestRates: "6-12%",
      terms: "5-20 years"
    },
    {
      type: "Construction Loans",
      downPayment: "20-30%",
      interestRates: "7-10%",
      terms: "12-24 months"
    }
  ];

  const alternativeFinancing = [
    {
      title: "Owner Financing",
      features: [
        "Flexible down payment terms",
        "Negotiable interest rates",
        "Faster closing process",
        "Reduced qualification requirements"
      ]
    },
    {
      title: "Hard Money Loans",
      features: [
        "Asset-based lending",
        "Quick approval and funding",
        "Short-term bridge financing",
        "Higher interest rates (10-15%)"
      ]
    },
    {
      title: "Investment Partnerships",
      features: [
        "Joint venture structures",
        "Shared equity arrangements",
        "Real estate investment trusts",
        "Crowdfunding platforms"
      ]
    }
  ];

  const holdingCosts = [
    { category: "Property Taxes", cost: "$800-2,500/acre" },
    { category: "Insurance", cost: "$200-500/acre" },
    { category: "Maintenance", cost: "$100-300/acre" },
    { category: "Legal/Admin", cost: "$50-150/acre" },
    { category: "Total Annual", cost: "$1,150-3,450/acre" }
  ];

  const incomeOpportunities = [
    { category: "Agricultural Lease", income: "$150-400/acre" },
    { category: "Solar Lease", income: "$500-1,200/acre" },
    { category: "Cell Tower Lease", income: "$1,000-3,000/site" },
    { category: "Hunting Rights", income: "$5-25/acre" },
    { category: "Potential Annual", income: "$655-4,625/acre" }
  ];

  const faqs = [
    {
      question: "What are property tax rates like in New Jersey?",
      answer: "New Jersey has some of the highest property tax rates in the nation, typically ranging from 1.5% to 3.5% of assessed value annually. However, vacant land is often assessed at lower values than developed properties. Many municipalities offer tax incentives for agricultural use, historic preservation, or affordable housing development. It's important to research specific municipal rates and available exemptions before purchasing."
    },
    {
      question: "How long does the development approval process take in New Jersey?",
      answer: "Development approval timelines in New Jersey vary significantly by municipality and project complexity. Simple residential subdivisions may take 6-12 months, while complex commercial or mixed-use projects can require 18-36 months. The process includes site plan review, environmental assessments, public hearings, and various agency approvals. Working with experienced local professionals can help streamline the process and avoid common delays."
    },
    {
      question: "What utilities are typically available for land development in New Jersey?",
      answer: "Most developed areas of New Jersey have access to municipal water, sewer, electric, and natural gas services. Rural areas may require private wells, septic systems, and propane. Electric service is provided by PSE&G, JCP&L, or Atlantic City Electric depending on location. High-speed internet is widely available through Verizon FiOS, Optimum, and Comcast. Always verify utility availability and capacity before purchasing land for development."
    },
    {
      question: "Are there building restrictions I should know about in New Jersey?",
      answer: "New Jersey has comprehensive building codes and zoning regulations that vary by municipality. Common restrictions include setback requirements, height limitations, density controls, and architectural standards. Coastal areas have additional flood zone requirements and CAFRA regulations. Historic districts may have design review requirements. Environmental constraints like wetlands, steep slopes, or contaminated soil can also limit development options."
    },
    {
      question: "What makes New Jersey a good area for land investment?",
      answer: "New Jersey offers several advantages for land investors: proximity to major metropolitan markets (NYC and Philadelphia), strong transportation infrastructure, diverse economy, and limited developable land supply. The state's high population density creates ongoing demand for housing and commercial space. Additionally, New Jersey's location makes it attractive for logistics and distribution facilities serving the Northeast corridor."
    },
    {
      question: "Can I generate income from vacant land in New Jersey?",
      answer: "Yes, there are several ways to generate income from vacant land in New Jersey. Agricultural leasing can provide $150-400 per acre annually for farmland. Solar energy leases offer $500-1,200 per acre for suitable sites. Cell tower leases can generate $1,000-3,000 per month per site. Some landowners also lease land for parking, storage, or recreational activities. The income potential depends on location, zoning, and market demand."
    },
    {
      question: "What environmental factors should I consider when buying land in New Jersey?",
      answer: "Key environmental considerations in New Jersey include flood zones (especially near the coast and rivers), wetlands protection requirements, soil conditions and contamination history, and endangered species habitats. The state has strict environmental regulations, particularly in the Pinelands and coastal areas. Environmental site assessments are recommended for any development project. Climate change considerations include sea level rise for coastal properties and increased storm intensity."
    },
    {
      question: "How do I finance a land purchase in New Jersey?",
      answer: "Land financing options in New Jersey include traditional bank loans (requiring 20-50% down), owner financing (often with more flexible terms), hard money loans for quick purchases, and investment partnerships. Local and regional banks often have better rates and terms than national lenders. SBA loans may be available for commercial land purchases. Cash purchases are common and often receive better pricing from motivated sellers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="land-for-sale-in-new-jersey" />
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
            Land for Sale in <span className="text-[#329cf9]">New Jersey</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, New Jersey offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=New Jersey">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse New Jersey Properties
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

      {/* Why New Jersey Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why New Jersey is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                <p>Population growth and diversified employment continue to drive demand for land across New Jersey.</p>
                <p>Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
                <p>Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
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
                alt="New Jersey vacant land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">New Jersey</h3>
                <p className="text-white/90">Prime Growth Market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for New Jersey Land?
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
              Success Stories from <span className="text-[#329cf9]">New Jersey Investors</span>
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

      {/* Complete Guide Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">New Jersey Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in New Jersey
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
                <CardHeader className="bg-gradient-to-r from-[#329cf9] to-blue-600 text-white rounded-t-2xl">
                  <CardTitle className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Want to Buy Land in United States?</h3>
                    <p className="text-white/90">Fill up the form to get a full list of Land for sale in the United States.</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <div className="font-bold text-gray-900">100% Guarantee</div>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <div className="font-bold text-gray-900">Multiple Offers</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                      <Globe className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="font-bold text-gray-900">Global Reach</div>
                    </div>
                  </div>

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

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
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
              Featured <span className="text-[#329cf9]">New Jersey Properties</span>
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
                    {property.acres} acres
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#329cf9] mb-4">{property.price}</div>
                  <Button className="w-full bg-[#329cf9] hover:bg-[#2563eb] text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=New Jersey">
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-8 py-4 text-lg font-bold rounded-xl">
                View All New Jersey Properties
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
              New Jersey <span className="text-[#329cf9]">Regional Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse land markets across New Jersey's regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regionalMarkets.map((market, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{market.title}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-600">Avg. Price/Acre:</span>
                      <p className="font-bold text-[#329cf9]">{market.priceRange}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Primary Use:</span>
                      <p className="font-bold text-gray-900">{market.primaryUse}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{market.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Content Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Land for Sale in New Jersey</h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Looking to buy land for sale in New Jersey? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <div className="bg-[#329cf9] text-white p-8 rounded-2xl mb-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Contact us</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">949-767-8885</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">info@acreagesales.com</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in New Jersey</h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Narrow down your search by location</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Check the property's zoning regulations</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ask other landowners about the area</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Look for signs of natural regeneration</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Summing up</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              When you're looking for land for sale in New Jersey, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in the New Jersey, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>

            <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ABOUT ACREAGE SALE</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in New Jersey to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
              </p>
            </div>

            <div className="text-center bg-[#329cf9] text-white p-8 rounded-2xl mb-12">
              <h3 className="text-2xl font-bold mb-4">Fill up the form to get a full list of Land for sale in New Jersey.</h3>
              <p className="text-xl font-semibold">The Best Real Estate Professionals you can count on 24/7</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tips to Find Cheap Land for Sale in New Jersey</h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 3 places where you can find cheap land for sale near me right now…
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">1) Check out foreclosure listings in your area</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Buying a foreclosed property can be a great way to get a cheap piece of land for sale in New Jersey. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">2) Take advantage of the seller's desperation</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">3) Look for land development opportunities</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">4) Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">5) Take the time to find the right property for you</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-12">
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
              New Jersey <span className="text-[#329cf9]">Zoning and Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding zoning classifications and development processes in New Jersey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {zoningTypes.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-[#329cf9] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{type.code}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{type.code}</h4>
                          <p className="text-gray-600 text-sm">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Development Process Timeline */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Process Timeline</h3>
            <div className="space-y-8">
              {developmentPhases.map((phase, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-900">{phase.phase}</h4>
                          <Badge className="bg-blue-100 text-blue-800">{phase.duration}</Badge>
                        </div>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-gray-700">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
              New Jersey <span className="text-[#329cf9]">Utilities and Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure information for land development in New Jersey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {utilities.map((utility, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{utility.category}</h3>
                  <div className="space-y-4">
                    {utility.providers.map((provider, providerIndex) => (
                      <div key={providerIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{provider.name}:</span>
                        <span className="text-[#329cf9] font-semibold">{provider.coverage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation Corridors */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Jersey <span className="text-[#329cf9]">Transportation Corridors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic transportation access enhancing land values and development potential
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {transportation.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.routes.map((route, routeIndex) => (
                      <div key={routeIndex} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#329cf9] rounded-lg flex items-center justify-center">
                            <Car className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900">{route.route}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{route.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {railAndAir.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#329cf9] rounded-lg flex items-center justify-center">
                            {index === 0 ? <Car className="w-4 h-4 text-white" /> : <Plane className="w-4 h-4 text-white" />}
                          </div>
                          <h4 className="font-bold text-gray-900">{service.name}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Factors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Jersey <span className="text-[#329cf9]">Environmental Factors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Climate, topography, and environmental considerations for land development
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Climate and Geography</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">4 Seasons</div>
                    <div className="text-sm text-blue-700">Humid Subtropical</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">45"</div>
                    <div className="text-sm text-green-700">Annual Rainfall</div>
                  </div>
                </div>
                <div className="space-y-3 text-gray-600">
                  <p>Summer: Warm and humid (70-85°F)</p>
                  <p>Winter: Cool with occasional snow (30-50°F)</p>
                  <p>Growing Season: 180-200 days annually</p>
                  <p>Topography: Coastal plain to Appalachian foothills</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Regulatory Environment</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">State Regulations</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Coastal Area Facility Review Act (CAFRA)</li>
                      <li>• Pinelands Protection Act</li>
                      <li>• Wetlands protection requirements</li>
                      <li>• Stormwater management regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Local Considerations</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Municipal land use ordinances</li>
                      <li>• Historic preservation districts</li>
                      <li>• Affordable housing obligations</li>
                      <li>• Impact fee requirements</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Jersey <span className="text-[#329cf9]">Investment Strategies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financing options and investment approaches for New Jersey land purchases
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional Financing</h3>
                <div className="space-y-6">
                  {financingOptions.map((option, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{option.type}</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Down Payment:</span>
                          <p className="font-bold text-[#329cf9]">{option.downPayment}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Interest Rates:</span>
                          <p className="font-bold text-[#329cf9]">{option.interestRates}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Terms:</span>
                          <p className="font-bold text-[#329cf9]">{option.terms}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Alternative Financing</h3>
                <div className="space-y-6">
                  {alternativeFinancing.map((option, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{option.title}</h4>
                      <ul className="space-y-2">
                        {option.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Holding Costs and Returns */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Jersey <span className="text-[#329cf9]">Holding Costs and Returns</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the financial aspects of land ownership in New Jersey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Annual Holding Costs</h3>
                <div className="space-y-4">
                  {holdingCosts.map((cost, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-900">{cost.category}:</span>
                      <span className="font-bold text-[#329cf9]">{cost.cost}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Income Potential</h3>
                <div className="space-y-4">
                  {incomeOpportunities.map((income, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                      <span className="font-medium text-gray-900">{income.category}:</span>
                      <span className="font-bold text-green-600">{income.income}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Insights */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Jersey Land <span className="text-[#329cf9]">Investment Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the New Jersey land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Population Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  New Jersey continues to attract new residents, driving demand for both residential and commercial land development opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Strong economy across pharmaceuticals, finance, technology, and logistics creates stable demand for various types of land development projects.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Prime location between New York City and Philadelphia with excellent transportation infrastructure makes New Jersey land attractive for logistics and distribution.
                </p>
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
              New Jersey Land <span className="text-[#329cf9]">Investment FAQ</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive answers to common questions about land investment in New Jersey
            </p>
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
            Ready to Invest in New Jersey Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=New Jersey">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse New Jersey Properties
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
                <div className="font-bold text-white text-xl">Call Now</div>
                <div className="text-white text-lg font-semibold">949-767-8885</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl">Email Us</div>
                <div className="text-white text-lg font-semibold">info@acreagesales.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl">Nationwide</div>
                <div className="text-white text-lg font-semibold">All 50 States</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
}