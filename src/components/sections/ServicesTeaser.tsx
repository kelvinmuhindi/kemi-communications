import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeServiceTeasers } from "@/lib/content";

export function ServicesTeaser() {
  return (
    <section className="bg-brand-paper-warm px-6 py-[90px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <Eyebrow>End-to-End Logistics</Eyebrow>
            <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-4xl">
              What we do
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-ink-soft hover:text-brand-orange-deep"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-brand-line bg-brand-line sm:grid-cols-3">
          {homeServiceTeasers.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-brand-paper p-8 transition-colors hover:bg-white"
            >
              <h3 className="mb-2.5 text-[17px] font-semibold text-brand-ink">
                {service.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-brand-steel">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange-deep">
                Learn more
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
