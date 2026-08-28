'use client';

/**
 * La pagina tedesca. E' la pagina inglese tradotta, blocco per blocco: stessa
 * struttura, stesse sezioni, stesse foto, stessi tasti. Marco il 28/08/2026:
 * *«traduci e basta»*. Se un blocco va cambiato, si cambia PRIMA in
 * `src/app/(en)/en/EnClient.tsx` e poi qui, se no le due pagine divergono e
 * nessuno se ne accorge.
 *
 * Unica differenza non testuale: l'`alt` delle foto non passa piu' da
 * `toLowerCase()`. In tedesco i sostantivi sono maiuscoli, e minuscolarli
 * scriverebbe "stracciatella-käse" al posto di "Stracciatella-Käse".
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight, Beer, Bus, CalendarCheck, Car, Clock, Footprints, MapPin,
  MessageSquare, Phone, Plane, Ship, Train, Trees, Utensils, Wallet,
} from 'lucide-react';
import { BEVANDE_BIRRE } from '@/lib/menuData';
import { fotoDiMenu, forbiceDE, prezzoDE } from '@/lib/prezziMenu';
import {
  BIRRE_IN_VETRINA, COME_ARRIVARE, FAQ, FERMATA_VICINA,
  GIRO_IGNORANTE, GLOSSARIO, SCHIACCIATE_IN_VETRINA,
} from './deContenuti';

const TEL = '+393756264680';
const TEL_DISPLAY = '+39 375 626 4680';
const WHATSAPP = 'https://wa.me/393756264680';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Retr%C3%B3+XX+settembre+-+Schiacciateria+Triestina%2C+Viale+XX+Settembre+16%2C+34125+Trieste';

const ICONE_ARRIVO = { cruise: Ship, train: Train, plane: Plane, car: Car, walk: Footprints } as const;

// Caricato a parte e SOLO in locale: cosi' la tabella con la traduzione
// italiana non entra nel JavaScript che il sito spedisce ai visitatori.
// E' lo strumento di revisione del tedesco. Prima di pubblicare si cancella,
// insieme a src/app/(de)/de/traduzioneIT.ts.
const TraduzioneSotto =
  process.env.NODE_ENV === 'production'
    ? () => null
    : dynamic(() => import('@/components/TraduzioneSotto'), { ssr: false });

/**
 * La foto di un piatto dentro la scheda.
 *
 * Le foto stanno gia' in menuData.ts e le usa il menu italiano: qui si prendono
 * da li', cosi' una foto sostituita si aggiorna in tutte le lingue insieme.
 * L'`alt` invece e' in inglese e descrive il ripieno, perche' e' l'unica cosa
 * che un motore di ricerca legge di un'immagine.
 *
 * Quando la foto manca si disegna il riquadro col marchio invece di lasciare un
 * buco. La leva `senzaFoto` serve a nasconderne una che esiste: oggi non la usa
 * nessuno, ma il ripiego e' gia' pronto per il giorno che servira'.
 */
