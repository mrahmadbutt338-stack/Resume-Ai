'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import InteractiveCard from './InteractiveCard';
import ResumeCarousel from './ResumeCarousel';

const CardParticles = () => {
  // Generate random particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white/20 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function HeroPreview() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.8; // Make the video run faster
    }
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto h-[390px] md:h-[440px] flex items-center justify-center">
      
      {/* Blurred Background Orbs (Premium SaaS effect) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-orange-burnt/20 blur-[80px] -z-20 rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-blue-500/20 blur-[60px] -z-20 rounded-full animate-pulse duration-[8s]" />
      
      {/* Floating Particles */}
      <CardParticles />

      {/* Main Interactive 3D Card */}
      <div className="w-full h-full p-2 relative z-10">
        <InteractiveCard>
          {/* Padding wrapper to show the thick dark gradient background of the InteractiveCard */}
          <div className="w-full h-full p-6 md:p-8 flex flex-col relative">
            <div className="w-full h-full p-2 bg-[#1C1C1E] rounded-2xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),_0_0_0_1px_rgba(255,255,255,0.1)] relative flex flex-col border border-black/40">
              {/* Top Browser/App Bar Mockup (Dark Theme) */}
              <div className="flex gap-1.5 p-2.5 bg-[#2C2C2E] rounded-t-xl border-b border-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm"></div>
              </div>
              
              {/* Video Container - Deeply Inset */}
              <div className="flex-1 bg-black relative overflow-hidden rounded-b-xl flex items-center justify-center p-0.5 shadow-[inset_0_10px_30px_rgba(0,0,0,0.9)]">
                <video 
                  ref={videoRef}
                  loop 
                  autoPlay 
                  muted 
                  playsInline 
                  onTimeUpdate={(e) => {
                    // Skip the last 2 seconds where the video statically pauses
                    if (e.target.duration && e.target.currentTime >= e.target.duration - 2) {
                      e.target.currentTime = 0;
                      e.target.play().catch(() => {});
                    }
                  }}
                  onEnded={(e) => {
                    e.target.currentTime = 0;
                    e.target.play().catch(() => {});
                  }}
                  onPause={(e) => {
                    // If it pauses unexpectedly, force it to play again
                    if (videoRef.current && videoRef.current.currentTime < videoRef.current.duration - 2) {
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  src="/videos/timelapse.mp4" 
                  className="w-full h-full object-contain rounded-b-xl opacity-90 mix-blend-screen"
                />
                {/* Inner bezel shadow to make it feel deeply embedded */}
                <div className="absolute inset-0 shadow-[inset_0_0_25px_rgba(0,0,0,0.8)] rounded-b-xl pointer-events-none z-10 border border-white/5"></div>
              </div>
            </div>
          </div>
        </InteractiveCard>
      </div>

      
    </div>
  );
}
