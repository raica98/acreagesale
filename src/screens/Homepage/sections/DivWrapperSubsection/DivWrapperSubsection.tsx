import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play, Heart, Share2, MessageCircle } from "lucide-react";
import { supabase, Database } from "../../../../lib/supabase";
import { useAuth } from "../../../../hooks/useAuth";

type Property = Database['public']['Tables']['properties']['Row'];

export const DivWrapperSubsection = (): JSX.Element => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, price, size_acres, city, state, county, apn, images, zip_code')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) {
        console.error('Error fetching properties:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const data = await fetchProperties();
        if (data.length > 0) {
          setProperties(data);
        } else {
          // No properties found in database
          setProperties([]);
        }
      } catch (error) {
        console.error('Failed to load properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Auto-scroll functionality - moves one card at a time
  useEffect(() => {
    if (!isPlaying || properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move one position at a time, loop back to start when reaching end
        const nextIndex = prevIndex + 1;
        return nextIndex >= properties.length ? 0 : nextIndex;
      });
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, [isPlaying, properties.length]);

  const nextProperty = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= properties.length ? 0 : prevIndex + 1
    );
  }, [properties.length]);

  const prevProperty = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? properties.length - 1 : prevIndex - 1
    );
  }, [properties.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch handlers for swipe gestures (left/right)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProperty();
    }
    if (isRightSwipe) {
      prevProperty();
    }
  };


  if (loading) {
    return (
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-serif font-normal text-4xl leading-tight mb-6">
              <span className="text-[#343d42]">Nearby land for </span>
              <span className="text-[#329df9]">sale</span>
            </h2>
            <div className="w-[50px] h-[5px] bg-[#898f97] rounded-[3px]" />
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-serif font-normal text-4xl leading-tight mb-6">
              <span className="text-[#343d42]">Nearby land for </span>
              <span className="text-[#329df9]">sale</span>
            </h2>
            <div className="w-[50px] h-[5px] bg-[#898f97] rounded-[3px]" />
          </div>
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">No properties available at the moment</div>
            <Link to="/properties" className="text-blue hover:underline mt-4 inline-block">
              View all properties
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Get 3 properties to display based on current index
  const getVisibleProperties = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % properties.length;
      visible.push(properties[index]);
    }
    return visible;
  };

  const visibleProperties = getVisibleProperties();

  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-serif font-normal text-4xl leading-tight mb-6">
            <span className="text-black">Nearby land for </span>
            <span className="text-[#329df9]">sale</span>
          </h2>
          <div className="w-[50px] h-[5px] bg-[#898f97] rounded-[3px] mx-auto" />
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevProperty}
            aria-label="Previous property"
            className="min-w-[48px] min-h-[48px] w-12 h-12 bg-white/10 backdrop-blur-sm text-[#329cf9] hover:bg-[#329cf9]/80 hover:text-white rounded-full p-0 border border-[#329cf9]/60 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="sr-only">Go to previous property</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="min-w-[48px] min-h-[48px] w-12 h-12 bg-white/10 backdrop-blur-sm text-[#329cf9] hover:bg-[#329cf9]/80 hover:text-white rounded-full p-0 border border-[#329cf9]/60 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span className="sr-only">{isPlaying ? "Pause automatic slideshow" : "Start automatic slideshow"}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextProperty}
            aria-label="Next property"
            className="min-w-[48px] min-h-[48px] w-12 h-12 bg-white/10 backdrop-blur-sm text-[#329cf9] hover:bg-[#329cf9]/80 hover:text-white rounded-full p-0 border border-[#329cf9]/60 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
            <span className="sr-only">Go to next property</span>
          </Button>
        </div>

        {/* Property Cards Container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
            {visibleProperties.map((property, index) => (
              <div
                key={`${property.id}-${currentIndex}-${index}`}
                className="transform transition-all duration-500 ease-in-out hover:scale-105 relative"
              >
                <Card className="relative h-[500px] overflow-hidden border-0 rounded-2xl bg-black shadow-2xl group cursor-pointer">
                  {/* Background Image */}
                  <img
                    src={property.images[0] || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={property.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      !user ? 'filter blur-[6px]' : ''
                    }`}
                  />
                  
                  {/* Blur overlay for carousel */}
                  {!user && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                        <span className="text-white font-medium text-sm">Sign in to view images</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <CardContent className="p-0 h-full relative flex flex-col justify-between">
                    {/* Top Section - Price */}
                    <div className="p-6 flex justify-between items-start">
                      <div className="bg-blue px-4 py-2 rounded-full shadow-2xl">
                        <div className="text-white text-lg font-bold">
                          $ {property.price.toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Property Index */}
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-sm font-medium">
                          {((currentIndex + index) % properties.length) + 1} / {properties.length}
                        </span>
                      </div>
                    </div>

                    {/* Side Actions */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        className="min-w-[48px] min-h-[48px] w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#329cf9]/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                        aria-label="Add to favorites"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="sr-only">Add this property to your favorites</span>
                      </button>
                      <button 
                        className="min-w-[48px] min-h-[48px] w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#329cf9]/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                        aria-label="Contact seller"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="sr-only">Contact the property seller</span>
                      </button>
                      <button 
                        className="min-w-[48px] min-h-[48px] w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#329cf9]/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                        aria-label="Share property"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="sr-only">Share this property with others</span>
                      </button>
                    </div>

                    {/* Bottom Section - Property Info */}
                    <div className="p-6 bg-black/60 backdrop-blur-sm">
                      <div className="mb-4">
                        <h3 className="font-bold text-white text-xl mb-2 drop-shadow-lg">
                          {property.county || property.city}
                        </h3>
                        <p className="font-medium text-white text-base drop-shadow-lg">
                          {property.city}, {property.state} {property.zip_code}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex gap-6">
                          <div>
                            <div className="font-bold text-white text-sm drop-shadow-lg">
                              Size
                            </div>
                            <div className="font-bold text-white text-base drop-shadow-lg">
                              {property.size_acres} AC
                            </div>
                          </div>
                          {property.apn && (
                            <div>
                             <div className="font-bold text-white text-sm drop-shadow-lg">
                                APN
                              </div>
                              <div className="font-bold text-white text-base drop-shadow-lg">
                                {property.apn}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Link wrapper for all users */}
                  <Link 
                    to={`/property/${property.id}`} 
                    className="absolute inset-0 z-10"
                    aria-label={`View details for ${property.title} in ${property.city}, ${property.state} - $${property.price.toLocaleString()}`}
                  >
                    <span className="sr-only">View property details for {property.title}</span>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to property ${index + 1}`}
              className={`min-w-[44px] min-h-[44px] w-3 h-3 rounded-full transition-all duration-300 flex items-center justify-center ${
                index === currentIndex 
                  ? 'bg-[#329cf9] w-8 shadow-lg border-2 border-blue-400' 
                  : 'bg-white/30 hover:bg-[#329cf9]/60 border-2 border-purple-400/50 hover:border-blue-400/70'
              }`}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link 
            to="/properties"
            className="inline-flex items-center px-8 py-4 min-h-[48px] bg-gradient-to-r from-[#329cf9] to-[#1e40af] text-white font-semibold rounded-full hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            View All Properties
            <span className="sr-only">Browse all available properties</span>
          </Link>
        </div>
      </div>
    </section>
  );
};