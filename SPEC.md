# ClawScore - Complete Specification

## Overview

ClawScore is a free, open-source security scanner for OpenClaw installations. Users run a bash script that analyzes their setup and returns a 0-100 security score with specific fix recommendations.

**Website:** `clawscore.setupmyclaw.in`
**Repo:** `github.com/AddyAddline/clawscore`

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** Convex
- **Styling:** Tailwind CSS
- **Deploy:** Vercel
- **Language:** TypeScript

---

## Design Direction

### Aesthetic: "Hacker Terminal"

**NOT** like SetupMyClaw (warm, approachable). ClawScore should feel:
- Technical, security-focused
- Dark mode ONLY (no light mode)
- Terminal/hacker aesthetic
- Professional but with personality

### Colors

```css
--bg-primary: #0a0a0a;        /* Near black */
--bg-secondary: #111111;      /* Card backgrounds */
--bg-elevated: #1a1a1a;       /* Hover states */
--border: #262626;            /* Subtle borders */

--text-primary: #fafafa;      /* White text */
--text-secondary: #a1a1aa;    /* Muted text */
--text-muted: #71717a;        /* Very muted */

--accent-green: #22c55e;      /* Safe/Good */
--accent-yellow: #eab308;     /* Warning */
--accent-red: #ef4444;        /* Critical/Bad */
--accent-blue: #3b82f6;       /* Info/Links */

--score-gradient: linear-gradient(135deg, #22c55e, #3b82f6);
```

### Typography

- **Display/Scores:** JetBrains Mono (monospace, techy)
- **Body:** Geist Sans or similar modern sans-serif
- **Code blocks:** JetBrains Mono

### Visual Elements

- Scanline effects (subtle)
- Terminal-style borders (single line box characters)
- Glitch/flicker animations (subtle, on hover)
- Grid patterns in backgrounds
- Progress bars that look like terminal loading
- ASCII art lobster somewhere

### Inspiration

- Vercel dashboard (dark, clean)
- Linear app (minimal, purposeful)
- Terminal/CLI aesthetics
- Security dashboards
- Hacker movie UIs (but tasteful)

---

## Pages

### 1. Homepage (`/`)

**Hero Section:**
- Large headline: "Is your OpenClaw secure?"
- Subhead: "Find out in 30 seconds. Free forever."
- Giant command box with copy button:
  ```
  curl -sSL clawscore.setupmyclaw.in/scan | bash
  ```
- Live stats below: "12,453 scans • Avg score: 61/100"

**What We Check Section:**
- Grid of 7 check categories with icons
- Version, Auth, Network, Skills, Permissions, Process, SSL

**Sample Report Section:**
- Embedded preview of what output looks like
- Animated typing effect showing scan progress

**Community Stats Section:**
- Score distribution chart
- Most common issues
- Improvement trends

**FAQ Section:**
- Is it safe to run?
- What data is uploaded?
- How is the score calculated?

**Footer:**
- Links to SetupMyClaw, GitHub, Privacy Policy
- "Open source. Free forever."

### 2. Report Page (`/r/[id]`)

**Header:**
- Large score display (animated on load)
- Score ring/gauge visualization
- "Safer than X% of users" comparison

**Breakdown Section:**
- 7 category bars with scores
- Expandable details for each

**Fixes Section:**
- Ordered list of issues to fix
- Copy-paste commands for each fix
- Severity indicators (Critical, High, Medium, Low)

**Share Section:**
- Tweet button (pre-filled text)
- Copy link button
- Badge embed code

**CTA (subtle):**
- "Need help? SetupMyClaw offers professional setup"

### 3. Stats Dashboard (`/stats`)

**Live Counters:**
- Total scans
- Scans today
- Average score
- % CVE patched

**Charts:**
- Score distribution histogram
- Issues breakdown pie chart
- Trend over time line chart
- Version adoption donut

**Recent Activity Feed:**
- Anonymized recent scans
- "Score improved: 45 → 89"

### 4. Skills Database (`/skills`)

**Search/Filter:**
- Search by skill name
- Filter by status (Verified, Unverified, Malicious)

