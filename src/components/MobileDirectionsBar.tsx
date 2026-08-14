'use client';

import { MapPin } from 'lucide-react';

const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Bar+Retro+Schiacciateria+Triestina+Viale+Venti+Settembre+16+Trieste';

// Barra fissa solo mobile: la maggior parte del traffico cerca gia' il locale per nome
// (query branded) e vuole solo l'indirizzo, senza scorrere fino alla sezione mappa.
// L'href punta a Google Maps: il listener delegato in Analytics.tsx intercetta
// automaticamente il click e invia lo stesso evento directions_click.
export default function MobileDirectionsBar() {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 flex items-center justify-center gap-2 bg-black text-yellow-400 border-t-4 border-black py-3.5 font-display font-black uppercase italic text-lg shadow-[0_-4px_0px_#000] active:bg-zinc-900"
      style={{ paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))' }}
    >
      <MapPin className="w-5 h-5" /> Ottieni Indicazioni
    </a>
  );
}
