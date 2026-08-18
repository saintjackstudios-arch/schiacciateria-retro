# Registro azioni SEO

Log cronologico di ogni azione correttiva intrapresa per la SEO del sito. Ordine: più recente in cima.

---

## 2026-08-18 (pomeriggio) — Esecuzione dei fix tecnici dell'audit follow-up

Divisione del lavoro concordata: Marco si occupa del Google Business Profile (problema di identità/NAP su Google Maps, fuori dal codice), io dei fix tecnici sul sito.

**✅ PUBBLICATO il 18/08** su via esplicito di Marco — commit `ce45c0d`, push su `main`, deploy Vercel andato online in ~105 secondi.

**Verificato sul sito vero dopo la pubblicazione** (non in locale):
- Header di sicurezza tutti presenti in risposta: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options ✓
- **GA4 non è bloccato dalla CSP**: script caricato, `gtag` definito, 4 eventi in `dataLayer`, zero violazioni CSP in console con i cookie accettati ✓ (era il rischio più serio dell'intera sessione)
- `/news` e `/news/*` → **308** verso `/blog` e `/blog/*` ✓ (Next.js emette 308, non 301: è il permanente che preserva il metodo, Google lo tratta allo stesso modo)
- og:image diverse e corrette su `/`, `/menu`, `/buffet-triestino` e sui post ✓
- Title homepage: `Schiacciateria Retrò Trieste | Buffet e Street Food` ✓
- Date blog non più nel futuro: 2026-06-07, 2026-08-17, 2026-05-17 sui tre campioni controllati ✓
- `postalCode` **34132** nello schema ✓ · telefono e WhatsApp cliccabili presenti su `/`, `/menu`, `/buffet-triestino` ✓
- 5 pagine chiave tutte **200**, build di produzione pulita (45 pagine, TypeScript passa) ✓

**Contenuti e struttura**
- **Corrette 18 date `datePublished` nel futuro** sui post del blog. Erano date fino al 20/11/2026: uno schema `Article` con data futura è un segnale di bassa affidabilità e può bloccare i rich result. Riportate a date reali passate mantenendo l'ordine e la cadenza originali.
- **Aggiunto `dateModified`** allo schema `Article` (campo opzionale in frontmatter, fallback su `date`).
- **Corretto link rotto** in `quale-locale-scegliere-aperitivo-trieste.md` (`/blog/miglior-spritz-trieste` → `/blog/dove-bere-miglior-spritz-trieste`).
- **Collegato `/buffet-triestino` al cluster blog in entrambe le direzioni**: nuova sezione "Approfondisci la tradizione" con 5 card verso i post Tradizioni/Buffet, e un link di ritorno alla pagina dentro ciascuno dei 5 post. La pagina aveva 0 clic e 11 impressioni: era isolata nel grafo dei link interni.

**Indicizzazione e metadati**
- **Rimossa la route duplicata `/news/[slug]`** (stesso contenuto di `/blog/[slug]`: contenuto duplicato interno) con redirect 301 `/news/*` → `/blog/*` in `next.config.ts`.
- **Title homepage** portato a 51 caratteri ("Schiacciateria Retrò Trieste | Buffet e Street Food") e **meta description** riscritta per citare "buffet triestino": chiude il fix rimasto parziale il 13/08.
- **Title `/buffet-triestino`** accorciato a 57 caratteri lasciando che il template del layout aggiunga il brand una volta sola (prima era duplicato).
- **og:image sistemate ovunque**: il fallback globale era il logo 128×181 px (sotto il minimo di 200 px: nessuna anteprima social funzionante). Ora è `hero_aggressive.jpg` 1200×669. Aggiunte immagini dedicate a `/menu` e `/buffet-triestino`, e og:image sui post blog (prendono la `hero_image` del post). Aggiunte le `twitter:` card corrispondenti.
  - *Trappola evitata:* in Next.js gli oggetti annidati dei metadati **non** si fondono, si sovrascrivono. Aggiungere solo `openGraph.images` su una pagina figlia avrebbe cancellato titolo e descrizione ereditati. Ogni override è stato scritto completo.

**Performance e sicurezza**
- **Hero homepage**: rimosso `unoptimized`, aggiunto `sizes`, sostituito `priority` (deprecato in Next.js 16) con `preload`. Stesso trattamento su `/menu` e `/buffet-triestino`. L'hero è l'elemento LCP.
- **Aggiunti gli header di sicurezza** (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options) in `next.config.ts`.
  - *Verificato in browser prima di chiudere:* la prima CSP bloccava silenziosamente GA4, perché il beacon di raccolta non va su `www.google-analytics.com` ma su un sottodominio regionale (`region1.`). Trovato solo aprendo la console con i cookie accettati. Corretto con wildcard. Senza questo controllo avremmo spento l'analytics in produzione senza accorgercene.

**Conversione (dalla analisi SXO)**
- **Telefono, WhatsApp e orari erano visibili solo dentro il JSON-LD**, quindi invisibili a chi legge la pagina. Chi cerca in locale ("aperto adesso", "buffet vicino a me") vuole esattamente queste tre informazioni e, se non le trova, torna in SERP. Aggiunto un blocco condiviso `InfoLocale.tsx` (orari + indirizzo + chiama + WhatsApp + indicazioni) su `/menu` e `/buffet-triestino`, e telefono/WhatsApp cliccabili nel footer della homepage.
- **Barra mobile fissa** ora a due pulsanti: **Chiama** | **Indicazioni** (prima solo Indicazioni).
- **Tracciamento GA4 esteso**: oltre a `directions_click` ora si misurano anche `phone_click` e `whatsapp_click`. Sono le tre conversioni misurabili di un locale fisico e servono a dimostrare i risultati.

**Incoerenza NAP trovata dentro il sito**
Il sito dichiarava **due CAP diversi**: `34132` nel footer, nelle note legali e nella mappa Google incorporata; `34125` nello schema `Restaurant` e nella pagina contatti. La scheda Google incorporata nel sito riporta `34132`, ed è il dato che Google stesso associa all'attività: allineato tutto a **34132**. Unificata anche la forma dell'indirizzo nel footer ("Viale Venti Settembre" → "Viale XX Settembre 16", come nel resto del sito).
→ **Da confermare con Marco/cliente**: il CAP corretto va verificato e deve combaciare esattamente con quello del Google Business Profile. È collegato al problema di identità GBP su cui sta lavorando Marco.

**Cosa resta aperto**
- Il problema di identità/NAP sul Google Business Profile (due CID distinti su Maps, nome e CAP non coerenti) — **in carico a Marco**, non risolvibile dal codice.
- Deploy di tutto quanto sopra: in attesa del via esplicito.

## 2026-08-18 — Follow-up audit + estrazione dati freschi + verifica lavoro 08/13-08/14

Il registro era fermo al 31/07 ma il codice (git log) mostrava lavoro già fatto e deployato che non era mai stato documentato qui. Sessione di verifica e aggiornamento:

- **Verificato via codice + curl in produzione** (non solo assunto) lo stato dei fix richiesti dall'audit dell'8/08. Vedi [audit 2026-08-18-follow-up.md](audits/2026-08-18-follow-up.md) per il dettaglio completo con evidenze.
- **Estratti dati GSC/GA4 freschi** via browser loggato (account saintjackstudios) → [gsc/2026-08-18.md](data/gsc/2026-08-18.md), [ga4/2026-08-18.md](data/ga4/2026-08-18.md). Confermata crescita organica continua (+51 clic, +1.240 impressioni GSC in 10 giorni) e via URL Inspection: `/buffet-triestino` **indicizzato**, `/gestione-menu` **confermato rimosso dall'indice** (chiude il problema del baseline 29/07).
- **Delegata analisi specialistica** (tecnico, schema, GBP, SXO, cluster contenuti) per le parti non verificabili da solo codice/GSC — risultati in [audit 2026-08-18-follow-up.md](audits/2026-08-18-follow-up.md).
- **Da fare:** eseguire i quick-win ancora aperti individuati (og:image homepage, title homepage non ancora accorciato in `page.tsx`, meta description homepage senza "buffet") — vedi piano d'azione nell'audit.

## 2026-08-13/14 — Lancio pagina Buffet Triestino + fix mobile (retroattivo, non documentato a suo tempo)

**Nota:** queste azioni erano già state fatte e deployate ma non erano mai state registrate qui. Ricostruite da `git log` e verifica diretta del codice/produzione il 18/08.

- **Creata pagina dedicata `/buffet-triestino`** (commit `9963fa2`, 13/08): risolve la priorità #1 dell'audit 08/08 ("il buffet triestino non esiste in nessuna pagina di vendita"). Aggiunta al menu di navigazione (desktop+mobile), alla sitemap, con schema Restaurant + BreadcrumbList, title che cita "Viale XX Settembre 16".
- **Schema LocalBusiness/Restaurant completato** in `layout.tsx`: aggiunti `telephone`, `geo` (lat/lng), `priceRange`, `sameAs` (Instagram), `streetAddress` con il numero civico "16" — tutti i gap segnalati dall'audit 08/08 sono stati chiusi.
- **H1 aggiunto a `/menu`** (era la criticità più grave dell'audit 08/08: pagina più commerciale del sito senza H1) — confermato live.
- **Title homepage nel root layout** accorciato a 47 caratteri — **ma nota:** `src/app/page.tsx` ha un override locale che mantiene ancora il title lungo (74 char) in produzione. Il fix è parziale, resta da chiudere (vedi audit 18/08).
- **Nuovi articoli blog**: `rebechin-come-si-fa-trieste.md`, `tradizioni-triestine-kren-caffe-capo-in-b.md` — rispondono a gap di contenuto identificati nell'audit 08/08.
- **14/08 (commit `d6055ff`):** fix mobile mappa/pin non cliccabili + nuova barra CTA fissa "Indicazioni" su mobile (`MobileDirectionsBar.tsx`) — motivata dal dato GSC che mostrava traffico quasi tutto branded (utenti che vogliono solo l'indirizzo). Evento `directions_click` già tracciato in GA4 (5 click nei primi giorni).

## 2026-07-31 — Controllo di verifica indicizzazione + crescita

Verificate in Search Console (Controllo URL) le 4 pagine per cui era stata richiesta l'indicizzazione il 29/07:

| Pagina | Stato |
|---|---|
| Homepage `/` | ✅ "URL is on Google" — indicizzata |
| `/bevande` | ✅ indicizzata (era la pagina orfana trovata nell'audit) |
| `/blog` | ✅ indicizzata |
| `/blog/dove-cenare-trieste-all-aperto` | ✅ indicizzata |

Tutte e 4 confermate indicizzate in meno di 48 ore dalla richiesta.

**Andamento traffico (Search Console, cumulativo dal lancio):**

| Metrica | 27/07 (baseline) | 29/07 (ultimo dato disponibile) |
|---|---|---|
| Clic totali | 51 | 66 (+15) |
| Impressioni | 1.090 | 1.520 (+430) |
| CTR medio | 4,7% | 4,3% |
| Posizione media | 5,8 | 6,0 |

Giorni nuovi: 28/07 → 5 clic, 231 impr, pos 5,7 · 29/07 → 10 clic, 200 impr, pos 7,2. Crescita continua, posizione sostanzialmente stabile (variazione nel rumore statistico normale per un sito con questo volume).

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
