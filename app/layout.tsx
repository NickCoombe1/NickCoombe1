import type { Metadata } from "next";
import "./globals.css";
import "dotenv/config";
import Header from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";
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
  return (
    <html lang="en">
      <head title={metadata.title?.toString()}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white text-gray-700 dark:bg-secondary dark:text-primary">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
