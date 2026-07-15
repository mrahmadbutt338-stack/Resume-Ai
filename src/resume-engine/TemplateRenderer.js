import React from 'react';
import UniversalATSTemplate from '../templates/UniversalATSTemplate';

/**
 * Removes empty array sections from the data so templates don't render empty headers
 */
const cleanResumeData = (data) => {
  const cleaned = { ...data };
  
  const arrayFields = [
    'experience', 'education', 'skills', 'projects', 'languages', 
    'certifications', 'achievements', 'awards', 'volunteerExperience', 
    'internships', 'publications', 'references', 'customSections'
  ];

  arrayFields.forEach(field => {
    if (cleaned[field]) {
      // Filter out completely empty items
      cleaned[field] = cleaned[field].filter(item => {
        // If it's a string, just check if it's not empty
        if (typeof item === 'string') return item.trim() !== '';
        // If it's an object, check if at least one value is not empty or false
        return Object.values(item).some(val => {
          if (typeof val === 'boolean') return val;
          if (Array.isArray(val)) return val.length > 0;
          return val && String(val).trim() !== '';
        });
      });

      // If array is empty after filtering, delete it or set to null so templates can just do `data.skills?.length > 0`
      if (cleaned[field].length === 0) {
        cleaned[field] = null;
      }
    }
  });

  // Ensure personalInfo exists
  if (!cleaned.personalInfo) {
    cleaned.personalInfo = {};
  }

  return cleaned;
};

const normalizeData = (data) => {
  const d = JSON.parse(JSON.stringify(data)); // deep copy

  if (d.personalInfo) {
    const p = d.personalInfo;
    p.fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim();
    
    const locParts = [];
    if (p.city) locParts.push(p.city);
    if (p.country) locParts.push(p.country);
    if (locParts.length > 0) p.location = locParts.join(', ');
    else if (p.address) p.location = p.address;
  }

  if (d.experience && Array.isArray(d.experience)) {
    d.experience.forEach(exp => {
      if (exp.title && !exp.position) exp.position = exp.title;
      const locParts = [];
      if (exp.city) locParts.push(exp.city);
      if (exp.country) locParts.push(exp.country);
      if (locParts.length > 0) exp.location = locParts.join(', ');
    });
  }

  if (d.projects && Array.isArray(d.projects)) {
    d.projects.forEach(proj => {
      if (proj.liveUrl && !proj.link) proj.link = proj.liveUrl;
      else if (proj.githubUrl && !proj.link) proj.link = proj.githubUrl;
    });
  }

  return d;
};

export default function TemplateRenderer({ data }) {
  if (!data) return null;

  const normalized = normalizeData(data);
  const cleanedData = cleanResumeData(normalized);
  
  // BYPASS TEMPLATE SELECTION: Always use the Unified ATS Template for generation
  const templateConfig = cleanedData.templateConfig || { withPicture: true, colorTheme: '#000000' };

  return (
    <div className="w-full h-full bg-white text-black resume-render-container" style={{ minHeight: '297mm', width: '210mm', position: 'relative' }}>
      <UniversalATSTemplate data={cleanedData} config={templateConfig} colorTheme={templateConfig?.colorTheme} />
    </div>
  );
}

