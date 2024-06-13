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
        dark: "#282828",
        light: "#F3F4F5",
        primary: "#BF0000", // 240,86,199
        secondary: "#242024", // 80,230,217
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl":"1440px",
      "375": "375px",
      "425": "425px"
    },
  },
  plugins: [],
};
export default config;
