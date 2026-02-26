import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X, Image as ImageIcon, ArrowLeft, Save, Trash2, Plus, Chrome as Home, User, LogOut, MapPin, DollarSign, FileText, Building, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AcreageSaleLogo } from '../components/ui/logo';
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
  status: z.enum(['active', 'pending', 'sold']),
  zoning: z.string().optional(),
  water: z.string().optional(),
  electricity: z.string().optional(),
  sewer: z.string().optional(),
});

type PropertyForm = z.infer<typeof propertySchema>;
type Property = Database['public']['Tables']['properties']['Row'];

export function DashboardEditListing() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    if (!user) {
      navigate('/dashboard', { replace: true });
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
        status: data.status as 'active' | 'pending' | 'sold',
        zoning: data.zoning || '',
        water: data.water || '',
        electricity: data.electricity || '',
        sewer: data.sewer || '',
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
    setSuccess(null);

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

      setSuccess('Property updated successfully!');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  // Simple form update handler for direct property updates
  const handlePropertyUpdate = (field: string, value: any) => {
    if (property) {
      setProperty(prev => prev ? { ...prev, [field]: value } : null);
      // Also update the form
      form.setValue(field as any, value);
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
      setError('Failed to delete property. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    <SEO slug="dashboard-edit-listing" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="p-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Acreage Sale</span>
            </Link>
          </div>
          
          <nav className="mt-8">
            <Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-semibold text-gray-700">Loading property...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="p-6">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Acreage Sale</span>
            </Link>
          </div>
          
          <nav className="mt-8">
            <Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Acreage Sale</span>
          </Link>
        </div>
        
        <nav className="mt-8 flex-1">
          <Link to="/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <div className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-2 border-blue-600">
            <FileText className="w-5 h-5 mr-3" />
            Edit Listing
          </div>
        </nav>

        {/* User section */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[150px]">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
                <p className="text-gray-600">Update your property listing details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Form Card */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Image Management Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Featured Images</h3>
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

              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Listing Title *
                    </label>
                    <Input
                      {...form.register('title')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                      placeholder="e.g., Beautiful 5-Acre Ranch in Colorado"
                    />
                    {form.formState.errors.title && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Description *
                    </label>
                    <textarea
                      {...form.register('description')}
                      className="w-full min-h-[120px] px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 resize-none"
                      placeholder="Describe the property features, location benefits, and potential uses..."
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
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        {...form.register('price', { valueAsNumber: true })}
                        type="number"
                        className="w-full h-12 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                        placeholder="75000"
                      />
                    </div>
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
                      placeholder="5.25"
                    />
                    {form.formState.errors.size_acres && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.size_acres.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Status *
                    </label>
                    <select
                      {...form.register('status')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 px-4 text-gray-700"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                    </select>
                    {form.formState.errors.status && (
                      <p className="text-red-600 text-sm mt-2">
                        {form.formState.errors.status.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
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
                      placeholder="1234 Mountain View Road"
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
                      placeholder="Denver"
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
                      placeholder="Colorado"
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
                      placeholder="80202"
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
                      placeholder="Jefferson County"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      APN
                    </label>
                    <Input
                      {...form.register('apn')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                      placeholder="123-456-789"
                    />
                  </div>
                </div>
              </div>

              {/* Utilities Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Utilities & Zoning</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Zoning
                    </label>
                    <Input
                      {...form.register('zoning')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
                      placeholder="e.g., Residential, Agricultural, Mixed Use"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Water
                    </label>
                    <select
                      {...form.register('water')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 px-4 text-gray-700"
                    >
                      <option value="">Select Water Access</option>
                      <option value="City Water">City Water</option>
                      <option value="Well">Well</option>
                      <option value="None">None</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Electricity
                    </label>
                    <select
                      {...form.register('electricity')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 px-4 text-gray-700"
                    >
                      <option value="">Select Electricity Access</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                      <option value="Nearby">Nearby</option>
                      <option value="Solar">Solar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-3">
                      Sewer
                    </label>
                    <select
                      {...form.register('sewer')}
                      className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 px-4 text-gray-700"
                    >
                      <option value="">Select Sewer Access</option>
                      <option value="City Sewer">City Sewer</option>
                      <option value="Septic">Septic</option>
                      <option value="None">None</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <div className="flex gap-4 flex-1">
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
                  {property && (
                    <Link to={`/property/${property.id}`} className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                        disabled={saving}
                      >
                        View Listing
                      </Button>
                    </Link>
                  )}
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

                {/* Delete Button */}
                <Button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  variant="outline"
                  className="h-12 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400 font-bold px-6"
                >
                  {deleteLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Listing
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