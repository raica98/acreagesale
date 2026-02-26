/*
  # Allow public access to profile phone numbers

  1. Security Changes
    - Allow all users (including anonymous) to read profile phone numbers
    - This enables property listings to display owner contact information
    - Required for property detail pages to show seller phone numbers
*/

-- Allow all users (even anonymous) to read profile phone numbers
CREATE POLICY "Public can read profile phones"
  ON profiles
  FOR SELECT
  TO public
  USING (true);