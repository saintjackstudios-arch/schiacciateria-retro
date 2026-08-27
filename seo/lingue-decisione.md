# Le lingue: cosa dicono i dati, e cosa cambio di quello che avevo detto

Scritto il 27/08/2026, dopo che Marco ha smontato il mio ragionamento.

---

## ⚠️ Prima cosa: avevo torto sul tedesco

Stamattina avevo scritto *«il tedesco lo escluderei, zero recensioni in tedesco
e 24 visualizzazioni dalla Germania»*.

**Marco ha risposto con l'obiezione giusta:**

> «non è detto che sia adesso ci sono poche visualizzazioni dalla Germania. Se
> invece mettiamo un articolo che parli tedesco… **non possono salire se stessa
> cosa**»

Ha ragione, ed è un errore di ragionamento, non di dato. **Stavo misurando la
domanda tedesca su un sito che non ha una parola di tedesco.** È come contare
quanti clienti chiedono il menu vegetariano in un locale che non ne ha uno. Il
numero sarà sempre zero, e non dimostra niente.

E ha aggiunto la cosa che mi era proprio sfuggita: **il tedesco non è la
Germania, è l'Austria.**

---

## Cosa dicono i dati di Trieste (non i nostri)

| dato | fonte |
|---|---|
| Trieste 2025: **oltre 2 milioni di presenze**, +11,3% | Regione FVG |
| Stranieri = **60% delle presenze** in regione | PromoTurismoFVG |
| Trieste 2024: **441.000 presenze straniere** | Regione FVG |
| I primi per numero: **austriaci, tedeschi, statunitensi**, poi ungheresi, britannici, francesi | Regione FVG |
| Arrivi austriaci **+24,9% dal 2019**, presenze +18,6% | Regione FVG |
| Ricerche su Booking **dall'Austria +156%, dalla Germania +144%** | Booking.com |
| Crociere 2025: **131 scali, 455.000 passeggeri** | Autorità Portuale |
| Crociere 2026: 128 scali, ~380.000 passeggeri, **22 compagnie** fra cui **TUI Cruises** | Autorità Portuale |

➡️ **Il primo mercato straniero di Trieste parla tedesco.** E TUI Cruises, che
scala a Trieste, è la compagnia del mercato tedesco.

📌 **Olandese e russo non compaiono** in nessuna classifica delle nazionalità di
Trieste. L'unico segnale russo che abbiamo è la recensione da 1 stella.

---

## E i nostri dati adesso lo confermano

Da GA4 (proprietà `547590126`, dal 01/07/2026), che stamattina non riuscivo a
leggere:

**Dei 7 clic su «indicazioni stradali», 2 vengono da browser in tedesco e 1 in
spagnolo.** Tre su sette da stranieri.

E la durata media della visita, per lingua del browser:

| lingua | utenti | durata media |
|---|---|---|
| **tedesco** | 8 | **305 secondi** |
| francese | 2 | 419 s |
| italiano | 83 | 212 s |
| inglese | 22 | 179 s |
| spagnolo | 3 | 25 s |

**I tedeschi sono quelli che stanno di più sul sito. Su un sito che non possono
leggere.** Otto persone sono poche, ma stanno cinque minuti su pagine in una
lingua che non capiscono, e due di loro hanno chiesto le indicazioni stradali.

---

## ⛔ Villa Marittimi: NON era un esperimento (correzione di Marco)

**Villa Marittimi ha una pagina in inglese: `villamarittimi.com/en`.**

Verificato oggi, uno per uno:

- risponde **200**, è viva
- è **linkata dalla home** (voce «ENGLISH»)
- è **dentro la sitemap**
- ha lo **hreflang**, 832 parole
- **non è bloccata da noindex**

**In 12 mesi: zero impressioni.** Non poche — **zero**. Su un sito che nello
stesso periodo ne ha fatte 16.246 su 41 pagine.

