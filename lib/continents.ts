// Country code → continent mapping (covers all 158 single-country codes from weroam API)

export type ContinentKey =
  | "all"
  | "asia"
  | "europe"
  | "americas"
  | "oceania"
  | "middle-east"
  | "africa"
  | "multi";

export const CONTINENT_TABS: { key: ContinentKey; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "asia", label: "亞洲" },
  { key: "europe", label: "歐洲" },
  { key: "americas", label: "美洲" },
  { key: "oceania", label: "大洋洲" },
  { key: "middle-east", label: "中東" },
  { key: "africa", label: "非洲" },
  { key: "multi", label: "套餐" },
];

const COUNTRY_TO_CONTINENT: Record<string, ContinentKey> = {
  // Asia
  JP: "asia", KR: "asia", TH: "asia", VN: "asia", SG: "asia", MY: "asia",
  CN: "asia", TW: "asia", HK: "asia", MO: "asia", PH: "asia", ID: "asia",
  IN: "asia", KH: "asia", LA: "asia", MM: "asia", BD: "asia", LK: "asia",
  NP: "asia", PK: "asia", MN: "asia", KZ: "asia", UZ: "asia", KG: "asia",
  TJ: "asia", TM: "asia", BN: "asia", MV: "asia", BT: "asia", AF: "asia",

  // Europe
  GB: "europe", FR: "europe", DE: "europe", IT: "europe", ES: "europe",
  PT: "europe", NL: "europe", BE: "europe", AT: "europe", CH: "europe",
  SE: "europe", NO: "europe", DK: "europe", FI: "europe", IE: "europe",
  PL: "europe", CZ: "europe", HU: "europe", RO: "europe", BG: "europe",
  HR: "europe", SK: "europe", SI: "europe", EE: "europe", LV: "europe",
  LT: "europe", GR: "europe", CY: "europe", MT: "europe", LU: "europe",
  IS: "europe", LI: "europe", MC: "europe", SM: "europe", AD: "europe",
  AL: "europe", BA: "europe", ME: "europe", MK: "europe", RS: "europe",
  XK: "europe", MD: "europe", UA: "europe", BY: "europe", RU: "europe",
  GE: "europe", AM: "europe", AZ: "europe", TR: "europe", GI: "europe",
  JE: "europe", GG: "europe", IM: "europe", FO: "europe", GL: "europe",
  VA: "europe", AX: "europe",

  // Americas
  US: "americas", CA: "americas", MX: "americas", BR: "americas",
  AR: "americas", CL: "americas", CO: "americas", PE: "americas",
  EC: "americas", VE: "americas", UY: "americas", PY: "americas",
  BO: "americas", GY: "americas", SR: "americas", GF: "americas",
  PA: "americas", CR: "americas", GT: "americas", HN: "americas",
  SV: "americas", NI: "americas", BZ: "americas", CU: "americas",
  DO: "americas", HT: "americas", JM: "americas", TT: "americas",
  BB: "americas", BS: "americas", AG: "americas", DM: "americas",
  GD: "americas", KN: "americas", LC: "americas", VC: "americas",
  PR: "americas", VI: "americas", AW: "americas", CW: "americas",
  SX: "americas", BM: "americas", KY: "americas", TC: "americas",
  MQ: "americas", GP: "americas", FK: "americas",
  AI: "americas", MS: "americas", VG: "americas",

  // Oceania
  AU: "oceania", NZ: "oceania", FJ: "oceania", PG: "oceania",
  WS: "oceania", TO: "oceania", VU: "oceania", SB: "oceania",
  NC: "oceania", PF: "oceania", GU: "oceania", AS: "oceania",
  CK: "oceania", NU: "oceania", TL: "oceania",

  // Middle East
  AE: "middle-east", SA: "middle-east", QA: "middle-east", BH: "middle-east",
  KW: "middle-east", OM: "middle-east", JO: "middle-east", LB: "middle-east",
  IL: "middle-east", PS: "middle-east", IQ: "middle-east", IR: "middle-east",
  YE: "middle-east", SY: "middle-east", EG: "middle-east",

  // Africa
  ZA: "africa", NG: "africa", KE: "africa", GH: "africa", TZ: "africa",
  ET: "africa", UG: "africa", RW: "africa", SN: "africa", CI: "africa",
  CM: "africa", CD: "africa", CG: "africa", AO: "africa", MZ: "africa",
  MG: "africa", MW: "africa", ZM: "africa", ZW: "africa", BW: "africa",
  NA: "africa", SZ: "africa", LS: "africa", MU: "africa", SC: "africa",
  CV: "africa", GA: "africa", GQ: "africa", TD: "africa", NE: "africa",
  ML: "africa", BF: "africa", BJ: "africa", TG: "africa", SL: "africa",
  LR: "africa", GN: "africa", GM: "africa", GW: "africa", MR: "africa",
  DJ: "africa", SO: "africa", ER: "africa", SS: "africa", CF: "africa",
  BI: "africa", KM: "africa", ST: "africa", RE: "africa", YT: "africa",
  MA: "africa", DZ: "africa", TN: "africa", LY: "africa", SD: "africa",
};

