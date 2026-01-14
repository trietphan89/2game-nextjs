/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================================================
      // DESIGN SYSTEM - COLOR PALETTE
      // ============================================================================
      colors: {
        // Brand Colors (Orange Accent)
        primary: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2A',
          light: '#FF8357',
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD4C7',
          300: '#FFB8A3',
          400: '#FF8F6B',
          500: '#FF6B35',
          600: '#E55A2A',
          700: '#CC4A1F',
          800: '#A33B18',
          900: '#7A2C12',
        },

        // Dark Theme - Layered Depths (NO Pure Black)
        dark: {
          DEFAULT: '#0D1117',      // Main background
          secondary: '#161B22',    // Elevated layer 1
          elevated: '#1C2128',     // Elevated layer 2
          hover: '#21262D',        // Hover state
          card: '#0A0E17',         // Card background (slightly darker)
        },

        // Border & Dividers
        border: {
          primary: '#30363D',
          secondary: '#21262D',
          accent: '#FF6B35',
        },

        // Text Colors
        text: {
          primary: '#E8EAED',      // Main text
          secondary: '#9AA0A6',    // Secondary text
          muted: '#6E7681',        // Muted text
          accent: '#FF6B35',       // Accent text
        },

        // Glassmorphism Colors
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.3)',
        },
      },

      // ============================================================================
      // DESIGN SYSTEM - TYPOGRAPHY SCALE (COMPACT)
      // ============================================================================
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.01em' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0em' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        // Stopped at 30px - NO MORE 40px+ headings
      },

      // ============================================================================
      // DESIGN SYSTEM - SPACING & LAYOUT (COMPACT GRID)
      // ============================================================================
      spacing: {
        'section': '3rem',       // 48px - Section spacing
        'card': '1.5rem',        // 24px - Card padding
        'compact': '1rem',       // 16px - Compact padding
        'tight': '0.75rem',      // 12px - Tight spacing
      },

      // ============================================================================
      // DESIGN SYSTEM - BORDER RADIUS (CONSISTENT)
      // ============================================================================
      borderRadius: {
        'card': '12px',          // For large containers
        'button': '8px',         // For buttons and inputs
        'tag': '6px',            // For small tags/badges
      },

      // ============================================================================
      // DESIGN SYSTEM - BACKGROUND GRADIENTS
      // ============================================================================
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0D1117 0%, #161B22 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },

      // ============================================================================
      // DESIGN SYSTEM - TYPOGRAPHY (FONT FAMILY)
      // ============================================================================
      fontFamily: {
        sans: [
          'var(--font-be-vietnam)',
          'Be Vietnam Pro',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },

      // ============================================================================
      // DESIGN SYSTEM - ANIMATIONS & TRANSITIONS
      // ============================================================================
      transitionDuration: {
        'smooth': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ============================================================================
      // DESIGN SYSTEM - BOX SHADOWS (DEPTH)
      // ============================================================================
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'hover': '0 8px 24px 0 rgba(255, 107, 53, 0.2)',
        // Linear-inspired shadows
        'linear-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
        'linear-md': '0 2px 8px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.15)',
        'linear-lg': '0 4px 16px 0 rgba(0, 0, 0, 0.35), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'linear-floating': '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
