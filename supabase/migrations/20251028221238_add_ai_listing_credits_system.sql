/*
  # Add AI Listing Credits System

  1. New Tables
    - `ai_listing_credits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `credits` (integer, number of available credits)
      - `total_purchased` (integer, total credits ever purchased)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `ai_listing_credit_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `credits_change` (integer, positive for purchase, negative for usage)
      - `transaction_type` (text, 'purchase' or 'usage')
      - `property_id` (uuid, foreign key to properties, nullable)
      - `stripe_payment_intent_id` (text, nullable)
      - `stripe_session_id` (text, nullable)
      - `notes` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can view their own credits and transactions
    - Only authenticated users can access their data
    - Service role can manage all credits (for webhook)

  3. Functions
    - `get_user_credits(user_id)` - Get current credit balance
    - `consume_ai_listing_credit(user_id, property_id)` - Consume one credit
    - `add_ai_listing_credits(user_id, credits, payment_info)` - Add credits after purchase
*/

-- Create ai_listing_credits table
CREATE TABLE IF NOT EXISTS ai_listing_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits integer NOT NULL DEFAULT 0,
  total_purchased integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create ai_listing_credit_transactions table
CREATE TABLE IF NOT EXISTS ai_listing_credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_change integer NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('purchase', 'usage')),
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  stripe_payment_intent_id text,
  stripe_session_id text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_listing_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_listing_credit_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_listing_credits
CREATE POLICY "Users can view own credits"
  ON ai_listing_credits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own credits"
  ON ai_listing_credits
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own credits"
  ON ai_listing_credits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ai_listing_credit_transactions
CREATE POLICY "Users can view own transactions"
  ON ai_listing_credit_transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON ai_listing_credit_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to get user credits
CREATE OR REPLACE FUNCTION get_user_credits(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_credits integer;
BEGIN
  SELECT credits INTO v_credits
  FROM ai_listing_credits
  WHERE user_id = p_user_id;
  
  -- If no record exists, return 0
  IF v_credits IS NULL THEN
    RETURN 0;
  END IF;
  
  RETURN v_credits;
END;
$$;

-- Function to consume one AI listing credit
CREATE OR REPLACE FUNCTION consume_ai_listing_credit(p_user_id uuid, p_property_id uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_credits integer;
BEGIN
  -- Get current credits
  SELECT credits INTO v_current_credits
  FROM ai_listing_credits
  WHERE user_id = p_user_id
  FOR UPDATE;
  
  -- Check if user has credits
  IF v_current_credits IS NULL OR v_current_credits < 1 THEN
    RETURN false;
  END IF;
  
  -- Deduct one credit
  UPDATE ai_listing_credits
  SET credits = credits - 1,
      updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Log the transaction
  INSERT INTO ai_listing_credit_transactions (
    user_id,
    credits_change,
    transaction_type,
    property_id,
    notes
  ) VALUES (
    p_user_id,
    -1,
    'usage',
    p_property_id,
    'Used credit for AI listing generation'
  );
  
  RETURN true;
END;
$$;

-- Function to add AI listing credits after purchase
CREATE OR REPLACE FUNCTION add_ai_listing_credits(
  p_user_id uuid,
  p_credits integer,
  p_stripe_payment_intent_id text DEFAULT NULL,
  p_stripe_session_id text DEFAULT NULL,
  p_notes text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert or update credits
  INSERT INTO ai_listing_credits (user_id, credits, total_purchased)
  VALUES (p_user_id, p_credits, p_credits)
  ON CONFLICT (user_id)
  DO UPDATE SET
    credits = ai_listing_credits.credits + p_credits,
    total_purchased = ai_listing_credits.total_purchased + p_credits,
    updated_at = now();
  
  -- Log the transaction
  INSERT INTO ai_listing_credit_transactions (
    user_id,
    credits_change,
    transaction_type,
    stripe_payment_intent_id,
    stripe_session_id,
    notes
  ) VALUES (
    p_user_id,
    p_credits,
    'purchase',
    p_stripe_payment_intent_id,
    p_stripe_session_id,
    COALESCE(p_notes, 'Purchased ' || p_credits || ' AI listing credit(s)')
  );
  
  RETURN true;
END;
$$;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_ai_listing_credits_user_id ON ai_listing_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_listing_credit_transactions_user_id ON ai_listing_credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_listing_credit_transactions_created_at ON ai_listing_credit_transactions(created_at DESC);
