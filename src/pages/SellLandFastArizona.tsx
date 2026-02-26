import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, TrendingUp, Users, Clock, DollarSign, Check, Phone, Mail, ChevronDown, ChevronUp, Star, Shield, FileText, Chrome as Home, Building, Mountain, Trees, Sun, Zap, Radio, Droplet, Car, Plane, Brain as Train } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

export function SellLandFastArizona() {
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
      quote: "Needed to sell my inherited land in Arizona quickly. Got a fair cash offer in 24 hours and closed in 10 days. Couldn't be happier!",
      author: "Jennifer Martinez",
      role: "Land Owner"
    },
    {
      quote: "The process was incredibly smooth. No hassles, no fees, and they handled everything. Highly recommend for anyone who needs to sell land fast.",
      author: "Robert Chen",
      role: "Property Investor"
    }
  ];

  const marketAnalysis = [
    {
      icon: TrendingUp,
      title: "Phoenix Metro Growth",
      description: "The Phoenix metropolitan area continues rapid expansion, creating strong demand for residential and commercial land development throughout central Arizona."
    },
    {
      icon: Mountain,
      title: "Desert Land Values",
      description: "Arizona's unique desert landscape and water rights create specialized valuation factors that our experienced team understands for accurate cash offers."
    },
    {
      icon: MapPin,
      title: "Strategic Southwest Location",
      description: "Arizona's position in the Southwest corridor makes it attractive for logistics, manufacturing, and cross-border commerce development opportunities."
    }
  ];

  const regionalMarkets = [
    {
      title: "Central Arizona (Phoenix Metro)",
      areas: [
        { num: "1", name: "Phoenix/Scottsdale", description: "High-value urban and suburban development land" },
        { num: "2", name: "Mesa/Chandler/Tempe", description: "Technology corridor and residential expansion areas" },
        { num: "3", name: "Glendale/Peoria", description: "Sports and entertainment district development" },
        { num: "4", name: "Surprise/Buckeye", description: "Emerging master-planned communities and industrial" }
      ]
    },
    {
      title: "Northern & Southern Arizona",
      areas: [
        { num: "1", name: "Tucson Metro", description: "University town with aerospace and defense industries" },
        { num: "2", name: "Flagstaff/Sedona", description: "Mountain communities with tourism and recreation focus" },
        { num: "3", name: "Yuma/Lake Havasu", description: "Agricultural and recreational waterfront properties" },
        { num: "4", name: "Rural/Ranch Land", description: "Large acreage properties for agriculture and ranching" }
      ]
    }
  ];

  const landTypes = [
    { icon: Home, title: "Residential Land", description: "Single-family lots, subdivisions, and residential development parcels" },
    { icon: Building, title: "Commercial Land", description: "Retail sites, office developments, and mixed-use properties" },
    { icon: Mountain, title: "Industrial Land", description: "Manufacturing sites, warehouses, and distribution centers" },
    { icon: Trees, title: "Rural Land", description: "Agricultural land, ranches, and recreational properties" }
  ];

  const zoningCategories = [
    {
      category: "Municipal Zoning Classifications",
      zones: [
        { name: "Residential Zones", description: "R-1-6 through R-5 (Single-family to high-density), PUD (Planned Unit Development), MH (Mobile Home)" },
        { name: "Commercial Zones", description: "C-1 (Neighborhood), C-2 (Intermediate), C-3 (General), C-O (Commercial Office)" },
        { name: "Industrial Zones", description: "I-1 (Light Industrial), I-2 (General Industrial), PCC (Planned Commercial Center)" },
        { name: "Special Zones", description: "A-1 (Agricultural), RE (Rural Estate), OS (Open Space), PCD (Planned Community District)" }
      ]
    },
    {
      category: "County and State Land Classifications",
      zones: [
        { name: "Maricopa County", description: "RU-43 (Rural), SR (Suburban Ranch), CR (Country Residential), GR (General Rural)" },
        { name: "Pima County", description: "RH (Rural Homestead), GR (General Rural), CR-1 through CR-4 (Country Residential)" },
        { name: "State Trust Land", description: "Arizona State Land Department leases and sales for development" },
        { name: "Federal Lands", description: "BLM, Forest Service, and National Park Service adjacent properties" }
      ]
    }
  ];

  const developmentTimeline = [
    {
      phase: "Phase 1: Pre-Development",
      duration: "3-6 months",
      description: "Market analysis, feasibility studies, preliminary design, and site selection"
    },
    {
      phase: "Phase 2: Entitlements",
      duration: "6-18 months",
      description: "Zoning approvals, environmental clearances, water rights, and municipal permits"
    },
    {
      phase: "Phase 3: Infrastructure",
      duration: "8-24 months",
      description: "Utilities installation, roads, water/sewer systems, and site preparation"
    },
    {
      phase: "Phase 4: Construction",
      duration: "6-36 months",
      description: "Vertical construction, landscaping, and final inspections"
    }
  ];

  const utilities = [
    { icon: Zap, category: "Electricity", providers: "Arizona Public Service (APS), Salt River Project (SRP), Tucson Electric Power (TEP)" },
    { icon: Droplet, category: "Water/Sewer", providers: "Phoenix Water Services, Tucson Water, various municipal and private providers" },
    { icon: Radio, category: "Communications", providers: "CenturyLink, Cox Communications, Verizon, AT&T fiber and wireless" },
    { icon: Sun, category: "Natural Gas", providers: "Southwest Gas Corporation, Unisource Energy Services" }
  ];

  const transportation = [
    { icon: Car, name: "Interstate System", description: "I-10 (East-West), I-17 (North-South), I-40 (Northern corridor), Loop 101/202/303" },
    { icon: Plane, name: "Aviation", description: "Sky Harbor International, Tucson International, Flagstaff Pulliam Field" },
    { icon: Train, name: "Rail Transportation", description: "BNSF Railway, Union Pacific, Valley Metro Light Rail" },
    { icon: MapPin, name: "Border Access", description: "Mexico border crossings at Nogales, Douglas, Lukeville, San Luis" }
  ];

  const environmentalFactors = [
    {
      icon: "🌡️",
      title: "Climate Zones",
      zones: [
        "Sonoran Desert: Phoenix/Tucson: Hot summers, mild winters, 7-12\" annual rainfall",
        "High Desert: Flagstaff/Sedona: Four seasons, 15-25\" annual precipitation",
        "Colorado Plateau: Northern Arizona: Cold winters, mild summers, snow possible"
      ]
    },
    {
      icon: "🏔️",
      title: "Topography",
      zones: [
        "Basin and Range: Southern Arizona: Desert valleys, mountain ranges, 1,000-4,000 ft elevation",
        "Colorado Plateau: Northern Arizona: High mesas, canyons, 5,000-8,000 ft elevation",
        "Transition Zone: Central mountains: Mixed terrain, 3,000-7,000 ft elevation"
      ]
    },
    {
      icon: "💎",
      title: "Natural Resources",
      zones: [
        "Water Rights: Colorado River, Central Arizona Project, groundwater management",
        "Solar Potential: 300+ sunny days annually, excellent for solar development",
        "Mineral Resources: Copper, gold, silver mining areas may affect land values"
      ]
    }
  ];

  const financingOptions = [
    {
      category: "Traditional Financing",
      options: [
        { name: "Arizona Land Loans", rate: "8.5% - 13.5% APR", details: "Down Payment: 25-50% • Terms: 5-20 years • LTV: 50-75%" },
        { name: "Construction-to-Permanent", rate: "7.5% - 11.5% APR", details: "Down Payment: 20-30% • Terms: 15-30 years • LTV: 70-80%" },
        { name: "SBA 504 Programs", rate: "6.5% - 9.5% APR", details: "Down Payment: 10-15% • Terms: 10-25 years • LTV: 85-90%" }
      ]
    },
    {
      category: "Alternative Financing",
      options: [
        { name: "Owner Financing", rate: "6% - 11% APR", details: "Down Payment: 10-25% • Terms: 5-15 years • Flexible terms" },
        { name: "Hard Money Loans", rate: "12% - 18% APR", details: "Down Payment: 25-40% • Terms: 6-24 months • Fast approval" },
        { name: "Investment Partnerships", rate: "Equity Sharing: 20% - 50%", details: "Down Payment: Variable • Terms: 3-10 years • Profit sharing" }
      ]
    }
  ];

  const holdingCosts = {
    costs: [
      { item: "Property Taxes", range: "$850 - $2,800/acre" },
      { item: "Insurance", range: "$125 - $450/acre" },
      { item: "Maintenance", range: "$200 - $750/acre" },
      { item: "Legal/Professional", range: "$150 - $600/acre" },
      { item: "Total Annual Costs", range: "$1,325 - $4,600/acre", highlight: true }
    ],
    income: [
      { item: "Agricultural Leases", range: "$125 - $850/acre" },
      { item: "Solar Leases", range: "$400 - $1,200/acre" },
      { item: "Cell Tower Leases", range: "$1,200 - $3,600/acre" },
      { item: "RV/Storage", range: "$600 - $2,400/acre" },
      { item: "Total Annual Income", range: "$2,325 - $8,050/acre", highlight: true }
    ]
  };

  const processSteps = [
    { step: "1", title: "Submit Property Info", description: "Provide basic details about your Arizona property including location, size, and any relevant information. This takes just 2-3 minutes.", time: "⏱️ Takes 2-3 minutes" },
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
      question: "How quickly can you close on my Arizona property?",
      answer: "We can typically close within 7-14 days of accepting our offer. For urgent situations, we may be able to close even faster. Our cash buying process eliminates financing delays and allows for rapid closings."
    },
    {
      question: "Do you buy desert land with water access issues?",
      answer: "Yes, we purchase Arizona desert land regardless of water access or rights issues. Our team has experience with Central Arizona Project allocations, groundwater rights, and private well systems throughout the state."
    },
    {
      question: "How do you handle Arizona State Trust Land leases?",
      answer: "We have experience with Arizona State Land Department leases and can handle the transfer process. Whether your property is fee simple or leased state land, we can structure appropriate transactions."
    },
    {
      question: "What about properties in flood zones or washes?",
      answer: "Arizona's desert washes and FEMA flood zones don't prevent us from purchasing land. We understand local drainage patterns and flood insurance requirements, and factor these into our cash offers."
    },
    {
      question: "Do you charge any fees or commissions?",
      answer: "No, we don't charge any fees, commissions, or closing costs. The cash offer we provide is the exact amount you'll receive at closing. This can save you thousands compared to traditional real estate transactions."
    },
    {
      question: "How do you determine values for remote Arizona properties?",
      answer: "We use specialized valuation methods for remote Arizona land including comparable sales analysis, development potential assessment, natural resource evaluation, and access/utility considerations."
    },
    {
      question: "What if my property has mining claims or mineral rights issues?",
      answer: "Arizona's mining history creates complex mineral rights situations. Our team has experience with active mining claims, mineral reservations, and can often resolve these issues as part of the transaction."
    },
    {
      question: "How does Arizona's property tax system affect land sales?",
      answer: "Arizona has relatively favorable property tax rates compared to other states. We understand the assessment process, agricultural exemptions, and can help structure sales to minimize tax implications for sellers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="sell-land-fast-arizona" />
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
      <section className="relative bg-gradient-to-br from-orange-900 via-red-900 to-orange-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/20 text-orange-200 border-orange-400 px-4 py-2 text-sm font-semibold mb-6 inline-flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Cash Land Buyers
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sell Land Fast in <br />
              <span className="text-orange-300">Arizona</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Get cash for your Arizona land with our streamlined process. No fees, no commissions, and we can close in as little as 7 days with our own cash.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
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
                    <Icon className="w-8 h-8 text-orange-400 mb-2" />
                    <div className="text-2xl font-bold">{benefit.label}</div>
                    <div className="text-sm text-gray-300">{benefit.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Sell Land Fast in Arizona */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Sell Land Fast in Arizona?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cash land buyers provide immediate liquidity for property owners who need quick transactions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-orange-600" />
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
              <div className="text-4xl font-bold text-orange-600 mb-2">$2.5M+</div>
              <div className="text-gray-600">Land Purchased</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">Arizona</div>
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories from Arizona Land Sellers
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

      {/* Arizona Regional Market Analysis */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arizona Regional Market Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Arizona's diverse land markets for fast cash sales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {marketAnalysis.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-orange-600" />
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

      {/* Arizona Land Market Regions */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arizona Land Market Regions
            </h2>
            <p className="text-xl text-gray-600">
              We buy land throughout Arizona's diverse geographic and economic regions
            </p>
          </div>

          <div className="space-y-12">
            {regionalMarkets.map((region, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{region.title}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {region.areas.map((area, areaIndex) => (
                    <Card key={areaIndex} className="border-2 border-gray-200 hover:border-orange-500 transition-colors rounded-xl">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Types of Arizona Land We Purchase
            </h2>
            <p className="text-xl text-gray-600">
              We buy all types of land in any condition throughout Arizona and surrounding areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-orange-600" />
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
              Arizona Zoning and Development Overview
            </h2>
            <p className="text-xl text-gray-600">
              Understanding Arizona's zoning classifications helps determine land value and development potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {zoningCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.zones.map((zone, zoneIndex) => (
                      <div key={zoneIndex} className="border-l-4 border-orange-600 pl-4">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-900 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Arizona Land Development Timeline
            </h2>
            <p className="text-xl text-gray-300">
              Understanding development timelines helps determine optimal selling strategies for Arizona properties
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {developmentTimeline.map((phase, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{phase.phase}</h3>
                  <Badge className="bg-orange-500/20 text-orange-200 border-orange-400 mb-4">
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arizona Utilities and Infrastructure
            </h2>
            <p className="text-xl text-gray-600">
              Essential infrastructure considerations for Arizona land development and valuation
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Utility Providers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {utilities.map((utility, index) => {
                const Icon = utility.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg rounded-xl">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-600" />
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
            <div className="grid md:grid-cols-2 gap-6">
              {transportation.map((transport, index) => {
                const Icon = transport.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg rounded-xl">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-600" />
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
              Arizona Environmental and Climate Factors
            </h2>
            <p className="text-xl text-gray-600">
              Desert climate and environmental considerations affecting land values and development
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
                        <span className="text-orange-600 mt-1">•</span>
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
              Arizona Land Financing Options
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
                      <div key={optionIndex} className="border-l-4 border-orange-600 pl-4">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Arizona Land Holding Costs and Income Potential
            </h2>
            <p className="text-xl text-gray-600">
              Annual costs and revenue opportunities for Arizona land ownership
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
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Selling land fast in Arizona has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                  <div className="text-sm font-semibold text-orange-600">{step.time}</div>
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
              Common Reasons to Sell Land Fast in Arizona
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
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-600" />
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
      <section className="py-16 lg:py-24 bg-gray-50">
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
              Common questions about selling land fast in Arizona
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
                    <ChevronUp className="w-6 h-6 text-orange-600 flex-shrink-0" />
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-900 via-red-900 to-orange-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Sell Your Arizona Land Fast?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Get your no-obligation cash offer today and close on your timeline
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get My Cash Offer Now
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                <h3 className="font-bold mb-2">Call for Immediate Offer</h3>
                <p className="text-orange-300 font-bold text-lg">949-767-8885</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-orange-300 font-bold text-lg">info@acreagesales.com</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                <h3 className="font-bold mb-2">About Acreage Sale</h3>
                <p className="text-sm text-gray-300">
                  Specialized Arizona land buyers
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
