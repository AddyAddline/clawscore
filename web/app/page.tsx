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
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free community security scanner for OpenClaw. Check your setup in 30 seconds.",
    url: "https://clawscore.setupmyclaw.in",
  };

  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ===== Hero ===== */}
      <section className="animate-fade-in">
        <BrandLogo size="lg" />

        <h1 className="mt-8 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-zinc-50">
          Is your OpenClaw
          <br />
          <span className="text-emerald-400">secure?</span>
        </h1>

        <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-zinc-400">
          Free, open-source security scanner built by the community.
          Check your setup in 30 seconds. Get a score and actionable fixes.
        </p>

        <div className="mt-10 max-w-2xl">
          <CommandCopy command={commandToRun} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-8 text-sm text-zinc-500">
          <div>
            <AnimatedCounter end={stats.totalScans} className="font-mono text-lg font-semibold text-zinc-200" />
            <span className="ml-1.5">scans run</span>
          </div>
          <div>
            <AnimatedCounter end={stats.averageScore} className="font-mono text-lg font-semibold text-zinc-200" />
            <span className="ml-1">/100 avg score</span>
          </div>
          <div>
            <AnimatedCounter end={stats.cvePatched} suffix="%" className="font-mono text-lg font-semibold text-zinc-200" />
            <span className="ml-1.5">CVE patched</span>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <HowItWorks />

      {/* ===== What We Check ===== */}
      <section className="mt-20">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-zinc-100">
          7 security checks
        </h2>
        <p className="mt-2 text-sm text-zinc-500">Every scan covers these categories</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {checks.map((item, i) => (
            <div
              key={item.label}
              className="card animate-fade-in-up p-4"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <item.icon className="mb-2.5 h-4 w-4 text-emerald-400/80" />
              <p className="text-sm font-medium text-zinc-200">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Preview + Community ===== */}
      <section className="mt-20 grid gap-5 lg:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm font-medium text-zinc-200">See what you get</p>
          <div className="mt-4">
            <TypewriterTerminal lines={typingLines} speed={25} lineDelay={350} />
          </div>
          <Link
            href="/r/x7Kj9mP"
            className="mt-4 inline-block text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            View full sample report &rarr;
          </Link>
        </div>

        <div className="card p-5">
          <p className="text-sm font-medium text-zinc-200">Community pulse</p>
          <div className="mt-4 space-y-2">
            {recentActivity.map((line, i) => (
              <div
                key={line}
                className="flex items-start gap-3 rounded-xl bg-[var(--bg-primary)] px-3.5 py-2.5 text-sm text-zinc-400"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ + Remediations ===== */}
      <section className="mt-20 grid gap-5 lg:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-zinc-100">FAQ</h2>
          <div className="mt-5 space-y-2">
            {[
              { q: "Is it safe to run?", a: "Yes. It's a fully auditable shell script that reads local config and only uploads with your explicit consent." },
              { q: "What data is uploaded?", a: "Version, category scores, skill names, and a hashed machine ID. No keys, secrets, or file contents ever leave your machine." },
              { q: "How is the score calculated?", a: "Weighted checks across 7 categories: version, auth, network, skills, permissions, process, and TLS." },
              { q: "Can I run it offline?", a: "Yes. Use --local to keep everything on your machine, or --anonymous to upload without any identifier." },
            ].map((faq) => (
              <details key={faq.q} className="card group p-4 open:border-[var(--border-hover)]">
                <summary className="cursor-pointer list-none text-sm font-medium text-zinc-200">{faq.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-zinc-100">Top fixes</h2>
          <p className="mt-1 text-xs text-zinc-500">Most common remediations across the community</p>
          <div className="mt-5 space-y-2">
            {sampleFixes.slice(0, 3).map((fix) => (
              <div key={fix.title} className="card flex items-start gap-3 p-4">
                <span className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase ${levelColor(fix.severity)}`}>
                  {fix.severity}
                </span>
                <span className="text-sm text-zinc-300">{fix.title}</span>
              </div>
            ))}
          </div>
          <Link
            href="/r/x7Kj9mP"
            className="mt-4 inline-block text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            See full fix playbook &rarr;
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="mt-24 border-t pt-10">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" />
              <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-zinc-200">ClawScore</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Open-source security scanner built by the community, for the community. Free forever.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-400">
              <a href="https://github.com/AddyAddline/clawscore" target="_blank" rel="noreferrer" className="transition-colors hover:text-zinc-200">GitHub</a>
              <Link href="/stats" className="transition-colors hover:text-zinc-200">Community Stats</Link>
              <Link href="/privacy" className="transition-colors hover:text-zinc-200">Privacy</Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Support</p>
            <p className="mt-3 text-sm text-zinc-500">
              SetupMyClaw offers guided hardening for production OpenClaw deployments.
            </p>
            <a
              href="https://setupmyclaw.in"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block rounded-lg bg-emerald-500/10 px-3.5 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
            >
              Visit SetupMyClaw
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-zinc-600">
          Built with care for the OpenClaw community
        </p>
      </footer>
    </main>
  );
}
