"use client";

import { useState } from "react";
import type { Country } from "@/lib/data";
import { CONTINENT_TABS, type ContinentKey } from "@/lib/continents";
import CountryCard from "./CountryCard";

export default function RegionTabs({ countries }: { countries: Country[] }) {
  const [active, setActive] = useState<ContinentKey>("all");

  const filtered =
    active === "all"
      ? countries
      : countries.filter((c) => c.continent === active);

  return (
    <>
      {/* Pill tabs – horizontally scrollable */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-1 px-1">
        {CONTINENT_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
              active === tab.key
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary border border-border-default hover:border-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
    </>
  );
}
