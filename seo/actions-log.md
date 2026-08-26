# Registro azioni SEO

Log cronologico di ogni azione correttiva intrapresa per la SEO del sito. Ordine: più recente in cima.

---

## 2026-08-26 (9) — 🟢 PUBBLICATA la Fase 2. E un prezzo sbagliato trovato per strada

Marco: *«parti»*, poi *«10 euro, correggi la cena e pubblica»*. Cinque commit sul
ramo `fase-2`, merge `--no-ff`, deploy Vercel in ~3 minuti (più lento del solito:
atteso controllando lo stato del commit su GitHub, non a occhio).

### ⓪ La premessa, verificata prima di scriverne una riga

Il motivo per cui lo schema `Menu` stava in cima al piano era una frase dell'audit —
*«nessuno dei quattro concorrenti espone i prezzi»* — **senza traccia dietro**: né
quali quattro, né cosa fosse stato guardato. Dopo l'errore su TripAdvisor non si
costruisce un'ora di lavoro su un'affermazione non verificata.

Aperti uno per uno, con browser vero:

| Locale | Sito | Prezzi leggibili da una macchina | Prezzi per una persona |
|---|---|---|---|
| Vecio Buffet Marascutti | sì | ❌ nessuno schema `Menu` | solo in un **PDF «SETTEMBRE 2025»** |
| Buffet da Pepi 1897 | sì | ❌ | ❌ nessuno |
| Buffet Siora Rosa | sì (dentro 040group.it) | ❌ | ❌ nessuno |
| Rustiko Trieste | sì | ❌ nessun JSON-LD del tutto | ❌ |
| Buffet Rudy | **nessun sito** (dominio inesistente) | — | — |
| Buffet da Gildo | **nessun sito** | — | — |
| **Schiacciateria Retrò** | sì | **48 piatti, 59 offerte** | 57 prezzi in pagina |

**Premessa confermata, e più forte di come era scritta.** Il PDF di Marascutti ha
pure i numeri rotti nell'estrazione (`9 ,00`, `12, 00`): l'unico concorrente che
pubblica i prezzi lo fa nel modo meno leggibile possibile.

### ① Schema `Menu` — 10 sezioni, 48 voci, 59 offerte

Le voci sono state spostate da `MenuClient.tsx` a **`src/app/menu/menuData.ts`**,
letto sia dal componente che disegna la pagina sia da `menuSchema.ts`. **Una fonte
sola:** le due superfici non possono più divergere.

⚠️ Il file NON è il vecchio `src/data/menu.ts` cancellato la settimana scorsa: quello
era codice morto che nessuno importava. Questo è importato da entrambi, e c'è un
commento in testa che lo dice, perché la confusione è prevedibile.

Tre casi gestiti invece che appiattiti:
- i **quattro burger** hanno due offerte, `Solo panino` e `Menu con patatine`
- le **cinque birre alla spina** hanno un'offerta per formato (0,2 / 0,4 / 0,5 l)
- la **«Birra a Rotazione»** dice «Chiedi al banco»: resta **senza offerta**. Non se
  ne inventa una per far tornare il conteggio.
- i **dieci condimenti** (`Cacio e Pepe 1,00 €`…) restano fuori: sono aggiunte, non piatti.

### 🔴 Il prezzo doppio, trovato traducendo il menu

**«Bona ma Leggera»: 10,00 € a pranzo, 9,00 € a cena.** Stesso piatto, stessi
ingredienti, stessa pagina. Controllate tutte e cinque le schiacciate presenti in
entrambi i menu: **era l'unica a cambiare**, le altre quattro combaciavano.

Non l'ho corretta da solo. La differenza era **già online** e poteva avere una
ragione che non conosco — ma dichiarata a Google e alle IA sarebbe diventata una
risposta ripetibile: «dipende, 9 o 10». Chiesto a Marco, che ha risposto **10,00, e
l'errore era nella cena**. Corretto, e ricontrollato: zero occorrenze di `€9,00` sulla
voce, in produzione.

**Regola che ne esce:** tradurre una pagina in dati strutturati è anche un revisore.
Una contraddizione che a schermo la nota solo chi confronta, in forma leggibile
diventa una dichiarazione. Le incongruenze si tirano fuori **prima** di pubblicarle,
e si chiedono al titolare invece di sceglierle.

### ② `/contatti`: da 0 articoli su 28 a 28 su 28

Ventotto articoli su dove mangiare a Trieste e **nessuno** che dicesse come arrivarci.
Aggiunto un secondo pulsante «Dove siamo e orari» nel riquadro di chiusura del
**template** — una modifica invece di ventotto, e uniforme.

**Non fatto di proposito:** collegare `/buffet-triestino` dagli articoli che nominano
il buffet. Aperti i sei che lo nominano senza linkarlo: in **cinque** parlano dei
buffet **degli altri** — «i vecchi buffet del centro», «gli antichi buffet», «i
buffet freddi», «l'apericena a buffet in stile milanese». Un link alla nostra pagina
su «i buffet freddi» sarebbe una trappola per chi legge. Resta un solo candidato
sensato (la sezione «Il Buffet Triestino e il Panino con Porzina» nella guida allo
street food), in attesa del parere di Marco. `/buffet-triestino` resta a 5 su 28.

### ③ Schema `Article`: `image` e `mainEntityOfPage` — 28 su 28

`image` è richiesta da Google per mostrare l'articolo con la foto accanto. Il valore
era già nel frontmatter (`hero_image`) e non era dichiarato.

### ④ Description sotto i 165 caratteri

202→144, 180→126, 170→120, più la pagina del buffet 166→154. **Tagliate, non
riscritte.** Il piano diceva «sette, la peggiore a 217»: ricontate sull'HTML servito
erano **quattro** e la peggiore **202**.

### ⑤ `sizes` su sette immagini `fill`

Compresi due ritratti da **40 e 64 px** che il browser scaricava a piena risoluzione.
Le tre marcate `unoptimized` restano senza: Next non genera varianti, `sizes` non
farebbe nulla — dichiararlo sarebbe stato rumore.

### ✅ Verificato in produzione

| Cosa | Esito |
|---|---|
| `/menu` — schede invisibili | `Restaurant` + **`Menu`** ✓ |
| `/menu` — contenuto dello schema | 10 sezioni · 48 piatti · 59 offerte · 1 senza prezzo (giusto) ✓ |
| `/menu` — Bona ma Leggera | 10,00 in entrambe le sezioni, `€9,00` sparito ✓ |
| 28 articoli — link a `/contatti` nel corpo | **28/28** ✓ |
| 28 articoli — foto nello schema | **28/28** ✓ |
| 28 articoli — description ≤ 165 | **28/28** ✓ |
| immagini `fill` ottimizzate senza `sizes` | **0** ✓ |

#### Due falsi allarmi miei, registrati perché li ho creduti

1. **«28/28 per tutte e quattro le pagine».** Il primo conteggio dei link interni dava
   28 su 28 anche a `/buffet-triestino` e `/chi-siamo`, che non avevo toccato:
   **stavo contando il menu di navigazione**, presente su ogni pagina. Rifatto
   restringendo a `<article>…</article>`. Terza variante in due giorni della regola
   *un selettore che può pescare più elementi non è una verifica*.
2. **«3 articoli con la description ancora lunga».** Misurando l'attributo grezzo,
   `&#x27;` conta 6 caratteri invece di 1. Con l'unescape: **zero**. Le entità HTML
   vanno sciolte prima di misurare un testo.

### Cosa resta

Fase 2 chiusa. Restano la **Fase 3** — l'unica che sposta davvero, e l'unica in cui
serve Marco: gli articoli hanno mediana 345 parole e 90 link a Wikipedia, manca quello
che si vede solo dal banco — e la **Fase 4**, rileggere gli elenchi locali il 24/09 e
Search Console a fine mese.

Sospeso in attesa del titolare: il sito indicato sulla **pagina Facebook**
(`retrotrieste.it`, dominio inesistente), che Marco passa alla SMM.

---

## 2026-08-26 (8) — 🟢 PUBBLICATO. Chiusa la Fase 1: titoli, schema, date

> **Correzione di data.** Le voci qui sotto sono etichettate *27/08*: è sbagliato.
> `git log` dice che tutti quei commit sono del **26/08/2026** (15:46), come questi
> (17:08). Stessa giornata. Le intestazioni restano com'erano per non riscrivere
> il passato, ma la data buona è il 26.

Marco: *«procedi»*, dopo aver chiesto le fasi spiegate senza gergo. Tre commit sul
ramo `titoli-schema-date`, merge `--no-ff` su `main`, deploy Vercel in ~50 secondi.

| Commit | Contenuto |
|---|---|
| `1429905` | 28 titoli accorciati + suffisso del marchio tolto dagli articoli |
| `8b81352` | `hasMenu` e `sameAs` completo nello schema `Restaurant` |
| `3ad7e1b` | `lastmod` reale, pagina per pagina, nella sitemap |

### ① I titoli: 102 caratteri di media, ne restano 39

Google ne mostra circa 60. **Tutti e 28** gli articoli erano sopra: il più lungo 116.

La causa più grossa non erano i titoli: era il **template del layout**
(`src/app/layout.tsx:12`), che appende `| Schiacciateria Retrò Trieste` a ogni
pagina. **31 caratteri su 60**, spesi per un marchio che nessuno cerca su una query
tipo *dove bere lo spritz a Trieste* — e sul proprio nome il sito è già primo.

Tolto dai **soli articoli** con `title: { absolute: article.title }`; le pagine fisse
lo mantengono. Poi riscritti i 28 titoli: ora **39 caratteri di media, il più lungo 49**.

⚠️ **Effetto collaterale dichiarato prima di procedere:** `article.title` alimenta sia
il `<title>` sia l'`<h1>` visibile (`src/app/blog/[slug]/page.tsx:17` e `:85`).
Accorciare il titolo accorcia anche il titolone in cima all'articolo. Detto a Marco,
approvato con «procedi». Se qualche parola non gli suona, si cambia: è testo pubblico,
quindi le parole sono sue.

