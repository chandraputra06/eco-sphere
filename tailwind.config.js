/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Nama "animal" di sini akan menjadi class "font-animal"
        animal: ['"Animal Chariot"', 'cursive'],
      },
      // (Opsional) Kamu juga bisa memindahkan warna-warnamu dari @theme index.css ke sini
      colors: {
        primary: {
          DEFAULT: '#1F7A6B',
          dark: '#153C35',
          light: '#4FA493',
        }
      }
    },
  },
  plugins: [],
}