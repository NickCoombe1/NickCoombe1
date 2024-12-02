"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import LightMode from "@/app/components/svgs/lightMode";
import DarkMode from "@/app/components/svgs/darkMode";

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
    <div className="h-[43px] p-1 bg-black/5 dark:bg-black/20 rounded-lg shadow backdrop-blur-2xl justify-start items-center gap-1 inline-flex">
      <div className="bg-button-light-bg dark:bg-transparent w-[35px] h-[35px] px-3.5 py-3 rounded justify-center items-center gap-2.5 inline-flex ">
        <Button onClick={toggleTheme}>
          <LightMode mode={theme}></LightMode>
        </Button>
      </div>
      <div className="w-[35px] h-[35px] px-3.5 py-3 dark:bg-button-dark-bg dark:bg-button-dark-secondary rounded justify-center items-center gap-2.5 inline-flex">
        <Button onClick={toggleTheme}>
          <DarkMode mode={theme}></DarkMode>
        </Button>
      </div>
    </div>
  );
}
