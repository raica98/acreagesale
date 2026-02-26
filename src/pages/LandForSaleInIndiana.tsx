import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, DollarSign, TrendingUp, Users, Building, Zap, Shield, CircleCheck as CheckCircle, Star, Award, Eye, Ruler, Calendar, Clock, User, Send, FileText, TreePine, Factory, Chrome as Home, Truck, Wifi, Droplets, TriangleAlert as AlertTriangle, ChartBar as BarChart3, Target, Globe } from 'lucide-react';
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
  propertyType: z.string().min(1, 'Please select a property type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInIndiana() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Residential Development',
      budget: '$100,000 - $500,000',
      timeline: 'Within 6 months',
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
        location: 'Indiana',
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('indiana_land_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('indiana_land_inquiries', JSON.stringify(existingSubmissions));

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

  const marketStats = [
    { label: "Active Listings", value: "1,800+", icon: Building },
    { label: "Avg. Price/Acre", value: "$8,500", icon: DollarSign },
    { label: "Total Acres", value: "35,000+", icon: Ruler },
    { label: "Price Growth", value: "+8%", icon: TrendingUp }
  ];

  const stateStats = [
    { label: "State Population", value: "6.8M", description: "Growing steadily" },
    { label: "State GDP", value: "$350B", description: "Diverse economy" },
    { label: "Manufacturing Jobs", value: "500K+", description: "Strong industrial base" },
    { label: "Agricultural Value", value: "$31B", description: "Annual production" }
  ];

  const benefits = [
    "No realtor commissions - save 6%",
    "Direct owner negotiations", 
    "Verified property data",
    "Professional aerial imagery",
    "Market analysis included",
    "Fast closing process"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Land Investor",
      content: "Found the perfect 10-acre plot in Indiana through Acreage Sale. The process was seamless and saved me thousands in fees."
    },
    {
      name: "Mike Rodriguez", 
      title: "Developer",
      content: "The market data and aerial imagery helped me make an informed decision. Closed on 25 acres in just 45 days."
    }
  ];

  const featuredProperties = [
    {
      title: "25-Acre Development Site",
      location: "North Indiana",
      price: "$1,200,000",
      acres: "25.0",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot", 
      location: "Downtown Indiana",
      price: "$650,000",
      acres: "2.5",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Indiana Suburbs", 
      price: "$425,000",
      acres: "5.2",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const submarkets = [
    {
      title: "Agricultural Land",
      description: "Indiana's rich farmland offers excellent opportunities for agricultural investment, with fertile soil and established farming communities supporting diverse crop production.",
      features: ["Prime corn and soybean country", "Established agricultural infrastructure", "Strong commodity markets"],
      icon: TreePine,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Residential Development",
      description: "Growing suburban markets around Indiana create opportunities for residential subdivision development, with strong demand from families seeking affordable housing options.",
      features: ["Suburban expansion corridors", "Family-friendly communities", "Affordable housing demand"],
      icon: Home,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Industrial Development", 
      description: "Indiana's central location and transportation infrastructure make it ideal for logistics, manufacturing, and distribution facilities serving the Midwest region.",
      features: ["Interstate highway access", "Rail transportation networks", "Manufacturing workforce"],
      icon: Factory,
      color: "from-purple-500 to-violet-500"
    }
  ];

  const zoningTypes = [
    {
      type: "Agricultural (A-1, A-2)",
      description: "Farming operations, single-family homes on large lots, agricultural-related businesses",
      icon: TreePine
    },
    {
      type: "Residential (R-1, R-2, R-3)",
      description: "Single-family homes, duplexes, multi-family developments with varying density requirements", 
      icon: Home
    },
    {
      type: "Commercial (C-1, C-2)",
      description: "Retail, office, hospitality, and service businesses with appropriate parking and access",
      icon: Building
    },
    {
      type: "Industrial (I-1, I-2)",
      description: "Manufacturing, warehousing, distribution centers, and heavy industrial uses",
      icon: Factory
    }
  ];

  const developmentSteps = [
    {
      step: "1",
      title: "Pre-Application Consultation",
      description: "Meet with local planning staff to discuss project feasibility and requirements"
    },
    {
      step: "2", 
      title: "Site Plan Preparation",
      description: "Develop detailed plans showing proposed improvements, utilities, and landscaping"
    },
    {
      step: "3",
      title: "Permit Application", 
      description: "Submit applications for building permits, septic systems, and utility connections"
    },
    {
      step: "4",
      title: "Review and Approval",
      description: "County review process typically takes 30-90 days depending on project complexity"
    }
  ];

  const utilities = [
    { name: "Electricity", providers: "Duke Energy Indiana, Indiana Michigan Power", icon: Zap },
    { name: "Natural Gas", providers: "Citizens Energy Group, NIPSCO", icon: Zap },
    { name: "Water & Sewer", providers: "Municipal systems, private wells, septic systems", icon: Droplets },
    { name: "Telecommunications", providers: "AT&T, Comcast, Frontier, local providers", icon: Wifi }
  ];

  const infrastructureChecklist = [
    "Road Access - Verify public road frontage and access rights",
    "Utility Availability - Confirm proximity to electric, gas, water, and sewer lines", 
    "Soil Conditions - Test for septic suitability and foundation requirements",
    "Flood Zones - Check FEMA flood maps and insurance requirements",
    "Environmental Factors - Assess wetlands, endangered species, and contamination"
  ];

  const highways = [
    {
      name: "Interstate 65",
      description: "North-south corridor connecting Chicago to Louisville, major freight and passenger route"
    },
    {
      name: "Interstate 70", 
      description: "East-west corridor linking Indianapolis to major markets in Illinois and Ohio"
    },
    {
      name: "Interstate 74",
      description: "Diagonal route connecting Cincinnati to Illinois, serving southeastern Indiana"
    },
    {
      name: "US Highway 31",
      description: "Major north-south arterial serving central Indiana communities"
    }
  ];

  const connectivityBenefits = [
    {
      title: "Central Location Advantage",
      description: "Within one day's drive of 75% of US population and major metropolitan markets"
    },
    {
      title: "Logistics Hub Potential", 
      description: "Ideal for distribution centers serving Midwest and Eastern markets"
    },
    {
      title: "Manufacturing Corridor",
      description: "Access to skilled workforce and established supply chains"
    }
  ];

  const financingOptions = [
    {
      title: "Land Loans",
      description: "Specialized financing for vacant land purchases with competitive rates from local and regional banks.",
      features: [
        "Typically 20-30% down payment required",
        "5-20 year terms available", 
        "Interest rates 1-3% above mortgage rates"
      ],
      icon: FileText
    },
    {
      title: "Owner Financing",
      description: "Direct financing from property sellers with flexible terms and faster closing timelines.",
      features: [
        "Flexible down payment options",
        "Customizable payment schedules",
        "Faster closing process"
      ],
      icon: User
    },
    {
      title: "Construction-to-Permanent",
      description: "Combined financing for land purchase and construction projects with single closing.",
      features: [
        "Single loan for land and construction", 
        "Converts to permanent mortgage",
        "Streamlined approval process"
      ],
      icon: Building
    }
  ];

  const holdingCosts = [
    {
      category: "Property Taxes",
      description: "Indiana property tax rates vary by county, typically ranging from 0.8% to 1.5% of assessed value annually"
    },
    {
      category: "Insurance",
      description: "Vacant land insurance protects against liability claims and natural disasters, typically $200-500 annually"
    },
    {
      category: "Maintenance", 
      description: "Periodic mowing, weed control, and boundary maintenance to preserve property value and comply with local ordinances"
    },
    {
      category: "Opportunity Costs",
      description: "Consider alternative investments and the time value of money when holding land for appreciation"
    }
  ];

  const faqs = [
    {
      question: "What if the description isn't evident and/or the property has other identities, legal claims, or liens?",
      answer: "We conduct an individual title investigation (at our expenditure) on every estate we procure and will ascertain if any title problems exist through our investigation. We have decades work expertise cope with challenging title challenges and can frequently come up with a solution. Every case is unique. We hope to guide you through the process and then provide the assets you need to resolve description issues as they arise. We may be able to quiet the title, document property disputes, or analyse other creative possibilities to pass the title based on the state and township where property is situated and the circumstances involved."
    },
    {
      question: "How long does it take to close on a property after I make my down payment?",
      answer: "Once your down payment clears, we'll send out your entire deed package via email using docusign.com (we are saving tons of paper). This packet will include items such as maps, photos, your Land Contract, Promissory Note, and Purchase Sale Agreement. Once you sign the documents digitally we will set you up on automatic payments (another way to save paper). Once you have paid off your note, we will provide you with your Deed. The county will then send you the official recorded deed for your records. It's that easy. The procedure usually takes about two weeks, and most of that time is consumed with processing the paperwork."
    },
    {
      question: "Why should I buy from Acreage Sale instead of Craigslist or eBay?",
      answer: "There are plenty of land sellers, but our method is simple and transparent when purchasing land. We specialize in selecting land with access, views, lake access, and potential value appreciation."
    },
    {
      question: "What distinguishes you from a real estate broker?",
      answer: "Real estate brokers list parcels of land in the hopes that they will be purchased. If there are any potential buyers, the representative demonstrates the properties to them (the average process of selling a property in many industries right now is 6-twelve months) and afterwards takes a proportion of the purchase price if they make an offer. The attorney's commission is typically 3-6 percent of the sale price of your home (so if you sell a $1 million home, you'll pay between $3,000 and $6,000 in commissions to a representative). Agents are a great resource for those who can wait 6-12 months to sell and are willing to give up a portion of the sale price to cover commissions. And here's where we differ: we're not looking to list your estate in order to sell it. We are actual home buyers looking to buy your land. Our business actually buys residential properties. We can end up making an offer to purchase your property within a couple days because we are the ones buying it from you and we accept cash. While, we make our living by running the chance of buying the house with our own money, repairing it, and marketing it ourselves in order to obtain a customer."
    },
    {
      question: "Why should I buy from Acreage Sale instead of a real estate agent?",
      answer: "When you work with Acreage Sale, you avoid the expense of paying a middleman, who typically charges 5% to 8% of the purchase price."
    },
    {
      question: "Will you answer my questions and help me through the process?",
      answer: "When you work with Acreage Sale, you avoid the expense of paying a middleman, who typically charges 5% to 8% of the purchase price."
    }
  ];

  const additionalFaqs = [
    {
      question: "What are the typical property tax rates for land in Indiana?",
      answer: "Property tax rates in Indiana vary by county and local taxing districts, typically ranging from 0.8% to 1.5% of assessed value annually. Agricultural land may qualify for preferential assessment rates, significantly reducing tax obligations. Many counties offer agricultural exemptions for properties used for farming, forestry, or other qualifying agricultural purposes. Contact your local county assessor's office for specific rates and exemption requirements in your area."
    },
    {
      question: "How do I verify utilities are available to my Indiana property?",
      answer: "Contact utility providers directly to confirm service availability and connection costs. Request utility maps showing the nearest connection points to your property. For rural properties, verify whether electric service is available and what costs may be involved for line extensions. Water and sewer availability varies significantly between urban and rural areas, with many rural properties requiring private wells and septic systems."
    },
    {
      question: "What should I know about soil conditions for building in Indiana?",
      answer: "Indiana soils vary from rich prairie loam to clay-based compositions. Conduct soil tests to determine bearing capacity for foundations and suitability for septic systems. Some areas may require engineered foundations or special construction techniques. Soil surveys from the USDA Natural Resources Conservation Service provide valuable preliminary information, but professional soil testing is recommended before construction."
    },
    {
      question: "Are there any environmental restrictions I should be aware of in Indiana?",
      answer: "Check for wetlands, floodplains, and endangered species habitats that may restrict development. The Indiana Department of Environmental Management regulates activities near waterways and wetlands. Some properties may have conservation easements or deed restrictions limiting development. Always conduct environmental due diligence including Phase I Environmental Site Assessments for commercial or industrial development projects."
    },
    {
      question: "What are the advantages of investing in Indiana land compared to other states?",
      answer: "Indiana offers several competitive advantages including lower land costs compared to coastal states, business-friendly regulations, no state tax on retirement income, and central location for logistics operations. The state's diverse economy, strong agricultural sector, and growing technology industry provide multiple development opportunities. Additionally, Indiana's stable political environment and consistent regulatory framework create predictable conditions for long-term investment planning."
    },
    {
      question: "How long does the development approval process typically take in Indiana?",
      answer: "Development approval timelines vary by project complexity and local jurisdiction. Simple residential projects may receive approval in 30-60 days, while complex commercial or industrial developments can take 6-12 months. Subdivision plats and planned unit developments typically require 3-6 months for approval. Pre-application meetings with local planning staff can help identify potential issues and streamline the approval process."
    },
    {
      question: "What financing options work best for agricultural land in Indiana?",
      answer: "Agricultural land financing options include Farm Service Agency loans, commercial agricultural lenders, and seller financing. FSA loans offer favorable terms for beginning farmers and may require lower down payments. Many Indiana agricultural lenders understand local farming operations and offer competitive rates for qualified borrowers. Consider lease-to-own arrangements with existing farmers as an alternative to traditional financing, providing immediate income while building equity."
    },
    {
      question: "How do I research comparable land sales in Indiana?",
      answer: "Research comparable sales through county recorder's offices, which maintain public records of all property transactions. Many Indiana counties provide online access to property records and sales data. Real estate professionals with land expertise can provide comparative market analyses. Consider factors beyond price per acre, including utility availability, road access, zoning, and development potential when evaluating comparables."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-indiana" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Indiana land inquiry and will contact you within 24 hours with available properties and market insights.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Indiana land experts review your requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We prepare a customized list of Indiana properties</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You receive detailed property information and market analysis</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties?search=Indiana">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse Indiana Properties
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Home</span>
              </Link>
              <Link to="/properties">
                <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white">
                  View All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🏆 Premium Market
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Land for Sale in <span className="text-[#329cf9]">Indiana</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Indiana offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Indiana">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Indiana Properties
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Market Analysis
              </Button>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {marketStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="w-12 h-12 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-[#329cf9]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Overview */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Indiana is a Prime Investment Market
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Population growth and diversified employment continue to drive demand for land across Indiana.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Corporate expansion and infrastructure investment support long-term appreciation and development viability.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.
                </p>
              </div>
            </div>

            {/* State Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stateStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                  <div className="text-3xl font-bold text-[#329cf9] mb-2">{stat.value}</div>
                  <div className="text-gray-900 font-bold mb-1">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>

            {/* Market Image */}
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Indiana vacant land development opportunities"
                className="w-full max-w-2xl mx-auto h-64 object-cover rounded-2xl shadow-xl mb-6"
              />
              <div className="inline-flex items-center bg-[#329cf9] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Indiana - Prime Growth Market
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Acreage Sale for <span className="text-[#329cf9]">Indiana Land?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Success Stories from <span className="text-[#329cf9]">Indiana Investors</span>
            </h3>
            <p className="text-xl text-gray-600 mb-12">Real results from real investors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#329cf9] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Indiana Land Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Indiana Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Indiana
            </p>
          </div>

          {/* Land for Sale in Indiana Content */}
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Land for Sale in Indiana</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Looking to buy land for sale in Indiana? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Find the Best Land for Sale in Indiana</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
                <p className="text-gray-700 leading-relaxed">
                  The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
                <p className="text-gray-700 leading-relaxed">
                  Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Ask other landowners about the area</h4>
                <p className="text-gray-700 leading-relaxed">
                  Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Look for signs of natural regeneration</h4>
                <p className="text-gray-700 leading-relaxed">
                  One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Summing up</h4>
                <p className="text-gray-700 leading-relaxed">
                  When you're looking for land for sale in Indiana, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in Indiana, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indiana Market Submarkets */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Indiana Regional <span className="text-[#329cf9]">Land Markets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse submarkets and opportunities across Indiana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {submarkets.map((market, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${market.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <market.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{market.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{market.description}</p>
                  <div className="space-y-2">
                    {market.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning and Development Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Indiana Zoning and <span className="text-[#329cf9]">Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential information for land buyers and developers in Indiana
            </p>
          </div>

          {/* Zoning Categories */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Zoning Classifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {zoningTypes.map((zone, index) => (
                <Card key={index} className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#329cf9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <zone.icon className="w-6 h-6 text-[#329cf9]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{zone.type}</h4>
                        <p className="text-gray-600 leading-relaxed">{zone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Development Process */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Process Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold shadow-lg">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-yellow-800 mb-4">Important Disclaimer</h4>
                <p className="text-yellow-700 leading-relaxed">
                  Zoning regulations and development requirements in Indiana are subject to change. Always consult with qualified professionals including attorneys, engineers, and local planning officials before making investment decisions. This information is for general guidance only and should not be considered legal or professional advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure and Utilities */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Indiana Infrastructure and <span className="text-[#329cf9]">Utilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure considerations for land development in Indiana
            </p>
          </div>

          {/* Utility Providers */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Utility Providers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {utilities.map((utility, index) => (
                <Card key={index} className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#329cf9]/10 rounded-xl flex items-center justify-center">
                        <utility.icon className="w-6 h-6 text-[#329cf9]" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">{utility.name}</h4>
                    </div>
                    <p className="text-gray-600">{utility.providers}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Infrastructure Checklist */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Infrastructure Checklist</h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="space-y-4">
                {infrastructureChecklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transportation Access */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Transportation and Regional Access</h3>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Indiana's strategic location provides excellent connectivity for land development projects
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Major Highway Corridors</h4>
                <div className="space-y-4">
                  {highways.map((highway, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
                      <h5 className="font-bold text-gray-900 mb-2">{highway.name}</h5>
                      <p className="text-gray-600 text-sm">{highway.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Regional Connectivity Benefits</h4>
                <div className="space-y-4">
                  {connectivityBenefits.map((benefit, index) => (
                    <div key={index} className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
                      <h5 className="font-bold text-gray-900 mb-2">{benefit.title}</h5>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Considerations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Environmental and <span className="text-[#329cf9]">Topographical Considerations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Indiana's natural features and environmental factors for successful development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <TreePine className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Soil Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Indiana features predominantly fertile prairie soils ideal for agriculture, with good drainage characteristics suitable for most development types. Clay content varies by region, affecting foundation requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Topography</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generally flat to gently rolling terrain throughout most of Indiana, with minimal grading requirements for most development projects. Some areas feature more pronounced elevation changes near river valleys.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Climate Factors</h3>
                <p className="text-gray-600 leading-relaxed">
                  Continental climate with four distinct seasons. Moderate precipitation supports agriculture while winter conditions require appropriate building design and construction scheduling considerations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financing Your <span className="text-[#329cf9]">Indiana Land Investment</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding financing options and holding costs for land investment in Indiana
            </p>
          </div>

          {/* Financing Options */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Financing Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {financingOptions.map((option, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                      <option.icon className="w-8 h-8 text-[#329cf9]" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">{option.description}</p>
                    <div className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#329cf9] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Holding Costs */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Holding Costs and Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {holdingCosts.map((cost, index) => (
                <Card key={index} className="p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{cost.category}</h4>
                    <p className="text-gray-600 leading-relaxed">{cost.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Acreage Sale */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#329cf9]">Acreage Sale</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-0">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  We at Acreage Sale are striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Indiana to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips for Finding Cheap Land */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tips to Find Cheap Land for Sale in <span className="text-[#329cf9]">Indiana</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">1) Check out foreclosure listings in your area</h3>
              <p className="text-gray-700 leading-relaxed">
                Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Indiana. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tape in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">2) Take advantage of the seller's desperation</h3>
              <p className="text-gray-700 leading-relaxed">
                While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">3) Look for land development opportunities</h3>
              <p className="text-gray-700 leading-relaxed">
                The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">4) Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h3>
              <p className="text-gray-700 leading-relaxed">
                You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">5) Take the time to find the right property for you</h3>
              <p className="text-gray-700 leading-relaxed">
                Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Want to Buy Land in <span className="text-[#329cf9]">United States?</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Fill up the form to get a full list of Land for sale in the United States.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                  {error}
                </div>
              )}

              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Property Type *
                    </label>
                    <select
                      {...form.register('propertyType')}
                      className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                    >
                      <option value="Residential Development">Residential Development</option>
                      <option value="Commercial Land">Commercial Land</option>
                      <option value="Agricultural Land">Agricultural Land</option>
                      <option value="Industrial Land">Industrial Land</option>
                      <option value="Recreational Land">Recreational Land</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Budget Range *
                    </label>
                    <select
                      {...form.register('budget')}
                      className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                    >
                      <option value="Under $100,000">Under $100,000</option>
                      <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                      <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                      <option value="Over $1,000,000">Over $1,000,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Timeline *
                    </label>
                    <select
                      {...form.register('timeline')}
                      className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                    >
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="Within 6 months">Within 6 months</option>
                      <option value="Within 1 year">Within 1 year</option>
                      <option value="No specific timeline">No specific timeline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    {...form.register('additionalInfo')}
                    placeholder="Tell us about your specific requirements, preferred locations, or any questions you have..."
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
                      Getting Your Indiana Land List...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-6 h-6" />
                      Get My Indiana Land List
                    </div>
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  🔒 Your information is secure and will never be shared. SSL encrypted.
                </p>
              </form>
            </div>

            {/* Right side - Trust indicators */}
            <div className="space-y-8">
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">100% Guarantee</h3>
                    <p className="text-green-700 font-medium">Verified property data and transparent process</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Multiple Offers</h3>
                    <p className="text-blue-700 font-medium">Access to exclusive off-market properties</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-purple-50 to-violet-50">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Reach</h3>
                    <p className="text-purple-700 font-medium">The Best Real Estate Professionals you can count on 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-[#329cf9]">Questions</span>
            </h2>
          </div>

          <div className="space-y-6 mb-16">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Indiana-Specific FAQs */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Additional <span className="text-[#329cf9]">Indiana Land Investment Questions</span>
            </h3>
            <p className="text-xl text-gray-600">Comprehensive answers to help you make informed decisions</p>
          </div>

          <div className="space-y-6">
            {additionalFaqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Indiana Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#329cf9] text-white font-bold shadow-lg">
                      {property.acres} acres
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {property.location}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#329cf9] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#329cf9]">
                      {property.price}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                  <Link to="/properties?search=Indiana">
                    <Button className="w-full bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-medium transition-all duration-300 group-hover:shadow-lg">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Indiana">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                View All Indiana Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Insights */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Indiana Land Investment <span className="text-[#329cf9]">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Indiana land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Population Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  The metro continues to attract new residents, driving demand for both residential and commercial land development opportunities in Indiana.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">
                  A diverse base across technology, finance, healthcare, and energy supports steady absorption for a range of land uses around Indiana.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Central positioning with strong transportation infrastructure makes Indiana compelling for logistics, distribution, and advanced manufacturing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Ready to Invest in Indiana Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Indiana">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Indiana Properties
              </Button>
            </Link>
            <Button className="bg-transparent border-white border-4 text-white hover:bg-white hover:text-[#329cf9] px-12 py-6 text-2xl font-bold rounded-2xl h-auto shadow-2xl hover:shadow-3xl transition-all">
              Get Free Market Report
            </Button>
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
  );
}