import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { newArrivals } from '@/data/products';
import { Sparkles, Zap } from 'lucide-react';

const NewArrivals = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/20 via-primary/10 to-secondary/20 border border-accent/20 p-8 md:p-12 mb-12"
          >
            <div className="absolute top-0 right-0 opacity-10">
              <Zap className="w-64 h-64 -mt-16 -mr-16" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 mb-4">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-medium">Just Launched</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                New Arrivals
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mb-6">
                Discover the latest smartphones featuring cutting-edge technology, 
                stunning designs, and powerful performance.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium">{newArrivals.length} New Products</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          {newArrivals.length > 0 ? (
            <ProductGrid 
              products={newArrivals} 
              title="Latest Releases"
              subtitle="Fresh from the manufacturers"
            />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No new arrivals at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for the latest devices!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewArrivals;
