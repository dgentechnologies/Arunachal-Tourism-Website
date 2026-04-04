
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        /* Topographic Poetry typography (DESIGN.md §3) */
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'Noto Sans Devanagari', 'Noto Sans Bengali', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        /* Design-system surface tokens */
        'surface': 'var(--surface)',
        'surface-low': 'var(--surface-low)',
        'surface-lowest': 'var(--surface-lowest)',
        'surface-highest': 'var(--surface-highest)',
        'on-surface': 'var(--on-surface)',
        'outline-variant': 'var(--outline-variant)',
        'secondary-fixed': 'var(--secondary-fixed)',
        'primary-container': 'var(--primary-container)',
        /* Shadcn tokens */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        /* Topographic Poetry border-radius scale (DESIGN.md §5) */
        xl: '3rem',
        lg: '1.5rem', /* var(--radius) */
        md: '1.5rem',
        sm: '0.5rem',
        full: '9999px',
      },
      boxShadow: {
        /* Ambient shadow for floating elements (DESIGN.md §4) */
        'ambient': '0 0 40px -10px rgba(28, 27, 27, 0.06)',
        /* Legacy — kept so existing usages don't break */
        'soft': '0 8px 40px 0 rgba(0, 106, 98, 0.08)',
        'float': '0 16px 60px 0 rgba(0, 106, 98, 0.12)',
        'glow': '0 4px 24px 0 rgba(64, 224, 208, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        /* Mist effect: fade + scale from 98% → 100% (DESIGN.md §7) */
        'mist-in': {
          from: { opacity: '0', transform: 'scale(0.98) translateY(12px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'shimmer': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'mist-in': 'mist-in 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
