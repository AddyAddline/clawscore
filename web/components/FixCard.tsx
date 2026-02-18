import { CopyButton } from "@/components/CopyButton";
import { levelColor } from "@/lib/scoring";
import { FixItem } from "@/lib/types";

export function FixCard({ item, index }: { item: FixItem; index: number }) {
  return (
    <article className="card p-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-zinc-500">#{index + 1}</span>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${levelColor(item.severity)}`}>
          {item.severity}
        </span>
      </div>
      <h3 className="mt-3 text-[17px] font-medium text-zinc-100">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.risk}</p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Fix</p>
          <CopyButton text={item.fixCommands.join("\n")} />
        </div>
        <pre className="rounded-xl bg-[var(--bg-primary)] p-3.5 font-mono text-xs leading-relaxed text-emerald-400/80">
          {item.fixCommands.join("\n")}
        </pre>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Verify</p>
          <CopyButton text={item.verify.join("\n")} />
        </div>
        <pre className="rounded-xl bg-[var(--bg-primary)] p-3.5 font-mono text-xs leading-relaxed text-zinc-400">
          {item.verify.join("\n")}
        </pre>
      </div>
    </article>
  );
}