I tre che già si posizionano:

| Slug | Nuovo titolo | Prima → dopo | Posizione GSC |
|---|---|---|---|
| `spritz-aperitivo-trieste` | Spritz bianco a Trieste: la regola dell'aperitivo | 103 → 49 | **5,9** · 312 impr. |
| `dove-bere-miglior-spritz-trieste` | Dove bere il miglior spritz a Trieste | 115 → 37 | 8,6 · 78 impr. |
| `dove-fare-aperitivo-trieste-centro` | Dove fare aperitivo a Trieste in centro | 108 → 39 | 10,4 · 146 impr. |

**Verificato sull'HTML prodotto dalla build**, non sul dev server: 28 pagine su 28
sotto i 60 caratteri, zero con il marchio in coda.

### ② Lo schema: dove sta il menu, e quali profili sono lo stesso locale

`hasMenu` era **assente**. La pagina `/menu` esiste, ha 40 piatti con i prezzi, è
collegata da 23 articoli su 28 — ma da nessuna parte era dichiarato, in forma
leggibile da una macchina, che *quello* è il menu di *questo* locale.

`sameAs` conteneva **solo Instagram**. Ora quattro profili, **verificati uno a uno
aprendoli**, non cercandoli:

| Profilo | URL | Cosa ho verificato |
|---|---|---|
| Instagram | `schiacciateria_retro_trieste` | 6.723 follower, rimanda a schiacciateriaretrotrieste.com |
| Facebook | `CaffeRetro2017` | 8.247 follower, Viale XX Settembre 16, tel. 375 626 4680 |
| Scheda Google | `maps.google.com/?cid=4949097406666230499` | apre «Retró XX settembre — Schiacciateria Triestina» |
| TripAdvisor | `d15123470` | 4,3 su 24 recensioni, stesso indirizzo e stesso telefono |

Il CID decimale è ricavato dall'esadecimale `0x44aeb9deb325cae3` già presente nel link
Maps del sito (`src/app/HomeClient.tsx:1055`). È la forma canonica e stabile.

**Questo è il filo che lega il sito alla scheda Google** su cui abbiamo lavorato tutto
il giorno. Prima erano due cose che si somigliavano, non due facce della stessa.

#### Falso allarme, registrato perché ci ho creduto per due minuti

La ricerca web restituiva `instagram.com/retroxxsettembre` come profilo del locale, e
il sito linka **12 reel** con quella maniglia. Il profilo `retroxxsettembre` **non
esiste più** («Profile non è disponibile»). Sembravano 12 link morti in home.
**Non lo sono:** aperto un reel, Instagram risolve per shortcode e reindirizza al
profilo nuovo. Nessun intervento necessario. La maniglia nello schema era già giusta.

#### 🔴 Correzione: ho sbagliato, ed è Facebook soltanto

**Cosa avevo scritto e detto a Marco:** «sia Facebook sia TripAdvisor riportano come
sito `retrotrieste.it`». **È falso per TripAdvisor.**

**Da dove veniva l'errore.** L'ho preso dallo **snippet della ricerca web**, che per
la pagina TripAdvisor riportava «Website: retrotrieste.it», e l'ho riferito come se
l'avessi verificato. Quando ho aperto TripAdvisor avevo letto **solo indirizzo e
telefono**: il campo «Sito web» non l'ho mai controllato prima di affermarlo.
È esattamente l'errore descritto in [[verificare-prima-di-affermare-seo]], commesso
il giorno stesso in cui l'ho applicato bene tre volte di fila.

**Il dato vero**, controllato due volte con due motori diversi (browser reale e
Playwright/WebKit, che hanno dato lo stesso risultato):

| Scheda | Sito dichiarato | Esito |
|---|---|---|
| TripAdvisor | `https://schiacciateriaretrotrieste.com/` | ✅ **giusto, non va toccato** |
| Facebook | `http://www.retrotrieste.it/` | 🔴 sbagliato |

**Su Facebook il problema è peggiore di come l'avevo descritto.** Non è un dominio
diverso: **`retrotrieste.it` non esiste più**. Non ha alcun record DNS —
`dig +short retrotrieste.it` non risponde nulla, `curl` fallisce con
*«Could not resolve host»*. Quindi l'unico link al sito su una pagina da **8.247
follower** è **morto**: chi ci clicca vede un errore del browser.

Va corretto dal pannello di Facebook, e lo fa il titolare.

**Nota di metodo, perché si ripeta.** TripAdvisor ha **bloccato Playwright/Chromium**
con una pagina «L'accesso è temporaneamente limitato». Quella pagina non è stata
contata come dato — stesso errore già registrato sugli elenchi locali del 25/08.
La verifica è passata solo cambiando motore (WebKit).

### ③ La sitemap: da 1 data per 34 pagine a 30 date distinte

`lastModified: new Date()` su **tutte** le voci: ogni build faceva dichiarare a 28
articoli intoccati di essere cambiati quel giorno.

E contraddiceva la pagina stessa. `street-food-trieste-guida`:

| | Prima | Ora |
|---|---|---|
| `lastmod` nella sitemap | 2026-08-18 | **2026-04-28** |
| `dateModified` nello schema `Article` | 2026-04-28 | 2026-04-28 |

Due affermazioni incompatibili sulla stessa pagina. **Ora combaciano.**

Come è fatto adesso (`src/app/sitemap.ts`):

- **articoli** — dal frontmatter: `dateModified`, e se manca `date`. Automatico.
- **pagine fisse** — costanti esplicite nella mappa `ULTIMA_MODIFICA`, ricavate dalla
  storia git di ciascuna (`git log -1 --format=%cs -- <path>`). Da aggiornare a mano
  quando la pagina cambia: la regola è scritta nel commento sopra la mappa.
- **indice del blog** — la data dell'articolo più recente, calcolata da sola.

Scartata l'idea di leggere le date da git a build time: su Vercel il `.git` può non
esserci, e una data che a volte funziona è peggio di una scritta a mano.

### ✅ Verificato in produzione, non solo in locale

| Cosa | Come | Esito |
|---|---|---|
| Titoli | `<title>` scaricato da `/blog/spritz-aperitivo-trieste` | 49 car., senza marchio |
| Schema | JSON-LD estratto dal DOM della home | `hasMenu` presente, `sameAs` con 4 URL |
| Sitemap | `sitemap.xml` scaricata e parsata | 34 URL, **30 date distinte** |

Il deploy è stato atteso con polling: i primi due tentativi servivano ancora la
versione vecchia. Il terzo, la nuova.

### Cosa resta della Fase 1

**Niente.** Le sei voci sono chiuse: qualità immagini, preload, titoli, `hasMenu`,
`sameAs`, `lastmod`. Il prossimo passo è la **Fase 2**, e la voce che pesa è mettere i
**40 prezzi del menu** in `Menu`/`MenuItem`: nessuno dei quattro concorrenti espone i
prezzi in forma leggibile da una macchina.

---

## 2026-08-27 (7) — 🟢 PUBBLICATO. E il LCP è dimezzato

**Online alle 15:4x del 27/08.** Marco: *«sì aggiungi le immagini e pubblica tutto»*. Deploy Vercel completato **60 secondi** dopo il push.

Tre commit separati sul ramo `seo/correzioni-sito-27-08`, poi merge su `main` con `--no-ff`:

| Commit | Contenuto |
|---|---|
| `21e238c` | correzioni ai contenuti (buffet, menu, `/bevande`, `menu.ts`) |
| `a6ef867` | prestazioni (qualità immagini + preload) |
| `6775c3a` | audit SEO e registro |

**Separati apposta:** se la qualità delle immagini non convincesse, si annulla `a6ef867` senza toccare i contenuti. Il primo tentativo li aveva accorpati ed è stato rifatto.

### Prima di fissare il valore, ho guardato

Scaricate `tavolata_ignorante.webp` a q=100, q=90 e q=75 a 1080px e confrontate a occhio. **Nessuna differenza percepibile** su sale, texture della mortadella e sfocato di fondo. 302 KB contro 82. Scelto 75, che è anche il valore predefinito di Next.

### ✅ Il risultato, misurato in produzione con lo stesso metodo della baseline

| Pagina | LCP prima | LCP dopo | |
|---|---|---|---|
| `/` | 5.172 ms | **2.552 ms** | **−51%** |
| `/menu` | 3.852 ms | **1.716 ms** | **−55%** |
| `/buffet-triestino` | 3.752 ms | **2.808 ms** | −25% |
| `/blog/street-food…` | 1.460 ms | 1.396 ms | invariato |

| Peso | Prima | Dopo | |
|---|---|---|---|
| `/` | 1.140 KB | **510 KB** | −55% |
| `/buffet-triestino` | 592 KB | 444 KB | −25% |

La home passa da **scarso** (oltre 4.000 ms) a **52 ms dalla soglia del buono**. `/menu` entra in fascia buona. CLS invariato ed eccellente ovunque (0,000–0,047).

**`/menu` non cala di peso** (−4%) perché ora contiene entrambi i menu nell'HTML: più contenuto, e il LCP crolla lo stesso.

⚠️ **Singole misure di laboratorio.** Il TTFB della home oscilla fra 326 e 423 ms fra una prova e l'altra: è rumore. La direzione è solida, i millisecondi esatti no. Restano dati di laboratorio, non di campo.

**Costo: tre righe di `quality` e un attributo.**

### Verifica in produzione

