# Leggibilità per le IA

## Situazione

- **Nessun blocco ai crawler**: `robots.txt` è `Allow: /` per tutti, quindi GPTBot, ClaudeBot, PerplexityBot e Google-Extended passano.
- **Contenuto nell'HTML**, non costruito da JavaScript: le IA che non eseguono script leggono tutto.
- **Struttura a domanda**: i titoli degli articoli sono già domande reali («dove bere il miglior spritz a Trieste», «cosa ordinare al buffet triestino»). È il formato che le risposte generate citano più volentieri.
- **Schema `Restaurant` completo** con indirizzo, coordinate e orari: sono i dati che una risposta su «locali aperti adesso a Trieste» usa direttamente.

## Problemi

### 🟠 ALTA — I prezzi non sono in nessun dato strutturato

Vedi `schema.md`. Quaranta piatti con prezzo scritti in pagina e zero in formato leggibile. Le domande dei clienti alle IA sono quasi sempre «quanto costa» e «cosa prendo» — ed è l'unica informazione che il sito ha e i concorrenti no, visto che nessuno dei quattro confrontati espone un menu con i prezzi.

### 🟠 MEDIA — Articoli troppo corti per essere citati

Una risposta generata cita il passaggio che risolve la domanda. Con una mediana di 345 parole, gli articoli danno una risposta generica dove servirebbe un dato: un orario, un prezzo, una quantità, un nome.

## ⛔ Sul file `llms.txt`

Il sito non ha `llms.txt`, e **non è un problema**. Nessun motore né fornitore di IA lo usa per decidere cosa citare: è una proposta senza adozione. Essere consigliati dalle IA non si ottiene con un file — si ottiene **quando altri parlano di te**, ed è la stessa materia del riquadro locale su cui stiamo lavorando. Aggiungerlo non farebbe danno e non farebbe niente; scriverlo al posto di un intervento vero sarebbe uno spreco.
