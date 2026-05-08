"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = ["Todos", "Cupcakes", "Pasteles", "Especiales"];

const products = [
  {
    id: 1,
    name: "Caja Surtida de Cupcakes",
    category: "Cupcakes",
    description: "Ferrero Rocher, chocolate blanco, rosa y Oreo — una caja para todos los gustos.",
    img: "/img/cupcakes.jpg",
    imgPosition: "object-center",
    span: "lg:col-span-3 lg:row-span-2",
    imgClass: "h-72 lg:h-full",
  },
  {
    id: 2,
    name: "Cupcakes del Día",
    category: "Cupcakes",
    description: "Recién horneados y expuestos en nuestra vitrina de Terrassa.",
    img: "/img/hero.jpeg",
    imgPosition: "object-center",
    span: "lg:col-span-3",
    imgClass: "h-52",
  },
  {
    id: 3,
    name: "Cupcake Red Velvet",
    category: "Cupcakes",
    description: "Esponjoso bizcocho rojo con frosting de queso crema artesanal.",
    img: "/img/cosilla.jpg",
    imgPosition: "object-center",
    span: "lg:col-span-2",
    imgClass: "h-56",
  },
  {
    id: 4,
    name: "Cupcakes Personalizados",
    category: "Cupcakes",
    description: "En los colores y decoración que imagines — perfectos para celebraciones.",
    img: "/img/cupkakes.jpg",
    imgPosition: "object-top",
    span: "lg:col-span-2",
    imgClass: "h-56",
  },
  {
    id: 5,
    name: "Pastel de Celebración",
    category: "Pasteles",
    description: "Diseño elegante con macarons dorados, moras y flores secas a tu medida.",
    img: "/img/pastel1.jpeg",
    imgPosition: "object-center",
    span: "lg:col-span-2",
    imgClass: "h-56",
  },
  {
    id: 6,
    name: "Torre de Cupcakes",
    category: "Especiales",
    description: "Presentación espectacular para bodas, comuniones y eventos especiales.",
    img: "/img/pasteles.jpg",
    imgPosition: "object-top",
    span: "lg:col-span-3",
    imgClass: "h-52",
  },
  {
    id: 7,
    name: "Tarta Artesanal",
    category: "Especiales",
    description: "Elaborada con masa madre y recetas tradicionales de la casa.",
    img: "/img/tarta.jpg",
    imgPosition: "object-center",
    span: "lg:col-span-2",
    imgClass: "h-52",
  },
  {
    id: 8,
    name: "Pastel Stranger Things",
    category: "Pasteles",
    description: "Diseño exclusivo temático con figuras y decoración totalmente personalizada.",
    img: "/img/pastel-strangerthings.png",
    imgPosition: "object-center",
    span: "lg:col-span-2",
    imgClass: "h-56",
  },
  {
    id: 9,
    name: "Pastel Infantil Personalizado",
    category: "Pasteles",
    description: "Figura 3D fondant a medida — el personaje favorito de tu peque.",
    img: "/img/pastel-cocodrilo.png",
    imgPosition: "object-center",
    span: "lg:col-span-2",
    imgClass: "h-56",
  },
  {
    id: 10,
    name: "Pastel Temático Cine",
    category: "Pasteles",
    description: "Tarta de tres pisos con decoración de película — espectacular para eventos.",
    img: "/img/pastel-cine.png",
    imgPosition: "object-center",
    span: "lg:col-span-3",
    imgClass: "h-64",
  },
];

export function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="productos" className="py-28 md:py-36 px-5" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/10 text-primary mb-5 border border-primary/20">
            Nuestros Productos
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] font-medium text-foreground">
            Dulces <span className="text-primary italic">tentaciones</span>
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 border border-foreground/8 px-1.5 py-1.5 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Asymmetric 6-col bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-auto">
          {filtered.map((product, index) => (
            <motion.article
              key={product.id}
              layout
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group ${product.span}`}
            >
              {/* Double-bezel card */}
              <div className="h-full rounded-[2rem] p-1.5 bg-foreground/[0.025] ring-1 ring-foreground/[0.06] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:ring-primary/30">
                <div className="h-full rounded-[calc(2rem-6px)] bg-card overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  {/* Real photo */}
                  <div className={`relative ${product.imgClass} overflow-hidden bg-secondary/30`}>
                    <img
                      src={product.img}
                      alt={product.name}
                      className={`w-full h-full object-cover ${product.imgPosition} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]`}
                      loading="lazy"
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <span className="text-[10px] text-primary uppercase tracking-[0.18em] font-medium">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-foreground mt-1 mb-1.5 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 pl-6 pr-2 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Solicitar Presupuesto
            <span className="grid place-items-center w-8 h-8 rounded-full bg-foreground/8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
