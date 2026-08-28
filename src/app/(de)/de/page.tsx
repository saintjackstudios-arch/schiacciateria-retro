import { Metadata } from 'next';
import DeClient from './DeClient';
import { FAQ } from './deContenuti';

const URL_IT = 'https://schiacciateriaretrotrieste.com';
const URL_EN = 'https://schiacciateriaretrotrieste.com/en';
const URL_DE = 'https://schiacciateriaretrotrieste.com/de';

export const metadata: Metadata = {
  // Come sulla pagina inglese: `absolute` toglie il suffisso col nostro nome,
  // che qui non cerca nessuno. Chi arriva cerca dove si mangia a Triest.
  title: { absolute: 'Wo man in Triest isst: Schiacciata & Buffet' },
  description:
    'Was man in Triest isst und wo. Schiacciata, kleine Teller und Bier am Viale XX Settembre — 15 Minuten zu Fuß vom Bahnhof, 24 vom Kreuzfahrtterminal.',
  alternates: {
    canonical: URL_DE,
    // hreflang RECIPROCO fra tutte e tre le lingue: ognuna dichiara le altre
    // due e se stessa. Se una dichiarazione va in una direzione sola Google la
    // ignora, ed e' l'errore trovato su Villa Marittimi.
    languages: {
      'it-IT': URL_IT,
      en: URL_EN,
      de: URL_DE,
      'x-default': URL_IT,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: URL_DE,
    siteName: 'Schiacciateria Retrò Trieste',
    title: 'Wo man in Triest isst: Schiacciata & Buffet',
    description:
      'Schiacciata, kleine Teller und kaltes Bier am Viale XX Settembre. 15 Minuten zu Fuß vom Bahnhof Trieste Centrale, 24 vom Kreuzfahrtterminal.',
    images: [
      {
        url: '/images/menu_hero_schiacciata.webp',
        width: 1200,
        height: 669,
        alt: 'Eine Schiacciata in der Schiacciateria Retrò in Triest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wo man in Triest isst: Schiacciata & Buffet',
    description:
      'Schiacciata, kleine Teller und kaltes Bier am Viale XX Settembre, Triest.',
    images: ['/images/menu_hero_schiacciata.webp'],
  },
};

// Le stesse domande e le stesse risposte che si vedono in pagina: le FAQ nei
// dati strutturati devono corrispondere al testo visibile, se no Google le
// scarta. Generate dalla stessa lista, cosi non possono divergere.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: FAQ.map((riga) => ({
    '@type': 'Question',
    name: riga.q,
    acceptedAnswer: { '@type': 'Answer', text: riga.a },
  })),
};

export default function DePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <DeClient />
    </>
  );
}
