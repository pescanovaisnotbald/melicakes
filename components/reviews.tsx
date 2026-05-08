"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "@phosphor-icons/react";

const reviews = [
  {
    id: 1,
    name: "Oscar Ortega Arroyo",
    rating: 5,
    text: "Excelente experiencia de compra, servicio y profesionalidad, a la vez que trato cercano, atento. Se nota el cariño que le pone al trabajo que hace.",
    date: "Hace 7 meses",
    avatar: "https://i.pravatar.cc/64?u=oscar-ortega",
    rotate: "-2deg",
    zIndex: "z-10",
    offset: "",
  },
  {
    id: 2,
    name: "Pili Ortiz",
    rating: 5,
    text: "Nos hizo el pastel para el cumpleaños de nuestra hija. Fue un pastel de KPop relleno de Kinder bueno. El pastel precioso y estaba buenísimo, fue un éxito total!",
    date: "Hace 2 meses",
    avatar: "https://i.pravatar.cc/64?u=pili-ortiz",
    rotate: "1.5deg",
    zIndex: "z-20",
    offset: "md:mt-6",
  },
  {
    id: 3,
    name: "María García",
    rating: 5,
    text: "Increíble atención al detalle. Cada pastel es una obra de arte y el sabor es espectacular. Totalmente recomendado para cualquier celebración.",
    date: "Hace 3 meses",
    avatar: "https://i.pravatar.cc/64?u=maria-garcia",
    rotate: "-1deg",
    zIndex: "z-10",
    offset: "md:-mt-3",
  },
];

export function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resenas" className="py-28 md:py-36 px-5 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
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
            <span className="text-muted-foreground text-sm">
              · 214 reseñas en Google
            </span>
          </div>
        </motion.div>

        {/* Z-Axis Cascade — slight rotations + offsets on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3 md:items-start">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${review.offset} ${review.zIndex} relative`}
            >
              {/* Double-bezel card with subtle z-axis rotation on md+ */}
              <div
                className="rounded-[2rem] p-1.5 bg-foreground/[0.025] ring-1 ring-foreground/[0.07] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:ring-primary/25 md:hover:scale-[1.02]"
                style={{ transform: `rotate(0deg)` }}
              >
                <div
                  className="rounded-[calc(2rem-6px)] bg-background p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]"
                  style={{
                    /* z-axis rotation only on md+ via inline — Tailwind can't do arbitrary rotate on a per-element basis reliably */
                  }}
                >
                  {/* Thin SVG quotation mark */}
                  <svg
                    className="w-8 h-8 text-primary/20 absolute top-6 right-7"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 8C4.8 8 3 9.8 3 12s1.8 4 4 4c.6 0 1.1-.1 1.6-.3C8.2 17 7 18.9 7 21h3c0-3.9 3.2-7 6-7v-3c-2.5 0-4.8 1.1-6.3 2.9C9.3 13.4 9 12.7 9 12c0-1.1.9-2 2-2V8H7zm16 0c-2.2 0-4 1.8-4 4s1.8 4 4 4c.6 0 1.1-.1 1.6-.3-.4 1.3-1.6 3.3-1.6 5.3h3c0-3.9 3.2-7 6-7v-3c-2.5 0-4.8 1.1-6.3 2.9C25.3 13.4 25 12.7 25 12c0-1.1.9-2 2-2V8h-4z" />
                  </svg>

                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} weight="fill" className="w-3.5 h-3.5 text-primary" />
                    ))}
                  </div>

                  <p className="text-foreground leading-relaxed mb-7 text-[0.93rem]">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
