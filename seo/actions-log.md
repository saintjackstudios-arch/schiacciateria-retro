# Registro azioni SEO

Log cronologico di ogni azione correttiva intrapresa per la SEO del sito. Ordine: più recente in cima.

---

## 2026-08-28 (18) — 🔧 Il `lang` sbagliato su `/en`, sistemato con i route group (non pubblicato)

Marco: *«sistema il lang con i route group»*.

### Cos'era rotto

Tutte le pagine dichiaravano `<html lang="it">`, `/en` compresa. Chi la legge:
i lettori di schermo, che da lì scelgono la pronuncia — l'inglese letto con la
fonetica italiana è incomprensibile. **Google invece la ignora**: la lingua se
la ricava dal testo, e a chi mostrare cosa glielo dice l'hreflang. Quindi non
costava posizioni: era un difetto di accessibilità, non di ranking.

Non era sistemabile con una riga perché in Next il tag `<html>` si scrive una
volta sola, in `app/layout.tsx`, e quel file lo usano tutte le pagine.

### Cosa ho fatto

Letta prima la documentazione di **questa** versione
(`node_modules/next/dist/docs/…/route-groups.md` e `layout.md`), come dice
`AGENTS.md`.

Le rotte sono ora in due gruppi. Le parentesi dicono a Next che la cartella
**non entra nell'indirizzo**: `(it)/menu` resta `/menu`.

```
src/app/(it)/   layout.tsx → <Documento lingua="it">   home, menu, blog, …
src/app/(en)/   layout.tsx → <Documento lingua="en">   /en
```

Il guscio — font, schema `Restaurant`, intestazione, banner cookie, barra
mobile — è in `src/components/Documento.tsx`, **scritto una volta sola**: se
l'avessi copiato nei due layout, prima o poi sarebbe cambiato solo in uno. Lo
stesso per i metadati comuni, ora in `src/lib/metadataSito.ts`.

`menuData.ts` è uscito da `app/menu/` ed è andato in `src/lib/`: è il listino,
lo leggono tutte e due le lingue, non appartiene al gruppo italiano. **File
identico, zero righe cambiate.**

Tolta da `EnClient.tsx` la riga di JavaScript che correggeva il `lang` dopo il
caricamento, e il `lang="en"` sul `<main>`: adesso è ridondante.

### Verificato sulla build, non sul codice

- **45 pagine**, la stessa identica lista di prima. TypeScript pulito.
- `<html lang>`: **37 pagine `it`, 1 `en`.** Prima erano 38 `it`.
- Su `/en` il banner dei cookie e la barra dei tasti — che stanno **fuori** dal
  `<main>` e prima ereditavano l'italiano — adesso ereditano `en`. Erano
  l'unica cosa davvero mal dichiarata dopo il cerotto.
- I due `lang="en"` rimasti nell'HTML di `/en` sono il link «English» del
  selettore: giusto così, un link a una pagina in un'altra lingua si dichiara.
- **38 pagine linkano `/en`**, canonical, hreflang reciproco (3 per lato),
  schema `Restaurant` e `FAQPage`, sitemap 35 URL, robots: tutto invariato.
- Cambio lingua provato **nei due sensi** col selettore: `/` → `/en` arriva con
  `lang="en"`, `/en` → `/` con `lang="it"`. Nessun errore in console.
  ⚠️ Passare da un gruppo all'altro ricarica la pagina intera invece di
  navigare lato client — è scritto nella documentazione ed è il prezzo dei due
  layout radice. Su un cambio di lingua non si nota.
- Home e menu riguardati a schermo: identici. Il menu ha ancora 99 prezzi e 50
  immagini.

### Perché adesso e non prima

Col solo inglese il cerotto teneva. Col tedesco diventavano due pagine da
ricordarsi e due righe di JavaScript. **Questo è il punto in cui il cerotto
costa più della cucitura**, ed è anche il motivo per cui aggiungere il tedesco
adesso non richiede più di toccare niente di tutto questo: una cartella
`(de)`, un layout di tre righe, e il resto è contenuto.

**Non pubblicato. In attesa del via di Marco.**

---

## 2026-08-28 (17) — 🟢 PUBBLICATA la landing inglese `/en`

Marco: *«Elimina le scritte in italiano che erano di revisione e pubblica.»*

### Cancellato lo strumento di revisione

`src/app/en/traduzioneIT.ts` (183 voci) e `src/components/TraduzioneSotto.tsx`
sono **spariti dal codice**, insieme al montaggio in fondo a `EnClient.tsx`,
all'import di `next/dynamic` che serviva solo a loro, e ai 5 attributi
`data-traduci` sparsi nei riquadri rossi e nelle pronunce.

Non entravano nel pacchetto di produzione nemmeno prima (erano dietro
`process.env.NODE_ENV !== 'production'`), ma restavano nel codice: da oggi non
esistono più. **Effetto collaterale voluto: in locale la pagina inglese non
mostra più la traduzione italiana sotto ogni blocco.** Chi dovrà rileggerla in
futuro parte dal file dei contenuti, `src/app/en/enContenuti.ts`, che è
l'unico posto dove le frasi stanno tutte insieme.

Verificato sull'HTML generato: zero occorrenze di `data-traduci`,
`TraduzioneSotto`, `TRADUZIONE` in `.next/server` e `.next/static`.

### Verifiche prima del push

- `next build` pulito, 45 pagine, TypeScript senza errori.
- `/en` prerenderizzata statica (`○`), 100.698 byte di HTML.
- `<title>`, canonical `…/en`, hreflang reciproco `it-IT` / `en` / `x-default`
  presenti su **entrambe** le pagine (home e `/en`).
- Le 11 immagini della pagina rispondono tutte 200 da `/_next/image`
  (1 logo, 1 hero, 9 piatti). Nessuna rotta.
- Nessun errore in console servendo la build vera con `next start`.
- Il banner cookie e la barra mobile parlano inglese su `/en`: verificato a
  schermo, dice «WE HAVE COOKIES! / ACCEPT ALL / REJECT».

### Una correzione presa per strada

