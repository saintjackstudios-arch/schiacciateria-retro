# Menu per la scheda Google — approvato e caricato

**Fonte: il menu ONLINE su `schiacciateriaretrotrieste.com/menu`**, letto il 26/08/2026.

## ✅ CARICATO IL 27/08/2026 — 8 sezioni, 31 voci

Tutte le voci qui sotto sono state salvate sulla scheda. Contatore letto nel pannello a fine lavoro: **«Your menu — 31 items»**. Due precisazioni rispetto a quanto scritto sotto:

- **«Birra a Rotazione» è entrata senza prezzo**: il campo non è obbligatorio, la nota che la dava a rischio è superata.
- **Le caselle «Vegetarian» e «Vegan» non sono state spuntate su nessuna voce.** Riguardano la preparazione — l'olio di frittura condiviso basta a far decadere «vegetariano» su una voce che sulla carta lo sembra — e solo il locale può confermarlo. Google le usa come filtro di ricerca: vale la pena chiederlo al titolare.
- In «Le Insalatone» l'ordine su Google è Barcolana → Proteica → Italiana. Nessun contenuto cambiato.

---

## ⚠️ Perché questa è la seconda versione del documento

La prima versione era costruita su `src/data/menu.ts`. **Quel file è il menu vecchio, e non è nemmeno più usato dal sito**: non è importato da nessun componente. Il menu online è scritto in `src/app/menu/MenuClient.tsx`.

Marco se n'è accorto dai nomi: *«daghe un taio era nel menù vecchio… ci sono i bruschettoni che non hai nominato, e i taglieri sono tre»*.

**Non era solo una questione di nomi.** Anche i prezzi erano diversi, e più bassi:

| Voce | File vecchio | Menu online | Differenza |
|---|---|---|---|
| Top de Gamma | 7,50 € | **8,50 €** | −1,00 € |
| Bona ma Leggera | 8,00 € | **10,00 €** | −2,00 € |
| Tre Volte Bon | 9,50 € | **10,00 €** | −0,50 € |

Pubblicando quel file avremmo messo su Google prezzi fino al **20% sotto** quelli veri, su una scheda che un cliente legge prima di entrare.

**La mia parte di responsabilità:** avevo notato che il file era fermo al 17 luglio e avevo chiesto conferma sui *prezzi*. Ricevuto il sì, ho trattato la risposta come se coprisse anche l'elenco delle voci. Erano due domande, ne ho fatta una.

---

## Che cosa propongo di caricare

**8 sezioni · 31 voci.** Cibo e bevande.

### ✅ Birre e spritz: DENTRO — correzione del 26/08

Nella prima stesura li avevo esclusi, sostenendo che avrebbero rinforzato il segnale «bar». **Marco ha chiesto se si perdesse qualcosa a metterli, e la verifica dice di no.**

Il ragionamento era trasferito dal caso delle categorie, e i due casi sono diversi:
- **le categorie sono un elenco chiuso**, con un numero limitato di caselle: spenderne una su «Birreria» significa non spenderla altrove;
- **le voci di menu non hanno questo vincolo** e non si tolgono spazio a vicenda.

