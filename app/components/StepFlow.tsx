import { ShoppingCart, CreditCard, QrCode } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: ShoppingCart,
    title: "選擇國家方案",
    desc: "挑選目的地與天數流量",
  },
  {
    num: 2,
    icon: CreditCard,
    title: "線上付款",
    desc: "支援信用卡、LINE Pay",
  },
  {
    num: 3,
    icon: QrCode,
    title: "掃碼安裝",
    desc: "掃描 QR Code 即完成",
  },
];

export default function StepFlow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold font-heading mb-4">
              {step.num}
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-7 left-full w-[calc(100%-3.5rem)] border-t-2 border-dashed border-primary/30" />
            )}
          </div>
          <step.icon className="w-10 h-10 text-primary mb-3" />
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-1">
            {step.title}
          </h3>
          <p className="text-base text-text-secondary">{step.desc}</p>
          {i < steps.length - 1 && (
            <div className="md:hidden w-px h-8 border-l-2 border-dashed border-primary/30 mt-4" />
          )}
        </div>
      ))}
    </div>
  );
}
