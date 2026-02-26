/*
  # Add disclaimer column to profiles table

  1. Schema Changes
    - Add `disclaimer` text field to profiles table if it doesn't exist
    - Allow null values (optional field)
    - Add comment for documentation

  2. Security
    - Maintains existing RLS policies
    - Users can only update their own disclaimer
*/

-- Add disclaimer field to profiles table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'disclaimer'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN disclaimer text;
    COMMENT ON COLUMN public.profiles.disclaimer IS 'Optional disclaimer text that appears on all user property listings';
  END IF;
END $$;

-- Ensure updated_at trigger function exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Ensure trigger exists for profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_profiles_updated_at' 
    AND tgrelid = 'public.profiles'::regclass
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON public.profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;