/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#F5F5F5',
          soft: '#EAEAEA',
          cool: '#D9D9D9',
          silver: '#CFCFCF',
        },
        orange: {
          burnt: '#C96A1B',
          deep: '#D97822',
          warm: '#E58A2C',
        },
        brown: {
          dark: '#4B2E1F',
          burnt: '#5A3422',
          blackish: '#2A1B14',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(42, 27, 20, 0.3)',
        'premium-orange': '0 10px 30px -10px rgba(201, 106, 27, 0.4)',
      },
    },
  },
  plugins: [],
}
