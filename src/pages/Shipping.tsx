import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react';

const Shipping = () => {
  const shippingMethods = [
    {
      icon: Truck,
      title: 'Standard Delivery',
      time: '3-5 Business Days',
      price: 'Free on orders above ₹999',
      description: 'Reliable delivery for metro and non-metro cities across India.',
    },
    {
      icon: Clock,
      title: 'Express Delivery',
      time: '1-2 Business Days',
      price: '₹199',
      description: 'Fast-track delivery available in select metro cities.',
    },
    {
      icon: MapPin,
      title: 'Same Day Delivery',
      time: 'Within 24 Hours',
      price: '₹399',
      description: 'Order before 2 PM for same-day delivery in select cities.',
    },
  ];

  const steps = [
    { step: 1, title: 'Order Placed', description: 'Your order is confirmed and being processed' },
    { step: 2, title: 'Packed', description: 'Your items are carefully packed and ready for dispatch' },
    { step: 3, title: 'Shipped', description: 'Your package is on its way to you' },
    { step: 4, title: 'Delivered', description: 'Package delivered to your doorstep' },
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Shipping Information
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fast and reliable delivery across India
            </p>
          </motion.div>

          {/* Shipping Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {shippingMethods.map((method, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <method.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display font-semibold text-xl mb-2">{method.title}</h3>
                <p className="text-primary font-medium mb-2">{method.time}</p>
                <p className="text-sm text-muted-foreground mb-4">{method.price}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Order Tracking Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-2xl font-bold mb-8 text-center">Order Tracking</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-muted/30 rounded-xl p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6">Important Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Delivery Areas</h3>
                <p className="text-muted-foreground text-sm">
                  We deliver across India to over 25,000+ pin codes. Enter your pin code during checkout to check availability.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Partners</h3>
                <p className="text-muted-foreground text-sm">
                  We work with trusted partners like Delhivery, Blue Dart, and DTDC to ensure safe and timely delivery.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Package Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  Once shipped, you'll receive a tracking link via email and SMS to monitor your package in real-time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Attempts</h3>
                <p className="text-muted-foreground text-sm">
                  Our delivery partners will attempt delivery up to 3 times. After that, the package returns to our warehouse.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
