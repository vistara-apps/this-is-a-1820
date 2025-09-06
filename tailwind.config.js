/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 85%, 55%)',
        accent: 'hsl(260, 70%, 60%)',
        surface: 'hsl(220, 15%, 100%)',
        bg: 'hsl(220, 15%, 95%)',
        'text-primary': 'hsl(220, 15%, 15%)',
        'text-secondary': 'hsl(220, 15%, 35%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(220, 15%, 10%, 0.12)',
      },
      animation: {
        'fadeIn': 'fadeIn 250ms cubic-bezier(0.22,1,0.36,1)',
        'slideIn': 'slideIn 250ms cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}