import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, DollarSign, Shield, Zap, CircleCheck as CheckCircle, Phone, Sparkles, ArrowRight, Award, TrendingUp, Users, Target, Brain, MapPin, Camera, FileText, BarChart, MessageSquare, Megaphone, Eye, Send, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { SEO } from '../components/SEO';
import { SharedNavigation } from '../components/ui/SharedNavigation';
import { AddPropertyModal } from '../components/properties/AddPropertyModal';
import { AuthModal } from '../components/auth/AuthModal';
import { useAuth } from '../hooks/useAuth';

export function SellLandFast() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [addPropertyModalOpen, setAddPropertyModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleCreateListing = () => {
    if (user) {
      setAddPropertyModalOpen(true);
    } else {
      setAuthMode('signup');
      setAuthModalOpen(true);
    }
  };

  const aiFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Listing Creation",
      description: "Our advanced AI analyzes your property data and automatically generates compelling, SEO-optimized listings that attract qualified buyers. Save 10+ hours of manual work."
    },
    {
      icon: Camera,
      title: "Professional Media Generation",
      description: "Automatically capture aerial screenshots, street view images, and interactive maps. Our AI creates a complete visual portfolio that makes your property stand out."
    },
    {
      icon: DollarSign,
      title: "Smart Pricing Algorithm",
      description: "AI analyzes comparable sales, market trends, and property features to recommend the optimal listing price that maximizes your profit while ensuring a quick sale."
    },
    {
      icon: Target,
      title: "Targeted Buyer Matching",
      description: "Our system identifies and notifies the most likely buyers based on their search history, preferences, and investment criteria. Get in front of serious buyers instantly."
    },
    {
      icon: Megaphone,
      title: "Multi-Channel Marketing",
      description: "Your listing is automatically promoted across our platform, social media, email campaigns, and partner networks. Reach thousands of potential buyers effortlessly."
    },
    {
      icon: BarChart,
      title: "Real-Time Analytics Dashboard",
      description: "Track views, inquiries, and buyer engagement in real-time. Get actionable insights to optimize your listing and close deals faster."
    }
  ];

  const pricingBenefits = [
    "AI-Generated Professional Listing",
    "Unlimited High-Quality Photos & Maps",
    "Automated Property Valuation",
    "Smart Buyer Matching System",
    "Multi-Platform Marketing",
    "Priority Listing Placement",
    "Real-Time Analytics Dashboard",
    "Email & Phone Support",
    "No Commission Fees Ever",
    "30-Day Money-Back Guarantee"
  ];

  const comparisonData = [
    { feature: "AI Auto-Listing", acreage: true, zillow: false, realtor: false, mls: false },
    { feature: "Keep Seller Info Private", acreage: true, zillow: false, realtor: false, mls: false },
    { feature: "Commission Fee", acreage: "0%", zillow: "3-6%", realtor: "3-6%", mls: "6%" },
    { feature: "Market Analytics", acreage: true, zillow: "Limited", realtor: "Limited", mls: false },
    { feature: "Personal Neighbor Outreach", acreage: true, zillow: false, realtor: false, mls: false },
    { feature: "Area Known Qualified Realtors Outreach", acreage: true, zillow: false, realtor: false, mls: false },
    { feature: "Known Investors In Area / Builders", acreage: true, zillow: false, realtor: false, mls: false },
    { feature: "Augmented Reality Property Corners", acreage: true, zillow: false, realtor: false, mls: false }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Texas",
      content: "The AI listing tool created a better description than I ever could have. My 20-acre property sold in just 8 days! The automated marketing reached buyers I never would have found on my own.",
      rating: 5,
      amount: "$285,000",
      timeToSell: "8 days",
      acres: "20 acres"
    },
    {
      name: "John Davidson",
      location: "Arizona",
      content: "I was skeptical about AI, but this blew me away. The listing photos, descriptions, and pricing were spot-on. Saved me thousands in realtor fees and weeks of time. Highly recommend!",
      rating: 5,
      amount: "$425,000",
      timeToSell: "12 days",
      acres: "45 acres"
    },
    {
      name: "Lisa Chen",
      location: "California",
      content: "As someone who inherited land I knew nothing about, the AI autolisting was a lifesaver. It handled everything - photos, pricing, marketing. Got multiple offers within 3 days!",
      rating: 5,
      amount: "$195,000",
      timeToSell: "14 days",
      acres: "5 acres"
    }
  ];

  const stats = [
    { value: "5 Min", label: "Setup Time", icon: Clock },
    { value: "10x", label: "More Exposure", icon: Eye },
    { value: "3-5x", label: "Faster Sales", icon: TrendingUp },
    { value: "$12,000", label: "Avg. Savings", icon: DollarSign }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Enter Property Address",
      description: "Simply provide your property address or APN. Our AI instantly retrieves all public records, property boundaries, and essential details.",
      time: "30 seconds"
    },
    {
      step: "2",
      title: "AI Generates Your Listing",
      description: "Watch as our AI creates professional photos, compelling descriptions, accurate pricing, and complete marketing materials automatically.",
      time: "2-3 minutes"
    },
    {
      step: "3",
      title: "Review & Publish",
      description: "Review your AI-generated listing, make any tweaks you want, then publish to reach thousands of active land buyers instantly.",
      time: "5 minutes"
    },
    {
      step: "4",
      title: "Receive Offers & Close",
      description: "Our system notifies qualified buyers, manages inquiries, and helps you evaluate offers. Close on your timeline with zero commission fees.",
      time: "3-14 days"
    }
  ];

  const traditionalVsAI = [
    {
      aspect: "Time to Create Listing",
      traditional: "6-12 hours of research, writing, and photo editing",
      ai: "2-3 minutes fully automated"
    },
    {
      aspect: "Professional Photos",
      traditional: "$500-2,000 for photographer and editing",
      ai: "Included - automated aerial and street view capture"
    },
    {
      aspect: "Market Analysis",
      traditional: "Pay appraiser $300-600 or guess",
      ai: "AI analyzes 1000s of comparables instantly - included"
    },
    {
      aspect: "Marketing Reach",
      traditional: "Limited to one platform, manual social posting",
      ai: "Automatic multi-platform distribution + targeted ads"
    },
    {
      aspect: "Buyer Qualification",
      traditional: "Waste time with tire-kickers",
      ai: "AI matches only qualified, interested buyers"
    },
    {
      aspect: "Commission Fees",
      traditional: "6% = $12,000 on $200k property",
      ai: "$0 - One-time flat fee only"
    }
  ];

  const faqs = [
    {
      question: "How does the AI autolisting work?",
      answer: "Our AI technology uses advanced machine learning to analyze your property data, public records, and market conditions. It automatically generates professional property descriptions, captures aerial and street view imagery, performs comparative market analysis for pricing, and creates complete marketing materials. The entire process takes just 2-3 minutes, saving you 10+ hours of manual work and producing results that rival expensive professional services."
    },
    {
      question: "What's included in the AI autolisting package?",
      answer: "Everything you need to sell your land fast: AI-generated professional listing descriptions optimized for search engines, unlimited high-quality aerial and street view photos, automated property boundary mapping, intelligent pricing recommendations based on market data, multi-platform marketing distribution, targeted buyer matching, real-time analytics dashboard, priority listing placement on our platform, email and phone support, and most importantly - zero commission fees. We also offer a 30-day money-back guarantee if you're not completely satisfied."
    },
    {
      question: "How much does it cost?",
      answer: "Our AI autolisting package is a one-time flat fee that's a fraction of traditional realtor commissions. While realtors charge 6% (which is $12,000 on a $200,000 property), our service costs just a small one-time fee with no percentage-based commissions ever. You keep 100% of your sale price. The average seller saves over $12,000 in commission fees while actually selling faster than traditional methods. Contact us for current pricing tailored to your property."
    },
    {
      question: "Will AI-generated listings actually attract buyers?",
      answer: "Absolutely! Our AI is trained on thousands of successful land sales and knows exactly what buyers look for. In fact, AI-generated listings often outperform manually created ones because they include all relevant keywords for search engines, highlight the most important features, and use proven conversion language. Our data shows properties listed with our AI system receive 10x more views and sell 3-5x faster than traditional listings. The AI doesn't get tired, forget important details, or use generic descriptions - every listing is optimized for maximum impact."
    },
    {
      question: "Can I edit the AI-generated listing?",
      answer: "Yes! While our AI creates comprehensive, ready-to-publish listings, you have full control to edit any aspect - descriptions, photos, pricing, or features. Most sellers find the AI version perfect as-is, but we understand you might want to add personal touches or specific details only you know. The platform is designed for easy customization while maintaining the professional quality and SEO optimization."
    },
    {
      question: "How quickly will my property sell?",
      answer: "While every property is unique, our AI autolisting system dramatically accelerates the sales process. Our average time to sale is 14 days, compared to 90-180 days for traditional listings. The AI's intelligent buyer matching, multi-channel marketing, and optimized pricing help you reach the right buyers immediately. Many of our sellers receive multiple offers within the first week. The key factors are pricing (which our AI optimizes), exposure (which our marketing maximizes), and buyer targeting (which our matching system perfects)."
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "That's the beauty of our system - you don't need to be! The entire process is designed to be simple: enter your property address, let the AI do its work (takes 2-3 minutes), review the results, and click publish. That's it. We also provide phone and email support if you need any help. Many of our happiest customers are those who were intimidated by technology but found our system incredibly easy to use. If you can send an email, you can use our AI autolisting tool."
    },
    {
      question: "Is this better than hiring a realtor?",
      answer: "For land sales, yes - here's why: Realtors charge 6% commission ($12,000 on a $200k property) and most aren't land specialists. They often use generic marketing that doesn't highlight land-specific features buyers want. Our AI is trained specifically on land sales, creates specialized marketing materials, reaches a targeted audience of land buyers, and costs a fraction of commission fees. You get faster sales, more exposure, better-qualified buyers, and keep thousands more in your pocket. Plus, our AI works 24/7 and never takes vacation."
    },
    {
      question: "What types of land can I list?",
      answer: "All types! Our AI handles residential lots, agricultural land, recreational properties, commercial land, industrial sites, ranch land, timber land, vacant lots, and raw land. Whether you have 0.25 acres or 500+ acres, rural or urban, cleared or wooded - our AI adapts to create the perfect listing for your specific property type. The system recognizes different land uses and automatically emphasizes the features most relevant to potential buyers for that land type."
    },
    {
      question: "Do you guarantee my land will sell?",
      answer: "While no one can guarantee a sale (that depends on pricing, location, and market conditions), we do guarantee that our AI autolisting will give you the best possible chance to sell quickly. We're so confident that we offer a 30-day money-back guarantee. If you follow our AI's pricing recommendations and your property doesn't receive any serious inquiries within 30 days, we'll refund your listing fee. Our 90% + success rate speaks for itself - the AI works."
    }
  ];

  const painPoints = [
    {
      icon: Clock,
      problem: "Realtor Taking Forever?",
      solution: "Our AI creates your listing in 3 minutes vs. waiting weeks for a realtor"
    },
    {
      icon: DollarSign,
      problem: "Can't Afford 6% Commission?",
      solution: "Keep 100% of your sale price - save $12,000 on a $200k property"
    },
    {
      icon: Users,
      problem: "Not Getting Qualified Buyers?",
      solution: "AI matches your property with serious buyers actively searching"
    },
    {
      icon: TrendingUp,
      problem: "Property Sitting Too Long?",
      solution: "Sell 3-5x faster with AI-optimized pricing and multi-channel marketing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEO slug="sell-land-fast" />
      <SharedNavigation />

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMjljZjkiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-left">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-3 text-lg font-bold mb-6 shadow-lg animate-pulse inline-flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                NEW: AI Creates Your Listing in 3 Minutes
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Sell Land Fast with <span className="text-[#329cf9] bg-clip-text bg-gradient-to-r from-[#329cf9] to-cyan-500">AI Autolisting</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                Why spend weeks creating listings when AI can do it in minutes? Get professional photos, optimized descriptions, smart pricing, and targeted marketing - all automatically generated to sell your land 3-5x faster with zero commission fees.
              </p>

              {/* Key Stats - Compact */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white backdrop-blur-sm rounded-xl p-4 border-2 border-blue-100 hover:border-blue-300 shadow-md hover:shadow-xl transition-all">
                    <stat.icon className="w-8 h-8 text-[#329cf9] mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  onClick={handleCreateListing}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  Create AI Listing Now
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">No Credit Card Required</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">30-Day Guarantee</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Save $12,000+</span>
                </div>
              </div>
            </div>

            {/* Right Column - Screenshot Slider */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Slider Container */}
                <div className="relative overflow-hidden h-[500px] lg:h-[600px]">
                  <style>
                    {`
                      @keyframes slideshow {
                        0% { transform: translateY(0); }
                        15% { transform: translateY(0); }
                        16.66% { transform: translateY(-100%); }
                        31.66% { transform: translateY(-100%); }
                        33.33% { transform: translateY(-200%); }
                        48.33% { transform: translateY(-200%); }
                        50% { transform: translateY(-300%); }
                        65% { transform: translateY(-300%); }
                        66.66% { transform: translateY(-400%); }
                        81.66% { transform: translateY(-400%); }
                        83.33% { transform: translateY(-500%); }
                        98.33% { transform: translateY(-500%); }
                        100% { transform: translateY(-600%); }
                      }
                    `}
                  </style>
                  {/* Screenshot Slides - Using project screenshots */}
                  <div className="animate-[slideshow_36s_ease-in-out_infinite]">
                    {/* Screenshot 1 - Swipe Animation */}
                    <div className="bg-gray-50 h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative p-4">
                      <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1.5 rounded-lg shadow-md">
                        <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-blue-600" />
                          5 Clicks Listing Generator
                        </div>
                      </div>
                      <img
                        src="/finaaaal.gif"
                        alt="Swipe Property Offers"
                        className="max-w-[95%] max-h-[95%] object-contain rounded-lg"
                      />
                    </div>

                    {/* Screenshot 2 - Market Price (Teaser) */}
                    <div className="bg-gray-50 h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative p-4">
                      <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1.5 rounded-lg shadow-md">
                        <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          AI-Powered Pricing Strategy
                        </div>
                      </div>
                      <img
                        src="/2025-10-11_23-20-10.jpg"
                        alt="AI Pricing Strategy"
                        className="max-w-[95%] max-h-[95%] object-contain rounded-lg"
                      />
                    </div>

                    {/* Screenshot 3 - AI Creating Listing */}
                    <div className="bg-gray-50 h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative p-4">
                      <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1.5 rounded-lg shadow-md">
                        <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <Brain className="w-4 h-4 text-blue-600" />
                          Choose Your Pricing Strategy
                        </div>
                      </div>
                      <img
                        src="/2025-10-11_23-19-25 copy copy copy.jpg"
                        alt="AI Creating Listing"
                        className="max-w-[95%] max-h-[95%] object-contain rounded-lg"
                      />
                    </div>

                    {/* Screenshot 4 - Professional Property Gallery */}
                    <div className="bg-gray-50 h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative p-4">
                      <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1.5 rounded-lg shadow-md">
                        <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          Professional Property Gallery
                        </div>
                      </div>
                      <img
                        src="/2025-10-11_23-21-47 copy copy copy.jpg"
                        alt="Property Imagery Showcase"
                        className="max-w-[95%] max-h-[95%] object-contain rounded-lg"
                      />
                    </div>

                    {/* Screenshot 5 - Full Pricing View (Teaser) */}
                    <div className="bg-gray-50 h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative p-4">
                      <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1.5 rounded-lg shadow-md">
                        <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                           AI Creates Your Listing
                        </div>
                      </div>
                      <img
                        src="/2025-10-11_23-20-10.jpg"
                        alt="AI Pricing Strategy"
                        className="max-w-[95%] max-h-[95%] object-contain rounded-lg"
                      />
                    </div>

                    {/* Duplicate first slide for seamless loop */}
                    <div className="bg-gray-50 h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative p-4">
                      <div className="absolute top-6 left-6 z-10 bg-white px-3 py-1.5 rounded-lg shadow-md">
                        <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-blue-600" />
                          Swipe Through Offers
                        </div>
                      </div>
                      <img
                        src="/finaaaal.gif"
                        alt="Swipe Property Offers"
                        className="max-w-[95%] max-h-[95%] object-contain rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="px-6 py-4 flex flex-wrap gap-2 bg-gray-50 border-t border-gray-100">
                  <Badge className="bg-blue-100 text-blue-700 border-0 text-xs font-medium">
                    <Brain className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs font-medium">
                    <Zap className="w-3 h-3 mr-1" />
                    3-Min Setup
                  </Badge>
                  <Badge className="bg-gray-200 text-gray-700 border-0 text-xs font-medium">
                    <DollarSign className="w-3 h-3 mr-1" />
                    0% Commission
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-700 border-0 text-xs font-medium">
                    <Target className="w-3 h-3 mr-1" />
                    Smart Targeting
                  </Badge>
                </div>

                {/* Testimonial Badge */}
                <div className="mx-6 mt-4 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic">"The AI created a better listing than I could have. Sold in 8 days!"</p>
                  <p className="text-xs text-gray-600 mt-1">- Sarah M., Texas</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce">
                98% Success Rate
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideshow {
            0%, 30% {
              transform: translateY(0);
            }
            33%, 63% {
              transform: translateY(-33.333%);
            }
            66%, 96% {
              transform: translateY(-66.666%);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Tired of the Traditional Way to Sell Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop losing time and money with outdated methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="border-2 border-red-100 hover:border-red-200 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <point.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-red-600 mb-3">{point.problem}</h3>
                  <div className="border-t-2 border-green-500 pt-4 mt-4">
                    <p className="text-sm font-semibold text-green-700">{point.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How AI Autolisting Sells Your Land Faster
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced artificial intelligence handles everything from listing creation to buyer matching, giving you professional results in minutes instead of weeks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {aiFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#329cf9] to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleCreateListing}
              className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Try AI Autolisting Free
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Traditional vs AI Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Traditional Listing vs. AI Autolisting
            </h2>
            <p className="text-xl text-gray-600">
              See why thousands of land sellers are switching to AI
            </p>
          </div>

          <div className="space-y-6">
            {traditionalVsAI.map((comparison, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{comparison.aspect}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-xl p-5 border-2 border-red-200">
                    <div className="text-sm font-bold text-red-600 mb-2">Traditional Method</div>
                    <p className="text-gray-700">{comparison.traditional}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-5 border-2 border-green-200">
                    <div className="text-sm font-bold text-green-600 mb-2">AI Autolisting</div>
                    <p className="text-gray-700 font-semibold">{comparison.ai}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 text-center border-2 border-green-200">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Total Savings: $12,000+ in Fees + 40+ Hours</h3>
            <p className="text-xl mb-6 text-gray-700">Plus sell 3-5x faster with better results</p>
            <Button
              onClick={handleCreateListing}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-xl"
            >
              Start Saving Now
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Acreage Sale?
            </h2>
            <p className="text-xl text-gray-700">
              The most comprehensive land selling platform with zero commission fees
            </p>
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
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index < comparisonData.length - 1 ? "border-b border-gray-200" : ""}>
                    <td className="py-5 px-4 text-gray-700 font-medium">{row.feature}</td>
                    <td className="text-center py-5 px-4">
                      {typeof row.acreage === 'boolean' ? (
                        row.acreage ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-2xl">×</span>
                        )
                      ) : (
                        <span className="text-[#329cf9] font-bold text-lg">{row.acreage}</span>
                      )}
                    </td>
                    <td className="text-center py-5 px-4">
                      {typeof row.zillow === 'boolean' ? (
                        row.zillow ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-2xl">×</span>
                        )
                      ) : row.zillow === 'Limited' ? (
                        <span className="text-yellow-500 font-semibold">{row.zillow}</span>
                      ) : (
                        <span className="text-gray-600 font-medium">{row.zillow}</span>
                      )}
                    </td>
                    <td className="text-center py-5 px-4">
                      {typeof row.realtor === 'boolean' ? (
                        row.realtor ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-2xl">×</span>
                        )
                      ) : row.realtor === 'Limited' ? (
                        <span className="text-yellow-500 font-semibold">{row.realtor}</span>
                      ) : (
                        <span className="text-gray-600 font-medium">{row.realtor}</span>
                      )}
                    </td>
                    <td className="text-center py-5 px-4">
                      {typeof row.mls === 'boolean' ? (
                        row.mls ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-2xl">×</span>
                        )
                      ) : (
                        <span className="text-gray-600 font-medium">{row.mls}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-10">
              <Button
                onClick={handleCreateListing}
                className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-5 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                Start Selling Land Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sell Your Land in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From property address to sold in days, not months
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#329cf9] to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                    <Badge className="bg-green-100 text-green-800 font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.time}
                    </Badge>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleCreateListing}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all"
            >
              Get Started in 30 Seconds
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-400 text-gray-900 px-6 py-3 text-lg font-bold mb-6">
              Limited Time Offer
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              One Simple Price. Massive Savings.
            </h2>
            <p className="text-xl text-gray-700">
              Stop paying 6% commission fees. Keep your money.
            </p>
          </div>

          <Card className="border-4 border-yellow-400 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-10 lg:p-12">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  One-Time Fee
                </div>
                <div className="text-xl text-gray-600 mb-4">vs. $12,000+ in commissions</div>
                <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-700 font-bold">Save $12,000+ Per Sale</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {pricingBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  onClick={handleCreateListing}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-16 py-7 text-2xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all mb-4"
                >
                  <Sparkles className="w-7 h-7 mr-3" />
                  Get Started Now
                  <ArrowRight className="w-7 h-7 ml-3" />
                </Button>
                <p className="text-sm text-gray-500">30-Day Money-Back Guarantee • No Credit Card Required to Start</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg mb-4">Compare what you'd pay with a realtor:</p>
            <div className="inline-block bg-red-900/30 border-2 border-red-500 rounded-2xl px-8 py-4">
              <div className="text-red-300 text-sm mb-1">Traditional 6% Commission on $200,000 Property</div>
              <div className="text-4xl font-bold text-red-400">$12,000</div>
              <div className="text-red-300 text-sm mt-1">+ Weeks of Waiting + Less Exposure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Real Sellers, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands who've sold their land faster with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{testimonial.amount}</div>
                        <div className="text-sm text-gray-500">{testimonial.timeToSell}</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {testimonial.acres}
                    </Badge>
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about AI autolisting
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#329cf9] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      ?
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-11">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#329cf9] to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Sell Your Land 3-5x Faster?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of smart land sellers who've ditched expensive realtors and slow processes. Let AI create your professional listing in 3 minutes and start receiving offers from qualified buyers today.
          </p>

          <Button
            onClick={handleCreateListing}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-16 py-7 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-8"
          >
            <Sparkles className="w-7 h-7 mr-3" />
            Create AI Listing Free
            <ArrowRight className="w-7 h-7 ml-3" />
          </Button>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-yellow-300" />
              <span className="text-lg font-semibold">No Credit Card</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-yellow-300" />
              <span className="text-lg font-semibold">30-Day Guarantee</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-yellow-300" />
              <span className="text-lg font-semibold">Setup in 3 Minutes</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <Award className="w-10 h-10 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">90% +</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
            <div className="text-center">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">200+</div>
              <div className="text-sm opacity-80">Properties Sold</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">3-5x</div>
              <div className="text-sm opacity-80">Faster Sales</div>
            </div>
            <div className="text-center">
              <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold">$12k+</div>
              <div className="text-sm opacity-80">Avg. Savings</div>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-white/20">
            <p className="text-lg mb-4">Questions? Call us now:</p>
            <a href="tel:949-767-8885" className="text-3xl font-bold hover:underline flex items-center justify-center gap-2">
              <Phone className="w-8 h-8" />
              949-767-8885
            </a>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />

      <AddPropertyModal
        isOpen={addPropertyModalOpen}
        onClose={() => setAddPropertyModalOpen(false)}
        onSuccess={() => {
          setAddPropertyModalOpen(false);
        }}
      />
    </div>
  );
}
