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
    <div className="flex flex-row items-center p-1 gap-1 w-[82px] h-[43px] bg-[rgba(0,0,0,0.15)] shadow-[0_0_100px_rgba(255,255,255,0.18)] backdrop-blur-[20px] rounded-lg">
      <Button
        onClick={toggleTheme}
        className="flex flex-row justify-center items-center  gap-2 w-[35px] h-[35px] bg-white rounded-md"
      >
        <LightMode mode={"light"}></LightMode>
      </Button>

      <Button
        onClick={toggleTheme}
        className="flex flex-row justify-center items-center  gap-2 w-[35px] h-[35px] bg-gradient-to-l from-[rgba(205,255,255,0.3)] to-[rgba(255,212,212,0.3)] rounded-md"
      >
        <DarkMode mode={"light"}></DarkMode>
      </Button>
    </div>
  );
}
