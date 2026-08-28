import Link from 'next/link';
import { ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPostData, getSortedPostsData } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPostData(slug);
  if (!article) return { title: 'Articolo non trovato' };
  return {
    // `absolute` toglie il suffisso "| Schiacciateria Retro Trieste" del layout:
    // sono 31 caratteri su 60, e questi articoli non vengono cercati per nome.
    title: { absolute: article.title },
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `https://schiacciateriaretrotrieste.com/blog/${slug}`,
      siteName: 'Schiacciateria Retrò Trieste',
      images: article.hero_image
        ? [{ url: article.hero_image, alt: article.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.hero_image ? [article.hero_image] : undefined,
    },
    alternates: {
      canonical: `https://schiacciateriaretrotrieste.com/blog/${slug}`,
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPostData(slug);

  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white flex justify-between items-center px-5 py-4 border-b-[6px] border-yellow-400">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-yellow-400" /> Blog
        </Link>
        <span className="font-display uppercase italic font-black text-base md:text-xl text-yellow-400 tracking-tight">
          Schiacciateria Retrò
        </span>
        <button
          className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-yellow-400 transition-colors hidden md:flex items-center gap-2"
          aria-label="Condividi articolo"
        >
          <Share2 className="w-4 h-4" /> Condividi
        </button>
      </nav>

      {/* Article */}
      <article className="pt-28 pb-24 px-5 max-w-3xl mx-auto">

        {/* Header */}
        <header className="mb-12 pt-8">
          {/* Categoria + data */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-yellow-400 text-black text-xs font-black px-3 py-1 uppercase tracking-widest italic border-2 border-black shadow-[3px_3px_0px_#000]">
              {article.category}
            </span>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {article.date}
            </span>
          </div>

          {/* Titolo */}
          <h1 className="font-display font-black uppercase italic tracking-tighter leading-tight text-4xl md:text-6xl mb-6">
            {article.title}
          </h1>

          {/* Divider neobrutalista */}
          <div className="h-[6px] bg-black w-24 mb-6" />

          {/* Autore */}
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-12">
            Di {article.author}
          </p>

          {/* Hero Image */}
          {article.hero_image && (
            <div className="w-full border-[6px] border-black shadow-[8px_8px_0px_#000] overflow-hidden bg-yellow-400">
              <img 
                src={article.hero_image} 
                alt={`Copertina per: ${article.title}`}
                className="w-full h-auto object-cover aspect-video hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </header>

        {/* Contenuto MDX con stile prose allineato al neobrutalismo */}
        <div className="
          prose prose-zinc max-w-none
          prose-headings:font-display prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-headings:leading-tight
          prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-l-8 prose-h2:border-yellow-400 prose-h2:pl-4
          prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-10 prose-h3:mb-4
          prose-p:text-base prose-p:md:text-lg prose-p:font-medium prose-p:leading-loose prose-p:mb-6
          prose-strong:font-black prose-strong:text-black
          prose-blockquote:border-l-[6px] prose-blockquote:border-black prose-blockquote:bg-yellow-400 prose-blockquote:text-black prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:font-black prose-blockquote:text-lg prose-blockquote:shadow-[6px_6px_0px_#000]
          prose-ul:list-none prose-ul:pl-0 prose-ul:mb-8
          prose-li:before:content-['→'] prose-li:before:text-black prose-li:before:font-black prose-li:before:mr-3 prose-li:font-semibold prose-li:mb-2
          prose-a:text-black prose-a:underline prose-a:underline-offset-4 prose-a:decoration-yellow-400 prose-a:decoration-4 hover:prose-a:bg-yellow-400 transition-colors
          prose-hr:border-t-[6px] prose-hr:border-black prose-hr:my-16
        ">
          <MDXRemote 
            source={article.content} 
            components={{
              a: (props: any) => {
                const isInternal = props.href?.startsWith('/');
                if (isInternal) {
                  return <Link href={props.href} className={props.className}>{props.children}</Link>;
                }
                return <a target="_blank" rel="noopener noreferrer" {...props} />;
              }
            }} 
          />
        </div>

        {/* SEO: Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": article.title,
              "description": article.excerpt,
              // Google chiede `image` per mostrare l'articolo con la foto accanto
              // invece che solo testo. Il valore c'era gia' nel frontmatter, non
              // era dichiarato. Assoluto: nello schema i percorsi relativi non valgono.
              ...(article.hero_image
                ? { "image": `https://schiacciateriaretrotrieste.com${article.hero_image}` }
                : {}),
              // Dice a quale pagina appartiene questo articolo. Senza, Google deve
              // dedurlo, e su un sito con 28 articoli simili la deduzione costa.
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://schiacciateriaretrotrieste.com/blog/${slug}`
              },
              "author": {
                "@type": "Person",
                "name": article.author,
              },
              "datePublished": article.date,
              "dateModified": article.dateModified || article.date,
              "publisher": {
                "@type": "Organization",
                "name": "Schiacciateria Retrò Trieste",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://schiacciateriaretrotrieste.com/logo_retro.png"
                }
              }
            })
          }}
        />

        {/* Footer articolo */}
        <footer className="mt-16 pt-8 border-t-4 border-black">
          <div className="bg-black text-white p-8 shadow-[8px_8px_0px_#facc15]">
            <p className="font-display font-black uppercase italic text-2xl md:text-3xl tracking-tighter mb-2">
              Schiacciateria Retrò
            </p>
            <p className="text-sm text-zinc-400 font-bold mb-6">
              Viale XX Settembre 16 — Trieste
            </p>
            {/* Due destinazioni, non una. Fino al 26/08/2026 il menu era linkato da
                23 articoli su 28 e la pagina Contatti da ZERO: ventotto articoli su
                dove mangiare a Trieste, e nessuno che dicesse come arrivarci. */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="btn-western inline-flex items-center gap-3 px-6 py-3 text-sm"
              >
                VEDI IL MENU <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-black uppercase tracking-widest border-4 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Dove siamo e orari <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest border-b-4 border-black hover:border-yellow-400 hover:text-yellow-600 transition-all pb-1"
            >
              <ArrowLeft className="w-4 h-4" /> Tutti gli articoli
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-black/10 flex flex-col items-center gap-2">
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
