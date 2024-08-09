// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */
import path from 'node:path'

module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    path.join(path.dirname(require.resolve('@coinbase/onchainkit')), '**/*.js,ts,jsx,tsx,mdx'),
  ],
  theme: {
    container: {
      center: true,
      screens: {
        ios: '320px',
        samsungS8: '360px',
        xs: '390px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xls': '1350px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
    },
    extend: {
      colors: {
        grey: {
          DEFAULT: '#949494',
          light: '#f6f6f6',
        },
        background: {
          DEFAULT: '#f2e8cd',
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['dark'],
    },
  },
  plugins: [],
}
