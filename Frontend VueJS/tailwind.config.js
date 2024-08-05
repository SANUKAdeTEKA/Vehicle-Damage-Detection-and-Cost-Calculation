module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000",
        secondary: "#00FF00",
        error: "#FF0000",
        btnback: "#8B6974",
        selected: "#4B9DFF",
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      fontSize: {
        xl: "1.5rem",
      },
    },
  },
  plugins: [],
}