`lastmod` di `/en` in sitemap era rimasto al **27/08**, cioè al giorno in cui
la pagina è stata costruita, non a quello in cui è stata pubblicata. Portato al
**28/08**. È l'unica data che Google guarda per decidere se vale la pena
ripassare: sbagliarla significa farsi ignorare il primo passaggio.

### Chiesta l'indicizzazione a Google

Marco: *«dopo chiedi a google l'indicizzazione di questa pagina tramite il
google search console dell'account saintjackstudios»*.

Fatto dall'interfaccia di Search Console, proprietà **dominio**
`sc-domain:schiacciateriaretrotrieste.com`, account `saintjackstudios`
(`u/1`). Il pulsante «Richiedi indicizzazione» esiste **solo lì**: il token che
abbiamo in mano è in sola lettura e l'Indexing API di Google accetta soltanto
offerte di lavoro ed eventi in diretta, non le pagine normali.

Due URL messi in coda prioritaria:

| URL | Stato prima | Azione |
|---|---|---|
| `…/en` | *URL sconosciuto a Google* | ✅ indicizzazione richiesta |
| `…/` (home italiana) | *già indicizzata* | ✅ indicizzazione richiesta |

**Perché anche la home**, che era già dentro: l'hreflang funziona solo se le due
pagine si nominano a vicenda, e il rimando verso `/en` sulla home l'abbiamo
aggiunto oggi. Finché Google non ripassa dalla home, vede una dichiarazione in
una direzione sola — e quelle le ignora. Chiedere l'indicizzazione della pagina
nuova senza chiedere quella della pagina che la dichiara è un lavoro a metà.

Sitemap: inviata il 21/07, **riletta oggi 28/08, esito Success, 34 pagine
scoperte**. Non l'ho reinviata: reinviare lo stesso indirizzo non accelera
niente, Google la rilegge da sé, e l'avviso di Google dice a chiare lettere che
richiedere più volte la stessa pagina non cambia la sua posizione in coda.

Nell'ispezione, `/en` risultava *«Nessuna sitemap di riferimento rilevata»*: è
normale, la sitemap è stata letta prima che la pagina fosse online. Si
sistemerà alla lettura successiva.

**Da qui in poi non dipende più da noi.** La coda prioritaria non è una
promessa: Google ci mette da qualche ora a qualche giorno, e può anche decidere
di non indicizzare. Si ricontrolla fra qualche giorno con la stessa ispezione.

### Cosa resta aperto su questa pagina

1. `<html lang="it">` vale anche su `/en`. Mitigato dal `<main lang="en">`
   servito dal server e dall'hreflang corretto. La soluzione vera sono i route
   group di Next: **da fare prima della terza lingua**, non adesso.
2. `whatsapp_click` non è ancora un evento chiave in GA4 perché non è mai
   arrivato: **da stellare appena il primo click sul tasto «Book a table» lo fa
   comparire** in "Eventi recenti".
3. La foto della Porca Zozza mostra un piatto diverso. **Decisione di Marco del
   28/08: si tiene**, per non divergere dal menu italiano. Si risolve davvero
   con una fotografia giusta in `menuData.ts`, che aggiorna tutte le lingue.

---

## 2026-08-28 (16) — 🔍 AUDIT SEO della landing `/en` prima di pubblicarla

Fatto sull'HTML davvero generato dalla build, non sul codice sorgente.

### ⛔ Il difetto grave: `/en` era una pagina orfana

**Zero pagine del sito contenevano un link a `/en`.** Non una.

Il motivo: il selettore di lingua nel menu in alto rende i link **solo dopo il
clic** (`{aperto && …}`), e il cassetto del telefono è dentro `AnimatePresence`,
quindi montato solo quando si apre. Un motore di ricerca non clicca e non apre
cassetti: vedeva un `<button>` e basta.

Conseguenza: Google avrebbe trovato `/en` solo dalla sitemap. Una pagina che
nessuno linka riceve pochissima autorità interna, viene scansionata di rado e
non eredita niente dalla home — cioè il contrario di quello che serve a una
lingua nuova che parte da zero.

**Corretto:** il menu delle lingue adesso sta **sempre nell'HTML** e da chiuso si
nasconde con `hidden` (che toglie anche il fuoco da tastiera, quindi si naviga
esattamente come prima e non cambia niente a vedersi). Verificato dopo la
ricompilazione: **39 pagine** ora contengono
`<a hrefLang="en" lang="en" href="/en">English</a>`. Il `display` passa da `none`
a `block` al clic, come prima.

⚠️ **Vale per tutte le lingue future**: appena aggiungiamo tedesco e sloveno,
entrano da qui e sono subito linkate da tutto il sito.

### Corretto anche: i metadati non dicevano quello che dice la pagina

- La descrizione diceva **«16 minutes from the station»**, la pagina dice 15
  (misurati su Maps). Allineati.
- Descrizione, `og:description` e `twitter:description` promettevano
  **«Triestine buffet»** come cosa che serviamo. Dopo la correzione del titolare
  sui taglieri, non è vero: siamo una schiacciateria. Sostituito con
  «small plates». La parola *buffet* resta nel titolo e nel corpo della pagina,
  dove viene spiegata come falso amico — lì è informazione, non una promessa.

### Cosa è risultato a posto

| controllo | esito |
|---|---|
| `<title>` | 54 caratteri, senza suffisso del marchio ✅ |
| `description` | 154 caratteri ✅ |
| canonical | `https://schiacciateriaretrotrieste.com/en` ✅ |
| robots | `index, follow` ✅ |
| hreflang | reciproco su `/` e `/en`, con `x-default` ✅ |
| sitemap | `/en` presente ✅ |
| titoli | un solo H1, 12 H2 in ordine logico ✅ |
| dati strutturati | `Restaurant` + `FAQPage`, tutti e due validi ✅ |
| Open Graph / Twitter | completi, con immagine 1200×669 ✅ |
| immagini | 2, tutte con `alt` descrittivo ✅ |
| immagine principale | 77 KB ✅ |
| testo | ~2.725 parole ✅ |
| resa | nessuno sfondamento a 1280 né a 375 ✅ |
| generazione | prerenderizzata statica ✅ |

