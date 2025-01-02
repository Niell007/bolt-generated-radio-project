/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
      theme: {
        extend: {
          colors: {
            'dark-bg': '#0d0208',
            'purple-accent': '#7209b7',
            'light-text': '#f1faee',
            'purple-secondary': '#5e17eb',
            'purple-tertiary': '#3a0ca3',
            'purple-light': '#9d4edd',
            'purple-dark': '#480ca8',
          },
          fontFamily: {
            'custom': ['Roboto', 'sans-serif'],
          },
        },
      },
      plugins: [],
    };
