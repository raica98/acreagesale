import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { supabase } from '../../lib/supabase';
import { useAdmin } from '../../hooks/useAdmin';

interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  pendingProperties: number;
  totalUsers: number;
  newUsersThisMonth: number;
  totalRevenue: number;
  propertiesThisMonth: number;
}

interface RecentProperty {
  id: string;
  title: string;
  status: string;
  price: number;
  created_at: string;
  user: {
    full_name: string | null;
    email: string;
  };
}

export function AdminDashboard() {
  const { logActivity } = useAdmin();
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    activeProperties: 0,
    pendingProperties: 0,
    totalUsers: 0,
    newUsersThisMonth: 0,
    totalRevenue: 0,
    propertiesThisMonth: 0
  });
  const [recentProperties, setRecentProperties] = useState<RecentProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    logActivity('view', 'admin_dashboard');
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        { data: statsData },
        { data: recentPropertiesData }
      ] = await Promise.all([
        supabase.rpc('get_admin_dashboard_stats'),
        supabase.rpc('get_recent_properties_admin', { limit_count: 5 })
      ]);

      if (statsData) {
        setStats({
          totalProperties: statsData.totalProperties || 0,
          activeProperties: statsData.activeProperties || 0,
          pendingProperties: statsData.pendingProperties || 0,
          totalUsers: statsData.totalUsers || 0,
          newUsersThisMonth: statsData.newUsersThisMonth || 0,
          totalRevenue: 0,
          propertiesThisMonth: statsData.propertiesThisMonth || 0
        });
      }

      if (recentPropertiesData) {
        const formattedProperties = recentPropertiesData.map((prop: any) => ({
          id: prop.id,
          title: prop.title,
          status: prop.status,
          price: prop.price,
          created_at: prop.created_at,
          user: {
            full_name: prop.owner_name || null,
            email: prop.owner_email || 'Unknown'
          }
        }));
        setRecentProperties(formattedProperties);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-semibold text-gray-700">Loading dashboard...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stats.propertiesThisMonth} added this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingProperties}</div>
              <p className="text-xs text-gray-600 mt-1">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stats.newUsersThisMonth} new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProperties}</div>
              <p className="text-xs text-gray-600 mt-1">
                Currently live
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProperties.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No properties yet
                  </div>
                ) : (
                  recentProperties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(property.status)}
                          <Link
                            to={`/admin/properties/${property.id}`}
                            className="font-medium text-gray-900 dark:text-white hover:text-blue-600"
                          >
                            {property.title}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          By {property.user.full_name || property.user.email}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(property.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          ${property.price.toLocaleString()}
                        </div>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {recentProperties.length > 0 && (
                <div className="mt-4">
                  <Link
                    to="/admin/properties"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all properties →
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <Link
                  to="/admin/properties?status=pending"
                  className="flex items-center justify-between p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-gray-900">Review Pending Properties</span>
                  </div>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {stats.pendingProperties}
                  </span>
                </Link>

                <Link
                  to="/admin/users"
                  className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Manage Users</span>
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {stats.totalUsers}
                  </span>
                </Link>

                <Link
                  to="/admin/analytics"
                  className="flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">View Analytics</span>
                  </div>
                </Link>

                <Link
                  to="/admin/settings"
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Platform Settings</span>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
