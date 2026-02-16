import { BarChart3, PieChart, TrendingUp } from "lucide-react";

type DistributionProps = { bins: number[] };
type IssueProps = { data: Record<string, number> };
type TrendProps = { points: Array<{ date: string; score: number }> };

function binColor(idx: number): string {
  if (idx >= 8) return "from-emerald-500/90 to-emerald-400/90";
  if (idx >= 5) return "from-yellow-500/80 to-yellow-400/80";
  return "from-red-500/80 to-red-400/80";
}

export function DistributionChart({ bins }: DistributionProps) {
  const max = Math.max(...bins, 1);
  return (
    <section className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
      <div className="mb-4 flex items-center gap-2 text-sm text-zinc-300">
        <BarChart3 className="h-4 w-4 text-emerald-400" /> Score Distribution
      </div>
      <div className="grid h-40 grid-cols-10 items-end gap-2">
        {bins.map((value, idx) => (
          <div key={idx} className="group flex h-full flex-col justify-end">
            <div
              className={`rounded-t bg-gradient-to-t transition-all duration-200 group-hover:scale-105 ${binColor(idx)}`}
              style={{ height: `${Math.max(10, (value / max) * 100)}%` }}
            />
            <span className="mt-2 text-center font-mono text-[10px] text-zinc-500">{idx * 10}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IssueChart({ data }: IssueProps) {
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  return (
    <section className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
      <div className="mb-4 flex items-center gap-2 text-sm text-zinc-300">
        <PieChart className="h-4 w-4 text-yellow-400" /> Issues Breakdown
      </div>
      <div className="space-y-2">
        {entries.map(([key, value]) => {
          const pct = Math.round((value / total) * 100);
          return (
            <div key={key}>
              <div className="mb-1 flex justify-between text-xs text-zinc-400">
                <span className="uppercase">{key}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded bg-zinc-800">
                <div className="h-full rounded bg-yellow-400/80 transition-all duration-300" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TrendChart({ points }: TrendProps) {
  const min = Math.min(...points.map((point) => point.score));
  const max = Math.max(...points.map((point) => point.score));
  const range = Math.max(max - min, 1);

  return (
    <section className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
      <div className="mb-4 flex items-center gap-2 text-sm text-zinc-300">
        <TrendingUp className="h-4 w-4 text-cyan-400" /> Trend Over Time
      </div>
      <div className="relative h-44 rounded border border-zinc-800 bg-black/20 p-3">
        <svg viewBox="0 0 300 120" className="h-full w-full">
          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            points={points
              .map((point, idx) => {
                const x = (idx / Math.max(points.length - 1, 1)) * 280 + 10;
                const y = 110 - ((point.score - min) / range) * 95;
                return `${x},${y}`;
              })
              .join(" ")}
          />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
          {points.map((point) => (
            <span key={point.date}>{point.date.slice(5)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
