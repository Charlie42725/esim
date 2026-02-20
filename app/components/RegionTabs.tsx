"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Country } from "@/lib/data";
import { CONTINENT_TABS, type ContinentKey } from "@/lib/continents";
import CountryCard from "./CountryCard";

export default function RegionTabs({ countries }: { countries: Country[] }) {
  const [active, setActive] = useState<ContinentKey>("asia");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // When user types in search, show results across all regions
  const isSearching = query.trim().length > 0;

  const filtered = isSearching
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase())
      )
    : active === "all"
      ? countries
      : countries.filter((c) => c.continent === active);

  // Focus the search input when navigating from hero
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#search" && inputRef.current) {
        inputRef.current.focus();
        history.replaceState(null, "", window.location.pathname);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋國家名稱..."
          className="w-full h-12 pl-11 pr-10 bg-surface rounded-xl border border-border-default focus:border-primary focus:outline-none text-base text-text-primary placeholder:text-text-muted transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Pill tabs – horizontally scrollable, hidden when searching */}
      {!isSearching && (
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
      )}

      {/* Search result hint */}
      {isSearching && (
        <p className="text-sm text-text-secondary mb-4">
          找到 {filtered.length} 個結果
        </p>
      )}

      {/* Country grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((country) => (
            <CountryCard key={country.slug} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-text-muted">
          <p className="text-lg mb-1">找不到符合的國家</p>
          <p className="text-sm">試試其他關鍵字或切換區域</p>
        </div>
      )}
    </>
  );
}