🔧 **E ho trovato il difetto:** lo hreflang è **a senso unico**. `/en` punta alla
home italiana, ma **la home italiana non punta a `/en`**. Google richiede che il
collegamento sia reciproco: quando manca, lo hreflang viene **ignorato**. Da
sistemare a prescindere da tutto il resto.

### ⚠️ E Marco ha smontato anche questo, correttamente

> «lascia perdere perché su villa marittimi non ha funzionato… **ho creato la
> pagina e l'ho messa lì**, non so neanche se è collegata come dovrebbe, **non ci
> ho fatto nessuna operazione di SEO, niente di niente**»

Ha ragione: **non è un esperimento fallito, è un esperimento mai iniziato.** E lo
hreflang rotto che ho trovato lo dimostra — la pagina non è mai stata collegata
davvero. **Uno zero da una pagina abbandonata non dice niente su una pagina
curata.**

⚖️ **In più il mercato non c'entra niente col nostro.** Villa Marittimi vende
**una villa per feste private**: uno straniero che organizza un diciottesimo a
Trieste è un mercato quasi inesistente. Un locale dove si mangia è un'altra cosa:
dietro ci sono **455.000 crocieristi e 441.000 presenze straniere** che devono
pranzare da qualche parte.

**Quindi non è la prova che le pagine in lingua non funzionano. È la prova che
non basta pubblicarle.**

---

## ✅ La proposta, dopo due mie correzioni

> ⚠️ **Seconda correzione, 27/08 sera.** Avevo scritto a Marco che tante pagine
> tradotte rischiavano lo *scaled content abuse* di Google. **Sbagliato, e l'ho
> verificato leggendo il testo invece di ripeterlo a memoria.** In quella regola
> la traduzione compare una volta sola:
>
> > «**Scraping** feeds, search results, or other content to generate many pages
> > (including through automated transformations like synonymizing, **translating**,
> > or other obfuscation techniques), where little value is provided to users»
>
> Parla di **prendere contenuto altrui** e passarlo al traduttore per fabbricare
> pagine. Non di tradurre il proprio sito per i propri clienti. Dall'altra parte
> Google **incoraggia** i siti multilingua e spiega come si fanno: *«Use different
> URLs for each language version of a page»*, `hreflang`, sitemap, una lingua per
> pagina.
>
> ➡️ **Il consiglio di differenziare ogni pagina resta, ma per qualità, non per
> paura di una sanzione.**

E cade anche l'altra obiezione che avevo messo: *«nessuno di noi può rileggere il
russo»*. **Le lingue le scrivo e le rileggo io.** Valeva per un traduttore
comprato a cui nessuno controlla il lavoro, non per questo caso. **Quello che
resta da verificare non è la grammatica: sono i fatti** — prezzi, allergeni,
orari — che comunque non si traducono, si copiano.

### Le lingue, ordinate per segnale reale

Dai **42 paesi esteri** che hanno visto il sito in 12 mesi, più i dati della
città:

| lingua | perché |
|---|---|
| **inglese** | 24 USA + 21 UK, ed è la lingua di ripiego di tutti gli altri |
| **tedesco** | Austria e Germania sono il **primo mercato straniero di Trieste** |
| **sloveno** | 76 impressioni, **6 clic** — il vicino che arriva in giornata |
| **croato** | **102 impressioni**, il paese estero numero uno per volume |
| **spagnolo** | 20 impressioni, e **3 recensioni** su 100 |
| **ungherese** | 10 impressioni, e gli ungheresi crescono in tutta la regione |
| **olandese** | 13 impressioni, 1 clic — **avevo detto di no anche qui, e sbagliavo** |
| **francese** | 6 impressioni, ma la permanenza media più lunga del sito |

### 🈶 Sull'Asia c'è un fatto strutturale

| paese | impressioni |
|---|---|
| Corea del Sud | 2 — **e 1 clic** |
| Taiwan | 1 |
| Vietnam / Malesia | 3 / 1 |
| Giappone | **0** |
| **Cina** | **0** |

