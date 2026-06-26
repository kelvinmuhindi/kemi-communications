import Image from "next/image";
import { siteConfig } from "@/lib/content";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Media", href: "/media" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
  { label: "Get a Quote", href: "/get-a-quote" },
];

export function Footer() {
  return (
    <footer className="bg-[#100F0E] px-6 pb-7 pt-12 text-[#A9A5A0] sm:pt-[60px]">
      <div className="mx-auto grid max-w-[1240px] gap-9 border-b border-[#2A2826] pb-9 sm:grid-cols-2 sm:gap-10 sm:pb-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo.jpeg"
            alt={`${siteConfig.name} logo`}
            width={140}
            height={40}
            className="mb-4 h-10 w-auto rounded bg-white p-1"
          />
          <p className="max-w-[280px] text-[13px] leading-relaxed">
            Reliable road freight and logistics across Kenya and
            cross-border Africa. On time, every time.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-[13px] uppercase tracking-wide text-white">
            Company
          </h4>
          <ul className="space-y-3 sm:space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.href} className="text-[13.5px]">
                <a
                  href={link.href}
                  className="inline-block py-0.5 hover:text-brand-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[13px] uppercase tracking-wide text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-[13.5px] sm:space-y-2.5">
            <li className="leading-relaxed break-words">
              {siteConfig.address}
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="inline-block py-0.5 hover:text-brand-orange"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="break-all">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-block py-0.5 hover:text-brand-orange"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[13px] uppercase tracking-wide text-white">
            Hours
          </h4>
          <ul className="space-y-3 text-[13.5px] sm:space-y-2.5">
            {siteConfig.hours.map((h) => (
              <li key={h.label} className="leading-relaxed">
                <span className="text-white">{h.label}:</span> {h.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-col gap-2 pt-6 text-center text-[12px] sm:flex-row sm:flex-wrap sm:justify-between sm:text-left sm:text-[12.5px]">
        <span>
          © {new Date().getFullYear()} {siteConfig.legalName}. All rights
          reserved.
        </span>
        <span>Reg. No. {siteConfig.regNumber} — Nairobi, Kenya</span>
      </div>
    </footer>
  );
}