### 🖼️ Messe le foto dei piatti (era il punto 3 dell'audit)

**Tutte e nove le foto.** Vengono da `menuData.ts`, le stesse che usa il menu
italiano: se una viene sostituita, si aggiorna in tutte le lingue insieme. Nuovo
accesso `fotoDiMenu()` in `src/lib/prezziMenu.ts`, con la stessa regola dei
prezzi — nome sbagliato = build che fallisce.

L'`alt` non e' il nome del piatto ma il ripieno in inglese
(«Top de Gamma — mortadella, stracciatella cheese and chopped pistachio, on
Roman focaccia»): e' l'unica cosa che un motore legge di un'immagine, ed e'
la porta per la ricerca immagini in inglese. Sui taglieri il suffisso «on Roman
focaccia» non c'e', perche' li' sarebbe ridondante.

Tutte e otto in `lazy`, sono sotto la piega. L'immagine grande in cima resta
l'unica caricata subito.

### ⚠️ La foto della Porca Zozza mostra un altro piatto — tenuta comunque, per decisione del titolare

`menuData.ts` le associa `porco_tartufato.webp`. **Guardata:** dentro c'e' un
salume arrotolato, rucola, una crema bianca a puntini neri e **un tartufo nero
appoggiato sul tagliere**. La Porca Zozza e' porchetta, crema cacio e pepe,
cipolla croccante e grana — niente tartufo, niente rucola, e la cipolla
croccante non si vede. E' la foto di un piatto vecchio rimasta attaccata al nome
nuovo.

L'avevo tolta. **Marco ha deciso il 28/08 di tenerla**, per non far divergere la
pagina inglese dal menu italiano che gia' la mostra in produzione. Argomento a
favore: **le immagini del sito sono dichiarate illustrative e generate con l'IA**
(nota in fondo a ogni pagina), quindi nessuna delle nove e' la fotografia del
piatto reale, e la coerenza fra le lingue vale piu' della differenza.

La ragione e' scritta nel commento accanto alla voce in `enContenuti.ts`, con
l'avvertenza di **non "correggerla" togliendo la foto**: e' una scelta, non una
svista. La soluzione vera resta una fotografia giusta in `menuData.ts`, che
aggiorna italiano e inglese insieme.

⚠️ Nota al contrario: `estiva_per_davvero.webp`, associata a **Fit**, ha un nome
altrettanto vecchio ma la foto e' **giusta** (pomodorini, zucchine grigliate,
rucola, stracchino). Il nome del file non dimostra niente in nessuna delle due
direzioni: vanno guardate una per una.

### ⚙️ Next 16: `priority` era deprecato

Le istruzioni del progetto dicono di leggere le guide in
`node_modules/next/dist/docs/` prima di scrivere codice, e avevano ragione:
**da Next 16 `priority` e' deprecato** in favore di `preload`, e la guida
consiglia `loading="eager"` con `fetchPriority="high"` nella maggior parte dei
casi. L'immagine grande di `/en` usava `priority`: sostituito. Verificato che
nell'HTML generato non compaia piu'.

Sempre da Next 16, le qualita' ammesse di default sono solo `[75]`: tutte le
immagini della pagina usano quella.

### 🌐 Il selettore di lingua adesso dice «Language»

Prima mostrava il mappamondo e la sigla della lingua **corrente** — «IT» sulle
pagine italiane. Sbagliato in due modi: a chi non parla italiano non diceva
niente, e sembrava un'etichetta di stato invece che un comando. Chi arrivava
sul sito in inglese non aveva modo di capire che da li' si cambiava lingua.

Adesso: **mappamondo + «Language» + freccia** che ruota all'apertura. La parola
e' la stessa che usano tutti e la riconosce anche chi non parla ne' italiano ne'
inglese. Dentro, i nomi restano scritti nella lingua propria (Italiano ·
English), come da regola gia' scritta nel file.

Verificato che la barra non sfondi: a **1280** il bottone finisce a 1232 px e a
**1024** a 976, in tutti e due i casi dentro il margine. La barra resta su una
riga sola.

**Il menu resta in italiano anche su `/en`, per decisione del titolare.**

### Rimane aperto — decisioni del titolare

1. **`<html lang="it">` anche su `/en`.** Il layout radice è uno solo per tutto
   il sito. **Attenuato**: `<main lang="en">` c'è già nell'HTML servito, quindi i
   lettori di schermo leggono il contenuto in inglese, e l'hreflang è corretto.
   Google dichiara di ignorare `lang` per capire la lingua. Sistemarlo davvero
   vuol dire spostare il sito nei route group di Next: **da fare prima della
   terza lingua, non adesso.**
2. **La barra in alto resta in italiano su `/en`** (HOME, MENU, BUFFET
   TRIESTINO, BLOG, CHI SIAMO, CONTATTI). Chi legge la pagina in inglese trova
   un menu che non capisce.
3. **Zero foto dei piatti.** `menuData.ts` ne ha **48** già pronte e `/en` non
   ne usa nemmeno una. È la mancanza più grossa: su una pagina di cibo le foto
   sono metà del lavoro, e sono anche l'unico modo di entrare in ricerca
   immagini.
4. **`Restaurant` su `/en` è in italiano** (`description`, e `servesCuisine` con
   «Cucina Triestina» e «Buffet Triestino»). È lo schema unico di tutto il sito.
5. **Manca ancora la foto del dehor.**
6. ~~Il titolo dice «Buffet Food».~~ **DECISO il 28/08: resta così.** Avevo
   fatto notare che in inglese *buffet food* significa self-service, cioè
   proprio il falso amico che la pagina spiega, e che il titolo è quasi sempre
   l'unica cosa che si legge nei risultati. Marco ha scelto di tenere la parola
   nel titolo e di tenere la sezione che la spiega. **Non riproporlo.**

---

## 2026-08-27 (15) — ✏️ CORRETTA la landing `/en` sulle osservazioni di Marco (ancora non pubblicata)

