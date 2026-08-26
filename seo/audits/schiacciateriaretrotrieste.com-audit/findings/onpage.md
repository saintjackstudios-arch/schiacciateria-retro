# On-page — titoli, intestazioni, link interni

## Quello che funziona

- **Un solo `<h1>` per pagina, su tutte e 38.** Nessuna pagina senza, nessuna con due.
- **Nessun titolo duplicato**, nessuna description duplicata, **nessuna description mancante**.
- Struttura delle intestazioni coerente: h1 → h2 → h3, nessun salto di livello riscontrato.
- `og:image` presente su tutte e 38 le pagine.

## Problemi

### 🟠 ALTA — Ventiquattro titoli su 38 vengono tagliati nei risultati

Google mostra all'incirca i primi 60 caratteri di un titolo. Sul sito:

| Pagina | Caratteri |
|---|---|
| `/blog/movida-trieste-giovani-guida` | 116 |
| `/blog/dove-bere-miglior-spritz-trieste` | 115 |
| `/blog/rebechin-come-si-fa-trieste` | 114 |
| `/blog/mangiare-vicino-teatro-rossetti-trieste` | 114 |
| `/blog/spritz-aperitivo-trieste` | 113 |

Il modello è sempre lo stesso: **una frase intera, poi due punti, poi una seconda frase**. La seconda metà non la legge nessuno perché non arriva a schermo. Esempio reale:

> `Dove bere il miglior spritz a Trieste: Dal classico bianco alle varian…`

Le pagine principali invece sono a posto: home 51 caratteri, contatti 47, chi siamo 40, blog 35.

**Correzione:** portare i titoli degli articoli sotto i 60 caratteri, tenendo davanti la parte che risponde alla ricerca. `Dove bere il miglior spritz a Trieste` da solo è già un titolo completo.

**Perché conta qui più che altrove:** l'articolo sullo spritz è in **posizione 5,9 con 312 impressioni e 4 clic** — un CTR dell'1,3%. In quinta posizione, con un titolo leggibile per intero, quel numero dovrebbe stare fra il 5% e l'8%. È il punto del sito dove un'ora di lavoro vale di più.

### 🟠 MEDIA — Nessuno dei 28 articoli linka la pagina Contatti

| Destinazione | Articoli che la linkano |
|---|---|
| `/menu` | 23 su 28 |
| `/buffet-triestino` | 5 su 28 |
| **`/contatti`** | **0 su 28** |

Chi legge «dove mangiare a Trieste spendendo poco» e si convince, non ha nessun collegamento verso indirizzo, telefono e WhatsApp se non tornare al menu di navigazione. È la pagina che chiude il giro e non la linka nessuno.

E `/buffet-triestino` — che è una pagina costruita apposta per una ricerca precisa — riceve link editoriali da 5 articoli su 28, mentre nel blog ce ne sono almeno una dozzina che parlano di buffet.

### 🔵 BASSA — Sette description oltre i 165 caratteri

Vengono troncate nei risultati. La più lunga è `/blog/dove-mangiare-trieste-spendendo-poco` con **217 caratteri**. Nell'ordine: 217, 190, 173, 170, 168, 168, 168.

### 🔵 BASSA — 90 link a Wikipedia

Il blog contiene **90 collegamenti a it.wikipedia.org**. Non è una penalizzazione, ma è la firma tipica del testo generato: gli articoli si appoggiano a un'enciclopedia invece che a quello che si vede dal banco. Vedi `content.md`.
