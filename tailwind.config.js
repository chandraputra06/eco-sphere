/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Class "font-poppins" & "font-animal"
        poppins: ['Poppins', 'sans-serif'],
        animal: ['"Animal Chariot"', 'cursive'],
      },
      // Palet warna dipindahkan dari @theme (index.css) agar berfungsi di Tailwind v3
      colors: {
        primary: {
          DEFAULT: '#1F7A6B',
          light: '#4FA493',
          subtle: '#D9EFEA',
          dark: '#153C35',
        },
        secondary: '#1C4E80',
        info: '#3BAFDA',
        warning: '#F59E0B',
        error: '#EF4444',
        success: '#22C55E',
        bali: {
          50: '#E8F5F3',
          100: '#BFE3DC',
          200: '#86C4B7',
          300: '#5FAF9E',
          400: '#2F8F7E',
          500: '#1F7A6B',
          600: '#196155',
        },
      },
      backgroundImage: {
        'hero-overlay':
          'linear-gradient(90deg, rgba(16,24,40,0.9) 0%, rgba(16,24,40,0.7) 50%, rgba(0,79,59,0.5) 100%)',
      },
    },
  },
  plugins: [],
}