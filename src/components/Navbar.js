'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === 'loading';
  const logout = () => signOut({ callbackUrl: '/' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 mx-auto z-50 transition-all duration-500 max-w-[1400px] ${
        scrolled 
          ? 'glass-nav top-4 w-[95%] md:w-[85%] lg:w-[75%] rounded-full py-3 px-6 !shadow-[0_5px_20px_rgba(201,106,27,0.4),0_-5px_20px_rgba(201,106,27,0.4)]' 
          : 'top-0 w-full bg-gradient-to-r from-[#2A1B14] via-orange-burnt to-[#111111] py-5 px-6 md:px-12 shadow-md'
      }`}
    >
      <div className="flex justify-between items-center w-full h-full relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md transition-all duration-300 group-hover:scale-105 ${scrolled ? 'bg-brown-blackish' : 'bg-white/20 backdrop-blur-sm'}`}>
            R
          </div>
          <span className={`text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-brown-blackish' : 'text-white'}`}>
            RESUME <span className={scrolled ? 'text-orange-burnt' : 'text-orange-300'}>AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Create CV', path: '/create' },
            { name: 'Templates', path: '/templates' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => (
            <li key={item.name}>
              <Link 
                href={item.path} 
                className={`font-medium transition-colors ${scrolled ? 'text-brown-burnt hover:text-orange-burnt' : 'text-gray-200 hover:text-white'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          
          {!loading && user ? (
            <li className="flex items-center gap-4">
              <span className={`font-semibold ${scrolled ? 'text-brown-blackish' : 'text-white'}`}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={logout} 
                className={`px-5 py-2 rounded-full border transition-colors ${scrolled ? 'border-brown-burnt text-brown-burnt hover:bg-brown-burnt hover:text-white' : 'border-white text-white hover:bg-white hover:text-brown-blackish'}`}
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="flex items-center gap-3">
              <Link 
                href="/login" 
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 ${scrolled ? 'text-brown-blackish hover:bg-gray-100' : 'text-white hover:text-orange-200'}`}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className={`px-6 py-2.5 rounded-full font-bold shadow-md transition-all duration-300 hover:-translate-y-0.5 ${scrolled ? 'bg-orange-burnt text-white hover:shadow-[0_10px_20px_-5px_rgba(201,106,27,0.4)]' : 'bg-white text-brown-blackish hover:shadow-[0_10px_20px_-5px_rgba(255,255,255,0.4)]'}`}
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <div 
          className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50" 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-brown-blackish block" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-brown-blackish block" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-brown-blackish block" />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed top-0 left-0 w-full bg-[#F3F4F6] flex flex-col items-center justify-center gap-8 -z-10 overflow-hidden"
            >
              {[
                { name: 'Home', path: '/' },
                { name: 'Create CV', path: '/create' },
                { name: 'Templates', path: '/templates' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-semibold text-brown-blackish hover:text-orange-burnt transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {!loading && user ? (
                <button 
                  onClick={() => { logout(); setMobileOpen(false); }} 
                  className="text-xl font-semibold text-brown-burnt"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-4 w-[80%] max-w-sm">
                  <Link 
                    href="/login" 
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 rounded-full border-2 border-brown-blackish text-brown-blackish font-bold text-center text-lg hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 rounded-full bg-orange-burnt text-white font-bold text-center text-lg shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
