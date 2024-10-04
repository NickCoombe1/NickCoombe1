"use client";

import { ReactNode, useEffect, useState } from "react";
import { Button } from "@headlessui/react";

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
    <Button
      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      onClick={toggleTheme}
    >
      {`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    </Button>
  );
}
