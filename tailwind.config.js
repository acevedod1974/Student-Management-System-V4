/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3b82f6", // Light blue
          DEFAULT: "#2563eb", // Blue
          dark: "#1d4ed8", // Dark blue
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
