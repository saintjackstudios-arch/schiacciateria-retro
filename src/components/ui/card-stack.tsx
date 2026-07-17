"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  avatar?: string;
  rating?: number;
  date?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  // consider wrapped alternative
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 5,

  cardWidth = 400,
  cardHeight = 480,

  overlap = 0.55,
  spreadDeg = 35,

  perspectivePx = 1200,
  depthPx = 150,
  tiltXDeg = 8,

  activeLiftPx = 30,
  activeScale = 1.05,
  inactiveScale = 0.9,

  springStiffness = 260,
  springDamping = 25,

  loop = true,
  autoAdvance = true,
  intervalMs = 4000,
  pauseOnHover = true,

  showDots = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  // keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  // keyboard navigation (when container focused)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // autoplay
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  return (
    <div
      className={cn("w-full py-12", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full outline-none"
        style={{ height: Math.max(450, cardHeight + 60) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              // fan geometry
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 8; 
              const z = -abs * depthPx;

              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: any,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, cardWidth * 0.22);
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-none border-4 border-black bg-white shadow-[10px_10px_0px_#000] overflow-hidden",
                    "will-change-transform select-none",
                    isActive
                      ? "cursor-grab active:cursor-grabbing"
                      : "cursor-pointer",
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x, rotateZ, rotateX, scale }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: x + (off > 0 ? 100 : -100) }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => !isActive && setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dots navigation centered at bottom */}
      {showDots ? (
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-3 w-3 border-2 border-black rotate-45 transition-all duration-300",
                    on
                      ? "bg-yellow-400 scale-125 shadow-[2px_2px_0px_#000]"
                      : "bg-white hover:bg-yellow-200",
                  )}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DefaultFanCard({ item }: { item: CardStackItem }) {
  return (
    <div className="relative h-full w-full bg-white flex flex-col p-6">
      {/* Header: Avatar + Title + Rating */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-16 w-16 border-4 border-black shadow-[4px_4px_0px_#facc15] bg-yellow-400 overflow-hidden shrink-0">
          {item.avatar ? (
            <Image 
              src={item.avatar} 
              alt={item.title} 
              fill 
              className="object-cover" 
              unoptimized
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-display font-black text-2xl">
              {item.title.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="font-display font-black uppercase text-xl md:text-2xl leading-tight">
            {item.title}
          </h4>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-4 h-4", 
                  i < (item.rating || 5) ? "fill-red-600 text-red-600" : "text-black/10"
                )} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Review Image (Optional) */}
      {item.imageSrc && (
        <div className="relative w-full aspect-[4/3] border-4 border-black mb-6 bg-yellow-50 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
          <Image 
            src={item.imageSrc} 
            alt="Review content" 
            fill 
            className="object-cover" 
            unoptimized
          />
        </div>
      )}

      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="font-sans font-bold text-lg md:text-xl text-black leading-snug italic line-clamp-6">
          "{item.description}"
        </p>
      </div>

      {/* Footer: Date + Google Link */}
      <div className="mt-6 pt-6 border-t-2 border-black/10 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
          {item.date || "RECENSIONE GOOGLE"}
        </span>
        {item.href && (
          <a 
            href={item.href} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-black text-yellow-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            VEDI SU MAPS <SquareArrowOutUpRight className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
