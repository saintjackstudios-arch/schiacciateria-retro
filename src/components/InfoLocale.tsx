import { Clock, Phone, MessageSquare, MapPin } from 'lucide-react';

const TEL = '+393756264680';
const TEL_DISPLAY = '+39 375 626 4680';
const WHATSAPP = 'https://wa.me/393756264680';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Retr%C3%B3+XX+settembre+-+Schiacciateria+Triestina%2C+Viale+XX+Settembre+16%2C+34125+Trieste';

const ORARI = [
  { giorni: 'Lun – Gio', ore: '8:00 — 01:00' },
  { giorni: 'Ven – Sab', ore: '8:00 — 02:00' },
  { giorni: 'Domenica', ore: '17:00 — 23:30' },
];

// Orari, telefono e indirizzo erano presenti solo dentro il JSON-LD: invisibili
// all'utente. Chi arriva da ricerca locale ("aperto adesso", "buffet vicino a me")
// cerca queste tre cose e se non le trova torna in SERP. Blocco condiviso tra
// /menu e /buffet-triestino, con gli stessi dati dello schema Restaurant.
export default function InfoLocale({ titolo = 'QUANDO E DOVE' }: { titolo?: string }) {
  return (
    <section className="bg-[#fdfaf3] border-t-8 border-black py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl tracking-tighter leading-none mb-10">
          {titolo}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Orari */}
          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6" />
              <h3 className="font-display font-black uppercase italic text-xl md:text-2xl tracking-tight">
                Orari di apertura
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {ORARI.map((r) => (
                <div key={r.giorni} className="flex justify-between items-baseline gap-4 border-b-2 border-black/10 pb-2">
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider text-zinc-600">
                    {r.giorni}
                  </span>
                  <span className="text-base md:text-lg font-black">{r.ore}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Aperti tutti i giorni · la domenica solo dal pomeriggio
            </p>
          </div>

          {/* Contatti + indirizzo */}
          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_#facc15] flex flex-col">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-black uppercase italic text-xl md:text-2xl tracking-tight mb-1">
                  Dove siamo
                </h3>
                <p className="text-sm md:text-base font-bold text-zinc-600 leading-snug">
                  Viale XX Settembre 16<br />34125 Trieste (TS)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <a
                href={`tel:${TEL}`}
                className="flex items-center justify-center gap-3 border-4 border-black bg-yellow-400 py-4 font-display font-black uppercase italic text-lg md:text-xl tracking-tight shadow-[4px_4px_0px_#000] hover:bg-black hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" /> Chiama {TEL_DISPLAY}
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 border-4 border-black bg-white py-3 font-display font-black uppercase italic text-sm md:text-base tracking-tight shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 border-4 border-black bg-white py-3 font-display font-black uppercase italic text-sm md:text-base tracking-tight shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4" /> Indicazioni
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
