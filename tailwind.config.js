// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
