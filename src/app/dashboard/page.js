'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Trash2, Edit3, Plus, Download, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchResumes();
    }
  }, [status, router]);

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const json = await res.json();
        setResumes(json.resumes || []);
      }
    } catch (e) {
      toast.error('Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this resume?')) return;
    
    const toastId = toast.loading('Deleting...');
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setResumes(resumes.filter(r => r._id !== id));
      toast.success('Resume deleted', { id: toastId });
    } catch (e) {
      toast.error('Failed to delete resume', { id: toastId });
    }
  };

  const handleEdit = (resume) => {
    // Override local storage with this specific resume data so it loads seamlessly into the builder
    localStorage.setItem('resumeSaaSData', JSON.stringify(resume.data));
    toast.success('Resume loaded into builder!');
    router.push('/create');
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-burnt rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Toaster position="top-right" />
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">My Saved Resumes</h1>
            <p className="text-slate-500">Manage, edit, and download your securely saved resumes.</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/create" className="flex items-center gap-2 px-6 py-3 bg-orange-burnt text-white font-bold rounded-xl shadow-premium-orange hover:-translate-y-1 transition-all">
              <Plus size={20} /> Create New
            </Link>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 p-3 text-slate-500 hover:bg-slate-200 rounded-xl transition-colors font-bold"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No resumes found</h3>
              <p className="text-slate-500 mb-6">You haven't saved any resumes to your account yet.</p>
              <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Start Building
              </Link>
            </div>
          ) : (
            resumes.map(resume => (
              <div key={resume._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-burnt to-orange-warm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-burnt flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1">{resume.name}</h3>
                <p className="text-sm text-slate-500 mb-6">
                  {resume.data?.personalInfo?.firstName} {resume.data?.personalInfo?.lastName} • {resume.data?.templateConfig?.withPicture ? 'With Picture' : 'Without Picture'} Template
                </p>

                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button 
                    onClick={() => handleEdit(resume)}
                    className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <Edit3 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(resume._id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
