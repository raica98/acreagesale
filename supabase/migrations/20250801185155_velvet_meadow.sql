/*
  # Add Performance Index for Properties

  1. New Indexes
    - `idx_properties_active_created` - Composite index on (status, created_at desc)
      - Optimizes queries filtering by status = 'active' and ordering by created_at
      - Makes homepage carousel and properties page load lightning fast

  2. Performance Benefits
    - Eliminates full table scans for active properties
    - Speeds up ORDER BY created_at DESC queries
    - Reduces query time from seconds to milliseconds
*/

-- Add composite index for active properties ordered by creation date
CREATE INDEX IF NOT EXISTS idx_properties_active_created
ON properties (status, created_at DESC);

-- Add comment for documentation
COMMENT ON INDEX idx_properties_active_created IS 'Optimizes queries for active properties ordered by creation date';