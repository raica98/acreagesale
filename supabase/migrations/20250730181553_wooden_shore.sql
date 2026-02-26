/*
  # Add index for properties created_at column

  1. Performance Optimization
    - Add index on `created_at` column for faster ORDER BY queries
    - Reduces query timeout issues on large tables
    - Improves homepage property loading performance

  2. Index Details
    - Descending order index for newest-first queries
    - Covers the most common query pattern used in the application
*/

-- Add index for created_at column to improve query performance
CREATE INDEX IF NOT EXISTS properties_created_at_idx ON public.properties (created_at DESC);

-- Add index for status + created_at combination (commonly used together)
CREATE INDEX IF NOT EXISTS properties_status_created_at_idx ON public.properties (status, created_at DESC);

-- Add index for user_id + created_at combination (for dashboard queries)
CREATE INDEX IF NOT EXISTS properties_user_created_idx ON public.properties (user_id, created_at DESC);