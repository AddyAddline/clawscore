"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

export function CommandCopy({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="cmd-glow rounded-2xl bg-[var(--bg-card)] p-5">
      <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
        Run this to scan your setup
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <code className="font-mono text-[15px] text-emerald-300">{command}</code>
        <button
          onClick={onCopy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-300 transition-all hover:bg-emerald-500/25 active:scale-[0.98]"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
