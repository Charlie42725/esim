import { NextResponse } from "next/server";
import { getCountries } from "@/lib/api";

export async function GET() {
  try {
    const countries = await getCountries();
    return NextResponse.json({ success: true, data: countries });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL", message: "Failed to fetch products" } },
      { status: 500 }
    );
  }
}
