/** @type {import('tailwindcss').Config} */
import typeographyPlugin from "@tailwindcss/typography";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      display: ["Alfa Slab One", "system-ui"],
      // sans: ["Ubuntu", "sans-serif"],
      serif: ["Merriweather", "serif"],
      mono: ["Ubuntu Mono", "monospace"],
    },
    extend: {
      borderRadius: {
        base: "0.25rem",
      },
    },
  },
  safelist: [
    {
      pattern: /from-.+/,
    },
    {
      pattern: /to-.+/,
    },
    {
      pattern: /bg-.+/,
      variants: [
        "hover",
        "active",
        "group-hover",
        "group-active",
        "peer-hover",
        "peer-active",
      ],
    },
    {
      pattern: /text-.+/,
      variants: [
        "hover",
        "active",
        "group-hover",
        "group-active",
        "peer-hover",
        "peer-active",
      ],
    },
    "size-4",
    "size-5",
    "size-6",
    "size-7",
    "size-8",
    "py-1",
    "py-1.5",
    "py-2",
    "py-3",
    "py-4",
    "px-1.5",
    "px-2",
    "px-3",
    "px-4",
    "px-5",
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "md:columns-1",
    "md:columns-2",
    "md:columns-3",
    "rounded-xs",
    "rounded-sm",
    "rounded",
    "rounded-lg",
    "rounded-xl",
  ],
  plugins: [typeographyPlugin, formsPlugin],
};
