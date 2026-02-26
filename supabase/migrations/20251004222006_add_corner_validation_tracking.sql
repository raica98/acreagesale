/*
  # Add Corner Validation Tracking System

  1. New Tables
    - `corner_validations`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `user_id` (uuid, foreign key to auth.users)
      - `corner_id` (text) - identifier of the corner point
      - `corner_label` (text) - label of the corner (e.g., "Point 1")
      - `validated_at` (timestamptz) - when the corner was reached
      - `user_lat` (decimal) - user's latitude when validated
      - `user_lng` (decimal) - user's longitude when validated
      - `distance` (decimal) - distance from corner when validated
      - `gps_accuracy` (decimal) - GPS accuracy at validation time
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `corner_validations` table
    - Add policy for authenticated users to insert their own validations
    - Add policy for authenticated users to read their own validations
    - Add policy for property owners to read all validations for their properties

  3. Indexes
    - Index on property_id for fast lookups
    - Index on user_id for user validation history
    - Composite index on property_id and user_id for progress tracking
*/

-- Create corner_validations table
CREATE TABLE IF NOT EXISTS corner_validations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  corner_id text NOT NULL,
  corner_label text NOT NULL,
  validated_at timestamptz DEFAULT now(),
  user_lat decimal(10, 8) NOT NULL,
  user_lng decimal(11, 8) NOT NULL,
  distance decimal(6, 2) NOT NULL,
  gps_accuracy decimal(6, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE corner_validations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own corner validations
CREATE POLICY "Users can insert own corner validations"
  ON corner_validations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can read their own corner validations
CREATE POLICY "Users can read own corner validations"
  ON corner_validations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Property owners can read all validations for their properties
CREATE POLICY "Property owners can read property corner validations"
  ON corner_validations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = corner_validations.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_corner_validations_property_id 
  ON corner_validations(property_id);

CREATE INDEX IF NOT EXISTS idx_corner_validations_user_id 
  ON corner_validations(user_id);

CREATE INDEX IF NOT EXISTS idx_corner_validations_property_user 
  ON corner_validations(property_id, user_id);

CREATE INDEX IF NOT EXISTS idx_corner_validations_validated_at 
  ON corner_validations(validated_at DESC);