- pagina buffet: **zero occorrenze** di *cotechino, calamari, gamberetti, «sempre in vetrina», «sempre presenti», «te disemo», «magnar», «spassizzar»* ✓ · «tartine» presente ✓
- pagina menu: **tutti e 9 i piatti serali** presenti nell'HTML (Variante TS, Porca Zozza, J-Ax, Retro Smash, Tartu Smash, Saint Jack Smash, Kebab-ara, Goloso, Romano) ✓ · **un solo `h1`** col testo giusto ✓
- `q=100` nell'HTML servito: **0 occorrenze** su home, menu e buffet ✓ · preload immagine: 2 per pagina (erano 3 sulla home) ✓
- `/`, `/menu`, `/buffet-triestino`, `/blog`, `/contatti`, `/chi-siamo` → **200** ✓
- `/bevande` → **308 verso `/menu`** ✓
- sitemap: **34 URL**, zero occorrenze di `bevande` ✓

### Pulizia di passaggio

Rimossi da `.next/types/` alcuni file duplicati col nome tipo `routes.d 2.ts` e `routes.d 3.ts`, prodotti dalla sincronizzazione cloud della cartella. Facevano fallire `tsc --noEmit` con «Duplicate identifier» pur essendo solo copie in una cartella di cache. **Da tenere d'occhio: la cartella del progetto è sincronizzata e può generare doppioni.**

### Cosa resta aperto dal piano d'azione

Fase 1 chiusa a metà: fatti qualità immagini e preload. **Restano:** titoli degli articoli sotto i 60 caratteri, `hasMenu` e `sameAs` nello schema, `lastmod` reale nella sitemap. Poi la Fase 2, che ha dentro lo schema `Menu` coi 40 prezzi.

---

## 2026-08-27 (6) — Audit SEO completo del sito. Punteggio 65/100

Eseguito con la skill `seo-audit` sul **sito online**, cioè prima delle correzioni ferme in locale. È voluto: serve come misura di partenza.

**Artefatti:** `seo/audits/schiacciateriaretrotrieste.com-audit/` — `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `audit-data.json`, sette file in `findings/`, sei schermate, dati grezzi in `raw/`.

**Metodo:** scansione di 38 pagine rispettando robots.txt · misure prestazionali con Chromium a 1,6 Mbps / 150 ms / CPU 4× · confronto dei contenuti sui 3-grammi · incrocio con lo snapshot GSC del 18/08. **Nessuna chiave Google configurata**, quindi niente dati di campo CrUX né GSC live: le misure sono di laboratorio e va detto.

### Punteggio

| Categoria | Peso | Punteggio |
|---|---|---|
| Tecnica | 22% | 82 |
| Contenuti | 23% | 58 |
| On-page | 20% | 70 |
| Dati strutturati | 10% | 62 |
| Prestazioni | 10% | 48 |
| IA | 10% | 55 |
| Immagini | 5% | 70 |
| **Totale** | | **65** |

### Le cose che non sapevamo, misurate

**🔴 `quality={100}` costa fino al 73% di byte.** Scaricata la stessa immagine dal sito cambiando solo il parametro: `hero_aggressive.jpg` 191 KB → 53 KB · `tavolata_ignorante.webp` 295 KB → 80 KB · `menu_hero_schiacciata.webp` 77 KB → 48 KB. Tre righe in tre file.

**Questo affina — non contraddice — la nota del vault** secondo cui comprimere `public/` non toglie un byte al visitatore ([[peso-immagini-next-non-e-leva-velocita]]). È vero, perché `/_next/image` ricodifica. Ma **il parametro `quality` è la ricodifica**, quindi è l'unico punto in cui si può davvero intervenire. La memoria va aggiornata: non «le immagini non sono una leva», ma «la leva è `quality`, non il file sorgente».

**🔴 LCP della home 5.172 ms** su mobile (scarso oltre 4.000). `/menu` 3.852, `/buffet` 3.752, blog 1.460. **CLS eccellente ovunque**, 0,000–0,047. TTFB 228–430 ms: il server non c'entra. Causa: l'elemento LCP della home è l'`h1`, cioè testo, e il CSS da cui dipende compete con **tre immagini in preload**, una delle quali (`ingredienti_esplosi_highres.webp`, 147 KB) sta al 48% della pagina, sotto la piega.

**🟠 24 titoli su 38 superano i 60 caratteri** e vengono troncati. Il modello è sempre «frase, due punti, seconda frase», fino a 116 caratteri. Pesa dove fa più male: l'articolo sullo spritz è **in posizione 5,9 con 312 impressioni e 4 clic**, CTR 1,3% dove in quinta posizione ci si aspetta il 5–8%.

**🟠 Zero articoli su 28 linkano `/contatti`.** `/menu` è linkato da 23, `/buffet-triestino` da 5, i contatti da nessuno.

**🟠 Il `lastmod` della sitemap dice il falso** e si contraddice con lo schema: tutti e 35 gli URL dichiarano `2026-08-18`, mentre `Article.dateModified` dello stesso articolo dice `2026-04-28`.

### Quello che è risultato sano, e non me lo aspettavo così

- **38 pagine su 38 rispondono 200**, nessuna catena di redirect, nessuna orfana.
- **Zero immagini senza `alt`** su 83 immagini totali.
- **Nessuna duplicazione fra gli articoli**: su 378 coppie la somiglianza massima è 5,4%, zero coppie sopra il 10%. Il blog è corto, non è riciclato.
- Intestazioni di sicurezza complete, canonical corretti, `noindex` solo dove serve.

### Il quadro strategico, che conferma la diagnosi della scheda

GSC 19/07 → 16/08: **168 clic, posizione media 6,1**, e le prime nove query per clic contengono **tutte** il nome del locale. Query con «buffet»: **0 clic, 11 impressioni, posizione 20,4**. Il sito è trovato da chi lo conosce già.

L'unica eccezione che funziona è il gruppo **spritz/aperitivo**: 8 clic e 536 impressioni, con un articolo in posizione 5,9. È lì che conviene scavare prima di aprire temi nuovi.

### ⛔ Tre cose da non fare, scritte nel piano

- **Niente `aggregateRating`** nello schema copiando il 4,6/443 dalla scheda: vietato dalle linee guida, rischia i risultati arricchiti su tutto il dominio.
- **Niente `llms.txt`**: nessuno lo usa per decidere cosa citare ([[essere-consigliati-dalle-ia]]).
- **Niente compressione di `public/`**: la ricodifica la annulla.

### Nota sul PDF

`google_report.py` richiede `matplotlib`, non installato. Il report PDF non è stato generato: chiedere a Marco prima di installare una dipendenza sulla sua macchina.

---

## 2026-08-27 (5) — Revisione prima della pubblicazione: «cotechino» stava per uscire lo stesso

Rilettura completa del diff prima di chiedere il via a Marco.

### 🔴 Trovato: il cotechino era ancora nei metadati della pagina

Sulla pagina non compariva più — scheda eliminata, sottotitolo e paragrafo riscritti, e il controllo sul testo visibile dava «zero occorrenze». **Ma il controllo era stato fatto sul testo, non sull'HTML.** Cercando la parola nell'HTML generato risultava ancora **tre volte**, in `buffet-triestino/page.tsx`:

- `description` — **è la frase che Google mostra sotto il titolo nei risultati di ricerca**
- `og:description` — l'anteprima quando il link viene condiviso su WhatsApp o Facebook
- `twitter:description`

Quindi il piatto inventato sarebbe rimasto visibile **esattamente nel posto più letto**: l'anteprima nei risultati. Corretto in tutte e tre con «tartine», la parola corroborata. Riverificato sull'HTML: sparito.

🔑 **Regola:** togliere una cosa da una pagina significa toglierla **anche dai metadati**. Titolo, description, OpenGraph e Twitter vivono in un file diverso da quello del contenuto e non compaiono in nessun controllo fatto sul testo a schermo. La verifica va fatta sull'**HTML generato**, che è l'unico posto dove contenuto e metadati stanno insieme.

### Confronto riga per riga di `MenuClient.tsx`

Il diff di git era illeggibile perché lo spostamento dei due menu in variabili ha fatto slittare tutto. Confrontati invece gli **insiemi di righe** fra la versione in HEAD e quella nuova: **17 righe tolte, 45 messe, tutte riconducibili una per una alle modifiche volute.** Nessuna riga di piatto, prezzo o ingrediente risulta toccata.

### Falso allarme controllato

`Gamberetti` compare ancora due volte in `MenuClient.tsx`: è il bruschettone **«Sapore di Mare — Gamberetti e salsa rosa fatta in casa»**, che è una voce vera del menu online. La correzione di Marco riguardava i *fritti misti* della pagina buffet, non questa. **Non toccato.**

Verificato inoltre che `cotechino` non compare in nessuno dei 28 articoli del blog, e che l'unica occorrenza rimasta di «bevande» è un nome comune dentro un articolo, non un collegamento alla pagina eliminata.

### Stato finale verificato

| Controllo | Esito |
|---|---|
| `npm run build` | pulita, 44 pagine |
| `tsc --noEmit` | pulito |
| Pagina menu: tutti e 40 i piatti nell'HTML | ✓ |
| Pagina menu: un solo `h1`, col testo giusto | ✓ |
| Pagina menu: riquadro giallo «Menu» rimosso | ✓ |
| Pagina buffet: cotechino, calamari, gamberetti, «sempre in vetrina», «sempre presenti», «te disemo», «magnar», «spassizzar» | zero occorrenze |
| `/`, `/menu`, `/buffet-triestino`, `/blog`, `/contatti`, `/chi-siamo` | 200 |
| `/bevande` | **308 → `/menu`** |
| Sitemap | menu · buffet-triestino · chi-siamo · contatti · blog + articoli — nessuna `bevande` |
| `src/data/menu.ts` | cancellato |

**Pronto per la pubblicazione. In attesa del via esplicito di Marco.**

---

## 2026-08-27 (4) — ✅ Il menu completo ora è dentro l'HTML, senza toccare le animazioni

Domanda di Marco: *«in che senso il menu è invisibile? non si può dare la possibilità a Google di vedere tutto il menu in ogni momento, senza perdere le varie animazioni?»*

**Sì, si può. Fatto.**

### ❌ Prima però va corretto quello che avevo scritto io

Ieri sera avevo scritto **«metà del menu è invisibile a Google»**. È esagerato e non l'avevo contato. Il numero vero, ricavato leggendo i due rami del componente e l'HTML servito:

| | |
|---|---|
| Piatti diversi sul sito | **40** |
| Piatti che non comparivano in nessun punto dell'HTML | **9** |

**I nove:** Variante TS, Porca Zozza, J-Ax (schiacciate solo serali) · Retro Smash, Tartu Smash, Saint Jack Smash, Kebab-ara (**tutta la linea smash**) · Goloso, Romano (bruschettoni serali). Più il titolo di sezione **«Le Smash-ate»**, che era l'unica occorrenza della parola sul sito.

Quindi non metà: **il 22%, ma concentrato — spariva una linea di prodotto intera, quella presentata come «La Novità».** Le sezioni condivise (sfizi, taglieri, dolci, birre, spritz) erano sempre presenti, perché stanno fuori dal ternario.

### Perché era invisibile, in una riga

Il sito viene **generato in anticipo** in un file HTML: è quel file che Google scarica. Al momento della generazione l'interruttore è su «pranzo», quindi nel file veniva scritto **solo il ramo del pranzo**. Il ramo della cena non era nascosto: **non esisteva**. Veniva creato dal browser solo se qualcuno cliccava «Cena».

### La soluzione, e perché non tocca le animazioni

L'animazione lavora su **opacità e posizione** di un blocco. Il problema era a monte: il blocco della cena non veniva nemmeno scritto. Quindi non serviva toccare l'animazione — serviva **scrivere in pagina anche l'altro servizio, e nasconderlo**.

I due menu sono stati estratti in due variabili (`layoutPranzo`, `layoutCena`) e ognuna viene usata **due volte**:

```
<AnimatePresence mode="wait">     ← invariato, animazione identica a prima
  {menuType === 'pranzo' ? layoutPranzo : layoutCena}
  ...sezioni condivise...
