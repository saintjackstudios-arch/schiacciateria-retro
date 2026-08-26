'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Heart, Camera, Utensils, Coffee, Beer, Hammer, GraduationCap, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

const MarqueeRow = ({ text, color, direction = "left", speed = "20s" }: { text: string, color: string, direction?: "left" | "right", speed?: string }) => {
  return (
    <div className={cn("w-full overflow-hidden whitespace-nowrap py-4 md:py-8 border-y-4 border-black flex", color)}>
      <div 
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-12",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: speed }}
      >
        <span className="text-4xl md:text-8xl font-black font-display italic leading-none shrink-0">{text}</span>
        <span className="text-4xl md:text-8xl font-black font-display italic leading-none shrink-0">{text}</span>
      </div>
      <div 
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-12",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: speed }}
        aria-hidden="true"
      >
        <span className="text-4xl md:text-8xl font-black font-display italic leading-none shrink-0">{text}</span>
        <span className="text-4xl md:text-8xl font-black font-display italic leading-none shrink-0">{text}</span>
      </div>
    </div>
  );
};

const TimelineItem = ({ year, title, subtitle, content, icon: Icon, image, rotate = 0, align = "left" }: { year: string; title: string; subtitle?: string; content: string; icon: any; image?: string; rotate?: number; align?: "left" | "right" }) => (
  <motion.div 
    initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={cn(
      "relative flex flex-col md:flex-row gap-8 mb-32 items-center",
      align === "right" ? "md:flex-row-reverse" : ""
    )}
  >
    {/* Year Badge */}
    <div className="md:w-1/4 flex flex-col items-center md:items-start shrink-0">
      <div className="bg-black text-yellow-400 px-6 py-2 text-4xl font-display italic font-black border-4 border-black shadow-[6px_6px_0px_#facc15] -rotate-3 mb-4">
        {year}
      </div>
      <Icon className="w-12 h-12 text-zinc-300 hidden md:block" />
    </div>

    {/* Content Card */}
    <div className={cn(
      "flex-1 bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_#000] relative",
      rotate !== 0 ? `rotate-[${rotate}deg]` : ""
    )}
    style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-600 border-4 border-black flex items-center justify-center rotate-12">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-3xl md:text-5xl font-display uppercase italic leading-none mb-4 tracking-tighter">{title}</h3>
      {subtitle && <p className="text-red-600 font-black uppercase text-sm tracking-widest mb-6">{subtitle}</p>}
      <p className="text-lg md:text-xl font-bold text-zinc-700 leading-relaxed italic">
        {content}
      </p>

      {image && (
        <div className="mt-8 relative aspect-video border-4 border-black group overflow-hidden">
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
      )}
    </div>
  </motion.div>
);

