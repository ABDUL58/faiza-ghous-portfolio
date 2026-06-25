import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored !== "light";
    if (dark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`max-sm:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${className}`}
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        color: "var(--color-foreground)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {isDarkMode ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} style={{ color: "var(--color-primary)" }} />
      )}
    </button>
  );
}
