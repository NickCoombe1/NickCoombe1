"use client";
import { ReactNode, useState } from "react";
import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";

interface HeaderProps {
  initialTheme: string;
}
export default function Header({ initialTheme }: HeaderProps): ReactNode {
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 dark:bg-gray-800 mb-6">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            {isAnimating ? (
              <img
                src="/hippo-solid-animate.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Nick Logo"
                onClick={toggleAnimation}
              />
            ) : (
              <img
                src="/hippo-solid.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Nick Logo"
                onClick={toggleAnimation}
              />
            )}
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Nick Coombe
            </span>
          </div>{" "}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center">
              <li
                className="block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white hover:underline underline-offset-4"
                aria-current="page"
              >
                <Link href="/about">About</Link>
              </li>
              <ThemeToggle initialTheme={initialTheme} />
            </ul>
          </div>{" "}
        </div>
      </nav>
    </header>
  );
}
