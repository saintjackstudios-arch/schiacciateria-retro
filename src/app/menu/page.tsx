import { Metadata } from 'next';
import MenuClient from './MenuClient';

export const metadata: Metadata = {
  title: "Menu Schiacciate e Fritti",
  description: "Scopri il menu della Schiacciateria Retrò a Trieste. Schiacciate ripiene a badilate, fritti croccanti, cicchetti e street food triestino in Viale XX Settembre.",
  alternates: {
    canonical: "https://barretro.com/menu",
  }
};

export default function MenuPage() {
  return <MenuClient />;
}
