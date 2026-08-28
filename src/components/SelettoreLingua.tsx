'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';

/**
 * Il selettore di lingua.
 *
 * Ogni lingua e' una pagina con un suo indirizzo (/en, poi /de, /sl, /hr...),
 * non un cookie e non un rilevamento automatico del browser: e' quello che
 * Google chiede per i siti multilingua, ed e' anche l'unico modo perche' la
 * pagina tedesca possa comparire nella ricerca tedesca.
 *
 * PER AGGIUNGERE UNA LINGUA: una riga qui, e vanno aggiornati anche gli
 * hreflang di /app/page.tsx e delle altre pagine tradotte, piu' la sitemap.
 * Il nome della lingua si scrive SEMPRE nella lingua stessa ("Deutsch", non
 * "Tedesco"): chi non parla italiano deve poterlo riconoscere.
 */
export const LINGUE = [
  { code: 'it', href: '/', nome: 'Italiano' },
  { code: 'en', href: '/en', nome: 'English' },
  { code: 'de', href: '/de', nome: 'Deutsch' },
] as const;

export default function SelettoreLingua({ variante = 'desktop' }: { variante?: 'desktop' | 'drawer' }) {
  const [aperto, setAperto] = useState(false);
  const pathname = usePathname();
  const contenitore = useRef<HTMLDivElement>(null);

  // La lingua attiva e' quella il cui prefisso combacia col percorso corrente.
  // '/' fa da riserva, cosi tutte le pagine italiane (/menu, /blog/...) restano
  // marcate come italiane senza doverle elencare una per una.
  const attiva =
    LINGUE.find((l) => l.href !== '/' && (pathname === l.href || pathname.startsWith(`${l.href}/`))) ??
    LINGUE[0];

  useEffect(() => {
    if (!aperto) return;
    const chiudiSeFuori = (e: MouseEvent) => {
      if (!contenitore.current?.contains(e.target as Node)) setAperto(false);
    };
    const chiudiConEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setAperto(false); };
    document.addEventListener('mousedown', chiudiSeFuori);
    document.addEventListener('keydown', chiudiConEsc);
    return () => {
      document.removeEventListener('mousedown', chiudiSeFuori);
      document.removeEventListener('keydown', chiudiConEsc);
    };
  }, [aperto]);

  // Chiude il pannello quando la navigazione e' avvenuta.
  useEffect(() => { setAperto(false); }, [pathname]);

  if (variante === 'drawer') {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-black uppercase text-[10px] tracking-widest text-black/50 px-1">
          Language
        </span>
        <div className="flex flex-wrap gap-2">
          {LINGUE.map((l) => (
            <Link
              key={l.code}
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              className={`flex items-center gap-2 px-3 py-2 font-black uppercase tracking-tight text-sm border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.35)] transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
                l.code === attiva.code ? 'bg-black text-yellow-400' : 'bg-white text-black hover:bg-yellow-400'
              }`}
            >
              {l.code === attiva.code && <Check className="w-3.5 h-3.5 shrink-0" />}
              {l.nome}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={contenitore} className="relative">
      <button
        onClick={() => setAperto((v) => !v)}
        aria-expanded={aperto}
        aria-haspopup="true"
        aria-label="Change language"
        className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-[0.15em] font-black whitespace-nowrap"
      >
        <Globe className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
        Language
        <ChevronDown
          className={`w-3 h-3 shrink-0 transition-transform duration-200 ${aperto ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Il menu sta SEMPRE nell'HTML, anche chiuso: prima esisteva solo dopo
          il clic, e siccome il drawer del telefono e' anche lui montato solo
          quando si apre, il risultato era che NESSUNA pagina del sito
          conteneva un link a /en. Per un motore di ricerca quella pagina era
          orfana: la trovava solo dalla sitemap, e una pagina che nessuno linka
          vale poco. Chiuso lo nascondiamo con `hidden`, che toglie anche il
          fuoco da tastiera: si vede e si naviga esattamente come prima. */}
      <div
        className={`${aperto ? '' : 'hidden '}absolute right-0 top-full mt-3 min-w-[150px] bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_#000] py-1 z-[350]`}
      >
          {LINGUE.map((l) => (
            <Link
              key={l.code}
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-colors ${
                l.code === attiva.code ? 'bg-black text-yellow-400' : 'text-black hover:bg-black hover:text-yellow-400'
              }`}
            >
              {l.code === attiva.code ? <Check className="w-3.5 h-3.5 shrink-0" /> : <span className="w-3.5 shrink-0" />}
              {l.nome}
            </Link>
          ))}
      </div>
    </div>
  );
}
