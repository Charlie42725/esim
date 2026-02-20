export const config = {
  esim: {
    apiKey: process.env.ESIM_API_KEY || "",
    baseUrl:
      process.env.ESIM_API_BASE_URL ||
      "https://partner.weroam.xyz/api/v1",
  },
} as const;

export function isApiConfigured(): boolean {
  return config.esim.apiKey.length > 0;
}
