"use client";

import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Roles } from "@/components/roles";
import { Research } from "@/components/research";
import { PublicService } from "@/components/public-service";
import { Media } from "@/components/media";
import { Art } from "@/components/art";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { useFadeUp } from "@/components/use-fade-up";

export default function Home() {
  useFadeUp();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Roles />
        <Research />
        <PublicService />
        <Media />
        <Art />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
