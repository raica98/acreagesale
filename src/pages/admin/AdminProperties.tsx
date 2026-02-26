import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  DollarSign,
  Ruler,
  Calendar,
  AlertCircle,
  Building2,
  Trash2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { supabase, Database } from '../../lib/supabase';
import { useAdmin } from '../../hooks/useAdmin';

type Property = Database['public']['Tables']['properties']['Row'] & {
  profiles?: {
    full_name: string | null;
    email: string;
  };
};

export function AdminProperties() {
  const { logActivity } = useAdmin();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
    logActivity('view', 'admin_properties');
  }, [statusFilter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.rpc('get_all_properties_admin', {
        status_filter: statusFilter === 'all' ? null : statusFilter,
        limit_count: 100,
        offset_count: 0
      });

      if (error) throw error;

      const formattedData = (data || []).map((prop: any) => ({
        ...prop,
        profiles: {
          full_name: prop.owner_name,
          email: prop.owner_email
        }
      }));

      setProperties(formattedData);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (propertyId: string) => {
    try {
      setActionLoading(true);

      const { error } = await supabase.rpc('update_property_status_admin', {
        property_id: propertyId,
        new_status: 'active'
      });

      if (error) throw error;

      await logActivity('approve', 'property', propertyId, {
        action: 'approved',
        status: 'active'
      });

      fetchProperties();
      setShowReviewModal(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error approving property:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (propertyId: string) => {
    try {
      setActionLoading(true);

      const { error } = await supabase.rpc('update_property_status_admin', {
        property_id: propertyId,
        new_status: 'rejected'
      });

      if (error) throw error;

      await logActivity('reject', 'property', propertyId, {
        action: 'rejected',
        status: 'rejected'
      });

      fetchProperties();
      setShowReviewModal(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error rejecting property:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    try {
      setActionLoading(true);

      const { error } = await supabase.rpc('delete_property_admin', {
        property_id: propertyId
      });

      if (error) throw error;

      await logActivity('delete', 'property', propertyId, {
        action: 'deleted'
      });

      fetchProperties();
      setDeleteConfirmId(null);
      setShowReviewModal(false);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      sold: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Property Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Review and manage all property listings
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="rejected">Rejected</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-600">Loading properties...</div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-xl font-semibold text-gray-900 dark:text-white">No properties found</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">
                  {searchTerm ? 'Try adjusting your search' : 'No properties match the selected filters'}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredProperties.map((property) => (
                      <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {property.images && property.images.length > 0 ? (
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {property.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {property.size_acres} acres
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {property.profiles?.full_name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {property.profiles?.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {property.city}, {property.state}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {property.zip_code}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            ${property.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(property.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {new Date(property.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => {
                                setSelectedProperty(property);
                                setShowReviewModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            {property.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApprove(property.id)}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                  disabled={actionLoading}
                                  title="Approve"
                                >
                                  <CheckCircle className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleReject(property.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  disabled={actionLoading}
                                  title="Reject"
                                >
                                  <XCircle className="h-5 w-5" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => setDeleteConfirmId(property.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              disabled={actionLoading}
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full p-3">
                <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Delete Property
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>

            <div className="flex space-x-3">
              <Button
                onClick={() => setDeleteConfirmId(null)}
                disabled={actionLoading}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Property Review
                </h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedProperty.status)}
                  <span className="text-lg font-semibold">{selectedProperty.title}</span>
                  {getStatusBadge(selectedProperty.status)}
                </div>

                {selectedProperty.images && selectedProperty.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProperty.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Property Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">${selectedProperty.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Ruler className="h-4 w-4 text-gray-400" />
                        <span>{selectedProperty.size_acres} acres</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>
                          {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip_code}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(selectedProperty.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Owner Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Name:</span>{' '}
                        {selectedProperty.profiles?.full_name || 'Not provided'}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{' '}
                        {selectedProperty.profiles?.email}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedProperty.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Description
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedProperty.description}
                    </p>
                  </div>
                )}

                {selectedProperty.status === 'pending' && (
                  <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={() => handleApprove(selectedProperty.id)}
                      disabled={actionLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Property
                    </Button>
                    <Button
                      onClick={() => handleReject(selectedProperty.id)}
                      disabled={actionLoading}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Property
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
