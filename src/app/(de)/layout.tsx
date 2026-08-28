import Documento from '@/components/Documento';

export { metadataSito as metadata } from '@/lib/metadataSito';

/**
 * Il guscio della pagina tedesca. Come quello inglese, cambia una parola sola:
 * la lingua, che finisce in `<html lang="de">` gia' nell'HTML statico.
 */
export default function LayoutTedesco({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Documento lingua="de">{children}</Documento>;
}
