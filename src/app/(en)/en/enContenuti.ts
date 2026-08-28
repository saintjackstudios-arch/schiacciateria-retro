/**
 * I testi della pagina inglese.
 *
 * Sono qui e non dentro EnClient.tsx per un motivo pratico: quando faremo il
 * tedesco, lo sloveno e il croato si copia QUESTO file, si traduce, e il
 * componente che disegna la pagina resta lo stesso. Il lavoro della seconda
 * lingua in poi e' tutto in un file solo.
 *
 * REGOLA: qui dentro non si scrive MAI un prezzo e non si traduce MAI il nome
 * di un piatto. I prezzi arrivano da src/lib/prezziMenu.ts, che li legge da
 * menuData.ts. "Top de Gamma" resta "Top de Gamma" anche in inglese: e' un nome
 * proprio, e se lo traduciamo il turista non riesce piu' a ordinarlo al banco.
 *
 * I contenuti (cos'e' una schiacciata, cos'e' un buffet, cosa si beve, i
 * prezzi, come si arriva) sono dettati da Marco il 27/08/2026. Le distanze a
 * piedi e le linee dei bus sono state misurate su Google Maps lo stesso giorno.
 */

// ─── PIATTI DA MOSTRARE ──────────────────────────────────────────────────────
// `name` deve corrispondere ESATTAMENTE al name in menuData.ts, se no la build
// fallisce (ed e' quello che vogliamo).

export const SCHIACCIATE_IN_VETRINA = [
  {
    name: 'Top de Gamma',
    en: 'Mortadella, stracciatella cheese and chopped pistachio',
    note: 'The one people come back for.',
  },
  {
    name: 'Variante TS',
    en: 'Cooked ham, breaded fried aubergine, mustard and fresh kren',
    note: 'The most Triestine thing on the menu. Kren is horseradish — see the glossary.',
  },
  {
    // ⚠️ LA FOTO NON CORRISPONDE AL PIATTO, ED E' UNA SCELTA DEL TITOLARE.
    // menuData associa a questa voce `porco_tartufato.webp`, rimasta attaccata a
    // un piatto vecchio: dentro ci sono un salume arrotolato, rucola e un
    // TARTUFO NERO sul tagliere. La Porca Zozza e' porchetta, crema cacio e
    // pepe, cipolla croccante e grana.
    // Marco ha deciso il 28/08 di tenerla comunque, per non divergere dal menu
    // italiano che gia' la mostra in produzione. Le immagini del sito sono
    // dichiarate illustrative e generate con l'IA (nota in fondo alla pagina),
    // quindi nessuna e' la fotografia del piatto reale.
    // NON e' una svista: non "correggerla" togliendo la foto. La soluzione vera
    // e' una fotografia giusta in menuData.ts, che aggiorna tutte le lingue.
    name: 'Porca Zozza',
    en: 'Porchetta, cacio e pepe cream, crispy onion and grana cheese',
    note: 'Roast pork belly. Not a light lunch, and not trying to be.',
  },
  {
    name: 'Bona ma Leggera',
    en: 'Prosciutto crudo, stracciatella, cherry tomatoes and basil',
    note: 'Raw cured ham, the classic one.',
  },
  {
    name: 'Fit',
    en: 'Cherry tomatoes, grilled courgettes, rocket and stracchino cheese',
    note: 'Vegetarian.',
  },
  {
    name: 'Piaza Granda',
    en: 'Tuna, mixed leaves, tomatoes and lime mayonnaise',
    note: 'No meat, but it does have fish.',
  },
] as const;

// ─── IL GIRO IGNORANTE ───────────────────────────────────────────────────────
// ⚠️ CORRETTO IL 27/08 DOPO L'ERRORE: questi NON sono piatti da buffet. Sono
// SCHIACCIATE tagliate a pezzi per condividerle. Nel menu stanno sotto "Sfizi",
// ed e' li' che mi ero sbagliato a leggerli. I numeri (4 pezzi/1 gusto,
// 8 pezzi/2 gusti, 12 pezzi/3 gusti) sono quelli di menuData.ts.

export const GIRO_IGNORANTE = [
  {
    name: 'Duo Retrò',
    en: 'One schiacciata, one filling, cut into four pieces',
    note: 'A taste for one person, or a small thing for two.',
  },
  {
    name: 'Muleria Retrò',
    en: 'Two schiacciate, two different fillings, cut into eight pieces',
    note: 'Two people, four pieces each, and two flavours tried instead of one.',
  },
  {
    name: 'Tavolata Ignorante',
    en: 'Three schiacciate, three different fillings, cut into twelve pieces',
    note: 'For a table. This is the one to order.',
  },
] as const;

