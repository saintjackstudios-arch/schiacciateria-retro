import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/blog';

const baseUrl = 'https://schiacciateriaretrotrieste.com';

/**
 * Data dell'ultima modifica REALE delle pagine fisse.
 *
 * Prima qui c'era `new Date()`: tutte e 34 le pagine dichiaravano di essere
 * cambiate al momento della build, anche gli articoli che nessuno aveva toccato.
 * Una data che cambia sempre e vale per tutto non dice niente, e Google smette
 * di leggerla — quindi il giorno in cui una pagina cambia davvero non abbiamo
 * piu il modo di dirglielo.
 *
 * REGOLA: quando modifichi il contenuto di una di queste pagine, aggiorna la
 * sua data qui sotto. Se non la aggiorni non succede niente di grave: Google
 * ripassa comunque, solo piu tardi.
 * Gli articoli del blog non stanno in questa lista: prendono da soli la loro
 * data dal frontmatter (`dateModified`, e se manca `date`).
 */
const ULTIMA_MODIFICA = {
  home: '2026-08-26',              // menu orario + qualita immagini
  menu: '2026-08-26',              // entrambi i menu nell'HTML + hero
  buffetTriestino: '2026-08-26',   // correzioni ai piatti dettate dal titolare
  chiSiamo: '2026-07-21',
  contatti: '2026-08-18',
  en: '2026-08-28',                // landing inglese, prima pubblicazione
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateModified || post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // L'indice del blog cambia quando esce un articolo nuovo: la sua data e
  // quella dell'articolo piu recente, senza doverla scrivere a mano.
  const ultimoArticolo = posts[0]?.dateModified || posts[0]?.date || ULTIMA_MODIFICA.home;

  return [
    {
      url: baseUrl,
      lastModified: ULTIMA_MODIFICA.home,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // La landing inglese. Sta in sitemap perche' nessuna pagina italiana la
    // linka con un link normale (il selettore di lingua e' un link, ma Google
    // ci mette meno a trovarla da qui) e perche' e' l'unica porta del sito per
    // chi cerca in inglese.
    {
      url: `${baseUrl}/en`,
      lastModified: ULTIMA_MODIFICA.en,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: ULTIMA_MODIFICA.menu,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/buffet-triestino`,
      lastModified: ULTIMA_MODIFICA.buffetTriestino,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: ULTIMA_MODIFICA.chiSiamo,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: ULTIMA_MODIFICA.contatti,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: ultimoArticolo,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
