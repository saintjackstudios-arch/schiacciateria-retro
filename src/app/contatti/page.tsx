import { Metadata } from 'next';
import ContattiClient from './ContattiClient';

export const metadata: Metadata = {
  title: "Contatti e Orari",
  description: "Dove siamo e come contattare la Schiacciateria Retrò. Ti aspettiamo in Viale XX Settembre 16 a Trieste per farti provare il miglior street food della città.",
  alternates: {
    canonical: "https://barretro.com/contatti",
  }
};

export default function ContattiPage() {
  return <ContattiClient />;
}
