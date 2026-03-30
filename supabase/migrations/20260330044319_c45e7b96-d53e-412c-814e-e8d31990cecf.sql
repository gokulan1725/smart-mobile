-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can insert product views" ON public.product_views;

-- Allow anyone to insert but only with valid data (keep public for analytics tracking)
-- Use a more restrictive policy that still allows anonymous tracking
CREATE POLICY "Allow product view tracking"
ON public.product_views
FOR INSERT
TO public
WITH CHECK (
  product_id IS NOT NULL AND session_id IS NOT NULL
);