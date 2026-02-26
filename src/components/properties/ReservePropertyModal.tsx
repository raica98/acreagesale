import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, User, Mail, Phone, DollarSign, Calendar, Send, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database, supabase } from '../../lib/supabase';

type Property = Database['public']['Tables']['properties']['Row'];

const offerSchema = z.object({
  buyerName: z.string().min(2, 'Full name must be at least 2 characters'),
  buyerEmail: z.string().email('Invalid email address'),
  buyerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  offerAmount: z.number().min(1, 'Offer amount must be greater than 0'),
  timeline: z.string().optional(),
});

type OfferForm = z.infer<typeof offerSchema>;

interface ReservePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function ReservePropertyModal({ isOpen, onClose, property }: ReservePropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<OfferForm>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      offerAmount: property.price,
      timeline: '30 days',
    },
  });

  const handleSubmit = async (data: OfferForm) => {
    setLoading(true);
    setError(null);

    try {
      // Insert offer into database
      const { error: insertError } = await supabase
        .from('offers')
        .insert({
          property_id: property.id,
          owner_id: property.user_id,
          buyer_name: data.buyerName,
          buyer_email: data.buyerEmail,
          buyer_phone: data.buyerPhone,
          offer_amount: data.offerAmount,
          timeline: data.timeline,
          status: 'Pending'
        });

      if (insertError) throw insertError;

      setSuccess(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
        form.reset();
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit offer. Please try again.');
    } finally {
      setLoading(false);
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

  if (success) {
    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden"
        onClick={onClose}
      >
        <Card className="w-full max-w-md bg-white shadow-2xl border-0 rounded-2xl" onClick={(e) => e.stopPropagation()}>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Offer Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Your offer has been sent to the property owner. They will review it and contact you soon.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-700 text-sm font-medium">
                Expected response time: 24-48 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden"
      onClick={onClose}
    >
      <Card className="w-full max-w-2xl bg-white shadow-2xl border-0 rounded-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="relative bg-gradient-to-r from-[#329DF9] to-blue-600 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <CardTitle className="text-2xl font-bold pr-12">
            Reserve Property
          </CardTitle>
          <p className="text-white/90 mt-2">
            Submit your offer for this property
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Property Summary */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start gap-4">
              {property.images[0] && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.city}, {property.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-bold">${property.price.toLocaleString()}</span>
                  </div>
                  <span className="text-sm text-gray-600">{property.size_acres} acres</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Your Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...form.register('buyerName')}
                      placeholder="Your full name"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                    />
                  </div>
                  {form.formState.errors.buyerName && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.buyerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...form.register('buyerPhone')}
                      placeholder="Your phone number"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                    />
                  </div>
                  {form.formState.errors.buyerPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.buyerPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    {...form.register('buyerEmail')}
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                  />
                </div>
                {form.formState.errors.buyerEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.buyerEmail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Offer Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Offer Details</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Offer Amount *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...form.register('offerAmount', { valueAsNumber: true })}
                      type="number"
                      placeholder="Enter your offer amount"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                    />
                  </div>
                  {form.formState.errors.offerAmount && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.offerAmount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...form.register('timeline')}
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9] w-full text-gray-700"
                    >
                      <option value="ASAP">As soon as possible</option>
                      <option value="30 days">Within 30 days</option>
                      <option value="60 days">Within 60 days</option>
                      <option value="90 days">Within 90 days</option>
                      <option value="6 months">Within 6 months</option>
                      <option value="1 year">Within 1 year</option>
                      <option value="Flexible">Flexible timeline</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Offer Comparison */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Offer Summary</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-blue-700 text-sm">Listed Price:</span>
                  <p className="font-bold text-blue-900">${property.price.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-blue-700 text-sm">Your Offer:</span>
                  <p className="font-bold text-blue-900">
                    ${form.watch('offerAmount')?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
              {form.watch('offerAmount') && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <span className="text-blue-700 text-sm">Difference:</span>
                  <p className={`font-bold ${
                    form.watch('offerAmount') >= property.price 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {form.watch('offerAmount') >= property.price ? '+' : ''}
                    ${(form.watch('offerAmount') - property.price).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-[#329DF9] to-blue-600 hover:from-blue-600 hover:to-[#329DF9] text-white font-medium shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Offer
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}