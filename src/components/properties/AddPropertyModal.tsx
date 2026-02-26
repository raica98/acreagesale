import React, { useState, useEffect } from 'react';
import { X, Plus, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PropertyListingForm } from './PropertyListingForm';
import { IntegratedListingFlow } from './IntegratedListingFlow';
import { AIAutoListingGenerator } from './AIAutoListingGenerator';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';
import { useListingCredits } from '../../hooks/useListingCredits';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddPropertyModal({ isOpen, onClose, onSuccess }: AddPropertyModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { hasAccess, loading: subscriptionLoading } = useSubscription();
  const { credits, hasUnlimited, loading: creditsLoading, refresh: refreshCredits } = useListingCredits();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<'manual' | 'integrated' | 'ai' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simple geocoding function
  const geocodeAddress = async (address: string, city: string, state: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      const fullAddress = `${address}, ${city}, ${state}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1&countrycodes=us`,
        {
          headers: {
            'User-Agent': 'AcreageSale/1.0'
          }
        }
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return null;
  };

  const handleSubmit = async (data: any) => {
    console.log('🎯 AddPropertyModal handleSubmit called with data:', data);

    if (!user) {
      console.error('❌ No user logged in');
      setError('You must be logged in to create a property listing');
      return;
    }

    console.log('👤 User ID:', user.id);
    setLoading(true);
    setError(null);

    try {
      // Geocode the address
      console.log('🗺️ Geocoding address:', data.address, data.city, data.state);
      const coordinates = await geocodeAddress(data.address, data.city, data.state);
      console.log('📍 Geocoded coordinates:', coordinates);

      const cleanImages = (data.images || []).filter((url: string) => !url.startsWith('data:image'));

      const propertyData = {
        user_id: user.id,
        title: data.title,
        description: data.description,
        price: Number(data.price),
        size_acres: Number(data.size_acres),
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        county: data.county || null,
        apn: data.apn || null,
        latitude: data.latitude || coordinates?.lat || null,
        longitude: data.longitude || coordinates?.lng || null,
        zoning: data.zoning || null,
        water: data.water || null,
        electricity: data.electricity || null,
        sewer: data.sewer || null,
        images: cleanImages,
        boundary_points: data.boundary_points || null,
        status: 'active',
      };

      console.log('💾 Inserting property data:', propertyData);

      // Retry logic for property insertion (in case subscription trigger is still completing)
      let insertedData = null;
      let insertError = null;
      const maxRetries = 3;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const { data, error } = await supabase.from('properties').insert([propertyData]).select();

        if (!error) {
          insertedData = data;
          break;
        }

        insertError = error;
        console.log(`❌ Insert attempt ${attempt}/${maxRetries} failed:`, error);

        // If this is a permission error and not the last attempt, wait and retry
        if (attempt < maxRetries && error.message?.includes('row-level security')) {
          console.log(`⏳ Waiting 2 seconds before retry ${attempt + 1}...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else if (attempt === maxRetries) {
          break;
        }
      }

      if (insertError) {
        console.error('❌ Database error after all retries:', insertError);
        throw new Error(insertError.message || 'Failed to create property listing. Please try again.');
      }

      console.log('✅ Property inserted successfully:', insertedData);

      await refreshCredits();

      setShowSuccess(true);

      setTimeout(() => {
        onSuccess();
        onClose();
        setSelectedFlow(null);
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('❌ Submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setSelectedFlow(null);
      alert(`Failed to create listing: ${errorMessage}. Please check the form and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedFlow(null);
    setError(null);
  };

  const handleSmartFlowClick = () => {
    if (!hasAccess) {
      navigate('/premium');
      handleClose();
    } else {
      setSelectedFlow('integrated');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center z-50 p-4 overflow-y-auto bg-black/70 backdrop-blur-md"
      onClick={handleClose}
    >
      <div className="w-full max-w-7xl mx-auto my-4 lg:my-8 pt-4 lg:pt-8" onClick={(e) => e.stopPropagation()}>
        {showSuccess || loading ? (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-w-md mx-auto text-center transform scale-100 animate-in fade-in zoom-in duration-300">
              {showSuccess ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Congratulations!</h2>
                  <p className="text-lg text-gray-600 mb-2">Your property has been posted successfully!</p>
                  <p className="text-sm text-gray-500">Redirecting...</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Processing...</h2>
                  <p className="text-lg text-gray-600 mb-2">Uploading images and creating your listing</p>
                  <p className="text-sm text-gray-500">Please wait...</p>
                </>
              )}
            </div>
          </div>
        ) : !selectedFlow ? (
          // Flow Selection Screen
          <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
            <CardContent className="p-0 bg-white opacity-100">
              <div className="p-4 lg:p-8 relative">
              {/* Exit button in top right corner */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10 shadow-md"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
              
              {/* Hero Section */}
              <div className="text-center mb-6 lg:mb-12">
                <div className="w-12 h-12 lg:w-20 lg:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-6">
                  <span className="text-white text-3xl">🚀</span>
                </div>
                <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4 px-2">
                  Choose Your Listing Method
                </h2>
                </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 lg:px-6 py-2 lg:py-4 rounded-xl mb-4 lg:mb-8 mx-2 lg:mx-0">
                  {error}
                </div>
              )}

              {!creditsLoading && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl px-4 lg:px-6 py-3 lg:py-4 mb-4 lg:mb-8 mx-2 lg:mx-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                      <div>
                        <p className="text-sm lg:text-base font-semibold text-gray-900">
                          {hasUnlimited ? 'Unlimited Listings' : `${credits} Listing Credit${credits !== 1 ? 's' : ''} Available`}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">
                          {hasUnlimited ? 'Active subscription' : credits > 0 ? 'Use your credits to create listings' : 'Purchase credits to create listings'}
                        </p>
                      </div>
                    </div>
                    {!hasUnlimited && credits === 0 && (
                      <Button
                        onClick={() => {
                          navigate('/premium');
                          handleClose();
                        }}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Get Credits
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8 max-w-5xl mx-auto px-1 lg:px-0">
                {/* Smart Map Flow */}

                {/* Integrated Flow */}
                <div
                  onClick={handleSmartFlowClick}
                  className="group cursor-pointer bg-white opacity-100 rounded-lg lg:rounded-3xl p-3 lg:p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative"
                >
                  {/* Recommended Badge */}
                  <div className="absolute top-1 lg:top-4 right-1 lg:right-4 bg-green-600 text-white px-2 lg:px-3 py-1 rounded-full text-xs font-bold">
                    RECOMMENDED
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-10 h-10 lg:w-20 lg:h-20 bg-blue-600 rounded-lg lg:rounded-3xl flex items-center justify-center mx-auto mb-2 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white text-xl lg:text-3xl">🗺️</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-4 text-center">
                      Smart Map Flow
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-3 lg:mb-8 text-xs lg:text-base leading-tight lg:leading-relaxed text-center">
                      The intelligent way to create listings. Our AI analyzes your property data and generates professional content automatically.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-1 lg:space-y-4 mb-3 lg:mb-8">
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-xs">🗺️</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Interactive satellite mapping</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-xs">🤖</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">AI-powered content generation</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 text-xs">⚡</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Automatic property data lookup</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-600 text-xs">📸</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">AI satellite image capture</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-red-600 text-xs">🎯</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Matching to in the area buyer</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-yellow-600 text-xs">💰</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">100 Letters sent to the neighbors of the property, these are the highest paying buyers 80% of the time</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-yellow-600 text-xs">💰</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Email sent to all Realtors in the area that sold similar properties within two years</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-600 text-xs">🎯</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Targeted email sent to qualified investors in the area </span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-teal-600 text-xs">📊</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Real-time market analytics and pricing insights</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-emerald-600 text-xs">⚡</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Get offers as soon as 7 days!</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-pink-600 text-xs">🎯</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Direct buyer offers - zero seller commissions, maximum control</span>
                      </div>
                    </div>
                    
                    {/* Pricing */}
                    <div className="bg-blue-50 rounded-lg lg:rounded-2xl p-2 lg:p-4 mb-3 lg:mb-6 text-center">
                      <div className="text-sm lg:text-2xl font-bold text-blue-600">$249.99 one-time</div>
                      <div className="text-xs lg:text-sm text-blue-700">AI-powered automation</div>
                    </div>

                    {/* Button */}
                    {!hasAccess && !subscriptionLoading && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 lg:p-3 mb-2 lg:mb-4">
                        <div className="flex items-center gap-2 text-yellow-800">
                          <Lock className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                          <span className="text-xs lg:text-sm font-medium">Premium Access Required</span>
                        </div>
                      </div>
                    )}
                    <Button className="w-full h-8 lg:h-12 bg-black hover:bg-gray-900 text-white font-bold text-xs lg:text-lg rounded-md lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      {!hasAccess ? 'Get Premium Access' : 'Start Smart Flow'}
                    </Button>
                  </div>
                </div>

                {/* Manual Entry */}
                {/* Manual Form */}
                <div
                  onClick={() => setSelectedFlow('manual')}
                  className="group cursor-pointer bg-white opacity-100 rounded-lg lg:rounded-3xl p-3 lg:p-8 border-2 border-gray-200 hover:border-gray-400 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative"
                >
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-10 h-10 lg:w-20 lg:h-20 bg-gray-600 rounded-lg lg:rounded-3xl flex items-center justify-center mx-auto mb-2 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white text-xl lg:text-3xl">📝</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base lg:text-2xl font-bold text-gray-900 mb-1 lg:mb-4 text-center">
                      Manual Entry
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-3 lg:mb-8 text-xs lg:text-base leading-tight lg:leading-relaxed text-center">
                      Complete control over your listing. Perfect for experienced users who want to customize every detail.
                    </p>

                    {/* Features */}
                    <div className="space-y-1 lg:space-y-4 mb-3 lg:mb-8">
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-xs">✏️</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Complete creative control</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-xs">📷</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Upload custom images</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 text-xs">📋</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Detailed form fields</span>
                      </div>
                      <div className="flex items-center gap-2 lg:gap-3 text-gray-700">
                        <div className="w-3 h-3 lg:w-6 lg:h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-600 text-xs">🎯</span>
                        </div>
                        <span className="font-medium text-xs lg:text-base">Custom descriptions & pricing</span>
                      </div>
                    </div>

                    {/* Time Estimate */}
                    <div className="bg-gray-50 rounded-lg lg:rounded-2xl p-2 lg:p-4 mb-3 lg:mb-6 text-center">
                      <div className="text-sm lg:text-2xl font-bold text-green-600">FREE</div>
                      <div className="text-xs lg:text-sm text-gray-700">No subscription required</div>
                    </div>

                    {/* Button */}
                    <Button className="w-full h-8 lg:h-12 bg-black hover:bg-gray-900 text-white font-bold text-xs lg:text-lg rounded-md lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Start Manual Entry
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="pt-3 lg:pt-8 text-center border-t border-gray-200 mx-1 lg:mx-0">
                <div className="max-w-3xl mx-auto px-0 lg:px-0">
                  <div className="flex items-center justify-center gap-1 mb-2 lg:mb-4">
                    <span className="text-lg lg:text-2xl">💡</span>
                    <h3 className="text-xs lg:text-lg font-bold text-gray-900">Need Help Choosing?</h3>
                  </div>
                  <p className="text-gray-600 mb-2 lg:mb-6 text-xs lg:text-base leading-tight lg:leading-normal px-2 lg:px-0">
                    <strong>New to land sales?</strong> Choose Smart Map Flow for AI assistance and guided setup.<br/>
                    <strong>Experienced seller?</strong> Manual Entry gives you complete control over every detail.
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-6 max-w-2xl mx-auto bg-white opacity-100 px-2 lg:px-0">
                    <div className="bg-white rounded-md lg:rounded-xl p-1 lg:p-4 border border-blue-200">
                      <div className="text-blue-600 font-bold mb-1 text-xs lg:text-base">Smart Map Flow</div>
                      <div className="text-xs lg:text-sm text-gray-600">Best for first-time sellers</div>
                    </div>
                    <div className="bg-white rounded-md lg:rounded-xl p-1 lg:p-4 border border-gray-200">
                      <div className="text-gray-700 font-bold mb-1 text-xs lg:text-base">Manual Entry</div>
                      <div className="text-xs lg:text-sm text-gray-600">Best for experienced sellers</div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Selected Flow Component
          <div>
            {selectedFlow === 'integrated' && (
              <IntegratedListingFlow
                onSubmit={handleSubmit}
                onClose={handleClose}
                loading={loading}
              />
            )}
            {selectedFlow === 'manual' && (
              <PropertyListingForm
                onSubmit={handleSubmit}
                onClose={handleClose}
                loading={loading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}