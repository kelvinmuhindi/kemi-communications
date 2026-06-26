import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/lib/content";

export const metadata = {
  title: "Contact Us | Kemi Communications Ltd",
  description:
    "Get in touch with Kemi Communications Ltd — phone, email, WhatsApp and office address.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Contact Us"
          title="We'd love to hear from you"
          description="Reach out by phone, email or WhatsApp, or visit our office in Utawala, Nairobi."
        />

        <section className="px-6 py-[90px]">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-2xl text-brand-ink">
                Get in touch
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-paper-warm">
                    <Phone size={18} className="text-brand-orange-deep" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-steel">
                      Phone
                    </p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="text-[15px] font-semibold text-brand-ink hover:text-brand-orange-deep"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-paper-warm">
                    <Mail size={18} className="text-brand-orange-deep" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-steel">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-[15px] font-semibold text-brand-ink hover:text-brand-orange-deep"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-paper-warm">
                    <MapPin size={18} className="text-brand-orange-deep" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-steel">
                      Office Address
                    </p>
                    <p className="text-[15px] font-semibold text-brand-ink">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-paper-warm">
                    <Clock size={18} className="text-brand-orange-deep" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-steel">
                      Business Hours
                    </p>
                    <ul className="text-[15px] font-semibold text-brand-ink">
                      {siteConfig.hours.map((h) => (
                        <li key={h.label}>
                          {h.label}: {h.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-brand-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
              >
                Chat with us on WhatsApp
              </a>
            </div>

            <div className="rounded-lg border border-brand-line bg-brand-paper-warm p-8">
              <h2 className="mb-6 font-display text-2xl text-brand-ink">
                Send us a message
              </h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 rounded-sm bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
