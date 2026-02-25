import crypto from "crypto";

// --- ECPay Configuration ---

const ECPAY_CONFIG = {
  merchantId: process.env.ECPAY_MERCHANT_ID || "3002607",        // 測試商店代號
  hashKey: process.env.ECPAY_HASH_KEY || "pwFHCqoQZGmho4w6",    // 測試 HashKey
  hashIV: process.env.ECPAY_HASH_IV || "EkRm7iFT261dpevs",      // 測試 HashIV
  // 測試環境
  apiUrl: process.env.ECPAY_API_URL || "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5",
  returnUrl: process.env.ECPAY_RETURN_URL || "",                  // 背景通知 URL
  clientBackUrl: process.env.ECPAY_CLIENT_BACK_URL || "",         // 付完跳回 URL
};

// --- Types ---

export interface EcpayOrderParams {
  tradeNo: string;       // 訂單編號 (max 20 chars)
  tradeDate: string;     // yyyy/MM/dd HH:mm:ss
  totalAmount: number;   // NTD 整數
  itemName: string;      // 商品名稱
  email: string;
  productCode: string;   // 途鸽 productCode（存到 CustomField2）
}

// --- Helper: Generate CheckMacValue ---

function generateCheckMac(params: Record<string, string>): string {
  // 1. Sort by key alphabetically
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  // 2. Prepend HashKey, append HashIV
  const raw = `HashKey=${ECPAY_CONFIG.hashKey}&${sorted}&HashIV=${ECPAY_CONFIG.hashIV}`;

  // 3. URL encode (lowercase)
  const encoded = encodeURIComponent(raw)
    .toLowerCase()
    .replace(/%2d/g, "-")
    .replace(/%5f/g, "_")
    .replace(/%2e/g, ".")
    .replace(/%21/g, "!")
    .replace(/%2a/g, "*")
    .replace(/%28/g, "(")
    .replace(/%29/g, ")")
    .replace(/%20/g, "+");

  // 4. SHA256 hash, uppercase
  return crypto.createHash("sha256").update(encoded).digest("hex").toUpperCase();
}

// --- Build ECPay form data ---

export function buildEcpayForm(order: EcpayOrderParams): {
  action: string;
  fields: Record<string, string>;
} {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const params: Record<string, string> = {
    MerchantID: ECPAY_CONFIG.merchantId,
    MerchantTradeNo: order.tradeNo,
    MerchantTradeDate: order.tradeDate,
    PaymentType: "aio",
    TotalAmount: String(order.totalAmount),
    TradeDesc: "eSIM 購買",
    ItemName: order.itemName,
    ReturnURL: ECPAY_CONFIG.returnUrl || `${baseUrl}/api/ecpay/notify`,
    ClientBackURL: ECPAY_CONFIG.clientBackUrl || `${baseUrl}/order-complete`,
    ChoosePayment: "ALL",
    EncryptType: "1",
    OrderResultURL: `${baseUrl}/api/ecpay/result`,
    CustomField1: order.email,
    CustomField2: order.productCode,
  };

  params.CheckMacValue = generateCheckMac(params);

  return {
    action: ECPAY_CONFIG.apiUrl,
    fields: params,
  };
}

// --- Verify ECPay callback CheckMacValue ---

export function verifyEcpayCallback(params: Record<string, string>): boolean {
  const { CheckMacValue, ...rest } = params;
  if (!CheckMacValue) return false;
  const expected = generateCheckMac(rest);
  return expected === CheckMacValue;
}
