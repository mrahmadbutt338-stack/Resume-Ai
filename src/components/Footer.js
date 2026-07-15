'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// SVG Icons since lucide-react removed brand icons
import { Mail } from 'lucide-react';

const Facebook = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Twitter = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Github = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Mail size={20} />, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=mrahmadbutt338@gmail.com', label: 'Email', target: '_blank' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/ahmad-asad-b14606341/', label: 'LinkedIn', target: '_blank' },
    { icon: <Github size={20} />, href: 'https://github.com/mrahmadbutt338-stack', label: 'GitHub', target: '_blank' },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-r from-[#2A1B14] via-orange-burnt to-[#111111]">
      
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-300 group-hover:scale-105">
                R
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                RESUME <span className="text-orange-300">AI</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Build a world-class premium Resume/CV. Stand out from the crowd with beautiful, professional designs.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/create" className="text-gray-300 hover:text-white transition-colors text-sm">Create CV</Link></li>
              <li><Link href="/templates" className="text-gray-300 hover:text-white transition-colors text-sm">Templates</Link></li>
              <li><Link href="#features" className="text-gray-300 hover:text-white transition-colors text-sm">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white text-lg">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.target || '_self'}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} RESUME AI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Crafted with <span className="text-orange-300">♥</span> for professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
