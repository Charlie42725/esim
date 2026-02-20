"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, CreditCard } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
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
  const router = useRouter();
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
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "請輸入有效的 Email";
    }
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      errs.card = "請輸入完整的卡號";
    }
    if (expiry.length !== 5) {
      errs.expiry = "請輸入到期日";
    }
    if (cvv.length < 3) {
      errs.cvv = "請輸入 CVV";
    }
    if (!agreed) {
      errs.agree = "請同意服務條款";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productCode: plan.id, quantity: 1, expectedPrice: plan.price, email }),
      });
      const result = await res.json();
      const orderId = result.data?.order?.orderId || "";
      router.push(
        `/order-complete?plan=${plan.id}&country=${country.slug}&email=${encodeURIComponent(email)}&orderId=${orderId}`
      );
    } catch {
      setErrors({ submit: "付款失敗，請稍後再試" });
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
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto px-4 py-6 space-y-5"
          noValidate
        >
          {/* Order summary */}
          <div className="bg-surface rounded-2xl p-4 border border-border-default">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl" role="img" aria-label={country.name}>
                {country.flag}
              </span>
              <div>
                <h2 className="font-heading font-semibold text-base text-text-primary">
                  {country.name} {plan.days}天 {plan.data} eSIM
                </h2>
                <p className="text-sm text-text-secondary">
                  {plan.name}
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
                className={`w-full h-12 px-4 rounded-lg border text-base bg-base placeholder:text-text-muted transition-colors ${
                  errors.email
                    ? "border-error"
                    : "border-border-default focus:border-primary"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-error mt-1">{errors.email}</p>
              )}
              <p className="text-sm text-text-muted mt-1">
                QR Code 會寄到此信箱
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-surface rounded-2xl p-4 border border-border-default space-y-3">
            <h3 className="font-heading font-semibold text-base text-text-primary flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              付款方式
            </h3>

            {/* Card number */}
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                卡號
              </label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className={`w-full h-12 px-4 rounded-lg border text-base bg-base placeholder:text-text-muted transition-colors ${
                  errors.card
                    ? "border-error"
                    : "border-border-default focus:border-primary"
                }`}
              />
              {errors.card && (
                <p className="text-sm text-error mt-1">{errors.card}</p>
              )}
            </div>

            {/* Expiry + CVV row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  到期日
                </label>
                <input
                  id="expiry"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  className={`w-full h-12 px-4 rounded-lg border text-base bg-base placeholder:text-text-muted transition-colors ${
                    errors.expiry
                      ? "border-error"
                      : "border-border-default focus:border-primary"
                  }`}
                />
                {errors.expiry && (
                  <p className="text-sm text-error mt-1">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-text-primary mb-1"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="000"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  className={`w-full h-12 px-4 rounded-lg border text-base bg-base placeholder:text-text-muted transition-colors ${
                    errors.cvv
                      ? "border-error"
                      : "border-border-default focus:border-primary"
                  }`}
                />
                {errors.cvv && (
                  <p className="text-sm text-error mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
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
              <a href="#" className="text-primary underline mx-0.5">
                服務條款
              </a>
              及
              <a href="#" className="text-primary underline mx-0.5">
                隱私政策
              </a>
            </span>
          </label>
          {errors.agree && (
            <p className="text-sm text-error -mt-3">{errors.agree}</p>
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
                處理中...
              </>
            ) : (
              <>
                確認付款 NT${plan.price}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <Lock className="w-4 h-4" />
            <span>SSL 安全加密 | 付款安全處理</span>
          </div>
        </form>
      </main>
    </>
  );
}
