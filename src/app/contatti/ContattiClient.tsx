'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Camera, 
  Clock, 
  Send,
  MessageSquare
} from 'lucide-react';

export default function ContattiClient() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 } as const
    },
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-6 md:px-12 bg-[#fdfaf3]">
      {/* --- HERO SECTION --- */}
      <section className="max-w-7xl mx-auto mt-12 mb-20">
        <div className="relative border-8 border-black p-8 md:p-16 bg-white overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rotate-45 translate-x-16 -translate-y-16 border-l-8 border-b-8 border-black hidden md:block" />
          
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-red-600 text-white font-black uppercase tracking-widest text-xs px-4 py-1 mb-6 -rotate-2 border-2 border-black">
              vien a trovarne
            </span>
            <h1 className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
              NON FARTI <br /> <span className="text-yellow-400">ASPETTARE.</span>
            </h1>
            <p className="text-xl md:text-3xl font-bold text-zinc-800 italic max-w-2xl leading-tight">
              Siamo nel cuore di Trieste, pronti a svoltarti la giornata con le schiacciate più ignoranti del viale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* INFO COLUMN */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Address Card */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
            <div className="relative border-4 border-black bg-white p-8">
              <div className="flex items-start gap-6">
                <div className="bg-yellow-400 border-4 border-black p-3 -rotate-3">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl uppercase italic mb-2">PUNTO DI RITROVO</h3>
                  <p className="text-lg font-bold text-zinc-600">Viale XX Settembre 16, <br /> 34125 Trieste (TS)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phone & Mail Card */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-red-600 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
            <div className="relative border-4 border-black bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-6">
                  <div className="bg-white border-4 border-black p-3 rotate-3 shrink-0">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl uppercase italic mb-1">CHIAMACI</h3>
                    <p className="text-lg font-bold text-zinc-600">+39 040 000 0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-white border-4 border-black p-3 -rotate-6 shrink-0">
                    <Mail className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl uppercase italic mb-1">SCRIVICI</h3>
                    <p className="text-lg font-bold text-zinc-600 text-sm break-all">info@barretro.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hours Card */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="absolute inset-0 bg-yellow-400 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform" />
            <div className="relative border-4 border-black bg-white p-8">
              <div className="flex items-start gap-6">
                <div className="bg-black text-white border-4 border-black p-3 rotate-6 shrink-0">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-black text-2xl uppercase italic mb-4">ORARI DI APERTURA</h3>
                  <div className="grid grid-cols-2 gap-4 text-lg font-bold text-zinc-600">
                    <div>LUN - GIO</div>
                    <div className="text-right">10:00 - 22:00</div>
                    <div>VEN - SAB</div>
                    <div className="text-right">10:00 - 00:00</div>
                    <div>DOMENICA</div>
                    <div className="text-right">11:00 - 21:00</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            <a href="https://www.instagram.com/retroxxsettembre" target="_blank" className="flex-1 h-20 border-4 border-black bg-white hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3 font-display font-black uppercase text-xl italic shadow-[6px_6px_0px_#000]">
              <Camera className="w-8 h-8" /> <span>@RETROXXSETTEMBRE</span>
            </a>
            <a href="https://wa.me/390400000000" target="_blank" className="flex-1 h-20 border-4 border-black bg-white hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-3 font-display font-black uppercase text-xl italic shadow-[6px_6px_0px_#000]">
              <MessageSquare className="w-8 h-8" /> <span>WHATSAPP</span>
            </a>
          </motion.div>
        </motion.div>

        {/* FORM COLUMN */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black p-8 md:p-12 shadow-[12px_12px_0px_#facc15]"
        >
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic text-yellow-400 mb-8 tracking-tight">
            INVIACI UN <br /> MESSAGGIO
          </h2>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-400 tracking-widest pl-1">Il tuo nome</label>
              <input 
                type="text" 
                placeholder="NOME E COGNOME" 
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 text-white font-bold tracking-tight outline-none focus:border-yellow-400 transition-colors uppercase placeholder:text-zinc-700" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-400 tracking-widest pl-1">Email di contatto</label>
              <input 
                type="email" 
                placeholder="TUO@EMAIL.COM" 
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 text-white font-bold tracking-tight outline-none focus:border-yellow-400 transition-colors uppercase placeholder:text-zinc-700" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-zinc-400 tracking-widest pl-1">Cosa vuoi dirci?</label>
              <textarea 
                rows={5}
                placeholder="SCRIVI QUI IL TUO MESSAGGIO..." 
                className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 text-white font-bold tracking-tight outline-none focus:border-yellow-400 transition-colors uppercase placeholder:text-zinc-700 resize-none" 
              />
            </div>

            <button 
              type="button"
              className="w-full btn-western py-8 text-2xl flex items-center justify-center gap-4 group"
            >
              SPEDISCI IL MESSAGGIO <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </form>
        </motion.div>
      </section>

      {/* --- BIG MARQUEE --- */}
      <div className="mt-32 -mx-6 md:-mx-12 overflow-hidden bg-white border-y-4 border-black py-4">
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-4xl md:text-6xl font-display font-black uppercase italic mx-8 tracking-tighter">
              VIALE XX SETTEMBRE 16 • TRIESTE • SCHIACCIATERIA RETRÒ • SCHIACCIATE • BIRRA • MULERIA • 
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 border-t-8 border-black text-center -mx-6 md:-mx-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-2">
          <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Barretrò. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <span>•</span>
            <Link href="/termini-e-condizioni" className="hover:text-white transition-colors">Termini e Condizioni</Link>
          </div>
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider mt-1 max-w-xl leading-normal text-center">
            Nota di trasparenza (AI Act): Alcune immagini presenti sul sito hanno scopo puramente illustrativo e sono state generate o ottimizzate con tecnologie di Intelligenza Artificiale.
          </p>
        </div>
      </footer>
    </main>
  );
}
