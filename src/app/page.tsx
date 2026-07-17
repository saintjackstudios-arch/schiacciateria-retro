import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: "Schiacciateria Retrò Trieste | Il Vero Street Food in Viale XX Settembre" },
  description: "Vieni a provare la vera schiacciata artigianale a Trieste. Ingredienti premium, birre selezionate e l'atmosfera inconfondibile di Barretrò. Ti aspettiamo!",
  alternates: {
    canonical: "https://barretro.com",
  }
};

export default function HomePage() {
  return <HomeClient />;
}
