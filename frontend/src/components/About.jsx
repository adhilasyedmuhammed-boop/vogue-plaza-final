import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Established',    value: '1998' },
  { label: 'Global Boutiques', value: '42' },
  { label: 'Curated Brands', value: '150+' },
  { label: 'Couture Pieces', value: '10K+' },
];

const About = () => (
  <section id="about" className="bg-[#FAF8F5] py-24">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-4">Our Heritage</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl md:text-5xl text-[#1C1410] font-light leading-tight mb-8">
            A Legacy of<br /><em className="text-[#D4AF37]">Uncompromising</em> Elegance
          </h2>
          <div className="space-y-5 text-[#6B5B45] font-light leading-relaxed text-sm">
            <p>
              Founded in the heart of fashion's capital, Vogue Plaza began as a singular vision: 
              to create an enclave where the world's most exquisite garments could be presented 
              with the reverence they deserve.
            </p>
            <p>
              For over two decades, our curators have traversed the globe — selecting pieces that 
              transcend seasonal trends. True luxury lives at the intersection of masterful craftsmanship, 
              unbroken heritage, and visionary design.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-10 border-t border-[#E8DDD0]">
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-3xl text-[#1C1410] font-light mb-1">{s.value}</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden border border-[#E8DDD0] shadow-lg bg-[#F0EBE1]">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop"
              alt="Vogue Plaza Heritage"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative frame */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#D4AF37]/40 hidden md:block pointer-events-none" />
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#D4AF37]/8 hidden md:block pointer-events-none" />
        </motion.div>

      </div>
    </div>
  </section>
);

export default About;