# Tecnica — schiacciateriaretrotrieste.com
**Scansione del 27/08/2026 · 38 pagine raggiunte · 0 bloccate da robots.txt**

## Quello che funziona

- **38 pagine su 38 rispondono 200.** Nessun link interno rotto, nessuna catena di reindirizzamenti, nessun 404 raggiungibile navigando.
- **Intestazioni di sicurezza complete**: CSP, HSTS con `preload`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. Sono tutte presenti e ben formate — è più di quanto abbia il 90% dei siti di ristorazione.
- **Prerenderizzazione statica** (`X-Nextjs-Prerender: 1`, `X-Vercel-Cache: HIT`): l'HTML arriva completo, nessuna dipendenza da JavaScript per il contenuto. TTFB fra 228 e 430 ms.
- `robots.txt` corretto e con la sitemap dichiarata. Nessun crawler bloccato, quindi anche i crawler delle IA passano.
- **Canonical corretto e auto-referenziale** su tutte le pagine indicizzabili.
- `noindex` applicato correttamente e **solo** alle tre pagine legali; le stesse sono giustamente escluse dalla sitemap.
- `lang="it"` su tutte le pagine, viewport mobile dichiarato ovunque.
- Nessuna pagina orfana: tutto ciò che è in sitemap è raggiungibile navigando.

## Problemi

### 🟠 MEDIA — Il `lastmod` della sitemap dice il falso, e contraddice i dati della pagina

Tutti i **35 URL** della sitemap dichiarano lo stesso `lastmod`: `2026-08-18T18:42:57Z`. È la data di build, non la data di modifica.

La contraddizione si vede su qualsiasi articolo. Per `/blog/street-food-trieste-guida`:

| Fonte | Data dichiarata |
|---|---|
| Sitemap `lastmod` | 2026-08-18 |
| Schema `Article.datePublished` | 2026-04-28 |
| Schema `Article.dateModified` | 2026-04-28 |

Google riceve due affermazioni incompatibili sulla stessa pagina. Un `lastmod` identico su tutto il sito e che cambia a ogni pubblicazione è il caso tipico in cui Google **smette di fidarsi del segnale e lo ignora**. Si perde così la possibilità di dire «questa pagina è cambiata davvero, rileggila».

**Causa:** `src/app/sitemap.ts` usa `lastModified: new Date()` per ogni voce, articoli compresi — mentre ogni articolo ha già la sua data reale nel frontmatter.

**Correzione:** `lastModified: new Date(post.date)` per gli articoli, e per le pagine fisse una data che cambi solo quando la pagina cambia davvero.

### 🟠 MEDIA — Tre immagini in `preload`, una delle quali sta a metà pagina

Nel `<head>` della home ci sono **tre** `<link rel="preload" as="image">`. Una è `ingredienti_esplosi_highres.webp` a larghezza 1200 — che nel sorgente compare **al 48% della pagina**, quindi ben sotto la prima schermata.

Misurato: parte a 960 ms insieme alle altre, pesa **147 KB** e impiega **3.839 ms** a scaricarsi su connessione mobile. Nel frattempo il CSS — da cui dipende il disegno del titolo, che è l'elemento LCP della home — compete con lei per la banda.

Dettagli e conseguenze in `performance.md`.

### 🔵 BASSA — Lo schema `Restaurant` è iniettato anche nelle pagine legali

`Restaurant` compare su tutte e 38 le pagine, incluse privacy, cookie policy e termini. Non è dannoso (quelle pagine sono `noindex`), ma è rumore: lo schema dell'attività dovrebbe stare sulle pagine che la descrivono.

### 🔵 BASSA — Nessun `security.txt`

Assente `/.well-known/security.txt`. Irrilevante per il posizionamento; si segnala solo per completezza.
