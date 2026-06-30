import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FDFDFD",
        ink: "#050505",
        hero: "#E11F26",
        accent: "#B6753B",
        highlight: "#FBD70E",
        nav: "#164775",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "system-ui", "sans-serif"],
        display: ["var(--font-stretch-pro)", "system-ui", "sans-serif"],
        macro: ["var(--font-archivo)", "sans-serif"],
      },
      spacing: { section: "5rem" },
    },
  },
  plugins: [],
};

export default config;
