import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { services } from "@/lib/content";

export function Services({ showAnchors = false }: { showAnchors?: boolean }) {
  return (
    <section id="services" className="px-6 py-[90px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 max-w-[620px]">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-4xl">
            Freight &amp; logistics services built for African trade
          </h2>
          <p className="mt-3.5 text-[15.5px] leading-relaxed text-brand-steel">
            Whether you&apos;re moving raw materials between factories or
            stock between warehouses, our services are designed around
            reliability, safety and speed.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.number}
              id={showAnchors ? service.id : undefined}
              className="group rounded-lg border border-brand-line p-8 transition-all duration-200 hover:border-brand-orange hover:shadow-xl"
            >
              <div className="mb-4.5 font-display text-[13px] tracking-wide text-brand-orange">
                SERVICE — {service.number}
              </div>
              <h3 className="mb-2.5 text-[19px] font-semibold text-brand-ink">
                {service.title}
              </h3>
              <p className="mb-4.5 text-sm leading-relaxed text-brand-steel">
                {service.description}
              </p>
              <a
                href="/get-a-quote"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-ink"
              >
                Request a quote
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
