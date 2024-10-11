import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "white",
        secondary: "#1F2937",
      },
      fontFamily: {
        serif: ["serif"],
      },
      fontSize: {
        "2xl": "12.5rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
