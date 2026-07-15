'use client';

import { motion } from 'framer-motion';

export default function TypingText({ text, delay = 0, className = "" }) {
  // Split text into characters for typing effect
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay } // 0.02s per char feels like fast human typing
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      display: "inline",
      y: 0,
    },
    hidden: {
      opacity: 0,
      display: "none",
      y: 5,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span variants={child} key={index}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
