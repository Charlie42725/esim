import { NextRequest, NextResponse } from "next/server";
import { verifyEcpayCallback } from "@/lib/ecpay";
import { createTugeOrder } from "@/lib/api";
import { randomUUID } from "crypto";

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
    const email = params.CustomField1 || "";
    const productCode = params.CustomField2 || "";

    if (rtnCode === "1") {
      // Payment successful — create eSIM order via TuGe API
      console.log(`[ECPay] Payment success for trade: ${tradeNo}, email: ${email}, productCode: ${productCode}`);

      if (productCode && email) {
        const idempotencyKey = randomUUID();
        const result = await createTugeOrder(
          productCode,
          email,
          tradeNo,
          idempotencyKey
        );

        if (result.success) {
          console.log(`[TuGe] Order created: ${result.orderNo} for trade: ${tradeNo}`);
        } else {
          console.error(`[TuGe] Order failed for trade ${tradeNo}:`, result.error);
        }
      } else {
        console.warn(`[ECPay] Missing productCode or email for trade: ${tradeNo}`);
      }
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
