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
        trionn: {
          dark: "#070708",
          card: "#0E0E12",
          border: "rgba(255, 255, 255, 0.08)",
          lime: "#FF5500", // Sunset Neon Orange
          cyan: "#FF007F", // Hot Pink / Magenta
          purple: "#00F0FF", // Electric Sky Cyan
        },
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ff5500",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        accent: {
          orange: "#FF5500",
          pink: "#FF007F",
          cyan: "#00F0FF",
          purple: "#A855F7",
          lime: "#CCFF00",
        },
        dark: {
          bg: "#070708",
          card: "rgba(14, 14, 18, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.12)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'glow-lime': '0 0 30px -5px rgba(255, 85, 0, 0.45)',
        'glow-orange': '0 0 30px -5px rgba(255, 85, 0, 0.45)',
        'glow-pink': '0 0 30px -5px rgba(255, 0, 127, 0.4)',
        'glow-cyan': '0 0 30px -5px rgba(0, 240, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-spin': 'border-spin 7s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'border-spin': {
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
export default config;
