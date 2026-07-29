# Registro azioni SEO

Log cronologico di ogni azione correttiva intrapresa per la SEO del sito. Ordine: più recente in cima.

---

## 2026-07-29 (pomeriggio) — Risolte le 3 criticità dell'audit baseline

**1. Soft-404 su `/gestione-menu`**
- Verificato che il deploy delle 18:50 (fix orari + GA4) ha invalidato la cache CDN che serviva un 200 invece di 404. Confermato via `curl`: ora risponde correttamente 404.
- Inviata comunque una richiesta a Google tramite lo strumento "Contenuti obsoleti" (search.google.com/search-console/remove-outdated-content) per accelerare la rimozione dall'indice.

**2. Doppia indicizzazione homepage http/https**
- Verificato in Search Console → Indicizzazione → Pagine → "Pagina con reindirizzamento": le 3 varianti (http, http://www, https://www) sono già correttamente escluse dall'indice da Google (rilevate 24-25/07). Non è un problema attivo — i clic storici nel report Rendimento sono dati pre-redirect.
- Trovato un dettaglio secondario fuori dal mio controllo: `https://www` reindirizza con 307 (temporaneo) invece di un redirect permanente. È una configurazione DNS/registrar del dominio, non del codice né di Vercel — segnalato per chi gestisce il DNS, non urgente.

**3. Le 9 pagine non indicizzate**
- Analizzate le 4 categorie. Scoperta importante: **`/bevande`** (pagina birre/spritz, completa e con metadata SEO pronti) **esisteva ma non era linkata da nessuna parte del sito** — né nel menu desktop né in quello mobile. Pagina orfana, invisibile sia a Google che agli utenti che navigano normalmente.
- **Fix applicato**: aggiunta `/bevande` al menu di navigazione (desktop + mobile) in [src/components/SiteHeader.tsx](../src/components/SiteHeader.tsx), tra "Menu" e "Blog". Testato in locale, compilazione TypeScript pulita, committato (`b5c4e27`) e deployato in produzione.

**Richieste di indicizzazione inviate a Google** (Search Console → Controllo URL → Richiesta di indicizzazione):
- Homepage (`https://schiacciateriaretrotrieste.com/`)
- `/bevande`
- `/blog`
- `/blog/dove-cenare-trieste-all-aperto`

- **Da fare:** ricontrollare tra qualche giorno se le pagine risultano indicizzate.

---

## 2026-07-29 — Collegato Google Analytics 4

- Creata nuova proprietà GA4 "Schiacciateria Retrò Trieste" sotto l'account Google Analytics SaintJack Studios (prima esisteva solo la proprietà dell'agenzia stessa, non del ristorante). Impostazioni: fuso orario Italia, valuta Euro, categoria "Cibi e bevande", dimensione "Piccole (1-10 dipendenti)", obiettivi "Comprendere il traffico" + "Generare lead".
- Creato lo stream di dati web per `schiacciateriaretrotrieste.com` → Measurement ID `G-1GTNREENL7`.
- Installato il pacchetto `@next/third-parties` (metodo ufficiale raccomandato da Next.js per GA4).
- Creato [src/components/Analytics.tsx](../src/components/Analytics.tsx): carica il tag Google Analytics **solo se l'utente ha accettato i cookie** dal banner esistente (localStorage `barretro-cookie-consent`). Il banner già prometteva "misuriamo le visite tramite Google Analytics" ma finora non c'era nulla di collegato — ora è vero.
- Modificato [src/components/CookieBanner.tsx](../src/components/CookieBanner.tsx) per notificare il cambio di consenso in tempo reale (senza bisogno di ricaricare la pagina).
- Testato in locale: tag NON si carica prima del consenso e con "Rifiuta"; si carica correttamente (`gtag('config', 'G-1GTNREENL7')` confermato nel dataLayer) dopo "Accetta tutto".
- Committato e pushato su `main` (commit `665b983`), deploy automatico Vercel completato con successo (Production, ~4 min).
- Verificato **in produzione** su schiacciateriaretrotrieste.com: orari aggiornati nello schema.org, tag GA4 assente prima del consenso, `gtag('config', 'G-1GTNREENL7')` confermato nel dataLayer dopo aver simulato l'accettazione dei cookie.
- **Da fare:** controllare tra qualche giorno in GA4 → Report in tempo reale/Panoramica che arrivino dati da utenti reali (non solo dal test).

## 2026-07-29 — Setup tracking SEO

- Creata questa cartella (`seo/`) per tracciare dati, audit e azioni nel tempo.
- Primo collegamento a Google Search Console e raccolta dati baseline → [audits/2026-07-29-baseline.md](audits/2026-07-29-baseline.md)
- Identificati problemi da correggere: soft-404 su `/gestione-menu`, doppia indicizzazione http/https della home, 9 pagine non indicizzate da approfondire.
- Google Analytics 4 risultato non collegato — da fare.
