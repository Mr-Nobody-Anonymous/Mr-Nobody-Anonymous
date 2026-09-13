import { useState, useEffect } from 'react';

export type ThemeName = 'green' | 'cyan' | 'crimson';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return 'green';
    const saved = localStorage.getItem('mr_nobody_theme') as ThemeName;
    return (saved === 'green' || saved === 'cyan' || saved === 'crimson') ? saved : 'green';
  });

  const [crtEnabled, setCrtEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('mr_nobody_crt') === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mr_nobody_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (crtEnabled) {
      document.body.classList.add('crt-enabled');
    } else {
      document.body.classList.remove('crt-enabled');
    }
    localStorage.setItem('mr_nobody_crt', String(crtEnabled));
  }, [crtEnabled]);

  const toggleCrt = () => setCrtEnabled(prev => !prev);

  return {
    theme,
    setTheme,
    crtEnabled,
    toggleCrt
  };
}
