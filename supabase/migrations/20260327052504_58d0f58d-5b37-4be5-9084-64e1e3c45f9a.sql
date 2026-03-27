
-- Orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_number text NOT NULL,
  status text NOT NULL DEFAULT 'confirmed',
  total_amount numeric NOT NULL,
  shipping_address text,
  payment_method text DEFAULT 'cod',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_price numeric NOT NULL,
  product_image text,
  quantity integer NOT NULL DEFAULT 1,
  selected_color text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Order status history
CREATE TABLE public.order_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.order_number := 'MH-' || to_char(now(), 'YYYYMMDD') || '-' || substr(NEW.id::text, 1, 4);
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_order_number BEFORE INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

-- Auto insert initial status history
CREATE OR REPLACE FUNCTION public.insert_initial_order_status()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  INSERT INTO public.order_status_history (order_id, status, note)
  VALUES (NEW.id, 'confirmed', 'Order placed successfully');
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_initial_status AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.insert_initial_order_status();

-- Update timestamp trigger
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

CREATE POLICY "Users can view own order status" ON public.order_status_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_status_history.order_id AND orders.user_id = auth.uid())
);
