import React from 'react';

/**
 * Universal ATS-Friendly Template
 * A highly robust, clean, single-column design that handles all user data dynamically.
 */
export default function UniversalATSTemplate({ data }) {
  const p = data?.personalInfo || {};
  const summary = data?.summary || p.summary;
  
  // Contact details parsing
  const renderLink = (url) => {
    if (!url) return null;
    const href = url.startsWith('http') ? url : 'https://' + url;
    return <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#000', textDecoration: 'none' }}>{url.replace(/^https?:\/\//, '')}</a>;
  };

  const contactItems = [
    p.email, 
    p.phone, 
    p.location, 
    p.linkedin ? renderLink(p.linkedin) : null, 
    p.website ? renderLink(p.website) : null,
    p.github ? renderLink(p.github) : null,
  ].filter(Boolean);

  // Common Section Component
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '16px' }}>
      <h2 style={{ 
        fontSize: '14px', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        borderBottom: '1px solid #000', 
        paddingBottom: '2px', 
        marginBottom: '8px',
        color: '#000'
      }}>{title}</h2>
      {children}
    </div>
  );

  // Reusable Bullet List Formatter
  const BulletList = ({ text, arr }) => {
    if (arr && arr.length > 0) {
      return (
        <ul style={{ margin: 0, paddingLeft: '18px', marginTop: '4px' }}>
          {arr.map((item, i) => <li key={i} style={{ fontSize: '11px', marginBottom: '2px', lineHeight: '1.4' }}>{item}</li>)}
        </ul>
      );
    }
    if (text) {
      return (
        <ul style={{ margin: 0, paddingLeft: '18px', marginTop: '4px' }}>
          {text.split('\n').filter(Boolean).map((item, i) => (
            <li key={i} style={{ fontSize: '11px', marginBottom: '2px', lineHeight: '1.4' }}>{item.trim()}</li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, Helvetica, sans-serif', 
      color: '#000',
      padding: '40px 50px',
      lineHeight: '1.5',
      width: '100%',
      minHeight: '100%',
      backgroundColor: '#fff'
    }}>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', textTransform: 'uppercase' }}>{p.fullName}</h1>
        {p.title && <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>{p.title}</div>}
        
        {contactItems.length > 0 && (
          <div style={{ fontSize: '11px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && <span style={{ margin: '0 12px 0 0' }}>|</span>}
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* PROFESSIONAL SUMMARY */}
      {summary && (
        <Section title="Professional Summary">
          <div style={{ fontSize: '11px', lineHeight: '1.5' }}>{summary}</div>
        </Section>
      )}

      {/* SKILLS */}
      {data?.skills?.length > 0 && (
        <Section title="Skills">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.skills.map((s, i) => (
              <div key={i} style={{ fontSize: '11px' }}>
                <strong>{s.category}:</strong> {Array.isArray(s.items) ? s.items.join(', ') : s.items}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* EXPERIENCE */}
      {data?.experience?.length > 0 && (
        <Section title="Professional Experience">
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12px' }}>{e.position}</strong>
                <span style={{ fontSize: '11px' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>
                <span>{e.company}</span>
                {e.location && <span>{e.location}</span>}
              </div>
              <BulletList text={e.description} arr={e.highlights} />
            </div>
          ))}
        </Section>
      )}

      {/* EDUCATION */}
      {data?.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((e, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12px' }}>{e.institution}</strong>
                <span style={{ fontSize: '11px' }}>{e.startDate} – {e.endDate}</span>
              </div>
              <div style={{ fontSize: '11px' }}>
                {e.degree} in {e.field} {e.gpa && `| GPA: ${e.gpa}`}
              </div>
              {e.location && <div style={{ fontSize: '11px', color: '#555' }}>{e.location}</div>}
              {e.description && <div style={{ fontSize: '11px', marginTop: '2px' }}>{e.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {/* PROJECTS */}
      {data?.projects?.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '12px' }}>
                  <strong>{proj.name}</strong> 
                  {proj.link && <span style={{ marginLeft: '6px', fontSize: '10px' }}>({renderLink(proj.link)})</span>}
                </div>
              </div>
              <BulletList text={proj.description} />
              {proj.technologies?.length > 0 && (
                <div style={{ fontSize: '10px', marginTop: '4px', fontStyle: 'italic' }}>
                  Technologies: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* CERTIFICATIONS */}
      {data?.certifications?.length > 0 && (
        <Section title="Certifications">
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {data.certifications.map((c, i) => (
              <li key={i} style={{ fontSize: '11px', marginBottom: '2px' }}>
                <strong>{c.name}</strong> — {c.issuer} {c.date && `(${c.date})`}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* VOLUNTEER EXPERIENCE */}
      {data?.volunteerExperience?.length > 0 && (
        <Section title="Volunteer Experience">
          {data.volunteerExperience.map((v, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12px' }}>{v.role}</strong>
                <span style={{ fontSize: '11px' }}>{v.startDate} – {v.current ? 'Present' : v.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>{v.organization}</div>
              <BulletList text={v.description} />
            </div>
          ))}
        </Section>
      )}

      {/* INTERNSHIPS */}
      {data?.internships?.length > 0 && (
        <Section title="Internships">
          {data.internships.map((e, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12px' }}>{e.position}</strong>
                <span style={{ fontSize: '11px' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>
                <span>{e.company}</span>
                {e.location && <span>{e.location}</span>}
              </div>
              <BulletList text={e.description} />
            </div>
          ))}
        </Section>
      )}

      {/* AWARDS */}
      {data?.awards?.length > 0 && (
        <Section title="Awards">
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {data.awards.map((a, i) => (
              <li key={i} style={{ fontSize: '11px', marginBottom: '2px' }}>
                <strong>{a.title}</strong> — {a.issuer} {a.date && `(${a.date})`}
                {a.description && <div>{a.description}</div>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ACHIEVEMENTS */}
      {data?.achievements?.length > 0 && (
        <Section title="Achievements">
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {data.achievements.map((a, i) => (
              <li key={i} style={{ fontSize: '11px', marginBottom: '2px' }}>
                <strong>{a.title}</strong> {a.date && `(${a.date})`}
                {a.description && <div>{a.description}</div>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* PUBLICATIONS */}
      {data?.publications?.length > 0 && (
        <Section title="Publications">
          {data.publications.map((p, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '12px' }}>
                <strong>{p.title}</strong> 
                {p.link && <span style={{ marginLeft: '6px', fontSize: '10px' }}>({renderLink(p.link)})</span>}
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>{p.publisher} {p.date && `— ${p.date}`}</div>
              {p.description && <div style={{ fontSize: '11px' }}>{p.description}</div>}
            </div>
          ))}
        </Section>
      )}

      {/* LANGUAGES */}
      {data?.languages?.length > 0 && (
        <Section title="Languages">
          <div style={{ fontSize: '11px' }}>
            {data.languages.map((l, i) => (
              <span key={i}>
                <strong>{l.language}</strong> ({l.proficiency}){i < data.languages.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* CUSTOM SECTIONS */}
      {data?.customSections?.length > 0 && data.customSections.map((cs, cIdx) => (
        <Section key={`cs-${cIdx}`} title={cs.title || 'Additional Information'}>
          {cs.items?.map((item, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12px' }}>{item.name}</strong>
                <span style={{ fontSize: '11px' }}>{item.date}</span>
              </div>
              {item.subtitle && <div style={{ fontStyle: 'italic', fontSize: '11px', marginBottom: '2px' }}>{item.subtitle}</div>}
              <BulletList text={item.description} />
            </div>
          ))}
        </Section>
      ))}

    </div>
  );
}
