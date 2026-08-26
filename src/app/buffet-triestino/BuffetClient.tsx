'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, UtensilsCrossed, Flame, Clock, Beer } from 'lucide-react';
import InfoLocale from '@/components/InfoLocale';

// ─── DATA ────────────────────────────────────────────────────────────────────

const BUFFET_CLASSICI = [
  {
    name: 'Fritti misti',
    tag: 'Il mito',
    desc: 'Verdure impanate e fritte al momento — zucchine, melanzane — e le patatine: la frittura croccante che non può mancare a un vero buffet triestino.',
    color: '#facc15',
  },
  {
    name: 'Patate in tecia',
    tag: 'Tradizione',
    desc: 'Le patate triestine saltate in tecia con cipolla e strutto, l\'accompagnamento che non sbaglia mai.',
    color: '#ffffff',
  },
  {
    name: 'Polpette',
    tag: 'Fatte in casa',
    desc: 'Polpette di carne cotte al forno o in umido, succose dentro e saporite fuori.',
    color: '#ffffff',
  },
  {
    name: 'Rebechin e salumi',
    tag: 'Dal banco',
    desc: 'Selezione di affettati e formaggi nostrani tagliati al momento, come vuole la vera tradizione del buffet.',
    color: '#facc15',
  },
  {
    name: 'Cicchetti triestini',
    tag: 'Aperitivo',
    desc: 'I piccoli assaggi che accompagnano la birra e lo spritz: olive, sgombro, frittate e companatico.',
    color: '#ffffff',
  },
];

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function BuffetClient() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans pt-16 md:pt-20">
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black border-b-8 border-black w-full aspect-[1024/571] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tavolata_ignorante.webp"
            alt="Buffet Triestino da Schiacciateria Retrò"
            fill
            sizes="100vw"
            preload
            quality={100}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center gap-8 md:gap-14 px-6">
          <motion.span
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            animate={{ rotate: -4, scale: 1, opacity: 1 }}
            className="pointer-events-auto bg-red-600 text-white text-xs md:text-base font-black uppercase tracking-widest px-4 py-1.5 md:px-6 md:py-2 border-4 border-black shadow-[5px_5px_0px_#facc15] -rotate-2"
          >
            Trieste, che te devo dir
          </motion.span>

          <motion.h1
            initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            className="pointer-events-auto bg-yellow-400 text-black text-center px-6 py-3 md:px-14 md:py-6 font-display font-black uppercase italic text-4xl md:text-8xl leading-none border-4 md:border-8 border-black shadow-[10px_10px_0px_#000] md:shadow-[20px_20px_0px_#000]"
          >
            Buffet
            <br />
            <span className="text-2xl md:text-5xl">triestino</span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pointer-events-auto max-w-2xl text-center text-white font-bold text-base md:text-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          >
            Fritti, patate in tecia e tartine come da tradizione — direttamente dal banco, ogni giorno.
          </motion.p>
        </div>
      </section>

      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="flex flex-wrap items-center gap-4 mb-8 border-b-[6px] border-black pb-4">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            Il vero buffet <span className="text-yellow-400">de Trieste</span>
          </h2>
          <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black -rotate-2 shrink-0">
            Da Viale XX Settembre
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
            <p>
              Il buffet non è un semplice banco di cibo: a Trieste è <strong>un&apos;istituzione</strong>. 
              Da noi trovi la tradizione del buffet triestino rivista in chiave Retrò: 
              fritti appena fatti, patate in tecia e tartine farcite di vari tipi.
            </p>
            <p>
              Ogni giorno la proposta cambia seguendo la stagione e la voglia del momento, 
              ma la sostanza è sempre quella: <strong>cibo vero, saporito, senza storie</strong>.
            </p>
          </div>

          <div className="bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0px_#000] -rotate-1">
            <Clock className="w-8 h-8 mb-3" />
            <h3 className="font-display font-black uppercase italic text-xl mb-2">La proposta del giorno</h3>
            <p className="text-black/80 font-bold text-sm leading-snug">
              Le specialità cambiano ogni giorno. Chiedi al banco cosa c&apos;è di fresco in vetrina.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLASSICI DEL BUFFET ────────────────────────────── */}
      <section className="bg-black py-16 md:py-24 px-5 border-y-8 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter text-yellow-400">
              I classici del banco
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUFFET_CLASSICI.map((item, i) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.03, y: -6, boxShadow: '10px 10px 0px #facc15' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                style={{ backgroundColor: item.color }}
                className={`border-4 border-black p-6 flex flex-col gap-3 ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-black uppercase italic text-2xl leading-tight text-black">
                    {item.name}
                  </h3>
                  <span className="bg-black text-yellow-400 text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black -rotate-3 shrink-0">
                    {item.tag}
                  </span>
                </div>
                <p className="text-black/75 font-bold leading-snug text-sm md:text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANCO & CULTURA ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-10 md:gap-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] border-8 border-black shadow-[14px_14px_0px_#000] overflow-hidden"
          >
            <Image
              src="/images/schiacciata_vera_stack.webp"
              alt="Il banco della Schiacciateria Retrò"
              fill
              sizes="(max-width: 768px) 100vw, 465px"
              className="object-cover"
            />
            <span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] md:text-xs font-black uppercase px-3 py-1 border-4 border-black -rotate-3 shadow-[4px_4px_0px_#000]">
              Il nostro banco
            </span>
          </motion.div>

          <div className="flex flex-col justify-center">
            <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter mb-8 border-b-[6px] border-black pb-4">
              No xe solo cibo. <br /> Xe <span className="text-yellow-400">Trieste.</span>
            </h2>
            <div className="space-y-5 text-lg md:text-xl font-bold text-zinc-800 leading-relaxed">
              <p>
                Il buffet triestino è cultura: nato come banco dove mangiare in piedi, veloce e genuino, 
                è diventato un simbolo della città. Noi lo portiamo avanti con lo spirito Retrò — 
                quello di sempre, ma con la birra artigianale e lo spritz a portata di mano.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-xl group">
                VEDI IL MENU
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/contatti" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-xl group bg-red-600">
                <Beer className="w-6 h-6" />
                DOVE SIAMO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROFONDISCI (link al cluster blog Tradizioni/Buffet) ── */}
      <section className="max-w-5xl mx-auto px-5 py-16 md:py-20 border-t-8 border-black">
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
            Approfondisci la tradizione
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              href: '/blog/cosa-ordinare-buffet-triestino',
              title: 'Cosa ordinare al buffet triestino',
              desc: 'La guida piatto per piatto per non fare brutta figura al banco.',
            },
            {
              href: '/blog/quale-buffet-scegliere-trieste',
              title: 'Quale buffet scegliere a Trieste',
              desc: 'Tradizione storica o l’alternativa contemporanea? Confronto onesto.',
            },
            {
              href: '/blog/rebechin-come-si-fa-trieste',
              title: 'Il rebechin: come si fa a Trieste',
              desc: 'La pausa da banco tra tradizione portuale e vita triestina di oggi.',
            },
            {
              href: '/blog/tradizioni-triestine-kren-caffe-capo-in-b',
              title: 'Kren, caffè capo in b e altre tradizioni triestine',
              desc: 'I piccoli riti che raccontano Trieste, dal banco alla tazzina.',
            },
            {
              href: '/blog/cosa-mangiare-trieste-tipico',
              title: 'Cosa mangiare di tipico a Trieste',
              desc: 'Buffet, caldaia e street food: la mappa del gusto triestino.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#facc15] hover:-translate-y-1 transition-all"
            >
              <h3 className="font-display font-black uppercase italic text-lg md:text-xl leading-tight mb-2 flex items-center gap-2">
                {item.title}
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-sm font-bold text-zinc-600 leading-snug">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ORARI + CONTATTI ───────────────────────────────── */}
      <InfoLocale titolo="VIENI A MANGIARE IL BUFFET" />

      {/* ── ALLERGENI ──────────────────────────────────────── */}
      <div className="bg-zinc-900 text-white py-8 px-5 text-center">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Chiedi al personale per consultare la lista degli allergeni e le proposte del giorno.
        </p>
      </div>

      {/* ── FOOTER CTA ─────────────────────────────────────── */}
      <footer className="bg-yellow-400 py-16 px-5 border-t-8 border-black text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <UtensilsCrossed className="w-8 h-8 md:w-12 md:h-12" />
          <Flame className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <h2 className="font-display font-black uppercase italic text-4xl md:text-6xl tracking-tighter leading-none mb-4">
          GAONA DA VENIR?
        </h2>
        <p className="text-base md:text-xl font-bold text-black/70 mb-8 max-w-2xl mx-auto">
          Te spettemo in Viale XX Settembre 16. Se no ga credito, prova il buffet: no te te pentissi.
        </p>
        <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
          TORNA AL MENU
        </Link>
        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col items-center gap-2">
          <p className="text-[10px] md:text-xs font-bold text-black/50 uppercase tracking-widest">
            © {new Date().getFullYear()} Barretrò. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-black/60 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
            <span>•</span>
            <Link href="/termini-e-condizioni" className="hover:text-black transition-colors">Termini e Condizioni</Link>
          </div>
          <p className="text-[9px] text-black/40 uppercase tracking-wider mt-1 max-w-xl leading-normal text-center">
            Nota di trasparenza (AI Act): Alcune immagini presenti sul sito hanno scopo puramente illustrativo e sono state generate o ottimizzate con tecnologie di Intelligenza Artificiale.
          </p>
        </div>
      </footer>
    </main>
  );
}
