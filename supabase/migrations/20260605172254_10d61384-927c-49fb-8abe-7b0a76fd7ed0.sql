DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;

CREATE POLICY "Allow validated anonymous inserts"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(phone)) BETWEEN 5 AND 30
  AND length(btrim(email)) BETWEEN 3 AND 254
  AND position('@' in email) > 1
  AND length(btrim(service)) BETWEEN 1 AND 100
  AND length(btrim(message)) BETWEEN 1 AND 5000
);