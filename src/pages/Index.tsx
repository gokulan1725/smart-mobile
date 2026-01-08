import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BrandsSection from '@/components/home/BrandsSection';
import ProductGrid from '@/components/products/ProductGrid';
import { products, featuredProducts } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <BrandsSection />
        
        <div className="container mx-auto px-4">
          <ProductGrid 
            products={featuredProducts} 
            title="Featured Phones"
            subtitle="Editor's Choice"
          />
          
          <ProductGrid 
            products={products} 
            title="All Smartphones"
            subtitle="Browse Our Collection"
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
