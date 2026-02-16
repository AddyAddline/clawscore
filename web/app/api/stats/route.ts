import { NextResponse } from "next/server";
import { getStatsSummary } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getStatsSummary());
}
