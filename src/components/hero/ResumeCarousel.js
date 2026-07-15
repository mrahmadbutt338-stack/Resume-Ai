'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeMockData } from './resumeMockData';
import ResumePreview from './ResumePreview';
import AIStatusPanel from './AIStatusPanel';

export default function ResumeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 12-second total loop per resume
    // AI completes writing around 8 seconds, shows "Completed" for 2 seconds, then fades out and swaps
    
    // Set to 'incomplete' when new resume starts
    setIsComplete(false);

    // Mark as complete after 8.5 seconds (when footer animations finish)
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 8500);

    // Swap resume after 12 seconds
    const swapTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % resumeMockData.length);
    }, 12000);

    return () => {
      clearTimeout(completeTimer);
      clearInterval(swapTimer);
    };
  }, [currentIndex]); // Re-run effect when index changes

  const currentData = resumeMockData[currentIndex];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentData.id} // This key forces a complete unmount/remount for fresh animations
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full"
        >
          <ResumePreview data={currentData} />
        </motion.div>
      </AnimatePresence>

      <AIStatusPanel isComplete={isComplete} />
    </>
  );
}
