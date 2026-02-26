import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Wheat, Chrome as Home, Sprout } from 'lucide-react';
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

export function SellLandFastIowa() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      timeline: 'Within 30 days',
      propertyType: 'Agricultural Land',
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
        state: 'Iowa',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_iowa_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_iowa_inquiries', JSON.stringify(existingSubmissions));

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

  const iowaStats = [
    { label: "Avg. Land Value", value: "$8,500/acre", trend: "+18%", icon: DollarSign },
    { label: "Active Buyers", value: "300+", trend: "Strong Demand", icon: Users },
    { label: "Avg. Sale Time", value: "13 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "98%", trend: "Top Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Des Moines", population: "700,000+ metro", growth: "+2.1%", avgPrice: "$12,500/acre" },
    { name: "Cedar Rapids", population: "275,000+ metro", growth: "+1.4%", avgPrice: "$9,800/acre" },
    { name: "Davenport (Quad Cities)", population: "380,000+ metro", growth: "+0.9%", avgPrice: "$10,200/acre" },
    { name: "Sioux City", population: "145,000+ metro", growth: "+1.1%", avgPrice: "$8,200/acre" },
    { name: "Iowa City", population: "175,000+ metro", growth: "+1.8%", avgPrice: "$11,500/acre" },
    { name: "Waterloo-Cedar Falls", population: "170,000+ metro", growth: "+0.7%", avgPrice: "$8,800/acre" },
    { name: "Ames", population: "95,000+ metro", growth: "+2.3%", avgPrice: "$13,000/acre" },
    { name: "Council Bluffs", population: "145,000+ metro", growth: "+1.2%", avgPrice: "$9,500/acre" },
    { name: "Dubuque", population: "100,000+ metro", growth: "+0.8%", avgPrice: "$8,500/acre" },
    { name: "Ankeny", population: "70,000+", growth: "+3.5%", avgPrice: "$18,000/acre" }
  ];

  const economicDrivers = [
    {
      title: "Agricultural Supremacy",
      description: "Iowa leads the nation in corn production and ranks second in soybeans, with the highest percentage of prime farmland of any state. Deep, fertile prairie soils produce exceptional yields year after year. This agricultural dominance creates intense competition for quality farmland from farmers, investors, and institutions seeking stable returns and appreciation.",
      impact: "#1 corn state, #2 soybeans",
      locations: ["Central Iowa", "Northern Iowa", "Northwest Iowa", "East-central region"],
      icon: Wheat
    },
    {
      title: "Renewable Energy Leadership",
      description: "Iowa generates over 60% of electricity from wind energy, leading the nation in wind power percentage. Landowners earn significant lease income from wind turbines while maintaining agricultural use. Solar development accelerates rapidly. This renewable energy boom adds substantial value to Iowa farmland beyond traditional crop production.",
      impact: "60%+ wind energy leader",
      locations: ["Northwest Iowa", "North-central Iowa", "Southwest Iowa", "Throughout state"],
      icon: Zap
    },
    {
      title: "Biofuel and Ethanol Hub",
      description: "Iowa leads ethanol and biodiesel production with extensive processing facilities throughout the state. This industry creates sustained demand for corn and soybeans while providing local markets for farmers. Biofuel plants drive agricultural land values and ensure strong commodity markets regardless of export conditions.",
      impact: "Top ethanol producer",
      locations: ["Western Iowa", "Central Iowa", "Northern Iowa", "Major facilities statewide"],
      icon: Sprout
    },
    {
      title: "Insurance and Financial Services",
      description: "Des Moines ranks among top insurance centers nationally, hosting Principal Financial, Nationwide, and numerous other companies. This white-collar employment base supports residential development and creates affluent buyers for land investments. Strong financial services sector provides stability and drives metro growth.",
      impact: "Major insurance hub",
      locations: ["Des Moines", "Cedar Rapids", "Ankeny", "West Des Moines"],
      icon: Building
    }
  ];

  const landTypes = [
    {
      type: "Grade A Prime Farmland",
      description: "Iowa's prime farmland features the richest soils in America, producing nation-leading corn and soybean yields. Grade A farmland with excellent productivity index ratings attracts intense competition from local farmers, regional operators, and institutional investors. Cash rent income provides stable returns while land appreciation offers long-term wealth building.",
      priceRange: "$8,000 - $16,000 per acre",
      typicalSize: "80-500 acres",
      bestAreas: ["Central Iowa", "Northern Iowa", "Northwest Iowa", "Story County area"],
      income: "$300-750/acre annually",
      features: ["Prime soils", "Record yields", "Wind income potential", "Institutional demand"],
      icon: Wheat
    },
    {
      type: "Wind Energy Farmland",
      description: "Farmland with wind turbines or development potential commands premium prices. Landowners receive $8,000-$15,000 annual payments per turbine while continuing crop production. Iowa's wind leadership creates sustained demand for properties suitable for turbine placement. Energy income provides recession-resistant cash flow supplementing agricultural returns.",
      priceRange: "$9,000 - $18,000 per acre",
      typicalSize: "100-1000 acres",
      bestAreas: ["Northwest Iowa", "North-central Iowa", "Southwest Iowa", "Windy corridor areas"],
      income: "$350-800/acre (crops + wind)",
      features: ["Wind income", "Dual revenue", "Energy leases", "Premium values"],
      icon: Zap
    },
    {
      type: "Residential Development Land",
      description: "Des Moines metro expansion drives suburban residential demand. Ankeny, Waukee, Johnston, and other suburbs rank among America's fastest-growing communities. College towns including Ames and Iowa City offer stable markets. Developers purchase land for subdivisions throughout growth corridors as Iowa's affordable housing attracts families and businesses.",
      priceRange: "$10,000 - $30,000 per acre",
      typicalSize: "20-200 acres",
      bestAreas: ["Ankeny area", "Waukee", "Johnston", "College town fringes"],
      income: "Development profits",
      features: ["Metro growth", "Affordability appeal", "Quality schools", "Low crime"],
      icon: Home
    },
    {
      type: "Recreational and Hunting Land",
      description: "River valleys and timber areas offer excellent hunting for deer, turkey, and waterfowl. Recreational properties near Des Moines and Iowa City attract weekend buyers. Hunting lease income supplements holding costs while property provides family recreation. Timber and wildlife habitat add value beyond basic farmland pricing.",
      priceRange: "$3,000 - $8,000 per acre",
      typicalSize: "40-320 acres",
      bestAreas: ["Southern Iowa", "River valleys", "Northeast Iowa", "Timber regions"],
      income: "Hunting leases $10-25/acre",
      features: ["Wildlife habitat", "Timber income", "Recreation", "River access"],
      icon: TreePine
    },
    {
      type: "Investment Grade Farmland",
      description: "Quality farmland near growing cities offers appreciation potential as development advances. Strategic parcels in growth corridors benefit from infrastructure improvements and zoning changes. Investors purchase agricultural land expecting residential or commercial conversion within 10-20 years while collecting cash rent during holding period.",
      priceRange: "$7,000 - $20,000 per acre",
      typicalSize: "40-320 acres",
      bestAreas: ["Suburban fringes", "Interstate corridors", "Growth paths", "Regional city outskirts"],
      income: "Rent + appreciation",
      features: ["Development trajectory", "Interim income", "Strategic location", "Infrastructure"],
      icon: Target
    },
    {
      type: "Specialty Agricultural Land",
      description: "Organic farming operations, specialty crops, vegetable production, and livestock facilities serve niche markets. Iowa's agricultural heritage and infrastructure support diverse farming operations. Equestrian properties and hobby farms near metro areas attract lifestyle buyers. These properties combine agricultural income with rural lifestyle appeal.",
      priceRange: "$6,000 - $15,000 per acre",
      typicalSize: "10-160 acres",
      bestAreas: ["Suburban areas", "Organic regions", "Specialty crop zones", "Metro proximity"],
      income: "Variable by operation",
      features: ["Niche markets", "Lifestyle appeal", "Diverse uses", "Growing demand"],
      icon: Heart
    }
  ];

  const marketTrends = [
    {
      trend: "Record Farmland Values and Competition",
      description: "Iowa farmland values reach record highs driven by strong commodity prices, biofuel demand, institutional investment, and limited supply. Quality farms receive multiple offers with competitive bidding common. Low interest rates enable farmer expansion while institutions view farmland as inflation hedge. This creates optimal seller conditions with strong pricing power.",
      impact: "+18% annual appreciation",
      timeframe: "2020-2024 surge",
      implications: ["Seller's market", "Multiple offers common", "Record pricing"]
    },
    {
      trend: "Renewable Energy Revenue Transformation",
      description: "Wind and solar energy development transforms Iowa farmland economics. Properties with turbines generate $8,000-$15,000 annually per turbine in addition to crop income. New projects announced regularly create ongoing development opportunities. Energy income provides diversification and recession resistance while supporting higher land values.",
      impact: "$50,000-$100,000+ annual income",
      timeframe: "Accelerating opportunity",
      implications: ["Dual income streams", "Value premium", "Long-term contracts"]
    },
    {
      trend: "Institutional and Investment Buyer Growth",
      description: "Pension funds, endowments, and farmland investment funds increase Iowa purchases seeking stable returns and inflation protection. These sophisticated buyers compete with farmers for quality properties. Institutional interest supports prices and provides additional buyer pool. Professional farm managers operate purchased land ensuring income continuation.",
      impact: "Major buyer category",
      timeframe: "Growing presence",
      implications: ["Price support", "Quick closings", "Cash purchases"]
    },
    {
      trend: "Des Moines Metro Expansion Momentum",
      description: "Des Moines metro grows faster than most Midwest regions, attracting businesses and residents with affordability and quality of life. Suburban communities expand rapidly while employment growth supports housing demand. This expansion creates residential development opportunities throughout surrounding counties while supporting overall economic strength.",
      impact: "+2.1% annual growth",
      timeframe: "Sustained expansion",
      implications: ["Suburban land demand", "Development opportunities", "Economic growth"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "World-Class Soil Quality",
      description: "Iowa farmland features the nation's richest soils with exceptional productivity. This reputation creates global buyer interest including farmers, investors, and institutions. Quality soil commands premium prices and attracts serious buyers who understand agricultural value and act quickly.",
      savings: "Premium soil value",
      icon: Wheat
    },
    {
      title: "Wind Energy Income Potential",
      description: "Properties suitable for wind development or with existing turbines command significant premiums. Energy income potential adds value beyond traditional agricultural returns. Buyers specifically seek wind-suitable properties creating strong demand for appropriately located land.",
      savings: "Energy revenue premium",
      icon: Zap
    },
    {
      title: "Strong Farmer Buyer Base",
      description: "Iowa farmers actively expand operations with strong balance sheets from profitable years. Local buyers understand land values and move quickly. Competition among farmers creates favorable seller conditions. Many farmers pay cash enabling rapid closings without financing contingencies.",
      savings: "Quick cash sales",
      icon: Users
    },
    {
      title: "Institutional Investment Interest",
      description: "Iowa attracts sophisticated investors seeking quality farmland for portfolios. Institutional buyers have deep pockets and streamlined processes. This buyer category provides alternatives to farmer buyers and often accepts lower returns enabling competitive offers on quality properties.",
      savings: "Diverse buyer pool",
      icon: Building
    }
  ];

  const buyerProfiles = [
    {
      type: "Local and Regional Farmers",
      description: "Iowa farmers expanding operations represent the largest buyer category. These buyers understand soil productivity, yield history, and fair market values. Strong commodity prices and accumulated equity enable aggressive expansion. Many farmers purchase multiple properties annually and prefer quick closings to secure land before competitors.",
      typical_purchase: "$500K - $8M",
      decision_speed: "3-6 weeks",
      preferred_size: "80-500 acres",
      key_factors: ["Soil quality", "Yield history", "Tile drainage", "Location to existing farm"],
      percentage: "45%"
    },
    {
      type: "Institutional and Investment Buyers",
      description: "Farmland investment funds, family offices, pension funds, and endowments purchase Iowa farmland for stable returns and inflation protection. These sophisticated buyers work with farm managers and can close quickly. They seek quality properties with reliable cash rent income and appreciate wind energy potential.",
      typical_purchase: "$1M - $20M",
      decision_speed: "4-8 weeks",
      preferred_size: "160-2000 acres",
      key_factors: ["Productivity", "Cash rent reliability", "Professional management", "Wind potential"],
      percentage: "30%"
    },
    {
      type: "Residential and Commercial Developers",
      description: "Homebuilders developing Des Moines suburbs and commercial developers creating projects near growing cities. Ankeny, Waukee, and Johnston expansion drives consistent land acquisition. These buyers target properties in growth paths with development potential within 3-10 years.",
      typical_purchase: "$500K - $10M",
      decision_speed: "6-16 weeks",
      preferred_size: "40-300 acres",
      key_factors: ["Growth trajectory", "Zoning potential", "Utilities", "Transportation access"],
      percentage: "15%"
    },
    {
      type: "Recreational and Individual Buyers",
      description: "Des Moines and regional residents seeking hunting land, rural lifestyle properties, or small farming operations. These buyers value accessibility, recreation potential, and Iowa's quality of life. Many purchase for personal use with hunting leases providing supplemental income.",
      typical_purchase: "$150K - $1.5M",
      decision_speed: "4-10 weeks",
      preferred_size: "40-200 acres",
      key_factors: ["Recreation", "Accessibility", "Wildlife", "Affordability"],
      percentage: "10%"
    }
  ];

  const regionalMarkets = [
    {
      region: "Central Iowa (Des Moines Metro)",
      description: "Des Moines metro dominates Iowa economy with insurance, financial services, and diverse industries. Suburban growth in Ankeny, Waukee, Johnston, and West Des Moines creates exceptional residential land demand. Surrounding agricultural counties feature premium farmland. This region offers highest land values and strongest appreciation potential with diverse buyer pools.",
      population: "700,000+",
      key_industries: ["Insurance", "Financial Services", "Agriculture", "Healthcare"],
      land_values: "$10,000-$25,000/acre",
      growth_rate: "+2.1% annually",
      advantages: [
        "State's economic hub",
        "Fastest suburban growth",
        "Premium farmland",
        "Diverse buyer demand",
        "Strong employment"
      ],
      challenges: [
        "Highest land costs",
        "Development pressure",
        "Competition"
      ]
    },
    {
      region: "Northwest Iowa",
      description: "Northwest Iowa features the state's most productive farmland with deep, fertile soils producing exceptional yields. Wind energy development dominates with thousands of turbines generating substantial landowner income. Agricultural focus creates strong farmer buyer demand while wind potential attracts energy companies. This region offers premium farmland values with energy income opportunities.",
      population: "300,000+ region",
      key_industries: ["Agriculture", "Wind Energy", "Biofuels", "Food Processing"],
      land_values: "$9,000-$16,000/acre",
      growth_rate: "+1.2% regional",
      advantages: [
        "Most productive soils",
        "Wind energy income",
        "Strong farmer demand",
        "Biofuel markets",
        "Excellent infrastructure"
      ],
      challenges: [
        "Rural economy",
        "Limited non-farm opportunities",
        "Population stable"
      ]
    },
    {
      region: "Eastern Iowa (Cedar Rapids/Iowa City)",
      description: "Eastern Iowa balances agriculture with urban economies. Cedar Rapids provides manufacturing and services while Iowa City benefits from University of Iowa. Quality farmland surrounds both cities. This region offers diverse opportunities from prime agricultural land to development sites near growing metros. River access and recreation supplement agricultural value.",
      population: "500,000+ region",
      key_industries: ["Agriculture", "Manufacturing", "Education", "Healthcare"],
      land_values: "$8,000-$14,000/acre",
      growth_rate: "+1.5% regional",
      advantages: [
        "Quality farmland",
        "Economic diversity",
        "University presence",
        "Manufacturing base",
        "Urban amenities"
      ],
      challenges: [
        "Flood risk in areas",
        "Slower than Des Moines",
        "Limited wind development"
      ]
    },
    {
      region: "Southern Iowa",
      description: "Southern Iowa offers most affordable land with rolling hills and timber contrasting northern prairies. Lower agricultural productivity creates opportunity for recreational buyers seeking hunting properties. Livestock and pasture operations dominate over row crops. Limited development pressure and lower prices attract individual buyers and lifestyle purchasers seeking Iowa's rural character.",
      population: "400,000+ region",
      key_industries: ["Agriculture", "Livestock", "Recreation", "Tourism"],
      land_values: "$3,000-$8,000/acre",
      growth_rate: "+0.5% regional",
      advantages: [
        "Most affordable land",
        "Recreation opportunities",
        "Hunting demand",
        "Scenic landscapes",
        "Less competition"
      ],
      challenges: [
        "Lower productivity",
        "Population decline",
        "Limited development"
      ]
    }
  ];

  const testimonials = [
    {
      name: "John Anderson",
      location: "Story County, Iowa",
      property: "240-acre Grade A farmland",
      content: "Family farm for three generations with excellent soil productivity. Decided to sell for retirement. Had four farmer offers within 48 hours. Bidding competition resulted in premium price. Closed in 14 days all cash. Exceeded expectations.",
      amount: "$3,360,000",
      timeToSell: "14 days",
      reason: "Retirement",
      rating: 5,
      year: "2024"
    },
    {
      name: "Michael Thompson",
      location: "Plymouth County, Iowa",
      property: "320-acre farm with wind turbines",
      content: "Wind turbine income plus crop rent made this exceptional property. Investment fund buyer understood the value. Smooth process, closed in 16 days at asking price. Highly recommend this service.",
      amount: "$4,480,000",
      timeToSell: "16 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "Patricia Williams",
      location: "Dallas County, Iowa",
      property: "80-acre development tract",
      content: "Land in Waukee growth path we held for 15 years. Builder buyer needed site for subdivision. Multiple offers created competition. Closed in 15 days with no complications. Very satisfied.",
      amount: "$1,440,000",
      timeToSell: "15 days",
      reason: "Investment Exit",
      rating: 5,
      year: "2024"
    },
    {
      name: "Robert Martinez",
      location: "Polk County, Iowa",
      property: "160-acre prime farmland",
      content: "Inherited from parents and needed quick sale. Local farmer buyer understood land value. Fair price, professional service, closed in 13 days. Seamless process during difficult time.",
      amount: "$1,920,000",
      timeToSell: "13 days",
      reason: "Estate Liquidation",
      rating: 5,
      year: "2023"
    }
  ];

  const faqs = [
    {
      question: "Why is Iowa farmland so valuable?",
      answer: "Iowa possesses the nation's richest agricultural soils producing record corn and soybean yields. Over 85% of Iowa land is in agricultural use with deep prairie soils created over millennia. This exceptional productivity combined with biofuel demand, wind energy income potential, and limited supply creates intense competition. Both farmers and institutional investors seek Iowa farmland for stable returns and appreciation, driving sustained demand and premium values."
    },
    {
      question: "How quickly can I sell Iowa farmland?",
      answer: "Most Iowa farmland sales close in 13-21 days through our buyer network. Grade A farmland near major cities often sells fastest due to intense farmer competition. Properties with wind turbines or energy potential attract quick offers. Recreational land may take 15-30 days to find right buyers. Strong farmer buyer base with cash purchasing power enables rapid closings."
    },
    {
      question: "What makes Iowa farmland different from other states?",
      answer: "Iowa leads the nation in corn production and has the highest percentage of prime farmland of any state. Deep, fertile prairie soils produce exceptional yields year after year with minimal inputs. Wind energy income adds significant value beyond crop production. Strong biofuel industry provides local markets. These advantages create premium values and sustained buyer demand unmatched in most agricultural regions."
    },
    {
      question: "How does wind energy affect Iowa land values?",
      answer: "Wind energy dramatically increases land values and income potential. Properties with turbines receive $8,000-$15,000 annually per turbine in addition to crop income. Land suitable for future wind development commands premiums due to dual income potential. Iowa's wind energy leadership creates sustained developer demand for appropriately located properties throughout the state."
    },
    {
      question: "Can I sell farmland that's currently rented?",
      answer: "Yes! Most Iowa farmland transactions occur with leases in place. Cash rent leases typically transfer to buyers who want immediate income. Many buyers specifically seek rented farms for predictable returns. Strong lease history and quality tenants increase property appeal. We regularly work with buyers who purchase leased agricultural land."
    },
    {
      question: "What if my land doesn't have the highest productivity rating?",
      answer: "All Iowa farmland remains marketable regardless of soil ratings. Grade B and C land attracts farmers seeking expansion at lower per-acre costs. Recreational buyers prefer less productive land for hunting and wildlife. Investors purchase lower-grade land in growth corridors expecting development conversion. Each productivity level has specific buyer pools."
    },
    {
      question: "How do institutional buyers differ from farmer buyers?",
      answer: "Institutional buyers include investment funds, pension funds, and family offices purchasing farmland for portfolios. They typically buy larger properties, work with farm managers, and accept lower returns than farmers. Institutions move quickly with streamlined processes and often pay cash. They provide alternative buyer category when farmer demand fluctuates and frequently purchase properties farmers find too expensive."
    },
    {
      question: "Should I sell Iowa farmland now or wait for higher prices?",
      answer: "Current market conditions strongly favor sellers with record farmland values, institutional investment interest, wind energy demand, and limited inventory. Commodity prices support farmer purchasing power while low inventory creates competition. Interest rates and future policy changes create uncertainty. Many sellers choose to act while multiple positive trends support strong buyer demand and premium pricing."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-iowa" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Iowa property information and will contact you within 24 hours with cash offers from our network of Iowa land buyers.
            </p>
            <div className="bg-yellow-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-yellow-800">Our Iowa specialists review your property details</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-yellow-800">We conduct local market analysis and valuation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-yellow-800">You receive multiple no-obligation cash offers</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-8 py-4 text-lg font-semibold rounded-xl border-2 border-yellow-600 shadow-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50">
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
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-yellow-100 via-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <MapPin className="w-8 h-8 text-yellow-600" />
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 text-lg font-bold shadow-lg">
                Iowa Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Iowa Land <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Iowa land in 24-48 hours. We have active buyers throughout the Hawkeye State ready to purchase your property quickly.
            </p>

            {/* Iowa Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {iowaStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-200">
                  <stat.icon className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-600"
              >
                Get Iowa Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Iowa Specialists • 100% Free</span>
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
              Popular Iowa Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Iowa, from Des Moines to the farm country
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularAreas.map((area, index) => (
              <Card key={index} className="border-2 border-yellow-100 shadow-lg hover:shadow-xl hover:border-yellow-300 transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-yellow-600" />
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
                      <span className="font-medium text-yellow-600">{area.avgPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Drivers */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Iowa Economic Strengths
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse industries drive land demand across the state
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {economicDrivers.map((driver, index) => (
              <Card key={index} className="border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-green-50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
                          <Badge key={idx} className="bg-yellow-100 text-yellow-800 text-xs font-medium">
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

      {/* Land Types Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of Iowa Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Grade A farmland to wind energy properties, we have buyers for every type of Iowa land
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {landTypes.map((landType, index) => (
              <Card key={index} className="border-2 border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <landType.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{landType.type}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{landType.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-1">Price Range</div>
                          <div className="text-sm text-yellow-600 font-medium">{landType.priceRange}</div>
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
                            <Badge key={idx} className="bg-yellow-100 text-yellow-800 text-xs font-medium">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Iowa Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions strongly favor Iowa land sellers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
              Iowa Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each region of Iowa offers unique opportunities and market dynamics
            </p>
          </div>

          <div className="space-y-8">
            {regionalMarkets.map((region, index) => (
              <Card key={index} className="border-2 border-yellow-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-yellow-600" />
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

                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Market Overview</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Population</div>
                          <div className="text-lg font-bold text-yellow-600">{region.population}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Land Values</div>
                          <div className="text-lg font-bold text-green-600">{region.land_values}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Growth Rate</div>
                          <div className="text-lg font-bold text-amber-600">{region.growth_rate}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 mb-2">Key Industries</div>
                          <div className="flex flex-wrap gap-1">
                            {region.key_industries.map((industry, idx) => (
                              <Badge key={idx} className="bg-yellow-100 text-yellow-800 text-xs">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Iowa Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Iowa is an exceptional state to sell land in
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sellingAdvantages.map((advantage, index) => (
              <Card key={index} className="border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-green-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
              Our Iowa Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Iowa who are ready to purchase land quickly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {buyerProfiles.map((buyer, index) => (
              <Card key={index} className="border-2 border-yellow-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{buyer.type}</h3>
                        <Badge className="bg-yellow-100 text-yellow-800 text-sm font-medium">
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
                          <div className="text-sm text-yellow-600 font-medium">{buyer.decision_speed}</div>
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Iowa Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Iowa landowners who sold their property fast for cash
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({testimonial.year})</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="border-t-2 border-yellow-200 pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                        <div className="text-sm text-yellow-600">{testimonial.property}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{testimonial.amount}</div>
                        <div className="text-sm text-gray-500">{testimonial.timeToSell}</div>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      {testimonial.reason}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form with vibrant colors */}
      <section id="contact-form" className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Cash Offers for Your Iowa Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Iowa land specialists will contact you within 24 hours
            </p>
          </div>

          <Card className="border-2 border-yellow-200 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 lg:p-12 bg-gradient-to-br from-white to-yellow-50">
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Form fields implementation - same as other states but with yellow/green theme */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      {...form.register('firstName')}
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
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
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
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
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
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
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      placeholder="Enter your phone number"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Iowa Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Enter the property address or county in Iowa"
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
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      placeholder="e.g., 160 acres, 80 acres, 320 acres"
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
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 w-full px-3"
                    >
                      <option value="Agricultural Land">Agricultural Land (Prime Farmland)</option>
                      <option value="Wind Energy Land">Wind Energy Farmland</option>
                      <option value="Residential Land">Residential Development Land</option>
                      <option value="Recreational Land">Recreational/Hunting Land</option>
                      <option value="Investment Land">Investment Land</option>
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
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 w-full px-3"
                    >
                      <option value="ASAP (within 7 days)">ASAP (within 7 days)</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="Within 60 days">Within 60 days</option>
                      <option value="Within 90 days">Within 90 days</option>
                      <option value="Flexible timeline">Flexible timeline</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asking Price (Optional)
                    </label>
                    <Input
                      {...form.register('askingPrice')}
                      className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
                      placeholder="e.g., $1,500,000 or leave blank"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Selling *
                  </label>
                  <select
                    {...form.register('reasonForSelling')}
                    className="h-12 rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 w-full px-3"
                  >
                    <option value="Need cash quickly">Need cash quickly</option>
                    <option value="Inherited property">Inherited property</option>
                    <option value="Relocating">Relocating</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Investment exit">Investment exit</option>
                    <option value="Estate liquidation">Estate liquidation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    {...form.register('additionalInfo')}
                    rows={4}
                    className="w-full rounded-xl border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500 px-4 py-3"
                    placeholder="Tell us about your Iowa property (soil productivity, wind turbines, tile drainage, etc.)"
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
                  className="w-full bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-700 hover:to-amber-800 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-yellow-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Get My Iowa Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Iowa land buyers
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Iowa Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Iowa
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-green-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with vibrant colors */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-600 via-amber-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Ready to Sell Your Iowa Land?
          </h2>
          <p className="text-xl mb-12 text-white drop-shadow max-w-2xl mx-auto">
            Join Iowa landowners who chose the fast, easy way to sell their land for cash
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-yellow-700 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <div className="flex items-center gap-3 text-white">
              <Phone className="w-6 h-6" />
              <span className="text-xl font-semibold drop-shadow">949-767-8885</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {iowaStats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                <div className="text-2xl font-bold drop-shadow-lg">{stat.value}</div>
                <div className="text-sm drop-shadow">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
