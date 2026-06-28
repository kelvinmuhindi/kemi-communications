import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { coverageRoute, coverageStats } from "@/lib/content";

export function Coverage() {
  return (
    <section id="coverage" className="bg-brand-ink px-6 py-[90px] text-white">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 max-w-[620px] lg:max-w-[700px]">
          <Eyebrow light>Where we operate</Eyebrow>
          <h2 className="font-display text-[28px] leading-tight sm:text-4xl lg:text-[42px]">
            Connecting Kenya&apos;s key trade routes
          </h2>
          <p className="mt-3.5 text-[15.5px] leading-relaxed text-[#C9C5C0] lg:text-[17px]">
            Our most-travelled corridors today, with cross-border lanes
            opening as we grow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-y-2">
          {coverageRoute.map((city, i) => (
            <div key={city} className="flex items-center">
              <span className="font-display text-base uppercase tracking-wide py-2.5 lg:text-lg">
                {city}
              </span>
              {i < coverageRoute.length - 1 && (
                <ArrowRight
                  size={18}
                  className="mx-3 text-brand-orange sm:mx-4.5"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-12 border-t border-white/10 pt-7">
          {coverageStats.map((stat) => (
            <div key={stat.label}>
              <p className="mb-1 font-display text-xl text-brand-orange lg:text-2xl">
                {stat.value}
              </p>
              <p className="text-[12.5px] text-[#A9A5A0] lg:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
