import { BarChart3, PieChart, TrendingUp } from "lucide-react";

type DistributionProps = { bins: number[] };
type IssueProps = { data: Record<string, number> };
type TrendProps = { points: Array<{ date: string; score: number }> };

function binColor(idx: number): string {
  if (idx >= 8) return "#34d399";
  if (idx >= 5) return "#fbbf24";
  return "#f87171";
}

export function DistributionChart({ bins }: DistributionProps) {
  const max = Math.max(...bins, 1);
  return (
    <section className="card p-5">
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-200">
        <BarChart3 className="h-4 w-4 text-emerald-400" /> Score Distribution
      </div>
      <div className="grid h-40 grid-cols-10 items-end gap-1.5">
        {bins.map((value, idx) => (
          <div key={idx} className="group flex h-full flex-col justify-end">
            <div
              className="rounded-t transition-all duration-200 group-hover:opacity-80"
              style={{
                height: `${Math.max(8, (value / max) * 100)}%`,
                backgroundColor: binColor(idx),
                opacity: 0.7,
              }}
            />
            <span className="mt-2 text-center font-mono text-[10px] text-zinc-600">{idx * 10}</span>
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
    <section className="card p-5">
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-200">
        <PieChart className="h-4 w-4 text-yellow-400" /> Issues by Category
      </div>
      <div className="space-y-3">
        {entries.map(([key, value]) => {
          const pct = Math.round((value / total) * 100);
          return (
            <div key={key}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="capitalize text-zinc-400">{key}</span>
                <span className="text-zinc-500">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-800/80">
                <div className="h-full rounded-full bg-yellow-400/70 transition-all duration-300" style={{ width: `${pct}%` }} />
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
    <section className="card p-5">
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-zinc-200">
        <TrendingUp className="h-4 w-4 text-blue-400" /> Trend Over Time
      </div>
      <div className="relative h-40 rounded-xl bg-[var(--bg-primary)] p-4">
        <svg viewBox="0 0 300 120" className="h-full w-full">
          <polyline
            fill="none"
            stroke="#34d399"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={points
              .map((point, idx) => {
                const x = (idx / Math.max(points.length - 1, 1)) * 280 + 10;
                const y = 110 - ((point.score - min) / range) * 95;
                return `${x},${y}`;
              })
              .join(" ")}
          />
        </svg>
        <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
          {points.map((point) => (
            <span key={point.date}>{point.date.slice(5)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
