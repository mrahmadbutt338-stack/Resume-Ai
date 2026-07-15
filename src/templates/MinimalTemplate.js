import styles from '@/styles/ResumeTemplates.module.css';

/**
 * Minimal Template — Clean single-column with generous whitespace
 */
const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function MinimalTemplate({ data }) {
  const p = data?.personalInfo || {};

  const contactItems = [p.email, p.phone, p.location, p.linkedin].filter(Boolean);

  return (
    <div className={`${styles.resumeContainer} ${styles.minimal}`}>
      <div className={styles.minimalHeader}>
        {p.image && (
          <img src={p.image} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />
        )}
        <div className={styles.minimalName}>{p.fullName}</div>
        <div className={styles.minimalContact}>
          {contactItems.join(' | ')}
        </div>
      </div>

      {p.summary && (
        <div className={styles.minimalSummary}>{p.summary}</div>
      )}

      <hr className={styles.minimalDivider} />

      {data?.experience?.length > 0 && (
        <>
          <div className={styles.minimalSection}>Experience</div>
          {data.experience.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div><span className={styles.entryTitle}>{e.position}</span> — {e.company}</div>
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
          <div className={styles.minimalSection}>Education</div>
          {data.education.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div><span className={styles.entryTitle}>{e.institution}</span></div>
                <span className={styles.entryDate}>{e.startDate} – {e.endDate}</span>
              </div>
              <div className={styles.entrySubtitle}>
                {e.degree} in {e.field}{e.gpa ? ` • GPA: ${e.gpa}` : ''}
              </div>
            </div>
          ))}
        </>
      )}

      {data?.skills?.length > 0 && (
        <>
          <div className={styles.minimalSection}>Skills</div>
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
          <div className={styles.minimalSection}>Languages</div>
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
          <div className={styles.minimalSection}>Projects</div>
          {data.projects.map((p, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryTitle}>
                {p.name}
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', fontSize: '9px', color: '#2C5E3E', textDecoration: 'none' }}>🔗 Live Link</a>}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b' }}>{p.description}</div>
            </div>
          ))}
        </>
      )}

      {data?.certifications?.length > 0 && (
        <>
          <div className={styles.minimalSection}>Certifications</div>
          {data.certifications.map((c, i) => (
            <div key={i} className={styles.entry}>
              <span className={styles.entryTitle}>{c.name}</span> — {c.issuer} ({c.date})
            </div>
          ))}
        </>
      )}

      {data?.volunteerExperience?.length > 0 && (
        <>
          <div className={styles.minimalSection}>Volunteer Experience</div>
          {data.volunteerExperience.map((v, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div><span className={styles.entryTitle}>{v.role}</span> — {v.organization}</div>
                <span className={styles.entryDate}>{v.startDate} – {v.current ? 'Present' : v.endDate}</span>
              </div>
              {v.description && <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{v.description}</div>}
            </div>
          ))}
        </>
      )}

      {data?.awards?.length > 0 && (
        <>
          <div className={styles.minimalSection}>Awards</div>
          {data.awards.map((a, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div><span className={styles.entryTitle}>{a.title}</span> — {a.issuer}</div>
                <span className={styles.entryDate}>{a.date}</span>
              </div>
              {a.description && <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{a.description}</div>}
            </div>
          ))}
        </>
      )}

      {data?.internships?.length > 0 && (
        <>
          <div className={styles.minimalSection}>Internships</div>
          {data.internships.map((e, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div><span className={styles.entryTitle}>{e.position}</span> — {e.company}</div>
                <span className={styles.entryDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
              </div>
              {e.description && <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{e.description}</div>}
            </div>
          ))}
        </>
      )}

      {data?.customSections?.length > 0 && data.customSections.map((cs, cIdx) => (
        <div key={`cs-${cIdx}`}>
          <div className={styles.minimalSection}>{cs.title || 'Additional Information'}</div>
          {cs.items?.map((item, i) => (
            <div key={i} className={styles.entry}>
              <div className={styles.entryHeader}>
                <div>
                  {item.name && <span className={styles.entryTitle}>{item.name}</span>}
                  {item.name && item.subtitle && ' — '}
                  {item.subtitle && <span>{item.subtitle}</span>}
                </div>
                {item.date && <span className={styles.entryDate}>{item.date}</span>}
              </div>
              {item.description && <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{item.description}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
