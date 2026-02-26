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

export function SellLandFastColorado() {
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
        source: 'Colorado Landing Page',
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

  const coloradoStats = [
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
      name: "Jennifer Martinez",
      title: "Land Owner",
      content: "Needed to sell my inherited land in Colorado quickly. Got a fair cash offer in 24 hours and closed in 10 days. Couldn't be happier!"
    },
    {
      name: "Robert Chen",
      title: "Property Investor",
      content: "The process was incredibly smooth. No hassles, no fees, and they handled everything. Highly recommend for anyone who needs to sell land fast."
    }
  ];

  const faqs = [
    {
      question: "How quickly can you close on my Colorado property?",
      answer: "We can typically close within 7-14 days of accepting our offer. For urgent situations, we may be able to close even faster. Our cash buying process eliminates financing delays and allows for rapid closings."
    },
    {
      question: "Do you buy mountain land and high-altitude properties in Colorado?",
      answer: "Yes, we purchase land throughout Colorado including mountain properties, ski area land, and high-altitude parcels. We understand the unique challenges of mountain land including access, utilities, and seasonal considerations."
    },
    {
      question: "How do you handle water rights with Colorado land purchases?",
      answer: "Water rights in Colorado follow the 'prior appropriation' doctrine. We conduct thorough due diligence on all water rights, including well permits, ditch rights, and augmentation plans. Our team has experience with Colorado water law complexities."
    },
    {
      question: "What about properties in flood zones or wildfire areas?",
      answer: "We buy land in flood zones and wildfire-prone areas throughout Colorado. Our offers account for these environmental factors and associated risks. We handle all necessary insurance and disclosure requirements for these properties."
    },
    {
      question: "Do you charge any fees or commissions for Colorado land sales?",
      answer: "No, we don't charge any fees, commissions, or closing costs. The cash offer we provide is the exact amount you'll receive at closing. This can save you thousands compared to traditional real estate transactions in Colorado's competitive market."
    },
    {
      question: "What types of Colorado land do you purchase?",
      answer: "We purchase all types of Colorado land including residential lots, commercial parcels, industrial sites, agricultural land, ranch properties, mountain land, ski area properties, and raw acreage. Size, location, and condition don't matter."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEO slug="sell-land-fast-colorado" />
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
              <span className="text-orange-400 inline-block transform hover:scale-105 transition-transform duration-300">Colorado</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed font-light" style={{textShadow: '1px 2px 4px rgba(0,0,0,0.3)'}}>
              Get cash for your Colorado land with our streamlined process. No fees, no commissions, and we can close in as little as 7 days with our own cash.
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
              {coloradoStats.map((stat, index) => {
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

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <Card className="border-0 shadow-lg rounded-2xl mb-8">
              <CardContent className="p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sell Land Fast in Colorado</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Looking to <strong>sell land fast in Colorado</strong>? We are cash land buyers who purchase properties quickly and efficiently throughout the Centennial State. Whether you have raw acreage in the Eastern Plains, mountain property near ski resorts, developed lots in the Front Range, or ranch land in Western Colorado, we can help you <strong>sell your land fast</strong> without the hassle of traditional real estate transactions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  We understand that selling land in Colorado can be complicated and time-consuming. Colorado's unique geography, from the Rocky Mountains to the High Plains, creates diverse land types with varying regulations, water rights, and market conditions. That's why we've streamlined our process to make it as simple as possible for property owners who need to <strong>sell land fast in Colorado</strong>. Our team of experienced land buyers has deep knowledge of Colorado's real estate markets and can close quickly with cash offers.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  The Colorado land market has seen significant growth in recent years, driven by population increases in the Front Range, expansion of outdoor recreation tourism, renewable energy development, and sustained interest from out-of-state buyers. Whether you're selling residential land in booming cities like Denver and Colorado Springs, agricultural land in rural counties, or mountain property in resort communities, we have the expertise and capital to provide fair market offers and close quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl mb-8">
              <CardContent className="p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How to Sell Land Fast in Colorado</h2>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  When you need to <strong>sell land fast</strong>, you want a buyer who can move quickly and efficiently. Traditional real estate transactions in Colorado can take months to complete due to unique state requirements including water rights transfers, mineral rights verification, special district assessments, and complex zoning regulations. Our streamlined process allows us to close in as little as 7-14 days, eliminating these delays.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Whether you inherited property, need quick cash, are facing foreclosure, want to liquidate a land investment, or simply don't want to deal with the property anymore, we can help you <strong>sell land fast in Colorado</strong>. Our process eliminates the need for real estate agents, lengthy marketing periods, uncertain closing dates, and complicated paperwork that's unique to Colorado land transactions.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Get a cash offer within 24 hours</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  The first step to <strong>sell land fast</strong> is getting a fair cash offer. We can provide you with a no-obligation cash offer within 24 hours of receiving your property information. Our offers are based on current Colorado market conditions, comparable sales in your area, property characteristics, access and utilities, zoning and development potential, water rights value, and environmental factors.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Unlike traditional buyers who need bank financing and may back out due to appraisal issues or loan denial, we have the cash ready to close immediately. We understand Colorado's unique land values, from high-dollar mountain properties to affordable Eastern Plains acreage, and make competitive offers that reflect true market conditions.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">No fees or commissions</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  When you <strong>sell land fast</strong> to us in Colorado, there are no real estate commissions, closing costs, or hidden fees. The offer we make is the exact amount you'll receive at closing. This can save you thousands of dollars compared to traditional real estate transactions where you'd pay 6% to real estate agents plus 2-3% in closing costs.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  On a $200,000 land sale in Colorado, you'd typically pay $12,000 in commissions and $4,000-$6,000 in closing costs through traditional channels. When you sell to us, you save all of these fees and get the full purchase price in your pocket. We handle all title work, transfer taxes, recording fees, and other closing costs that are standard in Colorado real estate transactions.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Close on your timeline</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  We understand that when you need to <strong>sell land fast in Colorado</strong>, timing is important. We can close as quickly as 7-14 days or work with your preferred timeline. Our flexible closing process accommodates your specific needs and circumstances, whether you need emergency cash, want to coordinate with a 1031 exchange, need to settle an estate, or simply want to move on from the property.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Colorado has specific requirements for land closings including water rights transfer documentation, special district disclosure and transfer, mineral rights verification, title insurance policies, and state-mandated disclosures. Our experienced team handles all of these requirements efficiently, ensuring a smooth and fast closing process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl mb-8">
              <CardContent className="p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Colorado Land Market Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Colorado's land market is one of the most dynamic in the United States, characterized by strong population growth, diverse economic drivers, and increasing demand from both in-state and out-of-state buyers. Understanding current market conditions is essential when you want to <strong>sell land fast in Colorado</strong> and receive fair market value.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Front Range Growth Corridor</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  The Front Range urban corridor, stretching from Fort Collins to Pueblo, contains approximately 85% of Colorado's population and continues to experience rapid growth. Cities like Denver, Aurora, Colorado Springs, Fort Collins, and Boulder are expanding, creating strong demand for residential and commercial development land. If you need to <strong>sell land fast in Colorado's</strong> Front Range, you're in one of the state's hottest real estate markets.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Land values in the Front Range have appreciated significantly, with some areas seeing 20-30% annual increases. However, this market can be volatile and timing is crucial. When you need to <strong>sell land fast</strong>, working with experienced cash buyers ensures you capture current market value without waiting months for the right buyer to emerge.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Mountain Resort Communities</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Colorado's mountain resort areas, including Aspen, Vail, Breckenridge, Telluride, and Steamboat Springs, represent some of the highest-value land markets in the state. These areas attract wealthy buyers seeking second homes, vacation properties, and investment opportunities. However, the luxury market can be slow and seasonal, making it challenging to <strong>sell land fast</strong> through traditional channels.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Mountain land presents unique challenges including limited access during winter months, strict building regulations to protect viewsheds and environment, wildfire mitigation requirements, avalanche zone restrictions, and complex water and septic systems. Our experience with mountain properties throughout Colorado means we can quickly evaluate these factors and make competitive offers to help you <strong>sell land fast</strong>.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Western Slope and Rural Colorado</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Western Colorado, including Grand Junction, Montrose, and surrounding areas, offers more affordable land options with strong agricultural heritage and growing recreation economy. The Eastern Plains provide large-scale agricultural and ranch properties. While these areas have smaller buyer pools than the Front Range, they offer unique investment opportunities for those who understand rural Colorado markets.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  If you need to <strong>sell land fast in rural Colorado</strong>, you may find it challenging to locate qualified buyers through traditional real estate channels. Our company specializes in rural land acquisitions throughout Colorado and can provide quick cash offers for agricultural land, ranch properties, recreational land, and vacant acreage regardless of location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl mb-8">
              <CardContent className="p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Understanding Colorado Water Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Water rights are one of the most complex and valuable aspects of Colorado land ownership. Colorado follows the "prior appropriation" doctrine, often summarized as "first in time, first in right." This system is fundamentally different from riparian rights states and can significantly impact land value. Understanding water rights is crucial when you <strong>sell land fast in Colorado</strong>.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Types of Colorado Water Rights</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Colorado recognizes several types of water rights that may be associated with land: Surface water rights from rivers, streams, and irrigation ditches; Well permits for groundwater extraction; Augmentation plans to replace out-of-priority depletions; Ditch rights and shares in mutual ditch companies; Reservoir storage rights; and In-stream flow rights for environmental purposes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  When you <strong>sell land fast in Colorado</strong>, properly documenting and transferring water rights is essential. We have extensive experience with Colorado water law and work with water attorneys to ensure all rights transfer correctly and legally. This expertise allows us to close quickly while protecting both parties' interests.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Water Rights Valuation</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Water rights can represent significant value in Colorado land transactions, sometimes worth more than the land itself. Senior water rights with early priority dates, agricultural rights that can be converted to municipal use, well permits in over-appropriated basins, and augmentation plan inclusion all add substantial value to Colorado property.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our team understands how to properly value water rights associated with your land. Whether you have agricultural irrigation rights, domestic well permits, or valuable senior water rights, we ensure these assets are properly evaluated when you <strong>sell land fast in Colorado</strong>. We conduct thorough due diligence on all water rights, including verification with the Division of Water Resources, review of decreed rights and priority dates, analysis of historical use and augmentation requirements, and assessment of transferability and change of use potential.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl mb-8">
              <CardContent className="p-8 lg:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">We Buy Land in Any Condition Throughout Colorado</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Unlike traditional buyers who may require improvements or repairs, we buy land in any condition anywhere in Colorado. Whether your property has access issues, title problems, environmental concerns, or other complications, we have the experience to handle complex transactions and help you <strong>sell land fast</strong>.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Access and Utility Challenges</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Many Colorado properties face access challenges including seasonal roads, four-wheel-drive-only access, landlocked parcels requiring easements, and roads maintained by private associations. These issues can deter traditional buyers but don't prevent us from making competitive offers. We have experience acquiring land with all types of access situations and can quickly evaluate the implications when you need to <strong>sell land fast in Colorado</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Utility availability varies greatly across Colorado. Mountain and rural properties may lack connection to public water, sewer, electricity, and natural gas. We buy properties regardless of utility status and factor these considerations into our offers appropriately. When you <strong>sell land fast</strong> to us, you don't need to worry about connecting utilities or making infrastructure improvements.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Environmental and Regulatory Issues</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  Colorado has strict environmental regulations that can complicate land sales. Properties in wildfire-prone areas face additional mitigation requirements. Land in avalanche zones, steep slopes, or floodplains may have building restrictions. Environmental contamination from past mining, oil and gas operations, or other industrial uses can create liability concerns that prevent traditional sales.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  We have experience with all types of environmental and regulatory challenges. Our team includes professionals who understand Colorado environmental law, work with remediation specialists when needed, and can structure transactions to appropriately address these issues. This expertise allows us to buy properties that other buyers avoid and help you <strong>sell land fast</strong> even with environmental concerns.
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
              Success Stories from Colorado Land Sellers
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
              Common questions about selling land fast in Colorado
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
              Ready to Sell Your Colorado Land Fast?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill up the form to get a cash offer for your land in Colorado
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
                  We've received your Colorado property information and will contact you within 24 hours with cash offers.
                </p>
                <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h4>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="text-blue-800">Our Colorado team reviews your property details</span>
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
                      Property Address (Colorado) *
                    </label>
                    <Input
                      {...form.register('propertyAddress')}
                      className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter the property address or general location in Colorado"
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
                        <option value="Recreational Land">Recreational Land</option>
                        <option value="Mountain Land">Mountain Land</option>
                        <option value="Ranch Property">Ranch Property</option>
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
                        <span>Get My Colorado Cash Offers</span>
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
            Ready to Sell Your Colorado Land Fast?
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
                  Specialized Colorado land buyers
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
