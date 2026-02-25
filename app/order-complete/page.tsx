"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
import type { Country } from "@/lib/data";

export default function OrderCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-base">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <OrderCompleteContent />
    </Suspense>
  );
}

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "";
  const countrySlug = searchParams.get("country") || "";
  const email = searchParams.get("email") || "";
  const orderIdParam = searchParams.get("orderId") || "";

  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          const found = (res.data as Country[]).find((c) => c.slug === countrySlug);
          setCountry(found || null);
        }
      });
  }, [countrySlug]);

  const plan = country?.plans.find((p) => p.id === planId);

  const orderId = orderIdParam || `ES${Date.now().toString().slice(-10)}`;

  return (
    <>
      <Header />

      <main className="pt-14 pb-12 min-h-screen bg-base">
        <div className="max-w-lg mx-auto px-4 py-8">
          {/* Success icon */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mb-4 animate-[scale-in_0.3s_ease-out]">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h1 className="font-heading font-bold text-[28px] text-primary-dark">
              購買成功！
            </h1>
          </div>

          {/* Order info card */}
          <div className="bg-surface rounded-2xl p-6 border border-border-default shadow-sm text-center mb-6">
            {plan && country && (
              <>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-1">
                  {country.name} {plan.days}天 {plan.data}
                  {plan.variant && plan.variant !== "standard" && ` ${plan.variantLabel}`} eSIM
                </h2>
                <p className="text-sm text-text-muted">
                  訂單編號: #{orderId}
                </p>
              </>
            )}
          </div>

          {/* Email confirmation — QR Code 由途鸽寄送 */}
          <div className="bg-primary-light rounded-xl p-5 text-center mb-6">
            <p className="text-lg font-semibold text-text-primary mb-1">
              QR Code 已寄送到您的 Email 信箱
            </p>
            {email && (
              <p className="text-base text-text-secondary">
                {decodeURIComponent(email)}
              </p>
            )}
            <p className="text-sm text-text-muted mt-2">
              請查收信件（含垃圾郵件匣），依照信中指示掃描 QR Code 安裝 eSIM。
            </p>
          </div>

          {/* Action button */}
          <div className="space-y-3 mb-8">
            <Link
              href="/install-guide"
              className="flex items-center justify-center gap-2 w-full h-14 bg-cta hover:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
            >
              查看安裝教學
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Next steps */}
          <div className="mb-8">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              接下來怎麼做？
            </h3>
            <ol className="space-y-3">
              {[
                "到手機「設定」>「行動網路」",
                "選擇「新增 eSIM」",
                "掃描 Email 中的 QR Code",
                "到達目的地後開啟 eSIM 線路",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-base text-text-secondary pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Support */}
          <div className="border-t border-border-default pt-6 text-center">
            <p className="text-base text-text-secondary mb-3">有問題？</p>
            <a
              href="https://line.me/ti/p/@roavaesim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-12 bg-line-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              LINE 聯繫客服
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
