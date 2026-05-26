/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'shield-yellow': '#FFED00',
        'shield-red': '#E20613',
        'shield-blue': '#009FE3',
        'shield-green': '#009540',
        'shield-black': '#000000',
        'brand-yellow': '#fdc910',
        'brand-gray': '#cccccc',
      },
    },
  },
  plugins: [],
};
