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

## ⛔ Ma l'esperimento l'abbiamo già fatto, e ha dato zero

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

⚖️ **Però quel risultato non si trasferisce tale e quale.** Villa Marittimi vende
**una villa per feste private**: uno straniero che organizza un diciottesimo a
Trieste è un mercato quasi inesistente. Un locale dove si mangia è un'altra cosa:
dietro ci sono **455.000 crocieristi e 441.000 presenze straniere** che devono
pranzare da qualche parte.

**Quindi non è la prova che le pagine in lingua non funzionano. È la prova che
non basta pubblicarle.**

---

## La mia proposta: due lingue, non cinque, e con una scadenza

### ✅ Inglese e tedesco. Basta.

**L'inglese non è la lingua degli inglesi: è la lingua di ripiego di tutti.** Lo
sloveno, l'ungherese, l'olandese e lo spagnolo che arrivano a Trieste cercano in
inglese quando non trovano la loro lingua. Una pagina inglese li copre tutti.

**Il tedesco è l'unica seconda lingua con un mercato che la giustifica da sola:**
Austria e Germania sono il primo e il secondo mercato straniero della città.

### ❌ Spagnolo, russo, olandese: no, e non per il costo

**Per l'olandese e il russo non c'è il dato:** non compaiono fra le nazionalità
di Trieste. Lo spagnolo ha 3 recensioni ma **25 secondi di permanenza media**, la
più bassa di tutte.

E c'è un motivo più serio del traffico: **nessuno di noi legge il russo o
l'olandese.** Pubblicheremmo, in nome di un cliente, un testo che non possiamo
rileggere. Se un prezzo o un allergene esce sbagliato, il problema è di Davide,
non nostro. Il tedesco lo stesso rischio ce l'ha — **quindi la pagina tedesca va
fatta rileggere da qualcuno che il tedesco lo parla, prima di pubblicare.**

### ⏱ E soprattutto: con una scadenza

Il costo vero non è tradurre: è che **da quel giorno ogni pagina nuova va scritta
tre volte per sempre**, e ogni prezzo che cambia va cambiato in tre posti.

Quindi si fa come un esperimento, non come un impegno:

1. **Due pagine sole**, una inglese e una tedesca. Non un sito tradotto.
2. **Hreflang reciproco fatto bene** — l'errore di Villa Marittimi, non lo
   ripetiamo.
3. **Nel menu di navigazione**, non nascoste.
4. **Si rilegge la Search Console dopo 8 settimane.** Se il tedesco fa zero come
   `/en` di Villa Marittimi, ci fermiamo e abbiamo speso due pagine.

---

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
