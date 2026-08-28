/**
 * I testi della pagina tedesca.
 *
 * E' la copia tradotta di `src/app/(en)/en/enContenuti.ts`, voce per voce.
 * Marco il 28/08/2026: *«traduci e basta. non devi cambiare assolutamente
 * nulla rispetto alla pagina in inglese»*. Quindi qui NON si aggiunge, non si
 * toglie e non si adatta niente: se una frase va cambiata, si cambia prima in
 * inglese e poi qui, cosi' le due pagine restano la stessa pagina.
 *
 * REGOLA (la stessa dell'inglese): qui dentro non si scrive MAI un prezzo e
 * non si traduce MAI il nome di un piatto. I prezzi arrivano da
 * src/lib/prezziMenu.ts. "Top de Gamma" resta "Top de Gamma": e' un nome
 * proprio, e tradotto non si riesce piu' a ordinarlo al banco.
 *
 * Registro: il "du". L'inglese dice "you" e non sceglie; il tedesco deve
 * scegliere. Il sito italiano da' del tu ("vieni", "ti"), e l'inglese e'
 * scritto in tono confidenziale: il "du" e' la resa fedele. Il "Sie" farebbe
 * suonare la pagina tedesca piu' formale dell'originale.
 */

// ─── PIATTI DA MOSTRARE ──────────────────────────────────────────────────────
// `name` deve corrispondere ESATTAMENTE al name in menuData.ts, se no la build
// fallisce (ed e' quello che vogliamo).

export const SCHIACCIATE_IN_VETRINA = [
  {
    name: 'Top de Gamma',
    de: 'Mortadella, Stracciatella-Käse und gehackte Pistazien',
    note: 'Die, wegen der die Leute wiederkommen.',
  },
  {
    name: 'Variante TS',
    de: 'Kochschinken, panierte gebratene Aubergine, Senf und frischer Kren',
    note: 'Das Triestinischste auf der Karte. Kren ist Meerrettich — siehe Glossar.',
  },
  {
    // ⚠️ LA FOTO NON CORRISPONDE AL PIATTO, ED E' UNA SCELTA DEL TITOLARE.
    // Vale qui esattamente come sulla pagina inglese: menuData associa a questa
    // voce `porco_tartufato.webp`, che mostra un altro piatto. Marco ha deciso
    // il 28/08 di tenerla, per non divergere dal menu italiano.
    // NON "correggerla" togliendo la foto: la soluzione e' una fotografia
    // giusta in menuData.ts, che aggiorna tutte e tre le lingue insieme.
    name: 'Porca Zozza',
    de: 'Porchetta, Cacio-e-pepe-Creme, knusprige Zwiebeln und Grana',
    note: 'Gerollter Schweinebraten. Kein leichtes Mittagessen — und will auch keins sein.',
  },
  {
    name: 'Bona ma Leggera',
    de: 'Prosciutto crudo, Stracciatella, Kirschtomaten und Basilikum',
    note: 'Luftgetrockneter Rohschinken, der Klassiker.',
  },
  {
    name: 'Fit',
    de: 'Kirschtomaten, gegrillte Zucchini, Rucola und Stracchino-Käse',
    note: 'Vegetarisch.',
  },
  {
    name: 'Piaza Granda',
    de: 'Thunfisch, gemischter Blattsalat, Tomaten und Limettenmayonnaise',
    note: 'Kein Fleisch, aber Fisch.',
  },
] as const;

// ─── IL GIRO IGNORANTE ───────────────────────────────────────────────────────
// Non sono piatti da buffet: sono SCHIACCIATE tagliate a pezzi per
// condividerle. I numeri (4 pezzi/1 gusto, 8 pezzi/2 gusti, 12 pezzi/3 gusti)
// sono quelli di menuData.ts.

export const GIRO_IGNORANTE = [
  {
    name: 'Duo Retrò',
    de: 'Eine Schiacciata, eine Füllung, in vier Stücke geschnitten',
    note: 'Zum Probieren für eine Person, oder eine Kleinigkeit für zwei.',
  },
  {
    name: 'Muleria Retrò',
    de: 'Zwei Schiacciate, zwei verschiedene Füllungen, in acht Stücke geschnitten',
    note: 'Zwei Personen, je vier Stücke, und zwei Sorten probiert statt einer.',
  },
  {
    name: 'Tavolata Ignorante',
    de: 'Drei Schiacciate, drei verschiedene Füllungen, in zwölf Stücke geschnitten',
    note: 'Für einen ganzen Tisch. Das ist die Bestellung.',
  },
] as const;

