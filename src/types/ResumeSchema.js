export const emptyEducation = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  gpa: '',
  highlights: [] // Array of strings
};

export const emptyExperience = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: [] // Array of strings
};

export const emptyProject = {
  name: '',
  description: '',
  technologies: [], // Array of strings
  link: ''
};

export const emptySkill = {
  category: '',
  items: [] // Array of strings
};

export const emptyLanguage = {
  language: '',
  proficiency: ''
};

export const emptyCertification = {
  name: '',
  issuer: '',
  date: '',
  link: ''
};


export const initialResumeState = {
  resumeName: 'Untitled Resume',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    github: '',
    jobTitle: '',
    image: ''
  },
  summary: '',
  education: [{ ...emptyEducation }],
  experience: [{ ...emptyExperience }],
  skills: [{ ...emptySkill }],
  projects: [],
  languages: [],
  certifications: [],

  templateConfig: {
    withPicture: true,
    colorTheme: '#2C5E3E'
  },
  selectedTemplate: 'modern'
};
