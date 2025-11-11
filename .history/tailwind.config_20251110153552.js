/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2ba4b9",
        secondary: "#0f9978",
        accent: "#f59f08",
        white: "#ffffff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}
