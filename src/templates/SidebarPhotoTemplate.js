import styles from '@/styles/ResumeTemplates.module.css';

const renderLink = (url) => {
  if (!url) return null;
  const href = url.startsWith('http') ? url : 'https://' + url;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>{url}</a>;
};

export default function SidebarPhotoTemplate({ data, colorTheme, showPhoto = true }) {
  const p = data?.personalInfo || {};
  const rootStyle = colorTheme ? { '--template-primary': colorTheme, '--template-accent': colorTheme } : {};

  return (
    <div className={`${styles.resumeContainer} ${styles.sidebarPhoto}`} style={rootStyle}>
      <div className={styles.spSidebar}>
        <div className={styles.spShape}></div>
        {showPhoto && p.image ? (
          <div className={styles.spImageContainer}>
            <img 
              src={p.image} 
              alt={p.fullName} 
              className={styles.spImage} 
            />
          </div>
        ) : <div style={{ height: '80px', position: 'relative', zIndex: 2 }}></div>}

        <div style={{ marginTop: '20px' }}>
          {p.phone && <div className={styles.spContactItem}>📞 {p.phone}</div>}
          {p.email && <div className={styles.spContactItem}>📧 {p.email}</div>}
          {p.location && <div className={styles.spContactItem}>📍 {p.location}</div>}
          {p.linkedin && <div className={styles.spContactItem}>🔗 {renderLink(p.linkedin)}</div>}
        </div>

        {data?.skills?.length > 0 && (
          <>
            <div className={styles.spSectionTitle}>Skills</div>
            {data.skills.map((s, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>{s.category}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>{Array.isArray(s.items) ? s.items.join(', ') : s.items}</div>
              </div>
            ))}
          </>
        )}

        {data?.languages?.length > 0 && (
          <>
            <div className={styles.spSectionTitle}>Languages</div>
            {data.languages.map((l, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>{l.language}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>{l.proficiency}</div>
              </div>
            ))}
          </>
        )}

        {data?.awards?.length > 0 && (
          <>
            <div className={styles.spSectionTitle}>Awards</div>
            {data.awards.map((a, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>{a.title}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)' }}>{a.issuer}</div>
              </div>
            ))}
          </>
        )}

        {data?.achievements?.length > 0 && (
          <>
            <div className={styles.spSectionTitle}>Achievements</div>
            {data.achievements.map((a, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>{a.title}</div>
              </div>
            ))}
          </>
        )}

        {data?.publications?.length > 0 && (
          <>
            <div className={styles.spSectionTitle}>Publications</div>
            {data.publications.map((p, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>{p.title}</div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className={styles.spMain}>
        <div className={styles.spHeader}>
          <div className={styles.spName}>{p.fullName}</div>
          <div className={styles.spTitle}>{p.title}</div>
          {p.summary && <div className={styles.spSummary}>{p.summary}</div>}
        </div>

        {data?.experience?.length > 0 && (
          <>
            <div className={styles.spMainSectionTitle}>Experience</div>
            {data.experience.map((e, i) => (
              <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.position}</div>
                  <div style={{ fontSize: '9px', color: '#666' }}>{e.startDate} - {e.current ? 'Present' : e.endDate}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'var(--template-primary)' }}>{e.company} {e.location && `| ${e.location}`}</div>
                
                {e.highlights?.length > 0 && (
                  <ul className={styles.highlights} style={{ marginTop: '8px' }}>
                    {e.highlights.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
                {!e.highlights?.length && e.description && (
                  <ul className={styles.highlights} style={{ marginTop: '8px' }}>
                    {e.description.split('\n').filter(Boolean).map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {data?.education?.length > 0 && (
          <>
            <div className={styles.spMainSectionTitle}>Education</div>
            {data.education.map((e, i) => (
              <div key={i} className={styles.bdEntry}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#1a1a1a' }}>{e.degree}</div>
                  <div style={{ fontSize: '9px', color: '#666' }}>{e.startDate} - {e.endDate}</div>
                </div>
                <div style={{ fontSize: '10px', color: '#475569' }}>{e.institution}</div>
              </div>
            ))}
          </>
        )}

        {data?.projects?.length > 0 && (
          <>
            <div className={styles.spMainSectionTitle}>Projects</div>
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

        {data?.certifications?.length > 0 && (
          <>
            <div className={styles.spMainSectionTitle}>Certifications</div>
            {data.certifications.map((c, i) => (
              <div key={i} className={styles.bdEntry} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{c.name}</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>{c.issuer} • {c.date}</div>
              </div>
            ))}
          </>
        )}

        {data?.volunteerExperience?.length > 0 && (
          <>
            <div className={styles.spMainSectionTitle}>Volunteer Experience</div>
            {data.volunteerExperience.map((v, i) => (
              <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{v.role}</div>
                  <div style={{ fontSize: '9px', color: '#666' }}>{v.startDate} - {v.current ? 'Present' : v.endDate}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'var(--template-primary)' }}>{v.organization}</div>
                {v.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px' }}>{v.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.internships?.length > 0 && (
          <>
            <div className={styles.spMainSectionTitle}>Internships</div>
            {data.internships.map((e, i) => (
              <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{e.position}</div>
                  <div style={{ fontSize: '9px', color: '#666' }}>{e.startDate} - {e.current ? 'Present' : e.endDate}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '10px', color: 'var(--template-primary)' }}>{e.company} {e.location && `| ${e.location}`}</div>
                {e.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px' }}>{e.description}</div>}
              </div>
            ))}
          </>
        )}

        {data?.customSections?.length > 0 && data.customSections.map((cs, cIdx) => (
          <div key={`cs-${cIdx}`}>
            <div className={styles.spMainSectionTitle}>{cs.title || 'Additional Info'}</div>
            {cs.items?.map((item, i) => (
              <div key={i} className={styles.bdEntry} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11px' }}>{item.name}</div>
                  {item.date && <div style={{ fontSize: '9px', color: '#666' }}>{item.date}</div>}
                </div>
                {item.subtitle && <div style={{ fontWeight: 600, fontSize: '10px', color: 'var(--template-primary)' }}>{item.subtitle}</div>}
                {item.description && <div style={{ fontSize: '9px', color: '#475569', marginTop: '4px' }}>{item.description}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