Marco ha riletto la traduzione italiana affiancata e ha trovato **un errore di
fatto mio**, più una serie di righe da cambiare.

### L'errore: Duo Retrò, Muleria Retrò e Tavolata Ignorante NON sono buffet

Nel menu stanno sotto `SFIZI_ALTRI` con l'etichetta «Giro Ignorante», e li avevo
letti come piatti da buffet. **Sono schiacciate tagliate a pezzi per dividerle**:
Duo = 1 schiacciata, 1 gusto, 4 pezzi. Muleria = 2 schiacciate, 2 gusti, 8 pezzi.
Tavolata = 3 schiacciate, 3 gusti, 12 pezzi.

Conseguenze già applicate: la sezione «From the buffet» è diventata «Il Giro
Ignorante» e sta sotto le schiacciate; è sparita ogni menzione di un «banco
buffet», che non esiste; la sezione che spiega cos'è un buffet triestino resta
(serve al turista: è un falso amico) ma adesso chiude dicendo che **noi siamo una
schiacciateria, non un buffet**.

### Il servizio ai tavoli esiste

Scrivevo «there is no waiter». Falso: ci sono più camerieri. Corretto.

### Le linee dei bus, misurate su Google Maps il 27/08

Prima la pagina diceva «non c'è un autobus che valga la pena»: inventato.

| da | linea | fermata di discesa | totale |
|---|---|---|---|
| Molo dei Bersaglieri (crociere) | **9** da riva del Mandracchio (hotel Excelsior) | Via Battisti (Galleria Fenice) | **15 min** (a piedi 24) |
| Trieste Centrale | **22** dir. Cattinara, anche 6 e 36 | Portici di Chiozza | **11 min** (a piedi 15) |

**Fermata più vicina a noi: Via Battisti (Galleria Fenice), 150 m.** Ci passano
le linee **3, 6, 9, 22, 35, 36, 57, 58, B**. Sui bus urbani di Trieste si paga
appoggiando una carta contactless al lettore (verificato su triestetrasporti.it).

### Sezione nuova: «How to avoid a tourist trap in Trieste»

Marco ha chiesto di **tenere** l'intuizione dei dieci minuti verso l'interno (che
avevo segnato da togliere) e di darle una forma che Google possa vedere. È
diventata una sezione con H2 proprio, che punta a «tourist trap Trieste» e
«where do locals eat in Trieste». **Le parole sono mie: da far rileggere.**

### Due tasti nel hero + misura in GA4

`Book a table` (WhatsApp) e `Get directions` (Maps). Non è servito codice nuovo:
il listener delegato in `Analytics.tsx` riconosce già i due link e manda
`whatsapp_click` e `directions_click`. Ho aggiunto l'attributo
`data-ga-posizione`, che il listener rispedisce come parametro `posizione`:
serve a separare in rapporto i click in cima da quelli in fondo.
⚠️ **Per vederlo nei rapporti GA4 va registrata la dimensione personalizzata
`posizione`** (Amministrazione → Definizioni personalizzate). Senza, si vede
solo in DebugView.

### Altre correzioni

- FAQ «devo prenotare?»: da «no» a **«non è obbligatorio ma è consigliato»**,
  in pagina e nei dati strutturati.
- Glossario «in b»: adesso ripete le espressioni intere, «un nero in b» e
  «un capo in b».
- Tolti dal fondo pagina «niente attesa» e «nessun codice di abbigliamento»:
  non li ha detti nessuno.
- Battute aggiunte, dettate da Marco: «non siamo mica francesi 💓» sullo spritz,
  e sul conto da 50 € «hai comprato tanta birra e probabilmente anche degli
  amici nuovi».

### Corretto subito dopo, su segnalazione di Marco

- **Dal Viale il mare NON si vede.** Avevo scritto «puoi ancora vedere il mare dal
  fondo della via, devi solo girarti»: falso. Adesso dice che quello a cui
  rinunci è la vista sul mare, e che il mare c'è ancora dopo pranzo.
- **I cartellini rossi non avevano traduzione italiana.** Sono `<span>`, e lo
  strumento di revisione salta gli span di proposito (spezzerebbe a metà le
  frasi che ne contengono uno). Ho aggiunto l'attributo `data-traduci` ai
  cartellini e alle pronunce del glossario: adesso hanno il riquadro anche loro.
  Riquadri totali: **171**.

### ✅ GA4: dimensione `posizione` registrata — e come si entra

Registrata il 28/08 in **SaintJack Studios › Schiacciateria Retrò Trieste**:
dimensione personalizzata **«Posizione del link»**, ambito **Evento**,
parametro `posizione`. Da adesso in rapporto si separano i click su `hero`,
`come-arrivare`, `orari` e `footer`. Non è retroattiva.

⚠️ **Il modo di entrare, che mi è costato mezz'ora.** Le proprietà dei clienti
NON si vedono dall'account Google predefinito: quello apre *villa marittimi*, e
ogni clic sul selettore in alto apre il riquadro bloccante «My email
communications», che si chiude solo scrivendo le preferenze email dell'account.
**Le proprietà dei clienti stanno su `saintjackstudios@gmail.com`, che è
`authuser=1`.** Si entra diretti, senza toccare il selettore:

```
https://analytics.google.com/analytics/web/?authuser=1#/a399948947p547590126/admin/customdefinitions/hub
```

`a399948947` = account SaintJack Studios · `p547590126` = Schiacciateria Retrò
Trieste. Con `authuser=1` il riquadro delle email non compare.

### ⚠️ `whatsapp_click` non è un evento chiave, e non lo si può ancora rendere tale

Controllato lo stesso giorno. Eventi chiave attivi: `directions_click` ⭐ e
`phone_click` ⭐. Negli eventi ricevuti negli ultimi 28 giorni ce ne sono otto —
`click`, `directions_click`, `first_visit`, `page_view`, `phone_click`,
`scroll`, `session_start`, `user_engagement` — e **`whatsapp_click` non c'è:
nessuno ha mai cliccato un link WhatsApp sul sito.** GA4 non permette di
stellare un evento che non ha mai ricevuto (verificato: sotto «Custom
configurations» ci sono solo *Custom events* e *Modifications*, nessuna
creazione per nome).

