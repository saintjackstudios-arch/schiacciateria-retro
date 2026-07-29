'use client';

import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  AnimatePresence 
} from 'framer-motion';
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import {
  ArrowRight,
  Camera,
  Menu,
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  ChevronLeft,
  Wheat,
  Beef,
  Leaf,
  Play,
  Heart,
  MessageCircle,
  Eye,
  Sparkles,
  Send
} from "lucide-react";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GoogleReviewsPanel, type GoogleReview } from "@/components/ui/google-reviews-panel";

// Path for the new transparent schiacciata
const SCHIACCIATA_SINGLE = "hero_truffle.png";
const BAR_ATMOSPHERE = "bar_atmosphere_1774290471862.png";
const SCHIACCIATA_DETAIL_1 = "schiacciata_detail_1_1774290488438.png";
const SCHIACCIATA_DETAIL_2 = "schiacciata_detail_2_1774290503846.png";

const MarqueeRow = ({ text, color, direction = "left", speed = "20s" }: { text: string, color: string, direction?: "left" | "right", speed?: string }) => {
  return (
    <div className={cn("w-full overflow-hidden whitespace-nowrap py-4 md:py-6 border-y-2 border-black/5 flex", color)}>
      <div 
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-10",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: speed }}
      >
        <span className="text-3xl md:text-7xl font-black font-display italic leading-none shrink-0">{text}</span>
        <span className="text-3xl md:text-7xl font-black font-display italic leading-none shrink-0">{text}</span>
        <span className="text-3xl md:text-7xl font-black font-display italic leading-none shrink-0">{text}</span>
      </div>
      <div 
        className={cn(
          "flex min-w-full shrink-0 items-center justify-around gap-10",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        )}
        style={{ animationDuration: speed }}
        aria-hidden="true"
      >
        <span className="text-3xl md:text-7xl font-black font-display italic leading-none shrink-0">{text}</span>
        <span className="text-3xl md:text-7xl font-black font-display italic leading-none shrink-0">{text}</span>
        <span className="text-3xl md:text-7xl font-black font-display italic leading-none shrink-0">{text}</span>
      </div>
    </div>
  );
};

// --- Interactive Components ---

