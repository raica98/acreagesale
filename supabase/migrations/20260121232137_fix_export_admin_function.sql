/*
  # Fix Admin Export Function
  
  Updates the get_all_properties_admin function to include all property fields
  needed for export, including boundary_points, zoning, utilities, and region.
  
  1. Changes
    - Add missing fields to the function return type
    - Update the SELECT query to include all property columns
*/

-- Drop and recreate the function with all fields
DROP FUNCTION IF EXISTS get_all_properties_admin(text, int, int);

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
  owner_name text,
  boundary_points jsonb,
  zoning text,
  water text,
  electricity text,
  sewer text,
  region text
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
    prof.full_name as owner_name,
    p.boundary_points,
    p.zoning,
    p.water,
    p.electricity,
    p.sewer,
    p.region
  FROM properties p
  LEFT JOIN profiles prof ON p.user_id = prof.id
  WHERE (status_filter IS NULL OR p.status = status_filter)
  ORDER BY p.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;