import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types/product';
import { useBrowsedProducts } from '@/hooks/useProductViews';

const TrendingSection = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<Product[]>([]);
  const [aiReasoning, setAiReasoning] = useState('');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const { getBrowsedProducts } = useBrowsedProducts();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const browsedProducts = getBrowsedProducts();
      
      const { data, error } = await supabase.functions.invoke('ai-recommendations', {
        body: { browsedProducts }
      });

      if (error) throw error;

      // Map trending IDs to products
      if (data?.trending?.length > 0) {
        const trendingMapped = data.trending
          .map((t: { id: string; views: number }) => products.find(p => p.id === t.id))
          .filter(Boolean) as Product[];
        setTrendingProducts(trendingMapped);
      }

      // If no trending data yet, show popular defaults
      if (!data?.trending?.length) {
        const defaultTrending = products
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 4);
        setTrendingProducts(defaultTrending);
      }

      // AI recommendations
      if (data?.aiRecommendations?.length > 0) {
        const aiMapped = data.aiRecommendations
          .map((id: string) => products.find(p => p.id === id))
          .filter(Boolean) as Product[];
        setAiRecommendations(aiMapped);
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      // Fallback to review-based popularity
      const fallback = products
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 4);
      setTrendingProducts(fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Trending Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            <Flame className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Most Popular Phones
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            See what everyone is looking at this week
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Picked For You
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              AI Recommendations
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Personalized suggestions based on your browsing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aiRecommendations.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TrendingSection;