export const BIRRE_IN_VETRINA = [
  { name: 'Rye River IPA', en: 'India Pale Ale · 5.6%', note: 'If you want one recommendation, this is it.' },
  { name: 'Hell König Ludwig', en: 'Keller lager · 5.1%', note: 'The easy-going one.' },
  { name: 'Warsteiner Herb', en: 'Double-hopped pilsner · 4.8%', note: 'Dry and bitter.' },
  { name: 'Pater Linus Triple', en: 'Abbey tripel · 7.5%', note: 'Strong. Belgian style.' },
  { name: 'Non Filtrata König Ludwig', en: 'Unfiltered keller lager · 5.1%', note: 'Cloudy on purpose.' },
] as const;

// ─── COME SI ARRIVA ──────────────────────────────────────────────────────────
// Distanze, tempi e linee misurati su Google Maps il 27/08/2026.
// La fermata piu' vicina a noi e' Via Battisti (Galleria Fenice), 150 m: ci
// passano le linee 3, 6, 9, 22, 35, 36, 57, 58 e B.
// Il pagamento contactless a bordo e' verificato su triestetrasporti.it.

export const COME_ARRIVARE = [
  {
    id: 'cruise',
    titolo: 'You came in on a cruise ship',
    tempo: '24 minutes on foot',
    distanza: '1.7 km from Molo dei Bersaglieri',
    testo:
      'Walk off the pier into Piazza Unità d’Italia — the big square facing the sea. Cross it, keep going straight inland along Corso Italia and Viale Carducci, and stay under the arcades. You will come out at the fountain at the bottom of Viale XX Settembre. From there just walk up the boulevard. We are on your left, at number 16.',
    bus:
      'By bus, 15 minutes: walk 200 m along the waterfront to the riva del Mandracchio stop, in front of the Hotel Excelsior, and take line 9 towards Piazzale Gioberti. Five stops, nine minutes, get off at Via Battisti (Galleria Fenice) — we are 150 m from there. One every nine minutes or so.',
  },
  {
    id: 'train',
    titolo: 'You came by train',
    tempo: '15 minutes on foot',
    distanza: '1.0 km from Trieste Centrale',
    testo:
      'Out of the station, head inland along Via Ghega and Via Carducci. It is flat the whole way — no hills, no steps.',
    bus:
      'By bus, 11 minutes: the Stazione Ferroviaria stop is 120 m from the station doors. Line 22 towards Cattinara (Ospedale) takes four stops and six minutes; get off at Portici di Chiozza and walk 220 m. Lines 6 and 36 come this way too. It saves about four minutes on the walk, so take it for the suitcase, not for the clock.',
  },
  {
    id: 'plane',
    titolo: 'You flew in',
    tempo: 'about 50 minutes in total',
    distanza: 'Trieste Airport (TRS), Ronchi dei Legionari',
    testo:
      'The airport has its own railway station, connected to the terminal by a covered walkway. Take the regional train to Trieste Centrale — it takes 29 to 32 minutes — and from there you are at the previous entry: 15 minutes on foot, or line 22.',
  },
  {
    id: 'car',
    titolo: 'You came by car',
    tempo: 'under a minute on foot',
    distanza: 'Geparkom, Via Spiro Tipaldo Xydias 6 · open 8:00–20:00',
    testo:
      'Viale XX Settembre is pedestrian, so you cannot drive to our door. During the day, use the multi-storey car park next to us — Geparkom, in Via Spiro Tipaldo Xydias 6. Come out of it, turn left, and you are here. Coming for lunch, this is the easy answer, and the same one if you are driving over from Slovenia or Croatia.',
    sera:
      'Coming for dinner? The car park shuts at 20:00, so it will be closed by the time you leave. It works out anyway: this is a neighbourhood people work in, and from around eight in the evening they drive home and the street spaces empty out. Read the sign beside the blue-lined bays before you walk away from the car — the paid hours are posted on the meter.',
  },
  {
    id: 'walk',
    titolo: 'You are already in the old town',
    tempo: '16 minutes on foot',
    distanza: '1.1 km from Piazza Unità d’Italia',
    testo:
      'Straight up Corso Italia and you are on the Viale. It is one road, in one direction, and you cannot really get it wrong.',
  },
] as const;

// Le linee che passano dalla fermata piu' vicina. Verificate su Google Maps il
// 27/08/2026 (fermata Via Battisti / Galleria Fenice, ID 13006 lato riva).
export const FERMATA_VICINA = {
  nome: 'Via Battisti (Galleria Fenice)',
  distanza: '150 m — a two-minute walk',
  linee: '3 · 6 · 9 · 22 · 35 · 36 · 57 · 58 · B',
  biglietto:
    'You can tap a contactless card or phone on the reader when you board a Trieste city bus: the card is the ticket. Otherwise buy one before you get on, at any tabaccheria or newsagent.',
} as const;

