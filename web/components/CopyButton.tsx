"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: "sm" | "md";
}

export function CopyButton({ text, label, size = "sm" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const padding = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border transition ${padding} ${
        copied
          ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
          : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
      }`}
    >
      {copied ? (
        <Check className={iconSize} />
      ) : (
        <Copy className={iconSize} />
      )}
      {label ?? (copied ? "Copied" : "Copy")}
    </button>
  );
}
