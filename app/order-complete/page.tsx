"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ArrowRight, Download, MessageCircle } from "lucide-react";
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

          {/* QR Code card */}
          <div className="bg-surface rounded-2xl p-6 border border-border-default shadow-sm text-center mb-6">
            {/* Placeholder QR Code */}
            <div className="w-[200px] h-[200px] mx-auto mb-4 bg-[#0F172A] rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-5 gap-1 p-4">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-sm ${
                      [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24].includes(i)
                        ? "bg-white"
                        : "bg-[#0F172A]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {plan && country && (
              <>
                <h2 className="font-heading font-semibold text-lg text-text-primary mb-1">
                  {country.name} {plan.days}天 {plan.data} eSIM
                </h2>
                <p className="text-sm text-text-muted">
                  訂單編號: #{orderId}
                </p>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-3 mb-8">
            <Link
              href="/install-guide"
              className="flex items-center justify-center gap-2 w-full h-14 bg-cta hover:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
            >
              查看安裝教學
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full h-12 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              下載 QR Code 圖片
            </button>
          </div>

          {/* Email confirmation */}
          {email && (
            <div className="bg-primary-light rounded-xl p-4 text-center mb-8">
              <p className="text-sm text-text-secondary">
                QR Code 已寄送至
              </p>
              <p className="text-base font-semibold text-text-primary mt-0.5">
                {decodeURIComponent(email)}
              </p>
            </div>
          )}

          {/* Next steps */}
          <div className="mb-8">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              接下來怎麼做？
            </h3>
            <ol className="space-y-3">
              {[
                "到手機「設定」>「行動網路」",
                "選擇「新增 eSIM」",
                "掃描上方 QR Code",
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
