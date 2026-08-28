import { Metadata } from 'next';
import EnClient from './EnClient';
import { FAQ } from './enContenuti';

const URL_IT = 'https://schiacciateriaretrotrieste.com';
const URL_EN = 'https://schiacciateriaretrotrieste.com/en';

export const metadata: Metadata = {
  // `absolute` toglie il suffisso "| Schiacciateria Retrò Trieste" del layout:
  // sono 31 caratteri su 60, e su questa pagina il nostro nome non lo cerca
  // nessuno. Chi arriva qui cerca "where to eat in trieste", non noi.
  title: { absolute: 'Where to Eat in Trieste: Schiacciata & Buffet Food' },
  description:
    'What to eat in Trieste and where. Schiacciata, small plates and beer on Viale XX Settembre — 15 minutes on foot from the station, 24 from the cruise pier.',
  alternates: {
    canonical: URL_EN,
    // hreflang RECIPROCO: la pagina italiana dichiara questa e questa dichiara
    // quella. Se il rimando va in una direzione sola Google lo ignora, ed e'
    // esattamente l'errore che abbiamo trovato su Villa Marittimi.
    languages: {
      'it-IT': URL_IT,
      en: URL_EN,
      'x-default': URL_IT,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: URL_EN,
    siteName: 'Schiacciateria Retrò Trieste',
    title: 'Where to Eat in Trieste: Schiacciata & Buffet Food',
    description:
      'Schiacciata, small plates and cold beer on Viale XX Settembre. 15 minutes on foot from Trieste Centrale, 24 from the cruise pier.',
    images: [
      {
        url: '/images/menu_hero_schiacciata.webp',
        width: 1200,
        height: 669,
        alt: 'A schiacciata at Schiacciateria Retrò in Trieste',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Eat in Trieste: Schiacciata & Buffet Food',
    description:
      'Schiacciata, small plates and cold beer on Viale XX Settembre, Trieste.',
    images: ['/images/menu_hero_schiacciata.webp'],
  },
};

// Le stesse domande e le stesse risposte che si vedono in pagina: le FAQ nei
// dati strutturati devono corrispondere al testo visibile, se no Google le
// scarta. Generate dalla stessa lista, cosi non possono divergere.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en',
  mainEntity: FAQ.map((riga) => ({
    '@type': 'Question',
    name: riga.q,
    acceptedAnswer: { '@type': 'Answer', text: riga.a },
  })),
};

export default function EnPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EnClient />
    </>
  );
}
