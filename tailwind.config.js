/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{twig,html,js,njk}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        slack: {
          bg: '#1a1d21',
          text: '#d1d2d3',
          accent: '#4a5664',
          highlight: '#2c2d30',
          active: '#4a154b',
          hover: '#350d36',
        }
      }
    }
  },
  plugins: [],
}
