'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const word = "RESUME AI".split('');

  useEffect(() => {
    // Hide the loading screen after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2500); // 2.5 seconds total loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-light"
        >
          <div className="flex gap-2 sm:gap-4">
            {word.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.15, // Stagger effect
                }}
                className="text-4xl sm:text-7xl md:text-8xl font-black text-orange-burnt drop-shadow-[0_0_15px_rgba(201,106,27,0.8)]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
