import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const ProductGrid = ({ products, title, subtitle }: ProductGridProps) => {
  return (
    <section className="py-12 md:py-16">
      {(title || subtitle) && (
        <div className="text-center mb-10 md:mb-12">
          {subtitle && (
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
