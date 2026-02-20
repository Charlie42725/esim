import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getCountries, getCountryBySlugFromApi } from "@/lib/api";
import FlagImage from "@/app/components/FlagImage";
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

        {/* Plan cards */}
        <section className="px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-4">
            {country.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-surface rounded-2xl p-5 border-2 transition-all duration-200 ${
                  plan.popular
                    ? "border-cta shadow-md"
                    : "border-border-default"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-4 px-3 py-0.5 bg-cta text-white text-sm font-bold rounded-full">
                    最受歡迎
                  </div>
                )}

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-text-primary">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">
                      {plan.days} 天 | {plan.data}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[28px] text-cta leading-tight">
                      NT${plan.price}
                    </div>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-4">
                  {[
                    `${plan.data} 高速流量`,
                    "當地電信網路",
                    "免換實體 SIM 卡",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/checkout?plan=${plan.id}&country=${country.slug}`}
                  className={`flex items-center justify-center gap-2 w-full h-12 rounded-xl text-base font-bold transition-colors duration-200 cursor-pointer ${
                    plan.popular
                      ? "bg-cta hover:bg-cta-hover text-white"
                      : "bg-primary-light text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  立即購買
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
