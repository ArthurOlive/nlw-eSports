/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily : {
        sans : ['Inter', 'sans-serif']
      },
      colors: {
        
      },
      backgroundImage : {
        galaxy : "url('/background-galaxy.png')",
        'nlw-gradient' : "linear-gradient(89.86deg, #9572FC , #43E7AD , #E1D55D)",
        'game-gradient' : "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)"
      }
    },
  },
  plugins: [],
}
