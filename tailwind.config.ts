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
        bg: {
          primary: "#0d1117",
          secondary: "#161b22",
          tertiary: "#21262d",
        },
        border: { DEFAULT: "#30363d", subtle: "#21262d" },
        text: {
          primary: "#e6edf3",
          secondary: "#7d8590",
          muted: "#484f58",
        },
        accent: {
          blue: "#58a6ff",
          green: "#3fb950",
          purple: "#bc8cff",
          orange: "#f0883e",
          red: "#f85149",
          yellow: "#d29922",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.2s ease-out",
        "scale-in": "scaleIn 0.15s ease-out",
        "pulse-green": "pulseGreen 0.5s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        pulseGreen: {
          "0%": { boxShadow: "0 0 0 0 rgba(63, 185, 80, 0.4)" },
          "70%": { boxShadow: "0 0 0 6px rgba(63, 185, 80, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(63, 185, 80, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;