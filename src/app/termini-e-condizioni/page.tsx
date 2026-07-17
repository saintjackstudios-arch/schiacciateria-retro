import Link from 'next/link';

export const metadata = {
  title: "Termini e Condizioni | Schiacciateria Retrò Trieste",
  description: "Termini e condizioni d'uso del sito di Schiacciateria Retrò Trieste, inclusa la trasparenza sulle immagini generate da IA.",
  robots: "noindex, follow",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] pt-32 pb-24 px-6 select-none selection:bg-yellow-400 selection:text-black">
      <div className="max-w-4xl mx-auto bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_#000]">
        
        {/* Header/Title */}
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-8 tracking-tighter leading-none border-b-8 border-black pb-6 text-black">
          TERMINI E <span className="text-red-600">CONDIZIONI</span>
        </h1>
        
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-12">
          Ultimo aggiornamento: 16 Luglio 2026
        </p>

        {/* Content */}
        <div className="space-y-10 text-zinc-800 font-sans leading-relaxed text-base md:text-lg">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              1. Oggetto e Accettazione dei Termini
            </h2>
            <p>
              Benvenuto sul sito di <strong>Schiacciateria Retrò</strong> (di seguito, &quot;Sito&quot;). L&apos;accesso e l&apos;uso di questo Sito sono regolati dai presenti Termini e Condizioni. Utilizzando il Sito, l&apos;utente accetta integralmente e senza riserve le presenti condizioni d&apos;uso. Se non accetti tali termini, ti invitiamo a non utilizzare il Sito.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              2. Trasparenza sulle Immagini e AI Act (Regolamento UE 2024/1689)
            </h2>
            <div className="bg-yellow-50 border-4 border-yellow-400 p-6 md:p-8 space-y-4">
              <h3 className="font-display font-black uppercase italic text-xl text-black">
                Nota Importante sull&apos;uso dell&apos;Intelligenza Artificiale
              </h3>
              <p>
                In conformità con gli obblighi di trasparenza previsti dal <strong>Regolamento Europeo sull&apos;Intelligenza Artificiale (AI Act)</strong>, informiamo l&apos;utente che alcune delle immagini di prodotti alimentari, piatti pronti e ambientazioni presenti su questo Sito sono state generate, ottimizzate o elaborate tramite l&apos;ausilio di tecnologie e sistemi di <strong>Intelligenza Artificiale (IA)</strong>.
              </p>
              <p className="font-bold">
                Tali immagini hanno uno scopo puramente illustrativo e promozionale. Il prodotto reale servito presso la nostra sede fisica (Schiacciateria Retrò, Viale XX Settembre 16, Trieste) potrebbe differire nell&apos;aspetto visivo e nella presentazione da quanto rappresentato graficamente sul Sito.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              3. Informazioni sui Prodotti, Prezzi e Allergeni
            </h2>
            <p>
              Ci impegniamo a mantenere le informazioni relative a menu, ingredienti, prezzi e orari costantemente aggiornate. Tuttavia:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>I prezzi e la disponibilità degli ingredienti o delle birre speciali possono subire variazioni senza preavviso a seconda della stagione o della reperibilità.</li>
              <li>Le informazioni sugli allergeni presenti sul Sito hanno valore puramente informativo. <strong>Gli utenti sono tenuti a consultare il personale di sala ed il registro degli allergeni ufficiale presente nel locale fisico prima dell&apos;ordinazione.</strong></li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              4. Proprietà Intellettuale
            </h2>
            <p>
              Tutti i contenuti di questo Sito — inclusi testi, loghi, grafica, codice di programmazione, layout neo-brutalista, prompt creativi e combinazioni di colori — sono di proprietà esclusiva di <strong>Schiacciateria Retrò</strong> o dei rispettivi licenziatari e sono protetti dalle leggi vigenti sul diritto d&apos;autore e sulla proprietà industriale.
            </p>
            <p>
              È severamente vietata la riproduzione, la copia o la redistribuzione, anche parziale, di qualunque elemento visivo o testuale del Sito senza esplicita autorizzazione scritta da parte del Titolare.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              5. Limitazione di Responsabilità
            </h2>
            <p>
              Schiacciateria Retrò non assume alcuna responsabilità per eventuali danni diretti o indiretti derivanti dall&apos;utilizzo del Sito, dall&apos;impossibilità di accedervi o dall&apos;affidamento riposto nelle informazioni in esso contenute.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              6. Legge Applicabile e Foro Competente
            </h2>
            <p>
              I presenti termini d&apos;uso sono regolati dalla legge italiana. Qualsiasi controversia inerente all&apos;utilizzo del Sito o all&apos;interpretazione dei presenti Termini sarà devoluta alla competenza esclusiva del Foro di Trieste.
            </p>
          </section>

        </div>

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t-4 border-black flex justify-between items-center flex-wrap gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 border-4 border-black font-display font-black uppercase italic shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Torna alla Home
          </Link>
          <div className="flex gap-4 text-sm font-bold text-zinc-500 underline">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </main>
  );
}
