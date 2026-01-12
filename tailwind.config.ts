import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury dark theme
        luxe: {
          50: '#f9f8f6',
          100: '#f0ede8',
          200: '#e1d8d0',
          300: '#d1bfb4',
          400: '#b39a8a',
          500: '#8f7964',
          600: '#6d5c50',
          700: '#50423a',
          800: '#3a2f28',
          900: '#2a2118',
          950: '#1a130c',
        },
        // Dark backgrounds
        dark: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#303030',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#000000',
        },
        // Accent colors - subtle gold and neon blue
        accent: {
          gold: '#d4a574',
          'gold-light': '#e8c4a0',
          'gold-dark': '#b8824f',
          blue: '#00d9ff',
          'blue-light': '#4df9ff',
          'blue-dark': '#0088cc',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['SF Pro Display', 'Poppins', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.1em',
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'luxury': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'luxury-lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'luxury-xl': '0 16px 48px rgba(0, 0, 0, 0.25)',
        'glow-gold': '0 0 20px rgba(212, 165, 116, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 217, 255, 0.3)',
        'inset-gold': 'inset 0 0 20px rgba(212, 165, 116, 0.1)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #2a2118 0%, #3a2f28 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4a574 0%, #e8c4a0 100%)',
        'gradient-blue': 'linear-gradient(135deg, #00d9ff 0%, #0088cc 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'slide-in-down': 'slideInDown 0.6s ease-out',
        'scale-up': 'scaleUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-light': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
