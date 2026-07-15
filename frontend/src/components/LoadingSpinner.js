import styles from '@/styles/LoadingSpinner.module.css';

/**
 * LoadingSpinner Component
 * Full-screen loading overlay with spinner and status text
 */
export default function LoadingSpinner({ text = 'Generating your resume', subtext = 'This may take a few seconds' }) {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner}>
        <div className={styles.spinnerRing} />
        <div className={styles.spinnerIcon}>✨</div>
      </div>
      <div className={styles.spinnerText}>
        {text}
        <span className={styles.spinnerDots}>
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className={styles.spinnerSubtext}>{subtext}</div>
    </div>
  );
}
