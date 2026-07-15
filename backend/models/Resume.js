/**
 * Resume Mongoose Model
 * Schema for storing all resume data including personal info,
 * education, experience, skills, projects, and certifications
 */

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  // Resume Metadata
  resumeName: { type: String, trim: true, default: 'Untitled Resume' },
  
  // Personal Information
  personalInfo: {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    website: { type: String, trim: true },
    github: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    image: { type: String }
  },

  // Professional Summary
  summary: { type: String, trim: true },

  // Education History
  education: [{
    institution: { type: String, trim: true },
    degree: { type: String, trim: true },
    field: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    gpa: { type: String, trim: true },
    highlights: [{ type: String, trim: true }]
  }],

  // Work Experience
  experience: [{
    company: { type: String, trim: true },
    position: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    highlights: [{ type: String, trim: true }]
  }],

  // Skills
  skills: [{
    category: { type: String, trim: true },
    items: [{ type: String, trim: true }]
  }],

  // Projects
  projects: [{
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    link: { type: String, trim: true }
  }],

  // Languages
  languages: [{
    language: { type: String, trim: true },
    proficiency: { type: String, trim: true }
  }],

  // Certifications
  certifications: [{
    name: { type: String, trim: true },
    issuer: { type: String, trim: true },
    date: { type: String, trim: true },
    link: { type: String, trim: true }
  }],

  // Achievements
  achievements: [{
    title: { type: String, trim: true },
    date: { type: String, trim: true },
    description: { type: String, trim: true }
  }],

  // Awards
  awards: [{
    title: { type: String, trim: true },
    date: { type: String, trim: true },
    issuer: { type: String, trim: true },
    description: { type: String, trim: true }
  }],

  // Volunteer Experience
  volunteerExperience: [{
    organization: { type: String, trim: true },
    role: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    highlights: [{ type: String, trim: true }]
  }],

  // Internships
  internships: [{
    company: { type: String, trim: true },
    position: { type: String, trim: true },
    location: { type: String, trim: true },
    startDate: { type: String, trim: true },
    endDate: { type: String, trim: true },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    highlights: [{ type: String, trim: true }]
  }],

  // Publications
  publications: [{
    title: { type: String, trim: true },
    publisher: { type: String, trim: true },
    date: { type: String, trim: true },
    link: { type: String, trim: true },
    description: { type: String, trim: true }
  }],

  // References
  references: [{
    name: { type: String, trim: true },
    company: { type: String, trim: true },
    position: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true }
  }],

  // Custom Sections
  customSections: [{
    title: { type: String, trim: true },
    items: [{
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      date: { type: String, trim: true },
      description: { type: String, trim: true }
    }]
  }],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for backward compatibility with old guest resumes
  },

  isPublic: {
    type: Boolean,
    default: false,
  },

  // Selected template style
  selectedTemplate: {
    type: String,
    default: 'modern'
  },

  // Template config like colors, with/without picture
  templateConfig: {
    withPicture: { type: Boolean, default: true },
    colorTheme: { type: String, default: '#2C5E3E' }
  },

  // Source of resume creation
  creationMode: {
    type: String,
    enum: ['form', 'prompt'],
    default: 'form'
  },

  // Original prompt text (if created via prompt mode)
  originalPrompt: { type: String, trim: true }

}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for faster queries
resumeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
