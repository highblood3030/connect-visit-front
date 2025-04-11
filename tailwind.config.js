/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ✅ scans all your app files
  theme: {
    extend: {
      colors: {
        primary: "#145C5B",
        darkTeal: "#0f3e3d",
        cardBg: "#D7F0ED",
        cardHover: "#B7E0DA",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
