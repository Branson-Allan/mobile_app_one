/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          500: '#F97316',
          600: '#EA580C', // Base Kati Orange Action
          700: '#C2410C',
          800: '#9A3412',
        },
        secondary: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          600: '#8B1D41', // Base DTB Burgundy / Maroon
          700: '#731433',
          900: '#4A0B20',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#F8FAFC',  // Canvas Background
          100: '#F1F5F9', // Subtle fill
          200: '#E2E8F0', // Default border
          300: '#CBD5E1', // Input border
          400: '#94A3B8', // Placeholder / Inactive
          500: '#64748B', // Secondary icons / captions
          600: '#475569', // Body secondary / labels
          700: '#334155', // Table headers / headings
          800: '#1E293B', // Section titles
          900: '#0F172A', // Body primary
        },
        status: {
          new: { text: '#B45309', bg: '#FEF3C7', border: '#FDE68A' },
          cold: { text: '#0369A1', bg: '#E0F2FE', border: '#BAE6FD' },
          warm: { text: '#C2410C', bg: '#FFEDD5', border: '#FED7AA' },
          hot: { text: '#B91C1C', bg: '#FEE2E2', border: '#FECACA' },
          nurturing: { text: '#6D28D9', bg: '#EDE9FE', border: '#DDD6FE' },
          converted: { text: '#15803D', bg: '#DCFCE7', border: '#BBF7D0' },
          lost: { text: '#374151', bg: '#F3F4F6', border: '#E5E7EB' },
        },
        feedback: {
          success: '#16A34A',
          'success-bg': '#DCFCE7',
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
          error: '#DC2626',
          'error-bg': '#FEE2E2',
          info: '#0284C7',
          'info-bg': '#E0F2FE',
        }
      },
      spacing: {
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.10), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
