import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { X, Plus, ArrowRight, Check, Minus, Smartphone } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Compare = () => {
  const [selectedPhones, setSelectedPhones] = useState<Product[]>([]);

  const availablePhones = useMemo(() => {
    return products.filter(p => !selectedPhones.find(s => s.id === p.id));
  }, [selectedPhones]);

  const addPhone = (phoneId: string) => {
    const phone = products.find(p => p.id === phoneId);
    if (phone && selectedPhones.length < 4) {
      setSelectedPhones([...selectedPhones, phone]);
    }
  };

  const removePhone = (phoneId: string) => {
    setSelectedPhones(selectedPhones.filter(p => p.id !== phoneId));
  };

  const specs = [
    { key: 'processor', label: 'Processor' },
    { key: 'ram', label: 'RAM' },
    { key: 'storage', label: 'Storage' },
    { key: 'battery', label: 'Battery' },
    { key: 'camera', label: 'Camera' },
    { key: 'display', label: 'Display' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Compare Phones
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select up to 4 phones to compare their specifications side by side
            </p>
          </motion.div>

          {/* Phone Selector */}
          {selectedPhones.length < 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mb-8"
            >
              <Select onValueChange={addPhone}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Add a phone to compare" />
                </SelectTrigger>
                <SelectContent>
                  {availablePhones.map((phone) => (
                    <SelectItem key={phone.id} value={phone.id}>
                      {phone.brand} {phone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Comparison Cards */}
          {selectedPhones.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Smartphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">No phones selected</p>
              <p className="text-sm text-muted-foreground">
                Use the dropdown above to add phones for comparison
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {selectedPhones.map((phone, index) => (
                  <motion.div
                    key={phone.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                  >
                    {/* Phone Header */}
                    <div className="relative p-4 bg-muted/30">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => removePhone(phone.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <img
                        src={phone.images[0]}
                        alt={phone.name}
                        className="w-32 h-32 object-contain mx-auto"
                      />
                    </div>

                    {/* Phone Info */}
                    <div className="p-4 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{phone.brand}</p>
                        <h3 className="font-display font-semibold text-lg">{phone.name}</h3>
                        <p className="text-xl font-bold text-primary mt-1">
                          ₹{phone.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10">
                          <span className="text-sm font-medium text-primary">{phone.rating}</span>
                          <span className="text-xs text-muted-foreground">★</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({phone.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>

                      {/* Specs */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        {specs.map((spec) => (
                          <div key={spec.key} className="flex flex-col">
                            <span className="text-xs text-muted-foreground">{spec.label}</span>
                            <span className="text-sm font-medium">
                              {phone.specs[spec.key as keyof typeof phone.specs]}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Stock Status */}
                      <div className="pt-4 border-t border-border">
                        {phone.inStock ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">In Stock ({phone.stockCount} left)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-destructive">
                            <Minus className="w-4 h-4" />
                            <span className="text-sm">Out of Stock</span>
                          </div>
                        )}
                      </div>

                      {/* Colors */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Available Colors</p>
                        <p className="text-sm">{phone.colors.join(', ')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add More Placeholder */}
                {selectedPhones.length < 4 && selectedPhones.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden lg:flex items-center justify-center border-2 border-dashed border-border rounded-2xl min-h-[500px]"
                  >
                    <div className="text-center text-muted-foreground">
                      <Plus className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Add another phone</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
