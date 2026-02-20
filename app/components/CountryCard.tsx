import Link from "next/link";
import type { Country } from "@/lib/data";
import FlagImage from "./FlagImage";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/country/${country.slug}`}
      className="group block bg-surface rounded-2xl p-4 border border-border-default hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="mb-2">
        <FlagImage code={country.flag} name={country.name} size={40} />
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
