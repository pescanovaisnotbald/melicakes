"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Clock, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!String(data.get("name")).trim()) errs.name = "Introduce tu nombre";
    if (!String(data.get("phone")).trim()) errs.phone = "Introduce tu teléfono";
    const email = String(data.get("email")).trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Introduce un email válido";
    if (!String(data.get("message")).trim()) errs.message = "Cuéntanos tu idea";
    return errs;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Form ready to submit
    }
  }

  const inputBase =
    "w-full px-4 py-3 bg-background border rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60";

  return (
    <section id="contacto" className="py-28 md:py-36 px-5" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left — contact info */}
          <div>
            <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-medium bg-primary/10 text-primary mb-5 border border-primary/20">
              Contacto
            </span>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,3.6rem)] font-medium text-foreground leading-tight mb-6">
              Hagamos realidad
              <br />
              <span className="text-primary italic">tu dulce sueño</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-[48ch]">
              Cuéntanos tu idea y crearemos el pastel perfecto para tu celebración.
              Cada proyecto es único y especial para nosotros.
            </p>

            <div className="space-y-6">
              {[
                {
                  href: "https://maps.google.com/?q=Carrer+dels+Voluntaris+44+Terrassa",
                  icon: MapPin,
                  label: "Dirección",
                  text: "Carrer dels Voluntaris, 44, 08225 Terrassa",
                  external: true,
                },
                {
                  href: "tel:697342184",
                  icon: Phone,
                  label: "Teléfono",
                  text: "697 34 21 84",
                  external: false,
                },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <item.icon weight="light" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-foreground group-hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm">
                      {item.text}
                    </p>
                  </div>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4"
              >
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Clock weight="light" className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Horario</p>
                  <p className="text-sm text-foreground">Lun – Sáb: 9:00 – 20:00</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-3 mt-10"
            >
              {[
                { href: "https://www.instagram.com/melicakes5/", icon: InstagramLogo, label: "Instagram" },
                { href: "https://www.tiktok.com/@melicakes_", icon: TiktokLogo, label: "TikTok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-3 bg-secondary rounded-xl hover:bg-primary hover:text-primary-foreground text-foreground transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <s.icon weight="light" className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — double-bezel form card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-[2rem] p-1.5 bg-foreground/[0.025] ring-1 ring-foreground/[0.07]">
              <div className="rounded-[calc(2rem-6px)] bg-card p-7 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-7">
                  Envíanos un mensaje
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs text-muted-foreground mb-1.5">
                        Nombre
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        className={`${inputBase} ${errors.name ? "border-destructive/60" : "border-border"}`}
                      />
                      <p className="mt-1 text-xs text-destructive min-h-[1rem]">{errors.name ?? ""}</p>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs text-muted-foreground mb-1.5">
                        Teléfono
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Tu teléfono"
                        className={`${inputBase} ${errors.phone ? "border-destructive/60" : "border-border"}`}
                      />
                      <p className="mt-1 text-xs text-destructive min-h-[1rem]">{errors.phone ?? ""}</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs text-muted-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className={`${inputBase} ${errors.email ? "border-destructive/60" : "border-border"}`}
                    />
                    <p className="mt-1 text-xs text-destructive min-h-[1rem]">{errors.email ?? ""}</p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs text-muted-foreground mb-1.5">
                      Cuéntanos tu idea
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe el pastel de tus sueños..."
                      className={`${inputBase} resize-none ${errors.message ? "border-destructive/60" : "border-border"}`}
                    />
                    <p className="mt-1 text-xs text-destructive min-h-[1rem]">{errors.message ?? ""}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99]"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
