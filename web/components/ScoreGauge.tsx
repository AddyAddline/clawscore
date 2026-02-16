"use client";

import { useEffect, useMemo, useState } from "react";

function getGradientColors(score: number): [string, string] {
  if (score >= 80) return ["#22c55e", "#10b981"];
  if (score >= 50) return ["#eab308", "#f59e0b"];
  return ["#ef4444", "#dc2626"];
}

export function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= score) {
          clearInterval(timer);
          return score;
        }
        return prev + 1;
      });
    }, 14);

    return () => clearInterval(timer);
  }, [score]);

  const pct = useMemo(() => Math.max(0, Math.min(100, animatedScore)), [animatedScore]);
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const scoreClass = score >= 80 ? "text-emerald-400" : score >= 50 ? "text-yellow-400" : "text-red-400";
  const [color1, color2] = getGradientColors(score);

  return (
    <div className="terminal-panel animate-fade-in relative flex h-[300px] w-full max-w-[320px] items-center justify-center rounded-2xl border border-zinc-700/70 bg-[#0b0d0c]/90 p-4">
      <svg className="h-64 w-64 -rotate-90" viewBox="0 0 240 240" role="img" aria-label={`Security score ${score}`}>
        <circle cx="120" cy="120" r={radius} stroke="#202222" strokeWidth="16" fill="none" />
        <circle
          cx="120"
          cy="120"
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth="16"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`font-mono text-6xl font-bold ${scoreClass}`}>{animatedScore}</span>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">security score</span>
      </div>
    </div>
  );
}
