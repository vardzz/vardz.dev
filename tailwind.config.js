/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "rgb(15 14 13 / <alpha-value>)",
        accent: "rgb(201 200 197 / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-stardom)", "Playfair Display", "serif"],
        sans: ["var(--font-satoshi)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
