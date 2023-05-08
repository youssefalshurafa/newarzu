/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        128: '30rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        passionOne: ['Passion One', 'cursive'],
        dmSerif: ['DM Serif Display', 'serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
