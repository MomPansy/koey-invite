/** @type {import('tailwindcss').Config} */
import Preline from 'preline/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
    fontFamily: {
      wallpaper: ['Wallpaper', 'sans-serif'],
    }
  },
  plugins: [
    Preline
  ],
}

