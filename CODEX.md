# Codex Instructions for ClawScore

Read SPEC.md for the complete specification.

## What to Build

ClawScore is a security scanner for OpenClaw. Build:

1. **Next.js 15 website** (App Router) with:
   - Homepage with hero, stats, FAQ
   - Report page (`/r/[id]`)
   - Stats dashboard (`/stats`)
   - Skills database (`/skills`)
   - API routes for scan uploads and badge generation

2. **Convex database** with:
   - scans table
   - skills table
   - stats table

3. **Bash scanner script** (`/scanner/scan.sh`)

## Design Requirements

**CRITICAL**: This must look AMAZING. Not generic AI slop.

**Theme:** Dark hacker/terminal aesthetic
- Near-black background (#0a0a0a)
- Green for good (#22c55e)
- Yellow for warning (#eab308)
- Red for critical (#ef4444)

**Typography:**
- JetBrains Mono for code/scores
- Modern sans-serif for body (NOT Inter, NOT Arial)

**Effects:**
- Terminal-style animations
- Scanline effects (subtle)
- Progress bars like loading indicators
- Glitch hover effects
- ASCII art lobster

**Inspiration:** Vercel dashboard, Linear, hacker movie UIs

## Technical Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Convex (database)
- Vercel (deployment)

## Commands to Run

```bash
# Initialize Next.js
npx create-next-app@latest web --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Install Convex
cd web && npm install convex
npx convex init

# Install other deps
npm install lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

## File Structure to Create

```
clawscore/
├── scanner/
│   └── scan.sh
├── web/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── r/[id]/page.tsx
│   │   ├── stats/page.tsx
│   │   ├── skills/page.tsx
│   │   └── api/...
│   ├── components/
│   ├── convex/
│   └── lib/
├── README.md
└── LICENSE
```

## Key Features to Implement

### Homepage
- Giant command copy box
- Live stats counter
- What we check grid
- Sample report preview
- FAQ accordion

### Report Page
- Animated score gauge
- Category breakdown bars
- Fix cards with copy buttons
- Share/badge section
- Subtle SetupMyClaw CTA

### Stats Dashboard
- Live counters
- Score distribution chart
- Issue breakdown
- Trend over time

### API
- POST /api/scan - receive results
- GET /api/badge/[id].svg - generate badge
- GET /api/stats - aggregate data

### Scanner Script
- Detect OpenClaw
- Run security checks
- Calculate score
- Pretty terminal output
- Upload to API

## Quality Bar

This needs to look like a $10,000 agency-built security tool, not a weekend project. Every pixel matters. Make it memorable.

When finished, run:
```
openclaw gateway wake --text "Done: ClawScore MVP built - Next.js + Convex + Scanner" --mode now
```
