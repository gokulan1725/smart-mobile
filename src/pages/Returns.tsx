import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Returns = () => {
  const eligibleItems = [
    'Unopened products in original packaging',
    'Products with manufacturing defects',
    'Wrong product delivered',
    'Damaged during shipping',
    'Missing accessories or parts',
  ];

  const nonEligibleItems = [
    'Products without original packaging',
    'Physical damage caused by customer',
    'Products beyond return window',
    'Activated devices (SIM inserted)',
    'Cosmetic damage reported after 48 hours',
  ];

  const steps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our support team or initiate a return request from your order history.',
    },
    {
      step: 2,
      title: 'Pack the Product',
      description: 'Carefully pack the product in its original packaging with all accessories.',
    },
    {
      step: 3,
      title: 'Schedule Pickup',
      description: 'Our delivery partner will collect the package from your doorstep.',
    },
    {
      step: 4,
      title: 'Quality Check',
      description: 'We inspect the returned product within 2-3 business days.',
    },
    {
      step: 5,
      title: 'Refund Processed',
      description: 'Refund is initiated to your original payment method within 5-7 business days.',
    },
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
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Returns & Refunds
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Easy returns within 7 days of delivery
            </p>
          </motion.div>

          {/* Policy Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <h3 className="font-display font-bold text-3xl text-primary mb-2">7 Days</h3>
              <p className="text-muted-foreground">Return Window</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <h3 className="font-display font-bold text-3xl text-primary mb-2">Free</h3>
              <p className="text-muted-foreground">Return Shipping</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <h3 className="font-display font-bold text-3xl text-primary mb-2">5-7 Days</h3>
              <p className="text-muted-foreground">Refund Processing</p>
            </div>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-display font-semibold text-xl">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-destructive" />
                <h3 className="font-display font-semibold text-xl">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-bold mb-8 text-center">Return Process</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-card border border-border rounded-xl p-4 h-full">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                      {step.step}
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-6 h-6 text-muted-foreground transform -translate-y-1/2 z-10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-muted/30 rounded-xl p-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-4">Need Help with a Return?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our customer support team is here to help you with any return or refund queries.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;
