import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Products } from "@/components/products";
import { Reviews } from "@/components/reviews";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main id="inicio" className="min-h-[100dvh]">
      <Header />
      <Hero />
      <About />
      <Products />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
