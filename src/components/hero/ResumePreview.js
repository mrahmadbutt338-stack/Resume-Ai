'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Terminal, Briefcase } from 'lucide-react';
import TypingText from './TypingText';

const AnimatedSkillBar = ({ skill, width, delay }) => (
  <div className="mb-3">
    <div className="flex justify-between items-end mb-1">
      <span className="text-[10px] font-bold text-slate-700">{skill}</span>
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
        className="text-[9px] text-slate-400"
      >
        {width}
      </motion.span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: width }}
        transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
      />
    </div>
  </div>
);

const AnimatedTimeline = ({ title, company, period, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    className="relative pl-4 border-l-2 border-slate-200 mb-4 last:mb-0"
  >
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: delay + 0.2, type: "spring" }}
      className="absolute w-2 h-2 bg-indigo-500 rounded-full -left-[5px] top-1.5 shadow-[0_0_8px_rgba(79,70,229,0.5)]" 
    />
    <div className="text-[9px] font-bold text-indigo-500 mb-0.5"><TypingText text={period} delay={delay + 0.3} /></div>
    <div className="text-[11px] font-bold text-slate-800"><TypingText text={title} delay={delay + 0.5} /></div>
    <div className="text-[10px] text-slate-500"><TypingText text={company} delay={delay + 0.7} /></div>
  </motion.div>
);

export default function ResumePreview({ data }) {
  if (!data) return null;

  return (
    <div className="w-full h-full p-6 flex flex-col pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
      
      {/* TOP: Profile Header Section */}
      <div className="flex gap-4 items-center mb-6 border-b border-slate-100 pb-5" style={{ transform: "translateZ(30px)" }}>
        
        {/* Profile Image with fade & scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg overflow-hidden"
        >
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden flex items-center justify-center">
            <img src={data.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Name and Title */}
        <div className="flex-1">
          <div className="text-xl font-black text-slate-900 tracking-tight">
            <TypingText text={data.name} delay={0.6} />
          </div>
          
          <div className="text-xs font-bold text-indigo-600 mb-2">
            <TypingText text={data.title} delay={1.2} />
          </div>
          
          {/* Contact Icons - slide in */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="flex gap-3 text-[9px] text-slate-500 font-medium"
          >
            <span className="flex items-center gap-1"><MapPin size={10} className="text-slate-400" /> {data.location}</span>
            <span className="flex items-center gap-1"><Mail size={10} className="text-slate-400" /> {data.email}</span>
            <span className="flex items-center gap-1"><Phone size={10} className="text-slate-400" /> {data.phone}</span>
          </motion.div>
        </div>
      </div>

      {/* MIDDLE: Summary (Typing) */}
      <div
        className="text-[10px] text-slate-500 leading-relaxed mb-6 min-h-[30px]"
        style={{ transform: "translateZ(10px)" }}
      >
        <TypingText text={data.summary} delay={2.4} />
      </div>

      {/* BOTTOM: Grid for Skills and Experience */}
      <div className="flex-1 grid grid-cols-12 gap-6" style={{ transform: "translateZ(20px)" }}>
        
        {/* Left Column: Skills */}
        <div className="col-span-5 flex flex-col gap-1">
          <motion.h4 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
            className="text-[11px] font-black text-slate-800 mb-3 tracking-wide"
          >
            Skills
          </motion.h4>
          {data.skills.map((skill, i) => (
            <AnimatedSkillBar key={i} skill={skill.name} width={skill.width} delay={3.8 + (i * 0.2)} />
          ))}
        </div>

        {/* Right Column: Experience */}
        <div className="col-span-7 flex flex-col">
          <motion.h4 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}
            className="text-[11px] font-black text-slate-800 mb-3 tracking-wide"
          >
            Experience
          </motion.h4>
          <div className="flex-1">
            {data.experience.map((exp, i) => (
              <AnimatedTimeline 
                key={i} 
                title={exp.title} 
                company={exp.company} 
                period={exp.period} 
                delay={4.8 + (i * 1.2)} 
              />
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER: Social Badges */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 7.0, duration: 0.5 }}
        className="flex justify-center gap-3 mt-4 pt-4 border-t border-slate-100"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-bold text-slate-600 shadow-sm"><Terminal size={12}/> GitHub</div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg text-[9px] font-bold text-blue-600 shadow-sm"><Briefcase size={12}/> LinkedIn</div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-lg text-[9px] font-bold text-orange-600 shadow-sm"><Globe size={12}/> Website</div>
      </motion.div>

    </div>
  );
}
