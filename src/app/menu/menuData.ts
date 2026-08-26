// Le voci del menu, separate dal componente che le disegna.
//
// Stanno qui e non dentro MenuClient.tsx perche' servono a due lettori diversi:
// la pagina che la persona vede, e la scheda invisibile che dichiara a Google e
// alle IA i piatti con il loro prezzo (src/app/menu/page.tsx).
// Un solo elenco per entrambi: se cambia un prezzo, cambia in un posto solo.
//
// ATTENZIONE: questo NON e' il vecchio src/data/menu.ts, cancellato il 26/08/2026
// perche' era codice morto con prezzi fino al 20% sotto quelli veri. Questo file
// e' importato davvero — da MenuClient.tsx e da page.tsx.

export interface MenuItem {
  name: string;
  ingredients?: string;
  price: string | number;
  description?: string;
  image?: string;
  menuPriceWithChips?: string; // For burgers/smash-ata
}

// LUNCH ITEMS
export const PRANZO_SCHIACCIATE: MenuItem[] = [
  {
    name: 'Top de Gamma',
    ingredients: 'Mortadella, stracciatella e pistacchio',
    price: 8.5,
    image: '/images/top_de_gamma.webp',
    description: 'Il nostro bestseller assoluto. La mortadella profumata incontra la cremosità della stracciatella fresca e la nota croccante della granella di pistacchio.'
  },
  {
    name: 'Bona ma Leggera',
    ingredients: 'Prosciutto crudo, stracciatella, pomodorini e basilico',
    price: 10.0,
    image: '/images/bona_ma_leggera.webp',
    description: 'Il connubio perfetto tra sapidità del crudo di qualità e la freschezza mediterranea dei pomodorini freschi con basilico e stracciatella di burrata.'
  },
  {
    name: 'Fit',
    ingredients: 'Pomodorini, zucchine grigliate, rucola e stracchino',
    price: 10.0,
    image: '/images/estiva_per_davvero.webp',
    description: 'Leggera, vegetariana e freschissima. Le zucchine grigliate sposano la cremosità dello stracchino, rinfrescate da rucola e pomodorini.'
  },
  {
    name: 'Piaza Granda',
    ingredients: 'Tonno, misticanza, pomodori e maionese al lime',
    price: 10.0,
    image: '/images/piaza_granda.webp',
    description: 'Ispirata alla freschezza del mare. Tonno e misticanza croccante, con una nota agrumata di maionese al lime fatta in casa.'
  },
  {
    name: 'Scrigno',
    ingredients: 'Rucola, carpaccio, burrata, olio evo, sale nero e pesto',
    price: 11.0,
    image: '/images/carpaccion.webp',
    description: 'Uno scrigno di sapori nobili. Carpaccio di carne salada tagliato sottile, arricchito da burrata cremosa, pesto profumato e un tocco di sale nero.'
  },
  {
    name: 'Tre Volte Bon',
    ingredients: 'Prosciutto cotto, crema patate in tecia, crema al tartufo e provola',
    price: 10.0,
    image: '/images/3_volte_bon.webp',
    description: 'Per chi vuole osare con la tradizione. Il prosciutto cotto e la provola si fondono con la nostra leggendaria crema di patate in tecia e profumata crema al tartufo.'
  }
];

export const PRANZO_INSALATONE: MenuItem[] = [
  {
    name: 'La Barcolana',
    ingredients: 'Misticanza, tonno o salmone, olive, cipolla rossa, uovo sodo, dressing leggero',
    price: 10.0,
    image: '/images/insalata_barcolana.webp',
    description: 'Ricca e saziante ma leggera come il vento di Barcolana. Scegli tra tonno o salmone.'
  },
  {
    name: 'L\'Italiana',
    ingredients: 'Misticanza, crudo, burrata, pomodorini, olio evo',
    price: 10.0,
    image: '/images/insalata_italiana.webp',
    description: 'Un inno tricolore alla freschezza. Gli ingredienti semplici del nostro crudo e della burrata serviti in un letto di misticanza.'
  },
  {
    name: 'La Proteica',
    ingredients: 'Misticanza, pollo grigliato, grana, pomodorini, salsa yogurt',
    price: 10.0,
    image: '/images/insalata_proteica.webp',
    description: 'Ideale per il post-allenamento o una pausa pranzo carica di energia. Pollo grigliato tenero e salsa allo yogurt leggera.'
  }
];

