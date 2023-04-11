/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        monsterrat:[ 'Montserrat', 'sans-serif']
      },
      colors:{
        primario:'#00171F',
        secundario:'#F7B32B',
        terciario:'#002633',
        blanco:'#FDFFFC',
        rojo:'#F24236'
      },
    },
  },
  plugins: [],
  base: {
    "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap')" : ''
  },

}