'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight, Beer, Bus, CalendarCheck, Car, Clock, Footprints, MapPin,
  MessageSquare, Phone, Plane, Ship, Train, Trees, Utensils, Wallet,
} from 'lucide-react';
import { BEVANDE_BIRRE } from '@/lib/menuData';
import { fotoDiMenu, forbiceEN, prezzoEN } from '@/lib/prezziMenu';
import {
  BIRRE_IN_VETRINA, COME_ARRIVARE, FAQ, FERMATA_VICINA,
  GIRO_IGNORANTE, GLOSSARIO, SCHIACCIATE_IN_VETRINA,
} from './enContenuti';

const TEL = '+393756264680';
const TEL_DISPLAY = '+39 375 626 4680';
const WHATSAPP = 'https://wa.me/393756264680';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Retr%C3%B3+XX+settembre+-+Schiacciateria+Triestina%2C+Viale+XX+Settembre+16%2C+34125+Trieste';

const ICONE_ARRIVO = { cruise: Ship, train: Train, plane: Plane, car: Car, walk: Footprints } as const;

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
          alt={`${nome} — ${descrizione.toLowerCase()}${suffisso}`}
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

const ORARI_EN = [
  { giorni: 'Mon – Thu', ore: '8:00 — 01:00' },
  { giorni: 'Fri – Sat', ore: '8:00 — 02:00' },
  { giorni: 'Sunday', ore: '17:00 — 23:30' },
];

