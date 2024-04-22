/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'md': {'max': '1024px'},
      'vert': {'max': '896px'},
      'sm': {'max': '720px'},
      'mini': {'max': '560px'}
    }
  },
  plugins: [],
}

