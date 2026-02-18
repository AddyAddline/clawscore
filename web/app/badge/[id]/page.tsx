import Image from "next/image";
import { CopyButton } from "@/components/CopyButton";
import { getReport } from "@/lib/store";

export default async function BadgePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReport(id);

  const imageUrl = `/api/badge/${report.reportId}.svg`;
  const publicImageUrl = `https://clawscore.setupmyclaw.in/api/badge/${report.reportId}.svg`;
  const markdown = `[![ClawScore ${report.totalScore}/100](${publicImageUrl})](https://clawscore.setupmyclaw.in/r/${report.reportId})`;
  const html = `<a href=\"https://clawscore.setupmyclaw.in/r/${report.reportId}\"><img src=\"${publicImageUrl}\" alt=\"ClawScore ${report.totalScore}/100\" /></a>`;

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-10">
      <h1 className="animate-fade-in font-[family-name:var(--font-display)] text-2xl font-bold text-zinc-100">
        Badge Generator
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Embed your security score in README files and dashboards.</p>

      <div className="card mt-8 p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Preview</p>
        <Image src={imageUrl} alt="Badge preview" width={210} height={36} className="mt-3 h-9 w-[210px]" />
      </div>

      <div className="card mt-3 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Markdown</p>
          <CopyButton text={markdown} size="md" />
        </div>
        <pre className="mt-3 overflow-auto rounded-xl bg-[var(--bg-primary)] p-3.5 font-mono text-xs leading-relaxed text-emerald-400/80">{markdown}</pre>
      </div>

      <div className="card mt-3 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">HTML</p>
          <CopyButton text={html} size="md" />
        </div>
        <pre className="mt-3 overflow-auto rounded-xl bg-[var(--bg-primary)] p-3.5 font-mono text-xs leading-relaxed text-blue-400/80">{html}</pre>
      </div>
    </main>
  );
}
