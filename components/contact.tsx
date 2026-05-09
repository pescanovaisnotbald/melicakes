"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Clock, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name")).trim(),
          phone: String(data.get("phone")).trim(),
          email: String(data.get("email")).trim(),
          message: String(data.get("message")).trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
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
                  href: "https://www.google.com/maps/place/Meli%26Cakes/@41.577356,2.013275,17z/data=!4m6!3m5!1s0x12a493379d3d6315:0x368e96599e702383!8m2!3d41.577356!4d2.013275!16s%2Fg%2F11sfhr40r0?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D",
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
                  <div className="text-sm text-foreground space-y-0.5">
                    <p>Lun: 16:30 – 20:00</p>
                    <p>Mar – Vie: 9:30 – 13:30, 16:30 – 20:00</p>
                    <p>Sáb: 9:00 – 13:00</p>
                    <p>Dom: Cerrado</p>
                  </div>
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
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="py-12 flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-xl text-foreground font-medium">¡Mensaje enviado!</h4>
                    <p className="text-sm text-muted-foreground max-w-[30ch]">
                      Nos pondremos en contacto contigo en breve.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-xs text-primary underline underline-offset-2"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
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

                  {status === "error" && (
                    <p className="text-xs text-destructive text-center">
                      Ha ocurrido un error. Inténtalo de nuevo o escríbenos directamente.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Enviando…
                      </>
                    ) : "Enviar Mensaje"}
                  </button>
                </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
