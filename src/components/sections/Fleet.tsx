import { Eyebrow } from "@/components/ui/Eyebrow";
import { fleet } from "@/lib/content";

const fleetVisuals = [
  // 1-tonne pickup
  <svg key="pickup" width="120" height="70" viewBox="0 0 120 70" aria-hidden="true">
    <rect x="6" y="18" width="60" height="34" rx="3" fill="#FF9700" />
    <path d="M66 18 L66 52 L108 52 L108 34 L90 34 L80 18 Z" fill="#181614" />
    <circle cx="28" cy="56" r="9" fill="#181614" />
    <circle cx="92" cy="56" r="9" fill="#181614" />
  </svg>,
  // 3-5 tonne truck
  <svg key="midsize" width="140" height="70" viewBox="0 0 140 70" aria-hidden="true">
    <rect x="6" y="14" width="80" height="38" rx="3" fill="#FF9700" />
    <path d="M86 14 L86 52 L128 52 L128 32 L108 32 L98 14 Z" fill="#181614" />
    <circle cx="30" cy="56" r="9" fill="#181614" />
    <circle cx="112" cy="56" r="9" fill="#181614" />
  </svg>,
  // 7-tonne truck
  <svg key="heavy" width="160" height="70" viewBox="0 0 160 70" aria-hidden="true">
    <rect x="4" y="10" width="100" height="42" rx="3" fill="#FF9700" />
    <path d="M104 10 L104 52 L150 52 L150 30 L128 30 L116 10 Z" fill="#181614" />
    <circle cx="28" cy="56" r="9" fill="#181614" />
    <circle cx="132" cy="56" r="9" fill="#181614" />
  </svg>,
  // 10-tonne truck
  <svg key="extra-heavy" width="180" height="70" viewBox="0 0 180 70" aria-hidden="true">
    <rect x="4" y="8" width="118" height="44" rx="3" fill="#FF9700" />
    <path d="M122 8 L122 52 L170 52 L170 28 L146 28 L134 8 Z" fill="#181614" />
    <circle cx="28" cy="56" r="9" fill="#181614" />
    <circle cx="50" cy="56" r="9" fill="#181614" />
    <circle cx="150" cy="56" r="9" fill="#181614" />
  </svg>,
];

export function Fleet() {
  return (
    <section id="fleet" className="bg-brand-paper-warm px-6 py-[90px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 max-w-[620px] lg:max-w-[700px]">
          <Eyebrow>Our fleet</Eyebrow>
          <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-4xl lg:text-[42px]">
            The right truck for every cargo, every time
          </h2>
          <p className="mt-3.5 text-[15.5px] leading-relaxed text-brand-steel lg:text-[17px]">
            From 1-tonne pickups to 10-tonne trucks, our fleet is maintained
            to NTSA standards and ready for dispatch.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((vehicle, i) => (
            <div
              key={vehicle.name}
              className="overflow-hidden rounded-lg border border-brand-line"
            >
              <div className="flex h-[170px] items-center justify-center border-b border-brand-line bg-gradient-to-br from-brand-paper-warm to-white">
                {fleetVisuals[i]}
              </div>
              <div className="p-5.5">
                <h3 className="mb-1.5 text-base font-semibold text-brand-ink lg:text-xl">
                  {vehicle.name}
                </h3>
                <p className="text-[13px] text-brand-steel lg:text-[14.5px]">
                  {vehicle.description}
                </p>
                <span className="mt-3 inline-block rounded-full border border-brand-line bg-brand-paper-warm px-2.5 py-1 text-[11.5px] font-bold text-brand-ink-soft">
                  {vehicle.capacity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
