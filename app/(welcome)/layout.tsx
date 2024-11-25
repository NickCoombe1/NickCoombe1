import type { Metadata } from "next";
import "../globals.css";
import "dotenv/config";
import { cookies } from "next/headers";
import ThemeToggle from "../components/utility/themeToggle";

export const metadata: Metadata = {
  title: "FPL Scoreboard",
  description: "",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/soccer-ball-light.png",
        sizes: "32x32",
        href: "/soccer-ball-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/soccer-ball-dark.png",
        sizes: "32x32",
        href: "/soccer-ball-dark.png",
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
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Scoreboard" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{metadata.title?.toString()}</title>
      </head>
      <body className="bg-gray-50 text-gray-700 dark:bg-secondary dark:text-primary">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <main className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="ml-auto">
                <ThemeToggle initialTheme={theme} />
              </div>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
