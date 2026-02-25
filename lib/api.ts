import "server-only";
import { config, isTugeConfigured } from "./config";
import { getStaticCountries, type Country } from "./data";

// ---------------------------------------------------------------------------
// 途鸽 (TuGe) API Client
// ---------------------------------------------------------------------------

// --- Token 快取（記憶體內，24h 有效）---

let cachedToken: string | null = null;
let tokenExpiresAt = 0; // Unix ms

/**
 * 取得途鸽 access token（POST /oauth/token）
 * 回傳的 token 有效期 24 小時，這裡用記憶體快取，提前 5 分鐘刷新。
 */
export async function getToken(): Promise<string> {
  // 若快取中的 token 還有超過 5 分鐘有效期，直接回傳
  if (cachedToken && Date.now() < tokenExpiresAt - 5 * 60 * 1000) {
    return cachedToken;
  }

  const url = `${config.tuge.baseUrl}/oauth/token`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      accountId: config.tuge.accountId,
      secret: config.tuge.secret,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`[TuGe] Failed to get token: HTTP ${res.status}`);
  }

  const json = await res.json();
  if (json.code !== "0000" || !json.data?.token) {
    throw new Error(`[TuGe] Token error: ${json.msg || JSON.stringify(json)}`);
  }

  const token: string = json.data.token;
  cachedToken = token;
  // expires 是秒數（預設 86400 = 24h）
  const expiresSec = json.data.expires || 86400;
  tokenExpiresAt = Date.now() + expiresSec * 1000;

  return token;
}

// --- 下單 API ---

export interface TugeOrderResult {
  success: boolean;
  orderNo?: string;
  error?: string;
}

/**
 * 途鸽下單 — POST /eSIMApi/v2/order/create
 *
 * @param productCode  途鸽產品編碼
 * @param email        客戶 email（途鸽會寄 QR code）
 * @param channelOrderNo  渠道訂單號（我們的 tradeNo）
 * @param idempotencyKey  冪等 key（UUID v4）
 */
export async function createTugeOrder(
  productCode: string,
  email: string,
  channelOrderNo: string,
  idempotencyKey: string
): Promise<TugeOrderResult> {
  if (!isTugeConfigured()) {
    console.warn("[TuGe] Not configured, skipping order creation");
    return { success: false, error: "TuGe API not configured" };
  }

  const token = await getToken();
  const url = `${config.tuge.baseUrl}/eSIMApi/v2/order/create`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productCode,
      email,
      channelOrderNo,
      idempotencyKey,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[TuGe] Order API HTTP ${res.status}:`, text);
    return { success: false, error: `HTTP ${res.status}` };
  }

  const json = await res.json();
  console.log("[TuGe] Order response:", JSON.stringify(json));

  if (json.code === "0000" && json.data?.orderNo) {
    return { success: true, orderNo: json.data.orderNo };
  }

  return {
    success: false,
    error: `${json.code}: ${json.msg || "Unknown error"}`,
  };
}

// ---------------------------------------------------------------------------
// 靜態資料存取（給前端 / 頁面用）
// ---------------------------------------------------------------------------

export async function getCountries(): Promise<Country[]> {
  return getStaticCountries();
}

export async function getCountryBySlugFromApi(
  slug: string
): Promise<Country | undefined> {
  const countries = await getCountries();
  return countries.find((c) => c.slug === slug);
}
