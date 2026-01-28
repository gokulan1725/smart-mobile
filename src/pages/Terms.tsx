import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

const Terms = () => {
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
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2025
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-card border border-border rounded-xl p-8 space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using MobileHub's website and services, you accept and agree 
                  to be bound by the terms and provision of this agreement. If you do not agree 
                  to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground mb-4">
                  Permission is granted to temporarily download one copy of the materials on 
                  MobileHub's website for personal, non-commercial transitory viewing only. 
                  This license shall automatically terminate if you violate any of these restrictions.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">3. Product Information</h2>
                <p className="text-muted-foreground">
                  We strive to display product information (including prices, specifications, 
                  and availability) as accurately as possible. However, we do not warrant that 
                  product descriptions or other content is accurate, complete, or error-free. 
                  Prices are subject to change without notice.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">4. Orders and Payment</h2>
                <p className="text-muted-foreground mb-4">
                  By placing an order, you warrant that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>You are legally capable of entering into binding contracts</li>
                  <li>You are at least 18 years old</li>
                  <li>The information you provide is accurate and complete</li>
                  <li>You authorize us to charge your payment method for the total amount</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">5. Shipping and Delivery</h2>
                <p className="text-muted-foreground">
                  Delivery times are estimates and not guaranteed. We are not liable for any 
                  delays caused by shipping carriers, customs, or other factors beyond our 
                  control. Risk of loss and title for items purchased pass to you upon delivery 
                  to the carrier.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">6. Returns and Refunds</h2>
                <p className="text-muted-foreground">
                  Our return and refund policy is detailed on our Returns & Refunds page. By 
                  making a purchase, you agree to the terms outlined in that policy. We reserve 
                  the right to refuse returns that do not meet our return criteria.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">7. Warranty</h2>
                <p className="text-muted-foreground">
                  All products sold on MobileHub come with manufacturer warranty as specified 
                  in the product description. We are not responsible for warranty claims and 
                  these should be directed to the respective manufacturer or authorized service 
                  centers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  In no event shall MobileHub be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including without limitation, loss of 
                  profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground">
                  These terms shall be governed by and construed in accordance with the laws 
                  of India. Any disputes arising under these terms shall be subject to the 
                  exclusive jurisdiction of the courts in Bangalore, Karnataka.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be 
                  effective immediately upon posting on the website. Your continued use of 
                  the service after any changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us 
                  at legal@mobilehub.com or through our Contact page.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
