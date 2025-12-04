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
        // Palette Balinaise - Tons Chauds Tropicaux
        background: {
          DEFAULT: '#F8F3E6',          // Crème naturelle
        },
        foreground: {
          DEFAULT: '#2B2B2B',          // Noir chaud
        },
        
        // Couleurs Primaires - Océan
        primary: {
          DEFAULT: '#1565A0',          // Bleu océan
          dark: '#0A4C6B',             // Bleu profond
          foreground: '#FEFAE0',       // Blanc chaud
        },
        
        // Couleurs Secondaires - Jungle
        secondary: {
          DEFAULT: '#2D5A4D',          // Vert jungle
          light: '#3D6B5D',            // Vert médium
          foreground: '#FEFAE0',       // Blanc chaud
        },
        
        // Accents Tropicaux
        accent: {
          DEFAULT: '#52B788',          // Vert palmier
          light: '#74C69D',            // Végétation luxuriante
          warm: '#F4A261',             // Frangipani orangé
          pink: '#D84A6B',             // Hibiscus rose
        },
        
        // Terre et Sable
        sand: {
          DEFAULT: '#C9A675',          // Sable doré
          dark: '#A68B5B',             // Terre balinaise
        },
        bamboo: '#8B7355',             // Bambou séché
        
        // Neutrals
        muted: {
          DEFAULT: '#E5DCC5',          // Beige sable
          foreground: '#6B5D4F',       // Brun doux
        },
        border: {
          DEFAULT: 'rgba(45, 90, 77, 0.2)', // Vert jungle transparent
        },
        
        // Jungle
        jungle: {
          DEFAULT: '#1A3A2E',          // Vert jungle profond
          medium: '#2D5A4D',           // Vert jungle médium
        },
        
        // Océan
        ocean: {
          DEFAULT: '#1565A0',          // Bleu océan
          light: '#2986CC',            // Bleu lagon
          dark: '#0A4C6B',             // Bleu profond
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

