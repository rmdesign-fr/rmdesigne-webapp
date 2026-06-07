/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rm-dark": "#2d2d2d",
        "rm-dark2": "#3a3a3a",
        "rm-blue": "#1e3a8a",
        "rm-light-blue": "#3b82f6",
        "rm-muted": "#6b7280",
        "rm-card": "#ffffff",
        "rm-danger": "#ef4444",
        "rm-success": "#22c55e",
        "rm-bg": "#f5f5f5",
        "rm-pink": "#e91e8c",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      backgroundImage: {
        "splatter-h": "url('/assets/bg-horizon.png')",
        "splatter-v": "url('/assets/bg-vertical.png')",
      },
    },
  },
  plugins: [],
};
