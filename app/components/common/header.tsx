"use client";
import { ReactNode } from "react";
import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StyledButton from "./styledButton";
import About from "../svgs/about";
import Menu from "../svgs/menu";
import Logo from "@/app/components/svgs/logo";
import { useTheme } from "@/app/hooks/getTheme";

export default function Header(): ReactNode {
  const params = useParams();
  const router = useRouter();
  const teamID = params?.teamID;
  const { theme } = useTheme();
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
          <div onClick={handleBackClick}>
            <Logo mode={theme} />
          </div>
        </div>
        <div className="justify-start items-center gap-2 flex">
          <StyledButton label="MY LEAGUES" secondary={true} type={"button"}>
            {" "}
            <Link href="/about">About</Link>
          </StyledButton>
          <StyledButton label="ABOUT" secondary={true} type={"button"}>
            {" "}
            <Link href="/about">About</Link>
          </StyledButton>
          <ThemeToggle />
        </div>
      </div>
      <div className="md:hidden">
        <div className="w-full h-20 p-6 justify-between items-center inline-flex align-middle">
          <ThemeToggle />
          <div onClick={handleBackClick}>
            <Logo mode={theme} />
          </div>
          <div className="justify-start items-center gap-1 flex">
            <div className="w-[35px] h-[35px] px-3.5 py-3 bg-button-light-bg-20  bg-button-light-secondary dark:bg-button-dark-bg bg-blend-overlay  rounded justify-center items-center gap-2.5 flex">
              <div className="w-5 h-5 relative">
                <Link href="/about">
                  <About mode={theme} />
                </Link>
              </div>
            </div>
            <div className="w-[35px] h-[35px] px-3.5 py-3 bg-button-light-bg-20  bg-button-light-secondary dark:bg-button-dark-bg bg-blend-overlay  rounded flex-col justify-center items-center gap-[5px] inline-flex">
              {" "}
              <div className="w-5 h-5 relative flex justify-center items-center">
                <Menu mode={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
