// NOTE: This package is designed for privacy and only fetches from google on
// the server side, which is also something we care about here.
import { Readex_Pro } from 'next/font/google';
import localFont from 'next/font/local';

// NOTE: Next always loads woff2 fonts. If we need more control, we can always
// import the fonts in our repo.
// https://github.com/vercel/next.js/blob/v13.4.12/packages/font/src/google/fetch-css-from-google-fonts.ts#L66-L70
export const readexPro = Readex_Pro({
  variable: '--font-family-readex-pro',
  weight: [
    '200', // ExtraLight
    '300', // Light
    '400', // Regular
    '600', // SemiBold
    '700', // Bold
  ],
  fallback: ['sans-serif'],
  subsets: ['latin'],
});

// 2022 legacy font (TODO: remove)
export const pineapple = localFont({
  variable: '--font-family-pineapple',
  // woff2 has good enough browser support, we don't need fallback formats
  src: './font-files/PineappleDemo.woff2',
  preload: false,
});
