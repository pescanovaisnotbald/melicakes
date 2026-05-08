"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Video drifts up slowly as user scrolls past (parallax)
  const videoY     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  // Subtle zoom-in as page loads / scrolls
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  // Overlay darkens slightly on scroll for depth
  const overlayOp  = useTransform(scrollYProgress, [0, 1], [0, 0.3]);

  // Text drifts up and fades out as section leaves viewport
  const textY      = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const textOp     = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Scroll hint fades quickly
  const hintOp     = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] overflow-hidden">

      {/* Video — parallax drift, no scrubbing */}
      <motion.div
        style={prefersReduced ? {} : { y: videoY, scale: videoScale }}
        className="absolute inset-0 origin-center will-change-transform"
      >
        <video
          src="/img/heroanimation.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Static gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

      {/* Scroll-driven darkening overlay */}
      {!prefersReduced && (
        <motion.div
          style={{ opacity: overlayOp }}
          className="absolute inset-0 bg-background pointer-events-none"
        />
      )}

      {/* Asymmetric text — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={prefersReduced ? {} : { y: textY, opacity: textOp }}
        className="absolute bottom-14 left-5 md:left-14 lg:left-24 max-w-[640px] z-10 px-1"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/12 text-primary mb-6 border border-primary/20"
        >
          Pastelería Artesanal · Terrassa
        </motion.span>

        <h1 className="font-serif text-[clamp(3.2rem,8vw,7rem)] font-medium tracking-tight leading-[0.93] text-foreground">
          Dulzura hecha
          <span className="block text-primary italic">a medida</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-7 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
        >
          Creaciones únicas para los momentos que se recuerdan siempre.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#productos"
            className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/90 active:scale-[0.98]"
          >
            <span className="text-sm font-medium">Ver Productos</span>
            <span className="grid place-items-center w-9 h-9 rounded-full bg-primary-foreground/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowRight weight="bold" className="w-4 h-4" />
            </span>
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground hover:bg-foreground/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Contactar
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={prefersReduced ? {} : { opacity: hintOp }}
        className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 rotate-90 origin-center translate-x-6">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent"
        />
      </motion.div>

    </section>
  );
}
