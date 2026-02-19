"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-0">
      {faqItems.map((item, i) => (
        <div key={i} className="border-b border-border-default">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between py-4 min-h-[56px] text-left cursor-pointer"
            aria-expanded={openIndex === i}
          >
            <span className="font-heading font-semibold text-base text-text-primary pr-4">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === i ? "max-h-60 pb-4" : "max-h-0"
            }`}
          >
            <p className="text-base text-text-secondary leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
