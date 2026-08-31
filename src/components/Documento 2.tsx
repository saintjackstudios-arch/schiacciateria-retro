import '@/app/globals.css';
import SiteHeader from '@/components/SiteHeader';
import CookieBanner from '@/components/CookieBanner';
import Analytics from '@/components/Analytics';
import MobileDirectionsBar from '@/components/MobileDirectionsBar';

/**
 * Il guscio del sito: il tag <html>, la testa e il corpo.
 *
 * Perche' non sta piu' dentro `app/layout.tsx`. Next scrive quel file UNA
 * VOLTA SOLA per tutte le pagine, e li dentro c'e' `<html lang="...">`: un
 * layout solo vuol dire una lingua sola per tutto il sito. Finche' il sito era
 * solo italiano andava bene; con la pagina inglese la dichiarazione diventava
 * falsa proprio dove il testo cambia lingua.
 *
 * Adesso i layout sono due, uno per gruppo di rotte, e passano qui la loro
 * lingua. Tutto il resto — i font, lo schema del locale, l'intestazione, il
 * banner dei cookie — resta scritto una volta sola: se lo copiassimo nei due
 * layout, prima o poi cambierebbe solo in uno.
 *
 * `lingua` finisce nell'HTML statico, non aggiunta dal JavaScript: e' quello
 * che legge un lettore di schermo per scegliere la pronuncia.
 */
export default function Documento({
  lingua,
  children,
}: Readonly<{
  lingua: 'it' | 'en' | 'de';
  children: React.ReactNode;
}>) {
  return (
    <html lang={lingua} className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Oswald:wght@700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-sans: 'Inter', sans-serif;
            --font-display: 'Oswald', sans-serif;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Schiacciateria Retrò",
              "image": "https://schiacciateriaretrotrieste.com/images/menu_hero_schiacciata.webp",
              "logo": "https://schiacciateriaretrotrieste.com/logo_retro.png",
              "telephone": "+393756264680",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Viale XX Settembre 16",
                "addressLocality": "Trieste",
                "addressRegion": "TS",
                "postalCode": "34125",
                "addressCountry": "IT"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 45.65193,
                "longitude": 13.77987
              },
              "servesCuisine": ["Fast Food", "Street Food", "Cucina Triestina", "Buffet Triestino"],
              "priceRange": "€-€€",
              "hasMenu": "https://schiacciateriaretrotrieste.com/menu",
              // Profili verificati uno a uno il 26/08/2026: stesso indirizzo e stesso
              // telefono su tutti. E' il filo che lega il sito alla scheda Google.
              "sameAs": [
                "https://www.instagram.com/schiacciateria_retro_trieste/",
                "https://www.facebook.com/CaffeRetro2017/",
                "https://maps.google.com/?cid=4949097406666230499",
                "https://www.tripadvisor.it/Restaurant_Review-g187813-d15123470-Reviews-RETRO-Trieste_Province_of_Trieste_Friuli_Venezia_Giulia.html"
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"],
                  "opens": "08:00",
                  "closes": "01:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Friday","Saturday"],
                  "opens": "08:00",
                  "closes": "02:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday"],
                  "opens": "17:00",
                  "closes": "23:30"
                }
              ],
              "url": "https://schiacciateriaretrotrieste.com",
              "description": "Schiacciateria Retrò è il locale artigianale di Trieste, situato in Viale XX Settembre 16. Propone schiacciata romana, buffet triestino, birre selezionate e street food di qualità nel cuore della movida triestina."
            }) 
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdfaf3] text-[#111111] pb-16 md:pb-0">
        <SiteHeader />
        {children}
        <CookieBanner />
        <Analytics />
        <MobileDirectionsBar />
      </body>
    </html>
  );
}
