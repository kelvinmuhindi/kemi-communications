import {
  Clock,
  Truck,
  MapPinned,
  Headset,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeFeatures } from "@/lib/content";

const icons: LucideIcon[] = [Clock, Truck, MapPinned, Headset];

export function WhyChooseUs() {
  return (
    <section className="px-6 py-[90px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 max-w-[620px]">
          <Eyebrow>Why Choose Us</Eyebrow>
          <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-4xl lg:text-[42px]">
            Built on reliability, driven by trade
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeFeatures.map((feature, i) => {
            const Icon = icons[i];
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-brand-line p-7 transition-colors hover:border-brand-orange"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-paper-warm">
                  <Icon size={22} className="text-brand-orange-deep" />
                </div>
                <h3 className="mb-2 text-[15.5px] font-semibold text-brand-ink lg:text-[17px]">
                  {feature.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-brand-steel lg:text-[15px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
