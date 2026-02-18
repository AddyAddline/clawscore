import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ClawScore",
  description: "How ClawScore handles your data. What we collect, what we don't, and how to control it.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-20 pt-10">
      <h1 className="animate-fade-in font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-100">
        Privacy
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        ClawScore is built by the community. We believe security tools should be transparent about their own practices.
      </p>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-base font-semibold text-zinc-100">What we collect</h2>
          <p className="mt-2 text-sm text-zinc-500">When you run a scan and choose to upload results:</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            {[
              "OpenClaw version number",
              "Category scores (version, auth, network, skills, permissions, process, SSL)",
              "Installed skill names",
              "A hashed machine identifier (for score-over-time tracking)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-100">What we don&apos;t collect</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-400">
            {[
              "API keys, tokens, or secrets",
              "File contents or configuration values",
              "IP addresses or geolocation",
              "Personal information of any kind",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-100">How we use data</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Uploaded scan data powers the Community Dashboard — aggregate statistics that help everyone understand the state of OpenClaw security. Individual reports are accessible only via their unique, unguessable report ID.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-100">Privacy flags</h2>
          <p className="mt-2 text-sm text-zinc-500">Full control over what gets uploaded:</p>
          <div className="mt-4 space-y-2">
            {[
              { flag: "--local", desc: "Run entirely offline. No data leaves your machine." },
              { flag: "--anonymous", desc: "Upload results without any machine identifier." },
              { flag: "--yes", desc: "Skip the upload confirmation prompt (for CI/CD)." },
            ].map((item) => (
              <div key={item.flag} className="card p-3.5">
                <code className="font-mono text-sm text-emerald-400">{item.flag}</code>
                <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-100">Open source</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            ClawScore is fully open source. You can audit every line of the scanner to verify exactly what it reads and sends.
          </p>
          <a
            href="https://github.com/AddyAddline/clawscore"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-emerald-400 transition-colors hover:text-emerald-300"
          >
            View source on GitHub &rarr;
          </a>
        </section>

        <section>
          <h2 className="text-base font-semibold text-zinc-100">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Questions? Open an issue on GitHub or reach out at{" "}
            <a href="https://setupmyclaw.in" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300">
              SetupMyClaw
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
