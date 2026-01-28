import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HelpCircle, Package, CreditCard, Truck, RefreshCw, Shield, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
  const categories = [
    { icon: Package, title: 'Orders', description: 'Track, modify, or cancel orders', link: '/shipping' },
    { icon: Truck, title: 'Shipping', description: 'Delivery times and tracking', link: '/shipping' },
    { icon: RefreshCw, title: 'Returns', description: 'Return policy and refunds', link: '/returns' },
    { icon: CreditCard, title: 'Payments', description: 'Payment methods and issues', link: '/contact' },
    { icon: Shield, title: 'Warranty', description: 'Product warranty information', link: '/contact' },
    { icon: MessageCircle, title: 'Contact', description: 'Get in touch with us', link: '/contact' },
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive an email with a tracking number. You can use this number to track your package on our website or the courier\'s website.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets like Paytm and PhonePe. EMI options are also available on select cards.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days for metro cities and 5-7 business days for other areas. Express delivery (1-2 days) is available in select cities.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for unopened products and a 15-day replacement policy for manufacturing defects. Please visit our Returns page for more details.',
    },
    {
      question: 'Are all products genuine?',
      answer: 'Yes, all products sold on MobileHub are 100% genuine and come with manufacturer warranty. We are authorized retailers for all brands we carry.',
    },
    {
      question: 'Do you offer EMI options?',
      answer: 'Yes, we offer no-cost EMI on select products and banks. EMI options are displayed on the product page during checkout.',
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
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <category.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                <h3 className="font-medium text-foreground mb-1">{category.title}</h3>
                <p className="text-xs text-muted-foreground text-center">{category.description}</p>
              </Link>
            ))}
          </motion.div>

          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
