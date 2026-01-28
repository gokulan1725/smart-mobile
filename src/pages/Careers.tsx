import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Users, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Careers = () => {
  const benefits = [
    { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical coverage for you and your family' },
    { icon: Zap, title: 'Learning Budget', description: '₹50,000 annual budget for courses and certifications' },
    { icon: Users, title: 'Remote Friendly', description: 'Flexible work-from-home options available' },
    { icon: Coffee, title: 'Free Snacks', description: 'Unlimited snacks and beverages at the office' },
  ];

  const openings = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Bangalore',
      type: 'Full-time',
      description: 'Build and maintain our e-commerce platform using React and TypeScript.',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore',
      type: 'Full-time',
      description: 'Define product strategy and roadmap for our mobile commerce initiatives.',
    },
    {
      title: 'Customer Support Lead',
      department: 'Operations',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead our customer support team and ensure exceptional service delivery.',
    },
    {
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Bangalore',
      type: 'Full-time',
      description: 'Drive our digital marketing strategy across all channels.',
    },
    {
      title: 'Warehouse Operations',
      department: 'Operations',
      location: 'Mumbai',
      type: 'Full-time',
      description: 'Manage inventory and ensure smooth order fulfillment operations.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 pb-12">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Join Our Team
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Help us revolutionize the way India shops for smartphones. 
              We're always looking for talented individuals to join our growing team.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl font-bold mb-8 text-center">Why Work With Us</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                  <benefit.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl font-bold mb-8 text-center">Open Positions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {openings.map((job, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-lg">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="shrink-0">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-muted/30 rounded-xl p-8 text-center"
          >
            <h2 className="font-display text-2xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We're always looking for talented people. Send us your resume and we'll 
              keep you in mind for future opportunities.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Contact Us
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

export default Careers;
