/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand': ["Quicksand", 'sans-serif']
      },
      backgroundImage: {
        'downArrow': "url('../src/assets/svgs/downArrow.svg')",
        'deleteButton': "url('../src/assets/svgs/deleteButton.svg')"
      }
    },
  },
  plugins: [],
}