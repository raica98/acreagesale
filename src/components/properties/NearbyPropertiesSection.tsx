import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Ruler, Eye, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabase, Database } from '../../lib/supabase';
import { dbHelpers } from '../../lib/dbHelpers';
import { useAuth } from '../../hooks/useAuth';

type Property = Database['public']['Tables']['properties']['Row'];

interface NearbyPropertiesSectionProps {
  currentProperty: Property;
}

// Function to calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export function NearbyPropertiesSection({ currentProperty }: NearbyPropertiesSectionProps) {
  const { user } = useAuth();
  const [nearbyProperties, setNearbyProperties] = useState<(Property & { distance: number })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyProperties();
  }, [currentProperty]);

  const fetchNearbyProperties = async () => {
    if (!currentProperty.latitude || !currentProperty.longitude) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Calculate bounding box for 5 mile radius (approximately 0.072 degrees)
      const radiusDegrees = 0.072; // Roughly 5 miles in degrees
      const minLat = currentProperty.latitude - radiusDegrees;
      const maxLat = currentProperty.latitude + radiusDegrees;
      const minLng = currentProperty.longitude - radiusDegrees;
      const maxLng = currentProperty.longitude + radiusDegrees;
      
      const { data, error } = await supabase
        .from('properties')
        .select('id,title,price,size_acres,city,state,county,images,latitude,longitude,status')
        .eq('status', 'active')
        .neq('id', currentProperty.id)
        .gte('latitude', minLat)
        .lte('latitude', maxLat)
        .gte('longitude', minLng)
        .lte('longitude', maxLng)
        .limit(50); // Reduced limit to prevent timeout

      if (error) throw error;

      // Calculate distances and filter properties within 3 miles
      const propertiesWithDistance = data
        .filter(property => property.latitude && property.longitude)
        .map(property => ({
          ...property,
          distance: calculateDistance(
            currentProperty.latitude!,
            currentProperty.longitude!,
            property.latitude!,
            property.longitude!
          )
        }))
        .filter(property => property.distance <= 5) // Within 5 miles
        .sort((a, b) => a.distance - b.distance) // Sort by distance
        .slice(0, 6); // Limit to 6 properties

      setNearbyProperties(propertiesWithDistance);
    } catch (error) {
      console.error('Error fetching nearby properties:', error);
      setNearbyProperties([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="max-w-[1423px] mx-auto px-6 py-16">
        <h2 className="text-[36px] font-normal text-center text-[#010101] mb-12 font-serif">
          Nearby Properties
        </h2>
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#329DF9] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (nearbyProperties.length === 0) {
    return (
      <section className="max-w-[1423px] mx-auto px-6 py-16">
        <h2 className="text-[36px] font-normal text-center text-[#010101] mb-12 font-serif">
          Nearby Properties
        </h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No nearby properties found</h3>
          <p className="text-gray-600">There are currently no properties within 5 miles of this location.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1423px] mx-auto px-6 py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center mb-12">
        <h2 className="text-[36px] font-normal text-[#010101] mb-4 font-serif">
          Nearby Properties
        </h2>
        <p className="text-[#898F97] text-lg max-w-2xl mx-auto">
          Discover other investment opportunities within 3 miles of this property
        </p>
        <div className="w-20 h-1 bg-[#329DF9] rounded-full mx-auto mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nearbyProperties.map((property) => {
          const seed = property.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
          const views = Math.floor((seed % 100) + 50);
          
          return (
            <Card key={property.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  {property.images[0] && (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                        !user ? 'filter blur-[6px]' : ''
                      }`}
                    />
                  )}
                  
                  {/* Blur overlay for non-authenticated users */}
                  {!user && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <span className="text-gray-700 font-medium text-sm">Sign in to view</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Distance badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#329DF9] text-white font-bold shadow-lg">
                      {property.distance.toFixed(1)} mi away
                    </Badge>
                  </div>
                  
                  {/* Views counter */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {views}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-[#010101] mb-2 line-clamp-2 group-hover:text-[#329DF9] transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-[#898F97] mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{property.city}, {property.state}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#329DF9]">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="flex items-center text-[#898F97]">
                      <Ruler className="w-4 h-4 mr-1" />
                      <span className="font-medium">{property.size_acres} AC</span>
                    </div>
                  </div>

                  <Link to={`/property/${property.id}`}>
                    <Button className="w-full bg-gradient-to-r from-[#329DF9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-medium transition-all duration-300 group-hover:shadow-lg">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>

      {nearbyProperties.length >= 6 && (
        <div className="text-center mt-12">
          <Link to={`/properties?search=${encodeURIComponent(`${currentProperty.city}, ${currentProperty.state}`)}`}>
            <Button 
              variant="outline" 
              className="border-[#329DF9] text-[#329DF9] hover:bg-[#329DF9] hover:text-white transition-all duration-300 px-8 py-3 font-semibold"
            >
              View More Properties in {currentProperty.city}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}