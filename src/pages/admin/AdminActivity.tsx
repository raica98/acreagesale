import React, { useEffect, useState } from 'react';
import { Activity, User, Clock, FileText } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { supabase } from '../../lib/supabase';
import { useAdmin } from '../../hooks/useAdmin';

interface ActivityLog {
  id: string;
  admin_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: any;
  created_at: string;
  profiles?: {
    full_name: string | null;
    email: string;
  };
}

export function AdminActivity() {
  const { logActivity } = useAdmin();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    logActivity('view', 'admin_activity');
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('admin_activity_logs')
        .select(`
          *,
          profiles!admin_activity_logs_admin_id_fkey (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'approve':
      case 'reject':
        return <FileText className="h-4 w-4" />;
      case 'view':
        return <Activity className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'approve':
        return 'text-green-600 bg-green-100';
      case 'reject':
        return 'text-red-600 bg-red-100';
      case 'view':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track all admin actions and system events
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-600">Loading activity logs...</div>
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-xl font-semibold text-gray-900 dark:text-white">No activity yet</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">
                  Admin actions will appear here
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className={`p-2 rounded-lg ${getActionColor(activity.action)}`}>
                      {getActionIcon(activity.action)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {activity.profiles?.full_name || activity.profiles?.email}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 mx-2">
                            {activity.action}
                          </span>
                          <span className="text-gray-900 dark:text-white">
                            {activity.resource_type}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(activity.created_at).toLocaleString()}
                        </div>
                      </div>
                      {activity.resource_id && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Resource ID: {activity.resource_id}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
