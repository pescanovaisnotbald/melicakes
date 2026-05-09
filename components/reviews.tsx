"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star } from "@phosphor-icons/react";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Meli%26Cakes/@41.577356,2.013275,17z/data=!4m6!3m5!1s0x12a493379d3d6315:0x368e96599e702383!8m2!3d41.577356!4d2.013275!16s%2Fg%2F11sfhr40r0!9m1!1b1";

const reviews = [
  {
    id: 1,
    name: "Oscar Ortega Arroyo",
    rating: 5,
    text: "Excelente experiencia de compra, servicio y profesionalidad, a la vez que trato cercano, atento. Se nota el cariño que le pone al trabajo que hace.",
    date: "Hace 7 meses",
    avatar: "https://i.pravatar.cc/64?u=oscar-ortega",
  },
  {
    id: 2,
    name: "Pili Ortiz",
    rating: 5,
    text: "Nos hizo el pastel para el cumpleaños de nuestra hija. Fue un pastel de KPop relleno de Kinder bueno. El pastel precioso y estaba buenísimo, fue un éxito total!",
    date: "Hace 2 meses",
    avatar: "https://i.pravatar.cc/64?u=pili-ortiz",
  },
  {
    id: 3,
    name: "María García",
    rating: 5,
    text: "Increíble atención al detalle. Cada pastel es una obra de arte y el sabor es espectacular. Totalmente recomendado para cualquier celebración.",
    date: "Hace 3 meses",
    avatar: "https://i.pravatar.cc/64?u=maria-garcia",
  },
  {
    id: 4,
    name: "Laura Sánchez",
    rating: 5,
    text: "Encargué una tarta personalizada para la comunión de mi hijo y superó todas las expectativas. Preciosa, original y deliciosa. Repetiré sin duda.",
    date: "Hace 1 mes",
    avatar: "https://i.pravatar.cc/64?u=laura-sanchez",
  },
  {
    id: 5,
    name: "Jordi Puig",
    rating: 5,
    text: "La mejor pastelería de Terrassa sin ninguna duda. Los cupcakes están espectaculares y el servicio es de 10. Muy recomendable.",
    date: "Hace 5 meses",
    avatar: "https://i.pravatar.cc/64?u=jordi-puig",
  },
  {
    id: 6,
    name: "Ana Romero",
    rating: 5,
    text: "Pedí una tarta temática de Stranger Things y quedó increíble. A mi hijo le encantó, fue la estrella de la fiesta. Muchas gracias.",
    date: "Hace 4 meses",
    avatar: "https://i.pravatar.cc/64?u=ana-romero",
  },
  {
    id: 7,
    name: "Mireia Bosch",
    rating: 5,
    text: "Gran profesional. Atiende con mucha dedicación y el resultado siempre es espectacular. Los cupcakes de Ferrero Rocher están para morirse.",
    date: "Hace 6 meses",
    avatar: "https://i.pravatar.cc/64?u=mireia-bosch",
  },
  {
    id: 8,
    name: "Carlos Vidal",
    rating: 5,
    text: "Torre de cupcakes para nuestra boda perfecta. Todos los invitados preguntaban quién la había hecho. Un trabajo excepcional y muy buen trato.",
    date: "Hace 8 meses",
    avatar: "https://i.pravatar.cc/64?u=carlos-vidal",
  },
];

const ITEM_W  = 320;
const GAP     = 16;
const STEP    = ITEM_W + GAP;
const SINGLE_W = reviews.length * STEP;
const ALL     = [...reviews, ...reviews, ...reviews];

