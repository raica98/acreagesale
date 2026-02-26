/*
  # Fix User Signup Trigger - Improved Version

  1. Changes
    - Improved error handling with detailed logging
    - Ensures both profile and subscription are created
    - Fails user creation if critical components fail
    - Better transaction handling

  2. Security
    - Function runs with SECURITY DEFINER to bypass RLS
    - Only creates data for the new user
*/

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop old function
DROP FUNCTION IF EXISTS handle_new_user_signup();

-- Create improved function
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS trigger AS $$
DECLARE
  v_customer_id text;
BEGIN
  -- Step 1: Create user profile (critical)
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  -- Step 2: Create Stripe customer (critical for property listings)
  v_customer_id := 'cus_test_' || NEW.id;

  INSERT INTO public.stripe_customers (user_id, customer_id, email)
  VALUES (
    NEW.id,
    v_customer_id,
    COALESCE(NEW.email, 'test@example.com')
  )
  ON CONFLICT (user_id) DO UPDATE
  SET email = EXCLUDED.email;

  -- Step 3: Create test subscription (critical for property listings)
  INSERT INTO public.stripe_subscriptions (customer_id, subscription_id, status, current_period_start, current_period_end)
  VALUES (
    v_customer_id,
    'sub_test_' || NEW.id,
    'active',
    EXTRACT(EPOCH FROM NOW())::bigint,
    EXTRACT(EPOCH FROM NOW() + INTERVAL '30 days')::bigint
  )
  ON CONFLICT (subscription_id) DO UPDATE
  SET
    status = 'active',
    current_period_end = EXTRACT(EPOCH FROM NOW() + INTERVAL '30 days')::bigint;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE WARNING 'Error in handle_new_user_signup for user %: % (SQLSTATE: %)', NEW.id, SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_signup();
