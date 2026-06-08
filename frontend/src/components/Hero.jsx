import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center bg-theme-secondary overflow-hidden">
      
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0 flex">
        <div className="w-1/2 h-full hidden md:block border-r border-theme">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-multiply dark:mix-blend-normal" alt="Fashion 1" />
        </div>
        <div className="w-full md:w-1/2 h-full">
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-multiply dark:mix-blend-normal" alt="Fashion 2" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center">
        
        <div className="bg-theme p-10 md:p-16 max-w-xl border border-theme shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-theme-secondary mb-4 border-b border-theme pb-1">
              New Season Arrival
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-theme">
              The Fall<br />Collection.
            </h1>
            <p className="text-theme-secondary text-base mb-8 max-w-sm">
              Discover the latest trends from premium global brands. Curated essentials for the modern wardrobe.
            </p>
            <div className="flex gap-4">
              <a href="#categories" className="btn-primary">Shop Now</a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;