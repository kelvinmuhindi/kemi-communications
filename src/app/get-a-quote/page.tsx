import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { cargoTypes, truckOptions, siteConfig } from "@/lib/content";

export const metadata = {
  title: "Get a Quote | Kemi Communications Ltd",
  description:
    "Request a freight quote from Kemi Communications Ltd. Tell us your route, cargo type and timeline.",
};

export default function GetAQuotePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Get a Quote"
          title="Tell us your route — we'll handle the rest"
          description="Fill in the details below and our team will respond with a quote, usually within one business day."
        />

        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[760px]">
            <div className="rounded-lg border border-brand-line bg-brand-paper-warm p-8 sm:p-10">
              <form className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
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
                      htmlFor="company"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                    >
                      Company (optional)
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                      placeholder="+254 7XX XXX XXX"
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
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pickup"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                    >
                      Pickup Location
                    </label>
                    <input
                      id="pickup"
                      name="pickup"
                      type="text"
                      required
                      className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                      placeholder="e.g. Nairobi"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dropoff"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                    >
                      Drop-off Location
                    </label>
                    <input
                      id="dropoff"
                      name="dropoff"
                      type="text"
                      required
                      className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                      placeholder="e.g. Kisumu"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="cargoType"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                    >
                      Cargo Type
                    </label>
                    <select
                      id="cargoType"
                      name="cargoType"
                      required
                      className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select cargo type
                      </option>
                      {cargoTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="truckType"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                    >
                      Preferred Truck Size
                    </label>
                    <select
                      id="truckType"
                      name="truckType"
                      required
                      className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select truck size
                      </option>
                      {truckOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                  >
                    Preferred Pickup Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
                  >
                    Additional Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none"
                    placeholder="Approximate weight, special handling needs, etc."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 rounded-sm bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
                >
                  Request My Quote
                </button>

                <p className="text-xs text-brand-steel">
                  This form is not yet connected to a backend. A developer
                  will need to wire this up to an email service, CRM, or
                  API route before going live.
                </p>
              </form>
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
