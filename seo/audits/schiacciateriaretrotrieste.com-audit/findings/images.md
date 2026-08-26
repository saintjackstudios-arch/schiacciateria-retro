# Immagini

## Quello che funziona

- **Zero immagini senza `alt` su tutte e 38 le pagine.** Sono 83 immagini in totale, tutte descritte. È il risultato migliore dell'intero audit.
- Formati moderni serviti automaticamente da `/_next/image` (WebP/AVIF secondo il browser).
- Dimensioni responsive generate correttamente tramite `imageSrcSet`.
- Caricamento pigro attivo su tutte le immagini che non stanno sopra la piega.

## Problemi

### 🔴 CRITICO — Ricodifica a qualità 100

Tre file impostano `quality={100}`. Misurato sul sito, la stessa immagine a qualità 75 pesa il **72–73% in meno** su due delle tre testate. Dettaglio completo in `performance.md`.

### 🟠 MEDIA — Un preload di troppo

`ingredienti_esplosi_highres.webp`, 147 KB, è preloadata pur stando sotto la prima schermata. Dettaglio in `performance.md`.

### 🔵 BASSA — `sizes` mancante su alcune immagini `fill`

Il server di sviluppo segnala: *«Image with src "/images/3_volte_bon.webp" has "fill" but is missing "sizes" prop»*, e lo stesso per `piaza_granda.webp`. Senza `sizes` il browser scarica una variante più grande del necessario.
