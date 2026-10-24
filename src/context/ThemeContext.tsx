import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'botanical-light' | 'claymorphic' | 'glassmorphic' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'project-graveyard-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (
        saved === 'light' ||
        saved === 'dark' ||
        saved === 'botanical-light' ||
        saved === 'claymorphic' ||
        saved === 'glassmorphic'
      ) {
        return saved as Theme;
      }
    } catch {
      // ignore
    }
    return 'claymorphic'; // Warm editorial palette for first-time visitors
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'botanical-light', 'claymorphic', 'glassmorphic', 'light');
    root.classList.add(theme);

    // Also set data-theme attribute for CSS targeting
    root.setAttribute('data-theme', theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'dark') return 'botanical-light';
      if (prev === 'botanical-light') return 'claymorphic';
      if (prev === 'claymorphic') return 'glassmorphic';
      if (prev === 'glassmorphic') return 'light';
      return 'dark';
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'botanical-light',
      toggleTheme: () => {},
      setTheme: () => {},
    };
  }
  return context;
};
