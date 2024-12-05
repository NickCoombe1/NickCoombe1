"use client";

import React from "react";
import { Button } from "@headlessui/react";
import LightMode from "@/app/components/svgs/lightMode";
import DarkMode from "@/app/components/svgs/darkMode";
import { useTheme } from "@/app/hooks/getTheme";

export default function ThemeToggle(): React.ReactNode {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-[43px] p-1 bg-graphics-light-depth dark:bg-graphics-dark-depth rounded-lg shadow backdrop-blur-2xl justify-start items-center gap-1 inline-flex">
      <div className="bg-button-light-bg dark:bg-transparent w-[35px] h-[35px] px-3.5 py-3 rounded justify-center items-center gap-2.5 inline-flex ">
        <Button onClick={toggleTheme}>
          <LightMode mode={theme} />
        </Button>
      </div>
      <div className="w-[35px] h-[35px] px-3.5 py-3 dark:bg-button-dark-bg dark:bg-button-dark-secondary rounded justify-center items-center gap-2.5 inline-flex">
        <Button onClick={toggleTheme}>
          <DarkMode mode={theme} />
        </Button>
      </div>
    </div>
  );
}
