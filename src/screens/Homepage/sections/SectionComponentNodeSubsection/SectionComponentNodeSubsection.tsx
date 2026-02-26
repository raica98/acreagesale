import React from "react";
import { Satellite, Brain, Target, Zap, CircleCheck as CheckCircle, TrendingUp, Clock, ChartBar as BarChart3, Calculator, Users, DollarSign, MapPin, Camera, Utensils, ShoppingBag, TreePine, Shield, Search, Home, ArrowRight, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SectionComponentNodeSubsection = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section - Land Discovery */}
      <section className="w-full py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(50, 156, 249) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Verified Listings • Transparent Process • Zero Hidden Fees</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
                Buy Land Smarter
              </span>
              <br />
              <span className="text-gray-700">with AI-Powered Search</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Discover verified land listings nationwide. See properties with satellite imagery, AR boundary tours, and instant market analytics. <span className="font-semibold text-blue-600">Find your perfect land in minutes, not months.</span>
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button
                onClick={() => navigate('/properties')}
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-black font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/properties')}
                className="bg-slate-100 border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-black hover:text-black font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                How It Works
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="font-medium">Trusted by 10,000+ land buyers</span>
            </div>
          </div>

          {/* Feature Cards - Conversion Focused */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {/* Card 1: Smart Search */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Search</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Find land that matches your exact needs with intelligent filters for location, size, price, and features
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Instant property matching</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Save searches & get alerts</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Compare properties side-by-side</span>
                </li>
              </ul>
            </div>

            {/* Card 2: AR Tours */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AR Boundary Tours</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                See exact property lines on your phone using augmented reality before you visit
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Live boundary markers</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>GPS-accurate corner pins</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Multi-angle satellite views</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Market Analytics */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-500">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Market Data</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Make confident decisions with comparable sales, price trends, and investment insights
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Comparable land sales</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Price per acre analysis</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Area growth trends</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Make Offers */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-500">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Make Offers Instantly</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Submit offers directly through the platform and negotiate with sellers in real-time
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>One-click offer submission</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Direct seller communication</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Track offer status live</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details Section - SEO Optimized */}
      <section className="w-full py-12 lg:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Eye className="w-4 h-4 mr-2" />
              Complete Property Information
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Know
              <br />
              <span className="text-blue-600">Before You Buy Land</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every property listing includes comprehensive details, professional imagery, and verified information to help you make the right investment decision
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Detail Card 1 */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Property Details</h3>
              <p className="text-sm text-gray-600">Acreage, zoning, utilities, access roads, and development potential</p>
            </div>

            {/* Detail Card 2 */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
              <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center mb-4">
                <Satellite className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Aerial Imagery</h3>
              <p className="text-sm text-gray-600">Multiple satellite angles, terrain maps, and topography views</p>
            </div>

            {/* Detail Card 3 */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Location Intel</h3>
              <p className="text-sm text-gray-600">Nearby cities, schools, shopping centers, and amenities</p>
            </div>

            {/* Detail Card 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Market Analysis</h3>
              <p className="text-sm text-gray-600">Comparable sales, price history, and ROI projections</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black">Ready to Find Your Perfect Land?</h3>
              <p className="text-lg text-black mb-8 max-w-2xl mx-auto">
                Join thousands of buyers who found their ideal property with our smart search tools
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/properties')}
                  className="bg-white text-black hover:bg-blue-50 hover:text-blue-600 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Browsing Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/properties')}
                  className="border-2 border-black text-black bg-white hover:bg-slate-100 font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
                >
                  View Sample Listing
                </button>
              </div>
              <p className="text-sm text-black mt-6">No sign-up required • Browse free • Contact sellers directly</p>
            </div>
          </div>
        </div>
      </section>

      {/* AR Technology Showcase - Conversion Section */}
      <section className="w-full py-12 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-500/20 border border-blue-400/30 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Camera className="w-4 h-4 mr-2" />
              Revolutionary AR Technology
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              See Property Boundaries
              <br />
              <span className="text-blue-400">Before You Visit</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
              Our augmented reality technology shows you exact property lines through your phone camera. Walk the land with confidence knowing exactly what you're buying.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* AR Phone Demo */}
            <div className="relative">
              <div className="relative inline-block mx-auto">
                <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                  <div className="w-full aspect-[9/19] bg-black rounded-[2rem] overflow-hidden relative">
                    <img
                      src="/2025-10-19_11-51-01.jpg"
                      alt="AR property boundary view on phone"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        🔴 LIVE
                      </div>
                      <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                        GPS ±3m
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 p-3 rounded-xl">
                      <div className="text-sm font-bold">Walk to View Corners</div>
                      <div className="text-xs text-gray-300">Red pins mark exact boundaries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AR Benefits */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">GPS-Accurate Markers</h4>
                  <p className="text-gray-300">See property corners with pinpoint accuracy using your phone's GPS and camera</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚶</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Walk Property Lines</h4>
                  <p className="text-gray-300">Physically explore boundaries and understand the full scope of your investment</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Buy with Confidence</h4>
                  <p className="text-gray-300">Know exactly what you're purchasing before making an offer or scheduling a visit</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/properties')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all duration-300 mt-8 border-2 border-white"
              >
                Try AR on Any Listing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Make Offers Section */}
      <section className="w-full py-12 lg:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <DollarSign className="w-4 h-4 mr-2" />
                Fast & Secure Transactions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Make an Offer Right From
                <br />
                <span className="text-blue-600">The Property Page</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Found the perfect land? Submit your offer instantly with our streamlined process. No waiting, no complicated forms—just click, offer, and negotiate directly with sellers.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">View Property Details</h4>
                    <p className="text-gray-600">Browse comprehensive property information with photos, maps, and data</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Click Make Offer</h4>
                    <p className="text-gray-600">Enter your offer amount and any terms or conditions you'd like to include</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Negotiate in Real-Time</h4>
                    <p className="text-gray-600">Communicate directly with sellers and track your offer status live</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/properties')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 border-2 border-black"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Mock Property Card */}
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                    <img
                      src="/Vacant-Land-Appraisals-Can-My-Land-Be-Developed-Into-A-Subdivision-1024x766 copy.jpg"
                      alt="Prime Development Land"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        Available
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur text-black px-3 py-1 rounded-full text-sm font-bold">
                        5.2 Acres
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Prime Development Land</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Phoenix, Arizona</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-6">$125,000</div>

                    {/* Make Offer Button Highlight */}
                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group border-2 border-green-700">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Make an Offer
                      </span>
                    </button>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-xl p-4 border-2 border-blue-500">
                  <div className="text-2xl font-bold text-blue-600">24h</div>
                  <div className="text-xs text-gray-600">Avg Response</div>
                </div>

                <div className="absolute -left-4 bottom-1/4 bg-white rounded-2xl shadow-xl p-4 border-2 border-green-500">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
