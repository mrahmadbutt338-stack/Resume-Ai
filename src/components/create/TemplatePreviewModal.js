import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function TemplatePreviewModal({ template, isOpen, onClose, onSelect }) {
  const [scale, setScale] = useState(1);

  if (!isOpen || !template) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">{template.name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} className="p-2 hover:bg-gray-100 text-gray-600 transition-colors">
                  <ZoomOut size={20} />
                </button>
                <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-x border-gray-200 min-w-[60px] text-center">
                  {Math.round(scale * 100)}%
                </div>
                <button onClick={() => setScale(s => Math.min(2, s + 0.25))} className="p-2 hover:bg-gray-100 text-gray-600 transition-colors">
                  <ZoomIn size={20} />
                </button>
              </div>
              <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 overflow-auto bg-gray-100 p-8 flex items-start justify-center cursor-move">
            <motion.img
              src={template.image}
              alt={template.name}
              style={{ scale }}
              className="max-w-full shadow-lg rounded-sm origin-top transition-transform duration-200"
            />
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSelect(template.id);
                onClose();
              }}
              className="px-8 py-2.5 rounded-xl font-bold text-white bg-orange-burnt hover:bg-orange-800 shadow-md hover:shadow-lg transition-all"
            >
              Select This Template
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
