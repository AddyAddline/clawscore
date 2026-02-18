"use client";

import { useEffect, useMemo, useState } from "react";

function getGradientColors(score: number): [string, string] {
  if (score >= 80) return ["#34d399", "#10b981"];
  if (score >= 50) return ["#fbbf24", "#f59e0b"];
  return ["#f87171", "#ef4444"];
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
    <div className="card animate-fade-in flex h-[300px] w-full max-w-[320px] items-center justify-center p-6">
      <div className="relative">
        <svg className="h-56 w-56 -rotate-90" viewBox="0 0 240 240" role="img" aria-label={`Security score ${score}`}>
          <circle cx="120" cy="120" r={radius} stroke="#1e1e22" strokeWidth="14" fill="none" />
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="url(#scoreGradient)"
            strokeWidth="14"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono text-5xl font-bold ${scoreClass}`}>{animatedScore}</span>
          <span className="mt-1 text-xs text-zinc-500">out of 100</span>
        </div>
      </div>
    </div>
  );
}
