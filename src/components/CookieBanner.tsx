'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('barretro-cookie-consent');
    if (!consent) {
      // Small delay for better entry animation perception
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('barretro-cookie-consent', accepted ? 'accepted' : 'rejected');
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  // High-fidelity jagged/bubble speech points path for the comic pointer
  // The balloon is positioned on bottom-left, so the pointer should point down-right or down-left.
  // Let's make a modern neo-brutalist card with a comic bubble pointer on the bottom.
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 2 }}
          exit={{ opacity: 0, scale: 0.8, y: 50, rotate: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 left-6 z-[999] max-w-[340px] sm:max-w-[400px] select-none pointer-events-auto"
        >
          {/* Main Comic Bubble Wrapper */}
          <div className="relative bg-[#facc15] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] flex flex-col gap-4">
            
            {/* Shouting starburst effect on top corner */}
            <div className="absolute -top-6 -right-6 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-black rotate-12 shadow-[3px_3px_0px_#000]">
              MOTO IMPORTANTE!
            </div>

            {/* Bubble Tail (SVG pointing down-left) */}
            <svg 
              className="absolute -bottom-7 left-8 w-8 h-8 text-[#facc15] filter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              style={{ transform: "rotate(90deg)" }}
            >
              <polygon points="0,0 100,50 0,100" fill="currentColor" stroke="black" strokeWidth="12" />
            </svg>
            {/* Mask to hide connection border */}
            <div className="absolute bottom-0 left-8 w-8 h-1 bg-[#facc15] z-10" />

            {/* Text */}
            <div className="space-y-2 text-black">
              <h3 className="font-display font-black text-2xl uppercase italic tracking-tight leading-none">
                Gavemo i cookie! 🍪
              </h3>
              <p className="text-xs md:text-sm font-bold leading-snug">
                Utilizziamo i cookie per far funzionare il sito e capire quante badilate di visite riceviamo (tramite Google Analytics). 
                Puoi scegliere se accettarli o rifiutarli!
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
              <button
                onClick={() => handleConsent(true)}
                className="flex-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black py-2.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
              >
                ACCETTA TUTTO
              </button>
              <button
                onClick={() => handleConsent(false)}
                className="flex-1 bg-white text-black hover:bg-red-600 hover:text-white border-2 border-black py-2.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center"
              >
                RIFIUTA
              </button>
            </div>

            {/* Link to Cookie Policy */}
            <div className="text-center w-full mt-1">
              <Link 
                href="/cookie-policy" 
                className="text-[10px] font-black uppercase tracking-widest text-black/50 hover:text-black underline transition-colors"
              >
                Scopri di più nelle note legali
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
