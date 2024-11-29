import type { Metadata } from "next";
import "../globals.css";
import "dotenv/config";
import Header from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "FPL Scoreboard",
  description: "",
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
        <div className="max-w-7xl mx-auto p-6">
          {" "}
          <Header initialTheme={theme} />
          <main> {children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
