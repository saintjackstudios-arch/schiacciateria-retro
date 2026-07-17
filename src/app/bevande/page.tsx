import { Metadata } from 'next';
import BevandeClient from './BevandeClient';

export const metadata: Metadata = {
  title: "Birre Artigianali e Spritz",
  description: "Scopri la nostra selezione di birre (Warsteiner, König Ludwig, Rye River) e i nostri Spritz speciali. Il perfetto accompagnamento per lo street food triestino.",
  alternates: {
    canonical: "https://barretro.com/bevande",
  }
};

export default function BevandePage() {
  return <BevandeClient />;
}
