import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/lib/store";
import { ScanPayload } from "@/lib/types";

function isPayloadValid(body: Partial<ScanPayload>) {
  return (
    typeof body.version === "string" &&
    typeof body.totalScore === "number" &&
    typeof body.machineId === "string" &&
    typeof body.timestamp === "string" &&
    body.checks &&
    Array.isArray(body.skills)
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ScanPayload>;
    if (!isPayloadValid(body)) {
      return NextResponse.json({ error: "Invalid scan payload" }, { status: 400 });
    }

    const result = createReport(body as ScanPayload);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to process scan" }, { status: 500 });
  }
}
