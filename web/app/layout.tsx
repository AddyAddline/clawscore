import type { Metadata } from "next";
import { DM_Sans, Geist, JetBrains_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://clawscore.setupmyclaw.in"),
  title: "ClawScore - OpenClaw Security Scanner | Free Security Check",
  description:
    "Free security scanner for OpenClaw. Check your setup in 30 seconds. Get a score, fix recommendations, and compare to the community.",
  openGraph: {
    title: "ClawScore - OpenClaw Security Scanner",
    description: "Scan your OpenClaw security posture in 30 seconds.",
    images: ["/og-image.jpeg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${jetbrainsMono.variable} ${dmSans.variable} bg-[var(--bg-primary)] text-zinc-100 antialiased`}>
        <div className="page-noise" />
        <header className="sticky top-0 z-20 border-b bg-[var(--bg-primary)]/80 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="ClawScore"
                width={28}
                height={28}
              />
              <span className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight text-zinc-100">
                ClawScore
              </span>
            </Link>
            <div className="flex items-center gap-6 text-[13px] text-zinc-400">
              <Link className="transition-colors hover:text-zinc-100" href="/stats">
                Stats
              </Link>
              <Link className="transition-colors hover:text-zinc-100" href="/skills">
                Skills
              </Link>
              <Link className="transition-colors hover:text-zinc-100" href="/r/x7Kj9mP">
                Sample Report
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
