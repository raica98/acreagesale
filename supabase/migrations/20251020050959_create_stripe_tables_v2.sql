/*
  # Create Stripe Tables for Subscription Management
  
  This migration creates the required tables for Stripe subscription tracking.
  
  ## New Tables
  
  1. `stripe_customers` - Links users to Stripe customer IDs
  2. `stripe_subscriptions` - Stores subscription status and details
  
  ## Security
  
  - Enable RLS on both tables
  - Users can read their own data only
  
  ## IMPORTANT: Test Mode
  
  This includes automatic test subscriptions for ALL users.
  Remove the trigger and function in production.
*/

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  customer_id text UNIQUE NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  deleted_at timestamptz
);

-- Create stripe_subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text REFERENCES stripe_customers(customer_id) ON DELETE CASCADE NOT NULL,
  subscription_id text UNIQUE NOT NULL,
  status text NOT NULL,
  price_id text,
  current_period_start bigint NOT NULL,
  current_period_end bigint NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  deleted_at timestamptz
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_stripe_customers_user_id ON stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_stripe_customers_customer_id ON stripe_customers(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_customer_id ON stripe_subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_stripe_subscriptions_status ON stripe_subscriptions(status);

-- Enable RLS
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own subscription data"
  ON stripe_subscriptions
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id FROM stripe_customers WHERE user_id = auth.uid()
    )
  );

-- TEST MODE: Auto-create subscriptions for new signups
CREATE OR REPLACE FUNCTION public.create_test_subscription_for_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
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
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS create_test_subscription_on_signup ON auth.users;
CREATE TRIGGER create_test_subscription_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_test_subscription_for_user();