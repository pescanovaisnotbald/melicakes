"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#productos", label: "Productos" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating glass pill — detached from top edge */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 inset-x-0 z-50 flex justify-center px-4"
      >
        <nav className="flex items-center gap-6 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 px-5 py-2.5 shadow-[0_8px_32px_-8px_rgba(194,86,107,0.18)]">
          {/* Logo */}
          <a
            href="#inicio"
            className="font-serif text-lg font-medium text-foreground shrink-0 mr-2"
          >
            Meli<span className="text-primary">&</span>Cakes
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="tel:697342184"
            className="hidden md:inline-flex items-center px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] ml-2"
          >
            Llamar
          </a>

          {/* Mobile hamburger — morphs to X */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden relative w-6 h-6 flex flex-col justify-center gap-[5px] ml-2"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block w-full h-px bg-foreground origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block w-full h-px bg-foreground origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-primary/10 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 md:hidden"
            onClick={() => setOpen(false)}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-serif text-4xl font-medium text-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:697342184"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: navLinks.length * 0.06 + 0.05 }}
              className="mt-8 inline-flex items-center px-7 py-3 bg-primary text-primary-foreground rounded-full text-base font-medium"
            >
              697 34 21 84
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
