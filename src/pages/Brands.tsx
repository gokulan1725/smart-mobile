import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { products } from '@/data/products';

const brandEmojis: Record<string, string> = {
  'Apple': '🍎',
  'Samsung': '📱',
  'OnePlus': '➕',
  'Google': '🔍',
  'Xiaomi': '🅜',
  'Nothing': '⚪',
  'Vivo': '📷',
  'Realme': '🎯',
};

const Brands = () => {
  const brandData = useMemo(() => {
    const brandMap = new Map<string, { count: number; minPrice: number; maxPrice: number }>();

    products.forEach(product => {
      const existing = brandMap.get(product.brand);
      if (existing) {
        brandMap.set(product.brand, {
          count: existing.count + 1,
          minPrice: Math.min(existing.minPrice, product.price),
          maxPrice: Math.max(existing.maxPrice, product.price),
        });
      } else {
        brandMap.set(product.brand, {
          count: 1,
          minPrice: product.price,
          maxPrice: product.price,
        });
      }
    });

    return Array.from(brandMap.entries())
      .map(([name, data]) => ({
        name,
        emoji: brandEmojis[name] || '📱',
        ...data,
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Shop by Brand</h1>
            <p className="text-muted-foreground">Explore smartphones from your favorite manufacturers</p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {brandData.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/products?brand=${encodeURIComponent(brand.name)}`}
                  className="block p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {brand.emoji}
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-semibold">{brand.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {brand.count} {brand.count === 1 ? 'phone' : 'phones'}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Starting from{' '}
                    <span className="text-primary font-medium">
                      ₹{brand.minPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Brands;
