/*
  # Add disclaimer field to profiles table

  1. Schema Changes
    - Add `disclaimer` text field to profiles table
    - Allow null values (optional field)
    - Update existing profiles to have null disclaimer by default

  2. Security
    - Maintains existing RLS policies
    - Users can only update their own disclaimer
*/

-- Add disclaimer field to profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'disclaimer'
  ) THEN
    ALTER TABLE profiles ADD COLUMN disclaimer text;
    COMMENT ON COLUMN profiles.disclaimer IS 'Optional disclaimer text that appears on all user property listings';
  END IF;
END $$;

-- Ensure updated_at trigger exists for profiles table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create or replace trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();