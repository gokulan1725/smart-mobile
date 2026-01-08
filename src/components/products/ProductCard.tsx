import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Cpu, HardDrive, Battery, Camera } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `₹${product.price.toLocaleString('en-IN')}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden hover-lift"
    >
      {/* Image Container */}
      <div className="product-image-container aspect-square p-6 relative">
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="discount-badge">{discount}% OFF</span>
          )}
          {product.featured && (
            <span className="spec-badge">Featured</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
          <Heart className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Brand & Name */}
        <div>
          <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="truncate">{product.specs.processor}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HardDrive className="w-3.5 h-3.5 text-primary" />
            <span>{product.specs.ram}/{product.specs.storage}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Battery className="w-3.5 h-3.5 text-primary" />
            <span>{product.specs.battery}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Camera className="w-3.5 h-3.5 text-primary" />
            <span>{product.specs.camera}</span>
          </div>
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="price-tag text-xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          <span className={product.inStock ? 'stock-badge-instock' : 'stock-badge-outofstock'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full btn-primary-glow text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Notify Me'}
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
