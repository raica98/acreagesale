# How to Apply Pending Database Migrations

## Current Issue
Users cannot post properties because the new **credits-based listing system** hasn't been set up yet.

## NEW: Credits-Based System
The platform now uses a **credits-based listing system**:
- **Active subscriptions**: Unlimited listing credits (can post unlimited properties)
- **One-time packages**: Specific number of credits (e.g., 1 credit = 1 listing)
- **Free users**: 0 credits (must purchase to list)

When a user creates a property listing, one credit is automatically deducted (unless they have unlimited).

## Solution
You need to manually run these database migrations to implement the credits system.

## Steps to Apply Migrations

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/ewucowczaovcqpdipton

2. Navigate to: **SQL Editor** (in the left sidebar)

3. Run these migrations **in order**:

#### Migration 1: Add Listing Credits System
```sql
-- File: 20251020080000_add_listing_credits_system.sql
-- Copy the entire contents from: supabase/migrations/20251020080000_add_listing_credits_system.sql
-- Paste into SQL Editor and click "Run"
```

#### Migration 2: Update User Signup with Credits
```sql
-- File: 20251020080100_update_user_signup_with_credits.sql
-- Copy the entire contents from: supabase/migrations/20251020080100_update_user_signup_with_credits.sql
-- Paste into SQL Editor and click "Run"
```

### Option 2: Quick Fix (Apply Only What You Need)

If you want to test immediately, you can run just Migration 1, which includes:
- Creates the credits table
- Sets up automatic credit management
- Backfills credits for existing users
- Updates the property insert policy

## What These Migrations Do

### Migration 1: Add Listing Credits System
- Creates `user_listing_credits` table to track credits per user
- Adds triggers to automatically grant credits when subscriptions/packages are purchased
- Adds trigger to automatically deduct credits when properties are created
- Updates property insert policy to check for available credits
- Backfills credits for all existing users based on their subscriptions

### Migration 2: Update User Signup with Credits
- Updates the signup trigger to initialize credits for new users
- New users start with 0 credits
- When their test subscription is created, they automatically get unlimited credits

## After Applying

### What Users Will See:
- Credits banner at the top of the "Create Listing" modal
- Shows "Unlimited Listings" for subscribed users
- Shows "X Listing Credits Available" for users with package credits
- Shows "0 Listing Credits" with "Get Credits" button for free users

### Automatic Credit Management:
- When a user buys a subscription → they get unlimited credits
- When a user buys a one-time package → they get specific credits (e.g., 1 credit)
- When a user creates a listing → 1 credit is deducted automatically
- Users cannot create listings without available credits

## Testing the System

1. **Test with existing user**:
   - Should have unlimited credits (due to test subscription)
   - Can create properties
   - Credits banner shows "Unlimited Listings"

2. **Test with new user**:
   - Sign up → automatically gets test subscription → gets unlimited credits
   - Can create properties immediately

3. **Test package purchase** (future):
   - When Stripe is integrated, buying a package will grant specific credits
   - Creating a listing will deduct 1 credit

## Future: Stripe Integration

When implementing real Stripe payments:

1. **For Subscriptions**:
   - Webhook updates subscription status → triggers grant unlimited credits
   - Cancellation removes unlimited flag

2. **For One-Time Packages**:
   - Webhook marks package as "completed" → triggers grant X credits
   - Can configure `credits_granted` column when creating package

Example package with 1 listing credit:
```sql
INSERT INTO package_purchases (user_id, package_type, amount, currency, credits_granted, status)
VALUES ('[user_id]', 'premium', 20000, 'usd', 1, 'completed');
-- This will automatically grant 1 credit to the user
```

## Troubleshooting

### User has 0 credits after migration
Run this to manually grant credits:
```sql
-- Grant unlimited credits (for subscription users)
UPDATE user_listing_credits
SET has_unlimited = true, credits = 0, last_updated = now()
WHERE user_id = '[user_id]';

-- OR grant specific credits (for package users)
UPDATE user_listing_credits
SET credits = credits + 1, last_updated = now()
WHERE user_id = '[user_id]';
```

### Credits not deducting after listing
Check if the trigger is active:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'deduct_listing_credit_trigger';
```

### User can't create listing despite having credits
Check RLS policy:
```sql
SELECT * FROM pg_policies WHERE tablename = 'properties' AND cmd = 'INSERT';
```
