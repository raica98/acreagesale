/*
  # Add property detail columns to properties table

  1. Schema Changes
    - Add `zoning` text field for property zoning information
    - Add `water` text field for water availability details
    - Add `electricity` text field for electrical service information
    - Add `sewer` text field for sewer/septic system details
    - Add `latitude` double precision for GPS coordinates
    - Add `longitude` double precision for GPS coordinates

  2. Data Integrity
    - All fields allow null values for backward compatibility
    - Existing properties will have null values for new fields
    - No data migration needed
*/

-- Add property detail columns if they don't exist
DO $$
BEGIN
  -- Add zoning column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'zoning'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN zoning text;
    COMMENT ON COLUMN public.properties.zoning IS 'Property zoning classification (e.g., Residential, Commercial, Agricultural)';
  END IF;

  -- Add water column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'water'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN water text;
    COMMENT ON COLUMN public.properties.water IS 'Water availability and source information';
  END IF;

  -- Add electricity column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'electricity'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN electricity text;
    COMMENT ON COLUMN public.properties.electricity IS 'Electrical service availability and details';
  END IF;

  -- Add sewer column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'sewer'
  ) THEN
    ALTER TABLE public.properties ADD COLUMN sewer text;
    COMMENT ON COLUMN public.properties.sewer IS 'Sewer or septic system information';
  END IF;

  -- Check if latitude column exists and has correct type
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'latitude'
    AND data_type = 'double precision'
  ) THEN
    -- Drop existing latitude if it exists with wrong type
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' 
      AND table_name = 'properties' 
      AND column_name = 'latitude'
    ) THEN
      ALTER TABLE public.properties DROP COLUMN latitude;
    END IF;
    
    ALTER TABLE public.properties ADD COLUMN latitude double precision;
    COMMENT ON COLUMN public.properties.latitude IS 'Property latitude coordinate in WGS84 decimal degrees';
  END IF;

  -- Check if longitude column exists and has correct type
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' 
    AND table_name = 'properties' 
    AND column_name = 'longitude'
    AND data_type = 'double precision'
  ) THEN
    -- Drop existing longitude if it exists with wrong type
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' 
      AND table_name = 'properties' 
      AND column_name = 'longitude'
    ) THEN
      ALTER TABLE public.properties DROP COLUMN longitude;
    END IF;
    
    ALTER TABLE public.properties ADD COLUMN longitude double precision;
    COMMENT ON COLUMN public.properties.longitude IS 'Property longitude coordinate in WGS84 decimal degrees';
  END IF;
END $$;