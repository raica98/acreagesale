import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, CircleCheck as CheckCircle, Star, Users, DollarSign, MapPin, Clock, Shield, Award, TrendingUp, Zap, User, Building, TreePine, Briefcase, GraduationCap, Heart, ShoppingBag, Utensils, Car, Plane, Chrome as Home, CreditCard, Banknote, FileText, Target, Eye, Handshake, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { SEO } from '../components/SEO';
import { SharedNavigation } from '../components/ui/SharedNavigation';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function About() {
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
    { icon: Users, label: "Happy Customers", value: "10,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Land Purchased", value: "$50M+", color: "text-green-600" },
    { icon: MapPin, label: "States Covered", value: "50", color: "text-purple-600" },
    { icon: TrendingUp, label: "Success Rate", value: "98%", color: "text-orange-600" }
  ];

  const additionalStats = [
    { label: "Land Purchased", value: "$2.5M+", color: "text-emerald-600" },
    { label: "Happy Sellers", value: "500+", color: "text-blue-600" }
  ];

  const process = [
    {
      step: "1",
      title: "Research Your Land",
      description: "We thoroughly analyze your property and market conditions",
      icon: Eye
    },
    {
      step: "2", 
      title: "Make Fair Offer",
      description: "Receive a competitive proposal based on current market value",
      icon: DollarSign
    },
    {
      step: "3",
      title: "Send Agreement", 
      description: "Review and sign our straightforward purchase agreement",
      icon: FileText
    },
    {
      step: "4",
      title: "Get Paid",
      description: "Receive your payment quickly with no hidden fees",
      icon: Banknote
    }
  ];

  const benefits = [
    "No realtor commissions - save 6%",
    "Cash offers within 24 hours", 
    "Close in 7-14 days guaranteed",
    "Buy land in any condition",
    "Handle all paperwork for you",
    "No hidden fees or costs",
    "Fair market value offers",
    "Professional legal support",
    "Nationwide coverage"
  ];

  const values = [
    {
      title: "Our Mission",
      description: "To revolutionize land transactions by providing fast, fair, and transparent solutions for property owners across America.",
      icon: Target
    },
    {
      title: "Trust & Security", 
      description: "Every transaction is backed by our commitment to transparency, legal compliance, and secure handling of your property sale.",
      icon: Shield
    },
    {
      title: "Speed & Efficiency",
      description: "We've streamlined the land selling process to close deals in days, not months, saving you time and money.",
      icon: Zap
    },
    {
      title: "Customer First",
      description: "Your satisfaction is our priority. We work tirelessly to ensure every land owner gets the best possible experience.",
      icon: Heart
    }
  ];

  const testimonials = [
    {
      name: "Robert Thompson",
      location: "United States",
      content: "Acreage Sale made selling my inherited land in United States incredibly easy. They handled everything and I got my cash in just 10 days!",
      rating: 5
    },
    {
      name: "Lisa Rodriguez", 
      location: "United States",
      content: "Professional, fast, and fair. No hidden fees, no hassles. Exactly what they promised from day one for my United States property.",
      rating: 5
    },
    {
      name: "David Kim",
      location: "United States", 
      content: "After trying to sell through traditional methods for months, Acreage Sale closed my United States deal in 2 weeks. Amazing service!",
      rating: 5
    }
  ];

  const landTypes = [
    {
      title: "Residential Development",
      description: "Prime residential land parcels in United States perfect for single-family homes, subdivisions, and planned communities. These properties offer excellent potential for future development with growing demand in the area.",
      icon: Home
    },
    {
      title: "Commercial Properties",
      description: "Strategic commercial land locations in United States ideal for retail centers, office complexes, and mixed-use developments. High-traffic areas with excellent visibility and accessibility for business ventures.",
      icon: Building
    },
    {
      title: "Recreational Land", 
      description: "Scenic recreational properties in and around United States perfect for outdoor enthusiasts, hunting, camping, and private retreats. These parcels offer natural beauty and privacy for personal enjoyment or investment.",
      icon: TreePine
    }
  ];

  const infrastructure = [
    { title: "Highway Access", description: "Major highway connections providing easy access to United States properties", icon: Car },
    { title: "Utilities Available", description: "Power, water, and sewer infrastructure readily available in United States", icon: Zap },
    { title: "Airport Proximity", description: "Convenient access to regional and international airports from United States", icon: Plane },
    { title: "Urban Planning", description: "Well-planned development zones and zoning regulations in United States", icon: Building }
  ];

  const amenities = [
    { title: "Schools", description: "Quality education", icon: GraduationCap },
    { title: "Healthcare", description: "Medical facilities", icon: Heart },
    { title: "Shopping", description: "Retail centers", icon: ShoppingBag },
    { title: "Dining", description: "Restaurants", icon: Utensils },
    { title: "Recreation", description: "Parks & activities", icon: TreePine },
    { title: "Business", description: "Commercial hubs", icon: Briefcase }
  ];

  const financing = [
    {
      title: "Cash Purchases",
      description: "Quick cash transactions for immediate United States land acquisition. No financing delays, competitive pricing, and fast closings.",
      features: ["Immediate ownership", "No interest payments", "Stronger negotiating position"],
      icon: Banknote
    },
    {
      title: "Owner Financing", 
      description: "Flexible owner-financed options for United States properties. Work directly with sellers for customized payment plans.",
      features: ["Flexible terms", "Lower down payments", "Faster approval process"],
      icon: Handshake
    },
    {
      title: "Traditional Loans",
      description: "Bank financing and land loans for United States property purchases. We can connect you with preferred lenders.",
      features: ["Competitive rates", "Longer repayment terms", "Professional guidance"],
      icon: CreditCard
    }
  ];

  const faqs = [
    {
      question: "Is your land no longer useful to you?",
      answer: "Many landowners in United States find themselves with property they no longer need or want. We buy land in any condition, for any reason, making it easy to convert your unused asset into cash."
    },
    {
      question: "Do you just want some money for your land by selling it?",
      answer: "Absolutely! We provide fair market value for your United States land with quick cash offers. No need to wait months or years - get your money fast."
    },
    {
      question: "Are you fed up with squandering your money on taxes and debts?",
      answer: "Property taxes and maintenance costs in United States can add up quickly. Selling to us eliminates these ongoing expenses and puts cash in your pocket instead."
    },
    {
      question: "Are you unsure where and how to sell your property?",
      answer: "We make it simple! Our experienced team handles everything from valuation to closing for United States properties. You don't need to find buyers or navigate complex processes."
    },
    {
      question: "Are you looking for an easy way to sell your land?",
      answer: "Our streamlined process is designed for simplicity. Just contact us, get an offer for your United States property, and close fast. We handle all the paperwork and complications."
    },
    {
      question: "Are you disillusioned with waiting years or decades for your land to sell?",
      answer: "Traditional land sales in United States can take forever. We buy directly with cash, closing in 7-14 days instead of months or years."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="about" />
      <SharedNavigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#329cf9] text-white px-8 py-3 text-lg font-bold mb-8 shadow-xl">
            🏆 America's #1 Land Marketplace
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Why Choose <span className="text-[#329cf9]">Acreage Sale</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            We are keen to buy your land without the hassle of you going out and finding a suitable buyer. 
            No patience required, no waiting for buyers - just fast, fair cash offers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
              Get Cash Offer Now
            </Button>
            <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
              Call 949-767-8885
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why You Should <span className="text-[#329cf9]">Choose Us</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We are keen to buy your land without the hassle of you going out and finding a suitable buyer. 
                You don't have to deal with patience or exertion of waiting for a buyer to get paid.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                You simply have to sell your land to us after few formalities from both sides. 
                To be very clear there is no monetary compensations or hidden charges, going to be imposed over time.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {additionalStats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Professional land buying service in United States</h3>
                <div className="flex items-center gap-4">
                  <Badge className="bg-blue-600 text-white">Professional Service</Badge>
                  <Badge className="bg-green-600 text-white">Trusted Land Buyers</Badge>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Beautiful land property"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Premium Land Properties</h3>
                <p className="text-white/90">Nationwide coverage with local expertise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Simple <span className="text-[#329cf9]">4-Step Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's elaborate our few steps for better clarity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#329cf9]">Acreage Sale?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No monetary compensations or hidden charges - just fair, transparent land purchases
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

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core <span className="text-[#329cf9]">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Acreage Sale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-[#329cf9]">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real land owners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      <div className="text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Land Opportunities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Land Opportunities in <span className="text-[#329cf9]">United States</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover prime land investment opportunities across United States and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {landTypes.map((type, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <type.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
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
              Infrastructure & <span className="text-[#329cf9]">Transportation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              United States offers excellent infrastructure and connectivity for land development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {infrastructure.map((item, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Amenities Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Local <span className="text-[#329cf9]">Amenities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              United States offers a rich array of amenities and services for residents and businesses
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-[#329cf9]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-6 h-6 text-[#329cf9]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financing <span className="text-[#329cf9]">Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible financing solutions for your United States land purchase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financing.map((option, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <option.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{option.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>
                  <div className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
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

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Common <span className="text-[#329cf9]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Answers to frequently asked questions about our process
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              Are you also struggling with following questionnaire?
            </p>
            <p className="text-gray-600 mt-4">
              We understand the challenges of land ownership in United States. Whether your land is no longer useful, 
              you need money quickly, or you're tired of paying taxes and debts - we're here to help.
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

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Register Your <span className="text-[#329cf9]">Interest</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to sell your land? Get started with a free, no-obligation consultation
            </p>
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
                    We've received your information and will contact you within 24 hours.
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
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Contact us today for your free, no-obligation land evaluation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl">Call Now</div>
                <div className="text-white text-lg font-semibold">949-767-8885</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl">Email Us</div>
                <div className="text-white text-lg font-semibold">info@acreagesales.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}