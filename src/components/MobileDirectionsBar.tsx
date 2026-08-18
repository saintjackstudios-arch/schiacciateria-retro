'use client';

import { MapPin, Phone } from 'lucide-react';

const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Bar+Retro+Schiacciateria+Triestina+Viale+Venti+Settembre+16+Trieste';
const TEL = 'tel:+393756264680';

// Barra fissa solo mobile: la maggior parte del traffico cerca gia' il locale per nome
// (query branded) e vuole solo due cose, l'indirizzo o il telefono, senza scorrere
// fino alla sezione contatti. I listener delegati in Analytics.tsx intercettano
// automaticamente i click e inviano directions_click / phone_click.
export default function MobileDirectionsBar() {
  const base =
    'flex-1 flex items-center justify-center gap-2 py-3.5 font-display font-black uppercase italic text-base tracking-tight active:opacity-80';

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 flex bg-black border-t-4 border-black shadow-[0_-4px_0px_#000]"
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
    >
      <a href={TEL} className={`${base} bg-yellow-400 text-black`} aria-label="Chiama Schiacciateria Retrò">
        <Phone className="w-5 h-5" /> Chiama
      </a>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener"
        className={`${base} bg-black text-yellow-400`}
      >
        <MapPin className="w-5 h-5" /> Indicazioni
      </a>
    </div>
  );
}
