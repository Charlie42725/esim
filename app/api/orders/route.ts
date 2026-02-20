import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/api";
import { isApiConfigured } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productCode, quantity, expectedPrice, email } = body;

    if (!productCode || !email) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_INPUT", message: "Missing productCode or email" } },
        { status: 400 }
      );
    }

    if (!isApiConfigured()) {
      return NextResponse.json({
        success: true,
        data: {
          order: {
            orderId: `MOCK-${Date.now()}`,
            status: "completed",
            items: [],
          },
        },
      });
    }

    const result = await createOrder(productCode, quantity || 1, expectedPrice || 0);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL", message: "Failed to create order" } },
      { status: 500 }
    );
  }
}
