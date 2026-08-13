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

    // Conversione: clic su Google Maps / "Indicazioni stradali".
    // Listener delegato: copre tutti i link mappa del sito, presenti e futuri.
    const trackDirections = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor || !isMapLink(anchor.href)) return;
      window.gtag?.('event', 'directions_click', {
        event_category: 'Engagement',
        event_label: 'indicazioni stradali / mappa',
      });
    };

    document.addEventListener('click', trackDirections);
    return () => document.removeEventListener('click', trackDirections);
  }, [consented]);

  if (!consented) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
