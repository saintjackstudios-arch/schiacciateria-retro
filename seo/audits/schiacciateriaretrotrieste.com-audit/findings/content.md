# Contenuti — 28 articoli, e un problema che non è la qualità

## Il dato che inquadra tutto

Da Search Console (snapshot del 18/08, periodo 19/07 → 16/08):

| | |
|---|---|
| Clic totali in 3 mesi | **168** |
| Impressioni | 3.980 |
| Posizione media | 6,1 |

Le query che portano quei clic: *retrò trieste* (23), *schiacciateria trieste* (15), *retro schiacciateria trieste* (9), *retro trieste* (7), *bar retrò trieste* (6), *retro viale trieste* (3)…

**Sono tutte il nome del locale.** Il sito è primo o secondo quando qualcuno lo cerca per nome — cioè quando è già stato deciso di venire. Le query che portano clienti nuovi sono in fondo alla lista: *cosa mangiare a trieste street food* 1 clic in posizione 10,8 · *mangiare a trieste spendendo poco* 1 clic in posizione 12,8 · *movida trieste* 1 clic in posizione 15,4.

**Filtro «buffet»: 0 clic e 11 impressioni in tre mesi, posizione media 20,4.**

Questa è la stessa diagnosi che è emersa sulla scheda Google: il locale è trovato da chi lo conosce, non da chi cerca da mangiare.

## Quello che funziona

- **Nessuna duplicazione fra gli articoli.** Confrontate tutte le 378 coppie possibili sui 3-grammi: la somiglianza massima è **5,4%**, nessuna coppia sopra il 10%. Non sono testi rigirati.
- **Nessuna frase di riempimento ripetuta** in più articoli.
- Ogni articolo nomina il locale (2,2 volte in media) e **23 su 28 linkano il menu**.
- Titoli e description **tutti unici**, nessuno mancante.
- Autore e date dichiarati, con schema `Article` su ogni articolo.

## Problemi

### 🟠 ALTA — Gli articoli sono corti

| | |
|---|---|
| Articoli | 28 |
| Parole, mediana | **345** |
| Sotto le 500 parole | **21 su 28** |
| Più corto | 273 (`dove-mangiare-bene-trieste-spendendo-poco`) |

La lunghezza non è un fattore di posizionamento in sé, ma 345 parole su una domanda come «dove mangiare a Trieste spendendo poco» **non bastano a esaurire la domanda**, e infatti quella query sta in posizione 17,9.

**Il punto non è allungare.** È che a questi articoli manca la cosa che nessun concorrente può copiare: **l'esperienza del locale**. Sono scritti come li scriverebbe chiunque abbia letto Wikipedia — e infatti nel sito ci sono **90 link a it.wikipedia.org**. Un articolo che dice cosa ordina davvero la gente il sabato alle 23, quanto si aspetta, cosa finisce per primo, è un articolo che l'IA non può generare e che Google non trova altrove.

### 🟠 ALTA — Due articoli lavorano, gli altri no

Dal medesimo snapshot GSC:

| Pagina | Clic | Impressioni | Posizione |
|---|---|---|---|
| `/blog/spritz-aperitivo-trieste` | 4 | 312 | **5,9** |
| `/blog/dove-fare-aperitivo-trieste-centro` | 2 | 146 | 10,4 |
| `/blog/dove-bere-miglior-spritz-trieste` | 2 | 78 | 8,6 |
| `/bevande` | 0 | 4 | 54,0 |

**Il gruppo «spritz e aperitivo» funziona: 8 clic e 536 impressioni.** È l'unico argomento non-branded su cui il sito esiste davvero. Merita di essere approfondito prima di aprirne altri.

### 🔵 BASSA — «Davide» non ha una pagina che dica chi è

Gli articoli sono firmati `Davide`, e lo schema `Article` dichiara un `Person` con quel nome. Non esiste però nessuna pagina che dica chi sia, né un collegamento fra la firma e la pagina *Chi Siamo*. Per l'esperienza dichiarata (la E di E-E-A-T) è un'occasione persa: chi scrive di buffet triestini **lavora** in un buffet triestino, e non lo si legge da nessuna parte.

## Corretto in locale, in attesa di pubblicazione

- **`/bevande` era un segnaposto da 129 parole** con scritto «LISTA IN ARRIVO» a caratteri cubitali, linkato dal menu di navigazione di ogni pagina. Eliminata, con reindirizzamento permanente al menu.
- **La pagina buffet conteneva un piatto che il locale non fa** («cotechino e kren») e un elenco di fritti sbagliato («calamari, gamberetti»), oltre a una frase in dialetto inventato. Corretti su indicazione del titolare.
