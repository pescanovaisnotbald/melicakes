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
    text: "Pedí una tarta temática de Stranger Things y quedó increíble. A mi hijo le encantó, fue la estrella de la fiesta. Muchas gracias por hacer su día tan especial.",
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

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-[320px] shrink-0 rounded-[2rem] p-1.5 bg-foreground/[0.025] ring-1 ring-foreground/[0.07] mx-3">
      <div className="rounded-[calc(2rem-6px)] bg-background p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative">
        {/* Quotation mark */}
        <svg
          className="w-8 h-8 text-primary/25 absolute top-6 right-7"
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

        <p className="text-foreground leading-relaxed mb-7 text-[0.93rem] min-h-[80px]">
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
  );
}

export function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resenas" className="py-28 md:py-36 bg-card overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-5">
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
      </div>

      {/* Infinite marquee — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Left + right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-card to-transparent" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee hover:[animation-play-state:paused] py-4">
            {/* Duplicate the list for seamless loop */}
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`${review.id}-${i}`} review={review} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
