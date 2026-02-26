/*
  # Add email column to stripe_customers
  
  The stripe_customers table exists but is missing the email column.
  This migration adds it.
*/

-- Add email column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'stripe_customers' AND column_name = 'email'
  ) THEN
    ALTER TABLE stripe_customers ADD COLUMN email text NOT NULL DEFAULT 'pending@example.com';
  END IF;
END $$;
