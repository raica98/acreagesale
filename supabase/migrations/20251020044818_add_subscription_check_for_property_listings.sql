/*
  # Add Subscription Check for Property Listings
  
  This migration adds a requirement that users must have an active Stripe subscription
  to create property listings. This prevents unauthorized listing creation.
  
  ## Changes
  
  1. Creates a function to check if a user has an active subscription
  2. Updates the properties INSERT policy to require an active subscription
  
  ## Security Impact
  
  Users must:
  - Be authenticated (auth.uid() IS NOT NULL)
  - Have an active Stripe subscription (status = 'active' or 'trialing')
  - Insert properties with their own user_id
  
  This prevents:
  - Unauthenticated users from creating listings
  - Authenticated users without subscriptions from creating listings
  - Users from creating listings for other users
*/

-- Create function to check if user has active subscription
CREATE OR REPLACE FUNCTION public.user_has_active_subscription(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  -- Check if user has an active subscription through stripe_customers and stripe_subscriptions
  RETURN EXISTS (
    SELECT 1
    FROM stripe_customers sc
    JOIN stripe_subscriptions ss ON sc.customer_id = ss.customer_id
    WHERE sc.user_id = check_user_id
      AND sc.deleted_at IS NULL
      AND ss.deleted_at IS NULL
      AND ss.status IN ('active', 'trialing')
      AND ss.current_period_end >= EXTRACT(EPOCH FROM NOW())::bigint
  );
END;
$$;

-- Drop the existing insert policy
DROP POLICY IF EXISTS "Authenticated users can insert their own properties" ON properties;

-- Create new insert policy that requires active subscription
CREATE POLICY "Authenticated users with active subscription can insert properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL 
    AND auth.uid() = user_id
    AND public.user_has_active_subscription(auth.uid())
  );

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION public.user_has_active_subscription(uuid) TO authenticated;
