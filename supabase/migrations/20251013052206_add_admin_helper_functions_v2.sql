/*
  # Add Admin Helper Functions (v2)

  Creates database functions that admins can use to bypass RLS policies
  for administrative operations. These functions check if the current user
  is an admin before executing.

  1. Functions
    - get_all_properties_admin() - Get all properties for admin view
    - get_all_users_admin() - Get all users for admin view  
    - get_admin_dashboard_stats() - Get dashboard statistics
    - update_property_status_admin() - Update property status as admin
    - update_user_admin_status() - Toggle user admin status
*/

-- Get all properties for admin (bypasses RLS)
CREATE OR REPLACE FUNCTION get_all_properties_admin(
  status_filter text DEFAULT NULL,
  limit_count int DEFAULT 100,
  offset_count int DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  title text,
  description text,
  price numeric,
  size_acres numeric,
  address text,
  city text,
  state text,
  zip_code text,
  county text,
  apn text,
  latitude numeric,
  longitude numeric,
  images text[],
  status text,
  created_at timestamptz,
  updated_at timestamptz,
  owner_email text,
  owner_name text
) AS $$
DECLARE
  user_is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT p.is_admin INTO user_is_admin
  FROM profiles p
  WHERE p.id = auth.uid();

  IF NOT COALESCE(user_is_admin, false) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  RETURN QUERY
  SELECT 
    p.id,
    p.user_id,
    p.title,
    p.description,
    p.price,
    p.size_acres,
    p.address,
    p.city,
    p.state,
    p.zip_code,
    p.county,
    p.apn,
    p.latitude,
    p.longitude,
    p.images,
    p.status,
    p.created_at,
    p.updated_at,
    prof.email as owner_email,
    prof.full_name as owner_name
  FROM properties p
  LEFT JOIN profiles prof ON p.user_id = prof.id
  WHERE (status_filter IS NULL OR p.status = status_filter)
  ORDER BY p.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get all users for admin (bypasses RLS)
CREATE OR REPLACE FUNCTION get_all_users_admin()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  phone text,
  is_admin boolean,
  admin_role text,
  created_at timestamptz,
  property_count bigint
) AS $$
DECLARE
  user_is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT p.is_admin INTO user_is_admin
  FROM profiles p
  WHERE p.id = auth.uid();

  IF NOT COALESCE(user_is_admin, false) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  RETURN QUERY
  SELECT 
    p.id,
    p.email,
    p.full_name,
    p.phone,
    p.is_admin,
    p.admin_role,
    p.created_at,
    COUNT(prop.id) as property_count
  FROM profiles p
  LEFT JOIN properties prop ON p.id = prop.user_id
  GROUP BY p.id, p.email, p.full_name, p.phone, p.is_admin, p.admin_role, p.created_at
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get dashboard stats for admin
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats()
RETURNS json AS $$
DECLARE
  result json;
  start_of_month timestamptz;
  user_is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT p.is_admin INTO user_is_admin
  FROM profiles p
  WHERE p.id = auth.uid();

  IF NOT COALESCE(user_is_admin, false) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  start_of_month := date_trunc('month', CURRENT_DATE);

  SELECT json_build_object(
    'totalProperties', (SELECT COUNT(*) FROM properties),
    'activeProperties', (SELECT COUNT(*) FROM properties WHERE status = 'active'),
    'pendingProperties', (SELECT COUNT(*) FROM properties WHERE status = 'pending'),
    'totalUsers', (SELECT COUNT(*) FROM profiles),
    'newUsersThisMonth', (SELECT COUNT(*) FROM profiles WHERE created_at >= start_of_month),
    'propertiesThisMonth', (SELECT COUNT(*) FROM properties WHERE created_at >= start_of_month)
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get recent properties for admin dashboard
CREATE OR REPLACE FUNCTION get_recent_properties_admin(limit_count int DEFAULT 5)
RETURNS TABLE (
  id uuid,
  title text,
  status text,
  price numeric,
  created_at timestamptz,
  owner_email text,
  owner_name text
) AS $$
DECLARE
  user_is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT p.is_admin INTO user_is_admin
  FROM profiles p
  WHERE p.id = auth.uid();

  IF NOT COALESCE(user_is_admin, false) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.status,
    p.price,
    p.created_at,
    prof.email as owner_email,
    prof.full_name as owner_name
  FROM properties p
  LEFT JOIN profiles prof ON p.user_id = prof.id
  ORDER BY p.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update property status as admin
CREATE OR REPLACE FUNCTION update_property_status_admin(
  property_id uuid,
  new_status text
)
RETURNS void AS $$
DECLARE
  user_is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT p.is_admin INTO user_is_admin
  FROM profiles p
  WHERE p.id = auth.uid();

  IF NOT COALESCE(user_is_admin, false) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  UPDATE properties
  SET status = new_status, updated_at = NOW()
  WHERE id = property_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update user admin status
CREATE OR REPLACE FUNCTION update_user_admin_status(
  user_id uuid,
  new_admin_status boolean
)
RETURNS void AS $$
DECLARE
  user_is_admin boolean;
BEGIN
  -- Check if caller is admin
  SELECT p.is_admin INTO user_is_admin
  FROM profiles p
  WHERE p.id = auth.uid();

  IF NOT COALESCE(user_is_admin, false) THEN
    RAISE EXCEPTION 'Access denied. Admin privileges required.';
  END IF;

  UPDATE profiles
  SET is_admin = new_admin_status, updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;