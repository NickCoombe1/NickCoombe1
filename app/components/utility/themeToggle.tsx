"use client";

import { ReactNode, useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

interface ThemeToggleProps {
  initialTheme: string;
}

export default function ThemeToggle({
  initialTheme,
}: ThemeToggleProps): ReactNode {
  const [theme, setTheme] = useState<string>(initialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme); // Add the initial theme class to the root
  }, [theme]);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";

    root.classList.remove(theme);
    root.classList.add(newTheme);

    document.cookie = `theme=${newTheme}; path=/; SameSite=Lax`;

    setTheme(newTheme);
  };

  return (
    <Button
      className="dark:text-white text-gray-700 inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold hover:outline outline-2"
      onClick={toggleTheme}
    >
      <MoonIcon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <SunIcon className="h-5 w-5 hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
