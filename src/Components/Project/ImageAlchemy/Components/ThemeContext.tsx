// ThemeContext.tsx
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Get browser theme if no value is in localStorage
  const getInitialTheme = (): Theme => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) return storedTheme;

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light'; // Default to system theme
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Sync theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Apply dark mode class conditionally */}
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  );
};
