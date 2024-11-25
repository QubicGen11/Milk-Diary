/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'milmaa-bg': '#f5e6d3',
        'milmaa-mint': '#98e5d7',
      },
    },
  },
  plugins: [],
}

