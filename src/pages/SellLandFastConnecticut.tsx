import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, CircleCheck as CheckCircle, Shield, Send, Phone, Mail, Award, Star, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
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
  propertyType: z.string().min(1, 'Property type is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  reasonForSelling: z.string().min(1, 'Reason for selling is required'),
  askingPrice: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function SellLandFastConnecticut() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      timeline: 'Within 30 days',
      propertyType: 'Residential Land',
      reasonForSelling: 'Need cash quickly',
    },
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
        source: 'Connecticut Landing Page',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_inquiries', JSON.stringify(existingSubmissions));

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

  const connecticutStats = [
    { label: "24 Hours", value: "Cash Offer", icon: Clock },
    { label: "7-14 Days", value: "Fast Closing", icon: Zap },
    { label: "$0", value: "Fees or Commissions", icon: DollarSign },
    { label: "Any Condition", value: "We Buy As-Is", icon: Target }
  ];

  const benefits = [
    { title: "No realtor commissions - save 6%", description: "Keep more money in your pocket without paying traditional real estate fees" },
    { title: "Cash offers within 24 hours", description: "Get a fair market offer quickly without waiting for buyers" },
    { title: "Close in 7-14 days guaranteed", description: "Fast closing process on your timeline" },
    { title: "Buy land in any condition", description: "No repairs or improvements needed" },
    { title: "Handle all paperwork for you", description: "We manage the entire transaction process" },
    { title: "No hidden fees or costs", description: "The offer you see is what you get" }
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      title: "Land Owner",
      content: "Needed to sell my family's Connecticut land quickly after inheriting it. Got a fair cash offer in 24 hours and closed in 9 days. The entire process was smooth and professional!"
    },
    {
      name: "Michael Johnson",
      title: "Property Investor",
      content: "Working with Acreage Sale was the best decision I made. No hassles, no fees, and they handled all the complex Connecticut regulations. Highly recommend for fast land sales."
    }
  ];

  const faqs = [
    {
      question: "How quickly can you close on my Connecticut property?",
      answer: "We can typically close within 7-14 days of accepting our offer. For urgent situations, we may be able to close even faster. Our cash buying process eliminates financing delays that typically plague traditional Connecticut real estate transactions."
    },
    {
      question: "Do you buy land in all Connecticut counties?",
      answer: "Yes, we purchase land in all eight Connecticut counties including Fairfield, Hartford, New Haven, New London, Litchfield, Middlesex, Tolland, and Windham. Whether your property is near coastal areas, in rural towns, or suburban locations, we can help."
    },
    {
      question: "What about properties with septic system issues?",
      answer: "Connecticut has strict septic regulations, but we buy properties regardless of septic system condition. Whether you need repairs, upgrades to meet current codes, or don't have a system at all, we factor these considerations into our offer and handle everything."
    },
    {
      question: "Do you handle historic district properties?",
      answer: "Yes, we have experience with Connecticut's historic districts and preservation requirements. We understand the additional regulations and approval processes involved and can navigate these complexities to help you sell your land fast."
    },
    {
      question: "What about wetlands and environmental restrictions?",
      answer: "Connecticut has comprehensive inland wetlands regulations. We conduct proper environmental due diligence and can purchase properties with wetlands, vernal pools, or other environmental constraints. Our team understands Connecticut's Inland Wetlands and Watercourses Act."
    },
    {
      question: "Do you charge any fees or commissions?",
      answer: "No, we don't charge any fees, commissions, or closing costs. The cash offer we provide is the exact amount you'll receive at closing. This can save you thousands compared to traditional Connecticut real estate transactions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEO slug="sell-land-fast-connecticut" />
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Back to Home</span>
              </Link>
              <Link to="/properties">
                <Button variant="outline" className="hidden md:inline-flex">View All Properties</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-orange-900 via-blue-900 to-orange-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/30 text-orange-100 border-2 border-orange-400/50 px-6 py-3 text-base font-bold mb-8 inline-flex items-center gap-2 shadow-lg backdrop-blur-sm">
              <DollarSign className="w-5 h-5" />
              Cash Land Buyers
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight" style={{textShadow: '2px 4px 8px rgba(0,0,0,0.3)'}}>
              Sell Land Fast in <br />
              <span className="text-orange-400 inline-block transform hover:scale-105 transition-transform duration-300">Connecticut</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed font-light" style={{textShadow: '1px 2px 4px rgba(0,0,0,0.3)'}}>
              Get cash for your Connecticut land with our streamlined process. No fees, no commissions, and we can close in as little as 7 days with our own cash.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-7 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-orange-500"
              >
                Get My Cash Offer Now
              </Button>
              <Button variant="outline" className="bg-white/10 border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-10 py-7 text-xl font-bold rounded-2xl backdrop-blur-md shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                <a href="tel:949-767-8885">
                  <Phone className="w-6 h-6 mr-2" />
                  949-767-8885
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {connecticutStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 hover:border-orange-400/50">
                    <Icon className="w-10 h-10 text-orange-400 mb-3" />
                    <div className="text-2xl font-black mb-1">{stat.label}</div>
                    <div className="text-sm text-gray-200 font-medium">{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 px-6 py-3 text-base font-bold mb-6 inline-block shadow-lg">Connecticut Land Experts</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Comprehensive Connecticut Land Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">Deep expertise in Connecticut's unique real estate landscape</p>
          </div>
          <div className="prose prose-lg max-w-none">
            <Card className="border-0 shadow-2xl rounded-3xl mb-8 overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:shadow-orange-500/20 transition-all duration-300">
              <CardContent className="p-8 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">Sell Land Fast in Connecticut</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Looking to <strong>sell land fast in Connecticut</strong>? We are cash land buyers who purchase properties quickly and efficiently throughout the Constitution State. Whether you have residential lots in Fairfield County, farmland in Litchfield County, waterfront property along the Connecticut shoreline, or undeveloped acreage in the Quiet Corner, we can help you <strong>sell your land fast</strong> without the hassle of traditional real estate transactions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  We understand that selling land in Connecticut can be complicated and time-consuming. Connecticut's unique regulatory environment, including strict environmental regulations, historic preservation requirements, complex zoning laws, and inland wetlands protections, creates challenges for property owners who need quick sales. That's why we've streamlined our process to make it as simple as possible for property owners who need to <strong>sell land fast in Connecticut</strong>. Our team of experienced land buyers has deep knowledge of Connecticut's real estate markets and regulatory landscape, allowing us to close quickly with cash offers.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  The Connecticut land market is characterized by high property values, particularly in southwestern Connecticut near New York City, strong demand in coastal communities, preservation of agricultural and forested lands, and increasing interest in rural properties from remote workers. Whether you're selling residential land in affluent suburbs like Greenwich or Westport, commercial property in Hartford or New Haven, agricultural land in the Connecticut River Valley, or rural acreage in the northeastern hills, we have the expertise and capital to provide fair market offers and close quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl rounded-3xl mb-8 overflow-hidden bg-gradient-to-br from-white to-orange-50 hover:shadow-blue-500/20 transition-all duration-300">
              <CardContent className="p-8 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-orange-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Sell Land Fast in Connecticut</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  When you need to <strong>sell land fast</strong>, you want a buyer who can move quickly and efficiently. Traditional real estate transactions in Connecticut can take months to complete due to unique state requirements including title searches through Connecticut's complex land records, compliance with Connecticut Environmental Protection Act (CEPA) requirements, inland wetlands and watercourses permits, septic system inspections and approvals, historic preservation commission reviews, and local zoning compliance verification. Our streamlined process allows us to close in as little as 7-14 days, eliminating these delays.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Whether you inherited property, need quick cash, are facing foreclosure, want to liquidate a land investment, are dealing with divorce proceedings, need to settle an estate, or simply don't want to deal with the property anymore, we can help you <strong>sell land fast in Connecticut</strong>. Our process eliminates the need for real estate agents, lengthy marketing periods, uncertain closing dates, and the complicated paperwork that's unique to Connecticut land transactions.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Get a cash offer within 24 hours</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  The first step to <strong>sell land fast</strong> is getting a fair cash offer. We can provide you with a no-obligation cash offer within 24 hours of receiving your property information. Our offers are based on current Connecticut market conditions, comparable sales in your specific town or county, property characteristics including size and topography, access and utilities availability, zoning classification and development potential, wetlands and environmental constraints, proximity to major employment centers and transportation, and current demand in your local market.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Unlike traditional buyers who need bank financing and may back out due to appraisal issues or loan denial, we have the cash ready to close immediately. We understand Connecticut's unique land values, from ultra-high-value coastal properties in Fairfield County to affordable rural land in Windham County, and make competitive offers that reflect true market conditions. Our team has extensive experience with Connecticut's eight distinct counties, each with their own market dynamics, regulations, and buyer preferences.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">No fees or commissions</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  When you <strong>sell land fast</strong> to us in Connecticut, there are no real estate commissions, closing costs, or hidden fees. The offer we make is the exact amount you'll receive at closing. This can save you thousands of dollars compared to traditional real estate transactions where you'd pay 5-6% to real estate agents plus 2-3% in closing costs. Connecticut also has specific costs like conveyance taxes that we handle on your behalf.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  On a $300,000 land sale in Connecticut (a moderate price in many areas), you'd typically pay $15,000-$18,000 in commissions and $6,000-$9,000 in closing costs through traditional channels. Connecticut's conveyance tax adds additional costs. When you sell to us, you save all of these fees and get the full purchase price in your pocket. We handle all title work, conveyance taxes, recording fees, attorney fees, and other closing costs that are standard in Connecticut real estate transactions.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Close on your timeline</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  We understand that when you need to <strong>sell land fast in Connecticut</strong>, timing is important. We can close as quickly as 7-14 days or work with your preferred timeline. Our flexible closing process accommodates your specific needs and circumstances, whether you need emergency cash, want to coordinate with a 1031 exchange, need to settle an estate through Connecticut probate court, are dealing with divorce settlement timelines, or simply want to move on from the property.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Connecticut has specific requirements for land closings including comprehensive title examinations going back many years due to Connecticut's colonial-era land records, CEPA transfer forms and environmental assessments, inland wetlands documentation, septic system inspection reports if applicable, zoning compliance letters, and various municipal clearances. Our experienced team handles all of these requirements efficiently, working with Connecticut attorneys and title companies who understand the unique complexities of land transactions in the state, ensuring a smooth and fast closing process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl rounded-3xl mb-8 overflow-hidden bg-gradient-to-br from-white to-green-50 hover:shadow-orange-500/20 transition-all duration-300">
              <CardContent className="p-8 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">Connecticut Land Market Overview</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Connecticut's land market is one of the most complex and varied in the Northeast, characterized by proximity to major metropolitan areas, strong preservation ethic, diverse geography from coastal shoreline to rolling hills, and some of the nation's highest property values in certain areas. Understanding current market conditions is essential when you want to <strong>sell land fast in Connecticut</strong> and receive fair market value.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Southwestern Connecticut - Gold Coast</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Fairfield County, particularly the towns along Long Island Sound from Greenwich to Westport, represents some of the most valuable land in Connecticut. This area's proximity to New York City, excellent schools, and established wealth create extraordinarily high land values. Towns like Greenwich, Darien, New Canaan, and Westport command premium prices for residential land. If you need to <strong>sell land fast in southwestern Connecticut</strong>, you're dealing with a unique luxury market where cash buyers are essential for quick transactions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  However, this market also presents challenges including extremely strict zoning regulations, extensive historic districts, environmental restrictions along the coastline, and lengthy approval processes that can delay traditional sales. When you need to <strong>sell land fast</strong>, working with experienced cash buyers who understand these complexities ensures you can close quickly while receiving fair value that reflects the premium nature of Gold Coast properties.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Central Connecticut Urban Centers</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Hartford, New Haven, and surrounding communities in Hartford and New Haven counties offer more moderate land prices with strong potential for commercial and residential development. These areas benefit from being state economic centers with employment opportunities, universities, hospitals, and government facilities. Land near transportation corridors like I-84, I-91, and commuter rail lines holds particular value. If you need to <strong>sell land fast in central Connecticut</strong>, you're in markets with diverse buyer pools including developers, investors, and end users.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Central Connecticut also includes some of the state's most economically challenged areas, where land values may be lower but opportunities exist for investors who understand urban redevelopment. Our company specializes in evaluating properties throughout this diverse region and can provide quick cash offers for land in any condition, whether it's prime development property or challenged urban parcels requiring investment.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Eastern Connecticut - The Quiet Corner</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Windham and New London counties in eastern Connecticut offer the most affordable land in the state, with a rural character that's increasingly attractive to remote workers and those seeking lifestyle changes. This region includes preserved agricultural land, forested properties, properties near the University of Connecticut in Storrs, and coastal areas along the Thames River and Long Island Sound eastern shore. The Quiet Corner has seen increased interest since the pandemic as people seek larger properties and rural settings.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  If you need to <strong>sell land fast in rural Connecticut</strong>, you may find it challenging to locate qualified buyers through traditional real estate channels due to smaller buyer pools and properties that may require significant investment for development. Our company specializes in rural land acquisitions throughout Connecticut and can provide quick cash offers for agricultural land, forested properties, recreational land, and vacant acreage regardless of location or development status.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl rounded-3xl mb-8 overflow-hidden bg-gradient-to-br from-white to-orange-50 hover:shadow-blue-500/20 transition-all duration-300">
              <CardContent className="p-8 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">Understanding Connecticut's Unique Land Regulations</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Connecticut has some of the most complex and stringent land use regulations in the United States. Understanding these requirements is crucial when you <strong>sell land fast in Connecticut</strong>, and our expertise in navigating these regulations allows us to close quickly while ensuring full compliance.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">🌊</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Inland Wetlands and Watercourses</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Connecticut's Inland Wetlands and Watercourses Act is among the nation's strongest wetlands protection laws. All municipalities have inland wetlands agencies that regulate activities within wetlands and regulated upland review areas (typically 100 feet from wetlands). Many properties have some wetlands presence, which can significantly impact development potential and value. Vernal pools, intermittent streams, and seasonal wetlands all receive protection under Connecticut law.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  When you <strong>sell land fast in Connecticut</strong>, proper wetlands assessment is essential. We have relationships with Connecticut soil scientists and environmental consultants who can quickly evaluate wetlands presence and impacts. This expertise allows us to make informed offers that account for wetlands constraints while closing quickly. Traditional buyers often need months to navigate wetlands approvals, but our cash offers eliminate these delays.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">⚙️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Septic System Requirements</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Connecticut has strict regulations governing subsurface sewage disposal systems. Properties not connected to public sewers require septic systems that meet current codes, which have become increasingly stringent. Deep test pits must demonstrate adequate soil conditions, and many older properties have systems that don't meet current standards. Some areas have been designated as Nitrogen Management Zones with additional restrictions.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We buy Connecticut land regardless of septic system status. Whether your property has a failing system, doesn't meet current codes, has inadequate soils for conventional systems, or has never been tested, we can still provide cash offers. Our team understands Connecticut's septic regulations and can quickly evaluate the implications when you need to <strong>sell land fast</strong>. We factor repair or installation costs into our offers appropriately, allowing you to sell quickly without making expensive improvements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl rounded-3xl mb-8 overflow-hidden bg-gradient-to-br from-white to-blue-50 hover:shadow-orange-500/20 transition-all duration-300">
              <CardContent className="p-8 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-orange-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900">We Buy Land in Any Condition Throughout Connecticut</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Unlike traditional buyers who may require improvements or repairs, we buy land in any condition anywhere in Connecticut. Whether your property has access issues, title problems, environmental concerns, or other complications, we have the experience to handle complex transactions and help you <strong>sell land fast</strong>.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">🛣️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Access and Infrastructure Issues</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Many Connecticut properties face access challenges including landlocked parcels requiring easements, properties on private roads with maintenance disputes, seasonal access roads, properties requiring right-of-way across neighboring land, and inadequate road frontage for zoning compliance. Connecticut's small town sizes and colonial-era development patterns create unique access situations that can deter traditional buyers.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  We have extensive experience with Connecticut access issues and can evaluate easement situations, private road agreements, and landlocked properties. When you <strong>sell land fast in Connecticut</strong> to us, you don't need to resolve access disputes or obtain new easements before closing. We factor these considerations into our offers and handle resolution after purchase, allowing you to sell quickly without delays.
                </p>

                <div className="flex items-center gap-3 mt-10 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">⚖️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Title and Legal Complications</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Connecticut's land records extend back to colonial times, and many properties have complex title histories. Common issues include ancient restrictions in deeds that may be unenforceable, gaps in the chain of title from the 18th or 19th century, estate situations requiring probate, tax liens or municipal judgments, properties with multiple heirs and unclear ownership, and boundary disputes with neighbors. Connecticut's strict real estate laws and attorney requirements for closings mean these issues can significantly delay traditional sales.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our team includes professionals who understand Connecticut real estate law and can work with title companies and attorneys to resolve complex situations. We can purchase properties with title defects, estate situations, heir property issues, and other legal complications. This expertise allows us to buy properties that traditional buyers avoid and help you <strong>sell land fast</strong> even with challenging title situations. We work with experienced Connecticut real estate attorneys who can navigate probate, clear title defects, and resolve heir property situations efficiently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 text-sm font-semibold mb-4 inline-block">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Why Choose Acreage Sale to Sell Land Fast?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Skip traditional real estate hassles and get cash for your land quickly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-orange-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500/30 text-orange-100 border-2 border-orange-400/50 px-4 py-2 text-sm font-semibold mb-4 inline-block backdrop-blur-sm">Testimonials</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6" style={{textShadow: '2px 4px 8px rgba(0,0,0,0.3)'}}>
              Success Stories from Connecticut Land Sellers
            </h2>
            <p className="text-xl text-gray-200 font-light" style={{textShadow: '1px 2px 4px rgba(0,0,0,0.3)'}}>
              Real results from real property owners
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-orange-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic text-lg">"{testimonial.content}"</p>
                  <div className="border-t border-gray-200 pt-6">
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{testimonial.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold mb-4 inline-block">FAQ</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Common questions about selling land fast in Connecticut
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-1 bg-white">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Sell Your Connecticut Land Fast?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill up the form to get a cash offer for your land in Connecticut
            </p>
          </div>

          {success ? (
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We've received your Connecticut property information and will contact you within 24 hours with cash offers.
                </p>
                <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h4>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="text-blue-800">Our Connecticut team reviews your property details</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <span className="text-blue-800">We conduct market analysis and valuation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <span className="text-blue-800">You receive multiple no-obligation cash offers</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg border-2 border-[#329cf9]">
                      Return to Home
                    </Button>
                  </Link>
                  <Link to="/properties">
                    <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
                      Browse Properties
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        {...form.register('firstName')}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your first name"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        {...form.register('lastName')}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your last name"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        {...form.register('email')}
                        type="email"
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        {...form.register('phone')}
                        type="tel"
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address (Connecticut) *
                    </label>
                    <Input
                      {...form.register('propertyAddress')}
                      className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter the property address or general location in Connecticut"
                    />
                    {form.formState.errors.propertyAddress && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.propertyAddress.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Size *
                      </label>
                      <Input
                        {...form.register('propertySize')}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., 5 acres, 0.25 acres, 10 lots"
                      />
                      {form.formState.errors.propertySize && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.propertySize.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type *
                      </label>
                      <select
                        {...form.register('propertyType')}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full px-3"
                      >
                        <option value="Residential Land">Residential Land</option>
                        <option value="Agricultural Land">Agricultural Land</option>
                        <option value="Commercial Land">Commercial Land</option>
                        <option value="Industrial Land">Industrial Land</option>
                        <option value="Waterfront Property">Waterfront Property</option>
                        <option value="Forested Land">Forested Land</option>
                        <option value="Recreational Land">Recreational Land</option>
                        <option value="Raw Land">Raw Land</option>
                        <option value="Other">Other</option>
                      </select>
                      {form.formState.errors.propertyType && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.propertyType.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline *
                      </label>
                      <select
                        {...form.register('timeline')}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full px-3"
                      >
                        <option value="ASAP (within 7 days)">ASAP (within 7 days)</option>
                        <option value="Within 30 days">Within 30 days</option>
                        <option value="Within 60 days">Within 60 days</option>
                        <option value="Within 90 days">Within 90 days</option>
                        <option value="Flexible timeline">Flexible timeline</option>
                      </select>
                      {form.formState.errors.timeline && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.timeline.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asking Price (Optional)
                      </label>
                      <Input
                        {...form.register('askingPrice')}
                        className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., $50,000 or leave blank"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Selling *
                    </label>
                    <select
                      {...form.register('reasonForSelling')}
                      className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full px-3"
                    >
                      <option value="Need cash quickly">Need cash quickly</option>
                      <option value="Inherited property">Inherited property</option>
                      <option value="Relocating">Relocating</option>
                      <option value="Investment exit">Investment exit</option>
                      <option value="Divorce settlement">Divorce settlement</option>
                      <option value="Business liquidation">Business liquidation</option>
                      <option value="Financial hardship">Financial hardship</option>
                      <option value="Other">Other</option>
                    </select>
                    {form.formState.errors.reasonForSelling && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.reasonForSelling.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      {...form.register('additionalInfo')}
                      rows={4}
                      className="w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                      placeholder="Tell us anything else about your property or situation that might be helpful..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-[#329cf9]"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-6 h-6" />
                        <span>Get My Connecticut Cash Offers</span>
                      </div>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Your information is secure and will never be shared with third parties
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">
            Ready to Sell Your Connecticut Land Fast?
          </h2>
          <p className="text-xl mb-8 text-black max-w-2xl mx-auto">
            Get your no-obligation cash offer today and close on your timeline
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Get My Cash Offer Now
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-gray-50 border-gray-200 rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-black" />
                <h3 className="font-bold mb-2 text-black">Call for Immediate Offer</h3>
                <p className="text-black font-bold text-lg">949-767-8885</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200 rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-black" />
                <h3 className="font-bold mb-2 text-black">Email Us</h3>
                <p className="text-black font-bold text-lg">info@acreagesales.com</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200 rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-black" />
                <h3 className="font-bold mb-2 text-black">About Acreage Sale</h3>
                <p className="text-sm text-black">
                  Specialized Connecticut land buyers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-white text-black py-12 relative border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <AcreageSaleLogo className="w-40 mx-auto mb-6" />
            <p className="text-black mb-6">
              We at Acreage Sale are a group of real estate investors specializing in helping property owners sell land fast across the United States. We have years of experience purchasing all types of land, from small residential lots to large commercial parcels. Our mission is to provide property owners with a fast, fair, and hassle-free way to sell their land.
            </p>
            <div className="flex justify-center gap-8 text-sm text-black">
              <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <Link to="/properties" className="hover:text-gray-600 transition-colors">Properties</Link>
              <Link to="/about" className="hover:text-gray-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    );
}
