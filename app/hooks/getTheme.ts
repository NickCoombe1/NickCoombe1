"use client";

import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<string>("light"); // Default to "light"

  useEffect(() => {
    const root = window.document.documentElement;

    // Initialize theme based on the current root class
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    setTheme(currentTheme);

    // Observe class changes on the root element
    const observer = new MutationObserver(() => {
      const newTheme = root.classList.contains("dark") ? "dark" : "light";
      setTheme(newTheme);
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup the observer
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove hidden class after theme is applied
    root.classList.remove("hidden");
  }, []);
  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";

    root.classList.remove(theme);
    root.classList.add(newTheme);

    document.cookie = `theme=${newTheme}; path=/; SameqwSite=Lax`;

    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
