'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'default', name: 'Default Light', color: '#2C5E3E', isDark: false },
  { id: 'dark-blue', name: 'Dark Blue', color: '#0f172a', isDark: true },
  { id: 'light-emerald', name: 'Light Emerald', color: '#059669', isDark: false },
  { id: 'dark-emerald', name: 'Dark Emerald', color: '#022c22', isDark: true },
  { id: 'light-purple', name: 'Light Purple', color: '#7c3aed', isDark: false },
  { id: 'dark-purple', name: 'Dark Purple', color: '#2e1065', isDark: true },
  { id: 'light-rose', name: 'Light Rose', color: '#e11d48', isDark: false },
  { id: 'dark-rose', name: 'Dark Rose', color: '#4c0519', isDark: true },
  { id: 'light-amber', name: 'Light Amber', color: '#d97706', isDark: false },
  { id: 'dark-amber', name: 'Dark Amber', color: '#451a03', isDark: true },
  { id: 'light-teal', name: 'Light Teal', color: '#0d9488', isDark: false },
  { id: 'dark-teal', name: 'Dark Teal', color: '#134e4a', isDark: true },
  { id: 'midnight', name: 'Midnight', color: '#09090b', isDark: true },
  { id: 'dracula', name: 'Dracula', color: '#282a36', isDark: true },
  { id: 'synthwave', name: 'Synthwave', color: '#171520', isDark: true },
  { id: 'coffee', name: 'Coffee', color: '#20161f', isDark: true },
  { id: 'mint', name: 'Mint', color: '#f2fcf5', isDark: false },
  { id: 'cherry', name: 'Cherry', color: '#fff0f3', isDark: false },
  { id: 'ocean', name: 'Ocean', color: '#f0f8ff', isDark: false },
  { id: 'cyberpunk', name: 'Cyberpunk', color: '#fef08a', isDark: false },
  { id: 'autumn', name: 'Autumn', color: '#fef3c7', isDark: false }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage on mount
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    setMounted(true);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    if (newTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
