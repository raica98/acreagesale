import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, CircleCheck as CheckCircle, Sparkles, Zap, Star, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';

export function Premium() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { hasAccess, loading: subscriptionLoading, refetch } = useSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');

    if (success === 'true' && sessionId) {
      setShowSuccessMessage(true);
      refetch();

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/premium', { replace: true });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams, refetch, navigate]);

  const handleGetAccess = async () => {
    if (!user) {
      setError('Please sign in to purchase premium access.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session error:', sessionError);
        setError('Session error. Please try signing in again.');
        setIsProcessing(false);
        return;
      }

      if (!sessionData.session?.access_token) {
        console.error('No access token found');
        setError('Authentication required. Please sign in again.');
        setIsProcessing(false);
        return;
      }

      console.log('Making request with user:', user.id);

      const currentUrl = window.location.origin;
      const successUrl = `${currentUrl}/premium?success=true&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${currentUrl}/premium?canceled=true`;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionData.session.access_token}`,
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({
            successUrl,
            cancelUrl,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      console.log('Stripe checkout URL:', url);

      // Open in new window to avoid iframe restrictions
      const stripeWindow = window.open(url, '_blank');

      if (!stripeWindow) {
        // Fallback if popup blocked
        window.location.href = url;
      } else {
        setIsProcessing(false);
        setError('Stripe checkout opened in a new window. Please complete your purchase there.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
      setIsProcessing(false);
    }
  };

  if (subscriptionLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Premium
            </h1>
            <p className="text-xl text-gray-600">
              You have full access to all premium features
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Premium Benefits
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Listings</h3>
                    <p className="text-gray-600">Automatically generate compelling property descriptions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Priority Support</h3>
                    <p className="text-gray-600">Get help faster with dedicated support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                    <p className="text-gray-600">Track performance with detailed insights</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Unlimited Listings</h3>
                    <p className="text-gray-600">List as many properties as you want</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {showSuccessMessage && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">
              Payment successful — your package is now unlocked.
            </p>
          </div>
        )}

        {searchParams.get('canceled') === 'true' && (
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              Payment was canceled. You can try again when ready.
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Lock className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Unlock Premium Features
          </h1>
          <p className="text-xl text-gray-600">
            Get lifetime access for a one-time payment of $249.99
          </p>
        </div>

        <Card className="shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                $249.99
              </div>
              <p className="text-gray-600">One-time payment</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">AI-powered property listing generation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Unlimited property listings</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Advanced analytics and insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Priority customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Lifetime access - no recurring fees</span>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleGetAccess}
              disabled={isProcessing || !user}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-black font-semibold text-lg py-6"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </span>
              ) : !user ? (
                'Sign In to Get Access'
              ) : (
                'Get Access Now'
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment powered by Stripe
            </p>
          </CardContent>
        </Card>

        <div className="text-center text-gray-600">
          <p className="mb-4">Have questions?</p>
          <Button
            variant="outline"
            onClick={() => navigate('/contact')}
            className="mx-auto"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
