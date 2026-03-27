import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, ShoppingBag, IndianRupee, Clock, Star } from 'lucide-react';
import { products } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/product';

interface SmartSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface OrderResult {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
}

const SmartSearch = ({ open, onOpenChange }: SmartSearchProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'budget'>('products');
  const [previousOrders, setPreviousOrders] = useState<OrderResult[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Fetch previous orders when user searches orders
  useEffect(() => {
    if (activeTab === 'orders' && user) {
      fetchOrders();
    }
  }, [activeTab, user, query]);

  const fetchOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      let queryBuilder = supabase
        .from('orders')
        .select('id, order_number, status, total_amount, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (query) {
        queryBuilder = queryBuilder.ilike('order_number', `%${query}%`);
      }

      const { data } = await queryBuilder;
      setPreviousOrders((data as OrderResult[]) || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(p => {
    const q = query.toLowerCase();
    const matchesQuery = !query || 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.specs.processor.toLowerCase().includes(q);
    return matchesQuery;
  }).slice(0, 8);

  // Filter products by budget
  const budgetProducts = products.filter(p => {
    const min = minBudget ? parseInt(minBudget) : 0;
    const max = maxBudget ? parseInt(maxBudget) : Infinity;
    return p.price >= min && p.price <= max;
  }).sort((a, b) => a.price - b.price).slice(0, 8);

  const handleProductClick = (product: Product) => {
    onOpenChange(false);
    setQuery('');
    navigate(`/products?search=${encodeURIComponent(product.name)}`);
  };

  const handleBudgetSearch = () => {
    onOpenChange(false);
    const params = new URLSearchParams();
    if (minBudget) params.set('minPrice', minBudget);
    if (maxBudget) params.set('maxPrice', maxBudget);
    navigate(`/products?${params.toString()}`);
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products, orders, or set budget..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 border-0 bg-transparent focus-visible:ring-0 text-base"
              autoFocus
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'products'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <Package className="w-3 h-3" />
              Previous Orders
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === 'budget'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <IndianRupee className="w-3 h-3" />
              Budget
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors text-left"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 object-contain rounded-md bg-muted/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{product.brand}</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  {query ? 'No products found' : 'Start typing to search products...'}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-1">
              {!user ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Sign in to view your orders</p>
                  <button
                    onClick={() => { onOpenChange(false); navigate('/auth'); }}
                    className="text-sm text-primary hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              ) : loadingOrders ? (
                <div className="py-8 text-center text-sm text-muted-foreground">Loading orders...</div>
              ) : previousOrders.length > 0 ? (
                previousOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{order.order_number}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{formatPrice(order.total_amount)}</p>
                      <Badge variant={
                        order.status === 'delivered' ? 'default' :
                        order.status === 'shipped' ? 'secondary' : 'outline'
                      } className="text-[10px]">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  {query ? 'No orders found' : 'No previous orders yet'}
                </div>
              )}
            </div>
          )}

          {/* Budget Tab */}
          {activeTab === 'budget' && (
            <div>
              <div className="p-3 flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Min Price</label>
                  <Input
                    type="number"
                    placeholder="₹ 0"
                    value={minBudget}
                    onChange={(e) => setMinBudget(e.target.value)}
                    className="h-9"
                  />
                </div>
                <span className="text-muted-foreground mt-4">—</span>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Max Price</label>
                  <Input
                    type="number"
                    placeholder="₹ 200000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    className="h-9"
                  />
                </div>
                <button
                  onClick={handleBudgetSearch}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Go
                </button>
              </div>
              {/* Quick budget presets */}
              <div className="px-3 pb-2 flex flex-wrap gap-2">
                {[
                  { label: 'Under ₹10K', min: '0', max: '10000' },
                  { label: '₹10K - ₹20K', min: '10000', max: '20000' },
                  { label: '₹20K - ₹40K', min: '20000', max: '40000' },
                  { label: '₹40K - ₹70K', min: '40000', max: '70000' },
                  { label: 'Above ₹70K', min: '70000', max: '' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => { setMinBudget(preset.min); setMaxBudget(preset.max); }}
                    className="px-3 py-1.5 text-xs rounded-full border border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {/* Budget results preview */}
              {(minBudget || maxBudget) && (
                <div className="border-t border-border mt-1 pt-2 space-y-1">
                  <p className="px-3 text-xs text-muted-foreground">
                    {budgetProducts.length} phones in budget
                  </p>
                  {budgetProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors text-left"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-8 h-8 object-contain rounded bg-muted/30"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                        <span className="text-xs text-muted-foreground">{product.brand}</span>
                      </div>
                      <p className="text-sm font-semibold text-primary">{formatPrice(product.price)}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">⌘K</kbd>
            <span>to toggle search</span>
          </div>
          <span className="text-xs text-muted-foreground">{products.length} products</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartSearch;
