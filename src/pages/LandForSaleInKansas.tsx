import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, User, MapPin, Star, Award, TrendingUp, Users, DollarSign, Ruler, Building, TreePine, Zap, CircleCheck as CheckCircle, Send, Eye, ChartBar as BarChart3, Wheat, Tractor, Wind, Sun, Droplets, Factory } from 'lucide-react';
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
  location: z.string().min(2, 'Location is required'),
  propertyType: z.string().min(1, 'Property type is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInKansas() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Agricultural Land',
    },
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
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
    { label: "Active Listings", value: "2,500+", color: "text-blue-600" },
    { label: "Avg. Price/Acre", value: "$15,000", color: "text-green-600" },
    { label: "Total Acres", value: "50,000+", color: "text-purple-600" },
    { label: "Price Growth", value: "+12%", color: "text-orange-600" }
  ];

  const marketStats = [
    { label: "State Population", value: "2.9M", color: "text-blue-600" },
    { label: "Annual GDP", value: "$180B", color: "text-green-600" }
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
      content: "Found the perfect 10-acre plot in Kansas through Acreage Sale. The process was seamless and saved me thousands in fees."
    },
    {
      name: "Mike Rodriguez",
      role: "Developer", 
      content: "The market data and aerial imagery helped me make an informed decision. Closed on 25 acres in just 45 days."
    }
  ];

  const featuredProperties = [
    {
      title: "25-Acre Agricultural Site",
      location: "Central Kansas",
      price: "$375,000",
      acres: "25.0",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Commercial Development Lot",
      location: "Highway Corridor Kansas",
      price: "$185,000",
      acres: "2.5",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Residential Development",
      location: "Kansas Suburbs",
      price: "$125,000",
      acres: "5.2",
      image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600"
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

  const kansasSpecificFaqs = [
    {
      question: "What are the property tax rates for land in Kansas?",
      answer: "Property tax rates in Kansas vary by county but typically range from 0.8% to 1.5% of assessed value. Agricultural land often qualifies for preferential assessment, significantly reducing tax obligations. Most counties assess agricultural land based on productivity value rather than market value, resulting in lower annual taxes for qualifying properties."
    },
    {
      question: "How do water rights work for land purchases in Kansas?",
      answer: "Water rights in Kansas follow the doctrine of prior appropriation for surface water and reasonable use for groundwater. Most rural properties rely on wells for domestic use, while irrigation rights may require separate water permits. It's essential to verify existing water rights and well capacity before purchasing land intended for agricultural or development use."
    },
    {
      question: "What utilities are typically available for rural land in Kansas?",
      answer: "Rural areas in Kansas typically have access to electricity through rural electric cooperatives or Evergy. Internet service varies, with fiber networks expanding but satellite options available everywhere. Water usually comes from private wells, while septic systems handle wastewater. Natural gas availability depends on proximity to distribution lines."
    },
    {
      question: "Are there restrictions on building homes on agricultural land in Kansas?",
      answer: "Most agricultural zoning in Kansas allows one single-family residence per parcel, typically with minimum setbacks from property lines. Some counties require minimum acreage (often 35-40 acres) for new home construction on agricultural land. Building permits and septic system approvals are required, with specific requirements varying by county."
    },
    {
      question: "What is the potential for wind energy leases on Kansas land?",
      answer: "Kansas has excellent wind resources, and many landowners earn additional income through wind energy leases. Typical lease payments range from $3,000-8,000 per turbine annually, with minimal impact on agricultural operations. Wind leases can provide steady income for 20-30 years while maintaining agricultural use of the land."
    },
    {
      question: "How does the Conservation Reserve Program (CRP) work in Kansas?",
      answer: "The CRP provides annual rental payments to farmers who remove environmentally sensitive land from agricultural production. In Kansas, CRP payments typically range from $100-180 per acre annually for 10-15 year contracts. This program can provide steady income while improving soil health and wildlife habitat on marginal agricultural land."
    },
    {
      question: "What are the hunting lease opportunities for Kansas land?",
      answer: "Hunting leases can provide additional income for landowners in Kansas, particularly for properties with good wildlife habitat. Typical hunting lease rates range from $3-8 per acre annually for deer hunting, with higher rates for premium properties. Waterfowl hunting areas near wetlands or rivers can command premium lease rates during hunting seasons."
    },
    {
      question: "How do oil and gas rights affect land values in Kansas?",
      answer: "Oil and gas rights can significantly impact land values in certain areas of Kansas. Properties with mineral rights intact may command higher prices, while those with severed mineral rights may be discounted. Active oil and gas production can provide substantial royalty income, typically 12.5-20% of production value, but may also impact surface use and development potential."
    }
  ];

  if (success) {
    <SEO slug="land-for-sale-in-kansas" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your information and will send you a comprehensive list of Kansas land opportunities within 24 hours.
            </p>
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
            Land for Sale in <span className="text-[#329cf9]">Kansas</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Kansas offers exceptional potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/properties?search=Kansas">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                Browse Kansas Properties
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
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Kansas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Kansas is a <span className="text-[#329cf9]">Prime Investment Market</span>
              </h2>
              
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                <p>Population growth and diversified employment continue to drive demand for land across Kansas.</p>
                <p>Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
                <p>Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {marketStats.map((stat, index) => (
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
                alt="Kansas vacant land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Kansas</h3>
                <p className="text-white/90">Prime Growth Market</p>
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
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Kansas Land?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skip traditional real estate hassles and connect directly with motivated sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from <span className="text-[#329cf9]">Kansas Investors</span>
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
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Kansas Land Guide */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Kansas Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Kansas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Land for Sale in Kansas</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Looking to buy land for sale in Kansas? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Find the Best Land for Sale in Kansas</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
                </p>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Want to Buy Land in United States?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Fill up the form to get a full list of Land for sale in the United States.
                    </p>
                    <div className="flex justify-center gap-6 mb-6">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">100% Guarantee</span>
                      </div>
                      <div className="text-center">
                        <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">Multiple Offers</span>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <span className="text-sm font-medium text-gray-700">Global Reach</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
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
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...form.register('location')}
                            placeholder="Preferred Location in Kansas"
                            className="pl-12 h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg"
                          />
                        </div>
                        {form.formState.errors.location && (
                          <p className="text-red-500 text-sm mt-2">
                            {form.formState.errors.location.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <select
                          {...form.register('propertyType')}
                          className="w-full h-14 border-2 border-gray-200 rounded-xl focus:border-[#329cf9] text-lg px-4 text-gray-700"
                        >
                          <option value="Agricultural Land">Agricultural Land</option>
                          <option value="Residential Development">Residential Development</option>
                          <option value="Commercial Land">Commercial Land</option>
                          <option value="Recreational Property">Recreational Property</option>
                          <option value="Ranch Land">Ranch Land</option>
                          <option value="Investment Property">Investment Property</option>
                        </select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Getting Your Kansas Land List...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send className="w-6 h-6" />
                          Get My Free Kansas Land List
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Kansas Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#329cf9] text-white px-3 py-1 rounded-full text-sm font-bold">
                    {property.acres} acres
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">{property.price}</span>
                  </div>
                  <Button className="w-full bg-[#329cf9] hover:bg-[#2563eb] text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Kansas">
              <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white px-8 py-4 text-lg font-semibold rounded-xl">
                View All Kansas Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Kansas Agricultural Land Market */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kansas <span className="text-[#329cf9]">Agricultural Land Market</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the agricultural foundation that drives Kansas's land market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wheat className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🌾 Wheat Production</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kansas is renowned for wheat production, with some of the most productive agricultural land in the nation, making farmland a stable long-term investment.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Tractor className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🐄 Cattle Ranching</h3>
                <p className="text-gray-600 leading-relaxed">
                  Extensive grasslands and favorable climate make Kansas ideal for cattle operations, supporting both cow-calf and feedlot enterprises.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Cash Rent Returns</h3>
                <p className="text-gray-600 leading-relaxed">
                  Agricultural land in Kansas typically generates 2-4% annual returns through cash rent to local farmers, providing steady income while land appreciates.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Regional Submarkets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Eastern Kansas</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Higher rainfall and corn production</li>
                  <li>• Premium soil quality ratings</li>
                  <li>• Proximity to Kansas City markets</li>
                  <li>• Strong grain elevator network</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Western Kansas</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Wheat and cattle ranching focus</li>
                  <li>• Larger parcel sizes available</li>
                  <li>• Lower per-acre pricing</li>
                  <li>• Oil and gas lease potential</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kansas Zoning and Development Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kansas <span className="text-[#329cf9]">Zoning and Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding zoning regulations and development processes in Kansas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <TreePine className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Agricultural Zoning</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Minimum lot sizes typically 35-40 acres</li>
                  <li>• Single-family residences permitted</li>
                  <li>• Agricultural operations encouraged</li>
                  <li>• Limited commercial activities allowed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Residential Rural</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Minimum lot sizes 2-5 acres</li>
                  <li>• Single and multi-family homes</li>
                  <li>• Home-based businesses permitted</li>
                  <li>• Recreational vehicle storage allowed</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Factory className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Commercial/Industrial</h4>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Highway frontage preferred</li>
                  <li>• Manufacturing and distribution</li>
                  <li>• Agricultural processing facilities</li>
                  <li>• Energy production operations</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Development Timeline */}
          <Card className="p-8 border-0 shadow-xl">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Development Process Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: "1", title: "Due Diligence", time: "30-60 days for site analysis and feasibility studies" },
                  { step: "2", title: "Entitlements", time: "3-12 months for zoning and permit approvals" },
                  { step: "3", title: "Infrastructure", time: "6-18 months for utilities and site preparation" },
                  { step: "4", title: "Construction", time: "12-36 months depending on project scope" }
                ].map((phase, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                      {phase.step}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{phase.title}</h4>
                    <p className="text-gray-600 text-sm">{phase.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Kansas Utilities and Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kansas <span className="text-[#329cf9]">Utilities and Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure considerations for land development in Kansas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">⚡ Electricity</h4>
                <p className="text-gray-600 text-sm">Evergy and rural electric cooperatives serve most areas</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">💧 Water & Sewer</h4>
                <p className="text-gray-600 text-sm">Wells and rural water districts, municipal service in towns</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">🌐 Internet</h4>
                <p className="text-gray-600 text-sm">Fiber networks expanding, satellite options available</p>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wind className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">🔥 Natural Gas</h4>
                <p className="text-gray-600 text-sm">Natural gas service where available, propane alternatives</p>
              </CardContent>
            </Card>
          </div>

          <Card className="p-8 border-0 shadow-xl">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Infrastructure Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Road access and maintenance agreements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Utility easements and connection fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Drainage and stormwater management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Fire department access requirements</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Mailbox and postal service delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Waste management and recycling services</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Emergency services response times</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">School district boundaries and transportation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips to Find Cheap Land */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tips to Find <span className="text-[#329cf9]">Cheap Land for Sale in Kansas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time.
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">1) Check out foreclosure listings in your area</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Kansas. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Foreclosure Opportunities</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potential Savings:</span>
                      <span className="font-bold text-red-600">20-40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-bold text-gray-900">30-90 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Market Timing</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Best Buying Season:</span>
                      <span className="font-bold text-blue-600">Fall/Winter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Activity:</span>
                      <span className="font-bold text-gray-900">Lower Competition</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">2) Take advantage of the seller's desperation</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">3) Look for land development opportunities</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Try to buy cheap land for sale in areas that have demonstrated growth in the past. Look for signs that an area is expected to grow, such as the presence of a new highway or railway line.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Development Potential</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROI Potential:</span>
                      <span className="font-bold text-green-600">15-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-bold text-gray-900">2-5 years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Acreage Sale */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#329cf9]">Acreage Sale</span>
            </h2>
          </div>

          <Card className="p-8 lg:p-12 border-0 shadow-2xl">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#329cf9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Best Real Estate Professionals you can count on 24/7</h3>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-6 max-w-4xl mx-auto">
                <p>
                  We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Kansas to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry.
                </p>
                <p>
                  Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Kansas Land Financing Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kansas <span className="text-[#329cf9]">Land Financing Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Financing strategies and investment considerations for Kansas land purchases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Traditional Financing</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Agricultural Land Loans</h5>
                    <p className="text-gray-600 text-sm">Farm Credit System and local banks offer competitive rates for qualified agricultural land purchases</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Conventional Land Loans</h5>
                    <p className="text-gray-600 text-sm">Traditional lenders offer land loans with 20-30% down payments and competitive interest rates</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Construction-to-Permanent</h5>
                    <p className="text-gray-600 text-sm">Combined financing for land purchase and home construction in one loan package</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Alternative Financing</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Owner Financing</h5>
                    <p className="text-gray-600 text-sm">Direct financing from property sellers with flexible terms and faster closing timelines</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Land Contracts</h5>
                    <p className="text-gray-600 text-sm">Installment purchase agreements allowing lower down payments and immediate possession</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Investment Partnerships</h5>
                    <p className="text-gray-600 text-sm">Joint ventures with other investors to share costs and maximize purchasing power</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Holding Costs & Returns</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Annual Holding Costs</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Property Taxes:</span>
                        <span>$8-15/acre</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance:</span>
                        <span>$2-5/acre</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maintenance:</span>
                        <span>$5-10/acre</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>$15-30/acre</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Cash Rent Income</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Cropland:</span>
                        <span>$150-250/acre</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pasture:</span>
                        <span>$25-50/acre</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CRP:</span>
                        <span>$100-180/acre</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-600">
                        <span>Net:</span>
                        <span>2-4% annually</span>
                      </div>
                    </div>
                  </div>
                </div>
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

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions About <span className="text-[#329cf9]">Kansas Land</span>
            </h3>
            <p className="text-lg text-gray-600 mb-8">Expert answers to common questions about land investment in Kansas</p>
          </div>

          <div className="space-y-6">
            {kansasSpecificFaqs.map((faq, index) => (
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

      {/* Kansas Land Investment Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kansas <span className="text-[#329cf9]">Land Investment Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Kansas land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wheat className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Agricultural Stability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kansas benefits from stable agricultural markets and consistent demand for farmland, creating reliable investment opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Wind className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Energy Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wind energy and oil production create additional revenue streams for landowners, with Kansas leading in renewable energy development.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Central Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Strategic position in America's heartland makes Kansas attractive for logistics, distribution, and agricultural processing facilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Ready to Invest in Kansas Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Kansas">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Kansas Properties
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
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-xl drop-shadow-md">We have all the resources you need</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">to start planning your sale</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}