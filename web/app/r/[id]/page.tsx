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
    <main className="mx-auto max-w-5xl px-6 pb-20 pt-10">
      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <ScoreGauge score={report.totalScore} />

        <div className="card animate-fade-in-up p-6">
          <p className="font-mono text-xs text-zinc-500">Report {report.reportId}</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-100">
            Security Report
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Safer than {percentile}% of scanned OpenClaw installs.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-[var(--bg-primary)] p-3">
              <p className="text-[11px] text-zinc-500">Version</p>
              <p className="mt-0.5 font-mono text-sm text-zinc-200">{report.version}</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-primary)] p-3">
              <p className="text-[11px] text-zinc-500">Generated</p>
              <p className="mt-0.5 font-mono text-sm text-zinc-200">{new Date(report.createdAt).toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-primary)] p-3">
              <p className="text-[11px] text-zinc-500">Skills</p>
              <p className="mt-0.5 font-mono text-sm text-zinc-200">{report.skills.length} installed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-sm font-medium text-zinc-300">Category Breakdown</h2>
        <CheckBreakdown checks={report.checks} />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-sm font-medium text-zinc-300">Fixes</h2>
        <div className="space-y-3">
          {fixes.map((item, idx) => (
            <FixCard key={`${item.title}-${idx}`} item={item} index={idx} />
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm font-medium text-zinc-200">Share this report</p>
          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-1.5 text-[11px] text-zinc-500">Report URL</p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={reportUrl}
                  className="flex-1 rounded-lg bg-[var(--bg-primary)] px-3 py-2 font-mono text-xs text-zinc-400 outline-none"
                />
                <CopyButton text={reportUrl} label="Copy" size="md" />
              </div>
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?text=${tweetText}`}
              className="block rounded-xl bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-blue-400 transition-colors hover:text-blue-300"
            >
              Share on X (Twitter)
            </a>
            <Link
              href={`/badge/${report.reportId}`}
              className="block rounded-xl bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Get embed badge
            </Link>
          </div>
        </div>

        <div className="card p-5">
          <p className="text-sm font-medium text-zinc-200">Need help?</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            SetupMyClaw offers professional hardening and guided remediation for teams running OpenClaw in production.
          </p>
          <a
            href="https://setupmyclaw.in"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-lg bg-emerald-500/10 px-3.5 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
          >
            Book a security setup
          </a>
        </div>
      </section>
    </main>
  );
}
