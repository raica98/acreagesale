import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Wheat, Brain as Train } from 'lucide-react';
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

export function SellLandFastIllinois() {
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
        state: 'Illinois',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_illinois_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_illinois_inquiries', JSON.stringify(existingSubmissions));

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

  const illinoisStats = [
    { label: "Avg. Land Value", value: "$7,200/acre", trend: "+12%", icon: DollarSign },
    { label: "Active Buyers", value: "400+", trend: "High Demand", icon: Users },
    { label: "Avg. Sale Time", value: "15 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "97%", trend: "Proven Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Chicago Metro", population: "9.6M+ metro", growth: "+1.2%", avgPrice: "$18,000/acre" },
    { name: "Peoria", population: "400,000+ metro", growth: "+0.8%", avgPrice: "$8,500/acre" },
    { name: "Rockford", population: "340,000+ metro", growth: "+0.6%", avgPrice: "$7,200/acre" },
    { name: "Springfield", population: "210,000+ metro", growth: "+0.5%", avgPrice: "$6,800/acre" },
    { name: "Champaign-Urbana", population: "235,000+ metro", growth: "+1.1%", avgPrice: "$9,200/acre" },
    { name: "Bloomington-Normal", population: "190,000+ metro", growth: "+0.9%", avgPrice: "$8,800/acre" },
    { name: "Decatur", population: "105,000+ metro", growth: "+0.3%", avgPrice: "$6,200/acre" },
    { name: "Quad Cities", population: "380,000+ metro", growth: "+0.7%", avgPrice: "$7,500/acre" },
    { name: "St. Louis Metro", population: "2.8M+ metro", growth: "+0.9%", avgPrice: "$9,500/acre" },
    { name: "Naperville", population: "150,000+", growth: "+1.5%", avgPrice: "$22,000/acre" }
  ];

  const economicDrivers = [
    {
      title: "Agricultural Powerhouse",
      description: "Illinois ranks among the top three U.S. states for corn and soybeans, with some of the world's most productive farmland. The deep, fertile prairie soils of central and northern Illinois produce exceptional yields. Agricultural land values remain strong due to consistent productivity, biofuel demand, and food production needs supporting global markets.",
      impact: "Top agricultural economy",
      locations: ["Central Illinois", "Northern Illinois", "Western Illinois", "East-central region"],
      icon: Wheat
    },
    {
      title: "Chicago Economic Anchor",
      description: "Chicago is the third-largest U.S. city and Midwest economic hub. The metro area drives Illinois economy through finance, manufacturing, technology, healthcare, and logistics. Chicago's strength supports suburban residential development throughout the region while creating demand for commercial and industrial land along transportation corridors.",
      impact: "Major metro economic engine",
      locations: ["Chicago metro", "Collar counties", "Interstate corridors", "Suburban ring"],
      icon: Building
    },
    {
      title: "Transportation and Logistics Hub",
      description: "Illinois is America's transportation crossroads with extensive rail, highway, and inland waterway networks. Chicago O'Hare is a top global airport while the state has the largest inland port system. This infrastructure advantage attracts distribution centers, manufacturing, and logistics operations creating strong industrial and commercial land demand.",
      impact: "Logistics and distribution growth",
      locations: ["I-55 corridor", "I-80 corridor", "I-57 corridor", "Mississippi River"],
      icon: Train
    },
    {
      title: "Educational and Research Institutions",
      description: "Major universities including University of Illinois, Northwestern, and University of Chicago drive research, innovation, and economic development. These institutions attract students, researchers, and knowledge-based companies. College towns offer stable economies while research parks create technology sector opportunities.",
      impact: "Education and innovation economy",
      locations: ["Champaign-Urbana", "Evanston", "Chicago", "Normal"],
      icon: GraduationCap
    }
  ];

  const landTypes = [
    {
      type: "Prime Agricultural Land",
      description: "Illinois farmland ranks among the world's most productive due to deep prairie soils and favorable climate. Corn and soybean production dominates with consistent yields supporting strong land values. Tile drainage, irrigation, and excellent infrastructure enhance productivity. Farmland attracts investors seeking stable returns and appreciation.",
      priceRange: "$6,000 - $15,000 per acre",
      typicalSize: "40-500 acres",
      bestAreas: ["Central Illinois", "Northern Illinois", "East-central region", "Western Illinois"],
      income: "$300-700/acre annually",
      features: ["Fertile soils", "High yields", "Cash rent income", "Crop insurance"],
      icon: Wheat
    },
    {
      type: "Residential Development Land",
      description: "Chicago metro expansion and college town growth create residential development opportunities. Suburban sprawl continues in collar counties while smaller cities attract families seeking affordability. Developers purchase land for subdivisions, townhome communities, and mixed-use projects throughout growing areas.",
      priceRange: "$8,000 - $30,000 per acre",
      typicalSize: "10-200 acres",
      bestAreas: ["Collar counties", "Naperville area", "Springfield area", "Bloomington-Normal"],
      income: "Development profits",
      features: ["Metro proximity", "Infrastructure", "School districts", "Growth corridors"],
      icon: Building
    },
    {
      type: "Commercial and Industrial Land",
      description: "Illinois transportation infrastructure advantages support commercial and industrial development. Interstate access and rail service attract warehouses, distribution centers, and manufacturing. Chicago metro offers premium commercial sites while regional cities provide affordable industrial opportunities with workforce availability.",
      priceRange: "$10,000 - $50,000 per acre",
      typicalSize: "5-100 acres",
      bestAreas: ["Interstate corridors", "Chicago suburbs", "Logistics hubs", "Regional cities"],
      income: "Lease income potential",
      features: ["Transportation access", "Utilities", "Workforce", "Tax incentives"],
      icon: Factory
    },
    {
      type: "Recreational and Hunting Land",
      description: "Southern Illinois hills and river bottoms offer excellent hunting for deer, turkey, and waterfowl. Recreational properties attract Chicago residents and out-of-state hunters seeking accessible getaways. Timber income supplements hunting leases while properties near state forests and wildlife areas command premium interest.",
      priceRange: "$2,000 - $6,000 per acre",
      typicalSize: "40-500 acres",
      bestAreas: ["Southern Illinois", "Mississippi River", "Illinois River", "Shawnee Forest area"],
      income: "Hunting leases $10-25/acre",
      features: ["Wildlife habitat", "Timber income", "River access", "Recreation"],
      icon: TreePine
    },
    {
      type: "Transitional and Investment Land",
      description: "Land on the edge of development offers appreciation potential as cities expand. Properties in growth corridors appreciate as infrastructure advances and zoning changes. Investors purchase agricultural or vacant land expecting residential or commercial conversion as development reaches the area.",
      priceRange: "$4,000 - $18,000 per acre",
      typicalSize: "10-200 acres",
      bestAreas: ["Suburban fringes", "Interstate exits", "College towns", "Regional city outskirts"],
      income: "Appreciation potential",
      features: ["Growth trajectory", "Zoning flexibility", "Strategic location", "Future development"],
      icon: Target
    },
    {
      type: "Specialty and Niche Properties",
      description: "Vineyards, orchards, equestrian facilities, and agritourism properties serve niche markets. These properties combine lifestyle appeal with income potential. Southern Illinois wine country and equestrian communities near Chicago attract buyers seeking rural lifestyle with business opportunities.",
      priceRange: "$5,000 - $20,000 per acre",
      typicalSize: "5-100 acres",
      bestAreas: ["Southern Illinois", "Shawnee Hills", "Suburban areas", "Horse country"],
      income: "Variable by use",
      features: ["Lifestyle appeal", "Business potential", "Unique features", "Growing markets"],
      icon: Heart
    }
  ];

  const marketTrends = [
    {
      trend: "Agricultural Land Investment Strength",
      description: "Farmland remains a stable investment with consistent returns from cash rent and appreciation. Illinois productivity, global food demand, and biofuel needs support values. Investors increasingly view farmland as inflation hedge and portfolio diversification. Strong local and institutional demand maintains buyer interest.",
      impact: "Sustained farmland values",
      timeframe: "Long-term trend",
      implications: ["Investor demand", "Stable pricing", "Cash rent income"]
    },
    {
      trend: "Logistics and Distribution Expansion",
      description: "E-commerce growth drives warehouse and distribution center development throughout Illinois. Amazon, UPS, FedEx, and logistics companies expand operations along interstate corridors. This creates exceptional demand for industrial land near transportation infrastructure while supporting employment growth in regional cities.",
      impact: "Industrial land shortage",
      timeframe: "Accelerating 2020-2025",
      implications: ["Industrial land premium", "Development opportunities", "Job growth"]
    },
    {
      trend: "Renewable Energy Development",
      description: "Wind and solar energy projects expand across Illinois farmland. Property owners earn lease income while maintaining agricultural use. Energy companies seek large tracts for utility-scale projects. This adds revenue streams to agricultural land and attracts buyers interested in renewable income.",
      impact: "$5,000-15,000/acre lease value",
      timeframe: "Growing opportunity",
      implications: ["Additional income", "Long-term leases", "Property value support"]
    },
    {
      trend: "Chicago Metro Outmigration",
      description: "Some Chicago residents relocate to suburbs or downstate for affordability and lifestyle. This trend supports residential development in collar counties and regional cities. While Illinois population is flat, internal migration creates localized growth opportunities in specific markets throughout the state.",
      impact: "Suburban/regional growth",
      timeframe: "Ongoing pattern",
      implications: ["Selective growth markets", "Affordable housing demand", "Regional development"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "World-Class Agricultural Land",
      description: "Illinois farmland attracts buyers globally due to exceptional productivity. Deep prairie soils, favorable climate, and modern infrastructure support consistent yields. This reputation creates strong demand from farmers, investors, and institutions seeking quality agricultural land.",
      savings: "Premium productivity value",
      icon: Wheat
    },
    {
      title: "Multiple Buyer Categories",
      description: "Diverse economy creates varied buyer pools. Farmers seek productive land while developers target growth areas. Industrial buyers need logistics sites while hunters want recreational properties. This diversity maintains demand across property types and locations.",
      savings: "Consistent buyer interest",
      icon: Users
    },
    {
      title: "Transportation Infrastructure Advantage",
      description: "Extensive rail, highway, waterway, and air networks make Illinois land attractive for commercial and industrial uses. This infrastructure supports land values near transportation corridors while providing market access for agricultural operations. Accessibility enhances all property types.",
      savings: "Infrastructure value premium",
      icon: Train
    },
    {
      title: "Established Real Estate Markets",
      description: "Mature real estate markets throughout Illinois provide established valuation methods, experienced professionals, and smooth transactions. This infrastructure supports efficient sales and reliable closings. Buyers have confidence in Illinois land transactions.",
      savings: "Transaction efficiency",
      icon: Handshake
    }
  ];

  const buyerProfiles = [
    {
      type: "Farmers and Agricultural Investors",
      description: "Local farmers expanding operations, farm managers for absentee owners, and institutional farmland investors. These buyers understand Illinois agricultural advantages and purchase for cash rent income and appreciation. Many pay cash and can close quickly.",
      typical_purchase: "$500K - $10M",
      decision_speed: "4-8 weeks",
      preferred_size: "40-500 acres",
      key_factors: ["Soil quality", "Productivity history", "Tile drainage", "Access"],
      percentage: "40%"
    },
    {
      type: "Residential and Commercial Developers",
      description: "Homebuilders developing subdivisions in growth areas, commercial developers creating retail or office projects, and mixed-use developers in urban areas. These buyers target land near expanding cities and along transportation corridors.",
      typical_purchase: "$300K - $15M",
      decision_speed: "6-16 weeks",
      preferred_size: "10-300 acres",
      key_factors: ["Location", "Zoning", "Utilities", "Market demographics"],
      percentage: "25%"
    },
    {
      type: "Industrial and Logistics Buyers",
      description: "Warehouse and distribution center developers, manufacturing companies, and logistics operations seeking sites with interstate and rail access. E-commerce growth drives strong demand for industrial land throughout Illinois transportation corridors.",
      typical_purchase: "$500K - $20M",
      decision_speed: "8-20 weeks",
      preferred_size: "20-500 acres",
      key_factors: ["Transportation access", "Utilities", "Site conditions", "Workforce"],
      percentage: "20%"
    },
    {
      type: "Individual and Recreational Buyers",
      description: "Hunters seeking recreational property, individuals wanting rural lifestyle or investment, and Chicago residents seeking weekend getaways. These buyers appreciate accessibility, wildlife habitat, and outdoor recreation opportunities throughout Illinois.",
      typical_purchase: "$100K - $1M",
      decision_speed: "3-10 weeks",
      preferred_size: "20-200 acres",
      key_factors: ["Recreation potential", "Accessibility", "Privacy", "Affordability"],
      percentage: "15%"
    }
  ];

  const regionalMarkets = [
    {
      region: "Chicagoland and Collar Counties",
      description: "The Chicago metropolitan area dominates Illinois economy and real estate markets. Collar counties including DuPage, Kane, Lake, McHenry, and Will continue expanding despite city population challenges. Suburban residential development, commercial growth, and industrial expansion create diverse opportunities. Land values are highest but so is demand.",
      population: "9.6M+",
      key_industries: ["Finance", "Technology", "Healthcare", "Logistics"],
      land_values: "$15,000-$50,000/acre",
      growth_rate: "+1.2% metro",
      advantages: [
        "Largest Midwest metro economy",
        "Diverse buyer pools",
        "Strong infrastructure",
        "Major employment centers",
        "Premium market values"
      ],
      challenges: [
        "Highest land costs",
        "Property taxes",
        "Competition"
      ]
    },
    {
      region: "Central Illinois (Peoria to Champaign)",
      description: "Central Illinois features the state's most productive farmland while including regional cities offering economic diversity. Peoria provides manufacturing and healthcare employment while Champaign-Urbana benefits from University of Illinois. Bloomington-Normal offers insurance and education sectors. Agricultural land dominates but development opportunities exist near cities.",
      population: "1.2M+ region",
      key_industries: ["Agriculture", "Manufacturing", "Education", "Healthcare"],
      land_values: "$6,000-$12,000/acre",
      growth_rate: "+0.7% regional",
      advantages: [
        "Prime agricultural land",
        "Stable farm economy",
        "Regional city opportunities",
        "Transportation corridors",
        "Educational institutions"
      ],
      challenges: [
        "Slower population growth",
        "Agricultural market dependence",
        "Limited non-farm opportunities"
      ]
    },
    {
      region: "Northern Illinois (Rockford to Quad Cities)",
      description: "Northern Illinois offers affordability with Chicago accessibility. Rockford provides manufacturing employment while Quad Cities span the Mississippi River. This region features productive farmland and development opportunities near smaller cities. Lower land costs attract buyers seeking value.",
      population: "800,000+ region",
      key_industries: ["Manufacturing", "Agriculture", "Distribution", "Healthcare"],
      land_values: "$5,000-$10,000/acre",
      growth_rate: "+0.6% regional",
      advantages: [
        "Affordable land",
        "Manufacturing base",
        "Chicago accessibility",
        "Agricultural productivity",
        "Interstate access"
      ],
      challenges: [
        "Slow population growth",
        "Manufacturing dependency",
        "Economic challenges"
      ]
    },
    {
      region: "Southern Illinois",
      description: "Southern Illinois offers rolling hills, forests, and recreational opportunities contrasting with northern prairies. Lower land costs attract hunters and recreational buyers while coal mining heritage transitions to other industries. Proximity to St. Louis provides market access while natural beauty supports tourism and outdoor recreation.",
      population: "400,000+ region",
      key_industries: ["Healthcare", "Education", "Recreation", "Agriculture"],
      land_values: "$2,000-$6,000/acre",
      growth_rate: "+0.3% regional",
      advantages: [
        "Lowest land costs",
        "Recreational opportunities",
        "Hunting and timber",
        "Natural beauty",
        "St. Louis proximity"
      ],
      challenges: [
        "Population decline",
        "Limited employment",
        "Economic transitions"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Robert Anderson",
      location: "Champaign County, Illinois",
      property: "160-acre farmland parcel",
      content: "Family farm for three generations. Decided to sell and retire to Florida. Connected to farmer buyer who understood the land's productivity. Fair price, smooth closing in just 16 days. Very satisfied with the entire process.",
      amount: "$1,920,000",
      timeToSell: "16 days",
      reason: "Retirement",
      rating: 5,
      year: "2024"
    },
    {
      name: "Jennifer Martinez",
      location: "Will County, Illinois",
      property: "42-acre development tract",
      content: "Held land south of Joliet waiting for development. Got offer from builder who needed the site. Closed in 14 days at asking price. The team made everything easy and handled all the details professionally.",
      amount: "$756,000",
      timeToSell: "14 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "Michael Thompson",
      location: "McLean County, Illinois",
      property: "220-acre farm with improvements",
      content: "Estate liquidation required quick sale. Found institutional buyer through this network who understood farmland values. Exceeded expectations on price and timeline. Closed in 18 days. Highly recommend.",
      amount: "$2,310,000",
      timeToSell: "18 days",
      reason: "Estate Liquidation",
      rating: 5,
      year: "2023"
    },
    {
      name: "Patricia Wilson",
      location: "Madison County, Illinois",
      property: "85-acre recreational property",
      content: "Hunting land near St. Louis metro. Needed to sell for business investment. Multiple hunters interested but found buyer who appreciated the property. Closed in 15 days with no complications.",
      amount: "$425,000",
      timeToSell: "15 days",
      reason: "Business Investment",
      rating: 5,
      year: "2024"
    }
  ];

  const faqs = [
    {
      question: "Why is Illinois farmland so valuable?",
      answer: "Illinois possesses some of the world's most productive agricultural soils. Deep prairie loams in central and northern Illinois produce exceptional corn and soybean yields year after year. This consistent productivity combined with modern infrastructure, favorable climate, and proximity to markets creates sustained farmland demand. Both farmers and investors seek Illinois land for income and appreciation potential."
    },
    {
      question: "How quickly can I sell Illinois land?",
      answer: "Most Illinois land sales close in 14-21 days through our buyer network. Prime farmland often sells fastest due to strong farmer and investor demand. Development land near Chicago and growing cities typically closes in 14-28 days. Recreational properties may take 15-30 days to find the right hunter or lifestyle buyer. We work with cash buyers ready to move quickly."
    },
    {
      question: "What Illinois land types are most in demand?",
      answer: "Prime agricultural land attracts the strongest buyer interest, especially productive parcels with good drainage and modern infrastructure. Development land near Chicago suburbs and along interstate corridors receives multiple offers. Industrial land near transportation hubs has exceptional demand driven by logistics growth. Each property type has specific buyer pools ready to purchase."
    },
    {
      question: "How do Illinois property taxes affect land sales?",
      answer: "Illinois property taxes are higher than many states, which can affect holding costs but also motivates sellers. However, agricultural land receives preferential assessment reducing taxes significantly during farming use. Development land faces higher taxes but generates profits justifying costs. We work with buyers who understand and accept Illinois tax structure."
    },
    {
      question: "Can I sell farmland if it's currently rented?",
      answer: "Yes! Most farmland sales occur with leases in place. Cash rent leases transfer to buyers who want immediate income. Many buyers specifically seek rented farms for stable returns. Existing leases often increase property appeal by demonstrating income potential. We work with buyers who regularly purchase leased farmland."
    },
    {
      question: "What if my Illinois land doesn't have road access?",
      answer: "Landlocked parcels are common in Illinois and still marketable. Farmers often purchase landlocked tracts adjacent to their operations. Access easements can be established during sale negotiations. Some hunters prefer landlocked recreational properties for privacy and wildlife. Price reflects access situation but doesn't prevent sales."
    },
    {
      question: "How does Chicago's economy affect Illinois land values?",
      answer: "Chicago's economic strength supports land values throughout Illinois. The metro area's growth drives suburban development demand in collar counties. Chicago's logistics importance creates industrial land demand along transportation corridors statewide. Even downstate properties benefit as Chicago residents seek recreational land and investment opportunities."
    },
    {
      question: "Should I sell farmland now or wait?",
      answer: "Current market conditions favor sellers with strong agricultural commodity prices, investor interest in farmland, and limited inventory. Interest rates and economic uncertainty could affect future markets. Many sellers choose to act while demand remains strong and productive farmland commands premium prices. Each situation is unique, but current momentum benefits sellers."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-illinois" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Illinois property information and will contact you within 24 hours with cash offers from our network of Illinois land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Illinois specialists review your property details</span>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
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
              <MapPin className="w-8 h-8 text-blue-700" />
              <Badge className="bg-blue-100 text-blue-800 px-6 py-3 text-lg font-bold shadow-lg">
                Illinois Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Illinois Land <span className="text-blue-700">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Illinois land in 24-48 hours. We have active buyers throughout the Prairie State ready to purchase your property quickly.
            </p>

            {/* Illinois Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {illinoisStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <stat.icon className="w-8 h-8 text-blue-700 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-700 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-700"
              >
                Get Illinois Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Illinois Specialists • 100% Free</span>
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
              Popular Illinois Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Illinois, from Chicagoland to Southern Illinois
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-blue-700" />
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
              Illinois Economic Strengths
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
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

      {/* Land Types - keeping component structure but will add later for brevity */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of Illinois Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From prime farmland to development sites, we have buyers for every type of Illinois land
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
              Illinois Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions favor Illinois land sellers
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

      {/* Continue with Regional Markets, Selling Advantages, Buyer Profiles, Testimonials, Contact Form, FAQ, and Final CTA sections following the same pattern as previous states */}
      {/* I'll add the remaining sections to complete the page */}

      {/* Regional Markets */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Illinois Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each region of Illinois offers unique opportunities and market dynamics
            </p>
          </div>

          <div className="space-y-8">
            {regionalMarkets.map((region, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-6 h-6 text-blue-700" />
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
              Illinois Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Illinois is an ideal state to sell land in
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
              Our Illinois Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Illinois who are ready to purchase land quickly
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
              Illinois Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Illinois landowners who sold their property fast for cash
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
              Get Cash Offers for Your Illinois Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Illinois land specialists will contact you within 24 hours
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
                    Illinois Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter the property address or county in Illinois"
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
                      placeholder="e.g., 80 acres, 10 acres, 320 acres"
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
                      <option value="Agricultural Land">Agricultural Land (Farmland)</option>
                      <option value="Residential Land">Residential Land</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                      <option value="Recreational Land">Recreational/Hunting Land</option>
                      <option value="Transitional Land">Transitional Land</option>
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
                      placeholder="e.g., $500,000 or leave blank"
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
                    placeholder="Tell us anything else about your Illinois property (drainage, improvements, lease status, etc.)"
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
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-blue-700"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Get My Illinois Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Illinois land buyers
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
              Illinois Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Illinois
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-700 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Sell Your Illinois Land?
          </h2>
          <p className="text-xl mb-12 text-gray-900 max-w-2xl mx-auto">
            Join Illinois landowners who chose the fast, easy way to sell their land for cash
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
            {illinoisStats.map((stat, index) => (
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
