/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBF7F2",
        panel: "#FFFFFF",
        ink: "#1D1B18",
        muted: "#7A756C",
        line: "#E7E1D8",
        accent: {
          DEFAULT: "#E4795A",
          soft: "#F6D8CB",
          dark: "#C85C3E",
        },
        studio: {
          base: "#0D0B0A",
          panel: "#171310",
          surface: "#1E1B18",
          line: "rgba(255,255,255,0.08)",
          text: "#F5F1EA",
          dim: "rgba(245,241,234,0.62)",
          soft: "rgba(255,255,255,0.04)",
        },
        amber: {
          DEFAULT: "#E0954A",
          soft: "rgba(224,149,74,0.12)",
          dark: "#B96F2C",
        },
        cyan: {
          DEFAULT: "#7BC6CC",
          soft: "rgba(123,198,204,0.12)",
          dark: "#4C9197",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(29, 27, 24, 0.06)",
        card: "0 6px 20px rgba(29, 27, 24, 0.08)",
        studio: "0 18px 50px rgba(0, 0, 0, 0.32)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease-out both",
        shimmer: "shimmer 1.6s infinite linear",
      },
    },
  },
  plugins: [],
};
