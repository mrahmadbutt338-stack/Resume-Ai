'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingIntro({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: letters dropping, 1: robot appearing, 2: completed

  useEffect(() => {
    const lettersTimer = setTimeout(() => {
      setStage(1);
    }, 2500); // Letters take ~2.5s to drop completely

    const robotTimer = setTimeout(() => {
      setStage(2);
      setTimeout(onComplete, 800); // Complete animation after fading out
    }, 5000);

    return () => {
      clearTimeout(lettersTimer);
      clearTimeout(robotTimer);
    };
  }, [onComplete]);

  const letters = ['R', 'E', 'S', 'U', 'M', 'E'];

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0f172a',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Letters Container */}
          <div style={{ display: 'flex', gap: '8px', zIndex: 10, position: 'relative', top: stage === 1 ? '-40px' : '0px', transition: 'top 1s ease' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: -500, opacity: 0, rotate: -20 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  damping: 12, 
                  stiffness: 100, 
                  delay: i * 0.15 
                }}
                style={{
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: '#fff',
                  textShadow: '0 0 20px rgba(253, 184, 19, 0.5)',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '2px'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Robot Animation */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                initial={{ y: 200, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 100 }}
                style={{ position: 'absolute', bottom: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {/* Minimalist Futuristic Robot SVG */}
                <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Arms lifting up */}
                  <motion.path 
                    d="M 20 80 Q 0 50 30 20" 
                    stroke="#2C5E3E" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.path 
                    d="M 100 80 Q 120 50 90 20" 
                    stroke="#2C5E3E" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Body */}
                  <motion.rect x="35" y="70" width="50" height="60" rx="15" fill="#1e293b" stroke="#2C5E3E" strokeWidth="4" />
                  {/* Head */}
                  <motion.rect x="40" y="30" width="40" height="30" rx="8" fill="#1e293b" stroke="#2C5E3E" strokeWidth="4" />
                  {/* Eyes */}
                  <motion.circle x="50" y="45" r="4" fill="#FDB813" 
                    animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} 
                  />
                  <motion.circle x="70" y="45" r="4" fill="#FDB813" 
                    animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} 
                  />
                  {/* Antenna */}
                  <line x1="60" y1="30" x2="60" y2="15" stroke="#2C5E3E" strokeWidth="3" />
                  <circle cx="60" cy="15" r="4" fill="#FDB813" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid floor */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '40%',
              background: 'linear-gradient(transparent, rgba(253, 184, 19, 0.1))',
              perspective: '1000px',
              borderTop: '1px solid rgba(253, 184, 19, 0.2)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
