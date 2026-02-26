/*
  # Temporary: Allow Property Insert Without Subscription Check

  This is a temporary migration to allow users to insert properties while we fix the subscription system.
  This should be replaced with proper subscription checks once the subscription trigger is working correctly.

  1. Changes
    - Temporarily removes subscription check from property insert policy
    - Allows authenticated users to insert their own properties

  2. Security
    - Users must still be authenticated
    - Users can only insert properties with their own user_id
*/

-- Drop the existing insert policy with subscription check
DROP POLICY IF EXISTS "Authenticated users with active subscription can insert properties" ON properties;

-- Create temporary insert policy without subscription check
CREATE POLICY "Authenticated users can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND auth.uid() = user_id
  );
