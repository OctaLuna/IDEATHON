---
name: test-runner
description: Run, target, and diagnose IDEATHON's Vitest and React Testing Library suite.
---

# Test runner

Use Bun from the repository root. Run `bun run test` for the complete suite or `bun run test -- <pattern>` to target a test file. Use `bun run test:watch` for an interactive local loop. Tests use Vitest, jsdom, and React Testing Library; shared browser shims are in `src/test/setup.ts`. Add regression coverage for changed behavior, prefer accessible queries, and report the exact command and outcome. Do not claim verification if a command did not finish successfully.
