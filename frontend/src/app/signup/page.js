'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import styles from '@/styles/Auth.module.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.authTitle}>Create an account</h1>
          <p className={styles.authSubtitle}>
            Already have an account? <Link href="/login" className={styles.authLink}>Sign in now →</Link>
          </p>
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>Full Name</label>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.input}
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>Email Address</label>
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                className={styles.input}
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>Password</label>
            </div>
            <div className={styles.inputWrapper} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className={styles.inputHint}>Must be at least 6 characters long.</div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>


      </div>
    </div>
  );
}
