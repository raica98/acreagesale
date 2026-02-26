/*
  # Create property coordinates table

  1. New Tables
    - `property_coordinates`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `coordinates` (jsonb array of coordinate pairs)
      - `geometry_type` (text, e.g., 'Polygon', 'MultiPolygon')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `property_coordinates` table
    - Add policies for public read access and authenticated write access
*/

-- Create property_coordinates table
CREATE TABLE IF NOT EXISTS property_coordinates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  coordinates jsonb NOT NULL,
  geometry_type text NOT NULL DEFAULT 'Polygon',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE property_coordinates ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS property_coordinates_property_id_idx ON property_coordinates(property_id);

-- RLS Policies
CREATE POLICY "Public can view property coordinates"
  ON property_coordinates
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert property coordinates"
  ON property_coordinates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update property coordinates"
  ON property_coordinates
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete property coordinates"
  ON property_coordinates
  FOR DELETE
  TO authenticated
  USING (true);