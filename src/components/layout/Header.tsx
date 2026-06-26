"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50 border-b border-brand-line bg-brand-paper">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt={`${siteConfig.name} logo`}
            width={46}
            height={46}
            className="h-[46px] w-auto"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm tracking-wide text-brand-ink">
              KEMI COMMUNICATIONS
            </span>
            <span className="mt-0.5 text-[11px] font-bold uppercase tracking-[1.5px] text-brand-orange-deep">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-7">
            {navLinks.map((link) => (
              <li key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 py-1.5 text-sm font-semibold text-brand-ink-soft transition-colors hover:text-brand-orange-deep"
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-orange transition-all duration-200 group-hover:w-full" />
                </Link>

                {link.children && (
                  <div className="invisible absolute left-0 top-full z-20 w-60 translate-y-1 rounded-md border border-brand-line bg-brand-paper p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-sm px-3 py-2.5 text-[13.5px] font-medium text-brand-ink-soft hover:bg-brand-paper-warm hover:text-brand-orange-deep"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3.5 lg:flex">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-brand-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
          >
            WhatsApp Us
          </a>
          <Button href="/get-a-quote" variant="primary">
            Get a Quote
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-brand-line bg-brand-paper px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm font-semibold text-brand-ink-soft"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <button
                      aria-label={`Toggle ${link.label} submenu`}
                      onClick={() =>
                        setMobileSubOpen(
                          mobileSubOpen === link.label ? null : link.label
                        )
                      }
                      className="p-2.5"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileSubOpen === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {link.children && mobileSubOpen === link.label && (
                  <div className="ml-3 flex flex-col border-l border-brand-line pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="py-2 text-[13.5px] text-brand-steel"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-brand-ink px-5 py-2.5 text-center text-sm font-bold text-white"
            >
              WhatsApp Us
            </a>
            <Button href="/get-a-quote" variant="primary" className="justify-center">
              Get a Quote
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
