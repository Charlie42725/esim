import { NextRequest, NextResponse } from "next/server";
import { verifyEcpayCallback } from "@/lib/ecpay";
import { createOrder } from "@/lib/api";

// ECPay server-to-server payment notification (ReturnURL)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = String(value);
    });

    // Verify CheckMacValue
    if (!verifyEcpayCallback(params)) {
      return new NextResponse("0|CheckMacValue Error", { status: 200 });
    }

    const rtnCode = params.RtnCode;
    const tradeNo = params.MerchantTradeNo;

    if (rtnCode === "1") {
      // Payment successful — create eSIM order via weroam API
      // TODO: Look up productCode and email from your database using tradeNo
      // For now we log it; in production, store order mapping in DB
      console.log(`[ECPay] Payment success for trade: ${tradeNo}`);

      // Example: await createOrder(productCode, 1, expectedPrice);
    } else {
      console.log(`[ECPay] Payment failed for trade: ${tradeNo}, code: ${rtnCode}`);
    }

    // ECPay expects "1|OK" response
    return new NextResponse("1|OK", { status: 200 });
  } catch (err) {
    console.error("[ECPay notify error]", err);
    return new NextResponse("0|Error", { status: 200 });
  }
}
