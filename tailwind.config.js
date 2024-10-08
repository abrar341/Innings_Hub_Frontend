// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s linear infinite',
      },
      keyframes: {
        blink: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      },
      screens: {
        'xs': '475px',
        'xs-1': '542px',
        ...defaultTheme.screens,
      },
      colors: {
        customDarkBlue: ' hsl(225 100% 19%)',
        customDarkGray: ' rgb(222 229 237)',
        custonGreen: 'rgba(53,186,246,0.5)'
      },
    },
  },

  plugins: [],
}
