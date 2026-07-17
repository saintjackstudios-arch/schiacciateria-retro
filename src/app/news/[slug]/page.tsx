import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPostData(slug);
  if (!article) return { title: 'Articolo non trovato' };
  return {
    title: `${article.title} | Bar Retrò Trieste`,
    description: `Leggi l'articolo su ${article.title}. Resta aggiornato sulla movida e il food a Trieste.`,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPostData(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black">
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 bg-[#fdfaf3]/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/news" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] hover:text-yellow-500 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Blog
          </Link>
          <div className="flex gap-6">
            <Share2 className="w-6 h-6 cursor-pointer hover:text-yellow-500 transition-colors" />
          </div>
        </div>
      </nav>

      <article className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="bg-yellow-400 text-black text-xs font-black px-4 py-1 uppercase tracking-widest italic">{article.category}</span>
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
               <Clock className="w-4 h-4" /> {article.date}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display uppercase italic tracking-tighter leading-[1.05] mb-12">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span>Per {article.author}</span>
          </div>
        </header>

        <div className="prose prose-xl prose-zinc max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:italic prose-blockquote:border-yellow-400 prose-blockquote:bg-black/5 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-strong:text-black">
          <MDXRemote source={article.content} />
        </div>


        <footer className="mt-32 pt-16 border-t-4 border-black">
          <h3 className="text-3xl font-display uppercase italic mb-8">Ti è piaciuto il giro?</h3>
          <p className="text-xl font-bold mb-12 opacity-60">Condividi la storia o passa a trovarci in Viale XX Settembre per vivere quella reale.</p>
          <Link href="/news" className="text-sm font-black uppercase tracking-[0.3em] border-b-2 border-black inline-block hover:text-yellow-500 hover:border-yellow-500 transition-all pb-1">
             TUTTI GLI ARTICOLI
          </Link>
          <div className="mt-16 pt-8 border-t border-black/10 flex flex-col items-center gap-2">
            <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
              © {new Date().getFullYear()} Barretrò. Tutti i diritti riservati.
            </p>
            <div className="flex gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 flex-wrap justify-center">
              <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
              <span>•</span>
              <Link href="/termini-e-condizioni" className="hover:text-black transition-colors">Termini e Condizioni</Link>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider mt-1 max-w-xl leading-normal text-center">
              Nota di trasparenza (AI Act): Alcune immagini presenti sul sito hanno scopo puramente illustrativo e sono state generate o ottimizzate con tecnologie di Intelligenza Artificiale.
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}
