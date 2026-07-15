'use client';

import { useState } from 'react';
import styles from '@/styles/PromptMode.module.css';

/**
 * PromptMode Component
 * Free-text input for AI-powered resume generation
 */

const examplePrompts = [
  "I'm a software engineer with 3 years of experience...",
  "Graphic designer specializing in brand identity...",
  "Recent CS graduate looking for entry-level roles...",
  "Marketing manager with 7 years in B2B SaaS...",
];

export default function PromptMode({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim().length >= 20) {
      onSubmit(prompt);
    }
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
  };

  return (
    <div className={styles.promptMode}>
      <h3 className={styles.promptLabel}>
        <span>✨</span> Describe Yourself
      </h3>
      <p className={styles.promptHint}>
        Tell us about your background, experience, skills, and education in your own words.
        Our AI will structure it into a professional resume. The more detail you provide, the better!
      </p>

      <textarea
        className={styles.promptTextarea}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="I am a full-stack developer with 5 years of experience. I graduated from UC Berkeley with a BS in Computer Science in 2019. I currently work at TechCorp as a Senior Developer where I lead a team of 5 and build scalable web applications using React, Node.js, and AWS. Previously I worked at StartupXYZ where I developed e-commerce platforms. My skills include JavaScript, Python, React, Node.js, PostgreSQL, MongoDB, Docker, and Kubernetes. I'm AWS certified and passionate about building great user experiences..."
        disabled={loading}
      />

      <div className={styles.promptFooter}>
        <span className={styles.charCount}>
          {prompt.length} characters {prompt.length < 20 && prompt.length > 0 && '(minimum 20)'}
        </span>
        <button
          className={styles.generateBtn}
          onClick={handleSubmit}
          disabled={prompt.trim().length < 20 || loading}
        >
          <span className={styles.sparkle}>✨</span>
          {loading ? 'Generating...' : 'Generate Resume with AI'}
        </button>
      </div>

      <div className={styles.examples}>
        <div className={styles.examplesTitle}>💡 Try an example:</div>
        <div className={styles.exampleChips}>
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              className={styles.exampleChip}
              onClick={() => handleExampleClick(example)}
              disabled={loading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
