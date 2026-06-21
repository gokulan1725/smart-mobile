
DROP POLICY IF EXISTS "Allow product view tracking" ON public.product_views;
CREATE POLICY "Allow product view tracking"
ON public.product_views
FOR INSERT
WITH CHECK (
  product_id IS NOT NULL
  AND session_id IS NOT NULL
  AND (user_id IS NULL OR user_id = auth.uid())
);

REVOKE EXECUTE ON FUNCTION public.generate_order_number() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.insert_initial_order_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
