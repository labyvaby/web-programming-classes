/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#03070f',
        card: '#0a0f1e',
        'card-hover': '#0d1528',
        primary: '#7c3aed',
        'primary-light': '#a78bfa',
        'primary-dark': '#5b21b6',
        'primary-glow': 'rgba(124,58,237,0.25)',
        navy: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(124,58,237,0.2)',
        'glow': '0 0 40px rgba(124,58,237,0.25)',
        'glow-lg': '0 0 80px rgba(124,58,237,0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-violet': 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0f1e 0%, #03070f 100%)',
      },
    },
  },
  plugins: [],
}
