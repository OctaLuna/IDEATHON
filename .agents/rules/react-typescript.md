---
trigger: always_on
description: Project conventions for React and TypeScript changes.
---

# React and TypeScript

- Use the existing Vite, React 19, and TypeScript setup; keep application screens in `src/pages/`, reusable UI in `src/components/`, and typed content in `src/data/`.
- Preserve the Spanish-language UCB event identity, project facts, and existing route behavior unless the user requests a change.
- Prefer semantic HTML and accessible names; preserve keyboard focus and responsive behavior.
- Respect `prefers-reduced-motion` and clean up GSAP work when components unmount.
- Run `bun run lint`, `bun run test`, and `bun run build` before reporting implementation complete.
