export const config = {
  tuge: {
    accountId: process.env.TUGE_ACCOUNT_ID || "",
    secret: process.env.TUGE_SECRET || "",
    baseUrl:
      process.env.TUGE_BASE_URL ||
      "https://enterpriseapisandbox.tugegroup.com:8070/openapi",
  },
} as const;

export function isTugeConfigured(): boolean {
  return config.tuge.accountId.length > 0 && config.tuge.secret.length > 0;
}
