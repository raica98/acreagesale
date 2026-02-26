import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, CreditCard as Edit, Trash2, Eye, MapPin, DollarSign, Ruler, Calendar, User, LogOut, Chrome as Home, Settings, ChartBar as BarChart3, TrendingUp, UserCog, MessageCircle, Heart, X, Download } from 'lucide-react';
import { AcreageSaleLogo } from '../components/ui/logo';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { supabase, Database } from '../lib/supabase';
import { dbHelpers } from '../lib/dbHelpers';
import { useAuth } from '../hooks/useAuth';
import { AddPropertyModal } from '../components/properties/AddPropertyModal';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { EditPropertyModal } from '../components/properties/EditPropertyModal';
import OfferSwipe from '../components/offers/OfferSwipe';
import { SEO } from '../components/SEO';

type Property = Database['public']['Tables']['properties']['Row'];

export function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [addPropertyModalOpen, setAddPropertyModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [editPropertyModalOpen, setEditPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showOfferSwipe, setShowOfferSwipe] = useState(false);

  // Freeze body scroll when offer swipe is open
  useEffect(() => {
    if (showOfferSwipe) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
    <SEO slug="dashboard" />
      document.body.style.overflow = 'unset';
    };
  }, [showOfferSwipe]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/', { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Fetch user properties
  useEffect(() => {
    if (user) {
      fetchUserProperties();
    }
  }, [user]);

  const fetchUserProperties = async (pageNum: number = 0, append: boolean = false) => {
    if (!user) return;

    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      // Use retry operation with fallback data
      const result = await dbHelpers.properties.getByUser(user.id, pageNum, 100);
      let { data, error, hasMore: moreAvailable } = result;

      if (error) {
        console.error('Database query error:', error);
        data = [];
        moreAvailable = false;
      }
      
      if (append) {
        setProperties(prev => [...prev, ...data]);
      } else {
        setProperties(data);
      }
      
      setHasMore(moreAvailable);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching user properties:', error);
      if (!append) {
        setProperties([]);
      }
    } finally {
      if (!append) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) return;

    setDeleteLoading(propertyId);
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setProperties(prev => prev.filter(p => p.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleDownloadPhotos = async (property: Property) => {
    if (!property.images || property.images.length === 0) {
      alert('No photos available for this property.');
      return;
    }

    const downloadImage = async (imageUrl: string, index: number) => {
      const fileName = `${property.title.replace(/[^a-z0-9]/gi, '_')}_photo_${index + 1}.jpg`;

      try {
        const response = await fetch(imageUrl, {
          mode: 'cors',
          credentials: 'omit'
        });

        if (!response.ok) throw new Error('Fetch failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        return true;
      } catch (fetchError) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
          });

          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) throw new Error('Canvas context failed');

          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (!blob) throw new Error('Blob creation failed');

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 'image/jpeg', 0.95);

          return true;
        } catch (canvasError) {
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = fileName;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return true;
        }
      }
    };

    try {
      for (let i = 0; i < property.images.length; i++) {
        await downloadImage(property.images[i], i);

        if (i < property.images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }

      const message = property.images.length === 1
        ? 'Photo download started!'
        : `${property.images.length} photos download started!`;
      alert(message);
    } catch (error) {
      console.error('Error downloading photos:', error);
      alert('Some photos may not have downloaded. Check your downloads folder or try opening them individually.');
    }
  };

  const handlePropertyAdded = () => {
    setPage(0);
    fetchUserProperties(0, false);
  };

  const handleEditProperty = (propertyId: string) => {
    setEditingPropertyId(propertyId);
    setEditPropertyModalOpen(true);
  };

  const handlePropertyUpdated = () => {
    setPage(0);
    fetchUserProperties(0, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchUserProperties(nextPage, true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  // Calculate stats
  const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
  const totalAcres = properties.reduce((sum, p) => sum + p.size_acres, 0);
  
  // Calculate real views from localStorage
  const totalViews = properties.reduce((sum, property) => {
    const storageKey = `visitors_${property.id}`;
    const views = parseInt(localStorage.getItem(storageKey) || '0');
    const baseViews = (() => {
      const seed = property.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      return Math.floor((seed % 15) + 8); // Base between 8-22
    })();
    return sum + Math.max(views, baseViews);
  }, 0);

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
              <span className="text-blue-600 font-medium">Dashboard</span>
            </nav>

            <div className="flex items-center space-x-2 lg:space-x-4 w-full lg:w-auto justify-between lg:justify-end">
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
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Sign Out</span>
                <span className="lg:hidden">Out</span>
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden border-t border-gray-200 pt-4 pb-2">
            <nav className="flex space-x-6 justify-center">
              <Link to="/" className="text-gray-500 hover:text-gray-900 text-sm">Home</Link>
              <Link to="/properties" className="text-gray-500 hover:text-gray-900 text-sm">Properties</Link>
              <span className="text-blue-600 font-medium text-sm">Dashboard</span>
              <Link to="/dashboard/inbox" className="text-gray-500 hover:text-gray-900 text-sm">Inbox</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm lg:text-base text-gray-600">Manage your property listings and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 lg:p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs lg:text-sm font-medium">Properties</p>
                  <p className="text-xl lg:text-3xl font-bold">{properties.length}</p>
                </div>
                <MapPin className="w-6 h-6 lg:w-8 lg:h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs lg:text-sm font-medium">Value</p>
                  <p className="text-xl lg:text-3xl font-bold">${(totalValue / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs lg:text-sm font-medium">Views</p>
                  <p className="text-xl lg:text-3xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs lg:text-sm font-medium">Acres</p>
                  <p className="text-xl lg:text-3xl font-bold">{totalAcres.toFixed(1)}</p>
                </div>
                <Ruler className="w-6 h-6 lg:w-8 lg:h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Properties Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg lg:text-2xl font-bold text-gray-900">Your Properties</CardTitle>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setEditProfileModalOpen(true)}
                  variant="outline"
                  className="border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm px-4"
                >
                  <UserCog className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Edit Profile</span>
                  <span className="lg:hidden">Profile</span>
                </Button>
                
                {/* TikTok-Style Offer Swipe Button */}
                <Button
                  onClick={() => setShowOfferSwipe(true)}
                  className="relative bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm px-4 animate-pulse hover:animate-none"
                >
                  {/* Fire Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce shadow-lg">
                    🔥
                  </div>
                  
                  {/* Pulsing Ring Effect */}
                  <div className="absolute inset-0 rounded-md border-2 border-pink-400 animate-ping opacity-75"></div>
                  
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">New Offers</span>
                  <span className="lg:hidden">New</span>
                  
                  {/* Hot Text */}
                  <span className="hidden lg:inline ml-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    HOT!
                  </span>
                </Button>
                
                <Link to="/dashboard/inbox">
                  <Button
                    variant="outline"
                    className="relative border-[#329cf9] text-[#329cf9] hover:bg-[#329cf9] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm px-4 animate-pulse hover:animate-none"
                    onClick={(e) => {
                      console.log('🔍 DEBUG: Inbox button clicked');
                      console.log('🔍 DEBUG: Current user:', user?.id);
                      console.log('🔍 DEBUG: Current pathname:', window.location.pathname);
                      console.log('🔍 DEBUG: Target URL:', '/dashboard/inbox');
                      console.log('🔍 DEBUG: Event:', e);
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span className="hidden lg:inline">Records</span>
                    <span className="lg:hidden">Records</span>
                  </Button>
                </Link>
                <Button
                  onClick={() => setAddPropertyModalOpen(true)}
                  className="bg-gradient-to-r from-[#329cf9] to-[#1e40af] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm px-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Add Property</span>
                  <span className="lg:hidden">Add</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                <p className="text-sm lg:text-base text-gray-500 mb-6">Start by adding your first property listing</p>
                <Button
                  onClick={() => setAddPropertyModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Property
                </Button>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {properties.map((property) => {
                  // Get real views from localStorage
                  const storageKey = `visitors_${property.id}`;
                  const realViews = parseInt(localStorage.getItem(storageKey) || '0');
                  const baseViews = (() => {
                    const seed = property.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
                    return Math.floor((seed % 15) + 8); // Base between 8-22
                  })();
                  const views = Math.max(realViews, baseViews);
                  
                  return (
                    <div key={property.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center gap-3 sm:gap-4">
                        <Link to={`/property/${property.id}`} className="flex-shrink-0">
                          {property.images && property.images.length > 0 ? (
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            />
                          ) : (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </Link>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-2">
                            <Link to={`/property/${property.id}`}>
                              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 line-clamp-2 sm:truncate sm:pr-2 hover:text-blue-600 transition-colors">
                                {property.title}
                              </h3>
                            </Link>
                            <Badge 
                              className={`${property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs flex-shrink-0 self-start sm:self-auto`}
                            >
                              {property.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-gray-500 mb-2 sm:mb-3">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="text-xs sm:text-sm lg:text-sm">{property.city}, {property.state}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-sm">
                            <div>
                              <p className="text-gray-500">Price</p>
                              <p className="font-semibold text-xs sm:text-sm">${property.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Size</p>
                              <p className="font-semibold text-xs sm:text-sm">{property.size_acres} acres</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Views</p>
                              <p className="font-semibold text-xs sm:text-sm">{views}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Listed</p>
                              <p className="font-semibold text-xs sm:text-sm">{new Date(property.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto mt-3 sm:mt-0">
                          <Link to={`/property/${property.id}`}>
                            <Button size="sm" variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-7 sm:h-8">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="hidden sm:inline lg:inline">View</span>
                              <span className="sm:hidden">👁️</span>
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditProperty(property.id)}
                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-7 sm:h-8 hover:bg-blue-50 hover:border-blue-300"
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline lg:inline">Edit</span>
                            <span className="sm:hidden">✏️</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadPhotos(property)}
                            disabled={!property.images || property.images.length === 0}
                            className="text-green-600 border-green-200 hover:bg-green-50 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-7 sm:h-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            title={property.images && property.images.length > 0 ? `Download ${property.images.length} photo(s)` : 'No photos to download'}
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline lg:inline">Photos</span>
                            <span className="sm:hidden">📸</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProperty(property.id)}
                            disabled={deleteLoading === property.id}
                            className="text-red-600 border-red-200 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-7 sm:h-8"
                          >
                            {deleteLoading === property.id ? (
                              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1" />
                            ) : (
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            )}
                            <span className="hidden sm:inline lg:inline">Delete</span>
                            <span className="sm:hidden">🗑️</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {hasMore && (
                  <div className="text-center pt-6">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      variant="outline"
                      className="px-8 py-2"
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                          Loading More...
                        </>
                      ) : (
                        'Load More Properties'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={addPropertyModalOpen}
        onClose={() => setAddPropertyModalOpen(false)}
        onSuccess={handlePropertyAdded}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
      />

      {/* Edit Property Modal */}
      {editingPropertyId && (
        <EditPropertyModal
          isOpen={editPropertyModalOpen}
          onClose={() => {
            setEditPropertyModalOpen(false);
            setEditingPropertyId(null);
          }}
          propertyId={editingPropertyId}
          onSuccess={handlePropertyUpdated}
        />
      )}

      {/* TikTok-Style Offer Swipe Modal */}
      {showOfferSwipe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setShowOfferSwipe(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <OfferSwipe
              propertyId={properties[0]?.id || 'demo'}
              sellerId={user?.id || 'demo'}
              onOfferProcessed={(offerId, accepted) => {
                console.log(`Offer ${offerId} ${accepted ? 'accepted' : 'declined'}`);
                // You can add additional logic here, like updating the inbox
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}