// DINNER ITEMS
export const CENA_SCHIACCIATE: MenuItem[] = [
  {
    name: 'Top de Gamma',
    ingredients: 'Mortadella, stracciatella e pistacchio',
    price: 8.5,
    image: '/top_de_gamma.webp',
    description: 'Il nostro bestseller assoluto. La mortadella profumata incontra la cremosità della stracciatella fresca e la nota croccante della granella di pistacchio.'
  },
  {
    name: 'Bona ma Leggera',
    ingredients: 'Prosciutto crudo, stracciatella, pomodorini e basilico',
    price: 9.0, // Special cena price
    image: '/bona_ma_leggera.webp',
    description: 'Il connubio perfetto tra sapidità del crudo di qualità e la freschezza mediterranea dei pomodorini freschi con basilico e stracciatella di burrata.'
  },
  {
    name: 'Fit',
    ingredients: 'Pomodorini, zucchine grigliate, rucola e stracchino',
    price: 10.0,
    image: '/estiva_per_davvero.webp',
    description: 'Leggera, vegetariana e freschissima. Le zucchine grigliate sposano la cremosità dello stracchino, rinfrescate da rucola e pomodorini.'
  },
  {
    name: 'Tre Volte Bon',
    ingredients: 'Prosciutto cotto, crema patate in tecia, crema al tartufo e provola',
    price: 10.0,
    image: '/3_volte_bon.webp',
    description: 'Per chi vuole osare con la tradizione. Il prosciutto cotto e la provola si fondono con la nostra leggendaria crema di patate in tecia e profumata crema al tartufo.'
  },
  {
    name: 'Piaza Granda',
    ingredients: 'Tonno, misticanza, pomodori e maionese al lime',
    price: 10.0,
    image: '/images/piaza_granda.webp',
    description: 'Ispirata alla freschezza del mare. Tonno e misticanza croccante, con una nota agrumata di maionese al lime fatta in casa.'
  },
  {
    name: 'Variante TS',
    ingredients: 'Prosciutto cotto, melanzane impanate, senape e kren',
    price: 8.5,
    image: '/images/variante_ts.webp',
    description: 'Un omaggio forte a Trieste. La croccantezza delle melanzane impanate unita al prosciutto cotto, spinta dall\'inconfondibile senape e dal kren grattugiato fresco.'
  },
  {
    name: 'Porca Zozza',
    ingredients: 'Porchetta, crema cacio e pepe, cipolla croccante e grana',
    price: 10.0,
    image: '/images/porco_tartufato.webp',
    description: 'Intensa, saporita, senza freni. La porchetta nostrana arricchita da una generosa crema cacio e pepe, grana e cipolla crispy.'
  },
  {
    name: 'J-Ax',
    ingredients: 'Prosciutto crudo, crema gorgonzola, funghi e melanzana impanada',
    price: 10.0,
    image: '/images/schiacciata_retro.webp',
    description: 'Gusto deciso. La cremosità avvolgente del gorgonzola e la sapidità del crudo si uniscono ai funghi trifolati e alle melanzane impanate croccanti.'
  }
];

export const CENA_SMASH: MenuItem[] = [
  {
    name: 'Retro Smash',
    ingredients: 'Doppio smash retro style, lattuga, cetriolini, cheddar, salsa burger',
    price: 12.5,
    menuPriceWithChips: '15,50 €',
    image: '/images/retro_smash.webp',
    description: 'Il nostro burger classico con la nostra inconfondibile crosticina "smash", formaggio cheddar fuso, lattuga croccante e salsa speciale.'
  },
  {
    name: 'Tartu Smash',
    ingredients: 'Doppio smash retro style, bacon, cheddar, crema al tartufo e lattuga',
    price: 13.0,
    menuPriceWithChips: '16,00 €',
    image: '/images/tartu_smash.webp',
    description: 'Una versione gourmet e intensa del classico smash burger con bacon croccante e una profumata crema al tartufo.'
  },
  {
    name: 'Saint Jack Smash',
    ingredients: 'Doppio smash retro style, bacon, cheddar, salsa barbeque',
    price: 13.0,
    menuPriceWithChips: '16,00 €',
    image: '/images/saint_jack_smash.webp',
    description: 'Deciso e affumicato. Bacon croccante, cheddar filante e una generosa dose di salsa BBQ arricchiscono il doppio smash.'
  },
  {
    name: 'Kebab-ara',
    ingredients: 'Pollo in stile kebab, lattuga, pomodoro, cipolla caramellata, maionese',
    price: 12.5,
    menuPriceWithChips: '15,50 €',
    image: '/images/kebab_ara.webp',
    description: 'Il gusto dello street food mediorientale in chiave Retrò. Tenero pollo marinato speziato, servito con insalata, pomodoro fresco e cipolle caramellate dolci.'
  }
];

// SHARED EXTRA ITEMS
export const PRANZO_BRUSCHETTONI: MenuItem[] = [
  { name: 'Classico', ingredients: 'Pomodorini freschi, aglio, olio EVO e basilico', price: 5.0, image: '/images/bruschettone_classico.webp' },
  { name: 'Sapore di Mare', ingredients: 'Gamberetti e salsa rosa fatta in casa', price: 6.0, image: '/images/bruschettone_gamberetti.webp' },
  { name: 'Tradizione Trieste', ingredients: 'Prosciutto cotto Sfreddo e kren fresco', price: 5.0, image: '/images/bruschettone_cotto_kren.webp' }
];

