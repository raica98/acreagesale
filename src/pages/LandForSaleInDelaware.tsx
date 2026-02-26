import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Phone, Mail, MapPin, DollarSign, Ruler, TrendingUp, Users, Building, Star, Award, Eye, CircleCheck as CheckCircle, Send, User, FileText, Clock, Shield, Zap, Target, ChartBar as BarChart3, Globe, TreePine, Chrome as Home, Factory, Wheat, Car, Plane, Ship, Droplets, Lightbulb, Wifi } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';
import { SEO } from '../components/SEO';

type Property = Database['public']['Tables']['properties']['Row'];

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  propertyType: z.string().min(1, 'Property type is required'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  additionalInfo: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function LandForSaleInDelaware() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      propertyType: 'Residential Development',
      budget: '$50,000 - $100,000',
      timeline: 'Within 3 months',
    },
  });

  useEffect(() => {
    fetchDelawareProperties();
  }, []);

  const fetchDelawareProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .ilike('state', '%DE%')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      const propertiesWithImages = (data || []).map(property => ({
        ...property,
        images: property.images && property.images.length > 0 
          ? property.images 
          : ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600']
      }));

      setProperties(propertiesWithImages);
    } catch (error) {
      console.error('Error fetching Delaware properties:', error);
      // Fallback to mock Delaware properties
      setProperties([
        {
          id: 'de-1',
          user_id: 'mock',
          title: '25-Acre Development Site',
          description: 'Prime development opportunity in North Delaware',
          price: 425000,
          size_acres: 25.0,
          address: '1234 Development Drive',
          city: 'Wilmington',
          state: 'DE',
          zip_code: '19801',
          county: 'New Castle County',
          apn: 'DE-001-25',
          latitude: 39.7391,
          longitude: -75.5398,
          images: ['https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          boundary_points: null,
          zoning: 'Residential',
          water: 'Municipal',
          electricity: 'Available',
          sewer: 'Municipal'
        },
        {
          id: 'de-2',
          user_id: 'mock',
          title: 'Commercial Corner Lot',
          description: 'Strategic commercial location in downtown area',
          price: 185000,
          size_acres: 2.5,
          address: '5678 Main Street',
          city: 'Dover',
          state: 'DE',
          zip_code: '19901',
          county: 'Kent County',
          apn: 'DE-002-25',
          latitude: 39.1612,
          longitude: -75.5264,
          images: ['https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          boundary_points: null,
          zoning: 'Commercial',
          water: 'Municipal',
          electricity: 'Available',
          sewer: 'Municipal'
        },
        {
          id: 'de-3',
          user_id: 'mock',
          title: 'Residential Development Land',
          description: 'Perfect for suburban development project',
          price: 125000,
          size_acres: 5.2,
          address: '9012 Suburban Lane',
          city: 'Newark',
          state: 'DE',
          zip_code: '19711',
          county: 'New Castle County',
          apn: 'DE-003-52',
          latitude: 39.6837,
          longitude: -75.7497,
          images: ['https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600'],
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          boundary_points: null,
          zoning: 'Residential',
          water: 'Available',
          electricity: 'Available',
          sewer: 'Available'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: ContactForm) => {
    setFormLoading(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store form data in localStorage for demo purposes
      const submissionData = {
        ...data,
        location: 'Delaware',
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('delaware_land_inquiries') || '[]');
      existingSubmissions.unshift(submissionData);
      localStorage.setItem('delaware_land_inquiries', JSON.stringify(existingSubmissions));

      setSuccess(true);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError('Failed to submit your information. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handlePropertyClick = (property: Property, e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setAuthModalOpen(true);
      return;
    }
  };

  const marketStats = [
    { label: "Active Listings", value: "1,200+", icon: Building },
    { label: "Avg. Price/Acre", value: "$8,500", icon: DollarSign },
    { label: "Total Acres", value: "25,000+", icon: Ruler },
    { label: "Price Growth", value: "+8%", icon: TrendingUp }
  ];

  const stateStats = [
    { label: "State Population", value: "980K", icon: Users },
    { label: "State GDP", value: "$75B", icon: BarChart3 }
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
      content: "Found the perfect 10-acre plot in Delaware through Acreage Sale. The process was seamless and saved me thousands in fees."
    },
    {
      name: "Mike Rodriguez", 
      title: "Developer",
      content: "The market data and aerial imagery helped me make an informed decision. Closed on 25 acres in just 45 days."
    }
  ];

  const counties = [
    {
      name: "New Castle County",
      description: "Home to Wilmington and the most densely populated area of Delaware. Offers suburban development opportunities, commercial sites near I-95 corridor, and proximity to Philadelphia metropolitan area. Higher land values but strong appreciation potential.",
      priceRange: "$25,000-$75,000/acre",
      icon: Building
    },
    {
      name: "Kent County", 
      description: "Central Delaware location with Dover as the state capital. Balanced mix of residential, commercial, and agricultural opportunities. Growing population and economic development around Dover Air Force Base create steady demand for various land uses.",
      priceRange: "$8,000-$20,000/acre",
      icon: Home
    },
    {
      name: "Sussex County",
      description: "Southern Delaware's largest county, featuring beach communities, agricultural land, and growing retirement populations. Offers the most affordable land prices with strong potential for recreational and agricultural development projects.",
      priceRange: "$3,000-$12,000/acre", 
      icon: TreePine
    }
  ];

  const zoningTypes = [
    {
      name: "Residential (R-1, R-2, R-3)",
      description: "Single-family homes, townhouses, and multi-family developments. Minimum lot sizes vary by county and specific zoning district.",
      icon: Home
    },
    {
      name: "Commercial (C-1, C-2, C-3)",
      description: "Retail, office, and mixed-use developments. Often located along major highways and in established commercial corridors.",
      icon: Building
    },
    {
      name: "Agricultural (A-1, A-2)",
      description: "Farming, forestry, and rural residential uses. Often the most affordable land with potential for agricultural exemptions.",
      icon: Wheat
    },
    {
      name: "Industrial (I-1, I-2)",
      description: "Manufacturing, warehousing, and distribution facilities. Strategic locations near ports and transportation infrastructure.",
      icon: Factory
    }
  ];

  const developmentSteps = [
    { step: "1", title: "Pre-Application Meeting", description: "Meet with county planning staff to discuss project feasibility and requirements." },
    { step: "2", title: "Site Plan Submission", description: "Submit detailed development plans including utilities, drainage, and environmental considerations." },
    { step: "3", title: "Review and Approval", description: "County review process typically takes 60-90 days depending on project complexity." },
    { step: "4", title: "Permit Issuance", description: "Receive building permits and begin construction according to approved plans." }
  ];

  const utilities = [
    {
      name: "Electricity",
      provider: "Delmarva Power",
      description: "Delmarva Power serves most of Delaware with reliable electrical service. Industrial customers may have access to competitive suppliers.",
      coverage: "Statewide",
      icon: Lightbulb
    },
    {
      name: "Natural Gas",
      provider: "Chesapeake Utilities", 
      description: "Chesapeake Utilities provides natural gas service to most developed areas. Rural properties may require propane or alternative energy sources.",
      coverage: "Major corridors",
      icon: Zap
    },
    {
      name: "Water and Sewer",
      provider: "Municipal/Private",
      description: "Municipal systems in incorporated areas, private wells and septic systems common in rural locations. New developments may require system extensions.",
      coverage: "Varies by location",
      icon: Droplets
    }
  ];

  const transportation = [
    "I-95: Major north-south corridor connecting to Philadelphia and Baltimore",
    "I-495: Wilmington bypass providing access to New Jersey", 
    "US Route 13: Primary north-south route through central Delaware",
    "US Route 1: Coastal highway serving beach communities"
  ];

  const airports = [
    "New Castle Airport: General aviation and cargo",
    "Philadelphia International: 30 minutes from northern Delaware",
    "Port of Wilmington: Container and bulk cargo facility",
    "Delaware Bay: Deep water access for maritime industries"
  ];

  const marketIndicators = [
    { label: "Population Growth (5-year)", value: "+6.2%", color: "text-green-600" },
    { label: "Median Household Income", value: "$70,176", color: "text-blue-600" },
    { label: "Land Appreciation (3-year)", value: "+15.3%", color: "text-purple-600" },
    { label: "Days on Market (avg)", value: "67 days", color: "text-orange-600" }
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4 shadow-2xl border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Thank You!</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your Delaware land inquiry and will contact you within 24 hours with available properties and market analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl">
                  Return to Home
                </Button>
              </Link>
              <Link to="/properties?search=Delaware">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl">
                  Browse Delaware Properties
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
      <SEO slug="land-for-sale-in-delaware" />
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
              <Link to="/properties?search=Delaware">
                <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white">
                  View All Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-[#329cf9] to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-lg font-bold mb-8 shadow-lg">
              🏆 Premium Market
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight drop-shadow-lg">
              Land for Sale in<br />
              <span className="text-yellow-300">Delaware</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 drop-shadow-md">
              Discover prime investment opportunities in one of America's most dynamic markets. From residential development to commercial ventures, Delaware offers exceptional potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/properties?search=Delaware">
                <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all h-auto">
                  Browse Delaware Properties
                </Button>
              </Link>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#329cf9] px-10 py-6 text-xl font-bold rounded-2xl h-auto">
                Get Market Analysis
              </Button>
            </div>

            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {marketStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* State Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {stateStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Delaware Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Delaware is a <span className="text-[#329cf9]">Prime Investment Market</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Population Growth & Employment</h3>
                  <p className="text-gray-600 leading-relaxed">Population growth and diversified employment continue to drive demand for land across Delaware.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Corporate Expansion</h3>
                  <p className="text-gray-600 leading-relaxed">Corporate expansion and infrastructure investment support long-term appreciation and development viability.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Limited Supply</h3>
                  <p className="text-gray-600 leading-relaxed">Limited supply in key corridors, paired with strong demand, keeps the market competitive and resilient.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Delaware vacant land development opportunities"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Delaware</h3>
                <p className="text-white/90 text-lg font-semibold">Prime Growth Market</p>
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
              Why Choose <span className="text-[#329cf9]">Acreage Sale</span> for Delaware Land?
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
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Success Stories from <span className="text-[#329cf9]">Delaware Investors</span>
            </h3>
            <p className="text-xl text-gray-600 text-center mb-12">Real results from real investors</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 border border-gray-200 shadow-lg">
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

      {/* Complete Delaware Land Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete <span className="text-[#329cf9]">Delaware Land Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about buying land in Delaware
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Land for Sale in Delaware</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Looking to buy land for sale in Delaware? There are plenty of options out there, ranging from homesites with utilities to raw acreage and everything in between. Before you jump on the first piece of land for sale that you see, however, it pays to do your homework first.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The type of property you're looking for will largely depend on your personal circumstances and whether or not you have plans to build a house. Raw land is ideal if your only intention is to build and live on that land. If you don't plan to build right away but would like a home sometime in the future, purchasing a homesite might make more sense.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">How to Find the Best Land for Sale in Delaware</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      When you think of buying land, you probably imagine a sprawling ranch with rolling hills, a picturesque stream and enough pasture to support a small herd of cattle. Unfortunately, those kinds of properties are extremely difficult to find. In most areas of the country, finding land for sale is more like trying to find a needle in a haystack than anything else.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Even if you know which counties or townships you'd like to settle in, finding the right property can be an arduous process. Unless you have connections with real estate agents who specialize in selling rural properties, it can be difficult to find what you're looking for. However, with the right research and some determination, it is possible to discover the perfect plot of land for sale sooner rather than later.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Narrow down your search by location</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The first thing you'll want to do is decide where you'd like to buy land. Even though you might have a general idea of the types of properties you'd like to see, it's important to be as specific as possible when you're hunting for land for sale. This will help you focus your research, and make your hunt more efficient. There are a number of factors to consider before narrowing down your search. You'll need to decide whether you want to buy land in a rural or urban area, what size property you are looking for, and how much you're willing to spend.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Check the property's zoning regulations</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Once you've narrowed down the locations you'd like to buy land, you'll need to do some research on the zoning regulations in each area. This will help you discover what you're allowed to build on the property, and if you are allowed to build on it at all. In most cities or townships, a large portion of the land is designated as "commercial land" or "residential land." On the other hand, around 80 percent of the land in rural areas is used as agricultural land.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Ask other landowners about the area</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Before you buy land, it's a good idea to ask the current landowners about what life is like in the area. This will help you get a feel for the neighborhood, and discover if there are any issues you should be aware of before buying. A good way to start this process is by asking the real estate agents who are selling the properties if they know any landowners in the area. If that doesn't work, you can ask your local Chamber of Commerce if they have a list of landowners in your area. If you don't want to ask the landowners directly, you can also ask your neighbors about their experiences living in the area.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Look for signs of natural regeneration</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      One of the best ways to tell if a piece of land has potential is to look for signs of natural regeneration. You can do this by searching for plants like clover, dandelions, or wildflowers in areas that have not been cultivated in years. If the land you're interested in buying has been left alone for a few years, there's a good chance that it has the ability to naturally regenerate itself. This means that it's not reliant on reseeding efforts or chemical applications to survive. If a piece of land is reliant on these kinds of things, it's a good sign that it's not very strong.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Summing up</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      When you're looking for land for sale in Delaware, it's important to remember that the perfect property doesn't exist. There are many different types of properties for sale in the Delaware, and you'll need to find the one that is right for you and your lifestyle. That being said, there are a few things you can keep in mind as you search for the perfect property. The first is that you'll need a certain amount of capital to buy property. You'll also want to make sure that your property has access to utilities, and that it's in a location where you can build whatever kind of structure you want.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-[#329cf9] to-blue-700 rounded-3xl p-8 text-white">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Want to Buy Land in Delaware?</h3>
                  <p className="text-xl text-white/90 mb-2">Fill up the form to get a full list of Land for sale in Delaware.</p>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="font-semibold">100% Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="font-semibold">Multiple Offers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="font-semibold">Global Reach</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...form.register('firstName')}
                      placeholder="First Name"
                      className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                    />
                    <Input
                      {...form.register('lastName')}
                      placeholder="Last Name"
                      className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      {...form.register('email')}
                      type="email"
                      placeholder="Email Address"
                      className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                    />
                    <Input
                      {...form.register('phone')}
                      placeholder="Phone Number"
                      className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      {...form.register('propertyType')}
                      className="h-12 bg-white/20 border border-white/30 rounded-md px-4 text-white focus:bg-white/30"
                    >
                      <option value="Residential Development" className="text-gray-900">Residential Development</option>
                      <option value="Commercial Land" className="text-gray-900">Commercial Land</option>
                      <option value="Agricultural Land" className="text-gray-900">Agricultural Land</option>
                      <option value="Industrial Land" className="text-gray-900">Industrial Land</option>
                    </select>
                    <select
                      {...form.register('budget')}
                      className="h-12 bg-white/20 border border-white/30 rounded-md px-4 text-white focus:bg-white/30"
                    >
                      <option value="Under $50,000" className="text-gray-900">Under $50,000</option>
                      <option value="$50,000 - $100,000" className="text-gray-900">$50,000 - $100,000</option>
                      <option value="$100,000 - $250,000" className="text-gray-900">$100,000 - $250,000</option>
                      <option value="$250,000+" className="text-gray-900">$250,000+</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="w-full h-14 bg-white text-[#329cf9] hover:bg-gray-100 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {formLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#329cf9] border-t-transparent rounded-full animate-spin"></div>
                        Getting Delaware Land List...
                      </div>
                    ) : (
                      'Get Delaware Land List'
                    )}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-white/80 text-lg font-semibold">The Best Real Estate Professionals</p>
                  <p className="text-white/70">you can count on 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delaware Counties */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Counties: <span className="text-[#329cf9]">Investment Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each of Delaware's three counties offers distinct advantages for land investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {counties.map((county, index) => (
              <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                    <county.icon className="w-8 h-8 text-[#329cf9]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{county.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{county.description}</p>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="font-bold text-green-800 mb-1">Average Price</div>
                    <div className="text-2xl font-bold text-green-600">{county.priceRange}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zoning Guide */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Zoning and <span className="text-[#329cf9]">Development Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Delaware's development regulations and opportunities
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Zoning Classifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {zoningTypes.map((zone, index) => (
                <Card key={index} className="p-6 border border-gray-200 shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#329cf9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <zone.icon className="w-6 h-6 text-[#329cf9]" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{zone.name}</h4>
                        <p className="text-gray-600 leading-relaxed">{zone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {developmentSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#329cf9] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Utilities and Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Utilities and <span className="text-[#329cf9]">Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential infrastructure considerations for land development in Delaware
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Utility Providers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {utilities.map((utility, index) => (
                <Card key={index} className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-[#329cf9]/10 rounded-2xl flex items-center justify-center mb-6">
                      <utility.icon className="w-8 h-8 text-[#329cf9]" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{utility.name}</h4>
                    <p className="text-lg font-semibold text-[#329cf9] mb-4">{utility.provider}</p>
                    <p className="text-gray-600 leading-relaxed mb-4">{utility.description}</p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <span className="text-blue-700 font-bold text-sm">Service Area: {utility.coverage}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Transportation Access</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Car className="w-6 h-6 text-[#329cf9]" />
                    Interstate Highways
                  </h4>
                  <div className="space-y-3">
                    {transportation.map((route, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                        <div className="w-2 h-2 bg-[#329cf9] rounded-full"></div>
                        <span className="text-gray-700">{route}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Airports and Ports</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Plane className="w-6 h-6 text-[#329cf9]" />
                    Transportation Hubs
                  </h4>
                  <div className="space-y-3">
                    {airports.map((facility, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                        <div className="w-2 h-2 bg-[#329cf9] rounded-full"></div>
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Land Market <span className="text-[#329cf9]">Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the unique advantages of Delaware's land investment landscape
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Delaware's Strategic Advantages</h3>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Delaware offers unique benefits for land investors, including no state sales tax, business-friendly incorporation laws, and proximity to major East Coast markets. The state's compact size means easy access to Philadelphia, Baltimore, and Washington D.C. metropolitan areas.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With only three counties - New Castle, Kent, and Sussex - Delaware provides diverse investment opportunities from suburban development near Wilmington to agricultural land in the southern counties. The state's growing population and limited land supply create favorable conditions for appreciation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Key Market Indicators</h3>
              <div className="grid grid-cols-2 gap-6">
                {marketIndicators.map((indicator, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className={`text-3xl font-bold ${indicator.color} mb-2`}>{indicator.value}</div>
                    <div className="text-gray-700 font-medium">{indicator.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tips to Find <span className="text-[#329cf9]">Cheap Land for Sale in Delaware</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              There is no getting around it. Buying land can be an expensive proposition, especially when the land you're looking to buy is in a prime location and will likely only appreciate in value over time. If you are planning on building a home or other structure on the land that you are buying, there are ways to lower the cost of that property.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-200 mb-16">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                The key is finding cheap land for sale—and we don't necessarily mean inexpensive acreage that doesn't have much potential for future growth. Rather, we recommend looking for properties where the market has been slow to react to new construction or other factors that might drive up prices. Here are 5 places where you can find cheap land for sale near me right now…
              </p>

              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#329cf9] rounded-full flex items-center justify-center text-white font-bold">1</div>
                    Check out foreclosure listings in your area
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Buying a foreclosed property can be a great way to get a cheap piece of land for sale in Delaware. A lot of times, the owners of these properties get behind on their mortgage payments and the bank ends up taking possession of the home and selling it at auction. These properties will often come with reduced prices or even be free of charge. You may be able to find cheap land sales in your area by checking the listings of your local government. Many municipalities have a database of foreclosed properties that they will make available to the public. Keep in mind that foreclosures can come with their own set of issues. You will likely have to deal with a lot of red tapes in order to get the title transferred in your name. You may also run into problems with neighbors or adjacent property owners who don't want a foreclosed property nearby.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#329cf9] rounded-full flex items-center justify-center text-white font-bold">2</div>
                    Take advantage of the seller's desperation
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    While foreclosures present a great opportunity for buying cheap land for sale near me, you can also get a great deal simply by buying from someone who desperately wants to unload their property. The key here is to find people who are motivated to sell but are unable to find a buyer for any number of reasons. Start by looking for signs of desperation in nearby properties. If properties for sale have been on the market for more than a few weeks and don't appear to be generating much interest, these could be good candidates for buying cheap land for sale. Take a look at the asking prices of these properties and the reasons they're being sold. If there are signs of desperation in the seller, such as a low starting price or a "make an offer" strategy, consider buying cheap land for sale near me.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#329cf9] rounded-full flex items-center justify-center text-white font-bold">3</div>
                    Look for land development opportunities
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The best way to find cheap land for sale near me is to look for properties that either have development potential or are in areas that see rapid growth. The types of developments that work best for this strategy include high-density housing, retail spaces, and commercial real estate. Land in areas that are expected to grow will generally be cheaper than those in regions that are stagnant. You can also look for signs that an area is expected to grow, as the presence of a new highway or railway line. When considering the potential for growth in an area, keep in mind that these forecasts are often wrong. You don't want to invest in a piece of land that you think will grow only to find that the area doesn't develop as quickly as you expected. Try to buy cheap land for sale in areas that have demonstrated growth in the past.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#329cf9] rounded-full flex items-center justify-center text-white font-bold">4</div>
                    Finding Cheap Land for Sale Doesn't Mean Strictly Buying
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    You don't have to buy cheap land for sale near me in order to get a good deal. You can also consider renting or leasing the property instead of purchasing it. This can be a great option if you're not yet sure if you want to commit to owning a piece of land. You can also consider renting or leasing cheap land for sale near me if you are having trouble getting financing or have credit issues that would make it difficult to secure a loan. The only downside to this strategy is that you don't have any equity in the property, so you can't turn it into a source of income if you need money in the future.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#329cf9] rounded-full flex items-center justify-center text-white font-bold">5</div>
                    Take the time to find the right property for you
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Finding cheap land for sale near me is only half the battle. You also need to make sure that the property you plan to buy is actually worth the price. The best way to do this is to look at comparable sales in your area and make sure that you aren't paying too much for the land. Fortunately, there are plenty of ways to find cheap land for sale near me. There are a variety of websites that specialize in helping people find cheap land for sale, and you can also use general real estate websites to your advantage.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mt-4">
                    The best way to find cheap land for sale near me is to look for properties in areas that are expected to grow and that are being sold by owners who are desperate to sell. You should also consider renting or leasing cheap land for sale near me if you are having trouble finding financing. Make sure you take the time to thoroughly assess the value of the land before making an offer.
                  </p>
                </div>
              </div>
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

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We at Acreage Sale striving to create the most cutting-edge and engaging property market by connecting all aspects of land ownership, from locating land for sale in Delaware to connecting landowners with prospective buyers. For professionals, we're striving to improve by collecting, analyzing, and improving in order to deliver the highest quality leads in the industry. Our firm believes that helping others is a responsibility, as well as being honest and open to learning. We work tirelessly to create more value for our customers and passionately advocate for responsible land ownership everywhere. When we make mistakes, we admit them, work hard to create more value for our clients, and advocate for responsible land ownership everywhere.
            </p>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Fill up the form to get a full list of Land for sale in Delaware.</h3>
              <p className="text-xl text-[#329cf9] font-bold">The Best Real Estate Professionals you can count on 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-[#329cf9]">Delaware Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked investment opportunities in prime locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {properties.map((property) => (
              <Link 
                key={property.id} 
                to={`/property/${property.id}`}
                onClick={(e) => handlePropertyClick(property, e)}
              >
                <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                          !user ? 'filter blur-[6px]' : ''
                        }`}
                      />
                      
                      {!user && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <span className="text-gray-700 font-medium text-sm">Sign in to view</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#329cf9] text-white font-bold shadow-lg">
                          {property.size_acres} acres
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#329cf9] transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{property.city}, {property.state}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-[#329cf9]">
                          ${property.price.toLocaleString()}
                        </div>
                        <Button className="bg-gradient-to-r from-[#329cf9] to-blue-600 hover:from-blue-600 hover:to-[#329cf9] text-white font-medium">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties?search=Delaware">
              <Button className="bg-[#329cf9] hover:bg-[#2563eb] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                View All Delaware Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Insights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delaware Land Investment <span className="text-[#329cf9]">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the Delaware land market and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Population Growth</h3>
                <p className="text-gray-600 leading-relaxed">
                  The metro continues to attract new residents, driving demand for both residential and commercial land development opportunities in Delaware.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Economic Diversification</h3>
                <p className="text-gray-600 leading-relaxed">
                  A diverse base across technology, finance, healthcare, and energy supports steady absorption for a range of land uses around Delaware.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  Central positioning with strong transportation infrastructure makes Delaware compelling for logistics, distribution, and advanced manufacturing.
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

      {/* Final CTA */}
      <section className="py-20 bg-[#329cf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg">
            Ready to Invest in Delaware Land?
          </h2>
          <p className="text-2xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md font-semibold leading-relaxed">
            Join thousands of successful investors who've found their perfect properties through our platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/properties?search=Delaware">
              <Button className="bg-white text-[#329cf9] hover:bg-gray-100 hover:text-[#2563eb] px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all h-auto border-4 border-white">
                Browse Delaware Properties
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
                <div className="font-bold text-white text-xl drop-shadow-md">We have all the resources</div>
                <div className="text-white text-lg drop-shadow-sm font-semibold">to start planning your sale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signin"
      />
    </div>
    );
}