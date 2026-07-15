import styles from '@/styles/ResumeTemplates.module.css';

const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function PhotoTemplate({ data, colorTheme, showPhoto = true }) {
  const p = data?.personalInfo || {};
  const rootStyle = colorTheme ? { '--template-primary': colorTheme, '--template-accent': colorTheme } : {};

  return (
    <div className={`${styles.resumeContainer} ${styles.photo}`} style={rootStyle}>
      <div className={styles.photoHeader}>
        {showPhoto && p.image ? (
          <img 
            src={p.image} 
            alt={p.fullName} 
            className={styles.photoImage} 
          />
        ) : null}
        <div>
          <div className={styles.photoName}>{p.fullName}</div>
          <div className={styles.photoTitle}>{p.title}</div>
        </div>
      </div>
      
      <div className={styles.photoContact}>
        {p.phone && <span>📞 {p.phone}</span>}
        {p.email && <span>📧 {p.email}</span>}
        {p.location && <span>📍 {p.location}</span>}
        {p.linkedin && <span>🔗 {renderLink(p.linkedin)}</span>}
      </div>

      <div className={styles.photoLayout}>
        <div className={styles.photoSidebar}>
          {data?.skills?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Core Skills</div>
              {data.skills.map((s, i) => (
                <div key={i} className={styles.bdEntry}>
                  <div className={styles.bdSubtitle}>{s.category}</div>
                  <div style={{ fontSize: '10px', color: '#475569' }}>{Array.isArray(s.items) ? s.items.join(', ') : s.items}</div>
                </div>
              ))}
            </>
          )}
          {data?.education?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Education</div>
              {data.education.map((e, i) => (
                <div key={i} className={styles.bdEntry}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#1a1a1a' }}>{e.degree}</div>
                  <div style={{ fontSize: '10px', color: '#475569' }}>{e.institution}</div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>{e.startDate} - {e.endDate}</div>
                </div>
              ))}
            </>
          )}
          {data?.languages?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Languages</div>
              {data.languages.map((l, i) => (
                <div key={i} className={styles.bdEntry}>
                  <div style={{ fontWeight: 'bold', fontSize: '10px', color: '#1a1a1a' }}>{l.language}</div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>{l.proficiency}</div>
                </div>
              ))}
            </>
          )}

          {data?.awards?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Awards</div>
              {data.awards.map((a, i) => (
                <div key={i} className={styles.bdEntry}>
                  <div style={{ fontWeight: 'bold', fontSize: '10px', color: '#1a1a1a' }}>{a.title}</div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>{a.issuer}</div>
                </div>
              ))}
            </>
          )}

          {data?.achievements?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Achievements</div>
              {data.achievements.map((a, i) => (
                <div key={i} className={styles.bdEntry}>
                  <div style={{ fontWeight: 'bold', fontSize: '10px', color: '#1a1a1a' }}>{a.title}</div>
                </div>
              ))}
            </>
          )}

          {data?.publications?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Publications</div>
              {data.publications.map((p, i) => (
                <div key={i} className={styles.bdEntry}>
                  <div style={{ fontWeight: 'bold', fontSize: '10px', color: '#1a1a1a' }}>{p.title}</div>
                </div>
              ))}
            </>
          )}
        </div>
        
        <div className={styles.photoMain}>
          {p.summary && (
            <>
              <div className={styles.photoSectionTitle}>Career Summary</div>
              <div style={{ fontSize: '10px', lineHeight: '1.6', color: '#333' }}>{p.summary}</div>
            </>
          )}

          {data?.experience?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Professional Experience</div>
              {data.experience.map((e, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.position}</div>
                    <div style={{ fontSize: '9px', color: '#666' }}>{e.startDate} - {e.current ? 'Present' : e.endDate}</div>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '11px', color: 'var(--template-primary)' }}>{e.company} {e.location && `- ${e.location}`}</div>
                  
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
              <div className={styles.photoSectionTitle}>Projects</div>
              {data.projects.map((p, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
                    {p.name}
                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '6px', fontSize: '8px', color: 'var(--template-primary)', textDecoration: 'none' }}>🔗 Link</a>}
                  </div>
                  <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{p.description}</div>
                </div>
              ))}
            </>
          )}

          {data?.certifications?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Certifications</div>
              {data.certifications.map((c, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{c.name}</div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>{c.issuer} • {c.date}</div>
                </div>
              ))}
            </>
          )}

          {data?.volunteerExperience?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Volunteer Experience</div>
              {data.volunteerExperience.map((v, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{v.role}</div>
                    <div style={{ fontSize: '9px', color: '#666' }}>{v.startDate} - {v.current ? 'Present' : v.endDate}</div>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '10px', color: 'var(--template-primary)' }}>{v.organization}</div>
                  {v.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{v.description}</div>}
                </div>
              ))}
            </>
          )}

          {data?.internships?.length > 0 && (
            <>
              <div className={styles.photoSectionTitle}>Internships</div>
              {data.internships.map((e, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.position}</div>
                    <div style={{ fontSize: '9px', color: '#666' }}>{e.startDate} - {e.current ? 'Present' : e.endDate}</div>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '11px', color: 'var(--template-primary)' }}>{e.company} {e.location && `- ${e.location}`}</div>
                  {e.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{e.description}</div>}
                </div>
              ))}
            </>
          )}

          {data?.customSections?.length > 0 && data.customSections.map((cs, cIdx) => (
            <div key={`cs-${cIdx}`}>
              <div className={styles.photoSectionTitle}>{cs.title || 'Additional Info'}</div>
              {cs.items?.map((item, i) => (
                <div key={i} className={styles.bdEntry} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{item.name}</div>
                    {item.date && <div style={{ fontSize: '9px', color: '#666' }}>{item.date}</div>}
                  </div>
                  {item.subtitle && <div style={{ fontStyle: 'italic', fontSize: '10px', color: 'var(--template-primary)' }}>{item.subtitle}</div>}
                  {item.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>{item.description}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
