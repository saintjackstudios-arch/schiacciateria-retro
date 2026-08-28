import {
  MenuItem,
  PRANZO_SCHIACCIATE, PRANZO_INSALATONE, PRANZO_BRUSCHETTONI,
  CENA_SCHIACCIATE, CENA_SMASH, CENA_BRUSCHETTONI,
  SFIZI_PATATE, SFIZI_ALTRI, DOLCI, BEVANDE_BIRRE, BEVANDE_SPRITZ,
} from '@/lib/menuData';

const SITO = 'https://schiacciateriaretrotrieste.com';

/**
 * Traduce le voci del menu in schema.org `Menu`.
 *
 * A cosa serve: i 48 prezzi sono scritti in pagina, ma per una macchina sono
 * caratteri, non «piatto + prezzo». Dichiararli qui e' l'unica cosa che il sito
 * ha e i concorrenti no — verificato il 26/08/2026: nessuno dei quattro locali
 * con un sito raggiungibile espone i prezzi in forma leggibile, e due non li
 * espongono affatto.
 *
 * ⛔ Da NON aggiungere qui: `aggregateRating` con il 4,6/443 copiato dalla
 * scheda Google. E' vietato dalle linee guida e mette a rischio i risultati
 * arricchiti di tutto il dominio.
 */

type Offerta = { '@type': 'Offer'; price: string; priceCurrency: 'EUR'; name?: string };

/** `9,5` → `"9.50"`. Lo schema vuole il punto decimale, non la virgola. */
function importo(n: number): string {
  return n.toFixed(2);
}

/** `"0,2 l - 3,00€"` → `{ formato: "0,2 l", prezzo: "3.00" }` */
function leggiFormato(riga: string): { formato: string; prezzo: string } | null {
  const m = riga.match(/^\s*(.+?)\s*-\s*([\d.,]+)\s*€/);
  if (!m) return null;
  const valore = Number(m[2].replace(',', '.'));
  if (Number.isNaN(valore)) return null;
  return { formato: m[1].trim(), prezzo: importo(valore) };
}

/**
 * Un piatto puo' avere: un prezzo secco (quasi tutti), due prezzi (i burger,
 * col e senza patatine), piu' prezzi per formato (le birre alla spina), oppure
 * nessun prezzo dichiarabile — la «Birra a Rotazione» dice «Chiedi al banco»,
 * e in quel caso la voce resta senza offerta invece di inventarne una.
 */
function offerte(item: MenuItem): Offerta[] {
  if (typeof item.price === 'number') {
    const base: Offerta[] = [{ '@type': 'Offer', price: importo(item.price), priceCurrency: 'EUR' }];
    if (item.menuPriceWithChips) {
      const conPatatine = Number(item.menuPriceWithChips.replace('€', '').replace(',', '.').trim());
      if (!Number.isNaN(conPatatine)) {
        base[0].name = 'Solo panino';
        base.push({ '@type': 'Offer', price: importo(conPatatine), priceCurrency: 'EUR', name: 'Menu con patatine' });
      }
    }
    return base;
  }
  // prezzo scritto a mano: puo' contenere piu' formati separati da a capo
  return item.price
    .split('\n')
    .map(leggiFormato)
    .filter((x): x is { formato: string; prezzo: string } => x !== null)
    .map((x) => ({ '@type': 'Offer' as const, price: x.prezzo, priceCurrency: 'EUR' as const, name: x.formato }));
}

function voce(item: MenuItem) {
  const off = offerte(item);
  return {
    '@type': 'MenuItem',
    name: item.name,
    // `ingredients` e' quello che la persona legge sotto il nome; `description`
    // c'e' solo su alcune voci. Uso entrambe quando ci sono, senza ripetermi.
    ...(item.description || item.ingredients
      ? { description: [item.ingredients, item.description].filter(Boolean).join(' — ') }
      : {}),
    ...(item.image ? { image: `${SITO}${item.image}` } : {}),
    ...(off.length === 1 ? { offers: off[0] } : off.length > 1 ? { offers: off } : {}),
  };
}

const SEZIONI: { nome: string; voci: MenuItem[] }[] = [
  { nome: 'Le Nostre Schiacciate (pranzo)', voci: PRANZO_SCHIACCIATE },
  { nome: 'Le Insalatone', voci: PRANZO_INSALATONE },
  { nome: 'Bruschettoni', voci: PRANZO_BRUSCHETTONI },
  { nome: 'Le Nostre Schiacciate (cena)', voci: CENA_SCHIACCIATE },
  { nome: 'Le Smash-ate', voci: CENA_SMASH },
  { nome: 'Bruschettoni Speciali', voci: CENA_BRUSCHETTONI },
  { nome: 'Sfizi & Golosita', voci: [...SFIZI_PATATE, ...SFIZI_ALTRI] },
  { nome: 'I Nostri Dolci', voci: DOLCI },
  { nome: 'Le Birre alla Spina', voci: BEVANDE_BIRRE },
  { nome: 'I Nostri Spritz', voci: BEVANDE_SPRITZ },
];

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITO}/menu#menu`,
    name: 'Menu della Schiacciateria Retro',
    url: `${SITO}/menu`,
    inLanguage: 'it-IT',
    // Lega il menu al locale gia' dichiarato nel layout, cosi' Google non deve
    // indovinare di chi sia questo menu.
    provider: {
      '@type': 'Restaurant',
      name: 'Schiacciateria Retro',
      url: SITO,
      telephone: '+393756264680',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Viale XX Settembre 16',
        addressLocality: 'Trieste',
        addressRegion: 'TS',
        postalCode: '34125',
        addressCountry: 'IT',
      },
    },
    hasMenuSection: SEZIONI.map((s) => ({
      '@type': 'MenuSection',
      name: s.nome,
      hasMenuItem: s.voci.map(voce),
    })),
  };
}

/** Quante voci e quante offerte finiscono nella scheda. Serve alla verifica. */
export function conteggioMenu() {
  const voci = SEZIONI.reduce((n, s) => n + s.voci.length, 0);
  const conPrezzo = SEZIONI.reduce((n, s) => n + s.voci.filter((v) => offerte(v).length > 0).length, 0);
  const offerteTotali = SEZIONI.reduce((n, s) => n + s.voci.reduce((m, v) => m + offerte(v).length, 0), 0);
  return { sezioni: SEZIONI.length, voci, conPrezzo, offerteTotali };
}
