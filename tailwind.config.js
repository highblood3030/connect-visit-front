/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {},
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#145C5B", // Used for headings, text, buttons
        cardBg: "#D7F0ED", // Background color of dashboard cards
        cardHover: "#B7E0DA", // Hover color for cards
      },
      animation: {
        "bounce-slow": "bounce 2.5s infinite",
        float: "float 3s ease-in-out infinite",
        gradient: "gradientMove 5s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