Conta perché **il tasto nuovo «Book a table» del hero porta proprio su
WhatsApp**: al primo clic vero l'evento comparirà nell'elenco e da quel momento
si potrà mettere la stella. **Da ricontrollare dopo la pubblicazione.**

### Confermato dal titolare il 28/08

- **I tavoli dentro ci sono**, ma si usano soprattutto d'inverno: d'estate si sta
  tutti fuori. Non è più una mia deduzione, ed è finito in pagina con la
  stagione, che a un turista serve saperla prima di venire a luglio.
- **I posti di carico/scarico dopo le 20:** Marco sa che si liberano, ma non
  vuole prendersi una responsabilità che non ci compete. **Non è stato scritto.**
  La pagina continua a dire solo di leggere il cartello dei posti blu.

### Confermato il 28/08 — le note delle birre

Marco ha confermato le cinque righe di descrizione delle birre (*quella facile ·
secca e amara · forte, stile belga · torbida apposta · se vuoi un consiglio è
questa*). Le avevo dedotte dallo stile scritto sul menu senza averle assaggiate,
ed erano segnate come mie: adesso non lo sono più.

Restano da verificare due cose che dipendono dal locale e non dal menu:
**«cinque alla spina più una che ruota»** è ancora vero? La forbice di prezzo si
aggiorna da sola da `menuData.ts` e non va toccata.

### ⚠️ Due «spie» della sezione trappole erano autogol — sostituite

Marco le ha viste subito, e aveva ragione tutte e due le volte.

| tolta | perché | messa al suo posto |
|---|---|---|
| «un menu stampato in sei lingue…» | **le sei lingue le stiamo facendo noi**: la pagina che il turista sta leggendo è una di quelle | «una cucina sola che fa pizza, sushi e paella non è brava in nessuna delle tre» |
| «se c'è qualcuno fuori che ti invita a entrare…» | i camerieri di Retrò **lavorano nel dehor tutto il giorno**. Che non abbordino nessuno lo sa il titolare; il turista che arriva sul Viale vede solo gente in piedi davanti a un locale | «se sul menu non ci sono i prezzi, il prezzo lo decidono dopo averti visto» |

La terza — la sala piena di gente che parla la lingua del posto alle quattro del
pomeriggio — Marco l'ha approvata e resta.

**Le due nuove sono state verificate contro il menu vero:** `menuData.ts` non
contiene né pizza né sushi né paella (zero occorrenze), e **tutti e 27 i piatti
hanno un prezzo**. Descrivono l'opposto di questo locale, quindi la lista adesso
è una vanteria mascherata invece di un autogol.

**Regola che ne esce:** una lista di «come riconoscere un posto brutto» va
sempre riletta come se la scrivesse un concorrente, cercando quali righe
colpiscono il cliente stesso.

### Stato

Build pulita, `/en` ancora prerenderizzata statica, nessun errore in console,
nessuno sfondamento orizzontale a 1280 né a 375. **Non pubblicata.**
Restano 18 riquadri arancioni (righe scritte o dedotte da me) da far decidere a
Marco; i 4 rossi non ci sono più. `traduzioneIT.ts` e `TraduzioneSotto.tsx`
**vanno cancellati prima di pubblicare**: sono strumenti di revisione locale e
non entrano nel pacchetto di produzione (verificato con grep sulla build).

---

## 2026-08-27 (14) — 🔨 COSTRUITA in locale la landing inglese `/en` (non pubblicata)

Marco: *«all'interno della landing page di lingua diversa si mettono tutte le
informazioni… non possiamo sapere come arrivano. Comincia dall'inglese»*.

Contenuti **dettati da lui** (schiacciata, buffet, cosa bere, prezzi, come si
arriva, disclaimer, risposte FAQ). Io ho scritto in inglese e costruito.

### Le distanze: misurate, non stimate

Il sito **non diceva da nessuna parte** quanti minuti siamo da qualcosa. Adesso
sì, misurate su Google Maps il 27/08 (percorso a piedi):

| da | tempo | distanza |
|---|---|---|
| Molo dei Bersaglieri (crociere) | **24 min** | 1,7 km |
| Trieste Centrale | **16 min** | 1,0 km |
| Piazza Unità d'Italia | **16 min** | 1,1 km |
| Aeroporto TRS → Centrale (treno) | **29-32 min** | + i 16 a piedi |
| Geparkom (parcheggio) | **< 1 min** | è accanto |

⚠️ Il parcheggio si chiama **Geparkom Trieste XX Settembre**, Via Spiro Tipaldo
Xydias 6. L'articolo italiano `dove-parcheggiare-trieste-sera.md` lo chiama
«GePark»: **nome sbagliato, da correggere.**

### Struttura tecnica (è questa che vale, non la singola pagina)

- `/en` — indirizzo suo, pagina statica, **non** traduzione automatica
- **hreflang reciproco** `it-IT` / `en` / `x-default` su `/` e su `/en`
  — è esattamente l'errore a senso unico trovato su Villa Marittimi
- selettore di lingua in `SelettoreLingua.tsx`, in testata e nel cassetto mobile
- `src/lib/prezziMenu.ts`: **i prezzi restano solo in `menuData.ts`.** Le pagine
  in lingua chiedono il prezzo per nome del piatto. Se un nome sparisce **la
  build fallisce** invece di mettere online un prezzo inventato
- FAQ in `FAQPage` JSON-LD, generate dalla stessa lista del testo visibile
- `/en` in sitemap
- banner cookie e barra mobile ora parlano inglese su `/en`: **GA4 non parte
  senza consenso**, e un turista che non capisce il banner non lo clicca — cioè
  perdiamo proprio la visita che questa pagina serve a portare

### Verifiche

