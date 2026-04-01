/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marble: {
          50: '#f8f9fa',
          100: '#e9ecef',
          800: '#343a40',
          900: '#212529',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f1e5ac',
          dark: '#aa8c2c',
        }
      },
      backgroundImage: {
        'marble-light': "url('https://www.transparenttextures.com/patterns/white-marble.png')",
        'marble-dark': "url('https://www.transparenttextures.com/patterns/black-marble.png')"
      }
    },
  },
  plugins: [],
}
