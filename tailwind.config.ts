import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BookEase brand: "Book" = dark navy, "Ease" = light cyan
        navy: {
          50: "#eef2fb",
          100: "#d5dff5",
          200: "#afc2ec",
          300: "#7e9de0",
          400: "#5279d4",
          500: "#3259c4",
          600: "#2546a8",
          700: "#1d3788",
          800: "#1a2f6e", // Primary navy – "Book" color
          900: "#132050",
          950: "#0a1230",
        },
        cyan: {
          50: "#edfbff",
          100: "#d6f5ff",
          200: "#a8edff",
          300: "#6ae2ff",
          400: "#22d0f8",
          500: "#00b8e6", // Primary cyan – "Ease" color
          600: "#0098c4",
          700: "#007aa0",
          800: "#006180",
          900: "#00516b",
          950: "#003348",
        },
        // Keep 'brand' as an alias pointing to navy for backward compat
        brand: {
          50: "#eef2fb",
          100: "#d5dff5",
          200: "#afc2ec",
          300: "#7e9de0",
          400: "#5279d4",
          500: "#3259c4",
          600: "#2546a8",
          700: "#1d3788",
          800: "#1a2f6e",
          900: "#132050",
          950: "#0a1230",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