`npm run build` pulito, `/en` prerenderizzata statica. Nessun errore in console.
Prezzi letti davvero da `menuData.ts` (€8.50 / €10.00 / €6.00 / €12.00 / €16.00).
Nessuno scorrimento orizzontale a 1280 e a 375. `lang` corretto su entrambe.
Trovato e corretto un errore di idratazione nella barra mobile (il layout radice
è generato una volta sola e non conosce il percorso).

### 🔴 Marco: «mi sembra che hai scritto delle stronzate» — aveva ragione

Chiesta una traduzione italiana per poter controllare l'inglese. Costruita
`/en/controllo`: inglese vero a sinistra, traduzione **letterale** a destra,
piu' un'etichetta per riga — *detto da te* / *dato verificato* / **scritto da me**.
Solo in locale: in produzione la rotta risponde **404** (verificato nel
`.meta` della build), piu' `noindex`, fuori da sitemap, nessun link.

**Le 56 righe del confronto sono state verificate una per una contro l'HTML
davvero servito**, non contro il sorgente: se una frase non esistesse in
pagina, il controllo fallirebbe.

**11 righe mie, 4 da togliere.** Il problema non e' l'inglese: e' che avevo
scritto cose che nessuno mi aveva detto.

**Lo schema, ed e' sempre lo stesso:** tre volte in una pagina sola ho
insinuato che i locali delle Rive e di Piazza Unita' siano cari perche' stanno
li'. *«e' tutto qui il motivo per cui i prezzi sono questi»*, *«la maggior parte
dei turisti non arriva mai cosi' all'interno, ed e' per questo che i prezzi
cambiano»*, *«dieci minuti piu' dentro rispetto a dove si fermano le guide»*.
Nessuna delle tre e' di Marco. Sono frecciate ai concorrenti su una pagina
pubblica, e non aggiungono niente a chi legge.

**Due fatti operativi inventati per deduzione:** «non c'e' un cameriere» e «ci
sono tavoli dentro». Nessuno dei due me li ha detti nessuno.

**Piu' una riga sbagliata e basta:** «non c'e' un autobus che valga la pena»
dalla stazione. Non ho verificato nessuna linea, e chi ha una valigia
l'autobus lo vuole.

⚠️ **Regola per le prossime sette lingue.** Il rischio del multilingua non e'
la grammatica: e' che il cliente **non puo' rileggere** quello che pubblichiamo
a nome suo. Ogni lingua deve avere la sua pagina di controllo prima del via.

---

### Le tre risposte mancanti — arrivate lo stesso giorno

- **vegetariani, tutti confermati**: oltre a *Fit*, anche Bruschettone Classico,
  Patatine Fritte, Chifeletti, Schiacciata alla Nutella, Chifeletti alla
  Nutella. L'olio condiviso non è un problema. La FAQ inglese ora li **elenca
  per nome**. Sblocca anche le caselle Vegetarian delle 31 voci sulla scheda
  Google, lasciate vuote proprio perché mancava questa conferma
- **Geparkom: 8:00-20:00.** Chi viene a cena lo trova chiuso all'uscita — era
  una trappola vera, ed è scritta in pagina prima che uno parta. Con la parte
  utile della risposta: dalle 20 la gente torna a casa dal lavoro e i posti in
  strada si liberano.
  ⚠️ **Scritto più prudente di come me l'ha detto.** Marco ha nominato anche i
  posti di carico e scarico: non li ho messi. Se un turista prende la multa, la
  colpa la dà al locale che gliel'ha consigliato. La pagina dice di leggere il
  cartello delle strisce blu
- **il dehor è vero e c'è tutto l'anno**: nuova sezione *Where you sit* + FAQ.
  🔴 **Manca la foto.** Fra le immagini del sito non ce n'è nessuna dei tavolini
  fuori; l'unica del Viale è invernale e vuota. Non ne ho generata una: sarebbe
  una foto finta di un posto vero, ed è quello che il turista viene a
  controllare. Serve una fotografia col telefono
- **il micro-glossario**: Marco si è offerto di farsi intervistare sulle parole

---

## 2026-08-27 (13) — 🔴 Avevo torto sul tedesco, e l'esperimento era già stato fatto

→ `seo/lingue-decisione.md`

Marco ha smontato il ragionamento di stamattina: *«non è detto che adesso ci sono
poche visualizzazioni dalla Germania. Se mettiamo un articolo che parla tedesco…
non possono salire se stessa cosa»*.

**Ha ragione, ed è un errore di ragionamento, non di dato.** Misuravo la domanda
tedesca su un sito che non ha una parola di tedesco: il numero non poteva che
essere zero. E **il tedesco non è la Germania, è l'Austria.**

### I dati di Trieste, non i nostri

Trieste 2025: oltre **2 milioni di presenze** (+11,3%); stranieri **60%** in
regione; 2024: **441.000 presenze straniere**, e i primi sono **austriaci,
tedeschi, statunitensi**. Arrivi austriaci **+24,9% dal 2019**; ricerche su
Booking **dall'Austria +156%, dalla Germania +144%**. Crociere 2025: **131 scali,
455.000 passeggeri**; nel 2026 fra le 22 compagnie c'è **TUI Cruises**, che è la
compagnia del mercato tedesco.

📌 **Olandese e russo non compaiono in nessuna classifica di Trieste.**

### ⛔ Ma Villa Marittimi la pagina inglese ce l'ha già, e fa zero

`villamarittimi.com/en`: risponde **200**, è **linkata dalla home**, è **nella
sitemap**, ha lo hreflang, 832 parole, nessun noindex.
**In 12 mesi: zero impressioni.** Su un sito che ne ha fatte 16.246.

🔧 **Difetto trovato: lo hreflang è a senso unico.** `/en` punta alla home
italiana, **la home non punta a `/en`**. Google richiede la reciprocità: senza,
lo hreflang viene ignorato. Da correggere a prescindere.

⚖️ Ma non si trasferisce tale e quale: Villa Marittimi vende **una villa per
feste private**, mercato straniero quasi inesistente. Un locale dove si mangia ha
dietro 455.000 crocieristi. **Non prova che le pagine in lingua non funzionano:
prova che non basta pubblicarle.**

