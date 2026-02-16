import Link from "next/link";
import { CheckBreakdown } from "@/components/CheckBreakdown";
import { CopyButton } from "@/components/CopyButton";
import { FixCard } from "@/components/FixCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import { getFixesForChecks, percentileFromScore } from "@/lib/scoring";
import { getReport } from "@/lib/store";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReport(id);
  const fixes = getFixesForChecks(report.checks);
  const percentile = percentileFromScore(report.totalScore);

  const reportUrl = `https://clawscore.setupmyclaw.in/r/${report.reportId}`;
  const tweetText = encodeURIComponent(
    `I scored ${report.totalScore}/100 on ClawScore — the free community security scanner for OpenClaw.\n\nCheck yours: ${reportUrl}`
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6">
      <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <ScoreGauge score={report.totalScore} />

        <article className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">Report ID: {report.reportId}</p>
          <h1 className="mt-2 text-3xl text-zinc-100">Security Report</h1>
          <p className="mt-2 text-sm text-zinc-400">Safer than {percentile}% of scanned OpenClaw installs.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-black/30 p-3">
              <p className="text-xs text-zinc-500">Version</p>
              <p className="font-mono text-zinc-200">{report.version}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-black/30 p-3">
              <p className="text-xs text-zinc-500">Generated</p>
              <p className="font-mono text-zinc-200">{new Date(report.createdAt).toLocaleString()}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-black/30 p-3">
              <p className="text-xs text-zinc-500">Installed Skills</p>
              <p className="font-mono text-zinc-200">{report.skills.length}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Category Breakdown</h2>
        <CheckBreakdown checks={report.checks} />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Fixes (Priority Order)</h2>
        <div className="space-y-4">
          {fixes.map((item, idx) => (
            <FixCard key={`${item.title}-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Share This Report</h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 text-xs text-zinc-500">Report URL</p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={reportUrl}
                  className="flex-1 rounded border border-zinc-800 bg-black/30 px-3 py-2 font-mono text-xs text-zinc-300"
                />
                <CopyButton text={reportUrl} label="Copy" size="md" />
              </div>
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?text=${tweetText}`}
              className="block rounded border border-zinc-800 bg-black/30 px-3 py-2.5 text-sm text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Share on X (Twitter)
            </a>
            <Link
              href={`/badge/${report.reportId}`}
              className="block rounded border border-zinc-800 bg-black/30 px-3 py-2.5 text-sm text-emerald-300 transition-colors hover:text-emerald-200"
            >
              Get embed badge for your README
            </Link>
          </div>
        </article>

        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Need Help?</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            SetupMyClaw offers professional hardening and guided remediation for teams running OpenClaw in production.
          </p>
          <a
            href="https://setupmyclaw.in"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Book a security setup
          </a>
        </article>
      </section>
    </main>
  );
}
