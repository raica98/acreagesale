import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, DollarSign, Ruler, TrendingUp, Users, Building, Star, Eye, User, Send, CircleCheck as CheckCircle, Award, Shield, Zap, ChartBar as BarChart3, Globe, TreePine, Waves, Sun, Umbrella, Chrome as Home, Factory, ShoppingBag, Briefcase, GraduationCap, Heart, Car, Plane } from 'lucide-react';
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
  location: z.string().min(2, 'Preferred location is required'),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInFlorida() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Residential Development',
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
        state: 'Florida',
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('florida_land_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('florida_land_inquiries', JSON.stringify(existingSubmissions));

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
    { label: "Active Listings", value: "2,500+", icon: Building },
    { label: "Avg. Price/Acre", value: "$15,000", icon: DollarSign },
    { label: "Total Acres", value: "50,000+", icon: Ruler },
    { label: "Price Growth", value: "+12%", icon: TrendingUp }
  ];

  const floridaAdvantages = [
    { label: "Metro Population", value: "22.6M", description: "State Population" },
    { label: "Annual GDP", value: "$1.1T", description: "4th largest in US" },
    { label: "No State Income Tax", value: "0%", description: "Tax advantage" },
    { label: "Building Days", value: "365", description: "Year-round climate" }
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
      content: "Found the perfect 10-acre plot in Florida through Acreage Sale. The process was seamless and saved me thousands in fees."
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
      location: "North Florida",
      price: "$2,500,000",
      acres: "25.0",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Corner Lot", 
      location: "Downtown Florida",
      price: "$1,200,000",
      acres: "2.5",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Florida Suburbs", 
      price: "$850,000",
      acres: "5.2",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600"
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

  if (success) {
    <SEO slug="land-for-sale-in-florida" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Florida land inquiry and will contact you within 24 hours with available properties and market analysis.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-blue-800">Our Florida experts review your requirements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-blue-800">We prepare a customized property list for Florida</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-blue-800">You receive Florida market analysis and property recommendations</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties?search=Florida">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse Florida Properties
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
              <Link to="/properties?search=Florida">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                  View All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-[#329cf9] text-white px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🏆 Premium Market
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Land for Sale in <span className="text-[#329cf9]">Florida</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Florida offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Florida">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Florida Properties
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
                  <div className="w-12 h-12 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-[#329cf9]" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Florida Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Florida is a <span className="text-[#329cf9]">Prime Investment Market</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-xl text-gray-600 leading-relaxed">
              <p>Population growth and diversified employment continue to drive demand for land across Florida.</p>
              <p>Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
              <p>Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
            </div>
          </div>

          {/* Florida Advantages Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {floridaAdvantages.map((advantage, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-[#329cf9] mb-2">{advantage.value}</div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{advantage.label}</div>
                  <div className="text-sm text-gray-600">{advantage.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Florida Market Image */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Florida vacant land development opportunities"
                className="w-full max-w-2xl h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Florida</h3>
                <p className="text-white/90 text-lg font-semibold">Prime Growth Market</p>
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
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Florida Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Success Stories from <span className="text-[#329cf9]">Florida Investors</span>
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12">Real results from real investors</p>
            
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
        </div>
      </section>

      {/* Complete Florida Land Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Florida Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Florida
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray">
            <div className="bg-blue-50 rounded-2xl p-8 mb-12 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Land for Sale in Florida</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Looking to buy land for sale in Florida? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
              </p>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-8">How to Find the Best Land for Sale in Florida</h3>
            
            <p className="text-gray-700 leading-relaxed mb-8">
              When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-6">Narrow down your search by location</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-6">Check the property's zoning regulations</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-6">Ask other landowners about the area</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-6">Look for signs of natural regeneration</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
            </p>

            <h4 className="text-2xl font-bold text-gray-900 mb-6">Summing up</h4>
            <p className="text-gray-700 leading-relaxed mb-12">
              When you're looking for land for sale in Florida, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in the Florida, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
            </p>
          </div>
        </div>
      </section>

      {/* Florida Regional Market Analysis */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Florida Regional <span className="text-[#329cf9]">Market Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the unique factors that make Florida an exceptional land investment destination
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Waves className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Coastal Proximity Advantage</h3>
                <p className="text-gray-600 leading-relaxed">
                  Florida's strategic position provides access to both Atlantic and Gulf coastlines, creating unique opportunities for waterfront development, tourism-related projects, and recreational land uses that command premium valuations in today's market.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Year-Round Development Season</h3>
                <p className="text-gray-600 leading-relaxed">
                  Unlike northern markets with seasonal construction limitations, Florida offers year-round building conditions that accelerate project timelines, reduce carrying costs, and provide flexibility in development scheduling that enhances overall investment returns.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Population Migration Trends</h3>
                <p className="text-gray-600 leading-relaxed">
                  Florida benefits from significant in-migration from high-tax states, retiree relocation, and remote work adoption, creating sustained demand for residential land development and supporting long-term appreciation in well-positioned properties.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Market Performance Indicators */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Market Performance Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#329cf9] mb-2">22.6M</div>
                <div className="text-lg font-bold text-gray-900 mb-1">State Population</div>
                <div className="text-sm text-gray-600">Growing 1.8% annually</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#329cf9] mb-2">$1.1T</div>
                <div className="text-lg font-bold text-gray-900 mb-1">State GDP</div>
                <div className="text-sm text-gray-600">4th largest in US</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#329cf9] mb-2">0%</div>
                <div className="text-lg font-bold text-gray-900 mb-1">State Income Tax</div>
                <div className="text-sm text-gray-600">Tax advantage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#329cf9] mb-2">365</div>
                <div className="text-lg font-bold text-gray-900 mb-1">Building Days</div>
                <div className="text-sm text-gray-600">Year-round climate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Acreage Sale Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#329cf9]">Acreage Sale</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-0">
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Florida to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tips to Find <span className="text-[#329cf9]">Cheap Land for Sale in Florida</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 5 places where you can find cheap land for sale near me right now…
            </p>
          </div>

          <div className="space-y-12">
            {/* Tip 1 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Check out foreclosure listings in your area</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Florida. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tip 2 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Take advantage of the seller's desperation</h3>
                    <p className="text-gray-700 leading-relaxed">
                      While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tip 3 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Look for land development opportunities</h3>
                    <p className="text-gray-700 leading-relaxed">
                      The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tip 4 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Finding Cheap Land for Sale Doesn't Mean Strictly Buying</h3>
                    <p className="text-gray-700 leading-relaxed">
                      You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tip 5 */}
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-2xl">5</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Take the time to find the right property for you</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Florida Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-[#329cf9] text-white">{property.acres} acres</Badge>
                    <div className="text-2xl font-bold text-green-600">{property.price}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <Button className="w-full bg-[#329cf9] hover:bg-[#2563eb] text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Florida">
              <Button className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                View All Florida Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
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

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-900">100% Guarantee</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-900">Multiple Offers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-900">Global Reach</div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                  {error}
                </div>
              )}

              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
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

                    {/* Property preferences */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <option value="Recreational Property">Recreational Property</option>
                          <option value="Waterfront Land">Waterfront Land</option>
                          <option value="Investment Land">Investment Land</option>
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
                          <option value="Under $50,000">Under $50,000</option>
                          <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                          <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                          <option value="$250,000 - $500,000">$250,000 - $500,000</option>
                          <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
                          <option value="Over $1,000,000">Over $1,000,000</option>
                        </select>
                        {form.formState.errors.budget && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.budget.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timeline and Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Timeline *
                        </label>
                        <select
                          {...form.register('timeline')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="ASAP">As soon as possible</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6-12 months">6-12 months</option>
                          <option value="Over 1 year">Over 1 year</option>
                        </select>
                        {form.formState.errors.timeline && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.timeline.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-800 mb-3">
                          Preferred Location in Florida *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('location')}
                            placeholder="City, County, or Region"
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

                    {/* Additional Info */}
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-3">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        {...form.register('additionalInfo')}
                        placeholder="Tell us about your specific requirements, intended use, or any questions about Florida land investment..."
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
                          Getting Your Florida Land List...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Get My Florida Land List
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

            {/* Right side - Trust indicators */}
            <div className="space-y-8">
              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">The Best Real Estate Professionals</h3>
                    <p className="text-green-700 font-medium">you can count on 24/7</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Expert Florida market knowledge</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">24/7 customer support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Verified property listings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Professional market analysis</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-0">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Now</h3>
                    <p className="text-3xl font-bold text-[#329cf9] mb-2">949-767-8885</p>
                    <p className="text-blue-700 font-medium">Available 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
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

      {/* Florida Land Investment Insights */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Florida Land Investment <span className="text-[#329cf9]">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Florida land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Population Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  Florida continues to attract new residents, driving demand for both residential and commercial land development opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Strong economy across technology, finance, healthcare, and energy sectors creates stable demand for various types of land development projects.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Central location with excellent transportation infrastructure makes Florida land attractive for logistics, distribution, and manufacturing developments.
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
            Ready to Invest in Florida Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Florida">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Florida Properties
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