import { AnimatedCounter } from "@/components/AnimatedCounter";
import { DistributionChart, IssueChart, TrendChart } from "@/components/StatsCharts";
import { getStatsSummary } from "@/lib/store";

export default function StatsPage() {
  const stats = getStatsSummary();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6">
      <h1 className="animate-fade-in text-3xl text-zinc-100">Community Security Dashboard</h1>
      <p className="mt-2 text-sm text-zinc-400">Live telemetry from anonymized ClawScore scan uploads.</p>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <p className="text-xs text-zinc-500">Total scans</p>
          <AnimatedCounter end={stats.totalScans} className="font-mono text-4xl text-emerald-300" />
        </div>
        <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5" style={{ animationDelay: "100ms" }}>
          <p className="text-xs text-zinc-500">Scans today</p>
          <AnimatedCounter end={stats.scansToday} className="font-mono text-4xl text-cyan-300" />
        </div>
        <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5" style={{ animationDelay: "200ms" }}>
          <p className="text-xs text-zinc-500">Average score</p>
          <AnimatedCounter end={stats.averageScore} suffix="/100" className="font-mono text-4xl text-yellow-300" />
        </div>
        <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5" style={{ animationDelay: "300ms" }}>
          <p className="text-xs text-zinc-500">CVE patched</p>
          <AnimatedCounter end={stats.cvePatched} suffix="%" className="font-mono text-4xl text-emerald-300" />
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <DistributionChart bins={stats.scoreDistribution} />
        <IssueChart data={stats.issueBreakdown} />
        <TrendChart points={stats.trend} />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Version Adoption</h2>
          <div className="mt-4 space-y-3">
            {stats.versions.map((version) => (
              <div key={version.label}>
                <div className="mb-1 flex justify-between text-xs text-zinc-400">
                  <span>{version.label}</span>
                  <span>{version.value}%</span>
                </div>
                <div className="h-2 rounded bg-zinc-800">
                  <div className="h-full rounded bg-cyan-400/80 transition-all duration-300" style={{ width: `${version.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {stats.recentActivity.map((item, i) => (
              <li
                key={item.message}
                className="animate-fade-in-up rounded border border-zinc-800 bg-black/30 px-3 py-2 text-zinc-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p>{item.message}</p>
                <p className="mt-1 font-mono text-[10px] text-zinc-500">{item.time}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