/** Country code → Chinese name (covers all 158 API countries) */
const COUNTRY_NAME_ZH: Record<string, string> = {
  // Asia
  JP: "日本", KR: "韓國", TH: "泰國", VN: "越南", SG: "新加坡", MY: "馬來西亞",
  CN: "中國大陸", TW: "台灣", HK: "香港", MO: "澳門", PH: "菲律賓", ID: "印尼",
  IN: "印度", KH: "柬埔寨", LA: "寮國", MM: "緬甸", BD: "孟加拉", LK: "斯里蘭卡",
  NP: "尼泊爾", PK: "巴基斯坦", MN: "蒙古", KZ: "哈薩克", UZ: "烏茲別克", KG: "吉爾吉斯",
  TJ: "塔吉克", TM: "土庫曼", BN: "汶萊", MV: "馬爾地夫", BT: "不丹", AF: "阿富汗",

  // Europe
  GB: "英國", FR: "法國", DE: "德國", IT: "義大利", ES: "西班牙",
  PT: "葡萄牙", NL: "荷蘭", BE: "比利時", AT: "奧地利", CH: "瑞士",
  SE: "瑞典", NO: "挪威", DK: "丹麥", FI: "芬蘭", IE: "愛爾蘭",
  PL: "波蘭", CZ: "捷克", HU: "匈牙利", RO: "羅馬尼亞", BG: "保加利亞",
  HR: "克羅埃西亞", SK: "斯洛伐克", SI: "斯洛維尼亞", EE: "愛沙尼亞", LV: "拉脫維亞",
  LT: "立陶宛", GR: "希臘", CY: "賽普勒斯", MT: "馬爾他", LU: "盧森堡",
  IS: "冰島", LI: "列支敦斯登", MC: "摩納哥", SM: "聖馬力諾", AD: "安道爾",
  AL: "阿爾巴尼亞", BA: "波士尼亞", ME: "蒙特內哥羅", MK: "北馬其頓", RS: "塞爾維亞",
  XK: "科索沃", MD: "摩爾多瓦", UA: "烏克蘭", BY: "白俄羅斯", RU: "俄羅斯",
  GE: "喬治亞", AM: "亞美尼亞", AZ: "亞塞拜然", TR: "土耳其", GI: "直布羅陀",
  JE: "澤西島", GG: "根西島", IM: "曼島", FO: "法羅群島", GL: "格陵蘭",
  VA: "梵蒂岡", AX: "奧蘭群島",

  // Americas
  US: "美國", CA: "加拿大", MX: "墨西哥", BR: "巴西",
  AR: "阿根廷", CL: "智利", CO: "哥倫比亞", PE: "秘魯",
  EC: "厄瓜多", VE: "委內瑞拉", UY: "烏拉圭", PY: "巴拉圭",
  BO: "玻利維亞", GY: "蓋亞那", SR: "蘇利南", GF: "法屬圭亞那",
  PA: "巴拿馬", CR: "哥斯大黎加", GT: "瓜地馬拉", HN: "宏都拉斯",
  SV: "薩爾瓦多", NI: "尼加拉瓜", BZ: "貝里斯", CU: "古巴",
  DO: "多明尼加", HT: "海地", JM: "牙買加", TT: "千里達及托巴哥",
  BB: "巴貝多", BS: "巴哈馬", AG: "安地卡及巴布達", DM: "多米尼克",
  GD: "格瑞那達", KN: "聖克里斯多福", LC: "聖露西亞", VC: "聖文森",
  PR: "波多黎各", VI: "美屬維京群島", AW: "阿魯巴", CW: "乃索",
  SX: "荷屬聖馬丁", BM: "百慕達", KY: "開曼群島", TC: "特克斯和凱科斯",
  MQ: "馬提尼克", GP: "瓜德羅普", FK: "福克蘭群島",
  AI: "安圭拉", MS: "蒙特塞拉特", VG: "英屬維京群島",

  // Oceania
  AU: "澳洲", NZ: "紐西蘭", FJ: "斐濟", PG: "巴布亞新幾內亞",
  WS: "薩摩亞", TO: "東加", VU: "萬那杜", SB: "所羅門群島",
  NC: "新喀里多尼亞", PF: "法屬波里尼西亞", GU: "關島", AS: "美屬薩摩亞",
  CK: "庫克群島", NU: "紐埃", TL: "東帝汶",

  // Middle East
  AE: "阿聯酋", SA: "沙烏地阿拉伯", QA: "卡達", BH: "巴林",
  KW: "科威特", OM: "阿曼", JO: "約旦", LB: "黎巴嫩",
  IL: "以色列", PS: "巴勒斯坦", IQ: "伊拉克", IR: "伊朗",
  YE: "葉門", SY: "敘利亞", EG: "埃及",

  // Africa
  ZA: "南非", NG: "奈及利亞", KE: "肯亞", GH: "迦納", TZ: "坦尚尼亞",
  ET: "衣索比亞", UG: "烏干達", RW: "盧安達", SN: "塞內加爾", CI: "象牙海岸",
  CM: "喀麥隆", CD: "剛果民主共和國", CG: "剛果共和國", AO: "安哥拉", MZ: "莫三比克",
  MG: "馬達加斯加", MW: "馬拉威", ZM: "尚比亞", ZW: "辛巴威", BW: "波札那",
  NA: "納米比亞", SZ: "史瓦帝尼", LS: "賴索托", MU: "模里西斯", SC: "塞席爾",
  CV: "維德角", GA: "加彭", GQ: "赤道幾內亞", TD: "查德", NE: "尼日",
  ML: "馬利", BF: "布吉納法索", BJ: "貝南", TG: "多哥", SL: "獅子山",
  LR: "賴比瑞亞", GN: "幾內亞", GM: "甘比亞", GW: "幾內亞比索", MR: "茅利塔尼亞",
  DJ: "吉布地", SO: "索馬利亞", ER: "厄利垂亞", SS: "南蘇丹", CF: "中非共和國",
  BI: "蒲隆地", KM: "葛摩", ST: "聖多美普林西比", RE: "留尼旺", YT: "馬約特",
  MA: "摩洛哥", DZ: "阿爾及利亞", TN: "突尼西亞", LY: "利比亞", SD: "蘇丹",
};

