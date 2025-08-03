/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}","./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        azul: "#62C0C0",
        lAbobora: "#FF6600",
        lPessego: "#FEEAC2",
        branco: "#FFFAF0",
        azulEscuro: "#003B5D",
      }
    },
  },
  plugins: [],
}