export const BIRRE_IN_VETRINA = [
  { name: 'Rye River IPA', de: 'India Pale Ale · 5,6 %', note: 'Wenn du eine Empfehlung willst: die hier.' },
  { name: 'Hell König Ludwig', de: 'Kellerbier · 5,1 %', note: 'Die unkomplizierte.' },
  { name: 'Warsteiner Herb', de: 'Doppelt gehopftes Pils · 4,8 %', note: 'Trocken und herb.' },
  { name: 'Pater Linus Triple', de: 'Abtei-Tripel · 7,5 %', note: 'Stark. Belgische Art.' },
  { name: 'Non Filtrata König Ludwig', de: 'Naturtrübes Kellerbier · 5,1 %', note: 'Trüb, und zwar mit Absicht.' },
] as const;

// ─── COME SI ARRIVA ──────────────────────────────────────────────────────────
// Distanze, tempi e linee misurati su Google Maps il 27/08/2026 e gia'
// verificati per la pagina inglese: qui sono solo tradotti.

export const COME_ARRIVARE = [
  {
    id: 'cruise',
    titolo: 'Du kommst mit dem Kreuzfahrtschiff',
    tempo: '24 Minuten zu Fuß',
    distanza: '1,7 km vom Molo dei Bersaglieri',
    testo:
      'Vom Pier gehst du direkt auf die Piazza Unità d’Italia, den großen Platz zum Meer hin. Überquere ihn und halte dich landeinwärts, immer geradeaus über den Corso Italia und den Viale Carducci, unter den Arkaden. Du kommst am Brunnen am unteren Ende des Viale XX Settembre heraus. Von dort einfach die Allee hinauf. Wir sind auf der linken Seite, Hausnummer 16.',
    bus:
      'Mit dem Bus, 15 Minuten: 200 m an der Uferpromenade entlang bis zur Haltestelle Riva del Mandracchio vor dem Hotel Excelsior, dann die Linie 9 Richtung Piazzale Gioberti. Fünf Stationen, neun Minuten, aussteigen bei Via Battisti (Galleria Fenice) — von dort sind es 150 m. Etwa alle neun Minuten fährt einer.',
  },
  {
    id: 'train',
    titolo: 'Du kommst mit dem Zug',
    tempo: '15 Minuten zu Fuß',
    distanza: '1,0 km vom Bahnhof Trieste Centrale',
    testo:
      'Aus dem Bahnhof heraus landeinwärts über die Via Ghega und die Via Carducci. Der ganze Weg ist eben — keine Steigung, keine Stufen.',
    bus:
      'Mit dem Bus, 11 Minuten: Die Haltestelle Stazione Ferroviaria liegt 120 m vom Bahnhofsausgang. Die Linie 22 Richtung Cattinara (Ospedale) braucht vier Stationen und sechs Minuten; aussteigen bei Portici di Chiozza, dann 220 m zu Fuß. Die Linien 6 und 36 fahren auch hier entlang. Gegenüber dem Fußweg spart das etwa vier Minuten — nimm ihn also wegen des Koffers, nicht wegen der Uhr.',
  },
  {
    id: 'plane',
    titolo: 'Du kommst mit dem Flugzeug',
    tempo: 'insgesamt etwa 50 Minuten',
    distanza: 'Flughafen Triest (TRS), Ronchi dei Legionari',
    testo:
      'Der Flughafen hat einen eigenen Bahnhof, der mit dem Terminal durch einen überdachten Steg verbunden ist. Nimm den Regionalzug nach Trieste Centrale — 29 bis 32 Minuten — und ab dort gilt der vorige Punkt: 15 Minuten zu Fuß oder die Linie 22.',
  },
  {
    id: 'car',
    titolo: 'Du kommst mit dem Auto',
    tempo: 'unter einer Minute zu Fuß',
    distanza: 'Geparkom, Via Spiro Tipaldo Xydias 6 · geöffnet 8:00–20:00',
    testo:
      'Der Viale XX Settembre ist Fußgängerzone, bis vor unsere Tür kann man also nicht fahren. Tagsüber nimmst du das Parkhaus gleich nebenan — Geparkom, Via Spiro Tipaldo Xydias 6. Heraus, links, und du bist da. Zum Mittagessen ist das die einfache Antwort, und dieselbe gilt, wenn du aus Slowenien oder Kroatien herüberfährst.',
    sera:
      'Zum Abendessen? Das Parkhaus schließt um 20:00 Uhr und ist beim Weggehen also zu. Es geht trotzdem auf: In diesem Viertel arbeiten die Leute, und ab etwa acht Uhr abends fahren sie nach Hause, dann werden die Plätze auf der Straße frei. Lies das Schild neben den blau markierten Feldern, bevor du vom Auto weggehst — die gebührenpflichtigen Zeiten stehen am Automaten.',
  },
  {
    id: 'walk',
    titolo: 'Du bist schon in der Altstadt',
    tempo: '16 Minuten zu Fuß',
    distanza: '1,1 km von der Piazza Unità d’Italia',
    testo:
      'Den Corso Italia hinauf und du bist auf dem Viale. Eine Straße, eine Richtung — viel falsch machen kann man nicht.',
  },
] as const;

