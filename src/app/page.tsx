"use client";

import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Roles } from "@/components/roles";
import { Research } from "@/components/research";
import { PublicService } from "@/components/public-service";
import { Media } from "@/components/media";
import { Art } from "@/components/art";
import { Kitchen } from "@/components/kitchen";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { useFadeUp } from "@/components/use-fade-up";

export default function Home() {
  useFadeUp();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Roles />
        <Research />
        <PublicService />
        <Media />
        <Art />
        <Kitchen />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
