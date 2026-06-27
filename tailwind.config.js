/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          900: '#050505',
          800: '#0A0A0A',
          700: '#121212',
          600: '#161616',
          500: '#1C1C1C',
          400: '#262626',
        },
        gold: {
          DEFAULT: '#C9A227',
          50: '#FBF4DE',
          100: '#F4E3AC',
          200: '#EBD27E',
          300: '#E8C547',
          400: '#D6B033',
          500: '#C9A227',
          600: '#A8841E',
          700: '#856617',
          800: '#5E4810',
          900: '#3A2B08',
        },
        bone: {
          DEFAULT: '#F5F3EC',
          muted: '#A8A6A0',
          dim: '#6E6C66',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(135deg, #856617 0%, #E8C547 45%, #C9A227 55%, #5E4810 100%)',
        'ink-fade': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, #0A0A0A 100%)',
        'ink-fade-top': 'linear-gradient(0deg, rgba(10,10,10,0) 0%, #0A0A0A 100%)',
        'radial-spot': 'radial-gradient(circle at 50% 0%, rgba(201,162,39,0.16), transparent 60%)',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,39,0.4), 0 8px 30px -10px rgba(201,162,39,0.45)',
        'gold-lg': '0 0 0 1px rgba(201,162,39,0.5), 0 25px 60px -15px rgba(201,162,39,0.55)',
        glass: '0 8px 32px 0 rgba(0,0,0,0.55)',
      },
      animation: {
        'pulse-ring': 'pulseRing 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'trail-move': 'trailMove 6s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        trailMove: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      maxWidth: {
        container: '1320px',
      },
    },
  },
  plugins: [],
};
