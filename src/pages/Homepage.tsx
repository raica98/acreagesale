import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, DollarSign, TrendingUp, Users, Award, Star, CircleCheck as CheckCircle, Zap, Shield, Clock, Eye, Target, Brain, ChartBar as BarChart3, Building, TreePine, Chrome as Home, Briefcase, Calculator, FileText, Search, Filter, Globe, Camera, Satellite, User, Send, ArrowRight, Heart, Handshake } from 'lucide-react';
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
  propertyType: z.string().min(1, 'Property type is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  location: z.string().min(2, 'Preferred location is required'),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Homepage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Residential Land',
      budget: '$50,000 - $100,000',
      timeline: '3-6 months',
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
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('homepage_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('homepage_inquiries', JSON.stringify(existingSubmissions));

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

  const stats = [
    { icon: Building, label: "Properties Listed", value: "50,000+", color: "text-blue-600" },
    { icon: DollarSign, label: "Total Value", value: "$2.5B+", color: "text-green-600" },
    { icon: Users, label: "Happy Customers", value: "25,000+", color: "text-purple-600" },
    { icon: Award, label: "Success Rate", value: "98%", color: "text-orange-600" }
  ];

  const landTypes = [
    {
      title: "Residential Development Land",
      description: "Prime residential lots and subdivisions perfect for single-family homes, townhomes, and planned communities. These properties offer excellent potential for future development with growing demand in desirable neighborhoods.",
      features: ["Zoned for residential use", "Utilities available or nearby", "Road access established", "Growing neighborhoods"],
      priceRange: "$25,000 - $500,000",
      icon: Home,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Commercial Investment Land",
      description: "Strategic commercial properties ideal for retail centers, office complexes, warehouses, and mixed-use developments. High-traffic locations with excellent visibility and accessibility for business ventures.",
      features: ["Commercial zoning", "High traffic areas", "Business districts", "Development potential"],
      priceRange: "$100,000 - $2M+",
      icon: Building,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Agricultural Farmland",
      description: "Productive agricultural land perfect for farming, ranching, and agricultural investments. These properties offer stable income potential through crop production, livestock, or agricultural leasing.",
      features: ["Fertile soil conditions", "Water rights included", "Agricultural zoning", "Farming infrastructure"],
      priceRange: "$5,000 - $50,000 per acre",
      icon: TreePine,
      color: "from-green-600 to-lime-500"
    },
    {
      title: "Recreational Land",
      description: "Scenic recreational properties perfect for hunting, camping, outdoor recreation, and private retreats. These parcels offer natural beauty, privacy, and lifestyle benefits for personal enjoyment.",
      features: ["Natural landscapes", "Wildlife habitats", "Outdoor recreation", "Privacy and seclusion"],
      priceRange: "$10,000 - $200,000",
      icon: TreePine,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Industrial Development Land",
      description: "Large-scale industrial properties suitable for manufacturing, logistics, warehousing, and industrial operations. Strategic locations with transportation access and industrial infrastructure.",
      features: ["Industrial zoning", "Transportation access", "Utility infrastructure", "Large lot sizes"],
      priceRange: "$50,000 - $1M+",
      icon: Briefcase,
      color: "from-gray-600 to-slate-600"
    },
    {
      title: "Investment Land Parcels",
      description: "Diverse investment opportunities including raw land, development sites, and income-producing properties. Perfect for investors seeking portfolio diversification and long-term appreciation.",
      features: ["Appreciation potential", "Development rights", "Investment flexibility", "Portfolio diversification"],
      priceRange: "$15,000 - $750,000",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-500"
    }
  ];

  const investmentBenefits = [
    {
      title: "Land Appreciation Potential",
      description: "Vacant land has historically shown strong appreciation rates, especially in growing metropolitan areas. Land values typically increase as population grows and development expands, making it an excellent long-term investment vehicle for building wealth.",
      icon: TrendingUp
    },
    {
      title: "Low Maintenance Investment",
      description: "Unlike rental properties or commercial buildings, vacant land requires minimal ongoing maintenance and management. No tenants to manage, no repairs to make, and no property management headaches - just pure investment potential.",
      icon: Shield
    },
    {
      title: "Development Opportunities",
      description: "Vacant land offers unlimited development potential. Whether you're planning residential subdivisions, commercial developments, or agricultural operations, raw land provides the foundation for creating value through development.",
      icon: Building
    },
    {
      title: "Portfolio Diversification",
      description: "Land investment provides excellent portfolio diversification away from traditional stocks and bonds. Real estate, particularly land, often moves independently of financial markets, providing stability during economic uncertainty.",
      icon: BarChart3
    },
    {
      title: "Tax Advantages",
      description: "Land ownership offers various tax benefits including property tax deductions, depreciation on improvements, and potential 1031 exchanges. These tax advantages can significantly improve your overall investment returns.",
      icon: Calculator
    },
    {
      title: "Inflation Hedge",
      description: "Real estate, including vacant land, has historically served as an effective hedge against inflation. As the cost of living increases, land values typically rise as well, protecting your purchasing power over time.",
      icon: Shield
    }
  ];

  const marketTrends = [
    {
      region: "Southwest United States",
      growth: "+15.2%",
      description: "Arizona, Nevada, and New Mexico showing strong population growth driving land demand",
      hotSpots: ["Phoenix Metro", "Las Vegas Valley", "Albuquerque Area"],
      averagePrice: "$25,000/acre"
    },
    {
      region: "Southeast United States", 
      growth: "+12.8%",
      description: "Florida, Georgia, and North Carolina experiencing rapid development and land appreciation",
      hotSpots: ["Tampa Bay", "Atlanta Metro", "Charlotte Region"],
      averagePrice: "$35,000/acre"
    },
    {
      region: "Mountain West",
      growth: "+18.5%",
      description: "Colorado, Utah, and Idaho seeing unprecedented demand for recreational and residential land",
      hotSpots: ["Denver Metro", "Salt Lake Valley", "Boise Area"],
      averagePrice: "$45,000/acre"
    },
    {
      region: "Texas Triangle",
      growth: "+14.1%",
      description: "Dallas, Houston, Austin, and San Antonio corridors driving massive land development",
      hotSpots: ["Austin Metro", "Dallas-Fort Worth", "Houston Area"],
      averagePrice: "$30,000/acre"
    }
  ];

  const investmentStrategies = [
    {
      strategy: "Buy and Hold",
      description: "Purchase land in growth areas and hold for long-term appreciation. This strategy works best in areas with planned infrastructure development, population growth, or urban expansion.",
      timeframe: "5-15 years",
      riskLevel: "Low to Medium",
      expectedReturn: "8-15% annually",
      bestFor: "Conservative investors seeking steady appreciation"
    },
    {
      strategy: "Develop and Sell",
      description: "Purchase raw land, obtain permits, and develop for residential or commercial use. This strategy requires more capital and expertise but offers higher potential returns.",
      timeframe: "2-5 years", 
      riskLevel: "Medium to High",
      expectedReturn: "20-50% total return",
      bestFor: "Experienced investors with development knowledge"
    },
    {
      strategy: "Subdivide and Sell",
      description: "Buy larger parcels and subdivide into smaller lots for individual sale. This strategy can multiply your investment by creating multiple sellable units from one large property.",
      timeframe: "1-3 years",
      riskLevel: "Medium",
      expectedReturn: "15-30% total return", 
      bestFor: "Investors familiar with zoning and subdivision processes"
    },
    {
      strategy: "Lease for Income",
      description: "Purchase agricultural or commercial land and lease to farmers, businesses, or recreational users. This strategy provides ongoing income while maintaining ownership for future appreciation.",
      timeframe: "Ongoing",
      riskLevel: "Low",
      expectedReturn: "4-8% annually",
      bestFor: "Income-focused investors seeking cash flow"
    }
  ];

  const dueDigenceChecklist = [
    "Verify clear title and ownership through title search and title insurance",
    "Confirm zoning regulations and permitted uses for your intended purpose",
    "Check for easements, restrictions, or covenants that may limit development",
    "Investigate utility availability including water, sewer, electricity, and gas",
    "Research soil conditions, drainage, and environmental factors",
    "Understand local building codes, setback requirements, and development regulations",
    "Analyze access rights and road frontage for the property",
    "Review property taxes, assessments, and ongoing carrying costs",
    "Investigate future development plans and infrastructure projects in the area",
    "Conduct environmental due diligence including wetlands and contamination checks"
  ];

  const testimonials = [
    {
      name: "Robert Chen",
      location: "California Investor",
      content: "I've built a portfolio of 15 land parcels through Acreage Sale. The platform's market analysis tools helped me identify undervalued properties that have appreciated 40% in just 3 years.",
      investment: "$750,000",
      return: "40% appreciation",
      timeframe: "3 years"
    },
    {
      name: "Sarah Martinez",
      location: "Texas Developer", 
      content: "As a residential developer, I rely on Acreage Sale to find prime development sites. Their AI tools and market data have been instrumental in my success with 8 successful subdivisions.",
      investment: "$2.1M",
      return: "65% total return",
      timeframe: "5 years"
    },
    {
      name: "Michael Thompson",
      location: "Colorado Rancher",
      content: "Found the perfect 500-acre ranch through Acreage Sale. The detailed property information and virtual tours saved me countless hours of site visits. Excellent platform for serious land buyers.",
      investment: "$1.2M",
      return: "25% appreciation",
      timeframe: "2 years"
    }
  ];

  if (success) {
    return (
      <>
        <SEO slug="homepage" />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will contact you within 24 hours with personalized land investment recommendations.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our experts analyze your investment criteria</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We prepare personalized property recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You receive exclusive access to matching properties</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        </div>
      </>
    );
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I start investing in land?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Starting your land investment journey is simple. First, determine your investment goals and budget. Then browse our marketplace to find properties that match your criteria. Research the local market, verify zoning and utilities, and conduct due diligence. Consider financing options and work with our experts to ensure a smooth transaction. Our platform provides all the tools and information you need to make informed decisions."
        }
      },
      {
        "@type": "Question",
        "name": "What are the advantages of buying vacant land?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vacant land offers numerous advantages including low maintenance costs, strong appreciation potential, development flexibility, and portfolio diversification. Unlike rental properties, land doesn't require tenant management or repairs. You can hold it for long-term appreciation, develop it for profit, or lease it for income. Land also serves as an excellent hedge against inflation and provides tax benefits through deductions and 1031 exchanges."
        }
      },
      {
        "@type": "Question",
        "name": "How is land valued and priced?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Land value depends on multiple factors including location, size, zoning, utilities, access, topography, and market demand. Properties near growing cities or infrastructure projects typically command higher prices. Zoning that allows residential or commercial development increases value. Access to water, sewer, electricity, and roads also affects pricing. We provide comprehensive market data and comparable sales to help you understand fair market value for each property."
        }
      },
      {
        "@type": "Question",
        "name": "What should I check before buying land?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Essential due diligence includes verifying clear title, checking zoning regulations, confirming utility availability, investigating easements and restrictions, reviewing environmental factors, analyzing soil conditions, understanding access rights, researching property taxes, and evaluating future development plans. Our platform provides detailed property information, but we also recommend working with local professionals including title companies, surveyors, and land use attorneys for comprehensive due diligence."
        }
      },
      {
        "@type": "Question",
        "name": "Can I finance a land purchase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, land purchases can be financed through various options including land loans, traditional mortgages (if building immediately), USDA loans for rural property, owner financing, and home equity loans. Land loans typically require 20-50% down payment with higher interest rates than residential mortgages. Owner financing, where the seller provides financing, is common in land transactions and often offers more flexible terms. Cash purchases provide the strongest negotiating position and faster closings."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly does land appreciate in value?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Land appreciation rates vary significantly by location and market conditions, but historically average 8-15% annually in growth areas. Properties in the path of development, near expanding cities, or benefiting from infrastructure improvements often appreciate faster. Factors affecting appreciation include population growth, employment trends, zoning changes, and economic development. While past performance doesn't guarantee future results, land in growing markets has consistently provided strong long-term returns for patient investors."
        }
      }
    ]
  };

  return (
    <>
      <SEO slug="/" structuredData={faqStructuredData} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/properties" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors">Properties</Link>
              <Link to="/advanced-search" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors">Advanced Search</Link>
              <Link to="/agent" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors">Agents</Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#329cf9] font-medium transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center gap-4">
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
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/2025-10-26_7-36-02.jpg"
            alt="Beautiful land properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🏡 America's Premier Land Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Discover Prime <span className="text-[#329cf9]">Land Investments</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Find the perfect vacant land for development, investment, or personal use. Our comprehensive marketplace features thousands of verified properties across all 50 states with advanced search tools and expert guidance.
            </p>
            
            {/* Quick Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex items-center shadow-lg rounded-lg overflow-hidden bg-white border border-gray-200">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by location, city, or state..."
                    className="pl-12 h-12 bg-white border-0 font-medium text-base focus:ring-0 focus:outline-none placeholder:text-gray-400 rounded-l-lg"
                  />
                </div>
                <Link to="/properties">
                  <Button className="h-12 px-8 bg-[#329cf9] hover:bg-[#2563eb] text-white font-semibold text-base border-0 transition-all duration-300 hover:shadow-lg rounded-r-lg">
                    Search Land
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Land Investment Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Guide to <span className="text-[#329cf9]">Land Investment</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vacant land represents one of the most promising investment opportunities in today's real estate market. Unlike developed properties, raw land offers unlimited potential for appreciation, development, and income generation. Whether you're a first-time investor or experienced developer, understanding the fundamentals of land investment is crucial for success.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">What Makes Land Investment Attractive?</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Land investment has become increasingly popular among savvy investors seeking portfolio diversification and long-term wealth building. Unlike stocks or bonds, land is a tangible asset that you can see, touch, and develop. The fundamental principle of land investment is simple: they're not making any more land, but population continues to grow, creating inherent scarcity and value appreciation over time.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Successful land investors understand that location, timing, and market research are the three pillars of profitable land investment. Properties located in the path of growth - areas where population, employment, and infrastructure are expanding - typically offer the best appreciation potential. This is why our platform focuses on providing comprehensive market data and growth projections for every listed property.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The beauty of land investment lies in its flexibility. A single parcel can serve multiple purposes: hold for appreciation, develop for profit, lease for income, or use for personal recreation. This versatility makes land an excellent hedge against economic uncertainty and inflation.
                </p>
              </div>
              
              <div>
                <img
                  src="/2025-10-26_7-36-02.jpg"
                  alt="Beautiful vacant land with rolling hills and development potential for residential or commercial investment property"
                  width="800"
                  height="600"
                  loading="lazy"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="text-xl font-bold text-blue-900 mb-4">Key Investment Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Average Annual Appreciation:</span>
                      <span className="font-bold text-blue-900">8-15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Typical Hold Period:</span>
                      <span className="font-bold text-blue-900">5-10 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Development Potential:</span>
                      <span className="font-bold text-blue-900">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Maintenance Requirements:</span>
                      <span className="font-bold text-blue-900">Minimal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Land */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Types of <span className="text-[#329cf9]">Land Investments</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding different types of land investments helps you choose the right strategy for your goals and risk tolerance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landTypes.map((type, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{type.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Typical Price Range</div>
                    <div className="text-lg font-bold text-[#329cf9]">{type.priceRange}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Invest in <span className="text-[#329cf9]">Vacant Land?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Vacant land investment offers unique advantages that make it an attractive option for both novice and experienced real estate investors. From appreciation potential to development opportunities, land investment provides multiple pathways to building wealth and generating returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentBenefits.map((benefit, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#329cf9] transition-colors duration-300">
                    <benefit.icon className="w-8 h-8 text-[#329cf9] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Current Market <span className="text-[#329cf9]">Trends</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Understanding regional market trends is essential for successful land investment. Our market analysis shows strong growth patterns across multiple regions, driven by population migration, remote work trends, and infrastructure development. These trends create opportunities for investors who position themselves in the right markets at the right time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{trend.region}</h3>
                    <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg font-bold">
                      {trend.growth}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{trend.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Hot Spots:</h4>
                      <div className="flex flex-wrap gap-2">
                        {trend.hotSpots.map((spot, spotIndex) => (
                          <Badge key={spotIndex} className="bg-blue-100 text-blue-800">
                            {spot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Average Price</div>
                      <div className="text-xl font-bold text-[#329cf9]">{trend.averagePrice}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Land Investment <span className="text-[#329cf9]">Strategies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Successful land investment requires a clear strategy aligned with your financial goals, risk tolerance, and timeline. Each strategy offers different risk-reward profiles and requires varying levels of expertise and capital investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investmentStrategies.map((strategy, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{strategy.strategy}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{strategy.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-blue-600 mb-1">Timeframe</div>
                      <div className="font-bold text-blue-900">{strategy.timeframe}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-600 mb-1">Expected Return</div>
                      <div className="font-bold text-green-900">{strategy.expectedReturn}</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-sm text-orange-600 mb-1">Risk Level</div>
                      <div className="font-bold text-orange-900">{strategy.riskLevel}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-purple-600 mb-1">Best For</div>
                      <div className="font-bold text-purple-900 text-sm">{strategy.bestFor}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Due Diligence Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Land Investment <span className="text-[#329cf9]">Due Diligence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Proper due diligence is essential for successful land investment. Before purchasing any vacant land, investors must thoroughly research zoning regulations, utility availability, environmental factors, and development potential. Our comprehensive checklist ensures you evaluate every critical aspect of a potential land investment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Essential Due Diligence Checklist</h3>
              <div className="space-y-4">
                {dueDigenceChecklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-8 h-8 bg-[#329cf9] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional Support</h3>
                    <p className="text-green-700 font-medium">Expert guidance throughout your investment journey</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Title and legal review</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Zoning and permit research</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Environmental assessments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Market analysis and valuation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Analysis</h3>
                    <p className="text-blue-700 font-medium">Advanced technology for smarter investments</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Automated property analysis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Market trend predictions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Investment opportunity scoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">Risk assessment tools</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Investor Success <span className="text-[#329cf9]">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real investors who've built wealth through strategic land investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.location}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-sm text-green-600">Investment</div>
                        <div className="font-bold text-green-900">{testimonial.investment}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-sm text-blue-600">Return</div>
                        <div className="font-bold text-blue-900">{testimonial.return}</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-sm text-purple-600">Timeline</div>
                        <div className="font-bold text-purple-900">{testimonial.timeframe}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Consultation Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Expert <span className="text-[#329cf9]">Investment Advice</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our team of land investment experts has helped thousands of investors build wealth through strategic land acquisition. Whether you're a first-time land buyer or experienced developer, our personalized consultation service provides the insights and guidance you need to make informed investment decisions.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Personalized Investment Strategy</h4>
                    <p className="text-gray-600">Receive customized investment recommendations based on your goals, budget, and risk tolerance.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Market Analysis & Insights</h4>
                    <p className="text-gray-600">Get detailed market analysis, growth projections, and investment timing recommendations for your target areas.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Due Diligence Support</h4>
                    <p className="text-gray-600">Expert guidance through the due diligence process, including zoning research, title review, and environmental assessments.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-bold text-green-900 mb-4">Free Consultation Includes:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">30-minute strategy session</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">Personalized property recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">Market analysis report</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800">Investment timeline planning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full">
              <Card className="bg-white shadow-2xl border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                    Schedule Your Free Consultation
                  </CardTitle>
                  <p className="text-gray-600 text-center">
                    Get personalized land investment recommendations from our experts
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                      {error}
                    </div>
                  )}

                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {/* Name fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          First Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('firstName')}
                            placeholder="Your first name"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.firstName && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Last Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('lastName')}
                            placeholder="Your last name"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('email')}
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('phone')}
                            placeholder="(555) 123-4567"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Investment preferences */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Property Type *
                        </label>
                        <select
                          {...form.register('propertyType')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="Residential Land">Residential Land</option>
                          <option value="Commercial Land">Commercial Land</option>
                          <option value="Agricultural Land">Agricultural Land</option>
                          <option value="Recreational Land">Recreational Land</option>
                          <option value="Industrial Land">Industrial Land</option>
                          <option value="Mixed Use">Mixed Use</option>
                        </select>
                        {form.formState.errors.propertyType && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.propertyType.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Budget Range *
                        </label>
                        <select
                          {...form.register('budget')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="Under $25,000">Under $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                          <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                          <option value="$500,000+">$500,000+</option>
                        </select>
                        {form.formState.errors.budget && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.budget.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Investment Timeline *
                        </label>
                        <select
                          {...form.register('timeline')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="Immediately">Immediately</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="1+ years">1+ years</option>
                        </select>
                        {form.formState.errors.timeline && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.timeline.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Preferred Location *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('location')}
                            placeholder="City, State, or Region"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.location && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.location.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        {...form.register('message')}
                        placeholder="Tell us about your investment goals, experience level, or any specific requirements..."
                        className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] resize-none text-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Scheduling Consultation...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Schedule Free Consultation
                        </div>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      🔒 Your information is secure and will never be shared. SSL encrypted.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Land Investment Education */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Land Investment <span className="text-[#329cf9]">Education</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Knowledge is power in land investment. Understanding market dynamics, legal considerations, and development potential helps investors make informed decisions and maximize returns. Our educational resources cover everything from basic land investment principles to advanced development strategies.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Understanding Zoning and Land Use</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Zoning regulations are perhaps the most critical factor in land investment success. These local government rules determine what can be built on a property and how it can be used. Understanding zoning classifications - residential, commercial, industrial, agricultural, and mixed-use - is essential for evaluating investment potential and development opportunities.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Residential zoning typically allows for single-family homes, townhomes, and sometimes multi-family developments. Commercial zoning permits retail, office, and service businesses. Industrial zoning is designated for manufacturing, warehousing, and heavy industry. Agricultural zoning is reserved for farming and ranching operations. Mixed-use zoning allows for combinations of residential, commercial, and sometimes light industrial uses.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Smart investors research not only current zoning but also future zoning plans and comprehensive development plans. Many municipalities publish long-term development plans that indicate where growth is expected and what types of development will be encouraged. This forward-looking approach can help investors identify properties that may be rezoned for higher and better use in the future.
                </p>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Financing Your Land Investment</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Land financing differs significantly from traditional home mortgages. Most lenders require larger down payments for land purchases - typically 20-50% of the purchase price. Interest rates for land loans are also generally higher than residential mortgages, reflecting the perceived higher risk of undeveloped property.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Cash purchases offer significant advantages in land investment, including stronger negotiating positions, faster closings, and no financing contingencies. Many successful land investors use cash for initial purchases and then refinance or leverage the property for future investments. Owner financing is another popular option, where the seller acts as the bank and provides financing terms directly to the buyer.
                </p>
              </div>
              
              <div>
                <Card className="p-6 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 mb-8">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-blue-900 mb-4">Investment Checklist</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 text-sm">Research zoning regulations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 text-sm">Verify utility availability</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 text-sm">Check access rights</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 text-sm">Review environmental factors</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 text-sm">Analyze market trends</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-800 text-sm">Calculate total costs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-0">
                    <h4 className="text-xl font-bold text-green-900 mb-4">Expert Tip</h4>
                    <p className="text-green-800 text-sm leading-relaxed">
                      "The best land investments are made in the path of growth. Look for areas with planned infrastructure improvements, population growth, and economic development. These factors drive long-term appreciation and development potential."
                    </p>
                    <div className="mt-4 text-center">
                      <div className="text-sm text-green-600">- Land Investment Expert</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Current Market <span className="text-[#329cf9]">Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive market analysis reveals strong growth patterns across multiple regions, driven by demographic shifts, remote work trends, and infrastructure development. Understanding these trends helps investors identify the most promising opportunities for land investment success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{trend.region}</h3>
                    <Badge className="bg-green-100 text-green-800 px-4 py-2 text-lg font-bold">
                      {trend.growth}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">{trend.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Growth Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {trend.hotSpots.map((spot, spotIndex) => (
                          <Badge key={spotIndex} className="bg-blue-100 text-blue-800">
                            {spot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">Average Price per Acre</div>
                      <div className="text-xl font-bold text-[#329cf9]">{trend.averagePrice}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#329cf9]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about land investment and our marketplace
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-gray-200 hover:border-[#329cf9] transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">How do I start investing in land?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Starting your land investment journey is simple. First, determine your investment goals and budget. Then browse our marketplace to find properties that match your criteria. Research the local market, verify zoning and utilities, and conduct due diligence. Consider financing options and work with our experts to ensure a smooth transaction. Our platform provides all the tools and information you need to make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#329cf9] transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">What are the advantages of buying vacant land?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Vacant land offers numerous advantages including low maintenance costs, strong appreciation potential, development flexibility, and portfolio diversification. Unlike rental properties, land doesn't require tenant management or repairs. You can hold it for long-term appreciation, develop it for profit, or lease it for income. Land also serves as an excellent hedge against inflation and provides tax benefits through deductions and 1031 exchanges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#329cf9] transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">How is land valued and priced?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Land value depends on multiple factors including location, size, zoning, utilities, access, topography, and market demand. Properties near growing cities or infrastructure projects typically command higher prices. Zoning that allows residential or commercial development increases value. Access to water, sewer, electricity, and roads also affects pricing. We provide comprehensive market data and comparable sales to help you understand fair market value for each property.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#329cf9] transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">What should I check before buying land?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Essential due diligence includes verifying clear title, checking zoning regulations, confirming utility availability, investigating easements and restrictions, reviewing environmental factors, analyzing soil conditions, understanding access rights, researching property taxes, and evaluating future development plans. Our platform provides detailed property information, but we also recommend working with local professionals including title companies, surveyors, and land use attorneys for comprehensive due diligence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#329cf9] transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">Can I finance a land purchase?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Yes, land purchases can be financed through various options including land loans, traditional mortgages (if building immediately), USDA loans for rural property, owner financing, and home equity loans. Land loans typically require 20-50% down payment with higher interest rates than residential mortgages. Owner financing, where the seller provides financing, is common in land transactions and often offers more flexible terms. Cash purchases provide the strongest negotiating position and faster closings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-[#329cf9] transition-colors">
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900">How quickly does land appreciate in value?</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Land appreciation rates vary significantly by location and market conditions, but historically average 8-15% annually in growth areas. Properties in the path of development, near expanding cities, or benefiting from infrastructure improvements often appreciate faster. Factors affecting appreciation include population growth, employment trends, zoning changes, and economic development. While past performance doesn't guarantee future results, land in growing markets has consistently provided strong long-term returns for patient investors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Start Your Land Investment Journey Today
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've built wealth through strategic land investment with our expert guidance and comprehensive marketplace
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Properties
              </Button>
            </Link>
            <Link to="/advanced-search">
              <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
                Advanced Search
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Call Now</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">949-767-8885</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Email Us</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">info@acreagesales.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">Nationwide</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">All 50 States</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}