export const CENA_BRUSCHETTONI: MenuItem[] = [
  { name: 'Classico', ingredients: 'Pomodorini freschi, aglio, olio EVO e basilico', price: 5.0, image: '/images/bruschettone_classico.webp' },
  { name: 'Sapore di Mare', ingredients: 'Gamberetti e salsa rosa fatta in casa', price: 6.0, image: '/images/bruschettone_gamberetti.webp' },
  { name: 'Tradizione Trieste', ingredients: 'Prosciutto cotto Sfreddo e kren fresco', price: 5.0, image: '/images/bruschettone_cotto_kren.webp' },
  { name: 'Goloso', ingredients: 'Prosciutto cotto, formaggio filante e salsa rosa', price: 6.0, image: '/images/bruschettone_goloso.webp' },
  { name: 'Romano', ingredients: 'Guanciale croccante, crema cacio e pepe', price: 6.0, image: '/images/bruschettone_romano.webp' }
];

export const SFIZI_PATATE: MenuItem[] = [
  { name: 'Patatine Fritte', ingredients: 'Croccanti e dorate, perfette da condividere', price: 4.5, image: '/images/patatine.webp' },
  { name: 'Chifeletti', ingredients: 'I tradizionali gnocchi di patate fritti triestini, morbidi dentro e croccanti fuori', price: 4.5, image: '/images/chifeletti.webp' }
];

export const SFIZI_ALTRI: MenuItem[] = [
  { name: 'Duo Retrò', ingredients: 'Giro Ignorante - 4 pezzi, 1 gusto (Ideale per un assaggio veloce)', price: 6.0, image: '/images/duo_retro.webp' },
  { name: 'Muleria Retrò', ingredients: 'Giro Ignorante - 8 pezzi, 2 gusti (Da condividere in due)', price: 12.0, image: '/images/muleria_retro.webp' },
  { name: 'Tavolata Ignorante', ingredients: 'Giro Ignorante - 12 pezzi, 3 gusti (La badilata definitiva per il tavolo)', price: 16.0, image: '/images/tavolata_ignorante.webp' }
];

export const DOLCI: MenuItem[] = [
  { name: 'Schiacciata alla Nutella', ingredients: 'La nostra schiacciata romana calda riempita di Nutella cremosa', price: 4.0, image: '/images/schiacciata_nutella.webp' },
  { name: 'Chifeletti alla Nutella', ingredients: 'I nostri mitici chifeletti fritti caldi ricoperti di Nutella', price: 4.0, image: '/images/chifeletti_nutella.webp' }
];

export const BEVANDE_BIRRE: MenuItem[] = [
  { name: 'Hell König Ludwig', ingredients: 'Stile: Keller | Fermentazione: Bassa | Grad. alc.: 5,1%', price: '0,2 l - 3,00€\n0,4 l - 5,00€\n0,5 l - 5,50€', image: '/images/birra_konig.jpg' },
  { name: 'Warsteiner Herb', ingredients: 'Stile: Pilsner doppio luppolo | Fermentazione: Bassa | Grad. alc.: 4,8%', price: '0,2 l - 3,00€\n0,4 l - 5,00€\n0,5 l - 5,50€', image: '/images/birra_warsteiner.jpg' },
  { name: 'Pater Linus Triple', ingredients: 'Stile: Tripel d\'Abbazia | Fermentazione: Alta | Grad. alc.: 7,5%', price: '0,33 l - 4,50€\n0,4 l - 7,00€', image: '/images/birra_pater_linus.jpg' },
  { name: 'Non Filtrata König Ludwig', ingredients: 'Stile: Keller / Non filtrata | Fermentazione: Bassa | Grad. alc.: 5,1%', price: '0,2 l - 3,00€\n0,4 l - 5,00€\n0,5 l - 5,50€', image: '/images/birra_konig_non_filtrata.jpg' },
  { name: 'Rye River IPA', ingredients: 'Stile: IPA - India Pale Ale | Fermentazione: Alta | Grad. alc.: 5,6%', price: '0,25 l - 4,00€\n0,4 l - 7,00€', image: '/images/birra_rye_river.jpg' },
  { name: 'Birra a Rotazione', ingredients: 'Chiedi allo staff qual è la birra del momento!', price: 'Chiedi al banco', image: '/images/birra_rotazione.jpg', description: 'Abbiamo sempre una selezione di birre a rotazione. Chiedi al personale per scoprire le novità.' }
];

export const BEVANDE_SPRITZ: MenuItem[] = [
  { name: 'Spritz Sarti', ingredients: 'Prosecco, soda e liquore Sarti', price: 5.0, image: '/images/spritz_retro.jpg' },
  { name: 'Anguria Spritz', ingredients: 'Prosecco, soda e liquore all\'anguria Piolo e Max', price: 5.0, image: '/images/spritz_anguria.jpg' },
  { name: 'Passion Spritz', ingredients: 'Prosecco, soda e sciroppo passion fruit', price: 5.0, image: '/images/spritz_passion.jpg' },
  { name: 'Spritz Retrò', ingredients: 'Prosecco, soda e liquore ai frutti rossi Max e Piolo', price: 5.0, image: '/images/spritz_retro.jpg' },
  { name: 'Mango Spritz', ingredients: 'Prosecco, soda e liquore al mango Piolo e Max', price: 5.0, image: '/images/spritz_mango.jpg' },
  { name: 'Pink Spritz', ingredients: 'Prosecco, soda e tonica al pompelmo rosa', price: 5.0, image: '/images/spritz_pink.jpg' }
];
