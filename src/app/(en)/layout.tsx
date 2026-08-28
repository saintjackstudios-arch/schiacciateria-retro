import Documento from '@/components/Documento';

export { metadataSito as metadata } from '@/lib/metadataSito';

/**
 * Il guscio delle pagine inglesi. Cambia una parola sola rispetto a quello
 * italiano — la lingua — ed e' tutto il motivo per cui i gruppi esistono:
 * adesso `<html lang="en">` sta gia' nell'HTML statico di /en, non ce lo mette
 * piu' una riga di JavaScript dopo il caricamento.
 *
 * Titolo, descrizione, canonical, hreflang e Open Graph di /en se li riscrive
 * la pagina: qui sotto resta solo cio' che vale per tutto il sito.
 */
export default function LayoutInglese({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Documento lingua="en">{children}</Documento>;
}
