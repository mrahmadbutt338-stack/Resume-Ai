import styles from '@/styles/ProgressBar.module.css';

/**
 * ProgressBar Component
 * Multi-step progress indicator with animated dots and fill line
 */

const steps = [
  { label: 'Personal', icon: '👤' },
  { label: 'Education', icon: '🎓' },
  { label: 'Experience', icon: '💼' },
  { label: 'Skills', icon: '⚡' },
  { label: 'Projects', icon: '🚀' },
  { label: 'Certs', icon: '📜' }
];

export default function ProgressBar({ currentStep }) {
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressSteps}>
        <div className={styles.progressLine}>
          <div
            className={styles.progressLineFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {steps.map((step, index) => (
          <div key={index} className={styles.progressStep}>
            <div
              className={`${styles.progressDot} ${
                index === currentStep ? styles.progressDotActive :
                index < currentStep ? styles.progressDotCompleted : ''
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span
              className={`${styles.progressLabel} ${
                index === currentStep ? styles.progressLabelActive : ''
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
