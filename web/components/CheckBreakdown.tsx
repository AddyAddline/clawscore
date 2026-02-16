import { CHECK_LABELS, barColor, statusColor } from "@/lib/scoring";
import { ScanChecks } from "@/lib/types";

export function CheckBreakdown({ checks }: { checks: ScanChecks }) {
  return (
    <div className="space-y-3">
      {Object.entries(checks).map(([key, value]) => {
        const pct = Math.round((value.score / value.max) * 100);
        return (
          <details key={key} className="terminal-panel rounded-xl border border-zinc-800 bg-[#0b0d0c]/70 p-4 open:border-zinc-600">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-200">{CHECK_LABELS[key as keyof ScanChecks]}</p>
                  <p className={`text-xs ${statusColor(value.status)}`}>{value.details}</p>
                </div>
                <div className="font-mono text-sm text-zinc-300">
                  {value.score}/{value.max}
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded bg-zinc-800">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: barColor(value.score, value.max) }}
                />
              </div>
            </summary>
            <div className="mt-3 border-t border-zinc-800 pt-3 text-xs text-zinc-400">
              Status: <span className={statusColor(value.status)}>{value.status.toUpperCase()}</span>
            </div>
          </details>
        );
      })}
    </div>
  );
}
