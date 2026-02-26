import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, Clock, MapPin, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Users, TrendingUp, Award, Shield, Zap, Eye, FileText, Briefcase, Headphones, ChartBar as BarChart3 } from 'lucide-react';
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
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  inquiryType: z.string().min(1, 'Please select an inquiry type'),
  contactMethod: z.string().min(1, 'Please select a preferred contact method'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactUs3() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'General Inquiry',
      contactMethod: 'Email',
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
      
      const existingSubmissions = JSON.parse(localStorage.getItem('contact_us_3_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('contact_us_3_inquiries', JSON.stringify(existingSubmissions));

      setSuccess(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError('Failed to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      subtitle: "Speak directly with our land experts",
      value: "949-767-8885",
      availability: "Available 24/7",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "Email Us", 
      subtitle: "Send us a detailed message",
      value: "info@acreagesales.com",
      availability: "Response within 2 hours",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      subtitle: "Chat with our support team",
      value: "Available on website",
      availability: "Mon-Fri 9AM-6PM PST",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Calendar,
      title: "Schedule Meeting",
      subtitle: "Book a consultation call",
      value: "Online scheduling",
      availability: "Flexible scheduling",
      color: "from-orange-500 to-amber-500"
    }
  ];

  const stats = [
    { label: "Happy Customers", value: "10,000+", color: "text-blue-600" },
    { label: "Average Response Time", value: "< 2 Hours", color: "text-green-600" },
    { label: "Customer Satisfaction", value: "4.9/5", color: "text-purple-600" },
    { label: "Years of Experience", value: "5+", color: "text-orange-600" }
  ];

  const departments = [
    {
      title: "Sales Department",
      description: "Land buying and selling inquiries",
      email: "sales@acreagesales.com",
      phone: "949-767-8885",
      hours: "Mon-Fri 8AM-8PM PST",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Agent Relations",
      description: "Agent partnerships and support",
      email: "agents@acreagesales.com", 
      phone: "949-767-8885",
      hours: "Mon-Fri 9AM-6PM PST",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Technical Support",
      description: "Platform and technical assistance",
      email: "support@acreagesales.com",
      phone: "949-767-8885", 
      hours: "Mon-Fri 9AM-6PM PST",
      icon: Headphones,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Investment Consulting",
      description: "Market analysis and investment advice",
      email: "consulting@acreagesales.com",
      phone: "949-767-8885",
      hours: "Mon-Fri 10AM-5PM PST", 
      icon: BarChart3,
      color: "from-orange-500 to-amber-500"
    }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to contact form submissions?",
      answer: "We typically respond to all contact form submissions within 2 hours during business hours (Mon-Fri 9AM-6PM PST). For urgent matters, please call us directly at 949-767-8885."
    },
    {
      question: "What's the best way to reach you for urgent matters?",
      answer: "For urgent land buying or selling matters, please call us directly at 949-767-8885. Our phone line is available 24/7 for time-sensitive inquiries."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! We offer free consultations for both land buyers and sellers. You can schedule a consultation through this contact form or by calling us directly."
    },
    {
      question: "Can you help with properties outside of California?",
      answer: "Absolutely! We work with properties across all 50 states. Our nationwide network allows us to assist with land transactions anywhere in the United States."
    },
    {
      question: "What information should I include when contacting you about selling land?",
      answer: "Please include the property address, approximate size in acres, asking price (if you have one), and any special features or circumstances. Photos are also helpful if available."
    },
    {
      question: "Do you provide market analysis for properties?",
      answer: "Yes, we provide comprehensive market analysis including comparable sales, pricing recommendations, and market trends. This service is available for both buyers and sellers."
    }
  ];

  if (success) {
    <SEO slug="contact-us3" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Message Sent!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Thank you for contacting us. We've received your message and will respond within 2 hours during business hours.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our expert team reviews your inquiry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We prepare a personalized response</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You'll receive our response via your preferred contact method</span>
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
              📞 We're Here to Help
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Contact <span className="text-[#329cf9]">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Have questions about buying or selling land? Need help with our platform? Our expert team is here to help you succeed in your land investment journey.
            </p>
            
            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`text-center p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${method.color} text-white group cursor-pointer`}>
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                    <p className="text-white/90 text-sm mb-3">{method.subtitle}</p>
                    <div className="text-lg font-bold mb-2">{method.value}</div>
                    <div className="text-white/80 text-sm">{method.availability}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a href="tel:949-767-8885">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  <Phone className="w-6 h-6 mr-3" />
                  Call Now: 949-767-8885
                </Button>
              </a>
              <a href="mailto:info@acreagesales.com">
                <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                  <Mail className="w-6 h-6 mr-3" />
                  Send Email
                </Button>
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-[#329cf9]">Departments</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect directly with the right team for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${dept.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{dept.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{dept.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${dept.email}`} className="text-[#329cf9] hover:underline font-medium">
                        {dept.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${dept.phone}`} className="text-[#329cf9] hover:underline font-medium">
                        {dept.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 font-medium">{dept.hours}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Send Us a <span className="text-[#329cf9]">Message</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Fill out the form below and we'll get back to you within 2 hours during business hours.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                  {error}
                </div>
              )}

              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
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

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Subject *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...form.register('subject')}
                          placeholder="Brief description of your inquiry"
                          className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                        />
                      </div>
                      {form.formState.errors.subject && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Inquiry Type and Contact Method */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Inquiry Type *
                        </label>
                        <select
                          {...form.register('inquiryType')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Buying Land">Buying Land</option>
                          <option value="Selling Land">Selling Land</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Agent Partnership">Agent Partnership</option>
                          <option value="Investment Consultation">Investment Consultation</option>
                        </select>
                        {form.formState.errors.inquiryType && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.inquiryType.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Preferred Contact Method *
                        </label>
                        <select
                          {...form.register('contactMethod')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="Email">Email</option>
                          <option value="Phone">Phone</option>
                          <option value="Text Message">Text Message</option>
                          <option value="Either">Either Email or Phone</option>
                        </select>
                        {form.formState.errors.contactMethod && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.contactMethod.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Message *
                      </label>
                      <textarea
                        {...form.register('message')}
                        placeholder="Please provide details about your inquiry, including any specific questions or requirements..."
                        className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] resize-none text-lg"
                      />
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-2">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Send Message
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

            {/* Right side - Contact Info and Trust Indicators */}
            <div className="space-y-8">
              {/* Direct Contact Card */}
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Direct Contact</h3>
                    <p className="text-green-700 font-medium">Speak with our experts immediately</p>
                  </div>
                  
                  <div className="space-y-4 text-center">
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Phone</div>
                      <div className="text-2xl font-bold text-green-600">949-767-8885</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Email</div>
                      <div className="text-lg font-semibold text-green-600">info@acreagesales.com</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Hours</div>
                      <div className="text-gray-700">24/7 for urgent inquiries</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Headquarters */}
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Headquarters</h3>
                    <p className="text-blue-700 font-medium">Los Angeles, California</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-gray-900 mb-2">Address</div>
                      <p className="text-gray-600">4470 W Sunset Blvd, Suite #91147</p>
                      <p className="text-gray-600">Los Angeles, CA 90027</p>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-2">Business Hours</div>
                      <p className="text-gray-600">Mon-Fri: 9AM-6PM PST</p>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-2">24/7 Phone Support</div>
                      <p className="text-2xl font-bold text-[#329cf9]">949-767-8885</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Urgent Inquiries */}
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Urgent Inquiries</h3>
                    <p className="text-3xl font-bold text-red-600 mb-2">949-767-8885</p>
                    <p className="text-red-700 font-medium mb-4">Available 24/7</p>
                    <p className="text-gray-600 text-sm">For time-sensitive land buying or selling matters</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            <p className="text-xl text-gray-600">Common questions about contacting our team</p>
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
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Contact our expert team today and discover how we can help you succeed in land investment
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <a href="tel:949-767-8885">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Call 949-767-8885
              </Button>
            </a>
            <a href="mailto:info@acreagesales.com">
              <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
                Send Email
              </Button>
            </a>
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