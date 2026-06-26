import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { Testimonial } from "@/components/sections/Testimonial";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <ServicesTeaser />
        <Testimonial />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
