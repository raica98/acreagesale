/*
  # Add Waitlist Notifications Table

  1. New Tables
    - `waitlist_notifications`
      - `id` (uuid, primary key)
      - `email` (text, required) - User's email address
      - `name` (text, required) - User's full name
      - `phone` (text, optional) - User's phone number
      - `search_area` (text, required) - The area/location they searched for
      - `notified` (boolean, default false) - Whether we've notified this user
      - `created_at` (timestamptz) - When they signed up
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `waitlist_notifications` table
    - Add policy for anonymous users to insert their notification requests
    - Add policy for authenticated admin users to view all waitlist entries

  3. Indexes
    - Add index on `email` for faster lookups
    - Add index on `notified` for filtering unnotified users
    - Add index on `search_area` for location-based queries
*/

CREATE TABLE IF NOT EXISTS waitlist_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  phone text,
  search_area text NOT NULL,
  notified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist_notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert their notification request
CREATE POLICY "Anyone can submit waitlist notification request"
  ON waitlist_notifications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only admins can view waitlist entries
CREATE POLICY "Admins can view all waitlist entries"
  ON waitlist_notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Policy: Only admins can update notification status
CREATE POLICY "Admins can update waitlist entries"
  ON waitlist_notifications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_notifications(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_notified ON waitlist_notifications(notified);
CREATE INDEX IF NOT EXISTS idx_waitlist_search_area ON waitlist_notifications(search_area);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_notifications(created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_waitlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
DROP TRIGGER IF EXISTS trigger_update_waitlist_updated_at ON waitlist_notifications;
CREATE TRIGGER trigger_update_waitlist_updated_at
  BEFORE UPDATE ON waitlist_notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_waitlist_updated_at();