**Zero dalla Cina non è un caso: in Cina Google è bloccato.** I turisti cinesi
cercano dove mangiare su Xiaohongshu, Dianping e WeChat. Una pagina in cinese su
un sito indicizzato da Google non la vedrebbe quasi nessuno: la leva per loro non
è il sito, è la scheda Google e semmai una presenza su Xiaohongshu, che è mondo
da social media manager.

**Il coreano invece un clic su due impressioni ce l'ha.** Costa poco: secondo
giro.

### Come si fa, in pratica

**Le prime due lingue costano l'80% del lavoro. Le altre sono quasi gratis**,
perché quello che si costruisce una volta sola è la struttura:

1. **URL separato per lingua** (`/en`, `/de`, `/sl`…), come chiede Google —
   niente cambio di lingua via cookie.
2. **`hreflang` reciproco fra tutte le versioni** + `x-default`. È l'errore da
   non ripetere: su Villa Marittimi è a senso unico e per questo viene ignorato.
3. **Selettore in navigazione**, non nascosto in fondo.
4. **Il menu si genera da solo.** Sta già tutto in `src/app/menu/menuData.ts`:
   i **nomi dei piatti non si traducono** («Top de Gamma» resta «Top de Gamma») e
   **i prezzi nemmeno**. Si traducono solo ingredienti e descrizioni, che cambiano
   una volta l'anno. ➡️ **Cambi un prezzo in un posto solo e cambia in tutte le
   lingue insieme.**
5. **Ogni pagina scritta per il suo lettore**, non clonata: al tedesco il
   parcheggio e gli orari, all'americano la distanza dal porto e che non c'è
   attesa, al croato il mordi-e-fuggi in giornata, allo spagnolo che *non è
   All'Antico Vinaio*.
6. **Verifica in Search Console dopo 8 settimane**, lingua per lingua.

### Il messaggio di benvenuto

Marco vuole un disclaimer scherzoso che dica che non è la nostra lingua madre.
L'idea di accorciare la distanza è buona; **la scusa preventiva no**, perché fa
venire il dubbio a chi non ce l'aveva.

Girarlo in benvenuto: non *«scusate se sbagliamo i verbi»* ma *«questa pagina
l'abbiamo scritta noi, non un ufficio traduzioni»*. Stessa simpatia, ma guadagna
credito invece di perderlo. **Le parole le detta Marco.**

## Cosa deve esserci dentro, se le facciamo

Marco l'ha già descritto bene: *«una pagina che riassuma cosa si può mangiare,
dove, tutto quello che c'è da sapere»*. Le recensioni dicono cosa serve davvero:

**① Rispondere alla domanda che il turista si fa davvero.** Uno spagnolo l'ha
scritta al posto nostro: *«No esperes algo parecido a All'Antico Vinaio. Es un
lugar local.»* Arriva con in testa la schiacciata di Firenze. **La pagina deve
dire subito che questa è un'altra cosa** — non una catena da fila fotografata,
un locale di quartiere.

**② Quanto si spende.** 55 recensioni su 100 lo dichiarano: 27 dicono 10-20 €, 24
dicono 1-10 €. Non c'è da nessuna parte sul sito, in nessuna lingua.

**③ La birra artigianale.** L'unico inglese che ha scritto una frase intera ha
scritto: *«One of the few places in Trieste with some craft beers and IPAs.»* In
inglese il posizionamento non è «schiacciata»: è la birra.

**④ Dove sei e quanto ci metti.** Una croata ha scritto *«siamo venuti a Trieste
per un'ora»* e la prima cosa che nomina è **il parcheggio**. Chi scende da una
nave ha poche ore: distanza dal porto, orari, e che **non c'è attesa** (16
recensioni su 100 lo dichiarano).

**⑤ Il menu con i prezzi.** `/menu` è **la pagina più vista del sito** — 198
visualizzazioni contro 177 della home. È quello che la gente viene a cercare.

⚠️ **E resta la regola di sempre: i fatti li detta Marco, o vengono dalle
recensioni. Non me li invento in inglese perché suonano bene.**
