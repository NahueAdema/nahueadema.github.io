import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { isThemeId } from "./themes";
import type { ThemeId } from "./themes";
import { ThemeContext } from "./context";

const STORAGE_KEY = "portfolio-theme";

const initialTheme = (): ThemeId => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && isThemeId(saved)) return saved;
  } catch {
    /* ignore */
  }
  return "default";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}