// Le linee che passano dalla fermata piu' vicina. Verificate su Google Maps il
// 27/08/2026 (fermata Via Battisti / Galleria Fenice).
export const FERMATA_VICINA = {
  nome: 'Via Battisti (Galleria Fenice)',
  distanza: '150 m — zwei Minuten zu Fuß',
  linee: '3 · 6 · 9 · 22 · 35 · 36 · 57 · 58 · B',
  biglietto:
    'In den Stadtbussen von Triest kannst du beim Einsteigen einfach eine kontaktlose Karte oder das Handy an das Lesegerät halten: Die Karte ist das Ticket. Sonst kaufst du es vorher, in jeder Tabaccheria oder am Zeitungskiosk.',
} as const;

// ─── GLOSSARIO ───────────────────────────────────────────────────────────────
// ⚠️ La colonna `pron` NON e' traducibile parola per parola: e' la pronuncia
// riscritta con l'ortografia di chi legge. "skyat-CHA-ta" funziona per un
// inglese; un tedesco leggerebbe "CHA" come /xa/. Quindi le pronunce sono
// riscritte con le regole tedesche (sch = /ʃ/, niente "ch" per il suono /k/).
// Le definizioni invece sono tradotte alla lettera, voce per voce.

export const GLOSSARIO = [
  {
    parola: 'Schiacciata',
    pron: 'skiatt-SCHA-ta',
    def: 'Focaccia-Teig, gebacken, längs aufgeschnitten und gefüllt. Keine Pizza, kein Sandwich.',
  },
  {
    parola: 'Buffet',
    pron: 'bu-FEH',
    def: 'In Triest ist damit kein Selbstbedienungsbüfett gemeint. Gemeint sind viele sehr kleine Teller, die man teilt.',
  },
  {
    parola: 'Kren',
    pron: 'kreen',
    def: 'Geriebener Meerrettich. Scharf, ein bisschen wie Wasabi. Triest gibt ihn auf den Schinken und nimmt ihn ernst.',
  },
  {
    parola: 'Un nero',
    pron: 'un NEH-ro',
    def: 'Ein Espresso. Bestell „un caffè“, und alle wissen, dass du nicht von hier bist.',
  },
  {
    parola: 'Un capo',
    pron: 'un KA-po',
    def: 'Ein Espresso mit etwas Milchschaum. Im übrigen Italien heißt das Macchiato.',
  },
  {
    parola: 'In b',
    pron: 'in BI',
    def: 'Sag „un nero in b“ oder „un capo in b“, und er kommt im kleinen Glas statt in der Tasse. Das b steht für bicchiere, Glas.',
  },
  {
    parola: 'Rebechin',
    pron: 'reh-be-KIN',
    def: 'Die kleine Zwischenmahlzeit am Vormittag oder am späten Nachmittag, im Stehen an der Theke, mit einem kleinen Glas dazu.',
  },
  {
    parola: 'Spritz bianco',
    pron: 'schprits BJAN-ko',
    def: 'Weißwein, Sprudelwasser, Eis, Zitrone. Das bekommst du hier, wenn du einfach „einen Spritz“ sagst.',
  },
] as const;