// ─── GLOSSARIO ───────────────────────────────────────────────────────────────
// Le definizioni vengono dagli articoli che il sito ha gia' in italiano, non
// sono inventate qui. Marco si e' offerto di rivederle e allungare l'elenco.

export const GLOSSARIO = [
  {
    parola: 'Schiacciata',
    pron: 'skyat-CHA-ta',
    def: 'Focaccia dough, baked, split lengthways and filled. Not pizza, not a sandwich.',
  },
  {
    parola: 'Buffet',
    pron: 'boo-FEH',
    def: 'In Trieste this does not mean a self-service table. It means lots of very small plates, shared.',
  },
  {
    parola: 'Kren',
    pron: 'krayn',
    def: 'Grated horseradish. Sharp, a bit like wasabi. Trieste puts it on ham and takes it seriously.',
  },
  {
    parola: 'Un nero',
    pron: 'oon NEH-ro',
    def: 'An espresso. Ask for "un caffè" and everyone will know you are not from here.',
  },
  {
    parola: 'Un capo',
    pron: 'oon KA-po',
    def: 'An espresso with a little milk foam. What the rest of Italy calls a macchiato.',
  },
  {
    parola: 'In b',
    pron: 'een bee',
    def: 'Say "un nero in b" or "un capo in b" and it arrives in a small glass instead of a cup. The b is for bicchiere, glass.',
  },
  {
    parola: 'Rebechin',
    pron: 'reh-beh-KEEN',
    def: 'The mid-morning or late-afternoon snack, standing at the counter, with a small glass of something.',
  },
  {
    parola: 'Spritz bianco',
    pron: 'shpritz BYAN-ko',
    def: 'White wine, sparkling water, ice, lemon. What you get here if you just say "a spritz".',
  },
] as const;

// ─── FAQ ─────────────────────────────────────────────────────────────────────
// Risposte date da Marco il 27/08/2026. Vanno anche nei dati strutturati, in
// src/app/en/page.tsx: le due liste devono restare identiche.

export const FAQ = [
  {
    q: 'Do I need to book a table?',
    a: 'Not strictly — you can walk in, order at the counter and sit down. But booking is a good idea, especially in the evening and if you want to be sure of a table outside. Call us or send a WhatsApp message. For a group it is worth doing every time.',
  },
  {
    q: 'Does anyone there speak English?',
    a: 'Yes. You can order in English at the counter.',
  },
  {
    q: 'Can I pay by card?',
    a: 'Yes, we take cards.',
  },
  {
    q: 'Can I take the food away?',
    a: 'Yes. Everything on the menu can be wrapped to take with you — useful if you are walking back to a ship or a train.',
  },
  {
    q: 'Do you have vegetarian options?',
    a: 'Yes, and here they are by name. The Fit schiacciata: cherry tomatoes, grilled courgettes, rocket and stracchino cheese. The Classico bruschettone: tomato, garlic, olive oil and basil. The chips. The chifeletti — fried Triestine potato dumplings, soft inside, crisp outside. And both puddings: the Nutella schiacciata and the Nutella chifeletti. Ask at the counter and we will walk you through the rest.',
  },
  {
    q: 'Do you have gluten-free food?',
    a: 'We cannot promise a gluten-free kitchen. Everything is prepared in the same space where we handle flour all day, so if you are coeliac we would rather tell you honestly than risk it. Ask us at the counter and we will tell you exactly what is in each dish.',
  },
  {
    q: 'Can we sit outside?',
    a: 'Yes, all year round. Our tables are out on the boulevard under the plane trees — Viale XX Settembre is closed to traffic, so it is the pavement, not a road. There are tables inside as well, which is where most people sit in winter; in summer almost everyone stays outside.',
  },
  {
    q: 'Is there a toilet?',
    a: 'Yes, for customers.',
  },
  {
    q: 'Is it wheelchair accessible?',
    a: 'Yes. Everything is on one floor, with no steps inside.',
  },
  {
    q: 'Which bus stops nearest to you?',
    a: 'Via Battisti (Galleria Fenice), 150 metres away — about two minutes on foot. Lines 3, 6, 9, 22, 35, 36, 57, 58 and B all call there. From the cruise pier take line 9; from the railway station take line 22.',
  },
  {
    q: 'How much does a meal cost?',
    a: 'A light lunch comes in under €10. A full meal — a big schiacciata, something to share, beers with friends — is around €15 to €20 a head. Walking out with a €50 bill each is very hard to do. If you manage it, you bought a lot of beer, and probably some new friends as well.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Monday to Thursday 8:00 to 01:00, Friday and Saturday 8:00 to 02:00, Sunday 17:00 to 23:30. We are open every day; Sunday we only open in the afternoon.',
  },
] as const;
