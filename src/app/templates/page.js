'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function TemplatesPage() {
  const router = useRouter();
  
  const categories = [
    'Professional CV with Picture',
    'Professional CV without Picture'
  ];

  const [activeCategory, setActiveCategory] = useState('Professional CV with Picture');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templatesWithPic = [
    { id: 'with-pic-1', name: 'Design 1', image: '/images/templates/cv_no_pic_3.png' },
    { id: 'with-pic-2', name: 'Design 2', image: '/images/templates/cv_with_pic_2.avif' },
    { id: 'with-pic-3', name: 'Design 3', image: '/images/templates/cv_with_pic_3.jpg' },
    { id: 'with-pic-4', name: 'Design 4', image: '/images/templates/cv_no_pic_4.png' },
    { id: 'with-pic-5', name: 'Design 5', image: '/images/templates/cv_with_pic_5.jpg' },
    { id: 'with-pic-6', name: 'Design 6', image: '/images/templates/cv_with_pic_6.jpg' },
    { id: 'with-pic-7', name: 'Design 7', image: '/images/templates/cv_with_pic_7.jpg' },
    { id: 'with-pic-8', name: 'Design 8', image: '/images/templates/cv_with_pic_8.jpg' },
    { id: 'with-pic-9', name: 'Design 9', image: '/images/templates/cv_with_pic_9.png' },
    { id: 'with-pic-10', name: 'Design 10', image: '/images/templates/cv_with_pic_10.png' },
  ];

  const templatesNoPic = [
    { id: 'no-pic-1', name: 'Design 1', image: '/images/templates/cv_no_pic_1.png' },
    { id: 'no-pic-2', name: 'Design 2', image: '/images/templates/cv_no_pic_2.png' },
    { id: 'no-pic-3', name: 'Design 3', image: '/images/templates/cv_with_pic_1.png' },
    { id: 'no-pic-4', name: 'Design 4', image: '/images/templates/cv_with_pic_4.jpg' },
    { id: 'no-pic-5', name: 'Design 5', image: '/images/templates/cv_no_pic_5.png' },
    { id: 'no-pic-6', name: 'Design 6', image: '/images/templates/cv_no_pic_6.png' },
    { id: 'no-pic-7', name: 'Design 7', image: '/images/templates/cv_no_pic_7.jpg' },
    { id: 'no-pic-8', name: 'Design 8', image: '/images/templates/cv_no_pic_8.jpg' },
    { id: 'no-pic-9', name: 'Design 9', image: '/images/templates/cv_no_pic_9.jpg' },
    { id: 'no-pic-10', name: 'Design 10', image: '/images/templates/cv_no_pic_10.jpeg' },
  ];

  const templates = activeCategory === 'Professional CV with Picture' ? templatesWithPic : templatesNoPic;

  const handleContinue = () => {
    if (!selectedTemplate) return;
    sessionStorage.setItem('selectedTemplate', selectedTemplate);
    // Determine if we have data to preview, otherwise go to create
    const hasData = sessionStorage.getItem('resumeData');
    if (hasData) {
      router.push('/preview');
    } else {
      router.push('/create');
    }
  };

  return (
    <div className="min-h-screen bg-gray-light pt-32 pb-24">
      <div className="container mx-auto px-6">
        
        <button 
          onClick={() => router.back()} 
          className="mb-6 flex items-center gap-2 text-brown-burnt hover:text-orange-burnt font-bold transition-colors"
        >
          <span className="text-xl">←</span> Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brown-blackish mb-4">
            Select Your <span className="text-orange-burnt">Template</span>
          </h1>
          <p className="text-lg text-brown-burnt/70 max-w-2xl mx-auto">
            Choose a professional design to get started. You can always change this later.
          </p>
        </div>

        {/* Categories Menu */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedTemplate(null);
              }}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-orange-burnt text-white shadow-[0_10px_20px_-5px_rgba(201,106,27,0.5)] scale-105'
                  : 'bg-white text-brown-burnt border border-gray-cool hover:border-orange-burnt/50 hover:text-orange-burnt shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-24"
          >
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 bg-white ${
                  selectedTemplate === template.id 
                    ? 'ring-4 ring-orange-burnt ring-offset-4 ring-offset-[#F9FAFB] scale-105 z-10 shadow-2xl' 
                    : 'hover:scale-105 hover:shadow-xl hover:z-10 border border-gray-cool shadow-md'
                }`}
              >
                {/* Template Preview (Actual Image) */}
                <div className="aspect-[1/1.4] relative overflow-hidden flex flex-col items-center justify-center group bg-gray-50">
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 w-10 h-10 bg-orange-burnt text-white rounded-full flex items-center justify-center font-bold shadow-lg z-30">
                      ✓
                    </div>
                  )}
                  
                  {/* Subtle dark overlay on hover or selection */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-300 ${selectedTemplate === template.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-contain p-3 relative z-0 transition-transform duration-500 group-hover:scale-105" 
                  />
                  
                  {/* Title overlay */}
                  <div className={`absolute bottom-0 left-0 w-full p-4 z-20 transition-transform duration-300 translate-y-4 ${selectedTemplate === template.id ? 'translate-y-0' : 'group-hover:translate-y-0 opacity-0 group-hover:opacity-100'}`}>
                    <h3 className="font-bold text-white text-center drop-shadow-md">{template.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Action Button */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
            >
              <button
                onClick={handleContinue}
                className="px-12 py-5 bg-gradient-to-r from-orange-burnt to-orange-warm text-white font-black text-xl rounded-full shadow-[0_10px_30px_rgba(201,106,27,0.4)] hover:shadow-[0_15px_40px_rgba(201,106,27,0.6)] hover:-translate-y-2 transition-all duration-300 flex items-center gap-4"
              >
                Use This Template <span className="text-2xl">→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
