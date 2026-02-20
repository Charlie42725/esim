import { Wifi } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-5 h-5 text-primary" />
              <span className="font-heading font-bold text-lg">Roava eSIM</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              台灣出國旅客首選 eSIM 平台
              <br />
              免換卡、掃碼即用、3 分鐘搞定
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="font-semibold text-sm mb-3 text-white/80">服務</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <Link href="/#countries" className="hover:text-white transition-colors cursor-pointer">
                    熱門國家
                  </Link>
                </li>
                <li>
                  <Link href="/install-guide" className="hover:text-white transition-colors cursor-pointer">
                    安裝教學
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-white/80">支援</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>
                  <a
                    href="https://line.me/ti/p/@roavaesim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    LINE 客服
                  </a>
                </li>
                <li>
                  <a href="mailto:support@roavaesim.tw" className="hover:text-white transition-colors cursor-pointer">
                    Email 聯繫
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-text-muted text-center">
          © 2026 Roava eSIM. All rights reserved. | 統一編號：00000000
        </div>
      </div>
    </footer>
  );
}
