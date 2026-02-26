import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Star, CircleCheck as CheckCircle, ArrowRight, Clock, Zap, Shield, Award, Building, TreePine, Mountain, Droplets, Wheat, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { SEO } from '../components/SEO';

function slugToCity(slug: string): string {
  if (!slug) return "Texas";

  const specialCases: { [key: string]: string } = {
    "sell-land-fast-in-texas": "Texas",
    "texas": "Texas",
    "mn": "Texas",
    "minneapolis": "Texas City",
    "saint-paul": "Fort Worth",
    "duluth": "El Paso",
    "rochester": "Corpus Christi",
    "brainerd": "Plano"
  };

  if (specialCases[slug.toLowerCase()]) {
    return specialCases[slug.toLowerCase()];
  }

  return slug
    .split('-')
    .map(word => {
      if (word.length === 2) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function SellLandFastTexas() {
  const { slug } = useParams<{ slug?: string }>();

  const CITY_NAME = useMemo(() => {
    if (slug) {
      return slugToCity(slug);
    }
    const path = window.location.pathname;
    const pathSlug = path.split('/').pop() || '';
    return slugToCity(pathSlug);
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      <SEO slug="sell-land-fast-texas" />
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              AcreageSale
            </Link>

            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
              <a href="tel:949-767-8885" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                <Phone className="w-5 h-5" />
                <span>949-767-8885</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2 text-sm font-semibold">
              Texas Cash Land Buyers
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sell Your Land Fast in<br />
              <span className="text-blue-600">{CITY_NAME}</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Get cash offers in <strong>24 hours</strong> • Close in <strong>14 days</strong><br />
              Zero fees • Zero hassle
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch mb-16 max-w-4xl mx-auto">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-[0_8px_30px_rgba(234,88,12,0.5)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.6)] transition-all transform hover:scale-105 border-4 border-orange-700 ring-2 ring-orange-300"
              >
                Get Your Cash Offer Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                className="flex-1 inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-[0_8px_30px_rgba(5,150,105,0.5)] hover:shadow-[0_12px_40px_rgba(5,150,105,0.6)] transition-all transform hover:scale-105 border-4 border-emerald-700 ring-2 ring-emerald-300"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 949-767-8885
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">24hrs</div>
                  <div className="text-gray-600 font-medium">Cash Offer</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">14 Days</div>
                  <div className="text-gray-600 font-medium">Fast Closing</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">$0 Fees</div>
                  <div className="text-gray-600 font-medium">No Commission</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-gray-600 font-medium">Guaranteed</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Texas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
                Why Texas?
              </Badge>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Lone Star State Advantage
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Award className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hill Country Premium</h3>
                    <p className="text-gray-600">Waterfront properties command top dollar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Building className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Strong Economy</h3>
                    <p className="text-gray-600">Dallas-Fort Worth drives consistent growth</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Agriculture Leader</h3>
                    <p className="text-gray-600">Rich farmland with strong values</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md">
                  <div className="text-3xl font-bold mb-1 text-black">$5M+</div>
                  <div className="font-medium text-black">Land Purchased</div>
                </div>
                <div className="text-center p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md">
                  <div className="text-3xl font-bold mb-1 text-black">1,000+</div>
                  <div className="font-medium text-black">Happy Sellers</div>
                </div>
              </div>
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/259620/pexels-photo-259620.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={`${CITY_NAME} Texas land`}
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2 text-sm font-semibold">
              Your Benefits
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              The fastest, easiest way to sell Texas land
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "No realtor commissions - save 6%",
              "Cash offers within 24 hours",
              "Close in 14 days guaranteed",
              "Buy land in any condition",
              "Handle all paperwork for you",
              "No hidden fees or costs"
            ].map((benefit, index) => (
              <Card key={index} className="bg-white border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-lg font-semibold text-gray-900">{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Land Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2 text-sm font-semibold">
              Land Types We Buy
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Every Type of Texas Land
            </h2>
            <p className="text-xl text-gray-600">
              From Rio Grande Valley to Ranch and Coastal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Droplets, title: "Lake & Waterfront", price: "$15K-$100K/acre", color: "blue" },
              { icon: Building, title: "Development Land", price: "$8K-$50K/acre", color: "green" },
              { icon: Mountain, title: "mountain wilderness Property", price: "$2K-$15K/acre", color: "yellow" },
              { icon: TreePine, title: "Hunting & Recreation", price: "$1K-$10K/acre", color: "emerald" },
              { icon: Wheat, title: "Farm & Agricultural", price: "$5K-$25K/acre", color: "cyan" },
              { icon: Award, title: "Cabin & Resort Land", price: "$10K-$60K/acre", color: "purple" }
            ].map((type, index) => (
              <Card key={index} className="bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 bg-${type.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <type.icon className={`w-8 h-8 text-${type.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-2xl font-bold text-blue-600">{type.price}</p>
                  <Badge className="mt-3 bg-gray-100 text-gray-700">We Buy Any Condition</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 px-4 py-2 text-sm font-semibold">
              Success Stories
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Results from {CITY_NAME}
            </h2>
            <p className="text-xl text-gray-600">Trusted by Texas landowners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "Selling my lake property was seamless. Got a fair cash offer immediately and closed in 15 days. The process was professional and stress-free!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Erik Johansen</div>
                    <div className="text-gray-600 text-sm">Lake Property Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "Inherited farmland that we couldn't manage. This team made it effortless with zero fees and quick closing. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Linda Peterson</div>
                    <div className="text-gray-600 text-sm">Farm Land Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complete Guide Section - Comprehensive 2000+ word content */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
              Complete Guide
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete {CITY_NAME} Selling Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about selling Texas land fast
            </p>
          </div>

          <div className="space-y-8">
            {/* Hero Section */}
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8 lg:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      Sell Your {CITY_NAME} Land Fast - Get Cash in 14 Days
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Ready to sell your Texas land quickly? Submit your property details through our simple form and receive a competitive cash offer within 24 hours. We specialize in fast, hassle-free land transactions throughout {CITY_NAME} and all of Texas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modern Approach */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  The Modern Way to Sell Land Fast in {CITY_NAME}
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Selling land in {CITY_NAME} doesn't have to be complicated. Acreage Sale has revolutionized the land selling process by combining cutting-edge technology with deep local market expertise. Whether you own ranch land waterfront, Dallas-Fort Worth development land, mountain wilderness hunting properties, or rich agricultural farmland, we provide a streamlined solution that gets you cash fast.
                  </p>
                  <p className="text-lg">
                    Traditional land sales can take 6-12 months and involve numerous uncertainties. Our innovative approach eliminates the waiting, reduces stress, and puts cash in your pocket quickly. We've successfully purchased over $5 million in Texas land from more than 1,000 satisfied sellers who needed a fast, reliable solution.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 3-Step Process */}
            <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Simple 3-Step Process</h3>

                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        1
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">
                        Submit Your Property Information <span className="text-green-600">(5 Minutes)</span>
                      </h4>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>
                          Getting started is incredibly simple. Fill out our secure online form with basic details about your {CITY_NAME} property including the address, acreage, property type, and any special features. You can also upload photos or documents if available, though this is optional. Our advanced valuation system immediately begins analyzing your property against current market data.
                        </p>
                        <p>
                          Unlike traditional buyers who require extensive property tours and inspections upfront, we can evaluate most properties using modern technology including satellite imagery, GIS data, county records, and comparable sales analysis. This allows us to move quickly while still making fair, accurate offers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        2
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">
                        Receive Your Cash Offer <span className="text-green-600">(Within 24 Hours)</span>
                      </h4>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>
                          Our team of Texas land specialists reviews your property details and performs a comprehensive market analysis. We examine recent comparable sales in {CITY_NAME}, assess current demand trends influenced by Dallas-Fort Worth growth and ranch land appeal, evaluate the property's highest and best use, and factor in all relevant market conditions including waterfront premiums, agricultural productivity, and recreational value.
                        </p>
                        <p>
                          Within 24 hours, you'll receive a no-obligation cash offer via email and phone. Our offer includes a detailed breakdown explaining how we arrived at the valuation, information about our closing process and timeline, and answers to any questions you might have. There's absolutely no pressure to accept, and you're welcome to take time to consider the offer or consult with family, attorneys, or financial advisors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        3
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">
                        Close Fast and Get Paid <span className="text-green-600">(As Quick as 14 Days)</span>
                      </h4>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        <p>
                          Once you accept our offer, we immediately begin the closing process. We work with experienced title companies throughout Texas to ensure a smooth transaction. Our team handles all paperwork, coordinates the title search and clearance, manages any survey requirements, and takes care of all closing logistics.
                        </p>
                        <p>
                          You choose the closing date that works best for your schedule. We can close in as little as 14 days, or we can accommodate longer timelines if you need more time to relocate, resolve estate matters, or handle other personal circumstances. At closing, you receive your cash payment via wire transfer or certified check - whichever you prefer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Landowners Choose Acreage Sale</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">No Real Estate Commissions or Fees</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Traditional land sales through a realtor typically cost 6-10% in commissions plus additional fees. On a $200,000 land sale, that's $12,000-$20,000 out of your pocket. When you sell to Acreage Sale, there are zero commissions, zero marketing fees, zero closing costs, and zero hidden charges.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Buy Land in Any Condition</h4>
                        <p className="text-gray-700 leading-relaxed">
                          We purchase land regardless of its current condition or situation. Whether your property has wetlands, needs clearing, title complications, access issues, or environmental concerns - we have the experience and resources to handle it. We've successfully closed transactions on properties that other buyers rejected.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Fast, Guaranteed Closings</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Unlike traditional buyers who often require financing contingencies that can fall through, we pay cash. This means no bank appraisals, no loan approval delays, no financing contingencies, and no last-minute surprises. Our offers are firm, and we close on schedule.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Local Texas Expertise</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Our team has deep roots and extensive experience throughout Texas's diverse land markets. We understand lake regulations, Dallas-Fort Worth development, mountain wilderness recreation markets, agricultural zones, and seasonal property considerations. This local expertise allows us to make fair offers and close efficiently.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types of Land */}
            <Card className="border-2 border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Types of Land We Buy in {CITY_NAME}</h3>

                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Droplets className="w-6 h-6 text-blue-600" />
                      Lake & Waterfront Properties
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Texas's legendary coast and rivers create exceptional waterfront opportunities. We regularly purchase lake shore properties, river frontage, recreational waterfront, fishing lake parcels, and seasonal cabin sites. Current market values range from $15,000 to $100,000+ per acre depending on lake quality, shoreline footage, water clarity, proximity to Dallas-Fort Worth, and recreational amenities. Premium lakes drive top pricing.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Building className="w-6 h-6 text-green-600" />
                      Development Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Dallas-Fort Worth expansion drives strong development demand. We actively purchase suburban residential land, commercial development sites, industrial parcels, mixed-use properties, and infill lots. Values typically range from $8,000 to $50,000+ per acre based on proximity to Texas City-Austin, utilities availability, zoning approvals, and school district quality.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Mountain className="w-6 h-6 text-yellow-600" />
                      mountain wilderness Properties
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Northern Texas offers pristine forest and wilderness opportunities. We purchase timberland, remote hunting properties, off-grid retreats, conservation land, and recreational parcels. Values range from $2,000 to $15,000 per acre depending on accessibility, timber value, wildlife habitat, proximity to Glacier National Park or state forests, and seasonal access.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <TreePine className="w-6 h-6 text-emerald-600" />
                      Hunting & Recreation Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Texas's outdoor tradition creates strong demand for recreational properties. We regularly buy deer hunting land, waterfowl marshes, upland game habitat, fishing properties, and ATV trail access land. These properties typically range from $1,000 to $10,000 per acre depending on game populations, water features, stand sites, food plots, and cabin improvements.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Wheat className="w-6 h-6 text-cyan-600" />
                      Farm & Agricultural Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Texas ranks among America's top agricultural states. We purchase corn and soybean ground, wheat fields, dairy and livestock farms, organic operations, and specialty crop farms. Values range from $5,000 to $25,000 per acre depending on soil productivity, tile drainage, irrigation, proximity to grain elevators, and conservation program enrollment.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-600" />
                      Cabin & Resort Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Texas's vacation culture supports resort and cabin properties. We purchase resort operations, cabin sites, campground properties, seasonal rental sites, and recreational developments. Values range from $10,000 to $60,000+ per acre depending on lake access, existing improvements, rental income potential, proximity to destinations like Flathead Lake or Whitefish, and tourism amenities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Reasons */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Common Reasons to Sell Land Fast in {CITY_NAME}</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Inherited Property</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Many landowners inherit lake cabins or farmland and find themselves owning property they don't want or can't maintain. We help families resolve these situations quickly and fairly, often purchasing properties where multiple heirs need to split proceeds.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Financial Needs</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Life circumstances sometimes require quick access to cash. Whether avoiding foreclosure, paying medical bills, or funding business opportunities, our quick closing process can provide the cash you need when time is critical.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Property Tax Burden</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Texas property taxes can be substantial, especially on lake property. Many owners sell when taxes become burdensome, particularly combined with maintenance costs and seasonal property management expenses.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Relocation or Life Changes</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Major life transitions often prompt land sales including retirement, job relocation, divorce, or health issues. We work with your timeline and circumstances to facilitate smooth transitions.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Seasonal Property Challenges</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Managing seasonal lake cabins or vacation properties from a distance can be challenging. Long winters, maintenance needs, and security concerns lead many owners to sell their Texas recreational properties.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Out-of-State Owners</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Managing Texas property from another state requires regular travel and local contractors. We help out-of-state owners sell quickly without requiring multiple visits for showings, inspections, or closing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Understanding {CITY_NAME}'s Land Market</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Current Market Conditions (2025)</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Texas's land market remains strong in 2025, with several key trends:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Dallas-Fort Worth growth drives suburban development and land appreciation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Lake property demand remains exceptionally strong with limited inventory</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Agricultural land values supported by strong crop prices and farm economy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Hunting and recreational properties benefit from outdoor recreation trends</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Future Market Outlook</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Several factors point to continued strength in Texas land markets including Dallas-Fort Worth population growth creating suburban demand, limited lake supply maintaining waterfront premiums, strong agricultural economy supporting farmland values, outdoor recreation culture sustaining hunting property demand, and Texas's quality of life attracting residents and businesses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>

                <div className="space-y-6">
                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">How do you determine your offer price?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Our offers are based on comprehensive analysis including recent comparable sales in your area, current market conditions and demand trends, the property's highest and best use potential, lake access and water quality premiums, soil productivity for agricultural land, necessary due diligence and closing costs, and our required profit margin as investors. We strive to make fair offers that reflect true market value.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Do you buy lake and waterfront properties?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we actively purchase lakefront properties, river frontage, and seasonal cabin sites. Texas's lake culture creates unique opportunities, and we have extensive experience with lake regulations, shoreline protection, and waterfront property valuations.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Can you buy land in northern Texas?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Absolutely. We regularly purchase property throughout northern Texas including remote hunting land, timberland, and off-grid properties. Our team understands mountain wilderness market dynamics, seasonal access challenges, and the unique appeal of Texas's wilderness areas.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Do you buy agricultural and farm land?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we purchase all types of agricultural land including row crop farms, dairy operations, livestock farms, and specialty crop properties. We understand Texas farm programs, tile drainage systems, soil types, and agricultural market dynamics.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">What about seasonal or cabin properties?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We regularly purchase seasonal cabins, vacation properties, and recreational land. Whether your property is winterized or seasonal-only, we can evaluate it and make a fair offer. We understand the unique considerations of Texas seasonal properties.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Can you close during Texas winter?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we can close year-round including during Texas winters. Our due diligence process doesn't require physical property visits in most cases, and title work can proceed regardless of weather conditions. We're experienced with Texas's seasonal challenges.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8 lg:p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">About Acreage Sale</h3>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    Acreage Sale is a professional land buying company with deep roots in Texas's real estate market. Our team combines decades of experience in land acquisition, Texas property law and title work, lake and waterfront regulations, agricultural and hunting properties, and market analysis and valuation. We've built our reputation on fair dealing, fast closings, and exceptional customer service.
                  </p>
                  <p className="text-lg">
                    We're not realtors or brokers - we're direct buyers who purchase land for our own investment portfolio. This means we can move quickly without waiting for third-party approvals or financing. We have the cash and capability to close on properties of virtually any size or type throughout Texas.
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    Our mission is simple: provide Texas landowners with a fast, fair, and hassle-free alternative to traditional land sales.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8 lg:p-10 text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Sell Your {CITY_NAME} Land?</h3>

                <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                  If you're ready to explore a fast, cash sale for your Texas land, we're here to help. Getting started takes just a few minutes, and you'll have a cash offer in hand within 24 hours. There's no obligation, no pressure, and no fees - just a straightforward offer based on fair market value.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call 949-767-8885
                  </Button>
                  <Button
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get Your Cash Offer
                  </Button>
                </div>

                <p className="text-gray-600 text-lg">
                  Join the 1,000+ Texas landowners who have successfully sold their properties through Acreage Sale. Experience the difference that professional land buyers with local expertise and a customer-first approach can make.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-blue-300 shadow-2xl">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Get Your Cash Offer Today
                </h2>
                <p className="text-xl text-gray-600">
                  Fill out the form below and receive a no-obligation cash offer within 24 hours
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="propertyAddress" className="block text-sm font-bold text-gray-900 mb-2">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="123 Main St, Texas"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="acreage" className="block text-sm font-bold text-gray-900 mb-2">
                      Acreage *
                    </label>
                    <input
                      type="number"
                      id="acreage"
                      name="acreage"
                      required
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="10.5"
                    />
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-bold text-gray-900 mb-2">
                      Property Type *
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="">Select Type</option>
                      <option value="lake">Lake/Waterfront</option>
                      <option value="development">Development Land</option>
                      <option value="woods">mountain wilderness</option>
                      <option value="hunting">Hunting/Recreation</option>
                      <option value="farm">Farm/Agricultural</option>
                      <option value="cabin">Cabin/Resort</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-bold text-gray-900 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Tell us about any special features, improvements, or details about your property..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700">
                    I agree to receive communications about my property and understand that my information will be kept confidential. *
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-xl font-bold rounded-lg shadow-xl"
                >
                  Get My Cash Offer Now
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>

                <p className="text-center text-sm text-gray-600">
                  By submitting this form, you'll receive your cash offer within 24 hours. No obligations, no pressure.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Ready to Get Your Cash Offer?
          </h2>
          <p className="text-xl mb-8 text-black">
            Join 1,000+ Texas landowners who sold fast with us
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-600 text-white hover:bg-orange-700 px-8 py-6 text-lg font-bold rounded-lg shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-6 text-lg font-bold rounded-lg shadow-xl"
            >
              Call 949-767-8885
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 justify-center bg-gray-50 border-2 border-gray-200 p-4 rounded-lg">
              <Phone className="w-8 h-8 text-black" />
              <div className="text-left">
                <div className="font-bold text-sm text-black">Call Now</div>
                <div className="text-lg text-black">949-767-8885</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center bg-gray-50 border-2 border-gray-200 p-4 rounded-lg">
              <Mail className="w-8 h-8 text-black" />
              <div className="text-left">
                <div className="font-bold text-sm text-black">Email Us</div>
                <div className="text-lg text-black">info@acreagesales.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
}
