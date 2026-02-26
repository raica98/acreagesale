import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Landmark, Ship } from 'lucide-react';
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
  propertyType: z.string().min(1, 'Property type is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  reasonForSelling: z.string().min(1, 'Reason for selling is required'),
  askingPrice: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function SellLandFastDelaware() {
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
        state: 'Delaware',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_delaware_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_delaware_inquiries', JSON.stringify(existingSubmissions));

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

  const delawareStats = [
    { label: "Avg. Land Value", value: "$8,500/acre", trend: "+18%", icon: DollarSign },
    { label: "Active Buyers", value: "200+", trend: "High Demand", icon: Users },
    { label: "Avg. Sale Time", value: "12 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "98%", trend: "Proven Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Wilmington", population: "70,000+", growth: "+2.3%", avgPrice: "$12,500/acre" },
    { name: "Dover", population: "38,000+", growth: "+1.9%", avgPrice: "$9,200/acre" },
    { name: "Newark", population: "34,000+", growth: "+2.8%", avgPrice: "$11,800/acre" },
    { name: "Rehoboth Beach", population: "1,500+", growth: "+4.5%", avgPrice: "$45,000/acre" },
    { name: "Middletown", population: "23,000+", growth: "+5.2%", avgPrice: "$15,000/acre" },
    { name: "Smyrna", population: "12,000+", growth: "+3.1%", avgPrice: "$8,900/acre" },
    { name: "Lewes", population: "3,200+", growth: "+3.8%", avgPrice: "$38,000/acre" },
    { name: "Bethany Beach", population: "1,100+", growth: "+4.2%", avgPrice: "$42,000/acre" },
    { name: "Milford", population: "11,000+", growth: "+2.4%", avgPrice: "$7,500/acre" },
    { name: "Seaford", population: "8,000+", growth: "+1.7%", avgPrice: "$6,800/acre" }
  ];

  const economicDrivers = [
    {
      title: "Financial Services Hub",
      description: "Delaware is home to more than half of all publicly traded companies in the U.S. and 65% of Fortune 500 companies due to its favorable corporate laws. Major financial institutions including Bank of America, Capital One, and JPMorgan Chase maintain significant operations in the state.",
      impact: "High-income employment and corporate investment",
      locations: ["Wilmington", "Newark", "Dover"],
      icon: Landmark
    },
    {
      title: "Strategic East Coast Location",
      description: "Positioned between Philadelphia, Baltimore, and Washington DC, Delaware offers unparalleled access to major metro areas. The state's location makes it ideal for logistics, distribution, and businesses serving the Northeast corridor.",
      impact: "Strong commercial and industrial demand",
      locations: ["I-95 Corridor", "Port of Wilmington", "New Castle County"],
      icon: MapPin
    },
    {
      title: "Beach Tourism Economy",
      description: "Delaware's Atlantic coastline attracts millions of visitors annually to popular destinations like Rehoboth Beach, Bethany Beach, and Dewey Beach. The tourism sector drives demand for vacation homes, rental properties, and commercial development.",
      impact: "Premium coastal property values",
      locations: ["Sussex County", "Coastal Corridor", "Beach Towns"],
      icon: Sun
    },
    {
      title: "Agriculture and Poultry",
      description: "Despite its small size, Delaware has a thriving agricultural sector, particularly poultry production. The state is a major producer of broiler chickens and has extensive agricultural operations supporting rural land values.",
      impact: "Stable rural land market",
      locations: ["Sussex County", "Kent County", "Rural Areas"],
      icon: TreePine
    }
  ];

  const landTypes = [
    {
      type: "Coastal Development Land",
      description: "Delaware's beaches are among the most popular on the East Coast. Coastal development land commands premium prices due to tourism demand, vacation home market, and limited supply in prime locations.",
      priceRange: "$30,000 - $150,000 per acre",
      typicalSize: "0.25-10 acres",
      bestAreas: ["Rehoboth Beach", "Bethany Beach", "Lewes", "Fenwick Island"],
      income: "Vacation rental potential",
      features: ["Beach proximity", "Tourism economy", "Second-home market", "Rental income"],
      icon: Sun
    },
    {
      type: "Residential Development Land",
      description: "Delaware's growing population and proximity to major metros create strong demand for residential development. New Castle County leads growth, but Kent and Sussex counties are expanding rapidly.",
      priceRange: "$8,000 - $30,000 per acre",
      typicalSize: "5-100 acres",
      bestAreas: ["Middletown", "Newark", "Smyrna", "Dover area"],
      income: "Development profits",
      features: ["Metro access", "School districts", "Utilities", "Growth corridors"],
      icon: Building
    },
    {
      type: "Agricultural Land",
      description: "Delaware's agricultural sector, particularly poultry and grain production, supports a strong market for farmland. Agricultural preservation programs help maintain land values while offering tax benefits.",
      priceRange: "$5,000 - $15,000 per acre",
      typicalSize: "20-300 acres",
      bestAreas: ["Kent County", "Sussex County", "Western New Castle"],
      income: "$200-600/acre annually",
      features: ["Fertile soil", "Preservation programs", "Tax benefits", "Farm income"],
      icon: TreePine
    },
    {
      type: "Commercial/Industrial Land",
      description: "Delaware's business-friendly environment and strategic location create demand for commercial and industrial sites. The I-95 corridor and port access make industrial land particularly valuable.",
      priceRange: "$10,000 - $60,000 per acre",
      typicalSize: "2-50 acres",
      bestAreas: ["I-95 corridor", "Port areas", "Wilmington", "Dover"],
      income: "Long-term lease potential",
      features: ["Transportation access", "No sales tax advantage", "Corporate presence", "Logistics"],
      icon: Factory
    },
    {
      type: "Waterfront Property",
      description: "Delaware's extensive coastline, bays, and inland waterways create demand for waterfront properties. From the Delaware Bay to inland ponds and creeks, water access adds significant value.",
      priceRange: "$20,000 - $100,000 per acre",
      typicalSize: "1-50 acres",
      bestAreas: ["Delaware Bay", "Indian River Bay", "Coastal areas", "Canal properties"],
      income: "Premium resale value",
      features: ["Water access", "Recreation", "Limited supply", "High demand"],
      icon: Ship
    },
    {
      type: "Investment/Recreational Land",
      description: "Smaller parcels for investment, hunting, or weekend retreats remain popular. Delaware's mild climate and accessibility from major cities make recreational land attractive to regional buyers.",
      priceRange: "$3,000 - $12,000 per acre",
      typicalSize: "5-100 acres",
      bestAreas: ["Western Kent County", "Western Sussex County", "Forested areas"],
      income: "Hunting leases $10-30/acre",
      features: ["Wildlife", "Privacy", "Regional access", "Appreciation potential"],
      icon: Mountain
    }
  ];

  const marketTrends = [
    {
      trend: "Rapid Population Growth",
      description: "Delaware's population has grown significantly, particularly in New Castle County and coastal areas. The state attracts residents from higher-tax states seeking Delaware's favorable tax climate and quality of life.",
      impact: "+2.1% annually",
      timeframe: "2020-2024",
      implications: ["Housing shortage", "Rising land values", "Development pressure"]
    },
    {
      trend: "Remote Work Migration",
      description: "The rise of remote work has increased Delaware's appeal to professionals from expensive Northeast markets. Buyers seek lower costs while maintaining access to major cities, driving demand for residential land.",
      impact: "+25% out-of-state buyers",
      timeframe: "2021-2024",
      implications: ["Higher price points", "Cash buyer increase", "Competitive market"]
    },
    {
      trend: "Beach Property Premium",
      description: "Coastal Delaware property values continue rising as beach destinations gain popularity. Limited developable coastal land and strong vacation rental markets support premium pricing.",
      impact: "+30% coastal appreciation",
      timeframe: "5-year trend",
      implications: ["Record coastal prices", "Investment demand", "Limited inventory"]
    },
    {
      trend: "No Sales Tax Advantage",
      description: "Delaware's lack of state sales tax makes it attractive for retail and commercial development. This competitive advantage drives demand for commercial land, particularly near the Maryland and Pennsylvania borders.",
      impact: "Strong commercial demand",
      timeframe: "Long-term structural",
      implications: ["Border area development", "Retail concentration", "Job growth"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "Highest Transfer Tax in Nation",
      description: "Delaware's 4% transfer tax (2% buyer, 2% seller) plus local taxes mean working with cash buyers who close quickly minimizes carrying costs. Fast sales reduce the total time you're responsible for property taxes and maintenance.",
      savings: "Eliminate extended holding costs",
      icon: DollarSign
    },
    {
      title: "Small State, Big Demand",
      description: "Delaware's small size (only 1,954 square miles) creates scarcity value. Limited land supply combined with growing demand from multiple buyer segments creates a seller's market with strong pricing.",
      savings: "Premium pricing potential",
      icon: Target
    },
    {
      title: "Multiple Buyer Markets",
      description: "Proximity to Philadelphia, Baltimore, and DC means Delaware land attracts buyers from multiple major metros. This diverse buyer pool increases competition and supports strong sale prices.",
      savings: "Competitive offer environment",
      icon: Users
    },
    {
      title: "Business-Friendly Legal Climate",
      description: "Delaware's well-established property laws and efficient court system make land transactions straightforward. Clear legal precedents and streamlined processes benefit sellers with faster, smoother closings.",
      savings: "Reduced legal complexity",
      icon: Shield
    }
  ];

  const buyerProfiles = [
    {
      type: "Coastal Developers & Investors",
      description: "Developers and investors focused on Delaware's beach communities seek land for vacation homes, rental properties, and resort developments. Strong tourism economy supports premium pricing.",
      typical_purchase: "$500K - $10M",
      decision_speed: "2-6 weeks",
      preferred_size: "0.25-20 acres",
      key_factors: ["Beach proximity", "Tourism traffic", "Rental potential", "Zoning"],
      percentage: "30%"
    },
    {
      type: "Residential Developers",
      description: "Builders creating communities in growing areas like Middletown, Newark, and Dover area. Delaware's population growth and migration from expensive markets drive strong demand.",
      typical_purchase: "$300K - $5M",
      decision_speed: "3-8 weeks",
      preferred_size: "10-150 acres",
      key_factors: ["Growth corridors", "Utilities", "School districts", "Demographics"],
      percentage: "25%"
    },
    {
      type: "Agricultural Operations",
      description: "Farming operations, particularly poultry producers and grain farmers, seeking to expand. Delaware's strong agricultural sector and preservation programs support active farmland market.",
      typical_purchase: "$150K - $3M",
      decision_speed: "2-4 weeks",
      preferred_size: "20-300 acres",
      key_factors: ["Soil quality", "Water access", "Existing structures", "Preservation status"],
      percentage: "20%"
    },
    {
      type: "Out-of-State Investors",
      description: "Buyers from higher-tax states purchasing Delaware land for tax advantages, investment appreciation, or future development. Many seek to establish Delaware residency for tax benefits.",
      typical_purchase: "$100K - $2M",
      decision_speed: "1-4 weeks",
      preferred_size: "1-100 acres",
      key_factors: ["Appreciation potential", "Tax advantages", "Location", "Development rights"],
      percentage: "25%"
    }
  ];

  const regionalMarkets = [
    {
      region: "New Castle County (Northern Delaware)",
      description: "Delaware's most populous and developed county includes Wilmington, Newark, and rapidly growing Middletown. Home to major corporate headquarters and the University of Delaware, this region offers the highest land values and strongest appreciation.",
      population: "560,000+",
      key_industries: ["Financial Services", "Corporate HQ", "Healthcare", "Education"],
      land_values: "$10,000-$35,000/acre",
      growth_rate: "+2.8% annually",
      advantages: [
        "Highest income levels in state",
        "Major employment centers",
        "Best schools in Delaware",
        "Proximity to Philadelphia/Baltimore",
        "Strong corporate presence"
      ],
      challenges: [
        "Highest land costs",
        "Strict development regulations",
        "Limited available inventory"
      ]
    },
    {
      region: "Kent County (Central Delaware)",
      description: "Anchored by state capital Dover and Dover Air Force Base, Kent County offers a mix of government employment, agriculture, and growing residential development. More affordable than New Castle County with strong growth potential.",
      population: "180,000+",
      key_industries: ["Government", "Military", "Agriculture", "Manufacturing"],
      land_values: "$6,000-$15,000/acre",
      growth_rate: "+2.1% annually",
      advantages: [
        "State capital location",
        "Military base stability",
        "Agricultural strength",
        "Moderate pricing",
        "Central location"
      ],
      challenges: [
        "Smaller employment base than New Castle",
        "More rural character",
        "Agricultural preservation restrictions"
      ]
    },
    {
      region: "Sussex County (Southern Delaware - Beaches)",
      description: "Delaware's beach tourism hub encompasses Rehoboth Beach, Bethany Beach, Lewes, and Dewey Beach. Coastal properties command premium prices while inland areas offer agricultural and development opportunities.",
      population: "235,000+",
      key_industries: ["Tourism", "Agriculture", "Poultry", "Retirement Services"],
      land_values: "$5,000-$80,000/acre",
      growth_rate: "+3.5% annually",
      advantages: [
        "Beach tourism economy",
        "Premium coastal values",
        "Vacation rental market",
        "Retiree destination",
        "Agricultural diversity"
      ],
      challenges: [
        "Seasonal economy fluctuations",
        "Coastal flooding considerations",
        "Infrastructure constraints"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Patricia Morrison",
      location: "Rehoboth Beach, Delaware",
      property: "3-acre coastal development site",
      content: "We inherited beach property from my parents but live in California. The team helped us navigate Delaware's high transfer taxes and connected us with a developer who paid premium pricing. Closed in 18 days without ever visiting Delaware.",
      amount: "$875,000",
      timeToSell: "18 days",
      reason: "Inherited Property",
      rating: 5,
      year: "2024"
    },
    {
      name: "David Chen",
      location: "Middletown, Delaware",
      property: "45-acre residential development tract",
      content: "Middletown's explosive growth made our land very valuable. Got multiple offers within 72 hours, all above our asking price. The competition between developers resulted in a final sale price 22% higher than we expected.",
      amount: "$1,350,000",
      timeToSell: "21 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "Robert Williams",
      location: "Dover, Delaware",
      property: "85-acre agricultural preserve",
      content: "Had concerns about selling farmland with preservation easements. The buyer network included agricultural investors who understood preservation programs. Closed quickly at fair market value for preserved farmland.",
      amount: "$595,000",
      timeToSell: "16 days",
      reason: "Retirement",
      rating: 5,
      year: "2023"
    },
    {
      name: "Jennifer Taylor",
      location: "Newark, Delaware",
      property: "12-acre commercial site near I-95",
      content: "Our failed retail development left us with land we couldn't develop. Within two weeks, connected us with a logistics company that paid cash and closed in 9 days. No more property taxes or development headaches.",
      amount: "$720,000",
      timeToSell: "9 days",
      reason: "Failed Development",
      rating: 5,
      year: "2024"
    }
  ];

  const faqs = [
    {
      question: "Why are Delaware land values so high compared to neighboring states?",
      answer: "Delaware's small size creates natural scarcity with only 1,954 square miles of total land. Combined with no state sales tax, favorable business climate, strategic East Coast location, and growing population, demand significantly exceeds supply. Coastal properties command particular premiums due to limited beach access and strong tourism economy."
    },
    {
      question: "How do Delaware's high transfer taxes affect my land sale?",
      answer: "Delaware's 4% state transfer tax (2% buyer, 2% seller) plus local taxes make it one of the highest in the nation. On a $500,000 sale, that's $20,000+ in transfer taxes alone. Working with cash buyers who close quickly minimizes your carrying costs during the sale process. Many investors factor these costs into their offers but value speed and certainty."
    },
    {
      question: "Can I sell land that's in Delaware's Agricultural Preservation Program?",
      answer: "Yes! Agricultural preservation easements restrict development but don't prevent sales. The land can still be sold for agricultural use. We work with farming operations and agricultural investors who specifically seek preserved farmland. These buyers understand how preservation affects value and make appropriate offers."
    },
    {
      question: "What makes coastal Delaware property so valuable?",
      answer: "Delaware beaches like Rehoboth, Bethany, and Lewes are extremely popular with visitors from DC, Philadelphia, Baltimore, and New York. Limited developable coastal land, strong vacation rental market, no state sales tax on purchases, and proximity to major metros create exceptional demand. Coastal land values have appreciated 30%+ over the past five years."
    },
    {
      question: "How quickly can I sell Delaware land?",
      answer: "Most Delaware land sales through our network close in 10-21 days. The state's small size means buyers can easily visit and evaluate properties. Our network includes active buyers specifically interested in Delaware properties who can move quickly. For urgent situations, we can arrange closings in as little as 7 days."
    },
    {
      question: "Do out-of-state buyers purchase Delaware land?",
      answer: "Absolutely! Delaware attracts significant out-of-state investment, particularly from higher-tax states like New York, New Jersey, Maryland, and Pennsylvania. Buyers are attracted by no sales tax, favorable business laws, strategic location, and potential tax benefits of establishing Delaware residency. Out-of-state buyers represent roughly 40% of Delaware land purchases."
    },
    {
      question: "What if my Delaware property is in a flood zone?",
      answer: "Many Delaware properties, especially coastal and low-lying areas, are in FEMA flood zones. This is common and expected in Delaware. We work with buyers who regularly purchase flood zone properties and understand the insurance requirements and development restrictions. Flood zone designation doesn't prevent sales, though it may affect pricing."
    },
    {
      question: "How does Delaware's small size affect land values?",
      answer: "Delaware is the second-smallest state with limited developable land. This scarcity, combined with location between major metros and growing population, creates strong upward pressure on land values. Unlike larger states with abundant land, Delaware's limited supply means every parcel has value and attracts buyer interest."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-delaware" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Delaware property information and will contact you within 24 hours with cash offers from our network of Delaware land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Delaware specialists review your property details</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We conduct local market analysis and valuation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You receive multiple no-obligation cash offers</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-xl border-2 border-blue-600 shadow-lg">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-semibold rounded-xl border-2 border-green-600 shadow-lg">
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
              <Link to="/sell-land-fast" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Main</span>
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
            <div className="flex items-center justify-center gap-3 mb-8">
              <MapPin className="w-8 h-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800 px-6 py-3 text-lg font-bold shadow-lg">
                Delaware Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Delaware Land <span className="text-blue-600">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Delaware land in 24-48 hours. We have active buyers throughout the First State ready to purchase your property quickly.
            </p>

            {/* Delaware Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {delawareStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-600"
              >
                Get Delaware Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Delaware Specialists • 100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Delaware Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Delaware, from New Castle County to the beaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">{area.name}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Population:</span>
                      <span className="font-medium">{area.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth:</span>
                      <span className="font-medium text-green-600">{area.growth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Price:</span>
                      <span className="font-medium text-blue-600">{area.avgPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Drivers */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware's Economic Strengths
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse industries drive land demand across the state
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {economicDrivers.map((driver, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <driver.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{driver.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{driver.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">{driver.impact}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {driver.locations.map((location, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs">
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Land Types */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of Delaware Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From beach property to farmland, we have buyers for every type of Delaware land
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {landTypes.map((landType, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <landType.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{landType.type}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{landType.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Price Range</div>
                          <div className="text-sm text-blue-600 font-medium">{landType.priceRange}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Typical Size</div>
                          <div className="text-sm text-gray-600">{landType.typicalSize}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Income Potential</div>
                          <div className="text-sm text-green-600 font-medium">{landType.income}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Best Areas</div>
                          <div className="text-sm text-gray-600">{landType.bestAreas.join(", ")}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">Key Features:</div>
                        <div className="flex flex-wrap gap-2">
                          {landType.features.map((feature, idx) => (
                            <Badge key={idx} className="bg-gray-100 text-gray-700 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions favor Delaware land sellers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{trend.trend}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{trend.description}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Impact: </span>
                          <span className="text-green-600 font-medium">{trend.impact}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Timeline: </span>
                          <span className="text-gray-600">{trend.timeframe}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">Implications:</div>
                        <ul className="space-y-1">
                          {trend.implications.map((implication, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{implication}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Markets */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of Delaware's three counties offers unique opportunities
            </p>
          </div>

          <div className="space-y-8">
            {regionalMarkets.map((region, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <h3 className="text-2xl font-bold text-gray-900">{region.region}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6">{region.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Advantages</h4>
                          <ul className="space-y-2">
                            {region.advantages.map((advantage, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3">Considerations</h4>
                          <ul className="space-y-2">
                            {region.challenges.map((challenge, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <Eye className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                <span>{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Market Overview</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Population</div>
                          <div className="text-lg font-bold text-blue-600">{region.population}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Land Values</div>
                          <div className="text-lg font-bold text-green-600">{region.land_values}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Growth Rate</div>
                          <div className="text-lg font-bold text-purple-600">{region.growth_rate}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-2">Key Industries</div>
                          <div className="flex flex-wrap gap-1">
                            {region.key_industries.map((industry, idx) => (
                              <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Advantages */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Delaware offers unique opportunities for land sellers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sellingAdvantages.map((advantage, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{advantage.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 font-medium">
                          {advantage.savings}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Profiles */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Delaware Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Delaware who are ready to purchase land quickly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {buyerProfiles.map((buyer, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{buyer.type}</h3>
                        <Badge className="bg-blue-100 text-blue-800 text-sm font-medium">
                          {buyer.percentage} of buyers
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-6">{buyer.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Purchase Range</div>
                          <div className="text-sm text-green-600 font-medium">{buyer.typical_purchase}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Decision Speed</div>
                          <div className="text-sm text-blue-600 font-medium">{buyer.decision_speed}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-sm font-medium text-gray-900 mb-1">Preferred Size</div>
                          <div className="text-sm text-gray-600">{buyer.preferred_size}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900 mb-2">Key Factors:</div>
                        <div className="flex flex-wrap gap-2">
                          {buyer.key_factors.map((factor, idx) => (
                            <Badge key={idx} className="bg-gray-100 text-gray-700 text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Delaware landowners who sold their property fast for cash
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({testimonial.year})</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                        <div className="text-sm text-blue-600">{testimonial.property}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{testimonial.amount}</div>
                        <div className="text-sm text-gray-500">{testimonial.timeToSell}</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {testimonial.reason}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Cash Offers for Your Delaware Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Delaware land specialists will contact you within 24 hours
            </p>
          </div>

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
                    Delaware Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter the property address or county in Delaware"
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
                      <option value="Coastal/Beach Property">Coastal/Beach Property</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                      <option value="Waterfront Property">Waterfront Property</option>
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
                      placeholder="e.g., $150,000 or leave blank"
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
                    placeholder="Tell us anything else about your Delaware property that might be helpful..."
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-blue-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Get My Delaware Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Delaware land buyers
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Delaware
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Sell Your Delaware Land?
          </h2>
          <p className="text-xl mb-12 text-gray-900 max-w-2xl mx-auto">
            Join hundreds of Delaware landowners who chose the fast, easy way to sell their land for cash
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <div className="flex items-center gap-3 text-gray-900">
              <Phone className="w-6 h-6" />
              <span className="text-xl font-semibold">949-767-8885</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {delawareStats.map((stat, index) => (
              <div key={index} className="text-center text-gray-900">
                <stat.icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
