'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ChevronLeft, ChevronRight, Plus, Trash2, LayoutTemplate, 
  User, FileText, GraduationCap, Briefcase, Zap, FolderDot, Award, 
  Languages, Heart, Users, Save, DownloadCloud
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import SmartSelect from './form/SmartSelect';
import AITextArea from './form/AITextArea';
import { 
  educationDegrees, employmentTypes, skillOptions, 
  languageOptions, proficiencyLevels, interestOptions, formatForSelect 
} from '@/data/formOptions';

// Initial Empty Templates
const emptyEducation = { degree: '', institution: '', field: '', startDate: '', endDate: '', current: false, grade: '', description: '' };
const emptyExperience = { title: '', company: '', type: '', country: '', city: '', startDate: '', endDate: '', current: false, description: '' };
const emptyProject = { name: '', technologies: [], liveUrl: '', githubUrl: '', description: '' };
const emptyCertification = { name: '', issuer: '', date: '', url: '' };
const emptyLanguage = { language: '', proficiency: '' };

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

const STEPS = [
  { id: 0, title: 'Personal Info', icon: <User size={20}/> },
  { id: 1, title: 'Professional Summary', icon: <FileText size={20}/> },
  { id: 2, title: 'Education', icon: <GraduationCap size={20}/> },
  { id: 3, title: 'Experience', icon: <Briefcase size={20}/> },
  { id: 4, title: 'Skills', icon: <Zap size={20}/> },
  { id: 5, title: 'Projects', icon: <FolderDot size={20}/> },
  { id: 6, title: 'Certifications', icon: <Award size={20}/> },
  { id: 7, title: 'Languages', icon: <Languages size={20}/> }
];

