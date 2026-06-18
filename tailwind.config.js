/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ritual: {
          navy: '#142B6F',
          'navy-light': '#1E3A8A',
          'navy-dark': '#0F1F4F',
          cream: '#FFFDF7',
          sand: '#F5F3EF',
          yellow: '#F5C542',
          'yellow-light': '#FEF3C7',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EBEBEB',
          300: '#D4D4D4',
        },
      },
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '500' }],
        'hero-mobile': ['2.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
