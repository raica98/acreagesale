/*
  # Add Admin Delete Function

  Creates a database function that allows admins to delete properties
  by bypassing RLS policies. This function checks if the current user
  is an admin before executing the delete operation.

  1. Functions
    - delete_property_admin(property_id) - Delete a property as admin
*/

-- Delete property as admin (bypasses RLS)
CREATE OR REPLACE FUNCTION delete_property_admin(
  property_id uuid
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

  -- Delete the property
  DELETE FROM properties
  WHERE id = property_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;