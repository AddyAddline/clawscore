import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DistributionChart, IssueChart, TrendChart } from "@/components/StatsCharts";
import { getStatsSummary } from "@/lib/store";

export default function StatsPage() {
  const stats = getStatsSummary();

  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 pt-10">
      <h1 className="animate-fade-in font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-100">
        Community Dashboard
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Live telemetry from anonymized ClawScore uploads.</p>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total scans", value: stats.totalScans, color: "text-emerald-400" },
          { label: "Scans today", value: stats.scansToday, color: "text-blue-400" },
          { label: "Average score", value: stats.averageScore, suffix: "/100", color: "text-yellow-400" },
          { label: "CVE patched", value: stats.cvePatched, suffix: "%", color: "text-emerald-400" },
        ].map((stat, i) => (
          <div key={stat.label} className="card animate-fade-in-up p-5" style={{ animationDelay: `${i * 80}ms` }}>
            <p className="text-[11px] text-zinc-500">{stat.label}</p>
            <AnimatedCounter
              end={stat.value}
              suffix={stat.suffix}
              className={`font-mono text-3xl font-bold ${stat.color}`}
            />
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-3 lg:grid-cols-3">
        <DistributionChart bins={stats.scoreDistribution} />
        <IssueChart data={stats.issueBreakdown} />
        <TrendChart points={stats.trend} />
      </section>

      <section className="mt-6 grid gap-3 lg:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm font-medium text-zinc-200">Version adoption</p>
          <div className="mt-4 space-y-3">
            {stats.versions.map((version) => (
              <div key={version.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-zinc-400">{version.label}</span>
                  <span className="text-zinc-500">{version.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800/80">
                  <div className="h-full rounded-full bg-blue-400/60 transition-all duration-300" style={{ width: `${version.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="text-sm font-medium text-zinc-200">Recent activity</p>
          <div className="mt-4 space-y-2">
            {stats.recentActivity.map((item) => (
              <div key={item.message} className="rounded-xl bg-[var(--bg-primary)] px-3.5 py-2.5">
                <p className="text-sm text-zinc-400">{item.message}</p>
                <p className="mt-0.5 font-mono text-[10px] text-zinc-600">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
