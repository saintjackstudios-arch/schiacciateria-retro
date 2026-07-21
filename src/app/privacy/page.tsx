import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | Schiacciateria Retrò Trieste",
  description: "Informativa sulla privacy per il trattamento dei dati personali del sito di Schiacciateria Retrò Trieste.",
  robots: "noindex, follow",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] pt-32 pb-24 px-6 select-none selection:bg-yellow-400 selection:text-black">
      <div className="max-w-4xl mx-auto bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_#000]">
        
        {/* Header/Title */}
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-8 tracking-tighter leading-none border-b-8 border-black pb-6 text-black">
          PRIVACY <span className="text-red-600">POLICY</span>
        </h1>
        
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-12">
          Ultimo aggiornamento: 16 Luglio 2026
        </p>

        {/* Content */}
        <div className="space-y-10 text-zinc-800 font-sans leading-relaxed text-base md:text-lg">
          
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              1. Titolare del Trattamento dei Dati
            </h2>
            <p className="font-bold">
              Schiacciateria Retrò di Marco Tarantino<br />
              Sede legale: Viale XX Settembre 16, 34132 Trieste (TS), Italia<br />
              Email di contatto: <a href="mailto:info@schiacciateriaretrotrieste.com" className="underline hover:text-red-600 transition-colors font-black">info@schiacciateriaretrotrieste.com</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              2. Tipologie di Dati Raccolti
            </h2>
            <p>
              Fra i Dati Personali raccolti da questo Sito Web, in modo autonomo o tramite terze parti, ci sono:
            </p>
            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, nomi a dominio del computer, indirizzi URI/URL, orario della richiesta, parametri relativi al sistema operativo dell&apos;utente.</li>
              <li><strong>Dati forniti volontariamente:</strong> nome, email ed eventuali messaggi inviati tramite moduli di contatto o all&apos;indirizzo email indicato.</li>
              <li><strong>Cookie e dati di utilizzo:</strong> tracciamenti statistici anonimizzati.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              3. Modalità e Luogo del Trattamento
            </h2>
            <p>
              Il Titolare adotta le opportune misure di sicurezza volte ad impedire l&apos;accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali. Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e logiche strettamente correlate alle finalità indicate.
            </p>
            <p className="font-bold">
              I dati sono trattati presso le sedi del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              4. Finalità del Trattamento
            </h2>
            <p>
              I Dati dell&apos;Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste di informazioni, nonché per le seguenti finalità:
            </p>
            <div className="space-y-4 border-l-2 border-black pl-6 my-4">
              <p>
                <strong>Statistica e Analisi Web:</strong> Utilizziamo strumenti come <strong>Google Analytics</strong> e <strong>Google Search Console</strong> per monitorare e analizzare l&apos;utilizzo del sito web in modo da ottimizzare le prestazioni, l&apos;usabilità e il posizionamento sui motori di ricerca. Google Analytics utilizza i cookie per raccogliere informazioni sull&apos;uso del sito in forma anonimizzata ed aggregata.
              </p>
              <p>
                <strong>Modulo di Contatto:</strong> Compilando i moduli di contatto presenti sul sito, l&apos;Utente acconsente all&apos;utilizzo dei propri dati personali (Nome, Email) per consentire a Schiacciateria Retrò di rispondere alle richieste di preventivo, supporto o informazioni commerciali.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              5. Base Giuridica del Trattamento
            </h2>
            <p>
              Il Titolare tratta Dati Personali relativi all&apos;Utente in caso sussista una delle seguenti condizioni:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>L&apos;Utente ha prestato il consenso per una o più finalità specifiche;</li>
              <li>Il trattamento è necessario all&apos;esecuzione di un contratto con l&apos;Utente e/o all&apos;esecuzione di misure precontrattuali;</li>
              <li>Il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il Titolare.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              6. Periodo di Conservazione
            </h2>
            <p>
              I Dati sono trattati e conservati per il tempo richiesto dalle finalità per le quali sono stati raccolti:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>I Dati Personali raccolti per scopi collegati all&apos;esecuzione di un contratto tra il Titolare e l&apos;Utente saranno trattenuti sino a quando sia completata l&apos;esecuzione di tale contratto.</li>
              <li>I Dati Personali raccolti per finalità riconducibili all&apos;interesse legittimo del Titolare saranno trattenuti sino al soddisfacimento di tale interesse.</li>
              <li>Quando il trattamento è basato sul consenso dell&apos;Utente, il Titolare può conservare i Dati Personali più a lungo sino a quando detto consenso non venga revocato.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase italic tracking-tight text-black border-l-4 border-yellow-400 pl-4">
              7. Diritti dell&apos;Utente (GDPR)
            </h2>
            <p>
              Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare. In particolare, ai sensi del Regolamento Europeo 2016/679 (GDPR), l&apos;Utente ha il diritto di:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Revocare il consenso in ogni momento;</li>
              <li>Opporsi al trattamento dei propri Dati;</li>
              <li>Accedere ai propri Dati;</li>
              <li>Verificare e chiedere la rettificazione;</li>
              <li>Ottenere la limitazione del trattamento;</li>
              <li>Ottenere la cancellazione o rimozione dei propri Dati Personali (diritto all&apos;oblio);</li>
              <li>Chiedere la portabilità dei dati;</li>
              <li>Proporre reclamo all&apos;autorità di controllo della protezione dei dati personali competente.</li>
            </ul>
            <p>
              Per esercitare i propri diritti, gli Utenti possono indirizzare una richiesta all&apos;indirizzo email del Titolare indicato in questo documento.
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
            href="/cookie-policy" 
            className="font-bold text-zinc-500 hover:text-black transition-colors underline"
          >
            Leggi la Cookie Policy
          </Link>
        </div>

      </div>
    </main>
  );
}
