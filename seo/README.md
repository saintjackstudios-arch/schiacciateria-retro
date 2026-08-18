# SEO Tracking — Schiacciateria Retrò

Cartella per tracciare nel tempo lo stato SEO del sito, gli audit periodici e le azioni correttive intraprese. Il sito è online da fine luglio 2026: si parte da zero, quindi questa cartella è anche lo storico di come cresce la visibilità.

## Struttura

- **`data/`** — snapshot grezzi dei dati (Search Console, Analytics, ecc.), un file per fonte/data. Non modificare gli snapshot già salvati: sono fotografie di un momento preciso.
- **`audits/`** — audit periodici: analisi, interpretazione dei dati, lista di problemi trovati e priorità. Un file per audit, datato.
- **`actions-log.md`** — registro cronologico di ogni azione correttiva SEO intrapresa (cosa, quando, perché, collegata a quale audit/problema).

## Stato attuale (riassunto rapido — aggiornare ad ogni audit)

- **Sito lanciato:** fine luglio 2026, indicizzazione in corso, crescita organica confermata (168 clic / 3,98K impressioni GSC a 3 mesi, in crescita costante — vedi [snapshot 18/08](data/gsc/2026-08-18.md)).
- **Google Search Console:** collegato (proprietà `sc-domain:schiacciateriaretrotrieste.com`), accesso via account `saintjackstudios`.
- **Google Analytics (GA4) / Google Tag:** ✅ collegato e **live in produzione** dal 2026-07-29 (verificato: `gtag('config', ...)` si attiva correttamente dopo consenso cookie sul sito reale).
- **Gap "buffet triestino" (priorità #1 dell'audit 08/08): risolto strutturalmente.** Pagina dedicata `/buffet-triestino` creata e deployata il 13/08/2026 (in nav, sitemap, schema Restaurant+Breadcrumb, indicizzata — confermato via URL Inspection). Ranking per query non-branded ("buffet triestino trieste" ecc.) ancora a zero clic: normale, richiede settimane, non giorni. Vedi [audit 18/08](audits/2026-08-18-follow-up.md) per il dettaglio.
- **Ultimo audit:** [2026-08-18 — Follow-up post-buffet](audits/2026-08-18-follow-up.md) (precedente: [2026-08-08 — Dettagliato](audits/2026-08-08-audit-dettagliato.html), [2026-07-29 — Baseline](audits/2026-07-29-baseline.md))

## Fonti dati

| Fonte | Stato | Note |
|---|---|---|
| Google Search Console | ✅ collegato | proprietà dominio, accesso via account saintjackstudios |
| Google Analytics 4 | ✅ live in produzione | proprietà "Schiacciateria Retrò Trieste" (sotto account SaintJack Studios), Measurement ID `G-1GTNREENL7`. Tag installato in [src/components/Analytics.tsx](../src/components/Analytics.tsx), attivo solo dopo consenso cookie. Deploy verificato in produzione il 2026-07-29. |
| Google Business Profile | ✅ auditato il 18/08/2026 | vedi [audit 18/08](audits/2026-08-18-follow-up.md) sezione GBP per stato NAP/foto/recensioni e priorità |
