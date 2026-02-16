import Image from "next/image";
import { getReport } from "@/lib/store";

export default async function BadgePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReport(id);

  const imageUrl = `/api/badge/${report.reportId}.svg`;
  const publicImageUrl = `https://clawscore.setupmyclaw.in/api/badge/${report.reportId}.svg`;
  const markdown = `[![ClawScore ${report.totalScore}/100](${publicImageUrl})](https://clawscore.setupmyclaw.in/r/${report.reportId})`;
  const html = `<a href=\"https://clawscore.setupmyclaw.in/r/${report.reportId}\"><img src=\"${publicImageUrl}\" alt=\"ClawScore ${report.totalScore}/100\" /></a>`;

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-8 md:px-6">
      <h1 className="text-3xl text-zinc-100">Badge Generator</h1>
      <p className="mt-2 text-sm text-zinc-400">Embed your security score in README files and dashboards.</p>

      <section className="terminal-panel mt-6 rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Preview</h2>
        <Image src={imageUrl} alt="Badge preview" width={210} height={36} className="mt-3 h-9 w-[210px]" />
      </section>

      <section className="terminal-panel mt-4 rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Markdown</h2>
        <pre className="mt-3 overflow-auto rounded border border-zinc-800 bg-black/30 p-3 text-xs text-emerald-300">{markdown}</pre>
      </section>

      <section className="terminal-panel mt-4 rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">HTML</h2>
        <pre className="mt-3 overflow-auto rounded border border-zinc-800 bg-black/30 p-3 text-xs text-cyan-300">{html}</pre>
      </section>
    </main>
  );
}
