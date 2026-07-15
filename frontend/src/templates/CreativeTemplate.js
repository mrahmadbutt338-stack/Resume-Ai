import styles from '@/styles/ResumeTemplates.module.css';

/**
 * Creative Template — Colorful gradient header with accent bars
 */
const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function CreativeTemplate({ data, config }) {
  const p = data?.personalInfo || {};
  const summary = data?.summary || p.summary;

  return (
    <div className={`${styles.resumeContainer} ${styles.creative}`}>
      <div className={styles.creativeHeader}>
        {config?.withPicture !== false && p.image && (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <img src={p.image} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
          </div>
        )}
        <div className={styles.creativeName}>{p.fullName}</div>
        {summary && <div className={styles.creativeTagline}>{summary}</div>}
        <div className={styles.creativeContact}>
          {p.email && <span>📧 {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
          {p.linkedin && <span>🔗 {renderLink(p.linkedin)}</span>}
        </div>
      </div>

      <div className={styles.creativeBody}>
        {data?.experience && data.experience.length > 0 && (
          <>
            <div className={styles.creativeSection}>Experience</div>
            {data.experience.map((e, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div><span className={styles.entryTitle}>{e.position}</span> @ {e.company}</div>
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

        {data?.education && data.education.length > 0 && (
          <>
            <div className={styles.creativeSection}>Education</div>
            {data.education.map((e, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>{e.degree} in {e.field}</div>
                <div className={styles.entrySubtitle}>{e.institution} • {e.startDate} – {e.endDate}</div>
              </div>
            ))}
          </>
        )}

        {data?.skills && data.skills.length > 0 && (
          <>
            <div className={styles.creativeSection}>Skills</div>
            <div style={{ marginTop: '6px' }}>
              {data.skills.map((s, i) => {
                const items = Array.isArray(s.items) ? s.items : (s.items || '').split(',').map(x => x.trim()).filter(Boolean);
                return items.map((item, j) => (
                  <span key={`${i}-${j}`} className={styles.creativeTag}>{item}</span>
                ));
              })}
            </div>
          </>
        )}

        {data?.languages && data.languages.length > 0 && (
          <>
            <div className={styles.creativeSection}>Languages</div>
            <div style={{ marginTop: '6px' }}>
              {data.languages.map((l, i) => (
                <span key={i} className={styles.creativeTag}>{l.language} - {l.proficiency}</span>
              ))}
            </div>
          </>
        )}

        {data?.projects && data.projects.length > 0 && (
          <>
            <div className={styles.creativeSection}>Projects</div>
            {data.projects.map((p, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>
                  {p.name}
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px', fontSize: '9px', color: '#f59e0b', textDecoration: 'none' }}>🔗 Live Link</a>}
                </div>
                <div style={{ fontSize: '9px', color: '#555' }}>{p.description}</div>
                {p.technologies?.length > 0 && (
                  <div style={{ marginTop: '3px' }}>
                    {(Array.isArray(p.technologies) ? p.technologies : []).map((t, j) => (
                      <span key={j} className={styles.creativeTag}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {data?.certifications && data.certifications.length > 0 && (
          <>
            <div className={styles.creativeSection}>Certifications</div>
            {data.certifications.map((c, i) => (
              <div key={i} className={styles.entry}>
                <span className={styles.entryTitle}>{c.name}</span> — {c.issuer} ({c.date})
              </div>
            ))}
          </>
        )}

        {data?.volunteerExperience && data.volunteerExperience.length > 0 && (
          <>
            <div className={styles.creativeSection}>Volunteer Experience</div>
            {data.volunteerExperience.map((v, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div><span className={styles.entryTitle}>{v.role}</span> @ {v.organization}</div>
                  <span className={styles.entryDate}>{v.startDate} – {v.current ? 'Present' : v.endDate}</span>
                </div>
                {v.description && <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>{v.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.internships && data.internships.length > 0 && (
          <>
            <div className={styles.creativeSection}>Internships</div>
            {data.internships.map((e, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryHeader}>
                  <div><span className={styles.entryTitle}>{e.position}</span> @ {e.company}</div>
                  <span className={styles.entryDate}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                </div>
                {e.description && <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>{e.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.awards && data.awards.length > 0 && (
          <>
            <div className={styles.creativeSection}>Awards</div>
            {data.awards.map((a, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>{a.title} {a.date && <span className={styles.entryDate} style={{marginLeft: '8px'}}>{a.date}</span>}</div>
                {a.issuer && <div className={styles.entrySubtitle}>{a.issuer}</div>}
                {a.description && <div style={{ fontSize: '9px', color: '#555' }}>{a.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.achievements && data.achievements.length > 0 && (
          <>
            <div className={styles.creativeSection}>Achievements</div>
            {data.achievements.map((a, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>{a.title} {a.date && <span className={styles.entryDate} style={{marginLeft: '8px'}}>{a.date}</span>}</div>
                {a.description && <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>{a.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.publications && data.publications.length > 0 && (
          <>
            <div className={styles.creativeSection}>Publications</div>
            {data.publications.map((p, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>{p.title}</div>
                {p.publisher && <div className={styles.entrySubtitle}>{p.publisher} {p.date && `• ${p.date}`}</div>}
                {p.description && <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>{p.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.customSections && data.customSections.length > 0 && data.customSections.map((cs, cIdx) => (
          <div key={`cs-${cIdx}`}>
            <div className={styles.creativeSection}>{cs.title || 'Additional Information'}</div>
            {cs.items?.map((item, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.entryTitle}>
                  {item.name} {item.date && <span className={styles.entryDate} style={{marginLeft: '8px'}}>{item.date}</span>}
                </div>
                {item.subtitle && <div className={styles.entrySubtitle}>{item.subtitle}</div>}
                {item.description && <div style={{ fontSize: '9px', color: '#555', marginTop: '2px' }}>{item.description}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
