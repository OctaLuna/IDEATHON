# Claude Code guide

Follow `AGENTS.md` for the project architecture and conventions. IDEATHON is a Spanish-language React 19 and TypeScript SPA built with Vite, React Router, Tailwind CSS 4, GSAP, and Motion.

- Install: `bun install`
- Develop: `bun run dev`
- Format: `bun run format` / `bun run format:check`
- Type-check: `bun run typecheck`
- Lint: `bun run lint`
- Tests: `bun run test`
- Build: `bun run build`
- Full verification: `bun run verify`
- Prepare local videos: `bun run media:prepare`
- Upload optimized videos to public Vercel Blob: `bun run media:upload`
- Sync Blob videos and build for Vercel: `bun run build:vercel`

Shared skills are in `.agents/skills/`; Claude Code also reads `.claude/skills/`. Apply `frontend-design` for a new visual direction and Impeccable for its explicit design commands, audits, and refinement tasks. Hooks live in `.claude/settings.json` and `.claude/settings.local.json`; the local Impeccable hook calls a Node launcher so it works on Windows and POSIX shells.
