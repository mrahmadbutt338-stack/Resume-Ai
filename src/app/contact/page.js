'use client';

import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        data = {};
      }

      if (res.ok) {
        toast.success(data.message || 'Message sent successfully!');
        e.target.reset();
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('A network error occurred. Please try again.');
    }
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gray-50 font-sans selection:bg-gray-900 selection:text-white">
      <Toaster position="top-right" />
      <Navbar />
      
      <main className="pt-8 pb-8 px-4 md:px-8 flex flex-col justify-center items-center relative overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-60 pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-60 pointer-events-none -z-10" />

        <div className="w-full max-w-3xl mt-2">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gray-900 text-white text-xs font-bold tracking-widest uppercase mb-5 shadow-sm">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Let's build <br className="hidden md:block" />
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">something great.</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-400 -z-10 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Have a question or want to work together? Drop us a message below and our team will get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-[2.5rem] border-[3px] border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] hover:shadow-[12px_12px_0px_0px_rgba(17,24,39,1)] transition-shadow duration-500 overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left Side: Contact Information */}
            <div className="w-full lg:w-2/5 bg-orange-50 p-3 md:p-5 text-gray-900 flex flex-col justify-between relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-gray-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Get in touch</h3>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  We'd love to hear from you. Our friendly team is always here to chat.
                </p>

                <div className="space-y-6">
                  <motion.a href="https://mail.google.com/mail/?view=cm&fs=1&to=mrahmadbutt338@gmail.com" target="_blank" rel="noopener noreferrer" variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-warm group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Email me</p>
                      <p className="text-base font-semibold">mrahmadbutt338@gmail.com</p>
                    </div>
                  </motion.a>
                  
                  <motion.a href="https://wa.me/923223624954" target="_blank" rel="noopener noreferrer" variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-warm group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Message on WhatsApp</p>
                      <p className="text-base font-semibold">+92 322 3624954</p>
                    </div>
                  </motion.a>

                  <motion.a href="https://www.linkedin.com/in/ahmad-asad-b14606341/" target="_blank" rel="noopener noreferrer" variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-warm group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Connect on LinkedIn</p>
                      <p className="text-base font-semibold">Ahmad Asad</p>
                    </div>
                  </motion.a>
                  
                  <motion.a href="https://github.com/mrahmadbutt338-stack" target="_blank" rel="noopener noreferrer" variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-warm group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">View my GitHub</p>
                      <p className="text-base font-semibold">@mrahmadbutt338-stack</p>
                    </div>
                  </motion.a>
                </div>
              </div>
              
              <div className="mt-12 relative z-10">
                <p className="text-sm text-gray-500 font-medium">© 2026 ResumeBuilder. All rights reserved.</p>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="w-full lg:w-3/5 p-8 md:p-10 bg-white relative">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 ml-1">First Name</label>
                    <input 
                      name="firstName"
                      type="text" 
                      onFocus={() => setFocusedInput('firstName')}
                      onBlur={() => setFocusedInput(null)}
                      className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedInput === 'firstName' ? 'border-gray-900 shadow-[3px_3px_0px_0px_rgba(17,24,39,0.2)] bg-white' : 'border-gray-200 hover:border-gray-300'}`}
                      placeholder="Jane" 
                      required 
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-bold text-gray-900 ml-1">Last Name</label>
                    <input 
                      name="lastName"
                      type="text" 
                      onFocus={() => setFocusedInput('lastName')}
                      onBlur={() => setFocusedInput(null)}
                      className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedInput === 'lastName' ? 'border-gray-900 shadow-[3px_3px_0px_0px_rgba(17,24,39,0.2)] bg-white' : 'border-gray-200 hover:border-gray-300'}`}
                      placeholder="Smith" 
                      required 
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 ml-1">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ${focusedInput === 'email' ? 'border-gray-900 shadow-[3px_3px_0px_0px_rgba(17,24,39,0.2)] bg-white' : 'border-gray-200 hover:border-gray-300'}`}
                    placeholder="jane@example.com" 
                    required 
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-bold text-gray-900 ml-1">Your Message</label>
                  <textarea 
                    name="message"
                    rows="2" 
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-2 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 resize-none ${focusedInput === 'message' ? 'border-gray-900 shadow-[3px_3px_0px_0px_rgba(17,24,39,0.2)] bg-white' : 'border-gray-200 hover:border-gray-300'}`}
                    placeholder="Tell us about your project..." 
                    required 
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-orange-500 text-white font-bold text-base py-3 px-8 rounded-xl flex items-center justify-center gap-3 border-2 border-orange-500 hover:bg-white hover:text-orange-500 hover:shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                    {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                  </motion.button>
                </motion.div>
              </form>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}

