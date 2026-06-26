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
    <footer className="bg-[#100F0E] px-6 pb-7 pt-[60px] text-[#A9A5A0]">
      <div className="mx-auto grid max-w-[1240px] gap-10 border-b border-[#2A2826] pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo.jpeg"
            alt={`${siteConfig.name} logo`}
            width={140}
            height={40}
            className="mb-4 h-10 w-auto rounded bg-white p-1"
          />
          <p className="max-w-[260px] text-[13px] leading-relaxed">
            Reliable road freight and logistics across Kenya and
            cross-border Africa. On time, every time.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-[13px] uppercase tracking-wide text-white">
            Company
          </h4>
          <ul className="space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.href} className="text-[13.5px]">
                <a href={link.href} className="hover:text-brand-orange">
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
          <ul className="space-y-2.5 text-[13.5px]">
            <li>{siteConfig.address}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[13px] uppercase tracking-wide text-white">
            Hours
          </h4>
          <ul className="space-y-2.5 text-[13.5px]">
            {siteConfig.hours.map((h) => (
              <li key={h.label}>
                {h.label}: {h.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-2.5 pt-6 text-[12.5px]">
        <span>
          © {new Date().getFullYear()} {siteConfig.legalName}. All rights
          reserved.
        </span>
        <span>
          Reg. No. {siteConfig.regNumber} — Nairobi, Kenya
        </span>
      </div>
    </footer>
  );
}
