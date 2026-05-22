import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./ThemeModeSwitch.module.css";

export function ThemeModeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <button
      type="button"
      className={styles.themeSwitch}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
