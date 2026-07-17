export interface MenuItem {
  name: string;
  ingredients?: string;
  price: string | number;
  description?: string;
  badge?: string;
}

export interface MenuCategory {
  title: string;
  subtitle?: string;
  items: MenuItem[];
  layout?: 'grid' | 'list' | 'columns';
}

export const menuData: MenuCategory[] = [
  {
    title: "L'APERITIVO IGNORANTE",
    subtitle: "La Lavagna: ogni giorno trovi qualcosa di nuovo per farti provare tutte le nostre specialità (chiedi al cameriere)",
    layout: 'grid',
    items: [
      {
        name: "Special “TAIER” Edition",
        description: "I nostri taglieri sono ottimi per aperitivo, speciali per la cena. In due formati:",
        price: "",
      },
      {
        name: "1. CHE BON ARA",
        price: 12,
      },
      {
        name: "2. A BADILADE",
        price: 16,
      },
      {
        name: "Daghe un Taio",
        description: "Scegli 5 o 10 tartine, ve le tagliamo a metà così potrai condividerle senza litigare.",
        price: "10/17",
      },
      {
        name: "Forxemeo che One",
        description: "Scegliere tra le nostre schiacciate è sempre un'impresa, quindi scegli 4 gusti al resto ci pensiamo noi. Chiedi al nostro cameriere cosa comprende l'offerta.",
        price: 18,
      }
    ]
  },
  {
    title: "TARTINE, TAPAS O CICCHETTI?",
    subtitle: "MA SECONDO VOI COME SI CHIAMANO? A VOI LA SCELTA...",
    layout: 'columns',
    items: [
      { name: "PFF", ingredients: "prosciutto, formaggio e funghi", price: 2.50 },
      { name: "La Stravagante", ingredients: "finocchiona, stracciatella e cipolla caramellata", price: 2.50 },
      { name: "Crudo Pesto", ingredients: "prosciutto crudo i.g.p., pesto, stracciatella e noci", price: 2.50 },
      { name: "Anni 80", ingredients: "prosciutto cotto, formaggio e salsa rossa", price: 2.50 },
      { name: "La Crudo", ingredients: "prosciutto crudo, stracciatella e pomodorini basilico", price: 2.50 },
      { name: "Pesceto", ingredients: "dentice e granella di pistacchio", price: 2.50 },
      { name: "Porcona", ingredients: "pulled pork cheddar e patate in tecia", price: 2.50 },
      { name: "La romanaccia", ingredients: "carbocrema e guanciale croccante", price: 2.50 },
      { name: "La Laziale", ingredients: "cacio e pepe e guanciale croccante", price: 2.50 },
      { name: "Mortazza 1", ingredients: "mortadella i.g.p., stracciatella e granella di pistacchio", price: 2.50 },
      { name: "Mortazza 2", ingredients: "mortadella i.g.p., gorgonzola e peperone", price: 2.50 },
      { name: "Venderigola", ingredients: "verdure grigliate, stracciatella e basilico", price: 2.50 },
      { name: "Bela Trieste", ingredients: "prosciutto cotto, senape e kren", price: 2.50 },
      { name: "Lord Lardo", ingredients: "lardo alle erbe e sale nero", price: 2.50 },
      { name: "El salmon xe bon", ingredients: "salmone, salsa guacamole e pomodorini", price: 2.50 },
      { name: "Marinaresca", ingredients: "acciughe stracciatella e pomodorini", price: 2.50 }
    ]
  },
  {
    title: "QUELLE VENDUDE A BADILADE. SCHIACCIATE:",
    layout: 'grid',
    items: [
      { name: "OSTERIA", ingredients: "Mortadella i.g.p. crema di gorgonzola e peperoni verdi", price: 7 },
      { name: "PROFUMI DE BOSCO", ingredients: "Prosciutto cotto “Sfreddo”, edamer e funghi Porcini", price: 8 },
      { name: "LEGGERA MA BONA", ingredients: "Prosciutto crudo d.o.p., stracciatella di burrata, rucola e grana a scaglie", price: 8 },
      { name: "BONA MA LEGGERA", ingredients: "Prosciutto crudo d.o.p., stracciatella di burrata, pomodorini e basilico", price: 8 },
      { name: "PORCO TARTUFATO", ingredients: "Pancetta arrotolata, rucola, stracciatella di burrata, crema al tartufo e rucola", price: 9 },
      { name: "Provadela", ingredients: "Mortadella i.g.p., provola affumicata e pomodori semisecchi (o semisoleggiati)", price: 7.5 },
      { name: "LA TOP de GAMMA", ingredients: "Mortadella, stracciatella di burrata e crema al pistacchio", price: 7.5 },
      { name: "LA RETRO’", ingredients: "Prosciutto cotto “SFREDDO”, lardo alle erbe, crema di patate in “Tecia” olio al tartufo e kren", price: 9 }
    ]
  },
  {
    title: "COLLEZIONE PRIMAVERA / ESTATE",
    layout: 'grid',
    items: [
      { name: "La Triestina Special", ingredients: "Mortazza i.g.p., stracciatella di burrata e crema di patate in tecia", price: 8.50 },
      { name: "Estiva ma non troppo", ingredients: "Carne salada, crema di pistacchio, stracciatella di burrata e granella di nocciole", price: 9.50 },
      { name: "Che spettacolo!!", ingredients: "Mortadella i.g.p., pesto, stracciatella, pomodorini semisoleggiati e crema di basilico", price: 8.50 },
      { name: "3 volte bon!", ingredients: "Prosciutto cotto, crema di patate in tecia, crema al tartufo e provola affumicata", price: 9.50 },
      { name: "Carciofoni!!", ingredients: "Prosciutto cotto, stracchino, crema di carciofi e rucola", price: 8 },
      { name: "La diversamente normale", ingredients: "Finocchiona, caciotta al pepe nero, cipolle caramellate e pomodori secchi", price: 8.50 },
      { name: "La romagnola", ingredients: "Prosciutto crudo d.o.p., stracchino e rucola", price: 8 },
      { name: "La estiva per davvero", ingredients: "Stracchino, rucola, zucchine grigliate e pomodorini semisoleggiati", price: 8.50 },
      { name: "Carpaccion!!", ingredients: "Carpaccio di carne salada, stracchino, rucola e grana a scaglie", price: 9.50 },
      { name: "Pollastro 1", ingredients: "Fajitas di pollo, bacon, insalata, pomodorini semisoleggiati e provola", price: 9.50 },
      { name: "Pollastro 2", ingredients: "Fajitas di pollo, stracchino, rucola e verdure grigliate", price: 9 }
    ]
  },
  {
    title: "FRITO DEI EVERY DAY",
    layout: 'list',
    items: [
      { name: "Polpette de carne", description: "come le fazeva mia nona...", price: 1.50 },
      { name: "Sovracoscia de pollo Frita e disossada", description: "Bona de paura", price: 4 },
      { name: "Lubljanske", description: "porco ripiene de cotto e formaggio", price: 4 },
      { name: "Melanzane", description: "resta melanzane", price: 1 },
      { name: "Melanzane farcite", description: "come quelle de prima solo ripiene de prosciutto e formaggio", price: 2.50 },
      { name: "Polpette farcite", description: "praticamente l'ottava meraviglia del mondo", price: 2.50 },
      { name: "Polpette de patate in tecia", description: "create nei nostri laboratori segreti", price: 1.20 }
    ]
  },
  {
    title: "LE VEGETARIANE",
    layout: 'grid',
    items: [
      { name: "Verdure Grigliate", ingredients: "Formaggio a scelta e rucola", price: 7 },
      { name: "Stracciatella di burrata", ingredients: "rucola, pomodorini e grana a scaglie", price: 7 },
      { name: "Rucola, Pecorino al Pepe nero", ingredients: "cipolle caramellate e pomodorini semisecchi (o semisoleggiati)", price: 8 }
    ]
  },
  {
    title: "SCHIACCIA CON NOI",
    layout: 'list',
    items: [
      { name: "N.1", ingredients: "Cotto “SFREDDO”, senape e Kren", price: 6 },
      { name: "N.2", ingredients: "Cotto “SFREDDO”, Edamer e salsa a piacere", price: 6.5 },
      { name: "N.3", ingredients: "Finocchiona Senese, Verdure Grigliate, Crema di Carciofi e Rucola", price: 7.5 },
      { name: "N.4", ingredients: "Pulled pork Crema di patate in tecia e ceddarh", price: 8 },
      { name: "N.5", ingredients: "Salsiccia nostrana, Provola affumicata e patate al forno", price: 8.5 }
    ]
  }
];
