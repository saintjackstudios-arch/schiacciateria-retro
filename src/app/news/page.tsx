import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';

export const metadata = {
  title: 'News & Movida | Bar Retrò Trieste',
  description: 'Scopri le ultime novità su Bar Retrò, la vita in Viale XX Settembre e la guida alla migliore schiacciata di Trieste. Il blog per chi ama il vero street food.',
};

import { getSortedPostsData } from '@/lib/blog';

export default function NewsPage() {
  const articles = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 bg-[#fdfaf3]/90 backdrop-blur-md border-b border-black/5">
        <Link href="/" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] hover:text-yellow-500 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Ritorna alla Home
        </Link>
      </nav>

      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-[12vw] md:text-8xl font-display uppercase italic tracking-tighter leading-[0.85] mb-8">
            IL <span className="text-yellow-500">GIRO.</span>
          </h1>
          <p className="text-2xl font-bold opacity-70 max-w-2xl leading-relaxed">
            Storie di strada, schiacciate epiche e tutto quello che succede in Viale XX Settembre. Il nostro modo di raccontare Trieste.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group relative bg-white p-10 border-2 border-black/5 hover:border-yellow-400 transition-all rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-black text-yellow-400 text-xs font-black px-4 py-1 uppercase tracking-widest italic">{article.category}</span>
                <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {article.date}
                </span>
              </div>
              <h2 className="text-4xl font-display uppercase italic tracking-tight mb-6 group-hover:text-yellow-500 transition-colors leading-[1.1]">
                {article.title}
              </h2>
              <p className="text-xl text-zinc-500 font-medium mb-12 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest group-hover:gap-6 transition-all">
                Leggi l&apos;articolo <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Footer CTA */}
      <footer className="bg-black text-white py-32 px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-display uppercase italic tracking-tighter mb-10">Vuoi fare il giro?</h2>
        <p className="text-2xl font-bold opacity-70 mb-12">Passa a trovarci e diventa parte della storia.</p>
        <Link href="/" className="inline-block bg-yellow-400 text-black px-12 py-5 text-xl font-black uppercase tracking-[0.2em] hover:bg-white transition-colors border-2 border-black">
          TORNA ALLA HOME
        </Link>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-2">
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
