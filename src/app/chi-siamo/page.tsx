import { Metadata } from 'next';
import ChiSiamoClient from './ChiSiamoClient';

export const metadata: Metadata = {
  title: "Chi Siamo",
  description: "La storia della Schiacciateria Retrò. La nostra passione per gli ingredienti artigianali, il lievito madre e lo street food fatto come una volta a Trieste.",
  alternates: {
    canonical: "https://schiacciateriaretrotrieste.com/chi-siamo",
  }
};

export default function ChiSiamoPage() {
  return <ChiSiamoClient />;
}
