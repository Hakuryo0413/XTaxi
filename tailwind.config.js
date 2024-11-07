/** @type {import('tailwindcss').Config} */
const COLOR = {
  PRIMARY: "#1c1c1c",
  LIGHT_BLUE: "#ADD8E6",
};
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: COLOR.PRIMARY,
        "light-blue": COLOR.LIGHT_BLUE,
      },
    },
  },
  plugins: [],
};
