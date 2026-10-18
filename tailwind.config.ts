import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Approved VarunyaTech Brand Design System
        brand: {
          crimson: "#DB0038", // Critical actions & highlights
          yellow: "#F7C200",  // Indicators, telemetry & alerts
          blue: "#519DD9",    // Software visuals, active nodes & links
          teal: "#53BAC1",    // Data flows & AI systems
          softGrey: "#EDEDED",// Primary typography
          graphite: "#17191D",// Primary foundation
          charcoal: "#191C21",// Secondary section background
          elevated: "#202329",// Elevated panels, cards & diagrams
        },
        graphite: {
          DEFAULT: "#17191D",
          noir: "#141518",
          charcoal: "#191C21",
          elevated: "#202329",
          surface: "#202329",
          border: "#2A2E37",
        },
        charcoal: {
          DEFAULT: "#191C21",
          elevated: "#202329",
          border: "#2A2E37",
        },
        surface: {
          DEFAULT: "#202329",
          dark: "#17191D",
          charcoal: "#191C21",
          elevated: "#202329",
          raised: "#282C34",
          border: "#2A2E37",
          light: "#EDEDED",
        },
        structural: {
          border: "#2A2E37",
          borderSubtle: "#23262E",
          surface: "#202329",
        },
        tokenText: {
          primary: "#EDEDED",
          secondary: "#A6AFBD",
          muted: "#727C8D",
          dark: "#17191D",
        },
        // Accents mapped to approved palette
        cyan: {
          electric: "#519DD9",
          DEFAULT: "#519DD9",
          glow: "rgba(81, 157, 217, 0.25)",
        },
        cobalt: {
          DEFAULT: "#519DD9",
          light: "#6CAEE4",
          dark: "#3B81B9",
          glow: "rgba(81, 157, 217, 0.25)",
        },
        teal: {
          digital: "#53BAC1",
          DEFAULT: "#53BAC1",
          glow: "rgba(83, 186, 193, 0.25)",
        },
        crimson: {
          DEFAULT: "#DB0038",
          dark: "#B5002E",
          glow: "rgba(219, 0, 56, 0.25)",
        },
        electricYellow: {
          DEFAULT: "#F7C200",
          glow: "rgba(247, 194, 0, 0.25)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        editorial: ["var(--font-editorial)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        'subtle-elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        'architectural': '0 20px 40px -15px rgba(0, 0, 0, 0.45)',
        'steel-glow': '0 0 25px -5px rgba(81, 157, 217, 0.2)',
        'card': '0 1px 3px rgba(0,0,0,0.3), 0 10px 25px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