In più, il fatto che chiude la questione era già stato verificato lo stesso giorno: **la vetrina «Menu e piatti famosi» è costruita dalle fotografie, non dal menu** (l'etichetta *Aperol Spritz E Hugo* risulta `Foto 2 di 12`). Caricare gli spritz nel menu non rende quella vetrina più orientata alle bevande.

**Conclusione: si caricano.** Il guadagno è modesto — sulle ricerche di birra e aperitivo a Trieste la concorrenza è ogni bar della città, e la scheda lì è già posizionata — ma è guadagno, non costo. Ed è reversibile.

---

## Sezione 1 — Le Nostre Schiacciate
*Preparate al momento*

| Voce | Descrizione | Prezzo |
|---|---|---|
| Top de Gamma | Mortadella, stracciatella e pistacchio | 8,50 € |
| Bona ma Leggera | Prosciutto crudo, stracciatella, pomodorini e basilico | 10,00 € |
| Fit | Pomodorini, zucchine grigliate, rucola e stracchino | 10,00 € |
| Piaza Granda | Tonno, misticanza, pomodori e maionese al lime | 10,00 € |
| Scrigno | Rucola, carpaccio, burrata, olio evo, sale nero e pesto | 11,00 € |
| Tre Volte Bon | Prosciutto cotto, crema patate in tecia, crema al tartufo e provola | 10,00 € |

## Sezione 2 — Le Insalatone
*Per star leggeri*

| Voce | Descrizione | Prezzo |
|---|---|---|
| La Barcolana | Misticanza, tonno o salmone, olive, cipolla rossa, uovo sodo, dressing leggero | 10,00 € |
| L'Italiana | Misticanza, crudo, burrata, pomodorini, olio evo | 10,00 € |
| La Proteica | Misticanza, pollo grigliato, grana, pomodorini, salsa yogurt | 10,00 € |

## Sezione 3 — Bruschettoni

| Voce | Descrizione | Prezzo |
|---|---|---|
| Classico | Pomodorini freschi, aglio, olio EVO e basilico | 5,00 € |
| Sapore di Mare | Gamberetti e salsa rosa fatta in casa | 6,00 € |
| Tradizione Trieste | Prosciutto cotto Sfreddo e kren fresco | 5,00 € |

## Sezione 4 — Sfizi & Golosità
*Ogni giorno*

| Voce | Descrizione | Prezzo |
|---|---|---|
| Patatine Fritte | Croccanti e dorate, perfette da condividere. Aggiunte: cacio e pepe e tartufo 1,00 €; maionese affumicata, cipolla caramellata, cheddar, cipolla crispy, tzatziki, salsa burger, grana e bacon 0,50 €. | 4,50 € |
| Chifeletti | I tradizionali gnocchi di patate fritti triestini, morbidi dentro e croccanti fuori. Aggiunte: cacio e pepe e tartufo 1,00 €; maionese affumicata, cipolla caramellata, cheddar, cipolla crispy, tzatziki, salsa burger, grana e bacon 0,50 €. | 4,50 € |

**❓ Decisione:** le dieci aggiunte di «Robe de metter sora» le ho **infilate nella descrizione** delle due voci. L'alternativa è caricarle come dieci voci separate da 0,50 €, che in un elenco Google riempiono di righe da mezzo euro e schiacciano i piatti veri. Se preferisci vederle come voci a sé, si cambia.

## Sezione 5 — Il Giro Ignorante
*I taglieri*

| Voce | Descrizione | Prezzo |
|---|---|---|
| Duo Retrò | Giro Ignorante — 4 pezzi, 1 gusto. Ideale per un assaggio veloce. | 6,00 € |
| Muleria Retrò | Giro Ignorante — 8 pezzi, 2 gusti. Da condividere in due. | 12,00 € |
| Tavolata Ignorante | Giro Ignorante — 12 pezzi, 3 gusti. La badilata definitiva per il tavolo. | 16,00 € |

**❓ Decisione:** sul sito i tre taglieri stanno **dentro «Sfizi & Golosità»**, senza un titolo proprio. Su Google propongo di dargli una sezione, perché sono il prodotto da tavolata e in mezzo alle patatine non si vedono. Se preferisci rispettare il sito, li rimetto in Sfizi.

## Sezione 6 — I Nostri Dolci
*I Golosi*

| Voce | Descrizione | Prezzo |
|---|---|---|
| Schiacciata alla Nutella | La nostra schiacciata romana calda riempita di Nutella cremosa | 4,00 € |
| Chifeletti alla Nutella | I nostri mitici chifeletti fritti caldi ricoperti di Nutella | 4,00 € |

## Sezione 7 — Le Birre alla Spina
*Per brindare*

Ogni birra ha più formati. Google accetta un prezzo per voce, quindi il prezzo indicato è quello del formato più piccolo e gli altri stanno nella descrizione.

| Voce | Descrizione | Prezzo |
|---|---|---|
| Hell König Ludwig | Keller, bassa fermentazione, 5,1%. Formati: 0,2 l 3,00 € · 0,4 l 5,00 € · 0,5 l 5,50 € | 3,00 € |
| Warsteiner Herb | Pilsner doppio luppolo, bassa fermentazione, 4,8%. Formati: 0,2 l 3,00 € · 0,4 l 5,00 € · 0,5 l 5,50 € | 3,00 € |
| Pater Linus Triple | Tripel d'Abbazia, alta fermentazione, 7,5%. Formati: 0,33 l 4,50 € · 0,4 l 7,00 € | 4,50 € |
| Non Filtrata König Ludwig | Keller non filtrata, bassa fermentazione, 5,1%. Formati: 0,2 l 3,00 € · 0,4 l 5,00 € · 0,5 l 5,50 € | 3,00 € |
| Rye River IPA | India Pale Ale, alta fermentazione, 5,6%. Formati: 0,25 l 4,00 € · 0,4 l 7,00 € | 4,00 € |
| Birra a Rotazione | Chiedi allo staff qual è la birra del momento. | *senza prezzo* |

**Nota:** «Birra a Rotazione» sul sito non ha prezzo. Se l'editor di Google pretende un prezzo per ogni voce, questa resta fuori e va segnalato.

## Sezione 8 — I Nostri Spritz
*Aperitivo*

| Voce | Descrizione | Prezzo |
|---|---|---|
| Spritz Sarti | Prosecco, soda e liquore Sarti | 5,00 € |
| Anguria Spritz | Prosecco, soda e liquore all'anguria Piolo e Max | 5,00 € |
| Passion Spritz | Prosecco, soda e sciroppo passion fruit | 5,00 € |
| Spritz Retrò | Prosecco, soda e liquore ai frutti rossi Max e Piolo | 5,00 € |
| Mango Spritz | Prosecco, soda e liquore al mango Piolo e Max | 5,00 € |
| Pink Spritz | Prosecco, soda e tonica al pompelmo rosa | 5,00 € |

---

---

## Sulle maiuscole: la domanda è decaduta

Riguardava i nomi del **menu vecchio** («OSTERIA», «LA TOP de GAMMA»). Nel menu online sono già scritti normalmente — *Top de Gamma*, *Bona ma Leggera*, *Piaza Granda* — quindi vanno su Google così come sono, senza toccarli.

---

## Decisioni prese da Marco il 26/08

1. ✅ **Il listino è quello attuale.**
2. ✅ **Le dieci aggiunte** restano dentro la descrizione di Patatine e Chifeletti.
3. ✅ **I tre taglieri** hanno una sezione propria, «Il Giro Ignorante».
4. ✅ **Birre e spritz dentro**, dopo la correzione qui sopra.

**Si carica: 8 sezioni, 31 voci.**
