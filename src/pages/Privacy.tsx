import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield } from 'lucide-react';

const Privacy = () => {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Privacy Policy
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
            className="max-w-3xl mx-auto prose prose-invert"
          >
            <div className="bg-card border border-border rounded-xl p-8 space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Name, email address, phone number, and shipping address</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Order history and preferences</li>
                  <li>Communications you send to us</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send you order confirmations and shipping updates</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Improve our website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to 
                  outside parties except to trusted third parties who assist us in operating 
                  our website, conducting our business, or servicing you, so long as those 
                  parties agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement a variety of security measures to maintain the safety of your 
                  personal information. All payment transactions are processed through secure 
                  gateways and we do not store your credit card information on our servers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">5. Cookies</h2>
                <p className="text-muted-foreground">
                  We use cookies to understand and save your preferences for future visits, 
                  keep track of advertisements, and compile aggregate data about site traffic 
                  and site interaction.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at 
                  privacy@mobilehub.com or through our Contact page.
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

export default Privacy;
