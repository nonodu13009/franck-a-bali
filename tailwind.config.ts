import type { Config } from 'tailwindcss';

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
        background: {
          DEFAULT: '#0c0c0c',
        },
        foreground: {
          DEFAULT: '#ffffff',
        },
        muted: {
          DEFAULT: '#1a1a1a',
          foreground: '#a0a0a0',
        },
        border: {
          DEFAULT: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#ffffff',
          foreground: '#0c0c0c',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

