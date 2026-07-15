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
        </div>
      </div>
    </div>
  );
}
