import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        tech: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        neutral: {
          0: '#ffffff',
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          border: 'var(--surface-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['clamp(0.70rem, 0.68rem + 0.10vw, 0.75rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.82rem, 0.78rem + 0.20vw, 0.875rem)', { lineHeight: '1.5' }],
        base: ['clamp(0.95rem, 0.90rem + 0.25vw, 1.00rem)', { lineHeight: '1.6' }],
        lg: ['clamp(1.10rem, 1.02rem + 0.40vw, 1.125rem)', { lineHeight: '1.6' }],
        xl: ['clamp(1.30rem, 1.18rem + 0.60vw, 1.50rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.60rem, 1.40rem + 1.00vw, 2.00rem)', { lineHeight: '1.2' }],
        '3xl': ['clamp(2.00rem, 1.70rem + 1.50vw, 2.75rem)', { lineHeight: '1.15' }],
        '4xl': ['clamp(2.50rem, 2.00rem + 2.50vw, 3.75rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3.20rem, 2.40rem + 4.00vw, 5.00rem)', { lineHeight: '1.05' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 24px rgba(16, 185, 129, 0.35)',
        'glow-tech': '0 0 24px rgba(59, 130, 246, 0.35)',
        'inner-glow': 'inset 0 0 24px rgba(16, 185, 129, 0.15)',
      },
      transitionTimingFunction: {
        'bounce-subtle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(15, 23, 42, 0.55), rgba(4, 120, 87, 0.45))',
      },
    },
  },
  plugins: [],
}
export default config