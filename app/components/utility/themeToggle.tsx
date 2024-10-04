"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ThemeToggle(): ReactNode {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(initialTheme);
    root.classList.add(initialTheme);
  }, []);
  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";

    root.classList.remove(theme as string);
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };
  //TODO change to icon
  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-800 p-2 rounded"
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
