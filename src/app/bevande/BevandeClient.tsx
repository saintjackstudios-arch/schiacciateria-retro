'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Beer, GlassWater } from 'lucide-react';

export default function BevandeClient() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white flex justify-between items-center px-5 py-4 border-b-[6px] border-yellow-400 shadow-lg">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-yellow-400" /> Menu
        </Link>
        <span className="font-display uppercase italic font-black text-base md:text-xl text-yellow-400 tracking-tight">
          Schiacciateria Retrò
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden md:block">
          Viale XX Settembre 16 — Trieste
        </span>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-5 relative overflow-hidden bg-white border-b-8 border-black">
        <div className="absolute inset-0 bg-check-faint opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ rotate: -5, scale: 0.8, opacity: 0 }}
            animate={{ rotate: -2, scale: 1, opacity: 1 }}
            className="inline-block bg-yellow-400 text-black px-5 py-1.5 text-sm md:text-xl font-black uppercase italic border-4 border-black mb-6 shadow-[6px_6px_0px_#000]"
          >
            Birre & Bevande
          </motion.div>

          <h1 className="text-[20vw] md:text-[10vw] font-display font-black uppercase italic tracking-tighter leading-[0.75] mb-5">
            DA <br /> <span className="text-yellow-400">BERE.</span>
          </h1>

          <p className="text-sm md:text-xl font-bold text-zinc-500 italic max-w-xl">
            Birre artigianali, drink e soft drink — chiedi al cameriere la lista del giorno.
          </p>
        </div>
      </section>

      {/* Coming Soon Placeholder */}
      <div className="max-w-4xl mx-auto px-5 py-20 flex flex-col items-center justify-center gap-10 text-center">
        <div className="flex gap-8 opacity-20">
          <Beer className="w-24 h-24 text-black" />
          <GlassWater className="w-24 h-24 text-black" />
        </div>
        <div className="border-4 border-dashed border-zinc-300 py-16 px-8 w-full max-w-2xl">
          <p className="font-display font-black uppercase italic text-4xl md:text-6xl text-zinc-300 tracking-tighter leading-tight">
            Lista in arrivo
          </p>
          <p className="mt-4 text-zinc-400 font-bold text-lg">
            Nel frattempo chiedi al nostro personale — abbiamo sempre qualcosa di buono alla spina.
          </p>
        </div>
      </div>

      {/* Allergeni */}
      <div className="bg-zinc-900 text-white py-8 px-5 text-center">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Chiedi al personale per consultare la lista degli allergeni.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-400 py-16 px-5 border-t-8 border-black text-center">
        <h2 className="font-display font-black uppercase italic text-4xl md:text-6xl tracking-tighter leading-none mb-4">
          HAI SETE?
        </h2>
        <p className="text-base md:text-xl font-bold text-black/70 mb-8">
          Vieni in Viale XX Settembre. Abbiamo birra a fiumi.
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
