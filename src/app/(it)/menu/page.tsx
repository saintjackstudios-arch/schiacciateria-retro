import { Metadata } from 'next';
import MenuClient from './MenuClient';
import { menuSchema } from './menuSchema';

export const metadata: Metadata = {
  title: "Menu Schiacciate e Fritti",
  description: "Scopri il menu della Schiacciateria Retrò a Trieste. Schiacciate ripiene a badilate, fritti croccanti, cicchetti e street food triestino in Viale XX Settembre.",
  alternates: {
    canonical: "https://schiacciateriaretrotrieste.com/menu",
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://schiacciateriaretrotrieste.com/menu',
    siteName: 'Schiacciateria Retrò Trieste',
    title: "Menu Schiacciate e Fritti",
    description: "Scopri il menu della Schiacciateria Retrò a Trieste. Schiacciate ripiene a badilate, fritti croccanti, cicchetti e street food triestino in Viale XX Settembre.",
    images: [
      {
        url: '/images/menu_hero_schiacciata.webp',
        width: 1200,
        height: 669,
        alt: 'Menu Schiacciateria Retrò Trieste',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Menu Schiacciate e Fritti | Schiacciateria Retrò Trieste",
    description: "Schiacciate ripiene a badilate, fritti croccanti e street food triestino in Viale XX Settembre 16.",
    images: ['/images/menu_hero_schiacciata.webp'],
  },
};

export default function MenuPage() {
  return (
    <>
      {/* I 48 piatti con il prezzo, in forma leggibile da Google e dalle IA.
          Sta qui e non dentro MenuClient perche' non deve dipendere da quale
          menu e' visibile a schermo: pranzo o cena, la scheda e' sempre intera. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema()) }}
      />
      <MenuClient />
    </>
  );
}
