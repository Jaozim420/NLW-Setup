/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: '#09090A',
        check: {
          500: '#39d353',
          600: '#26a641',
          700: '#006d32',
          800: '#0e4429',
          900: '#161b22',
        },
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0,1fr))',
      },
    },
  },
  plugins: [],
}
