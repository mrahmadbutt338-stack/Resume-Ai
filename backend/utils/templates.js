/**
 * PDF HTML Templates
 * Complete HTML+CSS template strings for each resume style
 * Used by Puppeteer to render high-quality PDFs
 */

/**
 * Helper: Render experience highlights as bullet list
 */
function renderHighlights(highlights) {
  if (!highlights || highlights.length === 0) return '';
  return `<ul class="highlights">${highlights.map(h => `<li>${h}</li>`).join('')}</ul>`;
}

/**
 * Helper: Render skills section
 */
function renderSkills(skills) {
  if (!skills || skills.length === 0) return '';
  return skills.map(s => `
    <div class="skill-group">
      <span class="skill-category">${s.category}:</span>
      <span class="skill-items">${s.items.join(', ')}</span>
    </div>
  `).join('');
}

/**
 * Common base styles shared across templates
 */
const baseStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-size: 10pt; line-height: 1.4; color: #1a1a1a; }
  .highlights { padding-left: 18px; margin-top: 4px; }
  .highlights li { margin-bottom: 2px; }
  .section-title { text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; padding-bottom: 4px; }
  .entry { margin-bottom: 10px; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-title { font-weight: 700; }
  .entry-subtitle { font-style: italic; color: #555; }
  .entry-date { color: #666; font-size: 9pt; white-space: nowrap; }
  .skill-group { margin-bottom: 4px; }
  .skill-category { font-weight: 600; }
  .skill-items { color: #444; }
`;

/**
 * Modern Template — Bold two-column with colored sidebar
 */
function modernTemplate(data) {
  const p = data.personalInfo || {};
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  ${baseStyles}
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  body { font-family: 'Inter', sans-serif; }
  .container { display: flex; min-height: 100vh; }
  .sidebar { width: 35%; background: #1e293b; color: #e2e8f0; padding: 36px 24px; }
  .sidebar .name { font-size: 22pt; font-weight: 700; color: #fff; margin-bottom: 4px; }
  .sidebar .contact { margin-top: 20px; font-size: 9pt; }
  .sidebar .contact div { margin-bottom: 6px; padding-left: 0; }
  .sidebar .section-title { color: #60a5fa; border-bottom: 2px solid #3b82f6; font-size: 10pt; margin-top: 24px; }
  .sidebar .skill-category { color: #93c5fd; }
  .sidebar .skill-items { color: #cbd5e1; }
  .main { width: 65%; padding: 36px 28px; }
  .main .section-title { color: #1e293b; border-bottom: 2px solid #2563eb; font-size: 11pt; font-weight: 700; }
  .summary { color: #475569; margin-bottom: 16px; font-size: 9.5pt; line-height: 1.5; }
</style></head><body>
<div class="container">
  <div class="sidebar">
    <div class="name">${p.fullName || ''}</div>
    <div class="contact">
      ${p.email ? `<div>📧 ${p.email}</div>` : ''}
      ${p.phone ? `<div>📞 ${p.phone}</div>` : ''}
      ${p.location ? `<div>📍 ${p.location}</div>` : ''}
      ${p.linkedin ? `<div>🔗 ${p.linkedin}</div>` : ''}
      ${p.website ? `<div>🌐 ${p.website}</div>` : ''}
    </div>
    ${data.skills && data.skills.length ? `
      <div class="section-title">Skills</div>
      ${renderSkills(data.skills)}
    ` : ''}
    ${data.certifications && data.certifications.length ? `
      <div class="section-title">Certifications</div>
      ${data.certifications.map(c => `<div class="entry"><div class="entry-title" style="color:#fff;font-size:9pt">${c.name}</div><div style="font-size:8pt;color:#94a3b8">${c.issuer} • ${c.date}</div></div>`).join('')}
    ` : ''}
  </div>
  <div class="main">
    ${p.summary ? `<div class="summary">${p.summary}</div>` : ''}
    ${data.experience && data.experience.length ? `
      <div class="section-title">Experience</div>
      ${data.experience.map(e => `
        <div class="entry">
          <div class="entry-header">
            <div><span class="entry-title">${e.position}</span> — ${e.company}</div>
            <span class="entry-date">${e.startDate} – ${e.current ? 'Present' : e.endDate}</span>
          </div>
          ${e.location ? `<div class="entry-subtitle">${e.location}</div>` : ''}
          ${renderHighlights(e.highlights)}
        </div>
      `).join('')}
    ` : ''}
    ${data.education && data.education.length ? `
      <div class="section-title">Education</div>
      ${data.education.map(e => `
        <div class="entry">
          <div class="entry-header">
            <div><span class="entry-title">${e.degree} in ${e.field}</span></div>
            <span class="entry-date">${e.startDate} – ${e.endDate}</span>
          </div>
          <div class="entry-subtitle">${e.institution}${e.gpa ? ` • GPA: ${e.gpa}` : ''}</div>
          ${renderHighlights(e.highlights)}
        </div>
      `).join('')}
    ` : ''}
    ${data.projects && data.projects.length ? `
      <div class="section-title">Projects</div>
      ${data.projects.map(p => `
        <div class="entry">
          <div class="entry-title">${p.name}</div>
          <div style="font-size:9pt;color:#475569">${p.description}</div>
          ${p.technologies && p.technologies.length ? `<div style="font-size:8pt;color:#2563eb;margin-top:2px">${p.technologies.join(' • ')}</div>` : ''}
        </div>
      `).join('')}
    ` : ''}
  </div>
</div>
</body></html>`;
}

/**
 * Minimal Template — Clean single-column
 */
function minimalTemplate(data) {
  const p = data.personalInfo || {};
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  ${baseStyles}
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  body { font-family: 'Inter', sans-serif; padding: 48px 56px; max-width: 800px; margin: 0 auto; }
  .header { text-align: center; margin-bottom: 24px; }
  .header .name { font-size: 24pt; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; }
  .header .contact { font-size: 9pt; color: #64748b; margin-top: 8px; }
  .header .contact span { margin: 0 8px; }
  .divider { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
  .section-title { font-size: 10pt; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; }
  .summary { text-align: center; color: #475569; font-size: 9.5pt; line-height: 1.6; max-width: 600px; margin: 0 auto 16px; }
</style></head><body>
<div class="header">
  <div class="name">${p.fullName || ''}</div>
  <div class="contact">
    ${[p.email, p.phone, p.location, p.linkedin].filter(Boolean).map(i => `<span>${i}</span>`).join(' | ')}
  </div>
</div>
${p.summary ? `<div class="summary">${p.summary}</div>` : ''}
<hr class="divider">
${data.experience && data.experience.length ? `
  <div class="section-title">Experience</div>
  ${data.experience.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div><span class="entry-title">${e.position}</span> — ${e.company}</div>
        <span class="entry-date">${e.startDate} – ${e.current ? 'Present' : e.endDate}</span>
      </div>
      ${renderHighlights(e.highlights)}
    </div>
  `).join('')}
` : ''}
${data.education && data.education.length ? `
  <div class="section-title">Education</div>
  ${data.education.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div><span class="entry-title">${e.institution}</span></div>
        <span class="entry-date">${e.startDate} – ${e.endDate}</span>
      </div>
      <div class="entry-subtitle">${e.degree} in ${e.field}${e.gpa ? ` • GPA: ${e.gpa}` : ''}</div>
    </div>
  `).join('')}
` : ''}
${data.skills && data.skills.length ? `
  <div class="section-title">Skills</div>
  ${renderSkills(data.skills)}
` : ''}
${data.projects && data.projects.length ? `
  <div class="section-title">Projects</div>
  ${data.projects.map(p => `
    <div class="entry">
      <div class="entry-title">${p.name}</div>
      <div style="font-size:9pt;color:#64748b">${p.description}</div>
    </div>
  `).join('')}
` : ''}
${data.certifications && data.certifications.length ? `
  <div class="section-title">Certifications</div>
  ${data.certifications.map(c => `<div class="entry"><span class="entry-title">${c.name}</span> — ${c.issuer} (${c.date})</div>`).join('')}
` : ''}
</body></html>`;
}

/**
 * Creative Template — Colorful with accent bars
 */
function creativeTemplate(data) {
  const p = data.personalInfo || {};
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  ${baseStyles}
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  body { font-family: 'Poppins', sans-serif; padding: 0; }
  .header { background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 36px 40px; color: #fff; }
  .header .name { font-size: 26pt; font-weight: 700; }
  .header .tagline { font-size: 10pt; opacity: 0.9; margin-top: 4px; }
  .header .contact { display: flex; gap: 16px; margin-top: 12px; font-size: 8.5pt; flex-wrap: wrap; }
  .body-content { padding: 28px 40px; }
  .section-title { color: #ef4444; border-left: 4px solid #f59e0b; padding-left: 12px; border-bottom: none; font-size: 11pt; font-weight: 700; margin-top: 20px; }
  .entry-title { color: #1a1a1a; }
  .tag { display: inline-block; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 4px; font-size: 8pt; margin: 2px; }
</style></head><body>
<div class="header">
  <div class="name">${p.fullName || ''}</div>
  ${p.summary ? `<div class="tagline">${p.summary}</div>` : ''}
  <div class="contact">
    ${p.email ? `<span>📧 ${p.email}</span>` : ''}
    ${p.phone ? `<span>📞 ${p.phone}</span>` : ''}
    ${p.location ? `<span>📍 ${p.location}</span>` : ''}
    ${p.linkedin ? `<span>🔗 ${p.linkedin}</span>` : ''}
  </div>
</div>
<div class="body-content">
  ${data.experience && data.experience.length ? `
    <div class="section-title">Experience</div>
    ${data.experience.map(e => `
      <div class="entry">
        <div class="entry-header">
          <div><span class="entry-title">${e.position}</span> @ ${e.company}</div>
          <span class="entry-date">${e.startDate} – ${e.current ? 'Present' : e.endDate}</span>
        </div>
        ${renderHighlights(e.highlights)}
      </div>
    `).join('')}
  ` : ''}
  ${data.education && data.education.length ? `
    <div class="section-title">Education</div>
    ${data.education.map(e => `
      <div class="entry">
        <div class="entry-title">${e.degree} in ${e.field}</div>
        <div class="entry-subtitle">${e.institution} • ${e.startDate} – ${e.endDate}</div>
      </div>
    `).join('')}
  ` : ''}
  ${data.skills && data.skills.length ? `
    <div class="section-title">Skills</div>
    <div style="margin-top:6px">
      ${data.skills.map(s => s.items.map(i => `<span class="tag">${i}</span>`).join('')).join('')}
    </div>
  ` : ''}
  ${data.projects && data.projects.length ? `
    <div class="section-title">Projects</div>
    ${data.projects.map(p => `
      <div class="entry">
        <div class="entry-title">${p.name}</div>
        <div style="font-size:9pt;color:#555">${p.description}</div>
        ${p.technologies && p.technologies.length ? `<div style="margin-top:3px">${p.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      </div>
    `).join('')}
  ` : ''}
  ${data.certifications && data.certifications.length ? `
    <div class="section-title">Certifications</div>
    ${data.certifications.map(c => `<div class="entry"><span class="entry-title">${c.name}</span> — ${c.issuer} (${c.date})</div>`).join('')}
  ` : ''}
</div>
</body></html>`;
}

/**
 * Corporate Template — Traditional with serif fonts
 */
function corporateTemplate(data) {
  const p = data.personalInfo || {};
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  ${baseStyles}
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@400;600&display=swap');
  body { font-family: 'Source Sans Pro', sans-serif; padding: 48px 52px; }
  .header { border-bottom: 3px double #1e293b; padding-bottom: 16px; margin-bottom: 20px; }
  .header .name { font-family: 'Merriweather', serif; font-size: 22pt; font-weight: 700; color: #1e293b; }
  .header .contact { font-size: 9pt; color: #475569; margin-top: 6px; }
  .header .contact span { margin-right: 16px; }
  .section-title { font-family: 'Merriweather', serif; font-size: 11pt; color: #1e293b; border-bottom: 1.5px solid #1e293b; font-weight: 700; }
  .summary { border-left: 3px solid #1e293b; padding-left: 16px; color: #475569; margin-bottom: 20px; font-size: 9.5pt; line-height: 1.6; }
</style></head><body>
<div class="header">
  <div class="name">${p.fullName || ''}</div>
  <div class="contact">
    ${[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).map(i => `<span>${i}</span>`).join('')}
  </div>
</div>
${p.summary ? `<div class="summary">${p.summary}</div>` : ''}
${data.experience && data.experience.length ? `
  <div class="section-title">Professional Experience</div>
  ${data.experience.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div><span class="entry-title">${e.position}</span>, ${e.company}${e.location ? `, ${e.location}` : ''}</div>
        <span class="entry-date">${e.startDate} – ${e.current ? 'Present' : e.endDate}</span>
      </div>
      ${renderHighlights(e.highlights)}
    </div>
  `).join('')}
` : ''}
${data.education && data.education.length ? `
  <div class="section-title">Education</div>
  ${data.education.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div><span class="entry-title">${e.degree} in ${e.field}</span>, ${e.institution}</div>
        <span class="entry-date">${e.startDate} – ${e.endDate}</span>
      </div>
      ${e.gpa ? `<div class="entry-subtitle">GPA: ${e.gpa}</div>` : ''}
    </div>
  `).join('')}
` : ''}
${data.skills && data.skills.length ? `
  <div class="section-title">Core Competencies</div>
  ${renderSkills(data.skills)}
` : ''}
${data.projects && data.projects.length ? `
  <div class="section-title">Key Projects</div>
  ${data.projects.map(p => `
    <div class="entry">
      <div class="entry-title">${p.name}</div>
      <div style="font-size:9pt;color:#475569">${p.description}</div>
    </div>
  `).join('')}
` : ''}
${data.certifications && data.certifications.length ? `
  <div class="section-title">Certifications & Licenses</div>
  ${data.certifications.map(c => `<div class="entry"><span class="entry-title">${c.name}</span> — ${c.issuer}, ${c.date}</div>`).join('')}
` : ''}
</body></html>`;
}

/**
 * Elegant Template — Refined with subtle accents
 */
function elegantTemplate(data) {
  const p = data.personalInfo || {};
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  ${baseStyles}
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');
  body { font-family: 'Lato', sans-serif; padding: 44px 48px; color: #2d2d2d; }
  .header { text-align: center; margin-bottom: 24px; }
  .header .name { font-family: 'Playfair Display', serif; font-size: 26pt; font-weight: 700; color: #4c1d95; letter-spacing: 1px; }
  .header .contact { font-size: 9pt; color: #6b7280; margin-top: 8px; }
  .header .contact span { margin: 0 6px; }
  .header-divider { height: 2px; background: linear-gradient(90deg, transparent, #7c3aed, transparent); margin: 16px 0; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 12pt; color: #4c1d95; border-bottom: 1px solid #ddd6fe; padding-bottom: 4px; }
  .summary { text-align: center; color: #4b5563; font-size: 9.5pt; line-height: 1.7; max-width: 580px; margin: 0 auto 20px; font-style: italic; }
  .entry-title { color: #1e1e1e; }
  .accent { color: #7c3aed; }
</style></head><body>
<div class="header">
  <div class="name">${p.fullName || ''}</div>
  <div class="contact">
    ${[p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean).map(i => `<span>${i}</span>`).join(' · ')}
  </div>
</div>
<div class="header-divider"></div>
${p.summary ? `<div class="summary">"${p.summary}"</div>` : ''}
${data.experience && data.experience.length ? `
  <div class="section-title">Professional Experience</div>
  ${data.experience.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div><span class="entry-title">${e.position}</span> <span class="accent">|</span> ${e.company}</div>
        <span class="entry-date">${e.startDate} – ${e.current ? 'Present' : e.endDate}</span>
      </div>
      ${e.location ? `<div class="entry-subtitle">${e.location}</div>` : ''}
      ${renderHighlights(e.highlights)}
    </div>
  `).join('')}
` : ''}
${data.education && data.education.length ? `
  <div class="section-title">Education</div>
  ${data.education.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div><span class="entry-title">${e.institution}</span></div>
        <span class="entry-date">${e.startDate} – ${e.endDate}</span>
      </div>
      <div class="entry-subtitle">${e.degree} in ${e.field}${e.gpa ? ` — GPA: ${e.gpa}` : ''}</div>
    </div>
  `).join('')}
` : ''}
${data.skills && data.skills.length ? `
  <div class="section-title">Expertise</div>
  ${renderSkills(data.skills)}
` : ''}
${data.projects && data.projects.length ? `
  <div class="section-title">Notable Projects</div>
  ${data.projects.map(p => `
    <div class="entry">
      <div class="entry-title">${p.name}</div>
      <div style="font-size:9pt;color:#6b7280">${p.description}</div>
      ${p.technologies && p.technologies.length ? `<div style="font-size:8pt;color:#7c3aed;margin-top:2px">${p.technologies.join(' · ')}</div>` : ''}
    </div>
  `).join('')}
` : ''}
${data.certifications && data.certifications.length ? `
  <div class="section-title">Certifications</div>
  ${data.certifications.map(c => `<div class="entry"><span class="entry-title">${c.name}</span> <span class="accent">|</span> ${c.issuer} · ${c.date}</div>`).join('')}
` : ''}
</body></html>`;
}

/**
 * Get the HTML for a specific template
 */
function getTemplateHTML(resumeData, templateId) {
  const templates = {
    modern: modernTemplate,
    minimal: minimalTemplate,
    creative: creativeTemplate,
    corporate: corporateTemplate,
    elegant: elegantTemplate
  };

  const templateFn = templates[templateId] || templates.modern;
  return templateFn(resumeData);
}

module.exports = { getTemplateHTML };
