import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X, Image as ImageIcon, ArrowLeft, Save, Trash2, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { supabase, Database } from '../lib/supabase';
import { dbHelpers } from '../lib/dbHelpers';
import { useAuth } from '../hooks/useAuth';
import { SEO } from '../components/SEO';

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  size_acres: z.number().min(0.1, 'Size must be at least 0.1 acres'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip_code: z.string().min(5, 'ZIP code is required'),
  county: z.string().optional(),
  apn: z.string().optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;
type Property = Database['public']['Tables']['properties']['Row'];

export function EditProperty() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
      return;
    }
    
    if (id) {
      fetchProperty(id);
    }
  }, [id, user, navigate]);

  const fetchProperty = async (propertyId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching property for edit:', propertyId, 'User ID:', user?.id);
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        if (error.code === 'PGRST116') {
          throw new Error('Property not found or you do not have permission to edit this property');
        }
        throw error;
      }
      
      console.log('Property fetched successfully:', data);
      setProperty(data);
      setImages(data.images || []);
      
      // Populate form with existing data
      form.reset({
        title: data.title,
        description: data.description || '',
        price: data.price,
        size_acres: data.size_acres,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        county: data.county || '',
        apn: data.apn || '',
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      setError(error instanceof Error ? error.message : 'Property not found or access denied');
    } finally {
      setLoading(false);
    }
  };

  // Image upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10
  });

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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

  const handleSubmit = async (data: PropertyForm) => {
    if (!property || !user) return;

    setSaving(true);
    setError(null);

    try {
      // Geocode the address if it changed
      let coordinates = { lat: property.latitude, lng: property.longitude };
      const addressChanged = 
        data.address !== property.address || 
        data.city !== property.city || 
        data.state !== property.state;

      if (addressChanged) {
        const newCoordinates = await geocodeAddress(data.address, data.city, data.state);
        if (newCoordinates) {
          coordinates = newCoordinates;
        }
      }

      const updateData = {
        ...data,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        images: images.length > 0 ? images : [
          'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        updated_at: new Date().toISOString(),
      };

      const { error } = await dbHelpers.properties.update(property.id, updateData);

      if (error) throw error;

      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!property || !user) return;

    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      const { error } = await dbHelpers.properties.delete(property.id, user.id);

      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    <SEO slug="edit-property" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading property...</div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Edit Property</h1>
              <p className="text-gray-600">Update your property listing details</p>
            </div>
          </div>
          
          <Button
            onClick={handleDelete}
            disabled={deleteLoading}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400"
          >
            {deleteLoading ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete Property
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
                {error}
              </div>
            )}

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Image Management Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Property Images</h3>
                </div>
                
                {/* Current Images */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg shadow-md"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Image Upload */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    {isDragActive ? (
                      <p className="text-blue-600 font-semibold text-lg">Drop the images here...</p>
                    ) : (
                      <div>
                        <p className="text-gray-700 font-semibold text-lg mb-2">
                          Add more images
                        </p>
                        <p className="text-gray-500">
                          Drag & drop images here, or click to select
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📋</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Property Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Property Title *
                    </label>
                    <Input
                      {...form.register('title')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.title && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Property Description *
                    </label>
                    <textarea
                      {...form.register('description')}
                      className="w-full min-h-[120px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 resize-none"
                    />
                    {form.formState.errors.description && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Price ($) *
                    </label>
                    <Input
                      {...form.register('price', { valueAsNumber: true })}
                      type="number"
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.price && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Size (acres) *
                    </label>
                    <Input
                      {...form.register('size_acres', { valueAsNumber: true })}
                      type="number"
                      step="0.001"
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.size_acres && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.size_acres.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">📍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Location Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Street Address *
                    </label>
                    <Input
                      {...form.register('address')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      City *
                    </label>
                    <Input
                      {...form.register('city')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.city && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      State *
                    </label>
                    <Input
                      {...form.register('state')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.state && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      ZIP Code *
                    </label>
                    <Input
                      {...form.register('zip_code')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                    {form.formState.errors.zip_code && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.zip_code.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      County
                    </label>
                    <Input
                      {...form.register('county')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      APN
                    </label>
                    <Input
                      {...form.register('apn')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Link to="/dashboard" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50"
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
                  disabled={saving}
                >
                  {saving ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Changes...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Save className="w-5 h-5" />
                      Save Changes
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}