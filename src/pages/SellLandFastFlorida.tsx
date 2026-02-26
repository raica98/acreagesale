import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Waves, TreePalm as Palmtree } from 'lucide-react';
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

export function SellLandFastFlorida() {
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
        state: 'Florida',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_florida_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_florida_inquiries', JSON.stringify(existingSubmissions));

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

  const floridaStats = [
    { label: "Avg. Land Value", value: "$12,500/acre", trend: "+22%", icon: DollarSign },
    { label: "Active Buyers", value: "500+", trend: "High Demand", icon: Users },
    { label: "Avg. Sale Time", value: "15 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "97%", trend: "Proven Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Orlando", population: "2.7M+ metro", growth: "+3.8%", avgPrice: "$18,500/acre" },
    { name: "Tampa", population: "3.2M+ metro", growth: "+3.2%", avgPrice: "$22,000/acre" },
    { name: "Jacksonville", population: "1.6M+ metro", growth: "+2.9%", avgPrice: "$14,500/acre" },
    { name: "Miami", population: "6.1M+ metro", growth: "+2.4%", avgPrice: "$85,000/acre" },
    { name: "Naples", population: "400,000+ metro", growth: "+4.1%", avgPrice: "$45,000/acre" },
    { name: "Sarasota", population: "850,000+ metro", growth: "+3.9%", avgPrice: "$38,000/acre" },
    { name: "Ocala", population: "380,000+ metro", growth: "+4.5%", avgPrice: "$12,000/acre" },
    { name: "Fort Myers", population: "770,000+ metro", growth: "+4.8%", avgPrice: "$35,000/acre" },
    { name: "Tallahassee", population: "390,000+ metro", growth: "+2.1%", avgPrice: "$8,500/acre" },
    { name: "Lakeland", population: "720,000+ metro", growth: "+3.5%", avgPrice: "$15,000/acre" }
  ];

  const economicDrivers = [
    {
      title: "Tourism and Hospitality",
      description: "Florida is the #1 tourist destination in the United States, attracting over 130 million visitors annually. Theme parks, beaches, and attractions drive massive demand for vacation rentals, hotels, restaurants, and entertainment venues, creating exceptional opportunities for commercial and hospitality land.",
      impact: "Sustained commercial property demand",
      locations: ["Orlando", "Miami", "Tampa", "Coastal Areas"],
      icon: Palmtree
    },
    {
      title: "Population Growth and Migration",
      description: "Florida is the fastest-growing state, adding over 300,000 new residents annually. People relocate from high-tax states for the favorable climate, no state income tax, and quality of life. This explosive growth creates unprecedented demand for residential development land.",
      impact: "Record residential land values",
      locations: ["All Major Markets", "Suburbs", "Growth Corridors"],
      icon: TrendingUp
    },
    {
      title: "Retirement and Active Adult Living",
      description: "Florida remains America's premier retirement destination with over 4.5 million residents aged 65+. Retirement communities, active adult developments, and senior housing drive substantial land demand, particularly in Southwest and Central Florida markets.",
      impact: "Premium senior housing land demand",
      locations: ["Naples", "Sarasota", "The Villages", "Port St. Lucie"],
      icon: Heart
    },
    {
      title: "Technology and Business Growth",
      description: "Major tech companies including Amazon, Microsoft, and Oracle have expanded significantly in Florida. Miami has emerged as a tech hub, while Tampa, Orlando, and Jacksonville attract corporate relocations. Business-friendly policies and no state income tax drive commercial and office development.",
      impact: "Commercial and office land appreciation",
      locations: ["Miami", "Tampa", "Orlando", "Jacksonville"],
      icon: Building
    }
  ];

  const landTypes = [
    {
      type: "Residential Development Land",
      description: "Florida's explosive population growth creates insatiable demand for residential development. From single-family subdivisions to master-planned communities, residential land values have appreciated dramatically. Prime locations near employment centers, schools, and amenities command premium prices.",
      priceRange: "$10,000 - $100,000 per acre",
      typicalSize: "5-500 acres",
      bestAreas: ["Orlando suburbs", "Tampa Bay", "Jacksonville", "Fort Myers"],
      income: "Development profits",
      features: ["High growth markets", "Strong demographics", "Infrastructure", "School districts"],
      icon: Building
    },
    {
      type: "Waterfront and Coastal Property",
      description: "Florida's 1,350 miles of coastline make waterfront property exceptionally valuable. Beach access, ocean views, bay frontage, and canal lots command premium pricing. Limited coastal land supply combined with strong second-home and vacation rental demand support continued appreciation.",
      priceRange: "$50,000 - $500,000+ per acre",
      typicalSize: "0.25-20 acres",
      bestAreas: ["Gulf Coast", "Atlantic Coast", "Keys", "Coastal communities"],
      income: "Vacation rental potential",
      features: ["Water access", "Beach proximity", "Tourism economy", "Scarcity value"],
      icon: Waves
    },
    {
      type: "Agricultural Land",
      description: "Florida's year-round growing season supports diverse agriculture including citrus groves, cattle ranches, vegetable farms, and nurseries. Agricultural land offers income potential, conservation easement opportunities, and long-term appreciation as development pressure increases.",
      priceRange: "$3,000 - $15,000 per acre",
      typicalSize: "20-1000+ acres",
      bestAreas: ["Central Florida", "Polk County", "Hendry County", "Okeechobee"],
      income: "$150-800/acre annually",
      features: ["Citrus groves", "Cattle operations", "Tax benefits", "Rural preservation"],
      icon: TreePine
    },
    {
      type: "Commercial and Retail Land",
      description: "Florida's population growth and tourism economy create exceptional demand for retail, restaurant, hotel, and mixed-use development sites. High-traffic corridors, interstate access, and tourist destinations offer prime commercial opportunities.",
      priceRange: "$15,000 - $150,000 per acre",
      typicalSize: "1-50 acres",
      bestAreas: ["Tourist corridors", "Interstate exits", "Urban markets", "Growth areas"],
      income: "Long-term lease income",
      features: ["Traffic counts", "Visibility", "Demographics", "Tourism access"],
      icon: ShoppingBag
    },
    {
      type: "Recreational and Hunting Land",
      description: "Florida's diverse ecosystems attract hunters and outdoor enthusiasts. Timberland, hunting tracts, and recreational properties offer privacy, wildlife, and potential income from hunting leases. Northern and Central Florida provide the best recreational opportunities.",
      priceRange: "$2,500 - $8,000 per acre",
      typicalSize: "20-500 acres",
      bestAreas: ["North Florida", "Panhandle", "Central Florida", "Rural areas"],
      income: "Hunting leases $5-20/acre",
      features: ["Wildlife", "Timber income", "Recreation", "Privacy"],
      icon: Mountain
    },
    {
      type: "Investment and Infill Land",
      description: "Smaller infill parcels in growth corridors offer excellent investment potential. As development expands, strategically located lots appreciate significantly. Many investors purchase land in the path of growth and hold for future appreciation or development.",
      priceRange: "$5,000 - $50,000 per acre",
      typicalSize: "1-50 acres",
      bestAreas: ["Growth corridors", "Suburban areas", "Near infrastructure", "Master plans"],
      income: "Appreciation potential",
      features: ["Growth path", "Future development", "Strategic location", "Holding investment"],
      icon: Target
    }
  ];

  const marketTrends = [
    {
      trend: "Record Population Growth",
      description: "Florida adds more residents than any other state, with over 300,000 people relocating annually. This unprecedented migration creates sustained demand for all property types, particularly residential development land. Growth shows no signs of slowing.",
      impact: "+1.9% annually",
      timeframe: "2020-2024",
      implications: ["Housing shortage", "Land scarcity", "Rising prices"]
    },
    {
      trend: "No State Income Tax Advantage",
      description: "Florida's lack of state income tax attracts high-earning individuals and businesses from states like New York, California, and Illinois. This tax advantage drives continued migration and supports premium real estate values statewide.",
      impact: "Sustained in-migration",
      timeframe: "Permanent structural advantage",
      implications: ["Wealthy buyer influx", "Business relocations", "Premium pricing"]
    },
    {
      trend: "Climate and Lifestyle Appeal",
      description: "Year-round sunshine, warm weather, beaches, and outdoor recreation make Florida a lifestyle destination. Remote work has amplified this appeal, allowing professionals to choose location based on quality of life rather than proximity to employment.",
      impact: "+40% remote workers",
      timeframe: "2020-2024",
      implications: ["Suburban land demand", "Secondary market growth", "Lifestyle pricing"]
    },
    {
      trend: "Limited Coastal Inventory",
      description: "Florida's coastline is finite while demand continues growing. Coastal properties, particularly Gulf Coast markets, have seen exceptional appreciation. Environmental regulations and conservation efforts further restrict developable coastal land supply.",
      impact: "+35% coastal appreciation",
      timeframe: "5-year trend",
      implications: ["Premium coastal values", "Scarcity pricing", "Investment demand"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "No State Income Tax Benefits",
      description: "Florida has no state income tax, making it attractive for land sales. You won't pay state capital gains tax on your land sale proceeds. This advantage saves sellers thousands compared to high-tax states, making Florida an ideal place to liquidate real estate.",
      savings: "Save 3-13% vs high-tax states",
      icon: DollarSign
    },
    {
      title: "Strong Year-Round Market",
      description: "Unlike seasonal markets, Florida's real estate market stays active year-round. Consistent buyer demand from retirees, investors, and relocating families means you can sell quickly any time of year without waiting for seasonal peaks.",
      savings: "Sell 30% faster year-round",
      icon: Clock
    },
    {
      title: "Massive Buyer Pool",
      description: "Florida attracts buyers from across the U.S. and internationally. Investors, developers, retirees, and relocating families all compete for Florida land. This diverse buyer pool creates competitive bidding and supports strong pricing for sellers.",
      savings: "Multiple offer potential",
      icon: Users
    },
    {
      title: "Appreciation Momentum",
      description: "Florida land values have appreciated faster than most states due to population growth and limited supply. Selling now captures substantial appreciation while demand remains strong. Many sellers realize significant gains even on short holding periods.",
      savings: "Capture appreciation gains",
      icon: TrendingUp
    }
  ];

  const buyerProfiles = [
    {
      type: "Residential Developers",
      description: "Large and small builders actively seeking land for single-family subdivisions, townhome communities, and master-planned developments. Florida's population growth makes residential development extremely profitable.",
      typical_purchase: "$500K - $20M",
      decision_speed: "3-8 weeks",
      preferred_size: "10-500 acres",
      key_factors: ["Growth markets", "Utilities", "Zoning", "Demographics"],
      percentage: "35%"
    },
    {
      type: "Investment Groups and REITs",
      description: "Institutional investors purchasing Florida land for appreciation, development, or portfolio diversification. These buyers often pay cash and can close quickly on larger tracts.",
      typical_purchase: "$1M - $50M",
      decision_speed: "4-10 weeks",
      preferred_size: "50-2000 acres",
      key_factors: ["Appreciation potential", "Development rights", "Location", "Market fundamentals"],
      percentage: "25%"
    },
    {
      type: "Commercial Developers",
      description: "Developers creating retail centers, hotels, restaurants, office buildings, and mixed-use projects. Florida's tourism and business growth create exceptional commercial opportunities.",
      typical_purchase: "$500K - $15M",
      decision_speed: "6-12 weeks",
      preferred_size: "2-100 acres",
      key_factors: ["Traffic counts", "Demographics", "Visibility", "Accessibility"],
      percentage: "20%"
    },
    {
      type: "Individual Buyers and Small Investors",
      description: "Private individuals purchasing land for personal use, small developments, or investment. Many seek affordable Florida land to hold for appreciation or build custom homes.",
      typical_purchase: "$50K - $2M",
      decision_speed: "2-6 weeks",
      preferred_size: "1-50 acres",
      key_factors: ["Affordability", "Location", "Future potential", "Lifestyle appeal"],
      percentage: "20%"
    }
  ];

  const regionalMarkets = [
    {
      region: "South Florida (Miami-Fort Lauderdale-West Palm Beach)",
      description: "South Florida is an international gateway with exceptional luxury markets, dense development, and premium coastal properties. Miami has emerged as a major tech and finance hub while maintaining its tourism and international business strengths.",
      population: "6.1M+",
      key_industries: ["Tourism", "International Business", "Technology", "Finance"],
      land_values: "$50,000-$500,000+/acre",
      growth_rate: "+2.4% annually",
      advantages: [
        "International buyer demand",
        "Luxury market strength",
        "Technology hub emergence",
        "Year-round activity",
        "Limited land supply"
      ],
      challenges: [
        "Highest land costs in Florida",
        "Intense competition",
        "Complex regulations"
      ]
    },
    {
      region: "Central Florida (Orlando-Tampa-Lakeland)",
      description: "Central Florida is the state's fastest-growing region, anchored by Orlando's theme parks and Tampa's diverse economy. Inland location offers more affordable land with exceptional growth potential and strong employment.",
      population: "7.5M+",
      key_industries: ["Tourism", "Technology", "Healthcare", "Distribution"],
      land_values: "$8,000-$40,000/acre",
      growth_rate: "+3.5% annually",
      advantages: [
        "Fastest growth in Florida",
        "Major employment centers",
        "Theme park economy",
        "Distribution hub",
        "Affordable land"
      ],
      challenges: [
        "Rapid development creating infrastructure needs",
        "Increasing competition",
        "Weather risks"
      ]
    },
    {
      region: "Southwest Florida (Naples-Fort Myers-Sarasota)",
      description: "Southwest Florida Gulf Coast markets combine luxury living, retirement appeal, and beach lifestyle. Strong second-home and vacation rental markets support premium coastal values while inland areas offer affordable opportunities.",
      population: "2.8M+",
      key_industries: ["Tourism", "Retirement Services", "Healthcare", "Real Estate"],
      land_values: "$15,000-$100,000/acre",
      growth_rate: "+4.2% annually",
      advantages: [
        "Gulf Coast beaches",
        "Luxury market strength",
        "Retirement destination",
        "Strong appreciation",
        "Quality of life"
      ],
      challenges: [
        "Hurricane exposure",
        "Seasonal economy",
        "High insurance costs"
      ]
    },
    {
      region: "Northeast Florida (Jacksonville-St. Augustine)",
      description: "Northeast Florida offers more affordable land with strong growth fundamentals. Jacksonville's port and military presence provide economic stability while St. Augustine's historic tourism and beaches support coastal values.",
      population: "1.6M+",
      key_industries: ["Military", "Port/Logistics", "Healthcare", "Tourism"],
      land_values: "$5,000-$30,000/acre",
      growth_rate: "+2.9% annually",
      advantages: [
        "Affordable land",
        "Port and logistics strength",
        "Military stability",
        "Atlantic beaches",
        "Lower cost of living"
      ],
      challenges: [
        "Slower growth than Central/SW Florida",
        "Less investor attention",
        "More seasonal tourism"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Michael Rodriguez",
      location: "Tampa, Florida",
      property: "38-acre residential development tract",
      content: "We inherited land outside Tampa and weren't sure about its value. Within 48 hours, had three cash offers from developers. Closed in 19 days at $720,000 - way more than we expected. The team made it incredibly easy.",
      amount: "$720,000",
      timeToSell: "19 days",
      reason: "Inherited Property",
      rating: 5,
      year: "2024"
    },
    {
      name: "Susan Williams",
      location: "Orlando, Florida",
      property: "12-acre commercial site on major highway",
      content: "Held this property for 8 years waiting for the right buyer. Connected me with a hotel developer who paid cash and closed in 2 weeks. Couldn't believe how fast and smooth the process was.",
      amount: "$1,850,000",
      timeToSell: "14 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "James Thompson",
      location: "Naples, Florida",
      property: "5-acre waterfront parcel",
      content: "Divorce required quick sale of our Naples property. Despite tight timeline, got multiple offers above asking price. Closed in 16 days with a luxury home builder. Professional service during difficult time.",
      amount: "$2,100,000",
      timeToSell: "16 days",
      reason: "Divorce Settlement",
      rating: 5,
      year: "2023"
    },
    {
      name: "Linda Martinez",
      location: "Jacksonville, Florida",
      property: "150-acre timber tract",
      content: "Needed to liquidate investment property to fund new business. Found a timber investment company through this network who paid fair value and closed in just 12 days. Excellent experience.",
      amount: "$825,000",
      timeToSell: "12 days",
      reason: "Business Investment",
      rating: 5,
      year: "2024"
    }
  ];

  const faqs = [
    {
      question: "Why is Florida land in such high demand?",
      answer: "Florida is the fastest-growing state with over 300,000 new residents annually. No state income tax, year-round sunshine, beaches, and lifestyle appeal attract people from across the U.S. Limited land supply, particularly coastal areas, combined with population growth creates exceptional demand. Tourism, business growth, and retirement migration all contribute to sustained buyer interest."
    },
    {
      question: "How quickly can I sell Florida land?",
      answer: "Most Florida land sales through our network close in 14-25 days. Florida's active year-round market and large buyer pool enable fast sales. We work with cash buyers specifically interested in Florida properties who can move quickly. For urgent situations, we can often arrange closings in as little as 7-10 days."
    },
    {
      question: "What Florida land types are most valuable?",
      answer: "Waterfront and coastal properties command the highest prices due to limited supply and strong demand. Residential development land near growing cities also brings premium pricing. Agricultural land, particularly citrus groves and cattle ranches, offers steady value. Commercial sites near tourist destinations and growth corridors appreciate rapidly."
    },
    {
      question: "How do property taxes work when selling Florida land?",
      answer: "Florida has no state income tax, so you won't pay state capital gains tax on land sales. You'll pay federal capital gains tax based on your holding period and income level. If you've owned the land over one year, you qualify for favorable long-term capital gains rates. Property taxes are prorated at closing."
    },
    {
      question: "What if my Florida land is in a flood zone or has environmental issues?",
      answer: "Many Florida properties are in FEMA flood zones or have wetlands. This is common and expected. We work with buyers who regularly purchase properties with environmental considerations. Flood zones, wetlands, and conservation areas don't prevent sales, though they affect pricing. Our buyers understand and can work through these issues."
    },
    {
      question: "Can I sell Florida land if I live out of state?",
      answer: "Absolutely! Many Florida landowners live elsewhere. We handle remote closings regularly and coordinate with title companies and attorneys to complete transactions without you traveling to Florida. All documents can be handled electronically or by mail. We have extensive experience with out-of-state sellers."
    },
    {
      question: "How does hurricane risk affect Florida land values?",
      answer: "Hurricane risk is a Florida reality, but it hasn't diminished land demand. Building codes have improved dramatically, and buyers understand the risks. Coastal properties command premium prices despite hurricane exposure. Insurance costs are factored into buyer decisions but don't prevent strong market activity."
    },
    {
      question: "What makes Florida better for selling land than other states?",
      answer: "Florida offers unique advantages: no state income tax (saving sellers thousands), year-round active market, massive diverse buyer pool, strong appreciation trends, and limited coastal supply. Population growth exceeds all states except Texas. Tourism economy adds commercial demand. These factors create exceptional seller conditions."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-florida" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Florida property information and will contact you within 24 hours with cash offers from our network of Florida land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Florida specialists review your property details</span>
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
              <MapPin className="w-8 h-8 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800 px-6 py-3 text-lg font-bold shadow-lg">
                Florida Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Florida Land <span className="text-orange-600">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Florida land in 24-48 hours. We have active buyers throughout the Sunshine State ready to purchase your property quickly.
            </p>

            {/* Florida Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {floridaStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-orange-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-orange-600"
              >
                Get Florida Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Florida Specialists • 100% Free</span>
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
              Popular Florida Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Florida, from the Panhandle to the Keys
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-orange-600" />
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
              Florida's Economic Strengths
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
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
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
              Types of Florida Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From beach property to citrus groves, we have buyers for every type of Florida land
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
              Florida Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions favor Florida land sellers
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
              Florida Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each region of Florida offers unique opportunities and market dynamics
            </p>
          </div>

          <div className="space-y-8">
            {regionalMarkets.map((region, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-orange-600" />
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
              Florida Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Florida is an ideal state to sell land in
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
              Our Florida Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Florida who are ready to purchase land quickly
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
              Florida Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Florida landowners who sold their property fast for cash
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
              Get Cash Offers for Your Florida Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Florida land specialists will contact you within 24 hours
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Enter your phone number"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Florida Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Enter the property address or county in Florida"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 w-full px-3"
                    >
                      <option value="Residential Land">Residential Land</option>
                      <option value="Waterfront Property">Waterfront Property</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Recreational Land">Recreational Land</option>
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 w-full px-3"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="e.g., $250,000 or leave blank"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Selling *
                  </label>
                  <select
                    {...form.register('reasonForSelling')}
                    className="h-12 rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 w-full px-3"
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
                    className="w-full rounded-xl border-gray-300 focus:border-orange-500 focus:ring-orange-500 px-4 py-3"
                    placeholder="Tell us anything else about your Florida property that might be helpful..."
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
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-orange-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Get My Florida Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Florida land buyers
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
              Florida Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Florida
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Sell Your Florida Land?
          </h2>
          <p className="text-xl mb-12 text-gray-900 max-w-2xl mx-auto">
            Join thousands of Florida landowners who chose the fast, easy way to sell their land for cash
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
            {floridaStats.map((stat, index) => (
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
