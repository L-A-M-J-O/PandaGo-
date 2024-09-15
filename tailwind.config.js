/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '100%',
        md: '728px',
        lg: '1024px',
        xl: '1480px',
        '2xl': '1736px'
      }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
