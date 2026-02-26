import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, User, Mail, Phone, Clock, MapPin, DollarSign, Eye, Trash2, Check, X, Calendar } from 'lucide-react';
import { AcreageSaleLogo } from '../components/ui/logo';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { supabase, Database } from '../lib/supabase';
import { SEO } from '../components/SEO';

// Retry mechanism for database operations
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);
      
      // Handle network errors specifically
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        console.warn(`Network error on attempt ${attempt}/${maxRetries}. Retrying...`);
      }
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
}

type Offer = Database['public']['Tables']['offers']['Row'] & {
  property: {
    title: string;
    price: number;
    city: string;
    state: string;
  };
};

export function DashboardInbox() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Debug logging
  console.log('🔍 DEBUG: DashboardInbox component mounted');
  console.log('🔍 DEBUG: Current user in inbox:', user?.id);
  console.log('🔍 DEBUG: Current pathname:', window.location.pathname);
  
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [updatingOffer, setUpdatingOffer] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Accepted' | 'Declined'>('all');

  useEffect(() => {
    console.log('🔍 DEBUG: DashboardInbox useEffect triggered');
    console.log('🔍 DEBUG: User state:', user);
    console.log('🔍 DEBUG: Auth loading:', authLoading);

    // Don't redirect immediately - wait for auth to initialize
    if (!user && !authLoading) {
      console.log('🔍 DEBUG: No user found after auth loaded, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
      return;
    }

    if (user) {
      console.log('🔍 DEBUG: User found, fetching offers');
      fetchOffers();
    }
  }, [user, authLoading, navigate]);

  const fetchOffers = async () => {
    if (!user) {
      console.log('🔍 DEBUG: fetchOffers called but no user');
      return;
    }

    console.log('🔍 DEBUG: Starting fetchOffers for user:', user.id);
    setLoading(true);
    setFetchError(null);

    try {
      // Check if Supabase client is properly configured
      if (!supabase || !supabase.rest) {
        throw new Error('Supabase client is not properly configured');
      }

      // First, get offers without the join to avoid resource issues - with retry
      console.log('🔍 DEBUG: Querying offers for owner_id:', user.id);
      const { data: offersData, error: offersError } = await retryOperation(async () => {
        return await supabase
          .from('offers')
          .select('*')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false });
      }, 5, 2000); // Increase retries and delay for network issues

      console.log('🔍 DEBUG: Offers query result:', { offersData, offersError });
        
      if (offersError) {
        if (offersError.code === 'PGRST116' || offersError.message?.includes('relation "offers" does not exist')) {
          throw new Error('The offers table does not exist. Please run the database migration first.');
        } else if (offersError.code === '42501' || offersError.message?.includes('permission denied')) {
          throw new Error('Permission denied. Please check your database policies.');
        } else {
          throw new Error(`Database error: ${offersError.message}`);
        }
      }

      // If we have offers, fetch property details separately to avoid join issues
      const transformedOffers = [];
      
      if (offersData && offersData.length > 0) {
        for (const offer of offersData) {
          try {
            // Fetch property details separately - with retry
            const { data: propertyData, error: propertyError } = await retryOperation(async () => {
              return await supabase
                .from('properties')
                .select('title, price, city, state')
                .eq('id', offer.property_id)
                .single();
            }, 3, 1500);
            
            if (propertyError) {
              console.warn(`Could not fetch property ${offer.property_id}:`, propertyError);
              // Use fallback data if property fetch fails
              transformedOffers.push({
                ...offer,
                property: {
                  title: 'Property Details Unavailable',
                  price: 0,
                  city: 'Unknown',
                  state: 'Unknown'
                }
              });
            } else {
              transformedOffers.push({
                ...offer,
                property: propertyData
              });
            }
          } catch (propertyFetchError) {
            console.warn(`Error fetching property ${offer.property_id}:`, propertyFetchError);
            // Use fallback data
            transformedOffers.push({
              ...offer,
              property: {
                title: 'Property Details Unavailable',
                price: 0,
                city: 'Unknown',
                state: 'Unknown'
              }
            });
          }
        }
      }

      console.log('🔍 DEBUG: Final transformed offers:', transformedOffers.length, 'offers');
      setOffers(transformedOffers);
    } catch (error) {
      console.error('❌ ERROR in fetchOffers:', error);
      
      if (error.name === 'AbortError') {
        setFetchError('Request was cancelled. Please try again.');
      } else if (error.message === 'Failed to fetch' || error instanceof TypeError) {
        setFetchError('Network connection failed. Please check your internet connection, disable any ad-blockers, and try again. If the problem persists, the Supabase service may be temporarily unavailable.');
      } else if (error.message?.includes('Supabase client is not properly configured')) {
        setFetchError('Database configuration error. Please check your environment variables and restart the development server.');
      } else if (error.message?.includes('offers table does not exist')) {
        setFetchError('Database setup incomplete. The offers table needs to be created.');
      } else if (error.message?.includes('Permission denied')) {
        setFetchError('Database permission error. Please check your database policies.');
      } else {
        setFetchError(`Error: ${error.message || 'Unknown error occurred'}. Please try again.`);
      }
      
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOfferStatus = async (offerId: string, status: 'Accepted' | 'Declined') => {
    setUpdatingOffer(offerId);
    try {
      const { error } = await supabase
        .from('offers')
        .update({ status })
        .eq('id', offerId)
        .eq('owner_id', user?.id);

      if (error) throw error;

      // Find the offer to get details for email
      const offer = offers.find(o => o.id === offerId);

      if (offer) {
        // Send email notification to buyer
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-offer-decision-email`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                to: offer.buyer_email,
                buyerName: offer.buyer_name,
                propertyTitle: offer.property.title,
                propertyApn: 'N/A',
                originalOffer: Number(offer.offer_amount),
                decision: status.toLowerCase(),
                sellerContact: user?.email || 'seller@acreagesales.com',
              }),
            }
          );

          if (!response.ok) {
            console.error('Failed to send email notification:', await response.text());
          } else {
            console.log('Email notification sent successfully');
          }
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
        }
      }

      // Update local state
      setOffers(prev => prev.map(offer =>
        offer.id === offerId ? { ...offer, status } : offer
      ));

      if (selectedOffer?.id === offerId) {
        setSelectedOffer(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Error updating offer status:', error);
      alert('Failed to update offer status. Please try again.');
    } finally {
      setUpdatingOffer(null);
    }
  };

  const deleteOffer = async (offerId: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', offerId)
        .eq('owner_id', user?.id);

      if (error) throw error;

      setOffers(prev => prev.filter(offer => offer.id !== offerId));
      if (selectedOffer?.id === offerId) {
        setSelectedOffer(null);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Failed to delete offer. Please try again.');
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

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const offerTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - offerTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return offerTime.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const pendingCount = offers.filter(offer => offer.status === 'Pending').length;
  const acceptedCount = offers.filter(offer => offer.status === 'Accepted').length;
  const declinedCount = offers.filter(offer => offer.status === 'Declined').length;

  const filteredOffers = filterStatus === 'all'
    ? offers
    : offers.filter(offer => offer.status === filterStatus);

  // Show loading while auth is initializing
  if (authLoading) {
    <SEO slug="dashboard-inbox" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Initializing...</div>
        </div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-700">Redirecting...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading offers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16 lg:pt-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 lg:py-6 gap-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <AcreageSaleLogo className="w-32 lg:w-40" />
              </Link>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link to="/properties" className="text-gray-500 hover:text-gray-900">Properties</Link>
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-900">Dashboard</Link>
              <span className="text-blue-600 font-medium">Inbox</span>
            </nav>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{user?.email}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm px-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
                <span className="lg:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
                Property Offers
                {pendingCount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {pendingCount} pending
                  </Badge>
                )}
              </h1>
              <p className="mt-2 text-sm lg:text-base text-gray-600">Manage offers from potential buyers on your properties</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Offers List */}
          <div className="w-full lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">
                  Offers ({offers.length})
                </CardTitle>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                    className={filterStatus === 'all' ? 'bg-black hover:bg-gray-800' : ''}
                  >
                    All ({offers.length})
                  </Button>
                  <Button
                    variant={filterStatus === 'Pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('Pending')}
                    className={filterStatus === 'Pending' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                  >
                    Pending ({pendingCount})
                  </Button>
                  <Button
                    variant={filterStatus === 'Accepted' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('Accepted')}
                    className={filterStatus === 'Accepted' ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    Accepted ({acceptedCount})
                  </Button>
                  <Button
                    variant={filterStatus === 'Declined' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('Declined')}
                    className={filterStatus === 'Declined' ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                    Declined ({declinedCount})
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredOffers.length === 0 ? (
                  <div className="text-center py-12">
                    {fetchError ? (
                      <>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <X className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Offers</h3>
                        <p className="text-red-600 mb-4 whitespace-pre-line">{fetchError}</p>
                        <Button onClick={fetchOffers} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                          Try Again
                        </Button>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {filterStatus === 'all' ? 'No offers yet' : `No ${filterStatus.toLowerCase()} offers`}
                        </h3>
                        <p className="text-gray-500">
                          {filterStatus === 'all' ? 'Buyer offers will appear here' : `No offers with ${filterStatus.toLowerCase()} status`}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-0">
                    {filteredOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedOffer?.id === offer.id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => setSelectedOffer(offer)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{offer.buyer_name}</h3>
                            <Badge className={getStatusColor(offer.status)}>
                              {offer.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500">{formatTimeAgo(offer.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{offer.property.title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-green-600">
                            ${offer.offer_amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {offer.property.city}, {offer.property.state}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Offer Detail */}
          <div className="w-full lg:w-2/3">
            {selectedOffer ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      Offer Details
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedOffer.status)}>
                        {selectedOffer.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteOffer(selectedOffer.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Property Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Property</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Property:</span>
                        <p className="font-medium">
                          <Link 
                            to={`/property/${selectedOffer.property_id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {selectedOffer.property.title}
                          </Link>
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Location:</span>
                        <p className="font-medium">{selectedOffer.property.city}, {selectedOffer.property.state}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Listed Price:</span>
                        <p className="font-medium text-green-600">${selectedOffer.property.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Offer Amount:</span>
                        <p className="font-medium text-blue-600">${selectedOffer.offer_amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Buyer Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Buyer Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Name:</span>
                          <p className="font-medium">{selectedOffer.buyer_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Email:</span>
                          <p className="font-medium">
                            <a href={`mailto:${selectedOffer.buyer_email}`} className="text-blue-600 hover:underline">
                              {selectedOffer.buyer_email}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Phone:</span>
                          <p className="font-medium">
                            <a href={`tel:${selectedOffer.buyer_phone}`} className="text-blue-600 hover:underline">
                              {selectedOffer.buyer_phone}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Timeline:</span>
                          <p className="font-medium">{selectedOffer.timeline || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-600">Received:</span>
                          <p className="font-medium">{new Date(selectedOffer.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedOffer.status === 'Pending' && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => updateOfferStatus(selectedOffer.id, 'Accepted')}
                        disabled={updatingOffer === selectedOffer.id}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        {updatingOffer === selectedOffer.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <Check className="w-4 h-4 mr-2" />
                        )}
                        Accept Offer
                      </Button>
                      <Button
                        onClick={() => updateOfferStatus(selectedOffer.id, 'Declined')}
                        disabled={updatingOffer === selectedOffer.id}
                        variant="outline"
                        className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                      >
                        {updatingOffer === selectedOffer.id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                        ) : (
                          <X className="w-4 h-4 mr-2" />
                        )}
                        Decline Offer
                      </Button>
                    </div>
                  )}

                  {/* Offer History */}
                  {(selectedOffer.status === 'Accepted' || selectedOffer.status === 'Declined') && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Offer History</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Offer Received</p>
                            <p className="text-gray-500">{new Date(selectedOffer.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <div className={`w-2 h-2 rounded-full mt-1.5 ${
                            selectedOffer.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Offer {selectedOffer.status}</p>
                            <p className="text-gray-500">Status updated</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <a
                      href={`mailto:${selectedOffer.buyer_email}?subject=Re: Offer for ${selectedOffer.property.title}&body=Hi ${selectedOffer.buyer_name},%0D%0A%0D%0AThank you for your offer on "${selectedOffer.property.title}".%0D%0A%0D%0A`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </Button>
                    </a>
                    <a
                      href={`tel:${selectedOffer.buyer_phone}`}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Buyer
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select an offer</h3>
                    <p className="text-gray-500">Choose an offer from the list to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}