**Skill Cards:**
- Name, status badge, risk level
- Last checked date
- Community reports count
- "Report this skill" button

### 5. Badge Generator (`/badge/[id]`)

**Preview:**
- Live badge preview
- Different style options (minimal, detailed)

**Embed Code:**
- Markdown
- HTML
- Image URL

---

## API Routes

### POST `/api/scan`

Receives scan results from bash script.

**Request:**
```json
{
  "version": "2026.1.29",
  "checks": {
    "version": { "score": 20, "max": 20, "status": "pass", "details": "Patched" },
    "auth": { "score": 25, "max": 25, "status": "pass", "details": "Enabled" },
    "network": { "score": 0, "max": 20, "status": "fail", "details": "Bound to 0.0.0.0" },
    "skills": { "score": 10, "max": 15, "status": "warn", "details": "2 unverified" },
    "permissions": { "score": 10, "max": 10, "status": "pass", "details": "OK" },
    "process": { "score": 5, "max": 5, "status": "pass", "details": "Not root" },
    "ssl": { "score": 3, "max": 5, "status": "warn", "details": "Self-signed" }
  },
  "skills": ["skill1", "skill2"],
  "totalScore": 73,
  "machineId": "hashed-machine-id",  // For tracking repeat scans
  "timestamp": "2026-02-16T19:00:00Z"
}
```

**Response:**
```json
{
  "id": "x7Kj9mP",
  "reportUrl": "https://clawscore.setupmyclaw.in/r/x7Kj9mP",
  "badgeUrl": "https://clawscore.setupmyclaw.in/badge/x7Kj9mP.svg",
  "percentile": 67,
  "previousScore": null  // or number if returning user
}
```

### GET `/api/badge/[id].svg`

Returns dynamic SVG badge.

### GET `/api/stats`

Returns aggregate statistics for dashboard.

---

## Database Schema (Convex)

### scans

```typescript
{
  _id: Id<"scans">,
  reportId: string,           // Short ID for URLs (x7Kj9mP)
  machineId: string,          // Hashed, for tracking repeat scans
  version: string,            // OpenClaw version
  totalScore: number,         // 0-100
  checks: {                   // Individual check results
    version: CheckResult,
    auth: CheckResult,
    network: CheckResult,
    skills: CheckResult,
    permissions: CheckResult,
    process: CheckResult,
    ssl: CheckResult,
  },
  skills: string[],           // List of installed skill names
  createdAt: number,          // Timestamp
}

type CheckResult = {
  score: number,
  max: number,
  status: "pass" | "warn" | "fail",
  details: string,
}
```

### skills

```typescript
{
  _id: Id<"skills">,
  name: string,
  status: "verified" | "unverified" | "malicious",
  riskLevel: "low" | "medium" | "high" | "critical",
  lastChecked: number,
  reports: number,            // Community reports count
  notes: string,
}
```

### stats (aggregated, updated periodically)

```typescript
{
  _id: Id<"stats">,
  date: string,               // YYYY-MM-DD
  totalScans: number,
  averageScore: number,
  scoreDistribution: number[], // [0-10, 11-20, ..., 91-100]
  issueBreakdown: {
    version: number,
    auth: number,
    network: number,
    skills: number,
    permissions: number,
    process: number,
    ssl: number,
  },
  cvePatched: number,         // Percentage
}
```

---

## Scanner Script (scan.sh)

The bash script that users run. Must be:
- Self-contained (no dependencies except curl, bash)
- Open source and auditable
- Privacy-respecting (never uploads secrets)

**Location:** `/scanner/scan.sh`

**Features:**
1. Detect OpenClaw installation
2. Check version against CVE database
3. Parse config for security issues
4. Audit installed skills
5. Check file permissions
6. Calculate weighted score
7. Generate terminal output with fixes
8. Optionally upload to API

**Privacy flags:**
- `--local` - No upload, just local report
- `--yes` - Auto-agree to upload
- `--anonymous` - Upload without machine tracking

---

## File Structure

