import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL('https://barretro.com'),
  title: {
    default: "Schiacciateria Retrò Trieste | Viale XX Settembre",
    template: "%s | Schiacciateria Retrò Trieste",
  },
  description: "Schiacciateria Retrò è il riferimento a Trieste, in Viale XX Settembre 16. Schiacciata artigianale, birre selezionate e il vero street food triestino. Vieni a trovarci!",
  keywords: ["bar Trieste", "schiacciateria Trieste", "street food Trieste", "Viale XX Settembre Trieste", "aperitivo Trieste", "schiacciata romana Trieste"],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://barretro.com',
    siteName: 'Schiacciateria Retrò Trieste',
    title: "Schiacciateria Retrò Trieste | Viale XX Settembre",
    description: "La schiacciateria artigianale nel cuore di Trieste. Schiacciata, birra e l'autentico street food triestino in Viale XX Settembre 16.",
    images: [
      {
        url: '/logo_retro.png',
        width: 128,
        height: 181,
        alt: 'Logo Schiacciateria Retrò Trieste',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Schiacciateria Retrò Trieste | Viale XX Settembre",
    description: "La schiacciateria artigianale nel cuore di Trieste. Schiacciata, birra e l'autentico street food triestino.",
    images: ['/logo_retro.png'],
  },
  icons: {
    icon: '/logo_retro.png',
    shortcut: '/logo_retro.png',
    apple: '/logo_retro.png',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Oswald:wght@700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-sans: 'Inter', sans-serif;
            --font-display: 'Oswald', sans-serif;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Schiacciateria Retrò",
              "image": "https://barretro.com/logo_retro.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Viale XX Settembre",
                "addressLocality": "Trieste",
                "addressRegion": "TS",
                "postalCode": "34125",
                "addressCountry": "IT"
              },
              "servesCuisine": ["Fast Food", "Street Food", "Cucina Triestina"],
              "priceRange": "€",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"],
                  "opens": "10:00",
                  "closes": "23:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Friday","Saturday"],
                  "opens": "10:00",
                  "closes": "01:00"
                }
              ],
              "url": "https://barretro.com",
              "description": "Schiacciateria Retrò è il locale artigianale di Trieste, situato in Viale XX Settembre 16. Propone schiacciata romana, birre selezionate e street food di qualità nel cuore della movida triestina."
            }) 
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdfaf3] text-[#111111]">
        <SiteHeader />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
