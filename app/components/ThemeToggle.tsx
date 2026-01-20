import {useEffect, useMemo, useState} from 'react';
import {Moon, Sun, Monitor, Check} from 'lucide-react';

type ThemeMode = 'dark' | 'light' | 'system';

function getSystemPrefersLight() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: light)').matches;
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const resolved = theme === 'system' ? (getSystemPrefersLight() ? 'light' : 'dark') : theme;
  root.setAttribute('data-theme', resolved);
  (root.style as any).colorScheme = resolved === 'light' ? 'light' : 'dark';
}

function readInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // Ignore storage read errors (private mode, blocked access, etc.)
  }
  return 'system';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => readInitialTheme());
  const index = useMemo(() => (theme === 'light' ? 0 : theme === 'system' ? 1 : 2), [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage write errors (private mode, blocked access, etc.)
    }
    applyTheme(theme);

    if (theme === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: light)');
      const handler = () => applyTheme('system');
      try {
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
      } catch {
        // Safari fallback
        mql.addListener(handler);
        return () => mql.removeListener(handler);
      }
    }
  }, [theme]);

  function cycle() {
    setTheme((prev) => (prev === 'dark' ? 'light' : prev === 'light' ? 'system' : 'dark'));
  }

  const label = theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'System';
  const offsets = [3, 26, 49]; // light, system, dark positions for the thumb

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <button
        type="button"
        onClick={cycle}
        className="theme-switch"
        aria-label={`Theme: ${label} — click to change`}
        title={`Theme: ${label} — click to change`}
      >
        <div className="theme-switch-track">
          <Sun size={14} className={`theme-icon ${index === 0 ? 'is-active' : ''}`} aria-hidden />
          <Monitor size={14} className={`theme-icon ${index === 1 ? 'is-active' : ''}`} aria-hidden />
          <Moon size={14} className={`theme-icon ${index === 2 ? 'is-active' : ''}`} aria-hidden />
          <div className="theme-thumb" style={{transform: `translateX(${offsets[index]}px)`}} />
        </div>
      </button>
      <div className="theme-dropdown" role="menu" aria-label="Theme options">
        <button
          type="button"
          role="menuitemradio"
          aria-checked={theme === 'light'}
          className={`theme-dropdown-item ${theme === 'light' ? 'is-selected' : ''}`}
          onClick={() => setTheme('light')}
        >
          <Sun size={14} aria-hidden />
          <span>Light</span>
          {theme === 'light' ? <Check size={14} aria-hidden /> : <span className="check-placeholder" />}
        </button>
        <button
          type="button"
          role="menuitemradio"
          aria-checked={theme === 'system'}
          className={`theme-dropdown-item ${theme === 'system' ? 'is-selected' : ''}`}
          onClick={() => setTheme('system')}
        >
          <Monitor size={14} aria-hidden />
          <span>System</span>
          {theme === 'system' ? <Check size={14} aria-hidden /> : <span className="check-placeholder" />}
        </button>
        <button
          type="button"
          role="menuitemradio"
          aria-checked={theme === 'dark'}
          className={`theme-dropdown-item ${theme === 'dark' ? 'is-selected' : ''}`}
          onClick={() => setTheme('dark')}
        >
          <Moon size={14} aria-hidden />
          <span>Dark</span>
          {theme === 'dark' ? <Check size={14} aria-hidden /> : <span className="check-placeholder" />}
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;
