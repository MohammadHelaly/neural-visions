/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      colors: {
        muted: "#7c7c7c7c",
        white: "#f8f9fa",
        dark: "#212529",
        gray: "#212529bf",
        red: "#e94545",
      },
    },
  },
  plugins: [],
};
