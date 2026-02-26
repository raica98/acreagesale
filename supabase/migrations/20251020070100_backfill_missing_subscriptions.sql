/*
  # Backfill Missing Subscriptions

  1. Changes
    - Creates test subscriptions for existing users who don't have one
    - Ensures all users can create property listings
    - One-time migration to fix existing users

  2. Security
    - Only creates subscriptions for authenticated users
    - Uses test subscription format for development
*/

-- Create test subscriptions for users who don't have one
DO $$
DECLARE
  user_record RECORD;
  v_customer_id text;
BEGIN
  FOR user_record IN
    SELECT au.id, au.email
    FROM auth.users au
    LEFT JOIN stripe_customers sc ON sc.user_id = au.id
    WHERE sc.user_id IS NULL
  LOOP
    v_customer_id := 'cus_test_' || user_record.id;

    -- Create customer
    INSERT INTO public.stripe_customers (user_id, customer_id, email)
    VALUES (
      user_record.id,
      v_customer_id,
      COALESCE(user_record.email, 'test@example.com')
    )
    ON CONFLICT (user_id) DO NOTHING;

    -- Create subscription
    INSERT INTO public.stripe_subscriptions (customer_id, subscription_id, status, current_period_start, current_period_end)
    VALUES (
      v_customer_id,
      'sub_test_' || user_record.id,
      'active',
      EXTRACT(EPOCH FROM NOW())::bigint,
      EXTRACT(EPOCH FROM NOW() + INTERVAL '30 days')::bigint
    )
    ON CONFLICT (subscription_id) DO NOTHING;

    RAISE NOTICE 'Created subscription for user %', user_record.id;
  END LOOP;
END $$;