// ─── FAQ ─────────────────────────────────────────────────────────────────────
// Le stesse dodici domande della pagina inglese, nello stesso ordine. Vanno
// anche nei dati strutturati, in src/app/(de)/de/page.tsx: le due liste devono
// restare identiche.

export const FAQ = [
  {
    q: 'Muss ich einen Tisch reservieren?',
    a: 'Nicht unbedingt — du kannst einfach hereinkommen, an der Theke bestellen und dich hinsetzen. Eine Reservierung ist aber eine gute Idee, vor allem abends und wenn du sicher einen Tisch draußen willst. Ruf uns an oder schreib uns eine WhatsApp-Nachricht. Für eine Gruppe lohnt es sich jedes Mal.',
  },
  {
    q: 'Spricht bei euch jemand Englisch?',
    a: 'Ja. An der Theke kannst du auf Englisch bestellen.',
  },
  {
    q: 'Kann ich mit Karte zahlen?',
    a: 'Ja, wir nehmen Karten.',
  },
  {
    q: 'Kann ich das Essen mitnehmen?',
    a: 'Ja. Alles auf der Karte können wir zum Mitnehmen einpacken — praktisch, wenn du zurück zum Schiff oder zum Zug gehst.',
  },
  {
    q: 'Habt ihr vegetarische Gerichte?',
    a: 'Ja, und hier sind sie beim Namen. Die Schiacciata Fit: Kirschtomaten, gegrillte Zucchini, Rucola und Stracchino-Käse. Der Bruschettone Classico: Tomate, Knoblauch, Olivenöl und Basilikum. Die Pommes. Die Chifeletti — frittierte Triestiner Kartoffelnocken, innen weich, außen knusprig. Und beide Süßspeisen: die Nutella-Schiacciata und die Nutella-Chifeletti. Frag an der Theke, dann gehen wir den Rest mit dir durch.',
  },
  {
    q: 'Habt ihr glutenfreie Gerichte?',
    a: 'Eine glutenfreie Küche können wir nicht versprechen. Alles wird im selben Raum zubereitet, in dem wir den ganzen Tag mit Mehl arbeiten — wenn du Zöliakie hast, sagen wir dir das lieber ehrlich, als etwas zu riskieren. Frag uns an der Theke, dann sagen wir dir genau, was in jedem Gericht ist.',
  },
  {
    q: 'Können wir draußen sitzen?',
    a: 'Ja, das ganze Jahr über. Unsere Tische stehen draußen auf der Allee unter den Platanen — der Viale XX Settembre ist für den Verkehr gesperrt, das ist also Gehweg und keine Straße. Drinnen gibt es auch Tische, dort sitzen die meisten im Winter; im Sommer bleiben fast alle draußen.',
  },
  {
    q: 'Gibt es eine Toilette?',
    a: 'Ja, für Gäste.',
  },
  {
    q: 'Ist es rollstuhlgerecht?',
    a: 'Ja. Alles liegt auf einer Ebene, drinnen gibt es keine Stufen.',
  },
  {
    q: 'Welche Bushaltestelle ist die nächste?',
    a: 'Via Battisti (Galleria Fenice), 150 Meter entfernt — etwa zwei Minuten zu Fuß. Dort halten die Linien 3, 6, 9, 22, 35, 36, 57, 58 und B. Vom Kreuzfahrtterminal nimmst du die Linie 9, vom Bahnhof die Linie 22.',
  },
  {
    q: 'Was kostet eine Mahlzeit?',
    a: 'Ein leichtes Mittagessen bleibt unter 10 €. Eine ganze Mahlzeit — eine große Schiacciata, etwas zum Teilen, Bier mit Freunden — liegt bei etwa 15 bis 20 € pro Person. Mit einer Rechnung von 50 € pro Kopf hier hinauszugehen ist ziemlich schwer. Wenn du es schaffst, hast du viel Bier gekauft — und wahrscheinlich auch ein paar neue Freunde.',
  },
  {
    q: 'Wie sind eure Öffnungszeiten?',
    a: 'Montag bis Donnerstag 8:00 bis 01:00 Uhr, Freitag und Samstag 8:00 bis 02:00 Uhr, Sonntag 17:00 bis 23:30 Uhr. Wir haben jeden Tag offen; sonntags öffnen wir erst am Nachmittag.',
  },
] as const;
