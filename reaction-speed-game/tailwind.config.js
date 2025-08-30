/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'bounce-in': 'bounceIn 0.6s ease-out',
          'fade-in-up': 'fadeInUp 0.5s ease-out',
          'pulse-glow': 'pulseGlow 2s infinite',
          'target-appear': 'targetAppear 0.3s ease-out',
        },
        keyframes: {
          bounceIn: {
            '0%': { transform: 'scale(0.3)', opacity: '0' },
            '50%': { transform: 'scale(1.05)', opacity: '0.8' },
            '70%': { transform: 'scale(0.9)', opacity: '0.9' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
          fadeInUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          pulseGlow: {
            '0%, 100%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.5)' },
            '50%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.6)' },
          },
          targetAppear: {
            '0%': { transform: 'scale(0) rotate(180deg)', opacity: '0' },
            '50%': { transform: 'scale(1.1) rotate(90deg)', opacity: '1' },
            '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          }
        },
        colors: {
          primary: {
            50: '#faf5ff',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            900: '#581c87',
          }
        }
      },
    },
    plugins: [],
  }