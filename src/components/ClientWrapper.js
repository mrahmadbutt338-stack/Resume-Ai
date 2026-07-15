'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { Toaster } from 'react-hot-toast';

export default function ClientWrapper({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Show intro on every load as requested
    setShowIntro(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-light font-sans text-brown-blackish">
      <Toaster position="top-right" />
      {showIntro && <LoadingScreen onComplete={handleIntroComplete} />}
      
      <div 
        className="flex flex-col flex-1"
        style={{ 
          opacity: showIntro ? 0 : 1, 
          transition: 'opacity 0.8s ease-in-out' 
        }}
      >
        <Navbar />
        <main className="flex-1 w-full mt-24">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
