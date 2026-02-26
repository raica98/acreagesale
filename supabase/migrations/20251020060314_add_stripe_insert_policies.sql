/*
  # Add INSERT policies for Stripe tables
  
  This migration adds the missing INSERT policies that allow authenticated users
  to create their own Stripe customer records and the edge functions to work properly.
  
  ## Changes
  
  1. Add INSERT policy for stripe_customers - users can insert their own customer record
  2. Add INSERT policy for package_purchases - users can record their own purchases
  
  ## Security
  
  - Users can only insert records for themselves (auth.uid() = user_id)
  - Maintains data isolation between users
*/

-- Add INSERT policy for stripe_customers
CREATE POLICY "Users can insert own customer data"
  ON stripe_customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add INSERT policy for package_purchases
CREATE POLICY "Users can insert own purchases"
  ON package_purchases
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);