'use client';

import { useEffect, useState } from 'react';
import { TRADUZIONE } from '@/app/(de)/de/traduzioneIT';

/**
 * Mette la traduzione italiana SOTTO ogni blocco di testo tedesco.
 *
 * 🔒 SOLO IN LOCALE. Il componente esce subito se la build e' di produzione, e
 * chi lo monta lo fa gia' dietro allo stesso controllo: online non disegna
 * niente e questo file non entra nemmeno nel pacchetto spedito al browser.
 *
 * Perche' esiste. Sull'inglese era un lusso: Marco l'inglese lo legge. Sul
 * tedesco e' l'unico controllo che abbiamo — non lo parla nessuno di noi, e
 * nessuno lo rilegge. Qui non si controlla se il tedesco e' elegante: si
 * controlla se dice la cosa giusta.
 *
 * Come lavora: gira sugli elementi che portano testo, prende quello che si
 * legge davvero a schermo (`innerText`, quindi gia' in maiuscolo dove il CSS lo
 * mette), normalizza gli spazi e cerca la chiave nella tabella. Se una frase
 * tedesca cambia e la traduzione no, il riquadro sparisce da solo — ed e' il
 * segnale che c'e' una riga da tradurre. Alla fine scrive in console quante ne
 * ha messe e quante sono rimaste scoperte.
 */

// Tutto quello che puo' portare testo, span compresi: le targhette rosse e le
// pronunce del glossario sono span che stanno per conto loro.
const SELETTORE = 'h1, h2, h3, h4, p, li, a, button, span';

// I contenitori "veri" di testo. Servono a due regole:
//  1. un elemento e' una foglia se non contiene NESSUNO di questi (uno <span>
//     dentro un <h2> non lo squalifica: se no i titoli con una parola colorata
//     resterebbero senza riquadro);
//  2. uno <span> si prende solo se NON sta dentro uno di questi, cioe' solo
//     quando e' una targhetta a se' e non una parola in mezzo a una frase.
const BLOCCHI = 'p, h1, h2, h3, h4, li, a, button';

const CLASSE = 'traduzione-italiana-locale';

function normalizza(t: string): string {
  return t.replace(/\s+/g, ' ').trim();
}

export default function TraduzioneSotto() {
  const [attivo, setAttivo] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    document.querySelectorAll(`.${CLASSE}`).forEach((n) => n.remove());
    if (!attivo) return;

    // Il disegno della pagina non e' finito al primo giro: le animazioni di
    // framer-motion e il banner dei cookie arrivano dopo. Si aspetta un attimo,
    // se no meta' dei riquadri non troverebbero il loro blocco.
    const timer = window.setTimeout(() => {
      const elementi = Array.from(document.querySelectorAll<HTMLElement>(SELETTORE));
      let messe = 0;
      const scoperte: string[] = [];

      for (const el of elementi) {
        if (el.closest(`.${CLASSE}`)) continue;
        if (el.querySelector(BLOCCHI)) continue;
        if (el.tagName === 'SPAN' && el.parentElement?.closest(BLOCCHI)) continue;

        const testo = normalizza(el.innerText || '');
        if (!testo || testo.length < 2) continue;

        const it = TRADUZIONE[testo];
        if (!it) {
          // numeri, prezzi, orari, sigle e nomi propri: non c'e' niente da
          // tradurre, e segnalarli sarebbe solo rumore.
          if (!/[a-zA-ZÀ-ɏ]{4}/.test(testo)) continue;
          if (scoperte.length < 40) scoperte.push(testo.slice(0, 90));
          continue;
        }

        const dubbio = it.startsWith('⚠️');

        const box = document.createElement('div');
        box.className = CLASSE;
        box.style.cssText = [
          'margin-top:10px',
          'padding:10px 14px',
          'border-left:6px solid ' + (dubbio ? '#e8440a' : '#111'),
          'background:' + (dubbio ? '#fff7ed' : '#ffffff'),
          'color:#111',
          'font-family:system-ui,-apple-system,sans-serif',
          'font-size:15px',
          'font-weight:600',
          'line-height:1.45',
          'text-transform:none',
          'font-style:normal',
          'letter-spacing:normal',
          'white-space:normal',
          'text-align:left',
          'border-radius:2px',
          'box-shadow:0 1px 0 rgba(0,0,0,.15)',
        ].join(';');
        box.textContent = it;
        el.insertAdjacentElement('afterend', box);
        messe++;
      }

      console.info(
        `[traduzione locale] ${messe} riquadri messi · ${scoperte.length} righe senza traduzione`,
        scoperte
      );
    }, 700);

    return () => {
      window.clearTimeout(timer);
      document.querySelectorAll(`.${CLASSE}`).forEach((n) => n.remove());
    };
  }, [attivo]);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <button
      onClick={() => setAttivo((v) => !v)}
      style={{
        position: 'fixed',
        right: '16px',
        bottom: '84px',
        zIndex: 9999,
        padding: '12px 18px',
        background: attivo ? '#e8440a' : '#111',
        color: '#fff',
        border: '3px solid #000',
        boxShadow: '4px 4px 0 #000',
        fontFamily: 'system-ui,-apple-system,sans-serif',
        fontWeight: 800,
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        cursor: 'pointer',
      }}
    >
      {attivo ? 'Nascondi italiano' : 'Mostra italiano'}
    </button>
  );
}
