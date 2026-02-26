import React from "react";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { MapPin, Mail, Phone, User, ArrowRight, CheckCircle, Zap, TrendingUp, Award, Shield } from "lucide-react";

export const OverlapGroupWrapperSubsection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    propertyType: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-xl">
              <div className="inline-flex items-center bg-[#329cf9]/10 text-[#329cf9] px-6 py-3 rounded-full font-semibold text-sm mb-8 border border-[#329cf9]/20">
                <Zap className="w-4 h-4 mr-2" />
                Get Exclusive Access
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-gray-900">
                Ready to find your
                <span className="block text-[#329cf9]">
                  perfect land investment?
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Join thousands of successful investors using our AI-powered platform to maximize returns and minimize risk.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: Zap, title: "AI Auto-Listing", desc: "Save hours of work" },
                  { icon: TrendingUp, title: "Market Analysis", desc: "Find hottest areas" },
                  { icon: Award, title: "ROI Backtesting", desc: "10-year data" },
                  { icon: Shield, title: "Expert Consulting", desc: "Development scenarios" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#329cf9]/10 rounded-xl flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-[#329cf9]" />
                    </div>
                    <div>
                      <div className="text-gray-900 font-bold">{benefit.title}</div>
                      <div className="text-gray-600 text-sm">{benefit.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50,000+</div>
                  <div className="text-gray-600 font-medium">Active Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$2.5M+</div>
                  <div className="text-gray-600 font-medium">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">5★</div>
                  <div className="text-gray-600 font-medium">Average Rating</div>
                </div>
              </div>
              
              {/* Privacy note */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Shield className="w-5 h-5 text-green-500" />
                <p className="text-gray-600 text-sm">
                  Your information is secure and will never be shared. SSL encrypted.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-[#329cf9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Your Free AI Investment Analysis
                </h3>
                <p className="text-gray-600 text-lg">
                  Get AI-powered market analysis, backtesting data, and custom consulting for your land investment goals
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-base font-medium"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-base font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-base font-medium"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-base font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Location and property type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="location" className="sr-only">Preferred Location</label>
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="location"
                      type="text"
                      placeholder="Preferred Location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-12 h-14 bg-gray-50 border-gray-200 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-base font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="property-type" className="sr-only">Property Type</label>
                    <select
                      id="property-type"
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                      className="h-14 bg-gray-50 border border-gray-200 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-base font-medium px-4 text-gray-700 w-full"
                    >
                      <option value="">Property Type</option>
                      <option value="residential">Residential Land</option>
                      <option value="commercial">Commercial Land</option>
                      <option value="agricultural">Agricultural Land</option>
                      <option value="recreational">Recreational Land</option>
                      <option value="industrial">Industrial Land</option>
                    </select>
                  </div>
                </div>

                {/* Benefits checklist */}
                <div className="bg-[#329cf9]/10 rounded-2xl p-6 border border-[#329cf9]/30">
                  <h4 className="font-bold text-gray-900 mb-4">What You'll Get:</h4>
                  <div className="space-y-3">
                    {[
                      "Free AI market analysis report",
                      "10-year ROI backtesting data",
                      "Personalized investment recommendations",
                      "Access to exclusive off-market deals"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#329cf9]" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full h-16 bg-[#329cf9] hover:bg-[#329cf9]/90 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl"
                >
                  Get My Free AI Analysis
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                
                <p className="text-center text-sm text-gray-500">
                  No spam. Unsubscribe anytime. Your data is protected by 256-bit SSL encryption.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};