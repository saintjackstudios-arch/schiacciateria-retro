# Prestazioni — misurate, non stimate

**Metodo:** Chromium headless, viewport 412×915, rete limitata a 1,6 Mbps con 150 ms di latenza, CPU rallentata 4×. Sono all'incirca le condizioni di Lighthouse mobile. **Non sono dati di campo**: le API CrUX e PageSpeed richiedono una chiave Google che su questa postazione non è configurata, quindi non sappiamo cosa sperimentino davvero i visitatori.

## Misure

| Pagina | LCP | Giudizio | CLS | TTFB | Peso totale |
|---|---|---|---|---|---|
| `/` | **5.172 ms** | 🔴 scarso | 0,000 | 326 ms | 1.140 KB |
| `/menu` | **3.852 ms** | 🟠 da migliorare | 0,001 | 430 ms | 752 KB |
| `/buffet-triestino` | **3.752 ms** | 🟠 da migliorare | 0,039 | 228 ms | 592 KB |
| `/blog/street-food-trieste-guida` | 1.460 ms | 🟢 buono | 0,047 | 263 ms | 677 KB |

Soglie di Google: LCP buono ≤ 2.500 ms, scarso > 4.000 ms. CLS buono ≤ 0,1.

**Lo spostamento del layout è eccellente ovunque** — fra 0,000 e 0,047 su una soglia di 0,100. Non c'è niente da fare su quel fronte.

Il TTFB è ottimo: il problema non è il server, è cosa succede dopo.

## 🔴 CRITICO — `quality={100}` sulle immagini, e costa il triplo dei byte

Il codice chiede a Next.js di ricodificare le immagini a **qualità 100**. È il valore massimo, e su formati come WebP produce file enormi per un guadagno visivo che non si vede.

Misurato scaricando **la stessa immagine** dal sito, cambiando solo il parametro di qualità:

| Immagine | q=100 | q=75 | Risparmio |
|---|---|---|---|
| `hero_aggressive.jpg` (home) | 191 KB | 53 KB | **−72%** |
| `tavolata_ignorante.webp` (buffet) | 295 KB | 80 KB | **−73%** |
| `menu_hero_schiacciata.webp` (menu) | 77 KB | 48 KB | −37% |

**Nota importante sul perché questa leva funziona mentre altre no.** Comprimere i file dentro `public/` non serve a niente: `/_next/image` li ricodifica comunque, e il visitatore riceve il risultato della ricodifica, non il file originale. Il parametro `quality` **è** la ricodifica, quindi è l'unico punto in cui si può davvero togliere peso.

Dove intervenire — tre righe:
- `src/app/HomeClient.tsx:465` → `quality={100}`
- `src/app/buffet-triestino/BuffetClient.tsx:59` → `quality={100}`
- `src/app/menu/MenuClient.tsx:553` → `quality={100}`

Su `/buffet-triestino` l'immagine a q=100 **è** l'elemento LCP: togliere 215 KB agisce direttamente sui 3.752 ms misurati.

## 🟠 ALTA — La home preloada tre immagini e affama il CSS

Le risorse più pesanti della home, in ordine, con quando partono e quanto ci mettono:

| Risorsa | Peso | Durata | Tipo |
|---|---|---|---|
| `ingredienti_esplosi_highres.webp` (w=1200) | 147 KB | 3.839 ms | preload |
| `hero_aggressive.jpg` (w=640, q=100) | 104 KB | 3.511 ms | preload |
| bundle JS principale | 71 KB | 2.602 ms | script |
| foglio di stile | 16 KB | 1.323 ms | preload |

**L'elemento LCP della home è il titolo `<h1>`, cioè testo.** Il testo non può essere disegnato prima che arrivi il CSS — e il CSS parte insieme a 250 KB di immagini a priorità massima, su una connessione da 1,6 Mbps. Il risultato è un titolo che compare dopo **5,2 secondi**.

`ingredienti_esplosi_highres` sta sotto la prima schermata: non ha motivo di essere preloadata.

**Correzione:** lasciare il `preload` **solo** sull'immagine effettivamente sopra la piega, e togliere `preload` da `ingredienti_esplosi_highres.webp` (`src/app/HomeClient.tsx:651`), che tornerà a caricarsi pigramente quando serve.

## Stima dell'effetto combinato

Le due correzioni insieme tolgono dalla home **circa 285 KB di traffico a priorità massima** (138 KB dalla qualità + 147 KB dal preload di troppo) e liberano la banda per il CSS. Sono tre righe di qualità e un attributo.

**Non è una stima verificata:** va rimisurato dopo la pubblicazione, con lo stesso metodo, per sapere quanto vale davvero.

---

# ✅ Misure DOPO l'intervento — 27/08/2026, sito in produzione

Stesso metodo, stesse condizioni (Chromium 412×915, 1,6 Mbps, 150 ms di latenza, CPU 4×), sito online dopo il deploy.

| Pagina | LCP prima | LCP dopo | Variazione | Giudizio |
|---|---|---|---|---|
| `/` | 5.172 ms | **2.552 ms** | **−51%** | da 🔴 scarso a 🟢 al limite del buono |
| `/menu` | 3.852 ms | **1.716 ms** | **−55%** | da 🟠 a 🟢 **buono** |
| `/buffet-triestino` | 3.752 ms | **2.808 ms** | **−25%** | resta 🟠, molto più vicino alla soglia |
| `/blog/street-food-trieste-guida` | 1.460 ms | 1.396 ms | invariato | 🟢 buono |

Peso complessivo scaricato:

| Pagina | Prima | Dopo | |
|---|---|---|---|
| `/` | 1.140 KB | **510 KB** | −55% |
| `/buffet-triestino` | 592 KB | **444 KB** | −25% |
| `/menu` | 752 KB | 724 KB | −4% |

**CLS invariato ed eccellente** ovunque: 0,000 · 0,001 · 0,034 · 0,047.

## Come leggere questi numeri

- La home è a **2.552 ms contro una soglia «buono» di 2.500**: mancano 52 ms. Era a 5.172.
- **`/menu` non cala di peso** (−4%) perché ora la pagina contiene **entrambi i menu** nell'HTML: più contenuto, ma il LCP crolla lo stesso da 3.852 a 1.716 ms perché l'immagine di testata è passata da q=100 a q=75.
- Su `/buffet-triestino` l'elemento LCP **è** quell'immagine: 295 KB diventati 80.
- ⚠️ **Sono singole misurazioni di laboratorio**, con la variabilità che comporta — il TTFB della home oscilla fra 326 e 423 ms fra una prova e l'altra, ed è rumore. La direzione e l'ordine di grandezza sono solidi; i millisecondi esatti no.
- Restano dati **di laboratorio, non di campo**: per sapere cosa sperimentano i visitatori veri servirebbe CrUX, che richiede una chiave Google non configurata.

**Costo dell'intervento:** tre righe di `quality` e un attributo `preload`.