export default function EnClient() {
  const birre = forbiceEN(BEVANDE_BIRRE);

  return (
    <main
      className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans pt-16 md:pt-20"
    >
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black border-b-8 border-black w-full aspect-[1024/571] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/menu_hero_schiacciata.webp"
            alt="A schiacciata being filled at the counter of Schiacciateria Retrò in Trieste"
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
            Viale XX Settembre 16 · Trieste
          </motion.span>

          <motion.h1
            initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            className="pointer-events-auto bg-yellow-400 text-black text-center px-5 py-3 md:px-12 md:py-6 font-display font-black uppercase italic text-3xl md:text-7xl leading-none border-4 md:border-8 border-black shadow-[10px_10px_0px_#000] md:shadow-[18px_18px_0px_#000]"
          >
            Where to eat
            <br />
            <span className="text-2xl md:text-5xl">in Trieste</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pointer-events-auto max-w-2xl text-center text-white font-bold text-sm md:text-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          >
            Schiacciata, small plates and cold beer.
            <br className="hidden md:block" />{' '}
            15 minutes on foot from the station, 24 from the cruise pier.
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
              <CalendarCheck className="w-5 h-5" /> Book a table
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener"
              data-ga-posizione="hero"
              className="inline-flex items-center gap-2 border-4 border-black bg-red-600 text-white px-5 py-3 md:px-7 md:py-4 font-display font-black uppercase italic text-sm md:text-lg shadow-[5px_5px_0px_#000] hover:bg-white hover:text-black transition-colors"
            >
              <MapPin className="w-5 h-5" /> Get directions
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── DISCLAIMER ─────────────────────────────────────── */}
      <div className="bg-black border-b-8 border-black px-5 py-5">
        <p className="max-w-3xl mx-auto text-center text-yellow-400 font-bold text-sm md:text-base leading-snug">
          We are good at food. We are very good at beer. We are{' '}
          <span className="italic">not</span> good at English — this page was written
          by people who cook for a living. If a word looks wrong, it probably is.
          We promise to be much better at feeding you than at writing to you.
        </p>
      </div>

      {/* ── COS'E' UNA SCHIACCIATA ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-8 border-b-[6px] border-black pb-4">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            What is a <span className="text-yellow-400">schiacciata</span>?
          </h2>
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black -rotate-2 shrink-0">
            It looks like a sandwich. It is not.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
            <p>
              A schiacciata is made from <strong>focaccia dough</strong>, not bread
              dough. It comes out of the oven tall, soft in the middle and crunchy
              on the outside. We cut it in half lengthways in front of you and fill
              it there and then.
            </p>
            <p>
              Inside go Italian products, and where we can, products from around
              here: mortadella, stracciatella, prosciutto crudo, porchetta, truffle
              cream, grilled vegetables, fresh horseradish.
            </p>
            <p>
              You eat it with your hands, standing up or sitting down. It is{' '}
              <strong>not pizza</strong>, and it is <strong>not a panino</strong> —
              a panino is bread. This is focaccia, and that changes everything about
              how it tastes.
            </p>
          </div>

          <div className="bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0px_#000] -rotate-1 self-start">
            <Utensils className="w-8 h-8 mb-3" />
            <h3 className="font-display font-black uppercase italic text-xl mb-2">
              How ordering works
            </h3>
            <p className="text-black/80 font-bold text-sm leading-snug">
              You order at the counter and you pay at the counter, then take it with
              you or sit down. If you sit down, someone will look after you — there
              is more than one of us working the tables.
            </p>
          </div>
        </div>
      </section>

      {/* ── COS'E' IL BUFFET TRIESTINO ─────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400">
              What is a Triestine <span className="text-white">buffet</span>?
            </h2>
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black rotate-2 shrink-0">
              Careful — false friend
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-300 leading-relaxed">
              <p>
                Everywhere else in the world, a &quot;buffet&quot; is a long table
                covered in food that you help yourself to.{' '}
                <strong className="text-yellow-400">
                  In Trieste the word means something completely different.
                </strong>
              </p>
              <p>
                A Triestine buffet is a set of very small plates. Tartine — little
                open sandwiches with dozens of different fillings. Vegetables fried
                a dozen different ways. Meatballs: with horseradish, spicy ones,
                fried ones, mozzarella ones, all sorts.
              </p>
              <p>
                Each piece costs very little. So instead of choosing one dish, you
                try many. For the price of a plate of pasta somewhere else, you will
                have tasted a dozen different things and you will be full.
              </p>
            </div>

            <div className="bg-yellow-400 border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#fff] rotate-1 self-start">
              <h3 className="font-display font-black uppercase italic text-2xl mb-4 leading-tight">
                It works best with company
              </h3>
              <p className="text-black/80 font-bold leading-snug mb-4">
                Order a lot of different pieces, order something to drink, and while
                you talk you all eat from one big tray in the middle of the table.
              </p>
              <p className="text-black/80 font-bold leading-snug mb-4">
                It is finger food — no cutlery. If you would rather not use your
                hands, ask at the counter for the long toothpicks and pick things up
                with those.
              </p>
              <p className="text-black/80 font-bold leading-snug border-t-2 border-black/20 pt-4">
                We are a schiacciateria, not a buffet. But the habit is the same one,
                and we have our own way of doing it: it is called the Giro Ignorante,
                and it is further down this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COSA ORDINARE ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-4 border-b-[6px] border-black pb-4">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            What to order
          </h2>
        </div>
        <p className="text-base md:text-lg font-bold text-zinc-600 mb-10 max-w-3xl leading-snug">
          The names stay in Italian on purpose — say them at the counter exactly as
          they are written here and you will get the right thing.
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
                descrizione={piatto.en}
                suffisso=", on Roman focaccia"
              />
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display font-black uppercase italic text-2xl leading-tight">
                  {piatto.name}
                </h4>
                <span className="bg-yellow-400 text-black text-sm font-black px-2 py-0.5 border-2 border-black shrink-0">
                  {prezzoEN(piatto.name)}
                </span>
              </div>
              <p className="text-black/75 font-bold leading-snug text-sm md:text-base">
                {piatto.en}
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
          Same schiacciate, cut into pieces so that a table can share them. Two or
          three different fillings arrive together and everyone tries everything —
          which is the only sensible way to find out which one is your favourite.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {GIRO_IGNORANTE.map((piatto, i) => (
            <div
              key={piatto.name}
              className={`bg-yellow-400 border-4 border-black p-5 flex flex-col gap-3 shadow-[6px_6px_0px_#000] ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              <FotoPiatto nome={piatto.name} descrizione={piatto.en} />
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display font-black uppercase italic text-xl leading-tight">
                  {piatto.name}
                </h4>
                <span className="bg-black text-yellow-400 text-sm font-black px-2 py-0.5 border-2 border-black shrink-0">
                  {prezzoEN(piatto.name)}
                </span>
              </div>
              <p className="text-black/75 font-bold leading-snug text-sm">{piatto.en}</p>
              <p className="text-xs font-bold text-black/50 uppercase tracking-wide mt-auto pt-2 border-t-2 border-black/15">
                {piatto.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-xl group">
            THE FULL MENU
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <p className="text-xs font-bold text-zinc-500 mt-3 uppercase tracking-wide">
            The full menu is in Italian — but the dish names and the prices are the
            same, and photographs need no translation.
          </p>
        </div>
      </section>

      {/* ── COSA BERE ──────────────────────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400 mb-10">
            What to drink
          </h2>

          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_#facc15] -rotate-1 mb-14">
            <h3 className="font-display font-black uppercase italic text-2xl md:text-4xl leading-tight mb-5">
              If you say &quot;a spritz&quot; here,
              <br />
              <span className="text-red-600">you will get a white one.</span>
            </h3>
            <div className="space-y-4 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
              <p>
                Friulian white wine, sparkling water, ice, a slice of lemon. No
                bitter, nothing orange. That is not a mistake and it is not us being
                difficult — in Trieste that is simply what the word means. Nine times
                out of ten, that is what a local is asking for.
              </p>
              <p>
                <strong>The orange one exists too.</strong> Aperol, Campari, and
                whatever else you had in mind: say the name and it arrives. Nobody
                here will be offended, and nobody will correct you — we are not the
                French about it. <span aria-hidden="true">💓</span>
              </p>
            </div>
          </div>

          <h3 className="font-display font-black uppercase italic text-2xl md:text-3xl text-yellow-400 mb-3 flex items-center gap-3">
            <Beer className="w-7 h-7" /> The beer is the other serious thing
          </h3>
          <p className="text-zinc-400 font-bold mb-8">
            Five on tap and one that rotates — ask at the counter what is on today.
            Depending on the beer and the size, {birre.min} to {birre.max}.
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
                  {birra.en}
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
            How much does it cost?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
            <p>
              A light lunch comes in <strong>under €10</strong>. A full meal — a big
              schiacciata, something to share, beers with friends — is{' '}
              <strong>€15 to €20 a head</strong>.
            </p>
            <p>
              Walking out of here with a €50 bill each is very hard to do. If you
              manage it, you bought a lot of beer — and probably some new friends
              as well.
            </p>
          </div>

          <div className="bg-red-600 text-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] rotate-1 self-start">
            <h3 className="font-display font-black uppercase italic text-xl mb-3">
              Cards are fine
            </h3>
            <p className="font-bold text-sm leading-snug">
              We take cards. You can also take the food away — handy if you are
              walking back to a ship or a train.
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
              How to avoid a tourist trap in Trieste
            </h2>
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black -rotate-2 shrink-0">
              Where the locals eat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-300 leading-relaxed">
              <p>
                The rule is the same in every port city on this coast:{' '}
                <strong className="text-yellow-400">
                  the closer you eat to the sea view, the more of the bill is the
                  view.
                </strong>
              </p>
              <p>
                Ten minutes further inland the view tax stops. Viale XX Settembre is
                where Trieste does its own shopping, its own walking and its own
                evenings, and the prices on this street are the ones the city pays
                every day of the year.
              </p>
              <p>
                It costs you a flat, easy walk with no hills in it. What you give up
                is the sea view — and the sea will still be there after lunch.
              </p>
            </div>

            <div className="bg-yellow-400 border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#fff] rotate-1 self-start">
              <h3 className="font-display font-black uppercase italic text-2xl mb-4 leading-tight">
                How to tell, anywhere in Italy
              </h3>
              <ul className="space-y-3 text-black/80 font-bold leading-snug">
                <li>
                  One kitchen offering pizza, sushi and paella is not good at any of
                  them.
                </li>
                <li>
                  If the menu has no prices on it, the price gets decided after they
                  have seen you.
                </li>
                <li>
                  If the room is full of people speaking the local language at four
                  in the afternoon, you have found it.
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
            How to get here
          </h2>
          <p className="text-base md:text-lg font-bold text-black/70 mb-10 max-w-3xl leading-snug">
            Viale XX Settembre 16, Trieste. Whichever way you arrived in this city,
            the answer is below — Trieste is small and flat, and almost all of it is
            a walk.
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
                The nearest bus stop
              </h3>
            </div>
            <p className="font-bold leading-snug text-base md:text-lg mb-3">
              <strong className="text-yellow-400">{FERMATA_VICINA.nome}</strong> —{' '}
              {FERMATA_VICINA.distanza}. Lines {FERMATA_VICINA.linee} all call there.
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
            <MapPin className="w-6 h-6" /> Open in Google Maps
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
              Where you sit
            </h2>
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
              <p>
                Our tables are outside, on the boulevard itself,{' '}
                <strong>under the plane trees</strong>. Viale XX Settembre is
                closed to traffic, so what is in front of you is a wide walking
                avenue, not a road.
              </p>
              <p>
                They are there <strong>all year round</strong>. There are tables
                inside as well, and in winter that is where most people sit — but
                in summer almost everyone stays out under the trees, so if you are
                coming in July, come for the outside.
              </p>
            </div>
          </div>

          <div className="bg-red-600 text-white border-4 border-black p-6 md:p-8 shadow-[10px_10px_0px_#000] rotate-1 self-center">
            <h3 className="font-display font-black uppercase italic text-2xl mb-3 leading-tight">
              This is the local street
            </h3>
            <p className="font-bold leading-snug mb-4">
              Not the harbour front, not the postcard square. The Viale is where
              Trieste does its walking, its shopping and its evenings.
            </p>
            <p className="font-bold leading-snug border-t-2 border-white/30 pt-4">
              If you hear someone speaking English at the next table, there is a
              fair chance it is one of us, having a go.
            </p>
          </div>
        </div>
      </section>

      {/* ── ORARI ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl tracking-tighter leading-none mb-10">
          When we are open
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6" />
              <h3 className="font-display font-black uppercase italic text-xl md:text-2xl tracking-tight">
                Opening hours
              </h3>
            </div>
            <div className="flex flex-col gap-3">
              {ORARI_EN.map((r) => (
                <div key={r.giorni} className="flex justify-between items-baseline gap-4 border-b-2 border-black/10 pb-2">
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider text-zinc-600">
                    {r.giorni}
                  </span>
                  <span className="text-base md:text-lg font-black">{r.ore}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Open every day · Sunday afternoons and evenings only
            </p>
          </div>

          <div className="border-4 border-black bg-white p-6 md:p-8 shadow-[8px_8px_0px_#facc15] flex flex-col">
            <div className="flex items-start gap-3 mb-5">
              <MapPin className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-black uppercase italic text-xl md:text-2xl tracking-tight mb-1">
                  Booking is a good idea
                </h3>
                <p className="text-sm md:text-base font-bold text-zinc-600 leading-snug">
                  You can always walk in and order at the counter. But if you want to
                  be sure of a table — in the evening, or outside, or for a group —
                  call us or send a message first.
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
                <MessageSquare className="w-4 h-4" /> Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOSSARIO ──────────────────────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400 mb-4">
            A few words you will hear
          </h2>
          <p className="text-zinc-400 font-bold mb-10 max-w-3xl leading-snug">
            Trieste has its own vocabulary, and half of it is not Italian. Use one of
            these at the counter and watch what happens.
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
          Questions people ask us
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
          Come and eat
        </h2>
        <p className="text-base md:text-xl font-bold text-black/70 mb-8 max-w-2xl mx-auto">
          Viale XX Settembre 16, Trieste. Order at the counter, or book a table and
          let us look after you. Either way, just say the name of the thing you want.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener"
            data-ga-posizione="footer"
            className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group"
          >
            <MapPin className="w-6 h-6" /> DIRECTIONS
          </a>
          <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group bg-red-600">
            MENU
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
            © {new Date().getFullYear()} Barretrò. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-black/60 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
            <span>•</span>
            <Link href="/termini-e-condizioni" className="hover:text-black transition-colors">Terms</Link>
          </div>
          <p className="text-[9px] text-black/40 uppercase tracking-wider mt-1 max-w-xl leading-normal text-center">
            Transparency note (EU AI Act): some images on this site are illustrative
            and were generated or optimised with artificial intelligence.
          </p>
        </div>
      </footer>
    </main>
  );
}
