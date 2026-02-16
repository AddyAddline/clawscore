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
    <div className="terminal-panel terminal-glow group relative overflow-hidden rounded-2xl border border-zinc-700/70 bg-[#0b0d0c]/90 p-4">
      <div className="scanline-overlay" />
      <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
        <Terminal className="h-4 w-4 text-emerald-400" />
        <span>Run once to scan and get your report</span>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <code className="font-mono text-sm text-emerald-300 md:text-base">{command}</code>
        <button
          onClick={onCopy}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Command"}
        </button>
      </div>
    </div>
  );
}
