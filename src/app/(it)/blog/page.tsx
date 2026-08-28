import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getSortedPostsData } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Guide, storie e curiosità sulla cultura di Trieste: aperitivo, street food, movida e tutto quello che succede in Viale XX Settembre.',
  alternates: {
    canonical: 'https://schiacciateriaretrotrieste.com/blog',
  }
};

const CATEGORY_COLORS: Record<string, string> = {
  'MOVIDA':    'bg-yellow-400 text-black',
  'FOOD':      'bg-black text-yellow-400',
  'APERITIVO': 'bg-red-600 text-white',
  'TRIESTE':   'bg-white text-black border-2 border-black',
  'GUIDA TRIESTE': 'bg-yellow-400 text-black',
};

export default function BlogPage() {
  const articles = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans">

      {/* Nav — neobrutalista identico alle altre pagine */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white flex justify-between items-center px-5 py-4 border-b-[6px] border-yellow-400">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-yellow-400" /> Home
        </Link>
        <span className="font-display uppercase italic font-black text-base md:text-xl text-yellow-400 tracking-tight">
          Schiacciateria Retrò
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden md:block">
          Viale XX Settembre 16 — Trieste
        </span>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-5 bg-white border-b-8 border-black relative overflow-hidden">
        <div className="absolute inset-0 bg-check-faint opacity-40 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-block bg-yellow-400 text-black px-5 py-1.5 text-sm font-black uppercase italic border-4 border-black mb-6 shadow-[6px_6px_0px_#000] -rotate-1">
            Il Nostro Blog
          </div>
          <h1 className="text-[18vw] md:text-[9vw] font-display font-black uppercase italic tracking-tighter leading-[0.8] mb-5">
            STORIE<br />
            <span className="text-yellow-400">DI STRADA.</span>
          </h1>
          <p className="text-sm md:text-lg font-bold text-zinc-500 italic max-w-xl">
            Guide, curiosità e consigli su Trieste. Scritti da chi vive il Viale ogni giorno.
          </p>
        </div>
      </section>

      {/* Griglia articoli */}
      <section className="px-5 py-16 max-w-5xl mx-auto">
        {articles.length === 0 ? (
          <div className="border-4 border-dashed border-zinc-300 py-20 text-center">
            <p className="font-display font-black uppercase italic text-4xl text-zinc-300">
              Prossimamente
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, i) => {
              const catClass = CATEGORY_COLORS[article.category] ?? 'bg-black text-yellow-400';
              const isFirst = i === 0;
              return (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={`group block bg-white border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all ${isFirst ? 'md:col-span-2' : ''}`}
                >
                  <div className="p-8">
                    {/* Categoria + data */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`text-xs font-black px-3 py-1 uppercase tracking-widest italic border-2 border-black ${catClass}`}>
                        {article.category}
                      </span>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        {article.date}
                      </span>
                    </div>

                    {/* Titolo */}
                    <h2 className={`font-display font-black uppercase italic tracking-tighter leading-[0.9] mb-4 group-hover:text-yellow-500 transition-colors ${isFirst ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm md:text-base font-semibold text-zinc-500 mb-8 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-5 py-2 border-2 border-black shadow-[4px_4px_0px_#000] font-black text-xs uppercase tracking-widest group-hover:bg-black group-hover:text-yellow-400 transition-colors">
                      Leggi l&apos;articolo <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-yellow-400 py-16 px-5 border-t-8 border-black text-center">
        <h2 className="font-display font-black uppercase italic text-4xl md:text-6xl tracking-tighter leading-none mb-4">
          HAI FAME?
        </h2>
        <p className="text-base md:text-xl font-bold text-black/70 mb-8">
          Smetti di leggere e passa a trovarci in Viale XX Settembre 16.
        </p>
        <Link href="/menu" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group">
          VEDI IL MENU <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
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
