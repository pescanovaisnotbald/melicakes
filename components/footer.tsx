"use client";

import { motion } from "framer-motion";
import { Heart } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="py-12 px-5 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#inicio"
            className="font-serif text-xl font-medium text-foreground hover:text-primary transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Meli<span className="text-primary">&</span>Cakes
          </a>

          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { href: "#nosotros", label: "Nosotros" },
              { href: "#productos", label: "Productos" },
              { href: "#resenas", label: "Reseñas" },
              { href: "#contacto", label: "Contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground flex items-center gap-1.5"
          >
            Hecho con{" "}
            <Heart weight="fill" className="w-3.5 h-3.5 text-primary" />
            {" "}en Terrassa
          </motion.p>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Meli&Cakes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
