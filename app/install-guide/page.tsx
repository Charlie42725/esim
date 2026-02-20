import { ArrowLeft, Smartphone, Wifi, QrCode, ToggleRight } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const steps = [
  {
    icon: QrCode,
    title: "取得 QR Code",
    desc: "購買完成後，您會在畫面上看到 QR Code，同時也會收到 Email 通知。",
  },
  {
    icon: Smartphone,
    title: "開啟手機設定",
    desc: "iPhone：設定 > 行動服務 > 新增 eSIM\nAndroid：設定 > 網路和網際網路 > SIM 卡 > 新增 eSIM",
  },
  {
    icon: Wifi,
    title: "掃描 QR Code",
    desc: "選擇「使用 QR Code」，用手機相機掃描畫面上的 QR Code，系統會自動下載 eSIM 設定檔。",
  },
  {
    icon: ToggleRight,
    title: "啟用 eSIM",
    desc: "抵達目的地後，到設定中開啟 eSIM 線路的「行動數據」，並將原本的 SIM 卡行動數據關閉即可上網。",
  },
];

export default function InstallGuidePage() {
  return (
    <>
      <Header />

      <main className="pt-14 min-h-screen bg-base">
        <div className="px-4 py-3 bg-surface border-b border-border-default">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首頁
            </Link>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="font-heading font-bold text-[28px] md:text-5xl text-text-primary text-center mb-2">
            eSIM 安裝教學
          </h1>
          <p className="text-base text-text-secondary text-center mb-10">
            只要 4 個步驟，3 分鐘完成設定
          </p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-surface rounded-2xl p-5 border border-border-default"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold font-heading">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-primary" />
                      <h2 className="font-heading font-semibold text-lg text-text-primary">
                        {step.title}
                      </h2>
                    </div>
                    <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-primary-light rounded-2xl p-5">
            <h3 className="font-heading font-semibold text-base text-text-primary mb-2">
              小提醒
            </h3>
            <ul className="space-y-2 text-base text-text-secondary">
              <li>• 建議在出發前先安裝 eSIM，到達目的地後只需開啟即可</li>
              <li>• 安裝過程需要網路連線（Wi-Fi 或行動數據皆可）</li>
              <li>• 每個 QR Code 只能使用一次，請勿重複掃描</li>
              <li>• iPhone XS 以上 / Android 大部分新機型皆支援</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/#search"
              className="inline-flex items-center justify-center gap-2 w-full max-w-sm h-14 bg-cta hover:bg-cta-hover text-white text-base font-bold rounded-xl transition-colors duration-200 cursor-pointer"
            >
              立即選購 eSIM
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
