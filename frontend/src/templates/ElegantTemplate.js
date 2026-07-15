import styles from '@/styles/ResumeTemplates.module.css';

/**
 * Elegant Template — Refined with purple accents and serif headings
 */
const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function ElegantTemplate({ data }) {
  const p = data?.personalInfo || {};
  const contactItems = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);

  return (
    <div className={`${styles.resumeContainer} ${styles.elegant}`}>
      <div className={styles.elegantHeader}>
        {p.image && (
          <img src={p.image} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
        )}
        <div className={styles.elegantName}>{p.fullName}</div>
        <div className={styles.elegantContact}>
          {contactItems.join(' · ')}
        </div>
      </div>

      <div className={styles.elegantDivider} />

      {p.summary && (
        <div className={styles.elegantSummary}>&ldquo;{p.summary}&rdquo;</div>
      )}

      {data?.experience?.length > 0 && (
        <>
          <div className={styles.elegantSection}>Professional Experience</div>
          {data.experience.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.entryTitle}>{e.position}</span>
                  {' '}<span className={styles.elegantAccent}>|</span>{' '}
                  {e.company}
                </div>
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

      {data?.education?.length > 0 && (
        <>
          <div className={styles.elegantSection}>Education</div>
          {data.education.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div><span className={styles.entryTitle}>{e.institution}</span></div>
                <span className={styles.entryDate}>{e.startDate} – {e.endDate}</span>
              </div>
              <div className={styles.entrySubtitle}>
                {e.degree} in {e.field}{e.gpa ? ` — GPA: ${e.gpa}` : ''}
              </div>
            </div>
          ))}
        </>
      )}

      {data?.skills?.length > 0 && (
        <>
          <div className={styles.elegantSection}>Expertise</div>
          {data.skills.map((s, i) => (
            <div key={i} className={styles.skillGroup}>
              <span className={styles.skillCategory}>{s.category}: </span>
              <span className={styles.skillItems}>{Array.isArray(s.items) ? s.items.join(', ') : s.items}</span>
            </div>
          ))}
        </>
      )}

      {data?.languages?.length > 0 && (
        <>
          <div className={styles.elegantSection}>Languages</div>
          {data.languages.map((l, i) => (
            <div key={i} className={styles.skillGroup}>
              <span className={styles.skillCategory}>{l.language}: </span>
              <span className={styles.skillItems}>{l.proficiency}</span>
            </div>
          ))}
        </>
      )}

      {data?.projects?.length > 0 && (
        <>
          <div className={styles.elegantSection}>Notable Projects</div>
          {data.projects.map((p, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryTitle}>
                {p.name}
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', fontSize: '9px', color: '#7c3aed', textDecoration: 'none' }}>🔗 Live Link</a>}
              </div>
              <div style={{ fontSize: '9px', color: '#6b7280' }}>{p.description}</div>
              {p.technologies?.length > 0 && (
                <div style={{ fontSize: '8px', color: '#7c3aed', marginTop: '2px' }}>
                  {Array.isArray(p.technologies) ? p.technologies.join(' · ') : p.technologies}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {data?.certifications?.length > 0 && (
        <>
          <div className={styles.elegantSection}>Certifications</div>
          {data.certifications.map((c, i) => (
            <div key={i} className={styles.entry}>
              <span className={styles.entryTitle}>{c.name}</span>
              {' '}<span className={styles.elegantAccent}>|</span>{' '}
              {c.issuer} · {c.date}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
