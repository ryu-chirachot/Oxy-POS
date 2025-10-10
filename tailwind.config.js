/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        oxy: {
          bg: "#0D0D0D",
          card: "#161616",
          red: "#E63946",
          gold: "#FFD700",
          text: "#E0E0E0"
        }
      },
      boxShadow: {
        glow: "0 0 0.5rem rgba(255, 215, 0, 0.35)"
      },
      borderRadius: {
        'xl2': '1rem'
      }
    },
  },
  plugins: [],
}
