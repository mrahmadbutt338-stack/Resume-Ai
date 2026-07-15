import React from 'react';
import ModernTemplate from '../templates/ModernTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import CorporateTemplate from '../templates/CorporateTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import PhotoTemplate from '../templates/PhotoTemplate';
import BorderedTemplate from '../templates/BorderedTemplate';
import SidebarPhotoTemplate from '../templates/SidebarPhotoTemplate';

const templateMap = {
  'with-pic-1': ModernTemplate,
  'with-pic-2': CreativeTemplate,
  'with-pic-3': ElegantTemplate,
  'with-pic-4': CorporateTemplate,
  'with-pic-5': PhotoTemplate,
  'with-pic-6': SidebarPhotoTemplate,
  'with-pic-7': BorderedTemplate,
  'with-pic-8': MinimalTemplate,
  'with-pic-9': ModernTemplate,
  'with-pic-10': CreativeTemplate,

  'no-pic-1': MinimalTemplate,
  'no-pic-2': CorporateTemplate,
  'no-pic-3': ElegantTemplate,
  'no-pic-4': ModernTemplate,
  'no-pic-5': CreativeTemplate,
  'no-pic-6': BorderedTemplate,
  'no-pic-7': MinimalTemplate,
  'no-pic-8': CorporateTemplate,
  'no-pic-9': ElegantTemplate,
  'no-pic-10': ModernTemplate,
  
  // Fallbacks
  'modern': ModernTemplate,
  'creative': CreativeTemplate,
};

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
  const selectedTheme = cleanedData.selectedTemplate || 'modern';
  const SelectedTemplateComponent = templateMap[selectedTheme] || templateMap['modern'];
  
  const templateConfig = cleanedData.templateConfig || { withPicture: true, colorTheme: '#2C5E3E' };

  return (
    <div className="w-full h-full bg-white text-black resume-render-container" style={{ minHeight: '297mm', width: '210mm', position: 'relative' }}>
      <SelectedTemplateComponent data={cleanedData} config={templateConfig} colorTheme={templateConfig?.colorTheme} />
    </div>
  );
}
