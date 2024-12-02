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
        "text-light-default": "#040404",
        "text-light-90": "rgba(14, 14, 14, 0.9)",
        "text-light-80": "rgba(4, 4, 4, 0.8)",
        "text-light-60": "rgba(0, 0, 0, 0.6)",
        "text-light-inverted": "#EAE8F1",
        //light mode - container
        "container-light-fill": "rgba(255, 255, 255, 0.70)",
        "container-light-stroke": "rgba(255, 255, 255, 1)",
        //light mode - graphics
        "graphics-light-background": "#EAEDF7",
        "graphics-light-depth": "rgba(0, 0, 0, 0.03)",
        "graphics-light-lines": "rgba(4, 4, 4, 0.2)",
        "button-light-primary": "#FFFFFF",
        "button-light-secondary":
          "linear-gradient(rgba(205, 255, 255, 0.1), rgba(255, 212, 212, 0.1))",

        //dark mode - text
        "text-dark-default": "#FFFFFF",
        "text-dark-90": "rgba(249, 249, 249, 0.9)",
        "text-dark-80": "rgba(249, 249, 249, 0.8)",
        "text-dark-60": "rgba(255, 255, 255, 0.6)",
        "text-dark-inverted": "rgba(14, 14, 14, 0.9)",
        //dark mode - container
        "container-dark-fill": "rgba(255, 255, 255, 0.05)",
        "container-dark-stroke": "rgba(255, 255, 255, 0.5)",
        //dark mode - graphics
        "graphics-dark-background": "#0C1226",
        "graphics-dark-depth": "rgba(0, 0, 0, 0.15)",
        "graphics-dark-lines": "rgba(255, 255, 255, 0.2)",
        "button-dark-primary":
          "linear-gradient(rgba(205, 255, 255, 0.3), rgba(255, 212, 212, 0.3))",
        "button-dark-secondary":
          "linear-gradient(rgba(205, 255, 255, 0.1), rgba(255, 212, 212, 0.1))",
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
