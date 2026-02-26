import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Phone, Mail, User, Send, Star, CircleCheck as CheckCircle, Building, Globe, Award, Shield, Zap, Eye, FileText, TreePine, Factory, GraduationCap, Heart, ShoppingBag, Utensils, Plane, Briefcase, Target, Calculator, Handshake, ArrowRight, Ruler, Mountain, Car, Sun } from 'lucide-react';
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

export function SellLandFastAlabama() {
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
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store form data in localStorage for demo purposes
      const submissionData = {
        ...data,
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
        state: 'Alabama',
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('sell_land_fast_alabama_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('sell_land_fast_alabama_inquiries', JSON.stringify(existingSubmissions));

      setSuccess(true);
      
      // Auto-hide success message after 5 seconds
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

  const alabamaStats = [
    { label: "Avg. Land Value", value: "$3,200/acre", trend: "+12%", icon: DollarSign },
    { label: "Active Buyers", value: "150+", trend: "High Demand", icon: Users },
    { label: "Avg. Sale Time", value: "18 days", trend: "Fast Sales", icon: Clock },
    { label: "Success Rate", value: "96%", trend: "Proven Results", icon: Award }
  ];

  const popularAreas = [
    { name: "Birmingham", population: "200,000+", growth: "+2.1%", avgPrice: "$4,500/acre" },
    { name: "Montgomery", population: "200,000+", growth: "+1.8%", avgPrice: "$3,800/acre" },
    { name: "Mobile", population: "187,000+", growth: "+1.2%", avgPrice: "$5,200/acre" },
    { name: "Huntsville", population: "215,000+", growth: "+3.2%", avgPrice: "$4,100/acre" },
    { name: "Tuscaloosa", population: "101,000+", growth: "+2.5%", avgPrice: "$3,600/acre" },
    { name: "Hoover", population: "85,000+", growth: "+2.8%", avgPrice: "$6,200/acre" },
    { name: "Dothan", population: "68,000+", growth: "+1.5%", avgPrice: "$2,900/acre" },
    { name: "Auburn", population: "76,000+", growth: "+4.1%", avgPrice: "$4,800/acre" },
    { name: "Decatur", population: "57,000+", growth: "+1.9%", avgPrice: "$3,200/acre" },
    { name: "Madison", population: "56,000+", growth: "+5.2%", avgPrice: "$5,500/acre" }
  ];

  const economicDrivers = [
    {
      title: "Aerospace and Defense",
      description: "Alabama is home to major aerospace manufacturers including Boeing, Airbus, and Lockheed Martin. The Redstone Arsenal in Huntsville serves as a major economic driver with NASA's Marshall Space Flight Center and numerous defense contractors.",
      impact: "High-paying jobs and population growth",
      locations: ["Huntsville", "Mobile", "Birmingham"],
      icon: Plane
    },
    {
      title: "Automotive Manufacturing",
      description: "The state hosts major automotive plants from Mercedes-Benz, Honda, Hyundai, and Toyota, along with hundreds of suppliers. This manufacturing base provides stable employment and drives residential land demand.",
      impact: "Steady employment and housing demand",
      locations: ["Tuscaloosa", "Montgomery", "Huntsville"],
      icon: Car
    },
    {
      title: "Agriculture and Forestry",
      description: "Alabama's diverse agricultural sector includes cotton, soybeans, corn, peanuts, and poultry production. The state also has significant timber resources, making agricultural and forestry land valuable investments.",
      impact: "Rural land value appreciation",
      locations: ["Statewide", "Rural Counties", "River Valleys"],
      icon: TreePine
    },
    {
      title: "Port and Logistics",
      description: "The Port of Mobile is one of the largest ports in the Gulf Coast, handling international trade and supporting logistics operations throughout the Southeast. This drives commercial and industrial land demand.",
      impact: "Commercial and industrial growth",
      locations: ["Mobile", "Baldwin County", "I-65 Corridor"],
      icon: Building
    }
  ];

  const landTypes = [
    {
      type: "Agricultural Land",
      description: "Alabama's fertile soil and favorable climate make it ideal for diverse agricultural operations. From row crops to livestock, agricultural land offers both income potential and long-term appreciation.",
      priceRange: "$2,000 - $8,000 per acre",
      typicalSize: "20-500 acres",
      bestAreas: ["Tennessee Valley", "Black Belt", "Wiregrass Region"],
      income: "$150-400/acre annually",
      features: ["Fertile soil", "Water access", "Established infrastructure", "Government programs"],
      icon: TreePine
    },
    {
      type: "Residential Development Land",
      description: "Growing cities and suburban expansion create strong demand for residential development land. Alabama's population growth and job market expansion drive consistent demand for housing.",
      priceRange: "$5,000 - $25,000 per acre",
      typicalSize: "5-100 acres",
      bestAreas: ["Birmingham Metro", "Huntsville", "Auburn-Opelika", "Mobile Bay"],
      income: "Development profits",
      features: ["Utility access", "Zoning flexibility", "Growth corridors", "School districts"],
      icon: Building
    },
    {
      type: "Commercial Land",
      description: "Alabama's business-friendly environment and strategic location make commercial land attractive for retail, office, and mixed-use developments. Interstate corridors offer excellent visibility and access.",
      priceRange: "$8,000 - $50,000 per acre",
      typicalSize: "1-25 acres",
      bestAreas: ["Interstate corridors", "City centers", "Suburban growth areas"],
      income: "Lease income potential",
      features: ["High traffic counts", "Visibility", "Access", "Demographics"],
      icon: ShoppingBag
    },
    {
      type: "Industrial Land",
      description: "Manufacturing growth and logistics expansion create demand for industrial sites. Alabama's workforce, transportation infrastructure, and business incentives attract industrial development.",
      priceRange: "$3,000 - $15,000 per acre",
      typicalSize: "10-200 acres",
      bestAreas: ["Port areas", "Interstate access", "Rail corridors", "Airport proximity"],
      income: "Long-term leases",
      features: ["Transportation access", "Utilities", "Workforce", "Incentives"],
      icon: Factory
    },
    {
      type: "Recreational Land",
      description: "Alabama's natural beauty, hunting opportunities, and outdoor recreation make recreational land popular with both residents and out-of-state buyers seeking weekend retreats.",
      priceRange: "$1,500 - $6,000 per acre",
      typicalSize: "10-500 acres",
      bestAreas: ["Mountain regions", "River frontage", "Forest areas", "Lake properties"],
      income: "Hunting leases $5-25/acre",
      features: ["Natural beauty", "Wildlife", "Water access", "Privacy"],
      icon: Mountain
    },
    {
      type: "Timberland",
      description: "Alabama's extensive forests provide excellent timberland investment opportunities. Managed forestry operations offer regular income while land appreciates in value.",
      priceRange: "$1,800 - $4,500 per acre",
      typicalSize: "40-1000+ acres",
      bestAreas: ["South Alabama", "Central Alabama", "Appalachian foothills"],
      income: "$50-150/acre annually",
      features: ["Timber income", "Tax benefits", "Recreation", "Carbon credits"],
      icon: TreePine
    }
  ];

  const marketTrends = [
    {
      trend: "Population Growth",
      description: "Alabama's population has grown steadily, with particular strength in metro areas like Huntsville, Birmingham, and Auburn. This growth drives demand for all types of land development.",
      impact: "+1.2% annually",
      timeframe: "2020-2024",
      implications: ["Increased housing demand", "Commercial development", "Infrastructure investment"]
    },
    {
      trend: "Economic Diversification",
      description: "The state has successfully diversified beyond traditional industries, adding aerospace, automotive, and technology sectors. This economic stability supports land values.",
      impact: "Reduced volatility",
      timeframe: "Long-term trend",
      implications: ["Stable employment", "Diverse buyer base", "Reduced market risk"]
    },
    {
      trend: "Infrastructure Investment",
      description: "Major infrastructure projects including port expansions, highway improvements, and broadband deployment enhance land accessibility and value throughout the state.",
      impact: "$2.1B invested",
      timeframe: "2023-2025",
      implications: ["Improved access", "Higher land values", "Development opportunities"]
    },
    {
      trend: "Out-of-State Investment",
      description: "Alabama's affordable land prices and business-friendly environment attract investors from higher-cost states, creating additional demand and price pressure.",
      impact: "+15% buyer interest",
      timeframe: "2022-2024",
      implications: ["Price appreciation", "Competitive market", "Cash buyers"]
    }
  ];

  const sellingAdvantages = [
    {
      title: "No State Income Tax on Capital Gains",
      description: "Alabama doesn't tax capital gains as separate income, meaning you keep more of your land sale profits compared to many other states. This tax advantage makes Alabama an attractive place to sell land.",
      savings: "Save 3-7% vs other states",
      icon: DollarSign
    },
    {
      title: "Streamlined Transfer Process",
      description: "Alabama's property transfer process is efficient and straightforward. Clear title laws and established procedures mean faster closings and fewer complications during the sale process.",
      savings: "Close 5-10 days faster",
      icon: Zap
    },
    {
      title: "Strong Buyer Demand",
      description: "Multiple economic sectors and population growth create diverse buyer demand. Whether your land is agricultural, residential, or commercial, there are active buyers in the Alabama market.",
      savings: "Multiple offer potential",
      icon: Users
    },
    {
      title: "Favorable Legal Environment",
      description: "Alabama's business-friendly legal environment and clear property rights make land transactions straightforward. Fewer regulatory hurdles mean smoother sales processes.",
      savings: "Reduced legal costs",
      icon: Shield
    }
  ];

  const buyerProfiles = [
    {
      type: "Agricultural Investors",
      description: "Farmers and agricultural companies seeking to expand operations or invest in Alabama's productive farmland. These buyers often pay cash and close quickly.",
      typical_purchase: "$200K - $2M",
      decision_speed: "2-4 weeks",
      preferred_size: "40-500 acres",
      key_factors: ["Soil quality", "Water rights", "Access", "Productivity history"],
      percentage: "35%"
    },
    {
      type: "Residential Developers",
      description: "Professional developers creating subdivisions, master-planned communities, and residential projects in Alabama's growing metro areas.",
      typical_purchase: "$500K - $5M",
      decision_speed: "4-8 weeks",
      preferred_size: "10-200 acres",
      key_factors: ["Zoning", "Utilities", "Demographics", "Growth patterns"],
      percentage: "25%"
    },
    {
      type: "Industrial Buyers",
      description: "Manufacturing companies and logistics firms seeking sites for facilities, warehouses, and distribution centers throughout Alabama.",
      typical_purchase: "$300K - $3M",
      decision_speed: "6-12 weeks",
      preferred_size: "5-100 acres",
      key_factors: ["Transportation", "Utilities", "Workforce", "Incentives"],
      percentage: "20%"
    },
    {
      type: "Recreational Buyers",
      description: "Individuals and groups purchasing land for hunting, fishing, camping, and outdoor recreation. Alabama's natural beauty attracts buyers from across the Southeast.",
      typical_purchase: "$50K - $500K",
      decision_speed: "1-3 weeks",
      preferred_size: "20-200 acres",
      key_factors: ["Wildlife", "Water access", "Privacy", "Natural features"],
      percentage: "20%"
    }
  ];

  const regionalMarkets = [
    {
      region: "North Alabama (Huntsville-Decatur)",
      description: "The Tennessee Valley region is Alabama's technology and aerospace hub, anchored by Redstone Arsenal and NASA's Marshall Space Flight Center. This area offers the highest land values and strongest appreciation potential.",
      population: "500,000+",
      key_industries: ["Aerospace", "Defense", "Technology", "Research"],
      land_values: "$4,000-$12,000/acre",
      growth_rate: "+3.2% annually",
      advantages: [
        "Highest income levels in Alabama",
        "Major employer concentration",
        "Research and development focus",
        "Federal government presence",
        "University partnerships"
      ],
      challenges: [
        "Higher competition for prime sites",
        "More stringent development requirements",
        "Higher entry costs"
      ]
    },
    {
      region: "Central Alabama (Birmingham-Montgomery)",
      description: "The state's traditional economic center combines government, healthcare, education, and financial services. Birmingham's medical district and Montgomery's government sector provide economic stability.",
      population: "1.2M+",
      key_industries: ["Healthcare", "Government", "Finance", "Education"],
      land_values: "$2,500-$8,000/acre",
      growth_rate: "+1.8% annually",
      advantages: [
        "Diverse economic base",
        "Established infrastructure",
        "Transportation hub",
        "Educational institutions",
        "Healthcare concentration"
      ],
      challenges: [
        "Slower growth than other regions",
        "Legacy industrial sites",
        "Urban redevelopment focus"
      ]
    },
    {
      region: "South Alabama (Mobile Bay)",
      description: "The Gulf Coast region centers on international trade, petrochemicals, and tourism. The Port of Mobile and coastal location create unique opportunities for industrial and recreational land.",
      population: "650,000+",
      key_industries: ["Shipping", "Petrochemicals", "Tourism", "Aerospace"],
      land_values: "$3,000-$10,000/acre",
      growth_rate: "+2.1% annually",
      advantages: [
        "International trade gateway",
        "Coastal recreation appeal",
        "Petrochemical industry",
        "Tourism economy",
        "Moderate climate"
      ],
      challenges: [
        "Hurricane risk considerations",
        "Environmental regulations",
        "Seasonal tourism economy"
      ]
    },
    {
      region: "East Alabama (Auburn-Opelika)",
      description: "Home to Auburn University and growing technology sector. This region combines educational excellence with emerging high-tech industries, creating strong demand for residential and commercial land.",
      population: "170,000+",
      key_industries: ["Education", "Technology", "Manufacturing", "Research"],
      land_values: "$3,500-$9,000/acre",
      growth_rate: "+4.1% annually",
      advantages: [
        "University-driven growth",
        "Young, educated population",
        "Technology sector emergence",
        "Quality of life appeal",
        "Research partnerships"
      ],
      challenges: [
        "Limited to university cycles",
        "Smaller market size",
        "Competition from established metros"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Robert Thompson",
      location: "Birmingham, Alabama",
      property: "25-acre farm in Jefferson County",
      content: "I inherited my grandfather's farm but live in California now. Acreage Sale helped me sell it in just 3 weeks without ever having to travel back to Alabama. The process was completely remote and professional.",
      amount: "$185,000",
      timeToSell: "21 days",
      reason: "Inherited Property",
      rating: 5,
      year: "2024"
    },
    {
      name: "Maria Rodriguez",
      location: "Huntsville, Alabama", 
      property: "10-acre residential development site",
      content: "We needed to sell quickly to fund our new business venture. Got multiple cash offers within 48 hours and closed in 2 weeks. The buyers were all pre-qualified and serious.",
      amount: "$425,000",
      timeToSell: "14 days",
      reason: "Business Investment",
      rating: 5,
      year: "2024"
    },
    {
      name: "James Wilson",
      location: "Mobile, Alabama",
      property: "50-acre timber tract",
      content: "After my divorce, I needed to liqui date assets quickly. The team found a timber investment company that paid fair market value and closed in 10 days. Couldn't have asked for better service.",
      amount: "$165,000",
      timeToSell: "10 days", 
      reason: "Divorce Settlement",
      rating: 5,
      year: "2023"
    },
    {
      name: "Sarah Chen",
      location: "Auburn, Alabama",
      property: "5-acre commercial site",
      content: "We had been trying to sell through a realtor for 8 months with no success. Acreage Sale connected us with a developer who closed in 3 weeks at a higher price than our listing.",
      amount: "$320,000",
      timeToSell: "19 days",
      reason: "Failed Listing",
      rating: 5,
      year: "2024"
    }
  ];

  const faqs = [
    {
      question: "What makes Alabama land attractive to investors?",
      answer: "Alabama offers a unique combination of affordable land prices, diverse economic growth, no state income tax on capital gains, and business-friendly policies. The state's aerospace, automotive, and agricultural sectors create steady demand for various types of land. Additionally, Alabama's strategic location in the Southeast and improving infrastructure make it attractive to both local and out-of-state investors."
    },
    {
      question: "How quickly can I sell my Alabama land?",
      answer: "Most Alabama land sales through our network close in 14-30 days. We have cash buyers specifically interested in Alabama properties who can move quickly. Factors affecting timeline include property size, location, and any title issues. For urgent situations, we can often arrange closings in as little as 7-10 days."
    },
    {
      question: "What types of Alabama land are in highest demand?",
      answer: "Currently, residential development land near growing cities like Huntsville, Birmingham, and Auburn is in highest demand. Agricultural land, especially with water access, remains consistently popular. Industrial sites near transportation corridors and recreational land for hunting and outdoor activities also see strong buyer interest."
    },
    {
      question: "Do I need to pay Alabama taxes on my land sale?",
      answer: "Alabama doesn't impose a separate capital gains tax, which is advantageous for sellers. You'll pay federal capital gains tax based on your holding period and income level. If you've owned the land for more than a year, you'll qualify for long-term capital gains rates, which are typically lower than ordinary income tax rates."
    },
    {
      question: "What if my Alabama land has issues like liens or title problems?",
      answer: "We work with buyers who specialize in problem properties. Whether your land has tax liens, title issues, estate complications, or access problems, we have experienced investors who can handle these situations. We'll help you understand your options and connect you with buyers who can work through any complications."
    },
    {
      question: "How do Alabama land values compare to other states?",
      answer: "Alabama land values are generally lower than coastal states and major metropolitan areas, making it attractive to investors seeking affordable entry points. However, values have been appreciating steadily, especially in growth areas like Huntsville and Auburn. This combination of affordability and appreciation potential creates a favorable selling environment."
    },
    {
      question: "Can I sell Alabama land if I live out of state?",
      answer: "Absolutely! Many of our sellers live outside Alabama and inherited land or purchased it as an investment. We handle remote closings regularly and can coordinate with title companies and attorneys to complete the entire transaction without you needing to travel to Alabama. All documents can be handled electronically or by mail."
    },
    {
      question: "What information do you need about my Alabama property?",
      answer: "We need basic information including the county and approximate location, acreage or lot size, current zoning if known, access to roads and utilities, and your timeline for selling. If you have a survey, deed, or tax records, those are helpful but not required initially. We can help you gather any additional information needed for serious buyers."
    }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Alabama property information and will contact you within 24 hours with cash offers from our network of Alabama land buyers.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Alabama specialists review your property details</span>
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
      <SEO slug="sell-land-fast-alabama" />
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
                Alabama Land Sales Specialists
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Sell Alabama Land <span className="text-red-600">Fast</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get cash offers for your Alabama land in 24-48 hours. We have active buyers throughout the Heart of Dixie ready to purchase your property quickly.
            </p>
            
            {/* Alabama Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {alabamaStats.map((stat, index) => (
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
                Get Alabama Cash Offers
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <div className="flex items-center gap-3 text-gray-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium">Alabama Specialists • 100% Free</span>
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
              Popular Alabama Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We buy land throughout Alabama, with active buyers in all major markets
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
              Alabama's Economic Strengths
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
              Types of Alabama Land We Buy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From agricultural acres to development sites, we have buyers for every type of Alabama land
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
              Alabama Land Market Trends
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current market conditions favor Alabama land sellers
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
              Alabama Regional Markets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each region of Alabama offers unique opportunities and market dynamics
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
              Alabama Selling Advantages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Why Alabama is a great state to sell land in
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
              Our Alabama Land Buyers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with diverse buyers throughout Alabama who are ready to purchase land quickly
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
              Alabama Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real Alabama landowners who sold their property fast for cash
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
              Get Cash Offers for Your Alabama Land
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our Alabama land specialists will contact you within 24 hours
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
                    Alabama Property Address *
                  </label>
                  <Input
                    {...form.register('propertyAddress')}
                    className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500"
                    placeholder="Enter the property address or county in Alabama"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-red-500 focus:ring-red-500 w-full px-3"
                    >
                      <option value="Residential Land">Residential Land</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                      <option value="Recreational Land">Recreational Land</option>
                      <option value="Timberland">Timberland</option>
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
                    placeholder="Tell us anything else about your Alabama property that might be helpful..."
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
                      <span>Get My Alabama Cash Offers</span>
                    </div>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your information is secure and will only be shared with qualified Alabama land buyers
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
              Alabama Land Sale FAQ
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land in Alabama
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Sell Your Alabama Land?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join hundreds of Alabama landowners who chose the fast, easy way to sell their land for cash
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6" />
              <span className="text-xl font-semibold">949-767-8885</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {alabamaStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    );
}