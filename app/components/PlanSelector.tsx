"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check, Wifi, Zap, Package } from "lucide-react";
import type { Plan } from "@/lib/data";

// ---------------------------------------------------------------------------
// Data type config
// ---------------------------------------------------------------------------

type DataType = Plan["dataType"];

const DATA_TYPE_CONFIG: Record<
  DataType,
  { label: string; desc: string; icon: typeof Wifi }
> = {
  "unlimited-throttle": {
    label: "吃到飽",
    desc: "高速流量用完降速，不斷線",
    icon: Wifi,
  },
  unlimited: {
    label: "不降速吃到飽",
    desc: "全程高速無限量",
    icon: Zap,
  },
  fixed: {
    label: "固定流量",
    desc: "總量用完即止",
    icon: Package,
  },
};

// ---------------------------------------------------------------------------
// Network badge
// ---------------------------------------------------------------------------

function NetworkBadge({
  networkType,
  networkDesc,
}: {
  networkType: Plan["networkType"];
  networkDesc: string;
}) {
  const isNative = networkType === "native";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isNative
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-amber-50 text-amber-700 border border-amber-200"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isNative ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {isNative ? "原生網路" : "漫遊"}
      {networkDesc && <span className="font-normal">· {networkDesc}</span>}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Flow description per data type
// ---------------------------------------------------------------------------

function flowDescription(plan: Plan): string {
  switch (plan.dataType) {
    case "unlimited-throttle":
      return `${plan.data} 高速，降速後不斷線`;
    case "unlimited":
      return "全程高速，無限量上網";
    case "fixed":
      return `${plan.data} 高速流量，用完即止`;
  }
}

// ---------------------------------------------------------------------------
// PlanSelector
// ---------------------------------------------------------------------------

export default function PlanSelector({
  plans,
  countrySlug,
}: {
  plans: Plan[];
  countrySlug: string;
}) {
  // ── Derive available data types ──
  const availableTypes = useMemo(() => {
    const types = [...new Set(plans.map((p) => p.dataType))];
    // Keep consistent order: unlimited-throttle → unlimited → fixed
    const order: DataType[] = ["unlimited-throttle", "unlimited", "fixed"];
    return order.filter((t) => types.includes(t));
  }, [plans]);

  const showTypeStep = availableTypes.length > 1;
  const [selectedType, setSelectedType] = useState<DataType>(availableTypes[0]);

  // ── Plans filtered by type ──
  const plansForType = useMemo(
    () => plans.filter((p) => p.dataType === selectedType),
    [plans, selectedType]
  );

  // ── Day options ──
  const dayOptions = useMemo(
    () => [...new Set(plansForType.map((p) => p.days))].sort((a, b) => a - b),
    [plansForType]
  );
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const activeDays =
    selectedDays !== null && dayOptions.includes(selectedDays)
      ? selectedDays
      : dayOptions[0];

  // ── Plans for selected type + days ──
  const matchedPlans = useMemo(
    () => plansForType.filter((p) => p.days === activeDays),
    [plansForType, activeDays]
  );
  const hasMultiple = matchedPlans.length > 1;

  // ── Selected plan ──
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const activePlan =
    matchedPlans.find((p) => p.id === selectedPlanId) || matchedPlans[0];

  // ── Handlers ──
  function onTypeChange(type: DataType) {
    setSelectedType(type);
    setSelectedDays(null);
    setSelectedPlanId(null);
  }

  function onDaysChange(days: number) {
    setSelectedDays(days);
    setSelectedPlanId(null);
  }

  return (
    <div className="space-y-6">
      {/* ── Step 1: Type (only if multiple) ── */}
      {showTypeStep && (
        <div>
          <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
            選擇類型
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableTypes.map((type) => {
              const cfg = DATA_TYPE_CONFIG[type];
              const Icon = cfg.icon;
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`text-left rounded-2xl p-4 border-2 transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "border-primary bg-primary-light/50"
                      : "border-border-default bg-surface hover:border-primary/50"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-2 ${
                      isActive ? "text-primary" : "text-text-muted"
                    }`}
                  />
                  <p className="font-heading font-semibold text-base text-text-primary">
                    {cfg.label}
                  </p>
                  <p className="text-sm text-text-muted mt-0.5">{cfg.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Step 2: Days ── */}
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
                activeDays === days
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface text-text-secondary border border-border-default hover:border-primary"
              }`}
            >
              {days} 天
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 3: Multiple plans (only if >1 for same type+days) ── */}
      {hasMultiple && (
        <div>
          <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
            選擇方案
          </h2>
          <div className="space-y-3">
            {matchedPlans.map((plan) => {
              const isActive = activePlan?.id === plan.id;
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
                          isActive
                            ? "border-primary bg-primary"
                            : "border-text-muted"
                        }`}
                      >
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <span className="font-heading font-semibold text-base text-text-primary">
                          {plan.data}
                        </span>
                        {plan.variantDesc && (
                          <p className="text-sm text-text-muted mt-0.5">
                            {plan.variantDesc}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-xl text-cta">
                      NT${plan.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Quote card ── */}
      {activePlan && (
        <div className="bg-surface rounded-2xl p-5 border border-border-default">
          {/* Header: data + price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-text-secondary">已選方案</p>
              <p className="font-heading font-semibold text-lg text-text-primary">
                {activePlan.data} / {activePlan.days}天
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[28px] text-cta leading-tight">
                NT${activePlan.price}
              </p>
            </div>
          </div>

          {/* Network badge */}
          <div className="mb-4">
            <NetworkBadge
              networkType={activePlan.networkType}
              networkDesc={activePlan.networkDesc}
            />
          </div>

          {/* Feature list */}
          <ul className="space-y-1.5 mb-4">
            {[
              flowDescription(activePlan),
              "免換實體 SIM 卡",
              "掃碼即裝，即買即用",
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

          {/* CTA */}
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
