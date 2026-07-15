'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle, 
  Briefcase, 
  Layout, 
  Download, 
  Image as ImageIcon 
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Create Resume',
      description: 'Start building your professional resume from scratch with our smart builder.',
      icon: <FileText size={32} />,
      link: '/create',
    },
    {
      title: 'ATS Resume',
      description: 'Optimized layouts designed to pass Applicant Tracking Systems easily.',
      icon: <CheckCircle size={32} />,
      link: '/create?type=ats',
    },
    {
      title: 'Professional CV',
      description: 'Premium designs crafted for corporate and executive roles.',
      icon: <Briefcase size={32} />,
      link: '/templates?category=professional',
    },
    {
      title: 'CV Templates',
      description: 'Explore a wide variety of beautifully designed, ready-to-use templates.',
      icon: <Layout size={32} />,
      link: '/templates',
    },
    {
      title: 'Download Resume',
      description: 'Export your finished CV instantly in high-quality PDF format.',
      icon: <Download size={32} />,
      link: '/preview',
    },
    {
      title: 'CV With Picture',
      description: 'Create a standout profile with integrated photo upload functionality.',
      icon: <ImageIcon size={32} />,
      link: '/templates?category=picture',
    },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 relative overflow-hidden bg-gray-light"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-blackish mb-4">
            Everything You Need to <span className="text-orange-burnt">Succeed</span>
          </h2>
          <p className="text-lg text-brown-burnt/80 max-w-2xl mx-auto">
            Our premium tools and features give you the ultimate edge in your job search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link href={feature.link} key={index} className="block group h-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-full p-6 rounded-2xl bg-white border border-brown-burnt/10 overflow-hidden shadow-sm transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-5px_rgba(42,27,20,0.4)]"
              >
                {/* Hover Background Animation (Fire Effect & Gradients) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-burnt via-orange-warm to-brown-burnt opacity-10"></div>
                  {/* Moving Gradient Blob */}
                  <motion.div 
                    animate={{ 
                      x: [0, 50, 0, -50, 0],
                      y: [0, 50, 100, 50, 0],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -left-10 w-40 h-40 bg-orange-burnt/30 rounded-full blur-3xl"
                  ></motion.div>
                   <motion.div 
                    animate={{ 
                      x: [0, -50, 0, 50, 0],
                      y: [0, -50, -100, -50, 0],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-warm/30 rounded-full blur-3xl"
                  ></motion.div>
                </div>

                {/* Animated Border on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-burnt/60 rounded-2xl transition-colors duration-300 z-10"></div>

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full pb-4 group-hover:pb-12 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-gray-soft text-brown-burnt flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-orange-burnt group-hover:to-orange-warm group-hover:text-white transition-all duration-300 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brown-blackish mb-2 group-hover:text-orange-burnt transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-brown-burnt/70 group-hover:text-brown-blackish transition-colors duration-300 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>

                {/* Sliding Bottom Panel */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-orange-burnt to-orange-warm text-white py-4 px-6 flex items-center justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                  <span className="font-bold text-sm tracking-wider uppercase">Explore Feature</span>
                  <span className="text-xl font-bold transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
