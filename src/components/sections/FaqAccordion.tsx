"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/content";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="mx-auto max-w-[820px]">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="border-b border-brand-line first:border-t"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-[15px] font-semibold text-brand-ink lg:text-[16.5px]">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 text-brand-orange-deep transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-200 ${
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-brand-steel lg:text-[15px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