### Proposta: due lingue, non cinque, con scadenza

**Inglese + tedesco.** L'inglese non è la lingua degli inglesi, è la lingua di
ripiego di tutti (sloveni, ungheresi, olandesi, spagnoli). Il tedesco è l'unica
seconda lingua con un mercato che la giustifica da sola.

**No a spagnolo, russo, olandese:** per due non c'è il dato, e per tutti e tre
**nessuno di noi può rileggere quello che pubblichiamo in nome del cliente**. Un
prezzo o un allergene sbagliato è un problema di Davide. **Anche la pagina tedesca
va fatta rileggere da chi il tedesco lo parla, prima di pubblicare.**

**Con scadenza:** due pagine, hreflang reciproco, in navigazione, e **si rilegge
la Search Console dopo 8 settimane**. Se il tedesco fa zero come `/en` di Villa
Marittimi, ci si ferma avendo speso due pagine.

---

## 2026-08-27 (12) — 🟢 PUBBLICATA la correzione dello spritz. E GA4 finalmente parla

Marco: *«pubblica la correzione dello spritz e prenditi l'accesso per la
schiacciateria»*, con lo screenshot del selettore GA4.

### Online

Ramo `correzione-spritz`, merge `--no-ff`, commit `3a384be`. Deploy Vercel
`success` in ~1 minuto. **Verificato in produzione:**

- titolo: «Spritz a Trieste: cosa ti arriva se ordini uno spritz» (53 caratteri)
- «never orange» e «non è arancione»: **spariti da tutte e tre le pagine**
- «spruzzato»: presente
- H1 visibile allineato al titolo

### GA4: la risposta alla domanda di Marco è **7**

Proprietà **`547590126`** (Schiacciateria Retrò Trieste, account SaintJack
Studios `399948947`). Ora tutti e cinque i siti hanno il numero in `siti.json`.

**`directions_click` = 7. `phone_click` = 2.** Dal 01/07/2026, tutti ad agosto.

| dettaglio | |
|---|---|
| da quale pagina | **home 5**, `/contatti` 2 |
| da quale canale | Direct 3, Organic Search 2, **Organic Social 2** |
| lingua del browser | italiano 4, **tedesco 2**, spagnolo 1 |
| in che giorni | 14, 16, 17, 19, 20 agosto — **poi più niente** |

⚠️ **È un minimo, non il totale:** il tag GA4 non parte finché la persona non
accetta i cookie. GSC conta 241 clic da ricerca, GA4 ne vede 94 di sessione
organica: **stiamo misurando circa il 40% delle persone.**

### E il resto di GA4 dice cose che GSC non poteva dire

- **`/menu` è la pagina più vista: 198 visualizzazioni contro 177 della home.**
- **Il blog fa 13 visualizzazioni su 391 in totale.** In GSC risulta il 38% delle
  impressioni; nella realtà **è il 3% di quello che la gente guarda**.
- Utenti: luglio 15 → **agosto 114**.
- Canali: Organic Search 94 sessioni, Direct 56, **Organic Social 24**, e
  **2 sessioni da «AI Assistant»**.
- Stranieri: **35 utenti su 129**, cioè il 27% — molto più del 7,8% che si vedeva
  dalle impressioni in GSC.

---

## 2026-08-27 (11) — Sbloccate le recensioni: 100 su 444, con le critiche

Marco: *«l'account di Saint Jack studios ha l'accesso come gestore»*. **Vero, ma
non su quello che stavo usando.**

### L'accesso: due account, non uno

`marcosaintjack@gmail.com` (l'account principale del Chrome) **non ha accesso**
alla scheda: `business.google.com/locations` elenca 0 attività, e nel riquadro di
Google compare «Sei il proprietario di quest'attività?», la riga che Google mostra
solo a chi non gestisce.

✅ **L'accesso è su `saintjackstudios@gmail.com` = `authuser=1`**, come già
scritto nel registro del 27/08 (voce menu). Link che funziona:

    business.google.com/n/1334199882433553077/reviews?authuser=1

### Come si leggono davvero

Il pannello sta **dentro un iframe di Google Search**, ma l'iframe è leggibile da
script. Da lì: espandere i «View full review», leggere `[aria-label="Review"]` e
il voto da `"N out of 5 stars"`, scorrere il contenitore. **Carica 100 recensioni
e si ferma.** L'ordinamento «Lowest rating» funziona col mouse ma non da script.

⚠️ Quindi le 100 raccolte sono **le più recenti**, non le peggiori: le critiche
più vecchie non ci sono. Per averle: aprire quel link e scegliere «Lowest rating».

### Cosa è uscito

→ `seo/materiale-clienti/recensioni-critiche-e-straniere.md`

**Su 100:** 5★ 84 · 4★ 12 · 3★ 1 · 2★ 0 · **1★ 3**.

- 🔴 **Una critica da 1★ di una settimana fa, in russo, senza risposta.** Servizio
  1/5, 15 minuti di attesa, e «le patatine le servono in una lattina di
  pomodoro». Davide risponde a tutti in poche ore; a questa no.
- **Il caso Eleonora Graziano (3★)** è il più istruttivo: Davide le ha risposto
  coi «14 gusti di cicchetti, 10 tipi di schiacciate», e **lei ha replicato che
  non era quello il punto** — «poca scelta» voleva dire *non è una caffetteria*.
  Era entrata aspettandosi caffè e brioche. **Problema di aspettativa, e
  l'aspettativa si governa prima, sul sito e sulla scheda.**
- **Il prezzo lo dichiarano i clienti:** 55 su 100 hanno indicato quanto hanno
  speso. **27 dicono 10-20 €, 24 dicono 1-10 €.** Sul sito la cifra non c'è.
- **Il tema numero uno non è il cibo, è il personale: 33 citazioni su 100**
  (schiacciata 29, birra 23). E anche le due critiche col testo parlano di
  servizio. Il sito non nomina nessuno che ci lavora.

### Turisti e lingue

→ `seo/turisti-e-lingue.md`

Marco pensava che Google traducesse il sito da solo. **Non lo fa:** Chrome offre
la traduzione al lettore *dopo* l'arrivo, ma Search indicizza la pagina nella
lingua in cui è scritta. Chi cerca in inglese non ci trova.

- **Zero recensioni in tedesco su 100** (spagnolo 3, inglese 2, croato 1, sloveno
  1, russo 1). Germania: 24 visualizzazioni in sei settimane. **Contro la versione
  tedesca non c'è solo il costo: non c'è la domanda.**
- Nessuna delle otto straniere dice di aver trovato il locale dal sito. Lucija
  (croata) è passata davanti — «siamo venuti a Trieste **per un'ora**» — e nomina
  **il parcheggio**. Matias (spagnolo) arriva col metro di **All'Antico Vinaio**.
  Joe H (inglese) lo posiziona come **craft beer**, non come schiacciata.
- ⛔ **Sul titolo della scheda:** contiene già «Schiacciateria Triestina». Non
  allargarlo: infilare parole chiave nel nome è contro le regole di Google e la
  sanzione è la sospensione — di una scheda da **444 recensioni e 2.185
  interazioni**.

### GA4: la domanda di Marco è senza risposta, e il motivo è preciso

*«Quante volte è stato cliccato l'evento delle indicazioni stradali?»*

Non ho potuto contarlo. **L'API dei dati funziona** (verificata su Saint Jack e
Villa Marittimi) **ma serve il numero della proprietà**, e quello di Schiacciateria
non è in `strumenti/siti.json`. L'API che elenca le proprietà (**Admin API**) è
**disabilitata nel progetto Cloud 455385472194**, e l'interfaccia di GA4 non apre
il selettore delle proprietà sotto automazione.

