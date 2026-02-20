export interface Country {
  slug: string;
  name: string;
  flag: string;
  startingPrice: number;
  continent: string;
  plans: Plan[];
}

export interface Plan {
  id: string;
  name: string;
  days: number;
  data: string;
  price: number;
  popular?: boolean;
}

export function getFallbackCountries(): Country[] {
  return [];
}

export const faqItems = [
  {
    question: "什麼是 eSIM？",
    answer:
      "eSIM 是嵌入式 SIM 卡，不需要實體卡片。只要掃描 QR Code 就能啟用行動上網，免換卡、免租借 WiFi 機。目前大多數新款手機都支援 eSIM。",
  },
  {
    question: "我的手機支援 eSIM 嗎？",
    answer:
      "iPhone XS 以上、Google Pixel 3 以上、Samsung Galaxy S20 以上等機型都支援 eSIM。購買前請至手機「設定 > 行動服務」確認是否有「新增 eSIM」選項。",
  },
  {
    question: "購買後怎麼安裝？",
    answer:
      "購買後您會收到 QR Code（畫面顯示＋Email 寄送）。到手機「設定 > 行動服務 > 新增 eSIM」掃描 QR Code 即可完成安裝，全程不到 3 分鐘。",
  },
  {
    question: "到當地要怎麼啟用？",
    answer:
      "抵達目的地後，到手機「設定 > 行動服務」開啟已安裝的 eSIM 線路，並關閉原本的行動數據即可。建議在出發前先安裝好，到達後只需切換。",
  },
  {
    question: "可以退款嗎？",
    answer:
      "尚未掃描安裝的 eSIM 可在購買後 7 天內申請全額退款。已掃描安裝的 eSIM 因已啟用無法退款，但如遇到無法使用的問題，請聯繫客服協助處理。",
  },
  {
    question: "流量用完怎麼辦？",
    answer:
      "流量用完後可直接在網站購買新的方案。部分方案流量用完後會降速（而非斷線），詳情請見各方案說明。",
  },
];
