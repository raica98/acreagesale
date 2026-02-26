import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Star, CircleCheck as CheckCircle, ArrowRight, Clock, Zap, Shield, Award, Building, TreePine, Mountain, Droplets, Wheat, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { SEO } from '../components/SEO';

function slugToCity(slug: string): string {
  if (!slug) return "Maine";

  const specialCases: { [key: string]: string } = {
    "sell-land-fast-in-maine": "Maine",
    "maine": "Maine",
    "me": "Maine",
    "portland": "Portland",
    "bangor": "Bangor",
    "augusta": "Augusta",
    "lewiston": "Lewiston",
    "south-portland": "South Portland"
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

export function SellLandFastMaine() {
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
      <SEO slug="sell-land-fast-maine" />
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
              Maine Cash Land Buyers
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
                  <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                  <div className="text-gray-600 font-medium">Guaranteed</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Maine Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2 text-sm font-semibold">
                Why Maine?
              </Badge>

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Pine Tree State Advantage
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Award className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Pristine Natural Beauty</h3>
                    <p className="text-gray-600">Coastal, forest, and mountain properties in demand</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Building className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Growing Tourism Market</h3>
                    <p className="text-gray-600">Vacation and second-home demand rising</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Strong Land Values</h3>
                    <p className="text-gray-600">Limited inventory drives appreciation</p>
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
                src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt={`${CITY_NAME} Maine land`}
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
              The fastest, easiest way to sell Maine land
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
              Every Type of Maine Land
            </h2>
            <p className="text-xl text-gray-600">
              From coastal properties to mountain retreats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Droplets, title: "Coastal & Waterfront", price: "$5K-$40K/acre", color: "blue" },
              { icon: TreePine, title: "Timberland & Forest", price: "$1K-$4K/acre", color: "green" },
              { icon: Mountain, title: "Mountain & Rural", price: "$1.5K-$8K/acre", color: "yellow" },
              { icon: Building, title: "Development Land", price: "$3K-$20K/acre", color: "emerald" },
              { icon: Wheat, title: "Farm & Agricultural", price: "$2K-$10K/acre", color: "cyan" },
              { icon: Award, title: "Recreational Land", price: "$1K-$6K/acre", color: "purple" }
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
            <p className="text-xl text-gray-600">Trusted by Maine landowners</p>
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
                  "Needed to sell my waterfront property in {CITY_NAME} quickly. Got a fair cash offer in 24 hours and closed in just 15 days. Couldn't be happier with the process!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Sarah Mitchell</div>
                    <div className="text-gray-600 text-sm">Coastal Property Owner</div>
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
                  "Selling inherited timberland seemed daunting, but the team made it effortless. No fees, no hassles, just a smooth transaction. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">James MacDonald</div>
                    <div className="text-gray-600 text-sm">Timberland Owner</div>
                  </div>
                </div>
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
                    placeholder="123 Main St, Maine"
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
                      <option value="coastal">Coastal/Waterfront</option>
                      <option value="timberland">Timberland/Forest</option>
                      <option value="mountain">Mountain/Rural</option>
                      <option value="development">Development Land</option>
                      <option value="farm">Farm/Agricultural</option>
                      <option value="recreational">Recreational</option>
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

      {/* Complete Guide Section */}
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
              Everything you need to know about selling Maine land fast
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
                      Ready to sell your Maine land quickly? Submit your property details through our simple form and receive a competitive cash offer within 24 hours. We specialize in fast, hassle-free land transactions throughout {CITY_NAME} and all of Maine.
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
                    Selling land in {CITY_NAME} doesn't have to be complicated. Acreage Sale has revolutionized the land selling process by combining cutting-edge technology with deep local market expertise. Whether you own coastal waterfront property, timberland, mountain retreats, or development parcels, we provide a streamlined solution that gets you cash fast.
                  </p>
                  <p className="text-lg">
                    Traditional land sales can take 6-12 months and involve numerous uncertainties. Our innovative approach eliminates the waiting, reduces stress, and puts cash in your pocket quickly. We've successfully purchased over $5 million in Maine land from more than 1,000 satisfied sellers who needed a fast, reliable solution.
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
                          Our team of Maine land specialists reviews your property details and performs a comprehensive market analysis. We examine recent comparable sales in {CITY_NAME}, assess current demand trends including seasonal tourism impacts, evaluate the property's highest and best use, and factor in all relevant market conditions such as ocean access, timber value, and development potential.
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
                          Once you accept our offer, we immediately begin the closing process. We work with experienced title companies throughout Maine to ensure a smooth transaction. Our team handles all paperwork, coordinates the title search and clearance, manages any survey requirements, and takes care of all closing logistics.
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
                          We purchase land regardless of its current condition or situation. Whether your property has challenging winter access, needs clearing, title issues, is landlocked, or has zoning complications - we have the experience and resources to handle it. We've successfully closed transactions on properties that other buyers rejected.
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
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Local Maine Expertise</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Our team has deep roots and extensive experience throughout Maine's diverse land markets. We understand coastal property values, Portland and Bangor growth areas, timberland and forestry markets, seasonal tourism impacts, and Maine's unique property regulations including shore land zoning. This local expertise allows us to make fair offers and close efficiently.
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
                      Coastal & Waterfront Properties
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Maine's stunning coastline and countless lakes create premium real estate opportunities. We regularly purchase oceanfront properties, lake frontage parcels, riverfront land, island properties, and coastal cottage lots. Current market values range from $5,000 to $40,000+ per acre depending on water access, views, shoreland zoning, and proximity to towns like Bar Harbor, Camden, and Kennebunkport.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <TreePine className="w-6 h-6 text-green-600" />
                      Timberland & Forest Properties
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Maine's vast forests support a thriving timber industry. We actively purchase commercial timberland with active management plans, mixed hardwood and softwood forests, cutover land ready for regeneration, and recreational woodland. These properties typically range from $1,000 to $4,000 per acre based on timber species, age class, accessibility, and sustainable harvest potential.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Mountain className="w-6 h-6 text-yellow-600" />
                      Mountain & Rural Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Maine's mountainous interior offers privacy and natural beauty. We purchase mountain properties with views, remote wilderness tracts, rural residential land, and off-grid properties. Values typically range from $1,500 to $8,000 per acre depending on elevation, accessibility, views, and proximity to ski areas and outdoor recreation.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Building className="w-6 h-6 text-emerald-600" />
                      Development Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Growing areas around Portland, Bangor, Augusta, and coastal towns drive development demand. We buy subdivided lots, infill parcels near services, large tracts for residential subdivision, and mixed-use development sites. Values range from $3,000 to $20,000+ per acre based on location, utilities, zoning, and municipal approvals.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Wheat className="w-6 h-6 text-cyan-600" />
                      Farm & Agricultural Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Maine's agricultural sector includes diverse operations. We purchase crop land for potatoes and grains, blueberry barrens, dairy and livestock farms, organic farming operations, and nursery and greenhouse sites. Values typically range from $2,000 to $10,000 per acre depending on soil quality, infrastructure, water rights, and farming history.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-600" />
                      Recreational & Hunting Land
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Maine's outdoor recreation opportunities create strong demand. We buy hunting camps and wilderness land, fishing access properties, ATV and snowmobile trail land, seasonal cabin sites, and conservation parcels. These properties typically range from $1,000 to $6,000 per acre depending on game populations, water access, trail systems, and camp improvements.
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
                      Many landowners inherit property and find themselves owning land they don't want or can't maintain. We help families resolve these situations quickly and fairly, often purchasing properties where multiple heirs need to split proceeds.
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
                      Annual property tax obligations continue whether you're using the property or not. Many owners sell when taxes become burdensome, especially combined with maintenance costs and insurance expenses.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Relocation or Life Changes</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Major life transitions often prompt land sales including retirement, job relocation, divorce, or health issues. We work with your timeline and circumstances to facilitate smooth transitions.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Problem Properties</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Some properties present challenges that make traditional sales difficult including title defects, access disputes, environmental concerns, or boundary problems. We have the expertise to work through these complications.
                    </p>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Seasonal Property Costs</h4>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Maine's harsh winters mean ongoing costs for snow removal, winterization, and seasonal maintenance. Some owners decide selling is better than managing these year-round expenses for land they rarely use.
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
                      Maine's land market remains strong in 2025, with several key trends:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Remote work trends drive increased demand for rural and coastal properties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Tourism and vacation rental markets support second-home property values</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Sustainable forestry and carbon credit programs enhance timberland value</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>Limited coastal inventory maintains premium pricing for waterfront properties</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Future Market Outlook</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Several factors point to continued strength in Maine land markets including population growth in southern Maine corridors, sustained interest in outdoor recreation and second homes, growing demand for sustainable timber practices, strong tourism sector supporting vacation properties, and limited developable coastal land maintaining scarcity value.
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
                      Our offers are based on comprehensive analysis including recent comparable sales in your area, current market conditions and demand trends, the property's highest and best use potential, water access and shoreland considerations, timber inventory and harvest potential, necessary due diligence and closing costs, and our required profit margin as investors. We strive to make fair offers that reflect true market value while accounting for the speed and certainty we provide.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Do I need a survey?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      In most cases, we can work with existing surveys or use legal descriptions from county records. If a new survey is needed, we typically handle the cost and coordination as part of our due diligence process.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">What about shoreland zoning regulations?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We're very familiar with Maine's comprehensive shoreland zoning laws. Whether your property has resource protection, limited residential, or general development zones, we factor these regulations into our valuation and can navigate the requirements efficiently.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Can you buy timberland with active harvest contracts?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we regularly purchase timberland with existing management agreements, harvest contracts, and conservation easements. We review all existing agreements and incorporate them into our acquisition process, ensuring all parties' rights are protected.
                    </p>
                  </div>

                  <div className="pb-6 border-b border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Can you buy land that's in a trust or estate?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we regularly purchase property from trusts, estates, and family partnerships. We work with executors, trustees, and attorneys to ensure all legal requirements are met and all beneficiaries are properly represented.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Do you buy island properties?</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, we purchase Maine island properties including both private islands and parcels on larger islands. Access considerations, utilities, and seasonal restrictions are all factored into our valuation process.
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
                    Acreage Sale is a professional land buying company with deep roots in Maine's real estate market. Our team combines decades of experience in land acquisition, Maine property law and title work, forestry and timber expertise, coastal property regulations, and market analysis and valuation. We've built our reputation on fair dealing, fast closings, and exceptional customer service.
                  </p>
                  <p className="text-lg">
                    We're not realtors or brokers - we're direct buyers who purchase land for our own investment portfolio. This means we can move quickly without waiting for third-party approvals or financing. We have the cash and capability to close on properties of virtually any size or type throughout Maine.
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    Our mission is simple: provide Maine landowners with a fast, fair, and hassle-free alternative to traditional land sales.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8 lg:p-10 text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Sell Your {CITY_NAME} Land?</h3>

                <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
                  If you're ready to explore a fast, cash sale for your Maine land, we're here to help. Getting started takes just a few minutes, and you'll have a cash offer in hand within 24 hours. There's no obligation, no pressure, and no fees - just a straightforward offer based on fair market value.
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
                  Join the 1,000+ Maine landowners who have successfully sold their properties through Acreage Sale. Experience the difference that professional land buyers with local expertise and a customer-first approach can make.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Ready to Get Your Cash Offer?
          </h2>
          <p className="text-xl mb-8 text-black">
            Join 1,000+ Maine landowners who sold fast with us
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
