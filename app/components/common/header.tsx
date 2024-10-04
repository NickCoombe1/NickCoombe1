import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex w-full justify-between p-6 items-center">
      <div className="text-sm/6 font-semibold text-white/50">
        {" "}
        <Link href="/about">About Us</Link>
      </div>
      <ThemeToggle />
    </div>
  );
}
