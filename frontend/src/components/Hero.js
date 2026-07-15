'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroPreview from './hero/HeroPreview';

export default function Hero() {


  return (
    <section className="relative pt-[20px] pb-12 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-burnt/10 border border-orange-burnt/20 text-orange-burnt font-medium text-sm">
            <Sparkles size={16} />
            <span>The Premium Resume Builder</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-brown-blackish">
            <span className="italic font-light">Build Your</span><br/>
            <span className="text-gradient">Professional</span><br/>
            Resume.
          </h1>
          
          <p className="text-base md:text-lg text-brown-burnt/80 max-w-lg leading-relaxed">
            Create a stunning, ATS-friendly CV in minutes. Stand out with world-class templates and a design that feels like a premium SaaS product.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link 
              href="/create"
              className="group relative px-6 py-3 bg-gradient-to-r from-orange-burnt to-orange-warm rounded-full text-white font-semibold text-base shadow-premium-orange hover:shadow-[0_20px_40px_-5px_rgba(201,106,27,0.5)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative flex items-center justify-center gap-2">
                Create Your CV <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/templates"
              className="px-6 py-3 bg-white rounded-full text-brown-blackish font-semibold text-base border border-gray-cool shadow-sm hover:border-orange-burnt hover:text-orange-burnt transition-colors duration-300 flex items-center justify-center"
            >
              View Templates
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Interactive 3D Mockup */}
        <HeroPreview />

      </div>
    </section>
  );
}

