'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const navLinks = [
    { href: '/',          label: 'Home',      rotate: '-rotate-1' },
    { href: '/menu',      label: 'Menu',      rotate: 'rotate-1'  },
    { href: '/bevande',   label: 'Bevande',   rotate: '-rotate-1' },
    { href: '/blog',      label: 'Blog',      rotate: '-rotate-2' },
    { href: '/chi-siamo', label: 'Chi Siamo', rotate: 'rotate-1'  },
    { href: '/contatti',  label: 'Contatti',  rotate: '-rotate-1' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[300] flex items-center justify-between px-6 h-16 md:h-20 md:px-12 bg-black/95 backdrop-blur-md border-b-2 border-white/10 shadow-lg"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_retro.png"
            alt="Schiacciateria Retrò Logo"
            width={128}
            height={181}
            className="w-12 md:w-16 h-auto object-contain brightness-110"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-yellow-400">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.instagram.com/retroxxsettembre"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <Camera className="w-3 h-3 md:w-4 md:h-4" /> Instagram
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-yellow-400 p-1 focus:outline-none"
          onClick={() => setDrawerOpen(true)}
          aria-label="Apri menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* ── Mobile Drawer ───────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[400] md:hidden"
              style={{ background: 'rgba(0,0,0,0.75)' }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Pannello */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-xs z-[500] md:hidden flex flex-col overflow-hidden"
              style={{
                background: '#facc15',
                borderLeft: '6px solid #000',
                boxShadow: '-12px 0 0 #000',
              }}
            >
              {/* Pattern a quadretti tenue */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
                backgroundImage:
                  'linear-gradient(45deg,#000 25%,transparent 25%),' +
                  'linear-gradient(-45deg,#000 25%,transparent 25%),' +
                  'linear-gradient(45deg,transparent 75%,#000 75%),' +
                  'linear-gradient(-45deg,transparent 75%,#000 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
              }} />

              {/* Header del drawer */}
              <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b-4 border-black">
                <Image
                  src="/logo_retro.png"
                  alt="Logo"
                  width={40}
                  height={57}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="bg-black text-yellow-400 p-1.5 border-2 border-black shadow-[3px_3px_0px_#555] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                  aria-label="Chiudi menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Striscia rossa decorativa */}
              <div className="relative z-10 bg-red-600 border-y-4 border-black py-1.5 text-center">
                <span className="font-black uppercase tracking-widest text-white text-xs">
                  — Schiacciateria Retrò —
                </span>
              </div>

              {/* Links */}
              <nav className="relative z-10 flex flex-col px-5 pt-6 gap-3 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.06 * i, type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between bg-black text-yellow-400 px-4 py-3 font-black uppercase tracking-tight text-2xl border-4 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.35)] hover:bg-yellow-400 hover:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all ${link.rotate}`}
                    >
                      {link.label}
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </Link>
                  </motion.div>
                ))}

                {/* Instagram */}
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.06 * navLinks.length, type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <a
                    href="https://www.instagram.com/retroxxsettembre"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between bg-white text-black px-4 py-3 font-black uppercase tracking-tight text-2xl border-4 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.35)] hover:bg-yellow-400 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all rotate-1"
                  >
                    Instagram
                    <Camera className="w-5 h-5 shrink-0" />
                  </a>
                </motion.div>
              </nav>

              {/* Footer drawer */}
              <div className="relative z-10 border-t-4 border-black px-5 py-4">
                <p className="font-black uppercase text-xs tracking-widest text-black/50 text-center">
                  Che bon ara!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
