import styles from '@/styles/ResumeTemplates.module.css';

const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function BorderedTemplate({ data, colorTheme }) {
  const p = data?.personalInfo || {};
  const rootStyle = colorTheme ? { '--template-primary': colorTheme, '--template-accent': colorTheme } : {};

  return (
    <div className={`${styles.resumeContainer} ${styles.bordered}`} style={rootStyle}>
      <div className={styles.bdHeader}>
        <div className={styles.bdName}>{p.fullName}</div>
        <div className={styles.bdTitle}>{p.title}</div>
        
        <div className={styles.bdContact}>
          {p.email && <span>📧 {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
          {p.linkedin && <span>🔗 {renderLink(p.linkedin)}</span>}
        </div>
      </div>

      <div className={styles.bdLayout}>
        <div className={styles.bdMain}>
          {data?.experience?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Work Experience</div>
              {data.experience.map((e, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.position}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '11px', color: 'var(--template-primary)' }}>{e.company}</div>
                  <div style={{ fontSize: '9px', color: '#666', marginBottom: '4px' }}>
                    🗓️ {e.startDate} - {e.current ? 'Present' : e.endDate} &nbsp; 📍 {e.location}
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

          {data?.projects?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Projects</div>
              {data.projects.map((p, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                    {p.name}
                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '6px', fontSize: '8px', color: 'var(--template-primary)', textDecoration: 'none' }}>🔗 Link</a>}
                  </div>
                  <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{p.description}</div>
                </div>
              ))}
            </>
          )}

          {data?.volunteerExperience?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Volunteer Experience</div>
              {data.volunteerExperience.map((v, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{v.role}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: 'var(--template-primary)' }}>{v.organization}</div>
                  <div style={{ fontSize: '9px', color: '#666', marginBottom: '4px' }}>
                    🗓️ {v.startDate} - {v.current ? 'Present' : v.endDate}
                  </div>
                  {v.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{v.description}</div>}
                </div>
              ))}
            </>
          )}

          {data?.internships?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Internships</div>
              {data.internships.map((e, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.position}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '11px', color: 'var(--template-primary)' }}>{e.company}</div>
                  <div style={{ fontSize: '9px', color: '#666', marginBottom: '4px' }}>
                    🗓️ {e.startDate} - {e.current ? 'Present' : e.endDate} &nbsp; 📍 {e.location}
                  </div>
                  {e.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{e.description}</div>}
                </div>
              ))}
            </>
          )}

          {data?.customSections?.length > 0 && data.customSections.map((cs, cIdx) => (
            <div key={`cs-${cIdx}`}>
              <div className={styles.bdSectionTitle}>{cs.title || 'Additional Info'}</div>
              {cs.items?.map((item, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{item.name}</div>
                  {item.subtitle && <div style={{ fontStyle: 'italic', fontSize: '10px', color: 'var(--template-primary)' }}>{item.subtitle}</div>}
                  {item.date && <div style={{ fontSize: '9px', color: '#666', marginBottom: '4px' }}>🗓️ {item.date}</div>}
                  {item.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{item.description}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div className={styles.bdSidebar}>
          {data?.education?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Education</div>
              {data.education.map((e, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#1a1a1a' }}>{e.degree}</div>
                  <div style={{ fontSize: '10px', color: 'var(--template-primary)', fontStyle: 'italic' }}>{e.institution}</div>
                  <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>🗓️ {e.startDate} - {e.endDate}</div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>📍 {e.location}</div>
                </div>
              ))}
            </>
          )}

          {data?.skills?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Skills</div>
              <ul className={styles.highlights} style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {data.skills.map((s, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '10px' }}>{s.category}</div>
                    <div style={{ fontSize: '10px', color: '#475569' }}>
                      {Array.isArray(s.items) ? s.items.map(item => `• ${item}`).join(' ') : s.items}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data?.languages?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Languages</div>
              <ul className={styles.highlights} style={{ listStyleType: 'none', paddingLeft: 0 }}>
                {data.languages.map((l, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '10px' }}>{l.language}</div>
                    <div style={{ fontSize: '9px', color: '#475569' }}>{l.proficiency}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data?.certifications?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Licenses / Certs</div>
              <ul className={styles.highlights} style={{ paddingLeft: '14px' }}>
                {data.certifications.map((c, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 600, fontSize: '10px' }}>{c.name}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data?.awards?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Awards</div>
              <ul className={styles.highlights} style={{ paddingLeft: '14px' }}>
                {data.awards.map((a, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 600, fontSize: '10px' }}>{a.title}</div>
                    <div style={{ fontSize: '9px', color: '#475569' }}>{a.issuer}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data?.achievements?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Achievements</div>
              <ul className={styles.highlights} style={{ paddingLeft: '14px' }}>
                {data.achievements.map((a, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 600, fontSize: '10px' }}>{a.title}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {data?.publications?.length > 0 && (
            <>
              <div className={styles.bdSectionTitle}>Publications</div>
              <ul className={styles.highlights} style={{ paddingLeft: '14px' }}>
                {data.publications.map((p, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <div style={{ fontWeight: 600, fontSize: '10px' }}>{p.title}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
