import { Metadata } from 'next';
import BuffetClient from './BuffetClient';

export const metadata: Metadata = {
  title: "Buffet Triestino a Viale XX Settembre 16 | Schiacciateria Retrò",
  description: "Il vero buffet triestino alla Schiacciateria Retrò: fritti misti, patate in tecia, cotechino, polpette e i classici della tradizione triestina in Viale XX Settembre 16.",
  alternates: {
    canonical: "https://schiacciateriaretrotrieste.com/buffet-triestino",
  }
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
