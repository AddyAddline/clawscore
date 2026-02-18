"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTerminalProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
}

export function TypewriterTerminal({
  lines,
  speed = 30,
  lineDelay = 400,
}: TypewriterTerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, lineDelay);

    return () => clearTimeout(timer);
  }, [started, currentLine, currentChar, lines, speed, lineDelay]);

  const partialLine =
    currentLine < lines.length
      ? lines[currentLine].slice(0, currentChar)
      : "";

  return (
    <pre
      ref={ref}
      className="typing-screen rounded-xl bg-[var(--bg-primary)] p-4 font-mono text-sm leading-relaxed text-emerald-400/90"
    >
      {displayedLines.map((line, i) => (
        <div key={i} className="text-emerald-400/70">{line}</div>
      ))}
      {currentLine < lines.length && (
        <div>
          {partialLine}
          <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-emerald-400" />
        </div>
      )}
    </pre>
  );
}
