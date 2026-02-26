/*
  # Add Utility and Zoning Columns to Properties

  1. Changes
    - Add `zoning` column to store property zoning information
    - Add `water` column to store water availability/source
    - Add `electricity` column to store electricity availability
    - Add `sewer` column to store sewer/septic information
  
  2. Notes
    - All columns are optional (nullable) as this information may not always be available
    - Using text type for flexibility in storing various descriptions
*/

DO $$
BEGIN
  -- Add zoning column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'zoning'
  ) THEN
    ALTER TABLE properties ADD COLUMN zoning text;
  END IF;

  -- Add water column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'water'
  ) THEN
    ALTER TABLE properties ADD COLUMN water text;
  END IF;

  -- Add electricity column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'electricity'
  ) THEN
    ALTER TABLE properties ADD COLUMN electricity text;
  END IF;

  -- Add sewer column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'sewer'
  ) THEN
    ALTER TABLE properties ADD COLUMN sewer text;
  END IF;
END $$;