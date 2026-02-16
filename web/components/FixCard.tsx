import { CopyButton } from "@/components/CopyButton";
import { levelColor } from "@/lib/scoring";
import { FixItem } from "@/lib/types";

export function FixCard({ item, index }: { item: FixItem; index: number }) {
  return (
    <article className="terminal-panel rounded-2xl border border-zinc-800 bg-[#0b0d0c]/75 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-zinc-400">#{index + 1}</span>
        <span className={`rounded-full border px-2 py-1 text-xs uppercase tracking-wide ${levelColor(item.severity)}`}>
          {item.severity}
        </span>
      </div>
      <h3 className="mt-3 text-lg text-zinc-100">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.risk}</p>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Fix</p>
          <CopyButton text={item.fixCommands.join("\n")} />
        </div>
        <pre className="rounded-lg border border-zinc-800 bg-black/40 p-3 text-xs text-emerald-300">
          {item.fixCommands.join("\n")}
        </pre>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Verify</p>
          <CopyButton text={item.verify.join("\n")} />
        </div>
        <pre className="rounded-lg border border-zinc-800 bg-black/40 p-3 text-xs text-zinc-300">
          {item.verify.join("\n")}
        </pre>
      </div>
    </article>
  );
}
