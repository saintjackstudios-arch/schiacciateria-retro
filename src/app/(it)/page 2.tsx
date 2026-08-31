import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: "Schiacciateria Retrò Trieste | Buffet e Street Food" },
  description: "Schiacciata artigianale, buffet triestino e street food nel cuore di Trieste, Viale XX Settembre. Ingredienti premium, birre selezionate. Vieni a trovarci!",
  alternates: {
    canonical: "https://schiacciateriaretrotrieste.com",
    // L'altra meta' dell'hreflang: /en dichiara questa pagina, questa dichiara
    // /en. Google tiene conto del rimando solo se le due pagine si nominano a
    // vicenda — un rimando in una direzione sola viene ignorato.
    // Quando aggiungiamo una lingua va aggiunta qui e in src/app/en/page.tsx.
    languages: {
      'it-IT': "https://schiacciateriaretrotrieste.com",
      'en': "https://schiacciateriaretrotrieste.com/en",
      'de': "https://schiacciateriaretrotrieste.com/de",
      'x-default': "https://schiacciateriaretrotrieste.com",
    },
  }
};

export default function HomePage() {
  return <HomeClient />;
}
