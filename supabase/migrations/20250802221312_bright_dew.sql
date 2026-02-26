/*
  # Create offers table for property reservations

  1. New Tables
    - `offers`
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `owner_id` (uuid, foreign key to profiles)
      - `buyer_name` (text)
      - `buyer_email` (text)
      - `buyer_phone` (text)
      - `offer_amount` (numeric)
      - `timeline` (text, optional)
      - `status` (text, default 'Pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `offers` table
    - Add policies for property owners to manage their offers
    - Add policy for authenticated users to submit offers
*/

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  buyer_name text NOT NULL,
  buyer_email text NOT NULL,
  buyer_phone text NOT NULL,
  offer_amount numeric NOT NULL,
  timeline text,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS offers_property_id_idx ON offers(property_id);
CREATE INDEX IF NOT EXISTS offers_owner_id_idx ON offers(owner_id);
CREATE INDEX IF NOT EXISTS offers_status_idx ON offers(status);
CREATE INDEX IF NOT EXISTS offers_created_at_idx ON offers(created_at DESC);

-- RLS Policies
CREATE POLICY "Property owners can view offers for their properties"
  ON offers
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Property owners can update offers for their properties"
  ON offers
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Property owners can delete offers for their properties"
  ON offers
  FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Anyone can submit offers"
  ON offers
  FOR INSERT
  TO public
  WITH CHECK (true);