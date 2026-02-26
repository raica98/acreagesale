import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AcreageSaleLogo } from './logo';
import { Button } from './button';
import { AuthModal } from '../auth/AuthModal';
import { AddPropertyModal } from '../properties/AddPropertyModal';
import { useAuth } from '../../hooks/useAuth';

export function SharedNavigation() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [addPropertyModalOpen, setAddPropertyModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const location = useLocation();

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    if (user) {
      await signOut();
    }
  };

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <AcreageSaleLogo className="w-32 lg:w-40" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/') && location.pathname === '/'
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                Home
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/') && location.pathname === '/'
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
              <Link
                to="/acreage-for-sale"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/acreage-for-sale')
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                Acreage for Sale
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/acreage-for-sale')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
              <Link
                to="/properties"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/properties')
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                Properties
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/properties')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
              <Link
                to="/sell-land-fast"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/sell-land-fast') || isActivePath('/sell-my-land-fast')
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                Sell Land Fast
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/sell-land-fast') || isActivePath('/sell-my-land-fast')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
              <Link
                to="/about"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/about')
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                About Us
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/about')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
              <Link
                to="/blogs"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/blogs') || isActivePath('/blog/')
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                Blogs
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/blogs') || isActivePath('/blog/')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
              <Link
                to="/contact"
                className={`font-medium transition-colors relative group ${
                  isActivePath('/contact')
                    ? 'text-[#329cf9]'
                    : 'text-gray-700 hover:text-[#329cf9]'
                }`}
              >
                Contact Us
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#329cf9] transition-all duration-300 ${
                    isActivePath('/contact')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => setAddPropertyModalOpen(true)}
                  >
                    Add Listing
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Add Listing
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => handleAuthClick('signin')}
                  >
                    Login
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-[#329cf9] hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
                <span className="sr-only">{mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  <Link
                    to="/"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/acreage-for-sale"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Acreage for Sale
                  </Link>
                  <Link
                    to="/properties"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Properties
                  </Link>
                  <Link
                    to="/sell-land-fast"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sell Land Fast
                  </Link>
                  <Link
                    to="/about"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/blogs"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-gray-700 hover:text-[#329cf9] font-medium py-2 transition-colors min-h-[44px] flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </nav>

                {/* Mobile Action Buttons */}
                <div className="pt-4 border-t space-y-3">
                  {user ? (
                    <>
                      <Link to="/dashboard" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 min-h-[48px]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 min-h-[48px]"
                        onClick={() => {
                          setAddPropertyModalOpen(true);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Add Listing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 min-h-[48px]"
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white transition-all duration-300 min-h-[48px]"
                        onClick={() => {
                          handleAuthClick('signup');
                          setMobileMenuOpen(false);
                        }}
                      >
                        Add Listing
                      </Button>
                      <Button
                        className="w-full bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white transition-all duration-300 min-h-[48px] shadow-lg hover:shadow-xl"
                        onClick={() => {
                          handleAuthClick('signin');
                          setMobileMenuOpen(false);
                        }}
                      >
                        Login
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />

      <AddPropertyModal
        isOpen={addPropertyModalOpen}
        onClose={() => setAddPropertyModalOpen(false)}
        onSuccess={() => {
          setAddPropertyModalOpen(false);
        }}
      />
    </>
  );
}
