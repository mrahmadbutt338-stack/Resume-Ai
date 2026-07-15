'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const statuses = [
  "Analyzing Profile Data...",
  "Structuring Timeline...",
  "Optimizing ATS Score...",
  "Writing Summary...",
  "Matching Keywords...",
  "Generating Layout...",
  "Finalizing Document..."
];

export default function AIStatusPanel({ isComplete }) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (isComplete) return;
    
    // Rotate status every 1.2 seconds
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-slate-700/50"
      style={{ transform: "translateZ(80px)" }} // Very high Z for parallax
    >
      <div className="relative flex items-center justify-center w-5 h-5">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-green-400"
            >
              <CheckCircle2 size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-orange-400"
            >
              <Sparkles size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-[140px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isComplete ? "complete" : statusIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`text-[10px] font-semibold tracking-wide whitespace-nowrap ${isComplete ? 'text-green-400' : 'text-slate-200'}`}
          >
            {isComplete ? "Resume Completed ✓" : statuses[statusIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
