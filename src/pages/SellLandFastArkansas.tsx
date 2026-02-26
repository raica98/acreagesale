import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Check, Phone, Mail, ChevronDown, ChevronUp, Star, Shield, FileText, Chrome as Home, Building, Mountain, Trees, Sun, Zap, Radio, Droplet, Car, Plane, Brain as Train } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

export function SellLandFastArkansas() {
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
      quote: "Needed to sell my inherited land in Arkansas quickly. Got a fair cash offer in 24 hours and closed in 10 days. Couldn't be happier!",
      author: "Sarah Thompson",
      role: "Land Owner"
    },
    {
      quote: "The process was incredibly smooth. No hassles, no fees, and they handled everything. Highly recommend for anyone who needs to sell land fast.",
      author: "Michael Johnson",
      role: "Property Investor"
    }
  ];

  const marketAnalysis = [
    {
      icon: TrendingUp,
      title: "Northwest Arkansas Growth",
      description: "Bentonville, Fayetteville, and Rogers continue expanding with corporate headquarters and university growth driving land demand throughout Arkansas."
    },
    {
      icon: Mountain,
      title: "Agricultural Heritage",
      description: "Strong agricultural economy with rice, soybeans, and poultry operations creates steady demand for rural land throughout Arkansas."
    },
    {
      icon: MapPin,
      title: "Central Location",
      description: "Strategic position in the South with access to major markets via I-40, I-30, and the Arkansas River navigation system enhances land values."
    }
  ];

  const regionalMarkets = [
    {
      title: "Northwest Arkansas",
      areas: [
        { num: "1", name: "Bentonville/Rogers", description: "Walmart headquarters and corporate expansion driving premium land values" },
        { num: "2", name: "Fayetteville/Springdale", description: "University of Arkansas and Tyson Foods creating diverse land demand" },
        { num: "3", name: "Bella Vista/Centerton", description: "Residential growth and retirement communities expanding land needs" }
      ]
    },
    {
      title: "Central & Eastern Arkansas",
      areas: [
        { num: "1", name: "Little Rock Metro", description: "State capital with government, healthcare, and finance sectors" },
        { num: "2", name: "Arkansas Delta", description: "Prime agricultural land with rice, cotton, and soybean production" },
        { num: "3", name: "Hot Springs/Pine Bluff", description: "Tourism, recreation, and industrial development opportunities" }
      ]
    }
  ];

  const landTypes = [
    { icon: Home, title: "Residential Land", description: "Single-family lots, subdivisions, and residential development parcels" },
    { icon: Building, title: "Commercial Land", description: "Retail sites, office developments, and mixed-use properties" },
    { icon: Mountain, title: "Industrial Land", description: "Manufacturing sites, warehouses, and distribution centers" },
    { icon: Trees, title: "Agricultural Land", description: "Farmland, timberland, and recreational properties" }
  ];

  const zoningCategories = [
    {
      category: "Municipal Zoning Classifications",
      zones: [
        { name: "Residential Zones", description: "R-1: Single-family residential (low density) • R-2: Single-family residential (medium density) • R-3: Multi-family residential • R-4: High-density residential" },
        { name: "Commercial Zones", description: "C-1: Neighborhood commercial • C-2: General commercial • C-3: Highway commercial • C-4: Central business district" },
        { name: "Industrial & Special", description: "I-1: Light industrial • I-2: Heavy industrial • A-1: Agricultural • PUD: Planned unit development" }
      ]
    },
    {
      category: "County Zoning Systems",
      zones: [
        { name: "Washington County", description: "RR: Rural residential (1-5 acres) • AG: Agricultural (10+ acres) • C: Commercial development • I: Industrial development" },
        { name: "Pulaski County", description: "R-1: Single-family residential • R-2: Medium density residential • B: Business/commercial • M: Manufacturing/industrial" },
        { name: "Rural Counties", description: "Agricultural: Farming and livestock • Forestry: Timber production • Recreation: Hunting and fishing • Conservation: Protected areas" }
      ]
    }
  ];

  const developmentTimeline = [
    {
      phase: "Phase 1: Pre-Development",
      duration: "2-4 months",
      description: "Site analysis, feasibility studies, and initial planning"
    },
    {
      phase: "Phase 2: Entitlements",
      duration: "4-12 months",
      description: "Zoning approvals, permits, and regulatory compliance"
    },
    {
      phase: "Phase 3: Infrastructure",
      duration: "6-18 months",
      description: "Utilities, roads, and site preparation"
    },
    {
      phase: "Phase 4: Construction",
      duration: "6-24 months",
      description: "Building construction and project completion"
    }
  ];

  const utilities = [
    { icon: Zap, category: "Electricity", providers: "Entergy Arkansas (primary provider) • Arkansas Electric Cooperative Corporation • Municipal utilities (Conway, Jonesboro) • Southwestern Electric Power Company" },
    { icon: Droplet, category: "Water/Sewer", providers: "Central Arkansas Water • Municipal water systems • Private well systems (rural areas) • Regional sewer authorities" },
    { icon: Radio, category: "Communications", providers: "AT&T Arkansas • Windstream Communications • Cox Communications • Rural broadband initiatives" }
  ];

  const transportation = [
    { icon: Car, name: "Interstate System", description: "I-40: East-west corridor (Memphis to Oklahoma) • I-30: Southwest corridor (Little Rock to Texas) • I-55: North-south (Memphis to Louisiana) • I-49: Northwest Arkansas to Louisiana" },
    { icon: Train, name: "Rail & River", description: "BNSF Railway (freight) • Union Pacific Railroad • Arkansas River navigation system • Mississippi River access" },
    { icon: Plane, name: "Aviation", description: "Bill and Hillary Clinton National Airport • Northwest Arkansas Regional Airport • Regional airports statewide • General aviation facilities" }
  ];

  const environmentalFactors = [
    {
      icon: "🌡️",
      title: "Climate Zones",
      zones: [
        "Humid Subtropical: Hot summers, mild winters, 45-55\" annual rainfall",
        "Growing Season: 200-240 frost-free days annually",
        "Natural Disasters: Tornadoes, flooding, ice storms"
      ]
    },
    {
      icon: "🏔️",
      title: "Topography",
      zones: [
        "Ozark Mountains: Northern Arkansas highlands and plateaus",
        "Ouachita Mountains: West-central Arkansas ridges and valleys",
        "Arkansas Delta: Eastern Arkansas alluvial plains"
      ]
    },
    {
      icon: "💎",
      title: "Natural Resources",
      zones: [
        "Water Resources: Arkansas River, White River, abundant groundwater",
        "Mineral Resources: Natural gas, oil, diamonds, bauxite",
        "Forest Resources: 56% forested (19.2 million acres)"
      ]
    }
  ];

  const financingOptions = [
    {
      category: "Traditional Financing",
      options: [
        { name: "Arkansas Land Loans", rate: "8.5% - 12.5% APR", details: "Down Payment: 20-30% • Terms: 10-20 years • Local and regional banks • Credit unions competitive rates" },
        { name: "Construction-to-Permanent", rate: "7.5% - 11.0% APR", details: "Combined land and construction financing • Single closing process • Interest-only during construction • Converts to permanent mortgage" },
        { name: "USDA Rural Development", rate: "6.5% - 9.5% APR", details: "Rural area requirements • Income limitations apply • 100% financing available • Primary residence requirement" }
      ]
    },
    {
      category: "Alternative Financing",
      options: [
        { name: "Owner Financing", rate: "6% - 10% APR", details: "Seller acts as lender • Flexible terms and conditions • Lower down payments possible • Faster closing process" },
        { name: "Hard Money Lending", rate: "12% - 18% APR", details: "Asset-based lending • Quick approval and funding • Short-term bridge financing • Development and flip projects" },
        { name: "Investment Partnerships", rate: "Equity Sharing: Varies", details: "Joint venture structures • Shared equity arrangements • Development partnerships • Investor syndications" }
      ]
    }
  ];

  const holdingCosts = {
    costs: [
      { item: "Property Taxes", range: "$350 - $1,200/acre" },
      { item: "Insurance", range: "$150 - $400/acre" },
      { item: "Maintenance", range: "$200 - $800/acre" },
      { item: "Total Annual Costs", range: "$700 - $2,400/acre", highlight: true }
    ],
    income: [
      { item: "Agricultural Leases", range: "$150 - $400/acre" },
      { item: "Hunting Leases", range: "$8 - $25/acre" },
      { item: "Timber Rights", range: "$500 - $2,000/acre" },
      { item: "Solar/Wind Leases", range: "$300 - $800/acre" },
      { item: "Total Annual Income", range: "$958 - $3,225/acre", highlight: true }
    ]
  };

  const processSteps = [
    { step: "1", title: "Submit Property Info", description: "Provide basic details about your Arkansas property including location, size, and any relevant information. This takes just 2-3 minutes.", time: "⏱️ Takes 2-3 minutes" },
    { step: "2", title: "Receive Cash Offer", description: "Our team evaluates your property and provides a no-obligation cash offer within 24 hours. All offers are based on current market conditions.", time: "💰 Cash offer in 24 hours" },
    { step: "3", title: "Close & Get Paid", description: "Accept our offer and we'll handle all closing details. Get your cash in as little as 7-14 days with our streamlined process.", time: "🚀 Close in 7-14 days" }
  ];

  const reasonsToSell = [
    { icon: DollarSign, title: "Financial Emergencies", description: "Medical bills, job loss, or other unexpected expenses requiring immediate cash access" },
    { icon: FileText, title: "Inherited Property", description: "Inherited land that requires immediate liquidation for estate settlement or tax obligations" },
    { icon: MapPin, title: "Relocation", description: "Job transfers or lifestyle changes requiring quick property liquidation before moving" },
    { icon: TrendingUp, title: "Investment Strategy", description: "Portfolio rebalancing or capital reallocation requiring quick property liquidation" },
    { icon: Shield, title: "Avoiding Foreclosure", description: "Property tax delinquency or mortgage issues requiring immediate sale to avoid foreclosure" },
    { icon: Star, title: "Opportunity Investment", description: "Need quick cash to take advantage of time-sensitive investment opportunities" }
  ];

  const cashVsTraditional = {
    cash: [
      "Close in 7-14 days guaranteed",
      "No real estate commissions (save 6%)",
      "No buyer financing contingencies",
      "Certainty of closing",
      "We handle all paperwork",
      "Buy in any condition"
    ],
    traditional: [
      "6-12 months average time on market",
      "6% real estate commissions",
      "Buyer financing can fall through",
      "Complex paperwork and negotiations",
      "Uncertain closing dates",
      "May require property improvements"
    ]
  };

  const faqs = [
    {
      question: "How quickly can you close on my Arkansas property?",
      answer: "We can typically close within 7-14 days of accepting our offer. For urgent situations, we may be able to close even faster. Our cash buying process eliminates financing delays and allows for rapid closings."
    },
    {
      question: "Do you buy agricultural land in rural Arkansas counties?",
      answer: "Yes, we purchase all types of agricultural land including row crop farms, pasture land, timberland, and recreational properties throughout Arkansas. We understand the unique characteristics of agricultural land and can provide fair valuations based on soil quality, water rights, and income potential."
    },
    {
      question: "What about mineral rights on Arkansas properties?",
      answer: "Arkansas has significant natural gas and oil resources. We can purchase land with or without mineral rights. If mineral rights are included, we factor their value into our cash offer. If they've been previously severed, we can still purchase the surface rights."
    },
    {
      question: "How do you handle flood-prone areas in Arkansas?",
      answer: "Arkansas has extensive floodplains along the Arkansas, White, and Mississippi Rivers. We have experience purchasing land in flood zones and understand FEMA regulations. We factor flood risk into our valuations and can close on properties regardless of flood zone designation."
    },
    {
      question: "Do you charge any fees or commissions?",
      answer: "No, we don't charge any fees, commissions, or closing costs. The cash offer we provide is the exact amount you'll receive at closing. This can save you thousands compared to traditional real estate transactions."
    },
    {
      question: "What types of land do you buy in Arkansas?",
      answer: "We purchase all types of land including residential lots, commercial parcels, industrial sites, agricultural land, timberland, and raw acreage. Size, location, and condition don't matter - we buy land in any situation throughout Arkansas."
    },
    {
      question: "How do you determine your cash offer amount?",
      answer: "Our offers are based on current market conditions, comparable sales, property characteristics, and development potential. We use professional appraisal methods to ensure fair market valuations for all Arkansas properties."
    },
    {
      question: "Can you help with timber land that has active logging operations?",
      answer: "Absolutely. Arkansas has extensive timber resources and we regularly purchase forest land with active or potential logging operations. We understand timber valuations, harvest cycles, and can work around existing timber contracts or leases."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="sell-land-fast-arkansas" />
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
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-900 to-teal-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-green-600 text-white border-green-500 px-4 py-2 text-sm font-bold mb-6 inline-flex items-center gap-2 shadow-lg">
              <DollarSign className="w-4 h-4" />
              Cash Land Buyers
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white" style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)' }}>
              Sell Land Fast in <br />
              <span className="text-green-300">Arkansas</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-semibold mb-8 leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Get cash for your Arkansas land with our streamlined process. No fees, no commissions, and we can close in as little as 7 days with our own cash.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white">
                Get My Cash Offer Now
              </Button>
              <Button variant="outline" className="bg-white text-black hover:bg-gray-100 border-2 border-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl">
                <Phone className="w-5 h-5 mr-2" />
                Call 949-767-8885
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keyBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-black/70 backdrop-blur-md rounded-xl p-4 border-2 border-white/50 shadow-2xl">
                    <Icon className="w-8 h-8 text-green-300 mb-2" />
                    <div className="text-2xl font-extrabold text-white" style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)' }}>{benefit.label}</div>
                    <div className="text-sm font-bold text-white">{benefit.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell Land Fast in Arkansas */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Sell Land Fast in Arkansas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cash land buyers provide immediate liquidity for property owners who need quick transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-green-600" />
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Cash land buyers provide immediate liquidity for property owners who need quick transactions.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">$2.5M+</div>
              <div className="text-gray-600">Land Purchased</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">Arkansas</div>
              <div className="text-gray-600">Cash Land Buyers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale */}
      <section className="py-16 lg:py-24 bg-white">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories from Arkansas Land Sellers
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

      {/* Arkansas Regional Market Analysis */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Regional Market Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Arkansas's diverse land markets for fast cash sales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {marketAnalysis.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arkansas Land Market Regions */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Land Market Regions
            </h2>
            <p className="text-xl text-gray-600">
              We buy land throughout Arkansas's diverse geographic and economic regions
            </p>
          </div>

          <div className="space-y-12">
            {regionalMarkets.map((region, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{region.title}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {region.areas.map((area, areaIndex) => (
                    <Card key={areaIndex} className="border-2 border-gray-200 hover:border-green-500 transition-colors rounded-xl">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                          {area.num}
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

      {/* Types of Land We Purchase */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Types of Arkansas Land We Purchase
            </h2>
            <p className="text-xl text-gray-600">
              We buy all types of land in any condition throughout Arkansas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-green-600" />
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

      {/* Zoning and Development Overview */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Zoning and Development Overview
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Arkansas's zoning classifications helps determine land value and development potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {zoningCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.zones.map((zone, zoneIndex) => (
                      <div key={zoneIndex} className="border-l-4 border-green-600 pl-4">
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

      {/* Development Timeline */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-900 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Arkansas Land Development Timeline
            </h2>
            <p className="text-xl text-gray-300">
              Understanding development timelines helps determine optimal selling strategies for Arkansas properties
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {developmentTimeline.map((phase, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{phase.phase}</h3>
                  <Badge className="bg-green-500/20 text-green-200 border-green-400 mb-4">
                    {phase.duration}
                  </Badge>
                  <p className="text-sm text-gray-300">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Utilities and Infrastructure
            </h2>
            <p className="text-xl text-gray-600">
              Essential infrastructure considerations for Arkansas land development and valuation
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Utility Providers</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {utilities.map((utility, index) => {
                const Icon = utility.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg rounded-xl">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{utility.category}</h4>
                        <p className="text-sm text-gray-600">{utility.providers}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Transportation Infrastructure</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {transportation.map((transport, index) => {
                const Icon = transport.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg rounded-xl">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{transport.name}</h4>
                        <p className="text-sm text-gray-600">{transport.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Environmental and Climate Factors */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Environmental and Climate Factors
            </h2>
            <p className="text-xl text-gray-600">
              Climate and environmental considerations affecting land values and development
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
                        <span className="text-green-600 mt-1">•</span>
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
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Land Financing Options
            </h2>
            <p className="text-xl text-gray-600">
              Understanding financing alternatives helps determine optimal cash sale timing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-6">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="border-l-4 border-green-600 pl-4">
                        <h4 className="font-bold text-gray-900 mb-1">{option.name}</h4>
                        <Badge className="bg-green-100 text-green-800 mb-2">{option.rate}</Badge>
                        <p className="text-gray-600 text-sm">{option.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Holding Costs and Income Potential */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arkansas Land Holding Costs and Income Potential
            </h2>
            <p className="text-xl text-gray-600">
              Annual costs and revenue opportunities for Arkansas land ownership
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Income Opportunities</h3>
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

      {/* Simple 3-Step Process */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Selling land fast in Arkansas has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <div className="text-sm font-semibold text-green-600">{step.time}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Reasons to Sell */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Common Reasons to Sell Land Fast in Arkansas
            </h2>
            <p className="text-xl text-gray-600">
              Property owners choose fast cash sales for various personal and financial reasons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasonsToSell.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cash Sales vs Traditional */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Cash Sales vs. Traditional Real Estate
            </h2>
            <p className="text-xl text-gray-600">
              Compare the advantages of selling land fast for cash versus traditional methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-green-500 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Cash Sale Benefits</h3>
                </div>
                <ul className="space-y-4">
                  {cashVsTraditional.cash.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-300 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Traditional Sale Challenges</h3>
                </div>
                <ul className="space-y-4">
                  {cashVsTraditional.traditional.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 flex-shrink-0 mt-1">✗</span>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
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
              Common questions about selling land fast in Arkansas
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
                    <ChevronUp className="w-6 h-6 text-green-600 flex-shrink-0" />
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Ready to Sell Your Arkansas Land Fast?
          </h2>
          <p className="text-xl mb-8 text-white font-semibold max-w-2xl mx-auto" style={{ textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)' }}>
            Get your no-obligation cash offer today and close on your timeline
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-black hover:bg-gray-900 text-white px-10 py-6 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white">
              Get My Cash Offer Now
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-black/70 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-xl">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-green-300" />
                <h3 className="font-extrabold mb-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>Call for Immediate Offer</h3>
                <p className="text-white font-bold text-lg" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)' }}>949-767-8885</p>
              </CardContent>
            </Card>

            <Card className="bg-black/70 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-xl">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-green-300" />
                <h3 className="font-extrabold mb-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>Email Us</h3>
                <p className="text-white font-bold text-lg" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)' }}>info@acreagesales.com</p>
              </CardContent>
            </Card>

            <Card className="bg-black/70 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-xl">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-green-300" />
                <h3 className="font-extrabold mb-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>About Acreage Sale</h3>
                <p className="text-sm text-white font-semibold">
                  Specialized Arkansas land buyers
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