✅ Trovata e registrata quella di **Villa Marittimi (`538978354`)**, che pure
mancava: aggiunta a `siti.json`.

⚠️ **Due cose da sapere prima di promettere numeri a Davide:**

1. **L'evento parte solo dopo il consenso ai cookie.** In
   `src/components/Analytics.tsx` il tag GA4 non si carica finché la persona non
   accetta (`if (!consented) return null`). Chi rifiuta o ignora il banner **non
   viene contato**. Qualunque numero usciremo è un minimo, non il totale.
2. Al 13/08, come già scritto nel registro esperimenti, `directions_click` aveva
   **zero eventi** e non era ancora marcabile come evento chiave.

---

## 2026-08-27 (10) — 🟠 NON PUBBLICATO. Corretto lo spritz, letti i numeri veri

Marco: *«lascia stare quella cagata dello spritz, non è mai arancione. Non so da
dove cazzo è uscita»*. **Correzione fatta in locale, in attesa del via.**

### Da dove era uscita

Dal file stesso, riga 12 di `spritz-aperitivo-trieste.md`:

> «Se su Reddit o sui forum di viaggio cerchi consigli su dove bere a Trieste, la
> risposta unanime dei locals è sempre questa: "Never orange. Spritz bianco".»

Un modo di dire dei forum di viaggio, ripetuto come se fosse una regola del
locale. Nessuno l'aveva verificato con chi sta al banco.

### Cosa è vero, dettato da Marco

Nove volte su dieci chi a Trieste dice «uno spritz» intende quello bianco (vino
bianco, acqua frizzante, fetta di limone). **Non vuol dire che l'arancione non si
venda**: lo spruzzato e lo spritz Campari si fanno normalmente, basta chiederli.
È un'abitudine di ordinazione, non un divieto.

### E lo conferma una recensione

Claudia Lorenzon, 6 mesi fa, 5 stelle: *«…non un ottimo Spritz…»*. Risposta del
titolare: *«Cercheremo di migliorare anche lo spritz cosi da essere perfetti!!!»*
Lo spritz al Retrò si beve, e il titolare sa che è migliorabile. Un articolo che
dichiarava una regola assoluta sullo spritz era doppiamente esposto.

### File toccati (3, nessuno pubblicato)

| File | Cosa |
|---|---|
| `spritz-aperitivo-trieste.md` | titolo, excerpt, apertura, riga del Reddit **tolta**, FAQ |
| `movida-trieste-giovani-guida.md` | la riga «non arancione» |
| `dove-bere-miglior-spritz-trieste.md` | «per decenni esclusivamente» → «per generazioni di riferimento» |

Verificato: `grep` su tutto `src/` non trova più «non è arancione» né «never
orange». Frontmatter valido 28/28. Titolo 53 caratteri, excerpt 151.

### Le recensioni: 8 su 444, e il perché

→ `seo/materiale-clienti/recensioni-google.md`

Google non lascia leggere l'elenco a un programma: dopo 8 recensioni il server
smette di rispondere, e i pulsanti «Ordina» (che ha il filtro per stelle),
«Cerca tra le recensioni» e i temi ricevono il clic ma non si aprono. Il canale
dati diretto risponde `403`. TripAdvisor (24 recensioni) restituisce pagina
bianca sia da programma sia dal browser di Marco.

✅ **La via che funziona: la scheda da titolare**, dove l'elenco si filtra per
stelle. Serve che entri Davide o Marco. Le 8 raccolte sono **tutte positive**:
non sono un campione delle critiche e il file lo dice a chiare lettere.

### I numeri di Search Console

→ `seo/ricerche-non-brand.md`

- Il sito ha **sei settimane** (primo commit 17/07/2026). Luglio 1.856
  visualizzazioni / 83 clic → agosto **3.338 / 158**, posizione da 6,1 a 5,4.
- **237 ricerche non di marca in prima pagina portano 9 clic.** Su «bar viale 20
  settembre trieste» il sito è in posizione **1,2** con **zero** clic: sopra c'è
  la mappa e il dito va lì.
- Blog: 38% delle visualizzazioni, **11% dei clic**.
- Estero 7,8%, ma Austria clicca al **14,3%** e Germania al **12,5%** contro il
  4,4% italiano. **Stati Uniti: 24 visualizzazioni, 0 clic.** Ricerche in inglese
  trovate in tutto: 18, quasi tutte «… near me».
- Mobile 88%.

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
