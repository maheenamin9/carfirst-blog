/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'hero-pic': "url('/src/assets/images/hero-min.jpg')"
      },
      textColor: {
        'primary': '#002F34',
        'secondary': '#237C6B',
        'btnColor': '#FFD700',
      },
      boxShadow: {
        '3xl': '0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);'
      }
    },
  },
  plugins: [],
}
