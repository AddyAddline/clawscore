import { CHECK_LABELS, barColor, statusColor } from "@/lib/scoring";
import { ScanChecks } from "@/lib/types";

export function CheckBreakdown({ checks }: { checks: ScanChecks }) {
  return (
    <div className="space-y-2">
      {Object.entries(checks).map(([key, value]) => {
        const pct = Math.round((value.score / value.max) * 100);
        return (
          <details key={key} className="card group p-4 open:border-[var(--border-hover)]">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">{CHECK_LABELS[key as keyof ScanChecks]}</p>
                  <p className={`mt-0.5 text-xs ${statusColor(value.status)}`}>{value.details}</p>
                </div>
                <span className="shrink-0 font-mono text-sm text-zinc-400">
                  {value.score}/{value.max}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800/80">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: barColor(value.score, value.max) }}
                />
              </div>
            </summary>
            <div className="mt-3 border-t border-[var(--border)] pt-3 text-xs text-zinc-500">
              Status: <span className={`font-medium ${statusColor(value.status)}`}>{value.status.toUpperCase()}</span>
            </div>
          </details>
        );
      })}
    </div>
  );
}
