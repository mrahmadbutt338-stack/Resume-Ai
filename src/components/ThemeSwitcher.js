'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from '@/styles/ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { theme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.switcherWrapper} ref={wrapperRef}>
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>Choose Theme</div>
          <div className={styles.panelSubtitle}>Personalize your experience</div>
        </div>
        
        <div className={styles.grid}>
          {themes.map((t) => (
            <button
              key={t.id}
              className={`${styles.swatchBtn} ${theme === t.id ? styles.swatchActive : ''}`}
              style={{ backgroundColor: t.color }}
              onClick={() => changeTheme(t.id)}
              aria-label={`Select ${t.name} theme`}
            >
              <span className={styles.tooltip}>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        className={styles.toggleBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme panel"
      >
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      </button>
    </div>
  );
}
