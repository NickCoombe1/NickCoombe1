import type { Metadata } from "next";
import "./globals.css";
import "dotenv/config";
import Header from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Nick Coombe",
  description: "Welcome :)",
  icons: { icon: "/hippo-solid.svg" },
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
      <body className="bg-white text-gray-700 dark:bg-secondary dark:text-primary">
        <div className="max-w-7xl mx-auto p-8">
          {" "}
          <Header initialTheme={theme} />
          <main> {children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
