'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Award, Lightbulb } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Jenkins',
    role: 'Marketing Director',
    text: 'This website helped me create a professional CV in minutes. The templates are absolutely stunning and the ATS optimization actually works!',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Software Engineer',
    text: 'I was blown away by the sleek UI and how easy it was to customize my resume. It feels like a premium Apple product for career building.',
    rating: 5,
  },
  {
    name: 'Emily Carter',
    role: 'Recent Graduate',
    text: 'Landed my dream job thanks to the "Creative" template. The PDF export is flawless and looks amazing when printed.',
    rating: 5,
  },
  {
    name: 'Michael Torres',
    role: 'Product Manager',
    text: 'The best resume builder I have ever used. The attention to detail in the typography and layout gives me a huge edge over other candidates.',
    rating: 5,
  },
  {
    name: 'Jessica Lee',
    role: 'UX Designer',
    text: 'As a designer, I am very picky about aesthetics. This tool exceeded my expectations. The grid systems and modern layouts are perfect.',
    rating: 5,
  },
  {
    name: 'Robert Fox',
    role: 'Financial Analyst',
    text: 'Clean, professional, and incredibly fast. I was able to compile 10 years of experience into a beautiful one-page resume without any hassle.',
    rating: 5,
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightOn, setIsLightOn] = useState(false);

  useEffect(() => {
    if (!isLightOn) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(timer);
  }, [isLightOn]);

  const review = reviews[currentIndex];

  return (
    <section className="py-10 md:py-14 bg-gradient-to-r from-[#2A1B14] via-orange-burnt to-[#111111] relative overflow-hidden transition-colors duration-1000">
      {/* Background Glows (Only visible when light is on) */}
      <div 
        className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-1000 ${isLightOn ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-orange-burnt/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-warm font-semibold text-sm mb-4 shadow-sm">
                <Award size={16} />
                <span>Voices of Success</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-4 drop-shadow-lg">
                Our Beloved <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-warm to-orange-burnt">
                  Community.
                </span>
              </h2>
              
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-md">
                Join thousands of ambitious professionals who have transformed their careers. Our premium resume builder is designed to make you stand out and land the interviews you deserve.
              </p>

              {/* Interactive Spotlight Switch Button */}
              <button 
                onClick={() => setIsLightOn(!isLightOn)}
                className={`mt-8 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold flex items-center gap-3 transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                  isLightOn 
                    ? 'bg-gradient-to-r from-orange-burnt to-orange-warm text-white shadow-[0_0_20px_rgba(201,106,27,0.5)] border border-orange-burnt' 
                    : 'bg-[#140D09] text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                <Lightbulb size={24} className={`transition-colors duration-500 ${isLightOn ? 'text-white' : 'text-gray-500'}`} />
                {isLightOn ? 'Turn Off Spotlight' : 'Reveal Success Stories'}
              </button>
              
            </motion.div>
          </div>

          {/* Right Side: Spotlight & Animated Card */}
          <div className="lg:col-span-7 h-[350px] md:h-[380px] relative perspective-[1200px] flex items-center justify-center mt-6 lg:mt-0">
            
            {/* The Spotlight Light Source (Bulb) */}
            <div 
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 rounded-b-full transition-all duration-1000 z-20 ${
                isLightOn ? 'bg-white shadow-[0_0_40px_20px_rgba(255,255,255,0.4)]' : 'bg-gray-800 shadow-none'
              }`}
            ></div>
            
            {/* The Spotlight Beam */}
            <div 
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[120%] pointer-events-none z-10 transition-all duration-1000 ${
                isLightOn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(229,138,44,0.05) 50%, transparent 100%)'
              }}
            ></div>

            {/* The 3D Animated Card */}
            <div className="relative w-full max-w-md mt-16 md:mt-24 z-30" style={{ transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait">
                {isLightOn && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, z: -200, y: -60, rotateX: -30 }}
                    animate={{ opacity: 1, z: 0, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, z: 200, y: 60, rotateX: 30 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full"
                  >
                    <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#1E1510] to-[#140D09] border border-orange-burnt/30 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group overflow-hidden">
                      
                      {/* Inner highlight for spotlight reflection on card */}
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-12 bg-white/10 blur-2xl rounded-full"></div>

                      {/* Decorative Quote Icon */}
                      <div className="absolute top-6 right-6 text-orange-burnt/10 group-hover:text-orange-burnt/20 transition-colors duration-500">
                        <Quote size={48} />
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1.5 mb-4 relative z-10">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-orange-warm text-orange-warm drop-shadow-[0_0_8px_rgba(229,138,44,0.6)]" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-200 italic mb-6 relative z-10 text-base md:text-lg leading-relaxed">
                        "{review.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4 mt-auto relative z-10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-burnt to-orange-warm flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(201,106,27,0.4)]">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base md:text-lg group-hover:text-orange-warm transition-colors duration-300">
                            {review.name}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-400 font-medium">
                            {review.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
