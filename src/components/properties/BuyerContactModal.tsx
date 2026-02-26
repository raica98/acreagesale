import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, User, Mail, Phone, MessageCircle, Send, MapPin, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Database } from '../../lib/supabase';

type Property = Database['public']['Tables']['properties']['Row'];

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  offerAmount: z.number().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

interface BuyerContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  ownerPhone?: string;
}

export function BuyerContactModal({ isOpen, onClose, property, ownerPhone }: BuyerContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: `Hi! I'm interested in your ${property.size_acres}-acre property in ${property.city}, ${property.state}. Could we discuss the details?`,
      offerAmount: property.price,
    },
  });

  const handleSubmit = async (data: ContactForm) => {
    setLoading(true);
    setError(null);

    try {
      // Save message to localStorage for the property owner's inbox
      const message = {
        id: Date.now().toString(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyPrice: property.price,
        propertyLocation: `${property.city}, ${property.state}`,
        buyerName: data.fullName,
        buyerEmail: data.email,
        buyerPhone: data.phone,
        message: data.message,
        offerAmount: data.offerAmount,
        timestamp: new Date().toISOString(),
        isRead: false
      };

      // Get existing messages for this property owner
      const inboxKey = `inbox_${property.user_id}`;
      const existingMessages = JSON.parse(localStorage.getItem(inboxKey) || '[]');
      
      // Add new message
      existingMessages.unshift(message);
      
      // Save back to localStorage
      localStorage.setItem(inboxKey, JSON.stringify(existingMessages));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
        form.reset();
      }, 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent to the property owner. They will contact you soon at the provided phone number or email.
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
            Contact Property Owner
          </CardTitle>
          <p className="text-white/90 mt-2">
            Send a message about this property
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
              <h4 className="text-lg font-semibold text-gray-900">Your Contact Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...form.register('fullName')}
                      placeholder="Your full name"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                    />
                  </div>
                  {form.formState.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.fullName.message}
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
                      {...form.register('phone')}
                      placeholder="Your phone number"
                      className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                    />
                  </div>
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.phone.message}
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
                    {...form.register('email')}
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 h-12 border-2 border-gray-200 rounded-xl focus:border-[#329DF9]"
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Offer Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Offer (Optional)
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
              <p className="text-gray-500 text-sm mt-1">
                Leave blank if you want to discuss pricing
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  {...form.register('message')}
                  placeholder="Tell the owner about your interest in this property..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#329DF9] resize-none h-32"
                />
              </div>
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            {/* Owner Contact Info */}
            {ownerPhone && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Property Owner Contact</h4>
                <div className="flex items-center text-blue-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">{ownerPhone}</span>
                </div>
                <p className="text-blue-600 text-sm mt-2">
                  You can also call directly for immediate response
                </p>
              </div>
            )}

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
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
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