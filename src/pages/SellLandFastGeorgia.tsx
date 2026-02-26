import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Film, Music } from 'lucide-react';
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

export function SellLandFastGeorgia() {
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
        state: 'Georgia',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_georgia_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_georgia_inquiries', JSON.stringify(existingSubmissions));

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

  const georgiaStats = [
    { label: "Avg. Land Value", value: "$8,200/acre", trend: "+18%", icon: DollarSign },
    { label: "Active Buyers", value: "350+", trend: "High Demand", icon: Users },
    { label: "Avg. Sale Time", value: "14 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "96%", trend: "Proven Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Atlanta", population: "6.1M+ metro", growth: "+2.9%", avgPrice: "$15,000/acre" },
    { name: "Savannah", population: "405,000+ metro", growth: "+2.4%", avgPrice: "$12,500/acre" },
    { name: "Augusta", population: "610,000+ metro", growth: "+1.9%", avgPrice: "$7,500/acre" },
    { name: "Athens", population: "210,000+ metro", growth: "+2.1%", avgPrice: "$9,800/acre" },
    { name: "Macon", population: "235,000+ metro", growth: "+1.6%", avgPrice: "$6,200/acre" },
    { name: "Columbus", population: "330,000+ metro", growth: "+1.8%", avgPrice: "$7,800/acre" },
    { name: "Gainesville", population: "205,000+ metro", growth: "+3.2%", avgPrice: "$11,500/acre" },
    { name: "Warner Robins", population: "195,000+ metro", growth: "+2.0%", avgPrice: "$6,800/acre" },
    { name: "Albany", population: "150,000+ metro", growth: "+1.3%", avgPrice: "$5,500/acre" },
    { name: "Valdosta", population: "145,000+ metro", growth: "+1.5%", avgPrice: "$5,200/acre" }
  ];

  const economicDrivers = [
    {
      title: "Atlanta Business Hub",
      description: "Atlanta is the economic powerhouse of the Southeast, hosting Fortune 500 headquarters including Coca-Cola, Delta Air Lines, Home Depot, and UPS. The metro area's diverse economy, world's busiest airport (Hartsfield-Jackson), and status as a major logistics and distribution hub drive exceptional commercial and industrial land demand throughout the region.",
      impact: "Metro expansion and suburban growth",
      locations: ["Atlanta", "North Georgia", "I-85 Corridor", "I-20 Corridor"],
      icon: Building
    },
    {
      title: "Film and Entertainment Industry",
      description: "Georgia has become Hollywood of the South, offering generous film tax credits that attract major productions. The industry contributes $9+ billion annually, creating demand for studio space, production facilities, and supporting infrastructure. This economic driver supports both commercial land values and residential demand from industry workers.",
      impact: "Studio and commercial development",
      locations: ["Atlanta", "Savannah", "Metro counties", "Historic areas"],
      icon: Film
    },
    {
      title: "Port of Savannah Growth",
      description: "The Port of Savannah is the fastest-growing major port in the U.S. and fourth-busiest container port nationwide. Massive expansion projects and increasing international trade drive enormous demand for logistics facilities, warehouses, and industrial land throughout coastal Georgia and along I-16 and I-95 corridors.",
      impact: "Industrial and logistics land demand",
      locations: ["Savannah", "Coastal Georgia", "I-16 Corridor", "Port areas"],
      icon: Globe
    },
    {
      title: "Population Growth and Affordability",
      description: "Georgia offers southern charm, four-season climate, and affordability compared to surrounding states. The state attracts residents from expensive northeastern markets and California, adding over 120,000 people annually. This sustained growth creates continuous demand for residential development land throughout the state.",
      impact: "Residential development boom",
      locations: ["Metro Atlanta", "Coastal areas", "College towns", "Growth corridors"],
      icon: TrendingUp
    }
  ];

  const landTypes = [
    {
      type: "Residential Development Land",
      description: "Georgia's population growth and Atlanta's metro expansion create strong residential land demand. Suburban communities, master-planned developments, and infill opportunities offer excellent potential. North Georgia mountains and coastal areas also attract second-home and retirement development.",
      priceRange: "$5,000 - $25,000 per acre",
      typicalSize: "5-200 acres",
      bestAreas: ["North Atlanta suburbs", "Gainesville", "Athens", "Coastal Georgia"],
      income: "Development profits",
      features: ["Metro growth", "School districts", "Infrastructure access", "Lifestyle amenities"],
      icon: Building
    },
    {
      type: "Agricultural and Timber Land",
      description: "Georgia's agricultural economy includes row crops, timber, pecans, blueberries, and cattle operations. South Georgia's fertile soils support productive farming while North Georgia offers timber and recreational opportunities. Agricultural land provides income potential and conservation easement options.",
      priceRange: "$2,000 - $8,000 per acre",
      typicalSize: "20-1000+ acres",
      bestAreas: ["South Georgia", "Middle Georgia", "Coastal Plain", "River valleys"],
      income: "$100-500/acre annually",
      features: ["Crop production", "Timber income", "Hunting leases", "Conservation programs"],
      icon: TreePine
    },
    {
      type: "Commercial and Industrial Land",
      description: "Georgia's business-friendly environment and strategic location create exceptional commercial opportunities. Interstate access, port proximity, and Atlanta's economic strength support retail, office, industrial, and logistics development. Tax incentives and foreign trade zones enhance commercial land values.",
      priceRange: "$8,000 - $50,000 per acre",
      typicalSize: "2-100 acres",
      bestAreas: ["Atlanta metro", "Interstate corridors", "Savannah area", "Columbus"],
      income: "Lease income potential",
      features: ["Interstate access", "Business incentives", "Demographics", "Infrastructure"],
      icon: Factory
    },
    {
      type: "Recreational and Hunting Land",
      description: "Georgia's diverse terrain from Appalachian Mountains to coastal marshes offers exceptional recreational opportunities. Deer, turkey, and waterfowl hunting attract sportsmen while mountain properties provide privacy and scenic beauty. Recreational land offers income from hunting leases and timber.",
      priceRange: "$2,500 - $8,500 per acre",
      typicalSize: "20-500 acres",
      bestAreas: ["South Georgia", "Middle Georgia", "North Georgia mountains", "Coastal areas"],
      income: "Hunting leases $8-25/acre",
      features: ["Wildlife management", "Timber revenue", "Recreation", "Privacy"],
      icon: Mountain
    },
    {
      type: "Mountain and Lake Property",
      description: "North Georgia mountains and numerous lakes throughout the state offer premium recreational and residential opportunities. Lake Lanier, Lake Oconee, and mountain communities attract affluent buyers seeking second homes and retirement destinations. Limited mountain and waterfront supply supports premium pricing.",
      priceRange: "$8,000 - $40,000 per acre",
      typicalSize: "1-100 acres",
      bestAreas: ["North Georgia", "Lake Lanier", "Lake Oconee", "Blue Ridge"],
      income: "Vacation rental potential",
      features: ["Water access", "Mountain views", "Recreation", "Tourism economy"],
      icon: Mountain
    },
    {
      type: "Investment and Path-of-Growth Land",
      description: "Atlanta's outward expansion and development along interstate corridors create excellent investment opportunities. Land in the path of growth appreciates as infrastructure and development advance. Investors purchase strategically located parcels for future development or resale.",
      priceRange: "$3,000 - $20,000 per acre",
      typicalSize: "5-200 acres",
      bestAreas: ["Atlanta outskirts", "Interstate corridors", "Growing cities", "Infrastructure areas"],
      income: "Appreciation potential",
      features: ["Growth trajectory", "Future development", "Strategic location", "Hold investment"],
      icon: Target
    }
  ];

  const marketTrends = [
    {
      trend: "Atlanta Metro Expansion",
      description: "Atlanta's metropolitan area continues expanding outward, with suburbs like Alpharetta, Cumming, Dawsonville, and Newnan experiencing rapid growth. As development pushes into outlying counties, land values appreciate significantly. This expansion creates ongoing opportunities for residential and commercial development.",
      impact: "Suburban land appreciation",
      timeframe: "Ongoing multi-decade trend",
      implications: ["Rising suburban values", "Infrastructure investment", "Development opportunities"]
    },
    {
      trend: "Port of Savannah Expansion",
      description: "The Port of Savannah's $5+ billion expansion project makes it the largest single-terminal container facility in North America. This growth drives massive demand for warehouse, distribution, and industrial land throughout coastal Georgia and along transportation corridors serving the port.",
      impact: "+40% container capacity",
      timeframe: "2020-2028",
      implications: ["Industrial land demand", "Logistics growth", "Infrastructure development"]
    },
    {
      trend: "Film Industry Economic Impact",
      description: "Georgia's film and TV production industry generates $9+ billion annually, supporting over 92,000 jobs. Major studios and streaming services maintain permanent production facilities. This industry creates sustained demand for studio space, crew housing, and supporting commercial development.",
      impact: "700+ productions annually",
      timeframe: "Sustained industry growth",
      implications: ["Studio demand", "Housing needs", "Commercial support services"]
    },
    {
      trend: "Business-Friendly Environment",
      description: "Georgia ranks consistently as a top state for business, offering competitive taxes, workforce training programs, and streamlined permitting. Corporate relocations and expansions from high-tax states continue, supporting commercial and industrial land demand while creating jobs that drive residential growth.",
      impact: "Corporate relocation surge",
      timeframe: "Accelerating trend",
      implications: ["Commercial development", "Job growth", "Population increase"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "Business-Friendly Tax Environment",
      description: "Georgia offers competitive property taxes and reasonable capital gains rates. The state's business-friendly environment attracts buyers and investors, creating strong demand. Property tax rates average significantly below northeastern states, making Georgia an attractive place to own and sell land.",
      savings: "Lower property tax burden",
      icon: DollarSign
    },
    {
      title: "Diverse Buyer Pool",
      description: "Georgia attracts residential developers, commercial investors, timber companies, hunters, farmers, and retirees. Atlanta's economic strength brings institutional buyers while recreational opportunities attract individual purchasers. This buyer diversity creates competitive markets across all property types.",
      savings: "Multiple buyer categories",
      icon: Users
    },
    {
      title: "Strong Appreciation Trends",
      description: "Georgia land has appreciated steadily due to population growth, economic expansion, and limited supply in desirable areas. Metro Atlanta expansion, port growth, and mountain/lake property scarcity all support continued appreciation. Sellers capture substantial gains.",
      savings: "Sustained value growth",
      icon: TrendingUp
    },
    {
      title: "Year-Round Active Market",
      description: "Georgia's moderate climate and diverse economy support year-round real estate activity. Unlike purely recreational markets, Georgia's business economy and growth maintain consistent buyer demand. Sellers can list and close transactions any season without waiting for market peaks.",
      savings: "No seasonal delays",
      icon: Clock
    }
  ];

  const buyerProfiles = [
    {
      type: "Residential Developers",
      description: "Large and small builders developing single-family subdivisions, townhome communities, and master-planned developments throughout metro Atlanta and growing cities. Georgia's population growth makes residential development consistently profitable.",
      typical_purchase: "$300K - $15M",
      decision_speed: "3-8 weeks",
      preferred_size: "10-300 acres",
      key_factors: ["Growth markets", "Infrastructure", "School districts", "Utilities"],
      percentage: "35%"
    },
    {
      type: "Timber and Agricultural Buyers",
      description: "Timber investment companies, farmers, and agricultural operators seeking productive land. These buyers value working land for timber production, row crops, pecans, blueberries, or cattle operations. Many combine agriculture with conservation.",
      typical_purchase: "$200K - $5M",
      decision_speed: "4-10 weeks",
      preferred_size: "50-2000 acres",
      key_factors: ["Soil quality", "Timber stands", "Water access", "Production potential"],
      percentage: "25%"
    },
    {
      type: "Commercial and Industrial Developers",
      description: "Companies developing retail centers, office buildings, industrial parks, and logistics facilities. Atlanta's growth and Port of Savannah expansion create exceptional commercial opportunities throughout the state.",
      typical_purchase: "$500K - $20M",
      decision_speed: "6-12 weeks",
      preferred_size: "5-200 acres",
      key_factors: ["Location", "Access", "Utilities", "Demographics"],
      percentage: "20%"
    },
    {
      type: "Individual and Recreational Buyers",
      description: "Private buyers seeking land for custom homes, recreation, hunting, or investment. Many out-of-state buyers relocate to Georgia for affordability and lifestyle. Hunters and outdoor enthusiasts seek recreational tracts throughout the state.",
      typical_purchase: "$50K - $2M",
      decision_speed: "2-8 weeks",
      preferred_size: "5-200 acres",
      key_factors: ["Affordability", "Recreation", "Privacy", "Lifestyle appeal"],
      percentage: "20%"
    }
  ];

  const regionalMarkets = [
    {
      region: "Metro Atlanta",
      description: "Metro Atlanta is the Southeast's largest metropolitan area and economic engine. The region's growth drives continuous demand for residential, commercial, and industrial land. Suburban expansion, corporate relocations, and infrastructure investment support strong land values throughout the metro.",
      population: "6.1M+",
      key_industries: ["Business Services", "Logistics", "Technology", "Film Production"],
      land_values: "$8,000-$40,000/acre",
      growth_rate: "+2.9% annually",
      advantages: [
        "Strongest job growth in Southeast",
        "Corporate headquarters concentration",
        "World's busiest airport",
        "Infrastructure investment",
        "Diverse economy"
      ],
      challenges: [
        "Higher land costs than rural Georgia",
        "Traffic and development pressure",
        "Increasing competition"
      ]
    },
    {
      region: "Coastal Georgia (Savannah Area)",
      description: "Coastal Georgia benefits from Port of Savannah growth, tourism, and historic appeal. Savannah's charm attracts residents and visitors while port expansion drives industrial development. Coastal lifestyle and beaches support residential values while logistics needs create industrial demand.",
      population: "405,000+ metro",
      key_industries: ["Port/Logistics", "Tourism", "Manufacturing", "Military"],
      land_values: "$6,000-$25,000/acre",
      growth_rate: "+2.4% annually",
      advantages: [
        "Port expansion driving growth",
        "Historic tourism economy",
        "Coastal lifestyle appeal",
        "International business",
        "Moderate climate"
      ],
      challenges: [
        "Hurricane exposure",
        "Environmental regulations",
        "Limited coastal supply"
      ]
    },
    {
      region: "North Georgia Mountains",
      description: "North Georgia mountains offer scenic beauty, recreation, and tourism appeal. Towns like Blue Ridge, Helen, and Dahlonega attract second-home buyers and retirees. Limited mountain land supply and proximity to Atlanta support premium values. Wine country and outdoor recreation drive tourism economy.",
      population: "600,000+ region",
      key_industries: ["Tourism", "Recreation", "Wine", "Manufacturing"],
      land_values: "$5,000-$30,000/acre",
      growth_rate: "+2.8% annually",
      advantages: [
        "Scenic mountain beauty",
        "Tourism economy",
        "Atlanta proximity",
        "Limited supply",
        "Four-season appeal"
      ],
      challenges: [
        "Topography limits development",
        "Seasonal economy",
        "Infrastructure needs"
      ]
    },
    {
      region: "Middle and South Georgia",
      description: "Middle and South Georgia offer affordable land, agricultural productivity, and recreational opportunities. The region supports timber, row crops, pecans, and cattle operations. Hunting and rural lifestyle attract buyers while agricultural operations provide income potential.",
      population: "2.5M+ region",
      key_industries: ["Agriculture", "Timber", "Military", "Manufacturing"],
      land_values: "$2,000-$8,000/acre",
      growth_rate: "+1.5% annually",
      advantages: [
        "Affordable land prices",
        "Agricultural productivity",
        "Timber income",
        "Hunting opportunities",
        "Rural lifestyle"
      ],
      challenges: [
        "Slower population growth",
        "Rural economy",
        "Distance from major metros"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Robert Johnson",
      location: "Cumming, Georgia",
      property: "45-acre residential development tract",
      content: "Inherited land north of Atlanta and wasn't sure about timing. Within 72 hours had multiple offers from builders. Closed in 17 days at $625,000. The team handled everything professionally and made it stress-free.",
      amount: "$625,000",
      timeToSell: "17 days",
      reason: "Inherited Property",
      rating: 5,
      year: "2024"
    },
    {
      name: "Patricia Williams",
      location: "Savannah, Georgia",
      property: "18-acre commercial site near I-95",
      content: "Held property for years waiting for the right opportunity. Connected me with a logistics company expanding due to port growth. Paid cash and closed in 14 days. Couldn't believe how quickly it happened.",
      amount: "$925,000",
      timeToSell: "14 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "Thomas Anderson",
      location: "Blue Ridge, Georgia",
      property: "28-acre mountain property",
      content: "Needed quick sale for business investment. Despite mountain location, had three serious buyers within a week. Closed with a luxury developer in 19 days. Exceeded my expectations completely.",
      amount: "$560,000",
      timeToSell: "19 days",
      reason: "Business Investment",
      rating: 5,
      year: "2023"
    },
    {
      name: "Mary Thompson",
      location: "Macon, Georgia",
      property: "220-acre timber tract",
      content: "Family owned timber land for generations. Working with this network made selling easy. Found a timber investment company who understood the property value. Fair price, smooth closing in just 15 days.",
      amount: "$1,210,000",
      timeToSell: "15 days",
      reason: "Estate Liquidation",
      rating: 5,
      year: "2024"
    }
  ];

  const faqs = [
    {
      question: "Why is Georgia land in demand?",
      answer: "Georgia offers multiple growth drivers: Atlanta's expanding metro area, Port of Savannah's rapid growth, thriving film industry, business-friendly environment, and population growth. The state attracts corporate relocations, logistics operations, residential developers, and individual buyers seeking affordability and southern lifestyle. Agricultural and timber land provides income while mountain and lake properties offer recreational appeal."
    },
    {
      question: "How quickly can I sell Georgia land?",
      answer: "Most Georgia land sales close in 14-21 days through our buyer network. Metro Atlanta properties and growth corridor land often sell fastest due to high developer demand. Agricultural, timber, and recreational properties typically close in 14-28 days. We work with cash buyers ready to purchase, enabling quick transactions throughout the state."
    },
    {
      question: "What types of Georgia land are most valuable?",
      answer: "Metro Atlanta development land commands highest prices due to population growth. North Georgia mountain properties and lake frontage bring premium pricing due to limited supply and recreational appeal. Commercial land near interstates and the Port of Savannah appreciates due to logistics growth. Timber and agricultural land offer steady values with income potential."
    },
    {
      question: "How do Georgia property taxes work when selling land?",
      answer: "Georgia has moderate property taxes compared to many states. You'll pay federal capital gains tax on your sale profit. Georgia state capital gains are taxed as regular income, though retirement income exemptions may apply for some sellers. Property taxes are prorated at closing. Agricultural land may have preferential assessment that reverts upon sale."
    },
    {
      question: "Can I sell land in rural Georgia quickly?",
      answer: "Yes! We have buyers specifically interested in rural Georgia land for timber, agriculture, hunting, and recreation. While rural land may take slightly longer than metro properties, we regularly close sales in 14-28 days. South and Middle Georgia agricultural and timber land attracts serious buyers who understand working land values."
    },
    {
      question: "What if my Georgia land has timber or is being farmed?",
      answer: "Timber and agricultural operations add value. Many buyers specifically seek working land with timber income, crop production, or grazing operations. We work with timber companies, farmers, and investors who understand and value these assets. Standing timber, productive soils, and existing leases can increase land value and buyer interest."
    },
    {
      question: "How does Atlanta's growth affect land values statewide?",
      answer: "Atlanta's expansion as the Southeast's largest metro creates ripple effects throughout Georgia. Suburban growth in counties surrounding the metro drives residential land demand. Atlanta's logistics importance increases industrial land values along transportation corridors. Port of Savannah growth connects to Atlanta's trade, supporting coastal development. The metro's economic strength benefits the entire state."
    },
    {
      question: "What makes Georgia better for selling land than neighboring states?",
      answer: "Georgia offers a unique combination: Atlanta's major metro economy, Port of Savannah's growth, business-friendly environment, diverse geography from mountains to coast, and affordability compared to Florida and North Carolina. The film industry adds economic strength while moderate climate supports year-round markets. These factors create strong, diverse buyer demand across all property types."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-georgia" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Georgia property information and will contact you within 24 hours with cash offers from our network of Georgia land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Georgia specialists review your property details</span>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
              <MapPin className="w-8 h-8 text-red-600" />
              <Badge className="bg-red-100 text-red-800 px-6 py-3 text-lg font-bold shadow-lg">
                Georgia Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Georgia Land <span className="text-red-600">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Georgia land in 24-48 hours. We have active buyers throughout the Peach State ready to purchase your property quickly.
            </p>

            {/* Georgia Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {georgiaStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <stat.icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-red-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-red-600"
              >
                Get Georgia Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Georgia Specialists • 100% Free</span>
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
              Popular Georgia Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Georgia, from the mountains to the coast
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-red-600" />
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
              Georgia's Economic Strengths
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
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
              Types of Georgia Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From mountain property to agricultural land, we have buyers for every type of Georgia land
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
              Georgia Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions favor Georgia land sellers
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
              Georgia Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each region of Georgia offers unique opportunities and market dynamics
            </p>
          </div>

          <div className="space-y-8">
            {regionalMarkets.map((region, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-red-600" />
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
              Georgia Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Georgia is an ideal state to sell land in
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
              Our Georgia Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Georgia who are ready to purchase land quickly
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
              Georgia Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Georgia landowners who sold their property fast for cash
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
              Get Cash Offers for Your Georgia Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Georgia land specialists will contact you within 24 hours
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="Enter your phone number"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Georgia Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter the property address or county in Georgia"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                      placeholder="e.g., 20 acres, 1 acre, 100 acres"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 w-full px-3"
                    >
                      <option value="Residential Land">Residential Land</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Timber Land">Timber Land</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                      <option value="Recreational Land">Recreational Land</option>
                      <option value="Mountain Property">Mountain Property</option>
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 w-full px-3"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
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
                    className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 w-full px-3"
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
                    className="w-full rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 px-4 py-3"
                    placeholder="Tell us anything else about your Georgia property that might be helpful..."
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
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-red-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Get My Georgia Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Georgia land buyers
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
              Georgia Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Georgia
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Sell Your Georgia Land?
          </h2>
          <p className="text-xl mb-12 text-gray-900 max-w-2xl mx-auto">
            Join hundreds of Georgia landowners who chose the fast, easy way to sell their land for cash
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
            {georgiaStats.map((stat, index) => (
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
