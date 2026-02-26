import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, User, Building, FileText, MapPin, Star, Award, TrendingUp, Users, DollarSign, Brain, Target, ChartBar as BarChart3, Zap, Shield, CircleCheck as CheckCircle, Clock, Send, Handshake, Eye, Camera, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

const agentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().min(2, 'Company/Brokerage name is required'),
  licenseNumber: z.string().min(5, 'License number is required'),
  yearsExperience: z.string().min(1, 'Years of experience is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  serviceArea: z.string().min(5, 'Service area is required'),
  additionalInfo: z.string().optional(),
});

type AgentForm = z.infer<typeof agentSchema>;

export function Agent() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AgentForm>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      specialization: 'Land Sales',
    },
  });

  const handleSubmit = async (data: AgentForm) => {
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
      
      const existingSubmissions = JSON.parse(localStorage.getItem('agent_applications') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('agent_applications', JSON.stringify(existingSubmissions));

      setSuccess(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError('Failed to submit your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: DollarSign, label: "Up to 6%", value: "Commission", color: "text-green-600" },
    { icon: Brain, label: "AI Matched", value: "Qualified Leads", color: "text-purple-600" },
    { icon: Zap, label: "Advanced", value: "AI Tools", color: "text-blue-600" },
    { icon: Target, label: "Full", value: "Marketing Support", color: "text-orange-600" }
  ];

  const additionalStats = [
    { icon: Users, label: "Partner Agents", value: "2,500+", color: "text-blue-600" },
    { icon: DollarSign, label: "Agent Commissions Paid", value: "$25M+", color: "text-green-600" },
    { icon: Award, label: "Average Commission", value: "$8,500", color: "text-purple-600" },
    { icon: Star, label: "Agent Satisfaction", value: "4.8/5", color: "text-orange-600" }
  ];

  const benefits = [
    { icon: DollarSign, title: "Higher Commissions", description: "Earn up to 6% commission on every land sale" },
    { icon: Target, title: "Qualified Leads", description: "AI-matched leads with verified buyer intent" },
    { icon: Brain, title: "Advanced Tools", description: "AI listing generator and market analysis tools" },
    { icon: BarChart3, title: "Marketing Support", description: "Professional marketing materials and campaigns" },
    { icon: TrendingUp, title: "Market Data", description: "Real-time market analytics and pricing insights" },
    { icon: Users, title: "Network Access", description: "Connect with investors and developers nationwide" }
  ];

  const process = [
    { step: "1", title: "Submit Application", description: "Complete our agent partnership application", time: "5 minutes" },
    { step: "2", title: "Verification Process", description: "We verify your license and experience", time: "24-48 hours" },
    { step: "3", title: "Onboarding & Training", description: "Learn our platform and AI tools", time: "1 week" },
    { step: "4", title: "Start Earning", description: "Begin receiving qualified leads and commissions", time: "Immediate" }
  ];

  const requirements = [
    "Active real estate license in good standing",
    "Minimum 2 years of real estate experience", 
    "Land or rural property sales experience preferred",
    "Professional liability insurance",
    "Commitment to excellent customer service",
    "Technology proficiency and willingness to learn new tools"
  ];

  const testimonials = [
    {
      name: "David Thompson",
      company: "Thompson Real Estate",
      location: "Texas",
      content: "Joining Acreage Sale's agent network tripled my land sales. The AI tools and qualified leads are game-changers!",
      rating: 5,
      amount: "$45,000",
      metric: "Annual Commissions"
    },
    {
      name: "Maria Rodriguez",
      company: "Desert Land Realty", 
      location: "Arizona",
      content: "The marketing support and buyer matching system helped me close 15 land deals in my first 6 months.",
      rating: 5,
      amount: "$67,500",
      metric: "Annual Commissions"
    },
    {
      name: "James Wilson",
      company: "Mountain View Properties",
      location: "Colorado", 
      content: "Best decision I made was partnering with Acreage Sale. The technology and support are unmatched.",
      rating: 5,
      amount: "$52,000",
      metric: "Annual Commissions"
    }
  ];

  const faqs = [
    {
      question: "What commission rates do you offer?",
      answer: "We offer competitive commission rates up to 6% depending on your experience level and sales volume. Top performers can earn even higher rates through our performance bonus program."
    },
    {
      question: "How do you generate leads for agents?",
      answer: "Our AI-powered platform matches qualified buyers with properties in your area. We also provide marketing support, advertising campaigns, and access to our investor network."
    },
    {
      question: "What training and support do you provide?",
      answer: "We provide comprehensive onboarding, ongoing training on our AI tools, marketing support, and dedicated agent success managers to help you maximize your earnings."
    },
    {
      question: "Are there any fees to join the network?",
      answer: "No, there are no upfront fees to join our agent network. We only succeed when you succeed, which is why we're committed to providing you with the best tools and support."
    },
    {
      question: "Can I work with Acreage Sale if I'm already with a brokerage?",
      answer: "Yes, many of our partner agents work with existing brokerages. We can structure partnerships that work within your current business arrangements."
    },
    {
      question: "What makes Acreage Sale different from other platforms?",
      answer: "Our AI-powered tools, comprehensive marketing support, and focus on land sales set us apart. We provide technology and resources that traditional brokerages simply can't match."
    }
  ];

  if (success) {
    <SEO slug="agent" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Application Submitted!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Thank you for your interest in joining our agent network. We'll review your application and contact you within 24-48 hours.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">We verify your license and credentials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">Our team reviews your application</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You'll receive onboarding information and training materials</span>
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
              🤝 Join Our Agent Network
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Become an <span className="text-[#329cf9]">Agent Partner</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Join America's fastest-growing land marketplace and earn higher commissions with our AI-powered tools, qualified leads, and comprehensive marketing support.
            </p>
            
            {/* Key Benefits Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Apply to Join Network
              </Button>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Call 949-767-8885
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {additionalStats.map((stat, index) => (
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
              Why Partner with <span className="text-[#329cf9]">Acreage Sale?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary technology meets traditional real estate expertise to maximize your success
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
              Simple process to join our network and start earning higher commissions
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
                    <ArrowLeft className="w-8 h-8 text-[#329cf9] rotate-180" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agent <span className="text-[#329cf9]">Requirements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We partner with experienced, professional agents who share our commitment to excellence
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Trust indicators */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Join Our <span className="text-[#329cf9]">Network</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Complete the application below to start your journey as an Acreage Sale partner agent.
                </p>
              </div>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">$25M+ Paid</h3>
                    <p className="text-green-700 font-medium">To partner agents this year</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Higher commission rates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Qualified leads only</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">AI-powered tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Marketing support included</span>
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Rated Platform</h3>
                    <p className="text-blue-700 font-medium">Trusted by 2,500+ agents</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-center text-gray-600 font-medium">4.8/5 Agent Rating</p>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Questions?</h3>
                    <p className="text-3xl font-bold text-purple-600 mb-2">949-767-8885</p>
                    <p className="text-purple-700 font-medium">Agent Support Line</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Form */}
            <div className="w-full">
              <Card className="bg-white shadow-2xl border-0 rounded-2xl">
                <CardContent className="p-8 lg:p-12">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                      {error}
                    </div>
                  )}

                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {/* Name fields */}
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

                    {/* Contact fields */}
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

                    {/* Professional fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Company/Brokerage *
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('company')}
                            placeholder="Your company name"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.company && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.company.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          License Number *
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('licenseNumber')}
                            placeholder="Your license number"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.licenseNumber && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.licenseNumber.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Experience and specialization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Years of Experience *
                        </label>
                        <select
                          {...form.register('yearsExperience')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="">Select experience</option>
                          <option value="2-5 years">2-5 years</option>
                          <option value="5-10 years">5-10 years</option>
                          <option value="10-15 years">10-15 years</option>
                          <option value="15+ years">15+ years</option>
                        </select>
                        {form.formState.errors.yearsExperience && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.yearsExperience.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Specialization *
                        </label>
                        <select
                          {...form.register('specialization')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="Land Sales">Land Sales</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Agricultural">Agricultural</option>
                          <option value="Investment Properties">Investment Properties</option>
                        </select>
                        {form.formState.errors.specialization && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.specialization.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service area */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Service Area *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('serviceArea')}
                          placeholder="City, County, State"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.serviceArea && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.serviceArea.message}
                        </p>
                      )}
                    </div>

                    {/* Additional info */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        {...form.register('additionalInfo')}
                        placeholder="Tell us about your experience, goals, and why you want to join our network..."
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
                          Submitting Agent Application...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Submit Agent Application
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
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agent Success <span className="text-[#329cf9]">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real agents in our network
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
                        <div className="text-gray-600 text-sm">{testimonial.company}</div>
                        <div className="text-gray-500 text-sm">{testimonial.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{testimonial.amount}</div>
                      <div className="text-sm text-gray-500">{testimonial.metric}</div>
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
            <p className="text-xl text-gray-600">Common questions about our agent partnership program</p>
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
            Ready to Join Our Network?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Start earning higher commissions with qualified leads and revolutionary AI tools
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
              Apply Now
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
                <div className="text-white text-lg drop-shadow-sm font-semibold">agents@acreagesales.com</div>
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