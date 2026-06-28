/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#0A0A0B",
        "paper-dim": "#131314",
        ink: "#F2F2F0",
        "ink-soft": "#9A9D98",
        blueprint: "#3ED9E8",
        "blueprint-dim": "#2FB0BD",
        brass: "#3ED9E8",
        calib: "#FF5C4D",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
