import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { Sparkles, Percent, Tag } from 'lucide-react';

const Deals = () => {
  const dealsProducts = useMemo(() => {
    return products
      .filter(p => p.originalPrice && p.originalPrice > p.price)
      .map(p => ({
        ...p,
        discount: Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100),
      }))
      .sort((a, b) => b.discount - a.discount);
  }, []);

  const totalSavings = useMemo(() => {
    return dealsProducts.reduce((acc, p) => acc + (p.originalPrice! - p.price), 0);
  }, [dealsProducts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border border-primary/20 p-8 md:p-12 mb-12"
          >
            <div className="absolute top-0 right-0 opacity-10">
              <Percent className="w-64 h-64 -mt-16 -mr-16" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Limited Time Offers</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Hot Deals & Discounts
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-6">
                Save up to ₹{totalSavings.toLocaleString('en-IN')} on our best-selling smartphones. 
                Limited stock available!
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">{dealsProducts.length} Deals Available</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deals Grid */}
          {dealsProducts.length > 0 ? (
            <ProductGrid 
              products={dealsProducts} 
              title="Current Deals"
              subtitle="Grab them before they're gone!"
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No deals available at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for exciting offers!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
