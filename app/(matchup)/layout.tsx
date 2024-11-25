import "../globals.css";
import "dotenv/config";
import Header from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FPL Scoreboard",
  description: "",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/soccer-ball-light.svg",
        href: "/soccer-ball-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/soccer-ball-dark.svg",
        href: "/soccer-ball-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  return (
    <html lang="en" className={theme}>
      <head title={metadata.title?.toString()}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-50 text-gray-700 dark:bg-secondary dark:text-primary">
        <div className="max-w-7xl mx-auto p-8">
          {" "}
          <Header initialTheme={theme} headerText={"Matchup"} />
          <main> {children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
