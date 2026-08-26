# Audit SEO completo — schiacciateriaretrotrieste.com

**Data:** 27/08/2026 · **Pagine scansionate:** 38 · **Tipo di attività rilevato:** ristorazione locale con sede fisica (*Local Service — brick-and-mortar*)

> ⚠️ **Questo audit fotografa il sito ONLINE**, cioè la versione precedente alle correzioni fatte oggi in locale e non ancora pubblicate. È voluto: serve come misura di partenza. I punti già risolti in attesa di pubblicazione sono segnalati con **[già corretto in locale]**.

---

## Punteggio di salute SEO: **65 / 100**

| Categoria | Peso | Punteggio | Contributo |
|---|---|---|---|
| Tecnica | 22% | **82** | 18,0 |
| Contenuti | 23% | **58** | 13,3 |
| On-page | 20% | **70** | 14,0 |
| Dati strutturati | 10% | **62** | 6,2 |
| Prestazioni | 10% | **48** | 4,8 |
| Leggibilità per le IA | 10% | **55** | 5,5 |
| Immagini | 5% | **70** | 3,5 |
| | | **Totale** | **65,3** |

Un 65 su un sito di otto mesi non è un brutto voto. **Le fondamenta sono solide**: nessun link rotto, sicurezza completa, canonical e indicizzazione a posto, zero immagini senza descrizione, zero duplicazione fra i contenuti. Quello che manca non è igiene tecnica.

---

## Il quadro in una frase

**Il sito è trovato benissimo da chi già conosce il locale, e quasi per niente da chi cerca da mangiare.**

Da Search Console, tre mesi (19/07 → 16/08): **168 clic, 3.980 impressioni, posizione media 6,1**. Le query che portano quei clic sono, nell'ordine: *retrò trieste* (23), *schiacciateria trieste* (15), *retro schiacciateria trieste* (9), *retro trieste* (7), *bar retrò trieste* (6). Tutte contengono il nome dell'attività.

Le ricerche che portano clienti nuovi stanno in fondo: *cosa mangiare a trieste street food* 1 clic in posizione 10,8 · *mangiare a trieste spendendo poco* 1 clic in posizione 12,8. **Tutte le query contenenti «buffet» insieme: 0 clic, 11 impressioni, posizione media 20,4.**

È la stessa diagnosi emersa sulla scheda Google. Il problema non è la salute del sito, è la sua raggiungibilità su ciò che non è il proprio nome.

---

## I cinque problemi principali

### 1. 🔴 Le immagini sono ricodificate a qualità 100 e pesano il triplo

Misurato scaricando la stessa immagine dal sito con il solo parametro di qualità cambiato:

| Immagine | q=100 | q=75 | Risparmio |
|---|---|---|---|
| `hero_aggressive.jpg` | 191 KB | 53 KB | **−72%** |
| `tavolata_ignorante.webp` | 295 KB | 80 KB | **−73%** |
| `menu_hero_schiacciata.webp` | 77 KB | 48 KB | −37% |

Sono **tre righe di codice**. Su `/buffet-triestino` l'immagine a qualità 100 è proprio l'elemento LCP.

### 2. 🔴 La home impiega 5,2 secondi a mostrare il titolo

LCP misurato su mobile: **5.172 ms** (soglia «scarso»: oltre 4.000). `/menu` 3.852 ms, `/buffet-triestino` 3.752 ms.

La causa non è il server — il TTFB è 326 ms. È che la home mette in `preload` **tre immagini**, di cui una da 147 KB che sta a metà pagina, e queste competono con il foglio di stile da cui dipende il disegno del titolo.

Lo spostamento del layout (CLS) è invece **eccellente ovunque**: fra 0,000 e 0,047 su una soglia di 0,100.

### 3. 🟠 Ventiquattro titoli su 38 vengono tagliati nei risultati

Gli articoli hanno titoli da 110–116 caratteri costruiti come «frase, due punti, seconda frase». Google ne mostra circa 60: la seconda metà non la legge nessuno.

L'articolo sullo spritz è in **posizione 5,9 con 312 impressioni e appena 4 clic** — CTR 1,3%, dove in quinta posizione ci si aspetta il 5–8%. È il punto del sito dove un'ora di lavoro rende di più.

### 4. 🟠 Quaranta piatti con prezzo, zero dati strutturati

`/menu` non ha nessuno schema `Menu`, e `Restaurant` non dichiara `hasMenu`. Nessuno dei quattro concorrenti confrontati espone un menu con i prezzi: è l'unico vantaggio informativo che il locale ha, e non è in un formato che Google e le IA possano usare.

### 5. 🟠 Gli articoli sono corti e scritti da fuori

Mediana **345 parole**, **21 su 28 sotto le 500**. Non sono duplicati — la somiglianza massima fra le 378 coppie possibili è 5,4% — ma sono scritti come li scriverebbe chiunque: nel sito ci sono **90 link a Wikipedia**. Manca la cosa che nessun concorrente può copiare, cioè quello che si vede dal banco.

---

## I cinque interventi che rendono di più subito

1. **`quality={100}` → `quality={75}`** in tre file. Dieci minuti, fino al 73% di byte in meno sulle immagini principali.
2. **Togliere il `preload`** da `ingredienti_esplosi_highres.webp`, che sta sotto la piega. Un attributo.
3. **Accorciare i titoli degli articoli sotto i 60 caratteri**, partendo dai tre sullo spritz e sull'aperitivo, che sono gli unici già posizionati.
4. **Aggiungere `hasMenu` allo schema `Restaurant`** e i profili mancanti in `sameAs` (Facebook, scheda Google, TripAdvisor). Due righe.
5. **Linkare `/contatti` dagli articoli**: oggi lo linkano **0 su 28**, mentre il menu è linkato da 23.

---

## Dettaglio per categoria

Ogni categoria ha il suo file in `findings/`:

| File | Contenuto |
|---|---|
| `technical.md` | scansione, indicizzazione, sicurezza, sitemap, `lastmod` |
| `performance.md` | LCP/CLS/TTFB misurati, peso delle risorse, qualità immagini |
| `content.md` | dati GSC, lunghezza, duplicazione, E-E-A-T |
| `onpage.md` | titoli, description, intestazioni, link interni |
| `schema.md` | dati strutturati presenti, mancanti e da non aggiungere |
| `geo.md` | accesso dei crawler IA, citabilità, `llms.txt` |
| `images.md` | testo alternativo, formati, peso |

Schermate desktop e mobile di home, menu e buffet in `screenshots/`. Dati grezzi della scansione e delle misure in `raw/`.

---

## Che cosa cambia con la pubblicazione già pronta

Le correzioni ferme in locale risolvono già alcuni punti rilevati qui:

- **`/bevande`, segnaposto da 129 parole** con scritto «LISTA IN ARRIVO», linkato dalla navigazione di ogni pagina → eliminata con reindirizzamento permanente.
- **Piatti inesistenti sulla pagina buffet** («cotechino e kren», «calamari e gamberetti») → rimossi su indicazione del titolare.
- **`/menu` non conteneva metà del menu nell'HTML** — 9 piatti su 40, fra cui tutta la linea smash — → ora ci sono tutti.
- **`/menu` stava per restare senza `h1`** → titolo rimesso.

**Nessuno degli interventi elencati sopra è però già fatto:** qualità delle immagini, preload, titoli, schema del menu e link ai contatti restano tutti aperti.
