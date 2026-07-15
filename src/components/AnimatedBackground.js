'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-slate-50">
      {/* Dynamic gradient orb 1 */}
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Dynamic gradient orb 2 */}
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 0.8, 1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Grid overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}