</AnimatePresence>

<div hidden>{menuType === 'pranzo' ? layoutCena : layoutPranzo}</div>
```

**È il modello standard dei pannelli a schede:** una scheda mostrata, l'altra con `hidden` (`display:none`). Google indicizza normalmente il contenuto delle schede — è il caso che documenta esplicitamente — e non è occultamento, perché il contenuto è raggiungibile da chiunque con l'interruttore Pranzo/Cena, che è visibile in pagina.

**`AnimatePresence`, le transizioni, l'interruttore che scorre: tutti invariati.** Il diff sul blocco animato è di una riga.

### Verifiche

**Sull'HTML statico prodotto dalla build** (`.next/server/app/menu.html`), che è esattamente quello che scarica Google:

Top de Gamma ✓ · Scrigno ✓ · La Barcolana ✓ · **Variante TS ✓ · Porca Zozza ✓ · J-Ax ✓ · Retro Smash ✓ · Tartu Smash ✓ · Saint Jack Smash ✓ · Kebab-ara ✓ · Goloso ✓ · Romano ✓ · Smash-ate ✓** · Chifeletti ✓ · Spritz Sarti ✓ — **nessuna assenza**.

**Nel browser**, a menu «pranzo» attivo: l'utente vede la pausa pranzo e **non** vede gli smash ✓ · il blocco nascosto ha `display: none` e **altezza 0**, quindi non occupa spazio ✓ · contiene «SERATA RETRÒ», «Retro Smash», «Variante TS» ✓ · nessuno scorrimento orizzontale ✓. Cliccando «Cena» i due si scambiano: il nascosto passa a contenere «PAUSA PRANZO RAPIDA» ✓.

**Peso:** la pagina passa a 126 KB di HTML, che compressi in rete diventano **14 KB**. Non è contenuto nuovo — quelle voci erano già nel codice, cambia solo dove finiscono.

`npm run build` pulita, 44 pagine · `tsc --noEmit` pulito.

### ⚠️ Due errori di misura commessi durante questa verifica

**① Ho letto l'elemento sbagliato.** Con `document.querySelector('div[hidden]')` avevo concluso che il blocco nascosto fosse vuoto. In pagina di elementi `[hidden]` ce n'erano **due**: uno interno di Next.js da 17 caratteri e il nostro da 21.752. `querySelector` restituisce il primo. Corretto ordinando per dimensione del contenuto.
🔑 **Un selettore che può corrispondere a più elementi non è una verifica**: o è univoco, o si contano quanti ne ha trovati.

**② Il server di sviluppo serviva una pagina vecchia.** Per un giro di controlli l'HTML risultava ancora senza gli smash benché il sorgente fosse aggiornato: avevo lanciato `npm run build` **mentre `next dev` era in esecuzione**, e la build gli ha sovrascritto la cartella `.next` sotto i piedi. Il server continuava a servire l'output precedente.
🔑 **`next build` e `next dev` non convivono sullo stesso progetto.** E in ogni caso la prova per un'affermazione sull'indicizzazione è **il file statico prodotto dalla build**, non quello che risponde il server di sviluppo.

**⛔ Niente è stato pubblicato.**

---

## 2026-08-27 (3) — Rifiniture sulla pagina buffet e menu che segue l'orario

**Tutto in locale. Niente è pubblicato.**

### Pagina buffet — le tre cose chieste da Marco

**① Tolto «te disemo mi!»** dal riquadro «La proposta del giorno». Stesso difetto della frase eliminata poco prima: dialetto costruito, non parlato. Non sostituito con altro.

**② Polpette e Rebechin e salumi: restano, ma senza promessa di presenza.** Marco: *«lasciali perché potrebbe essere che passino sul banco, l'importante è che non ci sia scritto che sono sempre, perché non è sicuro al 100%»*. Dalla scheda Polpette è sparita la chiusura **«Sempre presenti, sempre buone»**. Riletta tutta la sezione: nessun'altra voce promette continuità (*«non può mancare a un vero buffet triestino»* parla dei buffet in generale, *«non sbaglia mai»* parla del gusto). Insieme all'etichetta «Sempre in vetrina» tolta prima, la sezione ora presenta esempi, non un impegno.

**③ Riorganizzata la sezione «No xe solo cibo. Xe Trieste.» sul desktop.** Marco: *«mi sembra che manchi un pezzo adesso»*. Aveva ragione, e i numeri lo dicevano:

| | Prima | Dopo |
|---|---|---|
| Colonna foto | 472 × **354** | 425 × **420** |
| Colonna testo | 472 × **527** | 511 × **420** |
| Altezza sezione | 719 | **612** |
| I due pulsanti | su **due righe** | su **una riga** |

Tolto il paragrafo in finto dialetto, la colonna di testo era **173 px più alta della foto**: con `items-center` la foto galleggiava al centro lasciando ~86 px di crema vuota sopra e sotto. E i due pulsanti andavano a capo perché servivano 476 px in una colonna da 472.

**Cosa è cambiato:** la griglia passa da due colonne uguali a **5fr / 6fr**, la foto smette di essere bloccata a 4:3 sul desktop e **si allunga fino all'altezza del testo**, il testo si centra verticalmente. Risultato: due colonne alte uguali, zero vuoto, foto più grande, pulsanti affiancati. Aggiunto `sizes` all'immagine, che ora ha proporzioni diverse.

**Mobile invariato** — verificato a 375 px: la foto resta 4:3 (335 × 251), le colonne restano impilate, nessuno scorrimento orizzontale.

---

### ✅ Il menu ora sceglie da solo pranzo o cena secondo l'orario

Richiesta di Marco: *«se sono le 8:30 di sera non mi mostri il menù per il pranzo, perché potrebbe essere che il cliente non si accorge di essere su un menu invece che sull'altro»*.

**Regola scritta in due costanti in cima al file, così si cambia in una riga:**

- **dalle 17:00 alle 04:59 → cena**, dalle 05:00 alle 16:59 → pranzo;
- **la domenica è sempre cena**, perché il locale apre alle 17:00 e il pranzo non esiste;
- l'orario letto è quello di **Europe/Rome**, non quello del dispositivo: il servizio in corso dipende dal locale, non da dove si trova chi guarda;
- **un `?type=` esplicito nell'URL vince sull'orario**, così un link condiviso mostra a chi lo riceve quello che mostrava a chi l'ha mandato;
- se `Intl` non fosse disponibile, si torna al comportamento di prima (pranzo). Nessun percorso può rompere la pagina.

**Verificato caso per caso**, con date reali:

| Momento | Risultato |
|---|---|
| giovedì 08:00 · 12:00 · 16:59 | pranzo |
| giovedì 17:00 · 20:30 | cena |
| venerdì 00:30 · 01:30 (locale ancora aperto) | cena |
| venerdì 05:00 | pranzo |
| domenica 12:00 e 19:00 | cena |

**Verificato anche in un browser vero** sulla pagina: mercoledì 14:30 → l'interruttore è su **Pranzo**; forzando la costante a 0 → passa a **Cena**; `/menu?type=cena` → **Cena** anche a mezzogiorno. Poi costante e debug rimossi.

**Il cambio non si vede come uno sfarfallio.** L'HTML statico contiene il pranzo e il passaggio avviene subito dopo il montaggio, ma l'immagine di testata occupa più di uno schermo: quando si arriva a leggere il menu, lo scambio è già avvenuto.

⚠️ **Trappola di verifica incontrata, da ricordare.** Per un quarto d'ora il menu sembrava non cambiare mai. Non era il codice: **la scheda del browser risultava `visibilityState: "hidden"`**, quindi `requestAnimationFrame` era fermo, quindi l'animazione di uscita di `AnimatePresence mode="wait"` non finiva mai e il contenuto non veniva sostituito. Lo stato React era già `cena`. **Su una scheda nascosta le animazioni sono in pausa: il DOM animato non è una prova.** Si controlla lo stato attraverso una classe non animata — qui l'interruttore Pranzo/Cena — oppure si guarda in una finestra davvero visibile.

---

### 🔴 Trovato di passaggio: metà del menu è invisibile a Google

Verificato sull'HTML servito da `/menu`: `Top de Gamma` presente, `Tavolata Ignorante` presente, `Spritz Sarti` presente, **`Smash` assente**.

La pagina è statica e viene generata con `menuType` a `'pranzo'`: **il ramo della cena non entra mai nell'HTML**. Tutto il menu serale — gli smash burger, le schiacciate e i bruschettoni della sera — **non è mai stato indicizzato**. Non lo vede Google, non lo vedono le IA che leggono le pagine, e non compare in nessuna ricerca.

**Non risolto:** richiede di rendere entrambi i menu nell'HTML e nascondere quello inattivo via CSS invece che smontarlo, il che elimina anche l'animazione di transizione. È un intervento di sostanza e va deciso da Marco, non infilato dentro una rifinitura.

---

### Verifiche

- `npm run build` pulita, 44 pagine ✓ · `tsc --noEmit` pulito ✓
- pagina buffet: zero occorrenze di *te disemo, sempre presenti, sempre buone* ✓
- sezione desktop: colonne 425×420 e 511×420, **stessa altezza**, pulsanti sulla stessa riga ✓
- mobile 375 px: foto 4:3, nessuno scorrimento orizzontale ✓
- `/menu` alle 14:30 di mercoledì → Pranzo ✓ · `/menu?type=cena` → Cena ✓

**⛔ Niente è stato pubblicato.**

---

## 2026-08-27 (2) — Correzioni al sito: cancellato `menu.ts`, ripulita la pagina buffet, eliminata `/bevande`

**Tutto in locale. Niente è stato pubblicato.**

### ✅ `src/data/menu.ts` cancellato

134 righe, zero importatori (riverificato prima di cancellare). Era il menu vecchio che il 26/08 stava per far pubblicare su Google prezzi fino al 20% sotto quelli veri. `src/data/` è rimasta vuota.

---

### Pagina `/buffet-triestino` — quattro correzioni di Marco

**① Tolta l'etichetta «Sempre in vetrina»** accanto a «I classici del banco». Marco: *«questi sono alcuni esempi, non sempre c'è tutto questo in vetrina»*. La pagina prometteva una disponibilità continua che il locale non garantisce.

**② «Fritti misti» — via calamari e gamberetti.** Marco: *«i fritti misti ci sono ma sono ad esempio zucchine, melanzane impanate, tutte queste cose qui tipiche di Trieste; gamberi fritti non sono tipici di Trieste»*. Descrizione riscritta con gli ingredienti che ha dettato lui.

**③ Eliminata la scheda «Cotechino e kren»**, più le due citazioni nel sottotitolo dell'hero e nel paragrafo di apertura.

**🔍 Verifica che conferma Marco oltre il suo stesso sospetto.** Cercata la parola su tutto il sorgente:

| Parola | Nel menu online | Nei 28 articoli del blog | Altrove |
|---|---|---|---|
| **cotechino** | 0 | **0** | solo la pagina buffet |
| kren | 4 | 10 articoli | — |
| tecia | 4 | 3 file | — |

**«Cotechino» non esisteva da nessun'altra parte nel sito.** Comparso una volta sola, su quella pagina, senza nessuna fonte a monte. È il profilo esatto del contenuto inventato dall'IA che riempie un elenco di piatti «tipici del buffet triestino» invece di descrivere questo locale ([[contenuti-solo-con-l-esperienza-del-cliente]]).

**Il kren invece è vero, ed è il cotechino a essere falso.** Il kren al Retrò è **prosciutto cotto e kren**: è il bruschettone «Tradizione Trieste» del menu, ed è l'etichetta che **Google stessa ha estratto dalle fotografie dei clienti** — *Cicchetti Con Cotto Kren*.

**Sostituito con «tartine»**, parola corroborata tre volte e non inventata da me: sta nella **descrizione della scheda scritta dal titolare** (*«varie tartine locali farcite di vari tipi»*), è il **terzo tema più citato nelle recensioni** (8 menzioni) ed è nella bio Instagram del locale. È anche la parola che usano i clienti, non quella del sito.

**④ Eliminata la frase «Entra, da magnar e da bevar, e se no ti ga pressa resta pure a spassizzar».** Marco: *«tutta quella parte lì va eliminata perché tutta sbagliata, cioè non è dialetto triestino questo»*. Non riscritta: il dialetto lo detta lui ([[procedura-dettato-marco-non-scrittura-ia]]).

**⚠️ Segnalato, non toccato:** nel riquadro giallo «La proposta del giorno» resta **«te disemo mi!»**, che ha lo stesso difetto della frase appena tolta. Serve la decisione di Marco.

**⚠️ Aperto: le altre quattro schede hanno la stessa origine.** «Polpette», «Rebechin e salumi», «Cicchetti triestini» **non compaiono nel menu online**. Solo i cicchetti/tartine risultano confermati (recensioni + descrizione del titolare + foto). Le altre due sono da confermare o togliere: non le tolgo da solo perché potrebbero esserci davvero.

---

### 🗑️ Pagina `/bevande` eliminata — la domanda di Marco aveva una risposta nei dati

Marco: *«non so perché sia lì, non l'ho messa io a mano. Se è meglio avere una pagina a parte spostiamo le bevande dalla pagina menu, altrimenti questa pagina non serve»*.

**Che cos'era davvero.** Non una pagina di bevande: un **segnaposto vuoto**. In mezzo, a caratteri cubitali, **«LISTA IN ARRIVO»** dentro un riquadro tratteggiato, e sotto *«nel frattempo chiedi al nostro personale»*. Era però **linkata dal menu di navigazione di ogni pagina del sito** e presente in sitemap, con una descrizione meta che prometteva *«Warsteiner, König Ludwig, Rye River»* — birre che sulla pagina non c'erano.

Vale la regola di [[onesta-non-e-dichiarare-cosa-non-hai-fatto]]: «lista in arrivo» è la stessa ammissione del «non l'abbiamo ancora fatto» tolto da Saint Jack il 23/08.

**I numeri, da GSC 18/08.**

| Pagina | Clic | Impressioni | Posizione |
|---|---|---|---|
| `/bevande` | **0** | 4 | **54,0** |
| `/blog/spritz-aperitivo-trieste` | 4 | 312 | **5,9** |
| `/blog/dove-fare-aperitivo-trieste-centro` | 2 | 146 | 10,4 |
| `/blog/dove-bere-miglior-spritz-trieste` | 2 | 78 | 8,6 |

**Il lavoro che `/bevande` avrebbe dovuto fare lo stanno già facendo tre articoli del blog, molto meglio: 8 clic e 536 impressioni contro 0 e 4.** E lo fanno rispondendo a una domanda («dove bere il miglior spritz a Trieste»), non esponendo un listino.

**Perché NON spostare le bevande dal menu.** Toglierebbe un terzo delle voci alla pagina che i clienti aprono per leggere il menu, per alimentare una pagina in **posizione 54** — che non è un punto di partenza, è un'assenza ([[esperimento-solo-se-la-posizione-lo-permette]]). E chi apre «Menu» si aspetta di trovarci anche da bere.

**Fatto:** rotta cancellata · voce tolta dal menu di navigazione · voce tolta dalla sitemap · **reindirizzamento permanente `/bevande` → `/menu`** in `next.config.ts`, così le impressioni residue e qualunque link esterno non finiscono su un 404.

---

### Pagina `/menu` — tolta la scritta «Menu» dall'hero

Marco: *«c'è scritto la parola posate e sotto no servi. Che significa "posate non servono": con la scritta menu in mezzo cambia totalmente il significato»*. Aveva ragione — i tre riquadri in fila si leggevano **«Posate · Menu · no servi»**.

**⚠️ Ma quel riquadro giallo era l'unico `<h1>` della pagina.** Toglierlo e basta avrebbe lasciato `/menu` **senza nessun titolo** per Google: un danno silenzioso, in cambio di una correzione giusta.

**Fatto:** riquadro giallo eliminato — l'hero ora legge **«POSATE … NO SERVI»**, che è la battuta com'era pensata — e rimesso un `<h1>` vero, non visibile a schermo: *«Menu della Schiacciateria Retrò — Viale XX Settembre, Trieste»*.

---

### Verifiche eseguite

- `npm run build` pulito, **44 pagine statiche**, `/bevande` non compare più fra le rotte ✓
- `/menu`: **esattamente un `<h1>`**, col testo giusto; il riquadro giallo non c'è più nell'HTML servito ✓
- `/bevande` risponde **308 → `/menu`** ✓
- `sitemap.xml`: **zero** occorrenze di `bevande` ✓
- menu di navigazione servito: Home · Menu · Buffet Triestino · Blog · Chi Siamo · Contatti · Instagram ✓
- pagina buffet: zero occorrenze di *cotechino, calamari, gamberetti, sempre in vetrina, magnar, spassizzar* ✓
- `grep` su tutto `src/`: nessun riferimento residuo a `data/menu` né a `/bevande` (a parte il reindirizzamento) ✓

**⛔ Niente è stato pubblicato.** Si aspetta il via di Marco ([[pubblicare-solo-con-via-esplicito]]).

---

## 2026-08-27 — ✅ Menu caricato sulla scheda Google: 8 sezioni, 31 voci. E «Buffet restaurant» è attiva

**Il menu della scheda non è più vuoto.** Caricate tutte e 31 le voci approvate da Marco il 26/08, esattamente come nel documento di approvazione. Google conferma a ogni salvataggio: *«Your menu has been updated. The updates will be published shortly.»* Contatore finale letto nel pannello: **«Your menu — 31 items · 0 photos»**.

| Sezione | Voci |
|---|---|
| Le Nostre Schiacciate | 6 |
| Le Insalatone | 3 |
| Bruschettoni | 3 |
| Sfizi & Golosità | 2 |
| Il Giro Ignorante | 3 |
| I Nostri Dolci | 2 |
| Le Birre alla Spina | 6 |
| I Nostri Spritz | 6 |

**✅ «Birra a Rotazione» è entrata senza prezzo.** Il campo prezzo non è obbligatorio: la voce resta con la sola descrizione *«Chiedi allo staff qual è la birra del momento»*. La nota del 26/08 che la dava a rischio di esclusione è superata.

**✅ «Buffet restaurant» è passata da PENDING a attiva.** Riletto il pannello: le categorie ora sono cinque — **Bar** (PRIMARY), Pub, Restaurant, Sandwich shop, **Buffet restaurant** — senza più il badge di revisione. La modifica del 26/08 notte è confermata.

**Dato verificato di passaggio:** la descrizione della scheda, scritta dal titolare, contiene già *«schiacciata romana farcita»* e *«tartine locali»*. Google ha inoltre aggiornato da sé data di apertura (4 gennaio 2017) e telefono (375 626 4680): **entrambi i valori sono corretti**, nessun intervento.

---

### Tre errori operativi, tutti intercettati prima del salvataggio

**① Il campo «nome piatto» ha un completamento automatico che corrompe la voce.** Digitando «L'Italiana» e poi **cliccando** sul campo prezzo, il clic ha selezionato il suggerimento «Lemon Tea»: la voce è nata come `Lemon TeaMisticanza, crudo, burrata…` senza prezzo. Cancellata e rifatta.
🔑 **Regola operativa: fra un campo e l'altro si usa il tasto Tab, mai il clic.** Il Tab sposta il fuoco senza passare sopra la tendina. Da quel momento zero errori di battitura.

**② Un clic su «Add menu item» ha aperto invece la voce esistente sopra, in modifica.** Ho digitato dentro «Schiacciata alla Nutella», ottenendo `Schiacciata alla NutChifeletti alla Nutella` con le due descrizioni fuse. **Annullato senza salvare**; riletta la voce, era intatta.
**Causa:** la lista del pannello si riassesta di ~90 px fra lo screenshot e il clic successivo, quindi le coordinate lette in una chiamata sono già vecchie nella chiamata dopo.
🔑 **Regola operativa: lo scorrimento fino in fondo e il clic devono stare nella stessa chiamata.** A fondo lista le posizioni sono fisse («Add menu item» e «Add menu section» stanno a distanza costante dal bordo), quindi scorrere e cliccare insieme è deterministico. Applicata per le ultime 15 voci: nessun altro clic fuori bersaglio.

**③ Un clic è finito fuori dal riquadro e Google ha chiesto «Discard changes?».** Risposto **Cancel**, non OK: il modulo era pieno e si sarebbe perso. Salvato subito dopo.
**Causa:** lo screenshot arriva rimpicciolito rispetto alla finestra reale e il fattore di scala **cambia quando la finestra viene ridimensionata** — a inizio sessione era 1,23, poi 1,00. Le coordinate calcolate col fattore vecchio finiscono fuori.
🔑 **Il fattore di scala si riverifica guardando dove il cursore risulta disegnato nello screenshot**, non si assume.

---

### ⛔ Cosa NON è stato impostato, di proposito

**Le caselle «Vegetarian» e «Vegan» sono rimaste vuote su tutte e 31 le voci.** Sono dichiarazioni su come il piatto viene preparato — l'olio di frittura condiviso fra chifeletti e patatine basta a far decadere «vegetariano» su una voce che sulla carta lo sembra. **Solo il locale può confermarlo.** Google le usa come filtro di ricerca, quindi vale la pena chiederlo al titolare: sono due minuti di lavoro e si aggiungono dopo.

### Scostamento minimo dal documento approvato

In «Le Insalatone» l'ordine su Google è **Barcolana → Proteica → Italiana**, mentre il documento aveva Barcolana → Italiana → Proteica. Conseguenza della ricreazione dell'Italiana dopo l'incidente «Lemon Tea». Nessun contenuto cambiato; si riordina col trascinamento se dà fastidio.

### Che cosa aspettarsi, e che cosa no

Il menu compilato **non genera le categorie-piatto** della vetrina «Menu e piatti famosi»: quelle nascono dalle **fotografie**, come verificato il 26/08 sulle cinque schede a confronto. Riletta oggi la scheda «Menu highlights», le etichette che Google ha già estratto dalle foto sono: *Aperol Spritz E Hugo, Espresso, Bier, Schiacciata Romana, Tisana Buonissima, Cicchetti Con Cotto Kren*. **«Schiacciata Romana» e «Cicchetti Con Cotto Kren» sono etichette di cibo e non le avevo registrate**: la rilevazione del 26/08 («nessuna categoria-piatto») riguardava il riquadro pubblico, non questo pannello. Restano comunque poche rispetto alle cinque-sei dei concorrenti, e la leva resta fotografare i piatti con continuità.

**Il menu vale su un altro fronte:** è la corroborazione testuale che mancava. Ora la scheda dichiara «Sandwich shop» e «Buffet restaurant» **e** ha 31 voci di cibo che lo confermano.

**Prossimo controllo:** rileggere gli elenchi locali quattro settimane dopo, dal telefono a Trieste. Dato di partenza registrato: assente da tutte e otto le pagine di *street food trieste* al 25/08/2026.

---

## 2026-08-26 (notte, 2) — ❌❌ Stavo per pubblicare su Google il menu vecchio. Fermato da Marco

Marco, leggendo il documento di approvazione: *«fai attenzione a non prendere il menù vecchio: daghe un taio era nel menù vecchio… nel menù nuovo (quello che è online) non lo vedo. però ci sono i bruschettoni che non hai nominato, e i taglieri ci sono, di tre tipi, si chiamano duo retrò, muleria retrò, tavolata ignorante»*.

**Aveva ragione su tutto.** Verificato scaricando `schiacciateriaretrotrieste.com/menu`: «Daghe un Taio», «TAIER» e «Badilade» **non esistono**; ci sono Duo Retrò, Muleria Retrò, Tavolata Ignorante e i Bruschettoni.

**🔴 `src/data/menu.ts` è un file morto.** Non è importato da nessun componente (`grep` su `src/`: zero occorrenze). Il menu online è scritto in `src/app/menu/MenuClient.tsx`. Avevo trattato come fonte un file che il sito non usa più da un pezzo.

**E non era solo una questione di nomi — i prezzi erano più bassi:**

| Voce | File morto | Menu online | |
|---|---|---|---|
| Top de Gamma | 7,50 € | **8,50 €** | −1,00 € |
| Bona ma Leggera | 8,00 € | **10,00 €** | −2,00 € |
| Tre Volte Bon | 9,50 € | **10,00 €** | −0,50 € |

Avremmo messo sulla scheda pubblica prezzi fino al **20% sotto** quelli veri, letti da chi decide se entrare. Su un locale che vive di clienti di passaggio è un danno diretto, non un errore di SEO.

**❌ L'errore mio, che è di metodo e non di dati.** Avevo **notato e scritto** che `menu.ts` era fermo al 17/07 e avevo chiesto conferma. Ma ho chiesto **«i prezzi sono attuali?»** e, ricevuto il sì, ho trattato la risposta come se validasse anche **l'elenco delle voci**. Erano due domande e ne ho fatta una, poi ho esteso la risposta oltre quello che copriva.
🔑 **Regola:** quando si chiede una conferma su una fonte sospetta, la domanda deve coprire la fonte, non un attributo della fonte. «Questo listino è quello di oggi?» non è «questi prezzi sono attuali?».
🔑 **E la fonte di un sito è il sito online, non un file del repo** — vale come l'iframe/CAP del 18/08 e come le categorie lette dal riquadro pubblico stasera. Terza variante dello stesso errore in nove giorni.

**Documento riscritto** su `menu-google-da-approvare.md`, ora costruito sul listino online: **6 sezioni, 19 voci**, solo cibo.

**⛔ Birre e spritz tenuti fuori di proposito.** Il menu online ha 6 birre alla spina e 6 spritz. Caricarle rinforzerebbe il segnale «bar» che è esattamente ciò che tiene la scheda fuori dalle ricerche di cibo — stessa logica per cui non abbiamo aggiunto «Birreria» fra le categorie. Proposto a Marco, non deciso da solo.

**Decisioni aperte per Marco:** ① il listino online è quello di oggi nel locale? ② le 10 aggiunte «Robe de metter sora» dentro la descrizione di Patatine/Chifeletti o come 10 voci da 0,50 €? ③ i tre taglieri in sezione propria o dentro «Sfizi & Golosità» come sul sito? ④ birre e spritz dentro o fuori?

**Decaduta** la domanda sulle maiuscole: riguardava i nomi del menu vecchio. Nel menu online sono già scritti normalmente.

**Da fare sul sito** (Marco ha segnalato «errori vari nel sito», si lavora dopo il menu): **cancellare `src/data/menu.ts`**, che è codice morto e ha già prodotto un danno.

## 2026-08-26 (notte) — Dentro la scheda: ❌ «categoria solo Bar» era falso, e il menu è vuoto

Marco: *«la gestione la ha saintjackstudios… dal chrome di marcosaintjack puoi utilizzare l'account di saintjack studios come abbiamo fatto sempre»*. Corretto: `business.google.com/locations?authuser=1` → account `saintjackstudios@gmail.com`, **2 schede gestite** (Schiacciateria e Saint Jack Studios), entrambe verificate. La scheda si apre da `business.google.com/n/1334199882433553077/profile?authuser=1&fid=4949097406666230499` — il `fid` combacia col CID letto da fuori.

**❌❌ LA CORREZIONE PIÙ GRAVE DEL PROGETTO FINORA.** Ho ripetuto per due giorni, in tre documenti, che la scheda aveva «**una sola categoria: Bar**». **È falso.** Nel pannello le categorie erano già **quattro**:

| | |
|---|---|
| **Bar** | PRIMARY |
| Pub | secondaria |
| Restaurant | secondaria |
| **Sandwich shop** | secondaria — è la voce che in italiano si legge «Panini» |

**Perché ci sono cascato:** il riquadro pubblico di Google **mostra soltanto la categoria principale**. Le secondarie non sono visibili da fuori, su nessuna scheda. Avevo letto «Bar·» sul riquadro e l'avevo trattato come l'elenco completo.
🔑 **È la terza volta che deduco da una superficie pubblica invece di aprire la fonte** (dopo il CAP letto dentro l'iframe il 18/08 e le pagine di blocco contate come elenchi vuoti stamattina). Qui però l'errore ha diretto due giorni di piano su una leva che era già tirata.

**Conseguenza sulla diagnosi, ed è un ribaltamento.** La dichiarazione c'era già — «Sandwich shop» e «Restaurant» sono lì da prima — **e la scheda resta comunque assente da tutte le otto pagine di `street food trieste`**. Quindi il problema non era mai la casella. È che **nulla sulla scheda conferma la dichiarazione**: menu vuoto, zero categorie-piatto nelle foto, nessuna parola di cibo fra i dieci temi delle recensioni. La corroborazione era la parte giusta dell'analisi di ieri; le categorie erano la parte sbagliata.

**✅ FATTO — aggiunta «Buffet restaurant».** L'unica voce che mancava davvero, e Marco ha confermato che il buffet è una specialità. Il menu a tendina proponeva *Buffet restaurant, Wedding buffet, Children's party buffet, Sweets and dessert buffet, Banquet hall*: scelta la prima, che è quella che sulla scheda di Buffet Clai si legge «Buffet».
**Stato:** *«Your edit is pending. It usually takes up to 10 minutes to be reviewed.»* CURRENT quattro voci, PENDING cinque con `Buffet restaurant` evidenziata. **Da ricontrollare che sia stata approvata.**

⛔ **Non ho tolto nulla.** «Pub» rafforza il cassetto bar, ma rimuovere una categoria esistente non era autorizzato e toglierebbe una posizione acquisita. Solo aggiunte.

**🔴 Il menu della scheda è VUOTO.** L'editor (`Edit menu`) esiste, con tre schede *Full menu / Photos of menu / Menu highlights*, e la prima dice soltanto «**Create a menu**». Mai compilato.
→ **Cade anche la mia ipotesi di stamattina** secondo cui l'editor «Menu» si sbloccherebbe aggiungendo una categoria di cibo: c'era già con le categorie di prima.

**Il materiale per riempirlo esiste già:** `src/data/menu.ts` contiene **55 voci con prezzo** in 7 categorie reali (L'APERITIVO IGNORANTE, TARTINE TAPAS O CICCHETTI, QUELLE VENDUDE A BADILADE — SCHIACCIATE, COLLEZIONE PRIMAVERA/ESTATE, FRITO DEI EVERY DAY, LE VEGETARIANE, SCHIACCIA CON NOI).
⚠️ **Ma il file non è più stato toccato dal 17/07/2026**, commit iniziale. **Non pubblico 55 prezzi su una scheda pubblica senza conferma che siano quelli di oggi:** un prezzo su Google è un impegno verso il cliente che entra.

**Altri dati raccolti dal pannello:** 2.167 interazioni dei clienti · 5 recensioni nuove non lette · la descrizione della scheda nomina già «schiacciata romana farcita», «prosciutto cotto tagliato a mano con senape e kren», «tartine locali».

**Prossimo passo, in carico a Marco:** confermare che i 55 prezzi siano attuali (o farsi dare il listino aggiornato). Poi il caricamento del menu lo faccio io.

## 2026-08-26 (sera) — Il riquadro del browser era rotto, e l'accesso alla scheda non esiste

**① Perché i clic non arrivavano.** Il riquadro del browser interno aveva **viewport 0×0**: la pagina veniva caricata e il testo era leggibile, ma nulla veniva disegnato, quindi i clic non colpivano alcun elemento e `read_page` tornava «(empty page)». Risolto forzando le dimensioni con `resize_window` a **1280×900**. Da quel momento albero della pagina, clic per `ref` e schermate funzionano.
🔑 **Regola:** se `read_page` risponde «empty» e i clic non hanno effetto, la prima cosa da guardare è il viewport riportato in fondo alla risposta. Non è la pagina, è il riquadro.

**② Claude in Chrome ora è connesso** (Browser 1, macOS, locale). Sblocca il lavoro su Instagram Mambrini fermo dal 24/08, segnato in dashboard.

**③ 🔴 L'accesso alla scheda non c'è.** Marco ha chiesto che le categorie le sistemassi io. Non è stato possibile, e la causa non è tecnica.

Verificato dentro il suo Chrome, account `marcosaintjack@gmail.com`:
- `business.google.com/locations` elenca **0 attività**;
- nel riquadro di Google la scheda mostra «**Sei il proprietario di quest'attività?**», riga che Google propone **solo a chi non la gestisce**. A un gestore mostrerebbe «Modifica profilo», «Prestazioni», «Promuovi».

**«Vedere la scheda» non è «gestirla».** Il via del cliente esiste, ma non si è tradotto in un permesso su Google.
**Sblocco:** il proprietario attuale apre Impostazioni del profilo aziendale → **Persone e accesso** → Aggiungi → `marcosaintjack@gmail.com` come **Gestore**. Invito via mail, accettazione, fine.

⚠️ **Non ho cliccato «Sei il proprietario di quest'attività?».** Non concede accesso: apre una **rivendicazione** contro il possessore attuale, con verifica e possibile contenzioso su una scheda da 443 recensioni. Decisione di Marco, non scorciatoia tecnica.

**④ Foto generate dall'IA sulla scheda — sconsigliate, e la regola verificata.** Domanda di Marco: usare sulla scheda le immagini del sito, generate perché i piatti sono tantissimi, e fedeli a ciò che arriva nel piatto.

Letti due documenti ufficiali:
- Linee guida foto del profilo (`support.google.com/business/answer/6103862`): «*l'immagine deve rappresentare la realtà*», senza «alterazioni significative».
- Norme sui contributi (`support.google.com/contributionpolicy/answer/7400114`): i contributi «devono riflettere un'esperienza reale in un luogo»; è vietato il contenuto «non basato su un'esperienza reale».

**Nessuno dei due nomina esplicitamente le immagini generate.** Quindi è una valutazione di rischio, non una certezza normativa — e va detto così.

**Raccomandazione: non caricarle sulla scheda.** Il bene esposto sono 443 recensioni a 4,6, il guadagno sono un paio di etichette-piatto, e non servono: i clienti pubblicano già foto vere dei piatti (sette solo nelle tre recensioni in vista) e il titolare carica ogni pochi giorni. La materia prima reale esiste già.

## 2026-08-26 (pomeriggio) — «I concorrenti hanno un menu sulla scheda?» — no, hanno le foto

Domanda di Marco, entrato nel pannello. La risposta ribalta l'ordine degli interventi e **smentisce una frase che avevo scritto ieri senza verificarla**.

**Confrontate cinque schede su Maps.** «Menu e piatti famosi» non è un menu compilato dal titolare: è costruito da Google **dalle fotografie**, che il sistema riconosce ed etichetta, creando una categoria per ogni piatto che ricorre.

| Scheda | Categoria | Categorie-piatto create da Google | «Popolare» |
|---|---|---|---|
| **Retró XX settembre** | Bar | **nessuna** | Aperol Spritz e Hugo |
| Blue Boat | Panini | Baguette · Sandwich · Birra · Fritto misto · Patate fritte · Hamburger | Barcola |
| Buffet Clai | Buffet | Ravioli · Torta di mele · Gnocchi · Spaghetti · Antipasto · Pappardelle | Antipasto Misto Di Pesce |
| 040 Social Food | Hamburger | Pizza · Aperol Spritz · Cortado · Fritto misto · Hamburger | Panini |
| Love Street Food Trieste | Bar | Patate fritte | — |

Le foto della Schiacciateria si fermano alle categorie generiche (*Video, Menu, Cibi e bevande, Atmosfera*). **Zero categorie-piatto**, e l'unica etichetta estratta è un cocktail. Confermato anche dalla striscia: `Aperol Spritz E Hugo·Foto 2 di 12` è **l'etichetta di una fotografia**, non una voce di menu.

**❌ Correzione al registro di ieri.** Avevo scritto che «nessuno dei concorrenti ha curato meglio il menu». **Falso, e non verificato**: tre su quattro hanno cinque o sei categorie-piatto contro zero. L'errore è lo stesso di sempre — un'affermazione su schede che non avevo aperto.

**Conseguenza sull'ordine di lavoro.** Le fotografie salgono al primo posto, e non come «quattro scatti»: **una categoria-piatto nasce dalla ricorrenza**, quindi serve continuità. Il locale carica già foto ogni pochi giorni: va indirizzata l'abitudine sul prodotto.

**Ipotesi da verificare nel pannello, non affermata:** l'editor mostra la voce «Menu» solo per alcune categorie. È possibile che compaia **dopo** l'aggiunta di «Panini» o «Buffet». Ordine suggerito a Marco: categorie prima, poi ricontrollare se «Menu» è comparso.

**Limite dichiarato:** la scheda «Menu» di Maps non si è aperta in questa sessione (i clic non arrivano al pannello), quindi **non so** se dietro quel tab ci sia un menu strutturato. Nessuna delle cinque schede ne mostra uno con i prezzi nel testo leggibile.

## 2026-08-26 — Risposte di Marco: il piano categorie si chiude, e gli orari escono dalla lista

**Scheda ricontrollata oggi prima di scrivere:** 4,6★ su **443 recensioni** (438 il 25/08), categoria **ancora solo «Bar»**, «Menu e piatti famosi» ancora fermo su *Aperol Spritz E Hugo*, ultima foto di 10 giorni fa. **Nessuna delle quattro modifiche è stata eseguita.** Il titolare però risponde alle recensioni ogni giorno: l'ultima risposta è di ieri.

**① L'accesso alla scheda ce l'ha Marco.** Non ancora provato. L'esecuzione non passa più da terzi.

**② Che cosa è il locale, parole di Marco:** *«il locale è una schiacciateria però fa anche un buonissimo buffet e birreria e cocktails, caffè ecc ecc. però la specialità sono le schiacciate e il buffet»*.
→ **«Buffet» è confermato e si può dichiarare.** La domanda aperta dal 25/08 è chiusa.

**Il piano categorie, definitivo:**
- secondarie da aggiungere: **«Panini»** (voce usata da Blue Boat) e **«Buffet»** (voce usata da Buffet Clai). «Fast food» solo se «Panini» non compare fra le proposte dell'editor.
- **«Bar» resta principale.** Il primo dell'elenco per `street food trieste` ha «Bar» come principale, quindi la voce principale non decide da sola l'ingresso; «aperitivo» è il tema più citato dai clienti (24 menzioni); sostituirla rischierebbe posizioni già acquisite.
- **Revisione condizionata:** se a quattro settimane la scheda resta fuori dagli elenchi di cibo, la principale si sposta su **Buffet**. Sul dato, non prima.
- ⛔ **Birreria, cocktail bar e caffetteria non si aggiungono**, pur essendo vere. Ogni voce di quella famiglia rafforza il cassetto in cui la scheda è già chiusa. Le voci disponibili si spendono sul segnale che manca.

**③ Orari: decisione presa, valgono quelli della scheda Google.**
Verificato lo stesso giorno sui dati strutturati del sito in produzione: Lun-Gio 08:00→01:00, Ven-Sab 08:00→02:00, Dom 17:00→23:30, `postalCode` 34125, `geo` 45.65193/13.77987. **Combaciano esattamente con la scheda.** Nessun intervento necessario da nessuna parte — la voce esce dalla lista senza produrre lavoro.

**Documento aggiornato:** [richiesta-modifiche-google-business-profile.md](../richiesta-modifiche-google-business-profile.md).

**Resta in carico a Marco:** le quattro modifiche sulla scheda, e la lettura da telefono degli elenchi locali che Google mi ha impedito di leggere.

## 2026-08-25 — Scheda Google Business Profile: stato reale, e due mie affermazioni smentite

Marco ha ottenuto il via sulla scheda. Prima di eseguire il documento del 14/08 ho riaperto la fonte, perché quel documento aveva undici giorni ed era un'ipotesi.

**Stato della scheda al 25/08** (cid `4949097406666230499`, aperta su Maps): 4,6★ su **438 recensioni** (434 il 14/08) · categoria **ancora solo «Bar»** · 1-10 € · V.le Venti Settembre 16, **34125** ✓ · sito e telefono ✓ · servizi già dichiarati (posto, asporto, domicilio, ordinazione online) · ultima foto 9 giorni fa.

**Il quadro che conta.** Ogni segnale della scheda dice «bar», non solo la categoria:
- «Menu e piatti famosi» espone **Aperol Spritz e Hugo** e **Tisana Buonissima**. Due bevande.
- I dieci temi che Google estrae dalle recensioni: aperitivo 24 · cocktail 13 · prodotti 11 · tartine 8 · focaccia 7 · stuzzichini 7 · ragazzo 6 · cordiale 6 · atmosfera 6 · spritz 5. **«schiacciata» non c'è**, pur essendo nell'insegna. Nemmeno «panino».
- I «luoghi simili» indicati da Google: Bar Caffè Retrò, La Preferita, Caffè Aqvedotto, Bar Politeama, Cafè Erica. **Cinque bar su cinque.**

**Misura:** nell'elenco locale completo per `street food trieste` (`tbm=lcl`, otto pagine, ~70 attività, posizione forzata su Trieste) la scheda è **assente da ogni pagina**.

**❌ Due correzioni al mio documento del 14/08.**
1. Avevo scritto che «con categoria solo Bar il locale non entra in gara». **Falso.** Il primo risultato dell'elenco è **Love Street Food Trieste, categoria Bar**, 4,4 su 124 recensioni; più in basso **Cool & Camisa**, anch'essa Bar. La categoria non è una barriera all'ingresso — pesa insieme al nome, al menu della scheda e al testo delle recensioni, e su quei tre fronti la Schiacciateria non dichiara nulla di alimentare.
2. Le categorie che avevo suggerito erano **inglesi e indovinate** («Sandwich shop», «Takeout restaurant»). La tassonomia italiana vera, letta sulle schede dei concorrenti in elenco, ha **«Panini»** (Blue Boat), **«Buffet»** (Buffet Clai), «Fast food», «Hamburger», «Pizza», «Macelleria».

**❌ Terza correzione, a un errore commesso oggi.** Un primo controllo automatico su `panini trieste`, `paninoteca trieste`, `focacceria trieste`, `schiacciata trieste` e altre tre aveva restituito **«assente»** per tutte. Era un errore di misura: le risposte erano pagine di blocco da 3,8 KB, non elenchi vuoti, e il mio codice le contava come assenza. **Risultato scartato.** Vale l'aggregato che non è una diagnosi: un conteggio va aperto prima di concluderci sopra.

**Documento riscritto:** [richiesta-modifiche-google-business-profile.md](../richiesta-modifiche-google-business-profile.md). Interventi in ordine di efficacia:
1. **Popolare il menu della scheda** con le schiacciate (oggi espone due bevande) — il rapporto effetto/tempo più alto.
2. **«Panini» come categoria secondaria.** «Bar» **resta principale**, e la motivazione è nei numeri della scheda: aperitivo e cocktail sono i due temi più citati dai clienti. Togliere «Bar» rischierebbe una posizione acquisita per inseguirne una da conquistare.
3. **«Buffet» solo dopo conferma del titolare.** A Trieste è un'insegna con un significato preciso.
4. **Foto del cibo aggiornate.** Ce ne sono già di buone, ma la prima di «Cibi e bevande» è di **maggio 2023**.
5. **Risposte alle recensioni col vocabolario dei clienti** — «focaccia» e «tartine», che loro usano già, non solo «schiacciata», che non usa nessuno.

**Limiti dichiarati.** Il browser risulta a Google collegato dal **Regno Unito**; la posizione è stata forzata su Trieste via `uule` e i risultati sono coerentemente triestini, ma non sono quelli che vede una persona in centro città. Gli elenchi per `panini trieste`, `paninoteca trieste` e `focacceria trieste` **restano da leggere**: dopo la prima serie Google ha bloccato l'indirizzo con «traffico insolito». Nessun captcha è stato risolto.

**In carico a Marco:** le modifiche sulla scheda (nessuna è eseguibile dal codice) e la domanda al titolare sul «buffet».

## 2026-08-18 (sera) — Aperte le schede Google Maps: identità risolta, e una mia correzione

Marco ha chiesto di aprire i due CID trovati dall'audit. Fatto, e ha cambiato tre conclusioni.

**Quale scheda è viva.** `cid=4949097406666230499` → **"Retró XX settembre - Schiacciateria Triestina"**: 4,6★ su **435 recensioni**, foto caricate 2 giorni prima, risposte del proprietario, sito e telefono corretti, categoria **solo "Bar"** (conferma l'audit). L'altro CID (`14120738940597654687`, quello dentro l'iframe della mappa) **non risolve più**, né in forma `?cid=` né `?ftid=`: è un identificatore morto rimasto incollato nel codice.
**Nessun doppione da unificare**: cercando il locale per nome, Maps porta a una scheda sola. Il problema dei "due CID" era reale nel codice, non nella realtà di Google.

**❌ Correzione di un mio errore, già pubblicato.** Nel batch precedente avevo allineato il CAP a **34132**, prendendolo dalla stringa della mappa incorporata nel sito. Sbagliato: la scheda reale dice **34125**, cioè il valore che lo schema aveva già e che avevo cambiato io. La stringa dell'iframe era vecchia di anni.
**La lezione, che vale più dell'errore:** ho trattato un dato *dentro il codice del sito* come se fosse la fonte, invece di aprire la fonte. È la stessa regola che applichiamo alle pagine — non descrivere quello che non hai aperto — violata sul dato più facile da verificare.

**Due problemi preesistenti trovati di conseguenza:**
- **L'iframe della mappa in homepage puntava al luogo morto.** Sostituito con l'embed ufficiale della scheda viva (`0x477b6b129a22afdf:0x44aeb9deb325cae3`), preso dal pannello "Condividi → Incorpora una mappa" di Google.
- **`geo` nello schema era fuori di ~490 metri** (`45.6547, 13.775` contro `45.65193, 13.77987` reali). Corretto, a 5 decimali.
- Aggiornati anche i link "Indicazioni", che cercavano il locale col nome vecchio "Bar Retro Schiacciateria Triestina".

**Orari: il sito era sbagliato tutti i giorni della settimana.**

| | Google (scheda) | Sito (prima) |
|---|---|---|
| Lun – Gio | 08:00 – 01:00 | 08:00 – 22:00 |
| Ven – Sab | 08:00 – 02:00 | 08:00 – 00:00 |
| **Domenica** | **17:00** – 23:30 | **08:00** – 21:00 |

La domenica il sito dichiarava l'apertura **nove ore prima** di quella reale. Su decisione di Marco il sito è stato allineato alla scheda Google, che è la fonte che vede il cliente finale. Tolta anche la frase "aperti anche a pranzo" dal blocco orari, falsa di domenica.
*Nota tecnica:* nello schema una chiusura precedente all'apertura (08:00 → 01:00) è corretta — Google la interpreta come il giorno successivo.

**✅ PUBBLICATO** — commit `f8d8ec9`, online in ~60 secondi. **Verificato sul sito vero:** `postalCode` 34125 ✓ · `geo` 45.65193/13.77987 ✓ · i tre blocchi di orari nello schema ✓ · orari visibili corretti su `/menu` ✓ · l'iframe punta al luogo vivo ✓.

**Resta da confermare col cliente:** che gli orari della scheda Google siano quelli veri e aggiornati (allineati, ma nessuno li ha ancora verificati con il locale). Se il cliente li smentisce, vanno corretti **su entrambi i fronti**, scheda e sito.

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