function FotoPiatto({
  nome, descrizione, senzaFoto, suffisso = '',
}: { nome: string; descrizione: string; senzaFoto?: boolean; suffisso?: string }) {
  const src = senzaFoto ? undefined : fotoDiMenu(nome);
  return (
    <div className="w-full aspect-video border-2 border-black overflow-hidden relative bg-zinc-100">
      {src ? (
        <Image
          src={src}
          alt={`${nome} — ${descrizione}${suffisso}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          quality={75}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-yellow-300 flex items-center justify-center">
          <span className="font-display font-black uppercase italic text-2xl text-black/25">Retrò</span>
        </div>
      )}
    </div>
  );
}

const ORARI_DE = [
  { giorni: 'Mo – Do', ore: '8:00 — 01:00' },
  { giorni: 'Fr – Sa', ore: '8:00 — 02:00' },
  { giorni: 'Sonntag', ore: '17:00 — 23:30' },
];

export default function DeClient() {
  const birre = forbiceDE(BEVANDE_BIRRE);

  return (
    <main
      className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans pt-16 md:pt-20"
    >
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black border-b-8 border-black w-full aspect-[1024/571] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/menu_hero_schiacciata.webp"
            alt="Eine Schiacciata wird an der Theke der Schiacciateria Retrò in Triest gefüllt"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center gap-6 md:gap-10 px-6">
          <motion.span
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            animate={{ rotate: -3, scale: 1, opacity: 1 }}
            className="pointer-events-auto bg-red-600 text-white text-[10px] md:text-base font-black uppercase tracking-widest px-4 py-1.5 md:px-6 md:py-2 border-4 border-black shadow-[5px_5px_0px_#facc15]"
          >
            Viale XX Settembre 16 · Triest
          </motion.span>

          <motion.h1
            initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            className="pointer-events-auto bg-yellow-400 text-black text-center px-5 py-3 md:px-12 md:py-6 font-display font-black uppercase italic text-3xl md:text-7xl leading-none border-4 md:border-8 border-black shadow-[10px_10px_0px_#000] md:shadow-[18px_18px_0px_#000]"
          >
            Wo man isst
            <br />
            <span className="text-2xl md:text-5xl">in Triest</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pointer-events-auto max-w-2xl text-center text-white font-bold text-sm md:text-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          >
            Schiacciata, kleine Teller und kaltes Bier.
            <br className="hidden md:block" />{' '}
            15 Minuten zu Fuß vom Bahnhof, 24 vom Kreuzfahrtterminal.
          </motion.p>

          {/* I due tasti chiesti da Marco. Non serve scrivere codice di
              tracciamento: il listener delegato in Analytics.tsx riconosce da
              solo il link di WhatsApp e quello di Maps e manda whatsapp_click
              e directions_click. Il data-ga-posizione serve unicamente a
              distinguere in GA4 questi due click da quelli in fondo alla
              pagina — senza, in rapporto arrivano mescolati. */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pointer-events-auto flex flex-wrap gap-3 md:gap-4 justify-center"
          >
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              data-ga-posizione="hero"
              className="inline-flex items-center gap-2 border-4 border-black bg-yellow-400 text-black px-5 py-3 md:px-7 md:py-4 font-display font-black uppercase italic text-sm md:text-lg shadow-[5px_5px_0px_#000] hover:bg-white transition-colors"
            >
              <CalendarCheck className="w-5 h-5" /> Tisch reservieren
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener"
              data-ga-posizione="hero"
              className="inline-flex items-center gap-2 border-4 border-black bg-red-600 text-white px-5 py-3 md:px-7 md:py-4 font-display font-black uppercase italic text-sm md:text-lg shadow-[5px_5px_0px_#000] hover:bg-white hover:text-black transition-colors"
            >
              <MapPin className="w-5 h-5" /> Route planen
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── DISCLAIMER ─────────────────────────────────────── */}
      <div className="bg-black border-b-8 border-black px-5 py-5">
        <p className="max-w-3xl mx-auto text-center text-yellow-400 font-bold text-sm md:text-base leading-snug">
          Im Essen sind wir gut. Im Bier sind wir sehr gut. Im Deutschen sind wir{' '}
          <span className="italic">nicht</span> gut — diese Seite haben Leute
          geschrieben, die vom Kochen leben. Wenn ein Wort falsch aussieht, ist es das
          wahrscheinlich auch. Satt machen können wir dich viel besser, als wir dir
          schreiben können.
        </p>
      </div>

      {/* ── COS'E' UNA SCHIACCIATA ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-8 border-b-[6px] border-black pb-4">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            Was ist eine <span className="text-yellow-400">Schiacciata</span>?
          </h2>
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black -rotate-2 shrink-0">
            Sieht aus wie ein Sandwich. Ist keins.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
            <p>
              Eine Schiacciata wird aus <strong>Focaccia-Teig</strong> gemacht, nicht
              aus Brotteig. Sie kommt hoch aus dem Ofen, innen weich, außen knusprig.
              Wir schneiden sie vor deinen Augen längs auf und füllen sie auf der
              Stelle.
            </p>
            <p>
              Hinein kommen italienische Produkte und, wo es geht, Produkte von
              hier: Mortadella, Stracciatella, Prosciutto crudo, Porchetta,
              Trüffelcreme, gegrilltes Gemüse, frischer Meerrettich.
            </p>
            <p>
              Gegessen wird mit den Händen, im Stehen oder im Sitzen. Es ist{' '}
              <strong>keine Pizza</strong> und <strong>kein Panino</strong> — ein
              Panino ist Brot. Das hier ist Focaccia, und das ändert alles am
              Geschmack.
            </p>
          </div>

          <div className="bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0px_#000] -rotate-1 self-start">
            <Utensils className="w-8 h-8 mb-3" />
            <h3 className="font-display font-black uppercase italic text-xl mb-2">
              So wird bestellt
            </h3>
            <p className="text-black/80 font-bold text-sm leading-snug">
              Bestellt und bezahlt wird an der Theke, dann nimmst du es mit oder
              setzt dich hin. Wenn du dich hinsetzt, kümmert sich jemand um dich —
              wir sind mehr als einer im Service.
            </p>
          </div>
        </div>
      </section>

      {/* ── COS'E' IL BUFFET TRIESTINO ─────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400">
              Was ist ein Triestiner <span className="text-white">Buffet</span>?
            </h2>
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black rotate-2 shrink-0">
              Achtung — falscher Freund
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-300 leading-relaxed">
              <p>
                Überall sonst auf der Welt ist ein &quot;Buffet&quot; ein langer
                Tisch voller Speisen, von dem man sich selbst nimmt.{' '}
                <strong className="text-yellow-400">
                  In Triest bedeutet das Wort etwas völlig anderes.
                </strong>
              </p>
              <p>
                Ein Triestiner Buffet ist eine Reihe sehr kleiner Teller. Tartine —
                kleine belegte Brötchen in Dutzenden Varianten. Gemüse, auf ein
                Dutzend Arten frittiert. Fleischbällchen: mit Kren, scharfe,
                frittierte, welche mit Mozzarella, alles Mögliche.
              </p>
              <p>
                Jedes Stück kostet wenig. Statt sich für ein Gericht zu entscheiden,
                probiert man viele. Für den Preis eines Tellers Pasta woanders hast
                du ein Dutzend verschiedene Dinge probiert und bist satt.
              </p>
            </div>

            <div className="bg-yellow-400 border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#fff] rotate-1 self-start">
              <h3 className="font-display font-black uppercase italic text-2xl mb-4 leading-tight">
                Am besten in Gesellschaft
              </h3>
              <p className="text-black/80 font-bold leading-snug mb-4">
                Bestellt viele verschiedene Stücke, bestellt etwas zu trinken, und
                während ihr redet, esst ihr alle von einem großen Tablett in der
                Mitte des Tisches.
              </p>
              <p className="text-black/80 font-bold leading-snug mb-4">
                Das ist Fingerfood — kein Besteck. Wer lieber nicht mit den Händen
                isst, fragt an der Theke nach den langen Zahnstochern und spießt
                damit auf.
              </p>
              <p className="text-black/80 font-bold leading-snug border-t-2 border-black/20 pt-4">
                Wir sind eine Schiacciateria, kein Buffet. Aber die Gewohnheit ist
                dieselbe, und wir haben unsere eigene Art davon: Sie heißt Giro
                Ignorante und steht weiter unten auf dieser Seite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COSA ORDINARE ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-4 border-b-[6px] border-black pb-4">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            Was du bestellen solltest
          </h2>
        </div>
        <p className="text-base md:text-lg font-bold text-zinc-600 mb-10 max-w-3xl leading-snug">
          Die Namen bleiben mit Absicht auf Italienisch — sag sie an der Theke genau
          so, wie sie hier stehen, dann bekommst du das Richtige.
        </p>

        <h3 className="font-display font-black uppercase italic text-2xl md:text-3xl mb-6 flex items-center gap-3">
          <span className="bg-black text-yellow-400 px-3 py-1 -rotate-1">Schiacciate</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {SCHIACCIATE_IN_VETRINA.map((piatto, i) => (
            <motion.div
              key={piatto.name}
              whileHover={{ scale: 1.03, y: -6, boxShadow: '10px 10px 0px #facc15' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={`bg-white border-4 border-black p-5 flex flex-col gap-3 shadow-[6px_6px_0px_#000] ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
            >
              <FotoPiatto
                nome={piatto.name}
                descrizione={piatto.de}
                suffisso=", auf römischer Focaccia"
              />
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display font-black uppercase italic text-2xl leading-tight">
                  {piatto.name}
                </h4>
                <span className="bg-yellow-400 text-black text-sm font-black px-2 py-0.5 border-2 border-black shrink-0">
                  {prezzoDE(piatto.name)}
                </span>
              </div>
              <p className="text-black/75 font-bold leading-snug text-sm md:text-base">
                {piatto.de}
              </p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide mt-auto pt-2 border-t-2 border-black/10">
                {piatto.note}
              </p>
            </motion.div>
          ))}
        </div>

        <h3 className="font-display font-black uppercase italic text-2xl md:text-3xl mb-3 flex items-center gap-3">
          <span className="bg-black text-yellow-400 px-3 py-1 rotate-1">Il Giro Ignorante</span>
        </h3>
        <p className="text-base md:text-lg font-bold text-zinc-600 mb-8 max-w-3xl leading-snug">
          Dieselben Schiacciate, in Stücke geschnitten, damit ein ganzer Tisch teilen
          kann. Zwei oder drei verschiedene Füllungen kommen zusammen und alle
          probieren alles — die einzige vernünftige Art herauszufinden, welche deine
          liebste ist.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GIRO_IGNORANTE.map((piatto, i) => (
            <div
              key={piatto.name}
              className={`bg-yellow-400 border-4 border-black p-5 flex flex-col gap-3 shadow-[6px_6px_0px_#000] ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              <FotoPiatto nome={piatto.name} descrizione={piatto.de} />
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display font-black uppercase italic text-xl leading-tight">
                  {piatto.name}
                </h4>
                <span className="bg-black text-yellow-400 text-sm font-black px-2 py-0.5 border-2 border-black shrink-0">
                  {prezzoDE(piatto.name)}
                </span>
              </div>
              <p className="text-black/75 font-bold leading-snug text-sm">{piatto.de}</p>
              <p className="text-xs font-bold text-black/50 uppercase tracking-wide mt-auto pt-2 border-t-2 border-black/15">
                {piatto.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-xl group">
            DIE GANZE KARTE
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-xs font-bold text-zinc-500 mt-3 uppercase tracking-wide">
            Die vollständige Karte ist auf Italienisch — aber die Namen der Gerichte
            und die Preise sind dieselben, und Fotos muss man nicht übersetzen.
          </p>
        </div>
      </section>

      {/* ── COSA BERE ──────────────────────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400 mb-10">
            Was du trinken solltest
          </h2>

          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_#facc15] -rotate-1 mb-14">
            <h3 className="font-display font-black uppercase italic text-2xl md:text-4xl leading-tight mb-5">
              Wenn du hier &quot;einen Spritz&quot; sagst,
              <br />
              <span className="text-red-600">bekommst du einen weißen.</span>
            </h3>
            <div className="space-y-4 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
              <p>
                Friulanischer Weißwein, Sprudelwasser, Eis, eine Scheibe Zitrone.
                Kein Bitter, nichts Oranges. Das ist kein Fehler und keine Schikane
                von uns — in Triest bedeutet das Wort schlicht das. In neun von zehn
                Fällen ist es das, was ein Einheimischer bestellt.
              </p>
              <p>
                <strong>Den orangen gibt es auch.</strong> Aperol, Campari und was
                dir sonst vorschwebt: Sag den Namen, und er kommt. Hier nimmt es
                niemand übel, und niemand verbessert dich — wir sind ja nicht die
                Franzosen. <span aria-hidden="true">💓</span>
              </p>
            </div>
          </div>

          <h3 className="font-display font-black uppercase italic text-2xl md:text-3xl text-yellow-400 mb-3 flex items-center gap-3">
            <Beer className="w-7 h-7" /> Das Bier ist die andere ernste Sache
          </h3>
          <p className="text-zinc-400 font-bold mb-8">
            Fünf vom Fass und eines, das wechselt — frag an der Theke, was heute
            läuft. Je nach Bier und Größe {birre.min} bis {birre.max}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BIRRE_IN_VETRINA.map((birra, i) => (
              <div
                key={birra.name}
                className={`bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#facc15] ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              >
                <h4 className="font-display font-black uppercase italic text-lg leading-tight mb-1">
                  {birra.name}
                </h4>
                <p className="text-xs font-black uppercase tracking-wider text-red-600 mb-2">
                  {birra.de}
                </p>
                <p className="text-sm font-bold text-zinc-600 leading-snug">{birra.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUANTO COSTA ───────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-8 border-b-[6px] border-black pb-4">
          <Wallet className="w-9 h-9" />
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            Was kostet das?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
            <p>
              Ein leichtes Mittagessen bleibt <strong>unter 10 €</strong>. Eine ganze
              Mahlzeit — eine große Schiacciata, etwas zum Teilen, Bier mit Freunden —
              liegt bei{' '}
              <strong>15 bis 20 € pro Person</strong>.
            </p>
            <p>
              Mit einer Rechnung von 50 € pro Kopf hier hinauszugehen ist ziemlich
              schwer. Wenn du es schaffst, hast du viel Bier gekauft — und
              wahrscheinlich auch ein paar neue Freunde.
            </p>
          </div>

          <div className="bg-red-600 text-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] rotate-1 self-start">
            <h3 className="font-display font-black uppercase italic text-xl mb-3">
              Karte geht
            </h3>
            <p className="font-bold text-sm leading-snug">
              Wir nehmen Karten. Du kannst das Essen auch mitnehmen — praktisch,
              wenn du zurück zum Schiff oder zum Zug gehst.
            </p>
          </div>
        </div>
      </section>

      {/* ── LE TRAPPOLE PER TURISTI ────────────────────────── */}
      {/* ⚠️ QUESTA SEZIONE L'HO SCRITTA IO. Marco ha chiesto di tenere
          l'intuizione dei dieci minuti verso l'interno, di renderla visibile a
          Google e di metterci una battuta. Le parole sono da rivedere. */}
      <section className="bg-black border-y-8 border-black py-16 md:py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400">
              Wie man in Triest die Touristenfallen umgeht
            </h2>
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black -rotate-2 shrink-0">
              Wo die Einheimischen essen
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-300 leading-relaxed">
              <p>
                Die Regel ist in jeder Hafenstadt an dieser Küste dieselbe:{' '}
                <strong className="text-yellow-400">
                  Je näher am Meerblick du isst, desto mehr von der Rechnung ist der
                  Blick.
                </strong>
              </p>
              <p>
                Zehn Minuten weiter landeinwärts hört die Aussichtssteuer auf. Auf
                dem Viale XX Settembre kauft Triest ein, geht spazieren und verbringt
                seine Abende, und die Preise in dieser Straße sind die, die die Stadt
                das ganze Jahr über zahlt.
              </p>
              <p>
                Es kostet dich einen ebenen, bequemen Spaziergang ohne eine einzige
                Steigung. Aufgeben musst du den Blick aufs Meer — und das Meer ist
                nach dem Essen immer noch da.
              </p>
            </div>

            <div className="bg-yellow-400 border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#fff] rotate-1 self-start">
              <h3 className="font-display font-black uppercase italic text-2xl mb-4 leading-tight">
                Woran du sie erkennst, überall in Italien
              </h3>
              <ul className="space-y-3 text-black/80 font-bold leading-snug">
                <li>
                  Eine Küche, die Pizza, Sushi und Paella anbietet, kann nichts davon
                  richtig.
                </li>
                <li>
                  Steht auf der Karte kein Preis, wird der Preis festgelegt, nachdem
                  man dich gesehen hat.
                </li>
                <li>
                  Ist der Raum um vier Uhr nachmittags voll mit Leuten, die die
                  Sprache des Ortes sprechen, hast du ihn gefunden.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COME ARRIVARE ──────────────────────────────────── */}
      <section className="bg-yellow-400 border-y-8 border-black py-16 md:py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter mb-4">
            So findest du uns
          </h2>
          <p className="text-base md:text-lg font-bold text-black/70 mb-10 max-w-3xl leading-snug">
            Viale XX Settembre 16, Triest. Wie auch immer du in diese Stadt gekommen
            bist, die Antwort steht unten — Triest ist klein und flach, fast alles
            ist zu Fuß machbar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COME_ARRIVARE.map((modo, i) => {
              const Icona = ICONE_ARRIVO[modo.id];
              return (
                <div
                  key={modo.id}
                  className={`bg-white border-4 border-black p-6 md:p-7 shadow-[8px_8px_0px_#000] flex flex-col gap-3 ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'} ${i === COME_ARRIVARE.length - 1 ? 'md:col-span-2' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <span className="bg-black text-yellow-400 p-2.5 border-2 border-black shrink-0">
                      <Icona className="w-6 h-6" />
                    </span>
                    <div>
                      <h3 className="font-display font-black uppercase italic text-xl md:text-2xl leading-tight">
                        {modo.titolo}
                      </h3>
                      <p className="text-sm font-black uppercase tracking-wide text-red-600 mt-1">
                        {modo.tempo} · {modo.distanza}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-zinc-700 leading-snug text-sm md:text-base">
                    {modo.testo}
                  </p>
                  {/* Solo il blocco auto ha la nota serale: il parcheggio chiude
                      alle 20 e noi all'una, quindi va detto prima, non dopo. */}
                  {'sera' in modo && (
                    <p className="font-bold text-black bg-yellow-400 border-2 border-black px-4 py-3 leading-snug text-sm md:text-base">
                      {modo.sera}
                    </p>
                  )}
                  {/* Le linee dei bus le ha chieste Marco: la riga precedente
                      diceva che non valeva la pena prendere l'autobus, e non
                      era vero. Linee e fermate misurate su Google Maps. */}
                  {'bus' in modo && (
                    <p className="font-bold text-zinc-700 bg-zinc-100 border-2 border-black px-4 py-3 leading-snug text-sm flex gap-3">
                      <Bus className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{modo.bus}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-black text-white border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#000]">
            <div className="flex items-center gap-3 mb-4">
              <Bus className="w-7 h-7 text-yellow-400 shrink-0" />
              <h3 className="font-display font-black uppercase italic text-xl md:text-2xl leading-tight text-yellow-400">
                Die nächste Bushaltestelle
              </h3>
            </div>
            <p className="font-bold leading-snug text-base md:text-lg mb-3">
              <strong className="text-yellow-400">{FERMATA_VICINA.nome}</strong> —{' '}
              {FERMATA_VICINA.distanza}. Dort halten die Linien {FERMATA_VICINA.linee}.
            </p>
            <p className="font-bold text-zinc-400 leading-snug text-sm md:text-base">
              {FERMATA_VICINA.biglietto}
            </p>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            data-ga-posizione="come-arrivare"
            className="mt-10 inline-flex items-center justify-center gap-3 border-4 border-black bg-black text-yellow-400 px-8 py-4 font-display font-black uppercase italic text-lg md:text-xl shadow-[6px_6px_0px_#000] hover:bg-white hover:text-black transition-colors"
          >
            <MapPin className="w-6 h-6" /> In Google Maps öffnen
          </a>
        </div>
      </section>

      {/* ── IL DEHOR ───────────────────────────────────────── */}
      {/* Confermato dal titolare il 27/08: i tavolini sotto i platani ci sono
          tutto l'anno. Le recensioni lo nominavano da sempre, il sito no. */}
      {/* ⚠️ MANCA LA FOTO. Fra le immagini del sito non ce n'e' nessuna del
          dehor: l'unica del Viale e' invernale, vuota e senza tavolini. Qui va
          una fotografia vera dei tavolini sotto i platani — chiesta a Marco. */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[6fr_5fr] gap-8 md:gap-12">
          <div>
            <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter mb-6 border-b-[6px] border-black pb-4 flex items-center gap-4">
              <Trees className="w-10 h-10 shrink-0" />
              Wo du sitzt
            </h2>
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
              <p>
                Unsere Tische stehen draußen, direkt auf der Allee,{' '}
                <strong>unter den Platanen</strong>. Der Viale XX Settembre ist für
                den Verkehr gesperrt: Vor dir liegt also eine breite Fußgängerallee,
                keine Straße.
              </p>
              <p>
                Sie stehen <strong>das ganze Jahr über</strong> da. Drinnen gibt es
                auch Tische, und im Winter sitzen dort die meisten — im Sommer
                bleiben aber fast alle draußen unter den Bäumen. Wenn du im Juli
                kommst, komm wegen draußen.
              </p>
            </div>
          </div>

          <div className="bg-red-600 text-white border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#000] rotate-1 self-center">
            <h3 className="font-display font-black uppercase italic text-2xl mb-3 leading-tight">
              Das ist die Straße der Einheimischen
            </h3>
            <p className="font-bold leading-snug mb-4">
              Nicht die Hafenpromenade, nicht der Postkartenplatz. Auf dem Viale geht
              Triest spazieren, kauft ein und verbringt seine Abende.
            </p>
            <p className="font-bold leading-snug border-t-2 border-white/30 pt-4">
              Wenn du am Nebentisch jemanden Deutsch sprechen hörst, ist die Chance
              gut, dass es einer von uns ist, der es versucht.
            </p>
          </div>
        </div>
      </section>

      {/* ── ORARI ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl tracking-tighter leading-none mb-10">
          Wann wir geöffnet haben
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6" />
              <h3 className="font-display font-black uppercase italic text-xl md:text-2xl tracking-tight">
                Öffnungszeiten
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {ORARI_DE.map((r) => (
                <div key={r.giorni} className="flex justify-between items-baseline gap-4 border-b-2 border-black/10 pb-2">
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider text-zinc-600">
                    {r.giorni}
                  </span>
                  <span className="text-base md:text-lg font-black">{r.ore}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Jeden Tag geöffnet · Sonntag nur nachmittags und abends
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_#facc15] flex flex-col">
            <div className="flex items-start gap-3 mb-5">
              <MapPin className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-black uppercase italic text-xl md:text-2xl tracking-tight mb-1">
                  Reservieren ist eine gute Idee
                </h3>
                <p className="text-sm md:text-base font-bold text-zinc-600 leading-snug">
                  Du kannst jederzeit hereinkommen und an der Theke bestellen. Wenn
                  du aber sicher einen Tisch willst — abends, draußen oder für eine
                  Gruppe — ruf uns vorher an oder schreib uns.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <a
                href={`tel:${TEL}`}
                data-ga-posizione="orari"
                className="flex items-center justify-center gap-3 border-4 border-black bg-yellow-400 py-4 font-display font-black uppercase italic text-lg md:text-xl tracking-tight shadow-[4px_4px_0px_#000] hover:bg-black hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" /> {TEL_DISPLAY}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                data-ga-posizione="orari"
                className="flex items-center justify-center gap-2 border-4 border-black bg-white py-3 font-display font-black uppercase italic text-sm md:text-base tracking-tight shadow-[4px_4px_0px_#000] hover:bg-black hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Schreib uns auf WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOSSARIO ──────────────────────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400 mb-4">
            Ein paar Wörter, die du hören wirst
          </h2>
          <p className="text-zinc-400 font-bold mb-10 max-w-3xl leading-snug">
            Triest hat seinen eigenen Wortschatz, und die Hälfte davon ist nicht
            Italienisch. Benutz eines dieser Wörter an der Theke und schau, was
            passiert.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {GLOSSARIO.map((voce, i) => (
              <div
                key={voce.parola}
                className={`bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#facc15] ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              >
                <div className="flex items-baseline gap-3 flex-wrap mb-2">
                  <h3 className="font-display font-black uppercase italic text-xl leading-none">
                    {voce.parola}
                  </h3>
                  <span className="text-xs font-black uppercase tracking-wider text-red-600">
                    {voce.pron}
                  </span>
                </div>
                <p className="text-sm md:text-base font-bold text-zinc-700 leading-snug">
                  {voce.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 py-16 md:py-24">
        <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl tracking-tighter leading-none mb-10 border-b-[6px] border-black pb-4">
          Fragen, die uns gestellt werden
        </h2>

        <div className="flex flex-col gap-5">
          {FAQ.map((riga) => (
            <div key={riga.q} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <h3 className="font-display font-black uppercase italic text-lg md:text-xl leading-tight mb-2">
                {riga.q}
              </h3>
              <p className="font-bold text-zinc-700 leading-relaxed text-sm md:text-base">
                {riga.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ─────────────────────────────────────── */}
      <footer className="bg-yellow-400 py-16 px-5 border-t-8 border-black text-center">
        <h2 className="font-display font-black uppercase italic text-4xl md:text-6xl tracking-tighter leading-none mb-4">
          Komm essen
        </h2>
        <p className="text-base md:text-xl font-bold text-black/70 mb-8 max-w-2xl mx-auto">
          Viale XX Settembre 16, Triest. Bestell an der Theke oder reservier einen
          Tisch und lass dich bedienen. So oder so: Sag einfach den Namen von dem,
          was du willst.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            data-ga-posizione="footer"
            className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group"
          >
            <MapPin className="w-6 h-6" /> ANFAHRT
          </a>
          <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group bg-red-600">
            KARTE
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col items-center gap-3">
          <Link
            href="/"
            className="text-xs font-black uppercase tracking-widest text-black/60 hover:text-black transition-colors border-b-2 border-black/20"
          >
            Questo sito in italiano →
          </Link>
          <p className="text-[10px] md:text-xs font-bold text-black/50 uppercase tracking-widest">
            © {new Date().getFullYear()} Barretrò. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-black/60 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-black transition-colors">Datenschutz</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie-Richtlinie</Link>
            <span>•</span>
            <Link href="/termini-e-condizioni" className="hover:text-black transition-colors">Nutzungsbedingungen</Link>
          </div>
          <p className="text-[9px] text-black/40 uppercase tracking-wider mt-1 max-w-xl leading-normal text-center">
            Transparenzhinweis (EU-KI-Verordnung): Einige Bilder auf dieser Website
            sind illustrativ und wurden mit künstlicher Intelligenz erzeugt oder
            bearbeitet.
          </p>
        </div>
      </footer>

      {/* 🔒 SOLO IN LOCALE: la traduzione italiana sotto ogni blocco, perche'
          Marco possa rileggere quello che pubblichiamo in tedesco a nome del
          cliente. In produzione questo blocco non viene nemmeno disegnato. */}
      {process.env.NODE_ENV !== 'production' && <TraduzioneSotto />}
    </main>
  );
}
