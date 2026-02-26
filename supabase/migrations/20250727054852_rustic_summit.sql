/*
  # Add public read access to profiles table

  1. Security Changes
    - Allow public (anonymous and authenticated) users to read profile data
    - This enables property listings to display owner contact information
    - Required for property detail pages to show seller phone numbers

  2. Policy Details
    - Allows SELECT operations for all users (public access)
    - Maintains existing write restrictions for profile owners only
*/

-- Allow public read access to profiles table
CREATE POLICY "Allow public read access to profiles"
  ON profiles
  FOR SELECT
  TO public
  USING (true);