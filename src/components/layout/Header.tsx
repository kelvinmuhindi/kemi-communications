"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-brand-line bg-brand-paper">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.name} logo`}
            width={66}
            height={46}
            className="h-[46px] w-auto"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm uppercase tracking-wide text-brand-ink lg:text-lg">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-brand-orange-deep lg:text-[11px] lg:tracking-[1px]">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-7">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className="group/link relative py-1.5 text-sm font-semibold uppercase tracking-wide text-brand-ink-soft transition-colors hover:text-brand-orange-deep lg:text-base"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-orange transition-all duration-200 group-hover/link:w-full" />
                </Link>
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
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-sm font-semibold uppercase tracking-wide text-brand-ink-soft"
                >
                  {link.label}
                </Link>
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