export default function FormMode({ onSubmit }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [step, setStep] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  
  // Profiles State
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showInitialFoundModal, setShowInitialFoundModal] = useState(false);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);
  
  // Zustand Global State
  const { resumeData: formData, setResumeData } = require('../store/useResumeStore').useResumeStore();
  
  const setFormData = (updater) => {
    if (typeof updater === 'function') {
      setResumeData(updater(formData));
    } else {
      setResumeData(updater);
    }
  };

  // Load auto-save data (Local draft)
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('resumeSaaSData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) { console.error("Could not parse save data"); }
    }
  }, []);

  // Fetch Saved Database Profiles when authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      const fetchProfiles = async () => {
        setIsLoadingProfiles(true);
        try {
          const res = await fetch('/api/resumes');
          if (res.ok) {
            const json = await res.json();
            const fetchedProfiles = json.resumes || [];
            setSavedProfiles(fetchedProfiles);
            
            // If they have profiles and haven't started filling out the form, show the "Found" modal
            if (fetchedProfiles.length > 0 && !formData.personalInfo.firstName) {
              setShowInitialFoundModal(true);
            }
          }
        } catch (e) {
          console.error("Error fetching profiles", e);
        } finally {
          setIsLoadingProfiles(false);
        }
      };
      fetchProfiles();
    }
  }, [status]);

  // Auto-save hook for local draft
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('resumeSaaSData', JSON.stringify(formData));
    }
  }, [formData, isClient]);

  // Save/Load Profiles Logic (Database)
  const handleSaveProfileClick = () => {
    if (status === 'unauthenticated') {
      toast.error('Please log in to save your resume to your account.');
      router.push('/login');
      return;
    }
    setShowSaveModal(true);
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) return;
    
    const toastId = toast.loading('Saving to your account...');
    
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profileName, data: formData }),
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      const json = await res.json();
      // Only keep the newly saved profile since the backend deletes all previous ones
      setSavedProfiles([json.resume]);
      setShowSaveModal(false);
      setProfileName('');
      toast.success('Resume information saved successfully!', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Failed to save. Please try again.', { id: toastId });
    }
  };

  const handleLoadProfile = (profile) => {
    // Keep current template selection but load the database data
    setFormData({
      ...profile.data,
      templateConfig: formData.templateConfig // Preserve current template choice
    });
    setShowLoadModal(false);
    toast.success(`${profile.name} loaded successfully!`);
  };

  const handleDeleteProfile = async (id) => {
    if (!confirm('Are you sure you want to delete this saved profile?')) return;
    
    const toastId = toast.loading('Deleting...');
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      
      setSavedProfiles(savedProfiles.filter(p => p._id !== id));
      toast.success('Profile deleted', { id: toastId });
    } catch (e) {
      toast.error('Failed to delete profile', { id: toastId });
    }
  };

  // --- Helpers ---
  const updateConfig = (field, val) => setFormData(p => ({ ...p, templateConfig: { ...p.templateConfig, [field]: val } }));
  const updatePersonal = (field, val) => setFormData(p => ({ ...p, personalInfo: { ...p.personalInfo, [field]: val } }));
  const updateSummary = (val) => setFormData(p => ({ ...p, summary: val }));
  const updateSkills = (val) => setFormData(p => {
    const currentSkills = p.skills && p.skills.length > 0 ? p.skills : [{ category: 'Core Skills', items: [] }];
    const newSkills = [...currentSkills];
    newSkills[0] = { ...newSkills[0], items: val, category: newSkills[0].category || 'Core Skills' };
    return { ...p, skills: newSkills };
  });

  const updateArrayField = (section, idx, field, val) => {
    setFormData(p => {
      const arr = [...p[section]];
      arr[idx] = { ...arr[idx], [field]: val };
      return { ...p, [section]: arr };
    });
  };
  
  const addArrayEntry = (section, template) => setFormData(p => ({ ...p, [section]: [...p[section], { ...template }] }));
  const removeArrayEntry = (section, idx) => setFormData(p => ({ ...p, [section]: p[section].filter((_, i) => i !== idx) }));

  // Validation
  const canProceed = () => {
    if (step === 0) return formData.personalInfo.firstName && formData.personalInfo.lastName && formData.personalInfo.email;
    return true; // Other steps are optional or have minimal validation for now
  };

  const nextStep = () => { if (canProceed() && step < STEPS.length - 1) setStep(s => s + 1); };
  const prevStep = () => { if (step > 0) setStep(s => s - 1); };

  const handleFinish = () => {
    if (canProceed()) onSubmit(formData);
  };

  // Profile Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonal('image', reader.result);
      reader.readAsDataURL(file);
    }
  };

  // --- Render Steps ---
  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Personal Details</h2>
            <p className="text-slate-500">Let's start with your basic contact information.</p>
          </div>
          
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="First Name *" val={formData.personalInfo.firstName} onChange={v => updatePersonal('firstName', v)} req />
            <Field label="Last Name *" val={formData.personalInfo.lastName} onChange={v => updatePersonal('lastName', v)} req />
            <Field label="Professional Title" val={formData.personalInfo.jobTitle} onChange={v => updatePersonal('jobTitle', v)} placeholder="e.g. Senior Software Engineer" />
            <Field label="Email Address *" type="email" val={formData.personalInfo.email} onChange={v => updatePersonal('email', v)} req />
            <Field label="Phone Number" val={formData.personalInfo.phone} onChange={v => updatePersonal('phone', v)} />
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Country</label>
              <SmartSelect options={[]} placeholder="Type your country..." value={formData.personalInfo.country} onChange={v => updatePersonal('country', v)} />
            </div>
            
            <Field label="City" val={formData.personalInfo.city} onChange={v => updatePersonal('city', v)} />
            <div className="md:col-span-2"><Field label="Complete Address" val={formData.personalInfo.address} onChange={v => updatePersonal('address', v)} /></div>
            
            <Field label="LinkedIn URL" val={formData.personalInfo.linkedin} onChange={v => updatePersonal('linkedin', v)} />
            <Field label="Portfolio Website" val={formData.personalInfo.website} onChange={v => updatePersonal('website', v)} />
            <Field label="GitHub URL" val={formData.personalInfo.github} onChange={v => updatePersonal('github', v)} />
            
            <Field label="Date of Birth (Optional)" type="date" val={formData.personalInfo.dob} onChange={v => updatePersonal('dob', v)} />
          </div>
        </div>
      );

      case 1: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Professional Summary</h2>
            <p className="text-slate-500">Write a brief overview of your background, achievements, and career goals.</p>
          </div>
          <div className="bg-white p-1 rounded-2xl border border-slate-200">
            <AITextArea 
              label="" 
              placeholder="E.g., Results-driven software engineer with 5+ years of experience in full-stack development..." 
              value={formData.summary} 
              onChange={updateSummary} 
              rows={8} 
            />
          </div>
        </div>
      );

      case 2: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Education</h2>
              <p className="text-slate-500">List your academic background.</p>
            </div>
            <button onClick={() => addArrayEntry('education', emptyEducation)} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={16}/> Add Education
            </button>
          </div>
          
          <div className="space-y-6">
            <AnimatePresence>
              {formData.education.map((edu, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-6 rounded-2xl border border-slate-200 relative group">
                  <button onClick={() => removeArrayEntry('education', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20}/></button>
                  <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Education #{i + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Degree *</label>
                      <SmartSelect options={formatForSelect(educationDegrees)} value={edu.degree} onChange={v => updateArrayField('education', i, 'degree', v)} />
                    </div>
                    <Field label="Institution / University *" val={edu.institution} onChange={v => updateArrayField('education', i, 'institution', v)} />
                    <Field label="Field of Study" val={edu.field} onChange={v => updateArrayField('education', i, 'field', v)} placeholder="e.g. Computer Science" />
                    <Field label="Grade / CGPA" val={edu.grade} onChange={v => updateArrayField('education', i, 'grade', v)} />
                    
                    <Field label="Start Date" type="month" val={edu.startDate} onChange={v => updateArrayField('education', i, 'startDate', v)} />
                    <div className="flex flex-col gap-1.5">
                      <Field label="End Date" type="month" val={edu.endDate} onChange={v => updateArrayField('education', i, 'endDate', v)} disabled={edu.current} />
                      <label className="flex items-center gap-2 mt-2 text-sm text-slate-600 cursor-pointer font-medium">
                        <input type="checkbox" checked={edu.current} onChange={e => updateArrayField('education', i, 'current', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-orange-burnt focus:ring-orange-burnt" />
                        Currently Studying Here
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <AITextArea label="Description / Achievements (Optional)" value={edu.description} onChange={v => updateArrayField('education', i, 'description', v)} rows={3} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {formData.education.length === 0 && <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">No education added yet.</div>}
          </div>
        </div>
      );

      case 3: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Work Experience</h2>
              <p className="text-slate-500">Detail your professional work history.</p>
            </div>
            <button onClick={() => addArrayEntry('experience', emptyExperience)} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={16}/> Add Experience
            </button>
          </div>
          
          <div className="space-y-6">
            <AnimatePresence>
              {formData.experience.map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-6 rounded-2xl border border-slate-200 relative group">
                  <button onClick={() => removeArrayEntry('experience', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20}/></button>
                  <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Experience #{i + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Job Title *" val={exp.title} onChange={v => updateArrayField('experience', i, 'title', v)} />
                    <Field label="Company *" val={exp.company} onChange={v => updateArrayField('experience', i, 'company', v)} />
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Employment Type</label>
                      <SmartSelect options={formatForSelect(employmentTypes)} value={exp.type} onChange={v => updateArrayField('experience', i, 'type', v)} />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2"><Field label="Country" val={exp.country} onChange={v => updateArrayField('experience', i, 'country', v)} /></div>
                      <div className="w-1/2"><Field label="City" val={exp.city} onChange={v => updateArrayField('experience', i, 'city', v)} /></div>
                    </div>
                    
                    <Field label="Start Date" type="month" val={exp.startDate} onChange={v => updateArrayField('experience', i, 'startDate', v)} />
                    <div className="flex flex-col gap-1.5">
                      <Field label="End Date" type="month" val={exp.endDate} onChange={v => updateArrayField('experience', i, 'endDate', v)} disabled={exp.current} />
                      <label className="flex items-center gap-2 mt-2 text-sm text-slate-600 cursor-pointer font-medium">
                        <input type="checkbox" checked={exp.current} onChange={e => updateArrayField('experience', i, 'current', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-orange-burnt focus:ring-orange-burnt" />
                        Currently Working Here
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <AITextArea label="Responsibilities & Achievements" placeholder="Use bullet points for better readability..." value={exp.description} onChange={v => updateArrayField('experience', i, 'description', v)} rows={5} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {formData.experience.length === 0 && <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">No experience added yet.</div>}
          </div>
        </div>
      );

      case 4: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Skills</h2>
            <p className="text-slate-500">Add your technical and soft skills. Type to create custom ones.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <label className="text-sm font-semibold text-slate-700 block mb-2">Select or Add Skills</label>
            <SmartSelect 
              isMulti 
              options={formatForSelect(skillOptions)} 
              value={formData.skills?.[0]?.items || []} 
              onChange={updateSkills} 
              placeholder="E.g., React, Project Management, Graphic Design..."
            />
          </div>
        </div>
      );

      case 5: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Projects</h2>
              <p className="text-slate-500">Showcase your notable work and side projects.</p>
            </div>
            <button onClick={() => addArrayEntry('projects', emptyProject)} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={16}/> Add Project
            </button>
          </div>
          
          <div className="space-y-6">
            <AnimatePresence>
              {formData.projects.map((proj, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-6 rounded-2xl border border-slate-200 relative group">
                  <button onClick={() => removeArrayEntry('projects', i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Project Name *" val={proj.name} onChange={v => updateArrayField('projects', i, 'name', v)} />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Technologies Used</label>
                      <SmartSelect isMulti options={formatForSelect(skillOptions)} value={proj.technologies} onChange={v => updateArrayField('projects', i, 'technologies', v)} placeholder="E.g. React, Node..." />
                    </div>
                    <Field label="Live URL" val={proj.liveUrl} onChange={v => updateArrayField('projects', i, 'liveUrl', v)} />
                    <Field label="GitHub URL" val={proj.githubUrl} onChange={v => updateArrayField('projects', i, 'githubUrl', v)} />
                    <div className="md:col-span-2">
                      <AITextArea label="Description" value={proj.description} onChange={v => updateArrayField('projects', i, 'description', v)} rows={3} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {formData.projects.length === 0 && <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-500">No projects added yet.</div>}
          </div>
        </div>
      );

      case 6: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Certifications</h2>
              <p className="text-slate-500">Add any relevant licenses or certificates.</p>
            </div>
            <button onClick={() => addArrayEntry('certifications', emptyCertification)} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={16}/> Add Certification
            </button>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence>
              {formData.certifications.map((cert, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-5 rounded-xl border border-slate-200 relative group flex items-start gap-4">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Field label="Name" val={cert.name} onChange={v => updateArrayField('certifications', i, 'name', v)} />
                    <Field label="Organization" val={cert.issuer} onChange={v => updateArrayField('certifications', i, 'issuer', v)} />
                    <Field label="Issue Date" type="month" val={cert.date} onChange={v => updateArrayField('certifications', i, 'date', v)} />
                    <Field label="Credential URL" val={cert.url} onChange={v => updateArrayField('certifications', i, 'url', v)} />
                  </div>
                  <button onClick={() => removeArrayEntry('certifications', i)} className="mt-7 text-slate-400 hover:text-red-500"><Trash2 size={20}/></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      );

      case 7: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Languages</h2>
              <p className="text-slate-500">List the languages you speak and your proficiency level.</p>
            </div>
            <button onClick={() => addArrayEntry('languages', emptyLanguage)} className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={16}/> Add Language
            </button>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence>
              {formData.languages.map((lang, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-5 rounded-xl border border-slate-200 relative group flex items-start gap-4">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Language</label>
                      <SmartSelect options={formatForSelect(languageOptions)} value={lang.language} onChange={v => updateArrayField('languages', i, 'language', v)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-slate-700">Proficiency</label>
                      <SmartSelect options={formatForSelect(proficiencyLevels)} value={lang.proficiency} onChange={v => updateArrayField('languages', i, 'proficiency', v)} />
                    </div>
                  </div>
                  <button onClick={() => removeArrayEntry('languages', i)} className="mt-7 text-slate-400 hover:text-red-500"><Trash2 size={20}/></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      );

      default: return null;
    }
  };

  if (!isClient) return <div className="min-h-[500px] flex items-center justify-center">Loading builder...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 pb-20">
      <Toaster position="top-right" />
      
      {/* Sidebar Progress Tracker */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Resume Progress</h3>
          <div className="space-y-1">
            {STEPS.map((s, idx) => {
              const isActive = step === idx;
              const isPast = step > idx;
              return (
                <button
                  key={s.id}
                  onClick={() => { if (idx < step || canProceed()) setStep(idx); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                    isActive ? 'bg-orange-burnt text-white font-bold shadow-md' : 
                    isPast ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-white/20' : isPast ? 'bg-orange-50 text-orange-burnt' : 'bg-slate-100'
                  }`}>
                    {isPast ? <CheckCircle size={14} /> : React.cloneElement(s.icon, { size: 14 })}
                  </div>
                  <span className="text-sm truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <CheckCircle size={14}/> Auto-saving enabled
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-grow max-w-4xl min-w-0">
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="flex gap-2 sm:gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`flex-shrink-0 flex items-center gap-2 px-4 sm:px-6 py-3 font-bold rounded-xl transition-all ${
                step === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            <button
              onClick={handleSaveProfileClick}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-3 font-bold rounded-xl border-2 border-slate-200 text-slate-700 hover:border-orange-burnt hover:text-orange-burnt transition-all bg-white"
              title="Save all your progress as a Profile to your account"
            >
              <Save size={20} /> <span className="hidden sm:inline">Save Info</span>
            </button>

            <button
              onClick={() => {
                if (status === 'unauthenticated') {
                  import('react-hot-toast').then(({ default: toast }) => {
                    toast.error('Please log in to load your saved resumes.');
                  });
                  router.push('/login');
                  return;
                }
                setShowLoadModal(true);
              }}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-3 font-bold rounded-xl border-2 border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600 transition-all bg-white"
              title="Load a previously saved profile"
            >
              <DownloadCloud size={20} /> <span className="hidden sm:inline">Load Info</span>
            </button>
          </div>
          
          <div className="text-sm font-semibold text-slate-400 hidden md:block">
            Step {step + 1} of {STEPS.length}
          </div>

          <div className="w-full md:w-auto flex justify-end">
          {step === STEPS.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={!canProceed()}
              className={`flex items-center justify-center w-full md:w-auto gap-2 px-8 py-3 font-bold rounded-xl shadow-premium-orange transition-all ${
                canProceed() ? 'bg-gradient-to-r from-orange-burnt to-orange-warm text-white hover:scale-105' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Generate PDF ✨
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center justify-center w-full md:w-auto gap-2 px-8 py-3 font-bold rounded-xl transition-all ${
                canProceed() ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue <ChevronRight size={20} />
            </button>
          )}
          </div>
        </div>
      </div>

      {/* Save Profile Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Save Resume Profile</h3>
            <p className="text-sm text-slate-500 mb-6">Save all your entered information so you can easily reuse it later for a different template.</p>
            
            <div className="mb-6">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Profile Name</label>
              <input 
                type="text" 
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                placeholder="e.g., Software Engineer Profile"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-orange-burnt focus:ring-4 focus:ring-orange-burnt/10 outline-none transition-all"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowSaveModal(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleSaveProfile} disabled={!profileName.trim()} className="px-5 py-2.5 bg-orange-burnt text-white font-bold rounded-xl hover:bg-orange-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Profile Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Load Saved Profile</h3>
                <p className="text-sm text-slate-500">Choose a previously saved profile to automatically fill the form.</p>
              </div>
              <button onClick={() => setShowLoadModal(false)} className="p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-full transition-colors">
                ✕
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-3 pr-2">
              {isLoadingProfiles ? (
                <div className="text-center py-8 text-slate-500 flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-slate-200 border-t-orange-burnt rounded-full animate-spin"></div>
                  Loading your saved resumes...
                </div>
              ) : savedProfiles.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No saved profiles found in your account.</div>
              ) : (
                savedProfiles.map(profile => (
                  <div key={profile._id} className="border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:border-orange-burnt/50 transition-colors bg-slate-50/50">
                    <div>
                      <h4 className="font-bold text-slate-800">{profile.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">Saved on {new Date(profile.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleLoadProfile(profile)}
                        className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Load Data
                      </button>
                      <button 
                        onClick={() => handleDeleteProfile(profile._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Profile"
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
      )}

      {/* Initial Found Modal */}
      {showInitialFoundModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-slate-100">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <DownloadCloud size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">Resume Information Found</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              We found previously saved resume information in your account. Would you like to load it or start completely fresh?
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowInitialFoundModal(false);
                  setShowLoadModal(true);
                }}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 transition-all"
              >
                Use Saved Information
              </button>
              <button 
                onClick={() => setShowInitialFoundModal(false)}
                className="w-full py-4 bg-white text-slate-600 font-bold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Simple internal Field component for clean code
const Field = ({ label, val, onChange, type = 'text', placeholder, req, disabled }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <input
      type={type}
      value={val || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || `Enter ${label.replace(' *', '').toLowerCase()}...`}
      disabled={disabled}
      className={`w-full px-4 py-3 border rounded-xl text-[15px] transition-all bg-white text-slate-800 focus:outline-none focus:border-orange-burnt focus:ring-4 focus:ring-orange-burnt/10 ${
        disabled ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' : 'border-slate-300'
      }`}
    />
  </div>
);
