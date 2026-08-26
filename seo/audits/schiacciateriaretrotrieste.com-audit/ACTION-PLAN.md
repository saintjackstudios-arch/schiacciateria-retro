# Piano d'azione — schiacciateriaretrotrieste.com

Ordinato per rapporto fra effetto e fatica. Le stime di tempo sono di lavoro effettivo.

---

## Fase 1 — Questa settimana (circa 1 ora e mezza in tutto)

### 🔴 1.1 Portare la qualità delle immagini da 100 a 75 — *10 minuti*
`src/app/HomeClient.tsx:465` · `src/app/buffet-triestino/BuffetClient.tsx:59` · `src/app/menu/MenuClient.tsx:553`

Misurato: −72% su `hero_aggressive.jpg`, −73% su `tavolata_ignorante.webp`, −37% su `menu_hero_schiacciata.webp`.
**Da verificare a occhio dopo il cambio**, su una foto di piatto: se si vede la differenza si sale a 85, non si torna a 100.

### 🔴 1.2 Togliere il preload dall'immagine sotto la piega — *5 minuti*
`src/app/HomeClient.tsx:651` — `ingredienti_esplosi_highres.webp` pesa 147 KB, sta al 48% della pagina e compete con il CSS da cui dipende il titolo della home.

### 🟠 1.3 Rimisurare LCP dopo 1.1 e 1.2 — *15 minuti*
Stesso metodo di questo audit (`raw/perf-mobile.json` contiene i valori di partenza). Senza la misura dopo, non si sa se è servito.

### 🟠 1.4 Accorciare i titoli dei tre articoli già posizionati — *20 minuti*
`spritz-aperitivo-trieste` (113 car.), `dove-bere-miglior-spritz-trieste` (115), `dove-fare-aperitivo-trieste-centro`. Sono gli unici con impressioni vere: 536 in tre mesi. Sotto i 60 caratteri, con davanti la parte che risponde alla ricerca.

### 🟠 1.5 `hasMenu` e `sameAs` nello schema — *15 minuti*
Aggiungere `"hasMenu": "https://schiacciateriaretrotrieste.com/menu"` e completare `sameAs` con Facebook, scheda Google e TripAdvisor.
⛔ **Non aggiungere `aggregateRating`** copiando il 4,6/443 dalla scheda: è vietato dalle linee guida e mette a rischio i risultati arricchiti dell'intero dominio.

### 🟠 1.6 `lastmod` reale nella sitemap — *15 minuti*
`src/app/sitemap.ts`: `lastModified: new Date(post.date)` per gli articoli. Oggi tutti e 35 gli URL dichiarano la stessa data, in contraddizione con le date dello schema `Article`.

---

## Fase 2 — Prossime due settimane

### 🟠 2.1 Schema `Menu` sulla pagina del menu — *1 ora*
Quaranta piatti con nome, descrizione e prezzo già in pagina: si genera dagli stessi dati che disegnano la pagina, senza scrivere contenuto nuovo. È l'unico vantaggio informativo sui concorrenti — nessuno dei quattro confrontati espone un menu con i prezzi.

### 🟠 2.2 Link ai Contatti dagli articoli — *45 minuti*
Oggi: `/menu` linkato da 23 articoli su 28, `/buffet-triestino` da 5, **`/contatti` da 0**. Aggiungere un collegamento in chiusura agli articoli con intento «dove/quando». E linkare `/buffet-triestino` dai circa dodici articoli che parlano di buffet.

### 🟠 2.3 `image` e `mainEntityOfPage` nello schema `Article` — *20 minuti*
`image` è richiesta da Google per i risultati arricchiti degli articoli. Il valore c'è già nel frontmatter (`hero_image`), va solo dichiarato.

### 🔵 2.4 Accorciare le restanti description oltre i 165 caratteri — *20 minuti*
Sette in tutto, la peggiore a 217.

### 🔵 2.5 `sizes` sulle immagini `fill` che ne sono prive — *15 minuti*
`3_volte_bon.webp`, `piaza_granda.webp` e le altre segnalate dal server di sviluppo.

---

## Fase 3 — Mese prossimo: l'unica cosa che sposta davvero

### 🟠 3.1 Approfondire il gruppo che già funziona, invece di aprirne altri
L'unico argomento non-branded su cui il sito esiste è **spritz e aperitivo**: 8 clic e 536 impressioni in tre mesi, con un articolo in posizione 5,9. Prima di scrivere il ventinovesimo articolo su un tema nuovo, vale la pena rendere imbattibile quello che è già a metà della prima pagina.

### 🟠 3.2 Mettere negli articoli quello che solo il locale sa
Mediana 345 parole e 90 link a Wikipedia: gli articoli sono scritti da fuori. Quello che nessun concorrente può copiare è cosa finisce per primo il sabato sera, quanto si aspetta alle 13, cosa ordinano i clienti abituali. **Il materiale va raccolto dal titolare, non generato.**

### 🔵 3.3 Dare un volto a «Davide»
Gli articoli sono firmati e lo schema dichiara un autore, ma nessuna pagina dice chi sia. Chi scrive di buffet triestini lavora in un buffet triestino: è esperienza diretta e non è dichiarata da nessuna parte.

---

## Fase 4 — Continuo

- **Rileggere gli elenchi locali il 24/09**, quattro settimane dopo le modifiche alla scheda. Dato di partenza: assente da tutte e otto le pagine di *street food trieste* al 25/08.
- **Rileggere Search Console a fine settembre** confrontando con lo snapshot del 18/08: interessa una cosa sola, se le query non-branded crescono.
- **Fotografare i piatti con continuità.** Resta la leva più forte sulla scheda Google, e non è un intervento sul sito.
- **Rifare questo audit dopo la Fase 1**, per misurare invece di stimare.

---

## Cosa NON fare

| | Perché |
|---|---|
| `aggregateRating` nello schema copiando le stelle di Google | vietato dalle linee guida, rischia i risultati arricchiti sull'intero dominio |
| Scrivere un `llms.txt` | nessun motore né fornitore di IA lo usa per decidere cosa citare |
| Comprimere i file dentro `public/` | `/_next/image` li ricodifica comunque: il visitatore non riceve un byte in meno. La leva è il parametro `quality` |
| Allungare gli articoli aggiungendo parole | la lunghezza non è un fattore: quello che manca è il dato che solo il locale ha |
