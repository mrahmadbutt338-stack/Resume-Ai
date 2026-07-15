'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Sliders, LayoutTemplate, Bot, Check, User, Mail, Phone, MapPin, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SmartBuilder() {
  const stepsData = [
    {
      title: 'Smart Generation',
      description: 'Our engine formats your data instantly.',
      icon: <Zap className="text-orange-burnt" size={24} />
    },
    {
      title: 'Easy Customization',
      description: 'Tweak colors and fonts with one click.',
      icon: <Sliders className="text-orange-burnt" size={24} />
    },
    {
      title: 'Professional Results',
      description: 'Export a flawless PDF ready for employers.',
      icon: <Target className="text-orange-burnt" size={24} />
    },
    {
      title: 'Fast Workflow',
      description: 'From start to finish in under 5 minutes.',
      icon: <LayoutTemplate className="text-orange-burnt" size={24} />
    }
  ];

  const sidebarSteps = [
    { label: 'Personal Info', status: 'done' },
    { label: 'Professional Summary', status: 'done' },
    { label: 'Work Experience', status: 'active' },
    { label: 'Education', status: 'pending' },
    { label: 'Skills', status: 'pending' },
    { label: 'Achievements', status: 'pending' },
  ];

  // Animated skeleton lines effect
  const [activeLine, setActiveLine] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % 6);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 relative overflow-hidden bg-[#FDFDFD]"
    >
      {/* Background glowing shape */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-burnt/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Animated Showcase UI Replica */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            {/* The Main UI Panel - Light Theme & Smaller Height */}
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-5 md:p-6 flex flex-col h-[400px] sm:h-[450px] relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-burnt/10 flex items-center justify-center text-orange-burnt">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="text-brown-blackish font-bold text-lg leading-tight">AI Resume Builder</h3>
                    <p className="text-gray-500 text-xs">Let AI write and optimize your resume</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-orange-burnt/10 border border-orange-burnt/20 text-orange-burnt text-[10px] sm:text-xs font-bold flex items-center gap-2">
                  <motion.span 
                    animate={{ opacity: [1, 0.5, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-orange-burnt"
                  />
                  Generating...
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 gap-4 sm:gap-6 relative">
                
                {/* Left Sidebar Steps */}
                <div className="w-40 sm:w-48 hidden sm:flex flex-col relative pt-1">
                  {/* Vertical Progress Line */}
                  <div className="absolute left-[9px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-green-500 via-orange-burnt to-gray-200 -z-10"></div>
                  
                  {sidebarSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 group">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center relative mt-0.5 shadow-sm transition-all duration-300
                        ${step.status === 'done' ? 'bg-green-500 text-white' : 
                          step.status === 'active' ? 'bg-white border-2 border-orange-burnt' : 
                          'bg-gray-200 border-2 border-transparent'}`}
                      >
                        {step.status === 'done' && <Check size={12} strokeWidth={4} />}
                        {step.status === 'active' && (
                          <motion.div 
                            layoutId="activeDot"
                            className="w-2 h-2 rounded-full bg-orange-burnt"
                          />
                        )}
                      </div>
                      <span className={`text-[11px] sm:text-xs font-semibold transition-colors duration-300
                        ${step.status === 'done' ? 'text-gray-500' : 
                          step.status === 'active' ? 'text-orange-burnt' : 
                          'text-gray-400'}`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Document Preview (The Resume) */}
                <div className="flex-1 bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 shadow-inner border border-gray-100 relative overflow-hidden flex flex-col">
                  {/* Document Header */}
                  <div className="border-b border-gray-200 pb-3 mb-4">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">John Doe</h2>
                    <p className="text-orange-burnt font-bold text-[10px] uppercase tracking-widest mb-2">Marketing Manager</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-semibold text-gray-500">
                      <span className="flex items-center gap-1"><Mail size={10}/> john@example.com</span>
                      <span className="flex items-center gap-1"><Phone size={10}/> +1 234 567 890</span>
                    </div>
                  </div>

                  {/* Document Sections */}
                  <div className="flex-1 space-y-4">
                    {/* Professional Summary Skeleton */}
                    <div>
                      <h4 className="text-[9px] font-black uppercase text-gray-800 mb-2 tracking-widest">Professional Summary</h4>
                      <div className="space-y-1.5">
                        <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                        <div className="h-1.5 bg-gray-200 rounded w-[90%]"></div>
                        <div className="h-1.5 bg-gray-200 rounded w-[70%]"></div>
                      </div>
                    </div>

                    {/* Work Experience Animated Skeleton */}
                    <div>
                      <h4 className="text-[9px] font-black uppercase text-gray-800 mb-2 tracking-widest flex items-center gap-2">
                        Work Experience
                        <motion.span 
                          animate={{ opacity: [1, 0, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-orange-burnt inline-block"
                        />
                      </h4>
                      <div className="relative pl-3 border-l-2 border-orange-burnt/30 space-y-3">
                        {[0, 1].map((block) => (
                          <div key={block} className="space-y-1.5 relative">
                            <div className="absolute -left-[15px] top-1 w-1.5 h-1.5 rounded-full bg-orange-burnt"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2 mb-1"></div>
                            <div className="h-1 bg-orange-burnt/20 rounded w-1/4 mb-2"></div>
                            <div className="space-y-1">
                              {[0, 1, 2].map((lineIndex) => {
                                const globalLineIndex = (block * 3) + lineIndex;
                                const isTyping = activeLine === globalLineIndex;
                                const isDone = activeLine > globalLineIndex;
                                return (
                                  <div key={lineIndex} className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: isDone ? '90%' : isTyping ? ['0%', '90%'] : '0%' }}
                                      transition={{ duration: 1.5, ease: "linear" }}
                                      className={`h-1 rounded ${isDone ? 'bg-gray-200' : isTyping ? 'bg-orange-burnt/40' : 'bg-transparent'}`}
                                      style={{ minWidth: isDone || isTyping ? '40%' : '0%' }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating ATS Score Badge */}
              <motion.div 
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 sm:bottom-4 left-1/2 sm:left-[30%] -translate-x-1/2 sm:translate-x-0 bg-white p-3 sm:p-4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-3 z-20"
              >
                <div>
                  <p className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">ATS Score</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#22C55E]">98%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                  <TrendingUp size={20} strokeWidth={3} />
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Right: Content & Cards - Light Theme */}
          <div className="w-full lg:w-1/2 space-y-8 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-brown-blackish mb-4 tracking-tight">
                <span className="text-orange-burnt">Smart</span> Builder
              </h2>
              <p className="text-base text-brown-burnt/70 leading-relaxed max-w-lg">
                Stop struggling with formatting. Our intelligent engine takes your information and perfectly aligns it into stunning, professional layouts automatically.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stepsData.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className="bg-white p-5 rounded-2xl border border-gray-cool shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-burnt/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold text-brown-blackish mb-1">{step.title}</h4>
                  <p className="text-brown-burnt/70 text-xs leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </motion.section>
  );
}
