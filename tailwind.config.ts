const COLOR = {
  PRIMARY: "#1c1c1c",
  LIGHT_BLUE: "#ADD8E6",
  YELLOW: "#FCCD04",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/*.{html,js,ts,tsx}",
    "./src/**/**/**/*.{html,js,ts,tsx}",
  ],
  COLOR,
  theme: {
    extend: {
      colors: {
        primary: COLOR.PRIMARY,
        "light-blue": COLOR.LIGHT_BLUE,
        yellow: COLOR.YELLOW,
      },
    },
  },
  plugins: [],
};
