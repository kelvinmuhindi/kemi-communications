import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { siteConfig } from "@/lib/content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Quote",
  description:
    "Request a road freight quote from Kemi Communication Ltd. Tell us your route, cargo type and timeline and we will respond within one business day.",
  path: "/get-a-quote",
});

export default function GetAQuotePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Get a Quote"
          title="Tell us your route, we'll handle the rest"
          description="Fill in the details below and our team will respond with a quote, usually within one business day."
        />

        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[760px]">
            <div className="rounded-lg border border-brand-line bg-brand-paper-warm p-8 sm:p-10">
              <QuoteForm />
            </div>

            <p className="mt-6 text-center text-sm text-brand-steel">
              Prefer to talk it through?{" "}
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-orange-deep hover:underline"
              >
                Chat with us on WhatsApp
              </a>{" "}
              instead.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
