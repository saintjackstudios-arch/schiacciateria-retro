'use client';

import { useEffect, useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Retr%C3%B3+XX+settembre+-+Schiacciateria+Triestina%2C+Viale+XX+Settembre+16%2C+34125+Trieste';
const TEL = 'tel:+393756264680';

// Barra fissa solo mobile: la maggior parte del traffico cerca gia' il locale per nome
// (query branded) e vuole solo due cose, l'indirizzo o il telefono, senza scorrere
// fino alla sezione contatti. I listener delegati in Analytics.tsx intercettano
// automaticamente i click e inviano directions_click / phone_click.
// I due bottoni parlano la lingua della pagina. Sono gli stessi che fanno
// scattare directions_click: se un turista non capisce cosa c'e' scritto non
// clicca, e la visita che volevamo misurare non la misuriamo.
const TESTI = {
  it: { chiama: 'Chiama', indicazioni: 'Indicazioni', ariaChiama: 'Chiama Schiacciateria Retrò' },
  en: { chiama: 'Call us', indicazioni: 'Directions', ariaChiama: 'Call Schiacciateria Retrò' },
} as const;

export default function MobileDirectionsBar() {
  const pathname = usePathname();

  // Questa barra sta nel layout radice, che Next genera UNA VOLTA SOLA e
  // riusa su tutte le pagine: al momento della generazione il percorso non si
  // sa ancora. Se decidessimo la lingua subito, il server scriverebbe "Chiama"
  // e il browser "Call us", e React butterebbe via tutto l'albero.
  // Quindi si parte in italiano come il resto del sito e si passa all'inglese
  // appena la pagina e' viva nel browser.
  const [montato, setMontato] = useState(false);
  useEffect(() => { setMontato(true); }, []);

  const inglese = montato && (pathname === '/en' || pathname.startsWith('/en/'));
  const t = inglese ? TESTI.en : TESTI.it;
  const base =
    'flex-1 flex items-center justify-center gap-2 py-3.5 font-display font-black uppercase italic text-base tracking-tight active:opacity-80';

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 flex bg-black border-t-4 border-black shadow-[0_-4px_0px_#000]"
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
    >
      <a href={TEL} className={`${base} bg-yellow-400 text-black`} aria-label={t.ariaChiama}>
        <Phone className="w-5 h-5" /> {t.chiama}
      </a>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener"
        className={`${base} bg-black text-yellow-400`}
      >
        <MapPin className="w-5 h-5" /> {t.indicazioni}
      </a>
    </div>
  );
}
