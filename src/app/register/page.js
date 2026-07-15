'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Creating account...');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        name,
        email,
        password,
        isRegistering: 'true',
      });

      if (res?.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success('Account created successfully!', { id: toastId });
        router.push('/create');
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-burnt selection:text-white relative overflow-hidden">
      <Toaster position="top-center" />
      


      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm h-auto bg-white rounded-2xl md:rounded-[2rem] border-2 border-gray-100 shadow-2xl flex flex-col items-center justify-center px-8 py-8 relative z-20"
      >
        
        {/* Floating tabs matching the image (hidden on mobile) */}
        <div className="hidden md:flex absolute -left-[108px] top-[20%] flex-col gap-6 z-30">
           {/* LOGIN Tab (Inactive) */}
           <Link href="/login">
             <div className="text-gray-400 hover:text-orange-burnt transition-colors font-bold tracking-widest px-6 py-4 w-[120px] text-center cursor-pointer">
                LOGIN
             </div>
           </Link>
           {/* SIGN UP Tab (Active) */}
           <div className="bg-white text-orange-burnt font-black tracking-widest px-6 py-4 w-[120px] text-center rounded-l-full relative shadow-[-5px_5px_10px_rgba(0,0,0,0.05)] border-y-2 border-l-2 border-gray-100 cursor-default">
              SIGN UP
              {/* Small white block to hide the gap/shadow on the right side connecting to the box */}
              <div className="absolute top-0 -right-4 w-6 h-full bg-white z-10"></div>
           </div>
        </div>

            {/* Mobile Tab switcher (visible only on mobile) */}
            <div className="flex md:hidden w-full mb-8 bg-gray-100 rounded-full p-1">
              <Link href="/login" className="w-1/2 text-gray-500 font-bold text-center py-2 text-sm">LOGIN</Link>
              <div className="w-1/2 bg-white text-orange-burnt font-bold text-center py-2 rounded-full shadow-sm text-sm">SIGN UP</div>
            </div>

            {/* User Avatar Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-burnt to-orange-warm rounded-full flex items-center justify-center text-white shadow-[0_8px_16px_rgba(201,106,27,0.4)] mb-4 mt-2">
              <User size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-8 tracking-widest">SIGN UP</h3>

            <form onSubmit={handleRegister} className="w-full space-y-6">
              
              <div className="relative border-b-2 border-gray-200 focus-within:border-orange-burnt transition-colors pb-2 flex items-center group">
                <User size={20} className="text-gray-400 group-focus-within:text-orange-burnt transition-colors mr-4" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name" 
                  className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400 font-medium" 
                />
              </div>

              <div className="relative border-b-2 border-gray-200 focus-within:border-orange-burnt transition-colors pb-2 flex items-center group">
                <Mail size={20} className="text-gray-400 group-focus-within:text-orange-burnt transition-colors mr-4" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email" 
                  className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400 font-medium" 
                />
              </div>
              
              <div className="relative border-b-2 border-gray-200 focus-within:border-orange-burnt transition-colors pb-2 flex items-center group">
                <Lock size={20} className="text-gray-400 group-focus-within:text-orange-burnt transition-colors mr-4" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  minLength={6}
                  className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400 font-medium" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-orange-burnt focus:outline-none transition-colors ml-2">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-end items-center mt-6">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-burnt to-orange-deep text-white px-10 py-3.5 rounded-full font-bold text-sm tracking-wider shadow-[0_8px_20px_rgba(201,106,27,0.3)] hover:shadow-[0_10px_25px_rgba(201,106,27,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'CREATING...' : 'SIGN UP'}
                </button>
              </div>
            </form>



      </motion.div>
    </div>
  );
}
