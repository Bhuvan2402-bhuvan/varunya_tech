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
          softGrey: "#F9FAFB",// Secondary subtle section background
          graphite: "#17191D",// Primary typography
          charcoal: "#F9FAFB",// Secondary section background
          elevated: "#FFFFFF",// Elevated panels, cards & diagrams
        },
        graphite: {
          DEFAULT: "#17191D",
          noir: "#FFFFFF",
          charcoal: "#F9FAFB",
          elevated: "#FFFFFF",
          surface: "#FFFFFF",
          border: "#E5E7EB",
        },
        charcoal: {
          DEFAULT: "#F9FAFB",
          elevated: "#FFFFFF",
          border: "#E5E7EB",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#FFFFFF",
          charcoal: "#F9FAFB",
          elevated: "#FFFFFF",
          raised: "#F3F4F6",
          border: "#E5E7EB",
          light: "#FFFFFF",
        },
        structural: {
          border: "#E5E7EB",
          borderSubtle: "#F3F4F6",
          surface: "#FFFFFF",
        },
        tokenText: {
          primary: "#17191D",
          secondary: "#4B5563",
          muted: "#6B7280",
          dark: "#17191D",
        },
        // Accents mapped to approved palette
        cyan: {
          electric: "#519DD9",
          DEFAULT: "#519DD9",
          glow: "rgba(81, 157, 217, 0.2)",
        },
        cobalt: {
          DEFAULT: "#519DD9",
          light: "#6CAEE4",
          dark: "#3B81B9",
          glow: "rgba(81, 157, 217, 0.2)",
        },
        teal: {
          digital: "#53BAC1",
          DEFAULT: "#53BAC1",
          glow: "rgba(83, 186, 193, 0.2)",
        },
        crimson: {
          DEFAULT: "#DB0038",
          dark: "#B5002E",
          glow: "rgba(219, 0, 56, 0.2)",
        },
        electricYellow: {
          DEFAULT: "#F7C200",
          glow: "rgba(247, 194, 0, 0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        editorial: ["var(--font-editorial)", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SF Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        'subtle-elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'architectural': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'steel-glow': '0 0 20px -3px rgba(81, 157, 217, 0.15)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 10px 25px rgba(0,0,0,0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 32s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
