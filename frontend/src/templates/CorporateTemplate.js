import styles from '@/styles/ResumeTemplates.module.css';

/**
 * Corporate Template — Traditional, structured with serif fonts
 */
const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function CorporateTemplate({ data }) {
  const p = data?.personalInfo || {};
  const contactItems = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);

  return (
    <div className={`${styles.resumeContainer} ${styles.corporate}`}>
      <div className={styles.corporateHeader}>
        {p.image && (
          <img src={p.image} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
        )}
        <div className={styles.corporateName}>{p.fullName}</div>
        <div className={styles.corporateContact}>
          {contactItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {p.summary && (
        <div className={styles.corporateSummary}>{p.summary}</div>
      )}

      {data?.experience?.length > 0 && (
        <>
          <div className={styles.corporateSection}>Professional Experience</div>
          {data.experience.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.entryTitle}>{e.position}</span>, {e.company}
                  {e.location ? `, ${e.location}` : ''}
                </div>
                <span className={styles.entryDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
              </div>
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
          <div className={styles.corporateSection}>Education</div>
          {data.education.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.entryTitle}>{e.degree} in {e.field}</span>, {e.institution}
                </div>
                <span className={styles.entryDate}>{e.startDate} – {e.endDate}</span>
              </div>
              {e.gpa && <div className={styles.entrySubtitle}>GPA: {e.gpa}</div>}
            </div>
          ))}
        </>
      )}

      {data?.skills?.length > 0 && (
        <>
          <div className={styles.corporateSection}>Core Competencies</div>
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
          <div className={styles.corporateSection}>Languages</div>
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
          <div className={styles.corporateSection}>Key Projects</div>
          {data.projects.map((p, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryTitle}>
                {p.name}
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', fontSize: '9px', color: '#1e293b', textDecoration: 'underline' }}>🔗 Live Link</a>}
              </div>
              <div style={{ fontSize: '9px', color: '#475569' }}>{p.description}</div>
            </div>
          ))}
        </>
      )}

      {data?.certifications?.length > 0 && (
        <>
          <div className={styles.corporateSection}>Certifications &amp; Licenses</div>
          {data.certifications.map((c, i) => (
            <div key={i} className={styles.entry}>
              <span className={styles.entryTitle}>{c.name}</span> — {c.issuer}, {c.date}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
