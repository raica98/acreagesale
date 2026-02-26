import React from 'react';
import { Settings } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure platform settings and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                Settings Panel Coming Soon
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">
                Platform configuration options will be available here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
