import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Waves, Chrome as Home } from 'lucide-react';
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

export function SellLandFastIdaho() {
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
        state: 'Idaho',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_idaho_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_idaho_inquiries', JSON.stringify(existingSubmissions));

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

  const idahoStats = [
    { label: "Avg. Land Value", value: "$4,500/acre", trend: "+24%", icon: DollarSign },
    { label: "Active Buyers", value: "200+", trend: "Strong Demand", icon: Users },
    { label: "Avg. Sale Time", value: "12 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "98%", trend: "Proven Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Boise", population: "750,000+ metro", growth: "+4.8%", avgPrice: "$12,000/acre" },
    { name: "Idaho Falls", population: "155,000+ metro", growth: "+3.2%", avgPrice: "$6,500/acre" },
    { name: "Twin Falls", population: "110,000+ metro", growth: "+2.8%", avgPrice: "$5,200/acre" },
    { name: "Coeur d'Alene", population: "175,000+ metro", growth: "+4.5%", avgPrice: "$18,000/acre" },
    { name: "Nampa", population: "125,000+", growth: "+5.1%", avgPrice: "$10,500/acre" },
    { name: "Meridian", population: "135,000+", growth: "+5.5%", avgPrice: "$14,000/acre" },
    { name: "Pocatello", population: "95,000+ metro", growth: "+2.1%", avgPrice: "$4,800/acre" },
    { name: "Post Falls", population: "40,000+", growth: "+6.2%", avgPrice: "$16,500/acre" },
    { name: "Caldwell", population: "65,000+", growth: "+4.9%", avgPrice: "$9,800/acre" },
    { name: "Sun Valley", population: "6,000+", growth: "+3.8%", avgPrice: "$85,000/acre" }
  ];

  const economicDrivers = [
    {
      title: "Technology and Remote Work Migration",
      description: "Idaho has become a top destination for tech workers and remote professionals escaping high-cost states like California, Washington, and Oregon. Major tech companies including Micron Technology anchor the economy while remote workers bring high incomes. This migration drives exceptional demand for residential land, particularly near Boise and outdoor recreation areas.",
      impact: "Record population growth",
      locations: ["Boise", "Coeur d'Alene", "Sun Valley", "McCall"],
      icon: Building
    },
    {
      title: "Outdoor Recreation and Tourism",
      description: "Idaho's pristine wilderness, world-class skiing, fishing, hunting, and whitewater rafting attract millions of visitors and second-home buyers. Sun Valley rivals Colorado resorts while numerous mountain towns offer authentic Western experiences. Outdoor recreation economy supports land values near recreation areas and creates vacation rental opportunities.",
      impact: "Tourism and second-home demand",
      locations: ["Sun Valley", "McCall", "Stanley", "Island Park"],
      icon: Mountain
    },
    {
      title: "Agriculture and Food Production",
      description: "Idaho is America's top potato producer and a major agricultural state growing wheat, barley, sugar beets, and dairy. The Snake River Plain's fertile soils and irrigation create highly productive farmland. Agricultural operations provide income potential while proximity to western markets supports agricultural land values.",
      impact: "Strong agricultural economy",
      locations: ["Snake River Valley", "Magic Valley", "Eastern Idaho", "Treasure Valley"],
      icon: TreePine
    },
    {
      title: "Business-Friendly Environment",
      description: "Idaho offers low taxes, minimal regulations, and pro-business policies that attract companies and entrepreneurs. The state has no inventory tax and features one of the nation's lowest business tax burdens. This environment drives corporate relocations, manufacturing growth, and commercial real estate demand.",
      impact: "Business expansion and job creation",
      locations: ["Boise", "Nampa", "Meridian", "Idaho Falls"],
      icon: Briefcase
    }
  ];

  const landTypes = [
    {
      type: "Residential Development Land",
      description: "Idaho's explosive population growth creates exceptional residential land demand. Boise's metro expansion and mountain town development offer development opportunities. Remote workers seeking mountain lifestyle drive demand for larger lots and rural residential properties throughout the state.",
      priceRange: "$5,000 - $30,000 per acre",
      typicalSize: "5-100 acres",
      bestAreas: ["Boise metro", "Coeur d'Alene", "Idaho Falls", "Mountain valleys"],
      income: "Development profits",
      features: ["Population growth", "Quality of life", "Outdoor access", "Remote work appeal"],
      icon: Home
    },
    {
      type: "Mountain and Recreational Property",
      description: "Idaho's mountains attract buyers seeking recreation, privacy, and natural beauty. Properties near skiing, hunting, fishing, and outdoor activities command premium prices. Limited mountain land supply and increasing out-of-state buyer demand support strong appreciation. Many buyers seek vacation homes or off-grid properties.",
      priceRange: "$3,000 - $100,000 per acre",
      typicalSize: "5-500 acres",
      bestAreas: ["Sun Valley area", "McCall", "North Idaho", "Island Park"],
      income: "Vacation rental potential",
      features: ["Mountain views", "Recreation access", "Privacy", "Natural beauty"],
      icon: Mountain
    },
    {
      type: "Agricultural and Ranch Land",
      description: "Idaho's agricultural land produces potatoes, wheat, cattle, and dairy products. Irrigated farmland offers excellent production while ranch land provides livestock operations. Water rights add significant value. Many buyers combine agriculture with conservation or recreation, creating diverse market appeal.",
      priceRange: "$1,500 - $12,000 per acre",
      typicalSize: "40-5000 acres",
      bestAreas: ["Snake River Valley", "Magic Valley", "Treasure Valley", "Eastern Idaho"],
      income: "$200-800/acre annually",
      features: ["Irrigation", "Water rights", "Soil quality", "Production history"],
      icon: TreePine
    },
    {
      type: "Hunting and Wildlife Land",
      description: "Idaho offers exceptional hunting for elk, deer, antelope, upland birds, and waterfowl. Hunting properties attract buyers from across the U.S. seeking premier wildlife habitat. Timber provides additional income while remote locations offer privacy. Hunting lease income supplements holding costs.",
      priceRange: "$1,000 - $6,000 per acre",
      typicalSize: "40-1000 acres",
      bestAreas: ["Central Idaho", "Eastern Idaho", "Panhandle region", "Clearwater area"],
      income: "Hunting leases $10-35/acre",
      features: ["Wildlife habitat", "Timber income", "Privacy", "Recreation"],
      icon: TreePine
    },
    {
      type: "Waterfront and River Property",
      description: "Idaho's rivers, lakes, and streams offer valuable waterfront opportunities. Snake River, Salmon River, and numerous lakes provide fishing, recreation, and scenic beauty. Waterfront is scarce and highly sought after. Many properties offer year-round recreation with excellent appreciation potential.",
      priceRange: "$10,000 - $150,000 per acre",
      typicalSize: "1-100 acres",
      bestAreas: ["Payette Lakes", "Priest Lake", "Salmon River", "Snake River"],
      income: "Vacation rental income",
      features: ["Water access", "Fishing", "Recreation", "Scarcity value"],
      icon: Waves
    },
    {
      type: "Investment and Path-of-Growth Land",
      description: "Boise's rapid expansion and population growth create investment opportunities. Land in development paths appreciates as growth continues. Strategic parcels near expanding cities offer future subdivision or development potential. Idaho's growth trajectory supports long-term appreciation.",
      priceRange: "$3,000 - $20,000 per acre",
      typicalSize: "5-200 acres",
      bestAreas: ["Boise outskirts", "Meridian area", "Nampa corridors", "Growth paths"],
      income: "Appreciation potential",
      features: ["Growth trajectory", "Infrastructure", "Strategic location", "Future development"],
      icon: Target
    }
  ];

  const marketTrends = [
    {
      trend: "California and West Coast Migration",
      description: "Idaho leads the nation in percentage population growth as Californians, Oregonians, and Washingtonians relocate for affordability, lower taxes, and quality of life. This migration brings higher incomes and strong purchasing power. Remote work enables professionals to choose location based on lifestyle rather than employment proximity.",
      impact: "+3.9% annually (fastest growing)",
      timeframe: "2020-2024 accelerated",
      implications: ["Housing shortage", "Rising land values", "Development opportunities"]
    },
    {
      trend: "Limited Land Supply Constraints",
      description: "Federal lands comprise 62% of Idaho, limiting developable acreage. Topography further restricts development in mountainous areas. This supply constraint combined with strong demand creates exceptional appreciation pressure. Desirable areas near Boise, Coeur d'Alene, and mountain towns face severe land scarcity.",
      impact: "Supply-demand imbalance",
      timeframe: "Permanent structural limitation",
      implications: ["Continued appreciation", "Premium pricing", "Development challenges"]
    },
    {
      trend: "Outdoor Recreation Economy Growth",
      description: "Outdoor recreation contributes $7+ billion annually to Idaho's economy. World-class skiing, fishing, hunting, mountain biking, and river sports attract visitors and residents. Recreation economy supports land values near amenities while creating vacation rental and second-home demand throughout mountain regions.",
      impact: "$7B+ recreation economy",
      timeframe: "Growing industry",
      implications: ["Tourism land demand", "Second-home growth", "Mountain town appreciation"]
    },
    {
      trend: "Technology Sector Expansion",
      description: "Technology employment grows rapidly in Idaho, led by Micron Technology's massive expansion and numerous startups. Remote tech workers relocate for lifestyle while maintaining high salaries. This sector growth supports residential land demand and creates commercial opportunities in urban areas.",
      impact: "High-wage job growth",
      timeframe: "Accelerating trend",
      implications: ["Professional buyer influx", "Income support", "Urban expansion"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "Exceptional Appreciation Momentum",
      description: "Idaho land values have appreciated faster than nearly any state due to population influx and limited supply. Many sellers realize substantial gains even on short holding periods. Current momentum creates optimal selling conditions as demand continues outpacing supply across property types.",
      savings: "Capture strong appreciation",
      icon: TrendingUp
    },
    {
      title: "Affluent Out-of-State Buyer Pool",
      description: "California, Washington, and Oregon buyers bring strong purchasing power from home equity in expensive markets. These buyers often pay cash and can close quickly. Competition among out-of-state buyers seeking Idaho's lifestyle advantages supports premium pricing.",
      savings: "Cash buyer availability",
      icon: Users
    },
    {
      title: "Limited Competition from Sellers",
      description: "Idaho's land supply constraints mean fewer properties compete for buyers. Scarcity creates seller-favorable conditions where quality properties receive multiple offers. Limited inventory allows well-positioned properties to command top pricing.",
      savings: "Seller's market advantage",
      icon: Target
    },
    {
      title: "Tax-Friendly Environment",
      description: "Idaho features lower property taxes than many western states and reasonable income tax rates. Property tax burden attracts buyers while manageable holding costs benefit sellers. Tax environment supports overall market strength and buyer ability to purchase at good values.",
      savings: "Lower tax burden",
      icon: DollarSign
    }
  ];

  const buyerProfiles = [
    {
      type: "Out-of-State Relocators",
      description: "California, Washington, and Oregon residents relocating permanently for affordability, lifestyle, and lower taxes. These buyers often have substantial equity from expensive markets and can pay cash. They seek residential land for custom homes or lifestyle properties.",
      typical_purchase: "$200K - $3M",
      decision_speed: "2-6 weeks",
      preferred_size: "1-50 acres",
      key_factors: ["Mountain access", "Community", "Privacy", "Quality of life"],
      percentage: "35%"
    },
    {
      type: "Agricultural and Ranch Buyers",
      description: "Farmers and ranchers seeking productive land for crop production, livestock operations, or timber. Many combine agriculture with conservation goals. These buyers understand land values and water rights. Idaho's agricultural reputation attracts serious operators.",
      typical_purchase: "$300K - $8M",
      decision_speed: "4-12 weeks",
      preferred_size: "40-5000 acres",
      key_factors: ["Water rights", "Soil quality", "Production history", "Infrastructure"],
      percentage: "25%"
    },
    {
      type: "Recreation and Second-Home Buyers",
      description: "Affluent buyers seeking mountain properties, hunting land, or vacation homes near skiing, fishing, and outdoor recreation. Many buyers from western states and Texas seek authentic Western experiences. Sun Valley and resort areas attract luxury second-home purchases.",
      typical_purchase: "$150K - $5M",
      decision_speed: "3-8 weeks",
      preferred_size: "5-500 acres",
      key_factors: ["Recreation access", "Mountain views", "Privacy", "Natural features"],
      percentage: "20%"
    },
    {
      type: "Developers and Investors",
      description: "Residential developers creating subdivisions near growing cities. Investment groups purchasing for appreciation in growth paths. These buyers understand Idaho's market momentum and seek strategic opportunities. Strong market fundamentals attract institutional interest.",
      typical_purchase: "$500K - $20M",
      decision_speed: "6-16 weeks",
      preferred_size: "20-500 acres",
      key_factors: ["Growth path", "Infrastructure", "Zoning", "Development potential"],
      percentage: "20%"
    }
  ];

  const regionalMarkets = [
    {
      region: "Treasure Valley (Boise Metro)",
      description: "The Treasure Valley including Boise, Meridian, Nampa, and Caldwell is Idaho's largest metro and fastest-growing region. Technology sector growth, corporate relocations, and lifestyle appeal drive exceptional population increases. Residential land near the metro commands premium prices while development opportunities extend into surrounding counties.",
      population: "750,000+",
      key_industries: ["Technology", "Healthcare", "Manufacturing", "Business Services"],
      land_values: "$8,000-$30,000/acre",
      growth_rate: "+4.8% annually",
      advantages: [
        "Fastest growing metro in the U.S.",
        "Strong tech sector and jobs",
        "Outdoor recreation access",
        "Business-friendly environment",
        "Quality of life appeal"
      ],
      challenges: [
        "Highest land costs in Idaho",
        "Development pressure",
        "Infrastructure strain"
      ]
    },
    {
      region: "North Idaho (Coeur d'Alene/Panhandle)",
      description: "North Idaho's stunning lakes, mountains, and forests attract affluent retirees, second-home buyers, and outdoor enthusiasts. Coeur d'Alene and Sandpoint offer resort town amenities while rural areas provide privacy. Proximity to Spokane supports economy while natural beauty drives land values.",
      population: "300,000+ region",
      key_industries: ["Tourism", "Recreation", "Real Estate", "Timber"],
      land_values: "$8,000-$50,000/acre",
      growth_rate: "+4.5% annually",
      advantages: [
        "Scenic lake and mountain beauty",
        "Premium resort markets",
        "Washington proximity",
        "Four-season recreation",
        "Limited supply"
      ],
      challenges: [
        "Seasonal economy",
        "High land costs",
        "Limited inventory"
      ]
    },
    {
      region: "Eastern Idaho (Idaho Falls/Pocatello)",
      description: "Eastern Idaho offers affordability with mountain access. Idaho Falls benefits from Idaho National Laboratory employment while Pocatello anchors the southeast. Agricultural land dominates the region with excellent irrigation. Yellowstone proximity supports tourism while affordability attracts residents.",
      population: "300,000+ region",
      key_industries: ["Nuclear Research", "Agriculture", "Healthcare", "Tourism"],
      land_values: "$2,500-$10,000/acre",
      growth_rate: "+2.8% annually",
      advantages: [
        "Affordable land",
        "Agricultural productivity",
        "Stable employment",
        "Yellowstone proximity",
        "Water availability"
      ],
      challenges: [
        "Slower growth than Boise",
        "Rural economy",
        "Colder climate"
      ]
    },
    {
      region: "Central Idaho (Sun Valley/Mountain Regions)",
      description: "Central Idaho's mountains offer world-class recreation, pristine wilderness, and authentic Western character. Sun Valley rivals top ski resorts while Stanley, McCall, and Stanley provide rustic mountain towns. Limited supply and exceptional beauty support premium values. Second-home and recreation land attracts affluent buyers.",
      population: "80,000+ region",
      key_industries: ["Tourism", "Recreation", "Real Estate", "Services"],
      land_values: "$5,000-$150,000/acre",
      growth_rate: "+3.8% annually",
      advantages: [
        "World-class skiing and recreation",
        "Pristine wilderness",
        "Affluent buyers",
        "Limited supply",
        "Premium market"
      ],
      challenges: [
        "High land costs in resort areas",
        "Seasonal economy",
        "Remote locations"
      ]
    }
  ];

  const testimonials = [
    {
      name: "David Peterson",
      location: "Meridian, Idaho",
      property: "22-acre residential development parcel",
      content: "Sold land south of Boise that we held for just 3 years. Market appreciation was incredible. Had four offers within 48 hours from developers. Closed in 13 days at $285,000 - more than double our purchase price.",
      amount: "$285,000",
      timeToSell: "13 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "Jennifer Martinez",
      location: "Coeur d'Alene, Idaho",
      property: "8-acre waterfront property on lake",
      content: "Inherited waterfront land from parents. Wasn't sure about selling but got connected to California buyers looking for vacation property. Smooth process, closed in 16 days, and price exceeded expectations.",
      amount: "$725,000",
      timeToSell: "16 days",
      reason: "Inherited Property",
      rating: 5,
      year: "2024"
    },
    {
      name: "Michael Thompson",
      location: "Twin Falls, Idaho",
      property: "180-acre agricultural parcel",
      content: "Needed to sell family farm quickly. Found buyer through this network who understood water rights and agricultural value. Fair price, professional service, closed in 18 days. Highly recommend.",
      amount: "$945,000",
      timeToSell: "18 days",
      reason: "Estate Liquidation",
      rating: 5,
      year: "2023"
    },
    {
      name: "Sarah Johnson",
      location: "McCall, Idaho",
      property: "35-acre mountain property",
      content: "Divorce required quick sale of our mountain land. Despite remote location, had multiple offers from out-of-state buyers. Closed with Texas buyer in 15 days. Professional and understanding throughout difficult time.",
      amount: "$420,000",
      timeToSell: "15 days",
      reason: "Divorce Settlement",
      rating: 5,
      year: "2024"
    }
  ];

  const faqs = [
    {
      question: "Why is Idaho land so popular right now?",
      answer: "Idaho leads the nation in population growth as people from California, Washington, and Oregon relocate for affordability, lower taxes, outdoor recreation, and quality of life. Limited land supply (62% federal lands) combined with strong demand creates exceptional appreciation. Remote work enables professionals to live anywhere, and many choose Idaho's mountains and lifestyle. This creates sustained demand across all property types."
    },
    {
      question: "How quickly can I sell Idaho land?",
      answer: "Most Idaho land sales close in 10-21 days through our buyer network. Properties near Boise, Coeur d'Alene, and growing areas often sell fastest due to strong demand. Mountain and recreational properties typically close in 12-25 days. Agricultural land may take 15-30 days as buyers evaluate water rights and production. We work with cash buyers ready to move quickly."
    },
    {
      question: "What Idaho land types are most valuable?",
      answer: "Mountain and waterfront properties near recreation areas command highest prices due to scarcity and lifestyle appeal. Residential development land near Boise and growing cities brings premium pricing. Agricultural land with water rights offers solid values. Sun Valley and resort area properties attract affluent buyers. Each property type has strong demand from different buyer pools."
    },
    {
      question: "How do water rights affect Idaho land values?",
      answer: "Water rights are crucial in Idaho. Properties with senior water rights command premium prices, especially for agricultural land. Surface water rights from rivers or wells add significant value. We work with buyers who understand Idaho water law and can properly value rights. Lack of water rights doesn't prevent sales but affects pricing and buyer types."
    },
    {
      question: "Can I sell remote Idaho land quickly?",
      answer: "Yes! Remote properties attract hunters, recreation seekers, and buyers wanting privacy. Idaho's authentic Western character and public land access make remote properties desirable. Many buyers specifically seek off-grid or backcountry land. While remote properties may have smaller buyer pools, serious buyers move quickly and often pay cash."
    },
    {
      question: "What if my Idaho land has no utilities or road access?",
      answer: "Many Idaho buyers prefer raw land without development. Hunters and recreation buyers accept remote access. Off-grid enthusiasts specifically seek properties without utilities. These features affect pricing but don't prevent sales. We work with buyers who regularly purchase undeveloped land and understand Idaho's rural character."
    },
    {
      question: "How does federal land ownership affect Idaho property values?",
      answer: "Federal lands covering 62% of Idaho actually increase private land values by limiting supply while providing recreation access. Properties near national forests, wilderness areas, and BLM lands offer exceptional recreation access without property tax burden. This proximity is highly desirable and supports premium pricing for adjacent private lands."
    },
    {
      question: "Why sell Idaho land now versus waiting?",
      answer: "Idaho's market momentum, limited supply, and sustained demand create optimal seller conditions. Population growth shows no signs of slowing while development-suitable land becomes increasingly scarce. Current appreciation rates and strong buyer competition favor sellers. Interest rate changes and economic uncertainty suggest acting while market strength continues."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-idaho" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Idaho property information and will contact you within 24 hours with cash offers from our network of Idaho land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Idaho specialists review your property details</span>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
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
                Idaho Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Idaho Land <span className="text-blue-600">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Idaho land in 24-48 hours. We have active buyers throughout the Gem State ready to purchase your property quickly.
            </p>

            {/* Idaho Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {idahoStats.map((stat, index) => (
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
                Get Idaho Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Idaho Specialists • 100% Free</span>
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
              Popular Idaho Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Idaho, from the Panhandle to the Snake River Valley
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
              Idaho's Economic Strengths
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
              Types of Idaho Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From mountain properties to farmland, we have buyers for every type of Idaho land
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
              Idaho Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions favor Idaho land sellers
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
              Idaho Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each region of Idaho offers unique opportunities and market dynamics
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
              Idaho Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Idaho is an ideal state to sell land in
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
              Our Idaho Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Idaho who are ready to purchase land quickly
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
              Idaho Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Idaho landowners who sold their property fast for cash
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
              Get Cash Offers for Your Idaho Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Idaho land specialists will contact you within 24 hours
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
                    Idaho Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter the property address or county in Idaho"
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
                      placeholder="e.g., 40 acres, 5 acres, 160 acres"
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
                      <option value="Mountain Property">Mountain Property</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Ranch Land">Ranch Land</option>
                      <option value="Hunting Land">Hunting Land</option>
                      <option value="Waterfront Property">Waterfront Property</option>
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
                      placeholder="e.g., $180,000 or leave blank"
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
                    placeholder="Tell us anything else about your Idaho property (water rights, access, improvements, etc.)"
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
                      <span>Get My Idaho Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Idaho land buyers
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
              Idaho Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Idaho
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
            Ready to Sell Your Idaho Land?
          </h2>
          <p className="text-xl mb-12 text-gray-900 max-w-2xl mx-auto">
            Join Idaho landowners who chose the fast, easy way to sell their land for cash
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
            {idahoStats.map((stat, index) => (
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
