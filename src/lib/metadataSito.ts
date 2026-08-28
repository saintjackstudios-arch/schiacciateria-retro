import type { Metadata } from 'next';

/**
 * I metadati validi per tutto il sito, in un posto solo.
 *
 * Stanno qui e non dentro un layout perche' ora i layout sono DUE, uno per
 * lingua (vedi src/app/(it) e src/app/(en)): se il blocco fosse copiato in
 * tutti e due, prima o poi cambierebbe solo in uno.
 *
 * Le singole pagine sovrascrivono quello che serve a loro — la landing
 * inglese, per esempio, si riscrive titolo, descrizione, canonical, hreflang
 * e Open Graph in `src/app/(en)/en/page.tsx`.
 */
export const metadataSito: Metadata = {
  metadataBase: new URL('https://schiacciateriaretrotrieste.com'),
  title: {
    default: "Schiacciateria Retrò Trieste | Viale XX Settembre",
    template: "%s | Schiacciateria Retrò Trieste",
  },
  description: "Schiacciateria Retrò è il riferimento a Trieste, in Viale XX Settembre 16. Schiacciata artigianale, birre selezionate e il vero street food triestino. Vieni a trovarci!",
  keywords: ["bar Trieste", "schiacciateria Trieste", "street food Trieste", "Viale XX Settembre Trieste", "aperitivo Trieste", "schiacciata romana Trieste"],
  verification: {
    google: "VVCypvtM6nG-altOznc0SginVUV0yZhynG47rdqC02Y",
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://schiacciateriaretrotrieste.com',
    siteName: 'Schiacciateria Retrò Trieste',
    title: "Schiacciateria Retrò Trieste | Viale XX Settembre",
    description: "La schiacciateria artigianale nel cuore di Trieste. Schiacciata, birra e l'autentico street food triestino in Viale XX Settembre 16.",
    images: [
      {
        url: '/hero_aggressive.jpg',
        width: 1200,
        height: 669,
        alt: 'Schiacciata artigianale Schiacciateria Retrò Trieste',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Schiacciateria Retrò Trieste | Viale XX Settembre",
    description: "La schiacciateria artigianale nel cuore di Trieste. Schiacciata, birra e l'autentico street food triestino.",
    images: ['/hero_aggressive.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};
