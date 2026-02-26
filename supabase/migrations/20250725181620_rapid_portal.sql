/*
  # Enable public access to properties with image blur for unauthenticated users

  1. Security Changes
    - Allow public (anonymous) users to read active properties
    - Keep write operations restricted to authenticated users only
    
  2. Public Access
    - Anonymous users can view property listings
    - All property data is accessible including images
    - Frontend will handle image blurring conditionally
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Anyone can view active properties" ON properties;
DROP POLICY IF EXISTS "Users can delete their own properties" ON properties;
DROP POLICY IF EXISTS "Users can insert their own properties" ON properties;
DROP POLICY IF EXISTS "Users can update their own properties" ON properties;

-- Create new policy for public read access to active properties
CREATE POLICY "Public can view active properties"
  ON properties
  FOR SELECT
  TO public
  USING (status = 'active');

-- Recreate authenticated user policies for write operations
CREATE POLICY "Authenticated users can insert their own properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);