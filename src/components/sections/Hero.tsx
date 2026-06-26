import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TruckIllustration } from "@/components/sections/TruckIllustration";
import { heroStats } from "@/lib/content";

export function Hero() {
  return (
    <section className="bg-brand-paper px-6 pt-[86px]">
      <div className="mx-auto grid max-w-[1240px] gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div>
          <Eyebrow>Road freight &amp; logistics — Kenya &amp; cross-border Africa</Eyebrow>
          <h1 className="font-display text-[38px] leading-[1.05] tracking-tight text-brand-ink sm:text-[54px]">
            Your cargo,
            <br />
            moving <span className="text-brand-orange">on time.</span>
          </h1>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-brand-steel">
            Kemi Communications delivers reliable road transport and
            logistics for manufacturers, stockists, wholesalers and
            retailers — from Nairobi to every corner of the region, and
            across African borders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="/get-a-quote" variant="primary">
              Request a Quote
            </Button>
            <Button href="/services" variant="ghost">
              Explore Services
            </Button>
          </div>

          <div className="mt-12 flex gap-9 border-t border-brand-line pt-7">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-brand-ink sm:text-[28px]">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-wide text-brand-steel">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <TruckIllustration />
      </div>

      <div className="route-rule" />
    </section>
  );
}
