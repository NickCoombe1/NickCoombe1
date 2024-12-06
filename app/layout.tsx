import type { Metadata } from "next";
import "./globals.css";
import "dotenv/config";
import Header from "@/app/components/common/header";
import { cookies } from "next/headers";
import localFont from "next/font/local";

const roobert = localFont({
  src: [
    {
      path: "fonts/DP_roobert_TRIAL/RoobertTRIAL-Regular.woff2",
      weight: "400",
    },
    {
      path: "fonts/DP_roobert_TRIAL/RoobertTRIAL-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-roobert",
});

const roobertMono = localFont({
  src: [
    {
      path: "fonts/DP_roobert-mono_TRIAL/RoobertMonoTRIAL-Regular.woff2",
      weight: "400",
    },
  ],
  variable: "--font-roobert-mono",
});

const hexaframeCF = localFont({
  src: [
    {
      path: "fonts/HexaframeCF/HexaframeCF-Regular.ttf",
      weight: "400",
    },
    {
      path: "fonts/HexaframeCF/HexaframeCF-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-hexaframe",
});

export const metadata: Metadata = {
  title: "FS.",
  description: "",
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  return (
    <html
      lang="en"
      className={`${theme} ${roobert.variable} ${roobertMono.variable} ${hexaframeCF.variable}`}
    >
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
      <body className="bg-light-container dark:bg-dark-container relative">
        <div
          className="absolute inset-0 pointer-events-none mix-blend-difference"
          style={{
            backgroundImage: 'url("/Lights.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-screen h-screen relative z-10">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
