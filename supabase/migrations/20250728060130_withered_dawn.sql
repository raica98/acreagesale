/*
  # Add disclaimer field to profiles table

  1. Schema Changes
    - Add `disclaimer` text field to profiles table
    - Allow null values (optional field)
    - Add updated_at trigger for profile changes

  2. Security
    - Maintains existing RLS policies
    - Users can only update their own disclaimer
*/

-- Add disclaimer field to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'disclaimer'
  ) THEN
    ALTER TABLE profiles ADD COLUMN disclaimer text;
  END IF;
END $$;

-- Update the updated_at timestamp when disclaimer is modified
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;