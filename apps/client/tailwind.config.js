/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cornflower-blue": "#4CA5FF",
        primary: "#3674FF",
        secondary: "#F46B6B",
        grayish: "#B4B4B4",
        dark: "#202020",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
    screens: {
      v: { max: "89rem" }, // validation
      xl: { max: "80rem" }, // 1280px
      lg: { max: "64rem" }, // 1024px
      md: { max: "48rem" }, // 768px
      sm: { max: "36rem" }, // 576px
      xs: { max: "26.25rem" }, // 420px
      xss: { max: "23.4375rem" }, // 375px
    },
    boxShadow: {
      "message-blue": "0 5px 5px 0 rgba(54, 116, 255, 0.2)",
      "message-white": "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    },
  },
  plugins: [],
}