const ArtisanCardStack = () => {
  const [topCard, setTopCard] = useState(0); // 0: Black, 1: Image
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwap = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Animation duration is roughly 600ms
    setTimeout(() => {
      setTopCard(prev => (prev === 0 ? 1 : 0));
      setIsAnimating(false);
    }, 400); 
  };

  const swipeVariants = {
    exit: {
      x: [0, 260, 0],
      rotate: [2, 15, -2],
      scale: [1, 1.05, 0.9],
      zIndex: [20, 20, 10],
      transition: { duration: 0.6, times: [0, 0.5, 1] }
    },
    enter: {
      x: 0,
      rotate: 2,
      scale: 1,
      zIndex: 20,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    back: {
      x: 0,
      rotate: -2,
      scale: 0.9,
      zIndex: 10,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div 
      className="relative w-64 h-[420px] cursor-pointer group perspective-1000"
      onClick={handleSwap}
    >
      {/* Card 0: 100% Artigianale */}
      <motion.div
        animate={isAnimating && topCard === 0 ? "exit" : (topCard === 0 ? "enter" : "back")}
        variants={swipeVariants as any}
        className="absolute inset-0 bg-black p-8 text-white shadow-2xl border-4 border-white/10 flex flex-col items-center justify-center text-center select-none backface-hidden"
      >
        <p className="text-7xl font-display italic uppercase leading-none tracking-tighter text-yellow-400">100%</p>
        <p className="text-4xl font-black uppercase leading-none tracking-tighter mb-4">Artigianale</p>
        <div className="w-16 h-1 bg-yellow-400 mb-8" />
        <p className="text-sm md:text-base font-bold opacity-80 uppercase tracking-widest leading-tight">
          Vero lievito madre <br/> ricetta triestina <br/> fatto apposta per noi
        </p>
        <div className="absolute bottom-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
           <ArrowRight className="w-6 h-6 text-yellow-400" />
        </div>
      </motion.div>

      {/* Card 1: Schiacciata Closeup (Vertical Format) */}
      <motion.div
        animate={isAnimating && topCard === 1 ? "exit" : (topCard === 1 ? "enter" : "back")}
        variants={swipeVariants as any}
        className="absolute inset-0 bg-white shadow-2xl border-4 border-black overflow-hidden flex flex-col select-none backface-hidden"
      >
        <div className="relative flex-1">
          <Image 
            src="/schiacciata_closeup.jpg" 
            alt="La Schiacciata Close-up" 
            fill 
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </motion.div>
    </div>
  );
};

// --- Interactive Instagram Gallery ---

function InstagramGallery() {
    const posts = [
        { id: 1, image: "/reels/reel_1.png", url: "https://www.instagram.com/retroxxsettembre/reel/DF-GWzMsAkj/", views: "634.000", likes: "17.1k", comments: "320", shares: "2.4k" },
        { id: 2, image: "/reels/reel_2.png", url: "https://www.instagram.com/retroxxsettembre/reel/DFm7nBOMzr3/", views: "315.000", likes: "2.7k", comments: "62", shares: "450" },
        { id: 3, image: "/reels/reel_3.png", url: "https://www.instagram.com/retroxxsettembre/reel/DTNJj9CDJ2F/", views: "210.000", likes: "13.7k", comments: "72", shares: "1.1k" },
        { id: 4, image: "/reels/reel_4.png", url: "https://www.instagram.com/retroxxsettembre/reel/DQpA4a_DEGz/", views: "151.000", likes: "1.6k", comments: "28", shares: "180" },
        { id: 11, image: "/reels/reel_11.png", url: "https://www.instagram.com/retroxxsettembre/reel/DRzHkc0DNoX/", views: "105.000", likes: "2.1k", comments: "45", shares: "310" },
        { id: 12, image: "/reels/reel_12.png", url: "https://www.instagram.com/retroxxsettembre/reel/DCyrjuIM8GL/", views: "102.000", likes: "1.9k", comments: "38", shares: "270" },
        { id: 5, image: "/reels/reel_5.png", url: "https://www.instagram.com/retroxxsettembre/reel/DGK9wTsM4pi/", views: "66.700", likes: "968", comments: "34", shares: "95" },
        { id: 6, image: "/reels/reel_6.png", url: "https://www.instagram.com/retroxxsettembre/reel/DDO_w8UsXgT/", views: "59.600", likes: "785", comments: "34", shares: "80" },
        { id: 7, image: "/reels/reel_7.png", url: "https://www.instagram.com/retroxxsettembre/reel/DIYfOkTsaBV/", views: "53.400", likes: "1.7k", comments: "41", shares: "120" },
        { id: 8, image: "/reels/reel_8.png", url: "https://www.instagram.com/retroxxsettembre/reel/DEj-BkoMBXp/", views: "38.400", likes: "486", comments: "30", shares: "55" },
        { id: 9, image: "/reels/reel_9.png", url: "https://www.instagram.com/retroxxsettembre/reel/DRm4i1gDOaH/", views: "36.000", likes: "507", comments: "21", shares: "40" },
        { id: 10, image: "/reels/reel_10.png", url: "https://www.instagram.com/retroxxsettembre/reel/DPovZLjDFo5/", views: "32.200", likes: "670", comments: "12", shares: "35" }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex flex-col items-center w-full pt-4 overflow-visible">
            {/* Centered Gallery Banner */}
            <div className="w-full flex justify-center mb-16">
                <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-3 md:gap-6 bg-red-600 text-white px-4 md:px-10 py-3 md:py-5 border-4 border-black shadow-[8px_8px_0px_#000] rotate-[-1deg]"
                >
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    <span className="font-black italic uppercase tracking-[0.1em] md:tracking-[0.3em] text-[11px] sm:text-sm md:text-xl whitespace-nowrap">Video Virali della Settimana</span>
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </motion.div>
            </div>

            {/* Bleeding Carousel Container */}
            <div className="w-full relative pt-20 -mt-20">
                <div className="flex gap-4 md:gap-8 overflow-x-auto pt-20 pb-24 snap-x snap-mandatory scrollbar-hide no-scrollbar outline-none pl-6 md:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] pr-[10vw]">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="flex-shrink-0 w-[280px] md:w-[320px] aspect-[9/16] snap-start group relative"
                            whileHover={{ y: -15, scale: 1.05 }}
                            onViewportEnter={() => setActiveIndex(index)}
                        >
                            {/* Card Base */}
                            <div className="absolute inset-0 bg-black border-4 md:border-8 border-black shadow-[15px_15px_0px_#000] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
                                <Image 
                                    src={post.image} 
                                    alt="Instagram Reel" 
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    unoptimized
                                />
                                
                                {/* Vertical Stats Sidebar */}
                                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 flex flex-col gap-6 z-30">
                                    <div className="flex flex-col items-center gap-1 group/stat">
                                        <div className="bg-white p-2 md:p-3 border-2 border-black shadow-[3px_3px_0px_#000] rounded-full group-hover/stat:bg-red-500 group-hover/stat:text-white transition-colors">
                                            <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                                        </div>
                                        <span className="text-white text-[10px] md:text-xs font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{post.likes}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 group/stat">
                                        <div className="bg-white p-2 md:p-3 border-2 border-black shadow-[3px_3px_0px_#000] rounded-full group-hover/stat:bg-blue-500 group-hover/stat:text-white transition-colors">
                                            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                                        </div>
                                        <span className="text-white text-[10px] md:text-xs font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{post.comments}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 group/stat">
                                        <div className="bg-white p-2 md:p-3 border-2 border-black shadow-[3px_3px_0px_#000] rounded-full group-hover/stat:bg-green-500 group-hover/stat:text-white transition-colors">
                                            <Send className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                                        </div>
                                        <span className="text-white text-[10px] md:text-xs font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{post.shares}</span>
                                    </div>
                                </div>

                                {/* Bottom Right View Count Badge */}
                                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30">
                                    <div className="bg-yellow-400 text-black px-4 py-2 border-2 border-black shadow-[5px_5px_0px_#000] flex items-center gap-2">
                                      <Play className="w-3 h-3 md:w-4 md:h-4 fill-black" />
                                      <span className="font-black text-xs md:text-sm italic whitespace-nowrap">{post.views} VIEWS</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {/* Spacer for end of scroll */}
                    <div className="flex-shrink-0 w-8 md:w-[20vw]" />
                </div>
            </div>

            {/* Pagination & Actions Container */}
            <div className="w-full max-w-2xl mx-auto px-6 flex flex-col items-center gap-12">
                {/* Fixed Pagination Bar */}
                <div className="flex gap-2 w-full justify-between items-center h-4 relative">
                    {posts.map((_, i) => (
                        <div 
                            key={i} 
                            onClick={() => {
                                const container = document.querySelector('.overflow-x-auto');
                                if (container) {
                                  const cardWidth = container.clientWidth < 768 ? 280 + 16 : 320 + 32;
                                  container.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                                }
                            }}
                            className={cn(
                                "flex-1 h-3 cursor-pointer border-2 border-black transition-all duration-500",
                                activeIndex === i ? "bg-red-600 shadow-[3px_3px_0px_#000] scale-y-110" : "bg-black/5 hover:bg-black/10"
                            )} 
                        />
                    ))}
                </div>

                {/* Centralized CTA Button */}
                <motion.a 
                    href={posts[activeIndex]?.url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-western px-16 py-8 text-2xl bg-black text-white border-4 border-black shadow-[12px_12px_0px_#f00] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex items-center gap-6 uppercase italic font-black group"
                >
                  <Camera className="w-8 h-8 group-hover:animate-bounce" />
                  VAI SU INSTAGRAM
                </motion.a>
                
                <p className="text-[10px] md:text-xs uppercase font-black text-black/30 tracking-[0.6em] text-center italic">
                    *DATI REALI ESTRAIBILI DA @RETROXXSETTEMBRE
                </p>
            </div>
        </div>
    );
}







function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="py-8 border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 text-left group"
      >
        <span className={`text-2xl md:text-3xl font-display uppercase italic tracking-tight transition-colors ${open ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'}`}>
          {q}
        </span>
        <span className={`flex-shrink-0 w-10 h-10 border-4 border-yellow-400 flex items-center justify-center text-yellow-400 text-2xl font-black transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-400 text-xl leading-relaxed font-medium border-l-4 border-yellow-400 pl-6">
          {a}
        </p>
      </div>
    </div>
  );
}

// Jagged starburst comic shouting speech bubble component
interface ComicBubbleProps {
  children: React.ReactNode;
  color?: 'yellow' | 'red' | 'orange';
  pointerDirection?: 'left' | 'right';
  className?: string;
}

function ComicBubble({ 
  children, 
  color = 'yellow', 
  pointerDirection = 'left',
  className 
}: ComicBubbleProps) {
  const bgColor = color === 'yellow' ? '#facc15' : color === 'red' ? '#dc2626' : '#f97316';
  const textColor = color === 'red' ? '#ffffff' : '#000000';
  
  // High-fidelity jagged points path to look like a shouting bubble
  const points = "10,20 18,5 30,12 45,3 58,15 70,5 82,18 95,8 90,30 98,45 88,60 95,75 80,82 72,95 58,85 45,98 32,84 18,92 12,75 2,60 10,45 3,30";

  return (
    <div className={cn("relative p-3 sm:p-5 md:p-7 flex items-center justify-center min-w-[110px] sm:min-w-[175px] md:min-w-[250px]", className)}>
      <svg 
        className="absolute inset-0 w-full h-full filter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {/* Draw the shouting starburst background */}
        <polygon 
          points={points} 
          fill={bgColor} 
          stroke="black" 
          strokeWidth="3.5" 
          strokeLinejoin="miter"
        />
        {/* Pointer spike */}
        {pointerDirection === 'left' ? (
          <polygon 
            points="20,80 5,98 32,84" 
            fill={bgColor} 
            stroke="black" 
            strokeWidth="3.5" 
            strokeLinejoin="miter"
          />
        ) : (
          <polygon 
            points="80,80 95,98 68,84" 
            fill={bgColor} 
            stroke="black" 
            strokeWidth="3.5" 
            strokeLinejoin="miter"
          />
        )}
        {/* Fill overlapping area to hide connection line */}
        {pointerDirection === 'left' ? (
          <polygon points="18,78 28,78 28,83 18,83" fill={bgColor} />
        ) : (
          <polygon points="82,78 72,78 72,83 82,83" fill={bgColor} />
        )}
      </svg>
      <div className="relative z-10 font-display font-black text-center uppercase italic" style={{ color: textColor }}>
        {children}
      </div>
    </div>
  );
}

export default function HomeClient() {
  const [scrollY, setScrollY] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const x = useTransform(springX, [-500, 500], [-25, 25]);
  const y = useTransform(springY, [-500, 500], [-25, 25]);
  const rotateX = useTransform(springY, [-500, 500], [4, -4]);
  const rotateY = useTransform(springX, [-500, 500], [-4, 4]);

  const [headerVisible, setHeaderVisible] = React.useState(true);
  const lastScrollRef = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const last = lastScrollRef.current;
      setScrollY(current);
      if (current > last + 4) {
        setHeaderVisible(false);
      } else if (current < last - 4) {
        setHeaderVisible(true);
      }
      lastScrollRef.current = current;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative bg-[#fdfaf3] overflow-x-hidden selection:bg-yellow-400 selection:text-black font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Dove vanno i giovani a Trieste?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "I giovani a Trieste si ritrovano in Viale XX Settembre. Il nuovo punto di riferimento è Bar Retrò, un fast food artigianale dedicato alle schiacciate preparate al momento."
                }
              },
              {
                "@type": "Question",
                "name": "Dove si trova la zona della movida a Trieste?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La movida a Trieste si concentra nel cuore pulsante di Viale XX Settembre, dove Schiacciateria Retrò offre l'asporto perfetto tra i locali storici e le nuove aperture, con le sue famose schiacciate artigianali."
                }
              }
            ]
          })
        }}
      />
      
      {/* Hero Section - Maximum Quality Refresh */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-end overflow-hidden pb-20 md:pb-32 bg-black">
        
        {/* Background Image - Pixel Perfect & High Quality */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_aggressive.jpg" 
            alt="Barretrò Aggressive Fast Food" 
            fill 
            quality={100}
            unoptimized={true}
            className="object-cover object-center border-b-[12px] border-yellow-400"
            priority
          />
          {/* Subtle Overlays for Readability */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
          
          {/* Main Titles - High Energy Entrance */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-x-12 mb-12">
            <motion.h1 
              initial={{ scale: 3, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-[18vw] md:text-[14vw] font-black font-display tracking-tighter leading-[0.7] text-white uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              CHE <br/> BON
            </motion.h1>
            
            <motion.div 
              initial={{ scale: 3, opacity: 0, rotate: 10 }}
              animate={{ scale: 1, opacity: 1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              className="text-[18vw] md:text-[14vw] font-black font-display tracking-tighter leading-[0.7] text-yellow-400 uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              ARA!
            </motion.div>
          </div>

          {/* Subtitle and CTA */}
          <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="flex flex-col items-center w-full"
          >
            <p className="text-3xl md:text-5xl font-black tracking-tight text-white stamped-text mb-12 italic uppercase leading-none text-center max-w-3xl">
              No te me credi? <br className="md:hidden" /> Vien provar
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
               <Link href="/menu" className="btn-western px-12 py-5 text-xl md:text-3xl group transition-all flex items-center justify-center whitespace-nowrap bg-yellow-400 text-black border-4 border-black shadow-[8px_8px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                <span className="mr-4">VEDI IL MENU</span>
                <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-3 transition-transform" />
              </Link>
              
              <div className="bg-red-600 text-white font-black px-6 py-3 -rotate-6 text-xl md:text-2xl uppercase tracking-tighter shadow-xl">
                PREPARATA AL MOMENTO
              </div>
            </div>

          </motion.div>
        </div>

      </section>

      {/* Vera Schiacciata - Fast Food Identity */}
      <section className="relative py-24 px-6 bg-[#facc15] overflow-hidden border-y-[12px] border-black">
        <div className="absolute inset-0 bg-check-faint opacity-50" />
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center bg-white border-8 border-black p-10 md:p-16 shadow-[16px_16px_0px_#000]">
             <div className="flex-1">
                <h2 className="text-5xl md:text-7xl font-display font-black leading-[0.8] uppercase italic mb-8 tracking-tighter text-black">
                  LA VERA <br/> SCHIACCIATA <span className="text-red-600">TRIESTINA.</span>
                </h2>
                <div className="w-16 h-2 bg-black mb-8" />
                <div className="space-y-6 text-xl md:text-2xl font-bold text-zinc-900 leading-snug">
                  <p>
                    Non è il solito panino. È l&apos;essenza dello <a href="https://caffe-retro.goto-where.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity"><strong className="underline decoration-red-600 decoration-4">Street Food Trieste</strong></a>. 
                  </p>
                  <p>
                    Artigianale, croccante e farcita al momento con ingredienti premium. Il <strong className="text-red-600">cibo veloce artigianale</strong> che ti svolta la giornata in Viale XX Settembre.
                  </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05, 
                      y: -15, 
                      x: -15, 
                      rotate: 1,
                      boxShadow: "25px 25px 0px 0px rgba(0,0,0,1)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative aspect-[3/4] md:aspect-auto h-full border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden min-h-[400px]"
                  >
                    <Image 
                      src="/images/schiacciata_vera_stack.webp" 
                      alt="La Vera Schiacciata - La Stack" 
                      fill 
                      quality={90}
                      className="object-cover"
                    />
                  </motion.div>

                  <motion.div 
                    whileHover={{ 
                      scale: 1.05, 
                      y: -15, 
                      x: -15, 
                      rotate: -1,
                      boxShadow: "25px 25px 0px 0px rgba(0,0,0,1)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="bg-black p-8 text-white border-4 border-white/20 flex flex-col items-center justify-center text-center shadow-[12px_12px_0px_#000] min-h-[400px]"
                  >
                    <Wheat className="w-12 h-12 text-yellow-400 mb-6" />
                    <h3 className="text-3xl font-display uppercase italic text-yellow-400 mb-4">Lievito Madre</h3>
                    <p className="text-base font-bold opacity-80 uppercase tracking-widest leading-tight">
                      Vero lievito madre e una ricetta tutta triestina. Un pane creato apposta per noi, come si faceva una volta — i dettagli sono top secret, ma il risultato parla da solo.
                    </p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ 
                      scale: 1.05, 
                      y: -15, 
                      x: -15, 
                      rotate: 1,
                      boxShadow: "25px 25px 0px 0px rgba(0,0,0,1)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative aspect-[3/4] md:aspect-auto h-full border-4 border-black shadow-[12px_12px_0px_#000] overflow-hidden min-h-[400px]"
                  >
                    <Image 
                      src="/images/schiacciata_vera_pingpong.webp" 
                      alt="La Vera Schiacciata - Ping Pong" 
                      fill 
                      quality={90}
                      className="object-cover"
                    />
                  </motion.div>
                </div>
             </div>
        </div>
      </section>

      {/* La Nostra Qualità (Ingredienti & Fornitori) - Restructured */}
      <section className="bg-black py-32 md:py-48 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-check-faint opacity-10" />
        
        {/* 1. Title (Outside max-w for better spacing context, but inside max-w-7xl for alignment if needed? No, user wants it clean) */}
        <div className="max-w-7xl mx-auto relative z-10 w-full px-6 mb-12">
           <div className="text-center">
               <h2 className="text-[12vw] md:text-9xl font-display font-black uppercase italic text-white pt-20 flex flex-col gap-4 md:gap-8 leading-none">
                <span className="flex items-center justify-center gap-1 md:gap-4">
                  MENO <span className="mx-2 md:mx-4">PAROLE</span>
                </span>
                <span className="flex items-center justify-center gap-1 md:gap-4">
                  PI<span className="relative flex items-center justify-center">U<span className="absolute -top-[0.2em] md:-top-[0.25em] text-[0.6em] not-italic">&#96;</span></span>
                  <span className="text-yellow-400 ml-4 md:ml-8">BADILADE</span>
                </span>
              </h2>
           </div>
        </div>

        {/* 2. Yellow Banner (Full Width - Outside max-w-7xl) */}
        <div className="w-full mt-24 md:mt-32 mb-16 relative z-10 scale-105 -rotate-1">
           <MarqueeRow text="SCHIACCIATERIA RETRÒ • VIALE XX SETTEMBRE • " color="bg-yellow-400 text-black shadow-xl border-y-4 border-black" direction="right" speed="20s" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full px-6 flex flex-col items-center">
           {/* 3. Image with Animated Overlays */}
           <div className="w-full flex justify-center mb-16">
              <div className="relative w-full max-w-4xl hover:scale-105 transition-transform duration-1000 ease-out z-20 select-none">
                 {/* Faded image borders using WebkitMaskImage and maskImage */}
                 <div 
                   style={{ 
                     maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', 
                     WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' 
                   }}
                   className="relative z-0 overflow-hidden"
                 >
                    <Image 
                      src="/images/ingredienti_esplosi_highres.webp" 
                      alt="Anatomia della Schiacciata Barretrò" 
                      width={1200}
                      height={1600}
                      className="w-full h-auto object-contain"
                      priority
                    />
                 </div>
                       {/* Stracciatella Comic Bubble (Top layer - left) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, rotate: -15, y: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
                    animate={{ scale: [1, 1.04, 1], y: [0, -8, 0] }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="absolute top-[34%] left-[0.5%] md:left-[2%] max-w-[48%] md:max-w-[36%] z-20"
                  >
                    <ComicBubble color="red" pointerDirection="left">
                      <span className="font-display font-black text-[11px] sm:text-base md:text-2xl uppercase italic block leading-none text-white">
                        Stracciatella
                      </span>
                      <span className="font-bold text-[8px] sm:text-[10px] md:text-xs text-white/80 block leading-tight mt-1">
                        a badilade
                      </span>
                    </ComicBubble>
                  </motion.div>

                  {/* Prosciutto Crudo Comic Bubble (Second layer - right) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, rotate: 15, y: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                    animate={{ scale: [1, 1.04, 1], y: [0, -8, 0] }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      scale: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                      y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="absolute top-[50%] right-[0.5%] md:right-[2%] max-w-[48%] md:max-w-[36%] z-20"
                  >
                    <ComicBubble color="yellow" pointerDirection="right">
                      <span className="font-display font-black text-[10px] sm:text-base md:text-2xl uppercase italic block leading-none text-black">
                        Prosciutto Crudo
                      </span>
                      <span className="font-bold text-[8px] sm:text-[10px] md:text-xs text-black/70 block leading-tight mt-1">
                        da suini con amore
                      </span>
                    </ComicBubble>
                  </motion.div>

                  {/* Basilico Comic Bubble (Third layer - left) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, rotate: -15, y: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                    animate={{ scale: [1, 1.04, 1], y: [0, -8, 0] }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      scale: { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                      y: { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="absolute top-[66%] left-[0.5%] md:left-[2%] max-w-[48%] md:max-w-[36%] z-20"
                  >
                    <ComicBubble color="yellow" pointerDirection="left">
                      <span className="font-display font-black text-[10px] sm:text-base md:text-2xl uppercase italic block leading-none text-black">
                        Foglie de Basilico
                      </span>
                      <span className="font-bold text-[8px] sm:text-[10px] md:text-xs text-black/70 block leading-tight mt-1">
                        raccolte una per una
                      </span>
                    </ComicBubble>
                  </motion.div>

                  {/* Pomodorini Comic Bubble (Fourth layer - right) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.6, rotate: 15, y: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
                    animate={{ scale: [1, 1.04, 1], y: [0, -8, 0] }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      scale: { duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
                      y: { duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="absolute top-[79%] right-[0.5%] md:right-[2%] max-w-[48%] md:max-w-[36%] z-20"
                  >
                    <ComicBubble color="orange" pointerDirection="right">
                      <span className="font-display font-black text-[10px] sm:text-base md:text-2xl uppercase italic block leading-none text-black">
                        Pomodorini
                      </span>
                      <span className="font-bold text-[8px] sm:text-[10px] md:text-xs text-black/70 block leading-tight mt-1">
                        secchi del nostro orto
                      </span>
                    </ComicBubble>
                  </motion.div>
              </div>
           </div>

           {/* 4. Caption */}
           <div className="text-center max-w-3xl mb-12">
              <p className="text-xl md:text-2xl font-bold text-zinc-400 leading-snug">
                <strong className="text-white">Dove mangiare prodotti locali a Trieste? </strong> <br />
                Facile. Noi ci mettiamo gli ingredienti (quelli veri), tu ci metti la fame. <br />
                Niente descrizioni noiose, solo l&apos;anatomia della perfezione.
              </p>
           </div>
        </div>

        {/* 5. Red Banner (Full Width - Outside max-w-7xl) */}
        <div className="w-full relative z-10 scale-105 rotate-1">
           <MarqueeRow text="REAL TRIESTIN'S BUFFET • FATTO A MAN • " color="bg-red-600 text-white shadow-xl border-y-4 border-black" direction="left" speed="30s" />
        </div>
      </section>



      {/* La Realtà Supera il Video - Instagram Interactive Gallery */}
      <section className="w-full bg-[#fdfaf3] py-40 overflow-hidden relative">
        {/* Grunge Overlay for Western Style */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/gray-paper.png")' }}></div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
            <h2 className="text-[12vw] md:text-8xl mb-6 leading-[0.85] font-display uppercase italic text-black text-left">
              LA <span className="text-red-600">REALTÀ</span> <br/> SUPERA IL VIDEO.
            </h2>
            <p className="text-xl md:text-2xl font-bold text-zinc-800 leading-snug text-left max-w-2xl">
              Se non credi ai numeri, credi ai fatti. <br/>
              <span className="text-black italic font-black">No te me credi? Daghe un&apos;ociada.</span>
            </p>
          </div>

          <div className="w-full">
            <InstagramGallery />
          </div>
        </div>
      </section>

      <div className="w-full py-10">
          <MarqueeRow text="no te me credi? vien provar!!! • " color="bg-black text-yellow-400" direction="left" speed="40s" />
      </div>

       {/* Best Sellers Section / LE PIÙ AMATE */}
       <section className="bg-black py-40 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-7xl md:text-[10vw] text-white leading-none font-display mb-32 uppercase italic tracking-tighter text-center">
               LE PIÙ <span className="text-yellow-400">AMATE.</span>
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {[
                  { 
                    title: "TOP DE GAMMA", 
                    image: "best_top_gamma_final.jpg", 
                    ingredients: "Stracciatella, Mortadella, Granella di pistacchio",
                    desc: "Così buona che pure i capricci vanno in pensione.",
                    rotate: "rotate-2"
                  },
                  { 
                    title: "LA FIT", 
                    image: "best_la_fit_final.jpg", 
                    ingredients: "Stracchino, Zucchine grigliate, Rucola e Pomodorini soleggiati",
                    desc: "Per chi vuole sentirsi leggero... ma con un badile in mano.",
                    rotate: "rotate-[-2]"
                  },
                  { 
                    title: "RETRÒ", 
                    image: "best_triestina_final.jpg", 
                    ingredients: "Crema di patate in tecia, lardo, crème e olio al tartufo",
                    desc: "Un morso e parli triestino pure se vieni da Marte.",
                    rotate: "rotate-1"
                  },
                  { 
                    title: "BONA MA LEGGERA", 
                    image: "best_bona_leggera_final.jpg", 
                    ingredients: "Prosciutto Crudo, Stracciatella, Pomodorini Secchi, Basilico",
                    desc: "L'unico modo per chiudere un affare con il sorriso.",
                    rotate: "rotate-[-1]"
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`group relative bg-yellow-400 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none p-4 transition-all hover:translate-y-[-8px] hover:translate-x-[-8px] hover:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] overflow-hidden flex flex-col ${item.rotate}`}>
                     <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden mb-6 border-2 border-black bg-black">
                       <Image 
                         src={`/${item.image}`} 
                         alt={item.title} 
                         fill 
                         className={cn(
                           "object-cover transition-transform duration-700 opacity-90 group-hover:opacity-100",
                           item.title === "LA FIT" 
                             ? "scale-[1.25] group-hover:scale-[1.40] origin-center" 
                             : "scale-100 group-hover:scale-110"
                         )} 
                       />
                       <div className="absolute top-4 left-4">
                          <span className="bg-white text-black text-[10px] font-black px-2 py-1 border-2 border-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            BEST SELLER
                          </span>
                       </div>
                     </div>
                     <div className="px-2 pb-4 flex-1 flex flex-col">
                        <h3 className="text-3xl text-black font-display uppercase mb-3 tracking-tighter leading-none">{item.title}</h3>
                        <div className="mb-4">
                           <p className="text-[10px] text-black/50 font-black uppercase tracking-widest mb-1">Ingredienti:</p>
                           <p className="text-black text-xs font-bold leading-tight">{item.ingredients}</p>
                        </div>
                        <p className="text-black/70 font-bold italic text-sm leading-snug border-t-2 border-black/10 pt-4">
                          "{item.desc}"
                        </p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </section>

       {/* Map Section - VIEN PROVAR */}
       <section id="dove-semo" className="bg-white py-32 px-6 border-t-8 border-black relative">
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col lg:flex-row gap-16 items-center">
                {/* Text Side */}
                <div className="flex-1 w-full order-2 lg:order-1">
                   <div className="mb-10">
                     <div className="text-[10vw] md:text-8xl font-display uppercase italic tracking-tighter leading-none text-black">
                       VIEN A
                     </div>
                     <div className="text-[10vw] md:text-8xl font-display uppercase italic tracking-tighter leading-none mt-2">
                       <span className="bg-yellow-400 text-black px-4 py-2 not-italic inline-block">PROVAR.</span>
                     </div>
                   </div>
                   
                   <div className="bg-black text-white p-12 shadow-[12px_12px_0px_0px_#eab308] relative group">
                      <div className="absolute -top-6 -right-6 bg-red-600 text-white px-6 py-2 font-display uppercase italic border-2 border-black rotate-6 group-hover:rotate-0 transition-transform">
                        DAL VIVO
                      </div>
                      <h3 className="text-4xl font-display uppercase italic mb-4">Schiacciateria Retrò</h3>
                      <p className="text-2xl font-bold opacity-70 mb-8 leading-tight">
                        Viale Venti Settembre, 16 <br/>
                        Trieste City (TS)
                      </p>
                      
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=Bar+Retro+Schiacciateria+Triestina+Viale+Venti+Settembre+16+Trieste"
                        target="_blank"
                        className="inline-flex items-center gap-4 bg-yellow-400 text-black px-10 py-5 text-2xl font-display uppercase italic border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                      >
                        OTTIENI INDICAZIONI <ChevronRight className="w-8 h-8" />
                      </a>
                   </div>
                </div>

                {/* Map Side */}
                <div className="flex-[1.5] w-full order-1 lg:order-2">
                   <div className="relative aspect-video border-8 border-black shadow-[20px_20px_0px_0px_#eab308] overflow-hidden bg-zinc-100 group">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.7898957093745!2d13.770899076582029!3d45.64942097107611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6b1076f62439%3A0xc3f6f1406859549f!2sBar%20Retr%C3%B2%20-%20Schiacciateria%20Triestina%2C%20Viale%20Venti%20Settembre%2C%2016%2C%2034132%20Trieste%20TS!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      
                      {/* Hide Google UI - Neo Brutalist Sticker */}
                      <div className="absolute top-2 left-2 px-3 py-1 bg-yellow-400 text-black font-display text-[10px] uppercase border-2 border-black z-[5] pointer-events-none rotate-[-2deg] shadow-[2px_2px_0px_#000]">
                        NAVIGATORE ATTIVO
                      </div>
                      <div className="absolute top-0 left-0 w-[200px] h-[55px] bg-[#fdfaf3] pointer-events-none z-[4]" />
                      
                      
                      {/* --- CUSTOM POP MARKER --- */}
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: -5 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 260, 
                          damping: 20,
                          delay: 0.5 
                        }}
                        className="absolute top-1/2 left-1/2 -ml-10 -mt-20 z-10 pointer-events-none"
                      >
                        <div className="relative">
                          {/* Main Pin Shape */}
                          <div className="bg-yellow-400 border-4 border-black p-4 shadow-[8px_8px_0px_#000] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                             <MapPin className="w-10 h-10 text-black fill-black/20" />
                          </div>
                          
                          {/* Comic Style Bubble */}
                          <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute -top-12 -right-16 bg-red-600 text-white px-4 py-2 border-4 border-black font-display uppercase italic text-lg shadow-[6px_6px_0px_#000] rotate-12 whitespace-nowrap"
                          >
                             SEMO QUA!
                          </motion.div>
                          
                          {/* Decorative Elements */}
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-black border-2 border-white rounded-full" />
                        </div>
                      </motion.div>
                    </div>
                 </div>{/* end Map Side */}
              </div>{/* end flex-row */}
           </div>{/* end max-w */}
        </section>

        {/* Le Vostre Sberle — Testimonials Section */}
        <section id="testimonials" className="bg-[#facc15] py-32 px-6 border-t-8 border-black relative overflow-hidden">
           {/* Simple diagonal pattern for background texture */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           
           <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-20 text-center">
                <p className="text-black/50 font-black uppercase tracking-[0.2em] text-[10px] mb-4">dicono di noi</p>
                <h2 className="text-[10vw] md:text-8xl font-display uppercase italic tracking-tighter leading-none text-black">
                  (Le vostre Badilade <br />
                  <span className="bg-black text-yellow-400 px-4 py-2 not-italic inline-block mt-2 font-display uppercase text-6xl md:text-8xl leading-none">de recensioni</span>)
                </h2>
              </div>

              <div className="flex flex-col items-center">
                <GoogleReviewsPanel
                    averageRating={4.6}
                    totalReviews={405}
                    starDistribution={[
                        { stars: 5, count: 293 },
                        { stars: 4, count: 80 },
                        { stars: 3, count: 28 },
                        { stars: 2, count: 2 },
                        { stars: 1, count: 2 }
                    ]}
                    reviews={[
                      {
                        author: "Peter",
                        text: "I ate the first schiacciata with a classic beer, which was delicious. I went for the second one for a change of flavor, and obviously with an unfiltered beer. How delicious, Ara. Highly recommended, quick, friendly service, lots of stuff.",
                        avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWcNfLlzmRxV35oOucqtnBC_EyF94X8wjhzm8LOaxOygIfBQBExkg=w72-h72-p-rp-mo-br100",
                        rating: 5,
                        relativeTime: "1 mese fa",
                        permalink: "https://maps.app.goo.gl/YbDRMViHW56UsGut8"
                      },
                      {
                        author: "Mic Steeve",
                        text: "really cool! Really funny, and then the beard... and that other guy's mustache!! GREAT!!",
                        avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWYjqVQZMIN1S3Y2vQTlApEvMu62vCOxnuOR-7HmFK7a-t-_WE=w72-h72-p-rp-mo-br100",
                        rating: 5,
                        relativeTime: "3 mesi fa",
                        permalink: "https://www.google.com/maps/search/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1"
                      },
                      {
                        author: "Gaby Flores A.",
                        text: "The food and beer were 10/10. The person who served me was very friendly. Excellent service.",
                        avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWiZ1zZQtBsQVSudHXK_F-lHcMlqwEw4RHpv49Y5hxrWd82eVti=w72-h72-p-rp-mo-ba3-br100",
                        rating: 5,
                        relativeTime: "3 mesi fa",
                        permalink: "https://www.google.com/maps/search/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1"
                      },
                      {
                        author: "Ivka Giusti",
                        text: "Delicious canapés and schiacciata! Excellent product quality and a great menu selection with fair prices. The staff are friendly, the atmosphere is cheerful, and you can immediately tell they're passionate about their work. Highly recommended!",
                        avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUiHrGj-tCWPrervm0NEZgeTxR1vFuNLdagDgDBd6qA8LUKsE4=w72-h72-p-rp-mo-ba3-br100",
                        rating: 5,
                        relativeTime: "4 mesi fa",
                        permalink: "https://www.google.com/maps/search/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1"
                      },
                      {
                         author: "Giovanni Toffoli",
                         text: "Excellent place with very kind and welcoming staff. The schiacciate we tried were particularly good and made with quality ingredients. Honorable mention for their TikTok videos. Highly recommended! ☺️",
                         avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWsLNLz16p1GkWecgSvOKE9IWftZEMkmMQMxgqFn1H2aCeiMNKy=w72-h72-p-rp-mo-ba4-br100",
                         rating: 5,
                         relativeTime: "5 mesi fa",
                         permalink: "https://maps.app.goo.gl/8vDrMybs8RrntMY7A"
                      },
                      {
                        author: "David Kollar",
                        text: "Very good and not very expencive beer and Aperol. Area is great, not turistic based.",
                        avatar: "https://lh3.googleusercontent.com/a-/ALV-UjV4UX-dOVeNKiWZjUeKGdQW7dleGwmwA7U9buJmTsUAeHcOSFpZ=w36-h36-p-rp-mo-ba3-br100",
                        rating: 5,
                        relativeTime: "7 mesi fa",
                        permalink: "https://maps.app.goo.gl/9KvLedTbGBMfFT7aA"
                      }
                    ]}
                />
                
                {/* Visualizza Tutte le Recensioni - Stile Google Maps - Extra Large */}
                <div className="mt-10 flex justify-center">
                   <a 
                     href="https://www.google.com/maps/place/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1!16s%2Fg%2F11c4bm_n3g"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-white text-[#1a73e8] px-12 py-4 rounded-full font-bold text-lg border border-zinc-200 shadow-md hover:bg-[#f6fafe] hover:shadow-lg transition-all flex items-center gap-3"
                   >
                     Leggi tutte le recensioni
                     <ChevronRight className="w-6 h-6" />
                   </a>
                </div>
              </div>
           </div>
        </section>

       {/* FAQ Section */}
       {(() => {
         const faqs = [
           {
              q: "Quali sono gli ingredienti della schiacciata?",
              a: "La nostra schiacciata è fatta con impasto a lievito madre, farina, acqua, olio extravergine d'oliva e sale. Ma il pane è solo il punto di partenza: ogni schiacciata al Retrò è farcita al momento con ingredienti selezionati. Dalla Top De Gamma — stracciatella di bufala, mortadella bolognese, granella di pistacchio — alla Fit, con stracchino, zucchine grigliate, rucola e pomodorini soleggiati."
           },
           {
             q: "Trieste vs Venezia: quale città scegliere?",
             a: "Venezia è un set cinematografico affollato. Trieste è una città vera, con un'anima mitteleuropea unica in Italia, il mare sferzante, i caffè storici e — da adesso — la schiacciata più buona del nordest. Se sei già a Trieste, hai già scelto bene. Vien provar al Retrò in Viale XX Settembre e te ne convinci definitivamente."
           },
           {
             q: "Cucina triestina vs cucina friulana: qual è la differenza?",
             a: "La cucina friulana è terragna: frico, polenta, gubana. La cucina triestina è portuale, cosmopolita, influenzata dall'Impero austro-ungarico: baccalà alla triestina, jota, cevapčići. E poi c'è la schiacciata di Retrò, che è tutta e solo triestina — niente polenta, niente nostalgie. Solo schiacciata croccante e ingredienti veri."
           },
           {
             q: "Cosa significa schiacciata?",
             a: "Schiacciata significa, letteralmente, 'appiattita'. Viene dalla tradizione toscana e ligure di stendere l'impasto del pane il più sottile e largo possibile prima di cuocerlo. Il risultato è un pane sottile fuori, alveolato dentro, croccante al morso — perfetto per farciture generose senza che tutto crolli in mano."
           },
           {
              q: "Che differenza c'è tra focaccia e schiacciata?",
              a: "La focaccia — quella genovese, per capirci — è alta, morbida, oliosa, spesso con rosmarino. La schiacciata è più sottile, con una mollica compatta e una crosta croccante. La differenza vera però è nell'uso: la focaccia si mangia da sola, la schiacciata è pensata per essere farcita. La nostra è fatta con lievito madre, il che le dà una profondità di sapore che l'impasto industriale non raggiungerà mai."
           },
           {
              q: "Che differenza c'è tra schiacciata e pane?",
              a: "Il pane comune viene lievitato in forma, ha una mollica alta e soffice. La schiacciata viene stesa sottile e cotta ad alta temperatura, con una mollica più compatta e alveolata, crosta sottile, morso secco. La nostra la facciamo con lievito madre: vuol dire più digeribile, più sapore, e una crosta che tiene — anche con le farciture più generose."
           }
         ];

         return (
           <section id="faq" className="bg-black text-white py-32 px-6 border-t-8 border-yellow-400">
             <div className="max-w-5xl mx-auto">
               <div className="mb-20">
                 <p className="text-yellow-400 font-black uppercase tracking-[0.3em] text-sm mb-4">Le domande che tutti fanno</p>
                 <h2 className="text-[10vw] md:text-8xl font-display uppercase italic tracking-tighter leading-none">
                   HAI <br />
                   <span className="bg-yellow-400 text-black px-4 py-2 not-italic inline-block mt-2">DOMANDE?</span>
                 </h2>
               </div>

               <div className="divide-y-4 divide-yellow-400/20">
                 {faqs.map((faq, i) => (
                   <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
                 ))}
               </div>
             </div>
           </section>
         );
       })()}


      {/* Minimal Footer */}
      <footer className="bg-black text-white border-t-4 border-yellow-400">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image src="/logo_retro.png" alt="Barretrò" width={64} height={90} className="w-12 h-auto brightness-110" />
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Schiacciateria Retrò</p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Viale Venti Settembre, 16<br />34132 Trieste (TS)
            </p>
          </div>
          {/* Nav */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400 mb-2">Link rapidi</p>
            <Link href="/menu" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">Menu</Link>
            <Link href="/blog" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">Blog</Link>
            <Link href="/chi-siamo" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">Chi Siamo</Link>
            <Link href="/contatti" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">Contatti</Link>
            <a href="https://www.instagram.com/retroxxsettembre" target="_blank" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2"><Camera className="w-4 h-4" /> Instagram</a>
          </div>
          {/* Hours */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400 mb-2">Orari</p>
            <div className="flex flex-col gap-1 text-sm text-zinc-400">
              <div className="flex justify-between gap-3">
                <span className="font-bold uppercase tracking-wider">Lun – Gio</span>
                <span className="font-black text-white">8:00 — 22:00</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold uppercase tracking-wider">Ven – Sab</span>
                <span className="font-black text-white">8:00 — 00:00</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-bold uppercase tracking-wider">Domenica</span>
                <span className="font-black text-white">8:00 — 21:00</span>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Bar+Retro+Schiacciateria+Triestina+Viale+Venti+Settembre+16+Trieste"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-400 hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4" /> Ottieni Indicazioni
            </a>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-zinc-600 uppercase tracking-widest">© {new Date().getFullYear()} Barretrò. Tutti i diritti riservati.</p>
              <div className="flex gap-4 text-xs text-zinc-500 uppercase tracking-widest font-bold flex-wrap">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
                <span>•</span>
                <Link href="/termini-e-condizioni" className="hover:text-white transition-colors">Termini e Condizioni</Link>
              </div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider mt-1 max-w-xl leading-normal">
                Nota di trasparenza (AI Act): Alcune immagini presenti sul sito hanno scopo puramente illustrativo e sono state generate o ottimizzate con tecnologie di Intelligenza Artificiale.
              </p>
            </div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              Sito creato da{' '}
              <a
                href="https://saintjackstudios.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors font-black"
              >
                Saint Jack Studios
              </a>
            </p>
          </div>
        </div>
      </footer>



    </main>
  );
}
