import { NextResponse } from "next/server";
import { getStaticCountries } from "@/lib/data";

export async function GET() {
  const countries = getStaticCountries();
  return NextResponse.json({ success: true, data: countries });
}
