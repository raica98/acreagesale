/*
  # Combine User Creation Triggers

  1. Changes
    - Merge handle_new_user and create_test_subscription_for_user into a single function
    - Creates both profile and test subscription on user signup
    - Comprehensive error handling to prevent user creation failure
    - Single trigger to handle all post-signup tasks

  2. Security
    - Function runs with SECURITY DEFINER to bypass RLS
    - Only creates data for the new user
*/

-- Drop all existing user creation triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS create_test_subscription_on_signup ON auth.users;

-- Drop old functions
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS create_test_subscription_for_user();

-- Create combined function
CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS trigger AS $$
BEGIN
  -- Step 1: Create user profile
  BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
      NEW.id, 
      COALESCE(NEW.email, ''), 
      COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    )
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  END;

  -- Step 2: Create test Stripe customer and subscription
  BEGIN
    INSERT INTO stripe_customers (user_id, customer_id, email)
    VALUES (
      NEW.id,
      'cus_test_' || NEW.id,
      COALESCE(NEW.email, 'test@example.com')
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    INSERT INTO stripe_subscriptions (customer_id, subscription_id, status, current_period_start, current_period_end)
    VALUES (
      'cus_test_' || NEW.id,
      'sub_test_' || NEW.id,
      'active',
      EXTRACT(EPOCH FROM NOW())::bigint,
      EXTRACT(EPOCH FROM NOW() + INTERVAL '30 days')::bigint
    )
    ON CONFLICT (subscription_id) DO NOTHING;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'Failed to create test subscription for user %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create single trigger for all user signup tasks
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_signup();