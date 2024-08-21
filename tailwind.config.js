/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors:{
          'bg-white-blur':'#fff50',
      }
    },
  },
  plugins: [
  ],
}

