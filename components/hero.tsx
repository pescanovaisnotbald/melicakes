"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    const overlay = overlayRef.current;
    const text    = textRef.current;
    const hint    = hintRef.current;
    if (!section || !video || !overlay || !text || !hint) return;

    const init = () => {
      const dur = video.duration;
      if (!dur || Number.isNaN(dur)) return;

      // Start paused at frame 0
      video.currentTime = 0;

      // Master timeline driven by scroll — scrub: 0.5 adds 0.5s lag smoothing
      // so seeking never jumps (video playhead follows scroll with inertia)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:  section,
          start:    "top top",
          end:      "bottom bottom",
          scrub:    0.5,
        },
      });

      // ── Phase 1  (0 → 18%)  Dark curtain lifts, text slides in ──
      tl.fromTo(overlay, { opacity: 1 }, { opacity: 0.05, ease: "power2.out" }, "0%");
      tl.fromTo(
        text,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "8%"
      );
      tl.fromTo(hint, { opacity: 1 }, { opacity: 0, ease: "power2.out" }, "5%");

      // ── Phase 2  (0 → 100%)  Video scrubs end-to-end ──
      tl.fromTo(video, { currentTime: 0 }, { currentTime: dur, ease: "none" }, "0%");

      // ── Phase 3  (82 → 100%)  Curtain falls again, text fades out ──
      tl.to(text,    { opacity: 0, y: -20, ease: "power2.in" }, "82%");
      tl.to(overlay, { opacity: 0.92, ease: "power2.in" }, "85%");
    };

    // Run as soon as metadata is available
    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener("loadedmetadata", init, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /* 200vh: gives ~100dvh of scroll travel — enough to feel cinematic,
       short enough not to feel endless */
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-foreground">

        {/* Video — object-cover, no poster to avoid flash */}
        <video
          ref={videoRef}
          src="/img/heroanimation.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark curtain — starts opaque (frame 0 is hidden), lifts as video plays */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-foreground pointer-events-none"
          style={{ opacity: 1 }}
        />

        {/* Warm gradient for text legibility — always present */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />

        {/* Text — bottom-left, asymmetric */}
        <div
          ref={textRef}
          className="absolute bottom-14 left-5 md:left-14 lg:left-24 max-w-[640px] z-10 px-1"
          style={{ opacity: 0 }}
        >
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/15 text-primary mb-6 border border-primary/25">
            Pastelería Artesanal · Terrassa
          </span>

          <h1 className="font-serif text-[clamp(3.2rem,8vw,7rem)] font-medium tracking-tight leading-[0.93] text-background">
            Dulzura hecha
            <span className="block text-primary italic">a medida</span>
          </h1>

          <p className="mt-7 text-base md:text-lg text-background/70 max-w-md leading-relaxed">
            Creaciones únicas para los momentos que se recuerdan siempre.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#productos"
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground pl-6 pr-2 py-2 hover:bg-primary/90 active:scale-[0.98] transition-all duration-500"
              style={{ transition: "background 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.2s" }}
            >
              <span className="text-sm font-medium">Ver Productos</span>
              <span className="grid place-items-center w-9 h-9 rounded-full bg-primary-foreground/15 group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-500">
                <ArrowRight weight="bold" className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-background/30 px-6 py-3 text-sm font-medium text-background hover:bg-background/10 transition-all duration-500"
            >
              Contactar
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-background/50 rotate-90 origin-center translate-x-6">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-background/40 to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
}
