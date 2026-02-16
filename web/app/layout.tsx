import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://clawscore.setupmyclaw.in"),
  title: "ClawScore - OpenClaw Security Scanner | Free Security Check",
  description:
    "Free security scanner for OpenClaw. Check your setup in 30 seconds. Get a score, fix recommendations, and compare to the community.",
  openGraph: {
    title: "ClawScore - OpenClaw Security Scanner",
    description: "Scan your OpenClaw security posture in 30 seconds.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${jetbrainsMono.variable} bg-[#0a0a0a] text-zinc-100 antialiased`}>
        <div className="page-noise" />
        <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-black/60 backdrop-blur">
          <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-6">
            <Link href="/" className="font-mono text-sm tracking-widest text-emerald-400">
              [ CLAWSCORE ]
            </Link>
            <div className="flex items-center gap-4 text-xs text-zinc-300">
              <Link className="hover:text-emerald-300" href="/stats">
                STATS
              </Link>
              <Link className="hover:text-emerald-300" href="/skills">
                SKILLS
              </Link>
              <Link className="hover:text-emerald-300" href="/r/x7Kj9mP">
                SAMPLE REPORT
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
