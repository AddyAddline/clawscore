# 🦞 ClawScore

**Free, open-source security scanner for OpenClaw.**

Check your OpenClaw setup in 30 seconds. Get a security score, specific fix recommendations, and see how you compare to the community.

## Quick Start

```bash
curl -sSL clawscore.setupmyclaw.in/scan | bash
```

That's it. You'll get:
- A 0-100 security score
- Breakdown by category
- Specific commands to fix issues
- Comparison to other users

## What We Check

| Check | Description |
|-------|-------------|
| **Version** | Is your OpenClaw patched for CVE-2026-25253? |
| **Authentication** | Is auth enabled on your gateway? |
| **Network** | Is your instance exposed to the network? |
| **Skills** | Are any installed skills known malicious? |
| **Permissions** | Are your credentials properly secured? |
| **Process** | Are you running as root? (bad) |
| **SSL/TLS** | Is HTTPS enabled and valid? |

## Privacy

The scanner is **100% open source**. You can read exactly what it does.

**We NEVER upload:**
- API keys or tokens
- Personal data from your files
- IP addresses (hashed only)

**We only upload (with consent):**
- OpenClaw version
- Score and issue categories
- Skill names (not configs)

Run with `--local` for zero network activity.

## Development

```bash
# Clone the repo
git clone https://github.com/AddyAddline/clawscore.git
cd clawscore/web

# Install dependencies
npm install

# Run Convex dev server
npx convex dev

# Run Next.js dev server
npm run dev
```

## License

MIT - Free forever, open source always.

## Credits

Built by [SetupMyClaw](https://setupmyclaw.in) - Professional OpenClaw setup service.
