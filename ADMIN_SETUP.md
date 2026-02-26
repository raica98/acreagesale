# Admin Dashboard Setup Guide

## Overview

A comprehensive backend admin dashboard has been successfully implemented for your land marketplace platform. Admins have complete control over property listings, users, analytics, and platform settings.

## Features Implemented

### 1. Admin Authentication & Security
- Role-based access control with `is_admin` flag in profiles table
- Protected admin routes that redirect non-admin users
- Admin activity logging for all actions
- Separate admin navigation and layout

### 2. Dashboard Sections

#### Overview Dashboard (`/admin/dashboard`)
- Platform statistics (total properties, pending reviews, users, active listings)
- Recent property submissions
- Quick action links to pending reviews and user management

#### Property Management (`/admin/properties`)
- View all property listings across the platform
- Filter by status (all, pending, active, rejected, sold)
- Search properties by title, location, or owner
- Review pending property submissions with detailed modal
- Approve or reject properties with one click
- View property details, images, and owner information

#### User Management (`/admin/users`)
- View all registered users
- Search users by name, email, or phone
- See user statistics (property count, join date)
- View detailed user profiles with all their properties
- Promote users to admin or remove admin privileges
- Track user activity and engagement

#### Analytics Dashboard (`/admin/analytics`)
- Total revenue and average property price
- Properties by state (top 10 states)
- Properties by status breakdown
- User growth over last 6 months
- Property listing trends over last 6 months
- Price distribution across different ranges

#### Activity Logs (`/admin/activity`)
- Complete audit trail of all admin actions
- Track who did what and when
- View action details and affected resources

#### Messages & Support (`/admin/messages`)
- Placeholder for future message system
- Will handle user support requests

#### Settings (`/admin/settings`)
- Placeholder for platform configuration
- Future home for admin preferences

## How to Make a User an Admin

To grant admin access to a user, you need to update their profile in the Supabase database:

### Method 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run this query (replace with the user's email):

```sql
UPDATE profiles
SET is_admin = true, admin_role = 'Super Admin'
WHERE email = 'admin@example.com';
```

### Method 2: Using SQL in Supabase Table Editor

1. Go to the Table Editor in Supabase
2. Open the `profiles` table
3. Find the user you want to make admin
4. Edit the row and set:
   - `is_admin` = `true`
   - `admin_role` = `Super Admin` (optional)

## Accessing the Admin Dashboard

Once a user has admin privileges:

1. Log in to your account at the homepage
2. Navigate to `/admin/dashboard` in your browser
3. You'll automatically be redirected if you don't have admin access

Or add a direct link in your navigation for admin users.

## Database Schema

### New Tables

#### `admin_activity_logs`
Tracks all admin actions for security and audit purposes:
- `id` - Unique log ID
- `admin_id` - Admin user who performed the action
- `action` - Type of action (approve, reject, view, etc.)
- `resource_type` - Type of resource affected
- `resource_id` - ID of affected resource
- `details` - Additional JSON details
- `ip_address` - IP address of admin
- `created_at` - Timestamp

### Updated Tables

#### `profiles`
Added admin-related columns:
- `is_admin` (boolean, default false) - Whether user is an admin
- `admin_role` (text, nullable) - Admin role/title

## Security Features

1. **Row Level Security (RLS)**
   - Only admins can view all properties regardless of status
   - Only admins can update/delete any property
   - Only admins can view all user profiles
   - Activity logs are only visible to admins

2. **Protected Routes**
   - All admin routes check authentication and admin status
   - Non-admin users are automatically redirected to homepage
   - Loading states prevent unauthorized access

3. **Activity Logging**
   - All admin actions are logged automatically
   - Includes action type, resource, and timestamp
   - Provides complete audit trail

## Property Review Workflow

1. User submits a property (status: `pending`)
2. Admin navigates to `/admin/properties`
3. Admin filters to show pending properties
4. Admin clicks on property to view details
5. Admin reviews all information, images, and location
6. Admin approves (status changes to `active`) or rejects (status changes to `rejected`)
7. Action is logged in activity logs

## Next Steps

1. **Make yourself an admin** using one of the methods above
2. **Test the admin dashboard** by logging in and navigating to `/admin/dashboard`
3. **Review pending properties** if you have any user submissions
4. **Customize admin roles** by adding different permission levels if needed
5. **Add notifications** to alert admins of new property submissions (future enhancement)

## Technical Implementation

The admin dashboard uses **secure database functions** to bypass RLS policies safely:

- `get_all_properties_admin()` - Retrieves all properties with owner info
- `get_all_users_admin()` - Retrieves all users with property counts
- `get_admin_dashboard_stats()` - Gets platform statistics
- `update_property_status_admin()` - Updates property status (approve/reject)
- `update_user_admin_status()` - Toggles user admin privileges

Each function verifies the calling user has `is_admin = true` before executing, ensuring only authorized admins can access sensitive data.

## Troubleshooting

### "Access Denied" or redirected to homepage
- Verify your user has `is_admin = true` in the profiles table
- Try logging out and logging back in
- Check browser console for any errors

### Can't see all properties
- Verify all database functions were created successfully
- Check that migrations were applied successfully
- Ensure you're logged in as admin user
- Verify your admin user has `is_admin = true` in profiles table

### Activity logs not showing
- Verify the `admin_activity_logs` table exists
- Check RLS policies on the table
- Ensure logged-in user has admin privileges

### "infinite recursion detected in policy" error
- This has been fixed by using database functions instead of RLS policies
- If you still see this, ensure the latest migrations have been applied
- Clear your browser cache and reload the page

## Support

For any issues or questions about the admin dashboard, refer to:
- Database migrations in `supabase/migrations/`
- Admin components in `src/components/admin/`
- Admin pages in `src/pages/admin/`
- Admin hook in `src/hooks/useAdmin.ts`
