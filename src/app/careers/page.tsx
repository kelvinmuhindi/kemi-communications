import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { CareerApplicationForm } from "@/components/sections/CareerApplicationForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { careersContent, siteConfig } from "@/lib/content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Work with us at Kemi Communication Ltd. Apply for driver, dispatch, logistics and support roles across our growing road freight business.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Careers"
          title="Work With Us"
          description={careersContent.intro}
        />

        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 max-w-[620px]">
              <Eyebrow>Why Join Us</Eyebrow>
              <h2 className="font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
                Build your career with a growing team
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {careersContent.whyJoinUs.map((item) => (
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

        <section className="bg-brand-paper-warm px-6 py-[90px]">
          <div className="mx-auto max-w-[760px]">
            <div className="mb-10 text-center">
              <Eyebrow>Apply Now</Eyebrow>
              <h2 className="font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
                Send us your application
              </h2>
              <p className="mt-3.5 text-[15px] leading-relaxed text-brand-steel lg:text-[16px]">
                Fill in your details below and attach your CV. We review
                every application and will reach out if there&apos;s a
                fit for an open or upcoming role.
              </p>
            </div>

            <div className="rounded-lg border border-brand-line bg-white p-8 sm:p-10">
              <CareerApplicationForm />
            </div>

            <p className="mt-6 text-center text-sm text-brand-steel">
              Prefer to reach us directly?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-brand-orange-deep hover:underline"
              >
                Email us
              </a>{" "}
              or{" "}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-orange-deep hover:underline"
              >
                chat on WhatsApp
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
