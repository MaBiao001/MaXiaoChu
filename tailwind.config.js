/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50:  '#121212',
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3d3d3d',
          400: '#8a8a8a',
          500: '#a8a8a8',
          600: '#c4c4c4',
          700: '#e0e0e0',
          800: '#f0f0f0',
          900: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#d4a373',
          dark: '#bc8a5f',
          light: '#e9c4a0',
        },
        sage: {
          DEFAULT: '#606c38',
          light: '#8a9a5b',
        },
        clay: {
          DEFAULT: '#e76f51',
          dark: '#d1583a',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
