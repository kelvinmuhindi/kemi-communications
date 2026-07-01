import { Truck, Banknote, ShieldCheck, PhoneCall } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PartnerForm } from "@/components/sections/PartnerForm";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Become a Partner",
  description:
    "Partner with Kemi Communication Ltd by registering your vehicle for our logistics operations. Earn consistent income on every completed delivery.",
  path: "/become-a-partner",
});

const benefits = [
  {
    icon: Banknote,
    title: "Consistent Income",
    description:
      "Get paid per trip on routes we assign. No chasing clients. We bring the freight to you.",
  },
  {
    icon: Truck,
    title: "Keep Your Vehicle Working",
    description:
      "Idle trucks cost money. We keep your fleet moving with regular assignments across Kenya and cross border routes.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Cargo Only",
    description:
      "All loads we assign are verified and properly documented. Your vehicle carries legitimate, insured freight every time.",
  },
  {
    icon: PhoneCall,
    title: "Direct Communication",
    description:
      "Our dispatch team coordinates with you directly. Clear trip briefs, loading times and delivery contacts before every run.",
  },
];

const steps = [
  {
    number: "01",
    title: "Submit Your Application",
    description:
      "Fill in the form below with your details, vehicle information and the routes you can cover.",
  },
  {
    number: "02",
    title: "We Review and Call You",
    description:
      "Our team reviews your application and contacts you within 2 business days to discuss terms and onboard your vehicle.",
  },
  {
    number: "03",
    title: "Get Assigned Trips",
    description:
      "Once onboarded, we start matching your vehicle to available loads on routes that suit your availability.",
  },
  {
    number: "04",
    title: "Complete Deliveries and Get Paid",
    description:
      "Deliver on time, confirm with our dispatch and receive your payment on the agreed schedule.",
  },
];

export default function BecomeAPartnerPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Become a Partner"
          title="Put your vehicle to work with us"
          description="Own a truck or a small fleet? Partner with Kemi Communication and earn consistent income by carrying freight on our routes across Kenya and East Africa."
        />

        {/* Benefits */}
        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-14 max-w-[580px]">
              <Eyebrow>Why Partner With Us</Eyebrow>
              <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-4xl lg:text-[42px]">
                A partnership that works for both of us
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-brand-steel lg:text-[17px]">
                We handle the clients, the paperwork and the route planning.
                You provide the vehicle. Together we deliver.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div key={b.title} className="flex flex-col gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-paper-warm">
                    <b.icon size={22} className="text-brand-orange-deep" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-brand-ink lg:text-[17px]">
                    {b.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-brand-steel lg:text-[15px]">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-brand-paper-warm px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-14 text-center">
              <Eyebrow>How It Works</Eyebrow>
              <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-4xl lg:text-[42px]">
                Four steps from application to first trip
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.number} className="relative flex flex-col gap-3">
                  <span className="font-display text-[48px] font-bold leading-none text-brand-orange/20">
                    {s.number}
                  </span>
                  <h3 className="text-[16px] font-semibold text-brand-ink lg:text-[17px]">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-brand-steel lg:text-[15px]">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <Eyebrow>Apply Now</Eyebrow>
                <h2 className="mb-4 font-display text-[28px] leading-tight text-brand-ink sm:text-4xl lg:text-[38px]">
                  Register your vehicle
                </h2>
                <p className="mb-8 text-[15.5px] leading-relaxed text-brand-steel lg:text-[17px]">
                  Fill in the form and our team will be in touch within 2
                  business days. We welcome owner operators and fleet owners
                  with trucks of any size.
                </p>

                <div className="space-y-4 rounded-lg border border-brand-line bg-brand-paper-warm p-6 text-[14px] leading-relaxed text-brand-steel">
                  <p className="font-semibold text-brand-ink">
                    What to have ready:
                  </p>
                  <ul className="list-inside list-disc space-y-1.5">
                    <li>Vehicle make, model and plate number(s)</li>
                    <li>Current logbook (we may request a copy later)</li>
                    <li>Valid driving licence (for owner operators)</li>
                    <li>Routes or regions you are available to cover</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-brand-line bg-brand-paper-warm p-8">
                <PartnerForm />
              </div>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
