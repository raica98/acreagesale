-- Add missing columns to public.properties (idempotent)
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS zoning text,
ADD COLUMN IF NOT EXISTS water text,
ADD COLUMN IF NOT EXISTS electricity text,
ADD COLUMN IF NOT EXISTS sewer text,
ADD COLUMN IF NOT EXISTS latitude double precision,
ADD COLUMN IF NOT EXISTS longitude double precision;

-- Make sure they are nullable
ALTER TABLE public.properties
ALTER COLUMN zoning DROP NOT NULL,
ALTER COLUMN water DROP NOT NULL,
ALTER COLUMN electricity DROP NOT NULL,
ALTER COLUMN sewer DROP NOT NULL,
ALTER COLUMN latitude DROP NOT NULL,
ALTER COLUMN longitude DROP NOT NULL;