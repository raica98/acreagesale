import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Clock, DollarSign, Shield, Zap, CircleCheck as CheckCircle, Phone, Mail, MapPin, User, Star, Award, TrendingUp, Users, ArrowRight, Calculator, FileText, Handshake, Target, Heart, Brain, Satellite, Camera, ChartBar as BarChart3, Eye, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { AddPropertyModal } from '../components/properties/AddPropertyModal';
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

export function AddListing() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'quick' | 'ai' | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [addPropertyModalOpen, setAddPropertyModalOpen] = useState(false);

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
      
      const existingSubmissions = JSON.parse(localStorage.getItem('listing_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('listing_inquiries', JSON.stringify(existingSubmissions));

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

  const handleMethodSelect = (method: 'quick' | 'ai') => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    setSelectedMethod(method);
    setAddPropertyModalOpen(true);
  };

  const stats = [
    { icon: Brain, label: "AI Powered", value: "Smart Automation", color: "text-purple-600" },
    { icon: DollarSign, label: "$0", value: "Commissions", color: "text-green-600" },
    { icon: Clock, label: "7 Days", value: "To First Offer", color: "text-blue-600" },
    { icon: Award, label: "100%", value: "Success Rate", color: "text-orange-600" }
  ];

  const additionalStats = [
    { icon: Users, label: "Happy Sellers", value: "10,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Properties Sold", value: "$50M+", color: "text-green-600" },
    { icon: Clock, label: "Average Time to Offer", value: "7 Days", color: "text-purple-600" },
    { icon: Star, label: "Customer Rating", value: "4.9/5", color: "text-orange-600" }
  ];

  const benefits = [
    { icon: Brain, title: "AI Auto-Listing", description: "Generate professional listings automatically" },
    { icon: Satellite, title: "Satellite Imagery", description: "High-resolution aerial photos captured" },
    { icon: Target, title: "Buyer Matching", description: "AI connects you with qualified buyers" },
    { icon: BarChart3, title: "Market Analysis", description: "Real-time pricing and market insights" },
    { icon: DollarSign, title: "Zero Commissions", description: "Keep 100% of your sale price" },
    { icon: Zap, title: "Fast Results", description: "Get offers in as soon as 7 days" }
  ];

  const process = [
    { step: "1", title: "Choose Your Method", description: "Quick form or advanced AI listing generator", time: "1 minute" },
    { step: "2", title: "Property Analysis", description: "Our AI analyzes your property and market", time: "24 hours" },
    { step: "3", title: "Professional Listing", description: "Get a market-ready listing with photos", time: "24 hours" },
    { step: "4", title: "Buyer Matching", description: "Connect with qualified buyers in your area", time: "7-30 days" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Texas",
      content: "Listed my 20-acre property and got 3 offers within 10 days. The AI listing generator made it so easy!",
      rating: 5,
      amount: "$125,000"
    },
    {
      name: "Mike Rodriguez", 
      location: "Colorado",
      content: "After struggling to sell for months, Acreage Sale's platform got me multiple offers in just 2 weeks.",
      rating: 5,
      amount: "$275,000"
    },
    {
      name: "Jennifer Chen",
      location: "California", 
      content: "The satellite imagery and AI-generated description made my property look amazing. Sold above asking price!",
      rating: 5,
      amount: "$450,000"
    }
  ];

  const faqs = [
    {
      question: "How much does it cost to list my property?",
      answer: "Our quick listing form is completely free. Our AI Auto-Listing service is $249.99/month and includes professional satellite imagery, AI-generated content, and buyer matching."
    },
    {
      question: "How quickly will my property be listed?",
      answer: "Quick form submissions are processed within 24 hours. AI Auto-Listings are created and published within 2-4 hours of submission."
    },
    {
      question: "Do you charge commissions when my property sells?",
      answer: "No, we don't charge any commissions. You keep 100% of your sale price. Our revenue comes from our monthly listing fees, not from your sale."
    },
    {
      question: "What makes your AI listing generator special?",
      answer: "Our AI automatically captures satellite imagery, generates professional descriptions, analyzes market pricing, and targets qualified buyers - all without any manual work from you."
    },
    {
      question: "How do you find buyers for my property?",
      answer: "We use AI-powered buyer matching, targeted advertising, and our network of investors and developers to connect your property with qualified buyers actively looking in your area."
    }
  ];

  if (success) {
    <SEO slug="add-listing" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your listing information and will contact you within 24 hours to get your property listed.
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
                  <span className="text-blue-800">We create your professional listing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">Your property goes live and starts attracting buyers</span>
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
                  View All Properties
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
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🚀 List Your Property in Minutes
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Add a <span className="text-[#329cf9]">Listing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Choose your listing method: Quick form submission or our revolutionary AI-powered listing generator that creates professional listings automatically.
            </p>
            
            {/* Method Selection Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {/* Quick Listing Form */}
              <Card 
                className="group cursor-pointer bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative"
                onClick={() => handleMethodSelect('quick')}
              >
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Listing Form</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Submit your property details and we'll create a professional listing for you
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="text-2xl font-bold text-green-600">FREE</div>
                    <div className="text-sm text-gray-700">No upfront costs</div>
                  </div>
                  
                  <Button className="w-full h-12 bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Choose Quick Form
                  </Button>
                </CardContent>
              </Card>

              {/* AI Auto-Listing */}
              <Card 
                className="group cursor-pointer bg-white rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative"
                onClick={() => handleMethodSelect('ai')}
              >
                {/* Recommended Badge */}
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  RECOMMENDED
                </div>
                
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Auto-Listing</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Revolutionary AI creates professional listings with satellite imagery automatically
                  </p>
                  
                  <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                    <div className="text-2xl font-bold text-blue-600">$200/month</div>
                    <div className="text-sm text-blue-700">Full AI automation</div>
                  </div>
                  
                  <Button className="w-full h-12 bg-[#329cf9] hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Choose AI Generator
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {additionalStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why List with Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why List with <span className="text-[#329cf9]">Acreage Sale?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary AI technology meets traditional real estate expertise
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

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="text-[#329cf9]">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From property submission to buyer offers in just 4 simple steps
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

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="text-[#329cf9]">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real property owners who listed with us
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
                      <div className="text-sm text-gray-500">Sale Price</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <p className="text-xl text-gray-600">Common questions about listing your property</p>
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
            Ready to List Your Property?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful property owners who've listed their land with our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Button 
              onClick={() => handleMethodSelect('quick')}
              className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white"
            >
              Start Quick Form
            </Button>
            <Button 
              onClick={() => handleMethodSelect('ai')}
              className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all"
            >
              Try AI Generator
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

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signup"
      />
      
      <AddPropertyModal
        isOpen={addPropertyModalOpen}
        onClose={() => setAddPropertyModalOpen(false)}
        onSuccess={() => {
          setAddPropertyModalOpen(false);
          // Could redirect to dashboard or show success message
        }}
      />
    </div>
  );
}