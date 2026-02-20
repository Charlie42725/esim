import "server-only";
import { config, isApiConfigured } from "./config";
import { getFallbackCountries, type Country, type Plan } from "./data";
import { getContinent, getCountryNameZh, detectMultiInfo, isMultiCountry } from "./continents";

// --- API response types (matching weroam API docs) ---

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

interface ApiProduct {
  code: string;
  name: string;
  price: number; // USD cents (wholesale)
  retailPrice: number; // USD cents (suggested retail)
  currency: string;
  dataBytes: number;
  duration: { amount: number; unit: string };
  region: string;
  coverage_areas: string[];
  speed: string;
  networkType: string;
  activationMethod: string;
  locationNetworkList: {
    locationCode: string;
    locationName: string;
    locationLogo: string;
    operatorList: { operatorName: string; networkType: string }[];
  }[];
}

interface ApiProductsResponse {
  products: ApiProduct[];
  pagination: { total: number; page: number; perPage: number; totalPages: number };
}

interface ApiOrder {
  orderId: string;
  status: string;
  totalAmount: number;
  currency: string;
  items: {
    productCode: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    status: string;
    esimProfiles?: {
      iccid: string;
      qrCodeUrl: string;
      activationCode: string;
      expiresAt: string;
    }[];
  }[];
  [key: string]: unknown;
}

interface ApiOrderCreateResponse {
  order: ApiOrder;
}

// --- Low-level fetch helpers ---

async function apiPost<T>(
  endpoint: string,
  body?: Record<string, unknown>
): Promise<ApiEnvelope<T>> {
  const url = `${config.esim.baseUrl}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": config.esim.apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    return {
      success: false,
      error: err?.error || { code: "HTTP_ERROR", message: `HTTP ${res.status}` },
    };
  }

  return res.json();
}

async function apiGet<T>(endpoint: string): Promise<ApiEnvelope<T>> {
  const url = `${config.esim.baseUrl}${endpoint}`;
  const res = await fetch(url, {
    headers: { "X-API-Key": config.esim.apiKey },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    return {
      success: false,
      error: err?.error || { code: "HTTP_ERROR", message: `HTTP ${res.status}` },
    };
  }

  return res.json();
}

// --- Product fetching ---

export async function fetchProducts(
  regionCode?: string,
  page = 1,
  perPage = 100
): Promise<ApiEnvelope<ApiProductsResponse>> {
  const body: Record<string, unknown> = { page, perPage };
  if (regionCode) body.regionCode = regionCode;
  return apiPost<ApiProductsResponse>("/products/list", body);
}

// --- Order creation ---

export async function createOrder(
  productCode: string,
  quantity: number,
  expectedPrice: number
): Promise<ApiEnvelope<ApiOrderCreateResponse>> {
  const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return apiPost<ApiOrderCreateResponse>("/orders/create", {
    idempotencyKey,
    products: [{ productCode, quantity, expectedPrice }],
  });
}

// --- Order lookup ---

export async function getOrder(
  orderId: string
): Promise<ApiEnvelope<{ order: ApiOrder }>> {
  return apiGet<{ order: ApiOrder }>(`/orders/${orderId}`);
}

// --- Helpers ---

function regionCodeToFlag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

function formatDataBytes(bytes: number): string {
  if (bytes >= 1073741824) {
    const gb = bytes / 1073741824;
    return gb % 1 === 0 ? `${gb}GB` : `${gb.toFixed(1)}GB`;
  }
  const mb = bytes / 1048576;
  return mb % 1 === 0 ? `${mb}MB` : `${mb.toFixed(0)}MB`;
}

// --- Data mapping: API products → Country/Plan ---

// USD cents → NTD (approximate, configurable)
const USD_TO_NTD = 32;

function centsToNTD(usdCents: number): number {
  return Math.round((usdCents / 100) * USD_TO_NTD);
}

/** Generate a Chinese plan name from data + days, e.g. "3GB / 15天" */
function formatPlanNameZh(dataStr: string, days: number): string {
  return `${dataStr} / ${days}天`;
}

function mapProductsToCountries(products: ApiProduct[]): Country[] {
  const countryMap = new Map<string, Country>();

  for (const p of products) {
    const region = p.region;
    const regionKey = region.toLowerCase();
    const multi = isMultiCountry(regionKey);

    const dataStr = formatDataBytes(p.dataBytes);
    const plan: Plan = {
      id: p.code,
      name: formatPlanNameZh(dataStr, p.duration.amount),
      days: p.duration.amount,
      data: dataStr,
      price: centsToNTD(p.retailPrice),
    };

    // For multi-country: derive short slug from product name prefix
    // e.g. "Asia (12 areas) 1GB 7Days" → "asia-12-areas"
    const slug = multi
      ? p.name.replace(/\s*\d+\s*(GB|MB|Day|day).*/i, "").trim()
          .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")
      : regionKey;
    const existing = countryMap.get(slug);

    if (existing) {
      existing.plans.push(plan);
    } else {
      const multiInfo = multi ? detectMultiInfo(p.name) : null;
      const continent = multiInfo ? multiInfo.continent : getContinent(region);

      countryMap.set(slug, {
        slug,
        name: multi
          ? multiInfo!.nameZh
          : getCountryNameZh(region),
        flag: multi ? "🌍" : regionCodeToFlag(region),
        startingPrice: plan.price,
        continent,
        plans: [plan],
      });
    }
  }

  // Update startingPrice to the minimum plan price
  for (const country of countryMap.values()) {
    country.plans.sort((a, b) => a.price - b.price);
    country.startingPrice = country.plans[0].price;
  }

  return Array.from(countryMap.values());
}

// --- Public data accessors (with fallback) ---

async function fetchAllProducts(): Promise<ApiProduct[]> {
  const all: ApiProduct[] = [];
  let page = 1;
  while (true) {
    const res = await fetchProducts(undefined, page, 100);
    if (!res.success || !res.data) break;
    all.push(...res.data.products);
    if (page >= res.data.pagination.totalPages) break;
    page++;
  }
  return all;
}

export async function getCountries(): Promise<Country[]> {
  if (!isApiConfigured()) {
    return getFallbackCountries();
  }

  try {
    const products = await fetchAllProducts();
    if (products.length > 0) {
      return mapProductsToCountries(products);
    }
  } catch {
    // API unreachable — fall through to fallback
  }

  return getFallbackCountries();
}

export async function getCountryBySlugFromApi(
  slug: string
): Promise<Country | undefined> {
  const countries = await getCountries();
  return countries.find((c) => c.slug === slug);
}
