/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      'sm-al': '570px',
      ...defaultTheme.screens,
    },
    extend: {},
    colors: {
      primary: '#A49370',
      secondary: '#3A3838',
      tertiary: '#5F5F5F',
      white: '#fff',
      black: '#000',
      grey: '#A4A4A4',
      blue: '#3b82f6',
      yellow: '#fff200',
      light: '#b8b8b8',
      dark: '#858585',
      btcolor: '#606060',
    },
  },
  plugins: [],
};