/** Get Chinese name for a country code. Falls back to the code itself. */
export function getCountryNameZh(countryCode: string): string {
  return COUNTRY_NAME_ZH[countryCode.toUpperCase()] ?? countryCode;
}

/** Get continent for a single country code (uppercase). Returns "asia" as fallback. */
export function getContinent(countryCode: string): ContinentKey {
  return COUNTRY_TO_CONTINENT[countryCode.toUpperCase()] ?? "asia";
}

/** Detect multi-country product name prefix → Chinese name.
 *  All multi-country products go to "multi" (套餐) tab. */
const MULTI_COUNTRY_PREFIXES: [string, string][] = [
  // [english prefix, chinese name]
  ["singapore & malaysia & thailand", "新馬泰"],
  ["china mainland & japan & south korea", "中日韓"],
  ["china (mainland hk macao)", "中港澳"],
  ["usa & canada", "美加"],
  ["australia & new zealand", "澳紐"],
  ["north america", "北美"],
  ["asia-20", "亞洲 20區"],
  ["asia (20", "亞洲 20區"],
  ["asia (12", "亞洲 12區"],
  ["asia (7", "亞洲 7區"],
  ["asia", "亞洲"],
  ["europe (40+", "歐洲 40區+"],
  ["europe(30+", "歐洲 30區+"],
  ["europe", "歐洲"],
  ["balkans", "巴爾幹"],
  ["central asia", "中亞"],
  ["gcc", "海灣六國"],
  ["gulf region", "波斯灣"],
  ["middle east & north africa", "中東北非"],
  ["middle east", "中東"],
  ["south america", "南美"],
  ["caribbean", "加勒比海"],
  ["africa", "非洲"],
  ["global139", "全球 139區"],
  ["global (120+", "全球 120區+"],
  ["global", "全球"],
  ["world", "全球"],
];

