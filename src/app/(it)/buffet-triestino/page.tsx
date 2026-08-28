import { Metadata } from 'next';
import BuffetClient from './BuffetClient';

export const metadata: Metadata = {
  title: "Buffet Triestino a Trieste",
  description: "Il vero buffet triestino da Schiacciateria Retrò: fritti misti, patate in tecia, tartine e polpette, i classici della tradizione in Viale XX Settembre 16.",
  alternates: {
    canonical: "https://schiacciateriaretrotrieste.com/buffet-triestino",
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://schiacciateriaretrotrieste.com/buffet-triestino',
    siteName: 'Schiacciateria Retrò Trieste',
    title: "Buffet Triestino a Trieste | Schiacciateria Retrò",
    description: "Il vero buffet triestino da Schiacciateria Retrò: fritti misti, patate in tecia, tartine e polpette, i classici della tradizione in Viale XX Settembre 16.",
    images: [
      {
        url: '/images/tavolata_ignorante.webp',
        width: 1200,
        height: 669,
        alt: 'Buffet Triestino da Schiacciateria Retrò',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Buffet Triestino a Trieste | Schiacciateria Retrò",
    description: "Fritti misti, patate in tecia, tartine e polpette: il vero buffet triestino in Viale XX Settembre 16.",
    images: ['/images/tavolata_ignorante.webp'],
  },
};

export default function BuffetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://schiacciateriaretrotrieste.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Buffet Triestino",
                "item": "https://schiacciateriaretrotrieste.com/buffet-triestino"
              }
            ]
          })
        }}
      />
      <BuffetClient />
    </>
  );
}
