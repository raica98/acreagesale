/*
  # Remove Test Subscriptions and Customers

  ## Changes
  
  - Delete all test subscriptions (subscription_id starting with 'sub_test_')
  - Delete all test Stripe customers (customer_id starting with 'cus_test_')
  - This ensures existing users don't have automatic premium access
  - Users must purchase the $249 package to gain access
  
  ## Migration Details
  
  This removes all test data that was automatically granting users premium access.
*/

-- Delete all test subscriptions
DELETE FROM stripe_subscriptions 
WHERE subscription_id LIKE 'sub_test_%';

-- Delete all test Stripe customers
DELETE FROM stripe_customers 
WHERE customer_id LIKE 'cus_test_%';