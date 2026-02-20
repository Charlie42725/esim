"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check, Zap, Globe, Radio } from "lucide-react";
import type { Plan } from "@/lib/data";

/** Group key for plans that share the same data + days */
function dataKey(plan: Plan) {
  return `${plan.data}_${plan.days}`;
}

const VARIANT_ICON: Record<string, typeof Zap> = {
  standard: Radio,
  nonhkip: Globe,
  iij: Zap,
  premium: Zap,
};

export default function PlanSelector({
  plans,
  countrySlug,
}: {
  plans: Plan[];
  countrySlug: string;
}) {
  /* ── Step 1: day options ── */
  const dayOptions = useMemo(
    () => [...new Set(plans.map((p) => p.days))].sort((a, b) => a - b),
    [plans]
  );
  const [selectedDays, setSelectedDays] = useState(dayOptions[0]);

  /* ── Plans for the selected day ── */
  const plansForDay = useMemo(
    () => plans.filter((p) => p.days === selectedDays),
    [plans, selectedDays]
  );

  /* ── Group by data amount (for detecting variants) ── */
  const dataGroups = useMemo(() => {
    const map = new Map<string, Plan[]>();
    for (const p of plansForDay) {
      const key = p.data; // e.g. "1GB"
      const arr = map.get(key) || [];
      arr.push(p);
      map.set(key, arr);
    }
    // Sort each group by price ascending
    for (const arr of map.values()) {
      arr.sort((a, b) => a.price - b.price);
    }
    return map;
  }, [plansForDay]);

  /* unique data sizes in price order */
  const dataSizes = useMemo(() => {
    const entries = [...dataGroups.entries()];
    entries.sort((a, b) => a[1][0].price - b[1][0].price);
    return entries.map(([size]) => size);
  }, [dataGroups]);

  /* ── Step 2: selected data ── */
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const activeData = selectedData && dataGroups.has(selectedData) ? selectedData : dataSizes[0];
  const variantsForData = dataGroups.get(activeData!) || [];
  const hasVariants = variantsForData.length > 1;

  /* ── Step 3: selected variant (plan id) ── */
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const activePlan =
    variantsForData.find((p) => p.id === selectedPlanId) || variantsForData[0];

  /* handler: switch days resets downstream */
  function onDaysChange(days: number) {
    setSelectedDays(days);
    setSelectedData(null);
    setSelectedPlanId(null);
  }

  /* handler: switch data resets variant */
  function onDataChange(data: string) {
    setSelectedData(data);
    setSelectedPlanId(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Step 1: Days ── */}
      <div>
        <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
          選擇天數
        </h2>
        <div className="flex flex-wrap gap-2">
          {dayOptions.map((days) => (
            <button
              key={days}
              onClick={() => onDaysChange(days)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                selectedDays === days
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-text-secondary border border-border-default hover:border-primary"
              }`}
            >
              {days} 天
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 2: Data ── */}
      <div>
        <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
          選擇流量
        </h2>
        <div className="space-y-3">
          {dataSizes.map((size) => {
            const group = dataGroups.get(size)!;
            const cheapest = group[0];
            const isActive = activeData === size;
            const showFrom = group.length > 1;

            return (
              <button
                key={size}
                onClick={() => onDataChange(size)}
                className={`w-full text-left rounded-2xl p-4 border-2 transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary-light/50"
                    : "border-border-default bg-surface hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isActive ? "border-primary bg-primary" : "border-text-muted"
                      }`}
                    >
                      {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="font-heading font-semibold text-lg text-text-primary">
                        {size}
                      </span>
                      <span className="text-sm text-text-muted ml-2">
                        {selectedDays}天
                      </span>
                      {showFrom && (
                        <span className="text-xs text-text-muted ml-2">
                          ({group.length} 種線路)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {showFrom && (
                      <span className="text-xs text-text-muted mr-1">最低 </span>
                    )}
                    <span className="font-bold text-xl text-cta">
                      NT${cheapest.price}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step 3: Variant (only if multiple for same data+days) ── */}
      {hasVariants && (
        <div>
          <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
            選擇線路
          </h2>
          <div className="space-y-3">
            {variantsForData.map((plan) => {
              const isActive = activePlan?.id === plan.id;
              const Icon = VARIANT_ICON[plan.variant] || Radio;

              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`w-full text-left rounded-2xl p-4 border-2 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "border-primary bg-primary-light/50"
                      : "border-border-default bg-surface hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isActive ? "border-primary bg-primary" : "border-text-muted"
                        }`}
                      >
                        {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-heading font-semibold text-base text-text-primary">
                            {plan.variantLabel}
                          </span>
                        </div>
                        <p className="text-sm text-text-muted mt-0.5 ml-5.5">
                          {plan.variantDesc}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-xl text-cta">
                        NT${plan.price}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Summary + CTA ── */}
      {activePlan && (
        <div className="bg-surface rounded-2xl p-5 border border-border-default">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-text-secondary">已選方案</p>
              <p className="font-heading font-semibold text-lg text-text-primary">
                {activePlan.data} / {activePlan.days}天
                {hasVariants && (
                  <span className="text-sm font-normal text-text-secondary ml-2">
                    {activePlan.variantLabel}
                  </span>
                )}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[28px] text-cta leading-tight">
                NT${activePlan.price}
              </p>
            </div>
          </div>

          <ul className="space-y-1.5 mb-4">
            {[
              `${activePlan.data} 高速流量`,
              hasVariants ? activePlan.variantDesc : "當地電信網路",
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
            href={`/checkout?plan=${activePlan.id}&country=${countrySlug}`}
            className="flex items-center justify-center gap-2 w-full h-14 bg-cta hover:bg-cta-hover active:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
          >
            立即購買 NT${activePlan.price}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
