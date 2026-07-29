'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

const GA_MEASUREMENT_ID = 'G-1GTNREENL7';
const CONSENT_KEY = 'barretro-cookie-consent';
const CONSENT_EVENT = 'cookie-consent-changed';

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

  if (!consented) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
