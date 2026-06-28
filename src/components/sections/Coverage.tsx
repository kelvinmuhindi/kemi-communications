import { Eyebrow } from "@/components/ui/Eyebrow";
import { KenyaMap } from "@/components/sections/KenyaMap";
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

        <div className="flex flex-wrap gap-12 border-b border-white/10 pb-10">
          {coverageStats.map((stat) => (
            <div key={stat.label}>
              <p className="mb-1 font-display text-xl text-brand-orange lg:text-2xl">
                {stat.value}
              </p>
              <p className="text-[12.5px] text-[#A9A5A0] lg:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="pt-10">
          <KenyaMap cities={coverageRoute} />
        </div>
      </div>
    </section>
  );
}
