import { NextRequest, NextResponse } from "next/server";
import { buildEcpayForm, type EcpayOrderParams } from "@/lib/ecpay";

export async function POST(request: NextRequest) {
  try {
    const { productCode, productName, amount, email, countrySlug } =
      await request.json();

    if (!productCode || !amount || !email) {
      return NextResponse.json(
        { success: false, error: "缺少必要欄位" },
        { status: 400 }
      );
    }

    // Generate unique trade number (max 20 chars)
    const now = new Date();
    const tradeNo = `ES${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

    const tradeDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const order: EcpayOrderParams = {
      tradeNo,
      tradeDate,
      totalAmount: Math.round(amount),
      itemName: productName || "eSIM 方案",
      email,
    };

    const form = buildEcpayForm(order);

    // Return the form action + fields so the client can auto-submit
    return NextResponse.json({
      success: true,
      data: {
        action: form.action,
        fields: form.fields,
        tradeNo,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "建立訂單失敗" },
      { status: 500 }
    );
  }
}
