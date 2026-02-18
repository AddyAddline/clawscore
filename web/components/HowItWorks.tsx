import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Run the scanner",
    desc: "One command. No install, no signup. Runs locally on your machine.",
  },
  {
    step: "2",
    title: "Get your report",
    desc: "Instant analysis across 7 security categories with a 0-100 score.",
  },
  {
    step: "3",
    title: "Fix & improve",
    desc: "Copy-paste fix commands and verify each one. Share with the community.",
  },
];

export function HowItWorks() {
  return (
    <section className="mt-20">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-zinc-100">
        How it works
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.step} className="card flex items-start gap-4 p-5" style={{ animationDelay: `${i * 120}ms` }}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400">
              {s.step}
            </span>
            <div>
              <p className="font-medium text-zinc-100">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden h-4 w-4 shrink-0 self-center text-zinc-700 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
