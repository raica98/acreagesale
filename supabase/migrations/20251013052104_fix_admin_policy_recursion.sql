/*
  # Fix Admin Policy Infinite Recursion

  The admin policies were causing infinite recursion by checking profiles.is_admin
  which triggers another profiles check. This migration fixes the issue by:
  
  1. Dropping the problematic admin policies that cause recursion
  2. Keeping only the original user-scoped policies
  3. Admin access will be handled at the application level instead of RLS

  This allows the application to work normally while still maintaining
  security through the existing user-level RLS policies.
*/

-- Drop the admin policies that cause recursion on properties
DROP POLICY IF EXISTS "Admins can view all properties" ON properties;
DROP POLICY IF EXISTS "Admins can update any property" ON properties;
DROP POLICY IF EXISTS "Admins can delete any property" ON properties;

-- Drop the admin policies that cause recursion on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;

-- For admin operations, we'll use the service role key at the application level
-- The existing user-level policies remain in place for normal user operations