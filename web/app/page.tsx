import Link from "next/link";
import { AlertTriangle, Fingerprint, Lock, Network, Shield, Wrench, Zap } from "lucide-react";
import { AsciiLobster } from "@/components/AsciiLobster";
import { CommandCopy } from "@/components/CommandCopy";
import { commandToRun, recentActivity, sampleFixes } from "@/lib/sample-data";

const checks = [
  { label: "Version", icon: Shield, text: "Patch status and CVE exposure" },
  { label: "Auth", icon: Lock, text: "Gateway auth and token controls" },
  { label: "Network", icon: Network, text: "External interface exposure" },
  { label: "Skills", icon: Zap, text: "Malicious and unverified skills" },
  { label: "Permissions", icon: Fingerprint, text: "Credential file hardening" },
  { label: "Process", icon: Wrench, text: "Root/runtime risk checks" },
  { label: "SSL", icon: AlertTriangle, text: "TLS trust and certificate quality" },
];

const typingFrames = [
  "[scan] probing gateway config...",
  "[scan] checking CVE version floor...",
  "[scan] auditing installed skills...",
  "[scan] generating fix playbook...",
  "[done] score: 73 / 100",
];

export default function Home() {
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
    description: "Free security scanner for OpenClaw. Check your setup in 30 seconds.",
    url: "https://clawscore.setupmyclaw.in",
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.2),transparent_38%),#0b0b0b] p-8 md:p-12">
        <div className="scanline-overlay" />
        <AsciiLobster />
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
          Is your OpenClaw secure?
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300 md:text-lg">Find out in 30 seconds. Free forever.</p>

        <div className="mt-7">
          <CommandCopy command={commandToRun} />
        </div>

        <p className="mt-4 font-mono text-sm text-zinc-400">12,453 scans • Avg score: 61/100</p>
      </section>

      <section className="mt-12">
        <h2 className="mb-5 font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">What We Check</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {checks.map((item) => (
            <article key={item.label} className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/70 p-4 transition hover:glitch-hover hover:border-zinc-600">
              <item.icon className="mb-3 h-5 w-5 text-emerald-400" />
              <h3 className="text-zinc-100">{item.label}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Sample Output</h2>
          <pre className="typing-screen mt-4 rounded-lg border border-zinc-800 bg-black/40 p-4 text-sm text-emerald-300">
            {typingFrames.join("\n")}
          </pre>
          <Link href="/r/x7Kj9mP" className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-200">
            View sample report -&gt;
          </Link>
        </article>

        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Community Pulse</h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-300">
            {recentActivity.map((line) => (
              <li key={line} className="rounded border border-zinc-800 bg-black/30 px-3 py-2">
                {line}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">Is it safe to run?</summary>
              <p className="mt-2 text-sm text-zinc-400">Yes. The scanner is auditable shell, reads local config, and only uploads with consent.</p>
            </details>
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">What data is uploaded?</summary>
              <p className="mt-2 text-sm text-zinc-400">Version, category scores, skill names, hashed machine ID. No keys, secrets, or file contents.</p>
            </details>
            <details className="rounded border border-zinc-800 bg-black/30 p-3">
              <summary className="cursor-pointer text-sm text-zinc-200">How is score calculated?</summary>
              <p className="mt-2 text-sm text-zinc-400">Weighted checks across version, auth, network, skills, permissions, process, and TLS for 0-100.</p>
            </details>
          </div>
        </article>

        <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Top Remediations</h2>
          <ol className="mt-4 space-y-3">
            {sampleFixes.slice(0, 3).map((fix) => (
              <li key={fix.title} className="rounded border border-zinc-800 bg-black/30 px-3 py-2 text-sm text-zinc-300">
                <span className="mr-2 text-emerald-400">{fix.severity}</span>
                {fix.title}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <footer className="mt-14 border-t border-zinc-800 pt-6 text-sm text-zinc-400">
        <div className="flex flex-wrap items-center gap-4">
          <a href="https://setupmyclaw.in" target="_blank" rel="noreferrer" className="hover:text-zinc-200">
            SetupMyClaw
          </a>
          <a href="https://github.com/AddyAddline/clawscore" target="_blank" rel="noreferrer" className="hover:text-zinc-200">
            GitHub
          </a>
          <a href="#" className="hover:text-zinc-200">
            Privacy Policy
          </a>
        </div>
        <p className="mt-2 font-mono text-xs">Open source. Free forever.</p>
      </footer>
    </main>
  );
}
