/*
  # Fix Profile Creation Trigger

  1. Changes
    - Update handle_new_user function with better error handling
    - Handle cases where email might be null
    - Add logging for debugging
    - Use COALESCE for safer null handling

  2. Security
    - Function runs with SECURITY DEFINER to bypass RLS
    - Only creates profile for the new user (no security risk)
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Recreate function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert profile with safer null handling
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id, 
    COALESCE(new.email, ''), 
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();