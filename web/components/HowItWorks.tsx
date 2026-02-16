import { Download, ScanSearch, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Run the scanner",
    description:
      "One command. No install, no signup. The scanner runs locally and checks your OpenClaw configuration.",
    icon: Download,
  },
  {
    number: "02",
    title: "Get your report",
    description:
      "Instant analysis across 7 security categories. See exactly what's solid and what needs attention.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Fix & improve",
    description:
      "Copy-paste fix commands, verify each one, and watch your score climb. Share your progress with the community.",
    icon: Shield,
  },
];

export function HowItWorks() {
  return (
    <section className="mt-14">
      <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
        How It Works
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <article
            key={step.number}
            className="terminal-panel animate-fade-in-up rounded-2xl border border-zinc-800 bg-[#0b0d0c]/70 p-6"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-bold text-emerald-400">
                {step.number}
              </span>
              <step.icon className="h-5 w-5 text-emerald-400/70" />
            </div>
            <h3 className="text-lg font-medium text-zinc-100">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
