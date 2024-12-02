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
        secondary: "#0C1226",
        //light mode
        "text-light-default": "#040404",
        "text-light-90": "rgba(14, 14, 14, 0.9)",
        "text-light-80": "rgba(4, 4, 4, 0.8)",
        "text-light-60": "rgba(0, 0, 0, 0.6)",
        "text-light-inverted": "#EAE8F1",
        //dark mode
        "text-dark-default": "#FFFFFF",
        "text-dark-90": "rgba(249, 249, 249, 0.9)",
        "text-dark-80": "rgba(249, 249, 249, 0.8)",
        "text-dark-60": "rgba(255, 255, 255, 0.6)",
        "text-dark-inverted": "rgba(14, 14, 14, 0.9)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
