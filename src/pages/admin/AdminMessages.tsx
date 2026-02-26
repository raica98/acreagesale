import React from 'react';
import { MessageSquare } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function AdminMessages() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages & Support</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user messages and support requests
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Message Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                Message System Coming Soon
              </div>
              <div className="text-gray-600 dark:text-gray-400 mt-2">
                User messages and support tickets will be managed here
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
