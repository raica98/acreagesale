import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, User, Star, Award, TrendingUp, Users, DollarSign, Building, TreePine, Mountain, Factory, Chrome as Home, Zap, CircleCheck as CheckCircle, Send, Globe, ChartBar as BarChart3, Shield, Clock, Target, Eye, Ruler, Calendar, FileText, Truck, Plane, Brain as Train } from 'lucide-react';
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
  propertyType: z.string().min(1, 'Property type is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInKnoxville() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Residential Development',
      budget: '$100,000 - $500,000',
      timeline: '3-6 months',
    },
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submissionData = {
        ...data,
        location: 'Knoxville',
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('knoxville_land_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('knoxville_land_inquiries', JSON.stringify(existingSubmissions));

      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError('Failed to submit your information. Please try again.');
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
    { icon: Users, label: "Metro Population", value: "7.8M", color: "text-blue-600" },
    { icon: DollarSign, label: "Annual GDP", value: "$85B", color: "text-green-600" }
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
      content: "Found the perfect 10-acre plot in Knoxville through Acreage Sale. The process was seamless and saved me thousands in fees.",
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
      location: "North Knoxville",
      size: "25.0 acres",
      price: "$2,500,000",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot", 
      location: "Downtown Knoxville",
      size: "2.5 acres",
      price: "$1,200,000",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Knoxville Suburbs", 
      size: "5.2 acres",
      price: "$850,000",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const submarkets = [
    {
      title: "West Knoxville",
      description: "The western corridor offers excellent access to major highways and is experiencing significant residential and commercial growth. This area is particularly attractive for mixed-use developments and master-planned communities.",
      features: ["Highway I-40 and I-75 access", "Growing retail and commercial centers", "University of Tennessee proximity"]
    },
    {
      title: "East Knoxville", 
      description: "Eastern areas provide a blend of suburban development and rural character, with excellent schools and family-friendly communities. This region is ideal for residential subdivisions and recreational properties.",
      features: ["Top-rated school districts", "Smoky Mountains proximity", "Established neighborhoods"]
    },
    {
      title: "North Knoxville",
      description: "Northern areas feature rolling hills and scenic views, making them perfect for luxury residential developments and recreational properties. The terrain offers unique development opportunities with natural beauty.",
      features: ["Scenic mountain views", "Rolling topography", "Luxury home market"]
    },
    {
      title: "South Knoxville",
      description: "Southern corridors offer industrial and commercial development opportunities with excellent transportation access. This area is experiencing significant growth in logistics and manufacturing sectors.",
      features: ["Industrial development zones", "Rail and highway access", "Manufacturing growth"]
    }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in Knoxville?",
      answer: "Property tax rates in Knoxville vary by location and property type. Knox County has a combined rate of approximately 2.47%, while city properties may have additional municipal taxes. Agricultural and forestry land may qualify for reduced assessment programs, significantly lowering annual tax obligations."
    },
    {
      question: "How do I determine if utilities are available to my Knoxville property?",
      answer: "Contact Knoxville Utilities Board (KUB) for city properties or Knox County for rural areas. Most developed areas have water, sewer, and electric service available. Rural properties may require well and septic systems. Always verify utility availability and capacity before purchasing."
    },
    {
      question: "What building restrictions apply to land in Knoxville?",
      answer: "Building restrictions depend on zoning classification, subdivision covenants, and environmental factors. Common restrictions include setback requirements, height limits, architectural standards, and environmental protections. Always review zoning ordinances and deed restrictions before development."
    },
    {
      question: "Is Knoxville land a good investment for out-of-state buyers?",
      answer: "Knoxville attracts many out-of-state investors due to its affordable land prices, strong economic growth, and business-friendly environment. Tennessee has no state income tax, making it attractive for retirees and businesses. The region's growth trajectory supports long-term appreciation potential."
    },
    {
      question: "What are the best areas for commercial development in Knoxville?",
      answer: "Prime commercial areas include West Town Mall corridor, Turkey Creek, and downtown Knoxville. Highway frontage along I-40, I-75, and major arterials commands premium prices. Consider traffic counts, visibility, and access when evaluating commercial land opportunities."
    },
    {
      question: "How long does the development approval process take in Knoxville?",
      answer: "Development approval timelines vary by project complexity and jurisdiction. Simple residential subdivisions may take 3-6 months, while complex commercial or industrial projects can require 12-18 months. Early consultation with planning staff helps establish realistic timelines."
    },
    {
      question: "Are there any environmental concerns with Knoxville land development?",
      answer: "Common environmental considerations include wetlands protection, stream buffers, steep slope restrictions, and potential archaeological sites. The Tennessee Department of Environment and Conservation regulates environmental compliance. Professional environmental assessments are recommended for larger developments."
    },
    {
      question: "What financing options work best for Knoxville land purchases?",
      answer: "Local and regional banks familiar with Knoxville market conditions often provide the most competitive terms. Owner financing is common for rural properties. Construction-to-permanent loans work well for build-to-suit projects. Consider working with lenders experienced in Tennessee real estate markets."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-knoxville" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Knoxville land inquiry and will contact you within 24 hours with available properties and market analysis.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Knoxville experts review your requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We prepare a customized property list and market report</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You receive exclusive access to Knoxville land opportunities</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse All Properties
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
              Land for Sale in <span className="text-[#329cf9]">Knoxville</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Knoxville offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Knoxville">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Knoxville Properties
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Market Analysis
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Why Knoxville Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Knoxville is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Population growth and diversified employment continue to drive demand for land across Knoxville.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Corporate expansion and infrastructure investment support long-term appreciation and development viability.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {marketStats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Knoxville vacant land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Knoxville</h3>
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
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Knoxville Land?
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
              Success Stories from <span className="text-[#329cf9]">Knoxville Investors</span>
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

      {/* Complete Knoxville Land Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Knoxville Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Knoxville
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Land for Sale in Knoxville</h3>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Looking to buy land for sale in Knoxville? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
                </p>
                <p>
                  The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
                </p>
              </div>
              
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Want to Buy Land in <span className="text-[#329cf9]">United States?</span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Fill up the form to get a full list of Land for sale in the United States.
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-green-800">100% Guarantee</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-blue-800">Multiple Offers</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-purple-800">Global Reach</div>
                  </div>
                </div>
              </div>

              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...form.register('firstName')}
                        placeholder="Your first name"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9]"
                      />
                    </div>
                    {form.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...form.register('lastName')}
                        placeholder="Your last name"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9]"
                      />
                    </div>
                    {form.formState.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...form.register('email')}
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9]"
                      />
                    </div>
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...form.register('phone')}
                        placeholder="(555) 123-4567"
                        className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9]"
                      />
                    </div>
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Property Type</label>
                    <select
                      {...form.register('propertyType')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] px-4 text-gray-700"
                    >
                      <option value="Residential Development">Residential Development</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Industrial Property">Industrial Property</option>
                      <option value="Recreational Land">Recreational Land</option>
                      <option value="Mixed-Use Development">Mixed-Use Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">Budget Range</label>
                    <select
                      {...form.register('budget')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] px-4 text-gray-700"
                    >
                      <option value="Under $100,000">Under $100,000</option>
                      <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                      <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                      <option value="$1,000,000 - $5,000,000">$1,000,000 - $5,000,000</option>
                      <option value="Over $5,000,000">Over $5,000,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Timeline</label>
                  <select
                    {...form.register('timeline')}
                    className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] px-4 text-gray-700"
                  >
                    <option value="Immediately">Immediately</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="Over 1 year">Over 1 year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Additional Information</label>
                  <textarea
                    {...form.register('additionalInfo')}
                    placeholder="Tell us about your specific requirements..."
                    className="w-full h-24 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Getting Your Knoxville Properties...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      Get My Knoxville Land List
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Knoxville Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={`${property.title} in ${property.location}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#329cf9] text-white font-bold">
                      {property.size}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white font-bold">
                      {property.price}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <Link to="/properties">
                    <Button className="w-full bg-[#329cf9] hover:bg-[#2563eb] text-white">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Knoxville">
              <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All Knoxville Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Knoxville Regional Submarkets */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Knoxville Regional <span className="text-[#329cf9]">Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the distinct characteristics of different areas within the Knoxville region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {submarkets.map((submarket, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{submarket.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{submarket.description}</p>
                  <div className="space-y-3">
                    {submarket.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#329cf9]" />
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

      {/* How to Find the Best Land */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How to Find the Best <span className="text-[#329cf9]">Land for Sale in Knoxville</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Narrow down your search by location</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Check the property's zoning regulations</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
                </p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ask other landowners about the area</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Look for signs of natural regeneration</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Summing up</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  When you're looking for land for sale in Knoxville, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in the Knoxville, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zoning and Development Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Knoxville Zoning and <span className="text-[#329cf9]">Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding zoning classifications and development processes in Knoxville
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Residential (R-1, R-2, R-3)</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Single-family and multi-family residential development with varying density requirements.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Typical Uses:</strong> Single-family homes, duplexes, townhomes, apartments
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Commercial (C-1, C-2, C-3)</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Retail, office, and service commercial development with different intensity levels.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Typical Uses:</strong> Retail stores, restaurants, offices, hotels, entertainment venues
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Factory className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Industrial (I-1, I-2)</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Manufacturing, warehousing, and distribution facilities with appropriate infrastructure.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Typical Uses:</strong> Manufacturing, warehouses, distribution centers, research facilities
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Development Process Timeline */}
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">Development Process Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Pre-Application", time: "2-4 weeks", description: "Initial consultation with planning department, site analysis, and preliminary design review." },
                  { step: "2", title: "Application Submission", time: "1-2 weeks", description: "Submit complete application package including plans, studies, and required documentation." },
                  { step: "3", title: "Review Process", time: "6-12 weeks", description: "Staff review, public notice period, and planning commission consideration for approval." },
                  { step: "4", title: "Approval & Permits", time: "2-4 weeks", description: "Final approval, permit issuance, and preparation for construction or development activities." }
                ].map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                      {phase.step}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h4>
                    <div className="text-sm font-medium text-[#329cf9] mb-3">({phase.time})</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{phase.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <p className="text-yellow-800 text-sm text-center">
                  <strong>Disclaimer:</strong> Development timelines and requirements may vary. Always consult with local planning officials and qualified professionals before making development decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Knoxville Utilities and <span className="text-[#329cf9]">Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure information for land development in Knoxville
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Electric Service</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Knoxville Utilities Board (KUB)</div>
                  <div>Tennessee Valley Authority (TVA)</div>
                  <div>Reliable grid infrastructure</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Water and Sewer</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>KUB water and wastewater</div>
                  <div>Knox County systems</div>
                  <div>Well and septic options</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Telecommunications</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Fiber optic networks</div>
                  <div>5G cellular coverage</div>
                  <div>Cable and satellite options</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mountain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Climate & Terrain</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>58°F average temperature</div>
                  <div>47" annual rainfall</div>
                  <div>Rolling hills and valleys</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transportation Corridors */}
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">Knoxville Transportation Corridors</CardTitle>
              <p className="text-gray-600 text-center">Strategic transportation access enhancing land values and development potential</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Interstate 40</h4>
                  <p className="text-gray-600 text-sm">Major east-west corridor connecting Nashville to Asheville, providing access to regional markets and distribution networks.</p>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                  <Plane className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-3">McGhee Tyson Airport</h4>
                  <p className="text-gray-600 text-sm">Regional airport serving passenger and cargo operations, enhancing accessibility for business developments.</p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <Train className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Norfolk Southern Railway</h4>
                  <p className="text-gray-600 text-sm">Major freight rail service supporting industrial and manufacturing land uses throughout the region.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Acreage Sale */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#329cf9]">Acreage Sale</span>
            </h2>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Knoxville to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
                </p>
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Fill up the form to get a full list of Land for sale in Knoxville.
                </h3>
                <p className="text-lg text-[#329cf9] font-semibold">
                  The Best Real Estate Professionals you can count on 24/7
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips to Find Cheap Land */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tips to Find <span className="text-[#329cf9]">Cheap Land for Sale in Knoxville</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">1</span>
                Check out foreclosure listings in your area
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Knoxville. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</span>
                Take advantage of the seller's desperation
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</span>
                Look for land development opportunities
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">4</span>
                Finding Cheap Land for Sale Doesn't Mean Strictly Buying
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">5</span>
                Take the time to find the right property for you
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Takeaway</h3>
              <p className="text-xl text-gray-600 leading-relaxed text-center">
                The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investment Insights */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Knoxville Land <span className="text-[#329cf9]">Investment Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Knoxville land market and investment opportunities
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
                  Knoxville metro continues to attract new residents, driving demand for both residential and commercial land development opportunities.
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
                  Strong economy across technology, finance, healthcare, and energy sectors creates stable demand for various types of land development projects.
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
                  Central location in Tennessee with excellent transportation infrastructure makes Knoxville land attractive for logistics, distribution, and manufacturing developments.
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
              Frequently Asked <span className="text-[#329cf9]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Get answers to common questions about buying and developing land in Knoxville</p>
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
            Ready to Invest in Knoxville Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Knoxville">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Knoxville Properties
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