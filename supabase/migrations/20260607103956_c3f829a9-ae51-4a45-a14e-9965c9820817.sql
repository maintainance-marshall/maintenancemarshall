
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS property_address text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS job_type text,
  ADD COLUMN IF NOT EXISTS multiple_services text[],
  ADD COLUMN IF NOT EXISTS other_service text,
  ADD COLUMN IF NOT EXISTS preferred_contact text,
  ADD COLUMN IF NOT EXISTS urgency text,
  ADD COLUMN IF NOT EXISTS attachment_urls text[];

-- Make legacy 'message' nullable since we now use 'description'
ALTER TABLE public.contact_submissions ALTER COLUMN message DROP NOT NULL;

-- Replace insert policy to allow new structure
DROP POLICY IF EXISTS "Allow validated anonymous inserts" ON public.contact_submissions;

CREATE POLICY "Allow validated anonymous inserts"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(phone)) BETWEEN 5 AND 30
  AND length(btrim(email)) BETWEEN 3 AND 254
  AND position('@' in email) > 1
  AND length(btrim(service)) BETWEEN 1 AND 200
  AND length(btrim(coalesce(description, message, ''))) BETWEEN 1 AND 5000
  AND length(btrim(coalesce(property_address, ''))) <= 1000
  AND length(btrim(coalesce(preferred_contact, ''))) <= 50
  AND length(btrim(coalesce(urgency, ''))) <= 50
);
