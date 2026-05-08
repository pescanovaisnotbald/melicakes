"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll progress within the sticky section (0 → 1)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Bind video.currentTime to scroll — runs outside render (perf-safe)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (prefersReduced) return;
    const v = videoRef.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    v.currentTime = Math.min(p * v.duration, v.duration - 0.04);
  });

  // Show first frame as soon as metadata loads (no black screen)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const seekToStart = () => { v.currentTime = 0; };
    if (v.readyState >= 1) seekToStart();
    else v.addEventListener("loadedmetadata", seekToStart, { once: true });
  }, []);

  // Play on first mouse move (bypasses autoplay policy, no loop)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMove = () => {
      v.play().catch(() => {});
      document.removeEventListener("mousemove", onMove);
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  // Text fades and rises out as user scrolls through the first 45 %
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.45], [0, -72]);

  // Subtle video zoom across full scroll
  const videoScale  = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Scroll hint disappears early
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    /* 220vh → ~120 dvh of scroll travel for the sticky video section */
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* Video background */}
        <motion.video
          ref={videoRef}
          src="/img/heroanimation.mp4"
          muted
          playsInline
          preload="auto"
          style={prefersReduced ? {} : { scale: videoScale }}
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />

        {/* Warm left-to-right gradient — legibility without hiding the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/88 via-background/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent pointer-events-none" />

        {/* ── ASYMMETRIC TEXT ── bottom-left, not centered (taste-skill rule) */}
        <motion.div
          style={prefersReduced ? {} : { opacity: textOpacity, y: textY }}
          className="absolute bottom-14 left-5 md:left-14 lg:left-24 max-w-[640px] z-10 px-1"
        >
          {/* Eyebrow pill tag */}
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/12 text-primary mb-6 border border-primary/20">
            Pastelería Artesanal · Terrassa
          </span>

          <h1 className="font-serif text-[clamp(3.2rem,8vw,7rem)] font-medium tracking-tight leading-[0.93] text-foreground">
            Dulzura hecha
            <span className="block text-primary italic">a medida</span>
          </h1>

          <p className="mt-7 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            Creaciones únicas para los momentos que se recuerdan siempre.
          </p>

          {/* Button-in-button CTA — taste-skill pattern */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
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
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={prefersReduced ? {} : { opacity: hintOpacity }}
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

      </div>
    </section>
  );
}
