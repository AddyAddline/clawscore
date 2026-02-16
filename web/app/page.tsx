import Link from "next/link";
import { AlertTriangle, Fingerprint, Lock, Network, Shield, Wrench, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BrandLogo } from "@/components/BrandLogo";
import { CommandCopy } from "@/components/CommandCopy";
import { HowItWorks } from "@/components/HowItWorks";
import { TypewriterTerminal } from "@/components/TypewriterTerminal";
import { commandToRun, recentActivity, sampleFixes } from "@/lib/sample-data";
import { getStatsSummary } from "@/lib/store";
import { levelColor } from "@/lib/scoring";

const checks = [
  { label: "Version", icon: Shield, text: "Patch status and CVE exposure" },
  { label: "Auth", icon: Lock, text: "Gateway auth and token controls" },
  { label: "Network", icon: Network, text: "External interface exposure" },
  { label: "Skills", icon: Zap, text: "Malicious and unverified skills" },
  { label: "Permissions", icon: Fingerprint, text: "Credential file hardening" },
  { label: "Process", icon: Wrench, text: "Root/runtime risk checks" },
  { label: "SSL", icon: AlertTriangle, text: "TLS trust and certificate quality" },
];

const typingLines = [
  "[scan] probing gateway config...",
  "[scan] checking CVE version floor...",
  "[scan] auditing installed skills...",
  "[scan] generating fix playbook...",
  "[done] score: 73 / 100",
];

export default function Home() {
  const stats = getStatsSummary();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ClawScore",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Linux, macOS, Windows",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Free community security scanner for OpenClaw. Check your setup in 30 seconds.",
    url: "https://clawscore.setupmyclaw.in",
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ===== Hero ===== */}
      <section className="animate-fade-in relative overflow-hidden rounded-3xl border border-zinc-800 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.2),transparent_38%),#0b0b0b] p-8 md:p-12">
        <div className="scanline-overlay" />

        <BrandLogo size="lg" />

        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
          Help your <span className="gradient-text">OpenClaw</span> stay secure
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
          A free, open-source security scanner built by the community, for the community. Check your setup in 30 seconds and get actionable fixes.
        </p>

        <div className="mt-8">
          <CommandCopy command={commandToRun} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-sm text-zinc-400">
          <span>
            <AnimatedCounter end={stats.totalScans} className="text-emerald-400" /> scans
          </span>
          <span>
            Avg score: <AnimatedCounter end={stats.averageScore} className="text-yellow-400" />/100
          </span>
          <span>
            <AnimatedCounter end={stats.cvePatched} suffix="%" className="text-cyan-400" /> CVE patched
          </span>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <HowItWorks />

      {/* ===== What We Check ===== */}
      <section className="mt-14">
        <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">What We Check</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {checks.map((item, i) => (
            <article
              key={item.label}
              className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/70 p-5 transition hover:border-zinc-600"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <item.icon className="mb-3 h-5 w-5 text-emerald-400" />
              <h3 className="font-medium text-zinc-100">{item.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== See What You Get + Community Pulse ===== */}
      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="terminal-panel animate-slide-in-left rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">See What You Get</h2>
          <div className="mt-4">
            <TypewriterTerminal lines={typingLines} speed={25} lineDelay={350} />
          </div>
          <Link
            href="/r/x7Kj9mP"
            className="mt-4 inline-block text-sm text-cyan-300 transition-colors hover:text-cyan-200"
          >
            View full sample report &rarr;
          </Link>
        </article>

        <article className="terminal-panel animate-slide-in-right rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Community Pulse</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            {recentActivity.map((line, i) => (
              <li
                key={line}
                className="animate-fade-in-up flex items-start gap-2.5 rounded border border-zinc-800 bg-black/30 px-3 py-2.5"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500/80" />
                {line}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ===== Live Stats Preview ===== */}
      <section className="mt-14">
        <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">Community Stats</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
            <p className="text-xs text-zinc-500">Total scans</p>
            <AnimatedCounter end={stats.totalScans} className="font-mono text-3xl text-emerald-300" />
          </div>
          <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5" style={{ animationDelay: "100ms" }}>
            <p className="text-xs text-zinc-500">Average score</p>
            <AnimatedCounter end={stats.averageScore} suffix="/100" className="font-mono text-3xl text-yellow-300" />
          </div>
          <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5" style={{ animationDelay: "200ms" }}>
            <p className="text-xs text-zinc-500">CVE patched</p>
            <AnimatedCounter end={stats.cvePatched} suffix="%" className="font-mono text-3xl text-emerald-300" />
          </div>
          <div className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5" style={{ animationDelay: "300ms" }}>
            <p className="text-xs text-zinc-500">Scans today</p>
            <AnimatedCounter end={stats.scansToday} className="font-mono text-3xl text-cyan-300" />
          </div>
        </div>
      </section>

      {/* ===== FAQ + Top Remediations ===== */}
      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">Is it safe to run?</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Yes. The scanner is fully auditable shell script. It reads local config, runs no background processes, and only uploads with your explicit consent.
              </p>
            </details>
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">What data is uploaded?</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Version, category scores, skill names, and a hashed machine ID. No keys, secrets, or file contents ever leave your machine.
              </p>
            </details>
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">How is the score calculated?</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Weighted checks across 7 categories: version, auth, network, skills, permissions, process, and TLS. Each contributes to a 0-100 score.
              </p>
            </details>
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">Can I run it without uploading?</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Absolutely. Use <code className="text-emerald-300">--local</code> to keep everything on your machine, or <code className="text-emerald-300">--anonymous</code> to upload without any machine identifier.
              </p>
            </details>
          </div>
        </article>

        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Top Remediations</h2>
          <p className="mt-2 text-xs text-zinc-500">Most common fixes across the community</p>
          <ol className="mt-4 space-y-3">
            {sampleFixes.slice(0, 3).map((fix) => (
              <li key={fix.title} className="rounded border border-zinc-800 bg-black/30 px-3 py-3 text-sm text-zinc-300">
                <span className={`mr-2 inline-block rounded-full border px-2 py-0.5 text-xs uppercase ${levelColor(fix.severity)}`}>
                  {fix.severity}
                </span>
                {fix.title}
              </li>
            ))}
          </ol>
          <Link
            href="/r/x7Kj9mP"
            className="mt-4 inline-block text-sm text-emerald-300 transition-colors hover:text-emerald-200"
          >
            See full fix playbook &rarr;
          </Link>
        </article>
      </section>

      {/* ===== Footer ===== */}
      <footer className="mt-16 border-t border-zinc-800 pt-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <BrandLogo size="sm" />
              <span className="font-mono text-xs tracking-widest text-emerald-400">CLAWSCORE</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Open-source security scanner built by the community, for the community. Free forever.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-400">
              <a href="https://github.com/AddyAddline/clawscore" target="_blank" rel="noreferrer" className="transition-colors hover:text-zinc-200">
                GitHub
              </a>
              <Link href="/stats" className="transition-colors hover:text-zinc-200">
                Community Stats
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-zinc-200">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Need help?</p>
            <p className="mt-3 text-sm text-zinc-400">
              SetupMyClaw offers guided hardening for teams running OpenClaw in production.
            </p>
            <a
              href="https://setupmyclaw.in"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
            >
              Visit SetupMyClaw
            </a>
          </div>
        </div>
        <p className="mt-8 pb-2 text-center font-mono text-xs text-zinc-600">
          Built with care for the OpenClaw community
        </p>
      </footer>
    </main>
  );
}
