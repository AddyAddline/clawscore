import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ClawScore",
  description: "How ClawScore handles your data. What we collect, what we don't, and how to control it.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-8 md:px-6">
      <h1 className="animate-fade-in text-3xl text-zinc-100">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-400">
        ClawScore is built by the community, for the community. We believe security tools should be transparent about their own practices.
      </p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-lg font-medium text-zinc-100">What We Collect</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            When you run a scan and choose to upload results, we collect:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/70" />
              OpenClaw version number
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/70" />
              Category scores (version, auth, network, skills, permissions, process, SSL)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/70" />
              Installed skill names
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/70" />
              A hashed machine identifier (for score-over-time tracking)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-100">What We DON&apos;T Collect</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/70" />
              API keys, tokens, or secrets
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/70" />
              File contents or configuration values
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/70" />
              IP addresses or geolocation
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500/70" />
              Personal information of any kind
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-100">How We Use Data</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Uploaded scan data powers the Community Security Dashboard — aggregate statistics that help everyone understand the state of OpenClaw security. Individual reports are accessible only via their unique, unguessable report ID.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-100">Privacy Flags</h2>
          <p className="mt-2 text-sm text-zinc-400">You have full control over what gets uploaded:</p>
          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-zinc-800 bg-black/30 p-3">
              <code className="text-sm text-emerald-300">--local</code>
              <p className="mt-1 text-xs text-zinc-500">Run entirely offline. No data leaves your machine.</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-black/30 p-3">
              <code className="text-sm text-emerald-300">--anonymous</code>
              <p className="mt-1 text-xs text-zinc-500">Upload results without any machine identifier.</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-black/30 p-3">
              <code className="text-sm text-emerald-300">--yes</code>
              <p className="mt-1 text-xs text-zinc-500">Skip the upload confirmation prompt (for CI/CD pipelines).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-100">Open Source</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            ClawScore is fully open source. You can audit every line of the scanner to verify exactly what it reads and what it sends. We believe transparency is the foundation of trust in security tooling.
          </p>
          <a
            href="https://github.com/AddyAddline/clawscore"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-emerald-300 transition-colors hover:text-emerald-200"
          >
            View source on GitHub &rarr;
          </a>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-100">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Questions about our privacy practices? Open an issue on GitHub or reach out to the team at{" "}
            <a href="https://setupmyclaw.in" target="_blank" rel="noreferrer" className="text-emerald-300 hover:text-emerald-200">
              SetupMyClaw
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
