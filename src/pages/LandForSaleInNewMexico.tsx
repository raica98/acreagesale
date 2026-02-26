import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, User, Star, Award, TrendingUp, Users, DollarSign, Send, CircleCheck as CheckCircle, Building, Globe, Clock, Shield, Zap, Eye, FileText, TreePine, Sun, Mountain, Droplets, Fuel, Chrome as Home, Factory, Briefcase, Calculator, ChartBar as BarChart3, Target, Handshake } from 'lucide-react';
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
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInNewMexico() {
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
    { icon: DollarSign, label: "Avg. Price/Acre", value: "$8,500", color: "text-green-600" },
    { icon: MapPin, label: "Total Acres", value: "75,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+8%", color: "text-orange-600" }
  ];

  const marketStats = [
    { label: "State Population", value: "2.1M", color: "text-blue-600" },
    { label: "Annual GDP", value: "$95B", color: "text-green-600" }
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
      content: "Found the perfect 10-acre plot in New Mexico through Acreage Sale. The process was seamless and saved me thousands in fees.",
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
      location: "North New Mexico",
      size: "25.0 acres",
      price: "$2,100,000",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot",
      location: "Downtown New Mexico",
      size: "2.5 acres",
      price: "$950,000",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "New Mexico Suburbs",
      size: "5.2 acres",
      price: "$650,000",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const regionalMarkets = [
    {
      icon: Mountain,
      title: "Northern New Mexico",
      priceRange: "$12,000 - $18,000",
      primaryUse: "Recreational, Residential",
      description: "Mountain and forest areas with recreational opportunities, cooler climate, and scenic beauty. Popular for vacation homes and outdoor recreation."
    },
    {
      icon: Building,
      title: "Central New Mexico",
      priceRange: "$8,000 - $15,000",
      primaryUse: "Mixed Development",
      description: "Includes Albuquerque metro area with diverse opportunities for residential, commercial, and industrial development. Strong infrastructure and services."
    },
    {
      icon: Sun,
      title: "Southern New Mexico",
      priceRange: "$6,000 - $12,000",
      primaryUse: "Agricultural, Solar",
      description: "Desert and agricultural areas with excellent solar potential, lower costs, and proximity to Mexico border for trade opportunities."
    },
    {
      icon: Fuel,
      title: "Eastern New Mexico",
      priceRange: "$5,000 - $10,000",
      primaryUse: "Energy, Agricultural",
      description: "Oil and gas region with energy infrastructure, agricultural operations, and lower land costs. Strong potential for energy-related development."
    }
  ];

  const developmentPhases = [
    {
      phase: "1",
      title: "Pre-Development Phase",
      duration: "30-60 days",
      description: "Site analysis, feasibility studies, and preliminary design work.",
      details: [
        "Environmental assessment: $5,000-$15,000",
        "Geotechnical analysis: $3,000-$8,000",
        "Traffic impact study: $8,000-$20,000",
        "Utility capacity analysis: $2,000-$5,000"
      ]
    },
    {
      phase: "2",
      title: "Permitting and Approvals",
      duration: "60-120 days",
      description: "Navigate county and state approval processes for development permits.",
      details: [
        "Initial review: 30-45 days",
        "Public hearings: 30-60 days",
        "Final approval: 15-30 days",
        "Permit issuance: 7-14 days"
      ]
    },
    {
      phase: "3",
      title: "Construction Phase",
      duration: "6-18 months",
      description: "Infrastructure development and building construction timeline.",
      details: [
        "Site preparation: 2-4 weeks",
        "Utility installation: 4-8 weeks",
        "Road construction: 6-12 weeks",
        "Building construction: 8-24 weeks"
      ]
    }
  ];

  const utilities = [
    {
      icon: Zap,
      title: "Electricity",
      provider: "PNM (Public Service Company of New Mexico)",
      coverage: "Statewide service",
      connection: "$2,000-$8,000",
      timeline: "30-60 days"
    },
    {
      icon: Droplets,
      title: "Water & Sewer",
      provider: "County/Municipal systems",
      coverage: "Wells common in rural areas",
      connection: "$3,000-$12,000",
      timeline: "45-90 days"
    },
    {
      icon: Globe,
      title: "Internet & Cable",
      provider: "Xfinity, CenturyLink",
      coverage: "Fiber limited availability",
      connection: "$500-$2,000",
      timeline: "14-30 days"
    },
    {
      icon: Fuel,
      title: "Natural Gas",
      provider: "New Mexico Gas Company",
      coverage: "Urban and suburban areas",
      connection: "$1,500-$5,000",
      timeline: "30-45 days"
    }
  ];

  const financingOptions = [
    {
      title: "Land Loans",
      downPayment: "20-50%",
      interestRate: "6-10%",
      term: "5-20 years",
      bestFor: "Raw land purchases with development plans"
    },
    {
      title: "Construction Loans",
      downPayment: "20-30%",
      interestRate: "7-12%",
      term: "12-24 months",
      bestFor: "Land purchase with immediate construction"
    },
    {
      title: "Owner Financing",
      downPayment: "10-25%",
      interestRate: "6-12%",
      term: "5-15 years",
      bestFor: "Flexible terms, faster closing"
    }
  ];

  const faqs = [
    {
      question: "What are property taxes like for land in New Mexico?",
      answer: "Property taxes in New Mexico are generally lower than many other states, with agricultural land receiving favorable assessment rates. Vacant land is typically assessed at market value, with annual taxes ranging from $200-$800 per acre depending on location and classification."
    },
    {
      question: "How long does development approval take in New Mexico?",
      answer: "Development timelines vary by county and project scope. Simple residential projects may take 60-120 days for approval, while complex commercial developments can take 6-18 months. Counties like Bernalillo and Santa Fe have more streamlined processes."
    },
    {
      question: "What utilities are available for land development in New Mexico?",
      answer: "Urban areas have full utility access including electricity (PNM), natural gas, water, and sewer. Rural areas may require wells and septic systems. Internet access varies, with fiber available in major cities but satellite required in remote areas."
    },
    {
      question: "Are there building restrictions for land in New Mexico?",
      answer: "Building restrictions depend on zoning and location. Rural areas have fewer restrictions, while urban areas have specific setback, height, and density requirements. Some areas have architectural guidelines, especially near historic districts or scenic areas."
    },
    {
      question: "Is New Mexico land a good investment opportunity?",
      answer: "New Mexico offers excellent land investment potential due to population growth, economic diversification, and relatively affordable prices. The state's business-friendly environment and natural beauty attract both residents and businesses, supporting long-term appreciation."
    },
    {
      question: "Can I generate income from vacant land in New Mexico?",
      answer: "Yes, several income opportunities exist including agricultural leases ($25-$150/acre/year), solar leases ($300-$800/acre/year), hunting leases ($5-$200/acre/year), and oil/gas leases where applicable. Solar potential is particularly strong due to abundant sunshine."
    },
    {
      question: "What environmental factors should I consider for New Mexico land?",
      answer: "Consider elevation (affects climate and building costs), soil conditions (caliche and expansive clays common), water availability (wells may be required), and fire risk in forested areas. The arid climate offers excellent solar potential but requires drought-resistant landscaping."
    },
    {
      question: "What financing options work best for New Mexico land purchases?",
      answer: "Land loans from local banks familiar with the market often provide the best terms. Owner financing is common and can offer flexibility. For larger projects, SBA loans may be available. Cash purchases are preferred by sellers and can provide negotiating advantages."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="land-for-sale-in-new-mexico" />
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
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#329cf9] text-white px-8 py-3 text-lg font-bold mb-8 shadow-xl">
            🏆 Premium Market
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Land for Sale in <span className="text-[#329cf9]">New Mexico</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in the Land of Enchantment. From residential development to commercial ventures, New Mexico offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=New Mexico">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse New Mexico Properties
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

      {/* Why New Mexico Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why New Mexico is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                <p>Population growth and diversified employment continue to drive demand for land across New Mexico.</p>
                <p>Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
                <p>Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
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
                alt="New Mexico land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">New Mexico</h3>
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
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for New Mexico Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
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
              Success Stories from <span className="text-[#329cf9]">New Mexico Investors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
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

      {/* Complete New Mexico Land Guide */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">New Mexico Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in New Mexico
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
                  <CardTitle className="text-center text-2xl font-bold">
                    Want to Buy Land in United States?
                  </CardTitle>
                  <p className="text-center text-white/90 mt-2">
                    Fill up the form to get a full list of Land for sale in the United States.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">100% Guarantee</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900">Multiple Offers</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
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
                          City
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('city')}
                            placeholder="City"
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
                          State
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('state')}
                            placeholder="State"
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
                          Get Land List
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
              Featured <span className="text-[#329cf9]">New Mexico Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
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
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#329cf9]">{property.price}</span>
                  </div>
                  <Button className="w-full bg-[#329cf9] hover:bg-[#2563eb] text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties?search=New Mexico">
              <Button className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                View All New Mexico Properties
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
              New Mexico <span className="text-[#329cf9]">Regional Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse land investment opportunities across different regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regionalMarkets.map((market, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center">
                      <market.icon className="w-8 h-8 text-[#329cf9]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{market.title}</h3>
                      <p className="text-[#329cf9] font-semibold">{market.priceRange}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Primary Use: </span>
                    <span className="text-gray-900 font-semibold">{market.primaryUse}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{market.description}</p>
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
              New Mexico <span className="text-[#329cf9]">Development Process Timeline</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step guide to developing land in New Mexico
            </p>
          </div>

          <div className="space-y-8">
            {developmentPhases.map((phase, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {phase.phase}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{phase.title}</h3>
                        <Badge className="bg-blue-100 text-blue-800">{phase.duration}</Badge>
                      </div>
                      <p className="text-gray-600 text-lg mb-6">{phase.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700">{detail}</span>
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

      {/* Utilities and Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Mexico <span className="text-[#329cf9]">Utilities and Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure information for land development planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {utilities.map((utility, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center">
                      <utility.icon className="w-8 h-8 text-[#329cf9]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{utility.title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-700">Provider: </span>
                      <span className="text-gray-900">{utility.provider}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Coverage: </span>
                      <span className="text-gray-900">{utility.coverage}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Connection Cost: </span>
                      <span className="text-gray-900">{utility.connection}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Timeline: </span>
                      <span className="text-gray-900">{utility.timeline}</span>
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
              New Mexico Land <span className="text-[#329cf9]">Financing Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financing strategies for land acquisition and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financingOptions.map((option, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{option.title}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-bold text-gray-900">{option.downPayment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-bold text-gray-900">{option.interestRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Term:</span>
                      <span className="font-bold text-gray-900">{option.term}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Best For: </span>
                      <span className="text-sm font-medium text-gray-900">{option.bestFor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form Content */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Land for Sale in New Mexico</h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Looking to buy land for sale in New Mexico? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in New Mexico</h3>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Ask other landowners about the area</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Look for signs of natural regeneration</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Summing up</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              When you're looking for land for sale in New Mexico, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in the New Mexico, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">ABOUT ACREAGE SALE</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in New Mexico to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry. Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
            </p>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">Tips to Find Cheap Land for Sale in New Mexico</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 3 places where you can find cheap land for sale near me right now…
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">1) Check out foreclosure listings in your area</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Buying a foreclosed property can be a great way to get a cheap piece of land for sale in New Mexico. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">2) Take advantage of the seller's desperation</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">3) Look for land development opportunities</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">4) Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">5) Take the time to find the right property for you</h4>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
            </p>
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
            <p className="text-xl text-gray-600">Expert answers to common questions about New Mexico land investment</p>
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

      {/* Investment Insights */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              New Mexico Land <span className="text-[#329cf9]">Investment Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the New Mexico land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Population Growth</h3>
                <p className="text-gray-600 leading-relaxed">New Mexico continues to attract new residents, driving demand for both residential and commercial land development opportunities.</p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">Strong economy across technology, aerospace, energy, and tourism sectors creates stable demand for various types of land development projects.</p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">Central location in the Southwest with excellent transportation infrastructure makes New Mexico land attractive for logistics, distribution, and manufacturing developments.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Invest in New Mexico Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=New Mexico">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse New Mexico Properties
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