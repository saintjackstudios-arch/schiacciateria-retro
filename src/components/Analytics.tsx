'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const GA_MEASUREMENT_ID = 'G-1GTNREENL7';
const CONSENT_KEY = 'barretro-cookie-consent';
const CONSENT_EVENT = 'cookie-consent-changed';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const isMapLink = (url: string) =>
  /^https?:\/\/(?:www\.)?google\.com\/maps|^https?:\/\/maps\.app\.goo\.gl/i.test(url);

// Le tre conversioni misurabili di un locale fisico: ci vengono, chiamano, scrivono.
const CONVERSIONI: { test: (url: string) => boolean; event: string; label: string }[] = [
  { test: isMapLink, event: 'directions_click', label: 'indicazioni stradali / mappa' },
  { test: (url) => url.startsWith('tel:'), event: 'phone_click', label: 'click-to-call' },
  { test: (url) => /^https?:\/\/(?:api\.)?wa\.me\//i.test(url), event: 'whatsapp_click', label: 'whatsapp' },
];

export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      setConsented(localStorage.getItem(CONSENT_KEY) === 'accepted');
    };
    checkConsent();
    window.addEventListener(CONSENT_EVENT, checkConsent);
    return () => window.removeEventListener(CONSENT_EVENT, checkConsent);
  }, []);

  useEffect(() => {
    if (!consented) return;

    // Listener delegato: copre tutti i link di contatto del sito, presenti e futuri.
    const trackContact = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const conversione = CONVERSIONI.find((c) => c.test(anchor.href));
      if (!conversione) return;
      // Un link puo' dichiarare dove sta con data-ga-posizione="hero". Serve a
      // distinguere in GA4 il tasto in cima da quello in fondo: senza, i click
      // arrivano tutti mescolati sotto lo stesso evento. Il parametro va
      // registrato in GA4 come dimensione personalizzata ("posizione"), se no
      // si vede solo in DebugView.
      const posizione = anchor.dataset.gaPosizione;
      window.gtag?.('event', conversione.event, {
        event_category: 'Engagement',
        event_label: conversione.label,
        ...(posizione ? { posizione } : {}),
      });
    };

    document.addEventListener('click', trackContact);
    return () => document.removeEventListener('click', trackContact);
  }, [consented]);

  if (!consented) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
