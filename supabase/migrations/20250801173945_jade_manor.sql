/*
  # Add optimized indexes for user properties queries

  1. Database Optimization
    - Add composite index on (user_id, created_at DESC) for faster user property queries
    - Add index on user_id for general user-based filtering
    - These indexes will prevent query timeouts on the dashboard

  2. Performance Impact
    - Dramatically speeds up user property fetching
    - Eliminates statement timeout errors
    - Optimizes ORDER BY created_at DESC queries
*/

-- Add composite index for user properties ordered by creation date
CREATE INDEX IF NOT EXISTS idx_properties_user_created_optimized 
ON properties (user_id, created_at DESC);

-- Add simple index on user_id for fast user filtering
CREATE INDEX IF NOT EXISTS idx_properties_user_id_simple 
ON properties (user_id);

-- Add index for status filtering (used in public queries)
CREATE INDEX IF NOT EXISTS idx_properties_status_optimized 
ON properties (status) WHERE status = 'active';