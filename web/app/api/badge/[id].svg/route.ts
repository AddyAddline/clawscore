import { NextResponse } from "next/server";
import { getReport } from "@/lib/store";

function scoreColor(score: number) {
  if (score >= 80) return "#22c55e";
  if (score >= 50) return "#eab308";
  return "#ef4444";
}

export async function GET(_: Request, { params }: { params: Promise<Record<string, string>> }) {
  const id = (await params).id ?? "x7Kj9mP";
  const report = getReport(id);
  const color = scoreColor(report.totalScore);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="210" height="36" role="img" aria-label="ClawScore ${report.totalScore}/100">
  <rect width="210" height="36" fill="#101010" rx="8"/>
  <rect x="118" width="92" height="36" fill="${color}" rx="8"/>
  <rect x="118" width="10" height="36" fill="${color}"/>
  <text x="16" y="23" fill="#d4d4d8" font-family="JetBrains Mono, monospace" font-size="12">ClawScore</text>
  <text x="151" y="23" fill="#0a0a0a" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">${report.totalScore}/100</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
