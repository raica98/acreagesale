import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, TrendingUp, Clock, DollarSign, Check, Phone, Mail, ChevronDown, ChevronUp, Star, Shield, FileText, Chrome as Home, Building, Mountain, Trees, Sun, Zap, Radio, Droplet, Car, Plane, Brain as Train } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

export function SellLandFastCalifornia() {
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
      quote: "Needed to sell my inherited land in California quickly. Got a fair cash offer in 24 hours and closed in 9 days. The process was incredibly smooth!",
      author: "Sarah Thompson",
      role: "Land Owner"
    },
    {
      quote: "After trying to sell through a realtor for 6 months, I contacted them. Sold in 2 weeks for more than I expected. Highly recommend!",
      author: "Michael Rodriguez",
      role: "Property Investor"
    }
  ];

  const marketAnalysis = [
    {
      icon: TrendingUp,
      title: "Coastal Markets",
      description: "California's coastal areas from San Diego to San Francisco represent premium land values with strong demand from both domestic and international buyers."
    },
    {
      icon: Mountain,
      title: "Central Valley Agriculture",
      description: "The world's most productive agricultural region creates unique land values based on water rights, soil quality, and crop production potential."
    },
    {
      icon: MapPin,
      title: "Tech Corridor Growth",
      description: "Silicon Valley and technology sector expansion throughout California drives strong commercial and residential development demand."
    }
  ];

  const regionalMarkets = [
    {
      title: "Southern California",
      areas: [
        { num: "1", name: "Los Angeles County", description: "Urban development and entertainment industry center" },
        { num: "2", name: "Orange County", description: "Premium coastal and suburban residential markets" },
        { num: "3", name: "San Diego County", description: "Military, biotech, and cross-border commerce" },
        { num: "4", name: "Inland Empire", description: "Distribution, logistics, and affordable housing expansion" }
      ]
    },
    {
      title: "Northern & Central California",
      areas: [
        { num: "1", name: "San Francisco Bay Area", description: "Technology sector and high-value urban development" },
        { num: "2", name: "Central Valley", description: "Agricultural land and emerging residential markets" },
        { num: "3", name: "Wine Country", description: "Premium vineyard properties in Napa and Sonoma" },
        { num: "4", name: "Mountain/Desert", description: "Recreational and renewable energy development" }
      ]
    }
  ];

  const landTypes = [
    { icon: Home, title: "Residential Land", description: "Single-family lots, subdivisions, and residential development parcels" },
    { icon: Building, title: "Commercial Land", description: "Retail sites, office developments, and mixed-use properties" },
    { icon: Mountain, title: "Agricultural Land", description: "Farmland, orchards, vineyards, and ranch properties" },
    { icon: Trees, title: "Recreational Land", description: "Mountain properties, desert land, and timberland" }
  ];

  const zoningCategories = [
    {
      category: "Municipal Zoning Classifications",
      zones: [
        { name: "Residential Zones", description: "R-1 (Single-family) through R-4 (High-density), PD (Planned Development), MH (Manufactured Housing)" },
        { name: "Commercial Zones", description: "C-1 (Neighborhood), C-2 (Community), C-3 (Regional), C-O (Commercial Office)" },
        { name: "Industrial Zones", description: "M-1 (Light Manufacturing), M-2 (Heavy Industrial), BP (Business Park)" },
        { name: "Agricultural Zones", description: "A-1 (General Agriculture), A-2 (Limited Agriculture), AE (Agricultural Exclusive)" }
      ]
    },
    {
      category: "State and Regional Classifications",
      zones: [
        { name: "Coastal Zone", description: "California Coastal Commission jurisdiction requiring special permits and approvals" },
        { name: "Williamson Act", description: "Agricultural Preserve contracts providing property tax benefits for farmland" },
        { name: "TPZ (Timberland)", description: "Timberland Production Zone with long-term forestry commitment" },
        { name: "CEQA Sensitive", description: "Environmental Quality Act review required for development projects" }
      ]
    }
  ];

  const developmentTimeline = [
    {
      phase: "Phase 1: Pre-Development",
      duration: "3-8 months",
      description: "Market analysis, CEQA review, feasibility studies, and environmental assessments"
    },
    {
      phase: "Phase 2: Entitlements",
      duration: "12-24 months",
      description: "Zoning approvals, Coastal Commission (if applicable), EIR preparation, and permits"
    },
    {
      phase: "Phase 3: Infrastructure",
      duration: "12-36 months",
      description: "Utilities installation, roads, water systems, and environmental mitigation"
    },
    {
      phase: "Phase 4: Construction",
      duration: "12-48 months",
      description: "Vertical construction, landscaping, and final approvals"
    }
  ];

  const utilities = [
    { icon: Zap, category: "Electricity", providers: "PG&E (Northern), SCE (Southern), SDG&E (San Diego), Municipal utilities" },
    { icon: Droplet, category: "Water/Sewer", providers: "Metropolitan Water District, local agencies, private water companies" },
    { icon: Radio, category: "Communications", providers: "AT&T, Comcast, Verizon, Frontier fiber and wireless services" },
    { icon: Sun, category: "Natural Gas", providers: "PG&E, SoCalGas, local municipal gas providers" }
  ];

  const transportation = [
    { icon: Car, name: "Highway System", description: "I-5 (North-South), I-10/I-8 (East-West), I-80, I-15, extensive state routes" },
    { icon: Plane, name: "Major Airports", description: "LAX, SFO, San Diego, Sacramento, Ontario, San Jose, Oakland" },
    { icon: Train, name: "Rail Systems", description: "Amtrak, BNSF, Union Pacific, Bay Area BART, LA Metro" },
    { icon: MapPin, name: "Ports", description: "Port of Los Angeles, Long Beach, Oakland, San Diego - nation's busiest" }
  ];

  const environmentalFactors = [
    {
      icon: "🌊",
      title: "Climate Zones",
      zones: [
        "Coastal Mediterranean: Mild year-round, 15-25\" rainfall, ideal growing conditions",
        "Central Valley: Hot summers, mild winters, 10-20\" rainfall, extensive irrigation",
        "Mountain Regions: Four seasons, 30-80\" precipitation, snow at higher elevations",
        "Desert Areas: Hot, dry climate, under 10\" rainfall, extreme temperatures"
      ]
    },
    {
      icon: "🏔️",
      title: "Geographic Features",
      zones: [
        "Pacific Coast: 840 miles of coastline with beaches, cliffs, and harbors",
        "Sierra Nevada: Major mountain range with peaks over 14,000 feet",
        "Central Valley: Flat agricultural plain 450 miles long, 50 miles wide",
        "Mojave/Colorado Deserts: Arid lands with solar and renewable energy potential"
      ]
    },
    {
      icon: "💧",
      title: "Water Resources",
      zones: [
        "Colorado River: Major water source for Southern California via aqueduct",
        "State Water Project: Supplies Northern and Central California",
        "Sacramento-San Joaquin Delta: Critical estuary and water distribution hub",
        "Groundwater Basins: SGMA regulations affecting agricultural water rights"
      ]
    }
  ];

  const financingOptions = [
    {
      category: "Traditional Financing",
      options: [
        { name: "California Land Loans", rate: "8.0% - 13.0% APR", details: "Down Payment: 25-50% • Terms: 5-20 years • LTV: 50-75%" },
        { name: "Construction Loans", rate: "7.0% - 11.0% APR", details: "Down Payment: 20-35% • Terms: 12-24 months • Convert to permanent" },
        { name: "USDA Rural Loans", rate: "6.5% - 9.0% APR", details: "Down Payment: 0-10% • Terms: 30 years • Rural areas only" }
      ]
    },
    {
      category: "Alternative Financing",
      options: [
        { name: "Owner Financing", rate: "6% - 10% APR", details: "Down Payment: 10-30% • Terms: 5-15 years • Negotiable terms" },
        { name: "Hard Money Loans", rate: "11% - 16% APR", details: "Down Payment: 20-40% • Terms: 6-36 months • Fast approval" },
        { name: "Private Investors", rate: "Equity: 20% - 60%", details: "Down Payment: Variable • Terms: 3-10 years • Partnership structure" }
      ]
    }
  ];

  const holdingCosts = {
    costs: [
      { item: "Property Taxes", range: "$1,200 - $4,500/acre" },
      { item: "Insurance", range: "$200 - $800/acre" },
      { item: "Maintenance", range: "$300 - $1,200/acre" },
      { item: "Legal/Professional", range: "$200 - $800/acre" },
      { item: "Total Annual Costs", range: "$1,900 - $7,300/acre", highlight: true }
    ],
    income: [
      { item: "Agricultural Leases", range: "$200 - $1,500/acre" },
      { item: "Solar Farm Leases", range: "$500 - $1,500/acre" },
      { item: "Cell Tower Leases", range: "$1,500 - $4,000/acre" },
      { item: "Film Location", range: "$1,000 - $5,000/day" },
      { item: "Potential Annual Income", range: "$3,200 - $12,000/acre", highlight: true }
    ]
  };

  const processSteps = [
    { step: "1", title: "Submit Property Info", description: "Provide basic details about your California property including location, size, and any relevant information. This takes just 2-3 minutes.", time: "⏱️ Takes 2-3 minutes" },
    { step: "2", title: "Receive Cash Offer", description: "Our team evaluates your property and provides a no-obligation cash offer within 24 hours based on current California market conditions.", time: "💰 Cash offer in 24 hours" },
    { step: "3", title: "Close & Get Paid", description: "Accept our offer and we'll handle all closing details including CEQA compliance. Get your cash in as little as 7-14 days.", time: "🚀 Close in 7-14 days" }
  ];

  const reasonsToSell = [
    { icon: DollarSign, title: "Financial Needs", description: "Medical expenses, business opportunities, or other urgent financial requirements" },
    { icon: FileText, title: "Estate Settlement", description: "Inherited property requiring liquidation for taxes or beneficiary distribution" },
    { icon: MapPin, title: "Relocation", description: "Job changes or lifestyle moves requiring quick property liquidation" },
    { icon: TrendingUp, title: "Market Timing", description: "Taking advantage of current market conditions or avoiding potential downturns" },
    { icon: Shield, title: "Tax Issues", description: "Property tax delinquency or Proposition 13 reassessment concerns" },
    { icon: Star, title: "Development Exit", description: "Investors exiting land positions or rebalancing portfolios" }
  ];

  const cashVsTraditional = {
    cash: [
      "Close in 7-14 days guaranteed",
      "No real estate commissions (save 5-6%)",
      "No CEQA review delays",
      "Certainty of closing",
      "We handle all paperwork",
      "Buy in any condition"
    ],
    traditional: [
      "6-18 months average time on market",
      "5-6% real estate commissions",
      "CEQA and environmental reviews",
      "Complex Coastal Commission approvals",
      "Buyer financing contingencies",
      "May require property improvements"
    ]
  };

  const faqs = [
    {
      question: "How quickly can you close on my California property?",
      answer: "We can typically close within 7-14 days of accepting our offer. For urgent situations, we may be able to close even faster. Our cash buying process eliminates financing delays and allows for rapid closings throughout California."
    },
    {
      question: "Do you buy land in rural California counties?",
      answer: "Yes, we purchase land throughout all 58 California counties, including rural areas, mountain properties, desert land, and coastal properties. We understand the unique characteristics of each California region and can evaluate properties anywhere in the state."
    },
    {
      question: "How do you handle California environmental regulations?",
      answer: "California has strict environmental laws including CEQA, coastal commission requirements, and endangered species protections. Our team has extensive experience navigating these regulations and can purchase properties with environmental challenges or restrictions."
    },
    {
      question: "What about properties with fire risk in California?",
      answer: "We buy land in high fire risk areas throughout California. Our offers account for wildfire history, CAL FIRE designations, and insurance requirements. We understand California's unique wildfire challenges and have experience with properties in fire-prone zones."
    },
    {
      question: "Do you charge any fees or commissions for California land sales?",
      answer: "No, we don't charge any fees, commissions, or closing costs. The cash offer we provide is the exact amount you'll receive at closing. In California's expensive real estate market, this can save you tens of thousands of dollars."
    },
    {
      question: "How do you value coastal properties subject to Coastal Commission review?",
      answer: "We understand California Coastal Commission regulations and their impact on development potential. Our valuations account for coastal zone restrictions, public access requirements, and environmental constraints while offering fair market prices."
    },
    {
      question: "What about properties with water rights issues?",
      answer: "California's complex water laws affect land values significantly. We have experience with riparian rights, appropriative rights, groundwater rights, and SGMA compliance. We can evaluate and purchase land regardless of water rights status."
    },
    {
      question: "How does Proposition 13 affect my land sale?",
      answer: "Proposition 13 limits property tax increases for current owners but properties are reassessed at market value upon sale. We understand California's property tax system and can help you time your sale to minimize tax implications."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="sell-land-fast-in-california" />
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <AcreageSaleLogo className="w-32 lg:w-40" />
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-black hover:text-black transition-colors">
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

      <section className="relative bg-gradient-to-br from-orange-900 via-blue-900 to-orange-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/417192/pexels-photo-417192.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="bg-orange-500/20 text-orange-200 border-orange-400 px-4 py-2 text-sm font-semibold mb-6 inline-flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Cash Land Buyers
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Sell Land Fast in <br />
              <span className="text-orange-300">California</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Get cash for your California land with our streamlined process. No fees, no commissions, and we can close in as little as 7 days with our own cash.
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

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Why Sell Land Fast in California?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Cash land buyers provide immediate liquidity for property owners who need quick transactions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <p className="text-black leading-relaxed">
                  Avoid lengthy marketing periods, uncertain buyer financing, and complex CEQA review processes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-black leading-relaxed">
                  Get fair market value without paying real estate commissions or closing costs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-black leading-relaxed">
                  California's strong real estate market ensures competitive cash offers for your property.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">$2.5M+</div>
              <div className="text-black">Land Purchased</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-black">Happy Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">California</div>
              <div className="text-black">Cash Land Buyers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Why Choose Acreage Sale to Sell Land Fast?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Skip traditional real estate hassles and get cash for your California land quickly
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
                <p className="text-black font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Success Stories from California Land Sellers
            </h2>
            <p className="text-xl text-black">Real results from real property owners</p>
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
                  <p className="text-black italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-black">{testimonial.author}</div>
                    <div className="text-sm text-black">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Regional Market Analysis
            </h2>
            <p className="text-xl text-black">
              Understanding California's diverse land markets for fast cash sales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {marketAnalysis.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-4">{item.title}</h3>
                    <p className="text-black leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Land Market Regions
            </h2>
            <p className="text-xl text-black">
              We buy land throughout California's diverse geographic and economic regions
            </p>
          </div>

          <div className="space-y-12">
            {regionalMarkets.map((region, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-black mb-6">{region.title}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {region.areas.map((area, areaIndex) => (
                    <Card key={areaIndex} className="border-2 border-gray-200 hover:border-blue-500 transition-colors rounded-xl">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                          {area.num}
                        </div>
                        <h4 className="text-lg font-bold text-black mb-2">{area.name}</h4>
                        <p className="text-black text-sm">{area.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Types of California Land We Purchase
            </h2>
            <p className="text-xl text-black">
              We buy all types of land in any condition throughout California
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">{type.title}</h3>
                    <p className="text-black">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Zoning and Development Overview
            </h2>
            <p className="text-xl text-black">
              Understanding California's zoning helps determine land value and development potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {zoningCategories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.zones.map((zone, zoneIndex) => (
                      <div key={zoneIndex} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-bold text-black mb-1">{zone.name}</h4>
                        <p className="text-black text-sm">{zone.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
              California Land Development Timeline
            </h2>
            <p className="text-xl text-black">
              Understanding development timelines helps determine optimal selling strategies for California properties
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {developmentTimeline.map((phase, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-black">{phase.phase}</h3>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-300 mb-4">
                    {phase.duration}
                  </Badge>
                  <p className="text-sm text-black">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Utilities and Infrastructure
            </h2>
            <p className="text-xl text-black">
              Essential infrastructure considerations for California land development
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-black mb-6">Utility Providers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {utilities.map((utility, index) => {
                const Icon = utility.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg rounded-xl">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-2">{utility.category}</h4>
                        <p className="text-sm text-black">{utility.providers}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-black mb-6">Transportation Infrastructure</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {transportation.map((transport, index) => {
                const Icon = transport.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg rounded-xl">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-black mb-2">{transport.name}</h4>
                        <p className="text-sm text-black">{transport.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Environmental and Climate Factors
            </h2>
            <p className="text-xl text-black">
              Mediterranean climate and diverse geography affecting land values
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {environmentalFactors.map((factor, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{factor.icon}</div>
                  <h3 className="text-2xl font-bold text-black mb-6">{factor.title}</h3>
                  <ul className="space-y-3">
                    {factor.zones.map((zone, zoneIndex) => (
                      <li key={zoneIndex} className="text-black flex items-start gap-2">
                        <span className="text-black mt-1">•</span>
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

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Land Financing Options
            </h2>
            <p className="text-xl text-black">
              Understanding financing alternatives helps determine optimal cash sale timing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-black mb-6">{category.category}</h3>
                  <div className="space-y-6">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-bold text-black mb-1">{option.name}</h4>
                        <Badge className="bg-green-100 text-green-800 mb-2">{option.rate}</Badge>
                        <p className="text-black text-sm">{option.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              California Land Holding Costs and Income Potential
            </h2>
            <p className="text-xl text-black">
              Annual costs and revenue opportunities for California land ownership
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-6">Annual Holding Costs</h3>
                <div className="space-y-4">
                  {holdingCosts.costs.map((cost, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${cost.highlight ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50'}`}>
                      <span className={`font-semibold ${cost.highlight ? 'text-red-900' : 'text-black'}`}>
                        {cost.item}
                      </span>
                      <span className={`font-bold ${cost.highlight ? 'text-red-600' : 'text-black'}`}>
                        {cost.range}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-black mb-6">Income Opportunities</h3>
                <div className="space-y-4">
                  {holdingCosts.income.map((income, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${income.highlight ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
                      <span className={`font-semibold ${income.highlight ? 'text-green-900' : 'text-black'}`}>
                        {income.item}
                      </span>
                      <span className={`font-bold ${income.highlight ? 'text-green-600' : 'text-black'}`}>
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

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Our Simple 3-Step Process
            </h2>
            <p className="text-xl text-black">
              Selling land fast in California has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">{step.title}</h3>
                  <p className="text-black mb-4 leading-relaxed">{step.description}</p>
                  <div className="text-sm font-semibold text-black">{step.time}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Common Reasons to Sell Land Fast in California
            </h2>
            <p className="text-xl text-black">
              Property owners choose fast cash sales for various reasons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasonsToSell.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Card key={index} className="border-0 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2">{reason.title}</h3>
                    <p className="text-black text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Cash Sales vs. Traditional Real Estate
            </h2>
            <p className="text-xl text-black">
              Compare the advantages of selling land fast for cash versus traditional methods
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-green-500 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-black">Cash Sale Benefits</h3>
                </div>
                <ul className="space-y-4">
                  {cashVsTraditional.cash.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-black">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-300 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-red-600" />
                  <h3 className="text-2xl font-bold text-black">Traditional Sale Challenges</h3>
                </div>
                <ul className="space-y-4">
                  {cashVsTraditional.traditional.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 flex-shrink-0 mt-1">✗</span>
                      <span className="text-black">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-black">
              Common questions about selling land fast in California
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-black pr-8">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-black flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-black leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white text-black relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">
            Ready to Sell Your California Land Fast?
          </h2>
          <p className="text-xl mb-8 text-black max-w-2xl mx-auto">
            Get your no-obligation cash offer today and close on your timeline
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get My Cash Offer Now
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-gray-50 border-gray-200 rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-black" />
                <h3 className="font-bold mb-2 text-black">Call for Immediate Offer</h3>
                <p className="text-black font-bold text-lg">949-767-8885</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200 rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-black" />
                <h3 className="font-bold mb-2 text-black">Email Us</h3>
                <p className="text-black font-bold text-lg">info@acreagesales.com</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200 rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-black" />
                <h3 className="font-bold mb-2 text-black">About Acreage Sale</h3>
                <p className="text-sm text-black">
                  Specialized California land buyers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-white text-black py-12 relative border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <AcreageSaleLogo className="w-40 mx-auto mb-6" />
            <p className="text-black mb-6">
              We at Acreage Sale are a group of real estate investors specializing in helping property owners sell land fast across the United States. We have years of experience purchasing all types of land, from small residential lots to large commercial parcels. Our mission is to provide property owners with a fast, fair, and hassle-free way to sell their land.
            </p>
            <div className="flex justify-center gap-8 text-sm text-black">
              <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <Link to="/properties" className="hover:text-gray-600 transition-colors">Properties</Link>
              <Link to="/about" className="hover:text-gray-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    );
}
