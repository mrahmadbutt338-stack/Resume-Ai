'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Download, ChevronLeft } from 'lucide-react';

import TemplateRenderer from '@/resume-engine/TemplateRenderer';




export default function PreviewPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    // Load from local storage (Auto-Save system)
    const storedData = localStorage.getItem('resumeSaaSData');
    
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Grab selected template from session storage if it exists, otherwise use form templateId
      const sessionTemplate = sessionStorage.getItem('selectedTemplate');
      if (sessionTemplate) {
        parsed.selectedTemplate = sessionTemplate;
      } else if (parsed.templateConfig?.templateId) {
        parsed.selectedTemplate = parsed.templateConfig.templateId;
      }
      setResumeData(parsed);
    } else {
      // Fallback
      router.push('/create');
    }
  }, [router]);

  const handleDownload = async () => {
    setIsGenerating(true);
    const element = resumeRef.current;
    
    const opt = {
      margin:       0,
      filename:     `${resumeData?.personalInfo?.firstName || 'Resume'}_CV.pdf`,
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf().set(opt).from(element).save().then(() => {
      setIsGenerating(false);
    });
  };

  if (!resumeData) return <div className="min-h-screen bg-gray-light flex items-center justify-center font-bold text-slate-500">Loading Preview...</div>;

  const { templateConfig } = resumeData;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24">
      <div className="container mx-auto px-6">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8 max-w-[800px] mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors"
          >
            <ChevronLeft size={20} /> Back to Editor
          </button>
          
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg transition-all duration-300 ${
              isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            <Download size={20} />
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* CV Preview Area */}
        <div className="max-w-[800px] mx-auto overflow-hidden shadow-2xl rounded-sm">
          <div ref={resumeRef}>
            <TemplateRenderer data={resumeData} />
          </div>
        </div>

      </div>
    </div>
  );
}
