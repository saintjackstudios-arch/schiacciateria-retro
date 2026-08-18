import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: "Schiacciateria Retrò Trieste | Buffet e Street Food" },
  description: "Schiacciata artigianale, buffet triestino e street food nel cuore di Trieste, Viale XX Settembre. Ingredienti premium, birre selezionate. Vieni a trovarci!",
  alternates: {
    canonical: "https://schiacciateriaretrotrieste.com",
  }
};

export default function HomePage() {
  return <HomeClient />;
}
