"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkle, Heart, Medal } from "@phosphor-icons/react";

const features = [
  {
    icon: Sparkle,
    title: "Creatividad",
    description: "Cada pastel es una obra de arte única diseñada especialmente para ti.",
  },
  {
    icon: Heart,
    title: "Pasión",
    description: "Ponemos amor y dedicación en cada detalle de nuestras creaciones.",
  },
  {
    icon: Medal,
    title: "Calidad",
    description: "Ingredientes premium y técnicas artesanales para el mejor sabor.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nosotros" className="py-28 md:py-36 px-5 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left — shop photo with double-bezel frame */}
          <div className="order-2 lg:order-1">
            <div className="rounded-[2rem] p-1.5 bg-foreground/[0.025] ring-1 ring-foreground/[0.06]">
              <div className="rounded-[calc(2rem-6px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <img
                  src="/img/tienda.jpg"
                  alt="Interior de Meli&Cakes, Terrassa"
                  className="w-full h-[480px] lg:h-[560px] object-cover"
                />
              </div>
            </div>

          </div>

          {/* Right — editorial text + features */}
          <div className="order-1 lg:order-2">
            <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/10 text-primary mb-5 border border-primary/20">
              Nuestra Historia
            </span>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] font-medium text-foreground leading-tight mb-6">
              Donde la creatividad
              <br />
              <span className="text-primary italic">cobra vida</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-[52ch]">
              Meli & Cakes es una pastelería dedicada y especializada en pasteles de
              celebraciones y dulces hechos a medida. Un proyecto innovador basado en
              la creatividad y en la personalización, donde cada creación cuenta una
              historia única.
            </p>

            <div className="flex items-center gap-5 mb-10">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-serif font-medium text-primary">5.0</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">Estrellas</span>
                  <span className="text-xs text-muted-foreground">214 reseñas Google</span>
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Terrassa, Barcelona</span>
                <span className="text-xs text-muted-foreground">Carrer dels Voluntaris, 44</span>
              </div>
            </div>

            {/* Feature cards — asymmetric 2+1 */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={index === 2 ? "col-span-2" : ""}
                >
                  <div className="rounded-[1.5rem] p-1 bg-foreground/[0.025] ring-1 ring-foreground/[0.06]">
                    <div className="rounded-[calc(1.5rem-4px)] bg-background p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit mb-3">
                        <feature.icon weight="light" className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground mb-1 text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
