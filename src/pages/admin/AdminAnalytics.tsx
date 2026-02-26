import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Building2, DollarSign, MapPin, Calendar } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { supabase } from '../../lib/supabase';
import { useAdmin } from '../../hooks/useAdmin';

interface AnalyticsData {
  totalRevenue: number;
  totalProperties: number;
  totalUsers: number;
  avgPropertyPrice: number;
  propertiesByState: { state: string; count: number }[];
  propertiesByStatus: { status: string; count: number }[];
  userGrowth: { month: string; count: number }[];
  propertyGrowth: { month: string; count: number }[];
  priceRanges: { range: string; count: number }[];
}

export function AdminAnalytics() {
  const { logActivity } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 0,
    totalProperties: 0,
    totalUsers: 0,
    avgPropertyPrice: 0,
    propertiesByState: [],
    propertiesByStatus: [],
    userGrowth: [],
    propertyGrowth: [],
    priceRanges: []
  });

  useEffect(() => {
    fetchAnalytics();
    logActivity('view', 'admin_analytics');
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const [
        { data: properties },
        { data: users },
        { count: totalProperties },
        { count: totalUsers }
      ] = await Promise.all([
        supabase.from('properties').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
      ]);

      const totalRevenue = properties?.reduce((sum, p) => sum + Number(p.price), 0) || 0;
      const avgPropertyPrice = properties?.length
        ? totalRevenue / properties.length
        : 0;

      const stateGroups = properties?.reduce((acc: Record<string, number>, p) => {
        acc[p.state] = (acc[p.state] || 0) + 1;
        return acc;
      }, {});

      const propertiesByState = Object.entries(stateGroups || {})
        .map(([state, count]) => ({ state, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      const statusGroups = properties?.reduce((acc: Record<string, number>, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {});

      const propertiesByStatus = Object.entries(statusGroups || {}).map(
        ([status, count]) => ({ status, count: count as number })
      );

      const priceRanges = [
        { range: '$0 - $50k', count: 0 },
        { range: '$50k - $100k', count: 0 },
        { range: '$100k - $250k', count: 0 },
        { range: '$250k - $500k', count: 0 },
        { range: '$500k+', count: 0 }
      ];

      properties?.forEach((p) => {
        const price = Number(p.price);
        if (price < 50000) priceRanges[0].count++;
        else if (price < 100000) priceRanges[1].count++;
        else if (price < 250000) priceRanges[2].count++;
        else if (price < 500000) priceRanges[3].count++;
        else priceRanges[4].count++;
      });

      const userGrowthMap: Record<string, number> = {};
      users?.forEach((user) => {
        const month = new Date(user.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        });
        userGrowthMap[month] = (userGrowthMap[month] || 0) + 1;
      });

      const userGrowth = Object.entries(userGrowthMap)
        .map(([month, count]) => ({ month, count }))
        .slice(-6);

      const propertyGrowthMap: Record<string, number> = {};
      properties?.forEach((property) => {
        const month = new Date(property.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short'
        });
        propertyGrowthMap[month] = (propertyGrowthMap[month] || 0) + 1;
      });

      const propertyGrowth = Object.entries(propertyGrowthMap)
        .map(([month, count]) => ({ month, count }))
        .slice(-6);

      setAnalytics({
        totalRevenue,
        totalProperties: totalProperties || 0,
        totalUsers: totalUsers || 0,
        avgPropertyPrice,
        propertiesByState,
        propertiesByStatus,
        userGrowth,
        propertyGrowth,
        priceRanges
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-semibold text-gray-700">Loading analytics...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Platform insights and performance metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${analytics.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                From all listed properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Property Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Math.round(analytics.avgPropertyPrice).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Across {analytics.totalProperties} properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalProperties}</div>
              <p className="text-xs text-gray-600 mt-1">
                Listed on platform
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalUsers}</div>
              <p className="text-xs text-gray-600 mt-1">
                Registered accounts
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Properties by State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.propertiesByState.map((item, index) => (
                  <div key={item.state} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300 font-medium text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.state}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (item.count / analytics.totalProperties) * 100
                            }%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Properties by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.propertiesByStatus.map((item) => {
                  const colors: Record<string, string> = {
                    active: 'bg-green-600',
                    pending: 'bg-yellow-600',
                    rejected: 'bg-red-600',
                    sold: 'bg-blue-600'
                  };

                  return (
                    <div key={item.status} className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {item.status}
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`${colors[item.status] || 'bg-gray-600'} h-2 rounded-full`}
                            style={{
                              width: `${
                                (item.count / analytics.totalProperties) * 100
                              }%`
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Growth (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.userGrowth.map((item) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.month}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (item.count / Math.max(...analytics.userGrowth.map((g) => g.count))) *
                                100,
                              100
                            )}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Listings (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.propertyGrowth.map((item) => (
                  <div key={item.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.month}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (item.count /
                                Math.max(...analytics.propertyGrowth.map((g) => g.count))) *
                                100,
                              100
                            )}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.priceRanges.map((item) => (
                <div key={item.range} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.range}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{
                          width: `${
                            analytics.totalProperties > 0
                              ? (item.count / analytics.totalProperties) * 100
                              : 0
                          }%`
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-16 text-right">
                      {item.count} ({analytics.totalProperties > 0
                        ? Math.round((item.count / analytics.totalProperties) * 100)
                        : 0}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
