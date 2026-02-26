import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { AcreageSaleLogo } from "../../../../components/ui/logo";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Award, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const GroupWrapperSubsection = (): JSX.Element => {
  // Navigation links data
  const navigationLinks = [
    { text: "Home", href: "/", isActive: true },
    { text: "Properties", href: "/properties", isActive: false },
    { text: "About Us", href: "/about", isActive: false },
    { text: "Sell Land Fast", href: "/sell-land-fast", isActive: false },
    { text: "Blog", href: "/blogs", isActive: false },
    { text: "Contact", href: "/contact", isActive: false },
  ];

  // Popular states for land sales
  const popularStates = [
    "Texas", "California", "Florida", "Colorado", "Arizona", "Nevada",
    "North Carolina", "Georgia", "Tennessee", "Virginia", "Oregon", "Washington",
    "Montana", "Wyoming", "Utah", "New Mexico", "Idaho", "Alaska"
  ];

  return (
    <footer className="w-full bg-gray-900 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Logo and description section */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="w-24 h-16 bg-[#329cf9] rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                <span className="text-white font-bold text-2xl">AS</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Acreage Sale</h3>
              <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
                America's premier AI-powered land investment marketplace. Connecting buyers and sellers 
                with verified properties, expert guidance, and revolutionary technology since 2020.
              </p>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#329cf9]">50K+</div>
                <div className="text-sm text-gray-400">Properties</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#329cf9]">$2.5M+</div>
                <div className="text-sm text-gray-400">Transactions</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#329cf9]">5★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-[#329cf9] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#329cf9]">100%</div>
                <div className="text-sm text-gray-400">Secure</div>
              </div>
            </div>
          </div>

          {/* Navigation section */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-2xl mb-8">Quick Links</h3>
            <div className="w-20 h-1 bg-[#329cf9] rounded-full mb-8"></div>
            <nav className="space-y-4">
              {navigationLinks.map((link, index) => (
                <Link
                  key={`nav-link-${index}`}
                  to={link.href}
                  className={`block font-medium text-lg transition-colors hover:text-[#329cf9] min-h-[44px] flex items-center ${
                    link.isActive ? "text-[#329cf9]" : "text-gray-300"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
            
            {/* Social links */}
            <div className="pt-8">
              <h4 className="font-bold text-white text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Instagram, href: "#" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#329cf9] transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-2xl mb-8">Contact Info</h3>
            <div className="w-20 h-1 bg-[#329cf9] rounded-full mb-8"></div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#329cf9]" />
                </div>
                <div>
                  <div className="font-bold text-white mb-2 text-lg">Address</div>
                  <p className="text-gray-300 leading-relaxed">
                    4470 W Sunset Blvd, Suite #91147<br />
                    Los Angeles, CA 90027
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#329cf9]" />
                </div>
                <div>
                  <div className="font-bold text-white mb-2 text-lg">Phone</div>
                  <p className="text-gray-300 font-medium text-lg">949-767-8885</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#329cf9]" />
                </div>
                <div>
                  <div className="font-bold text-white mb-2 text-lg">Email</div>
                  <p className="text-gray-300 font-medium text-lg">info@acreagesales.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="pt-16 border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">Stay Updated with Market Insights</h3>
            <p className="text-gray-300 text-xl mb-10 leading-relaxed">
              Get the latest land investment opportunities, AI market analysis, and exclusive deals delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-[#329cf9] focus:ring-[#329cf9]/20 rounded-xl text-lg"
              />
              <Button className="h-14 bg-[#329cf9] hover:bg-[#329cf9]/90 text-white font-bold px-10 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Popular states section */}
        <div className="pt-16 border-t border-gray-800">
          <div className="text-center mb-12">
            <h4 className="text-2xl font-bold text-white mb-6">Popular States for Land Investment</h4>
            <p className="text-gray-400 text-lg">Explore opportunities across America's most sought-after markets</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {popularStates.map((state, index) => (
              <Link
                key={index}
                to={`/properties?search=${encodeURIComponent(state)}`}
                className="bg-white/5 hover:bg-[#329cf9]/20 backdrop-blur-sm text-gray-300 hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300 border border-white/10 hover:border-[#329cf9]/30 min-h-[44px] flex items-center shadow-lg hover:shadow-xl"
              >
                {state}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-20 pt-10 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-gray-400 text-lg">
              © 2024 Acreage Sale. All rights reserved. | Licensed Real Estate Marketplace
            </div>
            <div className="flex items-center gap-8">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center font-medium">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center font-medium">Terms of Service</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors min-h-[44px] flex items-center font-medium">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};