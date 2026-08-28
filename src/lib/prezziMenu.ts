import {
  PRANZO_SCHIACCIATE,
  PRANZO_INSALATONE,
  CENA_SCHIACCIATE,
  CENA_SMASH,
  PRANZO_BRUSCHETTONI,
  CENA_BRUSCHETTONI,
  SFIZI_PATATE,
  SFIZI_ALTRI,
  DOLCI,
  BEVANDE_BIRRE,
  BEVANDE_SPRITZ,
  type MenuItem,
} from '@/lib/menuData';

/**
 * Il prezzo si scrive UNA VOLTA SOLA, in menuData.ts.
 *
 * Le pagine in lingua straniera (/en, e domani /de, /sl, /hr...) traducono gli
 * ingredienti, mai i prezzi e mai i nomi dei piatti: "Top de Gamma" si chiama
 * cosi anche per un inglese, e 8,50 e' 8,50 in tutte le lingue del mondo.
 *
 * Quindi ogni pagina in lingua chiede il prezzo a questo file passando il nome
 * del piatto. Se Davide cambia un prezzo, cambia in menuData.ts e si aggiorna
 * da solo in tutte le lingue: e' il motivo per cui aggiungere l'ottava lingua
 * costa meno della seconda.
 *
 * Se un nome non esiste piu' (piatto rinominato o tolto dal menu) queste
 * funzioni FANNO FALLIRE LA BUILD. E' voluto: meglio un errore in fase di
 * compilazione che una pagina inglese online con un prezzo che non esiste.
 */

const TUTTE_LE_VOCI: MenuItem[] = [
  ...PRANZO_SCHIACCIATE,
  ...CENA_SCHIACCIATE,
  ...PRANZO_INSALATONE,
  ...CENA_SMASH,
  ...PRANZO_BRUSCHETTONI,
  ...CENA_BRUSCHETTONI,
  ...SFIZI_PATATE,
  ...SFIZI_ALTRI,
  ...DOLCI,
  ...BEVANDE_BIRRE,
  ...BEVANDE_SPRITZ,
];

/** La voce di menu con quel nome, o build fallita. */
export function voceDiMenu(nome: string): MenuItem {
  const voce = TUTTE_LE_VOCI.find((v) => v.name === nome);
  if (!voce) {
    throw new Error(
      `prezziMenu: nessuna voce di menu si chiama "${nome}". ` +
        `Se il piatto e' stato rinominato o tolto da menuData.ts, aggiorna anche ` +
        `le pagine in lingua che lo citano.`
    );
  }
  return voce;
}

/** Prezzo formattato all'inglese: 8.5 -> "€8.50". */
export function prezzoEN(nome: string): string {
  const { price } = voceDiMenu(nome);
  if (typeof price === 'number') return `€${price.toFixed(2)}`;
  return price;
}

/** Ingredienti in italiano, per affiancarli alla traduzione. */
export function ingredientiIT(nome: string): string {
  return voceDiMenu(nome).ingredients ?? '';
}

/**
 * Il minimo e il massimo fra tutti i prezzi di una lista.
 *
 * Serve per le frasi tipo "beer is €3.00 to €7.00": scritta a mano diventerebbe
 * falsa il giorno che cambia un listino, cosi invece si ricalcola da sola.
 * Legge anche i prezzi scritti a stringa ("0,2 l - 3,00€\n0,4 l - 5,00€"),
 * da cui estrae tutti i numeri che trova.
 */
export function forbiceEN(voci: MenuItem[]): { min: string; max: string } {
  const numeri: number[] = [];

  for (const voce of voci) {
    if (typeof voce.price === 'number') {
      numeri.push(voce.price);
      continue;
    }
    // "0,2 l - 3,00€" -> 3.00 ; ignora le quantita' in litri e "Chiedi al banco"
    for (const m of voce.price.matchAll(/(\d+[.,]\d{2})\s*€/g)) {
      numeri.push(Number(m[1].replace(',', '.')));
    }
  }

  if (numeri.length === 0) {
    throw new Error('prezziMenu: forbiceEN non ha trovato nessun prezzo leggibile.');
  }

  return {
    min: `€${Math.min(...numeri).toFixed(2)}`,
    max: `€${Math.max(...numeri).toFixed(2)}`,
  };
}

/**
 * La foto di un piatto, presa da menuData.ts come i prezzi.
 *
 * Stessa regola: il nome deve esistere, se no la build fallisce. Torna
 * `undefined` solo quando la voce esiste ma non ha una foto — quel caso lo
 * gestisce la pagina disegnando il riquadro giallo col marchio.
 */
export function fotoDiMenu(nome: string): string | undefined {
  return voceDiMenu(nome).image;
}
