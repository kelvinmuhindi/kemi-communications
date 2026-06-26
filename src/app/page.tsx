import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { Testimonial } from "@/components/sections/Testimonial";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SneakPeek />
        <Testimonial />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
