# SEO Tracking — Schiacciateria Retrò

Cartella per tracciare nel tempo lo stato SEO del sito, gli audit periodici e le azioni correttive intraprese. Il sito è online da fine luglio 2026: si parte da zero, quindi questa cartella è anche lo storico di come cresce la visibilità.

## Struttura

- **`data/`** — snapshot grezzi dei dati (Search Console, Analytics, ecc.), un file per fonte/data. Non modificare gli snapshot già salvati: sono fotografie di un momento preciso.
- **`audits/`** — audit periodici: analisi, interpretazione dei dati, lista di problemi trovati e priorità. Un file per audit, datato.
- **`actions-log.md`** — registro cronologico di ogni azione correttiva SEO intrapresa (cosa, quando, perché, collegata a quale audit/problema).

## Stato attuale (riassunto rapido — aggiornare ad ogni audit)

- **Sito lanciato:** fine luglio 2026, indicizzazione in corso.
- **Google Search Console:** collegato (proprietà `sc-domain:schiacciateriaretrotrieste.com`), accesso via account `saintjackstudios`.
- **Google Analytics (GA4) / Google Tag:** ✅ collegato e **live in produzione** dal 2026-07-29 (verificato: `gtag('config', ...)` si attiva correttamente dopo consenso cookie sul sito reale).
- **Ultimo audit:** [2026-07-29 — Baseline](audits/2026-07-29-baseline.md)

## Fonti dati

| Fonte | Stato | Note |
|---|---|---|
| Google Search Console | ✅ collegato | proprietà dominio, accesso via account saintjackstudios |
| Google Analytics 4 | ✅ live in produzione | proprietà "Schiacciateria Retrò Trieste" (sotto account SaintJack Studios), Measurement ID `G-1GTNREENL7`. Tag installato in [src/components/Analytics.tsx](../src/components/Analytics.tsx), attivo solo dopo consenso cookie. Deploy verificato in produzione il 2026-07-29. |
| Google Business Profile | ⚠️ da verificare | non ancora auditato in questa cartella |
