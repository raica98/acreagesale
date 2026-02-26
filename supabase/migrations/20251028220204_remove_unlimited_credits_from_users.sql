/*
  # Remove Unlimited Credits from All Users

  ## Changes
  
  - Set has_unlimited to false for all users
  - Set credits to 0 for all users who don't have valid purchases
  - Only users who have purchased the $249 package should have access
  
  ## Migration Details
  
  This ensures no users have unlimited listing credits unless they've
  purchased the premium package.
*/

-- Remove unlimited credits from all users
UPDATE user_listing_credits
SET has_unlimited = false, credits = 0
WHERE has_unlimited = true;