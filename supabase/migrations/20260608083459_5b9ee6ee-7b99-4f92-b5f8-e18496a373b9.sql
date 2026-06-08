
-- Tighten storage INSERT policy to require 'submissions/' prefix
DROP POLICY IF EXISTS "quote_attachments_insert" ON storage.objects;
CREATE POLICY "quote_attachments_insert"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'quote-attachments'
  AND (storage.foldername(name))[1] = 'submissions'
  AND octet_length(COALESCE(metadata, '{}'::jsonb)::text) >= 0
);

-- Rate limit tracking table
CREATE TABLE public.contact_submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX contact_rl_ip_time_idx ON public.contact_submission_rate_limits (ip_hash, created_at DESC);
GRANT ALL ON public.contact_submission_rate_limits TO service_role;
ALTER TABLE public.contact_submission_rate_limits ENABLE ROW LEVEL SECURITY;
-- No policies: only service_role (which bypasses RLS) reads/writes.
