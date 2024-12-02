"use client";
import { ReactNode } from "react";
import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";
import NextImage from "next/image";
import { useParams, useRouter } from "next/navigation";
import Button from "./button";
import About from "../svgs/about";
import Menu from "../svgs/menu";
interface HeaderProps {
  initialTheme: string;
}
export default function Header({ initialTheme }: HeaderProps): ReactNode {
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
      <div className="w-full h-20 px-10 py-6 justify-between items-center inline-flex hidden md:flex">
        <div className="w-[104px] h-[25.36px] relative ">
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
      </div>
      <div className="md:hidden">
        <div className="w-full h-20 p-6 justify-between items-center inline-flex">
          <ThemeToggle initialTheme={initialTheme} />
          <div className="w-[72px] h-[17.56px] relative">
            <div className="w-[64.12px] h-[17.56px] left-0 top-0 absolute">
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
          </div>
          <div className="justify-start items-center gap-1 flex">
            <div className="w-[35px] h-[35px] px-3.5 py-3 bg-button-light-bg-20 bg-graphics-light-depth bg-button-light-secondary dark:bg-button-dark-bg dark:bg-button-dark-secondary bg-blend-overlay  rounded justify-center items-center gap-2.5 flex">
              <div className="w-5 h-5 relative dark:hidden">
                <Link href="/about">
                  <About mode={"light"} />
                </Link>
              </div>
              <div className="w-5 h-5 relative hidden dark:block">
                <Link href="/about">
                  <About mode={"dark"} />{" "}
                </Link>
              </div>
            </div>
            <div className="w-[35px] h-[35px] px-3.5 py-3 bg-button-light-bg-20 bg-graphics-light-depth bg-button-light-secondary dark:bg-button-dark-bg dark:bg-button-dark-secondary bg-blend-overlay  rounded flex-col justify-center items-center gap-[5px] inline-flex">
              {" "}
              <div className="w-5 h-5 relative flex justify-center items-center dark:hidden">
                <Menu mode={"light"} />
              </div>
              <div className="w-5 h-5 relative flex justify-center items-center hidden dark:flex">
                {" "}
                <Menu mode={"dark"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
