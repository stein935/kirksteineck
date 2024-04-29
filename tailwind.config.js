/** @type {import('tailwindcss').Config} */
import typeographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      display: ["Alfa Slab One", "system-ui"],
      sans: ["Ubuntu", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Ubuntu Mono", "monospace"],
    },
    fontWeight: {
      display: 400,
    },
    extend: {},
  },
  plugins: [typeographyPlugin],
};
