/*
  # Add Listing Credits System

  1. New Tables
    - `user_listing_credits` - Tracks available listing credits per user
      - Subscriptions give unlimited credits (tracked as -1)
      - One-time packages give specific number of credits

  2. Changes
    - Add credits column to package_purchases to track how many listings included
    - Create trigger to automatically grant credits on purchase
    - Create trigger to automatically deduct credits when property is created
    - Update property insert policy to check credits

  3. Security
    - Enable RLS on user_listing_credits
    - Users can only read their own credits
    - Credits automatically managed by triggers (SECURITY DEFINER)

  4. Credit Rules
    - Active subscription: Unlimited credits (stored as -1)
    - One-time package: Specific number (e.g., 1 credit = 1 listing)
    - Free users: 0 credits
*/

-- Create user_listing_credits table
CREATE TABLE IF NOT EXISTS user_listing_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  credits integer NOT NULL DEFAULT 0,
  has_unlimited boolean DEFAULT false,
  last_updated timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_user_listing_credits_user_id ON user_listing_credits(user_id);

-- Enable RLS
ALTER TABLE user_listing_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policy
CREATE POLICY "Users can read own credits"
  ON user_listing_credits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add credits column to package_purchases if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'package_purchases' AND column_name = 'credits_granted'
  ) THEN
    ALTER TABLE package_purchases ADD COLUMN credits_granted integer DEFAULT 1;
  END IF;
END $$;

-- Function to initialize credits for a user
CREATE OR REPLACE FUNCTION public.initialize_user_credits(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO user_listing_credits (user_id, credits, has_unlimited)
  VALUES (p_user_id, 0, false)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;

-- Function to grant credits from subscription
CREATE OR REPLACE FUNCTION public.grant_subscription_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Initialize credits if not exists
  INSERT INTO user_listing_credits (user_id, credits, has_unlimited)
  SELECT sc.user_id, 0, true
  FROM stripe_customers sc
  WHERE sc.customer_id = NEW.customer_id
  ON CONFLICT (user_id)
  DO UPDATE SET
    has_unlimited = true,
    last_updated = now();

  RETURN NEW;
END;
$$;

-- Function to grant credits from package purchase
CREATE OR REPLACE FUNCTION public.grant_package_credits()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only grant credits when status becomes 'completed'
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    -- Initialize credits if not exists, then add credits
    INSERT INTO user_listing_credits (user_id, credits, has_unlimited)
    VALUES (NEW.user_id, COALESCE(NEW.credits_granted, 1), false)
    ON CONFLICT (user_id)
    DO UPDATE SET
      credits = user_listing_credits.credits + COALESCE(NEW.credits_granted, 1),
      last_updated = now();
  END IF;

  RETURN NEW;
END;
$$;

-- Function to deduct credits when property is created
CREATE OR REPLACE FUNCTION public.deduct_listing_credit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Deduct one credit (unless user has unlimited)
  UPDATE user_listing_credits
  SET
    credits = CASE
      WHEN has_unlimited THEN credits
      ELSE GREATEST(credits - 1, 0)
    END,
    last_updated = now()
  WHERE user_id = NEW.user_id;

  RETURN NEW;
END;
$$;

-- Function to check if user has available credits
CREATE OR REPLACE FUNCTION public.user_has_listing_credits(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  v_credits integer;
  v_unlimited boolean;
BEGIN
  -- Initialize credits if not exists
  PERFORM public.initialize_user_credits(check_user_id);

  -- Check credits
  SELECT credits, has_unlimited
  INTO v_credits, v_unlimited
  FROM user_listing_credits
  WHERE user_id = check_user_id;

  -- Has credits if unlimited OR has at least 1 credit
  RETURN COALESCE(v_unlimited, false) OR COALESCE(v_credits, 0) > 0;
END;
$$;

-- Create triggers
CREATE TRIGGER grant_subscription_credits_trigger
  AFTER INSERT OR UPDATE ON stripe_subscriptions
  FOR EACH ROW
  WHEN (NEW.status IN ('active', 'trialing'))
  EXECUTE FUNCTION grant_subscription_credits();

CREATE TRIGGER grant_package_credits_trigger
  AFTER INSERT OR UPDATE ON package_purchases
  FOR EACH ROW
  EXECUTE FUNCTION grant_package_credits();

CREATE TRIGGER deduct_listing_credit_trigger
  AFTER INSERT ON properties
  FOR EACH ROW
  EXECUTE FUNCTION deduct_listing_credit();

-- Backfill: Initialize credits for all existing users
INSERT INTO user_listing_credits (user_id, credits, has_unlimited)
SELECT
  au.id,
  0,
  EXISTS (
    SELECT 1
    FROM stripe_customers sc
    JOIN stripe_subscriptions ss ON sc.customer_id = ss.customer_id
    WHERE sc.user_id = au.id
      AND ss.status IN ('active', 'trialing')
      AND ss.deleted_at IS NULL
      AND ss.current_period_end >= EXTRACT(EPOCH FROM NOW())::bigint
  ) as has_unlimited
FROM auth.users au
ON CONFLICT (user_id) DO NOTHING;

-- Update existing subscriptions to grant unlimited credits
UPDATE user_listing_credits ulc
SET
  has_unlimited = true,
  last_updated = now()
FROM stripe_customers sc
JOIN stripe_subscriptions ss ON sc.customer_id = ss.customer_id
WHERE ulc.user_id = sc.user_id
  AND ss.status IN ('active', 'trialing')
  AND ss.deleted_at IS NULL
  AND ss.current_period_end >= EXTRACT(EPOCH FROM NOW())::bigint;

-- Grant credits for completed package purchases
UPDATE user_listing_credits ulc
SET
  credits = ulc.credits + COALESCE(pp.credits_granted, 1),
  last_updated = now()
FROM package_purchases pp
WHERE ulc.user_id = pp.user_id
  AND pp.status = 'completed';

-- Drop old policy and create new one with credits check
DROP POLICY IF EXISTS "Authenticated users with active subscription can insert properties" ON properties;
DROP POLICY IF EXISTS "Authenticated users can insert their own properties" ON properties;

CREATE POLICY "Users with listing credits can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND auth.uid() = user_id
    AND public.user_has_listing_credits(auth.uid())
  );

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.initialize_user_credits(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_has_listing_credits(uuid) TO authenticated;
