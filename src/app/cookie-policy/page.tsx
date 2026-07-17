import Link from 'next/link';

export const metadata = {
  title: "Cookie Policy | Schiacciateria Retrò Trieste",
  description: "Informativa sull'uso dei cookie del sito di Schiacciateria Retrò Trieste.",
  robots: "noindex, follow",
};

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] pt-32 pb-24 px-6 select-none selection:bg-yellow-400 selection:text-black">
      <div className="max-w-4xl mx-auto bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_#000]">
        
        {/* Header/Title */}
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-8 tracking-tighter leading-none border-b-8 border-black pb-6 text-black">
          COOKIE <span className="text-red-600">POLICY</span>
        </h1>
        
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-12">
          Ultimo aggiornamento: 16 Luglio 2026
        </p>

        {/* Content */}
        <div className="space-y-10 text-zinc-800 font-sans leading-relaxed text-base md:text-lg">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              1. Cosa sono i Cookie
            </h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie sono usati per differenti finalità: esecuzione di autenticazioni informatiche, monitoraggio di sessioni, memorizzazione di informazioni su specifiche configurazioni riguardanti gli utenti che accedono al server, ecc.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              2. Tipologie di Cookie utilizzate
            </h2>
            <p>
              Questo sito web fa uso di diverse tipologie di cookie per migliorare l&apos;esperienza dell&apos;utente e analizzare il traffico di navigazione:
            </p>
            <div className="space-y-4 border-l-2 border-black pl-6 my-4">
              <p>
                <strong>Cookie Tecnici e di Sessione:</strong> Sono cookie necessari per il corretto funzionamento del sito e per permetterti una navigazione fluida. Senza di essi, il sito web potrebbe non funzionare in modo ottimale.
              </p>
              <p>
                <strong>Cookie Analitici (Google Analytics):</strong> Utilizziamo cookie di terze parti forniti da Google Inc. per scopi statistici in forma aggregata ed anonimizzata. Questo ci permette di capire quante persone visitano il sito, quali pagine sono le più visualizzate e come gli utenti interagiscono con il layout del sito, al fine di ottimizzare costantemente la navigazione e i contenuti.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              3. Gestione ed Eliminazione dei Cookie
            </h2>
            <p>
              Puoi configurare il tuo browser in modo da accettare o rifiutare tutti i cookie, o ricevere una notifica quando viene installato un cookie. Ogni browser ha impostazioni differenti per la gestione dei cookie. Ecco i link alle istruzioni dei browser più diffusi:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-bold text-zinc-900">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 transition-colors">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 transition-colors">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/kb/HT1677" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 transition-colors">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/microsoft-edge/delete-and-manage-cookies-168dab11-0753-243d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600 transition-colors">Microsoft Edge</a></li>
            </ul>
            <p className="text-sm italic text-zinc-500 mt-4">
              Nota: la disattivazione dei cookie tecnici potrebbe compromettere la corretta visualizzazione o funzionalità di alcune parti del sito web.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              4. Maggiori informazioni
            </h2>
            <p>
              Per maggiori dettagli sul trattamento dei dati personali, ti invitiamo a consultare la nostra{' '}
              <Link href="/privacy" className="underline font-black hover:text-red-600 transition-colors">
                Privacy Policy
              </Link>. Per qualsiasi informazione o per l&apos;esercizio dei tuoi diritti relativi ai tuoi dati, puoi contattarci scrivendo a{' '}
              <a href="mailto:info@barretro.com" className="underline font-black hover:text-red-600 transition-colors">info@barretro.com</a>.
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
          <Link 
            href="/privacy" 
            className="font-bold text-zinc-500 hover:text-black transition-colors underline"
          >
            Leggi la Privacy Policy
          </Link>
        </div>

      </div>
    </main>
  );
}
