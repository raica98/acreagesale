import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft, 
  Clock, 
  DollarSign, 
  Shield, 
  Zap, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Star,
  Award,
  TrendingUp,
  Users,
  ArrowRight,
  Calculator,
  FileText,
  Handshake,
  Target,
  Heart
} from 'lucide-react';
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
  propertyAddress: z.string().min(5, 'Property address is required'),
  propertySize: z.string().min(1, 'Property size is required'),
  timeframe: z.string().min(1, 'Timeframe is required'),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function SellMyLandFast() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      timeframe: 'ASAP',
    },
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store form data in localStorage for demo purposes
      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('land_sale_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('land_sale_inquiries', JSON.stringify(existingSubmissions));

      setSuccess(true);
      
      // Auto-hide success message after 5 seconds
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

  const benefits = [
    { icon: Clock, title: "24-Hour Cash Offers", description: "Get your offer within one business day" },
    { icon: DollarSign, title: "No Fees or Commissions", description: "Keep 100% of the sale price" },
    { icon: Zap, title: "Fast 7-14 Day Closing", description: "Close on your timeline" },
    { icon: Shield, title: "Buy Land As-Is", description: "No repairs or improvements needed" },
    { icon: Handshake, title: "Fair Market Value", description: "Competitive offers based on current market" },
    { icon: FileText, title: "Handle All Paperwork", description: "We manage the entire process for you" }
  ];

  const stats = [
    { icon: Users, label: "Land Owners Helped", value: "10,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Total Paid Out", value: "$50M+", color: "text-green-600" },
    { icon: Clock, label: "Average Closing Time", value: "10 Days", color: "text-purple-600" },
    { icon: Star, label: "Customer Rating", value: "4.9/5", color: "text-orange-600" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Texas",
      content: "I inherited 20 acres and needed to sell quickly. Acreage Sale gave me a fair offer and closed in 8 days. Couldn't be happier!",
      rating: 5,
      amount: "$125,000"
    },
    {
      name: "Mike Rodriguez", 
      location: "Colorado",
      content: "After trying to sell through a realtor for 6 months with no luck, Acreage Sale bought my land in 2 weeks. Amazing service!",
      rating: 5,
      amount: "$275,000"
    },
    {
      name: "Jennifer Chen",
      location: "California", 
      content: "Professional, fast, and fair. No hidden fees, no hassles. They handled everything and I got my cash quickly.",
      rating: 5,
      amount: "$450,000"
    }
  ];

  const process = [
    { step: "1", title: "Submit Property Info", description: "Tell us about your land through our simple form", time: "2 minutes" },
    { step: "2", title: "Property Evaluation", description: "Our experts analyze your property and market", time: "24 hours" },
    { step: "3", title: "Receive Cash Offer", description: "Get a fair, no-obligation cash offer", time: "24 hours" },
    { step: "4", title: "Close Fast", description: "Complete the sale and get your cash", time: "7-14 days" }
  ];

  if (success) {
    <SEO slug="sell-my-land-fast" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your property information and will contact you within 24 hours with a cash offer.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our team reviews your property details</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We conduct market analysis and valuation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You receive a no-obligation cash offer</span>
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
      <SEO slug="sell-my-land-fast" />
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
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Phone className="w-4 h-4" />
                <span>949-767-8885</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              💰 Get Cash for Your Land in 7-14 Days
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell My Land <span className="text-[#329cf9]">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Skip the hassle of traditional real estate. We buy land with our own cash, 
              close fast, and handle all the paperwork. No fees, no commissions, no waiting.
            </p>
            
            {/* Key Benefits Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">24 Hours</div>
                <div className="text-sm text-gray-600">Cash Offer</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">$0</div>
                <div className="text-sm text-gray-600">Fees or Commissions</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">7-14 Days</div>
                <div className="text-sm text-gray-600">Fast Closing</div>
              </div>
              <div className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">Any Condition</div>
                <div className="text-sm text-gray-600">We Buy As-Is</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Get My Cash Offer Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Call 949-767-8885
              </Button>
            </div>
          </div>

          {/* Stats */}
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Sell Your Land to <span className="text-[#329cf9]">Acreage Sale?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've revolutionized land sales to make the process fast, fair, and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#329cf9] transition-colors duration-300">
                    <benefit.icon className="w-8 h-8 text-[#329cf9] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Acreage Sale?
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 text-gray-700 font-bold text-lg">Feature</th>
                  <th className="text-center py-4 px-4 text-[#329cf9] font-bold text-lg">Acreage Sale</th>
                  <th className="text-center py-4 px-4 text-gray-500 font-bold text-lg">Zillow</th>
                  <th className="text-center py-4 px-4 text-gray-500 font-bold text-lg">Realtor.com</th>
                  <th className="text-center py-4 px-4 text-gray-500 font-bold text-lg">MLS/Realtor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">AI Auto-Listing</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Keep Seller Info Private</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Commission Fee</td>
                  <td className="text-center py-5 px-4 text-[#329cf9] font-bold text-lg">0%</td>
                  <td className="text-center py-5 px-4 text-gray-600 font-medium">3-5%</td>
                  <td className="text-center py-5 px-4 text-gray-600 font-medium">3-6%</td>
                  <td className="text-center py-5 px-4 text-gray-600 font-medium">6%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Market Analytics</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-yellow-500 font-semibold">Limited</td>
                  <td className="text-center py-5 px-4 text-yellow-500 font-semibold">Limited</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">ROI Backtesting</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Land Specialist Focused</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Custom Consulting</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Personal Neighbor Outreach</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Area Known Qualified Realtors Outreach</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-5 px-4 text-gray-700 font-medium">Known Investors In Area / Builders</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 text-gray-700 font-medium">Augmented Reality Property Corners</td>
                  <td className="text-center py-5 px-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                  <td className="text-center py-5 px-4 text-gray-400 text-2xl">×</td>
                </tr>
              </tbody>
            </table>

            <div className="text-center mt-10">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                Start Selling Land Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="text-[#329cf9]">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process gets you cash for your land in just 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-[#329cf9] font-bold text-sm">⏱️ {step.time}</span>
                  </div>
                </CardContent>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-[#329cf9]" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Get Your <span className="text-[#329cf9]">Cash Offer</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Fill out the form below and we'll contact you within 24 hours with a no-obligation cash offer for your land.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                  {error}
                </div>
              )}

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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Property Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...form.register('propertyAddress')}
                      placeholder="1234 Main Street, City, State, ZIP"
                      className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                    />
                  </div>
                  {form.formState.errors.propertyAddress && (
                    <p className="text-red-500 text-sm mt-2">
                      {form.formState.errors.propertyAddress.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Property Size *
                    </label>
                    <select
                      {...form.register('propertySize')}
                      className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                    >
                      <option value="">Select property size</option>
                      <option value="Less than 1 acre">Less than 1 acre</option>
                      <option value="1-5 acres">1-5 acres</option>
                      <option value="5-10 acres">5-10 acres</option>
                      <option value="10-25 acres">10-25 acres</option>
                      <option value="25-50 acres">25-50 acres</option>
                      <option value="50+ acres">50+ acres</option>
                    </select>
                    {form.formState.errors.propertySize && (
                      <p className="text-red-500 text-sm mt-2">
                        {form.formState.errors.propertySize.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      How Soon Do You Need to Sell? *
                    </label>
                    <select
                      {...form.register('timeframe')}
                      className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                    >
                      <option value="ASAP">As soon as possible</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="Within 60 days">Within 60 days</option>
                      <option value="Within 90 days">Within 90 days</option>
                      <option value="No rush">No specific timeline</option>
                    </select>
                    {form.formState.errors.timeframe && (
                      <p className="text-red-500 text-sm mt-2">
                        {form.formState.errors.timeframe.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    {...form.register('additionalInfo')}
                    placeholder="Tell us anything else about your property or situation..."
                    className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] resize-none text-lg"
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
                      Submitting Your Information...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6" />
                      Get My Free Cash Offer
                    </div>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  🔒 Your information is secure and will never be shared. SSL encrypted.
                </p>
              </form>
            </div>

            {/* Right side - Trust indicators */}
            <div className="space-y-8">
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">$2.5M+ Paid Out</h3>
                    <p className="text-green-700 font-medium">To land owners this year</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">No realtor commissions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">No closing costs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">No hidden fees</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Cash at closing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">A+ BBB Rating</h3>
                    <p className="text-blue-700 font-medium">Trusted by thousands</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-center text-gray-600 font-medium">4.9/5 Customer Rating</p>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Now</h3>
                    <p className="text-3xl font-bold text-purple-600 mb-2">949-767-8885</p>
                    <p className="text-purple-700 font-medium">Available 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="text-[#329cf9]">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real land owners who sold their property fast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{testimonial.amount}</div>
                      <div className="text-sm text-gray-500">Cash Received</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <p className="text-xl text-gray-600">Common questions about our land buying process</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can you close on my property?",
                answer: "We can typically close within 7-14 days of accepting our offer. For urgent situations, we may be able to close even faster with our cash buying process."
              },
              {
                question: "Do you charge any fees or commissions?",
                answer: "No, we don't charge any fees, commissions, or closing costs. The cash offer we provide is the exact amount you'll receive at closing."
              },
              {
                question: "What types of land do you buy?",
                answer: "We purchase all types of land including residential lots, commercial parcels, industrial sites, agricultural land, and raw acreage. Size, location, and condition don't matter."
              },
              {
                question: "How do you determine the value of my land?",
                answer: "Our valuation process includes market analysis, comparable sales research, and assessment of development potential to ensure fair market pricing."
              },
              {
                question: "What if my land has problems or liens?",
                answer: "We buy land in any condition and can handle title issues, liens, back taxes, and other complications as part of the transaction."
              }
            ].map((faq, index) => (
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
            Ready to Get Cash for Your Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of satisfied land owners who chose the fast, fair, and hassle-free way to sell their property
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
              Get My Cash Offer Now
            </Button>
            <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
              Call 949-767-8885
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
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Fast Response</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">Within 24 Hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}