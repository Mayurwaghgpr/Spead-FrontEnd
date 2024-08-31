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
      keyframes: {
        fromRight: { // Corrected typo here
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }, // Corrected typo here
        },
         fromLeft: { // Corrected typo here
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }, // Corrected typo here
        }
      },
      animation: {
        'slide-in-left':'fromLeft .5s ease-in-out forwards',
        'slide-in-right': 'fromRight .5s ease-in-out forwards',
      },
      
    },
  },
  plugins: [],
}