/** Detect Chinese name from a multi-country product name. Always returns continent "multi". */
export function detectMultiInfo(productName: string): { continent: ContinentKey; nameZh: string } {
  const lower = productName.toLowerCase();
  for (const [prefix, nameZh] of MULTI_COUNTRY_PREFIXES) {
    if (lower.startsWith(prefix)) return { continent: "multi", nameZh };
  }
  return { continent: "multi", nameZh: "跨區" };
}

/** Check if a region string looks like multiple country codes (comma-separated) */
export function isMultiCountry(region: string): boolean {
  return region.includes(",");
}

// --- Popularity sort (lower = more popular, shown first) ---
// Based on Taiwan outbound travel patterns

const COUNTRY_POPULARITY: Record<string, number> = {
  // Top Asia destinations for Taiwanese travelers
  JP: 1, KR: 2, TH: 3, VN: 4, SG: 5, MY: 6, PH: 7, ID: 8,
  HK: 9, MO: 10, CN: 11, KH: 12, MM: 13, LA: 14, IN: 15,
  MV: 16, LK: 17, NP: 18, BN: 19, BD: 20,
  // Popular long-haul
  US: 1, CA: 2, GB: 3, FR: 4, DE: 5, IT: 6, ES: 7, AU: 8, NZ: 9,
  NL: 10, CH: 11, AT: 12, CZ: 13, PT: 14, GR: 15, TR: 16,
  HR: 17, IS: 18, NO: 19, SE: 20, DK: 21, FI: 22, IE: 23,
  BE: 24, HU: 25, PL: 26,
  // Middle East
  AE: 1, IL: 2, SA: 3, JO: 4, QA: 5, EG: 6, OM: 7, BH: 8, KW: 9,
  // Americas beyond US/CA
  MX: 3, BR: 4, AR: 5, CL: 6, PE: 7, CO: 8, CR: 9,
  // Africa
  ZA: 1, MA: 2, KE: 3, TZ: 4, NG: 6,
};

/** Multi-country package popularity (slug → order). Lower = shown first. */
const PACKAGE_POPULARITY: Record<string, number> = {
  // Small popular bundles first
  "singapore-malaysia-thailand": 1,
  "china-mainland-japan-south-korea": 2,
  "china-mainland-hk-macao": 3,
  "usa-canada": 4,
  "australia-new-zealand": 5,
  "north-america": 6,
  // Regional Asia
  "asia-7-areas": 10,
  "asia-12-areas": 11,
  "asia-20-areas": 12,
  "asia-20": 13,
  // Europe
  "europe-30-areas": 20,
  "europe-40-areas-morocco": 21,
  "europe": 22,
  "balkans-5-areas": 23,
  // Middle East / Other
  "gcc": 30,
  "gulf-region": 31,
  "middle-east": 32,
  "middle-east-north-africa": 33,
  "central-asia": 34,
  // Americas
  "south-america": 40,
  "caribbean-20-areas": 41,
  // Africa
  "africa": 50,
  // Global last
  "global-120-areas": 90,
  "global139": 91,
};

/** Get popularity rank for a single country (lower = more popular) */
export function getCountryPopularity(countryCode: string): number {
  return COUNTRY_POPULARITY[countryCode.toUpperCase()] ?? 999;
}

/** Get popularity rank for a multi-country package slug */
export function getPackagePopularity(slug: string): number {
  return PACKAGE_POPULARITY[slug] ?? 500;
}
