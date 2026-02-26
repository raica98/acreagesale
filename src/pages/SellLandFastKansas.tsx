import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun, Wheat, Chrome as Home, Wind } from 'lucide-react';
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

export function SellLandFastKansas() {
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
        state: 'Kansas',
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_kansas_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_kansas_inquiries', JSON.stringify(existingSubmissions));

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

  const kansasStats = [
    { label: "Avg. Land Value", value: "$3,200/acre", trend: "+12%", icon: DollarSign },
    { label: "Active Buyers", value: "280+", trend: "High Demand", icon: Users },
    { label: "Avg. Sale Time", value: "15 days", trend: "Quick Sales", icon: Clock },
    { label: "Success Rate", value: "96%", trend: "Proven Track Record", icon: Award }
  ];

  const popularAreas = [
    { name: "Wichita", population: "640,000+ metro", growth: "+1.2%", avgPrice: "$4,500/acre" },
    { name: "Kansas City Metro", population: "2.5M+ bi-state", growth: "+1.8%", avgPrice: "$8,500/acre" },
    { name: "Topeka", population: "230,000+ metro", growth: "+0.6%", avgPrice: "$3,800/acre" },
    { name: "Lawrence", population: "125,000+ metro", growth: "+1.5%", avgPrice: "$6,200/acre" },
    { name: "Manhattan", population: "100,000+ metro", growth: "+1.9%", avgPrice: "$5,500/acre" },
    { name: "Salina", population: "55,000+", growth: "+0.4%", avgPrice: "$2,800/acre" },
    { name: "Hutchinson", population: "65,000+ metro", growth: "+0.3%", avgPrice: "$2,900/acre" },
    { name: "Overland Park", population: "195,000+", growth: "+2.2%", avgPrice: "$12,000/acre" },
    { name: "Olathe", population: "145,000+", growth: "+2.5%", avgPrice: "$10,500/acre" },
    { name: "Dodge City", population: "28,000+", growth: "+0.5%", avgPrice: "$1,800/acre" }
  ];

  const economicDrivers = [
    {
      title: "Agricultural Powerhouse",
      description: "Kansas ranks among top wheat-producing states and leads in cattle production with extensive feedlot operations. Productive farmland dominates the landscape with strong yields despite lower rainfall than eastern neighbors. Agricultural operations provide stable land values while grain storage and processing facilities support rural economies throughout the state.",
      impact: "Top wheat and cattle state",
      locations: ["Central Kansas", "Western Kansas", "Southwest region", "North-central area"],
      icon: Wheat
    },
    {
      title: "Aviation Manufacturing Hub",
      description: "Wichita serves as America's aviation manufacturing capital, home to Spirit AeroSystems, Textron Aviation, and Bombardier. This aerospace concentration supports high-paying jobs and attracts skilled workforce. Manufacturing heritage creates industrial land demand while supporting residential development throughout the Wichita metro area.",
      impact: "Air Capital of the World",
      locations: ["Wichita", "Derby", "Haysville", "Regional airports"],
      icon: Plane
    },
    {
      title: "Kansas City Metro Growth",
      description: "Eastern Kansas benefits from Kansas City metro expansion with suburbs including Overland Park, Olathe, and Lenexa experiencing rapid growth. Proximity to major metropolitan economy drives residential and commercial development. Corporate relocations and economic diversification create sustained demand for development land throughout Johnson County and surrounding areas.",
      impact: "Fastest growth region",
      locations: ["Johnson County", "Wyandotte County", "Leavenworth County", "Miami County"],
      icon: Building
    },
    {
      title: "Energy Production and Wind Power",
      description: "Kansas ranks in top states for wind energy generation with thousands of turbines generating substantial landowner income. Oil and gas production in western counties provides additional revenue streams. Energy sector diversification adds value beyond traditional agriculture while wind lease income supports farmland values throughout the state.",
      impact: "Top 5 wind energy state",
      locations: ["Western Kansas", "North-central region", "South-central area", "Throughout state"],
      icon: Wind
    }
  ];

  const landTypes = [
    {
      type: "Prime Agricultural Land",
      description: "Kansas farmland produces excellent wheat, corn, and soybean yields on productive soils. Cattle operations dominate western regions while row crops thrive in eastern counties. Irrigation infrastructure enhances western Kansas productivity. Both local farmers expanding operations and investment groups actively purchase quality farmland seeking stable returns and appreciation potential.",
      priceRange: "$2,000 - $8,000 per acre",
      typicalSize: "160-640 acres",
      bestAreas: ["Central Kansas", "Eastern Kansas", "River valleys", "North-central region"],
      income: "$150-400/acre annually",
      features: ["Strong yields", "Cattle operations", "Irrigation potential", "Wind income"],
      icon: Wheat
    },
    {
      type: "Kansas City Metro Development Land",
      description: "Johnson County suburban expansion creates exceptional residential land demand. Overland Park, Olathe, Lenexa, and surrounding communities rank among fastest-growing metros nationally. Developers purchase land for subdivisions, commercial centers, and mixed-use projects. Proximity to Kansas City employment centers and quality schools drive consistent buyer demand.",
      priceRange: "$8,000 - $50,000 per acre",
      typicalSize: "20-200 acres",
      bestAreas: ["Johnson County", "Leavenworth County", "Miami County", "Wyandotte County"],
      income: "Development profits",
      features: ["Metro growth", "Infrastructure", "School districts", "Appreciation"],
      icon: Home
    },
    {
      type: "Wichita Area Industrial and Commercial Land",
      description: "Aviation manufacturing and logistics operations create industrial land demand throughout Wichita metro. Sites near Eisenhower Airport and major highways attract distribution centers. Commercial development follows residential growth in suburbs. Wichita's affordable costs and business-friendly environment support diverse development opportunities.",
      priceRange: "$5,000 - $25,000 per acre",
      typicalSize: "10-150 acres",
      bestAreas: ["Wichita metro", "Derby", "Andover", "Highway corridors"],
      income: "Lease potential",
      features: ["Airport access", "Highway proximity", "Aviation industry", "Utilities"],
      icon: Factory
    },
    {
      type: "Hunting and Recreational Land",
      description: "Kansas offers excellent hunting for deer, turkey, pheasant, and waterfowl attracting sportsmen from surrounding states. Timber along rivers and streams provides wildlife habitat. Recreational properties near metro areas serve as weekend getaways. Hunting lease income supplements holding costs while properties provide family recreation opportunities.",
      priceRange: "$1,500 - $4,500 per acre",
      typicalSize: "80-640 acres",
      bestAreas: ["Eastern Kansas", "River corridors", "Flint Hills", "Southeast region"],
      income: "Hunting leases $8-20/acre",
      features: ["Wildlife habitat", "Diverse hunting", "Timber areas", "Recreation"],
      icon: TreePine
    },
    {
      type: "Wind Energy Revenue Land",
      description: "Properties with wind turbines or development potential command premium values. Kansas wind resources support extensive turbine development throughout the state. Landowners receive $6,000-$12,000 annually per turbine while maintaining agricultural use. Wind income provides diversification and stable cash flow supplementing traditional farming returns.",
      priceRange: "$2,500 - $6,000 per acre",
      typicalSize: "320-2000 acres",
      bestAreas: ["Western Kansas", "North-central", "South-central", "High wind areas"],
      income: "$200-500/acre (crops + wind)",
      features: ["Wind turbines", "Dual income", "Energy leases", "Stable returns"],
      icon: Wind
    },
    {
      type: "Ranch and Grazing Land",
      description: "Western Kansas grasslands support extensive cattle operations with ranches spanning thousands of acres. Flint Hills tallgrass prairie offers premium grazing. Ranch properties combine livestock production with hunting opportunities and rural lifestyle. Both commercial operators and individual buyers seek quality grazing land throughout the state.",
      priceRange: "$800 - $3,500 per acre",
      typicalSize: "640-5000 acres",
      bestAreas: ["Flint Hills", "Western Kansas", "Southwest region", "Grassland areas"],
      income: "Grazing leases $25-75/acre",
      features: ["Cattle operations", "Grasslands", "Large tracts", "Lifestyle appeal"],
      icon: Sun
    }
  ];

  const marketTrends = [
    {
      trend: "Johnson County Suburban Boom",
      description: "Johnson County leads Kansas growth with Overland Park and Olathe ranking among America's best places to live. Corporate relocations from expensive coastal markets accelerate expansion. Quality schools, low crime, and affordability attract families nationwide. This sustained growth creates exceptional demand for residential development land throughout eastern Kansas.",
      impact: "+2.5% annual growth",
      timeframe: "Sustained expansion",
      implications: ["Premium land values", "Developer competition", "Infrastructure investment"]
    },
    {
      trend: "Wind Energy Development Acceleration",
      description: "Kansas wind energy production expands rapidly with new turbine projects announced regularly. Landowners earn substantial income from turbine leases while maintaining agricultural operations. Wind development companies actively seek suitable properties throughout the state. Energy income transforms farmland economics and supports higher land values.",
      impact: "Major income source",
      timeframe: "Ongoing expansion",
      implications: ["Lease income opportunities", "Land value increase", "Revenue diversification"]
    },
    {
      trend: "Agricultural Land Investment Demand",
      description: "Institutional investors and farm management companies purchase Kansas farmland for stable returns. Productive soils, reasonable prices, and manageable debt service attract investment capital. Both domestic and international buyers seek quality agricultural properties. Strong farmer demand plus investor interest creates competitive markets for quality farmland.",
      impact: "Investor competition",
      timeframe: "Long-term trend",
      implications: ["Price support", "Quick sales", "Multiple buyer types"]
    },
    {
      trend: "Wichita Manufacturing Growth",
      description: "Aviation manufacturing expansion supports Wichita employment and industrial development. Spirit AeroSystems and Textron Aviation increase production creating job growth. Suppliers and support businesses locate near major manufacturers. Industrial resurgence drives land demand while supporting residential development throughout the metro area.",
      impact: "Job growth momentum",
      timeframe: "2023-2025 expansion",
      implications: ["Industrial land demand", "Residential growth", "Economic diversity"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "Affordable Land Prices",
      description: "Kansas offers significantly lower land costs than neighboring Colorado and Missouri. Reasonable prices attract diverse buyer types from farmers to investors. Affordability enables competitive offers while lower acquisition costs benefit buyers. This value proposition creates strong demand across all property categories.",
      savings: "Lower entry costs",
      icon: DollarSign
    },
    {
      title: "Diverse Agricultural Economy",
      description: "Wheat, cattle, corn, and soybeans provide agricultural diversity reducing risk. Multiple crop and livestock options suit varied land types. Strong agricultural fundamentals support farmland values. Buyers appreciate production flexibility and income diversity Kansas properties offer.",
      savings: "Multiple income streams",
      icon: Wheat
    },
    {
      title: "Wind Energy Income Potential",
      description: "Properties suitable for wind development attract premium buyer interest. Energy lease income supplements agricultural returns providing recession-resistant cash flow. Kansas wind leadership creates sustained turbine demand. Dual revenue potential enhances property appeal and values.",
      savings: "Energy revenue boost",
      icon: Wind
    },
    {
      title: "Central Location Advantage",
      description: "Kansas sits in America's geographic center with reasonable access to major markets. Logistics operations value central location for distribution. Recreational buyers appreciate accessibility from multiple metros. Strategic position supports diverse buyer interest and land values.",
      savings: "Market accessibility",
      icon: Globe
    }
  ];

  const buyerProfiles = [
    {
      type: "Local and Regional Farmers",
      description: "Kansas farmers expanding operations represent primary buyer category. These buyers understand land productivity and fair values. Strong commodity prices enable aggressive expansion. Many farmers purchase multiple properties annually and prefer quick closings to secure land before competitors.",
      typical_purchase: "$400K - $5M",
      decision_speed: "3-6 weeks",
      preferred_size: "160-640 acres",
      key_factors: ["Soil quality", "Location", "Water availability", "Price per acre"],
      percentage: "40%"
    },
    {
      type: "Kansas City Metro Developers",
      description: "Homebuilders and developers creating projects in Johnson County suburbs and surrounding areas. Sustained population growth drives continuous land acquisition. National and regional builders compete for development sites. These buyers target properties in growth corridors with subdivision potential.",
      typical_purchase: "$500K - $20M",
      decision_speed: "6-16 weeks",
      preferred_size: "40-300 acres",
      key_factors: ["Location", "Growth trajectory", "Utilities", "Zoning"],
      percentage: "25%"
    },
    {
      type: "Investment and Institutional Buyers",
      description: "Farm management companies, family offices, and institutional investors purchasing farmland for stable returns. Wind energy potential enhances investment appeal. Professional management handles operations. These buyers appreciate Kansas affordability and agricultural productivity.",
      typical_purchase: "$800K - $15M",
      decision_speed: "4-10 weeks",
      preferred_size: "320-2000 acres",
      key_factors: ["Cash rent returns", "Wind potential", "Soil productivity", "Management"],
      percentage: "20%"
    },
    {
      type: "Recreational and Ranch Buyers",
      description: "Individuals seeking hunting properties, weekend getaways, or lifestyle ranches. Wichita and Kansas City residents want accessible recreational land. Hunting quality and privacy attract buyers from surrounding states. Ranch buyers seek cattle operations combining production with lifestyle.",
      typical_purchase: "$200K - $2M",
      decision_speed: "4-12 weeks",
      preferred_size: "160-1000 acres",
      key_factors: ["Hunting quality", "Accessibility", "Wildlife", "Grazing"],
      percentage: "15%"
    }
  ];

  const regionalMarkets = [
    {
      region: "Eastern Kansas (Kansas City Metro)",
      description: "Eastern Kansas benefits from Kansas City metro proximity with Johnson County leading state growth. Overland Park, Olathe, and Lenexa rank among America's fastest-growing cities. Residential development dominates suburban areas while quality farmland surrounds metro edges. This region offers highest land values and strongest appreciation with diverse opportunities from development sites to agricultural properties.",
      population: "800,000+",
      key_industries: ["Technology", "Healthcare", "Professional Services", "Agriculture"],
      land_values: "$5,000-$50,000/acre",
      growth_rate: "+2.2% annually",
      advantages: [
        "Strongest growth market",
        "Premium values",
        "Metro employment access",
        "Quality schools",
        "Infrastructure investment"
      ],
      challenges: [
        "Highest competition",
        "Premium pricing",
        "Development pressure"
      ]
    },
    {
      region: "South-Central Kansas (Wichita Area)",
      description: "Wichita anchors south-central Kansas with aviation manufacturing driving economy. Spirit AeroSystems and Textron Aviation employ thousands creating industrial land demand. Suburban growth in Derby, Andover, and Goddard provides residential opportunities. Surrounding agricultural counties offer quality farmland. This region balances urban development with agricultural production.",
      population: "650,000+",
      key_industries: ["Aviation Manufacturing", "Healthcare", "Agriculture", "Energy"],
      land_values: "$2,500-$15,000/acre",
      growth_rate: "+1.2% regional",
      advantages: [
        "Aviation manufacturing hub",
        "Affordable costs",
        "Diverse economy",
        "Quality farmland",
        "Industrial opportunities"
      ],
      challenges: [
        "Slower than KC metro",
        "Manufacturing cyclical",
        "Lower appreciation"
      ]
    },
    {
      region: "North-Central and Western Kansas",
      description: "North-central and western Kansas feature extensive agricultural operations with wheat and cattle dominating. Wind energy development transforms rural economics with turbine income supplementing farming. Large-scale operations prevail with properties spanning thousands of acres. This region offers most affordable land with wind income potential attracting investors and farmers.",
      population: "400,000+ region",
      key_industries: ["Agriculture", "Wind Energy", "Oil & Gas", "Cattle"],
      land_values: "$800-$3,500/acre",
      growth_rate: "+0.3% regional",
      advantages: [
        "Most affordable land",
        "Wind energy income",
        "Large-scale operations",
        "Agricultural focus",
        "Investment interest"
      ],
      challenges: [
        "Population decline",
        "Rural economy",
        "Limited development"
      ]
    },
    {
      region: "Northeast Kansas (Topeka/Lawrence/Manhattan)",
      description: "Northeast Kansas benefits from state capital, University of Kansas, and Kansas State University. College towns provide stable employment and housing demand. Fort Riley supports Manhattan economy. Agricultural land surrounds urban centers. This region offers moderate growth with diverse opportunities from university-area development to quality farmland.",
      population: "450,000+ region",
      key_industries: ["Government", "Education", "Military", "Agriculture"],
      land_values: "$2,500-$8,000/acre",
      growth_rate: "+1.3% regional",
      advantages: [
        "University presence",
        "Government stability",
        "Fort Riley impact",
        "Affordable land",
        "Quality of life"
      ],
      challenges: [
        "Moderate growth",
        "Limited industry",
        "Government dependent"
      ]
    }
  ];

  const testimonials = [
    {
      name: "James Wilson",
      location: "Johnson County, Kansas",
      property: "45-acre development tract",
      content: "Land near Olathe perfectly positioned in growth corridor. Had three builder offers within 48 hours. Competitive bidding drove price above asking. Closed in 14 days all cash. Exceeded all expectations.",
      amount: "$540,000",
      timeToSell: "14 days",
      reason: "Investment Sale",
      rating: 5,
      year: "2024"
    },
    {
      name: "Sarah Thompson",
      location: "Sedgwick County, Kansas",
      property: "320-acre farmland",
      content: "Family farm for 50 years. Time to retire and needed quick sale. Local farmer buyer understood land value. Fair price, professional process, closed in 16 days. Very satisfied with entire experience.",
      amount: "$960,000",
      timeToSell: "16 days",
      reason: "Retirement",
      rating: 5,
      year: "2024"
    },
    {
      name: "Michael Rodriguez",
      location: "Pratt County, Kansas",
      property: "480-acre ranch with wind turbines",
      content: "Wind turbine income made property attractive to investors. Multiple offers from investment groups. Closed at premium price in 15 days. Wind revenue potential was key selling point.",
      amount: "$1,200,000",
      timeToSell: "15 days",
      reason: "Investment Exit",
      rating: 5,
      year: "2024"
    },
    {
      name: "Patricia Anderson",
      location: "Riley County, Kansas",
      property: "160-acre hunting property",
      content: "Hunting land near Manhattan we used for years. Life changes required sale. Kansas City buyer wanted weekend getaway. Quick process, closed in 17 days. Great experience.",
      amount: "$480,000",
      timeToSell: "17 days",
      reason: "Life Changes",
      rating: 5,
      year: "2023"
    }
  ];

  const faqs = [
    {
      question: "Why is Kansas land in demand right now?",
      answer: "Kansas combines affordable prices, productive farmland, wind energy income potential, and Kansas City metro growth. Agricultural diversity from wheat to cattle provides stability. Wind turbine development adds significant landowner income. Eastern Kansas suburban expansion creates development opportunities. These factors create sustained demand across all property types with buyers appreciating Kansas value proposition."
    },
    {
      question: "How quickly can I sell Kansas land?",
      answer: "Most Kansas land sales close in 15-21 days through our buyer network. Development land near Kansas City suburbs often sells fastest due to builder competition. Quality farmland attracts multiple farmer offers. Wind energy properties appeal to investors seeking income. Recreational land may take 15-30 days to match with right buyers. Strong farmer and investor demand enables quick closings."
    },
    {
      question: "What Kansas land types are most valuable?",
      answer: "Development land in Johnson County commands highest prices due to rapid suburban growth. Wind energy properties with turbine income attract premium interest. Quality farmland near metros balances agricultural returns with appreciation potential. Each property type has active buyers. Location, productivity, and specific characteristics determine value more than property type alone."
    },
    {
      question: "How does wind energy affect Kansas land values?",
      answer: "Wind energy dramatically increases land values and income. Turbine leases provide $6,000-$12,000 annually per turbine while maintaining agricultural use. Properties suitable for wind development command premiums due to dual income potential. Kansas wind leadership creates sustained developer demand. Energy income diversifies returns and supports higher land values throughout the state."
    },
    {
      question: "Can I sell farmland currently rented to farmers?",
      answer: "Yes! Most Kansas farmland sells with leases in place. Cash rent leases typically transfer to buyers seeking immediate income. Many buyers specifically want rented farms for predictable returns. Existing leases demonstrate income history and often increase property appeal. We regularly facilitate sales of leased agricultural land with smooth tenant transitions."
    },
    {
      question: "What if my land is in rural western Kansas?",
      answer: "Western Kansas land remains very marketable. Large-scale farmers and ranchers actively purchase properties. Wind energy potential enhances appeal in many areas. Investors seek affordable farmland with good yields. Lower per-acre costs enable strong returns. Oil and gas potential adds value in some counties. Multiple buyer types create opportunities throughout western Kansas."
    },
    {
      question: "How does Johnson County growth affect land values statewide?",
      answer: "Johnson County growth creates ripple effects throughout eastern Kansas. Development land values increase as suburbs expand. Surrounding counties benefit from Kansas City metro economic strength. Even distant agricultural land appreciates as metro residents seek recreational properties. Strong economic activity supports employment and population growth creating opportunities beyond immediate metro area."
    },
    {
      question: "Should I sell Kansas land now or wait for higher prices?",
      answer: "Current conditions favor sellers with strong Kansas City growth, wind energy expansion, and agricultural land investment demand. Limited development inventory in growth corridors supports pricing. Wind turbine development creates new income opportunities. Many sellers act while multiple positive trends support strong buyer demand and competitive offers rather than speculating on uncertain future conditions."
    }
  ];

  if (success) {
    <SEO slug="sell-land-fast-kansas" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Kansas property information and will contact you within 24 hours with cash offers from our network of Kansas land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Kansas specialists review your property details</span>
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
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white px-8 py-4 text-lg font-semibold rounded-xl border-2 border-yellow-600 shadow-lg">
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
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <Phone className="w-4 h-4" />
                <span>949-767-8885</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-yellow-100">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sun className="w-8 h-8 text-yellow-600" />
              <Badge className="bg-gradient-to-r from-blue-600 to-sky-600 text-white px-6 py-3 text-lg font-bold shadow-lg">
                Kansas Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Sell Kansas Land <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-900 font-bold max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Kansas land in 24-48 hours. We have active buyers throughout the Sunflower State ready to purchase your property quickly.
            </p>

            {/* Kansas Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {kansasStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-yellow-600 font-medium">{stat.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-sky-700 hover:from-blue-700 hover:to-sky-800 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-600"
              >
                Get Kansas Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Kansas Specialists • 100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Popular Kansas Markets
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              We buy land throughout Kansas, from Kansas City to the plains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularAreas.map((area, index) => (
              <Card key={index} className="border-2 border-blue-100 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-6 bg-gradient-to-br from-white to-blue-50">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Kansas Economic Strengths
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              Diverse industries drive land demand across the state
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {economicDrivers.map((driver, index) => (
              <Card key={index} className="border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
                          <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium">
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Types of Kansas Land We Buy
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              From prime farmland to wind energy properties, we have buyers for every type of Kansas land
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {landTypes.map((landType, index) => (
              <Card key={index} className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
                            <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Kansas Land Market Trends
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              Current market conditions favor Kansas land sellers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Kansas Regional Markets
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              Each region of Kansas offers unique opportunities and market dynamics
            </p>
          </div>

          <div className="space-y-8">
            {regionalMarkets.map((region, index) => (
              <Card key={index} className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
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

                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border-2 border-blue-200">
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
                          <div className="text-lg font-bold text-sky-600">{region.growth_rate}</div>
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Kansas Selling Advantages
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              Why Kansas is an exceptional state to sell land in
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sellingAdvantages.map((advantage, index) => (
              <Card key={index} className="border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-yellow-50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <advantage.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{advantage.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800 font-medium">
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Our Kansas Land Buyers
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              We work with diverse buyers throughout Kansas who are ready to purchase land quickly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {buyerProfiles.map((buyer, index) => (
              <Card key={index} className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Kansas Success Stories
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              Real Kansas landowners who sold their property fast for cash
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({testimonial.year})</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="border-t-2 border-blue-200 pt-6">
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
      <section id="contact-form" className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Get Cash Offers for Your Kansas Land
            </h2>
            <p className="text-xl text-gray-800 font-semibold max-w-3xl mx-auto">
              Fill out the form below and our Kansas land specialists will contact you within 24 hours
            </p>
          </div>

          <Card className="border-2 border-blue-200 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50">
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      {...form.register('firstName')}
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kansas Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter the property address or county in Kansas"
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 320 acres, 160 acres, 640 acres"
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500 w-full px-3"
                    >
                      <option value="Agricultural Land">Agricultural Land (Farmland)</option>
                      <option value="Wind Energy Land">Wind Energy Land</option>
                      <option value="Residential Land">Residential Development Land</option>
                      <option value="Commercial Land">Commercial/Industrial Land</option>
                      <option value="Recreational Land">Recreational/Hunting Land</option>
                      <option value="Ranch Land">Ranch/Grazing Land</option>
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500 w-full px-3"
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
                      className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., $800,000 or leave blank"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Selling *
                  </label>
                  <select
                    {...form.register('reasonForSelling')}
                    className="h-12 rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500 w-full px-3"
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
                    className="w-full rounded-xl border-blue-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                    placeholder="Tell us about your Kansas property (wind turbines, irrigation, hunting, etc.)"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-700 hover:from-blue-700 hover:to-sky-800 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-2 border-blue-600"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      <span>Get My Kansas Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Kansas land buyers
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
              Kansas Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-800 font-semibold">
              Common questions about selling land in Kansas
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardContent className="p-8 bg-gradient-to-br from-white to-blue-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-sky-600 to-yellow-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 drop-shadow-lg">
            Ready to Sell Your Kansas Land?
          </h2>
          <p className="text-xl mb-12 text-gray-900 font-black drop-shadow max-w-2xl mx-auto">
            Join Kansas landowners who chose the fast, easy way to sell their land for cash
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-blue-700 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <div className="flex items-center gap-3 text-gray-900">
              <Phone className="w-6 h-6" />
              <span className="text-xl font-black drop-shadow">949-767-8885</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {kansasStats.map((stat, index) => (
              <div key={index} className="text-center text-gray-900">
                <stat.icon className="w-8 h-8 mx-auto mb-2 drop-shadow-lg" />
                <div className="text-2xl font-black drop-shadow-lg">{stat.value}</div>
                <div className="text-sm font-bold drop-shadow">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
