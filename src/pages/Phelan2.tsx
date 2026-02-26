import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, TreePine, Wifi, Droplets, DollarSign, Chrome as Home, Sun, Mountain, Car, Banknote, Target, TriangleAlert as AlertTriangle, Ruler, ArrowRight, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Contact as Cactus, Wind, Thermometer, Compass, Camera, Binoculars, Tent } from 'lucide-react';
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
  propertyInterest: z.string().min(1, 'Property interest is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  specificNeeds: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Phelan2() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      timeline: 'Within 6 months',
      propertyInterest: 'Residential Land',
      budget: '$75,000 - $150,000',
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
    { icon: Building, label: "Available Properties", value: "850+", color: "text-blue-600" },
    { icon: DollarSign, label: "Starting Price", value: "$25,000", color: "text-green-600" },
    { icon: Ruler, label: "Avg. Lot Size", value: "5.2 acres", color: "text-purple-600" },
    { icon: TrendingUp, label: "Annual Growth", value: "+12%", color: "text-orange-600" }
  ];

  const advantages = [
    { icon: Mountain, title: "Elevated Desert Living", description: "2,800-4,000 feet elevation provides cooler temperatures and stunning panoramic views of the San Gabriel Mountains and Mojave Desert landscape." },
    { icon: DollarSign, title: "Exceptional Value", description: "Land prices 60-80% lower than coastal California while maintaining access to major employment centers and urban amenities within reasonable commuting distance." },
    { icon: Cactus, title: "Rural Lifestyle", description: "Large lot zoning (2.5+ acres) ensures privacy, space for animals, gardens, and recreational activities while preserving the area's rural character and community feel." },
    { icon: Sun, title: "Desert Climate Benefits", description: "Over 300 sunny days annually with low humidity, minimal rainfall, and comfortable year-round temperatures ideal for outdoor living and activities." },
    { icon: Car, title: "Strategic Location", description: "Highway 138 provides direct access to I-15, connecting to Los Angeles, San Bernardino, and Las Vegas employment and entertainment centers." },
    { icon: Wind, title: "Clean Air Quality", description: "Escape urban pollution with fresh, clean desert air and wide open spaces that provide a healthy environment for families and retirees." }
  ];

  const demographics = [
    { category: "Population", value: "14,500+", description: "Growing community with steady population increase" },
    { category: "Median Age", value: "42 years", description: "Mature community with family stability" },
    { category: "Household Income", value: "$65,000", description: "Middle-class community with diverse income levels" },
    { category: "Education", value: "High School+", description: "Well-educated population with strong values" }
  ];

  const recreation = [
    {
      title: "Angeles National Forest",
      description: "Direct access to over 650,000 acres of pristine wilderness offering hiking, camping, fishing, and hunting opportunities. Multiple trailheads and campgrounds within 30 minutes of Phelan.",
      activities: ["Hiking trails", "Camping sites", "Fishing spots", "Hunting areas", "Off-road trails", "Scenic drives"],
      distance: "15-30 minutes"
    },
    {
      title: "Mojave Desert Recreation",
      description: "Explore the unique beauty of the Mojave Desert with its diverse ecosystems, geological formations, and wildlife viewing opportunities. Perfect for photography and nature study.",
      activities: ["Desert hiking", "Rock hounding", "Star gazing", "Photography", "Wildlife viewing", "Botanical tours"],
      distance: "Immediate access"
    },
    {
      title: "Off-Road Vehicle Areas",
      description: "Designated OHV areas provide legal and safe environments for dirt bikes, ATVs, and 4x4 vehicles. Multiple staging areas and trail systems cater to all skill levels.",
      activities: ["ATV riding", "Dirt biking", "4x4 trails", "Rock crawling", "Desert racing", "Family rides"],
      distance: "10-45 minutes"
    }
  ];

  const development = [
    {
      title: "Residential Development",
      description: "Phelan's Rural Living (RL) zoning allows for custom homes on 2.5+ acre lots, providing flexibility for various architectural styles and property uses while maintaining rural character.",
      requirements: ["2.5-acre minimum lot size", "Single-family residential", "Accessory structures allowed", "Agricultural uses permitted"],
      timeline: "6-12 months typical"
    },
    {
      title: "Agricultural Operations",
      description: "Agricultural zoning permits farming, ranching, and equestrian facilities. The high desert climate is suitable for drought-resistant crops and livestock operations.",
      requirements: ["5-40 acre minimums", "Livestock permitted", "Agricultural structures", "Water rights included"],
      timeline: "3-6 months typical"
    },
    {
      title: "Commercial Development",
      description: "Limited commercial zoning along major corridors allows for neighborhood-serving businesses that support the rural community while maintaining its character.",
      requirements: ["Highway frontage preferred", "Conditional use permits", "Traffic impact studies", "Community compatibility"],
      timeline: "8-18 months typical"
    }
  ];

  const investment = [
    {
      strategy: "Buy and Hold",
      description: "Purchase land for long-term appreciation as the high desert region continues to grow and develop. Phelan's proximity to urban centers and rural character make it attractive for future development.",
      returns: "8-15% annually",
      timeline: "5-10 years",
      riskLevel: "Low to Moderate"
    },
    {
      strategy: "Development Play",
      description: "Acquire larger parcels for subdivision into smaller lots as demand increases. The area's growth potential and zoning flexibility provide opportunities for residential development.",
      returns: "15-30% annually",
      timeline: "2-5 years", 
      riskLevel: "Moderate to High"
    },
    {
      strategy: "Income Generation",
      description: "Generate immediate income through agricultural leases, solar installations, or storage facilities while holding for appreciation. Multiple income streams possible on larger parcels.",
      returns: "5-12% annually",
      timeline: "1-3 years",
      riskLevel: "Low"
    }
  ];

  const faqs = [
    {
      question: "What makes Phelan different from other high desert communities?",
      answer: "Phelan stands out for its established community infrastructure, proximity to Angeles National Forest, excellent highway access via Highway 138, and strong community identity. Unlike some high desert areas, Phelan has maintained steady growth while preserving its rural character through large lot zoning requirements."
    },
    {
      question: "How does the elevation affect living in Phelan?",
      answer: "Phelan's elevation of 2,800-4,000 feet provides several benefits including cooler temperatures (5-10 degrees cooler than lower desert areas), cleaner air quality, and stunning views. The elevation also means occasional light snow in winter, which most residents enjoy as a novelty in the desert setting."
    },
    {
      question: "What are the water rights and availability in Phelan?",
      answer: "Water availability varies by location. Developed areas are served by Phelan Piñon Hills Community Services District, while rural properties typically use private wells. Groundwater is generally available at 100-300 feet depth. Water rights are typically included with property ownership, and most wells produce adequate water for residential use."
    },
    {
      question: "Are there any restrictions on what I can do with my land in Phelan?",
      answer: "Phelan follows San Bernardino County regulations which are generally less restrictive than urban areas. Most residential zones allow homes, accessory structures, agricultural uses, and keeping of animals. Commercial activities may require permits. The rural setting provides flexibility for various uses while maintaining community standards."
    },
    {
      question: "How is the resale market for Phelan properties?",
      answer: "The resale market in Phelan has been strong, with properties typically selling within 3-6 months when priced appropriately. The area's growing popularity, limited supply of large lots, and increasing demand from people seeking rural lifestyle contribute to steady appreciation and good liquidity."
    },
    {
      question: "What about fire risk and insurance in Phelan?",
      answer: "Phelan is in a moderate fire risk area. Most properties can obtain standard homeowner's insurance, though rates may be higher than urban areas. Many residents create defensible space around structures and participate in community fire prevention programs. The high desert vegetation is less fire-prone than forested areas."
    },
    {
      question: "Can I operate a business from my Phelan property?",
      answer: "Many home-based businesses are permitted in Phelan's residential zones, including professional services, small-scale manufacturing, and agricultural operations. Larger commercial operations may require conditional use permits. The rural setting and large lots provide flexibility for various business activities."
    },
    {
      question: "What is the long-term outlook for Phelan?",
      answer: "Phelan's long-term outlook is positive due to continued population growth in Southern California, increasing demand for affordable rural properties, excellent transportation access, and the area's unique combination of rural lifestyle with urban accessibility. Development restrictions help ensure sustainable growth while preserving community character."
    }
  ];

  if (success) {
    <SEO slug="phelan2" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you comprehensive details about Phelan properties and opportunities.
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
              🏜️ High Desert Investment Opportunity
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Phelan <span className="text-[#329cf9]">California</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover California's hidden gem in the high desert. Phelan offers the perfect escape from urban congestion with affordable land, stunning natural beauty, and a growing community that values space, privacy, and the outdoor lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Phelan">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  View Available Land
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Investment Guide
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

      {/* Advantages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Phelan <span className="text-[#329cf9]">Advantage</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why Phelan is becoming California's premier destination for those seeking space, value, and quality of life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#329cf9] transition-colors duration-300">
                    <advantage.icon className="w-8 h-8 text-[#329cf9] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demographics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Community <span className="text-[#329cf9]">Demographics</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the Phelan community and what makes it special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demographics.map((demo, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{demo.category}</h3>
                  <div className="text-3xl font-bold text-[#329cf9] mb-4">{demo.value}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{demo.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recreation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Recreation & <span className="text-[#329cf9]">Outdoor Activities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Phelan's location provides unparalleled access to diverse recreational opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recreation.map((rec, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{rec.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{rec.description}</p>
                  
                  <div className="bg-[#329cf9]/10 rounded-xl p-4 mb-6">
                    <div className="font-bold text-[#329cf9] text-lg">{rec.distance}</div>
                    <div className="text-sm text-gray-600">From Phelan</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {rec.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="bg-blue-50 rounded-lg p-2 text-center">
                        <span className="text-blue-600 font-medium text-xs">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Opportunities */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Development <span className="text-[#329cf9]">Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible zoning and rural character provide diverse development possibilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {development.map((dev, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{dev.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{dev.description}</p>
                  
                  <div className="bg-green-50 rounded-xl p-4 mb-6">
                    <div className="font-bold text-green-600 text-lg">{dev.timeline}</div>
                    <div className="text-sm text-gray-600">Approval Timeline</div>
                  </div>
                  
                  <div className="space-y-2">
                    {dev.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Investment <span className="text-[#329cf9]">Strategies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple approaches to building wealth through Phelan land investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investment.map((strategy, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{strategy.strategy}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{strategy.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Expected Returns:</span>
                      <span className="text-green-600 font-bold">{strategy.returns}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Timeline:</span>
                      <span className="text-blue-600 font-bold">{strategy.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Risk Level:</span>
                      <span className="text-orange-600 font-bold">{strategy.riskLevel}</span>
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
              Get Phelan <span className="text-[#329cf9]">Property Information</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your interests and we'll provide detailed information about available properties
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
                        Property Interest *
                      </label>
                      <select
                        {...form.register('propertyInterest')}
                        className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                      >
                        <option value="Residential Land">Residential Land</option>
                        <option value="Agricultural Land">Agricultural Land</option>
                        <option value="Recreational Land">Recreational Land</option>
                        <option value="Investment Land">Investment Land</option>
                        <option value="Equestrian Property">Equestrian Property</option>
                        <option value="Commercial Land">Commercial Land</option>
                      </select>
                      {form.formState.errors.propertyInterest && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.propertyInterest.message}
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
                        <option value="$75,000 - $150,000">$75,000 - $150,000</option>
                        <option value="$150,000 - $300,000">$150,000 - $300,000</option>
                        <option value="$300,000+">$300,000+</option>
                      </select>
                      {form.formState.errors.budget && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.budget.message}
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
                        Specific Needs (Optional)
                      </label>
                      <textarea
                        {...form.register('specificNeeds')}
                        placeholder="Tell us about your specific requirements, preferred areas, or any questions about Phelan..."
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
                        Get Phelan Information
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
            <p className="text-xl text-gray-600">Everything you need to know about Phelan</p>
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
            Ready to Explore Phelan?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Discover why Phelan is California's best-kept secret for affordable land and quality living
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Phelan">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                View Phelan Properties
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