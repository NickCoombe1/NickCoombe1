"use client";
import { ReactNode } from "react";
import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import FigmaComponent from "@/app/components/common/testFile";
import Button from "./button";

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
    <header className="w-full h-20 px-10 py-6 justify-between items-center inline-flex">
      <div className="w-[104px] h-[25.36px] relative">
        {" "}
        <NextImage
          src="/dfs-logo-light.svg"
          className="w-[92.61px] h-[25.36px] left-0 top-0 absolute dark:hidden"
          alt="dfsFPL"
          width={24}
          height={24}
          onClick={handleBackClick}
        />
        <NextImage
          src="/dfs-logo-dark.svg"
          className="w-[92.61px] h-[25.36px] left-0 top-0 absolute hidden dark:block"
          alt="dfsFPL"
          width={24}
          height={24}
          onClick={handleBackClick}
        />
      </div>
      <div className="justify-start items-center gap-2 flex">
        <Button label="MY LEAGUES">
          {" "}
          <Link href="/about">About</Link>
        </Button>
        <Button label="ABOUT">
          {" "}
          <Link href="/about">About</Link>
        </Button>
        <ThemeToggle initialTheme={initialTheme} />
      </div>
    </header>
  );
}
