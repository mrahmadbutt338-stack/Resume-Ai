'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function InteractiveCard({ children }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch, update in effect

  useEffect(() => {
    // Check if mobile device (disable 3D tilt on mobile for performance)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Motion values for tracking cursor relative to card center [-1, 1]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs adjusted for faster, snappier movement
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 20, mass: 0.2 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 20, mass: 0.2 });

  // Transform constraints: increased to 25 degrees for a very pronounced tilt
  const rotateX = useTransform(mouseYSpring, [-1, 1], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], ["-25deg", "25deg"]);
  
  // Parallax depth effect for hovering
  const translateZ = useSpring(useTransform(x, () => isHovered ? "30px" : "0px"), { stiffness: 200, damping: 20 });
  const scale = useSpring(useTransform(x, () => isHovered ? 1.02 : 1), { stiffness: 200, damping: 20 });

  // Glare position
  const glareX = useTransform(mouseXSpring, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-1, 1], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rawX = (e.clientX - centerX) / (rect.width / 2);
    const rawY = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(rawX);
    y.set(rawY);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1500px" }} className="relative w-full h-full flex items-center justify-center">
      {/* Continuous floating animation wrapper */}
      <motion.div
        animate={{ translateY: [-6, 6, -6] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        className="relative w-full h-full"
      >
        {/* Dynamic Shadow based on tilt */}
        <motion.div
          style={{
            x: useTransform(mouseXSpring, [-1, 1], [-20, 20]),
            y: useTransform(mouseYSpring, [-1, 1], [-20, 20]),
            scale: isHovered ? 1.05 : 1,
            opacity: isHovered ? 0.6 : 0.3,
          }}
          className="absolute inset-0 bg-orange-burnt/30 blur-[40px] rounded-2xl transition-opacity duration-500"
        />

        {/* 3D Rotating Card Container */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            translateZ: isMobile ? 0 : translateZ,
            scale: isMobile ? 1 : scale,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="relative w-full h-full bg-gradient-to-r from-[#3A2318] via-[#C96A1B]/70 to-[#1A1A1A] backdrop-blur-xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-[#C96A1B]/40 overflow-hidden"
        >
          {/* Subtle Border Glow on Hover */}
          <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-500 pointer-events-none z-50 ${isHovered ? 'border-orange-burnt/20' : 'border-transparent'}`} />

          {/* Dynamic Glare Reflection (Premium Glass Effect) */}
          {isHovered && !isMobile && (
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
                opacity: 0.12,
              }}
              className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-300"
            />
          )}

          {/* Render the inner Resume Preview component */}
          {children}

        </motion.div>
      </motion.div>
    </div>
  );
}
