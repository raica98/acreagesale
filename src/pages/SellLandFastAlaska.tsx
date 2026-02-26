import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Check, Phone, Mail, ChevronDown, ChevronUp, Star, Shield, FileText, Chrome as Home, Building, Mountain, Trees } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

export function SellLandFastAlaska() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const keyBenefits = [
    { icon: Clock, label: "24 Hours", description: "Cash Offer" },
    { icon: DollarSign, label: "7-14 Days", description: "Fast Closing" },
    { icon: Shield, label: "$0", description: "Fees or Commissions" },
    { icon: Check, label: "Any Condition", description: "We Buy As-Is" }
  ];

  const whyChooseUs = [
    "No realtor commissions - save 6%",
    "Cash offers within 24 hours",
    "Close in 7-14 days guaranteed",
    "Buy land in any condition",
    "Handle all paperwork for you",
    "No hidden fees or costs"
  ];

  const testimonials = [
    {
      quote: "Needed to sell my inherited land in Alaska quickly. Got a fair cash offer in 24 hours and closed in 10 days. Couldn't be happier!",
      author: "Jennifer Martinez",
      role: "Land Owner"
    },
    {
      quote: "The process was incredibly smooth. No hassles, no fees, and they handled everything. Highly recommend for anyone who needs to sell land fast.",
      author: "Robert Chen",
      role: "Property Investor"
    }
  ];

  const regionalSubmarkets = [
    {
      title: "Southcentral Alaska",
      areas: [
        { code: "A", name: "Anchorage Metropolitan Area", description: "Highest population density, commercial development, established infrastructure" },
        { code: "M", name: "Matanuska-Susitna Borough", description: "Agricultural land, residential development, growing communities" },
        { code: "K", name: "Kenai Peninsula", description: "Tourism, fishing industry, recreational properties" }
      ]
    },
    {
      title: "Interior & Northern Alaska",
      areas: [
        { code: "F", name: "Fairbanks North Star Borough", description: "Military installations, university, mining support services" },
        { code: "N", name: "North Slope Borough", description: "Oil industry, industrial land, specialized development" },
        { code: "S", name: "Southeast Alaska", description: "Juneau capital region, tourism, forestry, fishing communities" }
      ]
    }
  ];

  const landTypes = [
    { icon: Home, title: "Residential Land", description: "Urban lots, suburban parcels, and remote homesteads" },
    { icon: Building, title: "Commercial Land", description: "Tourism sites, retail locations, and business districts" },
    { icon: Mountain, title: "Industrial Land", description: "Oil support, mining operations, and processing facilities" },
    { icon: Trees, title: "Remote Land", description: "Wilderness parcels, hunting lodges, and off-grid properties" }
  ];

  const zoningDistricts = [
    {
      category: "Municipal Zoning Districts",
      zones: [
        { name: "R-1 through R-4 (Residential)", description: "Single-family to high-density residential development" },
        { name: "B-1 through B-3 (Business)", description: "Neighborhood commercial to heavy commercial uses" },
        { name: "I-1, I-2 (Industrial)", description: "Light and heavy industrial development" },
        { name: "PLI (Public Lands and Institutions)", description: "Government facilities and institutional uses" }
      ]
    },
    {
      category: "Borough and State Classifications",
      zones: [
        { name: "Rural Residential", description: "Low-density development outside municipal boundaries" },
        { name: "Resource Development", description: "Mining, oil extraction, and natural resource activities" },
        { name: "Conservation/Recreation", description: "Protected areas, parks, and recreational facilities" },
        { name: "Native Corporation Lands", description: "Alaska Native Regional and Village Corporation properties" }
      ]
    }
  ];

  const developmentTimeline = [
    {
      phase: "Pre-Development",
      tasks: ["Environmental assessments", "Permafrost analysis", "Access planning", "Utility feasibility"],
      duration: "6-12 months"
    },
    {
      phase: "Permitting",
      tasks: ["State/federal permits", "Environmental compliance", "Wetlands delineation", "Cultural resource review"],
      duration: "4-8 months"
    },
    {
      phase: "Infrastructure",
      tasks: ["Road construction", "Utility installation", "Seasonal access planning", "Winter preparation"],
      duration: "8-18 months"
    },
    {
      phase: "Construction",
      tasks: ["Seasonal construction", "Cold weather building", "Material logistics", "Final inspections"],
      duration: "6-24 months"
    }
  ];

  const utilities = [
    { name: "Chugach Electric Association", service: "Southcentral Alaska electric service" },
    { name: "Golden Valley Electric", service: "Interior Alaska electric cooperative" },
    { name: "Municipal Light & Power", service: "Anchorage municipal utility" }
  ];

  const transportation = [
    { name: "Alaska Highway System", description: "Limited road network, seasonal access" },
    { name: "Marine Highway System", description: "Ferry service to coastal communities" },
    { name: "Aviation Network", description: "Bush planes for remote property access" }
  ];

  const environmentalFactors = [
    {
      icon: "🌡️",
      title: "Climate Zones",
      zones: [
        "Arctic: Permafrost, extreme cold (-40°F to 70°F)",
        "Subarctic: Continental climate (-20°F to 80°F)",
        "Maritime: Oceanic influence (20°F to 65°F)",
        "Transitional: Mixed continental/maritime"
      ]
    },
    {
      icon: "🏔️",
      title: "Topography",
      zones: [
        "Mountain Ranges: Alaska, Brooks, Chugach ranges",
        "Coastal Plains: North Slope, Yukon-Kuskokwim Delta",
        "Interior Plateaus: Yukon River basin",
        "Glacial Features: Moraines, outwash plains"
      ]
    },
    {
      icon: "🌲",
      title: "Natural Resources",
      zones: [
        "Forests: Boreal and coastal temperate rainforest",
        "Minerals: Gold, zinc, lead, coal deposits",
        "Energy: Oil, natural gas, renewable potential",
        "Water: Abundant freshwater resources"
      ]
    }
  ];

  const financingOptions = [
    {
      category: "Traditional Financing",
      options: [
        { name: "Alaska Land Loans", description: "Specialized lenders familiar with Alaska properties", rate: "9.5% - 14.5% APR" },
        { name: "Construction-to-Permanent", description: "Combined land purchase and construction financing", rate: "8.5% - 12.0% APR" },
        { name: "USDA Rural Development", description: "Federal programs for rural Alaska properties", rate: "6.5% - 9.5% APR" }
      ]
    },
    {
      category: "Alternative Financing",
      options: [
        { name: "Owner Financing", description: "Direct seller financing with flexible terms", rate: "7% - 12% APR" },
        { name: "Hard Money Loans", description: "Short-term financing for quick acquisitions", rate: "14% - 20% APR" },
        { name: "Investment Partnerships", description: "Joint ventures for large-scale projects", rate: "Equity-based returns" }
      ]
    }
  ];

  const holdingCosts = {
    costs: [
      { item: "Property Taxes", range: "$850 - $2,800/acre" },
      { item: "Insurance", range: "$125 - $450/acre" },
      { item: "Maintenance", range: "$200 - $750/acre" },
      { item: "Management", range: "$150 - $600/acre" },
      { item: "Total Annual", range: "$1,325 - $4,600/acre", highlight: true }
    ],
    income: [
      { item: "Hunting/Fishing Leases", range: "$500 - $2,500/acre" },
      { item: "Tourism Operations", range: "$750 - $3,200/acre" },
      { item: "Resource Extraction", range: "$1,200 - $8,500/acre" },
      { item: "Timber Rights", range: "$400 - $1,800/acre" },
      { item: "Potential Annual", range: "$2,850 - $16,000/acre", highlight: true }
    ]
  };

  const faqs = [
    {
      question: "How quickly can you close on my Alaska property?",
      answer: "We can typically close within 7-14 days of accepting our offer, even in Alaska's challenging conditions. For urgent situations, we may be able to close even faster. Our cash buying process eliminates financing delays and allows for rapid closings regardless of seasonal access limitations."
    },
    {
      question: "Do you handle remote Alaska properties without road access?",
      answer: "Yes, we regularly purchase remote Alaska properties accessible only by plane, boat, or seasonal roads. Our team has extensive experience with Alaska's unique access challenges and can evaluate properties throughout the state, including the most remote locations."
    },
    {
      question: "How do you handle permafrost and soil conditions in your evaluations?",
      answer: "Our Alaska land evaluations include permafrost analysis and soil condition assessments. We understand how these factors affect development potential and property values, ensuring our offers reflect the true market value considering Alaska's unique geological conditions."
    },
    {
      question: "What about seasonal access limitations for Alaska properties?",
      answer: "We factor seasonal access into our evaluations and can work around Alaska's unique seasonal constraints. Whether your property is accessible year-round or only during certain seasons, we have the expertise to complete transactions efficiently."
    },
    {
      question: "Do you buy Native Corporation lands or lands with subsistence rights?",
      answer: "We have experience with Alaska Native Corporation lands and properties with subsistence rights. Our team understands the complex legal framework surrounding these properties and can navigate the unique requirements for such transactions."
    },
    {
      question: "How do Alaska property taxes compare to other states?",
      answer: "Alaska has no state income tax, but property taxes vary significantly by borough. Some areas have very low property taxes, while others (particularly in oil-producing regions) may have higher rates. We factor local tax implications into our cash offers."
    },
    {
      question: "Can you purchase land with mineral or oil rights included?",
      answer: "Yes, we regularly purchase Alaska properties that include mineral, oil, or gas rights. Our evaluation process includes assessment of subsurface rights and potential resource value, ensuring you receive fair compensation for all aspects of your property."
    },
    {
      question: "How does the Alaska Permanent Fund Dividend affect land values?",
      answer: "The Permanent Fund Dividend provides Alaska residents with annual income that can support land ownership and development. This unique economic factor contributes to land demand and helps maintain property values throughout the state's economic cycles."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="sell-land-fast-alaska" />
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Back to Home</span>
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
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400 px-4 py-2 text-sm font-semibold mb-6 inline-flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Cash Land Buyers
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sell Land Fast in <br />
              <span className="text-blue-400">Alaska</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Get cash for your Alaska land with our streamlined process. No fees, no commissions, and we can close in as little as 7 days with our own cash.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Get My Cash Offer Now
              </Button>
              <Button variant="outline" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg font-bold rounded-xl backdrop-blur-sm">
                <Phone className="w-5 h-5 mr-2" />
                Call 949-767-8885
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <Icon className="w-8 h-8 text-blue-400 mb-2" />
                    <div className="text-2xl font-bold">{benefit.label}</div>
                    <div className="text-sm text-gray-300">{benefit.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell Land Fast in Alaska */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Sell Land Fast in Alaska?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cash land buyers provide immediate liquidity for property owners who need quick transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Avoid lengthy marketing periods, uncertain buyer financing, and complex closing procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Get fair market value without paying real estate commissions or closing costs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Cash land buyers provide immediate liquidity for property owners who need quick transactions.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.5M+</div>
              <div className="text-gray-600">Land Purchased</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Alaska</div>
              <div className="text-gray-600">Cash Land Buyers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Acreage Sale to Sell Land Fast?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip traditional real estate hassles and get cash for your land quickly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-gray-700 font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories from Alaska Land Sellers
            </h2>
            <p className="text-xl text-gray-600">Real results from real property owners</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Submarkets */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Alaska Regional Submarkets
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Alaska's diverse regions for optimal land sales
            </p>
          </div>

          <div className="space-y-12">
            {regionalSubmarkets.map((region, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{region.title}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {region.areas.map((area, areaIndex) => (
                    <Card key={areaIndex} className="border-2 border-gray-200 hover:border-blue-500 transition-colors rounded-xl">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                          {area.code}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h4>
                        <p className="text-gray-600 text-sm">{area.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Alaska Land We Purchase */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Types of Alaska Land We Purchase
            </h2>
            <p className="text-xl text-gray-600">
              We buy all types of land in any condition throughout Alaska
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alaska Zoning Classifications */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Alaska Zoning Classifications
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Alaska's unique land use regulations and development requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {zoningDistricts.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.zones.map((zone, zoneIndex) => (
                      <div key={zoneIndex} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-1">{zone.name}</h4>
                        <p className="text-gray-600 text-sm">{zone.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alaska Land Development Timeline */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Alaska Land Development Timeline
            </h2>
            <p className="text-xl text-gray-300">
              Understanding the development process for Alaska properties
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {developmentTimeline.map((phase, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{phase.phase}</h3>
                  <ul className="space-y-2 mb-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-400">
                    {phase.duration}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Alaska Utilities and Infrastructure
            </h2>
            <p className="text-xl text-gray-600">
              Essential infrastructure considerations for Alaska land development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Utility Providers</h3>
                <div className="space-y-4">
                  {utilities.map((utility, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-bold text-gray-900">{utility.name}</div>
                        <div className="text-sm text-gray-600">{utility.service}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Transportation Access</h3>
                <div className="space-y-4">
                  {transportation.map((transport, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-bold text-gray-900">{transport.name}</div>
                        <div className="text-sm text-gray-600">{transport.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Environmental Factors */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Alaska Environmental Factors
            </h2>
            <p className="text-xl text-gray-600">
              Unique environmental considerations for Alaska land transactions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {environmentalFactors.map((factor, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{factor.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{factor.title}</h3>
                  <ul className="space-y-3">
                    {factor.zones.map((zone, zoneIndex) => (
                      <li key={zoneIndex} className="text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm">{zone}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Alaska Land Financing Options
            </h2>
            <p className="text-xl text-gray-600">
              Financing strategies adapted to Alaska's unique market conditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-6">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-1">{option.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                        <Badge className="bg-green-100 text-green-800">{option.rate}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Holding Costs & Returns */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Alaska Land Holding Costs & Returns
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the financial aspects of Alaska land ownership
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Annual Holding Costs</h3>
                <div className="space-y-4">
                  {holdingCosts.costs.map((cost, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${cost.highlight ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'}`}>
                      <span className={`font-semibold ${cost.highlight ? 'text-red-900' : 'text-gray-700'}`}>
                        {cost.item}
                      </span>
                      <span className={`font-bold ${cost.highlight ? 'text-red-600' : 'text-gray-900'}`}>
                        {cost.range}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Potential Income Sources</h3>
                <div className="space-y-4">
                  {holdingCosts.income.map((income, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${income.highlight ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
                      <span className={`font-semibold ${income.highlight ? 'text-green-900' : 'text-gray-700'}`}>
                        {income.item}
                      </span>
                      <span className={`font-bold ${income.highlight ? 'text-green-600' : 'text-gray-900'}`}>
                        {income.range}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about selling land fast in Alaska
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-8">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Sell Your Alaska Land Fast?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Get your no-obligation cash offer today and close on your timeline
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get My Cash Offer Now
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-bold mb-2">Call for Immediate Offer</h3>
                <p className="text-blue-300 font-bold text-lg">949-767-8885</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-blue-300 font-bold text-lg">info@acreagesales.com</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-bold mb-2">About Acreage Sale</h3>
                <p className="text-sm text-gray-300">
                  Specialized Alaska land buyers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AcreageSaleLogo className="w-40 mx-auto mb-6 invert" />
            <p className="text-gray-400 mb-6">
              We at Acreage Sale are a group of real estate investors specializing in helping property owners sell land fast across the United States. We have years of experience purchasing all types of land, from small residential lots to large commercial parcels. Our mission is to provide property owners with a fast, fair, and hassle-free way to sell their land.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/properties" className="hover:text-white transition-colors">Properties</Link>
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    );
}
