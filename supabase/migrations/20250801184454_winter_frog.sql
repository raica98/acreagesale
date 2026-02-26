/*
  # Optimize Properties Query Performance

  1. Database Optimization
    - Add composite index for status + created_at queries
    - Improve query performance for active properties ordered by date

  2. Performance Benefits
    - Faster queries for active properties
    - Optimized sorting by creation date
    - Reduced database scan time
*/

-- Create composite index for status and created_at queries
CREATE INDEX IF NOT EXISTS idx_properties_active_created
ON properties (status, created_at DESC);