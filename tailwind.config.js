/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glitch: {
          '0%, 100%': { 
            opacity: '1',
            transform: 'translate(0)',
            textShadow: '2px 2px #ff0000, -2px -2px #00ff00'
          },
          '10%': { 
            opacity: '0.8',
            transform: 'translate(-2px, 2px)',
            textShadow: '3px 3px #ff0000, -3px -3px #00ff00'
          },
          '20%': { 
            opacity: '1',
            transform: 'translate(2px, -2px)',
            textShadow: '-2px -2px #ff0000, 2px 2px #00ff00'
          },
          '30%': { 
            opacity: '0.9',
            transform: 'translate(0)',
            textShadow: '2px 2px #ff0000, -2px -2px #00ff00'
          },
          '40%': { 
            opacity: '1',
            transform: 'translate(-1px, 1px)',
            textShadow: '1px 1px #ff0000, -1px -1px #00ff00'
          },
          '50%': {
            opacity: '0.85',
            transform: 'translate(1px, -1px)',
            textShadow: '4px 4px #ff0000, -4px -4px #00ff00'
          },
          '60%': { 
            opacity: '1',
            transform: 'translate(0)',
            textShadow: '2px 2px #ff0000, -2px -2px #00ff00'
          },
          '70%': { 
            opacity: '0.95',
            transform: 'translate(-3px, 0)',
            textShadow: '3px 0 #ff0000, -3px 0 #00ff00'
          },
          '80%': { 
            opacity: '1',
            transform: 'translate(0)',
            textShadow: '2px 2px #ff0000, -2px -2px #00ff00'
          },
          '90%': { 
            opacity: '0.9',
            transform: 'translate(2px, 2px)',
            textShadow: '-2px -2px #ff0000, 2px 2px #00ff00'
          },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '0.8' },
          '20%': { opacity: '1' },
          '30%': { opacity: '0.9' },
          '40%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '60%': { opacity: '1' },
          '70%': { opacity: '0.95' },
          '80%': { opacity: '1' },
          '90%': { opacity: '0.9' },
        },
        pulse_glow: {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.5))'
          },
          '50%': { 
            filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8))'
          },
        },
      },
      animation: {
        glitch: 'glitch 2s infinite',
        flicker: 'flicker 3s infinite',
        'pulse-glow': 'pulse_glow 2s infinite',
      },
    },
  },
  plugins: [],
}
