import React, { useState } from 'react';
import { Star, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StoreInfo = () => {
  const [hoursOpen, setHoursOpen] = useState(false);

  const schedule = [
    { day: 'Monday – Friday', hours: '10:00 AM – 8:00 PM' },
    { day: 'Saturday',        hours: '10:00 AM – 9:00 PM' },
    { day: 'Sunday',          hours: '11:00 AM – 6:00 PM' },
  ];

  return (
    <section className="bg-[#F0EBE1] border-y border-[#E8DDD0] py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Rating */}
          <div className="luxury-card p-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < 5 ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-[#E8DDD0]'}
                  style={{ opacity: i === 4 ? 0.5 : 1 }}
                />
              ))}
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-[#1C1410] mb-1 font-light">
              4.8
            </h3>
            <p className="text-[#9C8B78] text-xs tracking-widest uppercase mt-1">1,248 Verified Reviews</p>
          </div>

          {/* Location */}
          <div className="luxury-card p-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 bg-[#F0EBE1] flex items-center justify-center mb-5 border border-[#E8DDD0]">
              <MapPin size={22} className="text-[#D4AF37]" />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-xl text-[#1C1410] mb-3 font-light">
              Flagship Boutique
            </h3>
            <p className="text-[#6B5B45] text-sm leading-relaxed font-light">
              124 Luxury Avenue, Suite 400<br />Beverly Hills, CA 90210
            </p>
            <a href="#map" className="mt-5 text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold border-b border-[#D4AF37] pb-0.5 hover:text-[#1C1410] hover:border-[#1C1410] transition-colors">
              Get Directions
            </a>
          </div>

          {/* Hours */}
          <div className="luxury-card p-8">
            <div
              className="flex items-start justify-between cursor-pointer group"
              onClick={() => setHoursOpen(!hoursOpen)}
            >
              <div>
                <div className="w-12 h-12 bg-[#F0EBE1] flex items-center justify-center mb-5 border border-[#E8DDD0]">
                  <Clock size={22} className="text-[#D4AF37]" />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-xl text-[#1C1410] font-light mb-2">
                  Opening Hours
                </h3>
                <p className="text-[#D4AF37] text-xs flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  Open Now · Until 8 PM
                </p>
              </div>
              <span className="text-[#9C8B78] group-hover:text-[#D4AF37] transition-colors mt-1">
                {hoursOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </div>

            <AnimatePresence>
              {hoursOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t border-[#E8DDD0] space-y-3">
                    {schedule.map((s, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-[#9C8B78] font-light">{s.day}</span>
                        <span className="text-[#1C1410] font-medium">{s.hours}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreInfo;