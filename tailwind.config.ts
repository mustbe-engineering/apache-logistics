import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FDFDFD",
        ink: "#050505",
        hero: "#E93B24",
        accent: "#B6753B",
        highlight: "#FBD70E",
        nav: "#164775",
      },
      fontFamily: {
        macro: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      spacing: { section: "5rem", gutter: "1.5rem" },
    },
  },
  plugins: [],
};

export default config;
