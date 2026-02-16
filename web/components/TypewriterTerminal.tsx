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

    // Line complete — move to next after delay
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
      className="typing-screen rounded-lg border border-zinc-800 bg-black/40 p-4 text-sm text-emerald-300"
    >
      {displayedLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {currentLine < lines.length && (
        <div>
          {partialLine}
          <span className="inline-block w-2 animate-pulse bg-emerald-400">
            &nbsp;
          </span>
        </div>
      )}
    </pre>
  );
}
