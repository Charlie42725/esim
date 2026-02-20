import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function PrivacyPage() {
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
            隱私政策
          </h1>

          <p className="text-base text-text-secondary leading-relaxed">
            Roava eSIM（以下簡稱「本公司」）非常重視您的個人隱私。本隱私政策說明我們如何收集、使用與保護您的個人資料。使用本網站即表示您同意本政策之內容。
          </p>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              一、我們收集的資料
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. Email 地址：用於發送 eSIM QR Code 及訂單通知。</li>
              <li>2. 訂單資訊：包含購買方案、金額、訂單編號等交易紀錄。</li>
              <li>3. 我們不會收集您的姓名、電話、身分證字號等其他個人資料。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              二、資料使用目的
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 發送 eSIM QR Code 至您的 Email 信箱。</li>
              <li>2. 處理客服問題與售後支援。</li>
              <li>3. 訂單查詢與交易紀錄保存。</li>
              <li>4. 改善網站服務品質（匿名統計分析）。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              三、資料保護與不販售承諾
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 本公司絕不會將您的個人資料出售、出租或提供給任何第三方作行銷用途。</li>
              <li>2. 您的資料僅用於上述明確之目的，並採取適當的技術與管理措施加以保護。</li>
              <li>3. 未經您的同意，本公司不會將您的資料用於其他用途。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              四、第三方金流服務
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 本網站使用綠界科技（ECPay）作為第三方金流服務處理線上付款。</li>
              <li>2. 付款過程中，您的信用卡或付款資訊將直接傳輸至綠界科技平台處理，本公司不會儲存任何信用卡資訊。</li>
              <li>3. 綠界科技為經金管會核准之第三方支付業者，受相關法規監管，詳情請參閱
                <a href="https://www.ecpay.com.tw/Service/Privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline mx-0.5">
                  綠界隱私政策
                </a>。
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              五、Cookie 使用
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 本網站使用 Cookie 記錄您的偏好設定（如深色模式）。</li>
              <li>2. 這些 Cookie 不包含個人識別資訊，您可以透過瀏覽器設定自行清除。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              六、您的權利
            </h2>
            <ul className="space-y-2 text-base text-text-secondary leading-relaxed">
              <li>1. 您有權要求查閱、更正或刪除我們所持有的您的個人資料。</li>
              <li>2. 如需行使上述權利，請透過下方聯繫方式與我們聯繫。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading font-semibold text-lg text-text-primary">
              七、聯繫方式
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              如對本隱私政策有任何疑問，請透過以下方式聯繫：
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
