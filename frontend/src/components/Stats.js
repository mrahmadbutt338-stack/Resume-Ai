'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function AnimatedCounter({ end, suffix = "+", label, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  const formattedCount = count.toLocaleString('en-US');

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl font-black text-orange-burnt mb-2 filter drop-shadow-sm">
        {formattedCount}{suffix}
      </div>
      <div className="text-lg md:text-xl font-bold text-brown-blackish uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 relative overflow-hidden bg-[#F5F5F5]"
    >
      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center pt-8 md:pt-0"
          >
            <AnimatedCounter end={10000} label="CV Created" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center pt-8 md:pt-0"
          >
            <AnimatedCounter end={5000} label="Happy Users" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center pt-8 md:pt-0"
          >
            <AnimatedCounter end={100} label="Templates" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
