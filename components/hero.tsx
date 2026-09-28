"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef(0);
  const isSmallScreenRef = useRef(false);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // On a short mobile viewport, the bottom-anchored hero text sits much
  // closer (relative to total scroll) to the fixed header than it does on a
  // tall desktop one — fading/drifting it on the same curve let it collide
  // with the header mid-scroll. Fade it out earlier on small screens instead
  // of tuning one fixed curve to satisfy both. Tracked as both state (so the
  // `textY` transform below picks up the new range) and a ref (read inside
  // the imperative opacity handler without needing a re-render per scroll).
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      isSmallScreenRef.current = mq.matches;
      setIsSmallScreen(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Video is scroll-scrubbed, not autoplaying — it only moves when the user
  // scrolls, and holds still otherwise instead of looping in the background.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const captureDuration = () => { durationRef.current = video.duration || 0; };
    if (video.readyState >= 1) captureDuration();
    video.addEventListener("loadedmetadata", captureDuration);

    // Mobile Safari often buffers only the first frame for a video with no
    // autoplay/loop, so seeking mid-scroll can show a stale or black frame.
    // A muted play immediately paused forces it to actually start decoding —
    // harmless on desktop, needed on iOS. (Best confirmed on a real iPhone.)
    const primeBuffer = () => {
      video.play()?.then(() => video.pause()).catch(() => {});
    };
    video.addEventListener("loadedmetadata", primeBuffer, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", captureDuration);
      video.removeEventListener("loadedmetadata", primeBuffer);
    };
  }, []);

  // Opacity driven imperatively via refs, not `style={{ opacity: motionValue }}`:
  // that pattern was found to freeze at its initial value in this app (framer-
  // motion 12 + React 19) for every continuously scroll-linked opacity in this
  // component — confirmed on three independent instances during testing. `y`/
  // `transform` update correctly through `style`, so only opacity is routed
  // around it here, the same way the video's `currentTime` already is above.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (video && durationRef.current && !prefersReduced) {
      video.currentTime = progress * durationRef.current;
    }
    if (prefersReduced) return;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(Math.min(1, progress) * 0.3);
    }
    if (textWrapRef.current) {
      const fadeEnd = isSmallScreenRef.current ? 0.35 : 0.7;
      textWrapRef.current.style.opacity = String(Math.max(0, 1 - progress / fadeEnd));
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = String(Math.max(0, 1 - progress / 0.2));
    }
  });

  // Video drifts up slowly as user scrolls past (parallax)
  const videoY     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  // Subtle zoom-in as page loads / scrolls
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  // Combined into one transform string so the browser compositor can run this
  // off the main thread even while the page is busy loading/painting
  const videoTransform = useMotionTemplate`translateY(${videoY}) scale(${videoScale})`;

  // Text drifts up as section leaves viewport — finishes much earlier on
  // mobile so it's fully gone before it reaches the header band. (`y` via
  // style works fine here — only opacity needed the imperative workaround.)
  const textY = useTransform(scrollYProgress, [0, isSmallScreen ? 0.45 : 0.8], [0, -60]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden">

      {/* Video — playback scrubbed to scroll position, plus a slight parallax drift */}
      <motion.div
        style={prefersReduced ? {} : { transform: videoTransform }}
        className="absolute inset-0 origin-center will-change-transform"
      >
        <video
          ref={videoRef}
          src="/img/heroanimation.mp4"
          muted
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
        <div
          ref={overlayRef}
          style={{ opacity: 0 }}
          className="absolute inset-0 bg-background pointer-events-none"
        />
      )}

      {/* Asymmetric text — bottom-left. Split into two layers instead of
          mixing a one-time mount `animate` and a continuous scroll `style`
          on the same y/opacity: Framer's precedence between the two is
          ambiguous and was leaving the text partly visible well past where
          the scroll curve said it should be gone — outer layer owns the
          scroll-driven fade (imperative, see the note above), inner layer
          owns the one-time reveal. */}
      <motion.div
        ref={textWrapRef}
        style={prefersReduced ? {} : { y: textY }}
        className="absolute bottom-14 left-5 md:left-14 lg:left-24 max-w-[640px] z-10 px-1"
      >
        <motion.div
          initial={{ y: 32 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
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
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.15 }}
                className="block"
              >
                Dulzura hecha
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.28 }}
                className="block text-primary italic"
              >
                a medida
              </motion.span>
            </span>
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
      </motion.div>

      {/* Scroll hint */}
      <div
        ref={hintRef}
        style={{ opacity: 1 }}
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
      </div>

    </section>
  );
}
