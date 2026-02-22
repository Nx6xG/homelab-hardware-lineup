/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // ─── Design Tokens ──────────────────────────────────────────────────
      colors: {
        // Neutral dark surface palette
        surface: {
          0:  '#0a0a0c',  // base bg
          1:  '#111115',  // card/panel bg
          2:  '#18181d',  // elevated surface
          3:  '#222228',  // hover/border
          4:  '#2e2e36',  // strong border
        },
        // Text hierarchy
        ink: {
          1: '#f5f5f7',   // primary text
          2: '#a1a1aa',   // secondary
          3: '#6b6b74',   // tertiary/muted
          4: '#404049',   // disabled
        },
        // Single accent: electric blue
        accent: {
          DEFAULT: '#3b82f6',
          50:  '#eff6ff',
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
        // Status colors
        status: {
          online:      '#22c55e',
          offline:     '#ef4444',
          maintenance: '#f59e0b',
          retired:     '#6b7280',
        },
      },

      // ─── Spacing Scale ───────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '88': '22rem',
        '104': '26rem',
        '128': '32rem',
      },

      // ─── Container Widths ─────────────────────────────────────────────
      maxWidth: {
        'content':  '1080px',
        'wide':     '1280px',
        'prose':    '72ch',
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        '2xl':  '1rem',
        '3xl':  '1.5rem',
        '4xl':  '2rem',
      },

      // ─── Box Shadows ─────────────────────────────────────────────────
      boxShadow: {
        'card':   '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.35)',
        'panel':  '0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.4)',
        'glow':   '0 0 20px rgba(59,130,246,0.25)',
      },

      // ─── Typography ──────────────────────────────────────────────────
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"Segoe UI"', 'system-ui', 'sans-serif'
        ],
        mono: [
          '"SF Mono"', '"JetBrains Mono"', '"Fira Code"',
          'Menlo', 'monospace'
        ],
      },
      fontSize: {
        // Display sizes
        'display-xl': ['clamp(3rem, 8vw, 6.5rem)',   { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)',   { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)',{ lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        // Body sizes
        'body-lg': ['1.1875rem', { lineHeight: '1.65' }],
        'body-md': ['1rem',      { lineHeight: '1.6' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.55' }],
        'label':   ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
        'mono-sm': ['0.8125rem', { lineHeight: '1.5', fontFamily: 'mono' }],
      },

      // ─── Animations ──────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-right': {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':     'fade-in 0.4s ease both',
        'scale-in':    'scale-in 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'shimmer':     'shimmer 2s linear infinite',
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
