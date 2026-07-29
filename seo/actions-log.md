# Registro azioni SEO

Log cronologico di ogni azione correttiva intrapresa per la SEO del sito. Ordine: più recente in cima.

---

## 2026-07-29 — Collegato Google Analytics 4

- Creata nuova proprietà GA4 "Schiacciateria Retrò Trieste" sotto l'account Google Analytics SaintJack Studios (prima esisteva solo la proprietà dell'agenzia stessa, non del ristorante). Impostazioni: fuso orario Italia, valuta Euro, categoria "Cibi e bevande", dimensione "Piccole (1-10 dipendenti)", obiettivi "Comprendere il traffico" + "Generare lead".
- Creato lo stream di dati web per `schiacciateriaretrotrieste.com` → Measurement ID `G-1GTNREENL7`.
- Installato il pacchetto `@next/third-parties` (metodo ufficiale raccomandato da Next.js per GA4).
- Creato [src/components/Analytics.tsx](../src/components/Analytics.tsx): carica il tag Google Analytics **solo se l'utente ha accettato i cookie** dal banner esistente (localStorage `barretro-cookie-consent`). Il banner già prometteva "misuriamo le visite tramite Google Analytics" ma finora non c'era nulla di collegato — ora è vero.
- Modificato [src/components/CookieBanner.tsx](../src/components/CookieBanner.tsx) per notificare il cambio di consenso in tempo reale (senza bisogno di ricaricare la pagina).
- Testato in locale: tag NON si carica prima del consenso e con "Rifiuta"; si carica correttamente (`gtag('config', 'G-1GTNREENL7')` confermato nel dataLayer) dopo "Accetta tutto".
- **Da fare:** deploy in produzione (il codice è solo locale finché non viene pushato/deployato). Dopo il deploy, verificare in GA4 → Report in tempo reale che arrivino dati reali.

## 2026-07-29 — Setup tracking SEO

- Creata questa cartella (`seo/`) per tracciare dati, audit e azioni nel tempo.
- Primo collegamento a Google Search Console e raccolta dati baseline → [audits/2026-07-29-baseline.md](audits/2026-07-29-baseline.md)
- Identificati problemi da correggere: soft-404 su `/gestione-menu`, doppia indicizzazione http/https della home, 9 pagine non indicizzate da approfondire.
- Google Analytics 4 risultato non collegato — da fare.
