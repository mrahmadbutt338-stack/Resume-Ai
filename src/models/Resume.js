import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    default: 'Untitled Resume',
  },
  // The universal resume data
  data: {
    resumeName: String,
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      website: String,
      github: String,
      jobTitle: String,
      image: String,
    },
    summary: String,
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: String,
      endDate: String,
      gpa: String,
      highlights: [String],
    }],
    experience: [{
      company: String,
      position: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String,
      highlights: [String],
    }],
    skills: [{
      category: String,
      items: [String],
    }],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      link: String,
    }],
    languages: [{
      language: String,
      proficiency: String,
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      link: String,
    }],
    achievements: [{
      title: String,
      date: String,
      description: String,
    }],
    awards: [{
      title: String,
      date: String,
      issuer: String,
      description: String,
    }],
    volunteerExperience: [{
      organization: String,
      role: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String,
      highlights: [String],
    }],
    internships: [{
      company: String,
      position: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String,
      highlights: [String],
    }],
    publications: [{
      title: String,
      publisher: String,
      date: String,
      link: String,
      description: String,
    }],
    references: [{
      name: String,
      company: String,
      position: String,
      email: String,
      phone: String,
    }],
    customSections: [{
      title: String,
      items: [{
        title: String,
        subtitle: String,
        date: String,
        description: String,
      }],
    }],
    templateConfig: {
      withPicture: Boolean,
      colorTheme: String,
    },
    selectedTemplate: String,
  },
}, { 
  timestamps: true
});

// Avoid OverwriteModelError in Next.js
export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
