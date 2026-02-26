/*
  # Add utility fields to properties table

  1. New Columns
    - `apn` (text) - Assessor's Parcel Number (already exists)
    - `zoning` (text) - Zoning information
    - `gps_coordinates` (text) - GPS coordinates as string
    - `water` (text) - Water utility availability
    - `electricity` (text) - Electrical utility availability
    - `sewer` (text) - Sewer utility availability

  2. Security
    - No RLS changes needed as these inherit from existing table policies
*/

-- Add zoning field if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'zoning'
  ) THEN
    ALTER TABLE properties ADD COLUMN zoning text;
  END IF;
END $$;

-- Add gps_coordinates field if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'gps_coordinates'
  ) THEN
    ALTER TABLE properties ADD COLUMN gps_coordinates text;
  END IF;
END $$;

-- Add water field if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'water'
  ) THEN
    ALTER TABLE properties ADD COLUMN water text;
  END IF;
END $$;

-- Add electricity field if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'electricity'
  ) THEN
    ALTER TABLE properties ADD COLUMN electricity text;
  END IF;
END $$;

-- Add sewer field if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'sewer'
  ) THEN
    ALTER TABLE properties ADD COLUMN sewer text;
  END IF;
END $$;