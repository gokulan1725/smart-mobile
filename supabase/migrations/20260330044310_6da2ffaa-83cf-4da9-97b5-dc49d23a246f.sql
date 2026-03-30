-- Drop existing permissive SELECT policy that exposes all data publicly
DROP POLICY IF EXISTS "Anyone can read product views" ON public.product_views;

-- Allow authenticated users to read only their own views
CREATE POLICY "Users can read own product views"
ON public.product_views
FOR SELECT
TO authenticated
USING (user_id = auth.uid());