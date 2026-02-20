export interface Country {
  slug: string;
  name: string;
  flag: string;
  startingPrice: number;
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

export const countries: Country[] = [
  {
    slug: "japan",
    name: "日本",
    flag: "🇯🇵",
    startingPrice: 149,
    plans: [
      { id: "jp-3-1", name: "輕量方案", days: 3, data: "1GB", price: 149 },
      { id: "jp-5-3", name: "標準方案", days: 5, data: "3GB", price: 249, popular: true },
      { id: "jp-7-5", name: "暢遊方案", days: 7, data: "5GB", price: 349 },
      { id: "jp-10-u", name: "吃到飽", days: 10, data: "無限量", price: 499 },
    ],
  },
  {
    slug: "korea",
    name: "韓國",
    flag: "🇰🇷",
    startingPrice: 129,
    plans: [
      { id: "kr-3-1", name: "輕量方案", days: 3, data: "1GB", price: 129 },
      { id: "kr-5-3", name: "標準方案", days: 5, data: "3GB", price: 229, popular: true },
      { id: "kr-7-5", name: "暢遊方案", days: 7, data: "5GB", price: 329 },
      { id: "kr-10-u", name: "吃到飽", days: 10, data: "無限量", price: 469 },
    ],
  },
  {
    slug: "thailand",
    name: "泰國",
    flag: "🇹🇭",
    startingPrice: 99,
    plans: [
      { id: "th-3-1", name: "輕量方案", days: 3, data: "1GB", price: 99 },
      { id: "th-5-3", name: "標準方案", days: 5, data: "3GB", price: 179, popular: true },
      { id: "th-7-5", name: "暢遊方案", days: 7, data: "5GB", price: 259 },
      { id: "th-10-u", name: "吃到飽", days: 10, data: "無限量", price: 399 },
    ],
  },
  {
    slug: "vietnam",
    name: "越南",
    flag: "🇻🇳",
    startingPrice: 89,
    plans: [
      { id: "vn-3-1", name: "輕量方案", days: 3, data: "1GB", price: 89 },
      { id: "vn-5-3", name: "標準方案", days: 5, data: "3GB", price: 169, popular: true },
      { id: "vn-7-5", name: "暢遊方案", days: 7, data: "5GB", price: 239 },
      { id: "vn-10-u", name: "吃到飽", days: 10, data: "無限量", price: 369 },
    ],
  },
  {
    slug: "singapore",
    name: "新加坡",
    flag: "🇸🇬",
    startingPrice: 119,
    plans: [
      { id: "sg-3-1", name: "輕量方案", days: 3, data: "1GB", price: 119 },
      { id: "sg-5-3", name: "標準方案", days: 5, data: "3GB", price: 219, popular: true },
      { id: "sg-7-5", name: "暢遊方案", days: 7, data: "5GB", price: 319 },
    ],
  },
  {
    slug: "malaysia",
    name: "馬來西亞",
    flag: "🇲🇾",
    startingPrice: 99,
    plans: [
      { id: "my-3-1", name: "輕量方案", days: 3, data: "1GB", price: 99 },
      { id: "my-5-3", name: "標準方案", days: 5, data: "3GB", price: 179, popular: true },
      { id: "my-7-5", name: "暢遊方案", days: 7, data: "5GB", price: 259 },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getFallbackCountries(): Country[] {
  return countries;
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
