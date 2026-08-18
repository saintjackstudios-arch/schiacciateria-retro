'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import InfoLocale from '@/components/InfoLocale';

// ─── DATA STRUCTURES ──────────────────────────────────────────────────────────

interface MenuItem {
  name: string;
  ingredients?: string;
  price: string | number;
  description?: string;
  image?: string;
  menuPriceWithChips?: string; // For burgers/smash-ata
}

// LUNCH ITEMS
const PRANZO_SCHIACCIATE: MenuItem[] = [
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

const PRANZO_INSALATONE: MenuItem[] = [
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
const CENA_SCHIACCIATE: MenuItem[] = [
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

const CENA_SMASH: MenuItem[] = [
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
const PRANZO_BRUSCHETTONI: MenuItem[] = [
  { name: 'Classico', ingredients: 'Pomodorini freschi, aglio, olio EVO e basilico', price: 5.0, image: '/images/bruschettone_classico.webp' },
  { name: 'Sapore di Mare', ingredients: 'Gamberetti e salsa rosa fatta in casa', price: 6.0, image: '/images/bruschettone_gamberetti.webp' },
  { name: 'Tradizione Trieste', ingredients: 'Prosciutto cotto Sfreddo e kren fresco', price: 5.0, image: '/images/bruschettone_cotto_kren.webp' }
];

const CENA_BRUSCHETTONI: MenuItem[] = [
  { name: 'Classico', ingredients: 'Pomodorini freschi, aglio, olio EVO e basilico', price: 5.0, image: '/images/bruschettone_classico.webp' },
  { name: 'Sapore di Mare', ingredients: 'Gamberetti e salsa rosa fatta in casa', price: 6.0, image: '/images/bruschettone_gamberetti.webp' },
  { name: 'Tradizione Trieste', ingredients: 'Prosciutto cotto Sfreddo e kren fresco', price: 5.0, image: '/images/bruschettone_cotto_kren.webp' },
  { name: 'Goloso', ingredients: 'Prosciutto cotto, formaggio filante e salsa rosa', price: 6.0, image: '/images/bruschettone_goloso.webp' },
  { name: 'Romano', ingredients: 'Guanciale croccante, crema cacio e pepe', price: 6.0, image: '/images/bruschettone_romano.webp' }
];

const SFIZI_PATATE: MenuItem[] = [
  { name: 'Patatine Fritte', ingredients: 'Croccanti e dorate, perfette da condividere', price: 4.5, image: '/images/patatine.webp' },
  { name: 'Chifeletti', ingredients: 'I tradizionali gnocchi di patate fritti triestini, morbidi dentro e croccanti fuori', price: 4.5, image: '/images/chifeletti.webp' }
];

const SFIZI_ALTRI: MenuItem[] = [
  { name: 'Duo Retrò', ingredients: 'Giro Ignorante - 4 pezzi, 1 gusto (Ideale per un assaggio veloce)', price: 6.0, image: '/images/duo_retro.webp' },
  { name: 'Muleria Retrò', ingredients: 'Giro Ignorante - 8 pezzi, 2 gusti (Da condividere in due)', price: 12.0, image: '/images/muleria_retro.webp' },
  { name: 'Tavolata Ignorante', ingredients: 'Giro Ignorante - 12 pezzi, 3 gusti (La badilata definitiva per il tavolo)', price: 16.0, image: '/images/tavolata_ignorante.webp' }
];

const DOLCI: MenuItem[] = [
  { name: 'Schiacciata alla Nutella', ingredients: 'La nostra schiacciata romana calda riempita di Nutella cremosa', price: 4.0, image: '/images/schiacciata_nutella.webp' },
  { name: 'Chifeletti alla Nutella', ingredients: 'I nostri mitici chifeletti fritti caldi ricoperti di Nutella', price: 4.0, image: '/images/chifeletti_nutella.webp' }
];

const BEVANDE_BIRRE: MenuItem[] = [
  { name: 'Hell König Ludwig', ingredients: 'Stile: Keller | Fermentazione: Bassa | Grad. alc.: 5,1%', price: '0,2 l - 3,00€\n0,4 l - 5,00€\n0,5 l - 5,50€', image: '/images/birra_konig.jpg' },
  { name: 'Warsteiner Herb', ingredients: 'Stile: Pilsner doppio luppolo | Fermentazione: Bassa | Grad. alc.: 4,8%', price: '0,2 l - 3,00€\n0,4 l - 5,00€\n0,5 l - 5,50€', image: '/images/birra_warsteiner.jpg' },
  { name: 'Pater Linus Triple', ingredients: 'Stile: Tripel d\'Abbazia | Fermentazione: Alta | Grad. alc.: 7,5%', price: '0,33 l - 4,50€\n0,4 l - 7,00€', image: '/images/birra_pater_linus.jpg' },
  { name: 'Non Filtrata König Ludwig', ingredients: 'Stile: Keller / Non filtrata | Fermentazione: Bassa | Grad. alc.: 5,1%', price: '0,2 l - 3,00€\n0,4 l - 5,00€\n0,5 l - 5,50€', image: '/images/birra_konig_non_filtrata.jpg' },
  { name: 'Rye River IPA', ingredients: 'Stile: IPA - India Pale Ale | Fermentazione: Alta | Grad. alc.: 5,6%', price: '0,25 l - 4,00€\n0,4 l - 7,00€', image: '/images/birra_rye_river.jpg' },
  { name: 'Birra a Rotazione', ingredients: 'Chiedi allo staff qual è la birra del momento!', price: 'Chiedi al banco', image: '/images/birra_rotazione.jpg', description: 'Abbiamo sempre una selezione di birre a rotazione. Chiedi al personale per scoprire le novità.' }
];

const BEVANDE_SPRITZ: MenuItem[] = [
  { name: 'Spritz Sarti', ingredients: 'Prosecco, soda e liquore Sarti', price: 5.0, image: '/images/spritz_retro.jpg' },
  { name: 'Anguria Spritz', ingredients: 'Prosecco, soda e liquore all\'anguria Piolo e Max', price: 5.0, image: '/images/spritz_anguria.jpg' },
  { name: 'Passion Spritz', ingredients: 'Prosecco, soda e sciroppo passion fruit', price: 5.0, image: '/images/spritz_passion.jpg' },
  { name: 'Spritz Retrò', ingredients: 'Prosecco, soda e liquore ai frutti rossi Max e Piolo', price: 5.0, image: '/images/spritz_retro.jpg' },
  { name: 'Mango Spritz', ingredients: 'Prosecco, soda e liquore al mango Piolo e Max', price: 5.0, image: '/images/spritz_mango.jpg' },
  { name: 'Pink Spritz', ingredients: 'Prosecco, soda e tonica al pompelmo rosa', price: 5.0, image: '/images/spritz_pink.jpg' }
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function ItemCard({
  name,
  ingredients,
  price,
  image,
  onClick,
  menuPriceWithChips
}: MenuItem & { onClick?: () => void }) {
  const priceStr =
    price !== undefined && price !== ''
      ? typeof price === 'number'
        ? `€${price.toFixed(2).replace('.', ',')}`
        : String(price).includes('€') ? String(price) : `€${price}`
      : undefined;

  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -6, boxShadow: '10px 10px 0px #000' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      onClick={onClick}
      className={cn(
        "relative bg-yellow-400 border-4 border-black p-5 flex flex-col gap-2 overflow-hidden",
        onClick ? "cursor-pointer" : "cursor-default"
      )}
    >
      <div className="w-full aspect-video bg-zinc-100 border-2 border-black flex items-center justify-center mb-3 rounded-sm overflow-hidden relative">
        {image ? (
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-yellow-300 flex items-center justify-center">
            <span className="text-black/30 font-display font-black uppercase text-xl italic">RETRÒ</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-display font-black uppercase italic text-xl md:text-2xl leading-tight flex-1 text-black">
          {name}
        </h3>
        {priceStr && (
          <span className="bg-black text-yellow-400 font-black text-sm md:text-lg px-3 py-1 shrink-0 -rotate-1 whitespace-pre-line text-right">
            {priceStr}
          </span>
        )}
      </div>
      {ingredients && (
        <p className="text-black/70 font-bold leading-snug text-sm md:text-base">{ingredients}</p>
      )}
      {menuPriceWithChips && (
        <div className="mt-2 inline-block bg-red-600 text-white font-black text-xs uppercase px-2 py-0.5 border-2 border-black -rotate-1">
          Menu + Patatine: {menuPriceWithChips}
        </div>
      )}
    </motion.article>
  );
}

function ItemModal({ 
  item, 
  onClose 
}: { 
  item: MenuItem; 
  onClose: () => void 
}) {
  const priceStr =
    item.price !== undefined && item.price !== ''
      ? typeof item.price === 'number'
        ? `€${item.price.toFixed(2).replace('.', ',')}`
        : String(item.price).includes('€') ? String(item.price) : `€${item.price}`
      : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-2xl bg-white border-4 border-black shadow-[15px_15px_0px_#000] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full aspect-video relative bg-yellow-400 border-b-4 border-black">
          {item.image ? (
            <Image 
              src={item.image} 
              alt={item.name} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display font-black uppercase italic text-4xl text-black/10">Barretrò</span>
            </div>
          )}
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black text-yellow-400 w-12 h-12 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_#facc15] hover:scale-110 active:scale-90 transition-transform"
          >
            <span className="font-black text-2xl leading-none">×</span>
          </button>
        </div>

        <div className="p-6 md:p-10 space-y-6">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <h2 className="font-display font-black uppercase italic text-4xl md:text-6xl text-black leading-none">
              {item.name}
            </h2>
            {priceStr && (
              <span className="bg-red-600 text-white font-black text-xl md:text-3xl px-4 py-2 border-4 border-black -rotate-2 whitespace-pre-line text-right">
                {priceStr}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-yellow-100 border-l-8 border-yellow-400 p-4">
              <p className="text-black/60 text-xs uppercase font-black tracking-widest mb-1">Ingredienti:</p>
              <p className="text-black font-bold text-lg leading-snug">
                {item.ingredients}
              </p>
            </div>

            {item.description && (
              <div className="text-black font-medium text-lg md:text-xl leading-relaxed italic">
                {item.description}
              </div>
            )}
            {item.menuPriceWithChips && (
              <div className="bg-zinc-100 border-l-8 border-black p-4">
                <span className="text-black font-black uppercase tracking-wider text-sm">Opzione Menu Completo:</span>
                <p className="font-bold text-lg text-red-600">Servito con patatine fritte a {item.menuPriceWithChips}</p>
              </div>
            )}
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-black text-yellow-400 font-display font-black uppercase italic text-2xl py-4 border-4 border-black shadow-[8px_8px_0px_#facc15] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            CHIUDI
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionTitle({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-10 border-b-[6px] border-black pb-4 mt-16">
      <h2 className="font-display font-black uppercase italic text-3xl md:text-5xl leading-none tracking-tighter">
        {children}
      </h2>
      {accent && (
        <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 border-2 border-black -rotate-2 shrink-0">
          {accent}
        </span>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function MenuClient() {
  const [menuType, setMenuType] = useState<'pranzo' | 'cena'>('pranzo');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Sync menu type with URL search params (e.g. ?type=pranzo or ?type=cena)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const type = params.get('type');
      if (type === 'pranzo' || type === 'cena') {
        setMenuType(type);
      }
    }
  }, []);

  const changeMenuType = (type: 'pranzo' | 'cena') => {
    setMenuType(type);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('type', type);
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfaf3] selection:bg-yellow-400 selection:text-black font-sans pb-24 pt-16 md:pt-20">
      
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black border-b-8 border-black w-full aspect-[1024/571] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/menu_hero_schiacciata.webp"
            alt="Menu Hero Background"
            fill
            sizes="100vw"
            className="object-cover"
            preload
            quality={100}
          />
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full max-w-[95vw] md:max-w-7xl px-2 md:px-24 mb-12 md:mb-0">
             <motion.div 
               initial={{ x: -100, opacity: 0, rotate: -15 }}
               animate={{ x: 0, opacity: 1, rotate: -12 }}
               whileHover={{ scale: 1.1, rotate: -8, y: -5 }}
               className="pointer-events-auto bg-white text-black px-3 py-1.5 md:px-8 md:py-4 font-black uppercase text-xl md:text-7xl border-4 md:border-8 border-black shadow-[8px_8px_0px_#000] md:shadow-[18px_18px_0px_#000] -translate-y-16 md:-translate-y-48 -mr-12 md:mr-0"
             >
               Posate
             </motion.div>

             <motion.h1
               initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
               animate={{ scale: 1, opacity: 1, rotate: -3 }}
               whileHover={{ scale: 1.05, rotate: -1 }}
               className="pointer-events-auto bg-yellow-400 text-black px-4 py-2 md:px-10 md:py-5 font-display font-black uppercase italic text-3xl md:text-8xl leading-none border-4 md:border-8 border-black shadow-[8px_8px_0px_#000] md:shadow-[18px_18px_0px_#000] z-10"
             >
               Menu
             </motion.h1>

             <motion.div 
               initial={{ x: 100, opacity: 0, rotate: 15 }}
               animate={{ x: 0, opacity: 1, rotate: 12 }}
               whileHover={{ scale: 1.1, rotate: 8, y: -5 }}
               className="pointer-events-auto bg-white text-black px-3 py-1.5 md:px-8 md:py-4 font-black uppercase text-xl md:text-7xl border-4 md:border-8 border-black shadow-[8px_8px_0px_#000] md:shadow-[18px_18px_0px_#000] translate-y-12 md:translate-y-24 -ml-12 md:ml-0"
             >
               no servi
             </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section Content ─────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 py-6 min-h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={menuType}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            
            {menuType === 'pranzo' ? (
              // ☀️ LUNCH LAYOUT
              <div key="pranzo-layout">
                {/* Promo Banner */}
                <div className="bg-yellow-400 border-4 border-black p-6 my-8 shadow-[8px_8px_0px_#000] -rotate-1">
                  <h3 className="font-display font-black text-2xl uppercase italic text-black">PAUSA PRANZO RAPIDA</h3>
                  <p className="font-bold text-black/80 mt-1">Schiacciate giganti ripiene a badilate e fresche insalatone pronte in pochi minuti per ricaricarti.</p>
                </div>

                {/* Schiacciate */}
                <SectionTitle accent="Preparate al momento">Le Nostre Schiacciate</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {PRANZO_SCHIACCIATE.map((item) => (
                    <ItemCard key={item.name} {...item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>

                {/* Insalatone */}
                <SectionTitle accent="Per star leggeri">Le Insalatone</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {PRANZO_INSALATONE.map((item) => (
                    <ItemCard key={item.name} {...item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>

                {/* Bruschettoni */}
                <SectionTitle>Bruschettoni</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {PRANZO_BRUSCHETTONI.map((item) => (
                    <ItemCard key={item.name} {...item} />
                  ))}
                </div>
              </div>
            ) : (
              // 🌙 DINNER LAYOUT
              <div key="cena-layout">
                {/* Promo Banner */}
                <div className="bg-black text-yellow-400 border-4 border-black p-6 my-8 shadow-[8px_8px_0px_#facc15] rotate-1">
                  <h3 className="font-display font-black text-2xl uppercase italic">SERATA RETRÒ</h3>
                  <p className="font-bold text-yellow-400/80 mt-1">Schiacciate speciali gourmet, birre artigianali a fiumi e le nostre mitiche Smash-ate.</p>
                </div>

                {/* Schiacciate */}
                <SectionTitle accent="Gourmet & Tradizione">Le Nostre Schiacciate</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {CENA_SCHIACCIATE.map((item) => (
                    <ItemCard key={item.name} {...item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>

                {/* Smash-ata */}
                <SectionTitle accent="La Novità">Le Smash-ate</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {CENA_SMASH.map((item) => (
                    <ItemCard key={item.name} {...item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>

                {/* Bruschettoni */}
                <SectionTitle>Bruschettoni Speciali</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {CENA_BRUSCHETTONI.map((item) => (
                    <ItemCard key={item.name} {...item} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Shared Sections (Drinks & Sfizi) ── */}
            <SectionTitle accent="Ogni giorno">Sfizi & Golosità</SectionTitle>
            
            {/* Patatine & Chifeletti Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SFIZI_PATATE.map((item) => (
                <ItemCard key={item.name} {...item} />
              ))}
            </div>

            {/* Robe de metter sora (Toppings / Salse) - Rendered IMMEDIATELY below Patatine and Chifeletti */}
            <div className="my-8 bg-[#fef2f2] border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] relative overflow-hidden">
              {/* Halftone comic background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_15%,transparent_16%)] bg-[size:10px_10px]" />
              
              <h3 className="font-display font-black uppercase italic text-2xl md:text-3xl mb-3 border-b-2 border-black pb-2 text-[#dc2626] flex items-center gap-2 relative z-10">
                Robe de metter sora per i più golosi 🍟
              </h3>
              <p className="text-zinc-600 font-bold uppercase text-[10px] md:text-xs tracking-wider mb-8 relative z-10">
                Aggiungi un condimento speciale alle tue Patatine o ai tuoi Chifeletti:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-6 pb-6 relative z-10">
                {[
                  { name: 'Cacio e Pepe', price: '1,00 €' },
                  { name: 'Maionese Affumicata', price: '0,50 €' },
                  { name: 'Cipolla Caramellata', price: '0,50 €' },
                  { name: 'Cheddar', price: '0,50 €' },
                  { name: 'Tartufo', price: '1,00 €' },
                  { name: 'Cipolla Crispy', price: '0,50 €' },
                  { name: 'Tzatziki', price: '0,50 €' },
                  { name: 'Salsa Burger', price: '0,50 €' },
                  { name: 'Grana', price: '0,50 €' },
                  { name: 'Bacon', price: '0,50 €' },
                ].map((top, index) => {
                  const rotation = (index % 3 === 0) ? 'rotate-2' : (index % 3 === 1) ? '-rotate-1' : 'rotate-1';
                  return (
                    <motion.div 
                      key={top.name} 
                      className={cn(
                        "relative bg-[#dc2626] border-4 border-black p-4 flex flex-col justify-between items-center text-center shadow-[4px_4px_0px_#000] rounded-2xl min-h-[110px]",
                        rotation
                      )}
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ 
                        duration: 2.5 + (index % 3) * 0.4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.12
                      }}
                      whileHover={{ scale: 1.1, zIndex: 10, rotate: index % 2 === 0 ? 3 : -3 }}
                    >
                      {/* Triangle Pointer for Comic Bubble */}
                      <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-black" />
                      <div className="absolute -bottom-2 left-[25px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-[#dc2626]" />

                      <span className="font-display font-black text-xs md:text-sm text-yellow-300 leading-none mb-3 uppercase tracking-tight">
                        {top.name}
                      </span>
                      <span className="bg-yellow-400 text-black border-2 border-black font-black text-[10px] md:text-xs px-2 py-0.5 transform -rotate-3 select-none shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        {top.price}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Other Sfizi Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {SFIZI_ALTRI.map((item) => (
                <ItemCard key={item.name} {...item} />
              ))}
            </div>

            {/* Dolci Section */}
            <SectionTitle accent="I Golosi">I Nostri Dolci</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DOLCI.map((item) => (
                <ItemCard key={item.name} {...item} />
              ))}
            </div>

            <SectionTitle accent="Per brindare">Le Birre alla Spina</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BEVANDE_BIRRE.map((item) => (
                <ItemCard key={item.name} {...item} />
              ))}
            </div>

            <SectionTitle accent="Aperitivo">I Nostri Spritz</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {BEVANDE_SPRITZ.map((item) => (
                <ItemCard key={item.name} {...item} />
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Selected Item Modal */}
        <AnimatePresence>
          {selectedItem && (
            <ItemModal 
              item={selectedItem} 
              onClose={() => setSelectedItem(null)} 
              key="menu-modal"
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Orari + contatti ───────────────────────────────── */}
      <InfoLocale />

      {/* ── Allergeni ──────────────────────────────────────── */}
      <div className="bg-zinc-900 text-white py-8 px-5 text-center mt-12">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Chiedi al personale per consultare la lista degli allergeni.
        </p>
      </div>

      {/* ── Footer CTA ─────────────────────────────────────── */}
      <footer className="bg-yellow-400 py-16 px-5 border-t-8 border-black text-center">
        <h2 className="font-display font-black uppercase italic text-4xl md:text-6xl tracking-tighter leading-none mb-4">
          TE GA SCELTO?
        </h2>
        <p className="text-base md:text-xl font-bold text-black/70 mb-8 max-w-2xl mx-auto">
          Te spettemo in viale XX settembre. Preparite a scender in strada,
          <br />
          gavemo anche la birra più bona de Trieste.
        </p>
        <Link href="/" className="btn-western inline-flex items-center gap-3 px-8 py-4 text-lg md:text-2xl group">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
          TORNA ALLA HOME
        </Link>
        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col items-center gap-2">
          <p className="text-[10px] md:text-xs font-bold text-black/50 uppercase tracking-widest">
            © {new Date().getFullYear()} Barretrò. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-black/60 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link>
            <span>•</span>
            <Link href="/termini-e-condizioni" className="hover:text-black transition-colors">Termini e Condizioni</Link>
          </div>
          <p className="text-[9px] text-black/40 uppercase tracking-wider mt-1 max-w-xl leading-normal text-center">
            Nota di trasparenza (AI Act): Alcune immagini presenti sul sito hanno scopo puramente illustrativo e sono state generate o ottimizzate con tecnologie di Intelligenza Artificiale.
          </p>
        </div>
      </footer>

      {/* Sticky Floating Switcher (WhatsApp Style) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1.5 pointer-events-auto">
        <span className="bg-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black transform -rotate-2 select-none shadow-[2px_2px_0px_#facc15]">
          CAMBIA MENU
        </span>
        <div className="relative flex bg-white border-4 border-black p-1 shadow-[4px_4px_0px_#000]">
          <button
            onClick={() => changeMenuType('pranzo')}
            className={cn(
              "relative z-10 px-4 py-2 font-display uppercase italic font-black text-xs md:text-sm transition-colors duration-300 flex items-center gap-1 select-none",
              menuType === 'pranzo' ? "text-black" : "text-black/40 hover:text-black"
            )}
          >
            Pranzo ☀️
          </button>
          <button
            onClick={() => changeMenuType('cena')}
            className={cn(
              "relative z-10 px-4 py-2 font-display uppercase italic font-black text-xs md:text-sm transition-colors duration-300 flex items-center gap-1 select-none",
              menuType === 'cena' ? "text-black" : "text-black/40 hover:text-black"
            )}
          >
            Cena 🌙
          </button>
          {/* Sliding highlight layer */}
          <motion.div
            layoutId="activeMenuTab"
            className="absolute top-1 bottom-1 bg-yellow-400 border-2 border-black z-0"
            style={{
              left: menuType === 'pranzo' ? '4px' : '50%',
              right: menuType === 'pranzo' ? '50%' : '4px',
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />
        </div>
      </div>
    </main>
  );
}
