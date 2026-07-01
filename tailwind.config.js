/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        crust: "#f4ede4",
        ember: "#d9572c",
        olive: "#4a5d3a",
        char: "#241f1c",
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
