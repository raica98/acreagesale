import React, { useState } from 'react';
import { Zap, CreditCard, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAIListingCredits } from '../../hooks/useAIListingCredits';
import { supabase } from '../../lib/supabase';

interface AIListingPaymentGateProps {
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export function AIListingPaymentGate({ onPaymentSuccess, onCancel }: AIListingPaymentGateProps) {
  const { credits, loading: creditsLoading } = useAIListingCredits();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: {
            successUrl: `${window.location.origin}/dashboard?payment=success`,
            cancelUrl: `${window.location.origin}/dashboard?payment=cancelled`
          }
        }
      );

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      if (sessionData?.url) {
        window.location.href = sessionData.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err instanceof Error ? err.message : 'Failed to initiate payment');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-blue-200 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                AI Listing Package Required
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Purchase your first AI-powered listing credit
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {creditsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-block bg-white rounded-xl px-6 py-3 shadow-md">
                    <div className="text-5xl font-bold text-blue-600">$249.99</div>
                    <div className="text-gray-600 mt-1">One-Time Payment</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  1st Month Marketing Plan
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-2">Within 24 Hours:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Send direct mail letters to 100 neighboring properties directing them to your listing
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Launch email blast to local realtors who sold similar properties this year
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Send email blast to known investors in the area
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-2">If You Continue to Month 2:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          Expand campaign with Facebook and Google Ads targeting local buyers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Cancel Anytime</p>
                      <p className="text-gray-700 text-sm">
                        No long-term commitment. Cancel before month 2 with no additional charges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-center">What You Get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">AI-Generated Listing</div>
                      <div className="text-sm text-gray-600">Professional property description</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Satellite Imagery</div>
                      <div className="text-sm text-gray-600">High-resolution aerial photos</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Buyer Outreach</div>
                      <div className="text-sm text-gray-600">Direct mail to 100+ prospects</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Realtor Network</div>
                      <div className="text-sm text-gray-600">Email to local agents</div>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 h-14 text-lg border-2 border-gray-300 hover:bg-gray-100"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePurchase}
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Purchase for $249.99
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Secure payment processed by Stripe. Your credit will be available immediately after purchase.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