export function Reviews() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const outerRef   = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const cwRef      = useRef(1100);

  const off        = useRef(-SINGLE_W);
  const vel        = useRef(0);
  const isDrag     = useRef(false);
  const didMove    = useRef(false);
  const startX     = useRef(0);
  const prevX      = useRef(0);
  const paused     = useRef(false);

  const norm = (o: number) => {
    if (o < -2 * SINGLE_W) return o + SINGLE_W;
    if (o >= 0)            return o - SINGLE_W;
    return o;
  };

  const paint = (o: number) => {
    const cx = cwRef.current / 2;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${o}px)`;
    ALL.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      const dist = (o + i * STEP + ITEM_W / 2) - cx;
      const t    = Math.min(1, Math.abs(dist) / (cwRef.current * 0.55));
      const sc   = 1 - t * 0.08;
      const op   = Math.max(0.35, 1 - t * 0.6);
      el.style.transform = `scale(${sc})`;
      el.style.opacity   = String(op);
    });
  };

  useEffect(() => {
    const measure = () => {
      if (outerRef.current) cwRef.current = outerRef.current.offsetWidth;
    };
    measure();
    window.addEventListener("resize", measure);

    let raf: number;
    const tick = () => {
      if (!isDrag.current) {
        if (!paused.current) off.current -= 0.6;
        vel.current *= 0.91;
        off.current += vel.current;
        off.current = norm(off.current);
      }
      paint(off.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    isDrag.current  = true;
    didMove.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX - off.current;
    prevX.current  = e.clientX;
    vel.current    = 0;
  };

  const onMove = (e: React.PointerEvent) => {
    if (!isDrag.current) return;
    const d = e.clientX - prevX.current;
    if (Math.abs(d) > 8) didMove.current = true;
    vel.current   = d * 1.4;
    prevX.current = e.clientX;
    off.current   = norm(e.clientX - startX.current);
    paint(off.current);
  };

  const onUp = () => { isDrag.current = false; };

  return (
    <section id="resenas" className="py-28 md:py-36 bg-card overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/10 text-primary mb-5 border border-primary/20">
            Reseñas
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] font-medium text-foreground">
            Lo que dicen{" "}
            <span className="text-primary italic">nuestros clientes</span>
          </h2>
          <div className="flex items-center gap-2 mt-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} weight="fill" className="w-4 h-4 text-primary" />
              ))}
            </div>
            <span className="text-foreground font-medium text-sm">5.0</span>
            <span className="text-muted-foreground text-sm">· 214 reseñas en Google</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Edge fade masks */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-card to-transparent" />

          <div
            ref={outerRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none py-6"
            onMouseEnter={() => { paused.current = true; }}
            onMouseLeave={() => { paused.current = false; }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div
              ref={trackRef}
              className="flex items-stretch"
              style={{ gap: GAP, willChange: "transform" }}
            >
              {ALL.map((review, i) => (
                <div
                  key={i}
                  ref={el => { itemRefs.current[i] = el; }}
                  style={{ width: ITEM_W, flexShrink: 0, willChange: "transform, opacity" }}
                >
                  <a
                    href={didMove.current ? undefined : GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    onClick={(e) => { if (didMove.current) e.preventDefault(); }}
                    className="group block w-full h-full text-left focus:outline-none cursor-pointer"
                  >
                    <div className="h-full rounded-[2rem] p-1.5 bg-foreground/[0.025] ring-1 ring-foreground/[0.07] transition-all duration-500 hover:ring-primary/30">
                      <div className="h-full rounded-[calc(2rem-6px)] bg-background p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative flex flex-col">
                        {/* Quote */}
                        <svg
                          className="w-8 h-8 text-primary/25 absolute top-6 right-7"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M7 8C4.8 8 3 9.8 3 12s1.8 4 4 4c.6 0 1.1-.1 1.6-.3C8.2 17 7 18.9 7 21h3c0-3.9 3.2-7 6-7v-3c-2.5 0-4.8 1.1-6.3 2.9C9.3 13.4 9 12.7 9 12c0-1.1.9-2 2-2V8H7zm16 0c-2.2 0-4 1.8-4 4s1.8 4 4 4c.6 0 1.1-.1 1.6-.3-.4 1.3-1.6 3.3-1.6 5.3h3c0-3.9 3.2-7 6-7v-3c-2.5 0-4.8 1.1-6.3 2.9C25.3 13.4 25 12.7 25 12c0-1.1.9-2 2-2V8h-4z" />
                        </svg>

                        <div className="flex mb-4">
                          {[...Array(review.rating)].map((_, j) => (
                            <Star key={j} weight="fill" className="w-3.5 h-3.5 text-primary" />
                          ))}
                        </div>

                        <p className="text-foreground leading-relaxed mb-7 text-[0.93rem] flex-1">
                          &ldquo;{review.text}&rdquo;
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary/40" fill="currentColor">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                              </svg>
                            </div>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          {/* Google G icon */}
                          <svg viewBox="0 0 24 24" className="w-5 h-5 opacity-30 group-hover:opacity-60 transition-opacity duration-300 shrink-0" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 pl-5 pr-2 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Ver todas las reseñas en Google
            <span className="grid place-items-center w-8 h-8 rounded-full bg-foreground/8 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </span>
          </a>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Arrastra para explorar · Clic en una reseña para ver en Google
          </p>
        </div>
      </motion.div>
    </section>
  );
}
