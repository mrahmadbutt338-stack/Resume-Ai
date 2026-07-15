'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Search, Heart, Eye, Download } from 'lucide-react';

export default function CommunityPage() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // In a real implementation, this would fetch from /api/resumes/public
    // For now, we mock some premium community resumes
    const mockResumes = [
      { id: 1, name: 'Emma Moss', title: 'Senior UX Designer', likes: 342, views: '1.2k', template: 'Classic Photo', color: 'bg-emerald-500' },
      { id: 2, name: 'Larry Tibbetts', title: 'Full Stack Engineer', likes: 256, views: '890', template: 'Dynamic Sidebar', color: 'bg-teal-600' },
      { id: 3, name: 'Kaida Kim', title: 'Marketing Director', likes: 189, views: '650', template: 'Bold Border', color: 'bg-black' },
      { id: 4, name: 'Alex Johnson', title: 'Product Manager', likes: 421, views: '2.1k', template: 'Modern Two-Column', color: 'bg-blue-600' },
      { id: 5, name: 'Sarah Chen', title: 'Data Scientist', likes: 156, views: '430', template: 'Classic Photo', color: 'bg-purple-600' },
      { id: 6, name: 'James Wilson', title: 'Sales Executive', likes: 98, views: '320', template: 'Corporate', color: 'bg-slate-800' },
    ];
    
    setTimeout(() => {
      setResumes(mockResumes);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredResumes = resumes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-6 tracking-tight text-slate-900"
          >
            Community <span className="text-blue-600">Showcase</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Get inspired by thousands of professional resumes created by our community.
            Find the perfect layout for your industry.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto mb-16"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by job title, industry, or template..."
            className="block w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-0 text-lg transition-colors shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResumes.map((resume, i) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer"
              >
                {/* Resume Preview Mockup */}
                <div className="h-64 bg-slate-100 p-6 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 ${resume.color}`}></div>
                  <div className="bg-white w-full h-full rounded shadow-sm p-4 relative">
                    <div className={`w-12 h-12 rounded-full ${resume.color} opacity-20 mb-4`}></div>
                    <div className="w-3/4 h-3 bg-slate-200 rounded mb-2"></div>
                    <div className="w-1/2 h-2 bg-slate-200 rounded mb-6"></div>
                    
                    <div className="w-full h-2 bg-slate-100 rounded mb-2"></div>
                    <div className="w-full h-2 bg-slate-100 rounded mb-2"></div>
                    <div className="w-4/5 h-2 bg-slate-100 rounded mb-2"></div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="bg-white text-blue-900 p-3 rounded-full hover:scale-110 transition-transform">
                      <Eye size={20} />
                    </button>
                    <button className="bg-white text-blue-900 p-3 rounded-full hover:scale-110 transition-transform">
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                {/* Info Card */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{resume.name}</h3>
                      <p className="text-sm text-slate-500">{resume.title}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-md text-slate-600">
                      {resume.template}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-slate-400 font-medium">
                    <div className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                      <Heart size={16} /> {resume.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} /> {resume.views}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
