import React from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: ThemeContextType['theme']) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => null,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  storageKey?: string;
  defaultTheme?: ThemeContextType['theme'];
}

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-theme' }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeContextType['theme']>(
    () => (localStorage.getItem(storageKey) as ThemeContextType['theme']) || defaultTheme,
  );

  const value = {
    theme,
    setTheme: (theme: ThemeContextType['theme']) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    // if theme is system
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme has to be used within <ThemeContext.Provider>');
  }

  return context;
}
