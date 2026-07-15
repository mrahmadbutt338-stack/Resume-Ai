/**
 * Intelligent Semantic Field Mapping
 * Maps custom or varying section titles (like "Work History", "Career Objective") 
 * to the standardized Universal Resume Schema keys (e.g. "experience", "summary").
 */

const SECTION_MAPPINGS = {
  // Experience
  'experience': 'experience',
  'employment': 'experience',
  'professional experience': 'experience',
  'career history': 'experience',
  'work history': 'experience',
  'previous jobs': 'experience',
  'work experience': 'experience',
  
  // Summary
  'summary': 'summary',
  'profile': 'summary',
  'career objective': 'summary',
  'professional summary': 'summary',
  'about me': 'summary',
  'objective': 'summary',
  
  // Skills
  'skills': 'skills',
  'technical skills': 'skills',
  'core skills': 'skills',
  'technologies': 'skills',
  'expertise': 'skills',
  'competencies': 'skills',
  
  // Education
  'education': 'education',
  'academic history': 'education',
  'qualifications': 'education',
  'degrees': 'education',
  'academic background': 'education',
  
  // Languages
  'languages': 'languages',
  'language skills': 'languages',
  'spoken languages': 'languages',
  
  // Projects
  'projects': 'projects',
  'portfolio': 'projects',
  'personal projects': 'projects',
  'work samples': 'projects',
  
  // Certifications
  'certifications': 'certifications',
  'certificates': 'certifications',
  'licenses': 'certifications',
  
  // Achievements
  'achievements': 'achievements',
  'key achievements': 'achievements',
  
  // Awards
  'awards': 'awards',
  'honors': 'awards',
  'honors and awards': 'awards',
  
  // Volunteer
  'volunteer': 'volunteerExperience',
  'volunteer experience': 'volunteerExperience',
  'volunteering': 'volunteerExperience',
  'community service': 'volunteerExperience',
  
  // Internships
  'internships': 'internships',
  'internship': 'internships',
  
  // Publications
  'publications': 'publications',
  'papers': 'publications',
  
  // References
  'references': 'references',
  'professional references': 'references'
};

/**
 * Normalizes a section name to the universal schema key.
 * @param {string} sectionName - The custom section name to map.
 * @returns {string} The universal schema key, or 'customSections' if unknown.
 */
function getUniversalKey(sectionName) {
  if (!sectionName) return 'customSections';
  const normalized = sectionName.toLowerCase().trim();
  return SECTION_MAPPINGS[normalized] || 'customSections';
}

/**
 * Takes an object with potentially non-standard keys and maps them to the universal schema.
 * @param {Object} rawData - Data parsed from AI or input with non-standard section titles.
 * @returns {Object} Mapped data following the universal schema.
 */
function mapToUniversalSchema(rawData) {
  const mappedData = {
    customSections: []
  };

  for (const [key, value] of Object.entries(rawData)) {
    const universalKey = getUniversalKey(key);
    
    if (universalKey === 'customSections') {
      mappedData.customSections.push({
        title: key,
        items: Array.isArray(value) ? value : [value]
      });
    } else {
      mappedData[universalKey] = value;
    }
  }

  return mappedData;
}

module.exports = {
  getUniversalKey,
  mapToUniversalSchema,
  SECTION_MAPPINGS
};
