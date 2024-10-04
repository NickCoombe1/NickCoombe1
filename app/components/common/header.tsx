import ThemeToggle from "@/app/components/utility/themeToggle";

export default function Header() {
  return (
    <div className="flex w-full justify-between p-6 items-center">
      <div className="text-sm/6 font-semibold text-white/50">About Me</div>
      <ThemeToggle />
    </div>
  );
}
