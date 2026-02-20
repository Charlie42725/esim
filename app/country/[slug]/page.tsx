import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCountries, getCountryBySlugFromApi } from "@/lib/api";
import FlagImage from "@/app/components/FlagImage";
import PlanSelector from "@/app/components/PlanSelector";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LineFloatingBtn from "@/app/components/LineFloatingBtn";

export const revalidate = 300;

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map((c) => ({ slug: c.slug }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = await getCountryBySlugFromApi(slug);
  if (!country) notFound();

  return (
    <>
      <Header />
      <LineFloatingBtn />

      <main className="pt-14">
        {/* Back nav */}
        <div className="px-4 py-3 bg-surface border-b border-border-default">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首頁
            </Link>
          </div>
        </div>

        {/* Country header */}
        <section className="px-4 py-8 bg-gradient-to-b from-primary-light to-base">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-3">
              <FlagImage code={country.flag} name={country.name} size={64} />
            </div>
            <h1 className="font-heading font-bold text-[28px] md:text-5xl text-text-primary mb-2">
              {country.name} eSIM
            </h1>
            <p className="text-base text-text-secondary">
              免換卡・即買即用・掃碼安裝
            </p>
          </div>
        </section>

        {/* Plan selector */}
        <section className="px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <PlanSelector plans={country.plans} countrySlug={country.slug} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
