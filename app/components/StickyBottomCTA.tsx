"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-border-default shadow-lg md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="px-4 py-2 flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="text-text-secondary">最低 </span>
          <span className="text-cta font-bold text-lg">NT$89</span>
          <span className="text-text-secondary"> 起</span>
        </div>
        <Link
          href="#search"
          className="flex-shrink-0 flex items-center justify-center gap-1 h-12 px-6 bg-cta hover:bg-cta-hover active:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
        >
          立即選購
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
