import { getContinent, getCountryNameZh } from "./continents";

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
  variant: "standard" | "nonhkip" | "iij" | "premium";
  variantLabel: string;
  variantDesc: string;
  dataType: "unlimited-throttle" | "unlimited" | "fixed";
  networkType: "native" | "roaming";
  networkDesc: string;
}

// ---------------------------------------------------------------------------
// 靜態產品目錄（手動維護）
// productCode = 途鸽的 productCode，下單時的唯一依據
// price = 你的售價 NTD（不含成本價）
// ---------------------------------------------------------------------------

export interface StaticProduct {
  productCode: string;   // 途鸽 productCode（必須對應途鸽後台上架的產品）
  country: string;       // ISO 國家碼（單國如 "JP"）或自定義 slug（多國如 "asia-5"）
  countryName: string;   // 中文顯示名稱
  data: string;          // 流量，例如 "1GB"、"500MB"、"吃到飽"
  days: number;          // 天數
  price: number;         // 售價 NTD
  description?: string;  // 選填備註（降速說明等）
  flag?: string;         // 國旗代碼，單國不填會自動用 country；多國填 "multi"
  continent?: string;    // 多國套餐需手動指定，如 "multi"、"asia" 等
  dataType?: "unlimited-throttle" | "unlimited" | "fixed";
  //         吃到飽(降速)           不降速吃到飽     固定流量
  networkType?: "native" | "roaming";  // 原生 | 漫遊（C4=漫遊, I2=原生）
  networkDesc?: string;                // 電信商名，如 "NTT DoCoMo"
}

// ============================================================================
// 靜態產品目錄 — 所有產品皆來自途鸽沙箱，售價 NTD 自行決定
// 要新增產品：複製一個 block，改 productCode + 售價即可
// ============================================================================

