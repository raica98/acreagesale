import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, User, Phone, Mail, Save, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

const profileSchema = z.object({
  disclaimer: z.string().optional(),
  phone: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: '',
      disclaimer: '',
    },
  });

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      form.reset({
        phone: user.user_metadata?.phone || '949-767-8885',
        disclaimer: user.user_metadata?.disclaimer || '',
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, user, form]);

  const handleSubmit = async (data: ProfileForm) => {
    if (!user) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Update auth user metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          phone: data.phone,
          disclaimer: data.disclaimer,
        }
      });

      if (authError) throw authError;

      // Upsert profile in database (update if exists, insert if not)
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          phone: data.phone,
          disclaimer: data.disclaimer,
        }, {
          onConflict: 'id'
        })

      if (profileError) throw profileError;

      setSuccess('Profile updated successfully!');
      
      // Auto-hide success message and close modal after 2 seconds
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden"
      onClick={onClose}
    >
      <Card className="w-full max-w-md bg-white shadow-2xl border-0 rounded-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            disabled={loading}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          <CardTitle className="text-center text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="font-medium">{success}</span>
            </div>
          )}

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  value={user?.user_metadata?.full_name || ''}
                  className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 w-full bg-gray-50"
                  placeholder="Your full name"
                  disabled
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Name cannot be changed here
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  value={user?.email || ''}
                  className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 w-full bg-gray-50"
                  placeholder="Your email address"
                  disabled
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Email cannot be changed here
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...form.register("phone")}
                  className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 w-full"
                  placeholder="Enter your phone number"
                />
              </div>
              {form.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1 pl-12">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Disclaimer */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3">
                Disclaimer Text
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  {...form.register('disclaimer')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 resize-none h-20"
                  placeholder="Enter disclaimer text that will appear on all your property listings"
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                This disclaimer will appear below the description on all your property listings
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl border border-gray-300"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-[#329cf9] hover:bg-[#2563eb] text-white font-bold shadow-lg hover:shadow-xl transition-all rounded-xl border-0"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
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
  );
}