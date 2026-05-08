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
        base: "#111111",
        accent: "#F4EDE4",
      },
      fontFamily: {
        // Map the Tailwind classes to the new CSS variables
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"],
        heading: ["var(--font-melodrama)", "Melodrama", "serif"],
        display: ["var(--font-melodrama)", "Melodrama", "serif"],
      },
    },
  },
  plugins: [],
};