export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00a19b",
        secondary: "#d97706", // remove extra spaces
        accent: "#233554",
        background: "#112240",
        text: "#8892B0",
        white: "#FFFFFF",
      },
      fontSize: {
        42: "10.5rem",
        8: "7rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
      },
      width: {
        42: "11.5rem",
      },
      height: {
        100: "38rem",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        detail: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
