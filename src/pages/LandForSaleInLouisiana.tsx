import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, User, MapPin, Send, Star, CircleCheck as CheckCircle, TrendingUp, Users, DollarSign, Award, Building, TreePine, Waves, Factory, Truck, Zap, Shield, Clock, Target, Eye, ChartBar as BarChart3, Globe, Calendar, FileText, Calculator, Handshake } from 'lucide-react';
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

export function LandForSaleInLouisiana() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Any Type',
    },
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
    { label: "Active Listings", value: "2,500+", color: "text-blue-600" },
    { label: "Avg. Price/Acre", value: "$8,000", color: "text-green-600" },
    { label: "Total Acres", value: "50,000+", color: "text-purple-600" },
    { label: "Price Growth", value: "+8%", color: "text-orange-600" }
  ];

  const marketStats = [
    { icon: Users, label: "State Population", value: "4.6M", color: "text-blue-600" },
    { icon: DollarSign, label: "Annual GDP", value: "$250B", color: "text-green-600" },
    { icon: TrendingUp, label: "Job Growth", value: "+2.1%", color: "text-purple-600" },
    { icon: Building, label: "Major Ports", value: "5", color: "text-orange-600" }
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
      content: "Found the perfect 10-acre plot in Louisiana through Acreage Sale. The process was seamless and saved me thousands in fees.",
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
      id: 1,
      title: "25-Acre Development Site",
      location: "North Louisiana",
      price: 625000,
      acres: 25.0,
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 2,
      title: "Commercial Corner Lot",
      location: "Baton Rouge",
      price: 450000,
      acres: 2.5,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 3,
      title: "Residential Development",
      location: "Louisiana Suburbs",
      price: 312000,
      acres: 5.2,
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const submarkets = [
    {
      title: "North Louisiana",
      features: ["Agricultural and timber land", "Rural residential development", "Recreational hunting properties"],
      priceRange: "$3,000-$8,000/acre",
      icon: TreePine,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "South Louisiana",
      features: ["Coastal and wetland properties", "Oil and gas lease potential", "Seafood industry development"],
      priceRange: "$5,000-$15,000/acre",
      icon: Waves,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "East Louisiana",
      features: ["Industrial and port-related land", "Chemical corridor development", "Transportation and logistics"],
      priceRange: "$8,000-$25,000/acre",
      icon: Factory,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "West Louisiana",
      features: ["Rice and sugarcane farmland", "Crawfish aquaculture", "Rural residential estates"],
      priceRange: "$4,000-$12,000/acre",
      icon: TreePine,
      color: "from-orange-500 to-amber-500"
    }
  ];

  const developmentPhases = [
    { phase: "Phase 1: Due Diligence", duration: "30-60 days", description: "Title research and survey, Environmental assessments, Zoning verification, Utility availability confirmation" },
    { phase: "Phase 2: Planning and Design", duration: "60-90 days", description: "Site planning and engineering, Architectural design, Permit applications, Community input sessions" },
    { phase: "Phase 3: Approvals", duration: "90-180 days", description: "Parish planning commission review, Public hearings, Environmental permits, Final approvals and bonds" },
    { phase: "Phase 4: Construction", duration: "6-18 months", description: "Site preparation, Infrastructure installation, Building construction, Final inspections and certificates" }
  ];

  const faqs = [
    {
      question: "What are property taxes like in Louisiana?",
      answer: "Property taxes in Louisiana vary by parish but are generally competitive. Agricultural land often qualifies for use-value assessment, significantly reducing tax burden. Homestead exemptions are available for residential properties."
    },
    {
      question: "How do I handle flood insurance requirements?",
      answer: "Much of Louisiana is in flood zones requiring flood insurance. Obtain elevation certificates, understand FEMA flood maps, and factor insurance costs into your investment analysis. Some areas may require elevated construction."
    },
    {
      question: "What utilities are available in rural Louisiana areas?",
      answer: "Rural areas may have limited utility access. Electric cooperatives serve many rural areas, while water and sewer often require wells and septic systems. Internet access is expanding but may be limited in remote areas."
    },
    {
      question: "Are there building restrictions in Louisiana?",
      answer: "Building restrictions vary by parish and zoning. Coastal areas have additional requirements for hurricane resistance. Wetland areas may have federal restrictions. Always verify zoning and building codes before purchasing."
    },
    {
      question: "What's the investment potential for Louisiana land?",
      answer: "Investment potential varies by location and use. Agricultural land provides steady income through leases. Coastal and near-urban properties have appreciation potential. Industrial land near ports and chemical corridors commands premium prices."
    },
    {
      question: "How do oil and gas rights work in Louisiana?",
      answer: "Many properties include mineral rights, but some may be severed. Oil and gas leasing can provide significant income through bonus payments and royalties. Consult with mineral rights attorneys before purchasing."
    },
    {
      question: "What about hurricane and flood risks?",
      answer: "Hurricane and flood risks are significant considerations in Louisiana. Review FEMA flood maps, understand evacuation routes, and factor insurance costs. Elevated construction and proper drainage are essential for development."
    },
    {
      question: "Can I generate income from Louisiana land while holding?",
      answer: "Yes, through agricultural leases, hunting leases, timber harvesting, and mineral rights leasing. Many landowners generate $100-$500 per acre annually through various income streams while holding for long-term appreciation."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-louisiana" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you a comprehensive list of Louisiana land opportunities within 24 hours.
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
            Land for Sale in <span className="text-[#329cf9]">Louisiana</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Louisiana offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=Louisiana">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse Louisiana Properties
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
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Louisiana Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Louisiana is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                <p>Population growth and diversified employment continue to drive demand for land across Louisiana.</p>
                <p>Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
                <p>Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {marketStats.map((stat, index) => (
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
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Louisiana vacant land development opportunities"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Louisiana</h3>
              <p className="text-xl text-white/90">Prime Growth Market</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Louisiana Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from <span className="text-[#329cf9]">Louisiana Investors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Complete Louisiana Land Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Louisiana Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about buying land in Louisiana
            </p>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-2xl mb-16">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to Buy Land in <span className="text-[#329cf9]">Louisiana?</span>
                </h3>
                <p className="text-gray-600">
                  Fill up the form to get a full list of Land for sale in Louisiana.
                </p>
                <div className="flex justify-center gap-8 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">100% Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Multiple Offers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">Global Reach</span>
                  </div>
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
                      Preferred Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...form.register('location')}
                        placeholder="City or Parish"
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
                      <option value="Any Type">Any Type</option>
                      <option value="Agricultural">Agricultural</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Recreational">Recreational</option>
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
                      Getting Louisiana Properties...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      Get Louisiana Land List
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Land for Sale in Louisiana Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Land for Sale in Louisiana</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Looking to buy land for sale in Louisiana? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in Louisiana</h3>
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
            <p className="text-gray-700 leading-relaxed mb-6">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Summing up</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              When you're looking for land for sale in Louisiana, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in Louisiana, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Louisiana Properties</span>
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#329cf9] text-white px-3 py-1 rounded-full font-bold">
                    {property.acres} acres
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#329cf9]">
                      ${property.price.toLocaleString()}
                    </span>
                    <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties?search=Louisiana">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All Louisiana Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Louisiana Regional Submarkets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Louisiana Regional <span className="text-[#329cf9]">Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse land opportunities across different regions of Louisiana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {submarkets.map((submarket, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${submarket.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <submarket.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{submarket.title}</h3>
                  <div className="space-y-3 mb-6">
                    {submarket.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Average Price Range</div>
                    <div className="text-xl font-bold text-[#329cf9]">{submarket.priceRange}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Development Process <span className="text-[#329cf9]">Timeline</span> in Louisiana
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step guide to developing land in Louisiana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentPhases.map((phase, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{phase.phase}</h3>
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <span className="text-[#329cf9] font-bold text-sm">{phase.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Acreage Sale */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ABOUT <span className="text-[#329cf9]">ACREAGE SALE</span>
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Louisiana to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry. Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
            </p>
            
            <div className="text-center bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fill up the form to get a full list of Land for sale in Louisiana.
              </h3>
              <p className="text-lg text-blue-700 font-semibold">
                The Best Real Estate Professionals you can count on 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips to Find Cheap Land */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tips to Find <span className="text-[#329cf9]">Cheap Land for Sale</span> in Louisiana
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 5 places where you can find cheap land for sale near me right now…
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1) Check out foreclosure listings in your area</h3>
                <p className="text-gray-700 leading-relaxed">
                  Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Louisiana. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2) Take advantage of the seller's desperation</h3>
                <p className="text-gray-700 leading-relaxed">
                  While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3) Look for land development opportunities</h3>
                <p className="text-gray-700 leading-relaxed">
                  The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">4) Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h3>
                <p className="text-gray-700 leading-relaxed">
                  You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">5) Take the time to find the right property for you</h3>
                <p className="text-gray-700 leading-relaxed">
                  Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Louisiana Land Investment Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Louisiana Land Investment <span className="text-[#329cf9]">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Louisiana land market and investment opportunities
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
                  Louisiana continues to attract new residents, driving demand for both residential and commercial land development opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Factory className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Strong economy across petrochemicals, agriculture, tourism, and energy sectors creates stable demand for various types of land development projects in Louisiana.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gulf Coast location with major ports and waterways makes Louisiana land attractive for logistics, distribution, and industrial developments.
                </p>
              </CardContent>
            </Card>
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
            <p className="text-xl text-gray-600">Expert answers to common questions about land investment in Louisiana</p>
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
            Ready to Invest in Louisiana Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Louisiana">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Louisiana Properties
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