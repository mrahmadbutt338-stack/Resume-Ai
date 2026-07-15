'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormMode from '@/components/FormMode';
import ImageCropperStep from '@/components/create/ImageCropperStep';
import TemplatePreviewModal from '@/components/create/TemplatePreviewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { resumeAPI } from '@/utils/api';

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

export default function CreatePage() {
  const router = useRouter();
  
  // Builder State
  const [step, setStep] = useState(1);
  const [cvType, setCvType] = useState(null); // 'with-pic' or 'no-pic'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  
  // UI State
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getStepsList = () => {
    const list = [
      { num: 1, title: 'Type' },
      { num: 2, title: 'Template' },
      { num: 3, title: 'Details' },
    ];
    if (cvType === 'with-pic') {
      list.push({ num: 4, title: 'Picture' });
    }
    return list;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const finalData = {
        ...formData,
        personalInfo: {
          ...formData?.personalInfo,
          image: profileImage || formData?.personalInfo?.image,
        },
        templateConfig: {
          ...formData?.templateConfig,
          withPicture: cvType === 'with-pic',
        },
        selectedTemplate: selectedTemplate
      };

      try {
        const response = await resumeAPI.create({ name: `${finalData.personalInfo?.fullName || 'My'} Resume`, data: finalData });
        console.log("Resume saved to DB:", response);
      } catch (dbError) {
        console.log("Could not save to DB (might be unauthenticated):", dbError.message);
      }

      localStorage.setItem('resumeSaaSData', JSON.stringify(finalData));
      sessionStorage.setItem('resumeData', JSON.stringify(finalData));
      sessionStorage.setItem('selectedTemplate', selectedTemplate);
      
      router.push('/preview');
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error generating your resume.");
      setIsGenerating(false);
    }
  };

  const templates = cvType === 'with-pic' ? templatesWithPic : templatesNoPic;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-100/50 to-transparent pointer-events-none"></div>
      
      {isGenerating && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-burnt rounded-full animate-spin mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Generating Your CV...</h3>
          <p className="text-gray-500">Applying template styles and formatting data</p>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
          {getStepsList().map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex items-center gap-2 ${step === s.num ? 'text-orange-burnt' : step > s.num ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step === s.num ? 'bg-orange-100 text-orange-burnt ring-2 ring-orange-burnt' : 
                  step > s.num ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span className="font-semibold hidden md:block">{s.title}</span>
              </div>
              {idx < getStepsList().length - 1 && (
                <ChevronRight size={20} className="text-gray-300 mx-2 md:mx-4" />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: CHOOSE TYPE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose CV Type</h1>
                <p className="text-lg text-gray-600">Do you want a profile picture on your CV?</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => { setCvType('with-pic'); setStep(2); }}
                  className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-orange-burnt shadow-lg hover:shadow-xl transition-all group text-left"
                >
                  <div className="w-16 h-16 bg-orange-50 text-orange-burnt rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <UserCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">With Picture</h3>
                  <p className="text-gray-500 mb-6">Modern and personal. Great for creative fields, real estate, and international applications.</p>
                  <div className="text-orange-burnt font-semibold flex items-center gap-2">
                    Select <ChevronRight size={16} />
                  </div>
                </button>
                
                <button
                  onClick={() => { setCvType('no-pic'); setStep(2); }}
                  className="bg-white p-8 rounded-3xl border-2 border-transparent hover:border-blue-600 shadow-lg hover:shadow-xl transition-all group text-left"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Without Picture</h3>
                  <p className="text-gray-500 mb-6">Traditional and professional. Standard for corporate, academic, and US/UK applications.</p>
                  <div className="text-blue-600 font-semibold flex items-center gap-2">
                    Select <ChevronRight size={16} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CHOOSE TEMPLATE */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Select Template</h2>
                  <p className="text-gray-600">Click view to preview, or select to continue.</p>
                </div>
                <button onClick={() => setStep(1)} className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  Back
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {templates.map(t => (
                  <div key={t.id} className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-[1/1.414] bg-gray-100 p-2 relative">
                      <img src={t.image} alt={t.name} className="w-full h-full object-contain shadow-sm" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                        <button 
                          onClick={() => setPreviewTemplate(t)}
                          className="px-6 py-2 bg-white text-gray-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => { setSelectedTemplate(t.id); setStep(3); }}
                          className="px-6 py-2 bg-orange-burnt text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                    <div className="p-3 text-center border-t border-gray-100 bg-white">
                      <p className="font-semibold text-gray-800">{t.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FORM */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-10"
            >
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Enter Your Details</h2>
                  <p className="text-gray-600">Fill out the form below. Empty sections will be hidden.</p>
                </div>
                <button onClick={() => setStep(2)} className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  Back
                </button>
              </div>
              
              {/* FormMode needs to be slightly modified or we just wrap it and intercept submit */}
              <FormMode 
                initialData={formData}
                onSubmit={(data) => {
                  setFormData(data);
                  if (cvType === 'with-pic') {
                    setStep(4);
                  } else {
                    // Generate immediately
                    handleGenerate();
                  }
                }} 
              />
            </motion.div>
          )}

          {/* STEP 4: PICTURE UPLOAD (Only if with-pic) */}
          {step === 4 && cvType === 'with-pic' && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <ImageCropperStep
                image={profileImage}
                onImageUpdate={setProfileImage}
                onComplete={handleGenerate}
                onBack={() => setStep(3)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <TemplatePreviewModal 
        isOpen={!!previewTemplate} 
        template={previewTemplate} 
        onClose={() => setPreviewTemplate(null)} 
        onSelect={(id) => {
          setSelectedTemplate(id);
          setStep(3);
          setPreviewTemplate(null);
        }} 
      />
    </div>
  );
}
