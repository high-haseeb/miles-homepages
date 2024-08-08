import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxHeight: {
        full2: "calc(100vh - 86px)",
      },
      colors: {
        "hover-color": "#4E46B4",
        gray: {
          1: "#999CA0",
          2: "#EBEBEB",
          3: "#EAECF0",
          4: "#C4C4C4",
        },
        green: {
          50: "#e6f7ed",
          100: "#b0e5c8",
          200: "#8ad9ad",
          300: "#55c787",
          400: "#34bd70",
          500: "#01AC4C",
        },
        slate: {
          50: "#ececec",
          100: "#c4c4c4",
          200: "#a7a8a8",
          300: "#7f8080",
          400: "#666867",
          500: "#404241",
          600: "#3a3c3b",
          700: "#2d2f2e",
          800: "#232424",
          900: "#1b1c1b",
        },
        teal: {
          50: "#e6eceb",
          100: "#b0c5c1",
          200: "#8aa9a3",
          300: "#548279",
          400: "#336a5f",
          500: "#004537",
        },
        orange: {
          50: "#fff4ea",
          100: "#ffdbbf",
          200: "#ffca9f",
          300: "#ffb274",
          400: "#ffa359",
          500: "#ff8c2f",
          600: "#e87f2b",
        },
        pearl: {
          400: "#FAF9F4",
        },
        mist: {
          500: "#C7DDDC",
        },
        dark: "#2C323A",
        dark_2: "#333333",
        dark_green: "#273F2B",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      boxShadow: {
        standard: "0 12px 12px -6px rgba(0, 0, 0, 0.07)",
      },
      spacing: {
        4.5: "18px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
