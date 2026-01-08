import { motion } from 'framer-motion';

const brands = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Samsung', logo: '📱' },
  { name: 'OnePlus', logo: '➕' },
  { name: 'Google', logo: '🔍' },
  { name: 'Xiaomi', logo: '🅜' },
  { name: 'Nothing', logo: '⚪' },
  { name: 'Vivo', logo: '📷' },
  { name: 'Realme', logo: '🎯' },
];

const BrandsSection = () => {
  return (
    <section className="py-12 border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by millions. Official partner of leading brands.
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{brand.logo}</span>
              <span className="font-medium text-sm hidden sm:inline">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
