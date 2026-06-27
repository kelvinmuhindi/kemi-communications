import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="bg-brand-ink px-6 py-[90px] text-center text-white">
      <h2 className="font-display text-[28px] sm:text-[34px] lg:text-[40px]">
        Ready to move your cargo?
      </h2>
      <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#C9C5C0] lg:max-w-[540px] lg:text-[17px]">
        Tell us your route, cargo type and timeline. Our team responds
        fast with a quote.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3.5">
        <Button href="/get-a-quote" variant="primary">
          Get a Quote
        </Button>
        <Button
          href={`https://wa.me/${siteConfig.whatsapp}`}
          variant="outline-light"
        >
          Chat on WhatsApp
        </Button>
      </div>
    </section>
  );
}
