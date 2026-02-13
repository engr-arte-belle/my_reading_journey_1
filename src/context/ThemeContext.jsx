import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme-mode") || "manual";  // manual (default) or system theme
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";  // light (default) or dark theme
  });

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // localStorage.setItem("theme", theme);
  }, [theme]);

  // System theme detection
  useEffect(() => {
    if (mode !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applySystemTheme = () => {
      setTheme(media.matches ? "dark" : "light");
    };

    applySystemTheme();
    media.addEventListener("change", applySystemTheme);

    return () => media.removeEventListener("change", applySystemTheme);
  }, [mode]);

  // Persist
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("theme-mode", mode);
  }, [theme, mode]);

  const toggleManualTheme = () => {
    setMode("manual");
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const useSystemTheme = () => {
    setMode("system");
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleManualTheme, useSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
// export function useTheme() {
//   return useContext(ThemeContext);
// }