import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Smartphone, Users, Award, Target, Heart, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Phone Models' },
    { number: '25K+', label: 'Pin Codes Covered' },
    { number: '4.8', label: 'Average Rating' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: '100% genuine products with manufacturer warranty. We never compromise on authenticity.',
    },
    {
      icon: Heart,
      title: 'Customer Obsessed',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure a great experience.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly update our catalog with the latest devices and technologies.',
    },
    {
      icon: Target,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and offers. Get the best value for your money.',
    },
  ];

  const team = [
    { name: 'Rahul Sharma', role: 'Founder & CEO', image: '/placeholder.svg' },
    { name: 'Priya Patel', role: 'Head of Operations', image: '/placeholder.svg' },
    { name: 'Amit Kumar', role: 'Tech Lead', image: '/placeholder.svg' },
    { name: 'Sneha Reddy', role: 'Customer Success', image: '/placeholder.svg' },
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
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              About MobileHub
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              India's trusted destination for premium smartphones. We're on a mission to make 
              the latest technology accessible to everyone with genuine products, competitive 
              prices, and exceptional service.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <h3 className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-muted/30 rounded-xl p-8 md:p-12 mb-16"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, MobileHub started with a simple idea: to create a trusted 
                  platform where customers can buy genuine smartphones without worrying about 
                  authenticity or after-sales support.
                </p>
                <p>
                  What began as a small online store has grown into one of India's most trusted 
                  smartphone retailers, serving thousands of customers across the country.
                </p>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We work directly with brands and authorized distributors to ensure every 
                  product we sell is 100% genuine. Our team of experts carefully curates the 
                  best smartphones across all price ranges.
                </p>
                <p>
                  Today, we're proud to offer the widest selection of smartphones with 
                  industry-leading customer service and support.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <value.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
