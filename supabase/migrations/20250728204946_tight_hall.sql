/*
  # Optimize properties table performance

  1. Database Indexes
    - Add index for status filtering (most common query filter)
    - Add index for created_at sorting (used in ORDER BY)
    - Add composite index for status + created_at (optimal for main query)

  2. Performance Benefits
    - Faster filtering by status = 'active'
    - Faster sorting by created_at DESC
    - Eliminates full table scans
    - Reduces query timeout issues
*/

-- Index for filtering by status (most queries filter by status = 'active')
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties (status);

-- Index for sorting by created_at (used in ORDER BY created_at DESC)
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties (created_at DESC);

-- Composite index for the most common query pattern: status + created_at
-- This is optimal for: WHERE status = 'active' ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_properties_status_created_at ON properties (status, created_at DESC);

-- Index for user-specific queries (dashboard)
CREATE INDEX IF NOT EXISTS idx_properties_user_created ON properties (user_id, created_at DESC);

-- Index for location-based searches
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties (city, state);

-- Index for coordinate-based queries (map features)
CREATE INDEX IF NOT EXISTS idx_properties_coordinates ON properties (latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;