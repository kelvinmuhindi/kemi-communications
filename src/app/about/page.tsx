import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { aboutContent } from "@/lib/content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Kemi Communication Ltd, including our story, mission, vision and why clients trust us for road freight and logistics across Kenya.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="About Kemi Communication"
          title="Built on reliability and driven by trade"
          description={aboutContent.intro}
        />

        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>Our Story</Eyebrow>
                <h2 className="font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
                  Why we do what we do
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-brand-steel lg:text-[17px]">
                  {aboutContent.story}
                </p>
              </div>

              <div id="vision" className="grid gap-6">
                <div className="rounded-lg border border-brand-line p-7">
                  <h3 className="mb-2 font-display text-lg text-brand-orange-deep lg:text-xl">
                    Our Mission
                  </h3>
                  <p className="text-[15px] leading-relaxed text-brand-steel lg:text-[16px]">
                    {aboutContent.mission}
                  </p>
                </div>
                <div className="rounded-lg border border-brand-line p-7">
                  <h3 className="mb-2 font-display text-lg text-brand-orange-deep lg:text-xl">
                    Our Vision
                  </h3>
                  <p className="text-[15px] leading-relaxed text-brand-steel lg:text-[16px]">
                    {aboutContent.vision}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-paper-warm px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <Eyebrow>What Drives Us</Eyebrow>
            <h2 className="mb-10 font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
              Our core values
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {aboutContent.values.map((value) => (
                <div
                  key={value}
                  className="flex items-start gap-3 rounded-md border border-brand-line bg-brand-paper p-5"
                >
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-orange" />
                  <p className="text-[14.5px] text-brand-ink-soft lg:text-[15.5px]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 max-w-[620px]">
              <Eyebrow>Why Choose Us</Eyebrow>
              <h2 className="font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
                What sets Kemi Communication apart
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutContent.whyUs.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-brand-line p-6 transition-colors hover:border-brand-orange"
                >
                  <h3 className="mb-2 text-[15px] font-semibold text-brand-ink lg:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-brand-steel lg:text-[14.5px]">
                    {item.description}
                  </p>
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
