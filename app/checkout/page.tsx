"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
import FlagImage from "@/app/components/FlagImage";
import type { Country } from "@/lib/data";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-base">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "";
  const countrySlug = searchParams.get("country") || "";

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          const found = (res.data as Country[]).find((c) => c.slug === countrySlug);
          setCountry(found || null);
        }
      })
      .finally(() => setLoading(false));
  }, [countrySlug]);

  const plan = country?.plans.find((p) => p.id === planId);

  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-screen bg-base">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
        </main>
      </>
    );
  }

  if (!country || !plan) {
    return (
      <>
        <Header />
        <main className="pt-20 px-4 text-center">
          <p className="text-text-secondary text-base py-20">
            找不到此方案，請
            <Link href="/" className="text-primary underline ml-1">
              返回首頁
            </Link>
            重新選擇。
          </p>
        </main>
      </>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("請輸入有效的 Email");
      return;
    }
    if (!agreed) {
      setError("請同意服務條款");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/ecpay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productCode: plan.id,
          productName: `${country.name} ${plan.data} ${plan.days}天${plan.variant !== "standard" ? ` ${plan.variantLabel}` : ""} eSIM`,
          amount: plan.price,
          email,
          countrySlug: country.slug,
        }),
      });

      const result = await res.json();
      if (!result.success) {
        setError(result.error || "建立訂單失敗");
        setSubmitting(false);
        return;
      }

      // Auto-submit form to ECPay
      const { action, fields } = result.data;
      const form = document.createElement("form");
      form.method = "POST";
      form.action = action;
      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch {
      setError("系統錯誤，請稍後再試");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="pt-14 pb-8 min-h-screen bg-base">
        {/* Top bar */}
        <div className="px-4 py-3 bg-surface border-b border-border-default">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <Link
              href={`/country/${country.slug}`}
              className="text-text-secondary hover:text-primary transition-colors cursor-pointer"
              aria-label="返回"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-heading font-semibold text-base text-text-primary">
              結帳
            </span>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto px-4 py-6 space-y-5"
          noValidate
        >
          {/* Order summary */}
          <div className="bg-surface rounded-2xl p-4 border border-border-default">
            <div className="flex items-center gap-3 mb-3">
              <FlagImage code={country.flag} name={country.name} size={36} />
              <div>
                <h2 className="font-heading font-semibold text-base text-text-primary">
                  {country.name} eSIM
                </h2>
                <p className="text-sm text-text-secondary">
                  {plan.data} / {plan.days}天
                  {plan.variant && plan.variant !== "standard" && (
                    <span className="ml-1.5 text-xs text-primary font-medium">
                      {plan.variantLabel}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border-default">
              <span className="text-base text-text-secondary">小計</span>
              <span className="font-bold text-[22px] text-cta">
                NT${plan.price}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="bg-surface rounded-2xl p-4 border border-border-default space-y-3">
            <h3 className="font-heading font-semibold text-base text-text-primary">
              聯絡資訊
            </h3>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Email <span className="text-error">*</span>
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-border-default focus:border-primary text-base text-text-primary bg-surface placeholder:text-text-muted transition-colors"
              />
              <p className="text-sm text-text-muted mt-1">
                QR Code 會寄到此信箱
              </p>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-surface rounded-2xl p-4 border border-border-default">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold text-base text-text-primary">
                付款方式
              </h3>
            </div>
            <p className="text-sm text-text-secondary">
              點擊下方按鈕後，將跳轉至綠界 ECPay 安全付款頁面，支援信用卡、ATM 轉帳、超商付款等多種方式。
            </p>
          </div>

          {/* Agree */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-border-default text-primary cursor-pointer"
            />
            <span className="text-sm text-text-secondary leading-relaxed">
              我同意
              <Link href="/terms" target="_blank" className="text-primary underline mx-0.5">
                服務條款
              </Link>
              及
              <Link href="/privacy" target="_blank" className="text-primary underline mx-0.5">
                隱私政策
              </Link>
            </span>
          </label>

          {/* Error */}
          {error && (
            <p className="text-sm text-error text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 w-full h-14 bg-cta hover:bg-cta-hover active:bg-cta-hover disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                跳轉中...
              </>
            ) : (
              <>
                前往付款 NT${plan.price}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <Lock className="w-4 h-4" />
            <span>綠界 ECPay 安全加密付款</span>
          </div>
        </form>
      </main>
    </>
  );
}
