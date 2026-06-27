import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { Services as ServicesGrid } from "@/components/sections/Services";
import { Fleet } from "@/components/sections/Fleet";
import { Coverage } from "@/components/sections/Coverage";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = {
  title: "Services | Kemi Communication Ltd",
  description:
    "Road freight transport, cross-border logistics and corporate bulk hire. Explore Kemi Communication's freight and logistics services.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Our Services"
          title="Freight & logistics services built for African trade"
          description="Whether you're moving raw materials between factories or stock between warehouses, our services are designed around reliability, safety and speed."
        />
        <ServicesGrid showAnchors />
        <Fleet />
        <Coverage />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
