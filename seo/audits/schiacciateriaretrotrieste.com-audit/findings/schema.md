# Dati strutturati

## Quello che c'è

| Tipo | Dove | Stato |
|---|---|---|
| `Restaurant` | tutte e 38 le pagine | valido, completo su orari, indirizzo, geo |
| `Article` | 28 articoli | valido, con autore, editore e date |
| `FAQPage` | home | valido |
| `BreadcrumbList` | solo `/buffet-triestino` | valido |

Lo schema `Restaurant` è fatto bene: nome, immagine, logo, telefono, indirizzo postale completo con CAP **34125**, coordinate geografiche, `servesCuisine`, `priceRange`, `openingHoursSpecification` per i tre blocchi di orario, descrizione. **Gli orari nello schema combaciano con quelli della scheda Google** — verificato.

## Problemi

### 🟠 ALTA — Manca `hasMenu`, e adesso è gratis

Lo schema `Restaurant` non dichiara `hasMenu`. È la proprietà con cui un ristorante dice a Google e alle IA **dove sta il suo menu**. La pagina esiste, ha 40 piatti con i prezzi, ed è collegata da 23 articoli su 28 — ma nessun dato strutturato la indica come il menu del locale.

Una riga: `"hasMenu": "https://schiacciateriaretrotrieste.com/menu"`.

### 🟠 ALTA — La pagina `/menu` non ha schema `Menu`

Su `/menu` c'è soltanto `Restaurant` (ereditato dal layout). Non c'è nessun `Menu`, `MenuSection` o `MenuItem`.

Sono **40 piatti con nome, descrizione e prezzo** già scritti in pagina. Trasformarli in dati strutturati è generabile dal codice esistente, senza scrivere contenuto nuovo, e serve esattamente alle domande che le persone fanno alle IA: «quanto costa una schiacciata a Trieste», «dove trovo uno smash burger in centro». Senza dati strutturati quelle risposte si costruiscono altrove.

### 🟠 MEDIA — `sameAs` elenca solo Instagram

```
"sameAs": ["https://www.instagram.com/schiacciateria_retro_trieste/"]
```

Mancano profili che esistono e sono attivi: la **pagina Facebook** (oltre 8.200 follower), la **scheda Google** (4,6 su 443 recensioni), **TripAdvisor**. `sameAs` è il modo in cui si dice a Google «queste identità sono la stessa cosa»: è il collegamento diretto fra il sito e la scheda su cui stiamo lavorando.

### 🟠 MEDIA — `Article` senza `image` né `mainEntityOfPage`

Ogni articolo ha `hero_image` nel frontmatter e la mostra in pagina, ma lo schema `Article` non la dichiara. `image` è **richiesta** da Google per i risultati arricchiti degli articoli. Manca anche `mainEntityOfPage`.

### 🔵 BASSA — `BreadcrumbList` solo su una pagina

C'è su `/buffet-triestino` e su nessun articolo. Le briciole di pane sono ciò che Google mostra al posto dell'URL nei risultati.

## ⛔ Una cosa da NON fare

**Non aggiungere `aggregateRating` allo schema copiando il 4,6 su 443 recensioni dalla scheda Google.** Le linee guida di Google vietano di dichiarare nei dati strutturati del proprio sito valutazioni raccolte da terzi: è una violazione che può costare i risultati arricchiti su tutto il dominio. Le stelle nei risultati arrivano dalla scheda, non dallo schema del sito.
