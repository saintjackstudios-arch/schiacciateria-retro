import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://lh3.googleusercontent.com https://images.unsplash.com https://www.transparenttextures.com",
  "frame-src https://www.google.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/news/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/bevande',
        destination: '/menu',
        permanent: true,
      },
      // Pagina cancellata che Google mostra ancora: 16 impressioni in tre mesi
      // e un 404 in faccia a chi ci clicca (trovato in Search Console il
      // 31/08/2026). Il contenuto era il menu, quindi si manda li'.
      {
        source: '/gestione-menu',
        destination: '/menu',
        permanent: true,
      },
      // Fusione dei due articoli sul kren, scritti dall'IA e senza un solo
      // fatto che sapesse solo Retro': zero clic su 40 impressioni e uno su
      // 50. Il contenuto vero sta ora in /blog/kren-trieste, quindi la
      // posizione gia' guadagnata (ottava e settima) si porta li' dentro.
      {
        source: '/blog/tradizioni-triestine-kren-caffe-capo-in-b',
        destination: '/blog/kren-trieste',
        permanent: true,
      },
      {
        source: '/blog/rebechin-come-si-fa-trieste',
        destination: '/blog/kren-trieste',
        permanent: true,
      },
      // Articolo IA sui "migliori pub in centro": 1 clic su 106 impressioni,
      // posizione 16,8. Prometteva una classifica di locali e citava un
      // "Tagliere A BADILADE" che in menu non esiste. Il contenuto vero sulla
      // birra sta ora in /blog/birra-trieste.
      {
        source: '/blog/migliori-pub-trieste-centro',
        destination: '/blog/birra-trieste',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
