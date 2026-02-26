/*
  # Add Package Purchases Table

  This migration creates a table to track one-time package purchases (e.g., $200 premium package).

  ## New Tables

  1. `package_purchases` - Tracks package purchases
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users)
    - `package_type` (text) - Type of package (e.g., "premium")
    - `amount` (integer) - Amount in cents
    - `currency` (text) - Currency code (e.g., "usd")
    - `stripe_payment_intent_id` (text) - Stripe payment intent ID
    - `stripe_session_id` (text) - Stripe checkout session ID
    - `status` (text) - Payment status (completed, failed, pending)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security

  - Enable RLS on package_purchases table
  - Users can read their own purchase records
  - Only authenticated users can access their purchases

  ## Indexes

  - Index on user_id for fast lookups
  - Index on status for filtering
  - Index on stripe_payment_intent_id for webhook processing
*/

-- Create package_purchases table
CREATE TABLE IF NOT EXISTS package_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  package_type text NOT NULL,
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  stripe_payment_intent_id text,
  stripe_session_id text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_package_purchases_user_id ON package_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_package_purchases_status ON package_purchases(status);
CREATE INDEX IF NOT EXISTS idx_package_purchases_stripe_payment_intent ON package_purchases(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_package_purchases_created_at ON package_purchases(created_at DESC);

-- Enable RLS
ALTER TABLE package_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own purchases"
  ON package_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to check if user has active premium access
CREATE OR REPLACE FUNCTION public.has_premium_access(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM package_purchases
    WHERE user_id = check_user_id
      AND package_type = 'premium'
      AND status = 'completed'
  );
END;
$$;

-- Helper function to get user's purchase status
CREATE OR REPLACE FUNCTION public.get_user_premium_status()
RETURNS TABLE (
  has_access boolean,
  purchase_date timestamptz,
  amount integer
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    true as has_access,
    pp.created_at as purchase_date,
    pp.amount
  FROM package_purchases pp
  WHERE pp.user_id = auth.uid()
    AND pp.package_type = 'premium'
    AND pp.status = 'completed'
  ORDER BY pp.created_at DESC
  LIMIT 1;
END;
$$;