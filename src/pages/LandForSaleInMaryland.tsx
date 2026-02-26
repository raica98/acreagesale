import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, User, MapPin, Send, Star, Award, TrendingUp, Users, DollarSign, Building, TreePine, Briefcase, GraduationCap, Heart, ShoppingBag, Utensils, Car, Plane, Chrome as Home, CreditCard, Banknote, FileText, Target, Eye, Handshake, CircleCheck as CheckCircle, Clock, Shield, Zap, Globe, ChartBar as BarChart3, Calculator, Ruler, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { SEO } from '../components/SEO';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInMaryland() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Building, label: "Active Listings", value: "2,500+", color: "text-blue-600" },
    { icon: DollarSign, label: "Avg. Price/Acre", value: "$15,000", color: "text-green-600" },
    { icon: Ruler, label: "Total Acres", value: "50,000+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Price Growth", value: "+12%", color: "text-orange-600" }
  ];

  const additionalStats = [
    { label: "Metro Population", value: "6.2M", color: "text-emerald-600" },
    { label: "Annual GDP", value: "$425B", color: "text-blue-600" }
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
      role: "Land Investor",
      content: "Found the perfect 10-acre plot in Maryland through Acreage Sale. The process was seamless and saved me thousands in fees.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Developer", 
      content: "The market data and aerial imagery helped me make an informed decision. Closed on 25 acres in just 45 days.",
      rating: 5
    }
  ];

  const featuredProperties = [
    {
      title: "25-Acre Development Site",
      location: "North Maryland",
      price: 2500000,
      acres: 25.0,
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot", 
      location: "Downtown Maryland",
      price: 1200000,
      acres: 2.5,
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Maryland Suburbs", 
      price: 850000,
      acres: 5.2,
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const regionalMarkets = [
    {
      title: "Central Maryland",
      description: "Baltimore-Washington corridor offers premium development opportunities with excellent transportation access and proximity to major employment centers.",
      priceRange: "$25,000-$75,000/acre"
    },
    {
      title: "Eastern Shore", 
      description: "Agricultural and waterfront properties with recreational development potential. Strong demand for rural estates and agritourism ventures.",
      priceRange: "$8,000-$35,000/acre"
    },
    {
      title: "Western Maryland",
      description: "Mountain and rural properties ideal for recreational development, hunting preserves, and conservation easements with scenic value.",
      priceRange: "$5,000-$20,000/acre"
    },
    {
      title: "Southern Maryland",
      description: "Tobacco country transitioning to residential and mixed-use development. Growing commuter market to Washington DC metro area.", 
      priceRange: "$12,000-$45,000/acre"
    }
  ];

  const zoningTypes = [
    {
      category: "Agricultural Zoning",
      types: [
        { name: "Agricultural Use", description: "Farming, livestock, crop production" },
        { name: "Rural Residential", description: "Single-family homes on large lots" },
        { name: "Agritourism", description: "Farm tours, events, direct sales" }
      ]
    },
    {
      category: "Residential Zoning", 
      types: [
        { name: "Single-Family", description: "Detached homes, various densities" },
        { name: "Townhomes", description: "Attached residential development" },
        { name: "Mixed-Use", description: "Residential with limited commercial" }
      ]
    },
    {
      category: "Commercial/Industrial",
      types: [
        { name: "Commercial", description: "Retail, office, service businesses" },
        { name: "Light Industrial", description: "Manufacturing, warehousing" },
        { name: "Maritime Industrial", description: "Port-related activities" }
      ]
    }
  ];

  const developmentTimeline = [
    { phase: "1", title: "Pre-Application", description: "Site analysis, feasibility studies, preliminary design concepts", duration: "2-4 months" },
    { phase: "2", title: "Application Submission", description: "Submit plans to county planning department, environmental review", duration: "1-2 months" },
    { phase: "3", title: "Review Process", description: "County review, public hearings, conditional approvals", duration: "6-12 months" },
    { phase: "4", title: "Final Approval", description: "Building permits, infrastructure bonds, construction start", duration: "2-4 months" }
  ];

  const utilities = [
    {
      category: "Electricity",
      providers: ["BGE (Baltimore Gas & Electric)", "Potomac Electric Power", "Municipal utilities"]
    },
    {
      category: "Water & Sewer", 
      providers: ["County water systems", "Municipal water/sewer", "Well and septic options"]
    },
    {
      category: "Telecommunications",
      providers: ["Verizon FiOS fiber", "Comcast Xfinity", "5G cellular coverage"]
    }
  ];

  const highways = [
    { number: "95", name: "I-95", description: "Primary north-south corridor connecting to NYC and Florida" },
    { number: "495", name: "I-495", description: "Capital Beltway providing DC metro access" },
    { number: "70", name: "I-70", description: "East-west connection to Pennsylvania and West Virginia" },
    { number: "83", name: "I-83", description: "Baltimore to Pennsylvania corridor" }
  ];

  const financingOptions = [
    {
      category: "Traditional Financing",
      options: [
        { name: "Land Loans", description: "Specialized financing for vacant land purchases", rate: "6.5% - 9.5%" },
        { name: "Construction Loans", description: "Combined land purchase and development financing", rate: "7.0% - 10.0%" },
        { name: "SBA Loans", description: "Small business administration programs", rate: "5.5% - 8.5%" }
      ]
    },
    {
      category: "Alternative Financing",
      options: [
        { name: "Owner Financing", description: "Direct financing from property sellers", rate: "Negotiable" },
        { name: "Hard Money", description: "Short-term bridge financing", rate: "10% - 15%" },
        { name: "Investment Partnerships", description: "Joint ventures and syndications", rate: "8% - 20%" }
      ]
    }
  ];

  const holdingCosts = [
    { item: "Property Taxes", cost: "$800-$2,500/acre" },
    { item: "Insurance", cost: "$200-$500/acre" },
    { item: "Maintenance", cost: "$100-$300/acre" },
    { item: "Total Annual", cost: "$1,100-$3,300/acre" }
  ];

  const incomeStreams = [
    { source: "Agricultural Lease", income: "$150-$400/acre" },
    { source: "Hunting Leases", income: "$10-$25/acre" },
    { source: "Timber Revenue", income: "$500-$2,000/acre" },
    { source: "Annual Appreciation", income: "3% - 8%" }
  ];

  const faqs = [
    {
      question: "What are the property tax rates for land in Maryland?",
      answer: "Maryland property tax rates vary by county, typically ranging from 0.8% to 1.4% of assessed value. Agricultural land may qualify for preferential assessment, significantly reducing tax burden. Contact the local assessor's office for current rates and exemption programs."
    },
    {
      question: "How long does the development approval process take in Maryland?",
      answer: "Development timelines in Maryland typically range from 12-24 months depending on project complexity. Simple residential subdivisions may take 12-18 months, while complex commercial or mixed-use projects can require 18-36 months. Early coordination with county planning staff can help streamline the process."
    },
    {
      question: "What utilities are available for land development in Maryland?",
      answer: "Most developed areas have access to public water, sewer, electricity, and natural gas. Rural areas may require well and septic systems. High-speed internet is widely available through fiber and cable providers. Contact utility companies early in the planning process to confirm capacity and connection costs."
    },
    {
      question: "Are there building restrictions for land in Maryland?",
      answer: "Building restrictions vary by zoning district and may include setback requirements, height limits, density restrictions, and architectural standards. Environmental constraints such as wetlands, steep slopes, or historic districts may also apply. Review county zoning ordinances and obtain a site evaluation before purchase."
    },
    {
      question: "What is the investment potential for land in Maryland?",
      answer: "Maryland land has shown consistent appreciation, particularly in the Baltimore-Washington corridor. Factors supporting continued growth include population increases, job growth, and limited developable land supply. Properties near transportation corridors and employment centers typically show the strongest performance."
    },
    {
      question: "How do Chesapeake Bay regulations affect land development in Maryland?",
      answer: "Properties within the Chesapeake Bay Critical Area (within 1,000 feet of tidal waters) have additional development restrictions including buffer requirements, impervious surface limits, and enhanced stormwater management. These regulations can affect development potential but also provide environmental benefits that may enhance long-term value."
    },
    {
      question: "What financing options are available for Maryland land purchases?",
      answer: "Financing options include conventional land loans, construction-to-permanent loans, SBA programs for commercial development, and owner financing. Maryland's proximity to major financial centers provides access to diverse lending sources. Consider working with lenders familiar with local market conditions and regulations."
    },
    {
      question: "Can I generate income from agricultural land in Maryland?",
      answer: "Maryland's agricultural land can generate income through crop leases ($150-$400/acre annually), livestock grazing, timber harvesting, and agritourism activities. The state's proximity to major metropolitan markets provides excellent opportunities for direct-to-consumer sales and value-added agricultural enterprises."
    }
  ];

  const generalFaqs = [
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

  const cheapLandTips = [
    {
      title: "Check out foreclosure listings in your area",
      content: "Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Maryland. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby."
    },
    {
      title: "Take advantage of the seller's desperation",
      content: "While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a \"make an offer\" strategy, consider buying cheap land for sale near me."
    },
    {
      title: "Look for land development opportunities",
      content: "The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past."
    },
    {
      title: "Finding Cheap Land for Sale Doesn't Mean Strictly Buying",
      content: "You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future."
    },
    {
      title: "Take the time to find the right property for you",
      content: "Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="land-for-sale-in-maryland" />
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
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                  View All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-[#329cf9] text-white px-8 py-3 text-lg font-bold mb-8 shadow-xl">
            🏆 Premium Market
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Land for Sale in <span className="text-[#329cf9]">Maryland</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Maryland offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=Maryland">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse Maryland Properties
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
              Get Market Analysis
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Maryland Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Maryland is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              
              <div className="space-y-6 mb-12">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Population growth and diversified employment continue to drive demand for land across Maryland.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Corporate expansion and infrastructure investment support long-term appreciation and development viability.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {additionalStats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Maryland vacant land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Maryland</h3>
                <p className="text-white/90">Prime Growth Market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Acreage Sale Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Maryland Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from <span className="text-[#329cf9]">Maryland Investors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
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
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Maryland Land Guide Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Maryland Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Maryland
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            {success ? (
              <Card className="text-center p-12 border-0 shadow-2xl">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-xl text-gray-600">
                    We've received your information and will contact you within 24 hours.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Want to Buy Land in <span className="text-[#329cf9]">United States?</span>
                    </h3>
                    <p className="text-xl text-gray-600 mb-8">
                      Fill up the form to get a full list of Land for sale in the United States.
                    </p>
                    
                    <div className="flex justify-center gap-8 mb-8">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <span className="text-green-600 font-bold">100% Guarantee</span>
                      </div>
                      <div className="text-center">
                        <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <span className="text-blue-600 font-bold">Multiple Offers</span>
                      </div>
                      <div className="text-center">
                        <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <span className="text-purple-600 font-bold">Global Reach</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('firstName')}
                            placeholder="First Name"
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
                          Last Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('lastName')}
                            placeholder="Last Name"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('phone')}
                            placeholder="Phone Number"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('email')}
                            type="email"
                            placeholder="Email Address"
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
                          Cities or Area
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('city')}
                            placeholder="Cities or Area"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.city && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Property State
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('state')}
                            placeholder="Property State"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.state && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                      >
                        {loading ? (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Send className="w-6 h-6" />
                            Receive Land List
                          </div>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-16 border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white font-bold text-xl rounded-2xl"
                      >
                        <Phone className="w-6 h-6 mr-3" />
                        Call Now
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Land for Sale in Maryland - Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Land for Sale in Maryland</h2>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Looking to buy land for sale in Maryland? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
            </p>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
            </p>

            <div className="text-center mb-12">
              <Link to="/contact">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-bold rounded-xl">
                  Contact us
                </Button>
              </Link>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-6">How to Find the Best Land for Sale in Maryland</h3>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Ask other landowners about the area</h4>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Look for signs of natural regeneration</h4>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-4">Summing up</h4>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              When you're looking for land for sale in Maryland, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in the Maryland, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Maryland Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-600">{property.acres} acres</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#329cf9]">
                      ${property.price.toLocaleString()}
                    </span>
                    <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Maryland">
              <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-8 py-4 text-lg font-bold rounded-xl">
                View All Maryland Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Submarkets Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland <span className="text-[#329cf9]">Regional Submarkets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the diverse land investment opportunities across Maryland's regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regionalMarkets.map((market, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{market.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{market.description}</p>
                  <div className="bg-[#329cf9]/10 rounded-lg p-4">
                    <span className="text-[#329cf9] font-bold text-lg">{market.priceRange}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning and Development Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Zoning and <span className="text-[#329cf9]">Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Maryland's land use regulations and development opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {zoningTypes.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-4">
                    {category.types.map((type, typeIndex) => (
                      <div key={typeIndex} className="border-l-4 border-[#329cf9] pl-4">
                        <h4 className="font-bold text-gray-900 mb-1">{type.name}</h4>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Development Process <span className="text-[#329cf9]">Timeline</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate Maryland's development approval process with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developmentTimeline.map((phase, index) => (
              <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-white">
                <CardContent className="p-0">
                  <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {phase.phase}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{phase.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-[#329cf9] font-bold text-sm">⏱️ {phase.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Utilities and <span className="text-[#329cf9]">Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential services and infrastructure considerations for land development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {utilities.map((utility, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{utility.category}</h3>
                  <div className="space-y-3">
                    {utility.providers.map((provider, providerIndex) => (
                      <div key={providerIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">{provider}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation Corridors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Transportation <span className="text-[#329cf9]">Corridors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic location advantages for land development and investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Major Highways</h3>
              <div className="space-y-6">
                {highways.map((highway, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center text-white font-bold">
                      {highway.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{highway.name}</h4>
                      <p className="text-gray-600">{highway.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Rail and Ports</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">CSX Transportation freight rail</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">Port of Baltimore - major East Coast port</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">MARC commuter rail to DC</span>
                </div>
              </div>

              <div className="mt-8">
                <img
                  src="https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Maryland transportation infrastructure and development corridors"
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                <div className="text-center mt-4">
                  <span className="text-[#329cf9] font-bold">Strategic Access</span>
                  <p className="text-gray-600">Multiple transportation modes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Considerations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Environmental <span className="text-[#329cf9]">Considerations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Maryland's environmental factors for successful land development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Climate and Weather</h3>
                <div className="space-y-3">
                  <p className="text-gray-600">• Humid subtropical climate</p>
                  <p className="text-gray-600">• Four distinct seasons</p>
                  <p className="text-gray-600">• Average rainfall: 40-45 inches annually</p>
                  <p className="text-gray-600">• Moderate winter temperatures</p>
                  <p className="text-gray-600">• Hurricane risk along coast</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Soil and Topography</h3>
                <div className="space-y-3">
                  <p className="text-gray-600">• Coastal plain in east</p>
                  <p className="text-gray-600">• Piedmont plateau in central region</p>
                  <p className="text-gray-600">• Appalachian Mountains in west</p>
                  <p className="text-gray-600">• Chesapeake Bay watershed</p>
                  <p className="text-gray-600">• Variable soil conditions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Environmental Regulations</h3>
                <div className="space-y-3">
                  <p className="text-gray-600">• Chesapeake Bay Critical Area</p>
                  <p className="text-gray-600">• Wetlands protection requirements</p>
                  <p className="text-gray-600">• Forest conservation ordinances</p>
                  <p className="text-gray-600">• Stormwater management mandates</p>
                  <p className="text-gray-600">• Historic preservation districts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Land <span className="text-[#329cf9]">Financing Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financing strategies for Maryland land investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financingOptions.map((category, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="space-y-6">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="border-l-4 border-[#329cf9] pl-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h4>
                        <p className="text-gray-600 mb-2">{option.description}</p>
                        <div className="bg-[#329cf9]/10 rounded-lg p-3">
                          <span className="text-[#329cf9] font-bold">Rates: {option.rate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Returns and Holding Costs */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Investment Returns and <span className="text-[#329cf9]">Holding Costs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financial considerations for Maryland land investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Annual Holding Costs</h3>
                <div className="space-y-4">
                  {holdingCosts.map((cost, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="font-medium text-gray-900">{cost.item}</span>
                      <span className="font-bold text-red-600">{cost.cost}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Income Potential</h3>
                <div className="space-y-4">
                  {incomeStreams.map((income, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium text-gray-900">{income.source}</span>
                      <span className="font-bold text-green-600">{income.income}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Acreage Sale */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">ABOUT ACREAGE SALE</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Maryland to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry. Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
            </p>

            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fill up the form to get a full list of Land for sale in Maryland.</h3>
              <p className="text-xl text-[#329cf9] font-bold">The Best Real Estate Professionals you can count on 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips to Find Cheap Land */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Tips to Find Cheap Land for Sale in Maryland</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed mt-6">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 3 places where you can find cheap land for sale near me right now…
            </p>
          </div>

          <div className="space-y-12">
            {cheapLandTips.map((tip, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{index + 1}) {tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tip.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-gray-600 leading-relaxed">
              The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
            </p>
          </div>
        </div>
      </section>

      {/* Maryland Land Investment Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Maryland Land Investment <span className="text-[#329cf9]">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Maryland land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Population Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  The metro continues to attract new residents, driving demand for both residential and commercial land development opportunities in Maryland.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">
                  A diverse base across technology, finance, healthcare, and energy supports steady absorption for a range of land uses around Maryland.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Central positioning with strong transportation infrastructure makes Maryland compelling for logistics, distribution, and advanced manufacturing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions About <span className="text-[#329cf9]">Maryland Land</span>
            </h2>
            <p className="text-xl text-gray-600">Expert answers to common questions about Maryland land investment</p>
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

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {generalFaqs.map((faq, index) => (
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

      {/* Ready to Invest Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              We have all the resources you need <span className="text-[#329cf9]">to start planning your sale</span>
            </h2>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Invest in <span className="text-[#329cf9]">Maryland Land?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Join thousands of successful investors who've found their perfect properties through our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/properties?search=Maryland">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Maryland Properties
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Free Market Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#329cf9]/10 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-[#329cf9]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-xl">Call Now</div>
                <div className="text-[#329cf9] text-lg font-semibold">949-767-8885</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#329cf9]/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#329cf9]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-xl">Email Us</div>
                <div className="text-[#329cf9] text-lg font-semibold">info@acreagesales.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#329cf9]/10 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-[#329cf9]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-xl">Nationwide</div>
                <div className="text-[#329cf9] text-lg font-semibold">All 50 States</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Contact us today for your free, no-obligation land evaluation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl">Call Now</div>
                <div className="text-white text-lg font-semibold">949-767-8885</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl">Email Us</div>
                <div className="text-white text-lg font-semibold">info@acreagesales.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
}