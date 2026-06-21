import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Banknote, Truck, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [processing, setProcessing] = useState(false);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && user && items.length === 0) navigate('/cart');
  }, [items, authLoading, user, navigate]);

  const validateAddress = () => {
    if (!address.name || !address.phone || !address.street || !address.city || !address.state || !address.pincode) {
      toast.error('Please fill in all address fields');
      return false;
    }
    if (!/^\d{10}$/.test(address.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const isValidImageUrl = (url: unknown): url is string => {
    if (typeof url !== 'string' || url.trim() === '') return false;
    try {
      const u = new URL(url.trim());
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleOnlinePayment = async () => {
    if (!validateAddress()) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items: items.map(item => ({
            product_name: item.product_name,
            product_price: item.product_price,
            product_image: isValidImageUrl(item.product_image) ? item.product_image.trim() : null,
            quantity: item.quantity,
          })),
          address,
        },
      });


      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCODOrder = async () => {
    if (!validateAddress()) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-order-email', {
        body: {
          items: items.map(item => ({
            product_name: item.product_name,
            product_price: item.product_price,
            quantity: item.quantity,
          })),
          address,
          totalPrice,
        },
      });

      if (error) throw error;

      await clearCart();
      toast.success(`Order placed successfully! 🎉 Order ID: ${data?.orderId}`);
      navigate('/');
    } catch (err: any) {
      console.error('COD order error:', err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'online') {
      handleOnlinePayment();
    } else {
      handleCODOrder();
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button onClick={() => navigate('/cart')} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>

          <h1 className="font-display text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Form */}
            <div className="md:col-span-3 space-y-8">
              {/* Shipping Address */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
                <h2 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" /> Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label htmlFor="name">Full Name</Label><Input id="name" value={address.name} onChange={e => setAddress(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" /></div>
                  <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={address.phone} onChange={e => setAddress(p => ({ ...p, phone: e.target.value }))} placeholder="10-digit number" /></div>
                  <div className="sm:col-span-2"><Label htmlFor="street">Street Address</Label><Input id="street" value={address.street} onChange={e => setAddress(p => ({ ...p, street: e.target.value }))} placeholder="House no, street, area" /></div>
                  <div><Label htmlFor="city">City</Label><Input id="city" value={address.city} onChange={e => setAddress(p => ({ ...p, city: e.target.value }))} placeholder="City" /></div>
                  <div><Label htmlFor="state">State</Label><Input id="state" value={address.state} onChange={e => setAddress(p => ({ ...p, state: e.target.value }))} placeholder="State" /></div>
                  <div><Label htmlFor="pincode">Pincode</Label><Input id="pincode" value={address.pincode} onChange={e => setAddress(p => ({ ...p, pincode: e.target.value }))} placeholder="6-digit pincode" /></div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
                <h2 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                </h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors">
                    <RadioGroupItem value="online" id="online" />
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div><p className="font-medium text-foreground">Online Payment</p><p className="text-xs text-muted-foreground">Card, UPI, Net Banking via Stripe</p></div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Banknote className="w-5 h-5 text-green-500" />
                    <div><p className="font-medium text-foreground">Cash on Delivery</p><p className="text-xs text-muted-foreground">Pay when you receive</p></div>
                  </label>
                </RadioGroup>
              </motion.div>

              {/* Delivery Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
                <h2 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Delivery Info
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🚚 <span className="text-green-500 font-medium">Free Delivery</span> on all orders</p>
                  <p>📦 Estimated delivery: <span className="text-foreground font-medium">3-5 business days</span></p>
                  <p>🔄 Easy 7-day return policy</p>
                </div>
              </motion.div>
            </div>

            {/* Summary */}
            <div className="md:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2">{item.product_name} × {item.quantity}</span>
                      <span className="text-foreground font-medium whitespace-nowrap">₹{(item.product_price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex justify-between text-muted-foreground text-sm"><span>Items ({totalItems})</span><span>₹{totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between text-muted-foreground text-sm"><span>Shipping</span><span className="text-green-500">Free</span></div>
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground"><span>Total</span><span className="text-xl">₹{totalPrice.toLocaleString()}</span></div>
                </div>
                <Button className="w-full mt-6 py-6" onClick={handlePlaceOrder} disabled={processing}>
                  {processing ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Processing...</span>
                  ) : paymentMethod === 'online' ? (
                    `Pay Online • ₹${totalPrice.toLocaleString()}`
                  ) : (
                    `Place COD Order • ₹${totalPrice.toLocaleString()}`
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  {paymentMethod === 'online' ? '🔒 Secure payment via Stripe' : '💵 Pay cash on delivery • Confirmation email will be sent'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
