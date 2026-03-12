/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#56c91d',
          dark: '#45a117',
          light: '#f0fdf4',
          muted: '#84d95b',
        },
        primary: '#56c91d',
        'primary-dark': '#45a317',
        brandCharcoal: '#121212',
        brandOffWhite: '#f8f9fa',
        brandSoftBeige: '#f1f0ea',
        brandDarkGrey: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'premium': '0 20px 50px -12px rgba(0,0,0,0.15)',
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'mesh': 'mesh 15s ease infinite',
        'subtle-pulse': 'subtle-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'mesh': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 },
        }
      },
      borderRadius: {
        custom: '8px',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
