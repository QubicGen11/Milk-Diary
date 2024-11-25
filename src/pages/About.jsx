import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-16"> {/* pt-16 to account for fixed navbar */}
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1595150045993-c5fea66a6be0?q=80&w=2070&auto=format&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Our Story
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Delivering Quality Since 1995
            </h2>
            <p className="text-gray-600 mb-4">
              For over 25 years, we've been committed to providing the freshest dairy products
              to our community. What started as a small family farm has grown into a trusted
              name in dairy production and distribution.
            </p>
            <p className="text-gray-600">
              We work directly with local farmers to ensure the highest quality products
              while supporting sustainable farming practices and our local economy.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1594961081583-c1e7c628589f?q=80&w=1969&auto=format&fit=crop" 
              alt="Dairy farm" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 