export default function ChiSiamoClient() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto inline-flex items-center gap-3 bg-white border-4 border-black px-6 py-3 shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-sm font-black uppercase tracking-widest italic"
        >
          <ArrowLeft className="w-5 h-5" /> HOME
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 bg-black text-white border-b-[12px] border-yellow-400 overflow-hidden">
        <div className="absolute inset-0 bg-check-faint opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <p className="text-yellow-400 font-black uppercase tracking-[0.4em] mb-6 whitespace-nowrap">25 ANNI DI BADILADE</p>
            <h1 className="text-[12vw] md:text-[10vw] font-display font-black leading-[0.75] uppercase italic tracking-tighter mb-12">
              DA PORTAPIZZE <br /> A <span className="text-yellow-400">RE DELLO STREET FOOD.</span>
            </h1>
            <div className="inline-block bg-red-600 text-white px-12 py-6 -rotate-2 border-4 border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]">
              <span className="text-2xl md:text-4xl font-display uppercase italic font-black leading-none">
                &quot;NO TE ME CREDI? VIEN A PROVAR.&quot;
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Personalizzata */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-bold text-zinc-900 leading-tight italic">
            &quot;Bella muli! Vi racconto un po&apos; la mia storia. Tutto quello che mi ha portato ad aprire la schiacciateria <span className="bg-yellow-400 px-2 leading-none">RETRÒ</span>. Dalla Pizzeria Corallo del &apos;99 a oggi, è stata un&apos;avventura atomica.&quot;
          </p>
        </div>
      </section>

      {/* The Timeline Section */}
      <section className="pt-12 pb-20 px-6 bg-[#fdfaf3]">
        <div className="max-w-6xl mx-auto">
          
          <TimelineItem 
            year="1999"
            title="L'Inizio del Banco"
            subtitle="Pizzeria Corallo"
            icon={Zap}
            image="/images/pizzeria_corallonuova.webp"
            content="Ho cominciato come portapizze, ma il banco mi chiamava. La mitica Wanda mi ha insegnato il mestiere: nelle ore scariche schiacciavo le prime pizze. È lì che è nato l'amore per il servizio."
            align="left"
            rotate={-1}
          />

          <TimelineItem 
            year="2000-2007"
            title="Cuore e Pretesa"
            subtitle="Caffè Mozart"
            icon={Utensils}
            content="Lavoro duro da Nadia e Manuele. Erano pretenziosi, cercavano la perfezione. Quegli insegnamenti spettacolari sono le basi che trasmetto oggi ai miei collaboratori, in chiave moderna."
            align="right"
            rotate={1}
            image="/caffè_mozart.jpg"
          />

          <TimelineItem 
            year="2007-2009"
            title="L'Anima dell'Oste"
            subtitle="Bar Sportivo da Sergio e Laura"
            icon={Users}
            content="Con Sergio mi sono divertito da morire. Era un oste di quelli vecchi, quelli veri. Da lui ho preso lo stile che ho tuttora: l'accoglienza che non si dimentica."
            align="left"
            rotate={-2}
          />

          {/* Special Section: TRIESTUBE */}
          <div className="my-40 relative group px-4">
             <div className="absolute inset-0 bg-yellow-400 -rotate-1 border-4 border-black shadow-[16px_16px_0px_#000] group-hover:rotate-1 transition-transform" />
             <div className="relative p-12 md:p-24 text-center">
                <div className="mb-8 relative w-full max-w-md mx-auto aspect-square border-4 border-black shadow-[8px_8px_0px_#000] rotate-2 overflow-hidden">
                   <Image src="/triestube.jpeg" alt="Triestube Days" fill sizes="(max-width: 448px) 100vw, 448px" className="object-cover" />
                </div>
                <h3 className="text-6xl md:text-9xl font-display uppercase italic font-black leading-none mb-8 text-black">
                   2009: <br className="md:hidden" /> TRIESTUBE
                </h3>
                <p className="text-xl md:text-3xl font-black uppercase italic max-w-3xl mx-auto text-black/80 leading-tight">
                   &quot;Con il mitico Cescone abbiamo fatto un casino atomico. Se quel posto potesse parlare, sarebbe roba da ergastolo! Disastri, birre e pura gioia triestina.&quot;
                </p>
             </div>
          </div>

          <TimelineItem 
            year="2011"
            title="Molo T e Birra a Fiumi"
            subtitle="Muggia Summer Vibes"
            icon={Beer}
            content="Un'estate pazzesca. Metà pioggia, metà fiumi di birra, spritz e festa ogni giorno. Pura energia da strada prima della grande pausa."
            align="right"
            rotate={2}
          />

          <TimelineItem 
            year="2011-2013"
            title="Il Cambio Vita"
            subtitle="Gli anni dell'Idraulico"
            icon={Hammer}
            image="/idraulico.jpg"
            content="Il 31 agosto 2011 mi sono rotto le balle e ho chiuso tutto. Ho fatto l'idraulico per due anni. Ma l'amore per la ristorazione era una roba che non potevo lasciare."
            align="left"
            rotate={-1}
          />

          <TimelineItem 
            year="2013-2017"
            title="Latte Art & Coffee"
            subtitle="Il Bar dell'Università"
            icon={GraduationCap}
            content="Mio fratello mi ha chiesto aiuto. Un mondo nuovo: caffetteria pura, corsi di latte art, estrazioni. Quattro anni di formazione tecnica che hanno alzato il livello."
            align="right"
            rotate={1}
          />

          <TimelineItem 
            year="2017"
            title="Nasce RETRÒ"
            subtitle="La Sfida in Viale"
            icon={Coffee}
            image="/hero_aggressive.jpg"
            content="Abbiamo preso un bar disastrato e lo abbiamo rivoluzionato. Pulito, rinominato, ridisegnato. Studio costante su mixologia e birre. Retrò era finalmente realtà."
            align="left"
            rotate={-1}
          />

          <TimelineItem 
            year="Oggi"
            title="Il Volto dello Street Food"
            subtitle="Partner con SaintJack Studios"
            icon={Star}
            image="/images/schiacciata_vera_stack.webp"
            content="Da due anni gestisco tutto da solo. Con SaintJack Studios abbiamo alzato la qualità dell'immagine e del prodotto ai massimi livelli. Non ho paura a dirlo: abbiamo la miglior schiacciata di Trieste."
            align="right"
            rotate={2}
          />
        </div>
      </section>

      {/* Team di Oggi Section */}
      <section className="py-40 px-6 bg-white border-y-8 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-6xl md:text-8xl font-display uppercase italic font-black leading-none tracking-tighter">
              LA SQUADRA <br /> <span className="text-yellow-500">DI OGGI.</span>
            </h2>
            <div className="bg-zinc-900 text-white p-8 border-4 border-black shadow-[12px_12px_0px_#facc15] -rotate-1">
              <p className="text-xl md:text-2xl font-bold leading-relaxed italic">
                &quot;Oltre a Davide, c&apos;è un team di muli pronti a sfornare schiacciate a ritmo serrato. Gente che sa cosa significa stare dietro al banco e che mette il cuore in ogni badilada.&quot;
              </p>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-video bg-zinc-200 border-4 border-black shadow-[16px_16px_0px_#000] rotate-2 flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-check-faint opacity-20" />
               <Users className="w-24 h-24 text-black/10 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 font-black uppercase tracking-widest italic text-xs">
                 RETRÒ GANG [PLACEHOLDER]
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Country Dream Section */}
      <section className="py-40 px-6 bg-[#facc15] border-t-8 border-black overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 pattern-check-yellow" />
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
               <h2 className="text-7xl md:text-9xl font-display uppercase italic font-black leading-[0.8] mb-8">IL SOGNO <br /> <span className="text-red-600">COUNTRY.</span></h2>
               <p className="text-2xl md:text-3xl font-black uppercase italic leading-tight text-zinc-900">
                  &quot;Sogno una birreria, un posto country, un saloon americano. Un posto di quelli dove ti senti subito a casa, oltre l&apos;oceano. E spero di raggiungerlo presto.&quot;
               </p>
            </div>
            <div className="flex-1 w-full flex justify-center">
               <div className="w-80 h-80 md:w-[500px] md:h-[500px] border-8 border-black bg-zinc-900 shadow-[20px_20px_0px_#000] rotate-3 relative overflow-hidden flex items-center justify-center">
                  <Camera className="w-24 h-24 text-white/10" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 font-black uppercase italic z-20">PROSSIMA TAPPA</div>
                  <div className="absolute bottom-10 text-white font-black text-2xl uppercase tracking-widest italic opacity-20">COMING SOON</div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-black py-48 px-6 text-center border-t-[12px] border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-7xl md:text-[11vw] font-display uppercase italic tracking-tighter leading-none mb-10 text-white">
            BASTA <br /> <span className="text-yellow-400">STORIE.</span>
          </h2>
          <p className="text-3xl md:text-5xl font-black italic uppercase leading-none text-white/50 mb-20 drop-shadow-sm">
            VIENI A VIVERE LA <br className="md:hidden" /> REALTÀ DAL VIVO.
          </p>
          <Link 
            href="/menu" 
            className="btn-western inline-block px-12 md:px-20 py-6 md:py-10 text-3xl md:text-5xl bg-yellow-400 text-black border-4 border-black shadow-[12px_12px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            VEDI IL MENU
          </Link>
          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center gap-2">
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
        </div>
      </footer>
    </main>
  );
}
