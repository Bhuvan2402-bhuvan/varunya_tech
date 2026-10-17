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
        // Luxury White & Ivory Architectural System
        ivory: {
          canvas: "#FAFAF8",
          DEFAULT: "#F5F3EF",
          warm: "#F0EEE9",
          raised: "#EBE8E1",
          border: "#E5E2DB",
          subtle: "#ECE9E2",
          darkBorder: "#D4D0C5",
        },
        obsidian: {
          DEFAULT: "#111215",
          charcoal: "#1C1D22",
          surface: "#2A2D35",
          muted: "#4A4D54",
          light: "#71757E",
        },
        graphite: {
          black: "#FAFAF8",
          DEFAULT: "#F5F3EF",
          charcoal: "#F0EEE9",
          elevated: "#FFFFFF",
          surface: "#FFFFFF",
          border: "#E5E2DB",
        },
        charcoal: {
          DEFAULT: "#F0EEE9",
          elevated: "#FFFFFF",
        },
        titanium: {
          DEFAULT: "#71757E",
          light: "#8C909A",
          muted: "#A0A4AE",
        },
        silver: {
          DEFAULT: "#565961",
          light: "#4A4D54",
        },
        platinum: {
          DEFAULT: "#3A3D44",
          light: "#111215",
        },
        ice: {
          DEFAULT: "#111215",
          pure: "#111215",
          muted: "#4A4D54",
        },
        bluesteel: {
          DEFAULT: "#4A5568",
          light: "#718096",
          dark: "#2D3748",
        },
        structural: {
          border: "#E5E2DB",
          borderSubtle: "#ECE9E2",
          surface: "#F5F3EF",
        },
        // Brand Digital Accents
        cyan: {
          electric: "#519DD9",
          DEFAULT: "#519DD9",
          glow: "rgba(81, 157, 217, 0.25)",
        },
        cobalt: {
          DEFAULT: "#519DD9",
          light: "#66A7E0",
          dark: "#2A72B2",
          glow: "rgba(81, 157, 217, 0.25)",
        },
        ultraviolet: {
          DEFAULT: "#815BFF",
          light: "#A082FF",
          dark: "#5A38C7",
          glow: "rgba(129, 91, 255, 0.25)",
        },
        indigo: {
          deep: "#29245C",
          dark: "#1A173B",
        },
        teal: {
          digital: "#53BAC1",
          DEFAULT: "#53BAC1",
          glow: "rgba(83, 186, 193, 0.25)",
        },
        // Official VarunyaTech Brand Tokens
        brand: {
          crimson: "#DB0038", // Important highlights
          yellow: "#F7C200",  // Active states / single high-impact hero detail
          blue: "#519DD9",    // Software visuals
          teal: "#53BAC1",    // AI and data flows
          gold: "#C89B3C",    // Luxury emblem gold
        },
        surface: {
          light: "#FFFFFF",   // Crisp white cards
          dark: "#FAFAF8",    // Main ivory canvas
          raised: "#FFFFFF",  // Raised white panels
          ivory: "#F5F3EF",   // Architectural ivory
          warm: "#F0EEE9",    // Warm ivory section
          charcoal: "#F0EEE9", 
          border: "#E5E2DB",  // Subtle hairline border
          indigo: "#29245C",  // Final CTA background
        },
        tokenText: {
          primary: "#111215", // Dark obsidian text
          secondary: "#4A4D54", // Architectural body text
          muted: "#71757E",   // Meta labels
          dark: "#111215",    
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
        'steel-glow': '0 0 25px -5px rgba(81, 157, 217, 0.2)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 10px 25px rgba(0,0,0,0.04)',
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
