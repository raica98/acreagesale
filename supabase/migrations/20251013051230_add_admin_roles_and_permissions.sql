/*
  # Add Admin Roles and Permissions System

  1. Schema Changes
    - Add `is_admin` column to `profiles` table (boolean, default false)
    - Add `admin_role` column to `profiles` table (text, nullable)
    - Create `admin_activity_logs` table for audit tracking
      - `id` (uuid, primary key)
      - `admin_id` (uuid, references profiles)
      - `action` (text)
      - `resource_type` (text)
      - `resource_id` (text)
      - `details` (jsonb)
      - `ip_address` (text)
      - `created_at` (timestamptz)

  2. Security Changes
    - Update RLS policies to allow admins to view all properties regardless of status
    - Add RLS policies for admin_activity_logs
    - Create policies allowing admins to manage all users and properties
    - Add function to check if user is admin

  3. Indexes
    - Add index on `is_admin` column for fast admin lookups
    - Add index on `admin_activity_logs` for admin_id and created_at
*/

-- Add admin columns to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'admin_role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN admin_role text;
  END IF;
END $$;

-- Create admin activity logs table
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS on admin_activity_logs
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx ON profiles(is_admin) WHERE is_admin = true;
CREATE INDEX IF NOT EXISTS admin_activity_logs_admin_id_idx ON admin_activity_logs(admin_id);
CREATE INDEX IF NOT EXISTS admin_activity_logs_created_at_idx ON admin_activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS admin_activity_logs_resource_idx ON admin_activity_logs(resource_type, resource_id);

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update properties policies to allow admins to see all properties
DROP POLICY IF EXISTS "Admins can view all properties" ON properties;
CREATE POLICY "Admins can view all properties"
  ON properties
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Allow admins to update any property
DROP POLICY IF EXISTS "Admins can update any property" ON properties;
CREATE POLICY "Admins can update any property"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Allow admins to delete any property
DROP POLICY IF EXISTS "Admins can delete any property" ON properties;
CREATE POLICY "Admins can delete any property"
  ON properties
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Allow admins to view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

-- Allow admins to update any profile
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
CREATE POLICY "Admins can update any profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );

-- Admin activity logs policies
CREATE POLICY "Admins can view all activity logs"
  ON admin_activity_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can insert activity logs"
  ON admin_activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Function to log admin activity
CREATE OR REPLACE FUNCTION log_admin_activity(
  p_action text,
  p_resource_type text,
  p_resource_id text DEFAULT NULL,
  p_details jsonb DEFAULT '{}'::jsonb,
  p_ip_address text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO admin_activity_logs (admin_id, action, resource_type, resource_id, details, ip_address)
  VALUES (auth.uid(), p_action, p_resource_type, p_resource_id, p_details, p_ip_address)
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;