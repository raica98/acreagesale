/*
  # Update User Signup to Initialize Credits

  1. Changes
    - Update handle_new_user_signup to initialize credits
    - New users get unlimited credits through test subscription
    - Credits are automatically managed by triggers

  2. Security
    - Function runs with SECURITY DEFINER to bypass RLS
*/

-- Drop and recreate the signup function with credits initialization
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user_signup();

CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS trigger AS $$
DECLARE
  v_customer_id text;
BEGIN
  -- Step 1: Create user profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  -- Step 2: Initialize listing credits (starts at 0)
  INSERT INTO public.user_listing_credits (user_id, credits, has_unlimited)
  VALUES (NEW.id, 0, false)
  ON CONFLICT (user_id) DO NOTHING;

  -- Step 3: Create Stripe customer
  v_customer_id := 'cus_test_' || NEW.id;

  INSERT INTO public.stripe_customers (user_id, customer_id, email)
  VALUES (
    NEW.id,
    v_customer_id,
    COALESCE(NEW.email, 'test@example.com')
  )
  ON CONFLICT (user_id) DO UPDATE
  SET email = EXCLUDED.email;

  -- Step 4: Create test subscription (triggers will grant unlimited credits)
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
    RAISE WARNING 'Error in handle_new_user_signup for user %: % (SQLSTATE: %)', NEW.id, SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_signup();
