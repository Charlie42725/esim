import { NextResponse } from "next/server";

// 下單流程已移至 ECPay notify 回調中自動觸發途鸽下單
// 此 route 保留作為未來途鸽訂單查詢用途
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: "DEPRECATED",
        message: "Order creation is now handled via ECPay payment flow",
      },
    },
    { status: 410 }
  );
}
