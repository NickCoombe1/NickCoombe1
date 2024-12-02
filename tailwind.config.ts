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
        //light mode - text
        "light-default": "#030303",
        "light-90": "rgba(14, 14, 14, 0.9)",
        "light-80": "rgba(4, 4, 4, 0.8)",
        "light-60": "rgba(0, 0, 0, 0.6)",
        "light-inverted": "#EAE8F1",
        //light mode - container
        "container-light-fill": "rgba(255, 255, 255, 0.70)",
        "container-light-stroke": "rgba(255, 255, 255, 1)",
        //light mode - graphics
        "graphics-light-background": "#EAEDF7",
        "graphics-light-lines": "rgba(4, 4, 4, 0.2)",
        //light mode - colours
        "light-red": "#E40004",
        "light-orange": "#F76F00",
        "light-yellow": "#F4C700",
        "light-green": "#00BD1C",
        "light-dark-blue": "#00A5A5",
        //dark mode - text
        "dark-default": "#FFFFFF",
        "dark-90": "rgba(249, 249, 249, 0.9)",
        "dark-80": "rgba(249, 249, 249, 0.8)",
        "dark-60": "rgba(255, 255, 255, 0.6)",
        "dark-inverted": "rgba(14, 14, 14, 0.9)",
        //dark mode - container
        "container-dark-fill": "rgba(255, 255, 255, 0.05)",
        "container-dark-stroke": "rgba(255, 255, 255, 0.5)",
        //dark mode - graphics
        "graphics-dark-background": "#0C1226",
        "graphics-dark-lines": "rgba(255, 255, 255, 0.2)",
        //dark mode - colours
        "dark-red": "#FF4D50",
        "dark-green": "rgba(97, 255, 121, 0.9)",
        "dark-yellow": "#FFF564",
        "dark-orange": "#FF9D4D",
      },
      backgroundImage: {
        "button-dark-secondary":
          "linear-gradient(270deg, rgba(205, 255, 255, 0.3) 0%, rgba(255, 212, 212, 0.3) 100%)",
        "button-light-secondary":
          "linear-gradient(270deg, rgba(205, 255, 255, 0.1) 0%, rgba(255, 212, 212, 0.1) 100%)",
      },
      backgroundColor: {
        "button-light-bg": "rgba(255, 255, 255, 1)",
        "button-light-bg-20": "rgba(255, 255, 255, 0.2)",
        "button-dark-bg": "rgba(157, 157, 157, 0.2)",
        "graphics-light-depth": "rgba(0, 0, 0, 0.05)",
        "graphics-dark-depth": "rgba(0, 0, 0, 0.20)",
      },
      fontFamily: {
        roobert: ["var(--font-roobert)", "sans-serif"],
        roobertMono: ["var(--font-roobert-mono)", "monospace"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
