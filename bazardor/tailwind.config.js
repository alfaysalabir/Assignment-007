/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Colors taken from the Penpot design tokens
      colors: {
        "base-100": "#fafcfa",
        "base-200": "#f0f5f0",
        "base-300": "#e1e8e1",
        content: "#1d271f",
        primary: "#05893e",
        "primary-strong": "#047f39",
        "primary-content": "#f3fbf4",
        success: "#1a9951",
        danger: "#d03739",
      },
      fontFamily: {
        sans: ["var(--font-hind)", "Hind Siliguri", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 70s linear infinite",
      },
    },
  },
  plugins: [],
};
