/*
  # Add boundary points column to properties table

  1. Changes
    - Add `boundary_points` JSON column to `properties` table
    - Set default value to empty array
    - Allow null values for backward compatibility

  2. Security
    - No RLS changes needed as this inherits from existing table policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'boundary_points'
  ) THEN
    ALTER TABLE properties ADD COLUMN boundary_points jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;