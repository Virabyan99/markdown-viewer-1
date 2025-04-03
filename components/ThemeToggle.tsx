"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return <button aria-label="Toggle dark mode" className="p-2"><Sun /></button>;
  }

  return (
    <button aria-label="Toggle dark mode" onClick={toggleTheme} className="p-2">
      {resolvedTheme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}