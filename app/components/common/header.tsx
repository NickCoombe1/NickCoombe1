import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full justify-between p-6 items-center">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/about">
            <img
              src="/hippo-solid.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Nick Coombe
            </span>
          </Link>{" "}
        </div>
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li className="text-sm/6 font-semibold">
              {" "}
              <Link href="/about">About</Link>
            </li>
            <ThemeToggle />
          </ul>
        </div>
      </nav>
    </header>
  );
}
