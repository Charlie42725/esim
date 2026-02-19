import Link from "next/link";
import type { Country } from "@/lib/data";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className="group block bg-surface rounded-2xl p-4 border border-border-default hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="text-4xl mb-2" role="img" aria-label={`${country.name}國旗`}>
        {country.flag}
      </div>
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
        {country.name}
      </h3>
      <div>
        <span className="font-bold text-[28px] text-cta leading-tight">
          NT${country.startingPrice}
        </span>
        <span className="text-sm text-text-secondary ml-1">起</span>
      </div>
    </Link>
  );
}
