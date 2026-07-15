import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * System prompt for converting free-text into structured resume JSON
 */
const PROMPT_TO_RESUME_SYSTEM = `You are an expert resume writer and career coach. The user will describe themselves in natural language. Your job is to extract and structure their information into a professional resume format.

Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "summary": "A compelling 2-3 sentence professional summary"
  },
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "startDate": "",
      "endDate": "",
      "gpa": "",
      "highlights": []
    }
  ],
  "experience": [
    {
      "company": "",
      "position": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": "",
      "highlights": ["Use strong action verbs: Led, Developed, Implemented, etc."]
    }
  ],
  "skills": [
    {
      "category": "Category Name",
      "items": ["skill1", "skill2"]
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "technologies": [],
      "link": ""
    }
  ],
  "certifications": [
    {
      "name": "",
      "issuer": "",
      "date": "",
      "link": ""
    }
  ]
}

Rules:
- Fill in as much information as possible from the user's text.
- If the provided text is brief, creatively expand it with plausible, highly professional bullet points relevant to their mentioned role to ensure the resume fills a full A4 page.
- Write the summary in third person, professional tone, making it a compelling 3-4 sentence narrative.
- Use strong action verbs for experience highlights (Led, Developed, Spearheaded, Architected, Orchestrated).
- Ensure each experience entry has 4-5 substantial bullet points with quantifiable metrics (e.g., "Increased revenue by 15%", "Managed a team of 10").
- Organize skills into logical categories (Technical, Soft Skills, Tools, etc.) with at least 5 skills per category.
- Keep dates in "Month Year" format (e.g., "Jan 2023").`;

/**
 * System prompt for enhancing existing resume data
 */
const ENHANCE_RESUME_SYSTEM = `You are an expert resume writer. The user will provide structured resume data in JSON format. Your job is to enhance and improve the content while maintaining accuracy.

Improvements to make:
- Rewrite the professional summary to be a compelling, impactful 3-4 sentence executive summary.
- Use strong action verbs in experience highlights (Spearheaded, Orchestrated, Engineered, Architected, Driven).
- Expand short bullet points into comprehensive, detailed achievements.
- Make achievements quantifiable where possible (add realistic metrics if none exist, like "improved efficiency by 20%").
- Ensure each job has 4-5 rich bullet points so the resume fully occupies a professional A4 page.
- Improve grammar, tone, and professionalism to an executive level.
- Ensure skills are well-organized into clear categories with robust lists.

Return ONLY valid JSON (no markdown, no code fences) with the same structure as the input, but with improved content. Do NOT change names, dates, or factual information - only improve the writing quality and expand the depth of the descriptions.`;

/**
 * Generate structured resume data from a free-text prompt
 */
export async function generateFromPrompt(promptText) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: PROMPT_TO_RESUME_SYSTEM },
      { role: 'user', content: promptText }
    ],
    temperature: 0.7,
    max_tokens: 2000
  });

  let content = response.choices[0].message.content.trim();
  if (content.startsWith('\`\`\`json')) {
      content = content.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
  } else if (content.startsWith('\`\`\`')) {
      content = content.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
  }
  
  return JSON.parse(content);
}

/**
 * Enhance existing resume data with better writing
 */
export async function enhanceResume(resumeData) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: ENHANCE_RESUME_SYSTEM },
      { role: 'user', content: JSON.stringify(resumeData) }
    ],
    temperature: 0.6,
    max_tokens: 2000
  });

  let content = response.choices[0].message.content.trim();
  if (content.startsWith('\`\`\`json')) {
      content = content.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
  } else if (content.startsWith('\`\`\`')) {
      content = content.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
  }

  return JSON.parse(content);
}

/**
 * Mock data for development when no API key is set
 */
export function getMockResumeData() {
  return {
    personalInfo: {
      fullName: "Alex Johnson",
      email: "alex.johnson@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexjohnson",
      website: "alexjohnson.dev",
      summary: "Innovative Full-Stack Developer with 5+ years of experience building scalable web applications. Passionate about creating elegant solutions that drive business growth and enhance user experiences. Proven track record of leading cross-functional teams and delivering high-impact projects on time."
    },
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "Aug 2015",
        endDate: "May 2019",
        gpa: "3.8",
        highlights: ["Dean's List - 6 semesters", "Senior thesis on Machine Learning applications"]
      }
    ],
    experience: [
      {
        company: "TechCorp Inc.",
        position: "Senior Full-Stack Developer",
        location: "San Francisco, CA",
        startDate: "Jun 2021",
        endDate: "",
        current: true,
        description: "Lead developer for the company's flagship SaaS platform",
        highlights: [
          "Spearheaded the migration from monolithic architecture to microservices, reducing deployment time by 60%",
          "Led a team of 5 developers in building a real-time analytics dashboard serving 50K+ daily users",
          "Implemented CI/CD pipelines that reduced release cycles from bi-weekly to daily deployments",
          "Optimized database queries resulting in 40% improvement in API response times"
        ]
      },
      {
        company: "StartupXYZ",
        position: "Full-Stack Developer",
        location: "Remote",
        startDate: "Jul 2019",
        endDate: "May 2021",
        current: false,
        description: "Core developer for an e-commerce platform startup",
        highlights: [
          "Developed RESTful APIs serving 100K+ requests daily using Node.js and Express",
          "Built responsive React interfaces that increased mobile conversion rates by 35%",
          "Integrated Stripe payment processing handling $2M+ in monthly transactions",
          "Mentored 3 junior developers and conducted code reviews"
        ]
      }
    ],
    skills: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
      { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
      { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
      { category: "DevOps & Tools", items: ["AWS", "Docker", "Kubernetes", "Git", "Jenkins"] }
    ],
    projects: [
      {
        name: "Open Source Analytics Library",
        description: "Created a lightweight analytics library for React applications with 500+ GitHub stars",
        technologies: ["React", "TypeScript", "Rollup", "Jest"],
        link: "github.com/alexj/react-analytics"
      },
      {
        name: "AI Chat Application",
        description: "Built a real-time chat application with AI-powered response suggestions",
        technologies: ["Next.js", "Socket.io", "OpenAI API", "MongoDB"],
        link: "github.com/alexj/ai-chat"
      }
    ],
    certifications: [
      { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "Mar 2023", link: "" },
      { name: "MongoDB Certified Developer", issuer: "MongoDB University", date: "Jan 2022", link: "" }
    ]
  };
}
