import { Button } from "@/components/ui/Button";
import { heroStats } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-ink">
      {/* Decorative route-line background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, #FF9700 0px, #FF9700 2px, transparent 2px, transparent 60px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-6 pb-24 pt-28 sm:pt-32">
        <div className="mb-4 inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[2px] text-brand-orange">
          <span className="h-0.5 w-6 bg-brand-orange" />
          Road Freight &amp; Logistics in Kenya &amp; Cross-Border Africa
        </div>

        <h1 className="max-w-[820px] font-display text-[40px] leading-[1.08] text-white sm:text-[62px] lg:text-[72px]">
          Powering Trade,
          <br />
          Delivered <span className="text-brand-orange">On Time.</span>
        </h1>

        <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-[#C9C5C0] lg:max-w-[620px] lg:text-[19px]">
          Kemi Communication delivers reliable road transport and
          logistics for manufacturers, stockists, wholesalers and
          retailers, from Nairobi to every corner of the region and
          across African borders.
        </p>

        <div className="mt-9 flex flex-wrap gap-3.5">
          <Button href="/get-a-quote" variant="primary">
            Get a Quote
          </Button>
          <Button href="/services" variant="outline-light">
            Our Services
          </Button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="font-display text-3xl text-brand-orange sm:text-[34px] lg:text-[38px]">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-[#A9A5A0]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
