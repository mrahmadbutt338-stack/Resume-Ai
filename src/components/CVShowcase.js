'use client';

import { motion } from 'framer-motion';

export default function CVShowcase() {
  const topRowItems = [
    { title: 'CV Template', image: '/images/templates/cv_no_pic_3.png' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_2.avif' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_3.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_4.png' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_5.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_6.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_7.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_8.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_9.png' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_10.png' },
  ];

  const bottomRowItems = [
    { title: 'CV Template', image: '/images/templates/cv_no_pic_1.png' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_2.png' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_1.png' },
    { title: 'CV Template', image: '/images/templates/cv_with_pic_4.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_5.png' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_6.png' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_7.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_8.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_9.jpg' },
    { title: 'CV Template', image: '/images/templates/cv_no_pic_10.jpeg' },
  ];

  // Duplicate the array to ensure infinite scroll fills the screen
  const topRow = [
    ...topRowItems, ...topRowItems, ...topRowItems, 
    ...topRowItems, ...topRowItems
  ]; 
  const bottomRow = [
    ...bottomRowItems, ...bottomRowItems, ...bottomRowItems, 
    ...bottomRowItems, ...bottomRowItems
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 overflow-hidden bg-gray-light"
    >
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-brown-blackish mb-4">
          World-Class <span className="text-orange-burnt">Templates</span>
        </h2>
        <p className="text-brown-burnt/70 text-lg max-w-2xl mx-auto">
          Choose from a variety of professionally designed layouts crafted to help you land your dream job.
        </p>
      </div>

      <div className="flex flex-col gap-8 transform -rotate-3 scale-105">
        
        {/* Top Row - Moves Left */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-16.6666%"] }} // Move exactly one segment (1/6th) for seamless loop
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20, // Adjusted duration for smooth speed
                ease: "linear",
              },
            }}
            className="flex gap-6 px-3 w-max"
          >
            {topRow.map((item, index) => (
              <div 
                key={index}
                className={`w-48 h-64 rounded-xl shadow-premium border border-gray-cool bg-white flex flex-col items-center justify-center relative overflow-hidden group transition-transform hover:scale-105 hover:z-10 shrink-0`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                  <span className="text-white font-medium text-center px-2">{item.title}</span>
                </div>
                {/* CV Image */}
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Moves Right */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["-16.6666%", "0%"] }} // Seamless infinite scroll opposite direction
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-6 px-3 w-max"
          >
            {bottomRow.map((item, index) => (
              <div 
                key={index}
                className={`w-48 h-64 rounded-xl shadow-premium border border-gray-cool bg-white flex flex-col items-center justify-center relative overflow-hidden group transition-transform hover:scale-105 hover:z-10 shrink-0`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                  <span className="text-white font-medium text-center px-2">{item.title}</span>
                </div>
                {/* CV Image */}
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}
