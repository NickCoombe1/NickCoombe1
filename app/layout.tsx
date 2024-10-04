import type { Metadata } from "next";
import "./globals.css";
import "dotenv/config";
import Header from "@/app/components/common/header";
import Footer from "@/app/components/common/footer";

export const metadata: Metadata = {
  title: "Nick Coombe",
  description: "Welcome :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