```
clawscore/
├── scanner/
│   ├── scan.sh                    # Main bash scanner
│   ├── README.md                  # Scanner documentation
│   └── SECURITY.md                # Privacy policy for script
│
├── web/                           # Next.js app
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Homepage
│   │   ├── r/
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Report page
│   │   ├── stats/
│   │   │   └── page.tsx           # Stats dashboard
│   │   ├── skills/
│   │   │   └── page.tsx           # Skills database
│   │   └── api/
│   │       ├── scan/
│   │       │   └── route.ts       # Receive scan results
│   │       ├── badge/
│   │       │   └── [id]/
│   │       │       └── route.ts   # Generate SVG badge
│   │       └── stats/
│   │           └── route.ts       # Get aggregate stats
│   │
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── ScoreGauge.tsx
│   │   ├── CheckBreakdown.tsx
│   │   ├── FixCard.tsx
│   │   ├── StatsChart.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── convex.ts              # Convex client
│   │   └── utils.ts
│   │
│   └── styles/
│       └── globals.css
│
├── convex/
│   ├── schema.ts                  # Database schema
│   ├── scans.ts                   # Scan mutations/queries
│   ├── skills.ts                  # Skills mutations/queries
│   └── stats.ts                   # Stats queries
│
├── public/
│   ├── lobster.svg                # ASCII art lobster
│   └── og-image.png               # Social sharing image
│
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── convex.json
├── README.md
├── LICENSE                        # MIT
└── CONTRIBUTING.md
```

---

## Scoring Algorithm

| Check | Max Points | Weight | Critical |
|-------|------------|--------|----------|
| Version (CVE patched) | 20 | High | If < 2026.1.29, score = 0 |
| Authentication | 25 | Critical | If disabled, total max = 50 |
| Network exposure | 20 | Critical | If 0.0.0.0, subtract 20 |
| Skills | 15 | High | Malicious = 0, Unverified = -5 each |
| File permissions | 10 | Medium | World-readable creds = 0 |
| Process (root) | 5 | Low | Root = 0 |
| SSL/TLS | 5 | Low | None = 0, Self-signed = 3, Valid = 5 |

**Total: 100 points**

---

## Fix Recommendations

Each issue should have:
1. **Title** - What's wrong
2. **Risk** - Why it matters
3. **Fix** - Exact command(s) to run
4. **Verify** - How to confirm it's fixed

Example:
```
❌ CRITICAL: Network Exposure

Your OpenClaw is bound to 0.0.0.0, making it accessible from any device 
on your network or potentially the internet.

Risk: Attackers can connect to your AI assistant and potentially 
execute commands or access your data.

Fix:
  openclaw config set gateway.host "127.0.0.1"
  openclaw gateway restart

Verify:
  netstat -tlnp | grep 18789
  # Should show 127.0.0.1:18789, not 0.0.0.0:18789
```

---

## SEO Requirements

- Meta title: "ClawScore - OpenClaw Security Scanner | Free Security Check"
- Meta description: "Free security scanner for OpenClaw. Check your setup in 30 seconds. Get a score, fix recommendations, and compare to the community."
- OpenGraph image: Dark themed with score visualization
- Structured data: SoftwareApplication schema

---

## Performance Requirements

- Homepage: < 1s LCP
- Report pages: < 500ms TTFB
- Badge SVG: < 100ms (cached at edge)
- API response: < 200ms

---

## Launch Checklist

1. [ ] Scanner script working and tested
2. [ ] Website deployed to Vercel
3. [ ] Convex database set up
4. [ ] DNS configured (clawscore.setupmyclaw.in)
5. [ ] Badge generation working
6. [ ] Stats dashboard populated with test data
7. [ ] README complete
8. [ ] Post to OpenClaw Discord
9. [ ] Tweet from @henry_gg08

---

## Success Metrics

- Week 1: 100+ scans
- Week 4: 1,000+ scans
- Month 3: Featured in OpenClaw docs/community

---

## Future Enhancements (Post-MVP)

- Continuous monitoring ($5/mo)
- Team dashboards
- Slack/Discord notifications
- API for CI/CD integration
- Browser extension for one-click scan
