-- Restrict storage.objects for quote-attachments bucket
DROP POLICY IF EXISTS "quote_attachments_insert" ON storage.objects;
DROP POLICY IF EXISTS "quote_attachments_select_service" ON storage.objects;
DROP POLICY IF EXISTS "quote_attachments_update_service" ON storage.objects;
DROP POLICY IF EXISTS "quote_attachments_delete_service" ON storage.objects;

CREATE POLICY "quote_attachments_insert"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'quote-attachments'
  AND COALESCE((metadata->>'size')::bigint, 0) <= 10485760
  AND (metadata->>'mimetype') IN (
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
);

CREATE POLICY "quote_attachments_select_service"
ON storage.objects
FOR SELECT
TO service_role
USING (bucket_id = 'quote-attachments');

CREATE POLICY "quote_attachments_update_service"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'quote-attachments')
WITH CHECK (bucket_id = 'quote-attachments');

CREATE POLICY "quote_attachments_delete_service"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'quote-attachments');
