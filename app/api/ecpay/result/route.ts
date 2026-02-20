import { NextRequest, NextResponse } from "next/server";
import { verifyEcpayCallback } from "@/lib/ecpay";

// ECPay OrderResultURL — user gets redirected here after payment
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = String(value);
    });

    const verified = verifyEcpayCallback(params);
    const success = verified && params.RtnCode === "1";
    const tradeNo = params.MerchantTradeNo || "";
    const email = params.CustomField1 || "";

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (success) {
      // Redirect to order complete page
      return NextResponse.redirect(
        `${baseUrl}/order-complete?orderId=${tradeNo}&email=${encodeURIComponent(email)}&status=success`,
        303
      );
    }

    // Payment failed — redirect back
    return NextResponse.redirect(
      `${baseUrl}/order-complete?orderId=${tradeNo}&status=failed`,
      303
    );
  } catch {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/order-complete?status=error`, 303);
  }
}
