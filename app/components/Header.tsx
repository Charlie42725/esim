"use client";

import Link from "next/link";
import { Wifi } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border-default">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Wifi className="w-6 h-6 text-primary" />
          <span className="font-heading font-bold text-lg text-text-primary">
            Roava eSIM
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/install-guide"
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            安裝教學
          </Link>
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </header>
  );
}