export const staticProducts: StaticProduct[] = [
  // ===== 日本（單國）=====
  {
    productCode: "A-001-ES-AU-C4-5D/60D-1GB",
    country: "JP",
    countryName: "日本",
    data: "每日500MB",
    days: 5,
    price: 159,
    description: "每日 500MB 高速，用完降速 512kbps",
    dataType: "unlimited-throttle",
    networkType: "roaming",
    networkDesc: "NTT DoCoMo",
  },
  {
    productCode: "A-002-ES-ZD-C4-6D/60D-500MB",
    country: "JP",
    countryName: "日本",
    data: "每日500MB",
    days: 6,
    price: 189,
    description: "每日 500MB 高速，用完降速 512kbps",
    dataType: "unlimited-throttle",
    networkType: "roaming",
    networkDesc: "NTT DoCoMo",
  },

  // ===== 泰國（單國）=====
  {
    productCode: "A-002-ES-AU-DZ-A1-8D/120D-17GB",
    country: "TH",
    countryName: "泰國",
    data: "17GB",
    days: 8,
    price: 249,
    description: "AIS 網路，17GB 高速用完即止",
  },

  // ===== 新加坡（單國）=====
  {
    productCode: "A-03-ES-ZD-C4-2D/60D-unlimited",
    country: "SG",
    countryName: "新加坡",
    data: "吃到飽",
    days: 2,
    price: 199,
    description: "每日無限量上網",
  },

  // ===== 以色列（單國）=====
  {
    productCode: "A-002-ES-AU-T-30D/180D-3GB(A)",
    country: "IL",
    countryName: "以色列",
    data: "3GB",
    days: 30,
    price: 299,
  },
  {
    productCode: "A-002-ES-AU-D-30D/180D-500MB",
    country: "IL",
    countryName: "以色列",
    data: "每日500MB",
    days: 30,
    price: 399,
  },

  // ===== 德國（單國）=====
  {
    productCode: "E-006-F2-ES-AU-T-7D/60D-1GB",
    country: "DE",
    countryName: "德國",
    data: "1GB",
    days: 7,
    price: 189,
  },

  // ===== 英國（單國）=====
  {
    productCode: "E-01-F2-ES-AU-T-7D/60D-1GB(A)",
    country: "GB",
    countryName: "英國",
    data: "1GB",
    days: 7,
    price: 179,
  },
  {
    productCode: "E-02-F2-ES-ZD-T-7D/60D-1GB(A)",
    country: "GB",
    countryName: "英國",
    data: "1GB",
    days: 7,
    price: 199,
    description: "指定日期啟用",
  },

  // ===== 奧地利（單國）=====
  {
    productCode: "E-01-ES-eP1-AU-T-15D/60D-3GB(A)",
    country: "AT",
    countryName: "奧地利",
    data: "3GB",
    days: 15,
    price: 249,
  },

  // ===== 比利時（單國）=====
  {
    productCode: "E-01-ES-C4-AU-T-7D/60D-1GB",
    country: "BE",
    countryName: "比利時",
    data: "1GB",
    days: 7,
    price: 179,
  },

  // ===== 土耳其（單國）=====
  {
    productCode: "E-01-ES-AU-D-eP1-3D/60D-3GB(A)",
    country: "TR",
    countryName: "土耳其",
    data: "3GB",
    days: 3,
    price: 169,
  },
  {
    productCode: "E-01-ES-D-AU-eP1-3D/60D-500MB",
    country: "TR",
    countryName: "土耳其",
    data: "每日500MB",
    days: 3,
    price: 199,
    description: "每日 500MB 高速，降速後吃到飽",
  },

  // ===== 俄羅斯（單國）=====
  {
    productCode: "E-02-ES-eP1-ZD-T-30D/60D-5GB(A)",
    country: "RU",
    countryName: "俄羅斯",
    data: "5GB",
    days: 30,
    price: 349,
  },

  // ===== 亞洲 5 國套餐（日本、中國、新加坡、韓國、馬來西亞）=====
  {
    productCode: "A-136-ES-AU-C4-1D/60D-1GB",
    country: "asia-5",
    countryName: "亞洲 5 國",
    data: "每日1GB",
    days: 1,
    price: 89,
    description: "涵蓋日本、中國、新加坡、韓國、馬來西亞",
    flag: "multi",
    continent: "multi",
  },
  {
    productCode: "A-136-ES-ZD-C4-1D/60D-1GB",
    country: "asia-5",
    countryName: "亞洲 5 國",
    data: "每日1GB",
    days: 1,
    price: 99,
    description: "涵蓋日本、中國、新加坡、韓國、馬來西亞（指定日期啟用）",
    flag: "multi",
    continent: "multi",
  },

  // ===== 亞洲 10 國套餐（AIS 網路）=====
  {
    productCode: "A-166-ES-AU-DZ-A1-8D/60D-6GB",
    country: "asia-10",
    countryName: "亞洲 10 國",
    data: "6GB",
    days: 8,
    price: 299,
    description: "涵蓋日韓星馬泰菲印尼印度孟加拉汶萊",
    flag: "multi",
    continent: "multi",
  },
  {
    productCode: "A-167-ES-AU-D-A1-8D/60D-U(A)",
    country: "asia-10",
    countryName: "亞洲 10 國",
    data: "每日1GB",
    days: 8,
    price: 399,
    description: "AIS 吃到飽（每日 1GB 高速，降速後不斷線）",
    flag: "multi",
    continent: "multi",
  },

  // ===== 歐洲 11 國套餐 =====
  {
    productCode: "E-184-ES-AU-eO1-D-10D/60D-10GB",
    country: "europe-11",
    countryName: "歐洲 11 國",
    data: "每日15GB",
    days: 10,
    price: 599,
    description: "涵蓋德英法義荷比瑞波奧馬爾塞",
    flag: "multi",
    continent: "multi",
  },
  {
    productCode: "E-184-ES-ZD-eO1-D-10D/60D-10GB",
    country: "europe-11",
    countryName: "歐洲 11 國",
    data: "每日15GB",
    days: 10,
    price: 549,
    description: "涵蓋德英法義荷比瑞波奧馬爾塞（指定日期啟用）",
    flag: "multi",
    continent: "multi",
  },

  // ===== 北美 3 國（美國、加拿大、墨西哥）=====
  {
    productCode: "A-013-ES-AU-eO1-T-3D/60D-2GB",
    country: "north-america-3",
    countryName: "北美 3 國",
    data: "2GB",
    days: 3,
    price: 249,
    description: "涵蓋美國、加拿大、墨西哥",
    flag: "multi",
    continent: "multi",
  },
  {
    productCode: "A-013-ES-ZD-eO1-T-3D/60D-2GB",
    country: "north-america-3",
    countryName: "北美 3 國",
    data: "2GB",
    days: 3,
    price: 229,
    description: "涵蓋美國、加拿大、墨西哥（指定日期啟用）",
    flag: "multi",
    continent: "multi",
  },

  // ===== 美加 2 國 =====
  {
    productCode: "B-01-ES-AU-eP1-D-1D/60D-500MB(A)",
    country: "us-ca",
    countryName: "美加 2 國",
    data: "每日500MB",
    days: 1,
    price: 129,
    description: "涵蓋美國、加拿大",
    flag: "multi",
    continent: "multi",
  },
  {
    productCode: "B-02-ES-ZD-eP1-D-3D/60D-500MB(A)",
    country: "us-ca",
    countryName: "美加 2 國",
    data: "每日500MB",
    days: 3,
    price: 299,
    description: "涵蓋美國、加拿大（指定日期啟用）",
    flag: "multi",
    continent: "multi",
  },

  // 繼續在這裡新增產品...
  // {
  //   productCode: "途鸽產品編碼",
  //   country: "ISO碼或自定義slug",
  //   countryName: "中文名",
  //   data: "流量",
  //   days: 天數,
  //   price: 售價NTD,
  // },
];

// ---------------------------------------------------------------------------
// 從 staticProducts 組成 Country[] 給前端使用
// ---------------------------------------------------------------------------

export function getStaticCountries(): Country[] {
  const countryMap = new Map<string, Country>();

  for (const p of staticProducts) {
    const slug = p.country.toLowerCase();
    const plan: Plan = {
      id: p.productCode,
      name: `${p.data} / ${p.days}天`,
      days: p.days,
      data: p.data,
      price: p.price,
      variant: "standard",
      variantLabel: "標準",
      variantDesc: p.description || "",
      dataType: p.dataType || "unlimited-throttle",
      networkType: p.networkType || "native",
      networkDesc: p.networkDesc || "",
    };

    const existing = countryMap.get(slug);
    if (existing) {
      existing.plans.push(plan);
    } else {
      const isMulti = !!p.flag && p.flag === "multi";
      countryMap.set(slug, {
        slug,
        name: p.countryName || getCountryNameZh(p.country),
        flag: p.flag || slug,
        startingPrice: plan.price,
        continent: p.continent || (isMulti ? "multi" : getContinent(p.country)),
        plans: [plan],
      });
    }
  }

  for (const country of countryMap.values()) {
    country.plans.sort((a, b) => a.price - b.price);
    country.startingPrice = country.plans[0].price;
  }

  return Array.from(countryMap.values());
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
      "購買成功後，途鸽會將 QR Code 寄送到您填寫的 Email。到手機「設定 > 行動服務 > 新增 eSIM」掃描 QR Code 即可完成安裝，全程不到 3 分鐘。",
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
