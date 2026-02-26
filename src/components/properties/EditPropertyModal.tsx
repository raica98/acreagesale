import React, { useEffect, useState, useCallback } from 'react';
import { X, Upload, Image as ImageIcon, Save, MapPin, DollarSign, Building, Trash2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { supabase, Database } from '../../lib/supabase';
import { dbHelpers } from '../../lib/dbHelpers';

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
  status: z.enum(['active', 'pending', 'sold']),
  zoning: z.string().optional(),
  water: z.string().optional(),
  electricity: z.string().optional(),
  sewer: z.string().optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;
type Property = Database['public']['Tables']['properties']['Row'];

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  onSuccess?: () => void;
}

export function EditPropertyModal({ isOpen, onClose, propertyId, onSuccess }: EditPropertyModalProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    if (isOpen && propertyId) {
      fetchProperty();
    }
  }, [isOpen, propertyId]);

  const fetchProperty = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();

      if (error) throw error;

      setProperty(data);
      setImages(data.images || []);

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
        status: data.status as 'active' | 'pending' | 'sold',
        zoning: data.zoning || '',
        water: data.water || '',
        electricity: data.electricity || '',
        sewer: data.sewer || '',
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

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
    if (!property) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
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

      setSuccess('Property updated successfully!');

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Edit Property</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3">
                  <span className="font-medium">{success}</span>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Images Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-bold text-gray-800">Property Images</h3>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Property ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
                          >
                            <X className="w-5 h-5 font-bold" strokeWidth={3} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                      isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {isDragActive ? 'Drop images here' : 'Drag images or click to upload'}
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <Input {...form.register('title')} className="w-full" />
                    {form.formState.errors.title && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      {...form.register('description')}
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {form.formState.errors.description && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.description.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                      <Input
                        {...form.register('price', { valueAsNumber: true })}
                        type="number"
                        className="w-full"
                      />
                      {form.formState.errors.price && (
                        <p className="text-red-600 text-sm mt-1">{form.formState.errors.price.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Size (acres) *</label>
                      <Input
                        {...form.register('size_acres', { valueAsNumber: true })}
                        type="number"
                        step="0.001"
                        className="w-full"
                      />
                      {form.formState.errors.size_acres && (
                        <p className="text-red-600 text-sm mt-1">{form.formState.errors.size_acres.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                      <select
                        {...form.register('status')}
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Location</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <Input {...form.register('address')} className="w-full" />
                    {form.formState.errors.address && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <Input {...form.register('city')} className="w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <Input {...form.register('state')} className="w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                      <Input {...form.register('zip_code')} className="w-full" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
                      <Input {...form.register('county')} className="w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">APN</label>
                    <Input {...form.register('apn')} className="w-full" />
                  </div>
                </div>

                {/* Utilities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Utilities & Zoning</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Zoning</label>
                      <Input
                        {...form.register('zoning')}
                        placeholder="e.g., Residential, Agricultural"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Water</label>
                      <select
                        {...form.register('water')}
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Water Access</option>
                        <option value="City Water">City Water</option>
                        <option value="Well">Well</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Electricity</label>
                      <select
                        {...form.register('electricity')}
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Electricity</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                        <option value="Nearby">Nearby</option>
                        <option value="Solar">Solar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sewer</label>
                      <select
                        {...form.register('sewer')}
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Sewer</option>
                        <option value="City Sewer">City Sewer</option>
                        <option value="Septic">Septic</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={saving}
                  >
                    {saving ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
