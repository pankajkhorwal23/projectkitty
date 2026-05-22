import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeModeSwitch() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <button type="button" aria-label="Toggle theme" onClick={() => setIsDark((prev) => !prev)}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
