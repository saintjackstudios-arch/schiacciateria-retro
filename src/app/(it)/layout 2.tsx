import Documento from '@/components/Documento';

export { metadataSito as metadata } from '@/lib/metadataSito';

/**
 * Il guscio delle pagine italiane: le 44 che c'erano prima, indirizzi
 * invariati. Le parentesi in `(it)` dicono a Next che la cartella serve solo a
 * noi per tenere in ordine e NON entra nell'indirizzo: `(it)/menu` resta
 * `/menu`.
 */
export default function LayoutItaliano({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Documento lingua="it">{children}</Documento>;
}
