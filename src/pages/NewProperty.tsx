import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, MapPin, DollarSign, Ruler, Chrome as Home, FileText, Upload, Image as ImageIcon, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AcreageSaleLogo } from '../components/ui/logo';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from '../components/auth/AuthModal';

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  price: z.string().min(1, 'Price is required'),
  acreage: z.string().min(1, 'Acreage is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
});

type PropertyForm = z.infer<typeof propertySchema>;

export function NewProperty() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const form = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
  });

  const handleSubmit = async (data: PropertyForm) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const propertyData = {
        ...data,
        userId: user.id,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      };

      const existingProperties = JSON.parse(localStorage.getItem('new_properties') || '[]');
      existingProperties.unshift(propertyData);
      localStorage.setItem('new_properties', JSON.stringify(existingProperties));

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 5000);
    } catch (err) {
      setError('Failed to submit property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <AcreageSaleLogo />
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <Home className="w-3 h-3 mr-1" />
            List Your Property
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Add New Property Listing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to create your property listing. Our team will review and publish it within 24 hours.
          </p>
        </div>

        {success && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-green-800">
                <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Property submitted successfully!</p>
                  <p className="text-sm text-green-700">Your listing will be reviewed and published within 24 hours.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-800">
                <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title
                </label>
                <Input
                  {...form.register('title')}
                  placeholder="e.g., Beautiful 10-Acre Lot with Mountain Views"
                  className="w-full"
                />
                {form.formState.errors.title && (
                  <p className="text-red-600 text-sm mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Street Address
                  </label>
                  <Input
                    {...form.register('address')}
                    placeholder="123 Main Street"
                    className="w-full"
                  />
                  {form.formState.errors.address && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    {...form.register('city')}
                    placeholder="City"
                    className="w-full"
                  />
                  {form.formState.errors.city && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <Input
                    {...form.register('state')}
                    placeholder="State"
                    className="w-full"
                  />
                  {form.formState.errors.state && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <Input
                    {...form.register('zipCode')}
                    placeholder="12345"
                    className="w-full"
                  />
                  {form.formState.errors.zipCode && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Price
                  </label>
                  <Input
                    {...form.register('price')}
                    type="number"
                    placeholder="250000"
                    className="w-full"
                  />
                  {form.formState.errors.price && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Ruler className="w-4 h-4 inline mr-1" />
                    Acreage
                  </label>
                  <Input
                    {...form.register('acreage')}
                    type="number"
                    step="0.01"
                    placeholder="10.5"
                    className="w-full"
                  />
                  {form.formState.errors.acreage && (
                    <p className="text-red-600 text-sm mt-1">{form.formState.errors.acreage.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Description
                </label>
                <textarea
                  {...form.register('description')}
                  rows={6}
                  placeholder="Describe your property, including features, amenities, and any important details..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {form.formState.errors.description && (
                  <p className="text-red-600 text-sm mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Property Listing
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Easy Submission</h3>
                <p className="text-sm text-gray-600">
                  Simple form to get your property listed quickly
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Review</h3>
                <p className="text-sm text-gray-600">
                  We review and publish within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Maximum Exposure</h3>
                <p className="text-sm text-gray-600">
                  Reach thousands of potential buyers
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
    );
}
