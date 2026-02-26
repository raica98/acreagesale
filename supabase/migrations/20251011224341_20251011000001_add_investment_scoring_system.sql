/*
  # Add AI Investment Opportunity Scoring System

  ## Overview
  This migration adds comprehensive investment scoring functionality to the land marketplace platform.
  Properties are automatically scored based on Location, Development Potential, and Market Trends.

  ## 1. New Tables

  ### `market_regions`
  Reference table containing predefined market regions with growth data
  - `id` (uuid, primary key)
  - `name` (text) - Region name (e.g., "Southwest", "Mountain West")
  - `states` (text[]) - Array of state codes in this region
  - `growth_rate` (decimal) - Annual appreciation rate percentage
  - `avg_price_per_acre` (decimal) - Average price per acre in region
  - `market_temperature` (text) - Hot, Warm, Cool, Cold
  - `description` (text) - Market insights and trends
  - `updated_at` (timestamptz)

  ### `property_investment_scores`
  Stores calculated investment scores and analysis for each property
  - `id` (uuid, primary key)
  - `property_id` (uuid, foreign key to properties)
  - `investment_score` (integer) - Total score 0-100
  - `risk_level` (text) - Low, Medium, High
  - `location_score` (integer) - Location component 0-35
  - `development_score` (integer) - Development potential 0-35
  - `market_score` (integer) - Market trends component 0-30
  - `score_breakdown` (jsonb) - Detailed explanation of scoring factors
  - `calculated_at` (timestamptz) - When score was last calculated
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 2. Schema Modifications
  - Add `region` column to properties table (auto-calculated from state)

  ## 3. Security
  - Enable RLS on all new tables
  - Allow public read access to market_regions (reference data)
  - Allow public read access to property_investment_scores (score data)
  - Only system/authenticated users can insert/update scores

  ## 4. Indexes
  - Index on property_investment_scores.property_id for fast lookups
  - Index on property_investment_scores.investment_score for filtering/sorting
  - Index on properties.region for regional queries

  ## 5. Seed Data
  - Pre-populate market_regions with US regional growth data
*/

-- Create market_regions table
CREATE TABLE IF NOT EXISTS market_regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  states text[] NOT NULL,
  growth_rate decimal(5, 2) NOT NULL,
  avg_price_per_acre decimal(10, 2) DEFAULT 0,
  market_temperature text DEFAULT 'Warm',
  description text,
  updated_at timestamptz DEFAULT now()
);

-- Create property_investment_scores table
CREATE TABLE IF NOT EXISTS property_investment_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  investment_score integer NOT NULL CHECK (investment_score >= 0 AND investment_score <= 100),
  risk_level text NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High')),
  location_score integer NOT NULL CHECK (location_score >= 0 AND location_score <= 35),
  development_score integer NOT NULL CHECK (development_score >= 0 AND development_score <= 35),
  market_score integer NOT NULL CHECK (market_score >= 0 AND market_score <= 30),
  score_breakdown jsonb DEFAULT '{}'::jsonb,
  calculated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(property_id)
);

-- Add region column to properties table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'region'
  ) THEN
    ALTER TABLE properties ADD COLUMN region text;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE market_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_investment_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for market_regions (public read access)
CREATE POLICY "Anyone can read market regions"
  ON market_regions
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert market regions"
  ON market_regions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update market regions"
  ON market_regions
  FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for property_investment_scores (public read access)
CREATE POLICY "Anyone can read investment scores"
  ON property_investment_scores
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can insert investment scores"
  ON property_investment_scores
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update investment scores"
  ON property_investment_scores
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_investment_scores_property_id
  ON property_investment_scores(property_id);

CREATE INDEX IF NOT EXISTS idx_investment_scores_score
  ON property_investment_scores(investment_score DESC);

CREATE INDEX IF NOT EXISTS idx_investment_scores_risk_level
  ON property_investment_scores(risk_level);

CREATE INDEX IF NOT EXISTS idx_properties_region
  ON properties(region);

-- Seed market_regions with US regional data
INSERT INTO market_regions (name, states, growth_rate, market_temperature, description) VALUES
  ('Southwest', ARRAY['AZ', 'NM', 'NV'], 15.2, 'Hot', 'Rapid population growth driven by tech industry migration and retirement destinations. Strong infrastructure development.'),
  ('Mountain West', ARRAY['CO', 'UT', 'ID', 'MT', 'WY'], 18.5, 'Hot', 'Highest appreciation rates in the nation. Outdoor recreation demand and remote work trends driving unprecedented growth.'),
  ('Texas Triangle', ARRAY['TX'], 14.1, 'Hot', 'Business-friendly environment attracting major corporations. Dallas, Houston, Austin corridor experiencing explosive growth.'),
  ('Southeast', ARRAY['FL', 'GA', 'SC', 'NC', 'AL', 'TN', 'KY', 'VA', 'WV', 'MS', 'LA', 'AR'], 12.8, 'Warm', 'Steady appreciation with strong population influx. Florida leads growth, followed by Carolinas and Georgia.'),
  ('Pacific West', ARRAY['CA', 'OR', 'WA'], 10.5, 'Warm', 'High land values with moderate growth. Coastal restrictions create scarcity. Strong long-term appreciation.'),
  ('Midwest', ARRAY['IL', 'IN', 'OH', 'MI', 'WI', 'MN', 'IA', 'MO', 'KS', 'NE', 'SD', 'ND'], 6.3, 'Cool', 'Stable, predictable market with agricultural focus. Lower appreciation but affordable entry points.'),
  ('Northeast', ARRAY['NY', 'PA', 'NJ', 'CT', 'MA', 'RI', 'VT', 'NH', 'ME', 'MD', 'DE'], 7.8, 'Warm', 'Mature market with limited available land. High barriers to entry create stable long-term value.'),
  ('Alaska & Hawaii', ARRAY['AK', 'HI'], 5.2, 'Cool', 'Unique markets with limited supply. Tourism and resource extraction drive specific opportunities.')
ON CONFLICT (name) DO NOTHING;

-- Function to auto-assign region based on state
CREATE OR REPLACE FUNCTION assign_property_region()
RETURNS trigger AS $$
BEGIN
  -- Assign region based on state
  NEW.region := (
    SELECT name
    FROM market_regions
    WHERE NEW.state = ANY(states)
    LIMIT 1
  );

  -- Default to 'Other' if no region found
  IF NEW.region IS NULL THEN
    NEW.region := 'Other';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-assign region on insert/update
DROP TRIGGER IF EXISTS trigger_assign_property_region ON properties;
CREATE TRIGGER trigger_assign_property_region
  BEFORE INSERT OR UPDATE OF state ON properties
  FOR EACH ROW
  EXECUTE FUNCTION assign_property_region();

-- Update existing properties with regions
UPDATE properties
SET region = (
  SELECT name
  FROM market_regions
  WHERE properties.state = ANY(market_regions.states)
  LIMIT 1
)
WHERE region IS NULL;

-- Set default region for properties without a match
UPDATE properties
SET region = 'Other'
WHERE region IS NULL;
