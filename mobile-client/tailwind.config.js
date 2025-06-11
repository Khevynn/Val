/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#15191F",
          200: "#12151A",
          300: "#0F1115"
        },
        theme: "#ED900E",
        grey: "#4B4C54"
      }
    },
  },
  plugins: [],
}