import styles from '@/styles/ResumeTemplates.module.css';

/**
 * Modern Template — Two-column with bold sidebar
 */
const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function ModernTemplate({ data, config }) {
  const p = data?.personalInfo || {};
  const summary = data?.summary || p.summary; // Fallback
  const colorTheme = config?.colorTheme || '#2C5E3E';
  const rootStyle = { '--template-primary': colorTheme, '--template-accent': colorTheme };

  return (
    <div className={`${styles.resumeContainer} ${styles.modern}`} style={rootStyle}>
      {/* Sidebar */}
      <div className={styles.modernSidebar}>
        {config?.withPicture !== false && p.image && (
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <img src={p.image} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }} />
          </div>
        )}
        <div className={styles.modernSidebarName}>{p.fullName}</div>
        
        <div className={styles.modernContact}>
          {p.email && <div>📧 {p.email}</div>}
          {p.phone && <div>📞 {p.phone}</div>}
          {p.location && <div>📍 {p.location}</div>}
          {p.linkedin && <div>🔗 {renderLink(p.linkedin)}</div>}
          {p.website && <div>🌐 {renderLink(p.website)}</div>}
          {p.github && <div>💻 {renderLink(p.github)}</div>}
        </div>

        {data?.skills && data.skills.length > 0 && (
          <>
            <div className={styles.modernSidebarSection}>Skills</div>
            {data.skills.map((s, i) => (
              <div key={i} className={styles.skillGroup}>
                {s.category && <div className={styles.sidebarSkillCategory}>{s.category}</div>}
                <div className={styles.sidebarSkillItems}>
                  {Array.isArray(s.items) ? s.items.join(', ') : s.items}
                </div>
              </div>
            ))}
          </>
        )}

        {data?.languages && data.languages.length > 0 && (
          <>
            <div className={styles.modernSidebarSection}>Languages</div>
            {data.languages.map((l, i) => (
              <div key={i} className={styles.skillGroup}>
                <div className={styles.sidebarSkillCategory}>{l.language}</div>
                <div style={{ fontSize: '9px', color: '#cbd5e1' }}>{l.proficiency}</div>
              </div>
            ))}
          </>
        )}

        {data?.certifications && data.certifications.length > 0 && (
          <>
            <div className={styles.modernSidebarSection}>Certifications</div>
            {data.certifications.map((c, i) => (
              <div key={i} className={styles.entry}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '10px' }}>{c.name}</div>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>
                  {c.issuer} {c.date && `• ${c.date}`}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Main Content */}
      <div className={styles.modernMain}>
        {p.jobTitle && <div style={{ fontSize: '12px', fontWeight: 700, color: colorTheme, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.jobTitle}</div>}
        
        {summary && (
          <div style={{ color: '#475569', marginBottom: '14px', fontSize: '10px', lineHeight: '1.6' }}>
            {summary}
          </div>
        )}

        {data?.experience && data.experience.length > 0 && (
          <>
            <div className={styles.modernMainSection}>Experience</div>
            {data.experience.map((e, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div><span className={styles.entryTitle}>{e.position}</span> — {e.company}</div>
                  <span className={styles.entryDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.location && <div className={styles.entrySubtitle}>{e.location}</div>}
                
                {e.highlights?.length > 0 && (
                  <ul className={styles.highlights}>
                    {e.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                {!e.highlights?.length && e.description && (
                  <ul className={styles.highlights}>
                    {e.description.split('\n').filter(Boolean).map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {/* Similar implementation for Education, Projects, Volunteer, etc. */}
        
        {data?.education && data.education.length > 0 && (
          <>
            <div className={styles.modernMainSection}>Education</div>
            {data.education.map((e, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div><span className={styles.entryTitle}>{e.degree} in {e.field}</span></div>
                  <span className={styles.entryDate}>{e.startDate} – {e.endDate}</span>
                </div>
                <div className={styles.entrySubtitle}>{e.institution}{e.gpa ? ` • GPA: ${e.gpa}` : ''}</div>
              </div>
            ))}
          </>
        )}

        {data?.projects && data.projects.length > 0 && (
          <>
            <div className={styles.modernMainSection}>Projects</div>
            {data.projects.map((p, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>
                  {p.name}
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', fontSize: '9px', color: colorTheme, textDecoration: 'none' }}>🔗 Link</a>}
                </div>
                <div style={{ fontSize: '9px', color: '#475569' }}>{p.description}</div>
                {p.technologies?.length > 0 && (
                  <div style={{ fontSize: '8px', color: colorTheme, marginTop: '2px' }}>
                    {Array.isArray(p.technologies) ? p.technologies.join(' • ') : p.technologies}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {data?.volunteerExperience && data.volunteerExperience.length > 0 && (
          <>
            <div className={styles.modernMainSection}>Volunteer Experience</div>
            {data.volunteerExperience.map((v, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div><span className={styles.entryTitle}>{v.role}</span> — {v.organization}</div>
                  <span className={styles.entryDate}>{v.startDate} – {v.current ? 'Present' : v.endDate}</span>
                </div>
                {v.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{v.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.awards && data.awards.length > 0 && (
          <>
            <div className={styles.modernMainSection}>Awards</div>
            {data.awards.map((a, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>{a.title} {a.date && <span className={styles.entryDate} style={{marginLeft: '8px'}}>{a.date}</span>}</div>
                {a.issuer && <div className={styles.entrySubtitle}>{a.issuer}</div>}
                {a.description && <div style={{ fontSize: '9px', color: '#475569' }}>{a.description}</div>}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
}

