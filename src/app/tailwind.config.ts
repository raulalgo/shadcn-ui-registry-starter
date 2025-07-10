import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F4F5FF",
          100: "#F0F2FE",
          200: "#EBEEFF",
          300: "#CAD1FC",
          400: "#A0ACF8",
          500: "#7D8BE6",
          600: "#2C24C3",
          700: "#272199",
          800: "#171273",
          900: "#15115E",
          950: "#090642",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F8F8F9",
          200: "#F3F3F5",
          300: "#EAEAEF",
          400: "#BAB9C3",
          500: "#A09FAA",
          600: "#7C7B87",
          700: "#605F6B",
          800: "#52515E",
          900: "#42414E",
          950: "#131221",
        },
        pinkred: {
          50: "#FFF4F6",
          100: "#FEE8EC",
          200: "#FCCAD3",
          300: "#F8A0B0",
          400: "#E67D90",
          500: "#E35770",
          600: "#E42E4F",
          700: "#BE1235",
          800: "#9F1234",
          900: "#881333",
          950: "#4C0516",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "2xs": "var(--shadow-2xs)",
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["serif"],
        mono: ["monospace"],
      },
      keyframes: {
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-scale": "fade-in-scale 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
