"use client";
import { ReactNode } from "react";
import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import FigmaComponent from "@/app/components/common/testFile";

interface HeaderProps {
  initialTheme: string;
  headerText?: string;
}
export default function Header({
  initialTheme,
  headerText,
}: HeaderProps): ReactNode {
  const params = useParams();
  const router = useRouter();
  const teamID = params?.teamID;
  const handleBackClick = () => {
    if (teamID) router.push(`/team/${teamID}`);
    else {
      router.back();
    }
  };
  return (
    <header>
      <FigmaComponent />
      <nav className="border-gray-200 dark:bg-secondary mb-6">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <NextImage
              src="/soccer-ball-light.svg"
              className="mr-3 h-6 sm:h-9 dark:hidden"
              alt="soccerBallFPl"
              width={24}
              height={24}
              onClick={handleBackClick}
            />
            <NextImage
              src="/soccer-ball-dark.svg"
              className="mr-3 h-6 sm:h-9 hidden dark:block"
              alt="soccerBallFPl"
              width={24}
              height={24}
              onClick={handleBackClick}
            />
            <span
              className="self-center text-xl font-semibold whitespace-nowrap text-gray-700 dark:text-white"
              onClick={handleBackClick}
            >
              {headerText ? headerText : "FPL Scoreboard"}
            </span>
          </div>{" "}
          <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center">
            <li
              className="hidden lg:block  py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white hover:underline underline-offset-4"
              aria-current="page"
            >
              <Link href="/about">About</Link>
            </li>
            <ThemeToggle initialTheme={initialTheme} />
          </ul>
        </div>
      </nav>
    </header>
  );
}
