import { FileText, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { resourceItems } from "@/lib/content";

export const metadata = {
  title: "Resources | Kemi Communications Ltd",
  description:
    "Company brochures, FAQs and rate guides from Kemi Communications Ltd.",
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Resources"
          title="Helpful documents & guides"
          description="Brochures, FAQs and rate information to help you plan your shipment."
        />

        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resourceItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-brand-line p-7"
                >
                  <FileText
                    size={26}
                    className="mb-4 text-brand-orange-deep"
                  />
                  <h3 className="mb-2 text-[16px] font-semibold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-brand-steel">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-paper-warm px-3 py-1 text-[11.5px] font-bold text-brand-ink-soft">
                    <Clock size={12} />
                    Coming soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
