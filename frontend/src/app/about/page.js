'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/Pages.module.css';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '120px' }}>
          <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '24px' }}>About Us</h1>
              <p style={{ fontSize: '1.125rem', color: '#64748B', maxWidth: '800px', margin: '0 auto' }}>
                We believe that everyone deserves a resume that truly reflects their potential. 
                Our AI-powered platform makes professional resume creation accessible, fast, and beautiful.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div style={{ background: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>Our Mission</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  To empower job seekers globally by providing cutting-edge AI tools that translate 
                  experience and skills into compelling professional stories, removing the friction from the job search process.
                </p>
              </div>
              <div style={{ background: '#EAF0EC', padding: '32px', borderRadius: '16px', border: '1px solid #BFDBFE' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#1E422B' }}>Our Vision</h3>
                <p style={{ color: '#1E3A8A', lineHeight: 1.6 }}>
                  A world where talent is never overlooked because of formatting struggles. We envision a seamless bridge 
                  between great candidates and great opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
