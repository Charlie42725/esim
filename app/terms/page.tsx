import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function TermsPage() {
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

        <article className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          <h1 className="font-heading font-bold text-[28px] text-text-primary text-center">
            服務條款
          </h1>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              一、商品說明
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 本網站販售之商品為數位 eSIM 產品，非實體 SIM 卡。</li>
              <li>2. 付款完成後，eSIM 的 QR Code 將顯示於畫面並寄送至您填寫的 Email 信箱。</li>
              <li>3. 每組 QR Code 僅供單一裝置使用，掃描安裝後即與該裝置綁定，無法轉移至其他裝置。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              二、退款政策
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. eSIM 屬於數位內容商品，一經發送即視為服務履行完成。</li>
              <li>2. 已發送或已啟用之 eSIM，依《消費者保護法》第 19 條第 1 項但書規定，不適用七天鑑賞期。</li>
              <li>3. 若 eSIM 尚未發送且尚未啟用，可於購買後 7 日內聯繫客服申請退款，經人工審核後辦理。</li>
              <li>4. 因個人操作不當（如裝置不支援、未依教學安裝等）導致無法使用，恕不退款。</li>
              <li>5. 如遇產品本身瑕疵（QR Code 無效、無法連線等），請聯繫客服，我們將協助處理或退款。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              三、使用責任
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 購買前請確認您的裝置支援 eSIM 功能（iPhone XS 以上、多數 Android 新機型）。</li>
              <li>2. eSIM 的網路品質依當地電信商覆蓋範圍而定，本公司不保證特定地區之訊號品質或速度。</li>
              <li>3. 方案所載之流量與天數以啟用後起算，逾期或用盡後將自動停止服務。</li>
              <li>4. 嚴禁將 eSIM 用於違法活動，違者須自行承擔法律責任。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              四、免責聲明
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 因不可抗力因素（天災、戰爭、電信商系統維護等）造成之服務中斷，本公司不承擔賠償責任。</li>
              <li>2. 本公司保留隨時修改服務條款之權利，修改後將公告於本頁面。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              五、聯繫方式
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              如有任何問題，請透過以下方式聯繫：
            </p>
            <ul className="space-y-1 text-base text-text-secondary">
              <li>
                LINE 客服：
                <a href="https://line.me/ti/p/@roavaesim" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  @roavaesim
                </a>
              </li>
              <li>
                Email：
                <a href="mailto:support@roavaesim.tw" className="text-primary underline">
                  support@roavaesim.tw
                </a>
              </li>
            </ul>
          </section>

          <p className="text-sm text-text-muted text-center pt-4">
            最後更新日期：2026 年 2 月 20 日
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
