import { Search, Star, ArrowRight, Zap, Globe, Headphones, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Header from "./components/Header";
import CountryCard from "./components/CountryCard";
import StepFlow from "./components/StepFlow";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import StickyBottomCTA from "./components/StickyBottomCTA";
import LineFloatingBtn from "./components/LineFloatingBtn";
import { countries } from "@/lib/data";

const features = [
  {
    icon: Zap,
    title: "免換 SIM 卡",
    desc: "保留原號碼，不需要拆卡換卡",
  },
  {
    icon: Globe,
    title: "即買即用",
    desc: "下單後 3 分鐘內即可啟用上網",
  },
  {
    icon: ShieldCheck,
    title: "穩定網路",
    desc: "使用當地電信商網路，訊號穩定",
  },
  {
    icon: Headphones,
    title: "中文客服",
    desc: "LINE 即時回覆，隨時為你解答",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <StickyBottomCTA />
      <LineFloatingBtn />

      <main>
        {/* ===== Section 1: Hero ===== */}
        <section className="pt-20 pb-12 px-4 bg-gradient-to-b from-primary-light to-base">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="font-heading font-bold text-[28px] md:text-5xl text-primary-dark leading-tight mb-3">
              出國上網
              <br className="md:hidden" />
              3 分鐘搞定
            </h1>
            <p className="text-base md:text-lg text-text-secondary mb-6 max-w-md mx-auto">
              免換卡・掃碼即用・日韓東南亞超過 50 國
            </p>

            {/* Search box CTA */}
            <Link
              href="#countries"
              className="group flex items-center gap-3 w-full max-w-md mx-auto h-14 px-4 bg-surface rounded-xl border border-border-default hover:border-primary shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Search className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              <span className="text-base text-text-muted">
                你要去哪個國家？
              </span>
            </Link>

            {/* Trust signal */}
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-secondary">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= 4 ? "fill-cta text-cta" : "fill-cta/50 text-cta/50"}`}
                  />
                ))}
              </div>
              <span>4.9</span>
              <span className="text-text-muted">|</span>
              <span>10,000+ 旅客使用</span>
            </div>
          </div>
        </section>

        {/* ===== Section 2: Popular Countries ===== */}
        <section id="countries" className="py-12 px-4 scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading font-semibold text-[22px] md:text-4xl text-text-primary text-center mb-8">
              熱門目的地
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {countries.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 3: Why Us ===== */}
        <section className="py-12 px-4 bg-surface">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading font-semibold text-[22px] md:text-4xl text-text-primary text-center mb-8">
              為什麼旅客都選我們？
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-base rounded-2xl p-4 md:p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light mb-3">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-base md:text-lg text-text-primary mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 4: 3 Steps ===== */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading font-semibold text-[22px] md:text-4xl text-text-primary text-center mb-10">
              只要 3 步驟
            </h2>
            <StepFlow />
            <div className="mt-10 flex justify-center">
              <Link
                href="#countries"
                className="flex items-center justify-center gap-2 w-full max-w-sm h-14 bg-cta hover:bg-cta-hover active:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
              >
                立即選購 eSIM
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== Section 5: Install Guide CTA ===== */}
        <section className="py-12 px-4 bg-primary-light">
          <div className="max-w-6xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
            <h2 className="font-heading font-semibold text-[22px] md:text-4xl text-text-primary mb-2">
              不會安裝？看這篇就懂
            </h2>
            <p className="text-base text-text-secondary mb-6">
              圖文教學帶你一步步完成，iPhone / Android 都支援
            </p>
            <Link
              href="/install-guide"
              className="inline-flex items-center justify-center gap-2 w-full max-w-sm h-12 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              查看安裝教學
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* ===== Section 6: FAQ ===== */}
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading font-semibold text-[22px] md:text-4xl text-text-primary text-center mb-8">
              常見問題
            </h2>
            <FAQ />
          </div>
        </section>

        {/* ===== Section 7: Final CTA ===== */}
        <section className="py-16 px-4 bg-gradient-to-b from-primary-light to-base">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-heading font-semibold text-[22px] md:text-4xl text-text-primary mb-3">
              準備好出發了嗎？
            </h2>
            <p className="text-base text-text-secondary mb-8">
              選好國家，3 分鐘搞定上網
            </p>
            <Link
              href="#countries"
              className="inline-flex items-center justify-center gap-2 w-full max-w-sm h-14 bg-cta hover:bg-cta-hover active:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
            >
              立即選購 eSIM
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-text-secondary">
              有問題？
              <a
                href="https://line.me/ti/p/@roavaesim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline ml-1 cursor-pointer"
              >
                LINE 我們
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
