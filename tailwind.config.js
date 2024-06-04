/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '1px 1px 20px black'
      },
      borderWidth: {
        1: '1px'
      }
    }
  },
  plugins: []
};
