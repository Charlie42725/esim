"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Plan } from "@/lib/data";

export default function PlanSelector({
  plans,
  countrySlug,
}: {
  plans: Plan[];
  countrySlug: string;
}) {
  // Get unique sorted day options
  const dayOptions = useMemo(() => {
    const days = [...new Set(plans.map((p) => p.days))].sort((a, b) => a - b);
    return days;
  }, [plans]);

  const [selectedDays, setSelectedDays] = useState<number>(dayOptions[0]);

  // Plans filtered by selected days, sorted by data size (price ascending)
  const filteredPlans = useMemo(
    () => plans.filter((p) => p.days === selectedDays),
    [plans, selectedDays]
  );

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Auto-select first plan when days change
  const activePlan = filteredPlans.find((p) => p.id === selectedPlanId) ?? filteredPlans[0];

  return (
    <div className="space-y-6">
      {/* Step 1: Select days */}
      <div>
        <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
          選擇天數
        </h2>
        <div className="flex flex-wrap gap-2">
          {dayOptions.map((days) => (
            <button
              key={days}
              onClick={() => {
                setSelectedDays(days);
                setSelectedPlanId(null);
              }}
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

      {/* Step 2: Select data plan */}
      <div>
        <h2 className="font-heading font-semibold text-base text-text-primary mb-3">
          選擇流量
        </h2>
        <div className="space-y-3">
          {filteredPlans.map((plan) => {
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
                    {/* Radio indicator */}
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
                      <span className="font-heading font-semibold text-lg text-text-primary">
                        {plan.data}
                      </span>
                      <span className="text-sm text-text-muted ml-2">
                        {plan.days}天
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
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

      {/* Selected plan summary + CTA */}
      {activePlan && (
        <div className="bg-surface rounded-2xl p-5 border border-border-default">
          <div className="flex items-center justify-between mb-4">
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

          <ul className="space-y-1.5 mb-4">
            {[
              `${activePlan.data} 高速流量`,
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
