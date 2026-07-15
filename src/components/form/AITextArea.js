'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw, Check, Type, Edit3, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AITextArea({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  rows = 5 
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Mock AI processing function
  const handleAIAction = async (actionType) => {
    setIsProcessing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let result = value;
    switch(actionType) {
      case 'improve':
        result = value ? `✨ [Improved] ${value}` : 'Please write something first to improve it.';
        break;
      case 'professional':
        result = value ? `👔 [Professional Tone] ${value}` : 'Please write something to convert to professional tone.';
        break;
      case 'grammar':
        result = value ? `✅ [Grammar Fixed] ${value}` : 'Please write something to check grammar.';
        break;
      case 'expand':
        result = value ? `📝 [Expanded] ${value} This section has been expanded with more details and context.` : 'Please write something to expand.';
        break;
      case 'shorten':
        result = value ? `✂️ [Shortened] ${value.substring(0, 50)}...` : 'Please write something to shorten.';
        break;
      case 'generate':
        result = "🚀 [AI Generated] An experienced professional with a strong background in software engineering, delivering scalable and high-performance solutions. Passionate about clean code and agile methodologies.";
        break;
      default:
        break;
    }
    
    onChange(result);
    setIsProcessing(false);
    setShowOptions(false);
  };

  const charCount = value ? value.length : 0;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end">
        {label && <label className="text-sm font-semibold text-slate-600">{label}</label>}
        
        {/* AI Magic Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-orange-burnt bg-orange-50 border border-orange-burnt/20 rounded-full hover:bg-orange-100 transition-colors shadow-sm"
          >
            <Sparkles size={14} />
            AI Assist
          </button>
          
          <AnimatePresence>
            {showOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-xl p-2 z-50 grid grid-cols-2 gap-1"
              >
                <ActionButton icon={<Wand2 size={14}/>} label="Generate" onClick={() => handleAIAction('generate')} />
                <ActionButton icon={<RefreshCw size={14}/>} label="Rewrite" onClick={() => handleAIAction('improve')} />
                <ActionButton icon={<Edit3 size={14}/>} label="Improve" onClick={() => handleAIAction('improve')} />
                <ActionButton icon={<Type size={14}/>} label="Professional" onClick={() => handleAIAction('professional')} />
                <ActionButton icon={<Check size={14}/>} label="Grammar Fix" onClick={() => handleAIAction('grammar')} />
                <ActionButton icon={<Maximize2 size={14}/>} label="Expand" onClick={() => handleAIAction('expand')} />
                <ActionButton icon={<Minimize2 size={14}/>} label="Shorten" onClick={() => handleAIAction('shorten')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`w-full p-4 border rounded-xl text-[15px] transition-all duration-300 resize-y bg-white text-slate-800 ${
            isProcessing ? 'opacity-50 pointer-events-none border-orange-burnt' : 'border-slate-300 focus:border-green-800 focus:ring-4 focus:ring-green-800/10'
          }`}
          style={{ minHeight: '120px' }}
        />
        
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-xl z-10">
            <div className="flex flex-col items-center gap-2 text-orange-burnt font-bold animate-pulse">
              <Sparkles size={24} className="animate-spin-slow" />
              <span>AI is working...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <span className="text-xs text-slate-400 font-medium">{charCount} characters</span>
      </div>
    </div>
  );
}

const ActionButton = ({ icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 px-2 py-2 text-xs font-medium text-slate-700 hover:text-orange-burnt hover:bg-orange-50 rounded-lg transition-colors w-full text-left"
  >
    {icon}
    {label}
  </button>
);
