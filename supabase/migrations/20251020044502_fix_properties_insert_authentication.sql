/*
  # Fix Properties Insert Policy - Require Authentication
  
  This migration fixes a security issue where unauthenticated users could potentially
  insert properties into the database. The previous policy only checked that auth.uid()
  equals user_id, but didn't explicitly verify authentication status.
  
  ## Changes
  
  1. Drop the existing insert policy
  2. Create a new insert policy that:
     - Explicitly requires the user to be authenticated (auth.uid() IS NOT NULL)
     - Verifies that auth.uid() matches the user_id being inserted
     - Uses both USING and WITH CHECK clauses for comprehensive protection
  
  ## Security Impact
  
  This ensures that:
  - Only authenticated users can insert properties
  - Users can only insert properties with their own user_id
  - No bypassing through NULL comparisons or other edge cases
*/

-- Drop the existing insert policy
DROP POLICY IF EXISTS "Authenticated users can insert their own properties" ON properties;

-- Create new insert policy with explicit authentication check
CREATE POLICY "Authenticated users can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.uid() = user_id
  );
